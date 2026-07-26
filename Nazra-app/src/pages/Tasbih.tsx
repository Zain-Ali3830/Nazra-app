import { useState, useEffect, useCallback, useMemo } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useCelebrate } from '../context/CelebrationContext';
import { RefreshIcon, VolumeIcon, TasbihIcon } from '../components/IslamicIcons';

interface Dhikr {
  id: string;
  arabic: string;
  transliteration: string;
  translation_en: string;
  translation_ur: string;
}

const PREDEFINED_DHIKR: Dhikr[] = [
  {
    id: 'subhanallah',
    arabic: 'سُبْحَانَ اللَّهِ',
    transliteration: 'SubhanAllah',
    translation_en: 'Glory be to Allah',
    translation_ur: 'اللہ پاک ہے',
  },
  {
    id: 'alhamdulillah',
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Alhamdulillah',
    translation_en: 'Praise be to Allah',
    translation_ur: 'تمام تعریفیں اللہ ہی کے لیے ہیں',
  },
  {
    id: 'allahuakbar',
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar',
    translation_en: 'Allah is the Greatest',
    translation_ur: 'اللہ سب سے بڑا ہے',
  },
  {
    id: 'astaghfirullah',
    arabic: 'أَسْتَغْفِرُ اللَّهَ',
    transliteration: 'Astaghfirullah',
    translation_en: 'I seek forgiveness from Allah',
    translation_ur: 'میں اللہ سے مغفرت طلب کرتا ہوں',
  },
  {
    id: 'lailahaillallah',
    arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ',
    transliteration: 'La ilaha illallah',
    translation_en: 'There is no deity but Allah',
    translation_ur: 'اللہ کے سوا کوئی معبود نہیں',
  },
  {
    id: 'durood',
    arabic: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ',
    transliteration: 'Allahumma Salli Ala Muhammad',
    translation_en: 'O Allah, send blessings upon Muhammad',
    translation_ur: 'اے اللہ! محمد (صلی اللہ علیہ وسلم) پر رحمتیں نازل فرما',
  },
];

const TARGETS = [33, 99, 100, 0] as const; // 0 means continuous/infinity

