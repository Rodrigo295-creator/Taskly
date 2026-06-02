/** Termos de Uso — 13 seções (PT / EN / ES) */

const SECTION_IDS = [
  's1',
  's2',
  's3',
  's4',
  's5',
  's6',
  's7',
  's8',
  's9',
  's10',
  's11',
  's12',
  's13',
] as const;

export const TERMS_SECTION_IDS = SECTION_IDS;

function sectionKeys(id: (typeof SECTION_IDS)[number], n: number) {
  const bullets = Array.from({ length: n }, (_, i) => `terms.${id}.d${i + 1}`);
  return {
    title: `terms.${id}.title`,
    summary: `terms.${id}.summary`,
    bullets,
  };
}

export const TERMS_SECTIONS = [
  sectionKeys('s1', 4),
  sectionKeys('s2', 4),
  sectionKeys('s3', 4),
  sectionKeys('s4', 5),
  sectionKeys('s5', 6),
  sectionKeys('s6', 5),
  sectionKeys('s7', 5),
  sectionKeys('s8', 5),
  sectionKeys('s9', 4),
  sectionKeys('s10', 5),
  sectionKeys('s11', 4),
  sectionKeys('s12', 4),
  sectionKeys('s13', 4),
] as const;

export const TERMS_PT: Record<string, string> = {
  'terms.title': 'Termos de Uso',
  'terms.subtitle':
    'Leia as regras que regem o uso da plataforma Taskly. Toque em cada tópico para ver os detalhes.',
  'terms.updated': 'Última atualização: maio de 2026',
  'terms.back': 'Voltar para Segurança e garantias',
  'terms.button': 'Termos de Uso',
  'terms.buttonSub': '13 tópicos — identificação, responsabilidades, pagamentos e mais',
  'terms.legalSection': 'Documentos legais',
  'terms.acceptNote':
    'O uso contínuo da plataforma após alterações publicadas constitui aceite da versão vigente dos Termos.',

  'terms.s1.title': '1. Identificação',
  'terms.s1.summary':
    'Estes Termos regulam a plataforma Taskly, de titularidade da empresa indicada no cadastro societário.',
  'terms.s1.d1':
    'Estes Termos de Uso (“Termos”) regulam o acesso e a utilização da plataforma digital denominada “Taskly”, de titularidade de [NOME DA EMPRESA], pessoa jurídica de direito privado, inscrita no CNPJ sob o nº [●] (“Taskly”, “nós” ou “plataforma”).',
  'terms.s1.d2':
    'O endereço da sede, canais oficiais de contato e dados de representação legal constam na área “Sobre” do aplicativo e no site institucional, e podem ser atualizados mediante comunicação na plataforma.',
  'terms.s1.d3':
    'Ao se cadastrar ou utilizar qualquer funcionalidade, você declara ter capacidade civil para contratar e, quando aplicável, estar autorizado a representar a pessoa jurídica em nome da qual atua.',
  'terms.s1.d4':
    'Dúvidas sobre estes Termos podem ser encaminhadas pelos canais de ajuda indicados na plataforma, com identificação do usuário e descrição objetiva da solicitação.',

  'terms.s2.title': '2. Objeto',
  'terms.s2.summary':
    'A plataforma intermedia o contato entre Clientes e Profissionais autônomos para contratação de serviços.',
  'terms.s2.d1':
    'O Taskly tem como finalidade intermediar o contato entre usuários contratantes (“Clientes”) e prestadores de serviços autônomos (“Profissionais”), por meio de ferramentas digitais de busca, comunicação, proposta, contratação e acompanhamento.',
  'terms.s2.d2':
    'Os serviços efetivamente prestados são de responsabilidade do Profissional contratado; o Taskly fornece infraestrutura tecnológica e recursos de apoio descritos nestes Termos e nas políticas complementares.',
  'terms.s2.d3':
    'Funcionalidades específicas (pagamento retido, contratos digitais, verificação de perfil, planos) podem variar conforme disponibilidade, perfil do usuário e região, sendo descritas na própria interface.',
  'terms.s2.d4':
    'A plataforma não substitui assessoria jurídica, contábil ou fiscal; recomenda-se que Clientes e Profissionais busquem orientação profissional quando necessário.',

  'terms.s3.title': '3. Natureza da relação',
  'terms.s3.summary':
    'O Taskly é intermediador tecnológico e não é parte na relação contratual entre Cliente e Profissional.',
  'terms.s3.d1':
    'O Taskly atua exclusivamente como intermediador tecnológico, não participando da execução dos serviços contratados entre usuários.',
  'terms.s3.d2':
    'Não há vínculo empregatício, societário, de representação comercial ou de subordinação entre o Taskly e os Profissionais cadastrados, nem entre o Taskly e os Clientes, em razão do uso da plataforma.',
  'terms.s3.d3':
    'O contrato de prestação de serviços é celebrado diretamente entre Cliente e Profissional; cláusulas, preço, prazo e escopo são definidos pelas partes, com apoio dos recursos disponíveis no aplicativo.',
  'terms.s3.d4':
    'O Taskly pode oferecer mediação em conflitos e ferramentas de segurança conforme políticas publicadas, sem assumir a posição de árbitro vinculante, salvo disposição legal ou acordo expresso em caso concreto.',

  'terms.s4.title': '4. Cadastro e elegibilidade',
  'terms.s4.summary':
    'Informações verídicas, atualizadas e completas; o usuário responde pela veracidade dos dados informados.',
  'terms.s4.d1':
    'Para utilizar a plataforma, o usuário deve criar conta com dados pessoais ou empresariais verdadeiros, completos e atualizados, responsabilizando-se integralmente por sua veracidade.',
  'terms.s4.d2':
    'É vedado criar perfis falsos, duplicados para fraude, ou utilizar identidade de terceiros sem autorização. Documentos e comprovações solicitados na verificação devem ser autênticos.',
  'terms.s4.d3':
    'Menores de 18 anos só podem utilizar a plataforma com representação legal adequada, quando permitido pela legislação e pelas funcionalidades disponíveis.',
  'terms.s4.d4':
    'O usuário deve manter credenciais de acesso em sigilo e comunicar imediatamente suspeita de uso não autorizado da conta pelos canais de segurança.',
  'terms.s4.d5':
    'O Taskly pode recusar, suspender ou encerrar cadastros que não atendam critérios de elegibilidade, integridade ou conformidade com estes Termos.',

  'terms.s5.title': '5. Responsabilidades dos Profissionais',
  'terms.s5.summary':
    'Execução, qualidade, prazos e obrigações legais e fiscais são de responsabilidade integral do Profissional.',
  'terms.s5.d1':
    'Os Profissionais são integralmente responsáveis pela execução dos serviços contratados, incluindo meios, materiais, equipe própria e métodos de trabalho, salvo combinação diversa com o Cliente.',
  'terms.s5.d2':
    'Compete ao Profissional garantir a qualidade técnica compatível com a oferta apresentada no perfil e com o que foi acordado no chat ou contrato digital.',
  'terms.s5.d3':
    'O cumprimento de prazos, comparecimento em locais combinados e comunicação de impedimentos são obrigações do Profissional perante o Cliente.',
  'terms.s5.d4':
    'O Profissional deve observar a legislação aplicável à sua atividade, incluindo normas de segurança, licenças, alvarás e regulamentações profissionais, quando exigidas.',
  'terms.s5.d5':
    'Obrigações fiscais, previdenciárias e trabalhistas decorrentes da sua atividade autônoma são de exclusiva responsabilidade do Profissional, sem repasse de encargos de vínculo ao Taskly.',
  'terms.s5.d6':
    'Conteúdos publicados no perfil (fotos, descrições, preços) devem ser licitos e não violar direitos de terceiros; avaliações devem refletir conduta real na plataforma.',

  'terms.s6.title': '6. Responsabilidades dos Clientes',
  'terms.s6.summary':
    'Informações corretas, pagamento pelos serviços e conduta adequada na plataforma.',
  'terms.s6.d1':
    'Os Clientes são responsáveis por fornecer informações corretas sobre o serviço desejado, local, acesso, restrições e demais condições relevantes para a execução.',
  'terms.s6.d2':
    'O pagamento pelos serviços contratados deve ser realizado nos moldes acordados (plataforma ou diretamente com o Profissional, quando aplicável), no prazo e valor definidos entre as partes.',
  'terms.s6.d3':
    'É esperada conduta respeitosa no chat e nas avaliações, vedadas ofensas, discriminação, assédio ou solicitações ilegais ou incompatíveis com a política da plataforma.',
  'terms.s6.d4':
    'O Cliente deve proporcionar condições razoáveis de acesso e segurança no local do serviço, quando a execução for em seu endereço ou dependência.',
  'terms.s6.d5':
    'A confirmação de conclusão do serviço na plataforma, quando utilizada, deve refletir a realidade da prestação, pois pode impactar liberação de pagamento ao Profissional.',

  'terms.s7.title': '7. Pagamentos e transações',
  'terms.s7.summary':
    'A plataforma pode ou não intermediar pagamentos; transações diretas entre as partes ficam fora da ingerência do Taskly.',
  'terms.s7.d1':
    'O Taskly poderá, conforme funcionalidades ativas, intermediar pagamentos com retenção até confirmação do serviço, repasse ao Profissional e cobrança de taxas de plataforma conforme plano.',
  'terms.s7.d2':
    'Quando o pagamento for realizado diretamente entre Cliente e Profissional, sem passagem pela plataforma, o Taskly não possui ingerência sobre valores, chargebacks, inadimplência ou disputas financeiras entre as partes.',
  'terms.s7.d3':
    'Taxas, comissões e condições de planos são informadas antes da contratação do plano ou do serviço, conforme exibido na interface vigente à data da transação.',
  'terms.s7.d4':
    'Estornos e cancelamentos seguem as regras da política de pagamentos e do acordo entre Cliente e Profissional, podendo a plataforma atuar como canal de registro quando o pagamento tiver sido processado por ela.',
  'terms.s7.d5':
    'Dados financeiros sensíveis são tratados por processadores certificados; o usuário deve utilizar apenas os meios oficiais indicados no aplicativo para transações.',

  'terms.s8.title': '8. Limitação de responsabilidade',
  'terms.s8.summary':
    'O Taskly não responde por danos da execução dos serviços, perdas financeiras ou relações entre usuários.',
  'terms.s8.d1':
    'Na máxima extensão permitida pela lei, o Taskly não se responsabiliza por danos decorrentes da execução ou não execução dos serviços contratados entre Cliente e Profissional.',
  'terms.s8.d2':
    'Não há responsabilidade por perdas financeiras, lucros cessantes ou danos indiretos relacionados a acordos celebrados fora dos mecanismos oficiais de pagamento da plataforma.',
  'terms.s8.d3':
    'Relações contratuais, garantias de resultado e obrigações de fazer entre usuários são atribuição das partes contratantes; a plataforma não substitui seguro, garantia estendida ou responsabilidade solidária salvo lei imperativa.',
  'terms.s8.d4':
    'Interrupções temporárias por manutenção, falhas de terceiros ou caso fortuito serão tratadas com esforços razoáveis de restabelecimento, sem obrigação de indenização por indisponibilidade de curta duração.',
  'terms.s8.d5':
    'Nada nestes Termos limita direitos irrenunciáveis do consumidor previstos na legislação brasileira, quando aplicável.',

  'terms.s9.title': '9. Propriedade intelectual',
  'terms.s9.summary':
    'Conteúdo da plataforma protegido por lei; reprodução não autorizada é vedada.',
  'terms.s9.d1':
    'Marcas, logotipos, layout, software, textos institucionais e demais conteúdos da plataforma são de titularidade do Taskly ou de licenciadores, protegidos pela legislação de propriedade intelectual.',
  'terms.s9.d2':
    'É vedada a reprodução, distribuição, engenharia reversa ou exploração comercial não autorizada de qualquer elemento da plataforma.',
  'terms.s9.d3':
    'Conteúdos enviados pelo usuário (fotos, textos de perfil) permanecem de sua responsabilidade; o usuário concede licença necessária para exibição e operação do serviço dentro da plataforma.',
  'terms.s9.d4':
    'Denúncias de violação de direitos autorais ou de imagem podem ser encaminhadas pelos canais oficiais, com documentação mínima exigida para análise.',

  'terms.s10.title': '10. Suspensão e cancelamento',
  'terms.s10.summary':
    'Contas podem ser suspensas ou excluídas em caso de violação dos Termos, conduta inadequada ou fraude.',
  'terms.s10.d1':
    'O Taskly poderá suspender ou excluir contas, temporária ou definitivamente, em caso de violação destes Termos, das políticas complementares ou da legislação aplicável.',
  'terms.s10.d2':
    'Conduta inadequada inclui, sem limitação: fraude, assédio, discriminação, uso de dados de terceiros sem consentimento, manipulação de avaliações ou evasão de taxas devidas à plataforma.',
  'terms.s10.d3':
    'Atividades fraudulentas ou suspeitas podem ser reportadas às autoridades competentes, além das medidas internas de bloqueio e retenção de valores quando houver fundamento contratual e legal.',
  'terms.s10.d4':
    'O usuário pode solicitar encerramento da conta pelos canais indicados; obrigações pendentes (pagamentos, disputas, conteúdos licitos) permanecem exigíveis após o encerramento.',
  'terms.s10.d5':
    'Quando aplicável, será oportunizada manifestação sobre fatos graves antes da exclusão definitiva, salvo risco imediato à segurança de outros usuários ou à plataforma.',

  'terms.s11.title': '11. Alterações',
  'terms.s11.summary':
    'Os Termos podem ser alterados a qualquer momento, com publicação na plataforma.',
  'terms.s11.d1':
    'Estes Termos poderão ser alterados a qualquer momento, mediante publicação da versão atualizada na plataforma e, quando relevante, aviso por e-mail ou notificação in-app.',
  'terms.s11.d2':
    'A data da última atualização será indicada no topo desta página ou no resumo exibido antes do aceite em novos cadastros.',
  'terms.s11.d3':
    'Alterações materiais que reduzam direitos já adquiridos em contratos em curso pela plataforma serão comunicadas com antecedência razoável, quando exigido pela lei.',
  'terms.s11.d4':
    'O uso continuado após a vigência da nova versão constitui aceite, ressalvado o direito de encerrar a conta se não concordar com as mudanças.',

  'terms.s12.title': '12. Legislação aplicável',
  'terms.s12.summary':
    'Legislação brasileira; foro da comarca da sede da empresa.',
  'terms.s12.d1':
    'Estes Termos são regidos pelas leis da República Federativa do Brasil.',
  'terms.s12.d2':
    'Fica eleito o foro da comarca da sede da [NOME DA EMPRESA], com renúncia a qualquer outro, por mais privilegiado que seja, salvo disposição legal imperativa em favor do consumidor.',
  'terms.s12.d3':
    'Em caso de conflito entre versão em português e traduções para outros idiomas na interface, prevalece a versão em português para interpretação jurídica no Brasil.',
  'terms.s12.d4':
    'Tentativas de resolução amigável por canais de suporte e mediação da plataforma são incentivadas antes de medidas judiciais.',

  'terms.s13.title': '13. Aceite',
  'terms.s13.summary':
    'O uso da plataforma implica aceitação integral destes Termos de Uso.',
  'terms.s13.d1':
    'O cadastro, o acesso ou o uso de qualquer funcionalidade da plataforma implica aceitação integral e irrestrita destes Termos de Uso e das políticas referenciadas (Privacidade, Pagamentos, Comunidade, quando aplicável).',
  'terms.s13.d2':
    'Se você não concordar com qualquer disposição, deve abster-se de utilizar a plataforma e poderá solicitar exclusão da conta conforme a seção de cancelamento.',
  'terms.s13.d3':
    'O aceite pode ser registrado eletronicamente (data, hora, versão dos Termos) para fins de comprovação, nos termos da legislação sobre documentos eletrônicos.',
  'terms.s13.d4':
    'Em caso de dúvida sobre o alcance de uma cláusula, entre em contato pelos canais oficiais antes de concluir contratações relevantes na plataforma.',
};

