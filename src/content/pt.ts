import type { SiteContent } from './types';

/**
 * pt-BR. Corpo em primeira pessoa do singular, sentence case nos títulos,
 * mono maiúsculo nos labels, sem emoji e sem nome de cliente. Os números são
 * idênticos aos do inglês — um conjunto só, três canais.
 */
export const pt: SiteContent = {
  lang: 'pt',
  htmlLang: 'pt-BR',

  meta: {
    title: 'Mateus Cardoso — Engenheiro de software full-stack sênior',
    description:
      'Toco produto de ponta a ponta: regra de negócio, arquitetura, conversa direta com o cliente e IA como processo verificável. 40 mil+ ofertas por hora em 100+ marketplaces, −30% de custo de rota, −73% de chamados.',
    siteName: 'Mateus Cardoso',
  },

  nav: {
    items: [
      { id: 'proof', label: 'prova' },
      { id: 'cases', label: 'cases' },
      { id: 'method', label: 'método' },
      { id: 'about', label: 'sobre' },
      { id: 'experience', label: 'experiência' },
      { id: 'contact', label: 'contato' },
    ],
    soundLabel: 'som',
    soundOn: 'Som ligado',
    soundOff: 'Som desligado',
    skip: 'Pular para o conteúdo',
  },

  hero: {
    eyebrow: 'Dev full-stack sênior · MCode Studio Labs',
    titleBefore: 'Não sou contratado pra escrever código. Sou contratado pra decidir ',
    titleHighlight: 'o que construir',
    titleAfter: ' e por quê.',
    lead: 'Toco produto de ponta a ponta: entendo a regra de negócio, decido a arquitetura certa pra ela, falo direto com o cliente e uso IA como processo controlado.',
    ctaClient: 'Contratar um projeto',
    ctaRecruiter: 'Estou recrutando',
    tags: ['Regra de negócio', 'Arquitetura sob restrição', 'Comunicação direta', 'IA verificável'],
  },

  proof: {
    label: '01 / Prova rápida',
    items: [
      { value: '−73%', label: 'chamados de suporte, via pipeline de IA' },
      { value: '−30%', label: 'custo de deslocamento em 70+ rotas de campo' },
      {
        value: '40 mil+',
        unit: 'ofertas/h',
        label: 'em 100+ marketplaces, em 150+ pods no Kubernetes',
      },
      {
        value: '2.000+',
        label: 'usuários pagantes em produto que construí',
        note: 'produto de sócio · sem nome por NDA',
      },
      {
        value: '200',
        label: 'interessados no Apex sem nenhum marketing',
        note: 'demanda validada, não base paga',
      },
    ],
  },

  cases: {
    index: '02',
    eyebrow: 'Cases',
    title: 'Contados pela decisão, não pela stack',
    lead: 'Contexto, decisão, trade-off nomeado e o número no fim. Clientes não são citados — projeto restrito é descrito por arquitetura e magnitude.',
    readMore: 'Ler o case completo →',
    detail: {
      back: '← voltar',
      context: 'Contexto',
      role: 'Meu papel',
      decision: 'Decisão',
      tradeoff: 'Trade-off',
      outcome: 'Resultado',
      architecture: 'Arquitetura',
      next: 'Próximo case →',
      previous: '← Case anterior',
    },
    items: [
      {
        id: 'scraping',
        index: 'Case 01',
        result: '40 mil+ ofertas / hora',
        title: 'Coleta de 40 mil ofertas por hora em 100+ marketplaces sem ser bloqueado',
        context:
          'Monitorar ofertas de preço da marca e dos concorrentes em vários marketplaces, 24/7. A regra dura era a janela: todo o universo de ofertas tinha que ser coletado dentro de 1 hora — abre no :00, fecha até o :59 e recomeça.',
        role: 'Fui dono da arquitetura, da infraestrutura e da operação, e respondi pelo número na frente do cliente.',
        decision:
          'Escalar horizontal no Kubernetes — 150+ pods em máquinas de 100 GB+ — em vez de coletar em série. Screenshot de comprovação por coleta, pro cliente auditar qualquer dado. Camada de anti-detecção pros coletores não serem bloqueados como bot.',
        tradeoff:
          'Custo alto de infra e complexidade permanente de manter a evasão anti-bot viva. Pago conscientemente: sem isso não existe janela de 1h nem comprovação — e esses dois são o produto.',
        outcome:
          '40 mil+ ofertas monitoradas em 100+ marketplaces, coleta completa 24/7 dentro da janela horária, com prova visual anexada a cada oferta.',
        tags: ['Kubernetes', 'Anti-bot', 'Auditabilidade'],
        flow: [
          { label: 'agendador' },
          { label: '150+ pods' },
          { label: 'screenshot' },
          { label: 'comprovação', accent: true },
        ],
      },
      {
        id: 'routing',
        index: 'Case 02',
        result: '−30% custo de deslocamento',
        title: '−30% no custo de deslocamento de 70+ rotas de campo',
        context:
          '70+ rotas pelo Brasil, percorridas por gente que visita lojas pra fazer auditoria. Precisavam ser otimizadas sob restrição real de campo, não em mapa limpo.',
        role: 'Modelei o problema, escolhi o solver, ajustei as restrições e validei o resultado contra o dinheiro que estava sendo gasto.',
        decision:
          'Modelar como VRPTW — roteirização com janelas de tempo — no OR-Tools do Google, na pré-era dos LLMs. Adaptado com penalidades, prioridade de visita por coordenada e capacidade: jornada, almoço, loja de início e fim, retorno pra casa. O custo de transporte público veio das APIs do Google por cidade; sem dado, média de passagem por CEP — pra rota ser validada economicamente, não só geograficamente.',
        tradeoff:
          'Modelo clássico exige modelar cada restrição à mão, uma por uma. Escolhi pela flexibilidade de parâmetros, não pela velocidade de implementação.',
        outcome: '−30% de custo real de deslocamento comparado com o que se gastava antes.',
        tags: ['OR-Tools', 'VRPTW', 'Google APIs'],
        flow: [
          { label: 'restrições' },
          { label: 'VRPTW' },
          { label: 'custo real' },
          { label: 'rota viável', accent: true },
        ],
      },
      {
        id: 'apex',
        index: 'Case 03',
        result: '200 interessados, zero marketing',
        title: 'Apex: app multiesporte com coaching por IA, tocado sozinho de ponta a ponta',
        context:
          'O mercado de apps de esporte é fragmentado por modalidade — um app por esporte. A tese do produto é unificar treino multiesporte com coaching por IA num lugar só. Eu treino essas modalidades, então sou o usuário.',
        role: 'Tudo: produto, back-end, front-end, orquestração de IA e o pipeline de marketing que vende.',
        decision:
          'Tocar sozinho de ponta a ponta e automatizar marketing e vendas no mesmo fluxo: geração automática de blog com fontes reais em vez de conteúdo genérico, Instagram e a estruturação de SEO da landing — o blog existe pra ranquear.',
        tradeoff:
          'Escopo enorme pra uma pessoa. A aposta é automação pesada pra viabilizar o solo, ao custo de ser dono desses pipelines pra sempre.',
        outcome: '~200 pessoas em lista de interesse sem nenhum gasto de marketing. Launch iminente.',
        caveat: 'É demanda validada, não base ativa paga — vira número forte no launch.',
        tags: ['Produto próprio', 'IA', 'Vite'],
        flow: [
          { label: 'treino' },
          { label: 'contexto do atleta' },
          { label: 'coaching IA', accent: true },
        ],
      },
    ],
  },

  method: {
    index: '03',
    eyebrow: 'Como eu trabalho',
    title: 'Método com lastro — cada princípio aponta pra um case',
    loopLabel: 'Loop de IA verificável',
    loop: [
      { label: 'contexto' },
      { label: 'plano' },
      { label: 'unidades verificáveis' },
      { label: 'review', sub: 'eu sou o gate', accent: true },
    ],
    principles: [
      {
        marker: '01',
        title: 'IA como processo verificável',
        body: 'Contexto antes do prompt, decomposição em unidades verificáveis, workflows em paralelo e review em loop. Código gerado é obrigado a respeitar a arquitetura e a padronização definidas no início, e a documentação é o ponto de verdade do fluxo.',
        evidence:
          'Pipeline de suporte que cortou 73% dos chamados: dúvida do usuário → IA analisa o contexto → consulta a documentação → resolve, ou abre ticket já resumido pra mim.',
      },
      {
        marker: '02',
        title: 'Comunicação que fecha negócio',
        body: 'Traduzo decisão técnica em impacto: custo, prazo, risco. Entrei como apresentador no canal de vendas, além da engenharia, porque a ferramenta era complexa demais pro vendedor apresentar sozinho.',
        evidence:
          'Apresentar direto pra diretoria destravou grandes contratos com marcas líderes de eletrônicos e varejo.',
      },
      {
        marker: '03',
        title: 'Arquitetura sob a restrição do problema',
        body: 'Escolho a ferramenta pela restrição, não pela moda. Escala, dependências, custo e trade-off são decididos antes da primeira linha de código.',
        evidence: 'OR-Tools no VRPTW da roteirização — flexibilidade de parâmetros acima de velocidade.',
      },
      {
        marker: '04',
        title: 'Autodidata, com home lab',
        body: 'Arquiteto e opero minha própria infra self-hosted: Proxmox, TrueNAS, UniFi, 10GbE, RAID 10, Home Assistant, UPS. É o campo de teste das decisões de infra que tomo no trabalho.',
        evidence:
          'Aprendo domínio do zero: montei um quadricóptero com peças da China aos 13 anos, antes de existir drone pronto.',
      },
    ],
  },

  about: {
    index: '04',
    eyebrow: 'Sobre',
    title: 'Contexto, não biografia',
    paragraphs: [
      'Sou dev full-stack sênior e sócio na Tracking Trade, e toco a MCode Studio Labs — estúdio próprio de onde saem o Apex (treino multiesporte com coaching por IA) e o Pricetrack (monitoramento de preços).',
      'Corro, treino e faço trilha — sou o usuário do Apex, então entendo o usuário final sem tempo de rampa. Fora do produto, opero um home lab self-hosted que serve de campo de teste pras decisões de infra que tomo no trabalho.',
    ],
    stack: [
      'Next.js',
      'React',
      'React Native',
      'NestJS',
      'Python',
      'PostgreSQL',
      'Kubernetes',
      'Supabase',
      'Trigger.dev',
    ],
  },

  experience: {
    index: '05',
    eyebrow: 'Experiência',
    title: 'Trajetória factual',
    educationLabel: 'Formação',
    education:
      'Bacharelado em Sistemas de Informação (UFPE) · Técnico em Redes de Computadores (ETEMAC)',
    entries: [
      {
        period: 'mar 2020 — atual',
        role: 'Engenheiro de Software / Sócio',
        org: 'Tracking Trade',
        current: true,
        bullets: [
          'Arquitetei coleta de 40 mil+ ofertas/hora em 100+ marketplaces com 150+ pods no Kubernetes, com evasão anti-bot e comprovação por screenshot.',
          'Modelei roteirização VRPTW com OR-Tools do Google para 70+ rotas de campo, cortando 30% do custo real de deslocamento.',
        ],
      },
      {
        period: '2023 — atual',
        role: 'Fundador',
        org: 'MCode Studio Labs',
        bullets: [
          'Apex: app multiesporte com coaching por IA, tocado ponta a ponta — 200 interessados antes do launch, sem marketing.',
          'Pipeline de suporte com IA que cortou 73% dos chamados.',
        ],
      },
      {
        period: 'jul 2018 — fev 2020',
        role: 'Desenvolvedor Full Stack',
        org: 'Tracking Trade',
        bullets: [
          'Conduzi as migrações AngularJS → React e Ionic → React Native, além de microserviços e features de mercado.',
        ],
      },
      {
        period: 'abr — jun 2018',
        role: 'Estagiário',
        org: 'Tracking Trade',
      },
    ],
  },

  contact: {
    index: '06',
    eyebrow: 'Contato',
    title: 'Dois caminhos, fricção zero',
    lead: 'Se você contrata projeto, me conte o problema de negócio. Se você recruta, o currículo tem os mesmos números desta página.',
    cvButton: 'Ver o currículo',
    formName: 'Nome',
    formNamePlaceholder: 'Como te chamo?',
    formEmail: 'E-mail',
    formEmailPlaceholder: 'voce@empresa.com',
    formMessage: 'Contexto',
    formMessagePlaceholder: 'Que problema de negócio você precisa resolver?',
    submit: 'Enviar',
    sending: 'Enviando…',
    sentLabel: 'Recebido',
    sentBody: 'Respondo em até 1 dia útil.',
    sendAnother: 'Enviar outra',
    errorLabel: 'Não enviou',
    errorBody: 'Alguma coisa quebrou no caminho. Me escreva direto em contato@mateuscardosogs.com.',
    directLabel: 'Ou vá direto',
    required: 'Obrigatório.',
    invalidEmail: 'Confira o e-mail.',
  },

  footer: {
    tagline: 'Produto de ponta a ponta: decisão, arquitetura, cliente e métrica.',
    note: 'MCode Studio Labs · clientes sob NDA são descritos por arquitetura e magnitude, nunca por nome.',
    cvLink: 'currículo',
  },

  notFound: {
    title: 'Esta página não existe',
    body: 'O link está quebrado ou a página foi aposentada na reconstrução de 2026.',
    cta: 'Ir pra home',
  },

  cv: {
    title: 'Mateus Cardoso — Currículo',
    description: 'Currículo em uma coluna, ATS-safe, de Mateus Cardoso, engenheiro full-stack sênior.',
    role: 'Engenheiro de Software · Full-stack sênior',
    location: 'Recife, PE · remoto (BR / EU / US)',
    summaryLabel: 'Resumo',
    summary:
      'Engenheiro de software full-stack sênior e sócio, com produtos próprios em operação. Traduzo regra de negócio em arquitetura, converso direto com cliente e diretoria, e uso IA como processo verificável — com review e padronização, não como gerador solto. Sou dono da decisão, do código e da métrica depois do launch.',
    experienceLabel: 'Experiência',
    jobs: [
      {
        role: 'Engenheiro de Software / Sócio',
        org: 'Tracking Trade',
        period: 'mar 2020 — atual',
        bullets: [
          'Arquitetei coleta de 40 mil+ ofertas/hora em 100+ marketplaces com 150+ pods no Kubernetes, com evasão anti-bot e comprovação por screenshot.',
          'Modelei roteirização de 70+ rotas de campo como VRPTW com Google OR-Tools, com penalidades e capacidade de jornada — 30% de redução no custo real de deslocamento.',
          'Construí pipeline de suporte com IA (contexto → documentação → resolução ou ticket resumido) que cortou 73% dos chamados.',
          'Apresentei a ferramenta diretamente à diretoria de marcas líderes de eletrônicos e varejo, destravando grandes contratos.',
        ],
      },
      {
        role: 'Fundador',
        org: 'MCode Studio Labs',
        period: '2023 — atual',
        bullets: [
          'Apex — app multiesporte com coaching por IA, tocado ponta a ponta: produto, back-end, front-end em Vite e orquestração de IA. 200 interessados em lista antes do launch, sem marketing pago.',
          'Automação de marketing no mesmo fluxo do produto: geração de blog com fontes, Instagram e estruturação de SEO da landing.',
          'Pricetrack — monitoramento de preços e scraping em escala (sob a Tracking Trade).',
        ],
      },
      {
        role: 'Desenvolvedor Full Stack',
        org: 'Tracking Trade',
        period: 'jul 2018 — fev 2020',
        bullets: [
          'Conduzi as migrações AngularJS → React e Ionic → React Native.',
          'Criei produtos, microserviços e features de mercado do zero à operação.',
        ],
      },
      {
        role: 'Estagiário de Desenvolvimento',
        org: 'Tracking Trade',
        period: 'abr — jun 2018',
      },
    ],
    skillsLabel: 'Competências',
    skills: [
      { label: 'Linguagens', value: 'TypeScript, JavaScript, Python, Ruby' },
      { label: 'Front-end', value: 'React, Next.js, React Native, Expo, Vite' },
      {
        label: 'Back-end',
        value: 'NestJS, tRPC, Trigger.dev, Ruby on Rails, PostgreSQL, Drizzle, Supabase',
      },
      { label: 'Infraestrutura', value: 'Kubernetes, Docker, Proxmox, TrueNAS, UniFi, self-hosted' },
      {
        label: 'Método',
        value:
          'Arquitetura sob restrição, otimização (OR-Tools / VRPTW), IA como processo verificável, comunicação com cliente',
      },
    ],
    educationLabel: 'Formação',
    education: [
      'Bacharelado em Sistemas de Informação — UFPE',
      'Técnico em Redes de Computadores — ETEMAC',
    ],
    printLabel: 'Imprimir / salvar em PDF',
    downloadLabel: 'Baixar PDF',
    backLabel: '← voltar pro site',
  },
};
