import { useState } from 'react';
import {
  FileText, Plus, Eye, Download, X, CheckCircle,
  Clock, AlertCircle, ChevronDown, ChevronUp, Send,
  Shield, Scale,
} from 'lucide-react';
import { useAppSettings } from '../context/AppSettings';

/* ── types ────────────────────────────────────────────────────────── */

type ContractStatus = 'rascunho' | 'aguardando' | 'assinado' | 'encerrado';

interface Contract {
  id: string;
  clientName: string;
  clientDoc: string;   // CPF ou CNPJ
  clientAddress: string;
  service: string;
  description: string;
  value: number;
  paymentForm: string;
  startDate: string;
  endDate: string;
  location: string;
  status: ContractStatus;
  createdAt: string;
  signedAt?: string;
}

/* ── mock contracts ──────────────────────────────────────────────── */

const INITIAL_CONTRACTS: Contract[] = [
  {
    id: 'c1',
    clientName: 'Marcos Vinicius Andrade',
    clientDoc: '432.109.876-54',
    clientAddress: 'Rua Vergueiro, 1245, Brooklin, São Paulo/SP, CEP 04101-000',
    service: 'Instalação de Tomadas Externas',
    description: 'Instalação de 2 (duas) tomadas externas NBR 14136, caixinhas de sobrepor com vedação IP44, fio 2,5mm² aterrado, em parede externa do imóvel localizado no endereço indicado.',
    value: 160,
    paymentForm: 'PIX, pagamento integral após conclusão e aceite do serviço.',
    startDate: '13/05/2026',
    endDate: '13/05/2026',
    location: 'Brooklin, São Paulo/SP',
    status: 'assinado',
    createdAt: '12/05/2026',
    signedAt: '12/05/2026',
  },
  {
    id: 'c2',
    clientName: 'Juliana Melo Carvalho',
    clientDoc: '321.098.765-43',
    clientAddress: 'Av. Faria Lima, 3477, Itaim Bibi, São Paulo/SP, CEP 04538-133',
    service: 'Reparo em Painel Elétrico',
    description: 'Substituição de disjuntor principal 40A, revisão de barramento, verificação e reaperto de conexões, com fornecimento de materiais.',
    value: 220,
    paymentForm: 'Transferência bancária, 50% antecipado e 50% após conclusão.',
    startDate: '15/05/2026',
    endDate: '15/05/2026',
    location: 'Itaim Bibi, São Paulo/SP',
    status: 'aguardando',
    createdAt: '14/05/2026',
  },
  {
    id: 'c3',
    clientName: 'Lucas Ferreira Barbosa',
    clientDoc: '210.987.654-32',
    clientAddress: 'Rua dos Pinheiros, 890, Santo André/SP, CEP 09210-000',
    service: 'Fiação Completa — Sala e Quartos',
    description: 'Execução de fiação elétrica completa em 3 quartos e sala, incluindo passagem de eletrodutos, instalação de tomadas padrão ABNT NBR 14136 e interruptores.',
    value: 380,
    paymentForm: '3 parcelas: 1ª no início, 2ª na metade, 3ª na entrega.',
    startDate: '05/05/2026',
    endDate: '06/05/2026',
    location: 'Santo André, SP',
    status: 'encerrado',
    createdAt: '03/05/2026',
    signedAt: '04/05/2026',
  },
];

/* ── helpers ─────────────────────────────────────────────────────── */

const STATUS_CONFIG: Record<ContractStatus, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  rascunho:   { label: 'Rascunho',         icon: FileText,    color: 'text-slate-600',  bg: 'bg-slate-100 border-slate-200' },
  aguardando: { label: 'Aguard. assinatura', icon: Clock,      color: 'text-amber-600',  bg: 'bg-amber-50 border-amber-200' },
  assinado:   { label: 'Assinado',          icon: CheckCircle, color: 'text-green-700',  bg: 'bg-green-50 border-green-200' },
  encerrado:  { label: 'Encerrado',         icon: AlertCircle, color: 'text-slate-400',  bg: 'bg-slate-50 border-slate-200' },
};

/* ── full contract text generator ───────────────────────────────── */

