import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiProps {
  active: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
}

export default function Confetti({ active }: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    const colors = ['#FB542B', '#8EF3C5', '#FFA500', '#FFD700', '#FF6B6B'];
    const newParticles: Particle[] = [];

    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: -10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
      });
    }

    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
    }, 3000);

    return () => clearTimeout(timer);
  }, [active]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-sm"
            style={{
              backgroundColor: particle.color,
              left: `${particle.x}%`,
            }}
            initial={{
              y: -20,
              rotate: particle.rotation,
              scale: particle.scale,
              opacity: 1,
            }}
            animate={{
              y: window.innerHeight + 20,
              rotate: particle.rotation + 720,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 2 + Math.random() * 2,
              ease: "easeIn",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
