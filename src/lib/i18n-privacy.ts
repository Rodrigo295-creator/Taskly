/** Política de Privacidade — 11 seções (PT / EN / ES) */

function sectionKeys(id: string, n: number) {
  const bullets = Array.from({ length: n }, (_, i) => `privacy.${id}.d${i + 1}`);
  return {
    title: `privacy.${id}.title`,
    summary: `privacy.${id}.summary`,
    bullets,
  };
}

export const PRIVACY_SECTIONS = [
  sectionKeys('s1', 4),
  sectionKeys('s2', 5),
  sectionKeys('s3', 5),
  sectionKeys('s4', 5),
  sectionKeys('s5', 5),
  sectionKeys('s6', 5),
  sectionKeys('s7', 5),
  sectionKeys('s8', 4),
  sectionKeys('s9', 4),
  sectionKeys('s10', 4),
  sectionKeys('s11', 4),
] as const;

export const PRIVACY_PT: Record<string, string> = {
  'privacy.title': 'Política de Privacidade',
  'privacy.subtitle':
    'Como a Taskly trata seus dados pessoais na plataforma. Toque em cada tópico para ver os detalhes.',
  'privacy.updated': 'Última atualização: maio de 2026',
  'privacy.back': 'Voltar para Segurança e garantias',
  'privacy.button': 'Política de Privacidade',
  'privacy.buttonSub': '11 tópicos — LGPD, direitos do titular, segurança e contato',
  'privacy.acceptNote':
    'Esta política complementa os Termos de Uso e descreve o tratamento de dados conforme a Lei nº 13.709/2018 (LGPD).',

  'privacy.s1.title': '1. Controlador de dados',
  'privacy.s1.summary': 'A Taskly é a controladora dos dados pessoais coletados na plataforma.',
  'privacy.s1.d1':
    'A Taskly, na pessoa de [NOME DA EMPRESA], inscrita no CNPJ sob o nº [●], com sede em [●], atua como controladora dos dados pessoais tratados no âmbito da plataforma digital Taskly.',
  'privacy.s1.d2':
    'Como controladora, define as finalidades e os meios do tratamento, responde pelas decisões relativas aos dados pessoais dos usuários (Clientes, Profissionais e visitantes) e designa canais para exercício de direitos do titular.',
  'privacy.s1.d3':
    'Operadores e parceiros que processam dados em nosso nome (hospedagem, pagamentos, mensageria, analytics) são contratados com obrigações de confidencialidade, segurança e limitação de uso compatíveis com esta política e com a LGPD.',
  'privacy.s1.d4':
    'Em caso de transferência internacional de dados, adotamos salvaguardas previstas na legislação aplicável e informamos o titular quando exigido.',

  'privacy.s2.title': '2. Dados coletados',
  'privacy.s2.summary':
    'Podem ser coletados dados cadastrais, de localização e de uso da plataforma, conforme a interação do usuário.',
  'privacy.s2.d1':
    'Dados cadastrais: nome, telefone, e-mail, foto de perfil, documento de identificação (quando exigido para verificação), dados de empresa ou atividade profissional e preferências de conta.',
  'privacy.s2.d2':
    'Dados de localização: endereço informado para o serviço, geolocalização aproximada ou precisa quando você autoriza no dispositivo, para busca de profissionais próximos e registro de atendimento.',
  'privacy.s2.d3':
    'Dados de uso e navegação: páginas acessadas, cliques, buscas, histórico de pedidos, mensagens na plataforma (conteúdo necessário à mediação), avaliações, logs de acesso, tipo de dispositivo e identificadores técnicos.',
  'privacy.s2.d4':
    'Dados financeiros: informações de pagamento tokenizadas ou processadas por parceiros certificados; não armazenamos número completo de cartão nem CVV em nossos servidores.',
  'privacy.s2.d5':
    'Dados fornecidos voluntariamente em formulários de suporte, pesquisas ou reclamações também podem ser tratados para atendimento e melhoria do serviço.',

  'privacy.s3.title': '3. Finalidade do tratamento',
  'privacy.s3.summary':
    'Os dados são usados para intermediar serviços, comunicação, melhoria da plataforma e cumprimento legal.',
  'privacy.s3.d1':
    'Intermediação de serviços: criar e manter conta, exibir perfis, permitir busca, propostas, contratação, acompanhamento de pedidos, pagamentos quando intermediados e avaliações.',
  'privacy.s3.d2':
    'Comunicação entre usuários: chat in-app, notificações de status, lembretes de agendamento e alertas de segurança relacionados à conta.',
  'privacy.s3.d3':
    'Melhoria da plataforma: análises agregadas de uso, testes de funcionalidades, prevenção a fraudes, personalização de recomendações quando autorizada e métricas de desempenho.',
  'privacy.s3.d4':
    'Cumprimento de obrigações legais: atendimento a autoridades, guarda de registros exigidos, resposta a processos e exercício regular de direitos em procedimentos judiciais ou administrativos.',
  'privacy.s3.d5':
    'Marketing e comunicações institucionais somente com base legal adequada (consentimento ou legítimo interesse, conforme o caso), com opção de descadastramento quando aplicável.',

  'privacy.s4.title': '4. Base legal',
  'privacy.s4.summary':
    'O tratamento observa a LGPD com fundamento em consentimento, execução de contrato e legítimo interesse.',
  'privacy.s4.d1':
    'Consentimento: para funcionalidades opcionais (ex.: localização precisa contínua, cookies não essenciais, newsletters), revogável a qualquer tempo pelos meios indicados na plataforma.',
  'privacy.s4.d2':
    'Execução de contrato ou procedimentos preliminares: cadastro, intermediação do serviço contratado, cobrança e repasse quando processados pela plataforma, e suporte à relação Cliente–Profissional.',
  'privacy.s4.d3':
    'Legítimo interesse: segurança da plataforma, prevenção a fraudes, melhorias de produto com impacto mínimo ao titular e comunicações essenciais sobre a conta, sempre com avaliação de balanceamento e direito de oposição quando cabível.',
  'privacy.s4.d4':
    'Cumprimento de obrigação legal ou regulatória: retenção de registros, respostas a autoridades e obrigações fiscais ou consumeristas, nos prazos previstos em lei.',
  'privacy.s4.d5':
    'Proteção do crédito, exercício de direitos em processo ou tutela da saúde podem ser aplicadas em situações específicas, conforme art. 7º da LGPD.',

  'privacy.s5.title': '5. Compartilhamento de dados',
  'privacy.s5.summary':
    'Dados podem ser compartilhados com outros usuários e parceiros tecnológicos, nos limites da finalidade.',
  'privacy.s5.d1':
    'Entre usuários: nome, foto, avaliações, dados de contato necessários e informações do pedido são exibidos ao Cliente e ao Profissional envolvidos na contratação, para execução do serviço.',
  'privacy.s5.d2':
    'Parceiros tecnológicos: provedores de nuvem, gateway de pagamento, ferramentas de autenticação, envio de e-mail/SMS e analytics recebem apenas os dados indispensáveis e sob contrato de proteção.',
  'privacy.s5.d3':
    'Autoridades públicas: compartilhamento quando houver requisição legal, ordem judicial ou necessidade de cooperação em investigações de fraude ou risco à integridade física.',
  'privacy.s5.d4':
    'Operações societárias: em fusão, aquisição ou reorganização, os dados podem ser transferidos ao sucessor, mantidas as garantias desta política e comunicação aos titulares quando relevante.',
  'privacy.s5.d5':
    'Não vendemos dados pessoais a terceiros para marketing próprio deles sem seu consentimento expresso.',

  'privacy.s6.title': '6. Direitos do titular',
  'privacy.s6.summary':
    'Você pode solicitar acesso, correção, exclusão e revogação de consentimento, entre outros direitos da LGPD.',
  'privacy.s6.d1':
    'Confirmação e acesso: saber se tratamos seus dados e obter cópia das informações principais vinculadas à conta.',
  'privacy.s6.d2':
    'Correção: atualizar dados incompletos, inexatos ou desatualizados diretamente no perfil ou via suporte.',
  'privacy.s6.d3':
    'Anonimização, bloqueio ou eliminação: solicitar quando houver excesso, desnecessidade ou tratamento em desconformidade com a LGPD, ressalvadas retenções legais.',
  'privacy.s6.d4':
    'Portabilidade: receber dados fornecidos por você em formato estruturado, quando aplicável e tecnicamente viável.',
  'privacy.s6.d5':
    'Revogação do consentimento e oposição: retirar consentimentos opcionais e opor-se a tratamentos baseados em legítimo interesse, quando previsto; a revogação não invalida tratamentos anteriores lícitos.',

  'privacy.s7.title': '7. Segurança',
  'privacy.s7.summary': 'Adotamos medidas técnicas e organizacionais para proteger os dados pessoais.',
  'privacy.s7.d1':
    'Criptografia em trânsito (HTTPS/TLS) e, quando aplicável, criptografia em repouso para dados sensíveis armazenados em nossa infraestrutura.',
  'privacy.s7.d2':
    'Controle de acesso por perfil interno, autenticação multifator para equipes administrativas e registro de logs de operações críticas.',
  'privacy.s7.d3':
    'Monitoramento de incidentes, testes periódicos de segurança e políticas de senha e recuperação de conta para usuários.',
  'privacy.s7.d4':
    'Em caso de incidente de segurança com risco relevante aos titulares, comunicação à Autoridade Nacional de Proteção de Dados (ANPD) e aos afetados, nos termos da LGPD.',
  'privacy.s7.d5':
    'Recomendamos que você mantenha senha forte, não compartilhe credenciais e utilize apenas canais oficiais do aplicativo.',

  'privacy.s8.title': '8. Retenção',
  'privacy.s8.summary': 'Os dados são mantidos pelo tempo necessário às finalidades e obrigações legais.',
  'privacy.s8.d1':
    'Dados da conta ativa: mantidos enquanto a relação com a plataforma existir e por período adicional razoável para resolução de disputas ou suporte.',
  'privacy.s8.d2':
    'Registros de transações e fiscais: conservados pelos prazos exigidos pela legislação tributária e consumerista aplicável.',
  'privacy.s8.d3':
    'Após exclusão da conta, dados podem ser anonimizados ou eliminados, salvo retenção mínima exigida por lei ou para defesa de direitos em prazos prescricionais.',
  'privacy.s8.d4':
    'Backups de segurança podem reter cópias por prazo limitado, com eliminação automática conforme ciclo de rotação definido internamente.',

  'privacy.s9.title': '9. Alterações',
  'privacy.s9.summary': 'Esta política pode ser atualizada periodicamente com publicação na plataforma.',
  'privacy.s9.d1':
    'A Taskly pode revisar esta Política de Privacidade para refletir mudanças legais, tecnológicas ou de funcionalidades do produto.',
  'privacy.s9.d2':
    'A versão vigente será publicada na plataforma com indicação da data de atualização; alterações relevantes podem ser comunicadas por e-mail ou notificação in-app.',
  'privacy.s9.d3':
    'O uso continuado após a vigência da nova versão indica ciência da política atualizada, ressalvado o direito de encerrar a conta ou revogar consentimentos opcionais.',
  'privacy.s9.d4':
    'Versões anteriores podem ser solicitadas ao suporte para fins de comprovação, quando disponíveis.',

  'privacy.s10.title': '10. Contato',
  'privacy.s10.summary': 'Solicitações sobre dados pessoais devem ser feitas pelo suporte do aplicativo.',
  'privacy.s10.d1':
    'Para exercer direitos do titular, esclarecer dúvidas ou registrar reclamações sobre privacidade, utilize os canais de suporte indicados na área Ajuda do aplicativo.',
  'privacy.s10.d2':
    'Pedidos devem identificar o titular (e-mail ou telefone da conta) e descrever o pedido com objetividade; podemos solicitar confirmação de identidade para evitar acessos indevidos.',
  'privacy.s10.d3':
    'Prazo de resposta: em até 15 (quinze) dias, prorrogáveis por mais 15 dias mediante justificativa, conforme art. 18, § 4º, da LGPD.',
  'privacy.s10.d4':
    'Encarregado de proteção de dados (DPO), quando designado, terá canal dedicado divulgado na plataforma e no site institucional.',

  'privacy.s11.title': '11. Consentimento',
  'privacy.s11.summary': 'Ao utilizar a plataforma, o usuário declara ciência e concordância com esta política.',
  'privacy.s11.d1':
    'Ao criar conta, acessar ou utilizar funcionalidades da Taskly, você declara ter lido e compreendido esta Política de Privacidade.',
  'privacy.s11.d2':
    'Consentimentos específicos (localização, marketing, cookies não essenciais) são solicitados de forma destacada e podem ser gerenciados nas configurações de privacidade.',
  'privacy.s11.d3':
    'Menores de idade: o tratamento segue as regras da LGPD e do Estatuto da Criança e do Adolescente; cadastro de menores somente com representação legal quando permitido.',
  'privacy.s11.d4':
    'Se não concordar com esta política, interrompa o uso da plataforma e solicite exclusão da conta pelos canais de suporte.',
};

