import type { SiteContent } from './types';

/**
 * pt-BR adaptado do inglês, que é o original autoral — não é tradução literal.
 * Primeira pessoa do singular, sentence case nos títulos, mono maiúsculo nos
 * labels, sem emoji e sem nome de cliente. Os números são idênticos aos do EN.
 */
export const pt: SiteContent = {
  lang: 'pt',
  htmlLang: 'pt-BR',

  meta: {
    title: 'Mateus Cardoso — Desenvolvedor full-stack sênior',
    description:
      'Escrever código deixou de ser o diferencial. O que faz diferença é entender o negócio por trás. 40 mil+ ofertas por hora em 100+ marketplaces, −30% de custo de deslocamento, −73% de chamados de suporte.',
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
    eyebrow: 'Desenvolvedor full-stack sênior',
    titleBefore: 'Escrever código deixou de ser o diferencial. O que faz diferença é ',
    titleHighlight: 'entender o negócio por trás',
    titleAfter: '.',
    lead: 'Olho o projeto dos dois lados: a regra de negócio, o usuário, como o cliente lê o resultado. E construo com um fluxo otimizado — processo, estrutura e IA como parte dele.',
    ctaPrimary: 'Falar comigo',
    ctaSecondary: 'Ver os cases',
    stack: [
      'Ruby on Rails',
      'NestJS',
      'Hono',
      'Next.js',
      'React Native',
      'Vite',
      'Python',
      'PostgreSQL',
      'Turborepo',
    ],
  },

  proof: {
    label: '01 / Prova rápida',
    items: [
      { value: '−73%', label: 'de chamados de suporte depois do pipeline de IA que construí' },
      { value: '−30%', label: 'de custo de deslocamento em 70+ rotas de campo depois da roteirização' },
      { value: '40 mil+', label: 'ofertas monitoradas por hora em 100+ marketplaces' },
      { value: '2.000+', label: 'usuários pagantes num produto que ajudei a construir' },
      { value: '200', label: 'pessoas na lista de espera de um produto meu, antes de qualquer marketing' },
    ],
  },

  cases: {
    index: '02',
    eyebrow: 'Cases',
    title: 'Contados pela decisão, não pela stack',
    lead: 'Todo case segue a mesma forma: contexto, meu papel, a decisão, o trade-off que ela carregou e o resultado. Clientes não são citados — projeto restrito é descrito por arquitetura e escala.',
    readMore: 'Ler o case completo →',
    detail: {
      back: '← voltar',
      context: 'Contexto',
      role: 'Papel',
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
        index: 'Case 01 · Monitoramento de preços',
        result: '40 mil+ ofertas / hora',
        title: 'Coleta de 40 mil ofertas por hora em 100+ marketplaces, com comprovação anexada',
        context:
          'O produto monitora ofertas de preço — da marca e dos concorrentes — em vários marketplaces, 24/7. A regra dura veio do lado do negócio: todo o universo de ofertas precisa ser coletado dentro de uma janela de 1 hora, que abre no :00 e fecha no :59.',
        role: 'Desenhei e opero a coleta de ponta a ponta, da arquitetura até manter ela saudável em produção.',
        decision:
          'Um coletor serial nunca caberia nessa janela, então a coleta escala horizontal no Kubernetes — máquinas de 100 GB+, 150+ pods. Cada coleta guarda um screenshot como evidência, que é o que permite o cliente auditar qualquer oferta, e uma camada de anti-detecção impede que os coletores sejam bloqueados como bot.',
        tradeoff:
          'Custa mais infraestrutura e manutenção permanente da evasão anti-bot. É um custo que escolhi com consciência, porque a janela e a comprovação são o que o cliente está de fato comprando.',
        outcome:
          '40 mil+ ofertas monitoradas em 100+ marketplaces, completas dentro da janela horária, com prova visual por oferta.',
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
        index: 'Case 02 · Roteirização de campo',
        result: '−30%',
        title: '−30% no custo de deslocamento de 70+ rotas de campo',
        context:
          '70+ rotas pelo Brasil, percorridas por gente que visita lojas pra auditar. As rotas precisavam ser otimizadas sem ignorar como o trabalho de campo realmente é.',
        role: 'Modelar o problema junto com o time de operações, escolher o solver e conectar ele ao custo real de deslocamento.',
        decision:
          'O problema é um VRPTW, então modelei com o Google OR-Tools (isso foi antes dos LLMs), adicionando penalidades, prioridade de visita por coordenada e limites reais de capacidade: jornada, almoço, primeira e última loja, o retorno pra casa. O custo de transporte público veio das APIs do Google por cidade e, onde não havia dado, da média de passagem por CEP — pra rota poder ser checada por sentido econômico, não só geográfico.',
        tradeoff:
          'Um solver clássico exige modelar cada restrição à mão, o que é mais lento de construir. Assumi isso porque a flexibilidade de ajustar cada parâmetro importava mais do que chegar rápido.',
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
        index: 'Case 03 · Apex · Produto próprio',
        result: '200 na lista de espera',
        title:
          'Um produto construído dentro de um domínio que eu vivo, com 200 pessoas esperando antes de qualquer marketing',
        context:
          'Apps de treino são fragmentados por esporte. O Apex é minha tentativa de trazer treino multiesporte e coaching por IA pra um lugar só. Eu treino — corrida, musculação, trilha, condicionamento — então sou o usuário, o que elimina quase toda a rampa de entender o domínio.',
        role: 'Tudo: produto, back-end, front-end em Vite, orquestração de IA com otimização de contexto, infraestrutura e go-to-market.',
        decision:
          'Marketing é tratado como parte do produto: conteúdo de blog automatizado com fontes reais, saída pras redes e uma estrutura de SEO feita pra ranquear. Do lado da infraestrutura me apoiei em serviços gerenciados — Fly.io e Vercel pra hospedagem, workers na AWS, Trigger.dev pra jobs em background, Supabase pra auth, Stripe pra pagamento — pra uma pessoa só conseguir carregar tudo.',
        tradeoff:
          'O escopo é grande pra uma pessoa, e apoiar em automação significa também manter esses pipelines. Em troca, aprendo cada um desses serviços a fundo, e isso volta pro trabalho que faço pros outros.',
        outcome: '~200 pessoas na lista de interesse sem nenhum gasto de marketing. O launch está perto.',
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
    eyebrow: 'Método',
    title: 'A parte do trabalho que não é código',
    lead: 'Construir é a última etapa. A maior parte do que determina se um projeto funciona acontece antes e ao redor dela — e cada princípio abaixo aponta pra algo que eu fiz de verdade.',
    loopLabel: 'Loop de IA verificável',
    loop: [
      { label: 'contexto' },
      { label: 'plano' },
      { label: 'unidades verificáveis' },
      { label: 'review', sub: 'o check final é meu', accent: true },
    ],
    principles: [
      {
        marker: '01',
        title: 'IA como processo que eu verifico',
        body: 'O contexto vem antes do prompt, o trabalho é quebrado em unidades que dá pra checar, e o review acontece em loop. Código gerado segue a arquitetura e os padrões combinados no início, e a documentação é o ponto de verdade do fluxo. O review final é meu.',
        evidence:
          'Pipeline de suporte que cortou 73% dos chamados: dúvida do usuário → IA lê o contexto → consulta a documentação → resolve, ou abre um ticket já resumido pra mim.',
      },
      {
        marker: '02',
        title: 'Falar com quem não é desenvolvedor',
        body: 'Uma decisão técnica só significa alguma coisa quando é traduzida em custo, prazo e risco. Em certo momento o produto estava complexo demais pro time de vendas apresentar sozinho, então entrei nas calls como a pessoa que explica.',
        evidence:
          'Mostrar o fluxo em termos não técnicos pra diretoria ajudou a destravar grandes contratos com marcas líderes de eletrônicos e varejo.',
      },
      {
        marker: '03',
        title: 'Arquitetura escolhida pela restrição',
        body: 'Escala, dependências, custo e trade-off vêm antes da stack. Conhecer muitas ferramentas serve principalmente porque é o que torna a escolha possível.',
        evidence: 'OR-Tools no VRPTW da roteirização —',
        evidenceLink: { text: 'ver o case 02', caseId: 'routing' },
      },
      {
        marker: '04',
        title: 'Eu opero a infraestrutura que desenho',
        body: 'Gosto de infraestrutura e rede o bastante pra manter meu próprio setup self-hosted rodando. Operar isso mantém minhas decisões de arquitetura ancoradas no que de fato precisa ser mantido.',
        evidence: 'Proxmox · TrueNAS · UniFi · 10GbE · RAID 10 · Home Assistant · Arduino · UPS',
      },
    ],
  },

  about: {
    index: '04',
    eyebrow: 'Sobre',
    title: 'Contexto, não biografia',
    paragraphs: [
      'Sou desenvolvedor full-stack sênior. Entrei na empresa onde estou hoje como estagiário e passei por todos os níveis que ela tem, o que hoje significa estar envolvido além do desenvolvimento: estruturação de produto, planejamento, priorização e conversa com clientes e usuários finais.',
      'Em paralelo construo produtos próprios, sempre em áreas que eu já conheço por dentro. Esporte é o exemplo mais claro: eu treino, estudo o assunto, e o Apex saiu de usar o que eu já entendo como praticante pra construir algo útil pras outras pessoas.',
      'Sou autodidata desde criança. Comecei estudando quadricópteros quando não existia nada pronto pra comprar, depois redes, depois servidores — montei minha própria rede e meu próprio servidor de casa porque queria entender como funcionam, não porque algum trabalho pediu.',
      'Esse hábito continua se pagando em trabalho que não é estritamente desenvolvimento. Infraestrutura é o caso mais claro: do setup self-hosted em casa até Fly.io, Vercel e workers na AWS nos meus projetos, cada coisa que eu monto vira algo que consigo levar pro próximo problema.',
    ],
  },

  experience: {
    index: '05',
    eyebrow: 'Experiência',
    title: 'Onde o trabalho aconteceu',
    entries: [
      {
        period: 'em paralelo',
        role: 'Produtos próprios',
        org: 'Apex',
        current: true,
        body: 'O Apex é um produto de treino multiesporte com coaching por IA, construído num domínio que eu pratico. Tocar sozinho significou aprender direito as peças ao redor: hospedagem na Fly.io e na Vercel, workers na AWS, jobs em background no Trigger.dev, Supabase pra auth rápida e Postgres, Stripe pra pagamento, e-mail transacional e analytics pra acompanhar o que as pessoas fazem de verdade. Cada uma dessas coisas volta pro trabalho que faço pros clientes.',
      },
      {
        period: 'mar 2020 — hoje',
        role: 'Engenheiro de software',
        org: 'Tracking Trade',
        current: true,
        body: 'Trabalho em vários produtos ao mesmo tempo, o que empurrou bastante trabalho estrutural: consolidar serviços num monorepo, padronizar como projetos novos começam e automatizar partes da operação que dependiam de alguém estar disponível. Monitoramento de preços e roteirização de campo são as duas maiores peças, e também construí o pipeline de suporte que lê contexto e documentação antes de um ticket chegar numa pessoa.',
      },
      {
        period: 'jul 2018 — fev 2020',
        role: 'Full stack',
        org: 'Tracking Trade',
        body: 'O estágio foi bem o suficiente pra eu ser efetivado como full-stack em pouco tempo. Dali participei da maior parte da frente de produto: a migração de AngularJS pra React e de Ionic pra React Native, além de produtos novos e features de mercado.',
      },
      {
        period: 'abr — jun 2018',
        role: 'Estagiário',
        org: 'Tracking Trade',
      },
    ],
    columns: [
      {
        label: 'Produto e web',
        value: 'Next.js · React · React Native · Expo · Vite · tRPC · Drizzle',
      },
      {
        label: 'Back-end e dados',
        value: 'Ruby on Rails · NestJS · Hono · Python · PostgreSQL · Supabase · Trigger.dev',
      },
      {
        label: 'Infraestrutura e serviços',
        value:
          'Kubernetes · Fly.io · Vercel · AWS · Google Cloud · Stripe · self-hosted: Proxmox, TrueNAS, UniFi',
      },
      {
        label: 'Formação',
        value:
          'Bacharelado em Sistemas de Informação (UFPE) · Técnico em Redes de Computadores (ETEMAC)',
      },
    ],
  },

  contact: {
    index: '06',
    eyebrow: 'Contato',
    title: 'Dois caminhos, fricção zero',
    lead: 'Se você contrata projeto, me conte o problema de negócio. Se você recruta, o currículo tem os mesmos números desta página.',
    cvButton: 'Ver o currículo',
    directLabel: 'Ou vá direto',
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
    errorBody: 'Alguma coisa quebrou no caminho. Me escreva direto em mateuscardosogs@gmail.com.',
    required: 'Obrigatório.',
    invalidEmail: 'Confira o e-mail.',
  },

  footer: {
    cvLink: 'cv',
  },

  notFound: {
    title: 'Esta página não existe',
    body: 'O link está quebrado ou a página foi aposentada na reconstrução de 2026.',
    cta: 'Ir pra home',
  },

  cv: {
    title: 'Mateus Cardoso — Currículo',
    description:
      'Currículo em uma coluna, ATS-safe, de Mateus Cardoso, desenvolvedor full-stack sênior.',
    role: 'Desenvolvedor full-stack sênior',
    location: 'Recife, PE · remoto (BR / EU / US)',
    summaryLabel: 'Resumo',
    summary:
      'Desenvolvedor full-stack sênior. Escrever código deixou de ser o diferencial; o que faz diferença é entender o negócio por trás. Olho o projeto dos dois lados — a regra de negócio, o usuário, como o cliente lê o resultado — e construo com um fluxo otimizado, com processo, estrutura e IA como parte dele. Também toco produtos próprios, e a infraestrutura por trás deles.',
    experienceLabel: 'Experiência',
    jobs: [
      {
        role: 'Engenheiro de software',
        org: 'Tracking Trade',
        period: 'mar 2020 — hoje',
        bullets: [
          'Desenhei e opero a coleta de 40 mil+ ofertas por hora em 100+ marketplaces com 150+ pods no Kubernetes, com evasão anti-bot e um screenshot guardado como evidência por coleta.',
          'Modelei a roteirização de 70+ rotas de campo como VRPTW no Google OR-Tools, com penalidades, prioridade de visita por coordenada e limites reais de capacidade — 30% de redução no custo real de deslocamento.',
          'Construí o pipeline de suporte com IA que lê contexto e documentação antes de um ticket chegar numa pessoa, cortando 73% dos chamados.',
          'Consolidei serviços num monorepo e padronizei como projetos novos começam, automatizando partes da operação que dependiam de alguém estar disponível.',
          'Entrei nas calls de venda como a pessoa que explica o produto em termos não técnicos, o que ajudou a destravar grandes contratos com marcas líderes de eletrônicos e varejo.',
        ],
      },
      {
        role: 'Produtos próprios · Apex',
        org: 'Em paralelo',
        period: 'em paralelo',
        bullets: [
          'Produto de treino multiesporte com coaching por IA, tocado de ponta a ponta: produto, back-end, front-end em Vite, orquestração de IA com otimização de contexto, infraestrutura e go-to-market.',
          'Marketing tratado como parte do produto: conteúdo de blog automatizado com fontes reais, saída pras redes e estrutura de SEO feita pra ranquear.',
          'Serviços gerenciados escolhidos pra uma pessoa conseguir carregar: Fly.io e Vercel pra hospedagem, workers na AWS, Trigger.dev pra jobs em background, Supabase pra auth e Postgres, Stripe pra pagamento.',
          '~200 pessoas na lista de espera sem nenhum gasto de marketing.',
        ],
      },
      {
        role: 'Full stack',
        org: 'Tracking Trade',
        period: 'jul 2018 — fev 2020',
        bullets: [
          'Fui efetivado de estagiário para full-stack em pouco tempo.',
          'Participei da maior parte da frente de produto: a migração de AngularJS pra React e de Ionic pra React Native, além de produtos novos e features de mercado.',
        ],
      },
      {
        role: 'Estagiário',
        org: 'Tracking Trade',
        period: 'abr — jun 2018',
      },
    ],
    skillsLabel: 'Competências',
    skills: [
      { label: 'Produto e web', value: 'Next.js, React, React Native, Expo, Vite, tRPC, Drizzle' },
      {
        label: 'Back-end e dados',
        value: 'Ruby on Rails, NestJS, Hono, Python, PostgreSQL, Supabase, Trigger.dev',
      },
      {
        label: 'Infraestrutura',
        value:
          'Kubernetes, Fly.io, Vercel, AWS, Google Cloud, Stripe, self-hosted: Proxmox, TrueNAS, UniFi',
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
