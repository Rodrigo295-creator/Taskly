import { useState } from 'react';
import {
  TrendingUp, TrendingDown, Banknote, Percent,
  CheckCircle, Clock, ChevronDown, ChevronUp,
  Zap, Building2, X, ArrowRight, Copy, AlertCircle,
} from 'lucide-react';
import { useAppSettings } from '../context/AppSettings';
import { categoryChipClass } from '@/lib/categoryColors';

/* ── data ────────────────────────────────────────────────────────── */

interface Transaction {
  id: string;
  service: string;
  category: string;
  client: string;
  date: string;
  gross: number;
  fee: number;
  net: number;
  type: 'credit' | 'withdrawal';
}

const TRANSACTIONS: Transaction[] = [
  { id: 't1', service: 'Instalação de tomadas externas', category: 'Elétrica', client: 'Marcos Vinicius',  date: '13 mai.', gross: 160,  fee: 11.20, net: 148.80, type: 'credit' },
  { id: 't2', service: 'Reparo em painel elétrico',       category: 'Elétrica', client: 'Juliana Melo',    date: '10 mai.', gross: 220,  fee: 15.40, net: 204.60, type: 'credit' },
  { id: 't3', service: 'Instalação de chuveiro elétrico', category: 'Elétrica', client: 'Amanda Costa',    date: '7 mai.',  gross: 140,  fee: 9.80,  net: 130.20, type: 'credit' },
  { id: 't4', service: 'Saque via PIX',                   category: '—',        client: '—',              date: '6 mai.',  gross: 0,    fee: 0,     net: -400,   type: 'withdrawal' },
  { id: 't5', service: 'Fiação completa sala e quartos',  category: 'Elétrica', client: 'Lucas Ferreira',  date: '5 mai.',  gross: 380,  fee: 26.60, net: 353.40, type: 'credit' },
  { id: 't6', service: 'Diagnóstico e revisão elétrica',  category: 'Elétrica', client: 'Ricardo Lima',    date: '28 abr.', gross: 180,  fee: 12.60, net: 167.40, type: 'credit' },
  { id: 't7', service: 'Instalação de ar-condicionado',   category: 'Elétrica', client: 'Fernanda Souza', date: '20 abr.', gross: 250,  fee: 17.50, net: 232.50, type: 'credit' },
  { id: 't8', service: 'Saque via Transferência',         category: '—',        client: '—',              date: '18 abr.', gross: 0,    fee: 0,     net: -600,   type: 'withdrawal' },
  { id: 't9', service: 'Revisão elétrica pré-vistoria',   category: 'Elétrica', client: 'Carlos Eduardo', date: '9 abr.',  gross: 200,  fee: 14.00, net: 186.00, type: 'credit' },
];


const credits     = TRANSACTIONS.filter(t => t.type === 'credit');
const totalGross  = credits.reduce((s, t) => s + t.gross, 0);
const totalFees   = credits.reduce((s, t) => s + t.fee, 0);
const totalNet    = credits.reduce((s, t) => s + t.net, 0);
const withdrawn   = Math.abs(TRANSACTIONS.filter(t => t.type === 'withdrawal').reduce((s, t) => s + t.net, 0));
const balance     = totalNet - withdrawn;

/* ── withdrawal modal ────────────────────────────────────────────── */

type WithdrawMethod = 'pix' | 'bank';

interface WithdrawState {
  method: WithdrawMethod;
  amount: string;
  // pix
  pixKey: string;
  pixKeyType: 'cpf' | 'cnpj' | 'email' | 'telefone' | 'aleatoria';
  // bank
  bankName: string;
  agency: string;
  account: string;
  accountType: 'corrente' | 'poupanca';
  cpf: string;
}

