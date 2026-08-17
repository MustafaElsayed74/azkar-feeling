'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, LoaderCircle, Pause, Play, Volume2 } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds <= 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleGlobalPlay = (event: Event) => {
      const customEvent = event as CustomEvent<{ src: string }>;
      if (customEvent.detail?.src !== src) {
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }
    };

    window.addEventListener('azkar-play-audio', handleGlobalPlay);
    return () => {
      window.removeEventListener('azkar-play-audio', handleGlobalPlay);
    };
  }, [src]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        setHasError(false);
        setIsLoading(true);

        window.dispatchEvent(
          new CustomEvent('azkar-play-audio', { detail: { src } }),
        );

        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.error('Audio play error:', err);
        setHasError(true);
        setIsPlaying(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="details-drawer my-3.5 p-3 sm:p-4">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
          setIsPlaying(false);
        }}
        preload="metadata"
      />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={togglePlay}
          disabled={hasError}
          className="theme-icon-wrap flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--butter)] text-[var(--ink)] transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
          aria-label={isPlaying ? 'إيقاف التلاوة' : 'تشغيل التلاوة'}
        >
          {isLoading ? (
            <LoaderCircle className="h-5 w-5 animate-spin text-[var(--ink)]" />
          ) : isPlaying ? (
            <Pause className="h-5 w-5 fill-current" />
          ) : (
            <Play className="mr-0.5 h-5 w-5 fill-current" />
          )}
        </button>

        <div className="flex-1 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-[var(--ink)]">
            <span className="flex items-center gap-1">
              <Volume2 className="h-3.5 w-3.5 text-[var(--muted)]" />
              <span>تلاوة سورة/دعاء</span>
            </span>
            <span className="font-mono text-xs dir-ltr">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="relative flex items-center">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              disabled={hasError || duration === 0}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[var(--border)] accent-[var(--lavender)] focus:outline-none"
              aria-label="مؤشر وقت التلاوة"
              style={{
                background: `linear-gradient(to right, var(--lavender) ${progressPercent}%, var(--border) ${progressPercent}%)`,
              }}
            />
          </div>
        </div>
      </div>

      {hasError && (
        <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>تعذر تحميل الملف الصوتي. يرجى التحقق من الاتصال.</span>
        </div>
      )}
    </div>
  );
};
