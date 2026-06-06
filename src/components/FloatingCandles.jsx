import { useMemo } from "react";

const PETALS = ["🌸", "🌸", "🌷", "🌸", "✿", "🌸", "🌸", "🌷", "🌸", "✿"];

export default function FloatingCandles() {
  const petals = useMemo(() => (
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: `${5 + i * 9.5}%`,
      size: 16 + (i % 3) * 6,
      duration: 9 + (i % 4) * 2.5,
      delay: -(i * 1.4),
      swayAmount: 10 + (i % 3) * 8,
      swayDuration: 2.2 + (i % 3) * 0.9,
      emoji: PETALS[i % PETALS.length],
    }))
  ), []);

  return (
    <>
      <style>{`
        @keyframes petalRiseFloat {
          0%   { opacity: 1;   transform: translateY(0) rotate(0deg) scale(1); }
          80%  { opacity: 0.5; }
          100% { opacity: 0;   transform: translateY(-115vh) rotate(300deg) scale(0.6); }
        }
        @keyframes petalSway {
          0%, 100% { margin-left: 0; }
          50%       { margin-left: var(--sway); }
        }
        .petal-outer {
          position: fixed;
          bottom: -60px;
          pointer-events: none;
          animation: petalRiseFloat linear infinite;
        }
        .petal-inner {
          animation: petalSway ease-in-out infinite;
        }
      `}</style>
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal-outer"
          style={{
            left: p.left,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            zIndex: 0,
          }}
        >
          <div
            className="petal-inner"
            style={{
              "--sway": `${p.swayAmount}px`,
              animationDuration: `${p.swayDuration}s`,
              animationDelay: `${p.delay * 0.5}s`,
            }}
          >
            {p.emoji}
          </div>
        </div>
      ))}
    </>
  );
}
