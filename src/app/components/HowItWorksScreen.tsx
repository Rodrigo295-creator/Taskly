import { useMemo, useState } from 'react';
import { BrandName } from './Logo';
import { useAppSettings } from '../context/AppSettings';
import {
  Search, MessageCircle, CheckCircle, Star,
  ChevronDown, ChevronUp, Shield, Users, Percent,
  Briefcase, ClipboardList, Wallet, UserCheck, Zap,
} from 'lucide-react';

/* ── data ───────────────────────────────────────────────────────── */

const CLIENT_STEPS = [
  {
    icon: Search,
    title: 'Busque o profissional ideal',
    description: 'Filtre por categoria, avaliação e faixa de preço. Encontre quem atende na sua região em segundos.',
  },
  {
    icon: MessageCircle,
    title: 'Converse e combine',
    description: 'Fale diretamente pelo chat, tire dúvidas, combine a data, horário e o valor do serviço.',
  },
  {
    icon: CheckCircle,
    title: 'Acompanhe e confirme',
    description: 'O profissional vai até você. Após a conclusão, confirme o serviço para liberar o pagamento.',
  },
  {
    icon: Star,
    title: 'Avalie a experiência',
    description: 'Sua avaliação ajuda outros clientes a escolher com mais segurança.',
  },
];

const PRO_STEPS = [
  {
    icon: UserCheck,
    title: 'Crie seu perfil',
    description: 'Cadastre-se, informe sua área de atuação, experiência, preço e disponibilidade. A verificação de identidade leva menos de 5 minutos.',
  },
  {
    icon: ClipboardList,
    title: 'Receba solicitações',
    description: 'Clientes interessados entram em contato direto pelo chat. Você escolhe aceitar ou recusar cada pedido.',
  },
  {
    icon: Briefcase,
    title: 'Realize o serviço',
    description: 'Execute o trabalho combinado. O cliente acompanha tudo pelo app e confirma a conclusão.',
  },
  {
    icon: Wallet,
    title: 'Receba seu pagamento',
    description: 'Após a confirmação do cliente, o valor — menos a taxa de 7% — cai na sua conta em até 1 dia útil.',
  },
];

const FAQS = [
  {
    question: 'A taxa de 7% é cobrada de quem?',
    answer: 'A taxa é descontada do valor recebido pelo profissional, não do cliente. Você paga exatamente o valor combinado — sem surpresas.',
  },
  {
    question: 'Como funciona o pagamento seguro?',
    answer: 'O valor fica retido na plataforma durante o serviço e só é liberado ao profissional após a sua confirmação de conclusão. Isso protege ambos os lados.',
  },
  {
    question: 'Posso cancelar um serviço agendado?',
    answer: 'Sim. Cancelamentos com mais de 24h de antecedência são gratuitos. Com menos de 24h, pode haver uma taxa de até 20% do valor para cobrir o deslocamento do profissional.',
  },
  {
    question: 'Os profissionais são verificados?',
    answer: 'Todos passam por validação de identidade antes de entrar na plataforma. Prestadores com notas consistentemente baixas são removidos automaticamente.',
  },
  {
    question: 'O que acontece se eu não ficar satisfeito?',
    answer: 'Você tem até 48h após a conclusão para abrir uma reclamação. Nossa equipe analisa e pode reter o pagamento ou intermediar uma revisão gratuita.',
  },
  {
    question: 'Como o profissional recebe o pagamento?',
    answer: 'Após a confirmação do cliente, o valor líquido (descontada a taxa de 7%) é transferido para a conta cadastrada pelo profissional em até 1 dia útil.',
  },
  {
    question: 'O Taskly opera fora de São Paulo?',
    answer: 'Estamos em expansão. Atualmente operamos em São Paulo, Campinas e Grande ABC. Novas cidades são adicionadas mensalmente.',
  },
];

/* ── components ─────────────────────────────────────────────────── */

