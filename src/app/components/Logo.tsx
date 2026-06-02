import { useAppSettings } from '../context/AppSettings';

const LOGO_SRC = '/taskly-logo.png';

export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <img
      src={LOGO_SRC}
      alt=""
      width={size}
      height={size}
      className="shrink-0 rounded-[22%] object-cover"
      draggable={false}
    />
  );
}

export function Logo() {
  const { resolvedTheme, t } = useAppSettings();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className="flex items-center gap-3 select-none">
      <LogoMark size={40} />
      <div className="flex flex-col leading-none gap-0.5">
        <BrandName size="md" onDark={isDark} />
        <span className={`text-[9px] font-semibold uppercase tracking-[0.18em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          {t('brand.tagline')}
        </span>
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
    <span className={`font-black tracking-tight leading-none ${sizeClass} ${className}`}>
      <span className="text-[#F97316]">Task</span>
      <span className={isDark ? 'text-white' : 'text-[#0F172A]'}>ly</span>
    </span>
  );
}