function buildContractText(c: Contract, proName: string, proDoc: string, proAddress: string): string {
  const fee = (c.value * 0.07).toFixed(2);
  const net = (c.value * 0.93).toFixed(2);
  return `CONTRATO DE PRESTAÇÃO DE SERVIÇOS AUTÔNOMOS

Fundamentado nos Arts. 593 a 609 do Código Civil Brasileiro (Lei n.º 10.406/2002),
na Lei n.º 13.467/2017 (Reforma Trabalhista — Art. 442-B da CLT),
na Lei n.º 13.709/2018 (LGPD) e na Lei n.º 14.063/2020 (Assinatura Digital).

════════════════════════════════════════════════════════
CLÁUSULA 1 — DAS PARTES
════════════════════════════════════════════════════════

CONTRATADO (Prestador de Serviços):
  Nome: ${proName}
  CPF/CNPJ: ${proDoc}
  Endereço: ${proAddress}
  Qualidade: Profissional autônomo

CONTRATANTE (Tomador de Serviços):
  Nome: ${c.clientName}
  CPF/CNPJ: ${c.clientDoc}
  Endereço: ${c.clientAddress}

════════════════════════════════════════════════════════
CLÁUSULA 2 — DO OBJETO
════════════════════════════════════════════════════════

O presente contrato tem por objeto a prestação de serviços de:

  "${c.service}"

Descrição técnica:
  ${c.description}

Local de execução: ${c.location}

O escopo está limitado ao descrito acima. Serviços adicionais
deverão ser formalizados em aditivo contratual.

════════════════════════════════════════════════════════
CLÁUSULA 3 — DO PRAZO DE EXECUÇÃO
════════════════════════════════════════════════════════

Início: ${c.startDate}
Conclusão prevista: ${c.endDate}

Prorrogações somente por escrito, mediante aditivo assinado
por ambas as partes (CC, Art. 598).

════════════════════════════════════════════════════════
CLÁUSULA 4 — DO VALOR E FORMA DE PAGAMENTO
════════════════════════════════════════════════════════

Valor total acordado:  R$ ${c.value.toFixed(2)} (${valorExtenso(c.value)})
Forma de pagamento:    ${c.paymentForm}
Multa por atraso:      1% ao mês + 0,033% ao dia (CC, Arts. 408-416)
Correção monetária:    IPCA (IBGE), após 30 dias de atraso

Nota: O CONTRATADO é responsável pelo recolhimento de seus
próprios tributos (ISS, IRPF/carnê-leão, INSS como contribuinte
individual), conforme legislação vigente. A taxa de intermediação
da plataforma Taskly (7% = R$ ${fee}) será deduzida do repasse,
ficando o CONTRATADO com R$ ${net} líquido.

════════════════════════════════════════════════════════
CLÁUSULA 5 — DAS OBRIGAÇÕES DO CONTRATADO
════════════════════════════════════════════════════════

5.1. Executar os serviços com diligência, perícia e boa-fé,
     observando as normas técnicas aplicáveis (CC, Art. 422).
5.2. Utilizar materiais e equipamentos adequados e seguros.
5.3. Cumprir os prazos estabelecidos na Cláusula 3.
5.4. Comunicar ao CONTRATANTE qualquer impedimento com
     antecedência mínima de 24 (vinte e quatro) horas.
5.5. Zelar pela segurança do local de trabalho durante a execução.
5.6. Emitir nota fiscal/recibo pelos serviços prestados.
5.7. Manter sigilo sobre informações confidenciais (Cláusula 8).

════════════════════════════════════════════════════════
CLÁUSULA 6 — DAS OBRIGAÇÕES DO CONTRATANTE
════════════════════════════════════════════════════════

6.1. Efetuar o pagamento na forma e prazo acordados.
6.2. Fornecer acesso ao local e informações necessárias
     para a execução do serviço.
6.3. Comunicar objeções ao serviço no prazo de 48 (quarenta
     e oito) horas após a conclusão.
6.4. Se pessoa jurídica: reter e recolher ISS e IRRF na fonte,
     conforme LC n.º 116/2003 e legislação federal aplicável.

════════════════════════════════════════════════════════
CLÁUSULA 7 — DA NATUREZA AUTÔNOMA DA RELAÇÃO
════════════════════════════════════════════════════════

O presente contrato não cria vínculo empregatício entre as
partes, nos termos do Art. 442-B da CLT (inserido pela Lei
n.º 13.467/2017), uma vez que:

  (a) O CONTRATADO possui plena autonomia técnica e
      metodológica na execução dos serviços;
  (b) Não há subordinação jurídica ou hierárquica;
  (c) A relação é eventual e por resultado (obra certa);
  (d) O CONTRATADO pode se fazer substituir por terceiro
      habilitado, desde que comunicado ao CONTRATANTE.

O CONTRATADO é responsável por seus próprios equipamentos,
tributos e seguros, não havendo qualquer obrigação
trabalhista ou previdenciária do CONTRATANTE, exceto
as retenções na fonte legalmente obrigatórias.

════════════════════════════════════════════════════════
CLÁUSULA 8 — DA CONFIDENCIALIDADE E PROTEÇÃO DE DADOS
════════════════════════════════════════════════════════

8.1. As partes comprometem-se a manter em sigilo todas as
     informações técnicas, comerciais e pessoais obtidas em
     razão deste contrato, durante sua vigência e por
     2 (dois) anos após seu encerramento.

8.2. Em conformidade com a Lei Geral de Proteção de Dados
     (Lei n.º 13.709/2018 — LGPD):
     (a) Os dados pessoais tratados serão utilizados
         exclusivamente para execução deste contrato;
     (b) O CONTRATADO atua como Operador de dados sob
         instrução do Controlador (CONTRATANTE);
     (c) Em caso de incidente de segurança, a parte
         responsável notificará a outra em até 72 horas.

8.3. A violação desta cláusula sujeitará a parte infratora
     a indenização por perdas e danos (CC, Art. 389).

════════════════════════════════════════════════════════
CLÁUSULA 9 — DA RESCISÃO
════════════════════════════════════════════════════════

9.1. Rescisão imotivada: qualquer das partes poderá
     rescindir este contrato mediante aviso prévio de
     8 (oito) dias, para contratos de duração inferior
     a 30 dias (CC, Art. 598).

9.2. Rescisão motivada (justa causa):
     — Pelo CONTRATANTE: inadimplemento de pagamento
       superior a 5 (cinco) dias úteis, ou recusa injustificada
       de acesso ao local de trabalho.
     — Pelo CONTRATADO: falta de pagamento, descumprimento
       de obrigação essencial, ou conduta que inviabilize
       a execução do serviço.

9.3. Em caso de rescisão imotivada pelo CONTRATANTE após
     início dos serviços, será devida ao CONTRATADO
     remuneração proporcional ao serviço executado.

9.4. Multa rescisória: 10% (dez por cento) do valor
     contratual total, em caso de rescisão injustificada
     por qualquer das partes.

════════════════════════════════════════════════════════
CLÁUSULA 10 — DAS GARANTIAS E RESPONSABILIDADES
════════════════════════════════════════════════════════

10.1. O CONTRATADO garante o serviço executado pelo prazo
      de 90 (noventa) dias para vícios aparentes e
      1 (um) ano para vícios ocultos (CDC, Art. 26, aplicado
      por analogia às relações de consumo).

10.2. Danos causados ao imóvel ou a terceiros durante a
      execução são de responsabilidade do CONTRATADO,
      salvo caso fortuito ou força maior (CC, Art. 393).

10.3. O CONTRATANTE não responde por acidentes de trabalho
      sofridos pelo CONTRATADO, que deverá manter seu
      próprio seguro ou contribuição previdenciária.

════════════════════════════════════════════════════════
CLÁUSULA 11 — DISPOSIÇÕES GERAIS
════════════════════════════════════════════════════════

11.1. Este contrato é regido pela legislação brasileira,
      especialmente o Código Civil (Arts. 593-609).

11.2. Qualquer alteração somente será válida por aditivo
      escrito assinado por ambas as partes.

11.3. A assinatura eletrônica deste instrumento possui plena
      validade jurídica, nos termos da MP n.º 2.200-2/2001
      e da Lei n.º 14.063/2020.

11.4. A tolerância de qualquer das partes quanto ao
      descumprimento de obrigação não implica novação
      ou renúncia ao direito correspondente.

════════════════════════════════════════════════════════
CLÁUSULA 12 — DO FORO
════════════════════════════════════════════════════════

Fica eleito o foro da Comarca de São Paulo/SP para dirimir
quaisquer controvérsias oriundas deste contrato, com
renúncia a qualquer outro, por mais privilegiado que seja
(CPC, Art. 63).

As partes declaram ter lido e compreendido todas as cláusulas
deste instrumento, assinando-o de livre e espontânea vontade.

São Paulo, ${c.createdAt}

_______________________________________________
${proName}
CPF/CNPJ: ${proDoc}
CONTRATADO

_______________________________________________
${c.clientName}
CPF/CNPJ: ${c.clientDoc}
CONTRATANTE

Testemunha 1: ________________________________
Testemunha 2: ________________________________`;
}

