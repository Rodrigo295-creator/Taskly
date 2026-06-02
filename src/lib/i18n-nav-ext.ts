/** Sidebar nav + placeholder screens (PT / EN / ES) */

export const NAV_EXT_PT: Record<string, string> = {
  'nav.orders': 'Meus pedidos',
  'nav.favorites': 'Favoritos',
  'nav.clientReviews': 'Avaliações',
  'nav.help': 'Ajuda e suporte',
  'nav.trust': 'Segurança e garantias',
  'nav.opportunities': 'Oportunidades',
  'nav.agenda': 'Agenda',
  'nav.section.general': 'Geral',

  'orders.title': 'Meus pedidos',
  'orders.subtitle': 'Acompanhe solicitações, propostas recebidas e serviços em andamento.',
  'orders.tab.open': 'Abertos',
  'orders.tab.progress': 'Em andamento',
  'orders.tab.done': 'Concluídos',
  'orders.tab.cancelled': 'Cancelados',
  'orders.empty': 'Nenhum pedido nesta categoria.',
  'orders.proposals': '{count} proposta(s)',
  'orders.status.open': 'Aguardando propostas',
  'orders.status.progress': 'Em andamento',
  'orders.status.done': 'Concluído',
  'orders.status.cancelled': 'Cancelado',
  'orders.cta.view': 'Ver detalhes',

  'opportunities.title': 'Oportunidades',
  'opportunities.subtitle': 'Pedidos de clientes na sua região. Responda para iniciar a conversa.',
  'opportunities.empty': 'Nenhuma oportunidade no momento. Novos pedidos aparecem aqui.',
  'opportunities.cta': 'Responder',
  'opportunities.distance': 'a {km} km',
  'opportunities.posted': 'Publicado {time}',

  'favorites.title': 'Favoritos',
  'favorites.subtitle': 'Profissionais que você salvou para contratar depois.',
  'favorites.empty': 'Você ainda não favoritou nenhum profissional.',
  'favorites.cta.search': 'Buscar profissionais',
  'favorites.remove': 'Remover',

  'clientReviews.title': 'Avaliações',
  'clientReviews.subtitle': 'Avalie serviços concluídos e veja o histórico das suas notas.',
  'clientReviews.pending': 'Pendentes de avaliar',
  'clientReviews.history': 'Minhas avaliações',
  'clientReviews.emptyPending': 'Nenhum serviço aguardando sua avaliação.',
  'clientReviews.cta.rate': 'Avaliar agora',
  'clientReviews.ratedOn': 'Avaliado em {date}',

  'help.title': 'Ajuda e suporte',
  'help.subtitle': 'Perguntas frequentes e canais para falar com a equipe Taskly.',
  'help.faq': 'Perguntas frequentes',
  'help.contact': 'Falar com o suporte',
  'help.chat': 'Chat com suporte',
  'help.chatSub': 'Atendimento em horário comercial',
  'help.email': 'E-mail',
  'help.emailSub': 'suporte@taskly.demo',
  'help.faq1q': 'Como faço um pedido de serviço?',
  'help.faq1a': 'Use Buscar ou Início, escolha a categoria e descreva o que precisa. Profissionais enviam propostas e você conversa pelo chat.',
  'help.faq2q': 'O plano limita quantos pedidos posso fazer?',
  'help.faq2a': 'Não. Clientes e profissionais podem conversar e fechar quantos serviços quiserem. O plano do profissional altera apenas a taxa sobre serviços concluídos.',
  'help.faq3q': 'Como funciona o pagamento?',
  'help.faq3a': 'O pagamento é combinado com o profissional. Em breve, integrações de pagamento dentro do app.',
  'help.faq4q': 'Como altero meu plano profissional?',
  'help.faq4a': 'Toque em Planos na barra superior ou acesse Preferências na sidebar.',

  'agenda.title': 'Agenda',
  'agenda.subtitle': 'Compromissos e visitas agendadas com clientes.',
  'agenda.today': 'Hoje',
  'agenda.upcoming': 'Próximos',
  'agenda.empty': 'Nenhum compromisso agendado.',
  'agenda.confirmed': 'Confirmado',
  'agenda.pending': 'Aguardando confirmação',

  'trust.title': 'Segurança e garantias',
  'trust.subtitle':
    'Transparência em pagamentos, verificação de profissionais, contratos digitais e proteção de dados — do pedido à conclusão do serviço.',
  'trust.introTitle': 'Compromisso Taskly',
  'trust.introBody':
    'Cada recurso abaixo explica como protegemos clientes e profissionais. Nosso objetivo é que você contrate e trabalhe com previsibilidade, sem surpresas.',

  'trust.payTitle': 'Pagamentos e taxas',
  'trust.payDesc':
    'O valor combinado no chat é o que o cliente paga. A taxa da plataforma é descontada apenas do repasse ao profissional, conforme o plano ativo.',
  'trust.pay.p1':
    'Pagamento retido na plataforma até o cliente confirmar que o serviço foi concluído — o profissional só recebe depois dessa confirmação.',
  'trust.pay.p2':
    'Taxas publicadas por plano (Básico, Pro, Premium): sem cobrança oculta por mensagem, busca ou número de pedidos.',
  'trust.pay.p3':
    'Extrato e repasse visíveis no painel do profissional, com valor bruto, taxa Taskly e valor líquido em cada serviço.',
  'trust.pay.p4':
    'Cancelamentos com mais de 24h de antecedência não geram taxa; com menos de 24h, pode haver retenção parcial para cobrir deslocamento.',
  'trust.pay.p5':
    'Dados de cartão e conta bancária são processados por parceiros certificados (PCI); não armazenamos número completo de cartão nem CVV.',

  'trust.verifyTitle': 'Profissionais verificados',
  'trust.verifyDesc':
    'Antes de aparecer nas buscas, o prestador passa por etapas de validação. Você vê sinais de confiança no perfil antes de contratar.',
  'trust.verify.p1':
    'Validação de identidade e dados de contato vinculados à conta — reduz perfis falsos e facilita responsabilização.',
  'trust.verify.p2':
    'Histórico de avaliações, serviços concluídos e tempo na plataforma exibidos de forma clara no cartão e no perfil.',
  'trust.verify.p3':
    'Categorias e preços declarados pelo profissional; o combinado final continua registrado no pedido e no contrato digital.',
  'trust.verify.p4':
    'Monitoramento de notas e denúncias recorrentes; perfis que violam regras podem ser suspensos ou removidos.',
  'trust.verify.p5':
    'Selo de plano (Básico, Pro, Premium) indica nível de assinatura, não substitui a sua avaliação após cada serviço.',

  'trust.contractTitle': 'Contratos digitais',
  'trust.contractDesc':
    'Tudo que for acordado no app pode ficar registrado em um contrato digital acessível às duas partes.',
  'trust.contract.p1':
    'Resumo do serviço, data, horário, endereço, valor e status (pendente, aceito, em andamento, concluído).',
  'trust.contract.p2':
    'Cliente e profissional consultam o mesmo documento na plataforma — menos divergência sobre o que foi combinado.',
  'trust.contract.p3':
    'Registro com data e hora vinculado ao pedido; útil em caso de dúvida, cancelamento ou mediação.',
  'trust.contract.p4':
    'Complementos negociados no chat podem ser refletidos na proposta antes da aceitação formal.',

  'trust.disputeTitle': 'Mediação de conflitos',
  'trust.disputeDesc':
    'Se algo sair do combinado, há canal de suporte e regras claras — inclusive com valor retido enquanto o caso é analisado.',
  'trust.dispute.p1':
    'Abertura de chamado pelo app ou e-mail de suporte, informando número do pedido e descrição do problema.',
  'trust.dispute.p2':
    'Durante a análise, o repasse ao profissional pode permanecer bloqueado até decisão da equipe Taskly.',
  'trust.dispute.p3':
    'Mediação imparcial com base no contrato digital, mensagens na plataforma e evidências enviadas pelas partes.',
  'trust.dispute.p4':
    'Prazos de resposta informados no canal de ajuda; casos urgentes (segurança) têm prioridade.',
  'trust.dispute.p5':
    'Soluções possíveis: reexecução do serviço, reembolso parcial ou total, conforme política e gravidade do caso.',

  'trust.privacyTitle': 'Privacidade (LGPD)',
  'trust.privacyDesc':
    'Tratamos dados pessoais com finalidade definida, segurança técnica e respeito aos seus direitos. Abaixo, o que guardamos, o que não guardamos e como protegemos.',
  'trust.privacy.storedTitle': 'Dados que armazenamos',
  'trust.privacy.storedIntro':
    'Informações necessárias para o app funcionar ficam em nosso banco de dados (PostgreSQL na Supabase, infraestrutura em nuvem):',
  'trust.privacy.stored1':
    'Conta: nome, e-mail, telefone, tipo de perfil (cliente ou profissional) e preferências do app (idioma, tema).',
  'trust.privacy.stored2':
    'Perfil profissional: foto, descrição, categorias, preços, área de atendimento, avaliações e selo de plano.',
  'trust.privacy.stored3':
    'Pedidos e serviços: descrição do pedido, endereço de atendimento, datas, valores, status e histórico.',
  'trust.privacy.stored4':
    'Mensagens e propostas trocadas na plataforma, vinculadas ao pedido, para suporte e mediação.',
  'trust.privacy.stored5':
    'Contratos digitais, avaliações após conclusão e registros financeiros (valores, taxas, status de repasse).',
  'trust.privacy.stored6':
    'Referências de pagamento (ex.: últimos dígitos, ID da transação) — nunca o cartão completo.',
  'trust.privacy.notStoredTitle': 'Dados que não armazenamos',
  'trust.privacy.notStoredIntro':
    'Algumas informações sensíveis ficam apenas com parceiros de pagamento ou simplesmente não coletamos:',
  'trust.privacy.notStored1': 'Número completo de cartão de crédito, CVV ou senha do cartão.',
  'trust.privacy.notStored2': 'Senha de internet banking ou credenciais de banco do profissional (apenas dados para repasse, quando informados).',
  'trust.privacy.notStored3':
    'Conversas feitas fora do app (WhatsApp, telefone) — não temos acesso nem responsabilidade sobre elas.',
  'trust.privacy.notStored4':
    'Venda ou aluguel de listas de contatos a terceiros para marketing — não é prática do Taskly.',
  'trust.privacy.notStored5':
    'Dados sem finalidade clara: coletamos o mínimo necessário para conectar cliente e profissional com segurança.',
  'trust.privacy.secureTitle': 'Como os dados ficam seguros',
  'trust.privacy.secureIntro':
    'Camadas técnicas e organizacionais para reduzir risco de acesso indevido ou vazamento:',
  'trust.privacy.secure1':
    'Conexão criptografada (HTTPS/TLS) entre seu navegador e nossos servidores em toda navegação.',
  'trust.privacy.secure2':
    'Banco PostgreSQL gerenciado (Supabase) com controle de acesso por linha (RLS): cada usuário só acessa o que é seu.',
  'trust.privacy.secure3':
    'Chaves de API públicas no app com permissões limitadas; operações sensíveis ficam no servidor, não no celular.',
  'trust.privacy.secure4':
    'Backups e monitoramento da infraestrutura pelo provedor; revisões periódicas de políticas de acesso.',
  'trust.privacy.secure5':
    'Equipe interna com acesso restrito aos dados; uso apenas para suporte, fraude ou obrigação legal.',
  'trust.privacy.rightsTitle': 'Seus direitos (LGPD)',
  'trust.privacy.rightsIntro':
    'Você controla seus dados pessoais conforme a Lei Geral de Proteção de Dados:',
  'trust.privacy.rights1':
    'Acesso e correção: atualize nome, contato e endereços em Minha conta e Preferências.',
  'trust.privacy.rights2':
    'Exportação e exclusão: solicite cópia dos dados ou exclusão da conta pelo suporte (em Preferências → Privacidade).',
  'trust.privacy.rights3':
    'Revogação de consentimento e dúvidas: escreva para o e-mail de privacidade indicado na central de ajuda.',

  'trust.guaranteeTitle': 'Garantia Taskly',
  'trust.guaranteeDesc':
    'Programa de proteção para serviços contratados e pagos pela plataforma, com critérios de elegibilidade publicados.',
  'trust.guarantee.p1':
    'Cobre falhas graves em relação ao combinado no contrato digital (ex.: serviço não realizado sem justificativa).',
  'trust.guarantee.p2':
    'Pedido deve ter sido criado, pago e concluído pelo fluxo oficial do app — negócios só por WhatsApp ficam fora.',
  'trust.guarantee.p3':
    'Análise em até o prazo informado na política; pode resultar em crédito, reembolso ou nova indicação de profissional.',
  'trust.guarantee.p4':
    'Detalhes completos do programa serão publicados antes da ativação em produção; esta versão pode estar em evolução.',
};

