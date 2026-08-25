import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  type: 'petal' | 'sparkle' | 'heart';
}

export default function FloatingPetals() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = [
      '#D0B6E1', // Komal's signature lilac/lavender
      '#E6D7F1', // Soft lilac white
      '#C49FD9', // Rich lilac
      '#B384D0', // Deep pastel purple
      '#FFFFFF', // Pure white
      '#FAF5FF', // Ivory shimmer
      '#7C3AED', // Royal violet touch
    ];

    const initialParticles: Particle[] = Array.from({ length: 26 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 14 + 10,
      speedY: Math.random() * 0.4 + 0.2,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      type: i % 4 === 0 ? 'heart' : i % 5 === 0 ? 'sparkle' : 'petal',
    }));

    setParticles(initialParticles);

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => {
          let nextY = p.y + p.speedY;
          let nextX = p.x + p.speedX + Math.sin(nextY * 0.05) * 0.15;
          let nextRot = p.rotation + p.rotationSpeed;

          if (nextY > 105) {
            nextY = -5;
            nextX = Math.random() * 100;
          }
          if (nextX > 105) nextX = -5;
          if (nextX < -5) nextX = 105;

          return {
            ...p,
            x: nextX,
            y: nextY,
            rotation: nextRot,
          };
        })
      );
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute transform transition-transform duration-75 ease-linear"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            transform: `rotate(${p.rotation}deg)`,
            opacity: p.opacity,
          }}
        >
          {p.type === 'heart' ? (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill={p.color}
              className="drop-shadow-sm filter"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : p.type === 'sparkle' ? (
            <svg
              width={p.size * 0.9}
              height={p.size * 0.9}
              viewBox="0 0 24 24"
              fill={p.color}
            >
              <polygon points="12,2 15,9 22,12 15,15 12,22 9,15 2,12 9,9" />
            </svg>
          ) : (
            // Delicate Rose Petal
            <svg
              width={p.size * 1.2}
              height={p.size * 1.4}
              viewBox="0 0 30 36"
              fill={p.color}
              className="drop-shadow-sm filter"
            >
              <path
                d="M15 0 C25 5 30 18 24 28 C19 36 11 36 6 28 C0 18 5 5 15 0 Z"
                opacity="0.85"
              />
              <path
                d="M15 4 C20 10 23 20 18 28"
                stroke="#ffffff"
                strokeWidth="1"
                fill="none"
                opacity="0.4"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