function valorExtenso(v: number): string {
  const map: Record<number, string> = {
    140: 'cento e quarenta reais', 160: 'cento e sessenta reais',
    180: 'cento e oitenta reais', 200: 'duzentos reais',
    220: 'duzentos e vinte reais', 250: 'duzentos e cinquenta reais',
    280: 'duzentos e oitenta reais', 380: 'trezentos e oitenta reais',
    400: 'quatrocentos reais', 475: 'quatrocentos e setenta e cinco reais',
  };
  return map[v] ?? `${v} reais`;
}

/* ── new contract form ───────────────────────────────────────────── */

const EMPTY: Omit<Contract, 'id' | 'status' | 'createdAt'> = {
  clientName: '', clientDoc: '', clientAddress: '',
  service: '', description: '', value: 0, paymentForm: '',
  startDate: '', endDate: '', location: '',
};

function NewContractModal({ onSave, onClose }: {
  onSave: (c: Contract) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState(EMPTY);
  const set = (k: keyof typeof EMPTY, v: string | number) => setForm(f => ({ ...f, [k]: v }));

  const valid = form.clientName && form.service && form.value > 0 && form.startDate;

  const save = () => {
    const today = new Date().toLocaleDateString('pt-BR');
    onSave({
      ...form,
      id: `c${Date.now()}`,
      status: 'rascunho',
      createdAt: today,
    });
  };

  return (
    <div className="absolute inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 flex-shrink-0">
          <div>
            <h3 className="font-bold text-slate-800 text-base">Novo contrato</h3>
            <p className="text-xs text-slate-400">Baseado no Código Civil, Arts. 593–609</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4" style={{ scrollbarWidth: 'none' }}>
          <Section title="Dados do cliente">
            <Field label="Nome completo" value={form.clientName} onChange={v => set('clientName', v)} placeholder="Nome do contratante" />
            <Field label="CPF ou CNPJ" value={form.clientDoc} onChange={v => set('clientDoc', v)} placeholder="000.000.000-00" />
            <Field label="Endereço completo" value={form.clientAddress} onChange={v => set('clientAddress', v)} placeholder="Rua, nº, bairro, cidade/UF, CEP" />
          </Section>
          <Section title="Serviço">
            <Field label="Nome do serviço" value={form.service} onChange={v => set('service', v)} placeholder="Ex: Instalação elétrica" />
            <Field label="Descrição técnica" value={form.description} onChange={v => set('description', v)} placeholder="Detalhe o que será feito, materiais, normas..." textarea />
            <Field label="Local de execução" value={form.location} onChange={v => set('location', v)} placeholder="Bairro, cidade/UF" />
          </Section>
          <Section title="Prazo">
            <div className="grid grid-cols-2 gap-2">
              <Field label="Data de início" value={form.startDate} onChange={v => set('startDate', v)} placeholder="DD/MM/AAAA" />
              <Field label="Data de conclusão" value={form.endDate} onChange={v => set('endDate', v)} placeholder="DD/MM/AAAA" />
            </div>
          </Section>
          <Section title="Financeiro">
            <Field label="Valor total (R$)" value={String(form.value || '')} onChange={v => set('value', Number(v))} placeholder="0,00" type="number" />
            <Field label="Forma de pagamento" value={form.paymentForm} onChange={v => set('paymentForm', v)} placeholder="Ex: PIX, pagamento após conclusão" />
            {form.value > 0 && (
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 grid grid-cols-3 gap-2 text-center text-xs">
                <div><p className="text-slate-400">Bruto</p><p className="font-bold text-slate-700">R$ {Number(form.value).toFixed(2)}</p></div>
                <div><p className="text-red-400">Taxa 7%</p><p className="font-bold text-red-500">−R$ {(Number(form.value)*0.07).toFixed(2)}</p></div>
                <div><p className="text-green-500">Líquido</p><p className="font-bold text-green-600">R$ {(Number(form.value)*0.93).toFixed(2)}</p></div>
              </div>
            )}
          </Section>
        </div>

        <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex-shrink-0 flex gap-2">
          <button onClick={onClose} className="flex-1 py-3 rounded-2xl bg-slate-100 text-slate-600 text-sm font-semibold hover:bg-slate-200 transition-colors">
            Cancelar
          </button>
          <button disabled={!valid} onClick={save}
            className="flex-1 py-3 rounded-2xl bg-[#0D9488] disabled:opacity-50 hover:bg-[#0F766E] text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2">
            <FileText className="w-4 h-4" /> Gerar contrato
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, textarea, type }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; textarea?: boolean; type?: string;
}) {
  const cls = "w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/15 transition-all placeholder:text-slate-400 resize-none";
  return (
    <div>
      <label className="text-xs font-semibold text-slate-500 block mb-1">{label}</label>
      {textarea
        ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} className={cls} />
        : <input type={type ?? 'text'} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />}
    </div>
  );
}

