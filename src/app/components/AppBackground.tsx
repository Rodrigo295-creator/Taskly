import { useAppSettings } from '../context/AppSettings';

type AppBackgroundVariant = 'app' | 'panel';

interface Props {
  variant?: AppBackgroundVariant;
  className?: string;
}

export function AppBackground({ variant = 'app', className = '' }: Props) {
  const { resolvedTheme, animations, reduceMotion } = useAppSettings();
  const isDark = resolvedTheme === 'dark';
  const motionEnabled = animations && !reduceMotion;
  const soft = variant === 'app';

  /* Coral + teal complementary orbs — same family as brand + category chips */
  const orbBrand = soft ? 'bg-[#FF5A12]/12' : 'bg-[#FF5A12]/16';
  const orbTeal = soft ? 'bg-teal-500/8' : 'bg-teal-500/12';
  const orbAmber = soft ? 'bg-amber-400/8' : 'bg-amber-400/12';

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {isDark ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#111827]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5A12]/[0.09] via-transparent to-teal-500/[0.06]" />
          {motionEnabled && (
            <div className="absolute inset-0 opacity-20 mix-blend-screen bg-gradient-to-tr from-amber-500/14 via-transparent to-teal-400/10 app-gradient-drift" />
          )}
          <div className={`app-orb absolute -top-20 right-[6%] w-[22rem] h-[22rem] rounded-full blur-3xl ${orbBrand}`} />
          <div className={`app-orb app-orb-delay absolute bottom-0 left-[2%] w-96 h-96 rounded-full blur-3xl ${orbTeal}`} />
          <div className={`absolute top-[38%] left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-3xl ${orbAmber}`} />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#F6F3EF] via-[#F3EEE8] to-[#E8F0F0]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5A12]/[0.07] via-transparent to-teal-400/[0.06]" />
          {motionEnabled && (
            <div className="absolute inset-0 opacity-35 bg-gradient-to-tr from-orange-100/40 via-transparent to-teal-100/30 app-gradient-drift" />
          )}
          <div className={`app-orb absolute -top-24 right-[4%] w-[26rem] h-[26rem] rounded-full blur-3xl ${orbBrand}`} />
          <div className={`app-orb app-orb-delay absolute bottom-8 left-[1%] w-80 h-80 rounded-full blur-3xl bg-teal-300/14`} />
          <div className="absolute top-[42%] right-[18%] w-64 h-64 rounded-full blur-3xl bg-amber-200/22" />
        </>
      )}
    </div>
  );
}
