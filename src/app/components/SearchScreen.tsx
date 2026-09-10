import { useState, useMemo } from 'react';
import {
  Search,
  Star,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
  Loader2,
  MessageCircle,
} from 'lucide-react';
import { useAppSettings } from '../context/AppSettings';
import { HireModal } from './HireModal';
import type { DirectoryProfessional } from '../../data/mockDirectory';
import { useProfessionals } from '@/hooks/useProfessionals';
import { useCategories } from '@/hooks/useCategories';

type Professional = DirectoryProfessional;

const RATING_OPTIONS = [
  { label: '5.0 ★', value: 5.0 },
  { label: '4.8+ ★', value: 4.8 },
  { label: '4.5+ ★', value: 4.5 },
  { label: '4.0+ ★', value: 4.0 },
];

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-100 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between w-full mb-3"
      >
        <span className="text-sm font-semibold text-slate-700">{title}</span>
        {open
          ? <ChevronUp className="w-4 h-4 text-slate-400" />
          : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>
      {open && children}
    </div>
  );
}

interface Props {
  onHirePro?: (prof: Professional) => void;
  /** Opens (or creates) a chat conversation with the professional */
  onMessagePro?: (prof: Professional) => void;
  initialCategory?: string;
}

export function SearchScreen({ onHirePro, onMessagePro, initialCategory }: Props) {
  const { fmt, convert, t } = useAppSettings();
  const { categories } = useCategories();
  const { professionals, loading: prosLoading } = useProfessionals();
  const [nameQuery, setNameQuery] = useState('');
  const [areaQuery, setAreaQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory && initialCategory !== 'Mais' ? [initialCategory] : []
  );
  const [maxPrice, setMaxPrice] = useState(500);   // stored in BRL
  const [minRating, setMinRating] = useState(0);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categoryFilterLabels = useMemo(
    () => categories.map((c) => c.label).filter((label) => label !== t('common.more') && label !== 'Mais'),
    [categories, t],
  );

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setMaxPrice(500);
    setMinRating(0);
    setNameQuery('');
    setAreaQuery('');
  };

  const activeFilterCount =
    selectedCategories.length +
    (maxPrice < 500 ? 1 : 0) +
    (minRating > 0 ? 1 : 0);

  const results = useMemo(() => {
    return professionals.filter((p) => {
      if (nameQuery && !p.name.toLowerCase().includes(nameQuery.toLowerCase())) return false;
      if (areaQuery && !p.role.toLowerCase().includes(areaQuery.toLowerCase()) && !p.category.toLowerCase().includes(areaQuery.toLowerCase())) return false;
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
      if (p.price > maxPrice) return false;
      if (p.rating < minRating) return false;
      return true;
    });
  }, [nameQuery, areaQuery, selectedCategories, maxPrice, minRating, professionals]);

  const filtersPanel = (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 h-fit">
      <div className="flex items-center justify-between mb-5">
        <span className="font-bold text-slate-800 text-base">{t('search.filters')}</span>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs text-[#0D9488] font-semibold hover:underline flex items-center gap-1"
          >
            <X className="w-3 h-3" /> {t('common.clear')} ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Tipo de Serviço */}
      <FilterSection title={t('search.serviceType')}>
        <div className="flex flex-col gap-2">
          {categoryFilterLabels.map((cat) => (
            <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => toggleCategory(cat)}
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer ${
                  selectedCategories.includes(cat)
                    ? 'bg-[#0D9488] border-[#0D9488]'
                    : 'border-slate-300 group-hover:border-[#0D9488]'
                }`}
              >
                {selectedCategories.includes(cat) && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                    <path d="M1.5 5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span
                onClick={() => toggleCategory(cat)}
                className={`text-sm cursor-pointer ${selectedCategories.includes(cat) ? 'text-slate-800 font-medium' : 'text-slate-600'}`}
              >
                {cat}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Faixa de Preço */}
      <FilterSection title={t('search.priceRange')}>
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-slate-500">{t('common.upTo')}</span>
            <span className="text-sm font-semibold text-[#0D9488]">
              {fmt(maxPrice, { decimals: 0 })}{maxPrice === 500 ? '+' : ''}
            </span>
          </div>
          <input
            type="range"
            min={30}
            max={500}
            step={10}
            value={maxPrice}
            onChange={e => setMaxPrice(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #0D9488 0%, #0D9488 ${((maxPrice - 30) / 470) * 100}%, #E2E8F0 ${((maxPrice - 30) / 470) * 100}%, #E2E8F0 100%)`,
              accentColor: '#0D9488',
            }}
          />
          <div className="flex justify-between mt-1.5">
            <span className="text-xs text-slate-400">{fmt(30, { decimals: 0 })}</span>
            <span className="text-xs text-slate-400">{fmt(500, { decimals: 0 })}+</span>
          </div>
        </div>
      </FilterSection>

      {/* Avaliação */}
      <FilterSection title={t('search.minRating')} defaultOpen={true}>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <div
              onClick={() => setMinRating(0)}
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                minRating === 0 ? 'border-[#0D9488]' : 'border-slate-300'
              }`}
            >
              {minRating === 0 && <div className="w-2 h-2 rounded-full bg-[#0D9488]" />}
            </div>
            <span className="text-sm text-slate-600">{t('search.allRatings')}</span>
          </label>
          {RATING_OPTIONS.map(opt => (
            <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => setMinRating(opt.value)}
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                  minRating === opt.value ? 'border-[#0D9488]' : 'border-slate-300 group-hover:border-[#0D9488]'
                }`}
              >
                {minRating === opt.value && <div className="w-2 h-2 rounded-full bg-[#0D9488]" />}
              </div>
              <span className={`text-sm ${minRating === opt.value ? 'text-slate-800 font-medium' : 'text-slate-600'}`}>
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Search inputs */}
      <div className="px-5 pt-5 pb-4 bg-white border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-4">{t('search.title')}</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={nameQuery}
              onChange={e => setNameQuery(e.target.value)}
              placeholder={t('search.namePh')}
              className="w-full pl-10 pr-4 h-11 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/15 transition-all"
            />
          </div>
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={areaQuery}
              onChange={e => setAreaQuery(e.target.value)}
              placeholder={t('search.areaPh')}
              className="w-full pl-10 pr-4 h-11 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/15 transition-all"
            />
          </div>
          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowMobileFilters(o => !o)}
            className="sm:hidden flex items-center gap-2 h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {t('search.filters')}
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 bg-[#0D9488] text-white text-xs font-bold rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile filters panel */}
        {showMobileFilters && (
          <div className="sm:hidden mt-4">
            {filtersPanel}
          </div>
        )}
      </div>

      {/* Content: filters + results */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop filter sidebar */}
        <div className="hidden sm:block w-[220px] flex-shrink-0 p-4 overflow-y-auto border-r border-slate-100 bg-slate-50/50">
          {filtersPanel}
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4" style={{ scrollbarWidth: 'none' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-slate-500">
              {t('search.found', { count: results.length })}
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Star className="w-3 h-3 fill-[#0D9488] text-[#0D9488]" />
              {t('search.bestRated')}
            </div>
          </div>

          {prosLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-[#0D9488]" />
            </div>
          ) : results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-slate-700 font-semibold mb-1">{t('search.noResults')}</p>
              <p className="text-sm text-slate-400">{t('search.adjustFilters')}</p>
              <button type="button" onClick={clearFilters} className="mt-4 text-sm text-[#0D9488] font-semibold hover:underline">
                {t('search.clearFilters')}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {results.map((prof) => (
                <ResultCard key={prof.id} prof={prof} onMessage={onMessagePro} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultCard({ prof, onMessage }: { prof: Professional; onMessage?: (prof: Professional) => void }) {
  const { fmt, t } = useAppSettings();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-md transition-shadow">
        <div className="flex gap-3 items-start">
          <div className="relative flex-shrink-0">
            <img
              src={prof.image}
              alt={prof.name}
              className="w-14 h-14 rounded-2xl object-cover border border-slate-100"
            />
            <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${prof.isOnline ? 'bg-green-500' : 'bg-slate-300'}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="text-sm font-semibold text-slate-800 leading-snug">{prof.name}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{prof.role}</p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100">
                  <Star className="w-3 h-3 fill-[#0D9488] text-[#0D9488]" />
                  <span className="text-xs font-semibold text-slate-700">{prof.rating}</span>
                </div>
                <span className="text-[10px] text-slate-400">{prof.completedJobs} {t('common.services')}</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">{prof.description}</p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">
                  {prof.priceUnit === '/hora' || prof.priceUnit === '/hour' ? t('common.from') : t('common.dailyFrom')}
                </span>
                <span className="text-sm font-semibold text-slate-800">
                  {fmt(prof.price, { decimals: 0 })}
                  <span className="text-xs font-normal text-slate-400">{prof.priceUnit}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${prof.isOnline ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                  {prof.isOnline ? t('common.online') : t('common.offline')}
                </span>
                {onMessage && (
                  <button
                    onClick={() => onMessage(prof)}
                    aria-label={t('common.message')}
                    title={t('common.message')}
                    className="w-8 h-8 rounded-xl border border-[#0D9488]/30 bg-[#ECFDF5]/60 hover:bg-[#ECFDF5] text-[#0D9488] flex items-center justify-center transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setShowModal(true)}
                  className={`${prof.isOnline ? 'bg-[#0D9488] hover:bg-[#0F766E]' : 'bg-slate-700 hover:bg-slate-800'} text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors`}
                >
                  {t('common.hire')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <HireModal
          professional={prof}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
