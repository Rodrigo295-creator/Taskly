import { Search, Bell } from 'lucide-react';
import { BrandName } from './Logo';
import { useAppSettings } from '../context/AppSettings';

export function Header() {
  const { t } = useAppSettings();
  return (
    <header className="bg-[#0F172A] pt-10 sm:pt-12 pb-8 relative z-10 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="mb-1">
            <BrandName size="lg" onDark />
          </h1>
          <p className="text-[16px] text-white font-normal">
            {t('hdr.greeting')}
            <br className="sm:hidden" /> {t('hdr.greetingLine2')}
          </p>
        </div>
        <div className="relative mt-1 cursor-pointer">
          <Bell className="text-white w-6 h-6" />
          <span className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] bg-[#EF4444] text-white text-[11px] font-bold flex items-center justify-center rounded-full border-2 border-[#0F172A] leading-none pb-[1px]">
            3
          </span>
        </div>
      </div>

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] w-5 h-5" />
        <input
          type="text"
          placeholder={t('hdr.searchPh')}
          className="w-full bg-[#F5F4F0] text-[#1E293B] pl-12 pr-4 h-[50px] rounded-[30px] text-[15px] outline-none shadow-[0_1px_4px_rgba(0,0,0,0.06)] placeholder:text-[#94A3B8] transition-all focus:ring-2 focus:ring-[#0D9488]/20"
        />
      </div>
      </div>
    </header>
  );
}