export const NAV_EXT_EN: Record<string, string> = {
  'nav.orders': 'My orders',
  'nav.favorites': 'Favorites',
  'nav.clientReviews': 'Reviews',
  'nav.help': 'Help & support',
  'nav.trust': 'Security & guarantees',
  'nav.opportunities': 'Opportunities',
  'nav.agenda': 'Schedule',
  'nav.section.general': 'General',

  'orders.title': 'My orders',
  'orders.subtitle': 'Track requests, received quotes, and services in progress.',
  'orders.tab.open': 'Open',
  'orders.tab.progress': 'In progress',
  'orders.tab.done': 'Completed',
  'orders.tab.cancelled': 'Cancelled',
  'orders.empty': 'No orders in this category.',
  'orders.proposals': '{count} quote(s)',
  'orders.status.open': 'Awaiting quotes',
  'orders.status.progress': 'In progress',
  'orders.status.done': 'Completed',
  'orders.status.cancelled': 'Cancelled',
  'orders.cta.view': 'View details',

  'opportunities.title': 'Opportunities',
  'opportunities.subtitle': 'Client requests in your area. Reply to start a conversation.',
  'opportunities.empty': 'No opportunities right now. New requests will appear here.',
  'opportunities.cta': 'Reply',
  'opportunities.distance': '{km} km away',
  'opportunities.posted': 'Posted {time}',

  'favorites.title': 'Favorites',
  'favorites.subtitle': 'Professionals you saved to hire later.',
  'favorites.empty': 'You have not favorited any professionals yet.',
  'favorites.cta.search': 'Find professionals',
  'favorites.remove': 'Remove',

  'clientReviews.title': 'Reviews',
  'clientReviews.subtitle': 'Rate completed services and see your review history.',
  'clientReviews.pending': 'Pending review',
  'clientReviews.history': 'My reviews',
  'clientReviews.emptyPending': 'No services waiting for your review.',
  'clientReviews.cta.rate': 'Rate now',
  'clientReviews.ratedOn': 'Rated on {date}',

  'help.title': 'Help & support',
  'help.subtitle': 'FAQs and ways to reach the Taskly team.',
  'help.faq': 'Frequently asked questions',
  'help.contact': 'Contact support',
  'help.chat': 'Support chat',
  'help.chatSub': 'Business hours',
  'help.email': 'Email',
  'help.emailSub': 'support@taskly.demo',
  'help.faq1q': 'How do I request a service?',
  'help.faq1a': 'Use Search or Home, pick a category, and describe what you need. Professionals send quotes and you chat in the app.',
  'help.faq2q': 'Does my plan limit how many orders I can make?',
  'help.faq2a': 'No. Clients and professionals can chat and complete as many jobs as they want. Pro plans only change the fee on completed services.',
  'help.faq3q': 'How does payment work?',
  'help.faq3a': 'Payment is arranged with the professional. In-app payments are coming soon.',
  'help.faq4q': 'How do I change my professional plan?',
  'help.faq4a': 'Tap Plans in the top bar or open Preferences in the sidebar.',

  'agenda.title': 'Schedule',
  'agenda.subtitle': 'Appointments and scheduled visits with clients.',
  'agenda.today': 'Today',
  'agenda.upcoming': 'Upcoming',
  'agenda.empty': 'No scheduled appointments.',
  'agenda.confirmed': 'Confirmed',
  'agenda.pending': 'Awaiting confirmation',

  'trust.title': 'Security & guarantees',
  'trust.subtitle':
    'Transparency on payments, pro verification, digital contracts, and data protection — from request to job completion.',
  'trust.introTitle': 'The Taskly commitment',
  'trust.introBody':
    'Each section below explains how we protect clients and professionals. Our goal is predictable hiring and work, without surprises.',

  'trust.payTitle': 'Payments & fees',
  'trust.payDesc':
    'The amount agreed in chat is what the client pays. The platform fee is deducted only from the pro payout, based on the active plan.',
  'trust.pay.p1':
    'Payment is held on the platform until the client confirms the service is done — the pro is paid only after that.',
  'trust.pay.p2':
    'Published fees per plan (Basic, Pro, Premium): no hidden charges for messages, search, or number of orders.',
  'trust.pay.p3':
    'Payout statement in the pro dashboard showing gross amount, Taskly fee, and net per job.',
  'trust.pay.p4':
    'Cancellations more than 24h in advance are free; under 24h, a partial hold may apply for travel costs.',
  'trust.pay.p5':
    'Card and bank data are processed by certified partners (PCI); we never store full card numbers or CVV.',

  'trust.verifyTitle': 'Verified professionals',
  'trust.verifyDesc':
    'Before appearing in search, providers go through validation. You see trust signals on the profile before hiring.',
  'trust.verify.p1':
    'Identity and contact validation tied to the account — reduces fake profiles and improves accountability.',
  'trust.verify.p2':
    'Review history, completed jobs, and time on the platform shown clearly on cards and profiles.',
  'trust.verify.p3':
    'Categories and listed prices declared by the pro; the final deal is still recorded on the order and digital contract.',
  'trust.verify.p4':
    'Monitoring of ratings and repeated reports; accounts that break rules may be suspended or removed.',
  'trust.verify.p5':
    'Plan badge (Basic, Pro, Premium) shows subscription tier — it does not replace your rating after each job.',

  'trust.contractTitle': 'Digital contracts',
  'trust.contractDesc':
    'What you agree in the app can be recorded in a digital contract both parties can access.',
  'trust.contract.p1':
    'Summary of service, date, time, address, amount, and status (pending, accepted, in progress, completed).',
  'trust.contract.p2':
    'Client and pro see the same document on the platform — less disagreement about what was agreed.',
  'trust.contract.p3':
    'Timestamped record linked to the order; useful for questions, cancellation, or mediation.',
  'trust.contract.p4':
    'Extras negotiated in chat can be reflected in the proposal before formal acceptance.',

  'trust.disputeTitle': 'Dispute mediation',
  'trust.disputeDesc':
    'If something goes wrong, there is support and clear rules — including holds while a case is reviewed.',
  'trust.dispute.p1':
    'Open a ticket in the app or by support email with order ID and a description of the issue.',
  'trust.dispute.p2':
    'During review, payout to the pro may stay blocked until Taskly decides.',
  'trust.dispute.p3':
    'Fair mediation based on the digital contract, in-app messages, and evidence from both sides.',
  'trust.dispute.p4':
    'Response times listed in Help; urgent safety cases are prioritized.',
  'trust.dispute.p5':
    'Outcomes may include redoing the service, partial refund, or full refund per policy and severity.',

  'trust.privacyTitle': 'Privacy (GDPR / LGPD)',
  'trust.privacyDesc':
    'We process personal data with a defined purpose, technical security, and respect for your rights. Below: what we store, what we do not, and how we protect it.',
  'trust.privacy.storedTitle': 'Data we store',
  'trust.privacy.storedIntro':
    'Information needed to run the app is kept in our database (PostgreSQL on Supabase, cloud infrastructure):',
  'trust.privacy.stored1':
    'Account: name, email, phone, profile type (client or pro), and app preferences (language, theme).',
  'trust.privacy.stored2':
    'Pro profile: photo, description, categories, prices, service area, reviews, and plan badge.',
  'trust.privacy.stored3':
    'Orders and jobs: request description, service address, dates, amounts, status, and history.',
  'trust.privacy.stored4':
    'Messages and proposals on the platform, linked to the order, for support and mediation.',
  'trust.privacy.stored5':
    'Digital contracts, post-completion reviews, and financial records (amounts, fees, payout status).',
  'trust.privacy.stored6':
    'Payment references (e.g. last digits, transaction ID) — never the full card number.',
  'trust.privacy.notStoredTitle': 'Data we do not store',
  'trust.privacy.notStoredIntro':
    'Some sensitive data stays only with payment partners or we simply do not collect it:',
  'trust.privacy.notStored1': 'Full credit card number, CVV, or card password.',
  'trust.privacy.notStored2':
    'Internet banking passwords or bank login credentials (only payout details when the pro provides them).',
  'trust.privacy.notStored3':
    'Chats outside the app (WhatsApp, phone) — we have no access and no responsibility for them.',
  'trust.privacy.notStored4':
    'Selling or renting contact lists to third parties for marketing — not a Taskly practice.',
  'trust.privacy.notStored5':
    'Data without a clear purpose: we collect the minimum needed to connect client and pro safely.',
  'trust.privacy.secureTitle': 'How data stays secure',
  'trust.privacy.secureIntro':
    'Technical and organizational layers to reduce unauthorized access or leaks:',
  'trust.privacy.secure1':
    'Encrypted connection (HTTPS/TLS) between your browser and our servers at all times.',
  'trust.privacy.secure2':
    'Managed PostgreSQL (Supabase) with row-level security (RLS): each user only accesses their own data.',
  'trust.privacy.secure3':
    'Public API keys in the app have limited permissions; sensitive operations run on the server, not the device.',
  'trust.privacy.secure4':
    'Infrastructure backups and monitoring by the provider; periodic access policy reviews.',
  'trust.privacy.secure5':
    'Internal team access is restricted; data is used only for support, fraud, or legal duty.',
  'trust.privacy.rightsTitle': 'Your rights',
  'trust.privacy.rightsIntro':
    'You control your personal data under applicable privacy law (including LGPD in Brazil):',
  'trust.privacy.rights1':
    'Access and correction: update name, contact, and addresses in My account and Preferences.',
  'trust.privacy.rights2':
    'Export and deletion: request a copy or account deletion via support (Preferences → Privacy).',
  'trust.privacy.rights3':
    'Withdraw consent or ask questions: contact the privacy email listed in Help.',

  'trust.guaranteeTitle': 'Taskly guarantee',
  'trust.guaranteeDesc':
    'Protection program for services booked and paid through the platform, with published eligibility rules.',
  'trust.guarantee.p1':
    'Covers serious failure vs. the digital contract (e.g. service not done without valid reason).',
  'trust.guarantee.p2':
    'The order must be created, paid, and completed through the official app flow — off-platform deals are excluded.',
  'trust.guarantee.p3':
    'Review within the stated policy timeframe; may result in credit, refund, or a new pro referral.',
  'trust.guarantee.p4':
    'Full program details will be published before production launch; this version may still be evolving.',
};

