import { useState, useMemo } from 'react';
import { Star, TrendingUp, TrendingDown, Minus, ThumbsUp, MessageSquare, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppSettings } from '../context/AppSettings';

interface Review {
  id: number;
  clientName: string;
  clientAvatar: string;
  service: string;
  date: string;
  rating: number;
  comment: string;
  tags: string[];
  reply?: string;
}

const allReviews: Review[] = [
  {
    id: 1,
    clientName: 'Fernanda Lima',
    clientAvatar: 'FL',
    service: 'Instalação elétrica residencial',
    date: '2026-05-10',
    rating: 5,
    comment: 'Excelente profissional! Chegou no horário combinado, trabalhou com muita organização e deixou tudo limpo. Com certeza vou chamar novamente.',
    tags: ['Pontual', 'Organizado', 'Recomendo'],
    reply: 'Obrigado, Fernanda! Foi um prazer trabalhar com você. Qualquer coisa é só chamar!',
  },
  {
    id: 2,
    clientName: 'Carlos Souza',
    clientAvatar: 'CS',
    service: 'Troca de disjuntores',
    date: '2026-05-07',
    rating: 5,
    comment: 'Muito competente e honesto. Resolveu o problema rapidamente e o preço foi justo. Super indico!',
    tags: ['Competente', 'Honesto', 'Preço justo'],
  },
  {
    id: 3,
    clientName: 'Mariana Costa',
    clientAvatar: 'MC',
    service: 'Revisão elétrica completa',
    date: '2026-04-28',
    rating: 4,
    comment: 'Serviço bem feito, mas demorou um pouco mais do que o previsto. No geral, fiquei satisfeita com o resultado.',
    tags: ['Bom serviço', 'Atraso'],
  },
  {
    id: 4,
    clientName: 'João Pereira',
    clientAvatar: 'JP',
    service: 'Instalação de tomadas e interruptores',
    date: '2026-04-20',
    rating: 5,
    comment: 'Perfeito! Instalou 8 tomadas e 4 interruptores em menos de 3 horas. Serviço impecável, vou recomendar para os vizinhos.',
    tags: ['Rápido', 'Impecável', 'Recomendo'],
    reply: 'Fico feliz em ajudar, João! Pode chamar sempre que precisar.',
  },
  {
    id: 5,
    clientName: 'Patricia Alves',
    clientAvatar: 'PA',
    service: 'Instalação de chuveiro elétrico',
    date: '2026-04-15',
    rating: 3,
    comment: 'O serviço foi feito, mas tive que chamar de volta porque o chuveiro apresentou problema 2 dias depois. Voltou e resolveu sem custo adicional.',
    tags: ['Retorno garantido'],
  },
  {
    id: 6,
    clientName: 'Rafael Mendes',
    clientAvatar: 'RM',
    service: 'Instalação de painel solar',
    date: '2026-04-08',
    rating: 5,
    comment: 'Trabalho técnico e muito bem executado. Trouxe todos os equipamentos necessários, explicou tudo claramente e o resultado ficou perfeito.',
    tags: ['Técnico', 'Explicativo', 'Perfeito'],
    reply: 'Obrigado, Rafael! Painéis solares são sempre um investimento que vale a pena. Boa sorte com o sistema!',
  },
  {
    id: 7,
    clientName: 'Débora Nunes',
    clientAvatar: 'DN',
    service: 'Reparo em fiação',
    date: '2026-03-30',
    rating: 4,
    comment: 'Resolveu o problema de curto-circuito que eu tinha há meses. Profissional e educado. Só achei o preço um pouco alto.',
    tags: ['Profissional', 'Educado'],
  },
  {
    id: 8,
    clientName: 'Bruno Tavares',
    clientAvatar: 'BT',
    service: 'Instalação de ar-condicionado',
    date: '2026-03-22',
    rating: 5,
    comment: 'Instalou dois aparelhos em um dia inteiro de trabalho. Muito cuidadoso, não fez sujeira e testou tudo antes de ir embora. Nota máxima!',
    tags: ['Cuidadoso', 'Eficiente', 'Nota máxima'],
  },
];