export const TERMS_EN: Record<string, string> = {
  'terms.title': 'Terms of Use',
  'terms.subtitle': 'Rules governing use of the Taskly platform. Tap each topic for details.',
  'terms.updated': 'Last updated: May 2026',
  'terms.back': 'Back to Security & guarantees',
  'terms.button': 'Terms of Use',
  'terms.buttonSub': '13 topics — identification, responsibilities, payments, and more',
  'terms.legalSection': 'Legal documents',
  'terms.acceptNote':
    'Continued use after published changes constitutes acceptance of the current Terms version.',

  'terms.s1.title': '1. Identification',
  'terms.s1.summary':
    'These Terms govern the Taskly platform, owned by the company listed in corporate records.',
  'terms.s1.d1':
    'These Terms of Use (“Terms”) govern access to and use of the digital platform “Taskly”, owned by [COMPANY NAME], CNPJ [●] (“Taskly”, “we”, or “platform”).',
  'terms.s1.d2':
    'Registered office, official contact channels, and legal representative data are listed in the About section and on the institutional website.',
  'terms.s1.d3':
    'By registering or using any feature, you declare legal capacity to contract and, where applicable, authority to bind the legal entity you represent.',
  'terms.s1.d4':
    'Questions about these Terms may be sent through in-app help channels with user identification and a clear description of the request.',

  'terms.s2.title': '2. Purpose',
  'terms.s2.summary':
    'The platform connects Clients and independent Professionals for on-demand services.',
  'terms.s2.d1':
    'Taskly connects contracting users (“Clients”) and independent service providers (“Professionals”) through search, messaging, proposals, booking, and tracking tools.',
  'terms.s2.d2':
    'Services are performed by the hired Professional; Taskly provides technology and support described in these Terms and complementary policies.',
  'terms.s2.d3':
    'Specific features (held payments, digital contracts, verification, plans) may vary by profile, region, and availability as shown in the interface.',
  'terms.s2.d4':
    'The platform does not replace legal, tax, or accounting advice; users should seek professional guidance when needed.',

  'terms.s3.title': '3. Nature of the relationship',
  'terms.s3.summary':
    'Taskly is a technology intermediary and is not a party to the contract between Client and Professional.',
  'terms.s3.d1':
    'Taskly acts solely as a technology intermediary and does not perform the services contracted between users.',
  'terms.s3.d2':
    'No employment, partnership, agency, or subordination relationship exists between Taskly and Professionals or Clients by reason of platform use.',
  'terms.s3.d3':
    'The service agreement is between Client and Professional; price, scope, and deadlines are set by the parties using in-app tools.',
  'terms.s3.d4':
    'Taskly may offer dispute mediation and safety tools per published policies, without acting as a binding arbitrator unless required by law.',

  'terms.s4.title': '4. Registration and eligibility',
  'terms.s4.summary': 'Truthful, complete, and up-to-date information; users are responsible for accuracy.',
  'terms.s4.d1':
    'Users must provide truthful, complete, and current personal or business data and are fully responsible for their accuracy.',
  'terms.s4.d2':
    'Fake profiles, duplicate accounts for fraud, or unauthorized use of third-party identity are prohibited.',
  'terms.s4.d3':
    'Minors may only use the platform with proper legal representation where permitted by law and available features.',
  'terms.s4.d4':
    'Users must keep credentials confidential and promptly report suspected unauthorized account use.',
  'terms.s4.d5':
    'Taskly may refuse, suspend, or terminate accounts that fail eligibility, integrity, or compliance requirements.',

  'terms.s5.title': '5. Professional responsibilities',
  'terms.s5.summary':
    'Execution, quality, deadlines, and legal and tax obligations are entirely the Professional’s responsibility.',
  'terms.s5.d1':
    'Professionals are fully responsible for performing contracted services, including means, materials, and work methods unless otherwise agreed.',
  'terms.s5.d2':
    'Professionals must deliver technical quality consistent with their profile and chat or digital contract agreements.',
  'terms.s5.d3':
    'Meeting deadlines, attendance, and communicating impediments are Professional obligations toward the Client.',
  'terms.s5.d4':
    'Professionals must comply with laws applicable to their activity, including safety rules, licenses, and professional regulations.',
  'terms.s5.d5':
    'Tax and social security obligations from independent activity are solely the Professional’s responsibility.',
  'terms.s5.d6':
    'Profile content must be lawful; reviews must reflect actual platform conduct.',

  'terms.s6.title': '6. Client responsibilities',
  'terms.s6.summary': 'Correct information, payment for services, and appropriate conduct on the platform.',
  'terms.s6.d1':
    'Clients must provide accurate information about the service, location, access, and relevant execution conditions.',
  'terms.s6.d2':
    'Payment must be made as agreed (via platform or directly with the Professional when applicable).',
  'terms.s6.d3':
    'Respectful conduct in chat and reviews is required; harassment, discrimination, and illegal requests are prohibited.',
  'terms.s6.d4':
    'Clients must provide reasonable access and safety at the service location when applicable.',
  'terms.s6.d5':
    'Service completion confirmation in the app, when used, must reflect actual performance as it may affect payout.',

  'terms.s7.title': '7. Payments and transactions',
  'terms.s7.summary':
    'The platform may or may not process payments; direct transactions between parties are outside Taskly control.',
  'terms.s7.d1':
    'Taskly may process payments with hold until service confirmation and charge platform fees per the active plan.',
  'terms.s7.d2':
    'For direct Client–Professional payments, Taskly has no control over amounts, chargebacks, or financial disputes.',
  'terms.s7.d3': 'Fees and plan conditions are disclosed in the interface before purchase or booking.',
  'terms.s7.d4':
    'Refunds and cancellations follow payment policy and the agreement between parties when platform processing applies.',
  'terms.s7.d5': 'Use only official in-app payment methods; sensitive data is handled by certified processors.',

  'terms.s8.title': '8. Limitation of liability',
  'terms.s8.summary':
    'Taskly is not liable for service performance damages, financial losses, or user-to-user relationships.',
  'terms.s8.d1':
    'To the maximum extent permitted by law, Taskly is not liable for damages from performance or non-performance of user contracts.',
  'terms.s8.d2':
    'No liability for indirect losses or agreements outside official platform payment flows.',
  'terms.s8.d3':
    'Contractual warranties between users are between the parties; the platform does not provide insurance unless required by law.',
  'terms.s8.d4':
    'Temporary outages from maintenance or third parties will be restored with reasonable efforts.',
  'terms.s8.d5': 'Nothing here limits non-waivable consumer rights under applicable Brazilian law.',

  'terms.s9.title': '9. Intellectual property',
  'terms.s9.summary': 'Platform content is legally protected; unauthorized reproduction is prohibited.',
  'terms.s9.d1':
    'Brands, software, layout, and institutional content belong to Taskly or licensors and are protected by IP law.',
  'terms.s9.d2': 'Unauthorized reproduction, distribution, reverse engineering, or commercial exploitation is prohibited.',
  'terms.s9.d3':
    'User-submitted content remains their responsibility; users grant the license needed to operate the service.',
  'terms.s9.d4': 'IP infringement reports may be submitted through official channels with required documentation.',

  'terms.s10.title': '10. Suspension and termination',
  'terms.s10.summary':
    'Accounts may be suspended or removed for Terms violations, misconduct, or fraud.',
  'terms.s10.d1':
    'Taskly may suspend or delete accounts for violations of these Terms, other policies, or applicable law.',
  'terms.s10.d2':
    'Misconduct includes fraud, harassment, discrimination, data misuse, review manipulation, or fee evasion.',
  'terms.s10.d3':
    'Fraud may be reported to authorities; funds may be held where contract and law allow.',
  'terms.s10.d4':
    'Users may request account closure; pending obligations remain enforceable after closure.',
  'terms.s10.d5':
    'Users may be heard before permanent deletion except when immediate risk requires urgent action.',

  'terms.s11.title': '11. Changes',
  'terms.s11.summary': 'Terms may change at any time with publication on the platform.',
  'terms.s11.d1':
    'Terms may be updated by publishing a new version and, when relevant, email or in-app notice.',
  'terms.s11.d2': 'The last update date appears at the top of this page or in signup summaries.',
  'terms.s11.d3':
    'Material changes affecting acquired rights in ongoing platform contracts will be announced with reasonable notice when required.',
  'terms.s11.d4': 'Continued use after the effective date constitutes acceptance; users may close the account if they disagree.',

  'terms.s12.title': '12. Applicable law',
  'terms.s12.summary': 'Brazilian law; courts of the company’s registered office.',
  'terms.s12.d1': 'These Terms are governed by the laws of Brazil.',
  'terms.s12.d2':
    'Courts at [COMPANY NAME] headquarters are elected, except mandatory consumer forum rules.',
  'terms.s12.d3':
    'If translations differ from Portuguese, the Portuguese version prevails for legal interpretation in Brazil.',
  'terms.s12.d4': 'Amicable resolution via support and platform mediation is encouraged before litigation.',

  'terms.s13.title': '13. Acceptance',
  'terms.s13.summary': 'Using the platform means full acceptance of these Terms of Use.',
  'terms.s13.d1':
    'Registration, access, or use of any feature implies full acceptance of these Terms and referenced policies.',
  'terms.s13.d2':
    'If you disagree, do not use the platform and you may request account deletion per the termination section.',
  'terms.s13.d3':
    'Acceptance may be recorded electronically (date, time, Terms version) for proof purposes.',
  'terms.s13.d4':
    'Contact official channels before major bookings if any clause is unclear.',
};

