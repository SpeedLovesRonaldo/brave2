import { Card } from "@/components/ui/card";
import { Shield, Globe, Wallet } from "lucide-react";

export default function BraveSection() {
  return (
    <Card className="p-6 md:p-8">
      <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center">
        How This Uses .brave
      </h3>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-3 text-center" data-testid="card-feature-ipfs">
          <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
            <Globe className="w-6 h-6 text-primary" />
          </div>
          <h4 className="font-semibold">IPFS Hosting</h4>
          <p className="text-sm text-muted-foreground">
            This site is hosted on IPFS, making it decentralized and censorship-resistant.
          </p>
        </div>

        <div className="space-y-3 text-center" data-testid="card-feature-domain">
          <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <h4 className="font-semibold">.brave Domain</h4>
          <p className="text-sm text-muted-foreground">
            Domain resolution via .brave on Polygon naming system for Web3 identity.
          </p>
        </div>

        <div className="space-y-3 text-center" data-testid="card-feature-wallet">
          <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
            <Wallet className="w-6 h-6 text-primary" />
          </div>
          <h4 className="font-semibold">Brave Wallet</h4>
          <p className="text-sm text-muted-foreground">
            Native Brave Wallet support for minting badges and managing your identity.
          </p>
        </div>
      </div>
    </Card>
  );
}
