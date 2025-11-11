import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import QuizQuestion from "@/components/QuizQuestion";
import QuizProgress from "@/components/QuizProgress";
import ResultDisplay from "@/components/ResultDisplay";
import WalletConnect from "@/components/WalletConnect";
import IPFSUpload from "@/components/IPFSUpload";
import BraveSection from "@/components/BraveSection";
import Footer from "@/components/Footer";

const QUESTIONS = [
  {
    question: "Do you try new things often?",
    choices: [
      { text: "Always", value: 2 },
      { text: "Sometimes", value: 1 },
      { text: "Never", value: 0 },
    ],
  },
  {
    question: "Would you speak up when it matters?",
    choices: [
      { text: "Yes", value: 2 },
      { text: "Sometimes", value: 1 },
      { text: "No", value: 0 },
    ],
  },
  {
    question: "Do you prioritize learning over comfort?",
    choices: [
      { text: "Yes", value: 2 },
      { text: "Sometimes", value: 1 },
      { text: "No", value: 0 },
    ],
  },
  {
    question: "Would you stand alone for something right?",
    choices: [
      { text: "Yes", value: 2 },
      { text: "Maybe", value: 1 },
      { text: "No", value: 0 },
    ],
  },
];

const RESULT_TIERS = [
  { min: 7, title: "Brave Legend" },
  { min: 5, title: "Bold Spirit" },
  { min: 3, title: "Curious & Cautious" },
  { min: 0, title: "Cautious Starter" },
];

export default function Home() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [resultTitle, setResultTitle] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#result=')) {
      try {
        const encoded = hash.substring(8);
        const decoded = atob(encoded);
        const data = JSON.parse(decoded);
        setScore(data.score);
        setResultTitle(data.title);
        setShowResult(true);
        setQuizStarted(true);
      } catch (e) {
        console.error('Failed to parse shared result');
      }
    }
  }, []);

  const handleAnswer = (value: number) => {
    const newScore = score + value;
    setScore(newScore);

    if (currentQuestion < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      const result = RESULT_TIERS.find(tier => newScore >= tier.min) || RESULT_TIERS[RESULT_TIERS.length - 1];
      setResultTitle(result.title);
      setTimeout(() => {
        setShowResult(true);
      }, 300);
    }
  };

  const handleRestart = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setResultTitle("");
    window.location.hash = '';
  };

  const handleShare = () => {
    const data = { score, title: resultTitle };
    const encoded = btoa(JSON.stringify(data));
    const shareUrl = `${window.location.origin}${window.location.pathname}#result=${encoded}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Are You Really Brave?',
        text: `I scored ${score}/8 on the Brave quiz! I'm a ${resultTitle}!`,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Share link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071023] to-[#0B1220] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,84,43,0.03),transparent_50%)]" />
      
      <div className="relative z-10 container max-w-4xl mx-auto px-4 py-8 md:py-12">
        {!quizStarted ? (
          <Card className="p-8 md:p-12 space-y-6 text-center shadow-2xl">
            <h1 className="text-3xl md:text-5xl font-bold" data-testid="text-title">
              Are You Really Brave?
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Take this short 4-question challenge to discover your bravery score. Connect Brave Wallet to mint a demo Brave Badge and save your result on IPFS.
            </p>
            <Button
              size="lg"
              className="text-lg px-8 py-6 h-auto"
              onClick={() => setQuizStarted(true)}
              data-testid="button-start-quiz"
            >
              Start Challenge
            </Button>
          </Card>
        ) : !showResult ? (
          <div className="space-y-6">
            <QuizProgress current={currentQuestion + 1} total={QUESTIONS.length} />
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <QuizQuestion
                question={QUESTIONS[currentQuestion].question}
                choices={QUESTIONS[currentQuestion].choices}
                onAnswer={handleAnswer}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <ResultDisplay
              score={score}
              maxScore={8}
              onRestart={handleRestart}
              onShare={handleShare}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <WalletConnect score={score} />
              <IPFSUpload score={score} resultTitle={resultTitle} />
            </div>

            <BraveSection />
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}