export const PRIVACY_EN: Record<string, string> = {
  'privacy.title': 'Privacy Policy',
  'privacy.subtitle': 'How Taskly handles your personal data. Tap each topic for details.',
  'privacy.updated': 'Last updated: May 2026',
  'privacy.back': 'Back to Security & guarantees',
  'privacy.button': 'Privacy Policy',
  'privacy.buttonSub': '11 topics — GDPR/LGPD, data subject rights, security, and contact',
  'privacy.acceptNote':
    'This policy complements the Terms of Use and describes processing under Brazilian Law No. 13.709/2018 (LGPD).',

  'privacy.s1.title': '1. Data controller',
  'privacy.s1.summary': 'Taskly is the controller of personal data collected on the platform.',
  'privacy.s1.d1':
    'Taskly, through [COMPANY NAME], CNPJ [●], acts as the controller of personal data processed on the Taskly platform.',
  'privacy.s1.d2':
    'As controller, it defines purposes and means of processing and provides channels for data subject rights.',
  'privacy.s1.d3':
    'Processors (hosting, payments, messaging, analytics) are bound by confidentiality, security, and purpose limitation.',
  'privacy.s1.d4':
    'International transfers use safeguards required by applicable law with notice when required.',

  'privacy.s2.title': '2. Data collected',
  'privacy.s2.summary': 'Registration, location, and usage data may be collected based on your interaction.',
  'privacy.s2.d1':
    'Registration: name, phone, email, profile photo, ID (when required for verification), business data, and preferences.',
  'privacy.s2.d2':
    'Location: service address and approximate or precise geolocation when authorized for nearby search and service records.',
  'privacy.s2.d3':
    'Usage: pages viewed, searches, orders, in-app messages, reviews, access logs, device type, and technical identifiers.',
  'privacy.s2.d4':
    'Payment data is tokenized or processed by certified partners; we do not store full card numbers or CVV.',
  'privacy.s2.d5': 'Voluntary data in support forms or surveys is used for assistance and product improvement.',

  'privacy.s3.title': '3. Purpose of processing',
  'privacy.s3.summary':
    'Data is used to intermediate services, enable communication, improve the platform, and comply with law.',
  'privacy.s3.d1':
    'Service intermediation: accounts, profiles, search, proposals, booking, payments when processed, and reviews.',
  'privacy.s3.d2': 'User communication: in-app chat, status notifications, scheduling reminders, and security alerts.',
  'privacy.s3.d3':
    'Platform improvement: aggregated analytics, fraud prevention, optional personalization, and performance metrics.',
  'privacy.s3.d4':
    'Legal compliance: responses to authorities, mandatory records, and defense of rights in legal proceedings.',
  'privacy.s3.d5':
    'Marketing only with appropriate legal basis and opt-out when applicable.',

  'privacy.s4.title': '4. Legal basis',
  'privacy.s4.summary':
    'Processing follows LGPD based on consent, contract performance, and legitimate interest.',
  'privacy.s4.d1':
    'Consent: for optional features (precise location, non-essential cookies, newsletters), revocable at any time.',
  'privacy.s4.d2':
    'Contract: registration, intermediation, platform payments and payouts, and support for Client–Professional relationships.',
  'privacy.s4.d3':
    'Legitimate interest: security, fraud prevention, product improvements with minimal impact, and essential account communications.',
  'privacy.s4.d4': 'Legal obligation: retention and responses to authorities within statutory periods.',
  'privacy.s4.d5': 'Other LGPD bases may apply in specific situations (credit protection, legal claims, health protection).',

  'privacy.s5.title': '5. Data sharing',
  'privacy.s5.summary': 'Data may be shared with other users and technology partners within stated purposes.',
  'privacy.s5.d1':
    'Between users: name, photo, ratings, and order details shown to Client and Professional involved in the booking.',
  'privacy.s5.d2':
    'Technology partners: cloud, payment gateway, auth, email/SMS, and analytics receive only necessary data under contracts.',
  'privacy.s5.d3':
    'Public authorities: when legally required, by court order, or to cooperate in fraud or safety investigations.',
  'privacy.s5.d4':
    'Corporate transactions: data may transfer to successors with continued protections and notice when relevant.',
  'privacy.s5.d5': 'We do not sell personal data for third-party marketing without express consent.',

  'privacy.s6.title': '6. Data subject rights',
  'privacy.s6.summary': 'You may request access, correction, deletion, and consent withdrawal, among LGPD rights.',
  'privacy.s6.d1': 'Confirmation and access to whether we process your data and copies of key account information.',
  'privacy.s6.d2': 'Correction of incomplete, inaccurate, or outdated data via profile or support.',
  'privacy.s6.d3':
    'Anonymization, blocking, or deletion when processing is excessive or non-compliant, subject to legal retention.',
  'privacy.s6.d4': 'Portability of data you provided in a structured format when applicable.',
  'privacy.s6.d5':
    'Withdraw consent and object to legitimate-interest processing where provided; prior lawful processing remains valid.',

  'privacy.s7.title': '7. Security',
  'privacy.s7.summary': 'Technical and organizational measures protect personal data.',
  'privacy.s7.d1': 'Encryption in transit (HTTPS/TLS) and at rest for sensitive stored data where applicable.',
  'privacy.s7.d2': 'Role-based internal access, MFA for admin teams, and logging of critical operations.',
  'privacy.s7.d3': 'Incident monitoring, periodic security testing, and account recovery policies.',
  'privacy.s7.d4':
    'Relevant security incidents are reported to the ANPD and affected users as required by LGPD.',
  'privacy.s7.d5': 'Use strong passwords, keep credentials private, and use only official app channels.',

  'privacy.s8.title': '8. Retention',
  'privacy.s8.summary': 'Data is kept as long as necessary for purposes and legal obligations.',
  'privacy.s8.d1': 'Active account data while the relationship exists plus a reasonable period for disputes and support.',
  'privacy.s8.d2': 'Transaction and tax records kept for legally required periods.',
  'privacy.s8.d3':
    'After account deletion, data is anonymized or deleted except minimum legal retention or defense of rights.',
  'privacy.s8.d4': 'Security backups may retain copies for a limited rotation cycle.',

  'privacy.s9.title': '9. Changes',
  'privacy.s9.summary': 'This policy may be updated periodically with publication on the platform.',
  'privacy.s9.d1': 'Taskly may revise this policy for legal, technical, or product changes.',
  'privacy.s9.d2': 'The current version is published with the update date; material changes may be notified by email or in-app.',
  'privacy.s9.d3':
    'Continued use indicates awareness of the updated policy; you may close the account or revoke optional consents.',
  'privacy.s9.d4': 'Previous versions may be requested from support when available.',

  'privacy.s10.title': '10. Contact',
  'privacy.s10.summary': 'Privacy requests should be sent through in-app support.',
  'privacy.s10.d1': 'Use Help channels to exercise rights, ask questions, or file privacy complaints.',
  'privacy.s10.d2':
    'Requests should identify the account holder; we may verify identity to prevent unauthorized access.',
  'privacy.s10.d3': 'Response within 15 days, extendable by 15 days with justification under LGPD Art. 18.',
  'privacy.s10.d4': 'A Data Protection Officer (DPO), when appointed, will have a dedicated channel on the platform.',

  'privacy.s11.title': '11. Consent',
  'privacy.s11.summary': 'Using the platform means you acknowledge and agree to this policy.',
  'privacy.s11.d1':
    'By creating an account or using Taskly, you declare that you have read and understood this Privacy Policy.',
  'privacy.s11.d2':
    'Specific consents (location, marketing, non-essential cookies) are requested clearly and managed in privacy settings.',
  'privacy.s11.d3':
    'Minors: processing follows LGPD and child protection rules; registration only with legal representation when allowed.',
  'privacy.s11.d4':
    'If you disagree, stop using the platform and request account deletion via support.',
};

