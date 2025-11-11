import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface QuizProgressProps {
  current: number;
  total: number;
}

export default function QuizProgress({ current, total }: QuizProgressProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm font-medium">
        <span className="text-foreground">Question {current} of {total}</span>
        <span className="text-primary">{Math.round(percentage)}%</span>
      </div>
      
      <div className="relative">
        <Progress value={percentage} className="h-3" data-testid="progress-quiz" />
        <motion.div
          className="absolute inset-0 h-3 rounded-full bg-gradient-to-r from-primary/20 to-orange-500/20 blur-sm pointer-events-none"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Building your bravery profile...</span>
        <span className="text-accent">{total - current} remaining</span>
      </div>
    </div>
  );
}
