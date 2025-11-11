import ResultDisplay from '../ResultDisplay';
import { Toaster } from '@/components/ui/toaster';

export default function ResultDisplayExample() {
  return (
    <>
      <div className="max-w-2xl mx-auto p-6">
        <ResultDisplay
          score={18}
          maxScore={20}
          onRestart={() => console.log('Restart clicked')}
          onShare={() => console.log('Share clicked')}
        />
      </div>
      <Toaster />
    </>
  );
}