export function Tasbih({ onBack }: { onBack: () => void }) {
  const celebrate = useCelebrate();

  // Load initial states from localStorage
  const [count, setCount] = useState(() => {
    try {
      const saved = localStorage.getItem('tasbih:count');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [selectedDhikrId, setSelectedDhikrId] = useState(() => {
    try {
      return localStorage.getItem('tasbih:selectedDhikrId') || 'subhanallah';
    } catch {
      return 'subhanallah';
    }
  });

  const [target, setTarget] = useState<typeof TARGETS[number]>(() => {
    try {
      const saved = localStorage.getItem('tasbih:target');
      return saved ? (parseInt(saved, 10) as any) : 33;
    } catch {
      return 33;
    }
  });

  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('tasbih:soundEnabled');
      return saved !== 'false';
    } catch {
      return true;
    }
  });

  const [vibrationEnabled, setVibrationEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('tasbih:vibrationEnabled');
      return saved !== 'false';
    } catch {
      return true;
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('tasbih:count', count.toString());
  }, [count]);

  useEffect(() => {
    localStorage.setItem('tasbih:selectedDhikrId', selectedDhikrId);
  }, [selectedDhikrId]);

  useEffect(() => {
    localStorage.setItem('tasbih:target', target.toString());
  }, [target]);

  useEffect(() => {
    localStorage.setItem('tasbih:soundEnabled', soundEnabled.toString());
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('tasbih:vibrationEnabled', vibrationEnabled.toString());
  }, [vibrationEnabled]);

  const selectedDhikr = useMemo(() => {
    return PREDEFINED_DHIKR.find((d) => d.id === selectedDhikrId) || PREDEFINED_DHIKR[0];
  }, [selectedDhikrId]);

  // Audio synthesis using Web Audio API
  const playClickSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(900, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      console.warn('Web Audio click sound failed', e);
    }
  }, [soundEnabled]);

  const playCompletionSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;

      const playTone = (freq: number, delay: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + delay);
        gain.gain.setValueAtTime(0, now + delay);
        gain.gain.linearRampToValueAtTime(0.12, now + delay + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + duration);
      };

      playTone(523.25, 0, 0.3); // C5
      playTone(659.25, 0.1, 0.3); // E5
      playTone(783.99, 0.2, 0.5); // G5
    } catch (e) {
      console.warn('Web Audio completion sound failed', e);
    }
  }, [soundEnabled]);

  const triggerVibration = useCallback((pattern: number | number[] = 20) => {
    if (vibrationEnabled && typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(pattern as any);
      } catch {
        // Ignored
      }
    }
  }, [vibrationEnabled]);

  // Core counter actions
  const increment = useCallback(() => {
    const nextCount = count + 1;
    setCount(nextCount);
    triggerVibration(15);
    playClickSound();

    // Check target hit
    if (target > 0 && nextCount === target) {
      // Trigger haptic sequence
      triggerVibration([50, 50, 100]);
      playCompletionSound();
      // Push celebration
      celebrate('tasbih:complete', true);
    }
  }, [count, target, playClickSound, playCompletionSound, triggerVibration, celebrate]);

  const decrement = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // prevent triggering increment
    if (count > 0) {
      setCount((c) => c - 1);
      triggerVibration(25);
      playClickSound();
    }
  }, [count, triggerVibration, playClickSound]);

  const reset = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // prevent triggering increment
    if (window.confirm('Do you want to reset the count to 0?')) {
      setCount(0);
      triggerVibration([30, 30]);
      playClickSound();
    }
  }, [triggerVibration, playClickSound]);

  // Calculate percentage progress for circular ring
  const strokeDashoffset = useMemo(() => {
    if (target === 0) return 0;
    const progress = count % target;
    const percentage = target > 0 ? (progress / target) * 100 : 0;
    const radius = 95;
    const circumference = 2 * Math.PI * radius;
    return circumference - (percentage / 100) * circumference;
  }, [count, target]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-28 md:pb-12">
      <PageHeader title_en="Tasbih Counter" title_ur="تسبيح کاؤنٹر" onBack={onBack} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Settings & Dhikr Selection Column */}
        <div className="md:col-span-1 flex flex-col gap-5">
          {/* Target Selector */}
          <div className="neu-surface p-5">
            <h2 className="text-sm font-semibold text-ink-800 dark:text-parchment-100 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-mint-500" />
              Target Limit / حد کا انتخاب
            </h2>
            <div className="grid grid-cols-4 gap-2">
              {TARGETS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTarget(t)}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                    target === t
                      ? 'shadow-neu-inset-sm dark:shadow-neu-dark-inset-sm text-mint-700 dark:text-gold-300'
                      : 'neu-surface-sm hover:scale-105 text-ink-600 dark:text-parchment-200'
                  }`}
                >
                  {t === 0 ? '∞' : t}
                </button>
              ))}
            </div>
          </div>

          {/* Device Feedback Settings */}
          <div className="neu-surface p-5">
            <h2 className="text-sm font-semibold text-ink-800 dark:text-parchment-100 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-mint-500" />
              Sound & Haptics / آواز اور وائبریشن
            </h2>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setSoundEnabled((v) => !v)}
                className={`w-full p-3 flex items-center justify-between rounded-xl transition-all ${
                  soundEnabled
                    ? 'shadow-neu-inset-sm dark:shadow-neu-dark-inset-sm text-mint-700 dark:text-gold-300'
                    : 'neu-surface-sm text-ink-600 dark:text-parchment-200'
                }`}
              >
                <span className="text-xs font-medium">Click Sound / کلک کی آواز</span>
                <VolumeIcon className={`w-4 h-4 ${soundEnabled ? 'opacity-100' : 'opacity-40'}`} />
              </button>

              <button
                onClick={() => setVibrationEnabled((v) => !v)}
                className={`w-full p-3 flex items-center justify-between rounded-xl transition-all ${
                  vibrationEnabled
                    ? 'shadow-neu-inset-sm dark:shadow-neu-dark-inset-sm text-mint-700 dark:text-gold-300'
                    : 'neu-surface-sm text-ink-600 dark:text-parchment-200'
                }`}
              >
                <span className="text-xs font-medium">Vibration / وائبریشن</span>
                <span className={`text-xs font-bold ${vibrationEnabled ? 'opacity-100' : 'opacity-40'}`}>
                  {vibrationEnabled ? 'ON' : 'OFF'}
                </span>
              </button>
            </div>
          </div>

          {/* Dhikr Selector */}
          <div className="neu-surface p-5 flex-1">
            <h2 className="text-sm font-semibold text-ink-800 dark:text-parchment-100 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-mint-500" />
              Select Dhikr / ذکر کا انتخاب
            </h2>
            <div className="flex flex-col gap-2 max-h-[250px] md:max-h-[350px] overflow-y-auto pr-1 no-scrollbar">
              {PREDEFINED_DHIKR.map((d) => (
                <button
                  key={d.id}
                  onClick={() => {
                    setSelectedDhikrId(d.id);
                    setCount(0);
                  }}
                  className={`w-full p-3 text-left rounded-xl transition-all flex flex-col gap-0.5 ${
                    selectedDhikrId === d.id
                      ? 'shadow-neu-inset-sm dark:shadow-neu-dark-inset-sm text-mint-700 dark:text-gold-300 border-l-4 border-mint-500'
                      : 'neu-surface-sm hover:scale-[1.01] text-ink-600 dark:text-parchment-200'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-xs font-semibold">{d.transliteration}</span>
                    <span dir="rtl" className="font-urdu text-sm font-medium leading-none text-right">
                      {d.arabic}
                    </span>
                  </div>
                  <span className="text-[10px] opacity-75 truncate">{d.translation_en}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Counter Display & Tap Button Column */}
        <div className="md:col-span-2 flex flex-col justify-center items-center">
          <div className="neu-surface w-full max-w-md p-6 sm:p-8 flex flex-col items-center gap-6 min-h-[450px] justify-between relative overflow-hidden">
            {/* Display of selected Dhikr phrase */}
            <div className="text-center w-full min-h-[110px] flex flex-col justify-center">
              <p dir="rtl" className="font-urdu text-3xl sm:text-4xl text-mint-700 dark:text-gold-300 mb-2 leading-relaxed">
                {selectedDhikr.arabic}
              </p>
              <p className="text-base font-semibold text-ink-800 dark:text-parchment-100">
                {selectedDhikr.transliteration}
              </p>
              <p className="text-xs text-ink-600 dark:text-parchment-300 mt-1">
                {selectedDhikr.translation_en}
              </p>
              <p dir="rtl" className="font-urdu text-xs text-mint-600 dark:text-gold-300/80 mt-0.5 leading-tight">
                {selectedDhikr.translation_ur}
              </p>
            </div>

            {/* Huge Interactive Tap Circle */}
            <button
              onClick={increment}
              aria-label="Tap to increment count"
              className="group relative w-52 h-52 sm:w-60 sm:h-60 rounded-full flex items-center justify-center transition-transform active:scale-[0.97] duration-100 outline-none select-none neu-surface hover:shadow-neu dark:hover:shadow-neu-dark cursor-pointer shadow-neu dark:shadow-neu-dark"
            >
              {/* Neumorphic Inset Ring inside */}
              <div className="absolute inset-4 rounded-full shadow-neu-inset dark:shadow-neu-dark-inset bg-mint-100 dark:bg-charcoal-800 flex flex-col items-center justify-center">
                {/* Count display */}
                <span className="text-4xl sm:text-5xl font-bold tracking-tight text-ink-800 dark:text-parchment-100 tabular-nums">
                  {count}
                </span>

                {/* Target progress label */}
                <span className="text-[10px] sm:text-xs font-semibold text-mint-700 dark:text-gold-300 uppercase tracking-widest mt-1 opacity-85">
                  {target > 0 ? `of ${target}` : 'Continuous'}
                </span>

                {/* Tap Hint */}
                <span className="text-[9px] text-ink-500 dark:text-parchment-400 mt-3 uppercase tracking-wider group-hover:opacity-100 opacity-60 transition-opacity">
                  Tap to Count
                </span>
              </div>

              {/* Progress SVG Ring around the circle */}
              {target > 0 && (
                <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="95"
                    className="w-52 h-52 sm:w-60 sm:h-60"
                    style={{
                      fill: 'transparent',
                      stroke: 'rgba(16, 185, 129, 0.2)', // transparent soft emerald
                      strokeWidth: '4',
                    }}
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="95"
                    className="w-52 h-52 sm:w-60 sm:h-60 transition-all duration-300"
                    style={{
                      fill: 'transparent',
                      stroke: '#10b981', // green-500
                      strokeWidth: '4.5',
                      strokeLinecap: 'round',
                      strokeDasharray: `${2 * Math.PI * 95}`,
                      strokeDashoffset: strokeDashoffset,
                    }}
                  />
                </svg>
              )}
            </button>

            {/* Quick Action Controls at Bottom */}
            <div className="flex justify-between w-full max-w-[280px] gap-4">
              <button
                onClick={decrement}
                disabled={count === 0}
                aria-label="Decrease count by one"
                className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all font-semibold text-xs ${
                  count === 0
                    ? 'opacity-40 cursor-not-allowed neu-surface-sm'
                    : 'neu-surface-sm hover:scale-105 active:shadow-neu-inset-sm text-ink-700 dark:text-parchment-200'
                }`}
              >
                <span>-1 Undo</span>
              </button>

              <button
                onClick={reset}
                aria-label="Reset count to zero"
                className="flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all font-semibold text-xs neu-surface-sm hover:scale-105 active:shadow-neu-inset-sm text-rose-600 dark:text-rose-400"
              >
                <RefreshIcon className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}