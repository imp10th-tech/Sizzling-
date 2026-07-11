import { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(onComplete, 500);
          }, 200);
          return 100;
        }
        return prev + 4;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#121212] transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Animated ring */}
      <div className="relative mb-8">
        <div className="w-28 h-28 rounded-full border-4 border-[#1a1a1a] flex items-center justify-center animate-pulse-glow">
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#FF6B00] animate-spin" style={{ animationDuration: '1s' }} />
          <div className="text-5xl">🍛</div>
        </div>
        {/* Orbiting dot */}
        <div
          className="absolute w-3 h-3 rounded-full bg-[#FF6B00] shadow-lg"
          style={{
            top: '50%',
            left: '50%',
            transformOrigin: '0 0',
            animation: 'spin-slow 2s linear infinite',
            marginLeft: '-6px',
            marginTop: '-54px',
          }}
        />
      </div>

      {/* Brand name */}
      <h1 className="text-4xl font-black tracking-widest shimmer-text mb-1">SIZZLING</h1>
      <p className="text-[#FF6B00]/70 text-sm tracking-widest uppercase mb-8">Where Every Bite Sizzles!</p>

      {/* Progress bar */}
      <div className="w-56 h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-100 ease-out"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #8B0000, #FF6B00)',
          }}
        />
      </div>
      <p className="text-white/30 text-xs mt-3">Loading experience...</p>
    </div>
  );
}