function StarRow({ value, size = 'md' }: { value: number; size?: 'sm' | 'md' | 'lg' }) {
  const sz = size === 'lg' ? 'w-6 h-6' : size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${sz} ${i <= value ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`}
        />
      ))}
    </div>
  );
}

function RatingBar({ label, count, total }: { label: string; count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-slate-500 w-14 text-right shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-slate-500 w-6 shrink-0">{count}</span>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState(review.reply ?? '');
  const [replySaved, setReplySaved] = useState(!!review.reply);
  const [expanded, setExpanded] = useState(false);

  function saveReply() {
    if (!replyText.trim()) return;
    setReplySaved(true);
    setShowReply(false);
  }

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0D9488] to-[#0EA5E9] flex items-center justify-center text-white font-bold text-sm shrink-0">
            {review.clientAvatar}
          </div>
          <div>
            <p className="font-semibold text-[#0F172A] text-sm">{review.clientName}</p>
            <p className="text-xs text-slate-400">{fmtDate(review.date)}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <StarRow value={review.rating} size="sm" />
          <span className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">{review.service}</span>
        </div>
      </div>

      {/* Comment */}
      <p className="text-sm text-slate-600 leading-relaxed">
        {expanded || review.comment.length <= 120
          ? review.comment
          : `${review.comment.slice(0, 120)}...`}
        {review.comment.length > 120 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-1 text-[#0D9488] text-xs font-medium"
          >
            {expanded ? 'ver menos' : 'ver mais'}
          </button>
        )}
      </p>

      {/* Tags */}
      {review.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {review.tags.map((tag) => (
            <span key={tag} className="text-xs bg-slate-50 border border-slate-200 text-slate-600 rounded-full px-2.5 py-0.5">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Reply */}
      {replySaved && !showReply && (
        <div className="bg-[#ECFDF5] border border-[#0D9488]/20 rounded-xl px-3 py-2">
          <p className="text-xs font-semibold text-[#0D9488] mb-1 flex items-center gap-1">
            <MessageSquare className="w-3 h-3" /> Sua resposta
          </p>
          <p className="text-xs text-slate-700">{replyText}</p>
          <button
            onClick={() => setShowReply(true)}
            className="text-xs text-[#0D9488] mt-1 hover:underline"
          >
            Editar resposta
          </button>
        </div>
      )}

      {showReply && (
        <div className="flex flex-col gap-2">
          <textarea
            rows={3}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Escreva sua resposta pública..."
            className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30"
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setShowReply(false)}
              className="text-xs text-slate-500 px-3 py-1.5 rounded-lg hover:bg-slate-100"
            >
              Cancelar
            </button>
            <button
              onClick={saveReply}
              className="text-xs text-white bg-[#0D9488] px-3 py-1.5 rounded-lg hover:bg-[#0F766E]"
            >
              Salvar resposta
            </button>
          </div>
        </div>
      )}

      {!replySaved && !showReply && (
        <button
          onClick={() => setShowReply(true)}
          className="self-start text-xs text-[#0D9488] font-medium flex items-center gap-1 hover:underline"
        >
          <MessageSquare className="w-3.5 h-3.5" /> Responder avaliação
        </button>
      )}
    </div>
  );
}

type FilterRating = 'all' | '5' | '4' | '3' | '1-2';

export function ProReviewsScreen() {
  const { t } = useAppSettings();
  const [filterRating, setFilterRating] = useState<FilterRating>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'highest' | 'lowest'>('recent');
  const [showSortMenu, setShowSortMenu] = useState(false);

  const avg = useMemo(
    () => allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length,
    []
  );

  const dist = useMemo(() => {
    const d: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    allReviews.forEach((r) => { d[r.rating] = (d[r.rating] ?? 0) + 1; });
    return d;
  }, []);

  const filtered = useMemo(() => {
    let list = [...allReviews];
    if (filterRating === '5') list = list.filter((r) => r.rating === 5);
    else if (filterRating === '4') list = list.filter((r) => r.rating === 4);
    else if (filterRating === '3') list = list.filter((r) => r.rating === 3);
    else if (filterRating === '1-2') list = list.filter((r) => r.rating <= 2);

    if (sortBy === 'recent') list.sort((a, b) => b.date.localeCompare(a.date));
    else if (sortBy === 'highest') list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => a.rating - b.rating);

    return list;
  }, [filterRating, sortBy]);

  const trend = avg >= 4.5 ? 'up' : avg >= 3.5 ? 'neutral' : 'down';

  const sortLabels = { recent: 'Mais recentes', highest: 'Maior nota', lowest: 'Menor nota' };

  return (
    <div className="flex-1 overflow-y-auto bg-white/40 dark:bg-slate-900/30 backdrop-blur-[2px]" style={{ scrollbarWidth: 'none' }}>
      <div className="px-4 sm:px-8 pt-6 pb-8 max-w-2xl mx-auto">

        {/* Page title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">{t('pro.reviewsTitle')}</h2>
          <p className="text-sm text-slate-500 mt-0.5">O que seus clientes disseram sobre você</p>
        </div>

        {/* Summary card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-6">
          <div className="flex items-center gap-6 flex-wrap">
            {/* Big score */}
            <div className="flex flex-col items-center gap-1 min-w-[80px]">
              <span className="text-5xl font-extrabold text-[#0F172A]">{avg.toFixed(1)}</span>
              <StarRow value={Math.round(avg)} size="md" />
              <span className="text-xs text-slate-400 mt-0.5">{allReviews.length} avaliações</span>
            </div>

            {/* Distribution bars */}
            <div className="flex-1 flex flex-col gap-1.5 min-w-[160px]">
              <RatingBar label="5 estrelas" count={dist[5]} total={allReviews.length} />
              <RatingBar label="4 estrelas" count={dist[4]} total={allReviews.length} />
              <RatingBar label="3 estrelas" count={dist[3]} total={allReviews.length} />
              <RatingBar label="2 estrelas" count={dist[2]} total={allReviews.length} />
              <RatingBar label="1 estrela"  count={dist[1]} total={allReviews.length} />
            </div>

            {/* Mini KPIs */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2">
                {trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-500" />}
                {trend === 'neutral' && <Minus className="w-4 h-4 text-amber-500" />}
                {trend === 'down' && <TrendingDown className="w-4 h-4 text-rose-500" />}
                <div>
                  <p className="text-[10px] text-slate-400 leading-none">Tendência</p>
                  <p className="text-xs font-semibold text-slate-700">
                    {trend === 'up' ? 'Alta' : trend === 'neutral' ? 'Estável' : 'Baixa'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2">
                <ThumbsUp className="w-4 h-4 text-[#0D9488]" />
                <div>
                  <p className="text-[10px] text-slate-400 leading-none">Recomendação</p>
                  <p className="text-xs font-semibold text-slate-700">
                    {Math.round((allReviews.filter((r) => r.rating >= 4).length / allReviews.length) * 100)}%
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2">
                <Award className="w-4 h-4 text-amber-500" />
                <div>
                  <p className="text-[10px] text-slate-400 leading-none">Notas 5 ★</p>
                  <p className="text-xs font-semibold text-slate-700">{dist[5]} avaliações</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter + Sort bar */}
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          {/* Rating filter pills */}
          <div className="flex gap-1.5 flex-wrap">
            {(['all', '5', '4', '3', '1-2'] as FilterRating[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilterRating(f)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors ${
                  filterRating === f
                    ? 'bg-[#0D9488] text-white border-[#0D9488]'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-[#0D9488] hover:text-[#0D9488]'
                }`}
              >
                {f === 'all' ? 'Todas' : f === '1-2' ? '1–2 ★' : `${f} ★`}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-full px-3 py-1.5 hover:border-slate-400"
            >
              {sortLabels[sortBy]}
              {showSortMenu ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {showSortMenu && (
              <div className="absolute right-0 top-9 bg-white border border-slate-200 rounded-xl shadow-lg z-10 min-w-[150px] py-1 overflow-hidden">
                {(['recent', 'highest', 'lowest'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => { setSortBy(s); setShowSortMenu(false); }}
                    className={`w-full text-left px-4 py-2 text-xs hover:bg-slate-50 ${sortBy === s ? 'text-[#0D9488] font-semibold' : 'text-slate-700'}`}
                  >
                    {sortLabels[s]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Count label */}
        <p className="text-xs text-slate-400 mb-4">
          {filtered.length} {filtered.length === 1 ? 'avaliação encontrada' : 'avaliações encontradas'}
        </p>

        {/* Review list */}
        <div className="flex flex-col gap-4">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">Nenhuma avaliação para este filtro.</div>
          ) : (
            filtered.map((r) => <ReviewCard key={r.id} review={r} />)
          )}
        </div>
      </div>
    </div>
  );
}
