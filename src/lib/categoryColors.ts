/**
 * Category color chips — warm orange brand family + teal/azure complements.
 * Shared lightness/chroma so chips feel like one palette, not a rainbow.
 */

export const CATEGORY_CHIP: Record<string, string> = {
  Elétrica: 'bg-[#FFE8D6] text-[#C2410C] border-[#FFC9A3]',
  Limpeza: 'bg-[#D9F5F0] text-[#0F766E] border-[#9FDED4]',
  Hidráulica: 'bg-[#DCEBFF] text-[#1D4ED8] border-[#A8C8FF]',
  Pintura: 'bg-[#FFE0E6] text-[#BE123C] border-[#FFB3C1]',
  TI: 'bg-[#E4E7FF] text-[#3730A3] border-[#B4BCFF]',
  Construção: 'bg-[#F0E4D8] text-[#9A3412] border-[#D4B89A]',
  Aulas: 'bg-[#F9E0F5] text-[#A21CAF] border-[#E9A8DC]',
  Reparos: 'bg-[#FFE8C7] text-[#B45309] border-[#F5C97A]',
  Beleza: 'bg-[#FCE7F3] text-[#BE185D] border-[#F9A8D4]',
  Mudanças: 'bg-[#D1FAE5] text-[#047857] border-[#6EE7B7]',
  Tecnologia: 'bg-[#E4E7FF] text-[#3730A3] border-[#B4BCFF]',
  Montagem: 'bg-[#D9F3F8] text-[#0E7490] border-[#7DD3E8]',
  Outros: 'bg-[#EEEAE6] text-[#57534E] border-[#D6D3D1]',
};

/** Icon tile classes (no border) for grids / landing showcase */
export const CATEGORY_TILE: Record<string, string> = {
  Limpeza: 'bg-[#D9F5F0] text-[#0F766E]',
  Reparos: 'bg-[#FFE8C7] text-[#B45309]',
  Beleza: 'bg-[#FCE7F3] text-[#BE185D]',
  Mudanças: 'bg-[#D1FAE5] text-[#047857]',
  Tecnologia: 'bg-[#E4E7FF] text-[#3730A3]',
  Elétrica: 'bg-[#FFE8D6] text-[#C2410C]',
  Montagem: 'bg-[#D9F3F8] text-[#0E7490]',
  Outros: 'bg-[#EEEAE6] text-[#57534E]',
  Hidráulica: 'bg-[#DCEBFF] text-[#1D4ED8]',
  Pintura: 'bg-[#FFE0E6] text-[#BE123C]',
  TI: 'bg-[#E4E7FF] text-[#3730A3]',
  Construção: 'bg-[#F0E4D8] text-[#9A3412]',
  Aulas: 'bg-[#F9E0F5] text-[#A21CAF]',
};

export const CATEGORY_CHIP_FALLBACK =
  'bg-[#EEEAE6] text-[#57534E] border-[#D6D3D1]';

export function categoryChipClass(category: string): string {
  return CATEGORY_CHIP[category] ?? CATEGORY_CHIP_FALLBACK;
}
