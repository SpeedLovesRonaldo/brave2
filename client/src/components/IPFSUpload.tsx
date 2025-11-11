import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Database, Copy, ExternalLink, Upload } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface IPFSUploadProps {
  score: number;
  resultTitle: string;
}

export default function IPFSUpload({ score, resultTitle }: IPFSUploadProps) {
  const [cid, setCid] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const uploadToIPFS = async () => {
    setIsUploading(true);

    const snapshot = {
      title: "Brave Badge Achievement",
      result: resultTitle,
      score: score,
      date: new Date().toISOString(),
      platform: "areyoureally.brave",
    };

    setTimeout(() => {
      const mockCid = `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
      setCid(mockCid);
      setIsUploading(false);
      
      toast({
        title: "Uploaded to IPFS (Demo)",
        description: "Your result has been saved. This is a simulated CID.",
      });
    }, 1500);
  };

  const copyCid = () => {
    if (cid) {
      navigator.clipboard.writeText(`ipfs://${cid}`);
      toast({
        title: "Copied!",
        description: "IPFS CID copied to clipboard",
      });
    }
  };

  return (
    <Card className="p-6 md:p-8 space-y-4">
      <div className="flex items-center gap-3">
        <Database className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-semibold">Save to IPFS</h3>
      </div>

      <p className="text-muted-foreground">
        Store your bravery score permanently on the decentralized web using IPFS.
      </p>

      {!cid ? (
        <Button
          onClick={uploadToIPFS}
          disabled={isUploading}
          className="w-full"
          data-testid="button-upload-ipfs"
        >
          <Upload className="w-4 h-4 mr-2" />
          {isUploading ? "Uploading..." : "Upload Result to IPFS"}
        </Button>
      ) : (
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">IPFS CID</label>
            <div className="flex gap-2">
              <Input
                value={`ipfs://${cid}`}
                readOnly
                className="font-mono text-sm"
                data-testid="input-cid"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={copyCid}
                data-testid="button-copy-cid"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.open(`https://ipfs.io/ipfs/${cid}`, '_blank')}
            data-testid="button-view-ipfs"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View on IPFS Gateway
          </Button>

          <p className="text-xs text-muted-foreground">
            Note: This is a demo CID. Production would use web3.storage or nft.storage for real IPFS uploads.
          </p>
        </div>
      )}
    </Card>
  );
}
