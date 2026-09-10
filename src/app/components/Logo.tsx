import { useId } from 'react';
import { useAppSettings } from '../context/AppSettings';

type MarkTone = 'brand' | 'onDark' | 'mono';

interface LogoMarkProps {
  size?: number;
  /** brand = teal→sky fill; onDark = same on dark UIs; mono = frosted white mark */
  tone?: MarkTone;
  className?: string;
}

/** Modern squircle mark: teal→sky gradient fill + white check. */
export function LogoMark({ size = 40, tone = 'brand', className = '' }: LogoMarkProps) {
  const uid = useId().replace(/:/g, '');
  const gradId = `taskly-mark-${uid}`;
  const glowId = `taskly-glow-${uid}`;

  const fill = tone === 'mono' ? 'rgba(255,255,255,0.14)' : `url(#${gradId})`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="4" y1="2" x2="36" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0D9488" />
          <stop offset="0.55" stopColor="#14B8A6" />
          <stop offset="1" stopColor="#0EA5E9" />
        </linearGradient>
        <radialGradient
          id={glowId}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(30 32) rotate(-90) scale(18)"
        >
          <stop stopColor="#FFFFFF" stopOpacity="0.22" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="40" height="40" rx="11.5" fill={fill} />
      {tone !== 'mono' && <rect width="40" height="40" rx="11.5" fill={`url(#${glowId})`} />}
      <rect
        x="1.15"
        y="1.15"
        width="37.7"
        height="37.7"
        rx="10.4"
        stroke="white"
        strokeOpacity={tone === 'mono' ? 0.28 : 0.22}
        strokeWidth="1.15"
      />

      <path
        d="M11.2 20.6 L17.4 26.6 L29.2 12.8"
        stroke="#FFFFFF"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="29.2" cy="12.8" r="2.35" fill="#FFFFFF" />
      <circle cx="29.2" cy="12.8" r="1.05" fill="#BAE6FD" fillOpacity="0.95" />
    </svg>
  );
}

export function Logo({
  size = 40,
  showTagline = true,
  tone,
}: {
  size?: number;
  showTagline?: boolean;
  tone?: MarkTone;
}) {
  const { resolvedTheme, t } = useAppSettings();
  const isDark = resolvedTheme === 'dark';
  const markTone = tone ?? (isDark ? 'onDark' : 'brand');

  return (
    <div className="flex items-center gap-3 select-none">
      <LogoMark size={size} tone={markTone} />
      <div className="flex flex-col leading-none gap-1">
        <BrandName size={size >= 48 ? 'lg' : 'md'} onDark={isDark} />
        {showTagline && (
          <span
            className={`text-[9px] font-semibold uppercase tracking-[0.2em] ${
              isDark ? 'text-sky-200/55' : 'text-slate-400'
            }`}
          >
            {t('brand.tagline')}
          </span>
        )}
      </div>
    </div>
  );
}

export function BrandName({
  size = 'md',
  onDark = false,
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg';
  onDark?: boolean;
  className?: string;
}) {
  const { resolvedTheme } = useAppSettings();
  const isDark = onDark || resolvedTheme === 'dark';

  const sizeClass =
    size === 'lg' ? 'text-[26px]' : size === 'sm' ? 'text-base' : 'text-lg';

  return (
    <span className={`font-black tracking-[-0.03em] leading-none ${sizeClass} ${className}`}>
      <span className="text-[#0D9488]">Task</span>
      <span className={isDark ? 'text-sky-400' : 'text-[#0284C7]'}>ly</span>
    </span>
  );
}
