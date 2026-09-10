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

  /* Teal green + sky blue orbs on cool white / deep navy */
  const orbGreen = soft ? 'bg-[#0D9488]/12' : 'bg-[#0D9488]/16';
  const orbBlue = soft ? 'bg-sky-500/10' : 'bg-sky-500/14';
  const orbMint = soft ? 'bg-emerald-400/10' : 'bg-emerald-400/14';

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden z-0 ${className}`}
    >
      {isDark ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#0c1a22]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0D9488]/[0.1] via-transparent to-sky-500/[0.08]" />
          {motionEnabled && (
            <div className="absolute inset-0 opacity-20 mix-blend-screen bg-gradient-to-tr from-emerald-500/14 via-transparent to-sky-400/12 app-gradient-drift" />
          )}
          <div className={`app-orb absolute -top-20 right-[6%] w-[22rem] h-[22rem] rounded-full blur-3xl ${orbGreen}`} />
          <div className={`app-orb app-orb-delay absolute bottom-0 left-[2%] w-96 h-96 rounded-full blur-3xl ${orbBlue}`} />
          <div className={`absolute top-[38%] left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-3xl ${orbMint}`} />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFFFFF] via-[#F4FBFA] to-[#EAF4FB]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0D9488]/[0.06] via-transparent to-sky-400/[0.07]" />
          {motionEnabled && (
            <div className="absolute inset-0 opacity-40 bg-gradient-to-tr from-emerald-100/50 via-transparent to-sky-100/40 app-gradient-drift" />
          )}
          <div className={`app-orb absolute -top-24 right-[4%] w-[26rem] h-[26rem] rounded-full blur-3xl ${orbGreen}`} />
          <div className={`app-orb app-orb-delay absolute bottom-8 left-[1%] w-80 h-80 rounded-full blur-3xl bg-sky-300/16`} />
          <div className="absolute top-[42%] right-[18%] w-64 h-64 rounded-full blur-3xl bg-emerald-200/25" />
        </>
      )}
    </div>
  );
}