function WithdrawModal({ balance, onClose }: { balance: number; onClose: () => void }) {
  const { fmt, convert, symbol } = useAppSettings();
  const [step, setStep]   = useState<'form' | 'confirm' | 'success'>('form');
  const [form, setForm]   = useState<WithdrawState>({
    method: 'pix', amount: '', pixKey: '', pixKeyType: 'cpf',
    bankName: '', agency: '', account: '', accountType: 'corrente', cpf: '',
  });
  const set = (k: keyof WithdrawState, v: string) => setForm(f => ({ ...f, [k]: v }));

  // amount entered is in active currency; compare against converted balance
  const balanceConverted = convert(balance);
  const amt       = parseFloat(form.amount.replace(',', '.')) || 0;
  const validAmt  = amt > 0 && amt <= balanceConverted;
  const validPix  = form.method === 'pix' && form.pixKey.trim().length > 3;
  const validBank = form.method === 'bank' && form.bankName && form.agency && form.account && form.cpf;
  const canSubmit = validAmt && (validPix || validBank);

  if (step === 'success') return (
    <div className="absolute inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl text-center">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">Saque solicitado!</h3>
        <p className="text-sm text-slate-500 mb-1">
          <span className="font-semibold text-slate-700">{symbol} {amt.toFixed(2)}</span> via {form.method === 'pix' ? 'PIX' : 'Transferência Bancária'}
        </p>
        <p className="text-xs text-slate-400 mb-6">
          {form.method === 'pix' ? 'Crédito em até 30 minutos.' : 'Crédito em até 1 dia útil.'}
        </p>
        <button onClick={onClose} className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold py-3 rounded-2xl text-sm transition-colors">
          Fechar
        </button>
      </div>
    </div>
  );

  if (step === 'confirm') return (
    <div className="absolute inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl">
        <h3 className="font-bold text-slate-800 text-base mb-4">Confirmar saque</h3>
        <div className="bg-slate-50 rounded-2xl p-4 space-y-2.5 mb-5">
          <Row label="Valor" value={`${symbol} ${amt.toFixed(2)}`} bold />
          <Row label="Método" value={form.method === 'pix' ? 'PIX' : 'Transferência bancária'} />
          {form.method === 'pix'
            ? <Row label={`Chave (${form.pixKeyType})`} value={form.pixKey} />
            : <>
                <Row label="Banco" value={form.bankName} />
                <Row label="Agência / Conta" value={`${form.agency} / ${form.account} (${form.accountType})`} />
                <Row label="CPF" value={form.cpf} />
              </>}
          <div className="border-t border-slate-200 pt-2">
            <Row label="Saldo após saque" value={`${symbol} ${(balanceConverted - amt).toFixed(2)}`} />
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setStep('form')} className="flex-1 py-2.5 rounded-2xl bg-slate-100 text-slate-600 text-sm font-semibold hover:bg-slate-200 transition-colors">
            Voltar
          </button>
          <button onClick={() => setStep('success')} className="flex-1 py-2.5 rounded-2xl bg-[#0D9488] hover:bg-[#0F766E] text-white text-sm font-semibold transition-colors">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="absolute inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden">
        {/* modal header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-800 text-base">Solicitar saque</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
        </div>

        <div className="px-6 py-5 space-y-5 overflow-y-auto max-h-[70vh]">
          {/* balance */}
          <div className="bg-[#ECFDF5] rounded-2xl px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-slate-600">Saldo disponível</span>
            <span className="text-base font-extrabold text-[#0D9488]">{fmt(balance)}</span>
          </div>

          {/* amount */}
          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1.5">Valor do saque ({symbol})</label>
            <input
              type="number"
              value={form.amount}
              onChange={e => set('amount', e.target.value)}
              placeholder="0,00"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/15 transition-all"
            />
            {amt > balance && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />Valor acima do saldo disponível.</p>
            )}
            <div className="flex gap-2 mt-2">
              {[50, 100, 200].map(v => {
                const vConverted = parseFloat(convert(v).toFixed(2));
                return (
                  <button key={v} onClick={() => set('amount', String(Math.min(vConverted, balanceConverted)))}
                    className="flex-1 text-xs font-semibold py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                    {symbol} {vConverted.toFixed(0)}
                  </button>
                );
              })}
              <button onClick={() => set('amount', balanceConverted.toFixed(2))}
                className="flex-1 text-xs font-semibold py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                Tudo
              </button>
            </div>
          </div>

          {/* method tabs */}
          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1.5">Método</label>
            <div className="grid grid-cols-2 gap-2">
              {(['pix', 'bank'] as WithdrawMethod[]).map(m => (
                <button
                  key={m}
                  onClick={() => set('method', m)}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                    form.method === m
                      ? 'bg-[#0D9488] border-[#0D9488] text-white shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-[#0D9488]'
                  }`}
                >
                  {m === 'pix' ? <Zap className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                  {m === 'pix' ? 'PIX' : 'Transferência'}
                </button>
              ))}
            </div>
          </div>

          {/* pix fields */}
          {form.method === 'pix' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1.5">Tipo de chave</label>
                <select
                  value={form.pixKeyType}
                  onChange={e => set('pixKeyType', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0D9488] transition-all"
                >
                  <option value="cpf">CPF</option>
                  <option value="cnpj">CNPJ</option>
                  <option value="email">E-mail</option>
                  <option value="telefone">Telefone</option>
                  <option value="aleatoria">Chave aleatória</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1.5">Chave PIX</label>
                <input
                  value={form.pixKey}
                  onChange={e => set('pixKey', e.target.value)}
                  placeholder={form.pixKeyType === 'email' ? 'seu@email.com' : form.pixKeyType === 'telefone' ? '+55 11 99999-9999' : 'Digite sua chave'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/15 transition-all"
                />
              </div>
              <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-xl p-3">
                <Zap className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700">Saque via PIX é processado em até 30 minutos, todos os dias, 24h.</p>
              </div>
            </div>
          )}

          {/* bank fields */}
          {form.method === 'bank' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1.5">Banco</label>
                <input value={form.bankName} onChange={e => set('bankName', e.target.value)}
                  placeholder="Ex: Itaú, Bradesco, Nubank..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/15 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-500 block mb-1.5">Agência</label>
                  <input value={form.agency} onChange={e => set('agency', e.target.value)}
                    placeholder="0001"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0D9488] transition-all" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 block mb-1.5">Conta</label>
                  <input value={form.account} onChange={e => set('account', e.target.value)}
                    placeholder="12345-6"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0D9488] transition-all" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1.5">Tipo de conta</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['corrente', 'poupanca'] as const).map(t => (
                    <button key={t} onClick={() => set('accountType', t)}
                      className={`py-2 rounded-xl border text-xs font-semibold transition-colors ${
                        form.accountType === t ? 'bg-[#0D9488] border-[#0D9488] text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-[#0D9488]'
                      }`}>
                      {t === 'corrente' ? 'Corrente' : 'Poupança'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1.5">CPF do titular</label>
                <input value={form.cpf} onChange={e => set('cpf', e.target.value)}
                  placeholder="000.000.000-00"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/15 transition-all" />
              </div>
              <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl p-3">
                <Clock className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700">Transferência bancária processada em até 1 dia útil (dias úteis, horário bancário).</p>
              </div>
            </div>
          )}
        </div>

        {/* footer */}
        <div className="px-6 pb-6 pt-2">
          <button
            disabled={!canSubmit}
            onClick={() => setStep('confirm')}
            className="w-full bg-[#0D9488] disabled:opacity-50 hover:bg-[#0F766E] text-white font-bold py-3.5 rounded-2xl text-sm transition-colors flex items-center justify-center gap-2"
          >
            Continuar <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-slate-500">{label}</span>
      <span className={`text-xs ${bold ? 'font-bold text-slate-800' : 'text-slate-700'}`}>{value}</span>
    </div>
  );
}

/* ── transaction row ─────────────────────────────────────────────── */

function TxRow({ tx }: { tx: Transaction }) {
  const { fmt } = useAppSettings();
  const [open, setOpen] = useState(false);
  const isWithdraw = tx.type === 'withdrawal';

  return (
    <div className={`border rounded-2xl overflow-hidden transition-all ${open ? 'border-slate-300' : 'border-slate-200'} bg-white`}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center gap-3 px-4 py-3.5 text-left">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isWithdraw ? 'bg-slate-100' : 'bg-green-50'
        }`}>
          {isWithdraw
            ? <TrendingDown className="w-4 h-4 text-slate-500" />
            : <TrendingUp className="w-4 h-4 text-green-600" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800 truncate">{tx.service}</p>
          <p className="text-xs text-slate-400 mt-0.5">
            {isWithdraw ? tx.date : `${tx.client} · ${tx.date}`}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-sm font-bold ${isWithdraw ? 'text-slate-500' : 'text-green-600'}`}>
            {isWithdraw ? `− ${fmt(Math.abs(tx.net))}` : `+ ${fmt(tx.net)}`}
          </span>
          {open ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
        </div>
      </button>

      {open && !isWithdraw && (
        <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-3">
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white border border-slate-100 rounded-xl p-2.5 text-center">
              <p className="text-[10px] text-slate-400">Bruto</p>
              <p className="text-xs font-bold text-slate-700 mt-0.5">{fmt(tx.gross)}</p>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-xl p-2.5 text-center">
              <p className="text-[10px] text-red-400 flex items-center justify-center gap-0.5"><Percent className="w-2.5 h-2.5" />Taxa 7%</p>
              <p className="text-xs font-bold text-red-500 mt-0.5">− {fmt(tx.fee)}</p>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-xl p-2.5 text-center">
              <p className="text-[10px] text-green-500">Líquido</p>
              <p className="text-xs font-bold text-green-600 mt-0.5">{fmt(tx.net)}</p>
            </div>
          </div>
          {tx.category !== '—' && (
            <div className="mt-2 flex items-center gap-2">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${categoryChipClass(tx.category)}`}>
                {tx.category}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── main ────────────────────────────────────────────────────────── */

export function ProFinancialScreen() {
  const { fmt } = useAppSettings();
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = () => { setCopied(true); setTimeout(() => setCopied(false), 1800); };

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      <div className="flex-1 overflow-y-auto bg-white/40 dark:bg-slate-900/30 backdrop-blur-[2px]" style={{ scrollbarWidth: 'none' }}>

        {/* balance hero */}
        <div className="bg-[#0F172A] px-6 pt-6 pb-8 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#0D9488]/10 rounded-full blur-2xl" />
          <p className="text-sm text-slate-400 mb-1">Saldo disponível</p>
          <p className="text-4xl font-extrabold text-white tracking-tight">
            {fmt(balance)}
          </p>
          <p className="text-xs text-slate-400 mt-1">Atualizado agora</p>

          <div className="mt-5 flex gap-3">
            <button
              onClick={() => setShowWithdraw(true)}
              className="flex-1 bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold py-3 rounded-2xl text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Banknote className="w-4 h-4" /> Sacar
            </button>
            <button
              onClick={copy}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold py-3 px-4 rounded-2xl text-sm transition-colors"
            >
              <Copy className="w-4 h-4" />
              {copied ? 'Copiado!' : 'Copiar extrato'}
            </button>
          </div>
        </div>

        <div className="px-4 py-5 space-y-5">

          {/* KPI cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white border border-slate-200 rounded-2xl p-3">
              <p className="text-[10px] text-slate-400 mb-1">Faturado (bruto)</p>
              <p className="text-sm font-extrabold text-slate-800">{fmt(totalGross)}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{credits.length} serviços</p>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-2xl p-3">
              <p className="text-[10px] text-red-400 mb-1 flex items-center gap-0.5"><Percent className="w-2.5 h-2.5" />Taxa total</p>
              <p className="text-sm font-extrabold text-red-500">− {fmt(totalFees)}</p>
              <p className="text-[10px] text-red-300 mt-0.5">7% por serviço</p>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-2xl p-3">
              <p className="text-[10px] text-green-500 mb-1">Líquido</p>
              <p className="text-sm font-extrabold text-green-600">{fmt(totalNet)}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">sacado {fmt(withdrawn, { decimals: 0 })}</p>
            </div>
          </div>

          {/* fee explainer */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Percent className="w-4 h-4 text-[#0D9488]" />
              <span className="text-sm font-bold text-slate-800">Como a taxa é calculada</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-green-50 border border-green-100 rounded-xl p-2.5 text-center">
                <p className="text-[10px] text-slate-400">Valor cobrado</p>
                <p className="text-sm font-bold text-slate-700">{fmt(200)}</p>
              </div>
              <span className="text-slate-300 text-lg">−</span>
              <div className="flex-1 bg-red-50 border border-red-100 rounded-xl p-2.5 text-center">
                <p className="text-[10px] text-red-400">Taxa 7%</p>
                <p className="text-sm font-bold text-red-500">{fmt(14)}</p>
              </div>
              <span className="text-slate-300 text-lg">=</span>
              <div className="flex-1 bg-[#ECFDF5] border border-[#0D9488]/30 rounded-xl p-2.5 text-center">
                <p className="text-[10px] text-[#0D9488]">Você recebe</p>
                <p className="text-sm font-bold text-[#0D9488]">{fmt(186)}</p>
              </div>
            </div>
          </div>

          {/* transactions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-800">Extrato</h3>
              <span className="text-xs text-slate-400">maio 2026</span>
            </div>
            <div className="space-y-2">
              {TRANSACTIONS.map(tx => <TxRow key={tx.id} tx={tx} />)}
            </div>
          </div>

          <div className="pb-4" />
        </div>
      </div>

      {/* withdraw modal */}
      {showWithdraw && (
        <WithdrawModal balance={balance} onClose={() => setShowWithdraw(false)} />
      )}
    </div>
  );
}