export const PRIVACY_ES: Record<string, string> = {
  'privacy.title': 'Política de Privacidad',
  'privacy.subtitle':
    'Cómo Taskly trata sus datos personales. Toca cada tema para ver los detalles.',
  'privacy.updated': 'Última actualización: mayo de 2026',
  'privacy.back': 'Volver a Seguridad y garantías',
  'privacy.button': 'Política de Privacidad',
  'privacy.buttonSub': '11 temas — LGPD, derechos del titular, seguridad y contacto',
  'privacy.acceptNote':
    'Esta política complementa los Términos de Uso y describe el tratamiento según la Ley nº 13.709/2018 (LGPD).',

  'privacy.s1.title': '1. Responsable del tratamiento',
  'privacy.s1.summary': 'Taskly es el responsable de los datos personales recogidos en la plataforma.',
  'privacy.s1.d1':
    'Taskly, a través de [NOMBRE DE LA EMPRESA], CNPJ [●], actúa como responsable del tratamiento en la plataforma.',
  'privacy.s1.d2':
    'Define finalidades y medios del tratamiento y ofrece canales para los derechos del titular.',
  'privacy.s1.d3':
    'Encargados (hosting, pagos, mensajería, analytics) operan con confidencialidad y limitación de uso.',
  'privacy.s1.d4':
    'Las transferencias internacionales usan salvaguardas exigidas por la ley aplicable.',

  'privacy.s2.title': '2. Datos recogidos',
  'privacy.s2.summary':
    'Pueden recogerse datos de registro, ubicación y uso según la interacción del usuario.',
  'privacy.s2.d1':
    'Registro: nombre, teléfono, correo, foto, documento (si aplica verificación), datos profesionales y preferencias.',
  'privacy.s2.d2':
    'Ubicación: dirección del servicio y geolocalización autorizada para búsqueda cercana y registro del servicio.',
  'privacy.s2.d3':
    'Uso: páginas, búsquedas, pedidos, mensajes in-app, reseñas, logs y identificadores técnicos.',
  'privacy.s2.d4':
    'Pagos tokenizados por socios certificados; no almacenamos número completo de tarjeta ni CVV.',
  'privacy.s2.d5': 'Datos voluntarios en soporte o encuestas se usan para atención y mejora del producto.',

  'privacy.s3.title': '3. Finalidad del tratamiento',
  'privacy.s3.summary':
    'Los datos se usan para intermediar servicios, comunicación, mejora de la plataforma y cumplimiento legal.',
  'privacy.s3.d1':
    'Intermediación: cuentas, perfiles, búsqueda, propuestas, contratación, pagos y reseñas.',
  'privacy.s3.d2': 'Comunicación: chat, notificaciones de estado, recordatorios y alertas de seguridad.',
  'privacy.s3.d3':
    'Mejora: análisis agregados, prevención de fraude, personalización opcional y métricas.',
  'privacy.s3.d4':
    'Cumplimiento legal: respuestas a autoridades y conservación de registros exigidos.',
  'privacy.s3.d5': 'Marketing solo con base legal adecuada y opción de baja cuando aplique.',

  'privacy.s4.title': '4. Base legal',
  'privacy.s4.summary':
    'El tratamiento sigue la LGPD con consentimiento, ejecución de contrato e interés legítimo.',
  'privacy.s4.d1':
    'Consentimiento: funciones opcionales (ubicación precisa, cookies no esenciales, newsletters), revocable.',
  'privacy.s4.d2':
    'Contrato: registro, intermediación, pagos en plataforma y soporte entre Cliente y Profesional.',
  'privacy.s4.d3':
    'Interés legítimo: seguridad, fraude, mejoras con impacto mínimo y comunicaciones esenciales de cuenta.',
  'privacy.s4.d4': 'Obligación legal: retención y respuestas a autoridades en plazos legales.',
  'privacy.s4.d5': 'Otras bases de la LGPD pueden aplicarse en casos específicos.',

  'privacy.s5.title': '5. Compartición de datos',
  'privacy.s5.summary':
    'Los datos pueden compartirse con otros usuarios y socios tecnológicos dentro de la finalidad.',
  'privacy.s5.d1':
    'Entre usuarios: nombre, foto, reseñas y datos del pedido visibles para Cliente y Profesional.',
  'privacy.s5.d2':
    'Socios tecnológicos: nube, pagos, autenticación, correo/SMS y analytics con datos mínimos y contrato.',
  'privacy.s5.d3':
    'Autoridades: cuando la ley, orden judicial o investigación de fraude o seguridad lo exijan.',
  'privacy.s5.d4':
    'Operaciones societarias: transferencia al sucesor con garantías y aviso cuando corresponda.',
  'privacy.s5.d5': 'No vendemos datos personales para marketing de terceros sin consentimiento expreso.',

  'privacy.s6.title': '6. Derechos del titular',
  'privacy.s6.summary':
    'Puede solicitar acceso, corrección, eliminación y revocación del consentimiento, entre otros derechos.',
  'privacy.s6.d1': 'Confirmación y acceso a si tratamos sus datos y copia de la información principal.',
  'privacy.s6.d2': 'Corrección de datos incompletos o desactualizados en perfil o soporte.',
  'privacy.s6.d3':
    'Anonimización, bloqueo o eliminación cuando el tratamiento sea excesivo o no conforme, salvo retención legal.',
  'privacy.s6.d4': 'Portabilidad en formato estructurado cuando sea aplicable.',
  'privacy.s6.d5':
    'Revocar consentimiento y oponerse al interés legítimo cuando proceda; el tratamiento previo lícito permanece válido.',

  'privacy.s7.title': '7. Seguridad',
  'privacy.s7.summary': 'Medidas técnicas y organizativas protegen los datos personales.',
  'privacy.s7.d1': 'Cifrado en tránsito (HTTPS/TLS) y en reposo para datos sensibles cuando aplique.',
  'privacy.s7.d2': 'Acceso interno por roles, MFA administrativo y registros de operaciones críticas.',
  'privacy.s7.d3': 'Monitoreo de incidentes, pruebas de seguridad y políticas de recuperación de cuenta.',
  'privacy.s7.d4':
    'Incidentes relevantes se comunican a la ANPD y a los afectados según la LGPD.',
  'privacy.s7.d5': 'Use contraseña fuerte y canales oficiales de la aplicación.',

  'privacy.s8.title': '8. Retención',
  'privacy.s8.summary':
    'Los datos se conservan el tiempo necesario para las finalidades y obligaciones legales.',
  'privacy.s8.d1':
    'Cuenta activa: mientras exista la relación y un período razonable para disputas y soporte.',
  'privacy.s8.d2': 'Registros fiscales y de transacciones según plazos legales.',
  'privacy.s8.d3':
    'Tras eliminar la cuenta, anonimización o borrado salvo retención legal mínima o defensa de derechos.',
  'privacy.s8.d4': 'Copias de seguridad con ciclo de rotación limitado.',

  'privacy.s9.title': '9. Alteraciones',
  'privacy.s9.summary': 'La política puede actualizarse periódicamente con publicación en la plataforma.',
  'privacy.s9.d1': 'Taskly puede revisar esta política por cambios legales, técnicos o de producto.',
  'privacy.s9.d2':
    'La versión vigente se publica con fecha; cambios relevantes pueden notificarse por correo o in-app.',
  'privacy.s9.d3':
    'El uso continuado implica conocimiento de la política actualizada; puede cerrar la cuenta o revocar consentimientos.',
  'privacy.s9.d4': 'Versiones anteriores pueden solicitarse al soporte si están disponibles.',

  'privacy.s10.title': '10. Contacto',
  'privacy.s10.summary': 'Las solicitudes sobre datos deben hacerse por el soporte de la aplicación.',
  'privacy.s10.d1': 'Use los canales de Ayuda para ejercer derechos, consultas o reclamaciones de privacidad.',
  'privacy.s10.d2':
    'Identifique el titular de la cuenta; podemos verificar identidad para evitar accesos indebidos.',
  'privacy.s10.d3': 'Respuesta en hasta 15 días, prorrogables 15 días con justificación (LGPD art. 18).',
  'privacy.s10.d4': 'El DPO, si se designa, tendrá canal dedicado en la plataforma.',

  'privacy.s11.title': '11. Consentimiento',
  'privacy.s11.summary': 'Al usar la plataforma, el usuario acepta esta política.',
  'privacy.s11.d1':
    'Al registrarse o usar Taskly, declara haber leído y comprendido esta Política de Privacidad.',
  'privacy.s11.d2':
    'Consentimientos específicos (ubicación, marketing, cookies) se gestionan en configuración de privacidad.',
  'privacy.s11.d3':
    'Menores: tratamiento conforme LGPD y normas de protección infantil; registro con representación legal si aplica.',
  'privacy.s11.d4':
    'Si no está de acuerdo, deje de usar la plataforma y solicite eliminación de la cuenta por soporte.',
};
