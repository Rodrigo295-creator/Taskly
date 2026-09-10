/**
 * Category chips — green / blue / white family (shared lightness).
 */

export const CATEGORY_CHIP: Record<string, string> = {
  Elétrica: 'bg-[#D1FAE5] text-[#115E59] border-[#6EE7B7]',
  Limpeza: 'bg-[#CCFBF1] text-[#0F766E] border-[#5EEAD4]',
  Hidráulica: 'bg-[#DBEAFE] text-[#1D4ED8] border-[#93C5FD]',
  Pintura: 'bg-[#E0F2FE] text-[#0369A1] border-[#7DD3FC]',
  TI: 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]',
  Construção: 'bg-[#ECFDF5] text-[#047857] border-[#6EE7B7]',
  Aulas: 'bg-[#F0FDFA] text-[#0F766E] border-[#99F6E4]',
  Reparos: 'bg-[#DBEAFE] text-[#1E40AF] border-[#93C5FD]',
  Beleza: 'bg-[#E0F2FE] text-[#0284C7] border-[#7DD3FC]',
  Mudanças: 'bg-[#D1FAE5] text-[#047857] border-[#6EE7B7]',
  Tecnologia: 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]',
  Montagem: 'bg-[#CFFAFE] text-[#0E7490] border-[#67E8F9]',
  Outros: 'bg-[#F8FAFC] text-[#475569] border-[#CBD5E1]',
};

/** Icon tile classes (no border) for grids / landing showcase */
export const CATEGORY_TILE: Record<string, string> = {
  Limpeza: 'bg-[#CCFBF1] text-[#0F766E]',
  Reparos: 'bg-[#DBEAFE] text-[#1E40AF]',
  Beleza: 'bg-[#E0F2FE] text-[#0284C7]',
  Mudanças: 'bg-[#D1FAE5] text-[#047857]',
  Tecnologia: 'bg-[#EFF6FF] text-[#1E40AF]',
  Elétrica: 'bg-[#D1FAE5] text-[#115E59]',
  Montagem: 'bg-[#CFFAFE] text-[#0E7490]',
  Outros: 'bg-[#F8FAFC] text-[#475569]',
  Hidráulica: 'bg-[#DBEAFE] text-[#1D4ED8]',
  Pintura: 'bg-[#E0F2FE] text-[#0369A1]',
  TI: 'bg-[#EFF6FF] text-[#1E40AF]',
  Construção: 'bg-[#ECFDF5] text-[#047857]',
  Aulas: 'bg-[#F0FDFA] text-[#0F766E]',
};

export const CATEGORY_CHIP_FALLBACK =
  'bg-[#F8FAFC] text-[#475569] border-[#CBD5E1]';

export function categoryChipClass(category: string): string {
  return CATEGORY_CHIP[category] ?? CATEGORY_CHIP_FALLBACK;
}
