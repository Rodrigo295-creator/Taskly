import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

export function CategoryCard({ icon: Icon, label, onClick }: CategoryCardProps) {
  return (
    <div onClick={onClick} className="flex flex-col items-center justify-center bg-white border border-[#E2E8F0] rounded-[16px] shadow-[0_1px_3px_rgba(0,0,0,0.06)] h-[96px] cursor-pointer hover:border-[#FF5A12] transition-colors gap-2">
      <div className="w-10 h-10 rounded-[14px] bg-[#FFF0E6] flex items-center justify-center text-[#FF5A12]">
        <Icon className="w-[22px] h-[22px]" />
      </div>
      <span className="text-[13px] font-normal text-[#1E293B]">{label}</span>
    </div>
  );
}
