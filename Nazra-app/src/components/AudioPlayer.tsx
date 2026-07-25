import { useState, useRef, useEffect, useCallback } from 'react';
import { PlayIcon, PauseIcon, VolumeIcon, RefreshIcon } from './IslamicIcons';

interface AudioPlayerProps {
  src: string;
  arabicText: string;
  title?: string;
}

export function AudioPlayer({ src, arabicText, title }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isLooping, setIsLooping] = useState(false);
  const [useSpeech, setUseSpeech] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audioRef.current = audio;

    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration || 0));
    audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
    audio.addEventListener('ended', () => { if (!audio.loop) { setIsPlaying(false); setCurrentTime(0); } });
    audio.addEventListener('waiting', () => setIsLoading(true));
    audio.addEventListener('canplay', () => setIsLoading(false));
    audio.addEventListener('error', () => {
      // MP3 failed → fall back to Web Speech
      setIsLoading(false);
      setIsPlaying(false);
      setUseSpeech(true);
    });

    return () => {
      audio.pause();
      window.speechSynthesis?.cancel();
    };
  }, [src]);

  const speakArabic = useCallback((rate: number) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(arabicText);
    u.lang = 'ar-SA';
    u.rate = rate;
    u.onend = () => setIsPlaying(false);
    u.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(u);
    setIsPlaying(true);
  }, [arabicText]);

  const togglePlay = useCallback(async () => {
    if (useSpeech) {
      if (isPlaying) { window.speechSynthesis.cancel(); setIsPlaying(false); }
      else { speakArabic(playbackRate); }
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); setIsPlaying(false); }
    else {
      try {
        setIsLoading(true);
        await audio.play();
        setIsPlaying(true);
        setIsLoading(false);
      } catch {
        setIsLoading(false);
        setUseSpeech(true);
        speakArabic(playbackRate);
      }
    }
  }, [isPlaying, useSpeech, playbackRate, speakArabic]);

  const changeSpeed = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) audioRef.current.playbackRate = rate;
    if (useSpeech && isPlaying) speakArabic(rate);
  };

  const toggleLoop = () => {
    const next = !isLooping;
    setIsLooping(next);
    if (audioRef.current) audioRef.current.loop = next;
  };

  const restart = () => {
    if (useSpeech) { speakArabic(playbackRate); return; }
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setCurrentTime(v);
    if (audioRef.current) audioRef.current.currentTime = v;
  };

  const fmt = (s: number) => {
    if (!s || isNaN(s)) return '0:00';
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  };

  return (
    <div className="glass-panel p-4 sm:p-5 my-6 border border-mint-300/40 dark:border-gold-500/20">
      {/* Header row — icon + heading + speed all on one line */}
      <div className="flex items-center gap-2 mb-1">
        <div className="neu-badge w-8 h-8 sm:w-9 sm:h-9 text-gold-600 dark:text-gold-300 shrink-0">
          <VolumeIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
        <h4 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-ink-700 dark:text-parchment-200 whitespace-nowrap">
          Audio Recitation
        </h4>
        {useSpeech && (
          <span className="text-[9px] sm:text-[10px] bg-mint-500/10 text-mint-700 dark:text-gold-300 px-1.5 sm:px-2 py-0.5 rounded-full border border-mint-500/20 whitespace-nowrap">
            Voice
          </span>
        )}

        {/* Speed — inline on the same row as heading, pushed right */}
        <div className="flex items-center gap-0.5 sm:gap-1 bg-mint-100/60 dark:bg-charcoal-900/60 p-0.5 sm:p-1 rounded-xl ml-auto shrink-0">
          {[0.75, 1.0, 1.25].map(s => (
            <button key={s} onClick={() => changeSpeed(s)}
              className={`px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs rounded-lg font-medium transition-colors ${
                playbackRate === s
                  ? 'bg-mint-500 text-white dark:bg-gold-400 dark:text-charcoal-950 shadow-sm'
                  : 'text-ink-600 dark:text-parchment-300'
              }`}>{s}x</button>
          ))}
        </div>
      </div>

      {/* Title below the heading row */}
      {title && <p className="text-[10px] sm:text-xs text-mint-600 dark:text-gold-300 font-medium truncate mb-3">{title}</p>}

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Play/Pause */}
        <button onClick={togglePlay} disabled={isLoading}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="neu-badge w-12 h-12 bg-mint-500 text-white dark:bg-gold-400 dark:text-charcoal-950 hover:scale-105 active:scale-95 transition-transform shrink-0 shadow-md">
          {isLoading
            ? <div className="w-5 h-5 border-2 border-white dark:border-charcoal-950 border-t-transparent rounded-full animate-spin" />
            : isPlaying
              ? <PauseIcon className="w-5 h-5 fill-current" />
              : <PlayIcon className="w-5 h-5 fill-current ml-0.5" />
          }
        </button>

        {/* Progress / status */}
        <div className="flex-1 min-w-0">
          {useSpeech ? (
            <p className="text-xs text-ink-500 dark:text-parchment-400">
              {isPlaying
                ? <span className="flex items-center gap-1.5">
                    {[1,2,3,4,5].map(i => (
                      <span key={i} className="inline-block w-1 rounded-full bg-mint-500 dark:bg-gold-400 animate-bounce"
                        style={{ height: `${6 + (i % 3) * 4}px`, animationDelay: `${i * 0.1}s` }} />
                    ))}
                    <span className="ml-1 text-mint-700 dark:text-gold-300 font-semibold">Reciting…</span>
                  </span>
                : 'Tap ▶ to hear the Arabic recitation'}
            </p>
          ) : (
            <>
              <input type="range" min={0} max={duration || 100} value={currentTime} onChange={seek}
                className="w-full h-2 bg-mint-200/80 dark:bg-charcoal-700 rounded-lg appearance-none cursor-pointer accent-mint-600 dark:accent-gold-300" />
              <div className="flex justify-between text-[11px] text-ink-500 dark:text-parchment-400 font-mono mt-0.5">
                <span>{fmt(currentTime)}</span>
                <span>{fmt(duration)}</span>
              </div>
            </>
          )}
        </div>

        {/* Restart + Loop */}
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={restart} title="Restart"
            className="p-2 text-ink-500 dark:text-parchment-400 hover:text-mint-600 dark:hover:text-gold-300 transition-colors">
            <RefreshIcon className="w-4 h-4" />
          </button>
          {!useSpeech && (
            <button onClick={toggleLoop} title={isLooping ? 'Looping on' : 'Loop off'}
              className={`px-2 py-1 text-xs rounded-lg font-bold transition-colors ${
                isLooping
                  ? 'bg-mint-600/20 text-mint-700 dark:bg-gold-400/20 dark:text-gold-300 border border-mint-400/40'
                  : 'text-ink-400 dark:text-parchment-400 hover:text-ink-700'
              }`}>🔁</button>
          )}
        </div>
      </div>
    </div>
  );
}