export const NAV_EXT_ES: Record<string, string> = {
  'nav.orders': 'Mis pedidos',
  'nav.favorites': 'Favoritos',
  'nav.clientReviews': 'Reseñas',
  'nav.help': 'Ayuda y soporte',
  'nav.trust': 'Seguridad y garantías',
  'nav.opportunities': 'Oportunidades',
  'nav.agenda': 'Agenda',
  'nav.section.general': 'General',

  'orders.title': 'Mis pedidos',
  'orders.subtitle': 'Sigue solicitudes, propuestas recibidas y servicios en curso.',
  'orders.tab.open': 'Abiertos',
  'orders.tab.progress': 'En curso',
  'orders.tab.done': 'Completados',
  'orders.tab.cancelled': 'Cancelados',
  'orders.empty': 'Ningún pedido en esta categoría.',
  'orders.proposals': '{count} propuesta(s)',
  'orders.status.open': 'Esperando propuestas',
  'orders.status.progress': 'En curso',
  'orders.status.done': 'Completado',
  'orders.status.cancelled': 'Cancelado',
  'orders.cta.view': 'Ver detalles',

  'opportunities.title': 'Oportunidades',
  'opportunities.subtitle': 'Pedidos de clientes en tu zona. Responde para iniciar la conversación.',
  'opportunities.empty': 'Sin oportunidades por ahora. Los nuevos pedidos aparecerán aquí.',
  'opportunities.cta': 'Responder',
  'opportunities.distance': 'a {km} km',
  'opportunities.posted': 'Publicado {time}',

  'favorites.title': 'Favoritos',
  'favorites.subtitle': 'Profesionales que guardaste para contratar después.',
  'favorites.empty': 'Aún no has guardado ningún profesional.',
  'favorites.cta.search': 'Buscar profesionales',
  'favorites.remove': 'Eliminar',

  'clientReviews.title': 'Reseñas',
  'clientReviews.subtitle': 'Valora servicios completados y consulta tu historial.',
  'clientReviews.pending': 'Pendientes de valorar',
  'clientReviews.history': 'Mis reseñas',
  'clientReviews.emptyPending': 'Ningún servicio esperando tu reseña.',
  'clientReviews.cta.rate': 'Valorar ahora',
  'clientReviews.ratedOn': 'Valorado el {date}',

  'help.title': 'Ayuda y soporte',
  'help.subtitle': 'Preguntas frecuentes y canales para contactar al equipo Taskly.',
  'help.faq': 'Preguntas frecuentes',
  'help.contact': 'Contactar soporte',
  'help.chat': 'Chat de soporte',
  'help.chatSub': 'Horario comercial',
  'help.email': 'Correo',
  'help.emailSub': 'soporte@taskly.demo',
  'help.faq1q': '¿Cómo solicito un servicio?',
  'help.faq1a': 'Usa Buscar o Inicio, elige la categoría y describe lo que necesitas. Los profesionales envían propuestas y chateas en la app.',
  'help.faq2q': '¿El plan limita cuántos pedidos puedo hacer?',
  'help.faq2a': 'No. Clientes y profesionales pueden conversar y cerrar todos los servicios que quieran. El plan solo cambia la comisión del profesional.',
  'help.faq3q': '¿Cómo funciona el pago?',
  'help.faq3a': 'El pago se acuerda con el profesional. Pronto habrá pagos integrados en la app.',
  'help.faq4q': '¿Cómo cambio mi plan profesional?',
  'help.faq4a': 'Toca Planes en la barra superior o Preferencias en la barra lateral.',

  'agenda.title': 'Agenda',
  'agenda.subtitle': 'Citas y visitas programadas con clientes.',
  'agenda.today': 'Hoy',
  'agenda.upcoming': 'Próximos',
  'agenda.empty': 'Sin citas programadas.',
  'agenda.confirmed': 'Confirmado',
  'agenda.pending': 'Esperando confirmación',

  'trust.title': 'Seguridad y garantías',
  'trust.subtitle':
    'Transparencia en pagos, verificación de profesionales, contratos digitales y protección de datos — del pedido a la finalización.',
  'trust.introTitle': 'Compromiso Taskly',
  'trust.introBody':
    'Cada sección explica cómo protegemos a clientes y profesionales. Queremos que contrates y trabajes con previsibilidad, sin sorpresas.',

  'trust.payTitle': 'Pagos y comisiones',
  'trust.payDesc':
    'El valor acordado en el chat es lo que paga el cliente. La comisión se descuenta solo del pago al profesional, según el plan activo.',
  'trust.pay.p1':
    'El pago se retiene en la plataforma hasta que el cliente confirme el servicio — el profesional cobra después.',
  'trust.pay.p2':
    'Comisiones publicadas por plan (Básico, Pro, Premium): sin cargos ocultos por mensajes, búsqueda o cantidad de pedidos.',
  'trust.pay.p3':
    'Extracto visible en el panel del profesional: importe bruto, comisión Taskly y neto por servicio.',
  'trust.pay.p4':
    'Cancelaciones con más de 24h de antelación sin cargo; con menos de 24h puede aplicarse retención parcial por desplazamiento.',
  'trust.pay.p5':
    'Datos de tarjeta y cuenta los procesan socios certificados (PCI); no guardamos número completo de tarjeta ni CVV.',

  'trust.verifyTitle': 'Profesionales verificados',
  'trust.verifyDesc':
    'Antes de aparecer en búsquedas, el prestador pasa validaciones. Ves señales de confianza en el perfil antes de contratar.',
  'trust.verify.p1':
    'Validación de identidad y contacto vinculada a la cuenta — reduce perfiles falsos.',
  'trust.verify.p2':
    'Historial de reseñas, trabajos completados y tiempo en la plataforma visibles en tarjetas y perfiles.',
  'trust.verify.p3':
    'Categorías y precios declarados; el acuerdo final queda en el pedido y contrato digital.',
  'trust.verify.p4':
    'Monitoreo de notas y denuncias; cuentas que incumplen reglas pueden suspenderse o eliminarse.',
  'trust.verify.p5':
    'Insignia de plan (Básico, Pro, Premium) indica suscripción — no sustituye tu reseña tras cada servicio.',

  'trust.contractTitle': 'Contratos digitales',
  'trust.contractDesc':
    'Lo acordado en la app puede registrarse en un contrato digital accesible para ambas partes.',
  'trust.contract.p1':
    'Resumen del servicio, fecha, hora, dirección, importe y estado (pendiente, aceptado, en curso, completado).',
  'trust.contract.p2':
    'Cliente y profesional ven el mismo documento — menos disputas sobre lo pactado.',
  'trust.contract.p3':
    'Registro con fecha y hora vinculado al pedido; útil ante dudas, cancelación o mediación.',
  'trust.contract.p4':
    'Extras negociados en el chat pueden reflejarse en la propuesta antes de la aceptación formal.',

  'trust.disputeTitle': 'Mediación de conflictos',
  'trust.disputeDesc':
    'Si algo sale mal, hay soporte y reglas claras — incluso retención del pago mientras se analiza el caso.',
  'trust.dispute.p1':
    'Abre un ticket en la app o por correo de soporte con número de pedido y descripción del problema.',
  'trust.dispute.p2':
    'Durante el análisis, el pago al profesional puede bloquearse hasta decisión de Taskly.',
  'trust.dispute.p3':
    'Mediación imparcial según contrato digital, mensajes en la plataforma y pruebas de ambas partes.',
  'trust.dispute.p4':
    'Plazos de respuesta en Ayuda; casos urgentes de seguridad tienen prioridad.',
  'trust.dispute.p5':
    'Posibles soluciones: repetir servicio, reembolso parcial o total según política y gravedad.',

  'trust.privacyTitle': 'Privacidad (RGPD / LGPD)',
  'trust.privacyDesc':
    'Tratamos datos personales con finalidad definida, seguridad técnica y respeto a tus derechos. Qué guardamos, qué no y cómo protegemos.',
  'trust.privacy.storedTitle': 'Datos que almacenamos',
  'trust.privacy.storedIntro':
    'La información necesaria para el app está en nuestra base de datos (PostgreSQL en Supabase, nube):',
  'trust.privacy.stored1':
    'Cuenta: nombre, correo, teléfono, tipo de perfil (cliente o profesional) y preferencias (idioma, tema).',
  'trust.privacy.stored2':
    'Perfil profesional: foto, descripción, categorías, precios, zona, reseñas e insignia de plan.',
  'trust.privacy.stored3':
    'Pedidos: descripción, dirección, fechas, importes, estado e historial.',
  'trust.privacy.stored4':
    'Mensajes y propuestas en la plataforma, vinculados al pedido, para soporte y mediación.',
  'trust.privacy.stored5':
    'Contratos digitales, reseñas tras completar y registros financieros (importes, comisiones, estado de pago).',
  'trust.privacy.stored6':
    'Referencias de pago (últimos dígitos, ID de transacción) — nunca la tarjeta completa.',
  'trust.privacy.notStoredTitle': 'Datos que no almacenamos',
  'trust.privacy.notStoredIntro':
    'Algunos datos sensibles quedan solo con socios de pago o simplemente no los recogemos:',
  'trust.privacy.notStored1': 'Número completo de tarjeta, CVV o contraseña de la tarjeta.',
  'trust.privacy.notStored2':
    'Contraseñas de banca en línea o credenciales bancarias (solo datos de cobro cuando el profesional los indica).',
  'trust.privacy.notStored3':
    'Conversaciones fuera del app (WhatsApp, teléfono) — no tenemos acceso ni responsabilidad.',
  'trust.privacy.notStored4':
    'Venta o alquiler de listas de contactos a terceros para marketing — no es práctica de Taskly.',
  'trust.privacy.notStored5':
    'Datos sin finalidad clara: recogemos el mínimo para conectar cliente y profesional con seguridad.',
  'trust.privacy.secureTitle': 'Cómo se protegen los datos',
  'trust.privacy.secureIntro':
    'Capas técnicas y organizativas para reducir acceso indebido o filtraciones:',
  'trust.privacy.secure1':
    'Conexión cifrada (HTTPS/TLS) entre tu navegador y nuestros servidores en todo momento.',
  'trust.privacy.secure2':
    'PostgreSQL gestionado (Supabase) con seguridad a nivel de fila (RLS): cada usuario solo ve lo suyo.',
  'trust.privacy.secure3':
    'Claves API públicas con permisos limitados; operaciones sensibles en el servidor, no en el móvil.',
  'trust.privacy.secure4':
    'Copias de seguridad y monitoreo del proveedor; revisiones periódicas de accesos.',
  'trust.privacy.secure5':
    'Acceso interno restringido; uso solo para soporte, fraude u obligación legal.',
  'trust.privacy.rightsTitle': 'Tus derechos',
  'trust.privacy.rightsIntro':
    'Controlas tus datos personales según la ley aplicable (incluida LGPD en Brasil):',
  'trust.privacy.rights1':
    'Acceso y corrección: actualiza datos en Mi cuenta y Preferencias.',
  'trust.privacy.rights2':
    'Exportación y eliminación: solicita copia o baja por soporte (Preferencias → Privacidad).',
  'trust.privacy.rights3':
    'Revocar consentimiento o consultas: escribe al correo de privacidad en Ayuda.',

  'trust.guaranteeTitle': 'Garantía Taskly',
  'trust.guaranteeDesc':
    'Programa de protección para servicios contratados y pagados en la plataforma, con reglas de elegibilidad publicadas.',
  'trust.guarantee.p1':
    'Cubre incumplimientos graves respecto al contrato digital (ej. servicio no realizado sin causa válida).',
  'trust.guarantee.p2':
    'El pedido debe crearse, pagarse y completarse por el flujo oficial — acuerdos solo por WhatsApp quedan fuera.',
  'trust.guarantee.p3':
    'Análisis en el plazo de la política; puede resultar en crédito, reembolso o nueva referencia de profesional.',
  'trust.guarantee.p4':
    'Detalles completos se publicarán antes del lanzamiento en producción; esta versión puede estar en evolución.',
};
