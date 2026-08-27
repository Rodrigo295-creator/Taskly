import type { PlanTierId } from '@/data/plans';

/** Emblemas exibidos ao lado do nome do profissional conforme o plano */

interface Props {
  tier: PlanTierId;
  size?: number;
  className?: string;
}

export function PlanBadge({ tier, size = 28, className = '' }: Props) {
  if (tier === 'basic') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        className={className}
        aria-hidden
      >
        <circle cx="16" cy="16" r="15" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="11" fill="#F8FAFC" />
        <path
          d="M16 8l1.8 3.6 4 .6-2.9 2.8.7 4L16 17.8 12.4 19l.7-4-2.9-2.8 4-.6L16 8z"
          fill="#64748B"
        />
        <text x="16" y="27" textAnchor="middle" fill="#475569" fontSize="5" fontWeight="800" fontFamily="system-ui">
          B
        </text>
      </svg>
    );
  }

  if (tier === 'pro') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        className={className}
        aria-hidden
      >
        <circle cx="16" cy="16" r="15" fill="#FFF0E6" stroke="#FF5A12" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="11" fill="#FFF7ED" />
        <path
          d="M16 7l2.2 4.5 5 .7-3.6 3.5.9 5L16 18.2 11.5 20.7l.9-5-3.6-3.5 5-.7L16 7z"
          fill="#FF5A12"
        />
        <circle cx="16" cy="16" r="3" fill="#E04E0E" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="premium-badge-grad" x1="4" y1="4" x2="28" y2="28">
          <stop stopColor="#FDE68A" />
          <stop offset="0.5" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="15" fill="url(#premium-badge-grad)" stroke="#B45309" strokeWidth="1.5" />
      <path
        d="M16 6l2.5 5 5.5.8-4 3.9 1 5.6L16 18.5 11 21.3l1-5.6-4-3.9 5.5-.8L16 6z"
        fill="#FFFBEB"
      />
      <path d="M12 22h8l-1 4h-6l-1-4z" fill="#FFFBEB" />
      <circle cx="16" cy="15" r="2.5" fill="#B45309" />
    </svg>
  );
}
