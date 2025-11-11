import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { soundManager } from "@/utils/sounds";

interface QuizQuestionProps {
  question: string;
  scenario?: string;
  category: string;
  choices: { text: string; value: number }[];
  onAnswer: (value: number) => void;
}

export default function QuizQuestion({ question, scenario, category, choices, onAnswer }: QuizQuestionProps) {
  const handleChoice = (value: number) => {
    soundManager.click();
    onAnswer(value);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'emotional': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'financial': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'social': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'moral': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'privacy': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      default: return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 md:p-8 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-orange-500 to-primary opacity-50" />
        
        <div className="space-y-3">
          <Badge variant="outline" className={`${getCategoryColor(category)} border`}>
            {category}
          </Badge>
          
          <h2 className="text-xl md:text-2xl font-semibold leading-tight">
            {question}
          </h2>
          
          {scenario && (
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed italic border-l-2 border-primary/30 pl-4">
              {scenario}
            </p>
          )}
        </div>

        <div className="grid gap-3 pt-2">
          {choices.map((choice, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full h-auto py-4 px-6 text-left justify-start text-base hover-elevate active-elevate-2 transition-all duration-200"
                onClick={() => handleChoice(choice.value)}
                data-testid={`button-choice-${idx}`}
              >
                <span className="flex-1">{choice.text}</span>
                <span className="text-xs text-muted-foreground ml-2">
                  {choice.value === 2 ? '⚡⚡' : choice.value === 1 ? '⚡' : '○'}
                </span>
              </Button>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
