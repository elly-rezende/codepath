// Portuguese translations for curriculum content
// Keys match lesson IDs from curriculum.js

export const lessonsPt = {
  // CS Fundamentals
  "big-o-intro": {
    title: "O Que Big O Realmente Significa",
    hook: "Toda vez que você escreve um loop dentro de outro loop, está criando um problema O(n²) — e em produção, isso pode derrubar sua API.",
    concept: `A notação Big O não é sobre velocidade exata — é sobre como seu código escala conforme a entrada cresce. Pense assim: se você está procurando um amigo em uma festa de 10 pessoas, checar todo mundo um por um é tranquilo. Mas em um festival com 100.000 pessoas? Essa mesma abordagem é um desastre.

Quando dizemos que um algoritmo é O(n), queremos dizer que o tempo cresce linearmente com a entrada. Dobra os dados, dobra o tempo. O(n²) significa dobra os dados, quadruplica o tempo — esse é o seu loop aninhado. O(1) significa que leva o mesmo tempo independente do tamanho — como acessar um array por índice.

Impacto real: aquela query do Supabase que você escreveu fazendo join de duas tabelas e filtrando? Se está fazendo isso em um loop no lado do cliente em vez de deixar o Postgres cuidar, pode estar transformando uma operação O(n) do banco em processamento O(n²) no JavaScript. O banco é otimizado pra isso. Deixe ele fazer o trabalho.`,
  },
  "big-o-practice": {
    title: "Big O na Prática: Medindo Performance Real",
    hook: "Saber a teoria de Big O é uma coisa — ver um slowdown de 1000x no console do navegador é outra história.",
    concept: `Vamos da teoria para a prática. A melhor forma de internalizar Big O é sentir na pele. Quando você roda um algoritmo O(n²) em 10 itens, é instantâneo. Em 10.000 itens, você espera. Em 1.000.000 itens, está reiniciando o navegador.

Aqui está o que a maioria dos tutoriais pula: Big O descreve o pior caso, e descarta constantes. O(2n) ainda é O(n). O(n² + n) ainda é O(n²) porque conforme n cresce, o n² domina. É por isso que um algoritmo O(n) "mais lento" pode ganhar de um O(n log n) "mais rápido" em entradas pequenas — as constantes importam quando n é pequeno.

Nos seus apps React, isso aparece em todo lugar. Filtrar uma lista em um useEffect? Isso é O(n). Filtrar e depois ordenar? O(n log n). Fazer uma comparação aninhada pra achar duplicatas entre duas listas? O(n × m). Quando seu componente re-renderiza a cada tecla e roda essa lógica, você sente.`,
  },
  "arrays-objects-maps": {
    title: "Arrays, Objects e Maps: Escolhendo a Ferramenta Certa",
    hook: "Usar um array quando você precisa de um Map é como procurar em cada gaveta da casa pelas chaves — quando poderia colocar um gancho na porta.",
    concept: `Em JavaScript, arrays, objetos e Maps armazenam coleções de dados, mas têm características de performance totalmente diferentes. Entender quando usar qual é uma habilidade que separa quem escreve código de quem escreve código eficiente.

Arrays são listas ordenadas. Ótimos para sequências, filas, pilhas. Acesso por índice é O(1). Busca por valor? O(n) — precisa checar cada elemento. Pense nos resultados de query do Supabase: voltam como arrays porque a ordem importa.

Objetos (e Maps) são armazenamentos chave-valor. Acesso por chave é O(1) — instantâneo. Por isso, quando precisa buscar com frequência, você converte seu array em um objeto indexado por ID. Em vez de users.find(u => u.id === 5), usa usersById[5]. Mesmo resultado, performance dramaticamente diferente em escala.

Maps são como objetos mas melhores para adições/remoções frequentes, podem usar qualquer tipo como chave (não apenas strings) e mantêm a ordem de inserção. Use Map quando estiver construindo caches, rastreando estado ou contando ocorrências.`,
  },

  // Frontend Mastery
  "html-semantics": {
    title: "HTML Semântico: Por Que Divs Não São Suficientes",
    hook: "Um usuário de leitor de tela tentou navegar seu site e tudo é uma div. Não faz ideia do que é nav, o que é artigo, ou onde o conteúdo principal começa.",
    concept: `HTML semântico é sobre usar a tag certa pro trabalho. Não é decoração — afeta diretamente acessibilidade, SEO e a facilidade de manutenção do código.

Quando você usa <div> pra tudo, está dizendo ao navegador "isso é um container genérico." Quando usa <nav>, está dizendo "isso é navegação." Leitores de tela podem pular direto para a navegação, conteúdo principal, ou rodapé — mas apenas se você usar as tags certas.

Pense nos elementos semânticos como funções no código. Uma função chamada doStuff() não diz nada. Uma chamada validateUserEmail() diz exatamente o que faz. Igualmente, <div class="nav"> é um container genérico com um nome de classe, mas <nav> é um elemento de navegação com significado embutido que navegadores, leitores de tela e motores de busca entendem.`,
  },
  "css-flexbox-grid": {
    title: "Flexbox vs Grid: Quando Usar Qual",
    hook: "Você tem usado flexbox pra tudo, incluindo layouts que levariam 2 linhas com CSS Grid. Vamos corrigir isso.",
    concept: `Flexbox e Grid resolvem problemas diferentes. Flexbox é unidimensional — ótimo pra distribuir itens em uma linha ou coluna. Grid é bidimensional — perfeito pra layouts com linhas E colunas.

Regra prática: se seus itens fluem em uma direção (navbar, botões em linha, lista vertical), use Flexbox. Se precisa alinhar coisas em ambas direções (layouts de dashboard, galerias de fotos, designs de página inteira), use Grid.

Onde a maioria erra: usar flexbox pra um layout 3x3 de cards. Com flexbox, você está hackeando com flex-wrap e porcentagens. Com Grid, são 3 linhas: display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem. Pronto.`,
  },
  "async-await": {
    title: "Como async/await Realmente Funciona",
    hook: "Você usa async/await todo dia nas chamadas do Supabase, mas sabe o que acontece entre o await e a resposta? Entender isso muda como você escreve componentes React.",
    concept: `async/await é açúcar sintático sobre Promises, que são em si uma forma de lidar com operações assíncronas. Quando você escreve await supabase.from('posts').select(), está dizendo "pause esta função aqui até o banco de dados responder, mas deixe o resto do app continuar rodando."

Isso é crucial pra entender: await não bloqueia toda a aplicação. Só pausa a função async atual. Seu handler de clique em botão, suas animações, suas outras chamadas de API — tudo continua. É por isso que suas chamadas Supabase não congelam a UI.

Armadilha comum: awaits sequenciais quando poderiam ser paralelos. Se precisa de dados de usuário E de posts, não espere o usuário terminar antes de buscar posts. Use Promise.all([fetchUser(), fetchPosts()]) — ambas requests disparam simultaneamente, e você espera só pelo mais lento.`,
  },

  // Backend Fundamentals
  "http-apis": {
    title: "HTTP & APIs: A Linguagem da Web",
    hook: "Toda vez que seu app React conversa com o Supabase, está falando HTTP. Entender este protocolo significa parar de adivinhar por que requests falham e começar a saber.",
    concept: `HTTP é o protocolo que alimenta a web. Todo formulário que você envia, toda imagem que carrega, toda chamada de API — é HTTP. Entendê-lo desmistifica a maior parte do desenvolvimento backend.

Uma request HTTP tem: um método (GET, POST, PUT, DELETE), uma URL, headers (metadados como autenticação), e opcionalmente um body (os dados que está enviando). A resposta volta com um código de status (200 = ok, 404 = não encontrado, 500 = servidor quebrou), headers e um body.

REST é um padrão pra organizar APIs HTTP. Quando você faz supabase.from('posts').select(), está fazendo GET /rest/v1/posts por baixo. supabase.from('posts').insert({title: 'Olá'}) é POST /rest/v1/posts com um body JSON. Entender isso significa que você pode debugar requests de rede, construir suas próprias APIs, e entender qualquer documentação de API que encontrar.`,
  },
  "sql-joins": {
    title: "SQL JOINs Explicados (com Supabase)",
    hook: "Você tem feito múltiplas queries no Supabase e combinando os dados em JavaScript. Um JOIN teria sido mais rápido, mais limpo e usado menos banda.",
    concept: `JOINs são como você conecta dados relacionados em SQL. Em vez de buscar posts, depois buscar o autor de cada post separadamente (N+1 queries — uma armadilha clássica de performance), um JOIN busca tudo de uma vez.

No Supabase, JOINs parecem assim: supabase.from('posts').select('*, author:users(name, avatar)'). Isso diz "me dê todos os posts, e pra cada post, inclua o nome e avatar do autor da tabela users."

Há diferentes tipos de JOIN: INNER JOIN (só registros que batem em ambas tabelas), LEFT JOIN (todos da esquerda, registros que batem da direita), RIGHT JOIN (oposto), FULL JOIN (tudo de ambos). O Supabase usa LEFT JOIN por padrão na sintaxe select, o que é geralmente o que você quer — "me dê todos os posts mesmo se o autor de algum foi deletado."`,
  },
  "auth-security": {
    title: "Auth & Segurança: O Que Realmente Acontece Quando Você Faz Login",
    hook: "Você implementou Supabase Auth nos seus apps, mas sabe o que é um JWT, por que tokens expiram, ou o que impede alguém de simplesmente editar seu user ID em uma request?",
    concept: `Autenticação (quem é você) e autorização (o que pode fazer) são os dois pilares da segurança web. Quando você faz login com Supabase Auth, várias coisas acontecem:

1. Suas credenciais vão pro servidor de auth. 2. O servidor verifica e cria um JWT (JSON Web Token) — uma string codificada em base64 contendo seu user_id, role, e tempo de expiração. 3. Esse token é armazenado no navegador e enviado com toda request.

O JWT é assinado com uma chave secreta que só o servidor conhece. Então embora qualquer um possa ler o conteúdo do token (é só base64, não criptografia), eles não podem modificá-lo sem invalidar a assinatura. É por isso que ninguém pode mudar o user_id no token — o servidor detectaria a adulteração.

Row Level Security (RLS) do Supabase usa esse JWT pra aplicar regras no nível do banco de dados. Quando você escreve uma política como "users só podem ver suas próprias linhas", Postgres verifica o auth.uid() do JWT contra a coluna user_id em toda query. Isso significa que mesmo que seu código frontend tenha um bug, o banco não vai vazar dados.`,
  },

  // DevOps Essentials
  "git-internals": {
    title: "Git Além do Básico: Entendendo o DAG",
    hook: "Você usa git add, commit, push todo dia. Mas quando um conflito de merge aparece ou precisa fazer rebase, você trava — porque não entende o que o Git realmente está fazendo.",
    concept: `Git não é uma lista de mudanças — é um grafo direcionado acíclico (DAG) de snapshots. Cada commit é um snapshot completo do seu projeto, apontando para seu(s) commit(s) pai(s). Uma branch é apenas um ponteiro para um commit.

Quando você faz 'git merge feature', Git encontra o ancestral comum, calcula os diffs, e cria um novo commit com dois pais. Quando faz 'git rebase feature', Git pega seus commits, os "descola" da branch antiga, e os "reaplica" em cima da nova base — criando commits completamente novos com hashes novos.

É por isso que rebase reescreve a história. Os commits antigos ainda existem (Git quase nunca deleta nada), mas sua branch agora aponta para os novos. Isso é limpo para branches de feature, mas perigoso para branches compartilhadas — se outra pessoa tem os commits antigos, a história dela diverge da sua.`,
  },
  "cicd-concepts": {
    title: "O Que Acontece Quando Você Clica em Deploy",
    hook: "Você faz push pra main, Vercel mostra um check verde, e seu site está no ar. Mas o que aconteceu nesses 45 segundos? Entender esse pipeline te torna perigoso.",
    concept: `CI/CD (Integração Contínua / Deploy Contínuo) é a automação que transforma um push de código em um site ao vivo. Veja o que acontece quando você faz push pra main no Vercel:

1. GitHub envia um webhook pro Vercel: "Ei, código novo no main." 2. Vercel clona seu repo e roda o build (npm run build). 3. Se o build funciona, Vercel distribui os arquivos estáticos pra CDNs globais. 4. O DNS é atualizado pra apontar pro novo deploy.

Integração Contínua é a parte de "rodar testes e build em todo push." Impede que código quebrado chegue em produção. Deploy Contínuo é a parte de "automaticamente fazer deploy se os testes passam." Juntos, significam que você pode fazer merge com confiança — se está verde, está ao vivo.`,
  },
  "docker-basics": {
    title: "Docker: Por Que 'Funciona na Minha Máquina' É um Problema Resolvido",
    hook: "Seu colega não consegue rodar o projeto porque tem Node 18 e você tem Node 20. Docker elimina toda essa classe de problema.",
    concept: `Docker empacota sua aplicação com todas as suas dependências em um container — um ambiente leve e isolado que roda igualzinho em qualquer lugar. Pense nele como uma máquina virtual mas muito mais leve.

Um Dockerfile é a receita. Diz: comece com Node 20, copie meu código, instale dependências, rode o servidor. Qualquer pessoa com Docker pode construir e rodar seu app exatamente da mesma forma, independente do SO ou ferramentas instaladas.

Conceitos chave: Imagens são os templates (como classes), containers são instâncias rodando (como objetos). Layers otimizam builds — quando muda o código mas não as dependências, Docker reutiliza a layer npm install e só reconstrói as layers do código. É por isso que você COPIA package.json primeiro, depois roda install, e depois copia o resto do código.`,
  },

  // System Design
  "client-server": {
    title: "Cliente-Servidor: A Arquitetura Que Você Já Usa",
    hook: "Todo app React + Supabase que você construiu é uma aplicação cliente-servidor. Vamos garantir que você saiba explicar por quê e desenhar o diagrama.",
    concept: `A arquitetura cliente-servidor é a base de quase toda aplicação web. O cliente (seu app React rodando no navegador) faz requests para o servidor (Supabase, sua API, etc.), que processa e retorna respostas.

Isso não é apenas uma curiosidade teórica. Entender a fronteira cliente-servidor afeta toda decisão que você toma: validação deve acontecer em ambos os lados (cliente pra UX, servidor pra segurança). Dados sensíveis nunca tocam o cliente. Lógica pesada vai no servidor onde o hardware é mais potente.

Quando usa Supabase, seu "servidor" é na verdade múltiplos serviços: o banco Postgres, o servidor de Auth, o servidor de Storage, e Edge Functions. Cada um tem uma responsabilidade, um endpoint de API, e seus próprios padrões de escala.`,
  },
  "databases-vs-caches": {
    title: "Bancos de Dados vs Caches: Quando Armazenar, Quando Lembrar",
    hook: "Seu app busca o mesmo perfil de usuário em cada carregamento de página. São 50 queries idênticas ao banco por sessão. Um cache transformaria isso em 1.",
    concept: `Bancos de dados são armazenamento permanente — seus dados sobrevivem a reinicializações, falhas e deploys. Caches são armazenamento temporário — rápido de ler mas pode desaparecer a qualquer momento.

Pense em um banco de dados como seu armário de arquivos e um cache como sua mesa. O armário tem tudo organizado e seguro, mas leva tempo pra buscar algo. Sua mesa tem o que está usando agora — acesso instantâneo, mas espaço limitado.

Na prática: Supabase (Postgres) é seu banco de dados. O state do React, localStorage, ou Redis são seus caches. A estratégia de cache mais comum é "cache-aside": verifique o cache primeiro, se não estiver lá, busque no banco e armazene no cache pro próximo acesso.

Quando cachear: dados que mudam raramente e são lidos com frequência (perfis de usuário, configurações). Quando NÃO cachear: dados que devem ser atualizados em tempo real (saldos, inventário) ou dados sensíveis à segurança (permissões).`,
  },
  "rest-vs-graphql": {
    title: "REST vs GraphQL: Duas Formas de Conversar com um Servidor",
    hook: "Supabase te dá REST por padrão. Mas e se você pudesse pedir exatamente os dados que precisa em uma request, nada mais, nada menos? Essa é a promessa do GraphQL.",
    concept: `REST e GraphQL são duas abordagens para design de APIs. REST usa múltiplos endpoints (GET /users, GET /users/1/posts), cada um retornando uma estrutura de dados fixa. GraphQL usa um único endpoint onde você especifica exatamente quais campos quer.

Pros do REST: simples, cacheável, amplamente suportado (Supabase, a maioria das APIs). Funciona ótimo quando suas necessidades de dados são previsíveis. Contras do REST: over-fetching (pegar dados que não precisa) e under-fetching (precisar de múltiplas requests pra montar uma view).

Pros do GraphQL: buscar exatamente o que precisa, uma request pra dados complexos aninhados, sistema de tipos forte. Contras do GraphQL: mais complexo pra configurar, caching mais difícil, pode ser excessivo pra APIs simples.

Qual usar? Para a maioria dos projetos, REST (como a API do Supabase) é perfeito. GraphQL brilha quando tem múltiplas equipes de frontend com necessidades diferentes de dados, ou quando sua UI precisa de dados profundamente aninhados de múltiplas fontes. Muitas grandes empresas usam ambos.`,
  },
};

