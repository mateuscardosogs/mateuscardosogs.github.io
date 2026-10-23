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
    title: 'Mateus Cardoso — Engenheiro de IA e engenheiro de software',
    description:
      'Engenheiro de IA e engenheiro de software. Construo automações e integrações com IA que se sustentam em produção: extração por visão em 100+ marketplaces, um pipeline de suporte com IA que cortou 73% dos chamados e coaching por IA num produto próprio.',
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
    eyebrow: 'Engenheiro de IA · Engenheiro de software',
    availability: 'Aberto a vagas de engenharia de IA · remoto',
    titleBefore: 'Construo automações e integrações com IA que ',
    titleHighlight: 'se sustentam em produção',
    titleAfter: '.',
    lead: 'Conecto LLMs aos sistemas que o negócio já usa — agentes, extração por visão, saída estruturada, jobs em background — e trato cada chamada de modelo como o resto do código: tipada, validada, com custo medido e revisada.',
    ctaPrimary: 'Falar comigo',
    ctaSecondary: 'Ver os cases',
    stack: [
      'TypeScript',
      'Python',
      'Vercel AI SDK',
      'Claude',
      'OpenAI',
      'Gemini',
      'LiteLLM',
      'Trigger.dev',
      'NestJS',
      'PostgreSQL',
    ],
  },

  proof: {
    label: '01 / Prova rápida',
    items: [
      { value: '−73%', label: 'de chamados de suporte depois do pipeline de IA que construí' },
      {
        value: '158',
        label: 'configs de extração por visão, uma por marketplace, rascunhadas por agentes Claude e checadas por um harness de teste',
      },
      { value: '40 mil+', label: 'ofertas monitoradas por hora em 100+ marketplaces' },
      { value: '−30%', label: 'de custo de deslocamento em 70+ rotas de campo depois da roteirização' },
      { value: '2.000+', label: 'usuários pagantes num produto que ajudei a construir' },
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
        id: 'vision',
        index: 'Case 01 · Extração com IA',
        result: '158 configs de marketplace',
        title: 'Lendo preços direto do screenshot com modelos de visão, em 100+ marketplaces',
        context:
          'O produto de monitoramento de preços já guarda um screenshot de cada oferta como evidência. Tirar título, preço, parcelamento e vendedor do HTML de cada marketplace exigia um conjunto de seletores por site, atualizado na mão toda vez que um layout mudava.',
        role: 'Criei o bot de extração por visão e a auditoria com IA, e construí o pipeline que combina OCR com LLM.',
        decision:
          'Um bot de navegador captura a página do produto e o Gemini Vision devolve título, preços, parcelamento e vendedor em JSON, guiado por uma config de prompt por marketplace. Em vez de escrever essas configs na mão, um agente Claude por marketplace leu dois screenshots e rascunhou a config, e um harness de teste checou cada uma contra o Gemini. Um segundo pipeline roda PaddleOCR primeiro e usa um LLM via LiteLLM pra estruturar o texto, caindo pra outro modelo quando a validação falha. Uma auditoria relê preços e vendedores a partir dos screenshots e grava as correções de volta no banco.',
        tradeoff:
          'Cada leitura agora custa tokens e depende de um provedor de modelo, onde um seletor CSS não custava nada. Assumi isso porque regenerar uma config quando o layout muda é barato, e mantive a conta visível: modelos da linha flash primeiro, fallback só quando a validação falha, e tokens e custo registrados em toda chamada.',
        outcome:
          '158 configs de marketplace rascunhadas por agentes e validadas por harness, dado de preço estruturado lido do mesmo screenshot que serve de prova, e um loop de auditoria que corrige o banco no lugar de uma pessoa.',
        tags: ['Gemini Vision', 'LiteLLM', 'Agentes Claude', 'Saída estruturada'],
        flow: [
          { label: 'screenshot' },
          { label: 'LLM de visão' },
          { label: 'checagem de schema', sub: 'modelo de fallback' },
          { label: 'preço auditado', accent: true },
        ],
      },
      {
        id: 'apex',
        index: 'Case 02 · Apex · Produto próprio',
        result: '200 na lista de espera',
        title: 'Coaching por IA que propõe o plano de treino e só aplica depois que o atleta confirma',
        context:
          'Apps de treino são fragmentados por esporte. O Apex planeja corrida, musculação, bike e natação num lugar só, com IA que monta blocos de treino periodizados e adapta quando a vida atrapalha. Eu treino, então sou o usuário — o que elimina quase toda a rampa de entender o domínio.',
        role: 'Tudo: produto, back-end, front-end, a camada de IA, infraestrutura e go-to-market.',
        decision:
          'A IA nunca escreve direto no plano do atleta. Gerar um bloco, remarcar um treino perdido ou adaptar uma sessão volta como proposta, validada contra um schema Zod com um loop de correção, e só é aplicada depois que o usuário confirma. Guardrails de marca, saúde e nutrição são checados no código, não só no prompt. Por trás, o provedor é plugável — Anthropic ou OpenAI via Vercel AI SDK —, os prompts usam cache, cada geração tem custo medido e rastreado no PostHog, o uso tem limite por plano, e 18+ jobs em background rodam no Trigger.dev. A mesma camada rascunha posts de blog e textos de Instagram, que uma pessoa publica.',
        tradeoff:
          'Pedir confirmação adiciona um passo pro usuário, e uma camada de validação é mais código que um prompt solto. Escolhi assim porque plano de treino mexe com saúde: uma sugestão errada que se aplica sozinha custa mais confiança do que um toque a mais.',
        outcome:
          '~200 pessoas na lista de interesse sem nenhum gasto de marketing, e uma camada de IA em que toda geração é validada, tem custo medido e é rastreada desde o primeiro dia.',
        tags: ['Vercel AI SDK', 'Saída estruturada', 'Trigger.dev', 'Guardrails'],
        flow: [
          { label: 'contexto do atleta' },
          { label: 'modelo' },
          { label: 'schema + guardrails' },
          { label: 'atleta confirma', accent: true },
        ],
      },
      {
        id: 'scraping',
        index: 'Case 03 · Monitoramento de preços',
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
          '40 mil+ ofertas monitoradas em 100+ marketplaces, completas dentro da janela horária, com prova visual por oferta — os mesmos screenshots que a extração com IA do case 01 lê.',
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
        index: 'Case 04 · Roteirização de campo',
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
    ],
  },

  method: {
    index: '03',
    eyebrow: 'Método',
    title: 'Como coloco IA em produção',
    lead: 'Chamar o modelo é a parte fácil. O que torna o resultado usável é tudo ao redor — e cada princípio abaixo aponta pra algo que eu construí de verdade.',
    loopLabel: 'Um passo de IA, em produção',
    loop: [
      { label: 'contexto' },
      { label: 'modelo' },
      { label: 'checagem de schema', sub: 'retry · fallback' },
      { label: 'o código decide', sub: 'o modelo só propõe', accent: true },
    ],
    principles: [
      {
        marker: '01',
        title: 'O modelo propõe, o código decide',
        body: 'A saída de um LLM é sugestão até algo determinístico aceitar: um schema, uma regra de negócio, um guardrail no código ou a confirmação do usuário. Nada que o modelo diz grava direto em dado de produção.',
        evidence: 'Apex: toda mudança no plano é uma proposta, aplicada só depois que o atleta confirma —',
        evidenceLink: { text: 'ver o case 02', caseId: 'apex' },
      },
      {
        marker: '02',
        title: 'Saída estruturada, com caminho de volta',
        body: 'Toda chamada devolve dado tipado — Zod no TypeScript, Pydantic no Python — e falha é esperada, não exceção: um retry de correção, depois um modelo de fallback, depois um erro claro em vez de um chute silencioso.',
        evidence: 'PaddleOCR → LLM via LiteLLM → validação → modelo de fallback —',
        evidenceLink: { text: 'ver o case 01', caseId: 'vision' },
      },
      {
        marker: '03',
        title: 'Custo é restrição de projeto',
        body: 'Token é uma linha na conta de alguém. Escolho o modelo mais barato que passa na validação, uso cache de prompt, registro custo por chamada e limito uso por plano, pra o gasto ser conhecido antes de crescer.',
        evidence: 'Prompt caching da Anthropic · custo por geração no PostHog · cota de IA por plano · custo por chamada no LiteLLM',
      },
      {
        marker: '04',
        title: 'Agentes no fluxo, o review continua meu',
        body: 'Uso agentes pro trabalho que é largo e repetitivo — agentes Claude rascunharam 158 configs de marketplace que um harness depois checou. O contexto vem primeiro, o trabalho é quebrado em unidades verificáveis e a documentação é o ponto de verdade. O check final é meu.',
        evidence:
          'Pipeline de suporte que cortou 73% dos chamados: dúvida do usuário → IA lê o contexto → consulta a documentação → resolve, ou abre um ticket já resumido pra mim.',
      },
    ],
  },

  about: {
    index: '04',
    eyebrow: 'Sobre',
    title: 'Contexto, não biografia',
    paragraphs: [
      'Sou engenheiro de IA e engenheiro de software. Entrei na empresa onde estou hoje como estagiário e passei por todos os níveis que ela tem, o que hoje significa estar envolvido além do desenvolvimento: estruturação de produto, planejamento, priorização e conversa com clientes e usuários finais — em certo momento, entrando nas calls de venda como quem explica o produto pra diretoria.',
      'A maior parte do meu trabalho hoje é colocar IA pra trabalhar dentro da operação real: automações pra tarefas que dependiam de alguém estar disponível, integrações com os serviços que o negócio já usa, e pipelines que leem, extraem e decidem com um modelo no meio e o código dando a palavra final.',
      'Em paralelo construo produtos próprios, sempre em áreas que eu conheço por dentro. Esporte é o exemplo mais claro: eu treino, estudo o assunto, e o Apex saiu de usar o que entendo como praticante pra construir um coaching por IA útil pras outras pessoas.',
      'Sou autodidata desde criança: quadricópteros quando não existia nada pronto pra comprar, depois redes, depois servidores. Ainda mantenho meu próprio setup self-hosted — Proxmox, TrueNAS, UniFi, 10GbE — porque operar infraestrutura mantém minhas decisões de arquitetura ancoradas no que de fato precisa ser mantido.',
    ],
  },

  experience: {
    index: '05',
    eyebrow: 'Experiência',
    title: 'Onde o trabalho aconteceu',
    entries: [
      {
        period: 'mar 2020 — hoje',
        role: 'Engenheiro de IA e de software',
        org: 'Tracking Trade',
        current: true,
        body: 'Trabalho em vários produtos ao mesmo tempo. Do lado de IA, construí o bot de visão que lê preços a partir de screenshots, o pipeline de OCR + LLM com fallback de modelo, uma auditoria com IA que corrige o banco e o pipeline de suporte que lê contexto e documentação antes de um ticket chegar numa pessoa. Do lado de engenharia: a coleta de preços no Kubernetes, o solver de roteirização de campo, um monorepo pros serviços e a automação das partes da operação que dependiam de alguém estar disponível.',
      },
      {
        period: 'em paralelo',
        role: 'Produtos próprios',
        org: 'Apex',
        current: true,
        body: 'Um produto de treino multiesporte com coaching por IA, construído num domínio que eu pratico. A camada de IA roda no Vercel AI SDK com Anthropic ou OpenAI por trás: saída estruturada validada com Zod, cache de prompt, custo rastreado por geração e cota por plano, além de 18+ jobs em background no Trigger.dev. Ao redor: Supabase pra auth e Postgres, Stripe pra assinatura, Payload CMS, a Instagram Graph API e PostHog.',
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
        label: 'Engenharia de IA',
        value:
          'Vercel AI SDK · Claude · OpenAI · Gemini · LiteLLM · saída estruturada (Zod, Pydantic) · extração por visão e OCR · prompt caching · evals · Claude Code',
      },
      {
        label: 'Automação e integrações',
        value: 'Trigger.dev · Stripe · Supabase · Instagram Graph API · Google APIs · PostHog · Selenium · Playwright',
      },
      {
        label: 'Back-end e dados',
        value: 'TypeScript · Python · NestJS · Hono · Ruby on Rails · PostgreSQL · Redis',
      },
      {
        label: 'Produto e web',
        value: 'Next.js · React · React Native · Expo · Vite · tRPC · Drizzle',
      },
      {
        label: 'Infraestrutura',
        value:
          'Kubernetes · Fly.io · Vercel · AWS · Google Cloud · Railway · self-hosted: Proxmox, TrueNAS, UniFi',
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
    lead: 'Se você está contratando engenheiro de IA ou de software, o currículo tem os mesmos números desta página. Se você tem um processo que deveria rodar sozinho, me conte qual é.',
    cvButton: 'Ver o currículo',
    directLabel: 'Ou vá direto',
    formName: 'Nome',
    formNamePlaceholder: 'Como te chamo?',
    formEmail: 'E-mail',
    formEmailPlaceholder: 'voce@empresa.com',
    formMessage: 'Contexto',
    formMessagePlaceholder: 'O que você quer automatizar ou construir?',
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
      'Currículo em uma coluna, ATS-safe, de Mateus Cardoso, engenheiro de IA e engenheiro de software.',
    role: 'Engenheiro de IA · Engenheiro de software',
    location: 'Recife, PE · remoto (BR / EU / US)',
    summaryLabel: 'Resumo',
    summary:
      'Engenheiro de IA e engenheiro de software, com 8+ anos construindo software em produção. Coloco LLMs pra trabalhar dentro de produtos e operações reais — extração por visão, agentes, saída estruturada, jobs de IA em background e integrações — e trato cada chamada de modelo como o resto do código: tipada, validada, com custo medido e revisada. Também toco produtos próprios, e a infraestrutura por trás deles.',
    experienceLabel: 'Experiência',
    jobs: [
      {
        role: 'Engenheiro de IA e de software',
        org: 'Tracking Trade',
        period: 'mar 2020 — hoje',
        bullets: [
          'Construí o pipeline de suporte com IA que lê contexto e documentação antes de um ticket chegar numa pessoa, cortando 73% dos chamados.',
          'Criei um bot de extração por visão que lê título, preços, parcelamento e vendedor de screenshots de página de produto com Gemini Vision, em JSON; as 158 configs de prompt por marketplace foram rascunhadas por agentes Claude e validadas por um harness de teste.',
          'Construí um pipeline de extração OCR + LLM (PaddleOCR, LiteLLM) com validação de schema, fallback de modelo e registro de tokens e custo por chamada, além de uma auditoria com IA que reconfere preços e vendedores a partir dos screenshots e grava as correções no banco.',
          'Desenhei e opero a coleta de 40 mil+ ofertas por hora em 100+ marketplaces com 150+ pods no Kubernetes, com evasão anti-bot e um screenshot guardado como evidência por coleta.',
          'Modelei a roteirização de 70+ rotas de campo como VRPTW no Google OR-Tools, com penalidades, prioridade de visita por coordenada e limites reais de capacidade — 30% de redução no custo real de deslocamento.',
          'Consolidei serviços num monorepo e padronizei como projetos novos começam, automatizando partes da operação que dependiam de alguém estar disponível.',
          'Entrei nas calls de venda como a pessoa que explica o produto em termos não técnicos, o que ajudou a destravar grandes contratos com marcas líderes de eletrônicos e varejo.',
        ],
      },
      {
        role: 'Produtos próprios · Apex',
        org: 'Em paralelo',
        period: 'em paralelo',
        bullets: [
          'Produto de treino multiesporte com coaching por IA, tocado de ponta a ponta: produto, back-end, front-end, camada de IA, infraestrutura e go-to-market.',
          'Camada de IA no Vercel AI SDK com provedores Anthropic e OpenAI plugáveis: saída estruturada validada com Zod e loop de correção, guardrails checados no código, e mudanças no plano aplicadas só depois que o usuário confirma.',
          'Prompt caching, custo por geração rastreado no PostHog e cota de IA por plano; 18+ jobs em background no Trigger.dev, incluindo rascunhos de blog e Instagram gerados por IA que uma pessoa publica.',
          'Integrações: Supabase pra auth e Postgres, Stripe pra assinaturas e webhooks, Payload CMS, Instagram Graph API; hospedagem na Fly.io e na Vercel com workers na AWS.',
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
      {
        label: 'Engenharia de IA',
        value:
          'Vercel AI SDK, Anthropic Claude, OpenAI, Gemini, LiteLLM, saída estruturada (Zod, Pydantic), extração por visão e OCR, prompt caching, evals, Claude Code',
      },
      {
        label: 'Automação e integrações',
        value: 'Trigger.dev, Stripe, Supabase, Instagram Graph API, Google APIs, PostHog, Selenium, Playwright',
      },
      {
        label: 'Back-end e dados',
        value: 'TypeScript, Python, NestJS, Hono, Ruby on Rails, PostgreSQL, Redis',
      },
      { label: 'Produto e web', value: 'Next.js, React, React Native, Expo, Vite, tRPC, Drizzle' },
      {
        label: 'Infraestrutura',
        value:
          'Kubernetes, Fly.io, Vercel, AWS, Google Cloud, Railway, self-hosted: Proxmox, TrueNAS, UniFi',
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
