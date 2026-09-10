import { useEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import { Sparkles, SlidersHorizontal, Loader2 } from 'lucide-react';
import {
  AppSidebar,
  readSidebarCollapsed,
  writeSidebarCollapsed,
} from './components/AppSidebar';
import { AppTopBar } from './components/AppTopBar';
import { WebsiteFooter } from './components/WebsiteFooter';
import { Header } from './components/Header';
import { CategoryCard } from './components/CategoryCard';
import { ProfessionalCard } from './components/ProfessionalCard';
import { ActiveOrderStatus } from './components/ActiveOrderStatus';
import { BottomNavigation } from './components/BottomNavigation';
import { SearchScreen } from './components/SearchScreen';
import { ChatScreen } from './components/ChatScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { HowItWorksScreen } from './components/HowItWorksScreen';
import { ProDashboard } from './components/ProDashboard';
import { ProChatScreen } from './components/ProChatScreen';
import { ProHistoryScreen } from './components/ProHistoryScreen';
import { ProFinancialScreen } from './components/ProFinancialScreen';
import { ProContractsScreen } from './components/ProContractsScreen';
import { ProReviewsScreen } from './components/ProReviewsScreen';
import { AccountScreen } from './components/AccountScreen';
import { SettingsScreen, screenToSettingsTab } from './components/SettingsScreen';
import { AuthScreen } from './components/AuthScreen';
import { LandingPage } from './components/LandingPage';
import { AppSettingsProvider, useAppSettings } from './context/AppSettings';
import { PlansScreen } from './components/PlansScreen';
import { OrdersScreen } from './components/OrdersScreen';
import { OpportunitiesScreen } from './components/OpportunitiesScreen';
import { FavoritesScreen } from './components/FavoritesScreen';
import { ClientReviewsScreen } from './components/ClientReviewsScreen';
import { HelpScreen } from './components/HelpScreen';
import { AgendaScreen } from './components/AgendaScreen';
import { TrustScreen } from './components/TrustScreen';
import { TermsOfUseScreen } from './components/TermsOfUseScreen';
import { PrivacyPolicyScreen } from './components/PrivacyPolicyScreen';
import {
  clearAuthSession,
  consumeForceLoginQuery,
  readAuthSession,
  setLoginIntent,
  writeAuthSession,
  type AuthSession,
  type AuthUserType,
} from '@/lib/auth-session';
import {
  getSupabaseAuthSession,
  sessionFromSupabaseUser,
  signOutSupabase,
  ensureOAuthUserType,
  enrichSessionWithProfile,
  supabaseConfigured,
} from '@/lib/auth-supabase';
import { supabase } from '@/lib/supabase';
import { AppBackground } from './components/AppBackground';
import { BrandName } from './components/Logo';
import { useCategories } from '@/hooks/useCategories';
import { useProfessionals } from '@/hooks/useProfessionals';
import { startConversation } from '@/hooks/useChat';

const STANDALONE_SCREENS = new Set([
  'account',
  'plans',
  'orders',
  'opportunities',
  'help',
  'favorites',
  'agenda',
  'client-reviews',
  'trust',
  'terms-of-use',
  'privacy-policy',
]);

function isStandaloneScreen(screen: string) {
  return STANDALONE_SCREENS.has(screen) || screen.startsWith('settings-');
}


function AppInner() {
  const navigate = useNavigate();
  const [authSession, setAuthSession] = useState<AuthSession | null>(null);
  const [authReady, setAuthReady] = useState(false);
  /**
   * Keeps /login visible while switching modes or starting auth from the landing.
   * Prevents an existing session from bouncing Landing → Login straight to /app.
   */
  const [awaitingLogin, setAwaitingLogin] = useState(false);
  /** Ignores auth events while switching client ↔ pro login mode. */
  const switchingAuthRef = useRef(false);

  useEffect(() => {
    const forceLogin = consumeForceLoginQuery();

    if (!supabaseConfigured || !supabase) {
      if (forceLogin) {
        clearAuthSession();
        setAwaitingLogin(true);
      }
      setAuthSession(forceLogin ? null : readAuthSession());
      setAuthReady(true);
      return;
    }

    let cancelled = false;
    let clearingSessionForLogin = forceLogin;

    const applyUser = async (user: import('@supabase/supabase-js').User) => {
      if (switchingAuthRef.current || clearingSessionForLogin) return;
      const synced = await ensureOAuthUserType(user);
      const provider =
        (synced.app_metadata?.provider as AuthSession['provider'] | undefined) ?? 'email';
      const session = await enrichSessionWithProfile(
        synced,
        sessionFromSupabaseUser(synced, provider),
      );
      writeAuthSession(session);
      if (!cancelled && !switchingAuthRef.current) {
        setAuthSession(session);
        setAwaitingLogin(false);
      }
    };

    const finishReady = () => {
      if (!cancelled) setAuthReady(true);
    };

    void (async () => {
      if (forceLogin) {
        setAwaitingLogin(true);
        clearAuthSession();
        switchingAuthRef.current = true;
        await signOutSupabase();
        switchingAuthRef.current = false;
        clearingSessionForLogin = false;
        if (!cancelled) setAuthSession(null);
        finishReady();
        return;
      }

      const session = await getSupabaseAuthSession();
      if (cancelled) return;
      if (session) {
        writeAuthSession(session);
        setAuthSession(session);
      }
      finishReady();
    })();

    const { data } = supabase.auth.onAuthStateChange((_event, sbSession) => {
      if (cancelled || clearingSessionForLogin || switchingAuthRef.current) return;
      if (sbSession?.user) {
        void applyUser(sbSession.user);
      } else {
        clearAuthSession();
        setAuthSession(null);
      }
      setAuthReady(true);
    });

    return () => {
      cancelled = true;
      data.subscription.unsubscribe();
    };
  }, []);

  const handleAuthenticated = (session: AuthSession) => {
    switchingAuthRef.current = false;
    setAwaitingLogin(false);
    writeAuthSession(session);
    setAuthSession(session);
    navigate('/app', { replace: true });
  };

  const handleLogout = () => {
    switchingAuthRef.current = true;
    setAwaitingLogin(false);
    void signOutSupabase().finally(() => {
      switchingAuthRef.current = false;
    });
    clearAuthSession();
    setAuthSession(null);
    navigate('/', { replace: true });
  };

  /** Landing → dedicated portal login. Clears prior session so login is not skipped. */
  const beginAuthFlow = (userType: AuthUserType, mode: 'login' | 'signup' = 'login') => {
    setLoginIntent({ userType, mode });
    setAwaitingLogin(true);
    switchingAuthRef.current = true;
    clearAuthSession();
    setAuthSession(null);
    navigate(userType === 'pro' ? '/pro/login' : '/login');
    void signOutSupabase().finally(() => {
      switchingAuthRef.current = false;
    });
  };

  const startProLogin = (mode: 'login' | 'signup' = 'login') => {
    beginAuthFlow('pro', mode);
  };

  const goToAuth = (userType: AuthUserType, mode: 'login' | 'signup' = 'signup') => {
    beginAuthFlow(userType, mode);
  };

  const goToAppLogin = () => {
    beginAuthFlow('client', 'login');
  };

  const goToProLogin = () => {
    beginAuthFlow('pro', 'login');
  };

  const backToLanding = () => {
    setAwaitingLogin(false);
    navigate('/');
  };

  const renderAuthScreen = (portal: 'client' | 'pro') =>
    authSession && !awaitingLogin ? (
      <Navigate to="/app" replace />
    ) : (
      <AuthScreen
        portal={portal}
        onAuthenticated={handleAuthenticated}
        onBackToLanding={backToLanding}
        onSwitchPortal={() => beginAuthFlow(portal === 'pro' ? 'client' : 'pro', 'login')}
      />
    );

  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">
        <Loader2 className="h-8 w-8 animate-spin text-[#0D9488]" aria-label="Carregando" />
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage
            onSignIn={goToAppLogin}
            onStart={goToAuth}
            onEnterApp={goToAppLogin}
            onProPortal={goToProLogin}
          />
        }
      />
      <Route path="/login" element={renderAuthScreen('client')} />
      <Route path="/pro/login" element={renderAuthScreen('pro')} />
      <Route
        path="/app"
        element={
          authSession && !awaitingLogin ? (
            <AuthenticatedApp
              session={authSession}
              onRequestProLogin={startProLogin}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function AuthenticatedApp({
  session,
  onRequestProLogin,
  onLogout,
}: {
  session: AuthSession;
  onRequestProLogin: (mode?: 'login' | 'signup') => void;
  onLogout: () => void;
}) {
  const [screen, setScreen] = useState(session.userType === 'pro' ? 'pro-dashboard' : 'home');
  const [legalBackScreen, setLegalBackScreen] = useState('trust');
  const [searchCategory, setSearchCategory] = useState('');
  const [chatConversationId, setChatConversationId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(readSidebarCollapsed);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { resolvedTheme, t } = useAppSettings();

  useEffect(() => {
    writeSidebarCollapsed(sidebarCollapsed);
  }, [sidebarCollapsed]);

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [screen]);

  useEffect(() => {
    if (session.userType === 'client' && (screen.startsWith('pro-') || screen === 'opportunities' || screen === 'agenda')) {
      setScreen('home');
      return;
    }
    if (
      session.userType === 'pro' &&
      (screen === 'home' ||
        screen === 'search' ||
        screen === 'orders' ||
        screen === 'favorites' ||
        screen === 'client-reviews' ||
        screen === 'history' ||
        screen === 'chat')
    ) {
      setScreen('pro-dashboard');
    }
  }, [session.userType, screen]);

  const toggleSidebarCollapsed = () => setSidebarCollapsed((c) => !c);
  const isDark = resolvedTheme === 'dark';
  const { categories, loading: categoriesLoading } = useCategories();
  const { professionals, loading: prosLoading } = useProfessionals();

  const goToCategory = (label: string) => {
    setSearchCategory(label);
    setScreen('search');
  };

  /** Create-or-get the conversation with a professional, then open the chat. */
  const handleMessagePro = async (professionalId: string) => {
    if (supabaseConfigured && session.userId) {
      const conversationId = await startConversation(professionalId);
      setChatConversationId(conversationId);
    }
    setScreen('chat');
  };

  const handleProAccount = () => {
    if (session.userType === 'pro') {
      setScreen('pro-dashboard');
      return;
    }
    onRequestProLogin('login');
  };

  const shell = `${isDark ? 'dark text-slate-100' : 'text-slate-900'}`;
  const isSettingsScreen = screen === 'settings' || screen.startsWith('settings-');

  return (
    <div className={`relative min-h-screen flex overflow-hidden transition-colors duration-300 ${shell}`}>
      <AppBackground className="z-0" />
      {/* Sidebar above main: same z-index siblings paint later content on top and hide the nav */}
      <div className="relative z-40 shrink-0 isolate">
        <AppSidebar
          screen={screen}
          setScreen={setScreen}
          userType={session.userType}
          collapsed={sidebarCollapsed}
          onToggleCollapsed={toggleSidebarCollapsed}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />
      </div>

      <div className="relative z-10 flex min-h-screen min-w-0 flex-1 flex-col">
        <AppTopBar
          onOpenMobileMenu={() => setMobileSidebarOpen(true)}
          onToggleDesktopSidebar={toggleSidebarCollapsed}
          desktopCollapsed={sidebarCollapsed}
          userType={session.userType}
          screen={screen}
          onProAccount={handleProAccount}
          onPlans={() => setScreen('plans')}
        />

        <main
          className={`w-full min-w-0 flex flex-col ${isSettingsScreen ? 'flex-none' : 'flex-1 min-h-0'}`}
        >
        {screen === 'home' && (
          <>
            <Header />
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-28 sm:pb-12 flex-1 transition-colors duration-300">
              <div className={`border border-[#0D9488]/10 rounded-2xl p-5 mb-10 flex items-center justify-between relative overflow-hidden ${isDark ? 'bg-[#0D9488]/5' : 'bg-gradient-to-r from-[#0D9488]/10 to-transparent'}`}>
                <div className="relative z-10">
                  <BrandName size="md" />
                  <p className={`text-sm font-medium mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{t('home.banner')}</p>
                </div>
                <Sparkles className="text-4xl text-[#0D9488]/80 relative z-10 w-9 h-9 shrink-0" />
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#0D9488]/10 rounded-full blur-2xl" />
              </div>

              <div className="mb-12">
                <div className="flex justify-between items-center mb-5">
                  <h2 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0D9488]'}`}>{t('home.categories')}</h2>
                  <button type="button" onClick={() => setScreen('search')} className="text-sm text-[#0D9488] font-semibold hover:underline">
                    {t('home.seeAll')}
                  </button>
                </div>
                {categoriesLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-[#0D9488]" />
                  </div>
                ) : (
                  <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3">
                    {categories.map((category) => (
                      <CategoryCard
                        key={category.id}
                        icon={category.icon}
                        label={category.label}
                        onClick={() => goToCategory(category.label)}
                      />
                    ))}
                  </div>
                )}
              </div>

              <ActiveOrderStatus />

              <section className="mt-12">
                <div className="flex justify-between items-center mb-5">
                  <h2 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0D9488]'}`}>{t('home.nearby')}</h2>
                  <div className={`flex items-center gap-1 text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    <SlidersHorizontal className="w-4 h-4" />
                    {t('home.recommended')}
                  </div>
                </div>

                {prosLoading && (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-7 h-7 animate-spin text-[#0D9488]" />
                  </div>
                )}

                {!prosLoading && professionals.length === 0 && (
                  <p className={`text-sm text-center py-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {t('home.noPros')}
                  </p>
                )}

                {!prosLoading && (
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
                    {professionals.slice(0, 4).map((professional) => (
                      <ProfessionalCard
                        key={professional.id}
                        name={professional.name}
                        role={professional.role}
                        description={professional.description}
                        rating={professional.rating}
                        price={professional.price}
                        priceUnit={professional.priceUnit}
                        image={professional.image}
                        isOnline={professional.isOnline}
                        onMessage={() => void handleMessagePro(professional.id)}
                      />
                    ))}
                  </div>
                )}
              </section>
            </div>
          </>
        )}

        {screen === 'account' && <AccountScreen session={session} onLogout={onLogout} />}
        {screen === 'plans' && <PlansScreen />}
        {screen === 'orders' && <OrdersScreen />}
        {session.userType === 'pro' && screen === 'opportunities' && <OpportunitiesScreen />}
        {screen === 'favorites' && <FavoritesScreen onSearch={() => setScreen('search')} />}
        {screen === 'client-reviews' && <ClientReviewsScreen />}
        {screen === 'help' && <HelpScreen />}
        {session.userType === 'pro' && screen === 'agenda' && <AgendaScreen />}
        {screen === 'trust' && (
          <TrustScreen
            onOpenTerms={() => {
              setLegalBackScreen('trust');
              setScreen('terms-of-use');
            }}
            onOpenPrivacy={() => {
              setLegalBackScreen('trust');
              setScreen('privacy-policy');
            }}
          />
        )}
        {screen === 'terms-of-use' && <TermsOfUseScreen onBack={() => setScreen(legalBackScreen)} />}
        {screen === 'privacy-policy' && <PrivacyPolicyScreen onBack={() => setScreen(legalBackScreen)} />}
        {isSettingsScreen && (
          <SettingsScreen
            initialTab={screenToSettingsTab(screen)}
            onOpenTerms={() => {
              setLegalBackScreen(screen);
              setScreen('terms-of-use');
            }}
            onOpenPrivacy={() => {
              setLegalBackScreen(screen);
              setScreen('privacy-policy');
            }}
          />
        )}

        {!isStandaloneScreen(screen) && screen !== 'home' && (
          <div className="flex-1 flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 pb-28 lg:pb-10 min-h-0">
            {screen === 'search' && (
              <SearchScreen
                initialCategory={searchCategory}
                onMessagePro={(prof) => void handleMessagePro(prof.id)}
              />
            )}
            {screen === 'chat' && (
              <ChatScreen userId={session.userId} initialConversationId={chatConversationId} />
            )}
            {screen === 'history' && <HistoryScreen />}
            {screen === 'how-it-works' && <HowItWorksScreen />}
            {session.userType === 'pro' && screen === 'pro-dashboard' && <ProDashboard />}
            {session.userType === 'pro' && screen === 'pro-chat' && <ProChatScreen userId={session.userId} />}
            {session.userType === 'pro' && screen === 'pro-history' && <ProHistoryScreen />}
            {session.userType === 'pro' && screen === 'pro-financial' && <ProFinancialScreen />}
            {session.userType === 'pro' && screen === 'pro-contracts' && <ProContractsScreen />}
            {session.userType === 'pro' && screen === 'pro-reviews' && <ProReviewsScreen />}
          </div>
        )}
        </main>

        <WebsiteFooter />

        <BottomNavigation screen={screen} setScreen={setScreen} userType={session.userType} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppSettingsProvider>
      <AppInner />
    </AppSettingsProvider>
  );
}
