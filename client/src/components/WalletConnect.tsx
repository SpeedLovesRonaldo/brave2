import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, CheckCircle2, Coins } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface WalletConnectProps {
  score?: number;
}

export default function WalletConnect({ score }: WalletConnectProps) {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const { toast } = useToast();

  const connectWallet = async () => {
    setIsConnecting(true);
    
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        
        if (accounts && accounts.length > 0) {
          setWalletAddress(accounts[0]);
          toast({
            title: "Wallet Connected",
            description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
          });
        }
      } else {
        toast({
          title: "Wallet Not Found",
          description: "Please install Brave Wallet or MetaMask to continue.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const mintBadge = async () => {
    if (!walletAddress) return;
    
    setIsMinting(true);
    
    try {
      const message = JSON.stringify({
        action: "mint_brave_badge",
        score: score || 0,
        timestamp: new Date().toISOString(),
        address: walletAddress,
      });

      await window.ethereum.request({
        method: 'personal_sign',
        params: [message, walletAddress],
      });

      toast({
        title: "Badge Minted (Demo)",
        description: "Your signature has been recorded. In production, this would mint an NFT.",
      });
    } catch (error) {
      console.error('Minting error:', error);
      toast({
        title: "Minting Failed",
        description: "Signature rejected or failed.",
        variant: "destructive",
      });
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <Card className="p-6 md:p-8 space-y-4">
      <div className="flex items-center gap-3">
        <Wallet className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-semibold">Brave Wallet</h3>
      </div>

      {!walletAddress ? (
        <div className="space-y-3">
          <p className="text-muted-foreground">
            Connect your Brave Wallet to mint your achievement badge as a demo NFT.
          </p>
          <Button
            onClick={connectWallet}
            disabled={isConnecting}
            className="w-full"
            data-testid="button-connect-wallet"
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="text-sm font-medium">Connected</p>
              <p className="text-xs text-muted-foreground font-mono">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </p>
            </div>
            <Badge variant="outline">Active</Badge>
          </div>

          {score !== undefined && (
            <Button
              onClick={mintBadge}
              disabled={isMinting}
              className="w-full"
              data-testid="button-mint"
            >
              <Coins className="w-4 h-4 mr-2" />
              {isMinting ? "Minting..." : "Mint Badge (Demo)"}
            </Button>
          )}

          <p className="text-xs text-muted-foreground">
            This is a demo flow. Production would call an ERC-721 contract to mint the NFT on-chain.
          </p>
        </div>
      )}
    </Card>
  );
}

declare global {
  interface Window {
    ethereum?: any;
  }
}
