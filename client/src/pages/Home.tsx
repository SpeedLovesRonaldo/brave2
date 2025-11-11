import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import QuizQuestion from "@/components/QuizQuestion";
import QuizProgress from "@/components/QuizProgress";
import ResultDisplay from "@/components/ResultDisplay";
import WalletConnect from "@/components/WalletConnect";
import IPFSUpload from "@/components/IPFSUpload";
import BraveSection from "@/components/BraveSection";
import Footer from "@/components/Footer";
import { soundManager } from "@/utils/sounds";

const QUESTIONS = [
  {
    category: "Emotional",
    question: "Your best friend shares a secret that could hurt someone you care about. What do you do?",
    scenario: "You promised to keep it, but staying silent feels like betrayal to the other person.",
    choices: [
      { text: "Tell the truth, even if it costs the friendship", value: 2 },
      { text: "Find a way to hint without directly breaking trust", value: 1 },
      { text: "Keep the secret and hope it resolves itself", value: 0 },
    ],
  },
  {
    category: "Financial",
    question: "You have a stable job, but your dream startup idea needs your life savings and two years of your time.",
    scenario: "Success could change your life. Failure could set you back a decade.",
    choices: [
      { text: "Quit and go all-in on the dream", value: 2 },
      { text: "Work nights/weekends to build it while keeping the job", value: 1 },
      { text: "Keep the idea as a 'someday maybe' and stay safe", value: 0 },
    ],
  },
  {
    category: "Social",
    question: "Your social circle is mocking someone who's not there to defend themselves. You don't agree.",
    scenario: "Speaking up might make you the next target.",
    choices: [
      { text: "Call it out immediately, even if they turn on you", value: 2 },
      { text: "Change the subject or make a joke to diffuse it", value: 1 },
      { text: "Stay silent and feel guilty later", value: 0 },
    ],
  },
  {
    category: "Moral",
    question: "You witness a stranger being harassed in public. Others are watching but no one acts.",
    scenario: "Intervening could escalate the situation or put you at risk.",
    choices: [
      { text: "Step in directly and confront the harasser", value: 2 },
      { text: "Record it and call for help while staying nearby", value: 1 },
      { text: "Walk away but feel conflicted about it", value: 0 },
    ],
  },
  {
    category: "Privacy",
    question: "A major platform offers you $10,000 for lifetime access to your browsing data and location history.",
    scenario: "They promise it's 'anonymized' but you know better.",
    choices: [
      { text: "Reject it—privacy is priceless", value: 2 },
      { text: "Negotiate for better terms or limited access", value: 1 },
      { text: "Take the money—everyone's data is already sold anyway", value: 0 },
    ],
  },
  {
    category: "Emotional",
    question: "You made a huge mistake at work that no one else knows about. Confessing means risking your job.",
    scenario: "Hiding it might work, but living with the lie will eat at you.",
    choices: [
      { text: "Confess immediately and face the consequences", value: 2 },
      { text: "Fix it quietly if possible, confess only if discovered", value: 1 },
      { text: "Bury it and move on—survival first", value: 0 },
    ],
  },
  {
    category: "Financial",
    question: "You're offered insider information that could triple your investment with almost no risk of getting caught.",
    scenario: "It's technically illegal, but 'everyone does it' in this industry.",
    choices: [
      { text: "Report it to authorities and refuse the tip", value: 2 },
      { text: "Ignore the tip but don't report it", value: 1 },
      { text: "Use it—easy money is hard to turn down", value: 0 },
    ],
  },
  {
    category: "Social",
    question: "Your family expects you to follow a traditional path (career, marriage, etc.) but you want something radically different.",
    scenario: "Following your path means disappointing the people who raised you.",
    choices: [
      { text: "Live your truth unapologetically, even if it hurts them", value: 2 },
      { text: "Try to find a middle ground that honors both sides", value: 1 },
      { text: "Follow their plan to keep the peace", value: 0 },
    ],
  },
  {
    category: "Moral",
    question: "You discover your company is doing something unethical but legal. Whistleblowing means losing your career.",
    scenario: "Silence keeps you employed. Speaking up brands you a troublemaker.",
    choices: [
      { text: "Blow the whistle publicly, career be damned", value: 2 },
      { text: "Report it internally and hope leadership acts", value: 1 },
      { text: "Keep your head down—it's not your responsibility", value: 0 },
    ],
  },
  {
    category: "Privacy",
    question: "A government program promises 'total security' but requires biometric tracking and backdoor access to all devices.",
    scenario: "Opt-out means being flagged and restricted from certain services.",
    choices: [
      { text: "Refuse and accept the restrictions—freedom over convenience", value: 2 },
      { text: "Minimize participation while finding workarounds", value: 1 },
      { text: "Comply—fighting the system is futile", value: 0 },
    ],
  },
];

const RESULT_TIERS = [
  { min: 16, title: "Fearless Rebel" },
  { min: 11, title: "Bold Strategist" },
  { min: 6, title: "Thoughtful Explorer" },
  { min: 0, title: "Silent Guardian" },
];

export default function Home() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [resultTitle, setResultTitle] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [backgroundGradient, setBackgroundGradient] = useState(0);

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

    const gradientInterval = setInterval(() => {
      setBackgroundGradient(prev => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(gradientInterval);
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
        text: `I scored ${score}/20 on the Brave quiz! I'm a ${resultTitle}!`,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Share link copied to clipboard!');
    }
  };

  const toggleSound = () => {
    const newState = soundManager.toggle();
    setSoundEnabled(newState);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#071023] via-[#0B1220] to-[#071023] transition-all duration-1000"
        style={{
          filter: `hue-rotate(${backgroundGradient}deg)`,
        }}
      />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,84,43,0.08),transparent_50%)]" />
      
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSound}
            className="rounded-full"
            data-testid="button-toggle-sound"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </Button>
        </div>

        {!quizStarted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 md:p-12 space-y-6 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-orange-500/5" />
              
              <motion.div
                className="relative z-10 space-y-6"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.h1
                  className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent"
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{ backgroundSize: '200% auto' }}
                  data-testid="text-title"
                >
                  Are You Really Brave?
                </motion.h1>
                
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Face 10 deep life scenarios that test your emotional courage, financial risk tolerance, 
                  social bravery, moral strength, and privacy awareness. No easy answers. Just truth.
                </p>

                <div className="flex flex-wrap justify-center gap-2 text-xs">
                  {['Emotional', 'Financial', 'Social', 'Moral', 'Privacy'].map((cat) => (
                    <span key={cat} className="px-3 py-1 bg-secondary rounded-full">
                      {cat}
                    </span>
                  ))}
                </div>

                <Button
                  size="lg"
                  className="text-lg px-8 py-6 h-auto mt-4 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                  onClick={() => {
                    soundManager.click();
                    setQuizStarted(true);
                  }}
                  data-testid="button-start-quiz"
                >
                  Begin Your Journey
                </Button>
              </motion.div>
            </Card>
          </motion.div>
        ) : !showResult ? (
          <div className="space-y-6">
            <QuizProgress current={currentQuestion + 1} total={QUESTIONS.length} />
            
            <AnimatePresence mode="wait">
              <QuizQuestion
                key={currentQuestion}
                question={QUESTIONS[currentQuestion].question}
                scenario={QUESTIONS[currentQuestion].scenario}
                category={QUESTIONS[currentQuestion].category}
                choices={QUESTIONS[currentQuestion].choices}
                onAnswer={handleAnswer}
              />
            </AnimatePresence>
          </div>
        ) : (
          <div className="space-y-6">
            <ResultDisplay
              score={score}
              maxScore={20}
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