/* ── contract viewer ─────────────────────────────────────────────── */

const PRO_NAME    = 'Roberto Alves';
const PRO_DOC     = '123.456.789-00';
const PRO_ADDRESS = 'Rua das Acácias, 320, Apto 45, Vila Mariana, São Paulo/SP, CEP 04116-020';

function ContractViewer({ contract, onClose, onSend }: {
  contract: Contract;
  onClose: () => void;
  onSend: (id: string) => void;
}) {
  const [showLegal, setShowLegal] = useState(false);
  const text = buildContractText(contract, PRO_NAME, PRO_DOC, PRO_ADDRESS);

  return (
    <div className="absolute inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 flex-shrink-0">
          <div>
            <h3 className="font-bold text-slate-800 text-base truncate max-w-xs">{contract.service}</h3>
            <p className="text-xs text-slate-400">{contract.clientName} · {contract.createdAt}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 ml-3 flex-shrink-0"><X className="w-5 h-5" /></button>
        </div>

        {/* summary */}
        <div className="px-6 py-4 border-b border-slate-100 flex-shrink-0">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-slate-50 rounded-xl p-2.5">
              <p className="text-[10px] text-slate-400">Valor</p>
              <p className="text-sm font-bold text-slate-800">R$ {contract.value.toFixed(2)}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-2.5">
              <p className="text-[10px] text-slate-400">Início</p>
              <p className="text-sm font-bold text-slate-800">{contract.startDate}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-2.5">
              <p className="text-[10px] text-slate-400">Conclusão</p>
              <p className="text-sm font-bold text-slate-800">{contract.endDate}</p>
            </div>
          </div>

          {/* legal badges */}
          <div className="flex flex-wrap gap-2 mt-3">
            {[
              'CC Arts. 593–609',
              'CLT Art. 442-B',
              'LGPD',
              'Lei 14.063/2020',
            ].map(b => (
              <span key={b} className="flex items-center gap-1 text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full">
                <Scale className="w-2.5 h-2.5" />{b}
              </span>
            ))}
          </div>
        </div>

        {/* contract toggle */}
        <div className="flex-shrink-0 px-6 pt-3">
          <button
            onClick={() => setShowLegal(o => !o)}
            className="flex items-center justify-between w-full text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-[#0D9488]" />Ver texto completo do contrato</span>
            {showLegal ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* full legal text */}
        <div className="flex-1 overflow-y-auto px-6 py-3" style={{ scrollbarWidth: 'thin' }}>
          {showLegal && (
            <pre className="text-[11px] text-slate-600 leading-relaxed font-mono whitespace-pre-wrap bg-slate-50 border border-slate-200 rounded-xl p-4">
              {text}
            </pre>
          )}
        </div>

        {/* actions */}
        <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex-shrink-0 flex gap-2">
          {contract.status === 'rascunho' && (
            <button
              onClick={() => onSend(contract.id)}
              className="flex-1 py-3 rounded-2xl bg-[#0D9488] hover:bg-[#0F766E] text-white text-sm font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Enviar para cliente
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl bg-slate-100 text-slate-600 text-sm font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Baixar PDF
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── contract card ───────────────────────────────────────────────── */

function ContractCard({ contract, onView }: { contract: Contract; onView: () => void }) {
  const { label, icon: Icon, color, bg } = STATUS_CONFIG[contract.status];
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-slate-800 truncate">{contract.service}</h4>
          <p className="text-xs text-slate-500 mt-0.5">{contract.clientName}</p>
        </div>
        <span className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full border flex-shrink-0 ${bg} ${color}`}>
          <Icon className="w-3 h-3" />{label}
        </span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
        <span className="text-xs text-slate-400">📅 {contract.startDate}{contract.endDate !== contract.startDate ? ` → ${contract.endDate}` : ''}</span>
        <span className="text-xs text-slate-400">📍 {contract.location}</span>
        <span className="text-xs font-semibold text-[#0D9488]">R$ {contract.value.toFixed(2)}</span>
      </div>
      {contract.signedAt && (
        <div className="flex items-center gap-1 mt-2">
          <Shield className="w-3 h-3 text-green-500" />
          <span className="text-[10px] text-green-600 font-medium">Assinado em {contract.signedAt}</span>
        </div>
      )}
      <button
        onClick={onView}
        className="mt-3 w-full flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 py-2 rounded-xl transition-colors"
      >
        <Eye className="w-3.5 h-3.5" /> Ver contrato
      </button>
    </div>
  );
}

/* ── main ────────────────────────────────────────────────────────── */

export function ProContractsScreen() {
  const { t } = useAppSettings();
  const [contracts, setContracts] = useState<Contract[]>(INITIAL_CONTRACTS);
  const [showNew, setShowNew]     = useState(false);
  const [viewing, setViewing]     = useState<Contract | null>(null);
  const [filter, setFilter]       = useState<'todos' | ContractStatus>('todos');

  const addContract = (c: Contract) => {
    setContracts(prev => [c, ...prev]);
    setShowNew(false);
    setViewing(c);
  };

  const sendToClient = (id: string) => {
    setContracts(prev => prev.map(c => c.id === id ? { ...c, status: 'aguardando' } : c));
    setViewing(prev => prev && prev.id === id ? { ...prev, status: 'aguardando' } : prev);
  };

  const visible = filter === 'todos' ? contracts : contracts.filter(c => c.status === filter);
  const signed = contracts.filter(c => c.status === 'assinado').length;
  const pending = contracts.filter(c => c.status === 'aguardando').length;

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      <div className="flex-1 overflow-y-auto bg-white/40 dark:bg-slate-900/30 backdrop-blur-[2px]" style={{ scrollbarWidth: 'none' }}>

        {/* header */}
        <div className="bg-white border-b border-slate-100 px-5 pt-5 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800">{t('pro.contractsTitle')}</h2>
              <p className="text-xs text-slate-400">Baseado na legislação brasileira vigente</p>
            </div>
            <button
              onClick={() => setShowNew(true)}
              className="flex items-center gap-2 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
            >
              <Plus className="w-4 h-4" /> Novo
            </button>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-green-50 border border-green-100 rounded-2xl p-3">
              <CheckCircle className="w-4 h-4 text-green-600 mb-1" />
              <p className="text-base font-extrabold text-slate-800">{signed}</p>
              <p className="text-[10px] text-green-600 font-medium">Assinado{signed !== 1 ? 's' : ''}</p>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-3">
              <Clock className="w-4 h-4 text-amber-500 mb-1" />
              <p className="text-base font-extrabold text-slate-800">{pending}</p>
              <p className="text-[10px] text-amber-600 font-medium">Aguardando</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3">
              <FileText className="w-4 h-4 text-slate-400 mb-1" />
              <p className="text-base font-extrabold text-slate-800">{contracts.length}</p>
              <p className="text-[10px] text-slate-500 font-medium">Total</p>
            </div>
          </div>

          {/* legal note */}
          <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-xl p-3 mb-4">
            <Scale className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 leading-relaxed">
              Contratos gerados com base no <strong>Código Civil (Arts. 593–609)</strong>, CLT Art. 442-B, LGPD e Lei 14.063/2020. Assinatura digital com validade jurídica plena.
            </p>
          </div>

          {/* filter tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {(['todos', 'rascunho', 'aguardando', 'assinado', 'encerrado'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border whitespace-nowrap transition-colors ${
                  filter === f
                    ? 'bg-[#0D9488] text-white border-[#0D9488]'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-[#0D9488] hover:text-[#0D9488]'
                }`}>
                {f === 'todos' ? 'Todos' : STATUS_CONFIG[f].label}
              </button>
            ))}
          </div>
        </div>

        {/* list */}
        <div className="p-4 space-y-3">
          {visible.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <FileText className="w-10 h-10 text-slate-300 mb-3" />
              <p className="text-sm font-semibold text-slate-500 mb-1">Nenhum contrato aqui</p>
              <p className="text-xs text-slate-400">Crie um novo contrato usando o botão acima.</p>
            </div>
          ) : (
            visible.map(c => (
              <ContractCard key={c.id} contract={c} onView={() => setViewing(c)} />
            ))
          )}
          <div className="pb-4" />
        </div>
      </div>

      {showNew && <NewContractModal onSave={addContract} onClose={() => setShowNew(false)} />}
      {viewing && <ContractViewer contract={viewing} onClose={() => setViewing(null)} onSend={sendToClient} />}
    </div>
  );
}
