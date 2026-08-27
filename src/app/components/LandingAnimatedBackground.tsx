import { useEffect, useRef, useState } from 'react';
import { useAppSettings } from '../context/AppSettings';

export const HERO_SLIDES = [
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504149922750-4d6b49f71155?w=1600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80&auto=format&fit=crop',
] as const;

type Variant = 'hero' | 'auth';

interface Props {
  className?: string;
  variant?: Variant;
  slideIndex?: number;
  onSlideIndexChange?: (index: number) => void;
}

export function LandingAnimatedBackground({
  className = '',
  variant = 'hero',
  slideIndex: slideIndexProp,
  onSlideIndexChange,
}: Props) {
  const { animations, reduceMotion } = useAppSettings();
  const motionEnabled = animations && !reduceMotion;
  const [internalSlideIndex, setInternalSlideIndex] = useState(0);
  const slideIndex = slideIndexProp ?? internalSlideIndex;
  const slideIndexRef = useRef(slideIndex);

  slideIndexRef.current = slideIndex;

  useEffect(() => {
    if (!motionEnabled) return;
    const id = window.setInterval(() => {
      const next = (slideIndexRef.current + 1) % HERO_SLIDES.length;
      if (onSlideIndexChange) onSlideIndexChange(next);
      else setInternalSlideIndex(next);
    }, 5500);
    return () => window.clearInterval(id);
  }, [motionEnabled, onSlideIndexChange]);

  const overlayClass =
    variant === 'auth'
      ? 'from-[#0F172A]/94 via-[#1a2332]/90 to-[#FF5A12]/42'
      : 'from-[#0F172A]/95 via-[#1a2332]/88 to-[#FF5A12]/45';

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {HERO_SLIDES.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            i === slideIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={src}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover ${motionEnabled ? 'landing-hero-slide' : ''}`}
          />
        </div>
      ))}

      <div className={`absolute inset-0 bg-gradient-to-br ${overlayClass}`} />
      <div
        className={`absolute inset-0 opacity-60 mix-blend-screen bg-gradient-to-tr from-teal-500/25 via-transparent to-amber-400/20 ${
          motionEnabled ? 'landing-gradient-drift' : ''
        }`}
      />

      {motionEnabled && (
        <>
          <div className="landing-orb absolute top-20 right-[10%] h-72 w-72 rounded-full bg-[#FF5A12]/30 blur-3xl" />
          <div className="landing-orb landing-orb-delay absolute bottom-10 left-[5%] h-96 w-96 rounded-full bg-teal-500/22 blur-3xl" />
          <div className="landing-orb absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-400/18 blur-3xl" />
        </>
      )}
    </div>
  );
}
