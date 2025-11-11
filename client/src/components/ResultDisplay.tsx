import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Share2, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

import braveLegendBadge from "@assets/generated_images/Brave_Legend_achievement_badge_21b83a6f.png";
import boldSpiritBadge from "@assets/generated_images/Bold_Spirit_achievement_badge_4bdb2daf.png";
import curiousBadge from "@assets/generated_images/Curious_Cautious_achievement_badge_c18e7583.png";
import cautiousBadge from "@assets/generated_images/Cautious_Starter_achievement_badge_cae60f66.png";

interface ResultDisplayProps {
  score: number;
  maxScore: number;
  onRestart: () => void;
  onShare: () => void;
}

const RESULT_TIERS = {
  legend: {
    min: 7,
    title: "Brave Legend",
    message: "You lead with courage. Wear this badge proudly.",
    badge: braveLegendBadge,
  },
  bold: {
    min: 5,
    title: "Bold Spirit",
    message: "You take bold steps often. Keep growing.",
    badge: boldSpiritBadge,
  },
  curious: {
    min: 3,
    title: "Curious & Cautious",
    message: "A thoughtful explorer — a brave heart in training.",
    badge: curiousBadge,
  },
  cautious: {
    min: 0,
    title: "Cautious Starter",
    message: "You choose comfort now — bravery can be built.",
    badge: cautiousBadge,
  },
};

export default function ResultDisplay({ score, maxScore, onRestart, onShare }: ResultDisplayProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  const getResult = () => {
    if (score >= RESULT_TIERS.legend.min) return RESULT_TIERS.legend;
    if (score >= RESULT_TIERS.bold.min) return RESULT_TIERS.bold;
    if (score >= RESULT_TIERS.curious.min) return RESULT_TIERS.curious;
    return RESULT_TIERS.cautious;
  };

  const result = getResult();

  useEffect(() => {
    if (score >= RESULT_TIERS.bold.min) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [score]);

  return (
    <Card className="p-6 md:p-8 space-y-6 relative overflow-hidden">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="animate-pulse absolute inset-0 bg-primary/5 rounded-lg" />
        </div>
      )}

      <div className="text-center space-y-4">
        <Trophy className="w-12 h-12 mx-auto text-primary" />
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{result.title}</h2>
          <Badge variant="secondary" className="text-base px-4 py-1">
            Score: {score}/{maxScore}
          </Badge>
        </div>
      </div>

      <div className="flex justify-center" data-testid="img-badge">
        <img
          src={result.badge}
          alt={`${result.title} badge`}
          className="w-48 h-48 md:w-64 md:h-64 object-contain animate-in zoom-in-50 duration-500"
        />
      </div>

      <p className="text-center text-base md:text-lg text-muted-foreground" aria-live="polite">
        {result.message}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          onClick={onShare}
          variant="default"
          className="flex-1"
          data-testid="button-share"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Result
        </Button>
        <Button
          onClick={onRestart}
          variant="outline"
          className="flex-1"
          data-testid="button-restart"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </div>
    </Card>
  );
}
