import { useEffect, useRef } from 'react';

interface Message {
  arabic: string;
  urdu: string;
  english: string;
  emoji: string;
}

interface CelebrationToastProps {
  message: Message;
  isMilestone: boolean;
  totalLearned: number;
  unit: string;
  onDismiss: () => void;
}

/** Generates random particle positions for the celebration burst */
function makeParticles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,        // % across the toast width
    delay: Math.random() * 0.6,    // stagger start
    duration: 1.4 + Math.random(), // each floats at different speed
    size: 10 + Math.floor(Math.random() * 14),
    char: ['✦', '☽', '✦', '⬟', '✦', '◆'][i % 6],
  }));
}

const PARTICLES = makeParticles(18);

export function CelebrationToast({
  message,
  isMilestone,
  totalLearned,
  unit,
  onDismiss,
}: CelebrationToastProps) {
  const toastRef = useRef<HTMLDivElement>(null);

  // Auto-dismiss on click / tap
  useEffect(() => {
    const el = toastRef.current;
    if (!el) return;
    el.addEventListener('click', onDismiss);
    return () => el.removeEventListener('click', onDismiss);
  }, [onDismiss]);

  return (
    <>
      {/* ── Backdrop for milestone celebrations only ── */}
      {isMilestone && (
        <div
          className="fixed inset-0 z-[90] bg-black/30 backdrop-blur-sm"
          style={{ animation: 'cel-fade-in 0.3s ease forwards' }}
          onClick={onDismiss}
        />
      )}

      {/* ── Toast ── */}
      <div
        ref={toastRef}
        role="status"
        aria-live="polite"
        className={`fixed z-[100] left-1/2 -translate-x-1/2 cursor-pointer select-none
          ${isMilestone ? 'top-1/2 -translate-y-1/2' : 'bottom-28 md:bottom-8'}
        `}
        style={{ animation: isMilestone
          ? 'cel-slide-up-center 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards'
          : 'cel-slide-up 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards'
        }}
      >
        <div
          className={`relative overflow-hidden rounded-3xl px-7 py-6 text-center shadow-2xl
            ${isMilestone
              ? 'bg-gradient-to-br from-amber-900/90 via-yellow-900/85 to-emerald-900/90 border border-yellow-400/40 min-w-[300px] max-w-[360px]'
              : 'bg-gradient-to-br from-emerald-900/90 via-teal-900/85 to-emerald-800/90 border border-emerald-400/30 min-w-[260px] max-w-[320px]'
            }
            backdrop-blur-xl
          `}
        >
          {/* ── Floating particles ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            {PARTICLES.map((p) => (
              <span
                key={p.id}
                className="absolute bottom-0 text-yellow-300/80 font-bold"
                style={{
                  left: `${p.x}%`,
                  fontSize: `${p.size}px`,
                  animationName: 'cel-particle-float',
                  animationDuration: `${p.duration}s`,
                  animationDelay: `${p.delay}s`,
                  animationTimingFunction: 'ease-out',
                  animationFillMode: 'forwards',
                  opacity: 0,
                }}
              >
                {p.char}
              </span>
            ))}
          </div>

          {/* ── Emoji burst ── */}
          <div
            className="text-4xl mb-2 leading-none"
            style={{ animation: 'cel-bounce 0.6s 0.2s cubic-bezier(0.34,1.56,0.64,1) both' }}
          >
            {message.emoji}
          </div>

          {/* ── Arabic praise ── */}
          <p
            dir="rtl"
            lang="ar"
            className="font-arabic text-2xl sm:text-3xl leading-loose text-yellow-200 mb-2"
            style={{ animation: 'cel-fade-up 0.4s 0.25s ease both' }}
          >
            {message.arabic}
          </p>

          {/* ── Urdu encouragement ── */}
          <p
            dir="rtl"
            lang="ur"
            className="font-urdu text-base leading-relaxed text-emerald-100 mb-1"
            style={{ animation: 'cel-fade-up 0.4s 0.38s ease both' }}
          >
            {message.urdu}
          </p>

          {/* ── English sub-text ── */}
          <p
            className="text-xs text-emerald-200/80 italic"
            style={{ animation: 'cel-fade-up 0.4s 0.48s ease both' }}
          >
            {message.english}
          </p>

          {/* ── Progress pill ── */}
          <div
            className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20"
            style={{ animation: 'cel-fade-up 0.4s 0.55s ease both' }}
          >
            <span className="text-yellow-300 text-xs">✦</span>
            <span className="text-xs text-white/80 font-medium">
              {totalLearned} {totalLearned === 1 ? unit : `${unit}s`} learnt
            </span>
            <span className="text-yellow-300 text-xs">✦</span>
          </div>

          {/* ── Tap to dismiss hint ── */}
          <p className="text-[10px] text-white/30 mt-3">tap to dismiss</p>
        </div>
      </div>
    </>
  );
}
