export const sdLessons = [
  {
    id: 'sd-1-client-server',
    title: 'Cliente-Servidor: Como o TikTok te entrega vídeos',
    week: 9,
    xp: 70,
    difficulty: 'Intermediate',
    priority: '⭐',
    hook: 'Quando você abre o TikTok, seu celular (cliente) pede vídeos pro servidor da ByteDance. Esse vai-e-volta é client-server — entender isso é entender como TODO app funciona.',

    assess: {
      type: 'multipleChoice',
      question: 'No modelo cliente-servidor, qual o papel do seu celular quando você abre o Instagram?',
      options: [
        { text: 'Ele guarda todas as fotos do Insta pra sempre', feedback: 'Não é isso — as fotos ficam guardadas nos servidores do Instagram, não no seu celular.' },
        { text: 'Ele manda pedidos e mostra as respostas que vêm do servidor', feedback: 'Isso! Seu celular é o cliente: pede coisas e mostra o que o servidor devolve.', correct: true },
        { text: 'Ele compila o código do servidor antes de mostrar', feedback: 'Celulares não compilam código de servidor — eles só recebem o resultado pronto.' },
        { text: 'Ele vira servidor pros seus amigos', feedback: 'Celulares normais são clientes, não servidores (isso seria peer-to-peer, outra coisa).' }
      ]
    },

    learn: {
      hook: 'Quando você curte um vídeo do TikTok, seu celular manda um pedido pro servidor da ByteDance. Quando o Insta carrega seu feed, mesma coisa. Entender esse ciclo de pedido-resposta é o primeiro passo pra sacar como apps gigantes funcionam.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/9/',
        title: 'CS50 Week 9: Flask & HTTP',
        duration: '2h',
        yourTakeaway: 'Foca nos primeiros 30 minutos sobre o ciclo pedido-resposta — como uma URL vira resposta do servidor.'
      },
      conceptText: `O modelo cliente-servidor é a base de QUALQUER app que você usa. Um **cliente** é qualquer coisa que faz pedidos — seu celular abrindo o TikTok, o navegador no PC, o app do Discord. Um **servidor** é um programa esperando esses pedidos pra processar e devolver resposta.

O **ciclo de pedido-resposta** sempre funciona igual: o cliente abre uma conexão, manda um pedido (com método tipo GET ou POST, cabeçalhos, e às vezes um conteúdo), o servidor processa e devolve uma resposta com código de status, cabeçalhos e conteúdo. Depois a conexão fecha (no HTTP/1.1) ou fica aberta pra reusar (HTTP/2).

Um conceito MUITO importante é **stateless vs stateful**. HTTP é stateless por design — cada pedido é independente e o servidor não lembra nada de pedidos anteriores. É por isso que você precisa de tokens ou cookies pra manter "logado". Conexões stateful (tipo WebSocket no Discord pra mensagens em tempo real) ficam abertas, são mais poderosas mas mais difíceis de escalar.

**CDN (Content Delivery Network)** fica entre você e o servidor original. Ela guarda cópias de arquivos estáticos (fotos, vídeos curtos, código JS) em servidores espalhados pelo mundo. Quando alguém no Japão pede um vídeo do TikTok, ele vem de um servidor no Japão em vez de vir dos EUA — 300ms viram 10ms. Sem CDN, o TikTok não conseguiria entregar vídeo rápido pra 1 bilhão de pessoas.

O roteamento no servidor mapeia caminhos pra funções específicas. Quando \`/api/videos\` chega, o roteador procura qual função cuida desse caminho e chama ela — exatamente o que você vai implementar nos exercícios abaixo.`,
      realWorldExample: 'Quando você abre o TikTok de manhã, seu celular faz vários pedidos: um pra pegar seu feed, outro pra carregar seu perfil, outro pra ver notificações. Cada um é um ciclo cliente-servidor completo. Se o servidor do TikTok devolve 429 (rate limit), o app espera um pouco e tenta de novo — sem você nem perceber. Entender esse ciclo é entender como bilhões de pedidos por segundo são processados todo dia.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Prática 1: Códigos de Status',
        question: 'Seu app pede um vídeo do TikTok e recebe código 503. O que o app deveria fazer?',
        options: [
          { text: 'Deslogar o usuário — a sessão expirou', feedback: 'O 503 é "Serviço Indisponível" — é problema do servidor, não de autenticação (esse seria 401).' },
          { text: 'Tentar de novo depois de um tempo — o servidor tá temporariamente fora', feedback: 'Isso! 503 quer dizer que o servidor tá sobrecarregado ou em manutenção — tentar de novo com um delay.', correct: true },
          { text: 'Parar de tentar pra sempre — o endpoint não existe mais', feedback: 'Isso seria 404 (Não Encontrado) ou 410 (Removido). 503 é temporário.' },
          { text: 'Redirecionar pra HTTPS — o pedido foi feito em HTTP', feedback: 'Redirecionamentos vêm como 301/302. 503 não tem nada a ver com protocolo.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Prática 2: Ordene o Ciclo Pedido-Resposta',
        description: 'Arraste essas etapas na ordem correta pro app do TikTok carregar um vídeo.',
        items: [
          'Servidor procura o vídeo no banco de dados',
          'App manda GET /api/videos/42',
          'App mostra o vídeo na tela',
          'Servidor devolve 200 OK com os dados em JSON',
          'App abre conexão TCP com o servidor'
        ],
        correctOrder: [4, 1, 0, 3, 2],
        feedback: 'O ciclo sempre começa com a conexão, depois o pedido, depois o servidor processa, depois a resposta, e finalmente o cliente mostra.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Prática 3: Lendo um Roteador',
        instructions: 'Olha esse roteador estilo Express. O que ele retorna pra um pedido GET em /api/videos?',
        code: `const routes = [
  { path: '/api/videos', method: 'GET', handler: 'getVideos' },
  { path: '/api/users', method: 'GET', handler: 'getUsers' },
  { path: '/api/videos', method: 'POST', handler: 'createVideo' }
];

function routeRequest(path, method, routes) {
  const match = routes.find(r => r.path === path && r.method === method);
  return match ? match.handler : '404';
}

console.log(routeRequest('/api/videos', 'GET', routes));`,
        question: 'O que aparece no console?',
        options: [
          { text: '"getUsers"', feedback: 'Esse handler é pra /api/users, não /api/videos.' },
          { text: '"getVideos"', feedback: 'Isso! O roteador acha a combinação certa de path + método e retorna o nome do handler.', correct: true },
          { text: '"404"', feedback: '/api/videos com GET existe sim no array de rotas.' },
          { text: '"createVideo"', feedback: 'createVideo cuida de POST em /api/videos, não GET.' }
        ],
        feedback: 'Roteamento sempre checa path E método — o mesmo path pode ter handlers diferentes pra GET vs POST.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'Despachador de Pedidos',
        instructions: [
          'Escreva routeRequest(path, routes) que acha a rota cujo path bate com o pedido',
          'Retorne a string do handler da rota encontrada',
          'Retorne "404" se nenhuma rota bater'
        ],
        sampleCode: `function routeRequest(path, routes) {
  // TODO: ache a rota cujo .path bate com o path dado
  // retorne o .handler dela, ou "404" se não achar
}`,
        solution: `function routeRequest(path, routes) {
  const route = routes.find(r => r.path === path);
  return route ? route.handler : '404';
}`,
        tests: [
          { input: 'routeRequest("/api/posts",[{path:"/api/posts",handler:"getPosts"},{path:"/api/users",handler:"getUsers"}])', expected: 'getPosts', desc: 'acha rota /api/posts' },
          { input: 'routeRequest("/api/users",[{path:"/api/posts",handler:"getPosts"},{path:"/api/users",handler:"getUsers"}])', expected: 'getUsers', desc: 'acha rota /api/users' },
          { input: 'routeRequest("/api/unknown",[{path:"/api/posts",handler:"getPosts"}])', expected: '404', desc: 'retorna 404 pra path desconhecido' }
        ],
        hints: [
          'Array.find() retorna o primeiro elemento que passa no teste, ou undefined',
          'Use r.path === path pra comparar paths',
          'Use ternário: route ? route.handler : "404"'
        ]
      },
      {
        level: 2,
        title: 'Parsear Cabeçalhos HTTP',
        instructions: [
          'Escreva parseHeaders(headerStr) que parseia uma string crua de cabeçalhos HTTP',
          'Cada cabeçalho tá numa linha no formato "Chave: Valor"',
          'Retorne um objeto com chaves e valores'
        ],
        sampleCode: `function parseHeaders(headerStr) {
  // TODO: divida por \\n, depois divida cada linha por ": "
  // retorne um objeto { nomeDoHeader: valor, ... }
}`,
        solution: `function parseHeaders(headerStr) {
  const result = {};
  const lines = headerStr.split('\\n');
  for (const line of lines) {
    if (line.trim() === '') continue;
    const colonIndex = line.indexOf(': ');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex);
      const value = line.slice(colonIndex + 2);
      result[key] = value;
    }
  }
  return result;
}`,
        tests: [
          { input: 'JSON.stringify(parseHeaders("Content-Type: application/json\\nAccept: */*"))', expected: '{"Content-Type":"application/json","Accept":"*/*"}', desc: 'parseia dois headers' },
          { input: 'parseHeaders("Authorization: Bearer abc123")["Authorization"]', expected: 'Bearer abc123', desc: 'parseia header de Authorization' },
          { input: 'Object.keys(parseHeaders("X-Custom: value\\nContent-Length: 42")).length', expected: 2, desc: 'retorna número correto de chaves' }
        ],
        hints: [
          'Use headerStr.split("\\n") pra pegar linhas individuais',
          'Use line.indexOf(": ") pra achar a posição do dois-pontos com segurança (valores podem ter dois-pontos)',
          'slice(0, colonIndex) pra chave, slice(colonIndex + 2) pra valor'
        ]
      },
      {
        level: 3,
        title: 'Construir Resposta HTTP',
        instructions: [
          'Escreva buildResponse(status, body) que constrói um objeto de resposta HTTP padrão',
          'Sempre inclua Content-Type: application/json nos headers',
          'Retorne um objeto com propriedades status, body e headers'
        ],
        sampleCode: `function buildResponse(status, body) {
  // TODO: retorne { status, body, headers: { "Content-Type": "application/json" } }
}`,
        solution: `function buildResponse(status, body) {
  return {
    status,
    body,
    headers: { 'Content-Type': 'application/json' }
  };
}`,
        tests: [
          { input: 'JSON.stringify(buildResponse(200,{data:[]}))', expected: '{"status":200,"body":{"data":[]},"headers":{"Content-Type":"application/json"}}', desc: 'constrói resposta 200 com body' },
          { input: 'buildResponse(404,{error:"Not Found"}).status', expected: 404, desc: 'seta status code certo' },
          { input: 'buildResponse(200,{}).headers["Content-Type"]', expected: 'application/json', desc: 'sempre seta header Content-Type' }
        ],
        hints: [
          'Atalho do JavaScript: { status, body } é igual a { status: status, body: body }',
          'O objeto headers tem exatamente uma chave nesse exercício',
          'Retorne um literal de objeto com as três propriedades'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Final Cliente-Servidor: Construa um Mini Roteador',
      steps: [
        {
          type: 'coding',
          title: 'Construir um Matcher de Rota Completo',
          instructions: 'Escreva routeRequest(path, routes) que retorna a string do handler da rota correspondente, ou "404" se nenhuma bater.',
          sampleCode: `function routeRequest(path, routes) {
  // TODO
}`,
          solution: `function routeRequest(path, routes) {
  const route = routes.find(r => r.path === path);
  return route ? route.handler : '404';
}`,
          tests: [
            { input: 'routeRequest("/api/posts",[{path:"/api/posts",handler:"getPosts"},{path:"/api/users",handler:"getUsers"}])', expected: 'getPosts', desc: 'retorna handler pra path correspondente' },
            { input: 'routeRequest("/missing",[{path:"/api/posts",handler:"getPosts"}])', expected: '404', desc: 'retorna 404 pra path desconhecido' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'HTTP é descrito como "stateless". O que isso significa pra montar um sistema de login no Insta?',
          options: [
            { text: 'Você não consegue fazer login com HTTP', feedback: 'Consegue sim — stateless só quer dizer que você precisa de um jeito de levar a identidade junto em cada pedido.' },
            { text: 'O servidor esquece quem você é entre pedidos, então você precisa mandar um token ou cookie em cada pedido', feedback: 'Exatamente! Stateless quer dizer que todo pedido precisa carregar sua identidade — é isso que JWT e cookies de sessão fazem.', correct: true },
            { text: 'O cliente tem que guardar todos os dados do app localmente', feedback: 'Stateless é sobre memória do servidor entre pedidos, não sobre onde os dados ficam guardados.' },
            { text: 'Pedidos são processados em ordem aleatória', feedback: 'Stateless quer dizer sem memória entre pedidos, não ordem aleatória.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Explica como o TikTok deveria lidar com um servidor que tá devolvendo erros 503 de vez em quando. Que estratégia de retry você projetaria?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre como apps gigantes funcionam por trás. Use TikTok, Instagram, Discord, Roblox, Netflix, Spotify como exemplos. Explique sistemas complexos com analogias que eles entendem. Sem jargão desnecessário.'
    },
    resources: [
      { title: 'MDN: Visão Geral de HTTP', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview' },
      { title: 'CS50 Week 9 Notas', url: 'https://cs50.harvard.edu/x/2024/notes/9/' },
      { title: 'Como CDNs Funcionam — Cloudflare', url: 'https://www.cloudflare.com/learning/cdn/what-is-a-cdn/' }
    ]
  },

  // ─── LESSON 2 ────────────────────────────────────────────────────────────────
  {
    id: 'sd-2-rest-api-design',
    title: 'APIs REST: A linguagem secreta dos apps',
    week: 9,
    xp: 80,
    difficulty: 'Intermediate',
    priority: '⭐⭐',
    hook: 'Toda vez que você curte um TikTok, manda mensagem no Discord, abre uma foto do Insta — uma API REST tá sendo chamada. Aprende isso e você entende como apps conversam.',

    assess: {
      type: 'multipleChoice',
      question: 'Qual método HTTP deve ser usado pra atualizar um vídeo do TikTok numa API REST?',
      options: [
        { text: 'GET /videos/42/update', feedback: 'GET nunca deve modificar dados — é só pra ler.' },
        { text: 'POST /updateVideo', feedback: 'Isso quebra as regras do REST — o verbo vai no método HTTP, não na URL.' },
        { text: 'PUT /videos/42', feedback: 'Isso! PUT substitui o recurso inteiro identificado pela URI. (PATCH atualizaria só parte.)', correct: true },
        { text: 'DELETE /videos/42', feedback: 'DELETE apaga o recurso — não é pra atualizar.' }
      ]
    },

    learn: {
      hook: 'A API do TikTok é usada por milhões de apps e integrações. Se ela não seguisse regras claras (REST), seria um caos. APIs bem desenhadas escalam — mal desenhadas matam projetos.',
      conceptVideo: {
        url: 'https://www.youtube.com/watch?v=SLwpqD8n3d0',
        title: 'Melhores Práticas de Design de API REST — freeCodeCamp',
        duration: '30min',
        yourTakeaway: 'Presta atenção em nomes de recursos (substantivos, não verbos) e no mapeamento de CRUD pros métodos HTTP.'
      },
      conceptText: `REST (Representational State Transfer) é um estilo arquitetural, não um protocolo. Uma API RESTful segue seis regras: comunicação stateless, interface uniforme, separação cliente-servidor, cacheabilidade, sistema em camadas, e código sob demanda opcional. Na prática, "REST" geralmente quer dizer: use métodos HTTP semanticamente, nomeie recursos com substantivos, retorne códigos de status apropriados.

**Mapeamento de CRUD pra verbos HTTP:**
- Criar → POST /recursos
- Ler (lista) → GET /recursos
- Ler (um) → GET /recursos/:id
- Atualizar (total) → PUT /recursos/:id
- Atualizar (parcial) → PATCH /recursos/:id
- Apagar → DELETE /recursos/:id

**Nomes de recursos** usam substantivos, minúsculos, plural: \`/videos\`, \`/users\`, \`/messages\`. Nunca \`/getVideo\` ou \`/deleteUser\` — o método já diz o que tá fazendo.

**Códigos de status** carregam significado. 2xx = sucesso (200 OK, 201 Criado, 204 Sem Conteúdo). 4xx = erro do cliente (400 Pedido Ruim, 401 Não Autorizado, 403 Proibido, 404 Não Encontrado, 422 Não Processável, 429 Muitos Pedidos). 5xx = erro do servidor (500 Erro Interno, 503 Serviço Indisponível).

**Versionamento de API** evita que mudanças quebrem integrações. O padrão mais comum é prefixo de versão: \`/v1/videos\`, \`/v2/videos\`. Isso deixa você lançar mudanças no v2 enquanto quem usa v1 continua funcionando. Apps gigantes tipo TikTok têm várias versões da API rodando ao mesmo tempo.`,
      realWorldExample: 'A API do TikTok expõe POST /v1/videos pra fazer upload, GET /v1/videos/:id pra pegar info de um vídeo, e PATCH /v1/videos/:id pra atualizar descrição. Quando o TikTok lança uma versão nova da API (v2), eles mantêm a v1 funcionando por meses pra integrações antigas não quebrarem. É assim que apps com 1 bilhão de usuários conseguem evoluir sem quebrar nada.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Prática 1: Rota REST Correta',
        question: 'O Insta precisa de um endpoint pra apagar uma foto específica. Qual a rota REST correta?',
        options: [
          { text: 'POST /photos/delete/42', feedback: 'Evita colocar ações na URL — use os métodos HTTP pra isso.' },
          { text: 'GET /photos/42/remove', feedback: 'GET nunca pode modificar nem apagar dados. Use DELETE.' },
          { text: 'DELETE /photos/42', feedback: 'Isso! DELETE é o método HTTP pra remoção, e /photos/42 identifica o recurso específico.', correct: true },
          { text: 'PUT /photos/42/status/deleted', feedback: 'Isso mistura semântica de update com path de status — não é REST idiomático.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Prática 2: Combine CRUD com Métodos HTTP',
        description: 'Arraste cada operação CRUD pro método HTTP certo.',
        items: [
          'DELETE — remove um recurso',
          'POST — cria um novo recurso',
          'GET — lê um recurso',
          'PATCH — atualiza parcialmente um recurso',
          'PUT — substitui totalmente um recurso'
        ],
        correctOrder: [2, 1, 4, 3, 0],
        feedback: 'REST mapeia operações CRUD pra métodos HTTP — a URL identifica o recurso e o método descreve a ação.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Prática 3: Trace o Construtor de Rota com Versão',
        instructions: 'O que versionRoute("/videos", "v2") retorna com essa função?',
        code: `function versionRoute(path, version) {
  const normalized = path.startsWith('/') ? path : '/' + path;
  return '/' + version + normalized;
}

console.log(versionRoute('/videos', 'v2'));`,
        question: 'O que aparece no console?',
        options: [
          { text: '"/videos/v2"', feedback: 'A versão vem primeiro, não no final.' },
          { text: '"/v2/videos"', feedback: 'Isso! A função coloca a versão antes do path existente, então /videos vira /v2/videos.', correct: true },
          { text: '"v2/videos"', feedback: 'Quase, mas a função adiciona uma barra antes da versão também.' },
          { text: '"/v2//videos"', feedback: 'A função verifica a barra inicial e normaliza, então não tem barra dupla.' }
        ],
        feedback: 'Versionamento prefixa todo o path — /v2/videos quer dizer "versão 2 do recurso videos".'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'Construir Rota REST',
        instructions: [
          'Escreva buildRestRoute(resource, action) que retorna {method, path}',
          'Ações: "list" → GET /resource, "create" → POST /resource, "get" → GET /resource/:id, "update" → PUT /resource/:id, "delete" → DELETE /resource/:id',
          'Retorne {method: "UNKNOWN", path: "/"} pra ações desconhecidas'
        ],
        sampleCode: `function buildRestRoute(resource, action) {
  // TODO: mapeie a ação pro método HTTP e path corretos
  // list   → { method: 'GET',    path: '/resource' }
  // create → { method: 'POST',   path: '/resource' }
  // update → { method: 'PUT',    path: '/resource/:id' }
  // delete → { method: 'DELETE', path: '/resource/:id' }
}`,
        solution: `function buildRestRoute(resource, action) {
  const base = '/' + resource;
  const withId = base + '/:id';
  const map = {
    list:   { method: 'GET',    path: base },
    create: { method: 'POST',   path: base },
    get:    { method: 'GET',    path: withId },
    update: { method: 'PUT',    path: withId },
    delete: { method: 'DELETE', path: withId }
  };
  return map[action] || { method: 'UNKNOWN', path: '/' };
}`,
        tests: [
          { input: 'JSON.stringify(buildRestRoute("posts","list"))', expected: '{"method":"GET","path":"/posts"}', desc: 'list → GET /posts' },
          { input: 'JSON.stringify(buildRestRoute("posts","create"))', expected: '{"method":"POST","path":"/posts"}', desc: 'create → POST /posts' },
          { input: 'JSON.stringify(buildRestRoute("posts","update"))', expected: '{"method":"PUT","path":"/posts/:id"}', desc: 'update → PUT /posts/:id' }
        ],
        hints: [
          'Monte o base path como "/" + resource',
          'Use um objeto como mapa de lookup: { list: {...}, create: {...} }',
          'Retorne map[action] ou um default pra ações desconhecidas'
        ]
      },
      {
        level: 2,
        title: 'Versionar uma Rota',
        instructions: [
          'Escreva versionRoute(path, version) que coloca a versão antes do path',
          'Garanta exatamente uma barra entre versão e path',
          'Exemplo: versionRoute("/videos", "v2") → "/v2/videos"'
        ],
        sampleCode: `function versionRoute(path, version) {
  // TODO: retorne /{version}{path}
  // garanta que path começa com /
}`,
        solution: `function versionRoute(path, version) {
  const normalized = path.startsWith('/') ? path : '/' + path;
  return '/' + version + normalized;
}`,
        tests: [
          { input: 'versionRoute("/posts","v2")', expected: '/v2/posts', desc: 'coloca versão antes do path' },
          { input: 'versionRoute("/users/42","v1")', expected: '/v1/users/42', desc: 'funciona com paths aninhados' },
          { input: 'versionRoute("platforms","v3")', expected: '/v3/platforms', desc: 'lida com path sem barra inicial' }
        ],
        hints: [
          'Verifica se path começa com "/" usando path.startsWith("/")',
          'Retorne "/" + version + normalizedPath',
          'Cuidado pra não criar barras duplas'
        ]
      },
      {
        level: 3,
        title: 'Validar Convenção REST',
        instructions: [
          'Escreva validateRestConvention(route) onde route é {path, method}',
          'Retorne {valid: true, issues: []} se a rota segue as convenções REST',
          'Sinaliza problemas: path tem um verbo (create/delete/get/update/fetch/remove), ou método não é GET/POST/PUT/PATCH/DELETE'
        ],
        sampleCode: `function validateRestConvention(route) {
  // TODO: verifica anti-padrões na rota
  // retorna { valid: bool, issues: string[] }
}`,
        solution: `function validateRestConvention(route) {
  const issues = [];
  const verbPattern = /\\b(create|delete|get|update|fetch|remove|add)\\b/i;
  if (verbPattern.test(route.path)) {
    issues.push('Path tem verbo — use substantivos e deixe o método HTTP expressar a ação');
  }
  const validMethods = ['GET','POST','PUT','PATCH','DELETE'];
  if (!validMethods.includes(route.method.toUpperCase())) {
    issues.push('Método HTTP inválido: ' + route.method);
  }
  return { valid: issues.length === 0, issues };
}`,
        tests: [
          { input: 'JSON.stringify(validateRestConvention({path:"/posts",method:"GET"}))', expected: '{"valid":true,"issues":[]}', desc: 'rota REST válida passa' },
          { input: 'validateRestConvention({path:"/getPosts",method:"GET"}).valid', expected: false, desc: 'path com verbo é inválido' },
          { input: 'validateRestConvention({path:"/posts",method:"FETCH"}).issues.length', expected: 1, desc: 'método inválido adiciona problema' }
        ],
        hints: [
          'Use regex pra testar verbos comuns no path: /\\b(create|delete|get|update|fetch|remove)\\b/i',
          'Verifique o método contra uma lista de permitidos usando .includes()',
          'Colete problemas num array e seta valid: issues.length === 0'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Final API REST: Construtor de Rotas + Conceitos',
      steps: [
        {
          type: 'coding',
          title: 'Construir Rota REST com Versão',
          instructions: 'Escreva versionRoute(path, version) que coloca o prefixo da versão antes do path, garantindo uma barra inicial.',
          sampleCode: `function versionRoute(path, version) {
  // TODO
}`,
          solution: `function versionRoute(path, version) {
  const normalized = path.startsWith('/') ? path : '/' + path;
  return '/' + version + normalized;
}`,
          tests: [
            { input: 'versionRoute("/posts","v2")', expected: '/v2/posts', desc: 'versionamento básico' },
            { input: 'versionRoute("/posts/:id","v1")', expected: '/v1/posts/:id', desc: 'funciona com paths parametrizados' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'O TikTok vai lançar uma mudança grande que quebra a API. A melhor forma de não quebrar todos os apps que usam a API é:',
          options: [
            { text: 'Atualizar todos os apps de uma vez num fim de semana', feedback: 'Coordenar atualizações simultâneas é arriscado e operacionalmente um pesadelo.' },
            { text: 'Lançar /v2/videos junto com /v1/videos e marcar v1 com data de descontinuação', feedback: 'Isso! Versionamento deixa novos apps usarem v2 enquanto v1 fica estável até todo mundo migrar.', correct: true },
            { text: 'Adicionar um parâmetro ?version=2 nos endpoints existentes', feedback: 'Versionamento por query param é frágil e mais difícil de rotear — versão no path é o padrão da indústria.' },
            { text: 'Fazer todos os parâmetros opcionais pra manter compatibilidade', feedback: 'Parâmetros opcionais ajudam mas não resolvem mudanças estruturais ou semânticas.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'O TikTok quer expor uma API pública pra desenvolvedores fazerem apps integrados. Que decisões de design REST você tomaria pra autenticação, rate limiting e versionamento?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre como apps gigantes funcionam por trás. Use TikTok, Instagram, Discord, Roblox, Netflix, Spotify como exemplos. Explique sistemas complexos com analogias que eles entendem. Sem jargão desnecessário.'
    },
    resources: [
      { title: 'Design de API RESTful — Boas Práticas (Stoplight)', url: 'https://stoplight.io/api-design-guide/basics' },
      { title: 'Referência de Códigos de Status HTTP', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status' },
      { title: 'Tutorial de API REST', url: 'https://restfulapi.net/' }
    ]
  },

  // ─── LESSON 3 ────────────────────────────────────────────────────────────────
  {
    id: 'sd-3-databases-vs-caches',
    title: 'Banco vs Cache: Por que o Spotify é tão rápido',
    week: 6,
    xp: 70,
    difficulty: 'Intermediate',
    priority: '⭐',
    hook: 'Por que o Spotify lembra das suas músicas favoritas instantaneamente? CACHE. A diferença entre uma resposta de 50ms e uma de 5ms quase sempre é um cache hit.',

    assess: {
      type: 'multipleChoice',
      question: 'Qual cenário é melhor pra cache do que pra buscar no banco toda vez?',
      options: [
        { text: 'Configurações de conta de um usuário que mudam de minuto em minuto', feedback: 'Dados que mudam direto são ruins pra cache — você gastaria mais tempo invalidando do que economizando.' },
        { text: 'Lista de gêneros de música do Spotify que muda uma vez por trimestre', feedback: 'Isso! Dados estáticos ou que mudam pouco são perfeitos pra cache — muita leitura, quase zero escrita.', correct: true },
        { text: 'Dashboard de performance de vídeo em tempo real do TikTok', feedback: 'Dados em tempo real precisam estar sempre frescos — cache derruba o propósito de "tempo real".' },
        { text: 'Registros de transações financeiras', feedback: 'Dados de transação precisam de durabilidade e consistência — banco é obrigatório aqui.' }
      ]
    },

    learn: {
      hook: 'Quando você abre o Spotify, suas playlists carregam instantaneamente. Não é mágica — é cache. O Spotify guarda seus dados favoritos em memória RAM (Redis) pra não bater no banco toda hora. Milhões de usuários, microssegundos de latência.',
      conceptVideo: {
        url: 'https://www.youtube.com/watch?v=a4yX7RUgTxI',
        title: 'Redis Caching Explicado — Fireship',
        duration: '8min',
        yourTakeaway: 'Foca no padrão cache-aside e TTL (time-to-live) — esses são os dois conceitos que você vai usar mais na prática.'
      },
      conceptText: `Um **banco de dados** é sua fonte da verdade. Guarda dados de forma durável, suporta queries complexas, lida com escritas concorrentes com segurança, e sobrevive a reinicializações. Postgres, MySQL, SQLite e Supabase são bancos relacionais. Eles otimizam pra correção e completude, não pra velocidade pura.

Um **cache** troca durabilidade por velocidade. Redis e Memcached guardam dados em RAM — leituras são medidas em microssegundos em vez de milissegundos. O trade-off: dados são efêmeros (perdidos no restart), capacidade é limitada pela RAM, e dados cacheados podem ficar desatualizados.

**O padrão cache-aside** é o mais comum: verifica o cache primeiro; se o dado tá lá (cache hit), retorna imediatamente; se não (cache miss), busca no banco, guarda no cache com TTL, e retorna.

**TTL (time-to-live)** determina quanto tempo o dado cacheado é considerado válido. TTL de 3600 significa que o valor expira depois de uma hora. Depois disso, o próximo pedido é um cache miss e busca de novo no banco. Escolha o TTL baseado em quão desatualizado você tolera o dado.

**Invalidação de cache** — remover ou atualizar entradas cacheadas quando o dado original muda — é notoriamente difícil. Phil Karlton tem uma frase famosa: "Só tem duas coisas difíceis na Computação: invalidação de cache e dar nomes pras coisas."

**Quando NÃO cachear:** dados específicos de usuário que mudam direto, dados de transação, qualquer coisa que precisa ser tempo-real, ou dados onde leituras desatualizadas causariam bugs (tipo contagem de estoque no checkout).`,
      realWorldExample: 'A lista de gêneros musicais do Spotify (Pop, Rock, Funk, Sertanejo, etc.) muda talvez uma vez por mês quando lançam categoria nova. Sem cache, toda vez que você abre o app, uma busca rola no banco pra mostrar essas categorias. Com Redis cacheando essa lista com TTL de 1 hora, o Spotify serve 3.600 pedidos por hora direto da RAM em vez do banco — e quando adicionam categoria nova, invalidam o cache explicitamente pro próximo pedido vir fresco.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Prática 1: Cache ou Banco?',
        question: 'O Discord precisa guardar o histórico completo de mensagens de um servidor (quem mandou o quê, quando). Onde isso deve viver?',
        options: [
          { text: 'Só no cache Redis — é rápido e fácil de consultar', feedback: 'Histórico de mensagens precisa ser durável. Redis é efêmero — um restart destruiria tudo.' },
          { text: 'Num banco com uma tabela de messages', feedback: 'Isso! Histórico de mensagens é a definição de dado durável, estruturado e consultável — exatamente o que um banco relacional faz.', correct: true },
          { text: 'No localStorage do navegador', feedback: 'Storage do navegador é local, não compartilhável nem durável a nível de sistema.' },
          { text: 'Dividido entre cache e banco', feedback: 'Histórico tem que ter uma única fonte da verdade — dividir cria problemas de consistência.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Prática 2: Cache ou Banco?',
        description: 'Ordena esses tipos de dado no nível certo de armazenamento.',
        items: [
          'Tokens de autenticação do usuário (curta duração)',
          'Senha do Insta (criptografada, permanente)',
          'Número de visualizações de um vídeo do TikTok (atualiza a cada poucos segundos)',
          'Lista de stickers do Discord (muda mensalmente)',
          'Dados de perfil do usuário (persistente, consultado bastante)'
        ],
        correctOrder: [0, 3, 2, 1, 4],
        feedback: 'Tokens curtos e dados de referência que mudam pouco são ideais pra cache. Senhas, contagem de views e perfis vão pro banco onde durabilidade e consistência são garantidas.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Prática 3: Trace o Despejo LRU',
        instructions: 'Esse cache LRU tem capacidade 2. Trace pelas operações e prevê o estado final.',
        code: `// Cache LRU capacidade: 2
// Operações:
// set("a", 1)  → cache: {a:1}
// set("b", 2)  → cache: {a:1, b:2}
// set("c", 3)  → cache cheio, despeja LRU (a), cache: {b:2, c:3}

const final = { b: 2, c: 3 };
console.log(JSON.stringify(final));`,
        question: 'Qual o estado final do cache depois das três operações set?',
        options: [
          { text: '{a:1, b:2, c:3}', feedback: 'O cache tem capacidade 2 — não cabe 3 itens. O menos usado tem que sair.' },
          { text: '{b:2, c:3}', feedback: 'Isso! "a" foi setado primeiro e nunca mais acessado, virou o item LRU. Foi despejado quando "c" entrou.', correct: true },
          { text: '{a:1, c:3}', feedback: '"b" foi usado mais recentemente que "a" — a política LRU despeja o mais antigo, que é "a".' },
          { text: '{a:1, b:2}', feedback: '"c" foi inserido com sucesso — ele despejou "a" pra abrir espaço.' }
        ],
        feedback: 'LRU (Least Recently Used) sempre despeja o item que não é acessado há mais tempo quando a capacidade estoura.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'Deve Cachear?',
        instructions: [
          'Escreva shouldCache(resource) que retorna true se o recurso é bom candidato pra cache',
          'Cache se: type é "static" OU ttl > 0',
          'Não cache se: type é "user-specific" E ttl é 0'
        ],
        sampleCode: `function shouldCache(resource) {
  // TODO: retorna true se o recurso é bom candidato pra cache
  // Cache quando: type === 'static' OU ttl > 0
}`,
        solution: `function shouldCache(resource) {
  return resource.type === 'static' || resource.ttl > 0;
}`,
        tests: [
          { input: 'shouldCache({type:"static",ttl:3600})', expected: true, desc: 'recursos estáticos devem ser cacheados' },
          { input: 'shouldCache({type:"user-specific",ttl:0})', expected: false, desc: 'específico de usuário sem TTL não deve ser cacheado' },
          { input: 'shouldCache({type:"reference",ttl:86400})', expected: true, desc: 'qualquer recurso com TTL positivo deve ser cacheado' }
        ],
        hints: [
          'Verifica resource.type === "static" com OR (||)',
          'Verifica resource.ttl > 0 pra segunda condição',
          'Um único return com || funciona limpinho aqui'
        ]
      },
      {
        level: 2,
        title: 'Construir Chave de Cache',
        instructions: [
          'Escreva buildCacheKey(prefix, id, params) que cria uma string determinística de chave de cache',
          'Formato: "prefix:id:key1=val1:key2=val2" — params ordenados alfabeticamente por chave',
          'Se params for vazio, retorna só "prefix:id"'
        ],
        sampleCode: `function buildCacheKey(prefix, id, params) {
  // TODO: monta uma string de chave de cache
  // "videos:42:format=json" pra prefix="videos", id=42, params={format:"json"}
}`,
        solution: `function buildCacheKey(prefix, id, params) {
  const base = prefix + ':' + id;
  const paramKeys = Object.keys(params).sort();
  if (paramKeys.length === 0) return base;
  const paramStr = paramKeys.map(k => k + '=' + params[k]).join(':');
  return base + ':' + paramStr;
}`,
        tests: [
          { input: 'buildCacheKey("posts",42,{format:"json"})', expected: 'posts:42:format=json', desc: 'monta chave com um param' },
          { input: 'buildCacheKey("users",7,{})', expected: 'users:7', desc: 'monta chave sem params' },
          { input: 'buildCacheKey("posts",1,{z:"last",a:"first"})', expected: 'posts:1:a=first:z=last', desc: 'ordena params alfabeticamente' }
        ],
        hints: [
          'Comece com prefix + ":" + id como base',
          'Use Object.keys(params).sort() pra ordem determinística',
          'Mapeia cada chave pra "key=value" e junta com ":"'
        ]
      },
      {
        level: 3,
        title: 'Simular Cache LRU',
        instructions: [
          'Escreva simulateLRU(capacity, ops) onde ops é um array de objetos {op, k, v}',
          'op pode ser "set" (adicionar/atualizar chave) ou "get" (acessar chave)',
          'Quando a capacidade estoura no "set", despeja a chave menos usada recentemente',
          'Retorna o estado final do cache como objeto simples'
        ],
        sampleCode: `function simulateLRU(capacity, ops) {
  // TODO: simula um cache LRU
  // ops: [{op: 'set', k: 'a', v: 1}, {op: 'get', k: 'a'}, ...]
  // retorna cache final como { chave: valor, ... }
}`,
        solution: `function simulateLRU(capacity, ops) {
  const cache = new Map();
  for (const op of ops) {
    if (op.op === 'set') {
      if (cache.has(op.k)) cache.delete(op.k);
      cache.set(op.k, op.v);
      if (cache.size > capacity) {
        const lruKey = cache.keys().next().value;
        cache.delete(lruKey);
      }
    } else if (op.op === 'get') {
      if (cache.has(op.k)) {
        const val = cache.get(op.k);
        cache.delete(op.k);
        cache.set(op.k, val);
      }
    }
  }
  const result = {};
  for (const [k, v] of cache) result[k] = v;
  return result;
}`,
        tests: [
          { input: 'JSON.stringify(simulateLRU(2,[{op:"set",k:"a",v:1},{op:"set",k:"b",v:2},{op:"set",k:"c",v:3}]))', expected: '{"b":2,"c":3}', desc: 'despeja LRU quando capacidade estoura' },
          { input: 'JSON.stringify(simulateLRU(2,[{op:"set",k:"a",v:1},{op:"set",k:"b",v:2},{op:"get",k:"a"},{op:"set",k:"c",v:3}]))', expected: '{"a":1,"c":3}', desc: 'get atualiza recência, b é despejado' },
          { input: 'Object.keys(simulateLRU(3,[{op:"set",k:"x",v:9}])).length', expected: 1, desc: 'item único dentro da capacidade' }
        ],
        hints: [
          'Use um Map — ele preserva ordem de inserção, que rastreia recência',
          'Pra "set": apaga a chave primeiro se existe (pra resetar ordem), depois set',
          'Pra despejo: cache.keys().next().value dá a chave mais antiga num Map'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Final Cache: Construir Chave + Estratégia',
      steps: [
        {
          type: 'coding',
          title: 'Construir Chave de Cache',
          instructions: 'Escreva buildCacheKey(prefix, id, params) que retorna string tipo "prefix:id:key=val". Ordena params alfabeticamente. Retorna "prefix:id" se params for vazio.',
          sampleCode: `function buildCacheKey(prefix, id, params) {
  // TODO
}`,
          solution: `function buildCacheKey(prefix, id, params) {
  const base = prefix + ':' + id;
  const paramKeys = Object.keys(params).sort();
  if (paramKeys.length === 0) return base;
  const paramStr = paramKeys.map(k => k + '=' + params[k]).join(':');
  return base + ':' + paramStr;
}`,
          tests: [
            { input: 'buildCacheKey("posts",42,{format:"json"})', expected: 'posts:42:format=json', desc: 'monta chave com param' },
            { input: 'buildCacheKey("platforms",0,{})', expected: 'platforms:0', desc: 'monta chave sem params' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'O Spotify cacheia a lista de gêneros com TTL de 1 hora, mas adicionam um gênero novo no banco. Antes do TTL expirar, os apps ainda mostram a lista velha. Qual a correção certa?',
          options: [
            { text: 'Reduzir TTL pra 1 minuto pra dados velhos expirarem mais rápido', feedback: 'TTL menor reduz a janela de dados velhos mas aumenta carga no banco — e os dados ainda ficam velhos por um tempinho.' },
            { text: 'Invalidar explicitamente a chave de cache quando um gênero é adicionado', feedback: 'Isso! Invalidação ativa de cache na escrita garante que o cache fica sempre fresco depois de uma mudança, sem perder o benefício de performance do TTL longo.', correct: true },
            { text: 'Não cachear esse dado', feedback: 'A estratégia de cache tá certa — o problema é invalidação na escrita, não o cache em si.' },
            { text: 'Guardar a lista no localStorage do app', feedback: 'Storage do app não é compartilhado entre servidores nem entre dispositivos.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'A API do Spotify tá sendo bombardeada por milhões de apps pedindo o mesmo dado de música a cada 30 segundos. Projeta uma estratégia de cache que equilibra frescor com performance.',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre como apps gigantes funcionam por trás. Use TikTok, Instagram, Discord, Roblox, Netflix, Spotify como exemplos. Explique sistemas complexos com analogias que eles entendem. Sem jargão desnecessário.'
    },
    resources: [
      { title: 'Documentação Redis: Caching', url: 'https://redis.io/docs/manual/patterns/caching/' },
      { title: 'Estratégias de Invalidação de Cache — AWS', url: 'https://aws.amazon.com/caching/best-practices/' },
      { title: 'Estratégias de Caching — ByteByteGo', url: 'https://blog.bytebytego.com/p/a-guide-to-caching-strategies' }
    ]
  },

  // ─── LESSON 4 ────────────────────────────────────────────────────────────────
  {
    id: 'sd-4-scaling-databases',
    title: 'Escalando Bancos: Como o Discord guarda BILHÕES de mensagens',
    week: 7,
    xp: 80,
    difficulty: 'Advanced',
    priority: '⭐',
    hook: 'Discord tem BILHÕES de mensagens. Como cabem todas no banco? Sharding (dividir o banco em pedaços). Aprender isso é o que separa devs intermediários de seniores.',

    assess: {
      type: 'multipleChoice',
      question: 'O banco do Discord tá lidando com 5.000 leituras por segundo mas só 200 escritas por segundo. Qual estratégia dá a melhor melhoria com menor risco?',
      options: [
        { text: 'Fazer sharding por ID de usuário imediatamente', feedback: 'Sharding é complexo e irreversível — é exagero quando a razão leitura/escrita sugere que réplicas de leitura são o primeiro passo certo.' },
        { text: 'Adicionar réplicas de leitura e rotear queries de leitura pra elas', feedback: 'Isso! Com razão 25:1 de leitura/escrita, réplicas reduzem dramaticamente a carga no primário com muito menos complexidade que sharding.', correct: true },
        { text: 'Atualizar pra um servidor de banco maior (escala vertical)', feedback: 'Escala vertical ajuda mas tem teto — e não resolve o desbalanço fundamental entre leitura/escrita.' },
        { text: 'Cachear todas as queries no Redis', feedback: 'Cache ajuda mas não é estratégia completa de escala — algumas leituras sempre vão ter que bater no banco pra dados frescos.' }
      ]
    },

    learn: {
      hook: 'O Discord tem mais de 19 bilhões de mensagens. Em UM banco isso seria impossível. A solução é sharding: dividir o banco em pedaços, onde cada servidor cuida só de uma parte dos dados. É assim que apps gigantes escalam.',
      conceptVideo: {
        url: 'https://www.youtube.com/watch?v=xpDnVSmNFX0',
        title: 'Escalando Bancos — Sharding & Réplicas (ByteByteGo)',
        duration: '12min',
        yourTakeaway: 'Foca em quais tipos de queries vão pras réplicas vs primário, e como shard keys determinam distribuição de dados.'
      },
      conceptText: `**Escala vertical** quer dizer atualizar pra uma máquina maior — mais CPU, RAM, SSD mais rápido. É simples e não precisa mudar código. O limite: tem um tamanho máximo de máquina, tem downtime durante upgrade, e fica caríssimo no topo.

**Escala horizontal** quer dizer adicionar mais máquinas. Pra bancos, vem em dois sabores:

**Réplicas de leitura** mantêm cópias sincronizadas do banco primário. Queries de leitura (SELECT) vão pras réplicas; queries de escrita (INSERT/UPDATE/DELETE) sempre vão pro primário, que replica as mudanças pra todas as réplicas. Isso funciona porque a maioria dos apps lê muito mais do que escreve — o Discord provavelmente faz 20 leituras pra cada 1 escrita.

**Sharding** divide os dados entre vários bancos. Uma shard key (geralmente hash do user ID ou tenant ID) determina em qual shard uma linha vive. Shard 0 tem users 0-999, shard 1 tem users 1000-1999, etc. Isso distribui leituras E escritas, mas adiciona complexidade operacional gigante: queries entre shards ficam caras, rebalanceamento quando dados ficam desiguais é dolorido, e foreign keys entre shards não existem.

**O Teorema CAP** diz que um sistema distribuído pode garantir no máximo duas das três propriedades: Consistência (toda leitura pega a escrita mais recente), Availability (todo pedido recebe resposta), e Partition Tolerance (sistema funciona apesar de cortes de rede). Réplicas de leitura sacrificam um pouco de consistência — tem replication lag, então uma escrita pode levar milissegundos pra aparecer numa réplica. Pra apps tipo Discord, um pequeno atraso em leituras de mensagem geralmente é aceitável.`,
      realWorldExample: 'No Discord, mensagens são shardadas por server ID — cada servidor do Discord tem suas mensagens em um shard específico, e queries nunca cruzam shards. Isso permite escalar pra bilhões de mensagens sem que nenhum servidor de banco vire gargalo. Quando você abre um servidor do Discord, só esse shard é consultado — mesmo que existam milhões de outros servidores no sistema.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Prática 1: Onde Vai a Query?',
        question: 'O Discord roda essa query: SELECT * FROM messages WHERE channel_id = 42 ORDER BY created_at DESC LIMIT 50. Vai pro primário ou pra réplica?',
        options: [
          { text: 'Primário — todas as queries devem ir lá pra consistência', feedback: 'Mandar todas as leituras pro primário derrota o propósito das réplicas e vira gargalo das escritas.' },
          { text: 'Réplica de leitura — é só leitura com consistência eventual aceitável', feedback: 'Isso! Leituras não-críticas tipo listar mensagens são candidatas perfeitas pra réplica — atraso pequeno é aceitável e você protege o primário pra escritas.', correct: true },
          { text: 'Tem que estar cacheado no Redis, nunca bater no banco', feedback: 'Cache ajuda mas todo cache miss precisa do banco — e réplicas é onde essas leituras devem cair.' },
          { text: 'Um shard aleatório baseado em message ID', feedback: 'Você só usaria sharding se já tivesse arquitetura shardada — e ia querer query num shard específico por chave, não aleatório.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Prática 2: Rotear Operações pra Primário ou Réplica',
        description: 'Arrasta cada operação pro destino certo do banco.',
        items: [
          'SELECT * FROM channels — carregar lista de canais',
          'INSERT INTO messages VALUES (...) — criar mensagem nova',
          'UPDATE users SET status="online" — atualizar status',
          'SELECT COUNT(*) FROM messages — estatística do dashboard',
          'DELETE FROM messages WHERE deleted=true — limpeza'
        ],
        correctOrder: [0, 3, 1, 2, 4],
        feedback: 'Só leituras (SELECT) vão pra réplicas. Todas as escritas (INSERT, UPDATE, DELETE) precisam ir pro primário pra manter uma fonte única da verdade pra mudanças.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Prática 3: Trace o Calculador de Shard',
        instructions: 'Em qual shard cai o userId 101 com 4 shards no total?',
        code: `function getShardKey(userId, totalShards) {
  return userId % totalShards;
}

console.log(getShardKey(100, 4));
console.log(getShardKey(101, 4));`,
        question: 'Quais os dois valores que aparecem?',
        options: [
          { text: '0 e 0', feedback: '100 % 4 = 0 tá certo, mas 101 % 4 = 1, não 0.' },
          { text: '0 e 1', feedback: 'Isso! 100 mod 4 = 0 (shard 0) e 101 mod 4 = 1 (shard 1). IDs vizinhos caem em shards diferentes, distribuindo carga igualmente.', correct: true },
          { text: '1 e 0', feedback: '100 % 4 = 0 (não 1) porque 100 é divisível por 4.' },
          { text: '25 e 25', feedback: 'Módulo dá o resto, não o quociente. 100 / 4 = 25 mas 100 % 4 = 0.' }
        ],
        feedback: 'O operador de módulo (%) é o cálculo padrão de shard key — distribui IDs igualmente entre N shards.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'Calcular Shard Key',
        instructions: [
          'Escreva getShardKey(userId, totalShards) que retorna o número do shard pra um usuário',
          'Use aritmética de módulo pra distribuir igualmente',
          'Retorna um número de 0 até totalShards-1'
        ],
        sampleCode: `function getShardKey(userId, totalShards) {
  // TODO: retorna em qual shard esse userId fica
}`,
        solution: `function getShardKey(userId, totalShards) {
  return userId % totalShards;
}`,
        tests: [
          { input: 'getShardKey(100, 4)', expected: 0, desc: '100 mod 4 = 0' },
          { input: 'getShardKey(101, 4)', expected: 1, desc: '101 mod 4 = 1' },
          { input: 'getShardKey(7, 3)', expected: 1, desc: '7 mod 3 = 1' }
        ],
        hints: [
          'O operador módulo % dá o resto da divisão',
          '100 % 4 = 0 porque 100 divide certinho por 4',
          '101 % 4 = 1 porque 101 = 4*25 + 1'
        ]
      },
      {
        level: 2,
        title: 'Selecionar Réplica pra Operação',
        instructions: [
          'Escreva selectReplica(replicaPool, operation) que roteia queries pro servidor certo',
          'Pra operações "write": sempre retorna índice 0 (o primário)',
          'Pra operações "read": retorna o índice da réplica com role "replica" (índice > 0)',
          'Se tiver várias réplicas, retorna o índice da primeira com role "replica"'
        ],
        sampleCode: `function selectReplica(replicaPool, operation) {
  // TODO: retorna índice do servidor correto
  // escritas sempre vão pro índice 0 (primário)
  // leituras vão pra primeira réplica (role === 'replica')
}`,
        solution: `function selectReplica(replicaPool, operation) {
  if (operation === 'write') return 0;
  const replicaIdx = replicaPool.findIndex(r => r.role === 'replica');
  return replicaIdx !== -1 ? replicaIdx : 0;
}`,
        tests: [
          { input: 'selectReplica([{id:0,role:"primary"},{id:1,role:"replica"}],"write")', expected: 0, desc: 'escritas sempre vão pro primário (índice 0)' },
          { input: 'selectReplica([{id:0,role:"primary"},{id:1,role:"replica"}],"read")', expected: 1, desc: 'leituras vão pra primeira réplica' },
          { input: 'selectReplica([{id:0,role:"primary"}],"read")', expected: 0, desc: 'cai no primário se não tem réplica' }
        ],
        hints: [
          'Verifica operation === "write" primeiro e retorna 0 imediatamente',
          'Use findIndex pra achar o primeiro servidor com role === "replica"',
          'Retorna 0 como fallback se não acha réplica'
        ]
      },
      {
        level: 3,
        title: 'Estimar Necessidades de Escala',
        instructions: [
          'Escreva estimateScaleNeeds(qps, avgLatency) que retorna {needsSharding, needsReplicas}',
          'needsReplicas: true se qps > 1000 (tráfego alto de leitura)',
          'needsSharding: true se qps > 5000 OU avgLatency > 500 (escala extrema ou queries lentas)'
        ],
        sampleCode: `function estimateScaleNeeds(qps, avgLatency) {
  // TODO: retorna { needsSharding: bool, needsReplicas: bool }
  // needsReplicas se qps > 1000
  // needsSharding se qps > 5000 OU avgLatency > 500
}`,
        solution: `function estimateScaleNeeds(qps, avgLatency) {
  return {
    needsReplicas: qps > 1000,
    needsSharding: qps > 5000 || avgLatency > 500
  };
}`,
        tests: [
          { input: 'JSON.stringify(estimateScaleNeeds(10000,200))', expected: '{"needsReplicas":true,"needsSharding":true}', desc: 'QPS extremo precisa dos dois' },
          { input: 'JSON.stringify(estimateScaleNeeds(2000,100))', expected: '{"needsReplicas":true,"needsSharding":false}', desc: 'QPS moderado só precisa de réplicas' },
          { input: 'JSON.stringify(estimateScaleNeeds(500,600))', expected: '{"needsReplicas":false,"needsSharding":true}', desc: 'queries lentas disparam sharding mesmo com QPS baixo' }
        ],
        hints: [
          'Use comparações booleanas simples pra cada propriedade',
          'needsSharding usa OR (||) — qualquer condição dispara',
          'Retorna objeto simples com as duas booleanas'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Final Escala: Shard + Roteamento',
      steps: [
        {
          type: 'coding',
          title: 'Calcular Shard Key',
          instructions: 'Escreva getShardKey(userId, totalShards) que retorna o número correto do shard usando módulo.',
          sampleCode: `function getShardKey(userId, totalShards) {
  // TODO
}`,
          solution: `function getShardKey(userId, totalShards) {
  return userId % totalShards;
}`,
          tests: [
            { input: 'getShardKey(100, 4)', expected: 0, desc: '100 % 4 = 0' },
            { input: 'getShardKey(101, 4)', expected: 1, desc: '101 % 4 = 1' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'O banco primário do Discord tá sobrecarregado. Você adiciona 3 réplicas de leitura. Dois minutos depois, um usuário manda uma mensagem e imediatamente vê o canal sem ela. Por quê?',
          options: [
            { text: 'Réplicas de leitura não suportam queries — só servem pra backup', feedback: 'Réplicas absolutamente suportam queries de leitura — é todo o propósito delas.' },
            { text: 'Replication lag — a escrita bateu no primário mas a réplica ainda não pegou', feedback: 'Isso! Replicação assíncrona quer dizer que tem uma janela (geralmente milissegundos) onde réplicas estão atrás do primário. A leitura bateu na réplica antes da replicação terminar.', correct: true },
            { text: 'A mensagem nova foi acidentalmente escrita numa réplica em vez do primário', feedback: 'Num setup correto, escritas sempre vão pro primário — a camada da aplicação garante isso.' },
            { text: 'Réplicas cacheiam queries e precisam ser limpas', feedback: 'Réplicas não são caches — são cópias completas do banco que replicam de forma assíncrona.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'O Discord tá planejando crescer pra 1 bilhão de usuários. Como você projetaria a estratégia de escala do banco pra aguentar essa escala?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre como apps gigantes funcionam por trás. Use TikTok, Instagram, Discord, Roblox, Netflix, Spotify como exemplos. Explique sistemas complexos com analogias que eles entendem. Sem jargão desnecessário.'
    },
    resources: [
      { title: 'Database Sharding Explicado (Prisma)', url: 'https://www.prisma.io/dataguide/managing-databases/introduction-database-sharding' },
      { title: 'PostgreSQL Replication — Docs Oficiais', url: 'https://www.postgresql.org/docs/current/high-availability.html' },
      { title: 'Teorema CAP Explicado — ByteByteGo', url: 'https://blog.bytebytego.com/p/cap-theorem-explained' }
    ]
  },

  // ─── LESSON 5 ────────────────────────────────────────────────────────────────
  {
    id: 'sd-5-queues-async',
    title: 'Filas: Como o TikTok processa MILHÕES de uploads',
    week: 5,
    xp: 70,
    difficulty: 'Intermediate',
    priority: '⭐',
    hook: 'Quando você upa um vídeo no TikTok, ele não fica pronto na hora — entra numa FILA pra ser processado. APIs síncronas dão timeout em sobrecarga — filas mantêm o sistema funcionando.',

    assess: {
      type: 'multipleChoice',
      question: 'O TikTok precisa processar um vídeo quando você faz upload (comprimir, gerar thumbnail, transcrever, moderar conteúdo). Por que uma fila é melhor do que fazer tudo na hora do upload?',
      options: [
        { text: 'Filas são sempre mais rápidas que processamento direto', feedback: 'Filas adicionam latência pra jobs individuais — o benefício é resiliência e escala, não velocidade pura.' },
        { text: 'Processar tudo síncrono levaria 30+ segundos, dando timeout; filas deixam o upload retornar na hora enquanto o processamento rola em background', feedback: 'Isso! Resposta imediata + processamento em background é o valor principal de filas assíncronas.', correct: true },
        { text: 'Filas tentam de novo pra sempre quando falham', feedback: 'Filas podem ser configuradas com retry, mas retry infinito seria bug — você precisa de limite de tentativas e fila de letras mortas.' },
        { text: 'APIs gigantes exigem pedidos por fila', feedback: 'A maioria das APIs aceita pedidos diretos — usar fila é uma escolha pra resiliência, não obrigação.' }
      ]
    },

    learn: {
      hook: 'Quando você publica um vídeo no TikTok, em 1 segundo aparece "Enviando". Mas o processamento real — comprimir vídeo, gerar thumbnail, rodar moderação por IA — leva minutos. Isso acontece numa fila por trás. Sem filas, o TikTok não conseguiria processar milhões de uploads por dia.',
      conceptVideo: {
        url: 'https://www.youtube.com/watch?v=oUJbuFMyBDk',
        title: 'Filas de Mensagens pra Iniciantes — IBM Technology',
        duration: '9min',
        yourTakeaway: 'Foca em como produtores colocam trabalho na fila e consumidores pegam — e o que acontece quando um consumidor falha.'
      },
      conceptText: `Uma **fila de jobs** é uma estrutura de dados que guarda unidades de trabalho (jobs) até um worker estar pronto pra processar. O princípio FIFO (First In, First Out — primeiro a entrar, primeiro a sair) significa que jobs são processados na ordem que foram adicionados. Isso desacopla o produtor (código que cria trabalho) do consumidor (código que faz o trabalho).

**Por que usar filas?** Três razões: (1) **Desacoplamento** — quem publica não espera todas as etapas pesadas antes de retornar resposta. (2) **Resiliência** — se um serviço tá fora, o job fica na fila e tenta de novo depois em vez de falhar o pedido do usuário. (3) **Controle de vazão** — você processa jobs no ritmo que seu sistema aguenta em vez de ser engolido por picos.

**Lógica de retry** é essencial pra filas em produção. Quando um job falha (timeout, erro 503), a fila tenta de novo — mas com limites. Estratégia típica: tentar até N vezes com exponential backoff (espera 1s, depois 2s, depois 4s...). Depois de esgotar tentativas, manda o job pra uma **fila de letras mortas (DLQ)** — uma área de jobs falhos permanentes que engenheiros podem inspecionar e reprocessar manualmente.

**Brokers de mensagens** tipo Redis (com BullMQ), RabbitMQ e AWS SQS gerenciam filas em escala. Eles adicionam recursos tipo prioridade de job, jobs agendados, limites de concorrência e dashboards de monitoramento.

Pro processamento de vídeo do TikTok, um padrão de fila-por-etapa faz sentido: quando um vídeo é upado, um job é enfileirado pra compressão, outro pra thumbnail, outro pra moderação. Cada job pode falhar e tentar de novo independente, então uma falha de moderação não afeta a compressão.`,
      realWorldExample: 'O worker de upload do TikTok enfileira jobs no momento que você clica "Publicar". Workers diferentes pegam cada job: um comprime o vídeo, outro gera thumbnail, outro roda moderação de conteúdo. Se a IA de moderação cai temporariamente, o job fica na fila e tenta de novo com exponential backoff até 5 vezes. Se ainda falhar, vai pra DLQ — e um alerta dispara pra um engenheiro investigar. O usuário nunca viu nada disso — o upload retornou "sucesso" em 80ms.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Prática 1: Comportamento de Fila',
        question: 'A fila de upload do TikTok tem jobs [VideoA, VideoB, VideoC] nessa ordem. Qual job o worker pega primeiro?',
        options: [
          { text: 'VideoC — foi enfileirado mais recentemente', feedback: 'Isso seria LIFO (Last In, First Out) — filas são FIFO.' },
          { text: 'VideoA — foi enfileirado primeiro', feedback: 'Isso! Filas padrão são FIFO — o primeiro job adicionado é o primeiro processado.', correct: true },
          { text: 'Um job aleatório — filas não garantem ordem', feedback: 'Filas padrão garantem ordem FIFO. Filas de prioridade podem reordenar, mas fila básica é sempre FIFO.' },
          { text: 'O menor job — filas priorizam por tamanho', feedback: 'Processamento por tamanho não é comportamento padrão de fila — isso precisaria de fila de prioridade customizada.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Prática 2: Ciclo de Vida de um Job Falho',
        description: 'Ordena os estágios de um job que falha e termina na fila de letras mortas.',
        items: [
          'Job movido pra fila de letras mortas',
          'Job enfileirado pelo publisher',
          'Worker pega o job, chamada da API falha',
          'Worker tenta de novo com exponential backoff',
          'Máximo de tentativas atingido'
        ],
        correctOrder: [1, 2, 3, 4, 0],
        feedback: 'Jobs são enfileirados, depois pegos e tentados, depois retentados com backoff em falha. Só depois de esgotar tentativas o job vai pra DLQ pra inspeção manual.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Prática 3: Trace a Operação de Desenfileirar',
        instructions: 'O que essa função dequeue retorna?',
        code: `function dequeue(queue) {
  const [job, ...remaining] = queue;
  return { job, queue: remaining };
}

const result = dequeue([{id:1},{id:2},{id:3}]);
console.log(result.job.id);
console.log(result.queue.length);`,
        question: 'Quais os dois valores que aparecem?',
        options: [
          { text: '3 e 2', feedback: '3 seria o último elemento — dequeue sempre remove da frente (FIFO).' },
          { text: '1 e 2', feedback: 'Isso! Dequeue pega o primeiro elemento (id:1) e retorna os 2 restantes como nova fila.', correct: true },
          { text: '1 e 3', feedback: 'A fila depois do dequeue tem 2 itens (id:2 e id:3), não 3.' },
          { text: '2 e 1', feedback: 'id:2 é o segundo item — dequeue pega da frente, dando id:1.' }
        ],
        feedback: 'Dequeue sempre remove da frente da fila. Destructuring com [primeiro, ...resto] é padrão limpo do JavaScript pra isso.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'Enfileirar um Job',
        instructions: [
          'Escreva enqueue(queue, job) que adiciona um job no final da fila',
          'Retorna o novo array da fila (não modifica o original)',
          'A fila é FIFO — jobs novos vão no fim'
        ],
        sampleCode: `function enqueue(queue, job) {
  // TODO: retorna um novo array com job adicionado no final
  // não modifica a fila original
}`,
        solution: `function enqueue(queue, job) {
  return [...queue, job];
}`,
        tests: [
          { input: 'JSON.stringify(enqueue([{id:1}],{id:2}))', expected: '[{"id":1},{"id":2}]', desc: 'adiciona job no fim da fila' },
          { input: 'enqueue([],{id:1}).length', expected: 1, desc: 'enfileirar em fila vazia retorna array com 1 item' },
          { input: 'enqueue([{id:1}],{id:2})[0].id', expected: 1, desc: 'itens originais ficam na frente' }
        ],
        hints: [
          'Use spread pra criar novo array: [...queue, job]',
          'Nunca modifica — não use queue.push(job) porque isso muda o original',
          'O operador spread copia todos os itens existentes e adiciona o novo'
        ]
      },
      {
        level: 2,
        title: 'Desenfileirar o Próximo Job',
        instructions: [
          'Escreva dequeue(queue) que remove o primeiro job da fila',
          'Retorna {job, queue: filaRestante}',
          'Não modifica a fila original'
        ],
        sampleCode: `function dequeue(queue) {
  // TODO: retorna { job: primeiroItem, queue: itensRestantes }
}`,
        solution: `function dequeue(queue) {
  const [job, ...remaining] = queue;
  return { job, queue: remaining };
}`,
        tests: [
          { input: 'JSON.stringify(dequeue([{id:1},{id:2}]))', expected: '{"job":{"id":1},"queue":[{"id":2}]}', desc: 'retorna primeiro job e fila restante' },
          { input: 'dequeue([{id:1},{id:2}]).job.id', expected: 1, desc: 'retorna primeiro item como job' },
          { input: 'dequeue([{id:1},{id:2}]).queue.length', expected: 1, desc: 'fila restante tem tamanho correto' }
        ],
        hints: [
          'Destructure com const [job, ...remaining] = queue',
          'Isso é não-mutativo — spread cria um novo array',
          'Retorna um objeto com job e a fila restante'
        ]
      },
      {
        level: 3,
        title: 'Processar Fila com Lógica de Retry',
        instructions: [
          'Escreva processQueue(jobs, maxRetries) que processa cada job',
          'Um job "tem sucesso" se job.shouldFail === false, "falha" se job.shouldFail === true',
          'Tenta jobs falhos até maxRetries tentativas no total',
          'Retorna {completed: [], failed: []} com jobs no array apropriado'
        ],
        sampleCode: `function processQueue(jobs, maxRetries) {
  // TODO: processa cada job
  // se job.shouldFail é false → adiciona em completed
  // se job.shouldFail é true → tenta até maxRetries vezes, depois adiciona em failed
  // retorna { completed, failed }
}`,
        solution: `function processQueue(jobs, maxRetries) {
  const completed = [];
  const failed = [];
  for (const job of jobs) {
    let attempts = 0;
    let success = false;
    while (attempts <= maxRetries) {
      if (!job.shouldFail) {
        success = true;
        break;
      }
      attempts++;
    }
    if (success) {
      completed.push(job);
    } else {
      failed.push(job);
    }
  }
  return { completed, failed };
}`,
        tests: [
          { input: 'JSON.stringify(processQueue([{id:1,shouldFail:false},{id:2,shouldFail:true}],1))', expected: '{"completed":[{"id":1,"shouldFail":false}],"failed":[{"id":2,"shouldFail":true}]}', desc: 'roteia jobs com sucesso e falha corretamente' },
          { input: 'processQueue([{id:1,shouldFail:false}],3).completed.length', expected: 1, desc: 'job com sucesso vai pra completed' },
          { input: 'processQueue([{id:1,shouldFail:true}],2).failed.length', expected: 1, desc: 'job sempre falho vai pra failed depois das tentativas' }
        ],
        hints: [
          'Loop por cada job e tenta processar',
          'Se shouldFail é false, sucesso imediato — adiciona em completed',
          'Se shouldFail é true, sempre falha — depois de maxRetries tentativas, adiciona em failed'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Final Fila: Enfileirar + Conceitos',
      steps: [
        {
          type: 'coding',
          title: 'Implementar Enfileirar e Desenfileirar',
          instructions: 'Escreva enqueue(queue, job) que retorna nova fila com job adicionado no fim. Não modifica o array original.',
          sampleCode: `function enqueue(queue, job) {
  // TODO
}`,
          solution: `function enqueue(queue, job) {
  return [...queue, job];
}`,
          tests: [
            { input: 'enqueue([{id:1}],{id:2}).length', expected: 2, desc: 'fila cresce em um' },
            { input: 'enqueue([{id:1}],{id:2})[1].id', expected: 2, desc: 'novo job tá no fim' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Um job de processamento de vídeo do TikTok continua falhando depois de 5 tentativas porque a IA de moderação mudou o formato de auth. Pra onde esse job vai e o que acontece depois?',
          options: [
            { text: 'O job é deletado silenciosamente pra manter a fila limpa', feedback: 'Deleção silenciosa significa nenhuma visibilidade nas falhas — anti-padrão crítico em produção.' },
            { text: 'O job vai pra fila de letras mortas e um engenheiro é alertado pra investigar', feedback: 'Isso! DLQs preservam jobs falhos pra inspeção, e alertas garantem que alguém arrume o problema raiz.', correct: true },
            { text: 'O job tenta de novo infinitamente até dar certo', feedback: 'Retry infinito desperdiça recursos e esconde bugs. Limite de tentativas com DLQ é o padrão certo.' },
            { text: 'A fila para todo o processamento até esse job dar certo', feedback: 'Bloquear a fila inteira por uma falha cascataria pra todos os outros jobs — nunca o comportamento certo.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Projeta a arquitetura de fila de processamento de vídeo do TikTok pra lidar com milhões de uploads por dia. Como você lidaria com limites de taxa, estratégias de retry por tipo de job, e monitoramento de falhas?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre como apps gigantes funcionam por trás. Use TikTok, Instagram, Discord, Roblox, Netflix, Spotify como exemplos. Explique sistemas complexos com analogias que eles entendem. Sem jargão desnecessário.'
    },
    resources: [
      { title: 'BullMQ — Fila de Jobs baseada em Redis pra Node.js', url: 'https://docs.bullmq.io/' },
      { title: 'AWS SQS Developer Guide', url: 'https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html' },
      { title: 'Padrão de Nivelamento de Carga por Fila — Microsoft', url: 'https://learn.microsoft.com/en-us/azure/architecture/patterns/queue-based-load-leveling' }
    ]
  },

  // ─── LESSON 6 ────────────────────────────────────────────────────────────────
  {
    id: 'sd-6-message-brokers',
    title: 'Eventos: Como o Insta avisa milhões sobre um Story',
    week: 10,
    xp: 80,
    difficulty: 'Advanced',
    priority: '⭐',
    hook: 'Como o Instagram avisa milhões de pessoas que tem um novo Story? Eventos disparam em cadeia. Domina pub/sub e você projeta sistemas que escalam sem virar bagunça.',

    assess: {
      type: 'multipleChoice',
      question: 'Você publica um Story no Insta, e 5 serviços diferentes precisam reagir (notificações, analytics, feed dos seguidores, arquivamento, índice de busca). Que arquitetura deixa adicionar um 6º serviço amanhã sem mexer no código atual?',
      options: [
        { text: 'Uma função grandona que chama todos os 5 serviços em sequência', feedback: 'Adicionar um 6º serviço significa modificar essa função — isso é acoplamento apertado, exatamente o oposto do que você quer.' },
        { text: 'Publicar um evento STORY_PUBLISHED; cada serviço assina de forma independente', feedback: 'Isso! Pub/sub significa que o publisher não sabe nem se importa com quem tá escutando. Subscribers novos podem ser adicionados sem mudar o publisher.', correct: true },
        { text: 'Um banco compartilhado que cada serviço consulta a cada minuto', feedback: 'Polling é desperdício e lento — eventos são empurrados em tempo real quando acontecem.' },
        { text: 'Chamadas diretas de API do endpoint de publicar pra cada serviço', feedback: 'Chamadas diretas acoplam o publisher a cada subscriber — adicionar um serviço exige modificar o publisher.' }
      ]
    },

    learn: {
      hook: 'Quando você posta um Story no Instagram, várias coisas precisam acontecer ao mesmo tempo: enviar pra seu feed, mandar push notification pros seguidores próximos, gravar em analytics, indexar pra busca, arquivar. Tudo isso rola em paralelo usando eventos — sem o post saber quem tá escutando.',
      conceptVideo: {
        url: 'https://www.youtube.com/watch?v=7fkS-18KBlw',
        title: 'Arquitetura Event-Driven Explicada — ByteByteGo',
        duration: '10min',
        yourTakeaway: 'Foca na diferença entre eventos (algo aconteceu) e comandos (faça isso) — e por que eventos levam a acoplamento mais solto.'
      },
      conceptText: `Um **broker de mensagens** é o correio de um sistema distribuído. Serviços publicam mensagens em tópicos; outros serviços assinam esses tópicos e recebem as mensagens. O broker cuida da entrega, persistência, ordem e retry. Brokers populares: Kafka, RabbitMQ, AWS SNS/SQS, Redis Streams e NATS.

**Pub/Sub (Publish-Subscribe)** é o padrão mais comum. Um publisher emite um evento pra um tópico — tipo \`story.published\` — sem saber quem tá escutando. Subscribers registram interesse em tópicos e recebem cada evento novo. Uma publicação se espalha pra N subscribers.

**Eventos vs Comandos** é uma distinção crucial. Um **evento** descreve algo que JÁ aconteceu: \`STORY_PUBLISHED\`, \`USER_REGISTERED\`, \`VIDEO_LIKED\`. É passado, imutável, e broadcastado pra quem tiver interesse. Um **comando** é uma instrução imperativa: \`PublishStory\`, \`SendNotification\`, \`ChargeCard\`. Comandos têm um handler específico; eventos podem ter muitos.

**Consistência eventual** é o trade-off. Em um sistema event-driven, quando o endpoint de publicar retorna "sucesso" pro usuário, nem todos os serviços downstream terminaram de reagir ainda. O contador de analytics pode levar 500ms pra atualizar; o índice de busca pode levar 2 segundos. O sistema é consistente eventualmente — não imediatamente. A maioria dos apps tolera isso; transferências bancárias geralmente não.

**Event sourcing** vai além: em vez de guardar estado atual, você guarda a sequência completa de eventos que levaram a ele. O estado atual é computado replicando eventos. Isso dá um log de auditoria perfeito e capacidade de reconstruir estado em qualquer ponto da história — mas adiciona complexidade.

Pro Insta, design event-driven significa: o usuário clica publicar → evento \`STORY_PUBLISHED\` dispara → vários serviços assinantes pegam a mensagem e fazem seu trabalho independente. Nenhum bloqueia outro.`,
      realWorldExample: 'Quando você publica um Story no Insta, a API escreve no banco e emite um evento STORY_PUBLISHED. Vários serviços assinam esse canal: o serviço de notificação (que avisa seus seguidores próximos), o serviço de analytics (que loga o evento), o feed (que adiciona pros seguidores), o índice de busca (que indexa hashtags), o serviço de arquivo (que faz backup). Adicionar um 7º assinante amanhã — tipo um notificador especial pra contas verificadas — exige ZERO mudança no endpoint de publicar ou em qualquer assinante existente.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Prática 1: Evento ou Comando?',
        question: 'No sistema do Insta, qual desses deveria ser modelado como EVENTO (passado, broadcast) em vez de COMANDO (imperativo, handler único)?',
        options: [
          { text: 'SendWelcomeEmail', feedback: 'Isso é imperativo e tem um handler — isso é comando.' },
          { text: 'STORY_PUBLISHED', feedback: 'Isso! Descreve algo que já aconteceu, e vários serviços reagem. Evento clássico.', correct: true },
          { text: 'ChargeCustomerCard', feedback: 'É uma instrução imperativa com resultado específico — comando.' },
          { text: 'DeleteAccount', feedback: 'Isso é comando — instrui o sistema a fazer uma ação específica.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Prática 2: Ordene o Fluxo Pub/Sub',
        description: 'Arrasta essas etapas na ordem correta pro Insta publicar um Story via eventos.',
        items: [
          'Cada subscriber processa o evento de forma independente',
          'Usuário clica publicar, Story é salvo no banco',
          'Broker entrega o evento pra todos os subscribers',
          'Publisher emite evento STORY_PUBLISHED pro broker',
          'Subscribers (notificações, analytics, etc.) estão registrados no tópico'
        ],
        correctOrder: [4, 1, 3, 2, 0],
        feedback: 'Subscribers se registram primeiro, depois o publisher emite, depois o broker espalha, e cada subscriber processa de forma independente — esse é o ciclo de vida do pub/sub.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Prática 3: Trace o Construtor de Evento',
        instructions: 'O que buildEvent loga aqui?',
        code: `function buildEvent(type, payload) {
  return { type, payload, timestamp: Date.now() };
}

const evt = buildEvent('STORY_PUBLISHED', { id: 42 });
console.log(evt.type);
console.log(evt.payload.id);`,
        question: 'Quais os dois valores que aparecem?',
        options: [
          { text: '"STORY_PUBLISHED" e 42', feedback: 'Isso! A função retorna um objeto onde type vem do primeiro arg e payload do segundo.', correct: true },
          { text: '42 e "STORY_PUBLISHED"', feedback: 'A ordem dos logs bate com a ordem no código — type primeiro, depois payload.id.' },
          { text: 'undefined e undefined', feedback: 'Ambas as propriedades estão atribuídas corretamente — o objeto tem chaves type e payload.' },
          { text: '"STORY_PUBLISHED" e undefined', feedback: 'payload.id é 42 — é passado como parte do objeto payload.' }
        ],
        feedback: 'Eventos geralmente têm um type (o que aconteceu), um payload (os dados), e um timestamp (quando aconteceu). Isso é o envelope mínimo.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'Construir um Evento',
        instructions: [
          'Escreva buildEvent(type, payload) que retorna um objeto de evento',
          'O objeto deve ter type, payload e timestamp (use Date.now())',
          'Esse é o envelope padrão pra todos os eventos no sistema do Insta'
        ],
        sampleCode: `function buildEvent(type, payload) {
  // TODO: retorna { type, payload, timestamp: Date.now() }
}`,
        solution: `function buildEvent(type, payload) {
  return { type, payload, timestamp: Date.now() };
}`,
        tests: [
          { input: 'buildEvent("POST_PUBLISHED",{id:1}).type', expected: 'POST_PUBLISHED', desc: 'seta type corretamente' },
          { input: 'buildEvent("POST_PUBLISHED",{id:1}).payload.id', expected: 1, desc: 'preserva payload' },
          { input: 'typeof buildEvent("X",{}).timestamp', expected: 'number', desc: 'timestamp é número do Date.now()' }
        ],
        hints: [
          'Date.now() retorna o tempo atual como número',
          'Use atalho de propriedade: { type, payload } é igual a { type: type, payload: payload }',
          'Retorna um literal de objeto com as três propriedades'
        ]
      },
      {
        level: 2,
        title: 'Filtrar Eventos por Tipo',
        instructions: [
          'Escreva filterEvents(events, type) que retorna só eventos cujo .type bate',
          'Use Array.filter pra solução idiomática',
          'Retorna um novo array — não modifica o input'
        ],
        sampleCode: `function filterEvents(events, type) {
  // TODO: retorna só eventos onde event.type === type
}`,
        solution: `function filterEvents(events, type) {
  return events.filter(e => e.type === type);
}`,
        tests: [
          { input: 'JSON.stringify(filterEvents([{type:"A"},{type:"B"},{type:"A"}],"A"))', expected: '[{"type":"A"},{"type":"A"}]', desc: 'filtra pra eventos correspondentes' },
          { input: 'filterEvents([{type:"A"},{type:"B"}],"B").length', expected: 1, desc: 'retorna um match' },
          { input: 'filterEvents([{type:"A"}],"Z").length', expected: 0, desc: 'retorna array vazio quando não tem matches' }
        ],
        hints: [
          'Array.filter retorna um novo array contendo só itens que passam no teste',
          'O teste é e => e.type === type',
          'filter nunca modifica o array original'
        ]
      },
      {
        level: 3,
        title: 'Agregar Eventos por Campo',
        instructions: [
          'Escreva aggregateEvents(events, field) que conta ocorrências de cada valor de um campo',
          'Exemplo: aggregateEvents([{platform:"insta"},{platform:"tiktok"},{platform:"insta"}], "platform") → {insta:2, tiktok:1}',
          'Use reduce ou for-loop pra montar o objeto de contagens'
        ],
        sampleCode: `function aggregateEvents(events, field) {
  // TODO: retorna um objeto mapeando valores do campo pra contagens
  // events: array de objetos de evento
  // field: string chave pra agregar
}`,
        solution: `function aggregateEvents(events, field) {
  const counts = {};
  for (const evt of events) {
    const key = evt[field];
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}`,
        tests: [
          { input: 'JSON.stringify(aggregateEvents([{platform:"twitter"},{platform:"facebook"},{platform:"twitter"}],"platform"))', expected: '{"twitter":2,"facebook":1}', desc: 'agrega por campo platform' },
          { input: 'aggregateEvents([{type:"A"},{type:"A"},{type:"A"}],"type").A', expected: 3, desc: 'conta valores repetidos' },
          { input: 'Object.keys(aggregateEvents([],"x")).length', expected: 0, desc: 'array vazio retorna objeto vazio' }
        ],
        hints: [
          'Inicializa counts como {} e loopa pelos eventos',
          'Pra cada evento, incrementa counts[evt[field]] em 1',
          'Use (counts[key] || 0) + 1 pra lidar com a primeira ocorrência'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Final Event-Driven: Construir + Raciocinar',
      steps: [
        {
          type: 'coding',
          title: 'Construir e Filtrar Eventos',
          instructions: 'Escreva filterEvents(events, type) que retorna só os eventos que batem com o type. Use Array.filter.',
          sampleCode: `function filterEvents(events, type) {
  // TODO
}`,
          solution: `function filterEvents(events, type) {
  return events.filter(e => e.type === type);
}`,
          tests: [
            { input: 'filterEvents([{type:"A"},{type:"B"}],"A").length', expected: 1, desc: 'filtra um match' },
            { input: 'filterEvents([{type:"A"},{type:"A"}],"A").length', expected: 2, desc: 'retorna múltiplos matches' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'O serviço de analytics do Insta ficou fora por 10 minutos. Nesse tempo, 200 Stories foram publicados. Quando o analytics volta, o que acontece?',
          options: [
            { text: 'Esses 200 eventos de publicação são perdidos pra sempre — analytics vai ter dados faltando', feedback: 'Um broker bem projetado (Kafka, SQS, Redis Streams) persiste eventos. Mensagens perdidas são sinal de broker mal configurado, não do pub/sub em si.' },
            { text: 'O broker segura eventos não entregues até analytics reconectar, depois entrega — consistência eventual', feedback: 'Isso! Brokers duráveis bufferizam mensagens pra subscribers offline. Quando analytics volta, processa o backlog e o sistema atinge consistência.', correct: true },
            { text: 'Todos os outros serviços param até analytics se recuperar', feedback: 'Pub/sub é especificamente projetado pra que um subscriber falho não bloqueie outros — esse é todo o ponto de desacoplamento.' },
            { text: 'O endpoint de publicar começa a falhar pedidos de usuário', feedback: 'O publisher não sabe sobre saúde do subscriber — emite pro broker e segue.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'O Insta quer adicionar analytics em tempo real: quando qualquer Story é publicado, o dashboard atualiza em 2 segundos. Projeta a arquitetura event-driven, incluindo qual broker, que eventos emitir, e como lidar com subscriber lento.',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre como apps gigantes funcionam por trás. Use TikTok, Instagram, Discord, Roblox, Netflix, Spotify como exemplos. Explique sistemas complexos com analogias que eles entendem. Sem jargão desnecessário.'
    },
    resources: [
      { title: 'Arquitetura Event-Driven — AWS', url: 'https://aws.amazon.com/event-driven-architecture/' },
      { title: 'Kafka em 6 Minutos — Confluent', url: 'https://www.confluent.io/learn/apache-kafka/' },
      { title: 'Documentação Redis Pub/Sub', url: 'https://redis.io/docs/manual/pubsub/' }
    ]
  },

  // ─── LESSON 7 ────────────────────────────────────────────────────────────────
  {
    id: 'sd-7-microservices',
    title: 'Microsserviços: Como o Roblox roda MILHARES de pedacinhos',
    week: 10,
    xp: 80,
    difficulty: 'Advanced',
    priority: '⭐',
    hook: 'Roblox não é UM programa gigante — são vários pequenos: um pra login, um pra jogos, um pra avatares, um pra chat. Isso é microsserviço. Saber quando dividir é uma das decisões mais importantes que você vai tomar.',

    assess: {
      type: 'multipleChoice',
      question: 'Uma startup de 3 pessoas tá lançando um clone do TikTok mês que vem. Eles devem começar com microsserviços ou um monolito?',
      options: [
        { text: 'Microsserviços — são modernos e escalam melhor', feedback: 'Microsserviços adicionam complexidade operacional que times pequenos não dão conta. Dividir cedo demais mata startups.' },
        { text: 'Monolito — entrega rápido agora, divide depois se virar problema', feedback: 'Isso! Comece monolítico, evolui pra microsserviços quando tiver dor clara de escala ou times grandes que justifiquem o custo. "Monolito primeiro" é sabedoria da indústria.', correct: true },
        { text: 'Sempre microsserviços — é a única escolha à prova de futuro', feedback: 'Não existe "certo" universal — várias empresas de bilhões de dólares rodam ou rodaram monolitos.' },
        { text: 'Híbrido — metade monolito, metade microsserviços no dia um', feedback: 'Projetar híbrido antes de ter tráfego real e escala de time quase sempre otimiza pras coisas erradas.' }
      ]
    },

    learn: {
      hook: 'O Roblox é gigantesco. Em vez de UM programa enorme cuidando de tudo, eles separam em pedaços: um serviço só pra autenticação, outro pra inventário de avatares, outro pra hospedar jogos, outro pra chat. Cada equipe pode trabalhar no seu pedaço sem atrapalhar os outros.',
      conceptVideo: {
        url: 'https://www.youtube.com/watch?v=lTAcCNbJ7KE',
        title: 'Microsserviços vs Monolito — ByteByteGo',
        duration: '7min',
        yourTakeaway: 'Foca na seção de trade-offs: deploy, debug e autonomia de time — esses geralmente decidem mais a arquitetura do que performance.'
      },
      conceptText: `Um **monolito** é uma única base de código deployada como uma unidade. Tudo — auth, posts, plataformas, analytics — vive no mesmo repo, roda no mesmo processo, compartilha o mesmo banco. Simples de desenvolver, testar, deployar. Fácil refatorar entre limites. A desvantagem: conforme o time cresce além de ~20 engenheiros, conflitos de merge e disputa de deploy desaceleram todo mundo. Um commit ruim pode derrubar o produto inteiro.

**Microsserviços** dividem funcionalidade em serviços deployados independentemente. Auth é um serviço, posts é outro, cada conector de plataforma pode ser seu próprio serviço. Cada um tem seu repo, pipeline de deploy, banco (idealmente) e equipe. Equipes lançam independente — o time de auth deploya 10 vezes por dia sem coordenar com o time de posts.

**Os trade-offs:**

**Prós do monolito:** Único repo pra clonar, único deploy, debug simples (um stack trace), transações em todos os dados, dev local rápido. **Contras:** Escalar significa escalar tudo junto, um bug derruba tudo, times grandes pisam um no outro.

**Prós dos microsserviços:** Deploy independente, isolamento de falhas (um serviço fora ≠ todos fora), flexibilidade de stack por serviço, autonomia de time em escala. **Contras:** Chamadas de rede entre serviços (mais lento, podem falhar), tracing distribuído necessário pra debug, consistência eventual, orquestração de deploy (Kubernetes etc.), consistência de dados sem transações entre serviços.

**Quando dividir:** Limites claros de propriedade de time (ex: "o time de pagamentos é dono de pagamentos"), necessidades independentes de escala (auth precisa de 10x mais capacidade que admin), isolamento regulatório (dados de pagamento têm que ser isolados), ou requisitos tech diferentes (serviço de ML em Python, API web em Node).

**Service mesh** (Istio, Linkerd) lida com preocupações transversais: descoberta de serviço, retries, circuit breakers, TLS mútuo, observabilidade. Conforme seu número de serviços cresce, service mesh fica essencial.

**Dependências circulares** entre serviços são um cheiro de código que geralmente indica que o limite tá errado. Se serviço A precisa do B que precisa do A, você dividiu errado — eles provavelmente pertencem a um único serviço.`,
      realWorldExample: 'O Roblox começou como um monolito gigantesco em C++ rodando tudo. Conforme cresceu pra milhões de jogadores simultâneos, foram extraindo serviços: primeiro o sistema de avatares, depois economia (Robux), depois autenticação, depois hospedagem de jogos. Hoje rodam centenas de microsserviços, mas cada extração foi feita SÓ quando a dor justificava o custo. Lição: não divide até a dor justificar.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Prática 1: Identifique a Divisão Ruim',
        question: 'Um time divide o app em microsserviços. O serviço "users" precisa chamar o serviço "auth" em todo login, e o serviço "auth" precisa chamar "users" pra validar o email. Qual o problema?',
        options: [
          { text: 'Precisam de uma rede mais rápida', feedback: 'Velocidade de rede não é o problema raiz — a divisão arquitetural tá errada.' },
          { text: 'Dependência circular — auth e users provavelmente pertencem ao mesmo serviço', feedback: 'Isso! Quando dois serviços ficam se chamando constantemente pra fazer operações básicas, o limite tá errado. Eles são na real um contexto único.', correct: true },
          { text: 'Devem adicionar um terceiro serviço pra mediar', feedback: 'Adicionar mais serviços pra arrumar deps circulares geralmente piora — arrume o limite primeiro.' },
          { text: 'Precisam cachear mais agressivamente', feedback: 'Cache pode esconder o sintoma mas a arquitetura ainda tá errada.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Prática 2: Ordene a Evolução Monolito-para-Microsserviços',
        description: 'Arrasta esses estágios na ordem típica que um produto segue quando cresce.',
        items: [
          'Vários times cada um dono do seu serviço, mesh + observabilidade',
          'Um repo, um deploy, um banco — MVP',
          'Extrair um serviço gargalo (ex: workers de processamento)',
          'Alguns serviços, coordenação manual de deploy',
          'Várias dores no monolito — deploys lentos, conflitos de merge'
        ],
        correctOrder: [1, 4, 2, 3, 0],
        feedback: 'Você não pula do monolito pro mesh — você cresce pra microsserviços serviço por serviço conforme a dor exige.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Prática 3: Trace o Parser de Serviço',
        instructions: 'O que parseService loga aqui?',
        code: `function parseService(config) {
  return { name: config.name, port: config.port, deps: config.dependencies };
}

const svc = parseService({ name: 'auth', port: 3001, dependencies: ['db', 'cache'] });
console.log(svc.deps.length);
console.log(svc.name);`,
        question: 'Quais os dois valores que aparecem?',
        options: [
          { text: '2 e "auth"', feedback: 'Isso! A função renomeia "dependencies" pra "deps" preservando o array de dois elementos.', correct: true },
          { text: '0 e "auth"', feedback: 'deps é mapeado de dependencies que tem 2 elementos — o array não é limpo.' },
          { text: '2 e undefined', feedback: 'svc.name é setado certo do config.name — é "auth".' },
          { text: '"db,cache" e "auth"', feedback: 'deps.length retorna o número de itens (2), não a string juntada.' }
        ],
        feedback: 'Padrão comum em config de serviço: um parser normaliza chaves de config externas pro formato interno que seu código espera.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'Parsear Config de Serviço',
        instructions: [
          'Escreva parseService(config) que retorna um objeto de serviço normalizado',
          'Mapeia config.name → name, config.port → port, config.dependencies → deps',
          'Esse é o formato padrão usado pra definições de serviço'
        ],
        sampleCode: `function parseService(config) {
  // TODO: retorna { name, port, deps }
  // renomeia "dependencies" pra "deps"
}`,
        solution: `function parseService(config) {
  return { name: config.name, port: config.port, deps: config.dependencies };
}`,
        tests: [
          { input: 'JSON.stringify(parseService({name:"auth",port:3001,dependencies:["db","cache"]}))', expected: '{"name":"auth","port":3001,"deps":["db","cache"]}', desc: 'mapeia e renomeia campos' },
          { input: 'parseService({name:"api",port:8080,dependencies:[]}).deps.length', expected: 0, desc: 'preserva array vazio de dependencies' },
          { input: 'parseService({name:"x",port:1,dependencies:["y"]}).name', expected: 'x', desc: 'preserva campo name' }
        ],
        hints: [
          'Retorna literal de objeto com três chaves: name, port, deps',
          'config.dependencies vira o valor da propriedade deps',
          'Sem transformação dos valores — só remapeia chaves'
        ]
      },
      {
        level: 2,
        title: 'Detectar Dependências Circulares',
        instructions: [
          'Escreva detectCircularDeps(services) onde cada serviço é {name, deps: [...]}',
          'Retorna true se existe um ciclo no grafo de dependências',
          'Use DFS com pilha de recursão pra detectar back edges'
        ],
        sampleCode: `function detectCircularDeps(services) {
  // TODO: retorna true se o grafo de deps tem ciclo
  // services: [{name, deps: [...]}]
}`,
        solution: `function detectCircularDeps(services) {
  const graph = {};
  for (const s of services) graph[s.name] = s.deps;
  const visited = new Set();
  const stack = new Set();
  function dfs(node) {
    if (stack.has(node)) return true;
    if (visited.has(node)) return false;
    visited.add(node);
    stack.add(node);
    const neighbors = graph[node] || [];
    for (const n of neighbors) {
      if (dfs(n)) return true;
    }
    stack.delete(node);
    return false;
  }
  for (const s of services) {
    if (dfs(s.name)) return true;
  }
  return false;
}`,
        tests: [
          { input: 'detectCircularDeps([{name:"A",deps:["B"]},{name:"B",deps:["C"]},{name:"C",deps:["A"]}])', expected: true, desc: 'detecta ciclo A → B → C → A' },
          { input: 'detectCircularDeps([{name:"A",deps:["B"]},{name:"B",deps:[]}])', expected: false, desc: 'deps lineares não são cíclicas' },
          { input: 'detectCircularDeps([{name:"A",deps:["A"]}])', expected: true, desc: 'self-loop é ciclo' }
        ],
        hints: [
          'Monta lista de adjacência do array de serviços primeiro',
          'Use DFS com dois Sets: visited (já explorado) e stack (caminho atual)',
          'Back edge — achar nó já na pilha atual — significa ciclo'
        ]
      },
      {
        level: 3,
        title: 'Construir Health Check',
        instructions: [
          'Escreva buildHealthCheck(service) que retorna {service, status, checks}',
          'service: o nome do serviço',
          'status: "healthy" se service.uptime >= 99, senão "unhealthy"',
          'checks: array vazio (você preencheria com resultados detalhados em produção)'
        ],
        sampleCode: `function buildHealthCheck(service) {
  // TODO: retorna { service: name, status: 'healthy' | 'unhealthy', checks: [] }
  // healthy se service.uptime >= 99
}`,
        solution: `function buildHealthCheck(service) {
  return {
    service: service.name,
    status: service.uptime >= 99 ? 'healthy' : 'unhealthy',
    checks: []
  };
}`,
        tests: [
          { input: 'JSON.stringify(buildHealthCheck({name:"auth",uptime:99.9}))', expected: '{"service":"auth","status":"healthy","checks":[]}', desc: 'serviço saudável com uptime alto' },
          { input: 'buildHealthCheck({name:"api",uptime:95}).status', expected: 'unhealthy', desc: 'uptime baixo é unhealthy' },
          { input: 'buildHealthCheck({name:"db",uptime:100}).checks.length', expected: 0, desc: 'array de checks vazio por padrão' }
        ],
        hints: [
          'Use ternário: service.uptime >= 99 ? "healthy" : "unhealthy"',
          'O nome do serviço vem de service.name, não service em si',
          'Retorna checks como array literal vazio: []'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Final Microsserviços: Parser + Raciocinar',
      steps: [
        {
          type: 'coding',
          title: 'Parsear Config de Serviço',
          instructions: 'Escreva parseService(config) que retorna {name, port, deps} — renomeia "dependencies" pra "deps".',
          sampleCode: `function parseService(config) {
  // TODO
}`,
          solution: `function parseService(config) {
  return { name: config.name, port: config.port, deps: config.dependencies };
}`,
          tests: [
            { input: 'parseService({name:"x",port:1,dependencies:["a"]}).deps[0]', expected: 'a', desc: 'mapeia dependencies pra deps' },
            { input: 'parseService({name:"x",port:1,dependencies:[]}).port', expected: 1, desc: 'preserva port' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'O monolito do Roblox tem 50.000 linhas de código, deployado por 4 engenheiros. Estão pensando em dividir em microsserviços. Qual o sinal mais forte de que é hora?',
          options: [
            { text: 'Um blog post falou que microsserviços é melhor prática', feedback: 'Hype de blog é o pior motivo pra adicionar complexidade operacional.' },
            { text: 'A lógica de processamento de jogos precisa escalar 10x mais que o dashboard, mas estão amarrados', feedback: 'Isso! Necessidades independentes de escala é um dos sinais mais claros — quando partes diferentes do sistema têm perfis de carga radicalmente diferentes, dividir deixa cada um escalar sozinho.', correct: true },
            { text: 'Querem aprender Kubernetes', feedback: 'Objetivos pessoais de aprendizado não devem guiar decisões arquiteturais de produção.' },
            { text: 'Outras empresas no espaço deles usam microsserviços', feedback: 'Copiar arquitetura de competidores sem as restrições deles geralmente importa a dor sem o benefício.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'O Roblox tá com 100 milhões de jogadores e o time tem 200 engenheiros. O monolito tá ficando devagar pra deploy e frágil. Caminha pela decisão de qual serviço extrair primeiro, e como fazer isso com segurança.',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre como apps gigantes funcionam por trás. Use TikTok, Instagram, Discord, Roblox, Netflix, Spotify como exemplos. Explique sistemas complexos com analogias que eles entendem. Sem jargão desnecessário.'
    },
    resources: [
      { title: 'MonolithFirst — Martin Fowler', url: 'https://martinfowler.com/bliki/MonolithFirst.html' },
      { title: 'Microsserviços — Palestra Sam Newman', url: 'https://samnewman.io/talks/principles-of-microservices/' },
      { title: 'Padrão Strangler Fig', url: 'https://martinfowler.com/bliki/StranglerFigApplication.html' }
    ]
  },

  // ─── LESSON 8 ────────────────────────────────────────────────────────────────
  {
    id: 'sd-8-architecture-diagrams',
    title: 'Diagramas: Como devs sêniores desenham sistemas',
    week: 10,
    xp: 60,
    difficulty: 'Intermediate',
    priority: '⭐',
    hook: 'Aqueles desenhos de caixinhas conectadas que devs sêniores fazem? Diagramas de arquitetura. Aprender a ler eles é a ponte entre "escrevo código" e "projeto sistemas".',

    assess: {
      type: 'multipleChoice',
      question: 'Você vê isso num diagrama: [App] → [CDN] → [Load Balancer] → [API] → [Banco]. O que a flecha entre CDN e Load Balancer representa?',
      options: [
        { text: 'Um cabo físico conectando dois servidores', feedback: 'Diagramas de arquitetura são lógicos, não físicos — flechas mostram fluxo de dados, não cabos.' },
        { text: 'A direção do fluxo de dados — pedidos passam do CDN pro Load Balancer no caso de cache miss', feedback: 'Isso! Flechas mostram a direção dos pedidos / fluxo de dados entre componentes.', correct: true },
        { text: 'Uma relação de injeção de dependência', feedback: 'Diagramas descrevem fluxo de dados em runtime, não injeção de dependência no código.' },
        { text: 'Uma linha do tempo mostrando que o CDN foi deployado antes do LB', feedback: 'Diagramas descrevem estrutura, não história de deploy.' }
      ]
    },

    learn: {
      hook: 'Quando engenheiros sêniores discutem como o Netflix entrega vídeo pra 230 milhões de pessoas, eles desenham caixinhas e flechas num quadro branco. Aprender a desenhar e entender esses diagramas é o que separa quem escreve código de quem projeta sistemas.',
      conceptVideo: {
        url: 'https://www.youtube.com/watch?v=i7twT3x5yEI',
        title: 'Como Desenhar Diagramas de Arquitetura — ByteByteGo',
        duration: '8min',
        yourTakeaway: 'Foca nas formas padrão: retângulos pra serviços, cilindros pra bancos, nuvens pra serviços externos. Convenções ajudam todo mundo a ler seus diagramas.'
      },
      conceptText: `Diagramas de arquitetura são a língua comum do design de sistemas. Toda entrevista de engenheiro sênior, todo doc de design, todo postmortem inclui eles. A boa notícia: tem convenções, e quando você sabe, todo diagrama vira legível.

**Formas padrão:**
- **Retângulo (caixa)** — um serviço, app ou componente (API, worker, frontend)
- **Cilindro** — um banco de dados (a forma lembra o disco antigo)
- **Nuvem** — um serviço externo (API do TikTok, Stripe, qualquer coisa fora do seu controle)
- **Retângulo arredondado / pílula** — às vezes usado pra filas ou mensageria
- **Retângulos empilhados** — várias instâncias (um pool de serviços atrás de um load balancer)
- **Hexágono** — às vezes usado pra usuários ou atores

**Flechas** mostram direção do fluxo de dados ou pedidos. Uma flecha simples A → B significa que A inicia uma chamada pra B. Flecha dupla A ↔ B significa comunicação bidirecional (tipo um WebSocket). Flechas tracejadas geralmente significam fluxo assíncrono (event-driven), enquanto flechas sólidas significam fluxo síncrono (pedido-resposta).

**Componentes comuns que você vai ver:**
- **Load balancer** — distribui tráfego entrante entre várias instâncias (nginx, AWS ALB, Cloudflare)
- **CDN** — cache de borda pra arquivos estáticos (Cloudflare, Fastly, AWS CloudFront)
- **API gateway** — ponto único de entrada que lida com auth, rate limiting, roteamento pra serviços backend
- **Banco** — Postgres, MySQL, MongoDB, etc.
- **Cache** — Redis, Memcached
- **Broker de mensagens** — Kafka, RabbitMQ, SQS, Redis Streams
- **Worker / processador de jobs** — serviço que consome de uma fila

**Camadas** — a maioria dos diagramas flui da esquerda pra direita ou de cima pra baixo: usuário → borda → app → dados. Ler um diagrama é tracear um pedido por essas camadas.

Um diagrama típico do TikTok mostraria: Usuário → CDN da Cloudflare → API Gateway → vários serviços (feed, vídeo, recomendações) → bancos shardados e caches Redis.`,
      realWorldExample: 'Quando um engenheiro sênior do TikTok desenha a arquitetura no quadro branco, ele desenha: um ícone de usuário à esquerda, uma flecha pra um retângulo "CDN Cloudflare", depois pra um "API Gateway", que tem flechas pra um cilindro de banco shardado e um cilindro Redis (cache). Do API, uma flecha tracejada vai pra uma fila (retângulo arredondado), que se espalha pra workers que processam vídeo, calculam recomendações, e fazem moderação. Em 30 segundos de desenho, ele comunicou a estrutura inteira do sistema.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Prática 1: Qual a Forma?',
        question: 'Você tá desenhando a arquitetura do Netflix e precisa representar o banco Postgres deles. Que forma usa?',
        options: [
          { text: 'Uma nuvem', feedback: 'Nuvens representam serviços externos de terceiros. O Postgres é o banco deles mas a convenção ainda é cilindro.' },
          { text: 'Um cilindro', feedback: 'Isso! O cilindro é o símbolo universal pra banco em diagramas de arquitetura.', correct: true },
          { text: 'Um losango', feedback: 'Losangos são pra pontos de decisão em fluxogramas, não componentes em diagramas de arquitetura.' },
          { text: 'Um hexágono', feedback: 'Hexágonos às vezes representam usuários ou atores, não bancos.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Prática 2: Ordene as Camadas de um Pedido no Netflix',
        description: 'Arraste esses componentes na ordem que um pedido de usuário passa por eles.',
        items: [
          'Banco de metadados de vídeo',
          'Navegador do usuário (cliente)',
          'CDN da Netflix (Open Connect)',
          'API gateway do Netflix',
          'Cache Redis (verificado primeiro)'
        ],
        correctOrder: [1, 2, 3, 4, 0],
        feedback: 'Pedido flui de fora pra dentro: cliente → borda → API → cache (verificado primeiro) → banco (em cache miss). Esse layering esquerda-pra-direita é como a maioria dos diagramas é lido.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Prática 3: Parsear uma String de Diagrama',
        instructions: 'O que parseComponents retorna pra esse input?',
        code: `function parseComponents(diagram) {
  return diagram.split(' → ').map(s => s.trim());
}

console.log(parseComponents('Client → API → DB').length);
console.log(parseComponents('Client → API → DB')[1]);`,
        question: 'Quais os dois valores que aparecem?',
        options: [
          { text: '3 e "API"', feedback: 'Isso! Três componentes, com "API" no índice 1.', correct: true },
          { text: '2 e "Client"', feedback: 'Tem 3 segmentos, não 2 — o split produz ["Client", "API", "DB"].' },
          { text: '3 e "Client"', feedback: 'índice 1 é "API", não "Client" (que tá no índice 0).' },
          { text: '1 e "Client → API → DB"', feedback: 'split produz vários itens, não uma única string juntada.' }
        ],
        feedback: 'Dividir pelo caractere de flecha é jeito rápido de transformar descrição textual de diagrama numa lista de componentes.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'Parsear Componentes do Diagrama',
        instructions: [
          'Escreva parseComponents(diagram) onde diagram é string tipo "Client → API → DB"',
          'Divide na flecha ( → ) e retorna array de nomes de componentes',
          'Tira espaços de cada nome'
        ],
        sampleCode: `function parseComponents(diagram) {
  // TODO: divide em " → " e retorna array de nomes
}`,
        solution: `function parseComponents(diagram) {
  return diagram.split(' → ').map(s => s.trim());
}`,
        tests: [
          { input: 'JSON.stringify(parseComponents("Client → API → DB"))', expected: '["Client","API","DB"]', desc: 'parseia diagrama de 3 componentes' },
          { input: 'parseComponents("A → B").length', expected: 2, desc: 'parseia diagrama de 2 componentes' },
          { input: 'parseComponents("Solo")[0]', expected: 'Solo', desc: 'retorna componente único se não tem flecha' }
        ],
        hints: [
          'Use string.split(" → ") com a flecha cercada de espaços',
          'Mapeia cada pedaço por .trim() pra tirar espaços extras',
          'Retorna o array resultante direto'
        ]
      },
      {
        level: 2,
        title: 'Construir Grafo de Dependências',
        instructions: [
          'Escreva buildDependencyGraph(edges) onde edges é array de {from, to}',
          'Retorna lista de adjacência: {nomeDoNo: [vizinhos]}',
          'Todo nó mencionado (em from ou to) deve aparecer como chave, mesmo sem arestas saindo'
        ],
        sampleCode: `function buildDependencyGraph(edges) {
  // TODO: retorna { from: [to, to, ...], ... }
  // todo nó deve aparecer como chave, mesmo com array vazio
}`,
        solution: `function buildDependencyGraph(edges) {
  const graph = {};
  for (const e of edges) {
    if (!graph[e.from]) graph[e.from] = [];
    if (!graph[e.to]) graph[e.to] = [];
    graph[e.from].push(e.to);
  }
  return graph;
}`,
        tests: [
          { input: 'JSON.stringify(buildDependencyGraph([{from:"A",to:"B"},{from:"A",to:"C"}]))', expected: '{"A":["B","C"],"B":[],"C":[]}', desc: 'monta lista de adjacência com nós folha' },
          { input: 'buildDependencyGraph([{from:"A",to:"B"}]).A[0]', expected: 'B', desc: 'aresta de A pra B' },
          { input: 'buildDependencyGraph([{from:"A",to:"B"}]).B.length', expected: 0, desc: 'nó destino tem lista vazia' }
        ],
        hints: [
          'Inicializa graph como {} e itera nas arestas',
          'Pra cada aresta, garante que .from e .to têm arrays vazios inicializados',
          'Depois adiciona o valor .to no graph[.from]'
        ]
      },
      {
        level: 3,
        title: 'Contar Arestas no Grafo',
        instructions: [
          'Escreva countEdges(graph) onde graph é lista de adjacência {nó: [vizinhos]}',
          'Retorna o número total de arestas (soma dos tamanhos das listas de vizinhos)',
          'Um grafo {A:["B","C"], B:["C"], C:[]} tem 3 arestas no total'
        ],
        sampleCode: `function countEdges(graph) {
  // TODO: soma os tamanhos de todos os arrays de adjacência
}`,
        solution: `function countEdges(graph) {
  let count = 0;
  for (const node in graph) {
    count += graph[node].length;
  }
  return count;
}`,
        tests: [
          { input: 'countEdges({A:["B","C"],B:["C"],C:[]})', expected: 3, desc: 'conta todas as arestas direcionadas' },
          { input: 'countEdges({A:[]})', expected: 0, desc: 'sem arestas em nó isolado' },
          { input: 'countEdges({A:["B"],B:["A"]})', expected: 2, desc: 'conta arestas em ambas direções' }
        ],
        hints: [
          'Itera nas chaves do objeto graph',
          'Pra cada chave, adiciona graph[key].length ao total',
          'Object.values(graph).reduce((sum, arr) => sum + arr.length, 0) é alternativa de uma linha'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Final Diagramas: Parsear + Raciocinar',
      steps: [
        {
          type: 'coding',
          title: 'Parsear Componentes de String de Diagrama',
          instructions: 'Escreva parseComponents(diagram) que divide string tipo "A → B → C" na flecha e retorna array de nomes de componente.',
          sampleCode: `function parseComponents(diagram) {
  // TODO
}`,
          solution: `function parseComponents(diagram) {
  return diagram.split(' → ').map(s => s.trim());
}`,
          tests: [
            { input: 'parseComponents("Client → API → DB").length', expected: 3, desc: 'três componentes' },
            { input: 'parseComponents("A → B")[1]', expected: 'B', desc: 'segundo componente é B' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Numa entrevista de design de sistemas, você desenha flecha de um retângulo de serviço pra uma "fila" (retângulo arredondado), e outra flecha da fila pra um retângulo de worker. O que isso comunica?',
          options: [
            { text: 'O serviço e o worker estão na mesma máquina', feedback: 'Diagramas descrevem fluxo lógico, não localização física.' },
            { text: 'O serviço passa trabalho de forma assíncrona pra fila, e o worker consome dela — estão desacoplados', feedback: 'Isso! Esse é o padrão clássico produtor → fila → consumidor, e comunica desacoplamento assíncrono num relance.', correct: true },
            { text: 'O worker é mais rápido que o serviço', feedback: 'Diagramas não comunicam velocidade relativa dos componentes.' },
            { text: 'Eles compartilham um banco', feedback: 'Um banco seria uma forma de cilindro separada — a fila é conceito diferente.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Desenha e explica a arquitetura do TikTok pra lidar com um pedido de "abrir feed", incluindo cache, recomendação e CDN. Caminha pelo diagrama componente por componente.',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre como apps gigantes funcionam por trás. Use TikTok, Instagram, Discord, Roblox, Netflix, Spotify como exemplos. Explique sistemas complexos com analogias que eles entendem. Sem jargão desnecessário.'
    },
    resources: [
      { title: 'Excalidraw — Ferramenta Gratuita de Diagramas', url: 'https://excalidraw.com/' },
      { title: 'C4 Model pra Arquitetura de Software', url: 'https://c4model.com/' },
      { title: 'System Design Primer (GitHub)', url: 'https://github.com/donnemartin/system-design-primer' }
    ]
  },

  // ─── LESSON 9 ────────────────────────────────────────────────────────────────
  {
    id: 'sd-9-load-balancing',
    title: 'Load Balancing: Como o TikTok não cai quando todo mundo abre',
    week: 10,
    xp: 80,
    difficulty: 'Advanced',
    priority: '⭐⭐',
    hook: 'Como TikTok não cai quando milhões abrem ao mesmo tempo? Distribui carga entre vários servidores. Load balancing não é sobre velocidade — é sobre ficar online quando servidores morrem (e eles vão morrer).',

    assess: {
      type: 'multipleChoice',
      question: 'O TikTok tem 3 servidores de API atrás de um load balancer. Servidor 2 cai às 2 da manhã. O que deve acontecer com os pedidos de usuário?',
      options: [
        { text: 'Todos os pedidos falham até um engenheiro arrumar o servidor 2', feedback: 'O ponto inteiro de ter vários servidores é que uma falha não deve causar downtime.' },
        { text: 'O load balancer detecta que servidor 2 caiu (via health check) e roteia novos pedidos só pros servidores 1 e 3', feedback: 'Isso! Health checks + failover são a base de alta disponibilidade — o LB nota a falha em segundos e para de mandar tráfego pro servidor morto.', correct: true },
        { text: 'Pedidos ficam na fila até servidor 2 voltar', feedback: 'Enfileirar pedidos até recuperação manual criaria latência enorme visível pro usuário e provavelmente daria timeout.' },
        { text: 'Servidor 2 magicamente se recupera sozinho', feedback: 'Servidores não se recuperam espontaneamente — recuperação exige restart automático ou intervenção manual.' }
      ]
    },

    learn: {
      hook: 'Quando rola um momento viral e milhões de pessoas abrem o TikTok ao mesmo tempo, um servidor sozinho não dá conta. O load balancer espalha o tráfego entre dezenas de servidores — e quando um cai, ele percebe em segundos e desvia o tráfego. Sem você notar.',
      conceptVideo: {
        url: 'https://www.youtube.com/watch?v=K0Ta65OqQkY',
        title: 'Algoritmos de Load Balancing — ByteByteGo',
        duration: '8min',
        yourTakeaway: 'Foca nas diferenças entre round-robin, least connections e weighted — e quando cada um é apropriado.'
      },
      conceptText: `Um **load balancer** fica na frente de um pool de servidores e distribui pedidos entrantes entre eles. Serve dois propósitos: (1) **escala** — espalha carga entre várias máquinas pra nenhuma ficar sobrecarregada; (2) **disponibilidade** — detecta servidores mortos via health checks e para de rotear tráfego pra eles.

**Round-robin** é o algoritmo mais simples. Pedido 1 vai pro servidor A, pedido 2 pro B, pedido 3 pro C, pedido 4 volta pro A, e assim em diante — rotação circular. Fácil de implementar, justo quando servidores são idênticos, mas não considera carga real (um servidor preso em pedido lento ainda recebe novos na vez dele).

**Least connections** roteia cada novo pedido pro servidor com menos conexões ativas. Isso se adapta à carga real: um servidor lutando com queries caras recebe menos pedidos novos até alcançar os outros. Melhor que round-robin pra cargas com tempos de pedido variáveis.

**Weighted round-robin** atribui um peso pra cada servidor refletindo capacidade. Servidor com peso 3 recebe três vezes mais pedidos que um com peso 1. Útil quando seu frota tem tamanhos misturados.

**Consistent hashing** mapeia cada pedido (ex: por user ID) pro mesmo servidor, o que ajuda localidade de cache — pedidos repetidos do mesmo usuário caem no mesmo servidor, batendo no cache quente dele. Usado bastante em caches distribuídos e CDNs.

**Health checks** são como o LB sabe que um servidor tá vivo. O LB pinga cada servidor periodicamente (ex: GET /health a cada 5s). Se um servidor falha N checks consecutivos, é marcado como unhealthy e removido do pool. Quando volta a passar, é re-adicionado.

**Failover** é o que acontece quando um servidor cai: o LB roteia tráfego só pros restantes saudáveis. Se você tem 3 servidores e 1 falha, os outros 2 pegam 50% mais carga cada (em round-robin). É por isso que planejamento de capacidade importa — você precisa dimensionar pra aguentar N-1 (ou N-2) servidores se quer alta disponibilidade de verdade.

**Active-active vs active-passive** são os dois modelos de HA. Active-active roda todos os servidores servindo tráfego simultaneamente — melhor pra performance. Active-passive mantém servidores reservas parados até um primário falhar — mais simples mas desperdiça recursos.`,
      realWorldExample: 'A API do TikTok roda em milhares de instâncias atrás de load balancers. Quando uma instância cai (ex: estouro de memória), é removida do pool em segundos e uma nova sobe. Usuários nunca veem a falha. O algoritmo exato é proprietário, mas os padrões são universais — a mesma lógica alimenta toda CDN, LB de nuvem e API gateway que você vai tocar.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Prática 1: Escolha o Algoritmo',
        question: 'A API do TikTok tem 3 servidores. Alguns pedidos levam 50ms (buscar perfil), outros 5s (gerar recomendações). Qual algoritmo de load balancing serve melhor?',
        options: [
          { text: 'Round-robin — simples e previsível', feedback: 'Round-robin não considera carga ativa — um servidor preso em pedidos lentos ainda recebe sua parte de novos.' },
          { text: 'Least connections — se adapta a quais servidores estão realmente ocupados', feedback: 'Isso! Tempos variáveis de pedido é exatamente o cenário pra least-connections. Servidores presos em trabalho lento recebem menos novos até alcançarem.', correct: true },
          { text: 'Aleatório — distribui igualmente ao longo do tempo', feedback: 'Aleatório é estatisticamente parecido com round-robin mas não se adapta à carga real.' },
          { text: 'IP hash — sessões stick pra localidade de cache', feedback: 'IP hash é pra localidade de cache, não pra distribuição de carga com tempos variáveis.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Prática 2: Ordene Eventos de Failover',
        description: 'Arraste os eventos na ordem que ocorrem quando 1 dos 3 servidores de API do TikTok cai.',
        items: [
          'Servidor 1 recebe 50% mais tráfego; servidor 3 recebe 50% mais tráfego',
          'Servidor 2 para de responder pedidos',
          'LB remove servidor 2 do pool ativo',
          'Health check pinga servidor 2 — falha',
          'Depois de N health checks consecutivos falhos, LB declara servidor 2 unhealthy'
        ],
        correctOrder: [1, 3, 4, 2, 0],
        feedback: 'Servidor cai primeiro, depois health checks começam a falhar, depois o LB declara unhealthy depois de um limite, remove do pool, e os restantes absorvem a carga redistribuída.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Prática 3: Trace Round-Robin',
        instructions: 'O que esse logger de round-robin imprime?',
        code: `function roundRobin(servers, requestIndex) {
  return servers[requestIndex % servers.length];
}

console.log(roundRobin(['A', 'B', 'C'], 0));
console.log(roundRobin(['A', 'B', 'C'], 4));`,
        question: 'Quais os dois valores que aparecem?',
        options: [
          { text: '"A" e "B"', feedback: 'Isso! 0 % 3 = 0 → "A", e 4 % 3 = 1 → "B". Round-robin dá a volta limpinho.', correct: true },
          { text: '"A" e "A"', feedback: '4 % 3 = 1, que mapeia pra "B", não "A".' },
          { text: '"A" e "C"', feedback: '4 % 3 = 1 → "B", não "C" (que seria índice 2).' },
          { text: '"B" e "A"', feedback: 'Índice de pedido 0 mapeia pra servers[0] = "A", não "B".' }
        ],
        feedback: 'O operador módulo é o ingrediente secreto do round-robin — ele cicla pelos índices pra sempre conforme o contador de pedidos cresce.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'Seletor Round-Robin',
        instructions: [
          'Escreva roundRobin(servers, requestIndex) que retorna o servidor pra um índice de pedido dado',
          'Use módulo pra dar a volta quando requestIndex exceder servers.length',
          'Exemplo: roundRobin(["A","B","C"], 3) → "A" (volta pro início)'
        ],
        sampleCode: `function roundRobin(servers, requestIndex) {
  // TODO: retorna o servidor no índice (requestIndex mod servers.length)
}`,
        solution: `function roundRobin(servers, requestIndex) {
  return servers[requestIndex % servers.length];
}`,
        tests: [
          { input: 'roundRobin(["A","B","C"], 0)', expected: 'A', desc: 'primeiro pedido vai pro primeiro servidor' },
          { input: 'roundRobin(["A","B","C"], 1)', expected: 'B', desc: 'segundo pedido vai pro segundo servidor' },
          { input: 'roundRobin(["A","B","C"], 3)', expected: 'A', desc: 'volta pro primeiro servidor no índice 3' }
        ],
        hints: [
          'Use o operador módulo: requestIndex % servers.length',
          'Isso dá um índice de 0 a servers.length - 1',
          'Retorna servers[index]'
        ]
      },
      {
        level: 2,
        title: 'Seletor Least Connections',
        instructions: [
          'Escreva leastConnections(servers) onde cada servidor é {name, connections}',
          'Retorna o nome do servidor com menos conexões ativas',
          'Se tem empate, retorna o primeiro encontrado'
        ],
        sampleCode: `function leastConnections(servers) {
  // TODO: retorna o nome do servidor com menor .connections
}`,
        solution: `function leastConnections(servers) {
  let best = servers[0];
  for (const s of servers) {
    if (s.connections < best.connections) best = s;
  }
  return best.name;
}`,
        tests: [
          { input: 'leastConnections([{name:"A",connections:5},{name:"B",connections:2},{name:"C",connections:8}])', expected: 'B', desc: 'pega servidor com menos conexões' },
          { input: 'leastConnections([{name:"X",connections:0}])', expected: 'X', desc: 'servidor único sempre é selecionado' },
          { input: 'leastConnections([{name:"A",connections:3},{name:"B",connections:3}])', expected: 'A', desc: 'empates vão pro primeiro encontrado' }
        ],
        hints: [
          'Inicializa best como o primeiro servidor do array',
          'Loopa por todos os servidores e atualiza best se achar menos conexões',
          'Menor-que estrito garante que empates mantêm o primeiro encontrado'
        ]
      },
      {
        level: 3,
        title: 'Round-Robin Ponderado',
        instructions: [
          'Escreva weightedSelect(servers, requestIndex) onde servers são [{name, weight}]',
          'Servidor com peso 3 recebe 3 slots consecutivos; peso 1 recebe 1 slot',
          'Monta a lista expandida de slots, depois usa módulo no peso total pra selecionar',
          'Exemplo: [{name:"A",weight:3},{name:"B",weight:1}] → slots ["A","A","A","B"]. Índices 0,1,2 → "A", índice 3 → "B", índice 4 → "A" (volta)'
        ],
        sampleCode: `function weightedSelect(servers, requestIndex) {
  // TODO: expande servers numa lista de slots por peso
  // depois retorna slots[requestIndex % slots.length]
}`,
        solution: `function weightedSelect(servers, requestIndex) {
  const slots = [];
  for (const s of servers) {
    for (let i = 0; i < s.weight; i++) {
      slots.push(s.name);
    }
  }
  return slots[requestIndex % slots.length];
}`,
        tests: [
          { input: 'weightedSelect([{name:"A",weight:2},{name:"B",weight:1}],0)', expected: 'A', desc: 'primeiro slot vai pro A com peso' },
          { input: 'weightedSelect([{name:"A",weight:2},{name:"B",weight:1}],2)', expected: 'B', desc: 'terceiro slot vai pro B (depois A pegar 2)' },
          { input: 'weightedSelect([{name:"A",weight:3},{name:"B",weight:1}],3)', expected: 'B', desc: 'índice 3 é B na razão 3:1' }
        ],
        hints: [
          'Monta o array de slots adicionando cada nome de servidor .weight vezes',
          'Depois usa módulo pra round-robin na lista expandida de slots',
          'Loop aninhado: externo pelos servidores, interno de 0 a s.weight - 1'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Final Load Balancing: Selecionar + Raciocinar',
      steps: [
        {
          type: 'coding',
          title: 'Implementar Round-Robin',
          instructions: 'Escreva roundRobin(servers, requestIndex) que retorna servers[requestIndex % servers.length].',
          sampleCode: `function roundRobin(servers, requestIndex) {
  // TODO
}`,
          solution: `function roundRobin(servers, requestIndex) {
  return servers[requestIndex % servers.length];
}`,
          tests: [
            { input: 'roundRobin(["A","B","C"],0)', expected: 'A', desc: 'primeiro servidor' },
            { input: 'roundRobin(["A","B","C"],5)', expected: 'C', desc: 'volta com módulo' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'O TikTok roda 4 servidores de API, cada um capaz de aguentar 1000 pedidos/segundo. Estão na média de 2500 RPS na frota toda. Qual o risco se reduzirem pra 3 servidores?',
          options: [
            { text: 'Nenhum risco — 3 servidores × 1000 RPS = 3000 RPS de capacidade, mais que a média de 2500', feedback: 'Média não é pico. Picos de tráfego podem ir muito além da média, e você também precisa de margem pra um servidor falhar.' },
            { text: 'Você perde redundância N-1 — se 1 dos 3 cair, os 2 restantes têm que aguentar 2500 RPS mas só têm 2000 RPS de capacidade → falhas pro usuário', feedback: 'Isso! Alta disponibilidade exige capacidade pra operação N-1 (ou N-2). 4 servidores significa que 1 pode falhar e 3 ainda aguentam; 3 servidores significa que 1 falha aleija o sistema.', correct: true },
            { text: 'O load balancer vai se recusar a rotear pra menos de 4 servidores', feedback: 'Load balancers não impõem tamanho mínimo de pool — isso é sua responsabilidade operacional.' },
            { text: 'Não tem diferença entre 3 e 4 servidores', feedback: 'Tem sim — tanto em custo quanto em tolerância a falhas.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'O TikTok tá se preparando pra um momento viral — um trend tá explodindo. Tráfego pode aumentar 10x em minutos. Projeta a estratégia de load balancing e escala pra sobreviver.',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre como apps gigantes funcionam por trás. Use TikTok, Instagram, Discord, Roblox, Netflix, Spotify como exemplos. Explique sistemas complexos com analogias que eles entendem. Sem jargão desnecessário.'
    },
    resources: [
      { title: 'Métodos de Load Balancing do NGINX', url: 'https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/' },
      { title: 'AWS Elastic Load Balancing — Algoritmos', url: 'https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html' },
      { title: 'Padrões de Alta Disponibilidade — ByteByteGo', url: 'https://blog.bytebytego.com/' }
    ]
  },

  // ─── LESSON 10 ───────────────────────────────────────────────────────────────
  {
    id: 'sd-10-case-study',
    title: 'Caso Real: Vamos projetar um TikTok do zero',
    week: 10,
    xp: 100,
    difficulty: 'Advanced',
    priority: '⭐⭐',
    hook: 'Vamos projetar um TikTok do zero. Quantos servidores? Quanto de storage? Bora calcular. Esse é o capstone — pega tudo que você aprendeu e desenha o app gigante todo.',

    assess: {
      type: 'multipleChoice',
      question: 'Um TikTok precisa suportar 100 milhões de vídeos vistos por dia globalmente. Qual a decisão arquitetural mais importante pra acertar?',
      options: [
        { text: 'Escolher o banco mais rápido — performance é tudo', feedback: 'O gargalo não é o banco em si — é entregar vídeo (gigabytes) pra todo lugar do mundo com baixa latência. CDN é a chave.' },
        { text: 'CDN global pra entregar vídeo de servidores próximos do usuário, e processamento de vídeo em fila pra uploads não bloquearem usuários', feedback: 'Isso! A restrição mais difícil de um TikTok é entregar vídeo pesado pra todo lugar com baixa latência. CDN + filas de processamento isolam os usuários da complexidade.', correct: true },
        { text: 'Usar microsserviços do primeiro dia — dividir cada feature em serviço', feedback: 'Dividir cedo demais mata times pequenos. Começa com monolito e fila; extrai quando a dor justificar.' },
        { text: 'Otimizar o frontend React pra velocidade', feedback: 'Frontend raramente é gargalo num app de vídeo — o backend lidando com entrega de gigabytes é.' }
      ]
    },

    learn: {
      hook: 'Tudo que você estudou — cliente-servidor, REST, cache, escala, filas, eventos, microsserviços, load balancing — junta num TikTok. Essa lição é seu tour de design end-to-end: números reais, trade-offs reais, arquitetura real.',
      conceptVideo: {
        url: 'https://www.youtube.com/c/ByteByteGo',
        title: 'ByteByteGo — Estudos de Caso de Design de Sistemas',
        duration: 'Navegar',
        yourTakeaway: 'Assista 2-3 estudos de caso (Twitter, Instagram, Netflix). Repara como todo sistema usa os mesmos blocos de construção que você aprendeu — só compostos diferente.'
      },
      conceptText: `**O problema (capstone):** Projeta um TikTok que aguenta 100 milhões de vídeos vistos por dia. Cada vídeo tem ~10MB. Usuários upam vídeos novos o tempo todo. App tem que abrir rápido em qualquer lugar do mundo.

**Passo 1 — Estimativa de capacidade.** É aqui que a maioria dos engenheiros pula direto pro design e erra. Faz as contas:
- 100M vídeos vistos/dia ÷ 86.400 seg = ~1.157 views/segundo na média
- Pico (3x média) ≈ 3.500 views/segundo
- Storage por vídeo: 10MB. Com 1M de uploads/dia × 10MB × 365 dias = ~3.6 PB/ano (petabytes!)
- Bandwidth: 100M views × 10MB = 1 PB/dia
- Os números dizem: É problema de **largura de banda e armazenamento**, não de banco.

**Passo 2 — Identifica as restrições reais.** Entregar vídeo é:
- **Pesado** (10MB+ por vídeo, vs ~50KB por post de texto)
- **Global** (usuário no Brasil quer ver vídeo do Japão sem esperar 30s)
- **Frequente** (todo mundo assiste vários vídeos seguidos)
- **Pesado em escrita** (milhões de uploads novos por dia)

Essas restrições — não carga pura — dirigem a arquitetura.

**Passo 3 — Arquitetura de alto nível:**

Usuário abre app → CDN entrega o app + vídeos cacheados (a maioria) → API Gateway → vários serviços (auth, feed, vídeo, recomendação) → bancos shardados + Redis caches → Fila pra upload de vídeo → Workers processam (comprimir, thumbnail, moderação por IA) → Vídeo finalizado é salvo no storage e propagado pra CDN global.

**Componentes e por que cada um:**
- **CDN global** — entrega vídeo de servidores próximos do usuário (Cloudflare, CloudFront)
- **API Gateway** — único ponto de entrada que cuida de auth, rate limiting, roteamento
- **Serviços (monolito ou microsserviços)** — feed, recomendação, perfil, vídeo
- **Banco shardado por user_id** — cada shard cuida de uma faixa de usuários
- **Redis cache** — feeds personalizados, dados de sessão, contadores de rate limit
- **Fila + workers** — processamento de vídeo (compressão, thumbnail, moderação por IA)
- **Object storage** — onde os vídeos reais ficam (S3, Google Cloud Storage)
- **DLQ + alertas** — jobs falhos vão pra DLQ; alertas no Slack/PagerDuty em volume alto

**Passo 4 — Identifica gargalos:**
- O link mais lento é entrega de vídeo. CDN é não-negociável.
- Banco raramente é gargalo até centenas de milhões de usuários; aí precisa shardar.
- Processamento de vídeo (IA de moderação) é caro — workers precisam escalar independentemente.

**Passo 5 — Planeja modos de falha:**
- **CDN regional fora** → CDN backup em outras regiões absorve carga.
- **Banco fora** → API retorna 503; usuários veem UI graceful "tente de novo".
- **Worker crasha no meio do job** → entrega "pelo menos uma vez" significa que o job é retentado; projeta pra idempotência (não duplica vídeo se o job rodar duas vezes).
- **Pico de tráfego (momento viral)** → autoscaling sobe instâncias; fila absorve o pico; workers processam em ritmo sustentável.

**Passo 6 — Planeja crescimento.** O que muda em 10x e 100x escala?
- Em 10x: adiciona mais shards de banco, mais workers de processamento, mais POPs de CDN.
- Em 100x: extrai serviços críticos em times próprios, considera bancos especializados pra cada caso (timeseries pra views, gráfico pra rede social).

**A lição do design de sistemas:** a resposta certa quase nunca é "a arquitetura mais sofisticada". É "a arquitetura mais simples que aguenta suas restrições reais, com caminhos claros pra upgrade quando essas restrições mudarem". O TikTok não precisa de Kafka, Kubernetes e service mesh no dia 1 — mas a arquitetura deixa espaço pra eles quando os números exigirem.`,
      realWorldExample: 'O TikTok real começou pequeno (Musical.ly) e cresceu pra 1 bilhão de usuários. A arquitetura evoluiu por etapas: começou monolítico, depois extraíram processamento de vídeo, depois recomendação por IA, depois infraestrutura global de CDN. Lição: a maioria do "design de sistemas" que você lê assume problemas escala-Netflix, mas a maioria dos produtos nunca chega lá — e over-engineering pequenos produtos é um dos modos de falha mais comuns. Domina os blocos de construção, depois aplica em proporção às restrições reais.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Prática 1: Identifique o Gargalo',
        question: 'O monitoramento do TikTok mostra: tempo de query no banco média 50ms, tempo de resposta da API média 2000ms, latência de rede pro CDN 200ms. Onde você otimiza primeiro?',
        options: [
          { text: 'O banco — 50ms tá muito lento', feedback: '50ms tá ótimo pra query de banco. Os 2000ms totais são dominados por outra coisa.' },
          { text: 'As chamadas da API — elas representam a maior parte dos 2000ms', feedback: 'Isso! 50ms banco + 200ms rede = 250ms contabilizados. Os ~1750ms restantes são tempo de processamento da API — é aí que tá o gargalo, e a resposta é fazer essas chamadas assíncronas via fila.', correct: true },
          { text: 'Latência de rede — reduz com cache de borda', feedback: 'RTT de rede de 200ms não é o custo dominante em resposta de 2000ms.' },
          { text: 'Adiciona mais servidores', feedback: 'Adicionar capacidade não ajuda quando cada pedido é lento — só deixa você lidar com mais pedidos lentos em paralelo.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Prática 2: Etapas de Estimativa de Capacidade',
        description: 'Ordena as etapas que um engenheiro sênior segue quando dimensiona um sistema.',
        items: [
          'Escolhe arquitetura que serve o gargalo (não a carga total)',
          'Calcula pedidos por segundo na média',
          'Identifica a restrição dominante (carga, rate limits, confiabilidade, etc.)',
          'Começa com os requisitos do produto (usuários, ações por usuário, crescimento)',
          'Aplica multiplicador de pico (tipicamente 3x média)'
        ],
        correctOrder: [3, 1, 4, 2, 0],
        feedback: 'Sempre começa com requisitos do produto, deriva a matemática de carga, identifica a restrição real, e só então escolhe arquitetura. A maioria dos engenheiros pula direto pra arquitetura e projeta pro problema errado.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Prática 3: Trace Estimativa de Storage',
        instructions: 'O TikTok estima storage pra um ano de vídeos. Trace por esse cálculo.',
        code: `function estimateStorage(postsPerDay, avgSizeKB, retentionDays) {
  return postsPerDay * avgSizeKB * 1000 * retentionDays;
}

console.log(estimateStorage(1000, 50, 365));`,
        question: 'O que aparece no console?',
        options: [
          { text: '18250000000', feedback: 'Isso! 1000 × 50 × 1000 × 365 = 18.250.000.000 bytes ≈ 18 GB/ano.', correct: true },
          { text: '18250000', feedback: 'Você esqueceu de multiplicar por retentionDays (365).' },
          { text: '50000', feedback: 'Isso é só postsPerDay × avgSizeKB — incompleto.' },
          { text: '1825000', feedback: 'Você esqueceu de multiplicar KB por 1000 pra virar bytes.' }
        ],
        feedback: 'Estimativa de capacidade revela rápido o que importa e o que não. Pra um TikTok real com vídeos de 10MB, esse número viraria petabytes.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'Estimar Storage',
        instructions: [
          'Escreva estimateStorage(postsPerDay, avgSizeKB, retentionDays)',
          'Retorna total de bytes: postsPerDay × avgSizeKB × 1000 × retentionDays',
          '(Tratando 1 KB = 1000 bytes pra estimativa simples)'
        ],
        sampleCode: `function estimateStorage(postsPerDay, avgSizeKB, retentionDays) {
  // TODO: retorna total de bytes
}`,
        solution: `function estimateStorage(postsPerDay, avgSizeKB, retentionDays) {
  return postsPerDay * avgSizeKB * 1000 * retentionDays;
}`,
        tests: [
          { input: 'estimateStorage(1000,50,365)', expected: 18250000000, desc: '1000 posts × 50KB × 365 dias = 18.25GB' },
          { input: 'estimateStorage(1,1,1)', expected: 1000, desc: 'mínimo: 1 post × 1KB × 1 dia = 1000 bytes' },
          { input: 'estimateStorage(10000,100,30)', expected: 30000000000, desc: '10k posts × 100KB × 30 dias = 30GB' }
        ],
        hints: [
          'Multiplica todos os quatro valores',
          'O * 1000 converte KB pra bytes',
          'Não precisa de variáveis intermediárias — uma única expressão de return funciona'
        ]
      },
      {
        level: 2,
        title: 'Calcular Vazão',
        instructions: [
          'Escreva calcThroughput(requestsPerDay) que retorna {rps, peakRps}',
          'rps = Math.round(requestsPerDay / 86400) — pedidos por segundo na média (86400 segundos no dia)',
          'peakRps = 3 × rps — carga de pico tipicamente é 3x a média'
        ],
        sampleCode: `function calcThroughput(requestsPerDay) {
  // TODO: retorna { rps, peakRps }
  // rps = round(requestsPerDay / 86400)
  // peakRps = 3 * rps
}`,
        solution: `function calcThroughput(requestsPerDay) {
  const rps = Math.round(requestsPerDay / 86400);
  return { rps, peakRps: 3 * rps };
}`,
        tests: [
          { input: 'JSON.stringify(calcThroughput(86400))', expected: '{"rps":1,"peakRps":3}', desc: '1 RPS média, 3 RPS pico' },
          { input: 'JSON.stringify(calcThroughput(8640000))', expected: '{"rps":100,"peakRps":300}', desc: '100 RPS média, 300 RPS pico' },
          { input: 'calcThroughput(864000).peakRps', expected: 30, desc: '10 RPS × 3 = 30 RPS pico' }
        ],
        hints: [
          'Use Math.round pra ter RPS inteiro',
          'Tem 86400 segundos no dia (24 × 60 × 60)',
          'peakRps é só 3 * rps'
        ]
      },
      {
        level: 3,
        title: 'Identificar o Gargalo',
        instructions: [
          'Escreva identifyBottleneck(metrics) onde metrics é {dbQueryTime, apiLatency, networkRtt}',
          'Retorna "database", "api" ou "network" — o que tem o maior valor',
          'É assim que você decide o que otimizar primeiro num design de sistema'
        ],
        sampleCode: `function identifyBottleneck(metrics) {
  // TODO: retorna o nome do componente mais lento
  // "database" | "api" | "network"
}`,
        solution: `function identifyBottleneck(metrics) {
  const map = {
    database: metrics.dbQueryTime,
    api: metrics.apiLatency,
    network: metrics.networkRtt
  };
  let worst = 'database';
  for (const key in map) {
    if (map[key] > map[worst]) worst = key;
  }
  return worst;
}`,
        tests: [
          { input: 'identifyBottleneck({dbQueryTime:800,apiLatency:50,networkRtt:20})', expected: 'database', desc: 'banco é o mais lento' },
          { input: 'identifyBottleneck({dbQueryTime:50,apiLatency:2000,networkRtt:200})', expected: 'api', desc: 'api é a mais lenta' },
          { input: 'identifyBottleneck({dbQueryTime:10,apiLatency:20,networkRtt:500})', expected: 'network', desc: 'rede é a mais lenta' }
        ],
        hints: [
          'Monta um mapa nome → valor, depois acha a chave com maior valor',
          'Itera pelas chaves do mapa e rastreia o "pior" atual',
          'Maior-que estrito garante que empates mantêm a primeira chave vista'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Final Capstone: Estimar + Projetar',
      steps: [
        {
          type: 'coding',
          title: 'Estimativa de Capacidade',
          instructions: 'Escreva calcThroughput(requestsPerDay) que retorna {rps, peakRps} onde rps é a média arredondada por segundo e peakRps é 3× isso.',
          sampleCode: `function calcThroughput(requestsPerDay) {
  // TODO
}`,
          solution: `function calcThroughput(requestsPerDay) {
  const rps = Math.round(requestsPerDay / 86400);
  return { rps, peakRps: 3 * rps };
}`,
          tests: [
            { input: 'calcThroughput(86400).rps', expected: 1, desc: '1 RPS pra 86400 pedidos/dia' },
            { input: 'calcThroughput(8640000).peakRps', expected: 300, desc: '300 RPS pico pra 100 RPS média' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Você tá projetando um TikTok v2 pra 1 bilhão de usuários (= 10 bilhões de views/dia, ~115k views/seg média, ~350k pico). Qual a mudança arquitetural mais importante vs o monolito v1?',
          options: [
            { text: 'Reescreve tudo em Go pra performance', feedback: 'Escolha de linguagem raramente é o gargalo num sistema gargalado em entrega de vídeo e CDN. Não reescreve — evolui.' },
            { text: 'Extrai recomendação de vídeo, processamento de upload, e entrega de vídeo em serviços independentes com escala independente e domínios de falha isolados', feedback: 'Isso! Nessa escala, esses componentes têm necessidades de escala muito diferentes. Extrair eles deixa cada time ser dono da sua parte, escalar independente, e evita que lentidão de um afete os outros.', correct: true },
            { text: 'Migra pra um banco NoSQL pra "melhor escala"', feedback: 'O gargalo nessa escala é entrega de vídeo (largura de banda), não banco — NoSQL não resolve isso.' },
            { text: 'Adiciona um segundo load balancer na frente do primeiro', feedback: 'Empilhar load balancers não resolve a restrição real, que é entrega global de vídeo.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Caminha pela arquitetura end-to-end de um TikTok como se você tivesse apresentando numa entrevista de design de sistemas. Começa com os requisitos do produto, faz as contas de capacidade, identifica as restrições reais, desenha a arquitetura, e explica como ela evolui em 10x e 100x escala.',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre como apps gigantes funcionam por trás. Use TikTok, Instagram, Discord, Roblox, Netflix, Spotify como exemplos. Explique sistemas complexos com analogias que eles entendem. Sem jargão desnecessário.'
    },
    resources: [
      { title: 'System Design Primer (GitHub) — Leitura do Capstone', url: 'https://github.com/donnemartin/system-design-primer' },
      { title: 'ByteByteGo — Newsletter de Design de Sistemas', url: 'https://blog.bytebytego.com/' },
      { title: 'Designing Data-Intensive Applications — Kleppmann (livro)', url: 'https://dataintensive.net/' }
    ]
  },
];
