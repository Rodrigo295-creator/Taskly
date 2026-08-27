import { useState } from 'react';
import { ClipboardList, ChevronRight } from 'lucide-react';
import { useAppSettings } from '../context/AppSettings';
import { MOCK_ORDERS, type OrderTab } from '@/data/mockNavScreens';
import { SettingsPageShell } from './settings/SettingsUI';

const TABS: OrderTab[] = ['open', 'progress', 'done', 'cancelled'];

const TAB_LABEL: Record<OrderTab, string> = {
  open: 'orders.tab.open',
  progress: 'orders.tab.progress',
  done: 'orders.tab.done',
  cancelled: 'orders.tab.cancelled',
};

const STATUS_LABEL: Record<OrderTab, string> = {
  open: 'orders.status.open',
  progress: 'orders.status.progress',
  done: 'orders.status.done',
  cancelled: 'orders.status.cancelled',
};

export function OrdersScreen() {
  const { t } = useAppSettings();
  const [tab, setTab] = useState<OrderTab>('open');
  const items = MOCK_ORDERS.filter((o) => o.status === tab);

  return (
    <SettingsPageShell title={t('orders.title')} subtitle={t('orders.subtitle')}>
      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
              tab === id
                ? 'bg-[#FF5A12] text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {t(TAB_LABEL[id])}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 p-12 text-center text-slate-500">
          <ClipboardList className="w-10 h-10 mx-auto mb-3 opacity-40" />
          {t('orders.empty')}
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((order) => (
            <li
              key={order.id}
              className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-900/80 p-4 sm:p-5 shadow-sm"
            >
              <div className="flex justify-between gap-3 items-start">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#FF5A12]">
                    {order.category}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white mt-1">{order.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{order.date}</p>
                  {order.professionalName && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                      {order.professionalName}
                    </p>
                  )}
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
                  {t(STATUS_LABEL[order.status])}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="text-sm text-slate-500">
                  {order.budget && <span className="font-medium text-slate-700 dark:text-slate-300">{order.budget}</span>}
                  {order.status === 'open' && order.proposals > 0 && (
                    <span className="ml-2">{t('orders.proposals', { count: order.proposals })}</span>
                  )}
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#FF5A12] hover:underline"
                >
                  {t('orders.cta.view')}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </SettingsPageShell>
  );
}