export const badgesPt = {
  // CS Fundamentals (new)
  "recursion": {
    title: "Recursão: Quando Uma Função Chama a Si Mesma",
    hook: "Toda estrutura aninhada nos seus apps React — comentários em threads, menus de navegação, JSON com objetos dentro de objetos — é resolvida naturalmente com recursão.",
    concept: `Recursão é quando uma função chama a si mesma para resolver uma versão menor do mesmo problema. A chave é o caso base — a condição que para a recursão. Sem ele, você tem recursão infinita e estouro de pilha.

Pense nas bonecas russas (matryoshka). Para abrir a maior, você abre a próxima menor, depois a próxima, até chegar na menor delas (o caso base). Depois tudo "se desfaz" de volta — isso é recursão. A pilha de chamadas é a pilha de bonecas abertas. Cada chamada recursiva empurra um novo frame na pilha, e cada retorno remove um.

Em projetos reais: seu sistema de comentários com respostas aninhadas? Recursão. Um explorador de arquivos com pastas aninhadas? Recursão. Quando o React renderiza uma árvore de componentes? Esse percurso é recursivo. O padrão é sempre: se o item atual tem filhos, recursão neles. Quando não há filhos, retorne (caso base).`,
  },
  "sorting-algorithms": {
    title: "Algoritmos de Ordenação: Por Que .sort() Pode Te Surpreender",
    hook: "O .sort() do JavaScript tem um bug famoso: [1, 10, 9, 2].sort() retorna [1, 10, 2, 9]. Se você não sabe o porquê, essa lição vai te salvar de um bug em produção.",
    concept: `O .sort() padrão do JavaScript converte elementos para strings antes de comparar. Por isso [1, 10, 9, 2].sort() retorna [1, 10, 2, 9] — "10" vem antes de "2" alfabeticamente, como "abacaxi" vem antes de "banana". Todo desenvolvedor JavaScript passa por isso pelo menos uma vez.

A solução é um comparador: arr.sort((a, b) => a - b) para ascendente, (a, b) => b - a para descendente. O comparador retorna negativo (a vem primeiro), zero (iguais), ou positivo (b vem primeiro). Memorize isso e pronto.

Por baixo, a maioria dos engines JS usa TimSort — um híbrido de merge sort e insertion sort — com O(n log n) médio. E quando você precisa ordenar por múltiplos critérios (por data primeiro, depois por nome se as datas forem iguais), o padrão de comparador resolve isso de forma limpa.`,
  },

  // Frontend (new)
  "react-hooks-rules": {
    title: "React Hooks: A Armadilha do Closure e Estado Obsoleto",
    hook: "Você já teve um useEffect que não re-executava quando deveria, ou um valor obsoleto que não atualizava? Os dois são causados por closures — e essa lição resolve isso definitivamente.",
    concept: `Os hooks do React têm duas regras: só chame no nível superior, e só de funções React. A regra do nível superior existe porque o React rastreia hooks pela ordem de execução. Se você colocar um hook dentro de um if, ele pode não rodar em algumas renderizações, e o React perde o rastreamento.

O conceito mais difícil é a armadilha do closure obsoleto. Toda renderização cria um novo closure — um snapshot de todas as variáveis naquele momento. Quando você escreve useEffect(() => { console.log(count) }, []), o efeito "captura" count da primeira renderização. Mesmo quando count atualiza, o efeito ainda referencia o valor antigo do closure.

O array de dependências é seu contrato com o React: "este efeito usa esses valores — re-execute quando mudarem." Deixar algo de fora causa obsolescência. Incluir tudo corretamente faz o React recriar o closure com valores frescos em cada mudança.`,
  },
  "typescript-basics": {
    title: "TypeScript: Tipos Como Documentação Que Não Mente",
    hook: "O valor real do TypeScript não são os avisos de segurança — é que seu editor vira um copiloto que conhece a forma de cada objeto na sua base de código.",
    concept: `TypeScript adiciona tipos estáticos ao JavaScript. "Estático" significa que os tipos são verificados quando você escreve o código, não quando ele roda. Se você tentar chamar .toUpperCase() em um número, o TypeScript avisa imediatamente.

O maior equívoco: TypeScript não é uma linguagem diferente. É JavaScript com anotações que são removidas no build. Todo arquivo JavaScript válido é TypeScript válido. Você pode adotar gradualmente. Comece pelas assinaturas de função que você acha confusas — aquelas onde você precisa ler a implementação para lembrar quais parâmetros aceita.

O padrão que você usará constantemente em React + Supabase: tipar suas formas de dados. Em vez de se perguntar "esse objeto user tem um campo role?", você escreve: type User = { id: string; email: string; role: "admin" | "user" }. O Supabase pode gerar tipos direto do seu schema com supabase gen types typescript.`,
  },

  // Backend (new)
  "nodejs-event-loop": {
    title: "Event Loop do Node.js: Como Uma Thread Faz Tudo",
    hook: "O Node.js lida com milhares de requisições simultâneas com uma única thread. Entender o event loop é a diferença entre escrever código async que escala e código que silenciosamente bloqueia.",
    concept: `JavaScript é single-threaded — uma thread principal roda seu código. No servidor (Node.js), operações bloqueantes matam o throughput porque nenhuma outra requisição pode ser processada.

O event loop resolve isso. Pense em uma cozinha de restaurante. O chef (a thread JS) cozinha um prato por vez. Mas os garçons (internos do Node.js: libuv, networking do OS) pegam pedidos e trazem ingredientes em paralelo. Quando um prato está pronto, o garçom coloca uma notificação na fila. O chef verifica a fila após cada tarefa e pega o próximo item.

Por isso setTimeout(fn, 0) não significa "execute agora" — significa "execute depois que a call stack atual estiver vazia e o event loop passar por aqui." Promises resolvem antes de callbacks de setTimeout porque microtasks (callbacks de Promise) drenam antes das macro-tasks (setTimeout/setInterval).`,
  },
  "rest-api-design": {
    title: "Design de API REST: Convenções Que Tornam APIs Previsíveis",
    hook: "Todo endpoint do Supabase segue convenções REST. Uma vez que você internaliza esses padrões, consegue ler (e projetar) qualquer API em 30 segundos.",
    concept: `REST é um conjunto de convenções para estruturar APIs HTTP. A ideia central: URLs representam recursos (substantivos), e métodos HTTP representam ações (verbos). GET /users retorna usuários. POST /users cria um. Você não precisa ler a documentação — a convenção já diz tudo.

Bom design REST usa substantivos plurais para coleções (/users, não /user), aninha recursos relacionados (/users/123/posts), e usa query params para filtros (/users?role=admin&active=true). O PostgREST do Supabase segue isso: supabase.from('users') mapeia para /rest/v1/users, e .eq('role', 'admin') adiciona ?role=eq.admin à query string.

Os códigos de status de erro são onde a maioria das APIs diverge: 400 (requisição inválida), 401 (não autenticado), 403 (autenticado mas sem permissão — verifique RLS), 404 (não encontrado), 409 (conflito — chave duplicada), 422 (validação falhou), 204 (sucesso sem conteúdo — usado para deletes).`,
  },

  // DevOps (new)
  "env-variables": {
    title: "Variáveis de Ambiente: Dev vs Staging vs Prod",
    hook: "Você fez push de uma chave do Supabase pro GitHub uma vez. Isso é um incidente de segurança. Variáveis de ambiente são a solução profissional.",
    concept: `Variáveis de ambiente são valores que mudam entre ambientes (desenvolvimento, staging, produção) e que jamais devem ser commitados no controle de versão. Sua URL do Supabase e anon key são públicas. Sua service_role key, senhas de banco e chaves secretas de API não são — nunca.

No Vite, variáveis de ambiente devem começar com VITE_ para serem acessíveis no código do cliente. Você cria um arquivo .env.local: VITE_SUPABASE_URL=https://xxx.supabase.co. Esse arquivo fica no .gitignore. Quando você deploya no Vercel, adiciona as mesmas variáveis no painel em "Environment Variables."

O modelo mental: código é público (visível no seu repositório git). Variáveis de ambiente são segredos por ambiente que vivem fora do código. Seu código as referencia pelo nome (import.meta.env.VITE_SUPABASE_URL), mas os valores reais são injetados no build. Isso significa que você pode publicar seu app React como open source e manter suas chaves de API privadas.`,
  },
  "debugging-production": {
    title: "Debug em Produção: Lendo Logs, Não Vibrações",
    hook: "Seu app está quebrado em produção mas funciona localmente. A diferença entre adivinhar e encontrar o bug em 10 minutos é saber como ler logs.",
    concept: `Debug em produção é diferente do debug local. Você não pode pausar a execução com um breakpoint — precisa ler o que o código te disse antes de quebrar. O mais importante: logue contexto, não apenas erros. "Erro ocorreu" é inútil. "Usuário abc123 checkout falhou: carrinho tem 3 itens, total R$237,00, erro Stripe: card_declined" é acionável em 30 segundos.

Erros do Supabase são objetos estruturados: { data, error }. Quando error não é null, ele tem message, code, details e hint. Códigos de erro do Supabase mapeiam para PostgreSQL: 23505 é violação de unique constraint (chave duplicada), 42501 é erro de permissão (RLS bloqueando a query), 23503 é violação de chave estrangeira. Use console.error, não console.log, para erros.

O padrão de logging em três níveis: error (algo quebrou), warn (algo pode quebrar), info (operações normais que você quer confirmar). Em produção, normalmente silencie os logs de info e mantenha apenas warn e error — caso contrário os logs viram ruído que enterra problemas reais.`,
  },

  // System Design (new)
  "scalability-basics": {
    title: "Escalabilidade: O Que Quebra Quando Seu App Viraliza",
    hook: "Seu free tier do Supabase aguenta 500 usuários de boa. 50.000 usuários é um problema diferente. Entender o que quebra e por quê é a virada de chave de 'funciona' para 'escala'.",
    concept: `Escalabilidade é lidar com mais carga sem quebrar. Há duas abordagens. Escalabilidade vertical significa uma máquina maior — mais CPU, mais RAM. Fácil de implementar, mas tem um teto e fica caro no limite. Escalabilidade horizontal significa mais máquinas, distribuindo a carga. Requer que seu app seja stateless, mas escala para milhões de usuários.

Seu app React + Supabase é naturalmente escalável horizontalmente no frontend porque o React roda no navegador. O banco de dados é sempre o gargalo. Soluções comuns: read replicas (cópias do banco para queries somente leitura), connection pooling (uma camada que reutiliza conexões com o banco), e cache.

Mas antes de gastar em infraestrutura maior, perfile primeiro. 80% dos "problemas de escala" são na verdade índices de banco faltando. Uma query sem índice fazendo full table scan em uma tabela de um milhão de linhas pode ser o problema inteiro. No Supabase, você pode rodar EXPLAIN ANALYZE em qualquer query no Editor SQL para ver exatamente onde o Postgres está gastando tempo.`,
  },
  "pagination": {
    title: "Paginação: Carregando Dados Sem Destruir a Performance",
    hook: "Seu app busca todos os 10.000 posts na inicialização e fica lento. Paginação é como apps reais lidam com isso — e paginação por cursor é como você faz do jeito certo.",
    concept: `Há duas abordagens de paginação. Paginação por offset (/posts?page=2&limit=20) funciona pulando linhas: "pule 20, pegue 20." Simples de implementar, mas conforme os usuários vão mais fundo, o banco varre e descarta todas as linhas puladas. Página 500 com 20 itens cada significa varrer 10.000 linhas. Fica mais lento conforme os usuários rolam mais.

Paginação por cursor resolve isso com um ponteiro para o último item visto: "me dê 20 itens depois deste timestamp/ID." O banco usa um índice para pular direto para a posição certa. É assim que o scroll infinito funciona no Twitter, Instagram e em todo app de escala. No Supabase: .gt('created_at', lastTimestamp).order('created_at').limit(20).

No React, o padrão: mantenha uma variável de estado cursor, busque a primeira página no mount, e quando o usuário clicar em "Carregar Mais", busque a próxima página usando o cursor e adicione os resultados à lista existente. A regra principal: nunca carregue mais dados do que precisa exibir.`,
  },

  // Badges (existing)
  "react-builder": { name: "Construtor React", description: "Completou a trilha Domínio Frontend" },
  "db-whisperer": { name: "Mestre dos Bancos", description: "Completou a trilha Fundamentos Backend" },
  "algorithm-thinker": { name: "Pensador de Algoritmos", description: "Completou a trilha Fundamentos de CS" },
  "deploy-captain": { name: "Capitão do Deploy", description: "Completou a trilha DevOps Essencial" },
  "architect": { name: "Arquiteto de Sistemas", description: "Completou a trilha Design de Sistemas" },
};

export const difficultyPt = {
  beginner: "iniciante",
  intermediate: "intermediário",
  advanced: "avançado",
};
