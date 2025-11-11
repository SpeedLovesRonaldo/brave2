import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Share2, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BraveryMeter from "./BraveryMeter";
import Confetti from "./Confetti";
import { soundManager } from "@/utils/sounds";

import fearlessRebelBadge from "@assets/generated_images/Fearless_Rebel_badge_ed12adb7.png";
import boldStrategistBadge from "@assets/generated_images/Bold_Strategist_badge_a97b2f83.png";
import thoughtfulExplorerBadge from "@assets/generated_images/Thoughtful_Explorer_badge_8b256767.png";
import silentGuardianBadge from "@assets/generated_images/Silent_Guardian_badge_ce3a5ea3.png";

interface ResultDisplayProps {
  score: number;
  maxScore: number;
  onRestart: () => void;
  onShare: () => void;
}

const RESULT_TIERS = {
  fearless: {
    min: 16,
    title: "Fearless Rebel",
    message: "You don't just break the mold—you set it on fire. Your courage inspires revolutions, and your heart beats for truth, no matter the cost.",
    badge: fearlessRebelBadge,
    gradient: "from-red-500 via-primary to-orange-600",
  },
  bold: {
    min: 11,
    title: "Bold Strategist",
    message: "You measure risk with wisdom and act with precision. Your bravery is calculated, your impact undeniable, and your path purposeful.",
    badge: boldStrategistBadge,
    gradient: "from-primary via-orange-500 to-yellow-500",
  },
  thoughtful: {
    min: 6,
    title: "Thoughtful Explorer",
    message: "You navigate life with curiosity and care. Every step forward is deliberate, every risk considered. You're building courage brick by brick.",
    badge: thoughtfulExplorerBadge,
    gradient: "from-teal-400 via-cyan-400 to-blue-400",
  },
  silent: {
    min: 0,
    title: "Silent Guardian",
    message: "You protect what matters in the shadows. Bravery isn't always loud—sometimes it's the quiet strength to stay true to yourself.",
    badge: silentGuardianBadge,
    gradient: "from-purple-400 via-indigo-400 to-blue-500",
  },
};

export default function ResultDisplay({ score, maxScore, onRestart, onShare }: ResultDisplayProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [pulseGlow, setPulseGlow] = useState(true);

  const getResult = () => {
    if (score >= RESULT_TIERS.fearless.min) return RESULT_TIERS.fearless;
    if (score >= RESULT_TIERS.bold.min) return RESULT_TIERS.bold;
    if (score >= RESULT_TIERS.thoughtful.min) return RESULT_TIERS.thoughtful;
    return RESULT_TIERS.silent;
  };

  const result = getResult();

  useEffect(() => {
    if (score >= RESULT_TIERS.bold.min) {
      soundManager.celebrate();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      soundManager.success();
    }

    const glowInterval = setInterval(() => {
      setPulseGlow(prev => !prev);
    }, 2000);

    return () => clearInterval(glowInterval);
  }, [score]);

  const percentage = (score / maxScore) * 100;

  return (
    <>
      <Confetti active={showConfetti} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 md:p-8 space-y-6 relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${result.gradient} opacity-5`} />
          
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: pulseGlow
                ? `radial-gradient(circle at 50% 50%, rgba(251,84,43,0.1), transparent 70%)`
                : `radial-gradient(circle at 50% 50%, rgba(251,84,43,0.05), transparent 70%)`,
            }}
            transition={{ duration: 2 }}
          />

          <div className="relative z-10 space-y-6">
            <div className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <Trophy className="w-12 h-12 mx-auto text-primary drop-shadow-lg" />
              </motion.div>
              
              <motion.h2
                className={`text-2xl md:text-4xl font-bold bg-gradient-to-r ${result.gradient} bg-clip-text text-transparent`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {result.title}
              </motion.h2>
            </div>

            <BraveryMeter score={score} maxScore={maxScore} />

            <motion.div
              className="flex justify-center"
              data-testid="img-badge"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", delay: 0.5, stiffness: 100 }}
            >
              <div className="relative">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${result.gradient} blur-3xl opacity-50`}
                  animate={{
                    scale: pulseGlow ? 1.2 : 1,
                    opacity: pulseGlow ? 0.6 : 0.3,
                  }}
                  transition={{ duration: 2 }}
                />
                <img
                  src={result.badge}
                  alt={`${result.title} badge`}
                  className="relative w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl"
                />
              </div>
            </motion.div>

            <motion.p
              className="text-center text-base md:text-lg leading-relaxed"
              aria-live="polite"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {result.message}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
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
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </>
  );
}
