import { ExternalLink } from "lucide-react";

export default function Footer() {
  const links = [
    { name: "vibecheck.brave", url: "#" },
    { name: "highkey.brave", url: "#" },
    { name: "sigmaboy.brave", url: "#" },
  ];

  return (
    <footer className="border-t border-border mt-12 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-4">
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              data-testid={`link-${link.name}`}
            >
              {link.name}
              <ExternalLink className="w-3 h-3" />
            </a>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Built for .brave Site-Building Challenge — live on-chain
        </p>
      </div>
    </footer>
  );
}
