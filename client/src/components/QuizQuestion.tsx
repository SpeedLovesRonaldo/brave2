import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface QuizQuestionProps {
  question: string;
  choices: { text: string; value: number }[];
  onAnswer: (value: number) => void;
}

export default function QuizQuestion({ question, choices, onAnswer }: QuizQuestionProps) {
  return (
    <Card className="p-6 md:p-8 space-y-6">
      <h2 className="text-xl md:text-2xl font-semibold text-center">{question}</h2>
      <div className="grid gap-3">
        {choices.map((choice, idx) => (
          <Button
            key={idx}
            variant="outline"
            size="lg"
            className="h-auto py-4 px-6 text-base hover-elevate active-elevate-2"
            onClick={() => onAnswer(choice.value)}
            data-testid={`button-choice-${idx}`}
          >
            {choice.text}
          </Button>
        ))}
      </div>
    </Card>
  );
}
