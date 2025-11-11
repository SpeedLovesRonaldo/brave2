import { useState } from 'react';
import Confetti from '../Confetti';
import { Button } from '@/components/ui/button';

export default function ConfettiExample() {
  const [active, setActive] = useState(false);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Button onClick={() => setActive(true)}>
        Trigger Confetti
      </Button>
      <Confetti active={active} />
    </div>
  );
}
