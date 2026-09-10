import type { ElementType, ReactNode } from 'react';
import { ChevronRight, Check } from 'lucide-react';
import { useAppSettings } from '../../context/AppSettings';

export function SettingsPageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="w-full min-h-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-5 sm:py-8 pb-28 lg:pb-14 max-w-full overflow-x-hidden">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white break-words">
            {title}
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">{subtitle}</p>
        </header>
        {children}
      </div>
    </div>
  );
}

export function Section({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="mb-6 sm:mb-8 min-w-0 w-full">
      <div className="mb-3 px-0.5">
        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 break-words">{title}</h2>
        {description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed break-words">{description}</p>
        )}
      </div>
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/85 dark:bg-slate-900/70 backdrop-blur-sm shadow-sm divide-y divide-slate-100 dark:divide-slate-800 min-w-0 w-full overflow-hidden">
        {children}
      </div>
    </section>
  );
}

export function Row({
  icon: Icon,
  label,
  sublabel,
  right,
  onClick,
  disabled,
  color = 'text-[#0D9488]',
}: {
  icon: ElementType;
  label: string;
  sublabel?: string;
  right?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  color?: string;
}) {
  const { t } = useAppSettings();
  const interactive = Boolean(onClick) && !disabled;
  const Tag = interactive ? 'button' : 'div';
  const soonBadge = (
    <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full shrink-0">
      {t('settings.rowSoon')}
    </span>
  );
  return (
    <Tag
      type={interactive ? 'button' : undefined}
      onClick={interactive ? onClick : undefined}
      aria-disabled={disabled || undefined}
      className={`flex flex-col gap-3 sm:flex-row sm:items-center w-full min-w-0 px-4 py-4 sm:py-3.5 text-left transition-colors ${
        interactive
          ? 'hover:bg-slate-50 dark:hover:bg-white/5 active:bg-slate-100 dark:active:bg-white/10 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0D9488]'
          : disabled
            ? 'opacity-70 cursor-default'
            : ''
      }`}
    >
      <div className="flex items-start gap-3 flex-1 min-w-0 w-full">
        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 ${color}`}>
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 break-words">{label}</p>
          {sublabel ? (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 break-words leading-relaxed">{sublabel}</p>
          ) : null}
        </div>
      </div>
      <div className="flex shrink-0 items-center justify-end w-full sm:w-auto pl-12 sm:pl-0">
        {right ?? (disabled ? soonBadge : interactive ? <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600" /> : null)}
      </div>
    </Tag>
  );
}

export function ToggleRow({
  icon: Icon,
  label,
  sublabel,
  value,
  onChange,
  color = 'text-[#0D9488]',
}: {
  icon: ElementType;
  label: string;
  sublabel?: string;
  value: boolean;
  onChange: (v: boolean) => void;
  color?: string;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center w-full min-w-0 px-4 py-4 sm:py-3.5">
      <div className="flex items-start gap-3 flex-1 min-w-0 w-full">
        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 ${color}`}>
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div className="flex-1 min-w-0 pr-0 sm:pr-2">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 break-words">{label}</p>
          {sublabel && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed break-words">{sublabel}</p>
          )}
        </div>
      </div>
      <div className="flex shrink-0 justify-end w-full sm:w-auto pl-12 sm:pl-0">
        <Toggle value={value} onChange={onChange} />
      </div>
    </div>
  );
}

export function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  const { touchTargets } = useAppSettings();
  const track = touchTargets ? 'w-14 h-8' : 'w-11 h-6';
  const thumb = touchTargets ? 'w-6 h-6' : 'w-5 h-5';
  const thumbOn = touchTargets ? 'translate-x-6' : 'translate-x-5';

  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`settings-toggle relative rounded-full transition-colors shrink-0 ${track} ${
        value ? 'bg-[#0D9488]' : 'bg-slate-200 dark:bg-slate-700'
      }`}
      aria-pressed={value}
      aria-label={value ? 'Ativado' : 'Desativado'}
    >
      <span
        className={`absolute top-0.5 left-0.5 bg-white rounded-full shadow transition-transform ${thumb} ${
          value ? thumbOn : 'translate-x-0'
        }`}
      />
    </button>
  );
}

export function ChipSelect<T extends string>({
  options,
  value,
  onChange,
  className = '',
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
}) {
  const cols =
    options.length >= 3
      ? 'grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3'
      : options.length === 2
        ? 'grid-cols-1 min-[360px]:grid-cols-2'
        : 'grid-cols-1';

  return (
    <div className={`grid ${cols} gap-2 min-w-0 w-full ${className}`}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`w-full min-w-0 px-3 py-2.5 sm:py-2 rounded-xl sm:rounded-full text-xs sm:text-sm font-medium border transition-colors text-center break-words leading-snug ${
            value === opt.value
              ? 'border-[#0D9488] bg-[#ECFDF5] text-[#0D9488] dark:bg-[#0D9488]/15 dark:text-[#0D9488]'
              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:bg-white/5 active:bg-slate-50 dark:active:bg-white/10'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function InlineBlock({
  title,
  icon: Icon,
  iconColor = 'text-amber-500',
  children,
  description,
}: {
  title: string;
  icon: ElementType;
  iconColor?: string;
  children: ReactNode;
  description?: string;
}) {
  return (
    <div className="px-4 py-4 sm:py-5 min-w-0 w-full">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-3 mb-3 sm:mb-4">
        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 ${iconColor}`}>
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 break-words">{title}</p>
          {description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed break-words">{description}</p>
          )}
        </div>
      </div>
      <div className="min-w-0 w-full max-w-full">{children}</div>
    </div>
  );
}

export function Subsection({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <div className="px-4 py-4 sm:py-5 border-t border-slate-100 dark:border-slate-800 min-w-0 w-full">
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider break-words">{title}</p>
      {description && (
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 mb-3 leading-relaxed break-words">{description}</p>
      )}
      {!description && <div className="mb-3" />}
      <div className="min-w-0 w-full">{children}</div>
    </div>
  );
}

export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const { t } = useAppSettings();
  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">{title}</h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm font-medium">
            {t('common.close')}
          </button>
        </div>
        <div className="overflow-y-auto flex-1 min-h-0 px-6 py-4" style={{ scrollbarWidth: 'thin' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function SavedBanner({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-medium px-3 py-2.5 rounded-xl break-words">
      <Check className="w-4 h-4 shrink-0" /> {message}
    </div>
  );
}
