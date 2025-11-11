import BraveryMeter from '../BraveryMeter';

export default function BraveryMeterExample() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <BraveryMeter score={18} maxScore={20} />
      <BraveryMeter score={12} maxScore={20} />
      <BraveryMeter score={6} maxScore={20} />
    </div>
  );
}