export const TERMS_ES: Record<string, string> = {
  'terms.title': 'Términos de Uso',
  'terms.subtitle':
    'Reglas de uso de la plataforma Taskly. Toca cada tema para ver los detalles.',
  'terms.updated': 'Última actualización: mayo de 2026',
  'terms.back': 'Volver a Seguridad y garantías',
  'terms.button': 'Términos de Uso',
  'terms.buttonSub': '13 temas — identificación, responsabilidades, pagos y más',
  'terms.legalSection': 'Documentos legales',
  'terms.acceptNote':
    'El uso continuado tras cambios publicados implica la aceptación de la versión vigente.',

  'terms.s1.title': '1. Identificación',
  'terms.s1.summary':
    'Estos Términos regulan la plataforma Taskly, titularidad de la empresa indicada en el registro societario.',
  'terms.s1.d1':
    'Estos Términos de Uso regulan el acceso y uso de la plataforma digital “Taskly”, titularidad de [NOMBRE DE LA EMPRESA], CNPJ [●].',
  'terms.s1.d2':
    'Domicilio social, canales oficiales y representación legal figuran en “Acerca de” y en el sitio institucional.',
  'terms.s1.d3':
    'Al registrarse o usar cualquier función, declara capacidad legal para contratar y, si aplica, representar a la persona jurídica.',
  'terms.s1.d4':
    'Las dudas pueden enviarse por los canales de ayuda con identificación del usuario y descripción clara.',

  'terms.s2.title': '2. Objeto',
  'terms.s2.summary':
    'La plataforma intermedia el contacto entre Clientes y Profesionales autónomos para contratar servicios.',
  'terms.s2.d1':
    'Taskly conecta usuarios contratantes (“Clientes”) y prestadores autónomos (“Profesionales”) mediante herramientas digitales.',
  'terms.s2.d2':
    'Los servicios los presta el Profesional contratado; Taskly aporta infraestructura y recursos descritos en estos Términos.',
  'terms.s2.d3':
    'Funciones específicas pueden variar según perfil, región y disponibilidad en la interfaz.',
  'terms.s2.d4':
    'La plataforma no sustituye asesoría jurídica, contable o fiscal.',

  'terms.s3.title': '3. Naturaleza de la relación',
  'terms.s3.summary':
    'Taskly es intermediario tecnológico y no es parte del contrato entre Cliente y Profesional.',
  'terms.s3.d1':
    'Taskly actúa exclusivamente como intermediario tecnológico sin ejecutar los servicios contratados.',
  'terms.s3.d2':
    'No hay vínculo laboral, societario ni de subordinación entre Taskly y usuarios por el uso de la plataforma.',
  'terms.s3.d3':
    'El contrato de prestación es entre Cliente y Profesional; precio, plazo y alcance los definen las partes.',
  'terms.s3.d4':
    'Taskly puede ofrecer mediación según políticas publicadas, sin ser árbitro vinculante salvo ley o acuerdo expreso.',

  'terms.s4.title': '4. Registro y elegibilidad',
  'terms.s4.summary':
    'Datos veraces, actualizados y completos; el usuario responde por su veracidad.',
  'terms.s4.d1':
    'El usuario debe registrar datos personales o empresariales veraces y mantenerlos actualizados.',
  'terms.s4.d2':
    'Prohibidos perfiles falsos, cuentas duplicadas para fraude o uso de identidad ajena sin autorización.',
  'terms.s4.d3':
    'Menores de 18 años solo con representación legal cuando la ley y las funciones lo permitan.',
  'terms.s4.d4':
    'Mantenga credenciales en secreto y reporte uso no autorizado de la cuenta.',
  'terms.s4.d5':
    'Taskly puede rechazar, suspender o cerrar cuentas que no cumplan elegibilidad o estos Términos.',

  'terms.s5.title': '5. Responsabilidades de los Profesionales',
  'terms.s5.summary':
    'Ejecución, calidad, plazos y obligaciones legales y fiscales son responsabilidad integral del Profesional.',
  'terms.s5.d1':
    'Los Profesionales responden integralmente por la ejecución de los servicios contratados.',
  'terms.s5.d2':
    'Deben garantizar calidad técnica acorde al perfil y lo acordado en chat o contrato digital.',
  'terms.s5.d3':
    'Cumplir plazos, asistir a los lugares acordados y comunicar impedimentos al Cliente.',
  'terms.s5.d4':
    'Observar la legislación aplicable, licencias y normas de seguridad de su actividad.',
  'terms.s5.d5':
    'Obligaciones fiscales y de su actividad autónoma son exclusivas del Profesional.',
  'terms.s5.d6':
    'El contenido del perfil debe ser lícito; las reseñas deben reflejar conducta real.',

  'terms.s6.title': '6. Responsabilidades de los Clientes',
  'terms.s6.summary':
    'Información correcta, pago de los servicios y conducta adecuada en la plataforma.',
  'terms.s6.d1':
    'Los Clientes deben informar correctamente el servicio, ubicación, acceso y condiciones relevantes.',
  'terms.s6.d2':
    'El pago debe realizarse según lo acordado (plataforma o directo con el Profesional).',
  'terms.s6.d3':
    'Conducta respetuosa en chat y reseñas; prohibidos acoso, discriminación y solicitudes ilegales.',
  'terms.s6.d4':
    'Proporcionar acceso y seguridad razonables en el lugar del servicio cuando corresponda.',
  'terms.s6.d5':
    'La confirmación de conclusión en la app debe reflejar la realidad y puede afectar el pago al Profesional.',

  'terms.s7.title': '7. Pagos y transacciones',
  'terms.s7.summary':
    'La plataforma puede o no intermediar pagos; transacciones directas quedan fuera del control de Taskly.',
  'terms.s7.d1':
    'Taskly puede retener pagos hasta confirmación del servicio y cobrar comisiones según el plan.',
  'terms.s7.d2':
    'En pagos directos entre partes, Taskly no controla montos, contracargos ni disputas financieras.',
  'terms.s7.d3': 'Comisiones y planes se informan en la interfaz antes de contratar.',
  'terms.s7.d4':
    'Reembolsos y cancelaciones siguen la política de pagos y el acuerdo entre las partes.',
  'terms.s7.d5':
    'Use solo medios oficiales de la app; datos sensibles los procesan partners certificados.',

  'terms.s8.title': '8. Limitación de responsabilidad',
  'terms.s8.summary':
    'Taskly no responde por daños de la ejecución, pérdidas financieras ni relaciones entre usuarios.',
  'terms.s8.d1':
    'En la máxima medida legal, Taskly no responde por daños de ejecución o incumplimiento entre usuarios.',
  'terms.s8.d2':
    'Sin responsabilidad por pérdidas indirectas o acuerdos fuera de los flujos oficiales de pago.',
  'terms.s8.d3':
    'Garantías contractuales entre usuarios son de las partes; la plataforma no sustituye seguros salvo ley.',
  'terms.s8.d4':
    'Interrupciones temporales se restablecerán con esfuerzos razonables.',
  'terms.s8.d5': 'Nada limita derechos irrenunciables del consumidor en Brasil cuando aplique.',

  'terms.s9.title': '9. Propiedad intelectual',
  'terms.s9.summary':
    'Contenido de la plataforma protegido por ley; reproducción no autorizada prohibida.',
  'terms.s9.d1':
    'Marcas, software y contenidos institucionales pertenecen a Taskly o licenciantes.',
  'terms.s9.d2': 'Prohibida reproducción, ingeniería inversa o explotación comercial no autorizada.',
  'terms.s9.d3':
    'Contenidos del usuario son su responsabilidad; conceden licencia para operar el servicio.',
  'terms.s9.d4': 'Denuncias de infracción por canales oficiales con documentación mínima.',

  'terms.s10.title': '10. Suspensión y cancelación',
  'terms.s10.summary':
    'Cuentas pueden suspenderse o eliminarse por violación, conducta inadecuada o fraude.',
  'terms.s10.d1':
    'Taskly puede suspender o eliminar cuentas por violación de Términos, políticas o ley.',
  'terms.s10.d2':
    'Conducta inadecuada incluye fraude, acoso, discriminación, manipulación de reseñas o evasión de comisiones.',
  'terms.s10.d3':
    'Fraude puede reportarse a autoridades; fondos pueden retenerse con base legal y contractual.',
  'terms.s10.d4':
    'El usuario puede solicitar cierre; obligaciones pendientes siguen vigentes.',
  'terms.s10.d5':
    'Se podrá oír al usuario antes de exclusión definitiva salvo riesgo inmediato.',

  'terms.s11.title': '11. Alteraciones',
  'terms.s11.summary':
    'Los Términos pueden modificarse en cualquier momento con publicación en la plataforma.',
  'terms.s11.d1':
    'Actualizaciones mediante publicación y, si corresponde, aviso por correo o notificación.',
  'terms.s11.d2': 'La fecha de actualización figura al inicio de esta página.',
  'terms.s11.d3':
    'Cambios materiales se comunicarán con antelación razonable cuando la ley lo exija.',
  'terms.s11.d4':
    'El uso continuado implica aceptación; puede cerrar la cuenta si no está de acuerdo.',

  'terms.s12.title': '12. Legislación aplicable',
  'terms.s12.summary':
    'Legislación brasileña; foro de la comarca de la sede de la empresa.',
  'terms.s12.d1': 'Estos Términos se rigen por las leyes de la República Federativa del Brasil.',
  'terms.s12.d2':
    'Foro de la sede de [NOMBRE DE LA EMPRESA], salvo normas imperativas del consumidor.',
  'terms.s12.d3':
    'Ante divergencia con traducciones, prevalece la versión en portugués en Brasil.',
  'terms.s12.d4':
    'Se fomenta resolución amistosa por soporte y mediación antes de acciones judiciales.',

  'terms.s13.title': '13. Aceptación',
  'terms.s13.summary':
    'El uso de la plataforma implica aceptación integral de estos Términos de Uso.',
  'terms.s13.d1':
    'Registro, acceso o uso implica aceptación integral de estos Términos y políticas referenciadas.',
  'terms.s13.d2':
    'Si no está de acuerdo, no use la plataforma y solicite eliminación de la cuenta.',
  'terms.s13.d3':
    'La aceptación puede registrarse electrónicamente (fecha, hora, versión).',
  'terms.s13.d4':
    'Consulte canales oficiales ante dudas antes de contrataciones relevantes.',
};
