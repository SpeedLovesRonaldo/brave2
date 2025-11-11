import ResultDisplay from '../ResultDisplay';

export default function ResultDisplayExample() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <ResultDisplay
        score={7}
        maxScore={8}
        onRestart={() => console.log('Restart clicked')}
        onShare={() => console.log('Share clicked')}
      />
    </div>
  );
}
