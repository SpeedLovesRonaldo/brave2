import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface BraveryMeterProps {
  score: number;
  maxScore: number;
}

export default function BraveryMeter({ score, maxScore }: BraveryMeterProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const percentage = (score / maxScore) * 100;

  useEffect(() => {
    const duration = 1000;
    const steps = 50;
    const increment = score / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  const getColor = () => {
    if (percentage >= 75) return "from-primary via-orange-500 to-red-500";
    if (percentage >= 50) return "from-orange-400 via-primary to-orange-600";
    if (percentage >= 25) return "from-yellow-500 via-orange-400 to-primary";
    return "from-blue-400 via-teal-400 to-cyan-400";
  };

  const getGlowColor = () => {
    if (percentage >= 75) return "shadow-[0_0_30px_rgba(251,84,43,0.6)]";
    if (percentage >= 50) return "shadow-[0_0_25px_rgba(251,84,43,0.5)]";
    if (percentage >= 25) return "shadow-[0_0_20px_rgba(251,84,43,0.4)]";
    return "shadow-[0_0_15px_rgba(142,243,197,0.4)]";
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-baseline">
        <h3 className="text-xl font-semibold">Bravery Score</h3>
        <motion.div 
          className="text-4xl font-bold bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.3 }}
          data-testid="text-score"
        >
          {displayScore}/{maxScore}
        </motion.div>
      </div>

      <div className="relative h-8 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getColor()} ${getGlowColor()} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-foreground drop-shadow-lg" data-testid="text-percentage">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 text-xs text-center">
        <div className={percentage >= 0 ? "text-foreground" : "text-muted-foreground"}>
          Silent
        </div>
        <div className={percentage >= 25 ? "text-foreground" : "text-muted-foreground"}>
          Thoughtful
        </div>
        <div className={percentage >= 50 ? "text-foreground" : "text-muted-foreground"}>
          Bold
        </div>
        <div className={percentage >= 75 ? "text-foreground" : "text-muted-foreground"}>
          Fearless
        </div>
      </div>

      <div className="hidden" data-testid="actual-score" data-score={score} data-max={maxScore} />
    </div>
  );
}