function StepList({ steps, accent }: { steps: typeof CLIENT_STEPS; accent: string }) {
  return (
    <div className="relative">
      <div className="absolute left-5 top-5 bottom-5 w-px bg-slate-200 z-0" />
      <div className="flex flex-col gap-5 relative z-10">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 border"
              style={{ backgroundColor: `${accent}18`, borderColor: `${accent}30` }}
            >
              <step.icon className="w-5 h-5" style={{ color: accent }} />
            </div>
            <div className="pt-1">
              <p className="text-sm font-semibold text-slate-800">{step.title}</p>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all ${open ? 'border-[#F97316]/30 bg-[#FEF0E6]/40' : 'border-slate-200 bg-white'}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
      >
        <span className={`text-sm font-semibold leading-snug ${open ? 'text-[#F97316]' : 'text-slate-800'}`}>
          {question}
        </span>
        {open
          ? <ChevronUp className="w-4 h-4 text-[#F97316] flex-shrink-0" />
          : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-4">
          <p className="text-sm text-slate-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

/* ── main screen ────────────────────────────────────────────────── */

type Tab = 'cliente' | 'profissional';

export function HowItWorksScreen() {
  const { fmt, t } = useAppSettings();
  const [tab, setTab] = useState<Tab>('cliente');

  const clientSteps = useMemo(
    () => [
      { icon: Search, title: t('how.c1.title'), description: t('how.c1.desc') },
      { icon: MessageCircle, title: t('how.c2.title'), description: t('how.c2.desc') },
      { icon: CheckCircle, title: t('how.c3.title'), description: t('how.c3.desc') },
      { icon: Star, title: t('how.c4.title'), description: t('how.c4.desc') },
    ],
    [t],
  );

  const proSteps = useMemo(
    () => [
      { icon: UserCheck, title: t('how.p1.title'), description: t('how.p1.desc') },
      { icon: ClipboardList, title: t('how.p2.title'), description: t('how.p2.desc') },
      { icon: Briefcase, title: t('how.p3.title'), description: t('how.p3.desc') },
      { icon: Wallet, title: t('how.p4.title'), description: t('how.p4.desc') },
    ],
    [t],
  );

  const faqs = useMemo(
    () =>
      [1, 2, 3, 4, 5, 6, 7].map((i) => ({
        question: t(`how.faq${i}.q`),
        answer: t(`how.faq${i}.a`),
      })),
    [t],
  );

  const examplePrice = 200;
  const fee = examplePrice * 0.07;
  const proReceives = examplePrice - fee;

  return (
    <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>

      {/* Hero */}
      <div className="bg-[#0F172A] px-6 py-8 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-[#F97316]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#F97316]/15 border border-[#F97316]/25 rounded-full px-3 py-1 mb-4">
            <Zap className="w-3.5 h-3.5 text-[#F97316]" />
            <span className="text-xs font-semibold text-[#F97316]">{t('how.badge')}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white leading-tight mb-3">
            Como o <BrandName size="lg" onDark /><br />funciona?
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed max-w-xs">
            {t('how.heroSub')}
          </p>
        </div>

        {/* numbers */}
        <div className="grid grid-cols-3 gap-3 mt-6 relative z-10">
          {[
            { icon: Users, value: '12 mil+', label: t('how.statPros') },
            { icon: CheckCircle, value: '98 mil+', label: t('how.stat1') },
            { icon: Star, value: '4.8', label: t('how.stat2') },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
              <Icon className="w-4 h-4 text-[#F97316] mx-auto mb-1.5" />
              <p className="text-sm font-bold text-white">{value}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 py-6 space-y-8">

        {/* Tab switcher */}
        <div className="bg-slate-100 rounded-2xl p-1 flex gap-1">
          {(['cliente', 'profissional'] as Tab[]).map((tabKey) => (
            <button
              key={tabKey}
              onClick={() => setTab(tabKey)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                tab === tabKey
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tabKey === 'cliente' ? t('how.tabClient') : t('how.tabPro')}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === 'cliente' ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-1">{t('how.clientTitle')}</h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t('how.clientSub')}
              </p>
            </div>
            <StepList steps={clientSteps} accent="#F97316" />

            {/* Client benefits */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-slate-800">{t('how.clientGuarantee')}</h3>
              {[
                { icon: Shield, text: t('how.clientG1') },
                { icon: UserCheck, text: t('how.clientG2alt') },
                { icon: MessageCircle, text: t('how.clientG3') },
                { icon: Star, text: t('how.clientG4') },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#FEF0E6] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-[#F97316]" />
                  </div>
                  <span className="text-sm text-slate-600">{text}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-1">{t('how.proTitle')}</h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t('how.proSub')}
              </p>
            </div>
            <StepList steps={proSteps} accent="#0EA5E9" />

            {/* Pro benefits */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-slate-800">{t('how.proGuarantee')}</h3>
              {[
                { icon: Wallet, text: t('how.proG1') },
                { icon: Shield, text: t('how.proG2') },
                { icon: ClipboardList, text: t('how.proG3alt') },
                { icon: Star, text: t('how.proG4') },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-sky-500" />
                  </div>
                  <span className="text-sm text-slate-600">{text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Taxa 7% */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Percent className="w-5 h-5 text-[#F97316]" />
            <h2 className="text-lg font-bold text-slate-800">{t('how.feeTitleShort')}</h2>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
            <p className="text-sm text-slate-600 leading-relaxed">
              {t('how.feeBody')}{' '}
              {t('how.feeDetail')}
            </p>

            {/* example */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Exemplo com R$ 200</p>
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Valor combinado</span>
                  <span className="text-sm font-bold text-slate-800">{fmt(examplePrice)}</span>
                </div>
                <div className="w-full h-px bg-slate-200" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Taxa <BrandName size="sm" /> <span className="text-xs text-slate-400">(7%)</span></span>
                  <span className="text-sm font-semibold text-red-500">− {fmt(fee)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Profissional recebe</span>
                  <span className="text-sm font-semibold text-green-600">{fmt(proReceives)}</span>
                </div>
                <div className="w-full h-px bg-slate-200" />
                <div className="flex justify-between items-center bg-[#FEF0E6] -mx-1 px-3 py-2 rounded-lg">
                  <span className="text-sm font-bold text-slate-800">Cliente paga</span>
                  <span className="text-base font-extrabold text-[#F97316]">{fmt(examplePrice)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl p-3">
              <Shield className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-green-800 leading-relaxed">
                {t('how.feeShield')}
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-4">{t('how.faq')}</h2>
          <div className="flex flex-col gap-2">
            {faqs.map((faq, i) => (
              <FaqItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#0F172A] rounded-2xl p-5 text-center">
          <p className="text-white font-bold text-base mb-1">{t('how.ctaTitle')}</p>
          <p className="text-slate-400 text-xs mb-3">{t('how.ctaSub')}</p>
          <div className="flex items-center justify-center gap-1 text-[#F97316] font-semibold text-sm">
            <Zap className="w-4 h-4" />
            <BrandName size="sm" onDark /> {t('how.ctaTagline')}
          </div>
        </div>

        <div className="pb-4" />
      </div>
    </div>
  );
}
