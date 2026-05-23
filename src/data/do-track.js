// DevOps & Infrastructure — 10 lições ALPA
// CS50 semanas 1, 2, 7, 9 + extras — CLI, Git, Docker, CI/CD, Deploy
export const doLessons = [
  // ─── do-1 ───────────────────────────────────────────────────────────────────
  {
    id: 'do-1-cli',
    title: 'Terminal: O Básico do CLI',
    week: 1,
    xp: 50,
    difficulty: 'Iniciante',
    priority: '⭐',
    hook: 'O terminal preto que hackers usam nos filmes? É só uma forma rápida de falar com o computador. Todo comando segue o padrão `verbo substantivo [flags]` — depois que você sacar isso, a tela preta deixa de assustar.',

    assess: {
      type: 'multipleChoice',
      question: 'Qual comando lista TODOS os arquivos da pasta atual, incluindo os ocultos, em formato detalhado?',
      options: [
        { text: 'ls', feedback: 'Esse só mostra arquivos não ocultos, com pouca info.' },
        { text: 'ls -la', feedback: 'Isso! -l é formato longo, -a inclui ocultos (os que começam com ponto).', correct: true },
        { text: 'list -all', feedback: '"list" não é um comando padrão do Unix.' },
        { text: 'dir /a', feedback: 'Isso é sintaxe do CMD do Windows, não Linux/macOS.' }
      ]
    },

    learn: {
      hook: 'Todo dev de jogos, todo criador de mod, todo dono de bot do Discord vive no terminal. O CLI não é opcional — é a língua universal de servidores, deploys e Git.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/1/',
        title: 'CS50 Semana 1: A Linha de Comando',
        duration: '30 min',
        yourTakeaway: 'Repare como arquivos, pastas e permissões formam uma árvore única que você navega com caminhos relativos ou absolutos.'
      },
      conceptText: `A **linha de comando** (CLI) é um jeito de dizer ao computador o que fazer usando texto. Todo comando segue o mesmo padrão: \`comando [flags] [argumentos]\`.\n\n**Navegação**: \`pwd\` mostra a pasta atual, \`ls\` lista arquivos, \`cd caminho\` muda de pasta. Use \`.\` pra pasta atual, \`..\` pra pasta pai, \`~\` pra home, e \`/\` pra raiz.\n\n**Mexer com arquivos**: \`touch arquivo.txt\` cria um arquivo vazio, \`mkdir pasta\` cria pasta, \`cp origem destino\` copia, \`mv origem destino\` move ou renomeia, \`rm arquivo\` apaga (use \`rm -rf pasta\` pra pastas — e tome MUITO cuidado).\n\n**Ler arquivos**: \`cat arquivo\` joga o conteúdo na tela, \`less arquivo\` abre um leitor, \`head -n 10 arquivo\` mostra as 10 primeiras linhas, \`tail -f arquivo\` mostra novas linhas conforme elas chegam (ótimo pra logs de bot).\n\n**Globs e curingas**: \`*.js\` pega qualquer arquivo \`.js\`, \`?\` pega um caractere, \`{a,b}\` expande pra vários. Permite mexer em vários arquivos de uma vez.\n\n**Pipes e redirecionamento**: \`|\` envia a saída de um comando pra entrada de outro. \`>\` escreve num arquivo (sobrescreve), \`>>\` adiciona no final. \`grep padrão arquivo\` procura linhas que batem. Junto, \`cat log.txt | grep ERROR | tail -20\` te dá os 20 erros mais recentes.`,
      realWorldExample: 'Quando você publica uma atualização do seu jogo Roblox e o deploy falha no Vercel, a primeira coisa é abrir o terminal e rodar `vercel logs` com pipe pro `grep error`. O CLI é a língua universal de toda plataforma de deploy, todo git push, e todo servidor onde você dá ssh.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Lendo o Comando',
        question: 'O que `cat error.log | grep "500" | tail -5` faz?',
        options: [
          { text: 'Apaga os últimos 5 erros do log', feedback: 'Não — nenhum desses comandos apaga nada.' },
          { text: 'Mostra as últimas 5 linhas do arquivo que contêm "500"', feedback: 'Isso! cat manda o arquivo, grep filtra por "500", tail pega os 5 últimos.', correct: true },
          { text: 'Conta quantos erros 500 tem', feedback: 'Pra isso precisaria de `wc -l` no final.' },
          { text: 'Salva os erros 500 num novo arquivo', feedback: 'Pra isso precisaria de `>` no final.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Ordene os Comandos',
        description: 'Você quer criar uma pasta pro seu projeto de bot do Discord, entrar nela, iniciar um repo git e listar os arquivos. Ordene os comandos.',
        items: [
          'git init',
          'mkdir meu-bot',
          'ls -la',
          'cd meu-bot'
        ],
        correctOrder: [1, 3, 0, 2],
        feedback: 'Cria a pasta, entra nela, inicia o git, e confirma com ls.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Combinando com Glob',
        instructions: 'Quais arquivos `*.js` pegaria nessa pasta?',
        code: `// conteúdo da pasta:
// app.js
// style.css
// util.js
// README.md
// script.js.bak`,
        question: 'Quais arquivos batem com `*.js`?',
        options: [
          { text: 'app.js, util.js, script.js.bak', feedback: 'script.js.bak termina em .bak, não em .js.' },
          { text: 'só app.js e util.js', feedback: 'Isso! * pega qualquer coisa, mas o padrão tem que TERMINAR em .js.', correct: true },
          { text: 'Os cinco arquivos', feedback: 'O glob só pega arquivos que terminam em .js.' },
          { text: 'Só app.js', feedback: 'Glob pega TODOS que terminam em .js, não só um.' }
        ],
        feedback: 'Glob bate com o nome INTEIRO — `*.js` exige que o arquivo TERMINE em .js, não só contenha.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'parsePath',
        instructions: [
          'Escreva parsePath(path) que retorna { dir, base, ext }.',
          'dir é tudo antes da última "/", base é o nome do arquivo, ext é a extensão com o ponto.',
          'parsePath("/home/dev/app.js") → { dir: "/home/dev", base: "app.js", ext: ".js" }'
        ],
        sampleCode: `function parsePath(path) {
  // TODO
}`,
        solution: `function parsePath(path) {
  const lastSlash = path.lastIndexOf('/');
  const dir = lastSlash >= 0 ? path.slice(0, lastSlash) : '';
  const base = lastSlash >= 0 ? path.slice(lastSlash + 1) : path;
  const lastDot = base.lastIndexOf('.');
  const ext = lastDot > 0 ? base.slice(lastDot) : '';
  return { dir, base, ext };
}`,
        tests: [
          { input: 'parsePath("/home/elly/app.js")', expected: { dir: '/home/elly', base: 'app.js', ext: '.js' }, desc: 'caminho padrão' },
          { input: 'parsePath("/etc/config")', expected: { dir: '/etc', base: 'config', ext: '' }, desc: 'sem extensão' },
          { input: 'parsePath("README.md")', expected: { dir: '', base: 'README.md', ext: '.md' }, desc: 'sem pasta' }
        ],
        hints: [
          'Use String.prototype.lastIndexOf("/") pra achar onde dividir.',
          'Pra extensão, ache o último "." na base — mas ignore pontos no começo, tipo ".env".',
          'Retorne os três campos num objeto só.'
        ]
      },
      {
        level: 2,
        title: 'buildCommand',
        instructions: [
          'Escreva buildCommand(cmd, args, flags) que monta a string do comando.',
          'args é array de argumentos posicionais. flags é objeto tipo { m: "init" }.',
          'Flags viram `-key "value"` (sempre aspas no valor).',
          'buildCommand("git", ["commit"], { m: "init" }) → \'git commit -m "init"\''
        ],
        sampleCode: `function buildCommand(cmd, args, flags) {
  // TODO
}`,
        solution: `function buildCommand(cmd, args, flags) {
  const parts = [cmd, ...args];
  for (const key of Object.keys(flags)) {
    parts.push('-' + key);
    parts.push('"' + flags[key] + '"');
  }
  return parts.join(' ');
}`,
        tests: [
          { input: 'buildCommand("git", ["commit"], { m: "init" })', expected: 'git commit -m "init"', desc: 'uma flag' },
          { input: 'buildCommand("ls", [], { l: "", a: "" })', expected: 'ls -l "" -a ""', desc: 'várias flags' },
          { input: 'buildCommand("echo", ["hello"], {})', expected: 'echo hello', desc: 'sem flags' }
        ],
        hints: [
          'Comece com [cmd, ...args] e empurre os pares de flags no array.',
          'Itere flags com Object.keys() pra ordem ficar previsível.',
          'Junte o array final com um espaço.'
        ]
      },
      {
        level: 3,
        title: 'parseGlobPattern',
        instructions: [
          'Escreva parseGlobPattern(pattern, files) que retorna os arquivos que batem com o glob.',
          'Suporte só `*` que pega qualquer sequência (até vazia).',
          'parseGlobPattern("*.js", ["app.js", "style.css", "util.js"]) → ["app.js", "util.js"]'
        ],
        sampleCode: `function parseGlobPattern(pattern, files) {
  // TODO
}`,
        solution: `function parseGlobPattern(pattern, files) {
  const regexStr = pattern.replace(/\\./g, '\\\\.').replace(/\\*/g, '.*');
  const regex = new RegExp('^' + regexStr + '$');
  return files.filter(f => regex.test(f));
}`,
        tests: [
          { input: 'parseGlobPattern("*.js", ["app.js","style.css","util.js"])', expected: ['app.js', 'util.js'], desc: 'pega arquivos js' },
          { input: 'parseGlobPattern("test*", ["test.js","testing.md","app.js"])', expected: ['test.js', 'testing.md'], desc: 'prefixo' },
          { input: 'parseGlobPattern("*", ["a","b","c"])', expected: ['a', 'b', 'c'], desc: 'pega tudo' }
        ],
        hints: [
          'Converta o glob em regex: escape os especiais de regex e troque * por .*.',
          'Ancore com ^ e $ pra o padrão bater com o nome INTEIRO.',
          'Filtre o array de arquivos com a regex.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Teste Final do CLI',
      steps: [
        {
          type: 'coding',
          title: 'joinPath',
          instructions: 'Escreva joinPath(...parts) que junta segmentos de caminho com "/". Junte barras duplicadas em uma só. joinPath("/home", "dev", "app") → "/home/dev/app".',
          sampleCode: `function joinPath(...parts) {
  // TODO
}`,
          solution: `function joinPath(...parts) {
  return parts.join('/').replace(/\\/+/g, '/');
}`,
          tests: [
            { input: 'joinPath("/home", "elly", "app")', expected: '/home/elly/app', desc: 'junção básica' },
            { input: 'joinPath("/home/", "/elly/", "/app")', expected: '/home/elly/app', desc: 'remove barras extras' },
            { input: 'joinPath("a", "b")', expected: 'a/b', desc: 'caminho relativo' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Por que `rm -rf /` é um dos comandos mais perigosos do mundo da computação?',
          options: [
            { text: 'É lento de rodar', feedback: 'Velocidade não é o perigo.' },
            { text: 'Apaga TUDO recursivamente e à força, começando da raiz', feedback: 'Isso! -r é recursivo, -f força sem perguntar, e / é o sistema inteiro.', correct: true },
            { text: 'Só funciona no Windows', feedback: 'É comando Unix.' },
            { text: 'Reinicia o sistema', feedback: 'Ele só apaga — mas isso já é catastrófico.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Quais são os 10 comandos de CLI que eu deveria decorar primeiro, se quero publicar bots no Discord e ter um portfólio no GitHub?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre DevOps e deploy. Use exemplos de publicar jogos no Roblox, fazer deploy de bots do Discord, atualizar apps na Play Store. Mostre como devs reais shipam coisas. Seja direto, sem fluff.'
    },
    resources: [
      { title: 'CS50 Semana 1 — A Linha de Comando', url: 'https://cs50.harvard.edu/x/2024/weeks/1/' },
      { title: 'The Linux Command Line (livro grátis)', url: 'https://linuxcommand.org/tlcl.php' }
    ]
  },

  // ─── do-2 ───────────────────────────────────────────────────────────────────
  {
    id: 'do-2-compilation',
    title: 'Compilação: Como seu código vira algo executável',
    week: 2,
    xp: 70,
    difficulty: 'Intermediário',
    priority: '⭐⭐',
    hook: 'Como seu código JS vira algo que o navegador entende? Compilação. Entender as camadas que transformam texto em algo que a CPU roda tira o medo de erros de build, bundlers, e "por que o Vite precisa compilar meu JSX?".',

    assess: {
      type: 'multipleChoice',
      question: 'Qual dessas NÃO é uma fase típica de compilação?',
      options: [
        { text: 'Análise léxica (tokenização)', feedback: 'Tokenização É a primeira fase.' },
        { text: 'Parsing (montar AST)', feedback: 'Parsing É uma fase real.' },
        { text: 'Desfragmentação', feedback: 'Isso! Desfragmentação é coisa de disco, não de compilação.', correct: true },
        { text: 'Geração de código', feedback: 'Geração de código É uma fase real.' }
      ]
    },

    learn: {
      hook: 'Quando você salva um .jsx e o Vite recompila em 200ms, MUITA coisa acontece: tokeniza, faz o parse, transforma, junta tudo, escreve. Depois que você vê o pipeline, erros de build param de ser assustadores.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/2/',
        title: 'CS50 Semana 2: Compilação',
        duration: '25 min',
        yourTakeaway: 'Repare como pré-processamento, compilação, montagem e linking são QUATRO passos distintos — cada um pode falhar do seu jeito.'
      },
      conceptText: `**Compilação** é o processo de transformar código-fonte (texto que humanos escrevem) em algo que o computador roda. O pipeline clássico do C tem quatro passos:\n\n1. **Pré-processamento**: lida com diretivas tipo \`#include\` — cola arquivos de header, expande macros.\n2. **Compilação**: converte código pré-processado em assembly (ainda texto, mas específico da CPU).\n3. **Montagem**: converte assembly em código de máquina — um arquivo objeto com instruções binárias.\n4. **Linking**: junta vários arquivos objeto (mais bibliotecas) em um executável só.\n\nTodo erro pertence a uma dessas fases. "Header faltando" é pré-processamento. "Erro de sintaxe" é compilação. "Undefined reference" é linking.\n\nJavaScript não compila pra código de máquina antes de rodar, mas o JS moderno tem um pipeline parecido. **Vite** e **Babel** passam seu JSX/TS por fases parecidas: **tokenizar** (dividir em pedaços com significado), **parsear** (montar a AST — Abstract Syntax Tree, árvore sintática abstrata), **transformar** (reescrever a AST — ex: JSX → chamadas React.createElement), e **gerar** (cuspir o JS final).\n\nA **AST** é o conceito mais importante. Quando seu código vira AST, ferramentas conseguem analisar, dar lint, renomear variáveis, transformar sintaxe. ESLint, Prettier, Babel, TypeScript — todos trabalham com AST.\n\nQuando seu build do Vite falha com "Unexpected token", é o **parser** reclamando. Quando falha com "module not found", é o **bundler** fazendo linking. Saber qual fase falhou corta seu tempo de debug pela metade.`,
      realWorldExample: 'Toda vez que você roda `npm run build` pra publicar seu jogo Roblox companion ou seu site React, o Vite tokeniza seu JSX, parseia pra AST, transforma JSX em React.createElement, junta os imports e escreve JS otimizado em dist/. "Erro de build" é um desses passos falhando — saber qual te diz onde olhar.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Qual Fase Falhou?',
        question: 'Seu build falha com `SyntaxError: Unexpected token "<"`. Qual fase do pipeline falhou?',
        options: [
          { text: 'Linking — falta um módulo', feedback: 'Não — isso seria erro de "module not found".' },
          { text: 'Parsing — o código não virou uma AST válida', feedback: 'Isso! "Unexpected token" significa que o parser viu algo que não entendeu naquela posição.', correct: true },
          { text: 'Geração de código — falhou ao escrever', feedback: 'Geração raramente falha assim.' },
          { text: 'Pré-processamento — falta um header', feedback: 'JavaScript não tem fase de pré-processamento como C.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Ordene o Pipeline de Compilação',
        description: 'Coloque as fases de um compilador típico na ordem certa.',
        items: [
          'Linking — junta objetos em um executável',
          'Tokenização — divide o código em tokens',
          'Geração de código — emite código de máquina',
          'Parsing — monta a AST',
          'Análise semântica — checa tipos e escopos'
        ],
        correctOrder: [1, 3, 4, 2, 0],
        feedback: 'Tokenizar → parsear → analisar → gerar → linkar. Cada fase consome a saída da anterior.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Leia os Tokens',
        instructions: 'Um tokenizador simples divide essa expressão por espaços e operadores. Quais tokens saem?',
        code: `const expr = "3 + 4 * 2";
// tokenize divide nos menores pedaços com significado`,
        question: 'Qual é o array de tokens pra "3 + 4 * 2"?',
        options: [
          { text: '["3 + 4 * 2"]', feedback: 'Essa é a string original — tokenização divide em pedaços.' },
          { text: '["3", "+", "4", "*", "2"]', feedback: 'Isso! Cada número e operador é seu próprio token.', correct: true },
          { text: '["3+", "4*", "2"]', feedback: 'Operadores e operandos são tokens separados.' },
          { text: '["3", "4", "2"]', feedback: 'Operadores também são tokens — eles carregam significado.' }
        ],
        feedback: 'Tokens são as "palavras" da linguagem — os menores pedaços que ainda têm significado.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'tokenize',
        instructions: [
          'Escreva tokenize(expr) que divide uma expressão matemática em tokens.',
          'Números e operadores (+, -, *, /) são tokens separados. Ignore espaços.',
          'tokenize("3 + 4") → ["3", "+", "4"]'
        ],
        sampleCode: `function tokenize(expr) {
  // TODO
}`,
        solution: `function tokenize(expr) {
  const tokens = [];
  let i = 0;
  while (i < expr.length) {
    const c = expr[i];
    if (c === ' ') { i++; continue; }
    if ('+-*/'.includes(c)) { tokens.push(c); i++; continue; }
    let num = '';
    while (i < expr.length && /[0-9]/.test(expr[i])) {
      num += expr[i];
      i++;
    }
    if (num) tokens.push(num);
  }
  return tokens;
}`,
        tests: [
          { input: 'tokenize("3 + 4")', expected: ['3', '+', '4'], desc: 'soma simples' },
          { input: 'tokenize("12 * 7")', expected: ['12', '*', '7'], desc: 'números com vários dígitos' },
          { input: 'tokenize("1+2-3")', expected: ['1', '+', '2', '-', '3'], desc: 'sem espaços' }
        ],
        hints: [
          'Ande pela string caractere a caractere.',
          'Junte dígitos em um loop interno pra formar números.',
          'Pule espaços e empurre operadores direto.'
        ]
      },
      {
        level: 2,
        title: 'evalSimple',
        instructions: [
          'Escreva evalSimple(expr) que avalia uma expressão matemática com precedência normal.',
          'Suporte +, -, *, / em inteiros positivos.',
          'evalSimple("3 + 4 * 2") → 11 (multiplica antes de somar).',
          'Pode usar eval() se quiser — mas tente fazer manualmente.'
        ],
        sampleCode: `function evalSimple(expr) {
  // TODO
}`,
        solution: `function evalSimple(expr) {
  return Function('"use strict"; return (' + expr + ')')();
}`,
        tests: [
          { input: 'evalSimple("3 + 4 * 2")', expected: 11, desc: 'precedência: 4*2 primeiro' },
          { input: 'evalSimple("10 - 6")', expected: 4, desc: 'subtração' },
          { input: 'evalSimple("20 / 4")', expected: 5, desc: 'divisão' }
        ],
        hints: [
          'O caminho mais simples é `new Function("return (" + expr + ")")()` — JS avalia com precedência normal.',
          'Uma implementação real tokenizaria, parsearia pra AST e andaria nela.',
          'Precedência é só uma regra do parser: operadores multiplicativos colam mais que os aditivos.'
        ]
      },
      {
        level: 3,
        title: 'countOperators',
        instructions: [
          'Escreva countOperators(expr) que retorna quantos operadores (+, -, *, /) aparecem na expressão.',
          'countOperators("a + b * c - d") → 3'
        ],
        sampleCode: `function countOperators(expr) {
  // TODO
}`,
        solution: `function countOperators(expr) {
  let count = 0;
  for (const c of expr) {
    if ('+-*/'.includes(c)) count++;
  }
  return count;
}`,
        tests: [
          { input: 'countOperators("a + b * c - d")', expected: 3, desc: 'três operadores' },
          { input: 'countOperators("xyz")', expected: 0, desc: 'sem operadores' },
          { input: 'countOperators("1+2+3+4")', expected: 3, desc: 'sem espaços, quatro números' }
        ],
        hints: [
          'Itere cada caractere da string.',
          'Cheque se está em "+-*/" — String.includes() funciona.',
          'Incremente um contador a cada match.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Teste Final de Compilação',
      steps: [
        {
          type: 'coding',
          title: 'isBalanced',
          instructions: 'Escreva isBalanced(expr) que retorna true se todos os parênteses casam. isBalanced("(1 + (2 * 3))") → true, isBalanced("(1 + 2") → false. (Parsers reais fazem isso na primeira passada.)',
          sampleCode: `function isBalanced(expr) {
  // TODO
}`,
          solution: `function isBalanced(expr) {
  let depth = 0;
  for (const c of expr) {
    if (c === '(') depth++;
    else if (c === ')') {
      depth--;
      if (depth < 0) return false;
    }
  }
  return depth === 0;
}`,
          tests: [
            { input: 'isBalanced("(1 + (2 * 3))")', expected: true, desc: 'aninhado e balanceado' },
            { input: 'isBalanced("(1 + 2")', expected: false, desc: 'faltou fechar' },
            { input: 'isBalanced("1 + 2)")', expected: false, desc: 'fechou demais' },
            { input: 'isBalanced("no parens here")', expected: true, desc: 'sem parênteses é balanceado' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Por que ferramentas como Babel e ESLint trabalham na AST em vez do código-fonte cru?',
          options: [
            { text: 'AST ocupa menos memória', feedback: 'Geralmente ocupa mais — não é por isso.' },
            { text: 'A AST é uma representação estruturada que torna análise e transformação confiáveis', feedback: 'Isso! Manipular texto quebra em casos extremos; manipular AST respeita a semântica da linguagem.', correct: true },
            { text: 'A AST roda mais rápido que o código-fonte', feedback: 'Nenhum dos dois "roda" — AST é uma estrutura de dados.' },
            { text: 'AST é legível pra humanos', feedback: 'É tecnicamente legível, mas não foi feita pra humanos.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Quando o Vite me dá erro "Unexpected token" no meu projeto React, qual é o jeito certo de debugar?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre DevOps e deploy. Use exemplos de publicar jogos no Roblox, fazer deploy de bots do Discord, atualizar apps na Play Store. Mostre como devs reais shipam coisas. Seja direto, sem fluff.'
    },
    resources: [
      { title: 'CS50 Semana 2 — Compilação', url: 'https://cs50.harvard.edu/x/2024/weeks/2/' },
      { title: 'AST Explorer', url: 'https://astexplorer.net/' }
    ]
  },

  // ─── do-3 ───────────────────────────────────────────────────────────────────
  {
    id: 'do-3-git-basics',
    title: 'Git: O Básico',
    week: 1,
    xp: 70,
    difficulty: 'Iniciante',
    priority: '⭐⭐',
    hook: 'Git: time machine pro seu código. Errou? Volta. Quer testar uma ideia maluca? Cria branch. Entender o modelo por trás de add / commit / push transforma comandos místicos numa ferramenta que você manda bem.',

    assess: {
      type: 'multipleChoice',
      question: 'Qual a diferença entre `git add` e `git commit`?',
      options: [
        { text: 'São o mesmo comando', feedback: 'São dois passos distintos.' },
        { text: 'add coloca mudanças no palco pro próximo commit; commit grava as mudanças do palco no histórico', feedback: 'Isso! A área de staging (index) é o que torna o Git em duas fases — você pode selecionar o que entra antes de commitar.', correct: true },
        { text: 'add salva localmente, commit envia pro remoto', feedback: 'commit também salva localmente — push é outro comando.' },
        { text: 'add atualiza o remoto, commit atualiza o repo local', feedback: 'Os dois funcionam só localmente até você dar push.' }
      ]
    },

    learn: {
      hook: 'Todo comando Git que você já digitou se resume a mover snapshots entre três lugares: sua pasta de trabalho, a área de staging, e o histórico de commits. Quando você vê esses três baldes, tudo encaixa.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/1/',
        title: 'CS50 Semana 1: Git Básico',
        duration: '25 min',
        yourTakeaway: 'Repare como pasta de trabalho, staging e histórico são três estados distintos — cada comando move dados entre eles.'
      },
      conceptText: `**Git** é um sistema de controle de versão distribuído. Todo clone é uma cópia completa do histórico — não tem um servidor especial no protocolo.\n\nO Git acompanha seu projeto em três áreas:\n\n1. **Pasta de trabalho** — os arquivos no disco que você edita.\n2. **Staging** (também chamado de **index**) — um "rascunho" do que vai entrar no próximo commit.\n3. **Histórico de commits** (o **repositório**) — o log imutável de snapshots.\n\nO fluxo básico: \`git add arquivo\` move mudanças da pasta de trabalho → staging. \`git commit -m "msg"\` move o que tá em staging → histórico. \`git push\` envia commits pra um remoto (tipo GitHub). \`git pull\` baixa e mescla commits do remoto na sua branch.\n\n**Branches** são só ponteiros móveis pra um commit. \`main\` é a convenção; \`git switch -c feat/novo-item\` cria uma branch nova. \`git merge feat/novo-item\` traz os commits de outra branch pra sua.\n\n**Conventional Commits** é um formato muito usado de mensagem de commit: \`tipo(escopo): descrição\`. Tipos tipo \`feat\`, \`fix\`, \`docs\`, \`refactor\`, \`test\`, \`chore\` deixam o histórico fácil de ler e geram changelog automático.\n\n**Nomes de branch** tipo \`feat/GAME-42-novo-boss\` codificam o tipo (feat), o ticket (GAME-42) e uma descrição curta. Sistemas de CI e integrações com Linear/Jira leem isso.`,
      realWorldExample: 'Quando você atualiza seu mod do Minecraft ou adiciona um comando novo no seu bot do Discord, a sequência é a mesma: `git switch -c feat/comando-musica`, edita os arquivos, `git add`, `git commit -m "feat: comando de música"`, `git push -u origin feat/comando-musica`, abre um PR. A disciplina de commits pequenos com mensagens claras faz o você-do-futuro (e seus colegas) conseguir achar bugs em minutos.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Lendo o Status',
        question: '`git status` mostra: "Changes not staged for commit: modified: app.js". O que você roda pra incluir app.js no próximo commit?',
        options: [
          { text: 'git commit app.js', feedback: 'Tem que dar add primeiro.' },
          { text: 'git add app.js', feedback: 'Isso! add coloca o arquivo no palco.', correct: true },
          { text: 'git push app.js', feedback: 'push envia commits — não dá add.' },
          { text: 'git stage app.js', feedback: 'git stage existe em versões novas do Git, mas git add é o padrão.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Ordene o Fluxo de Feature',
        description: 'Você quer shippar uma feature nova no seu bot. Ordene esses comandos Git.',
        items: [
          'git push -u origin feat/comando-musica',
          'git switch -c feat/comando-musica',
          'git commit -m "feat: comando de música"',
          'git add musica.js',
          'Edita musica.js'
        ],
        correctOrder: [1, 4, 3, 2, 0],
        feedback: 'Cria branch → edita → add → commit → push. Esse padrão se repete pra toda feature.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Formato Conventional Commit',
        instructions: 'Qual mensagem de commit segue o Conventional Commits pra uma feature nova no escopo "auth"?',
        code: `// formato: tipo(escopo): descrição
// tipos: feat, fix, docs, refactor, test, chore`,
        question: 'Qual tá formatado certo?',
        options: [
          { text: 'Adicionei login JWT no auth', feedback: 'Falta o tipo e os dois pontos.' },
          { text: 'feat(auth): adiciona login JWT', feedback: 'Isso! tipo(escopo): descrição.', correct: true },
          { text: 'AUTH: feat - adicionar login JWT', feedback: 'Separador errado — escopo vai entre parênteses.' },
          { text: 'feat adiciona login JWT no auth', feedback: 'Falta os dois pontos e os parênteses.' }
        ],
        feedback: 'Conventional Commits gera changelog e versionamento automático — vale a pequena disciplina.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'parseGitStatus',
        instructions: [
          'Escreva parseGitStatus(text) que parseia uma saída simplificada do `git status --porcelain`.',
          'Cada linha tem dois caracteres, depois espaço, depois o caminho. Primeiro char é status staged, segundo é unstaged.',
          'Mapeie "M" pra modificado staged/unstaged, "A" pra adicionado staged, "?" pra não rastreado.',
          'Retorne { staged: [], unstaged: [], untracked: [] }.'
        ],
        sampleCode: `function parseGitStatus(text) {
  // TODO
}`,
        solution: `function parseGitStatus(text) {
  const result = { staged: [], unstaged: [], untracked: [] };
  const lines = text.split('\\n').filter(Boolean);
  for (const line of lines) {
    const s = line[0];
    const u = line[1];
    const file = line.slice(3);
    if (s === '?' && u === '?') result.untracked.push(file);
    else {
      if (s !== ' ' && s !== '?') result.staged.push(file);
      if (u !== ' ' && u !== '?') result.unstaged.push(file);
    }
  }
  return result;
}`,
        tests: [
          { input: 'parseGitStatus("M  app.js\\n M style.css\\n?? new.txt")', expected: { staged: ['app.js'], unstaged: ['style.css'], untracked: ['new.txt'] }, desc: 'estados misturados' },
          { input: 'parseGitStatus("")', expected: { staged: [], unstaged: [], untracked: [] }, desc: 'status vazio' },
          { input: 'parseGitStatus("A  added.js")', expected: { staged: ['added.js'], unstaged: [], untracked: [] }, desc: 'um arquivo staged' }
        ],
        hints: [
          'Divida a entrada por newlines e pule linhas vazias.',
          'O caminho começa no índice 3 — chars 0 e 1 são o código de status de duas letras.',
          '"?? path" significa não rastreado; senão o primeiro char é staged, o segundo unstaged.'
        ]
      },
      {
        level: 2,
        title: 'buildCommitMessage',
        instructions: [
          'Escreva buildCommitMessage(type, scope, msg) que retorna uma string Conventional Commits.',
          'Se scope não for vazio: "type(scope): msg". Se for vazio: "type: msg".',
          'buildCommitMessage("feat", "auth", "adiciona login JWT") → "feat(auth): adiciona login JWT"'
        ],
        sampleCode: `function buildCommitMessage(type, scope, msg) {
  // TODO
}`,
        solution: `function buildCommitMessage(type, scope, msg) {
  if (scope) return type + '(' + scope + '): ' + msg;
  return type + ': ' + msg;
}`,
        tests: [
          { input: 'buildCommitMessage("feat","auth","adiciona login JWT")', expected: 'feat(auth): adiciona login JWT', desc: 'com escopo' },
          { input: 'buildCommitMessage("fix","","typo")', expected: 'fix: typo', desc: 'sem escopo' },
          { input: 'buildCommitMessage("docs","readme","atualiza instalação")', expected: 'docs(readme): atualiza instalação', desc: 'docs com escopo' }
        ],
        hints: [
          'Cheque se scope é truthy antes de adicionar os parênteses.',
          'Concatenação simples de string — não precisa de template literal.',
          'Esse é o tipo de utilitário que você pode usar de verdade num linter de commit.'
        ]
      },
      {
        level: 3,
        title: 'parseBranchName',
        instructions: [
          'Escreva parseBranchName(name) que divide um nome de branch tipo "feat/GAME-42-novo-boss".',
          'Formato: "type/TICKET-N-descrição". Retorne { type, ticket, description }.',
          'Formato do ticket: letras maiúsculas + traço + dígitos. Descrição é o que vier depois.',
          'Se não tiver padrão de ticket, ticket fica "" e descrição é tudo depois da barra do type.'
        ],
        sampleCode: `function parseBranchName(name) {
  // TODO
}`,
        solution: `function parseBranchName(name) {
  const slashIdx = name.indexOf('/');
  if (slashIdx < 0) return { type: '', ticket: '', description: name };
  const type = name.slice(0, slashIdx);
  const rest = name.slice(slashIdx + 1);
  const match = rest.match(/^([A-Z]+-\\d+)-(.*)$/);
  if (match) return { type, ticket: match[1], description: match[2] };
  return { type, ticket: '', description: rest };
}`,
        tests: [
          { input: 'parseBranchName("feat/AUTH-42-add-jwt")', expected: { type: 'feat', ticket: 'AUTH-42', description: 'add-jwt' }, desc: 'formato completo' },
          { input: 'parseBranchName("fix/typo-in-readme")', expected: { type: 'fix', ticket: '', description: 'typo-in-readme' }, desc: 'sem ticket' },
          { input: 'parseBranchName("chore/COE-101-deps")', expected: { type: 'chore', ticket: 'COE-101', description: 'deps' }, desc: 'ticket com prefixo' }
        ],
        hints: [
          'Divida na primeira "/" pra pegar type e o resto.',
          'Use regex tipo /^([A-Z]+-\\d+)-(.*)$/ pra detectar o ticket.',
          'Se não tiver match de ticket, o "resto" inteiro é a descrição.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Teste Final de Git Básico',
      steps: [
        {
          type: 'coding',
          title: 'isValidCommitMessage',
          instructions: 'Escreva isValidCommitMessage(msg) que retorna true se a mensagem segue Conventional Commits: tipo ou tipo(escopo): descrição. Tipos válidos: feat, fix, docs, refactor, test, chore.',
          sampleCode: `function isValidCommitMessage(msg) {
  // TODO
}`,
          solution: `function isValidCommitMessage(msg) {
  return /^(feat|fix|docs|refactor|test|chore)(\\([^)]+\\))?: .+/.test(msg);
}`,
          tests: [
            { input: 'isValidCommitMessage("feat(auth): add JWT login")', expected: true, desc: 'com escopo' },
            { input: 'isValidCommitMessage("fix: typo")', expected: true, desc: 'sem escopo' },
            { input: 'isValidCommitMessage("added stuff")', expected: false, desc: 'sem tipo' },
            { input: 'isValidCommitMessage("wip: hack")', expected: false, desc: 'tipo inválido' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Você commitou na main sem querer. O commit ainda é só local (não deu push). Como mover ele com segurança pra uma branch nova?',
          options: [
            { text: 'git switch -c feat/new && git reset --hard origin/main na main', feedback: 'Isso! Cria uma branch no commit atual, depois reseta a main. O commit fica na feat/new.', correct: true },
            { text: 'git push --force', feedback: 'Isso só empurra o commit indesejado pro remoto — piora.' },
            { text: 'rm -rf .git && git init', feedback: 'Você perde todo o histórico.' },
            { text: 'git revert HEAD', feedback: 'Cria um commit extra "desfazendo" na main — não move pra branch nova.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Às vezes commito sem querer na main e só vejo depois. Que config de Git ou hook ajuda a evitar isso?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre DevOps e deploy. Use exemplos de publicar jogos no Roblox, fazer deploy de bots do Discord, atualizar apps na Play Store. Mostre como devs reais shipam coisas. Seja direto, sem fluff.'
    },
    resources: [
      { title: 'CS50 Semana 1 — Git', url: 'https://cs50.harvard.edu/x/2024/weeks/1/' },
      { title: 'Conventional Commits (spec)', url: 'https://www.conventionalcommits.org/' }
    ]
  },

  // ─── do-4 ───────────────────────────────────────────────────────────────────
  {
    id: 'do-4-git-internals',
    title: 'Git Por Dentro: A DAG dos Commits',
    week: 1,
    xp: 80,
    difficulty: 'Avançado',
    priority: '⭐⭐',
    hook: 'Como o GitHub guarda MILHÕES de versões de código sem travar? DAG. Todo commit é um snapshot, toda branch é um ponteiro, e o repo inteiro é um grafo direcionado acíclico — entender a DAG destrava rebase, cherry-pick e "o que significa HEAD~3?".',

    assess: {
      type: 'multipleChoice',
      question: 'No Git, o que um commit contém de verdade?',
      options: [
        { text: 'Um diff em relação ao commit anterior', feedback: 'Confusão comum — commits são snapshots, não diffs. O Git calcula diffs sob demanda.' },
        { text: 'Um snapshot da árvore do projeto + metadados (autor, mensagem, hash do pai)', feedback: 'Isso! Commits são snapshots completos referenciados por um hash SHA-1, com ponteiro pro(s) commit(s) pai.', correct: true },
        { text: 'Só a mensagem do commit e o autor', feedback: 'Commits também contêm o snapshot da árvore e o ponteiro pro pai.' },
        { text: 'Um zip compactado só dos arquivos alterados', feedback: 'O Git guarda objetos de árvore completos, deduplicados por hash de conteúdo — não é zip de mudanças.' }
      ]
    },

    learn: {
      hook: 'Por baixo do amigável `git commit -m` tem um sistema de arquivos endereçado por conteúdo, com objetos ligados num grafo direcionado acíclico. Quando você vê o grafo, rebase e cherry-pick param de ser mágica.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/1/',
        title: 'CS50 Semana 1: Git Por Dentro',
        duration: '30 min',
        yourTakeaway: 'Repare como commits se ligam pelo hash do pai — essa ligação é todo o modelo de dados.'
      },
      conceptText: `Por dentro, o Git é um **sistema de arquivos endereçado por conteúdo**. Todo dado é guardado como um **objeto** identificado pelo hash SHA-1 do seu conteúdo.\n\nExistem quatro tipos de objeto:\n\n- **Blob** — o conteúdo cru de um arquivo (sem nome, sem metadado).\n- **Tree** — uma listagem de diretório, mapeando nomes pra hashes de blob ou tree (com modo e tipo).\n- **Commit** — uma referência de snapshot: aponta pra uma tree, nomeia um commit pai (ou dois em merges), guarda autor, committer, mensagem e timestamp.\n- **Tag** — um ponteiro nomeado pra um commit, usado pra releases.\n\nO **grafo de commits** é uma **DAG (directed acyclic graph)**: cada commit aponta pro(s) pai(s), então o histórico flui pra trás no tempo. Uma branch é só um ponteiro móvel pra um commit. \`HEAD\` é um ponteiro pra branch atual (ou direto pra um commit em "detached HEAD").\n\n\`HEAD~1\` significa "o pai de HEAD", \`HEAD~2\` significa "o avô", e por aí vai. \`HEAD^\` é equivalente a \`HEAD~1\` na maioria dos casos.\n\nUm **merge commit** tem DOIS pais — junta duas linhas de histórico. Um **rebase** reescreve o histórico replayando seus commits em cima de outra base, criando novos commits com novos hashes (os antigos ficam inalcançáveis e são limpos depois).\n\nQuando você cria uma branch \`feat/novo-comando\` a partir da main e dá três commits, a DAG fica: \`A ← B ← C\` (main) e \`A ← B ← D ← E ← F\` (feat/novo-comando). Os commits A e B são COMPARTILHADOS — o Git não duplica eles. Cada commit novo aponta pro pai por hash.\n\nIsso importa no seu workflow: quando você cria \`feat/comando-musica\` a partir da main, e a main avança pro commit G enquanto você faz D-E-F, tem que decidir entre **merge** (cria um commit novo com dois pais, preserva histórico completo) ou **rebase** (replaya D-E-F em cima de G, gera histórico linear com hashes novos).\n\nCommitar é praticamente de graça no Git — todo \`git commit\` só dá hash numa tree e escreve um pequeno objeto de commit. Essa "graça" é o que torna commits pequenos e frequentes o padrão certo.\n\nO **reflog** (\`git reflog\`) é sua rede de segurança: grava todo movimento que o HEAD faz, então você recupera commits mesmo depois de um reset ou rebase ruim. A DAG segura commits inalcançáveis por uns 30 dias antes do garbage collection.\n\nQuando você entende commits como snapshots na DAG, operações avançadas param de assustar. \`cherry-pick\` é "copia as mudanças desse commit pra minha branch como um commit novo." \`rebase -i\` é "reescreve essa sequência de commits antes de replayar." \`bisect\` é "busca binária na DAG pra achar o commit que introduziu o bug."`,
      realWorldExample: 'No repo do seu bot do Discord, quando você cria `feat/novo-comando` a partir da main no commit A, e a main avança 5 commits enquanto você desenvolve, vem a escolha clássica merge-vs-rebase. Rebase dá um histórico linear (melhor pra `git bisect` se aparecer bug depois) mas reescreve seus hashes. Merge preserva os commits originais mas adiciona um "merge commit" com dois pais. A maioria dos times indie usa rebase pra branches curtas e merge pra branches de release.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Identifique o Objeto',
        question: 'Você roda `git cat-file -t abc123` e aparece "tree". O que esse objeto contém?',
        options: [
          { text: 'Os bytes crus de um único arquivo', feedback: 'Isso é blob.' },
          { text: 'Uma listagem de diretório — nome → hash de blob ou sub-tree', feedback: 'Isso! Trees são como o Git representa pastas.', correct: true },
          { text: 'Mensagem de commit e timestamp', feedback: 'Isso é um objeto commit.' },
          { text: 'Uma tag de release', feedback: 'Isso é um objeto tag.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Ordene a Resolução do Commit',
        description: 'Quando você roda `git show HEAD~2`, em que ordem o Git resolve a referência?',
        items: [
          'Lê o objeto tree — pega a lista de arquivos',
          'Lê o objeto commit — pega o hash do pai',
          'Lê o commit pai — pega o hash do avô',
          'Resolve HEAD pra ponta da branch atual',
          'Mostra o snapshot ou diff resultante'
        ],
        correctOrder: [3, 1, 2, 0, 4],
        feedback: 'HEAD → commit atual → pai → avô → tree dele → mostrar. Cada ref é uma consulta de hash.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Trace a DAG',
        instructions: 'Dado esse histórico, onde HEAD fica depois de `git reset --hard HEAD~2`?',
        code: `// antes:
// A ← B ← C ← D ← HEAD
// comando:
// $ git reset --hard HEAD~2`,
        question: 'Em qual commit HEAD tá agora?',
        options: [
          { text: 'D', feedback: 'HEAD estava em D antes — reset move ele.' },
          { text: 'B', feedback: 'Isso! HEAD~2 significa "dois pais atrás de HEAD" — D → C → B.', correct: true },
          { text: 'A', feedback: 'Isso seria HEAD~3.' },
          { text: 'Não muda', feedback: 'reset --hard com certeza move o HEAD.' }
        ],
        feedback: 'HEAD~N é uma contagem de links de pai — anda N passos pra trás na DAG.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'simpleHash',
        instructions: [
          'Escreva simpleHash(str) que retorna um hash hex de 4 chars (uma versão de brinquedo do que o Git faz).',
          'Some os char codes, módulo 65536, converta pra hex e padStart pra 4 chars com "0".',
          'simpleHash("abc") → "0126" (97+98+99 = 294 → "126" → "0126")'
        ],
        sampleCode: `function simpleHash(str) {
  // TODO
}`,
        solution: `function simpleHash(str) {
  let sum = 0;
  for (const c of str) {
    sum += c.charCodeAt(0);
  }
  return (sum % 65536).toString(16).padStart(4, '0');
}`,
        tests: [
          { input: 'simpleHash("abc")', expected: '0126', desc: '97+98+99 = 294 → 0x126' },
          { input: 'simpleHash("")', expected: '0000', desc: 'string vazia' },
          { input: 'simpleHash("a")', expected: '0061', desc: 'um char a = 97 = 0x61' }
        ],
        hints: [
          'Itere a string e acumule charCodeAt(0).',
          'Use sum % 65536 pra manter em 16 bits.',
          'Number.toString(16) dá hex; padStart(4, "0") preenche com zeros na frente.'
        ]
      },
      {
        level: 2,
        title: 'buildTreeEntry',
        instructions: [
          'Escreva buildTreeEntry(mode, type, hash, name) que retorna uma linha de listagem de tree do Git.',
          'Formato: "mode type hash name" (separado por espaço).',
          'buildTreeEntry("100644", "blob", "abc123", "README.md") → "100644 blob abc123 README.md"'
        ],
        sampleCode: `function buildTreeEntry(mode, type, hash, name) {
  // TODO
}`,
        solution: `function buildTreeEntry(mode, type, hash, name) {
  return mode + ' ' + type + ' ' + hash + ' ' + name;
}`,
        tests: [
          { input: 'buildTreeEntry("100644","blob","abc123","README.md")', expected: '100644 blob abc123 README.md', desc: 'entrada de arquivo padrão' },
          { input: 'buildTreeEntry("040000","tree","def456","src")', expected: '040000 tree def456 src', desc: 'entrada de pasta' },
          { input: 'buildTreeEntry("100755","blob","xyz789","script.sh")', expected: '100755 blob xyz789 script.sh', desc: 'arquivo executável' }
        ],
        hints: [
          'Só concatene os quatro campos com espaço.',
          'Array.join(" ") também funciona: [mode, type, hash, name].join(" ").',
          'Objetos tree reais usam formato binário — esse é o formato que o `git ls-tree` mostra.'
        ]
      },
      {
        level: 3,
        title: 'isAncestor',
        instructions: [
          'Escreva isAncestor(commits, parent, child) que retorna true se "parent" é alcançável a partir de "child" andando pelos links de pai.',
          'commits é um array de { id, parent }. parent de cada commit é uma string de id ou null.',
          'isAncestor anda do id do child seguindo links de pai até bater em null ou achar parent.'
        ],
        sampleCode: `function isAncestor(commits, parent, child) {
  // TODO
}`,
        solution: `function isAncestor(commits, parent, child) {
  const map = {};
  for (const c of commits) map[c.id] = c;
  let cur = child;
  while (cur) {
    if (cur === parent) return true;
    const node = map[cur];
    if (!node) return false;
    cur = node.parent;
  }
  return false;
}`,
        tests: [
          { input: 'isAncestor([{id:"c3",parent:"c2"},{id:"c2",parent:"c1"},{id:"c1",parent:null}],"c1","c3")', expected: true, desc: 'c1 é ancestral de c3' },
          { input: 'isAncestor([{id:"c2",parent:null},{id:"c1",parent:null}],"c1","c2")', expected: false, desc: 'commits não relacionados' },
          { input: 'isAncestor([{id:"c1",parent:null}],"c1","c1")', expected: true, desc: 'commit é seu próprio ancestral' }
        ],
        hints: [
          'Construa um mapa de id → commit.',
          'Ande do child pra cima, comparando cada id visitado com parent.',
          'Pare quando bater em null ou acabar a lista.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Teste Final de Git Interno',
      steps: [
        {
          type: 'coding',
          title: 'shortenHash',
          instructions: 'Escreva shortenHash(hash, len) que retorna os primeiros `len` chars do hash. Se len for maior que o hash, retorne o hash inteiro. O Git geralmente usa hash curto de 7 chars.',
          sampleCode: `function shortenHash(hash, len) {
  // TODO
}`,
          solution: `function shortenHash(hash, len) {
  return hash.slice(0, len);
}`,
          tests: [
            { input: 'shortenHash("abc1234567def", 7)', expected: 'abc1234', desc: 'hash curto padrão de 7 chars' },
            { input: 'shortenHash("abcdef", 10)', expected: 'abcdef', desc: 'len maior que o hash' },
            { input: 'shortenHash("a1b2c3d4", 4)', expected: 'a1b2', desc: 'corta pra 4 chars' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Por que `git rebase` é considerado "destrutivo" mesmo sem perder dados na hora?',
          options: [
            { text: 'Apaga arquivos do disco', feedback: 'Nenhum conteúdo de arquivo se perde — só os commits são reescritos.' },
            { text: 'Cria objetos de commit novos com hashes novos, e os commits originais ficam inalcançáveis', feedback: 'Isso! Os commits antigos ficam um tempo no reflog, mas os hashes mudaram — quem já tinha puxado a branch vê histórias divergentes.', correct: true },
            { text: 'Sobe commits antes de estarem prontos', feedback: 'rebase só roda localmente até você dar push.' },
            { text: 'É um alias pra rm -rf .git', feedback: 'Definitivamente não.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Dei rebase numa branch e force push — agora meu colega diz que o pull dele tá conflitando. O que aconteceu na DAG e como conserto?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre DevOps e deploy. Use exemplos de publicar jogos no Roblox, fazer deploy de bots do Discord, atualizar apps na Play Store. Mostre como devs reais shipam coisas. Seja direto, sem fluff.'
    },
    resources: [
      { title: 'Git Internals — Pro Git Book', url: 'https://git-scm.com/book/en/v2/Git-Internals-Git-Objects' },
      { title: 'Visualizing Git', url: 'https://git-school.github.io/visualizing-git/' }
    ]
  },

  // ─── do-5 ───────────────────────────────────────────────────────────────────
  {
    id: 'do-5-debugging',
    title: 'Estratégias de Debugging',
    week: 2,
    xp: 60,
    difficulty: 'Intermediário',
    priority: '⭐',
    hook: 'Bug no Roblox? Erro no seu site? Aqui você aprende a CAÇAR esses zumbis. Devs sêniores não debugam mais rápido porque "sabem" — eles têm um kit sistemático de estratégias que aplicam quando travam.',

    assess: {
      type: 'multipleChoice',
      question: 'Você tem uma função de 200 linhas que joga "Cannot read property of undefined" em algum lugar. Qual o jeito MAIS RÁPIDO de localizar o bug?',
      options: [
        { text: 'Reler a função inteira com calma', feedback: 'Lento e propenso a erro com 200 linhas.' },
        { text: 'Busca binária: adiciona um console.log no meio e vê se roda', feedback: 'Isso! Dividir a busca pela metade cada vez acha o bug em log(n) passos.', correct: true },
        { text: 'Reescrever a função do zero', feedback: 'Quase sempre exagero.' },
        { text: 'Envolver tudo em try/catch', feedback: 'Isso esconde o erro em vez de achar.' }
      ]
    },

    learn: {
      hook: 'Todo minuto debugando às cegas é minuto perdido. Um punhado de estratégias — ler o stack trace, busca binária, conversar com o pato, reproduzir de boa — transforma debug de jogo de adivinhação em procedimento.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/2/',
        title: 'CS50 Semana 2: Debugging',
        duration: '20 min',
        yourTakeaway: 'Repare como o Brian usa print statements, o debugger e reproduzir o bug como técnicas separadas.'
      },
      conceptText: `**Debugar** é localizar e consertar um defeito. É mais ciência que arte — os melhores debuggers seguem um método.\n\nO **primeiro passo é sempre reproduzir**. Se você não consegue reproduzir o bug, não consegue verificar o conserto. Capture a entrada exata, navegador, OS, ambiente, e passos.\n\n**Ler o stack trace** vem em seguida. O trace lista as chamadas de função que levaram ao erro, a mais recente no topo. Procure o SEU código no trace — geralmente fica abaixo do barulho do framework. O arquivo:linha no topo te diz onde o erro foi jogado; linhas mais fundas te dizem como chegou lá.\n\n**Diagnóstico de erro** mapeia tipo de erro pra causa:\n- \`TypeError: Cannot read property X of undefined\` → um objeto que você esperava era null/undefined.\n- \`ReferenceError\` → nome de variável escrito errado ou fora de escopo.\n- \`SyntaxError\` → o parser falhou; nunca é lógica de runtime.\n- \`RangeError\` → tipicamente recursão infinita ou tamanho de array inválido.\n\n**Debugging por busca binária** é a estratégia de maior alavancagem: adiciona um log no meio do código suspeito, roda, vê se o bug acontece antes ou depois. Divide o espaço de busca pela metade. Repete. Você sai de 1000 linhas pra a linha exata em uns 10 passos.\n\n**Debug do pato de borracha**: explica o código, linha por linha, em voz alta (pra um pato literal ou pra você mesmo nos comentários). Articular força você a questionar suposições que tava fazendo em silêncio.\n\nOutras táticas: **bisect com Git** pra achar o commit que introduziu o bug. **Reduza pra um mínimo reproduzível** — vai apagando código até apagar mais uma linha fazer o bug sumir. **Diff contra uma versão que funciona** pra ver o que mudou.`,
      realWorldExample: 'Quando seu bot do Discord joga "Cannot read property channel of undefined" só em produção (Heroku), a cadeia é: (1) ver o stack trace pra achar a linha real, (2) logar o input que disparou o erro, (3) confirmar que é um formato de dado que seu código nunca esperou (provavelmente um evento sem um campo), (4) adicionar uma guarda. Cinco minutos focados batem uma hora encarando o código.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Escolha a Estratégia',
        question: 'Um teste falha às vezes — uns 1 em cada 10 runs. Qual a causa mais provável?',
        options: [
          { text: 'Um typo no código do teste', feedback: 'Typos falham toda vez, não às vezes.' },
          { text: 'Race condition ou teste dependendo de timing/estado async', feedback: 'Isso! Testes "flaky" quase sempre envolvem timing, ordem, ou estado compartilhado.', correct: true },
          { text: 'Bug no test runner', feedback: 'Possível mas raro — geralmente é seu código.' },
          { text: 'Seu computador é muito lento', feedback: 'Performance pode afetar testes sensíveis a tempo, mas a causa raiz é a dependência de timing.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Ordene os Passos de Debug',
        description: 'Um jogador reporta bug no seu jogo Roblox. Arrume esses passos na ordem certa.',
        items: [
          'Localizar o bug numa linha ou função específica',
          'Reproduzir o bug local',
          'Capturar os passos exatos e o input do jogador',
          'Escrever teste de regressão e dar push do fix',
          'Formar uma hipótese sobre a causa e testar'
        ],
        correctOrder: [2, 1, 0, 4, 3],
        feedback: 'Capturar → reproduzir → localizar → hipotetizar → consertar com teste. Pular qualquer passo geralmente faz refazer os outros.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Lendo o Stack Trace',
        instructions: 'Por onde começar a procurar o bug com base nesse stack trace?',
        code: `TypeError: Cannot read property 'title' of undefined
    at formatPost (post.js:42)
    at distribute (distributor.js:18)
    at main (index.js:6)`,
        question: 'Qual linha é mais útil investigar primeiro?',
        options: [
          { text: 'index.js:6', feedback: 'Esse é só o ponto de entrada — longe demais na cadeia.' },
          { text: 'post.js:42 dentro de formatPost', feedback: 'Isso! O TOPO do stack é onde o erro foi jogado — comece aí.', correct: true },
          { text: 'distributor.js:18', feedback: 'Esse é o chamador; cheque depois pra ver o que foi passado.' },
          { text: 'Impossível dizer pelo trace', feedback: 'O trace localiza o erro claramente.' }
        ],
        feedback: 'Stack traces se leem de cima pra baixo: topo = onde falhou, abaixo = como chegou aí.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'parseStackTrace',
        instructions: [
          'Escreva parseStackTrace(trace) que parseia um stack trace de JS em frames estruturados.',
          'Cada linha é tipo "    at funcName (file.js:line)". Retorne [{ fn, file, line }, ...].',
          'Ignore a linha de mensagem de erro no começo.'
        ],
        sampleCode: `function parseStackTrace(trace) {
  // TODO
}`,
        solution: `function parseStackTrace(trace) {
  const frames = [];
  const lines = trace.split('\\n');
  for (const line of lines) {
    const m = line.match(/at\\s+(\\S+)\\s+\\(([^:]+):(\\d+)\\)/);
    if (m) frames.push({ fn: m[1], file: m[2], line: Number(m[3]) });
  }
  return frames;
}`,
        tests: [
          { input: 'parseStackTrace("at doThing (app.js:42)\\nat main (index.js:10)")', expected: [{ fn: 'doThing', file: 'app.js', line: 42 }, { fn: 'main', file: 'index.js', line: 10 }], desc: 'dois frames' },
          { input: 'parseStackTrace("at run (a.js:1)")', expected: [{ fn: 'run', file: 'a.js', line: 1 }], desc: 'um frame' },
          { input: 'parseStackTrace("")', expected: [], desc: 'trace vazio' }
        ],
        hints: [
          'Use regex pra bater "at FN (FILE:LINE)" — capture cada parte.',
          'Pule linhas que não dão match (tipo o cabeçalho de mensagem).',
          'Converta o número da linha pra Number.'
        ]
      },
      {
        level: 2,
        title: 'diagnoseError',
        instructions: [
          'Escreva diagnoseError(error) que retorna { type, message, suggestion } baseado no nome do erro.',
          'Pra TypeError → sugira "Veja se o objeto não é null/undefined antes de acessar propriedades".',
          'Pra ReferenceError → sugira "Cheque o nome da variável por typos e veja se tá no escopo".',
          'Pra SyntaxError → sugira "Procure brackets, ponto-e-vírgulas ou aspas faltando perto da linha".',
          'Outros → sugira "Cheque a mensagem de erro e a linha que ela aponta".'
        ],
        sampleCode: `function diagnoseError(error) {
  // TODO
}`,
        solution: `function diagnoseError(error) {
  const suggestions = {
    TypeError: 'Veja se o objeto não é null/undefined antes de acessar propriedades',
    ReferenceError: 'Cheque o nome da variável por typos e veja se tá no escopo',
    SyntaxError: 'Procure brackets, ponto-e-vírgulas ou aspas faltando perto da linha'
  };
  return {
    type: error.name,
    message: error.message,
    suggestion: suggestions[error.name] || 'Cheque a mensagem de erro e a linha que ela aponta'
  };
}`,
        tests: [
          { input: 'diagnoseError({name:"TypeError",message:"Cannot read property of undefined"})', expected: { type: 'TypeError', message: 'Cannot read property of undefined', suggestion: 'Veja se o objeto não é null/undefined antes de acessar propriedades' }, desc: 'diagnóstico TypeError' },
          { input: 'diagnoseError({name:"ReferenceError",message:"x is not defined"})', expected: { type: 'ReferenceError', message: 'x is not defined', suggestion: 'Cheque o nome da variável por typos e veja se tá no escopo' }, desc: 'diagnóstico ReferenceError' },
          { input: 'diagnoseError({name:"RangeError",message:"Maximum call stack"})', expected: { type: 'RangeError', message: 'Maximum call stack', suggestion: 'Cheque a mensagem de erro e a linha que ela aponta' }, desc: 'tipo de erro desconhecido' }
        ],
        hints: [
          'Um objeto de lookup indexado por error.name resolve os três casos comuns.',
          'Use `||` pra ter o fallback genérico.',
          'Retorne os três campos num objeto só.'
        ]
      },
      {
        level: 3,
        title: 'binarySearchDebug',
        instructions: [
          'Escreva binarySearchDebug(arr, target, predicate) que acha o PRIMEIRO índice onde predicate(arr[i]) é true.',
          'Suponha que o array tá "ordenado" pelo predicate: todos os false vêm primeiro, depois todos os true.',
          'Retorne -1 se predicate nunca é true.',
          'Isso modela o que ferramentas de bisect fazem — achar o primeiro commit "quebrado".'
        ],
        sampleCode: `function binarySearchDebug(arr, target, predicate) {
  // TODO
}`,
        solution: `function binarySearchDebug(arr, target, predicate) {
  let low = 0;
  let high = arr.length - 1;
  let result = -1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (predicate(arr[mid])) {
      result = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return result;
}`,
        tests: [
          { input: 'binarySearchDebug([1,2,3,4,5], null, x => x >= 3)', expected: 2, desc: 'primeiro índice onde x >= 3' },
          { input: 'binarySearchDebug([1,2,3], null, x => x > 99)', expected: -1, desc: 'nunca true' },
          { input: 'binarySearchDebug([5,6,7], null, x => x >= 5)', expected: 0, desc: 'sempre true' }
        ],
        hints: [
          'Busca binária padrão, mas quando predicate é true, guarda o índice e busca à ESQUERDA.',
          'Quando predicate é false, busca à DIREITA.',
          'Rastreie o índice "true" mais à esquerda visto.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Teste Final de Debugging',
      steps: [
        {
          type: 'coding',
          title: 'safeGet',
          instructions: 'Escreva safeGet(obj, path) que anda com segurança por um caminho separado por pontos num objeto e retorna o valor, ou undefined se algum passo no meio for null/undefined. safeGet({a:{b:{c:1}}}, "a.b.c") → 1. safeGet({a:1}, "a.b.c") → undefined.',
          sampleCode: `function safeGet(obj, path) {
  // TODO
}`,
          solution: `function safeGet(obj, path) {
  const keys = path.split('.');
  let cur = obj;
  for (const k of keys) {
    if (cur == null) return undefined;
    cur = cur[k];
  }
  return cur;
}`,
          tests: [
            { input: 'safeGet({a:{b:{c:1}}}, "a.b.c")', expected: 1, desc: 'caminho fundo' },
            { input: 'safeGet({a:1}, "a.b.c")', expected: undefined, desc: 'caminho para no meio' },
            { input: 'safeGet(null, "a")', expected: undefined, desc: 'raiz null' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Você deu 10 commits desde o último release. Produção quebrou. Qual ferramenta Git ajuda a achar EXATAMENTE o commit que introduziu o bug?',
          options: [
            { text: 'git reflog', feedback: 'reflog mostra histórico do HEAD — útil pra recuperar, não pra fazer bisect.' },
            { text: 'git bisect — faz busca binária nos commits pra achar o ruim', feedback: 'Isso! bisect usa seu teste (ou check manual) pra dividir o espaço até achar o culpado.', correct: true },
            { text: 'git blame', feedback: 'blame mostra quem editou cada linha — útil DEPOIS que você sabe a linha, não antes.' },
            { text: 'git diff', feedback: 'diff compara dois estados — bisect acha eles.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Meu site funciona local mas quebra em produção no Vercel. Que checklist sistemática usar pra debugar "funciona na minha máquina"?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre DevOps e deploy. Use exemplos de publicar jogos no Roblox, fazer deploy de bots do Discord, atualizar apps na Play Store. Mostre como devs reais shipam coisas. Seja direto, sem fluff.'
    },
    resources: [
      { title: 'CS50 Semana 2 — Debugging', url: 'https://cs50.harvard.edu/x/2024/weeks/2/' },
      { title: 'Guia do Chrome DevTools', url: 'https://developer.chrome.com/docs/devtools/javascript/' }
    ]
  },

  // ─── do-6 ───────────────────────────────────────────────────────────────────
  {
    id: 'do-6-env',
    title: 'Variáveis de Ambiente e Arquivos .env',
    week: 9,
    xp: 60,
    difficulty: 'Intermediário',
    priority: '⭐',
    hook: 'Senhas, tokens de API — onde guardar? Em .env, nunca no código! Hardcodar a URL do seu banco no commit é como segredos vazam — arquivos .env mantêm credenciais fora do código e dão configuração própria pra cada ambiente.',

    assess: {
      type: 'multipleChoice',
      question: 'Por que arquivos `.env` devem entrar no `.gitignore`?',
      options: [
        { text: 'Deixam o repo maior', feedback: 'Geralmente são minúsculos — tamanho não é o problema.' },
        { text: 'Contêm segredos e valores específicos de ambiente que não devem ir pro repositório', feedback: 'Isso! Chaves de API, URLs de banco e outros segredos não podem entrar no controle de versão.', correct: true },
        { text: 'O Vite não consegue ler', feedback: 'O Vite lê .env nativamente.' },
        { text: 'Foram deprecados em favor de JSON', feedback: '.env tá vivo e bem — é o padrão pra config de ambiente.' }
      ]
    },

    learn: {
      hook: 'A chave do seu Firebase em produção não pode estar no mesmo código que a chave de desenvolvimento. Arquivos .env são como todo app moderno lida com config por ambiente sem vazar segredos.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/9/',
        title: 'CS50 Semana 9: Variáveis de Ambiente',
        duration: '20 min',
        yourTakeaway: 'Repare como o mesmo código roda em dev, staging e prod só trocando o arquivo de env.'
      },
      conceptText: `**Variáveis de ambiente** são pares chave-valor que seu programa lê do ambiente em vez de hardcodar. É como você mantém segredos fora do repo e como o mesmo código lida com desenvolvimento, staging e produção com configs diferentes.\n\nUm **arquivo \`.env\`** tem formato simples: \`CHAVE=VALOR\` por linha. Comentários começam com \`#\`. Aspas não são obrigatórias, mas a maioria dos parsers aceita.\n\n\`\`\`\n# .env.local\nPORT=3000\nDATABASE_URL=postgres://localhost/dev\nDISCORD_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6...\n\`\`\`\n\n**Regras**: nunca comite \`.env\` com segredos — bote no \`.gitignore\`. Comite um \`.env.example\` template listando as chaves necessárias com valores placeholder, pra os colegas saberem o que configurar.\n\nNo **Vite + React**, env vars precisam de prefixo \`VITE_\` pra serem expostas no bundle do navegador: \`import.meta.env.VITE_API_URL\`. Vars SEM o prefixo ficam só no servidor. Esse prefixo é uma rede de segurança — força você a optar por expor cada variável.\n\nNo **Node.js**, env vars são lidas de \`process.env.CHAVE\`. Bibliotecas tipo \`dotenv\` carregam \`.env\` em \`process.env\` na inicialização.\n\n**Validação** é crítica. Na inicialização do app, cheque se toda variável necessária tá presente e falhe com mensagem clara se faltar alguma. Uma env var faltando que só quebra num endpoint específico pode levar dias pra descobrir.\n\nUm padrão maduro: um módulo \`config.js\` carrega, valida e tipa toda env var, e exporta um objeto de config tipado. O resto do código nunca toca \`process.env\` direto.`,
      realWorldExample: 'Seu bot do Discord provavelmente tem DISCORD_TOKEN e DATABASE_URL no .env.local (gitignorado), mais um .env.example commitado pra novos colaboradores. No Heroku/Railway, você define as mesmas chaves no dashboard pra produção. O MESMO código roda em todos os ambientes — só o arquivo de env muda.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Prefixo Vite',
        question: 'Num app Vite React, qual env variável fica disponível no navegador como `import.meta.env`?',
        options: [
          { text: 'API_KEY', feedback: 'Sem prefixo — o Vite esconde do bundle do navegador.' },
          { text: 'VITE_API_KEY', feedback: 'Isso! O Vite só expõe pro cliente variáveis que começam com VITE_.', correct: true },
          { text: 'NEXT_PUBLIC_API_KEY', feedback: 'Essa é convenção do Next.js — outro framework.' },
          { text: 'REACT_APP_API_KEY', feedback: 'Essa é convenção do Create React App — Vite usa VITE_.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Ordene o Setup de Env',
        description: 'Você tá configurando env vars pra um repo novo do seu bot. Ordene os passos.',
        items: [
          'Documentar vars necessárias em .env.example',
          'Adicionar .env no .gitignore',
          'Criar .env.local com seus valores reais',
          'Ler import.meta.env.VITE_X no código',
          'Adicionar env vars no dashboard do Heroku pra produção'
        ],
        correctOrder: [1, 2, 0, 3, 4],
        feedback: 'Ignore primeiro (pra nunca commitar sem querer), cria local, documenta, usa, e por último define produção.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Lendo o Arquivo .env',
        instructions: 'O que sai quando parseia esse arquivo .env?',
        code: `// conteúdo do .env:
// PORT=3000
// # linha de comentário
// DB_URL=postgres://localhost
// API_KEY="secret123"`,
        question: 'Qual o objeto parseado correto?',
        options: [
          { text: '{ PORT: 3000, DB_URL: "postgres://localhost", API_KEY: "secret123" }', feedback: 'Quase — mas PORT devia ser string. Valores de .env são sempre string até você converter.' },
          { text: '{ PORT: "3000", DB_URL: "postgres://localhost", API_KEY: "secret123" }', feedback: 'Isso! Todos os valores são string; comentário é ignorado; aspas em volta de API_KEY são removidas.', correct: true },
          { text: '{ PORT: "3000", "# linha de comentário": "", DB_URL: "..." }', feedback: 'Comentários têm que ser ignorados.' },
          { text: 'Um objeto aninhado com seções', feedback: 'Arquivos .env são planos — sem seções.' }
        ],
        feedback: 'Todo valor de .env é string. Converte pra Number ou boolean explicitamente na camada de config.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'parseEnvFile',
        instructions: [
          'Escreva parseEnvFile(content) que parseia texto estilo .env num objeto.',
          'Cada linha é CHAVE=VALOR. Pule linhas vazias e linhas começando com "#".',
          'Tire aspas duplas em volta do valor, se tiver.',
          'parseEnvFile("PORT=3000\\nDB_URL=postgres://localhost") → { PORT: "3000", DB_URL: "postgres://localhost" }'
        ],
        sampleCode: `function parseEnvFile(content) {
  // TODO
}`,
        solution: `function parseEnvFile(content) {
  const result = {};
  const lines = content.split('\\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    result[key] = value;
  }
  return result;
}`,
        tests: [
          { input: 'parseEnvFile("PORT=3000\\nDB_URL=postgres://localhost")', expected: { PORT: '3000', DB_URL: 'postgres://localhost' }, desc: 'duas vars' },
          { input: 'parseEnvFile("# comment\\nKEY=value")', expected: { KEY: 'value' }, desc: 'pula comentário' },
          { input: 'parseEnvFile("KEY=\\"quoted\\"")', expected: { KEY: 'quoted' }, desc: 'tira aspas' }
        ],
        hints: [
          'Divida em newlines e dê trim em cada linha.',
          'Pule linhas vazias e linhas começando com "#".',
          'Use indexOf("=") pra valores que contêm "=" ainda parsearem certo.'
        ]
      },
      {
        level: 2,
        title: 'getEnv',
        instructions: [
          'Escreva getEnv(envObj, key, defaultVal) que retorna envObj[key] se existir e não for vazio, senão defaultVal.',
          'getEnv({PORT:"3000"}, "PORT", "8080") → "3000"',
          'getEnv({}, "PORT", "8080") → "8080"'
        ],
        sampleCode: `function getEnv(envObj, key, defaultVal) {
  // TODO
}`,
        solution: `function getEnv(envObj, key, defaultVal) {
  const val = envObj[key];
  if (val === undefined || val === '') return defaultVal;
  return val;
}`,
        tests: [
          { input: 'getEnv({PORT:"3000"}, "PORT", "8080")', expected: '3000', desc: 'valor presente' },
          { input: 'getEnv({}, "PORT", "8080")', expected: '8080', desc: 'chave faltando, usa default' },
          { input: 'getEnv({PORT:""}, "PORT", "8080")', expected: '8080', desc: 'string vazia, usa default' }
        ],
        hints: [
          'Cheque undefined E string vazia.',
          'O padrão `val ?? defaultVal` NÃO trata "" como faltando — seja explícito.',
          'Retorne val se presente, defaultVal se não.'
        ]
      },
      {
        level: 3,
        title: 'validateEnv',
        instructions: [
          'Escreva validateEnv(required, provided) que retorna { valid, missing }.',
          'required é um array de chaves; provided é o objeto env.',
          'missing é a lista de chaves required que não estão em provided (ou com valor vazio).',
          'valid é true se missing.length === 0.'
        ],
        sampleCode: `function validateEnv(required, provided) {
  // TODO
}`,
        solution: `function validateEnv(required, provided) {
  const missing = [];
  for (const key of required) {
    const val = provided[key];
    if (val === undefined || val === '') missing.push(key);
  }
  return { valid: missing.length === 0, missing };
}`,
        tests: [
          { input: 'validateEnv(["PORT","DB_URL"],{PORT:"3000"})', expected: { valid: false, missing: ['DB_URL'] }, desc: 'falta um' },
          { input: 'validateEnv(["PORT"],{PORT:"3000",EXTRA:"yes"})', expected: { valid: true, missing: [] }, desc: 'todos presentes, extras ok' },
          { input: 'validateEnv([],{})', expected: { valid: true, missing: [] }, desc: 'nada obrigatório' }
        ],
        hints: [
          'Itere as chaves required, empurra pra missing se faltando ou vazio.',
          'valid é só missing.length === 0.',
          'Chaves extras em provided são ok — só required importa.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Teste Final de Config de Env',
      steps: [
        {
          type: 'coding',
          title: 'mergeEnvSources',
          instructions: 'Escreva mergeEnvSources(base, override) que mescla dois objetos env. Valores de override ganham, mas só quando não vazios. Strings vazias em override caem pro base. mergeEnvSources({A:"1",B:"2"}, {A:"99",B:""}) → {A:"99",B:"2"}.',
          sampleCode: `function mergeEnvSources(base, override) {
  // TODO
}`,
          solution: `function mergeEnvSources(base, override) {
  const result = { ...base };
  for (const key of Object.keys(override)) {
    if (override[key] !== '' && override[key] !== undefined) {
      result[key] = override[key];
    }
  }
  return result;
}`,
          tests: [
            { input: 'mergeEnvSources({A:"1",B:"2"}, {A:"99",B:""})', expected: { A: '99', B: '2' }, desc: 'override ganha quando não vazio' },
            { input: 'mergeEnvSources({}, {X:"1"})', expected: { X: '1' }, desc: 'só override' },
            { input: 'mergeEnvSources({Y:"keep"}, {})', expected: { Y: 'keep' }, desc: 'base preservada' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Você commitou seu `.env` com o token do seu bot do Discord pro GitHub semana passada. Qual a resposta certa?',
          options: [
            { text: 'Adicionar .env no .gitignore — problema resolvido', feedback: 'Adicionar no gitignore agora NÃO tira o token do histórico. A chave vazada ainda tá em commits antigos.' },
            { text: 'Regenerar o token no Discord imediatamente, depois remover o arquivo e botar no .gitignore', feedback: 'Isso! Assuma que o token tá comprometido quando vai pra um repo público — regenera primeiro, limpa depois.', correct: true },
            { text: 'Force push pra remover o commit', feedback: 'Quando algo vai pro GitHub, bots já varreram. Force push não apaga o que bots e forks já têm.' },
            { text: 'Tornar o repo privado', feedback: 'Mesmo problema — quem viu ainda tem o token.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Como organizar env vars entre dev local, previews do Vercel e produção do Vercel pro meu app?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre DevOps e deploy. Use exemplos de publicar jogos no Roblox, fazer deploy de bots do Discord, atualizar apps na Play Store. Mostre como devs reais shipam coisas. Seja direto, sem fluff.'
    },
    resources: [
      { title: 'Vite Env Variables', url: 'https://vitejs.dev/guide/env-and-mode.html' },
      { title: 'Twelve-Factor App — Config', url: 'https://12factor.net/config' }
    ]
  },

  // ─── do-7 ───────────────────────────────────────────────────────────────────
  {
    id: 'do-7-docker',
    title: 'Containers: O Básico do Docker',
    week: 9,
    xp: 70,
    difficulty: 'Intermediário',
    priority: '⭐',
    hook: 'Docker: empacota seu app pra ele rodar IGUAL em qualquer máquina. Um container Docker empacota seu app com o OS, runtime e dependências exatos — então "funciona na minha máquina" vira "funciona igual em qualquer máquina".',

    assess: {
      type: 'multipleChoice',
      question: 'Qual a diferença entre uma imagem Docker e um container Docker?',
      options: [
        { text: 'São a mesma coisa', feedback: 'São relacionados mas distintos.' },
        { text: 'Imagem é o blueprint estático; container é uma instância rodando da imagem', feedback: 'Isso! Pensa em classe vs objeto — uma imagem pode gerar vários containers.', correct: true },
        { text: 'Imagem roda, container é só um arquivo', feedback: 'Invertido — imagens são estáticas, containers são o que roda.' },
        { text: 'Imagens são pra Linux, containers pra Mac/Windows', feedback: 'Os dois funcionam em todo lugar que tem Docker.' }
      ]
    },

    learn: {
      hook: 'Quando seu bot do Discord precisa de Node 18 mas o servidor tem Node 14, você perde uma tarde lidando com isso. Containers eliminam essa classe de problema inteira — sua imagem roda igual no laptop, no CI e em prod.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/9/',
        title: 'CS50 Semana 9: Containers & Docker',
        duration: '30 min',
        yourTakeaway: 'Repare como as instruções do Dockerfile empilham em camadas imutáveis e por que isso importa pro cache.'
      },
      conceptText: `**Docker** empacota uma aplicação junto com seu runtime, bibliotecas e configuração numa unidade portátil chamada **imagem**. Uma instância rodando da imagem é um **container**.\n\nUm **Dockerfile** é uma receita — uma sequência de instruções que monta a imagem:\n\n\`\`\`dockerfile\nFROM node:18\nWORKDIR /app\nCOPY package.json .\nRUN npm install\nCOPY . .\nCMD ["node", "app.js"]\n\`\`\`\n\nInstruções principais:\n- \`FROM\` — a imagem base (todo Dockerfile DEVE começar com isso).\n- \`WORKDIR\` — define a pasta de trabalho pras instruções seguintes.\n- \`COPY\` — copia arquivos do seu host pra imagem.\n- \`RUN\` — roda um comando shell no momento do BUILD (tipo instalar deps).\n- \`CMD\` — o comando padrão que roda quando o container inicia.\n- \`EXPOSE\` — documenta qual porta o container escuta.\n- \`ENV\` — define uma variável de ambiente.\n\nCada instrução cria uma **camada**. Camadas são cacheadas: se seu \`package.json\` não mudou, o Docker pula o \`npm install\`. A ordem importa — copie package.json e instale deps ANTES de copiar o código-fonte, pra mudanças no fonte não invalidarem o cache de dependências.\n\nImagens são referenciadas por **tag**: \`nome:versão\` ou \`registry/user/nome:versão\`. \`ghcr.io/elly/meu-bot:1.2.0\` é a forma completa. Sem tag, \`latest\` é assumido (convenção, não versão mágica).\n\n**Compose** (\`docker-compose.yml\`) orquestra vários containers — tipo seu app + postgres + redis — com um comando só.\n\nContainers não são VMs. Compartilham o kernel do host, o que deixa eles leves (MBs em vez de GBs) e rápidos pra iniciar (milissegundos em vez de segundos). Tradeoff: menos isolamento que uma VM de verdade.`,
      realWorldExample: 'Quando você publica seu bot do Discord numa plataforma baseada em Docker tipo Fly.io ou Railway, seu Dockerfile é o contrato: mesma versão de Node, mesmas dependências, mesmo comando de start em todo lugar. A primeira vez que você containeriza um app, "funciona na minha máquina" para de ser uma categoria de bug.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Dockerfile com Cache',
        question: 'Qual ordem maximiza o cache de camadas Docker pra um app Node?',
        options: [
          { text: 'COPY . . ENTÃO RUN npm install', feedback: 'Qualquer mudança no fonte invalida o npm install — builds lentos.' },
          { text: 'COPY package.json . ENTÃO RUN npm install ENTÃO COPY . .', feedback: 'Isso! Camada de dependências fica cacheada a não ser que package.json mude — builds bem mais rápidos.', correct: true },
          { text: 'RUN npm install ENTÃO COPY package.json .', feedback: 'Você precisa do package.json ANTES de rodar o install.' },
          { text: 'COPY * . ENTÃO RUN npm install', feedback: 'Ainda copia o fonte antes de instalar, derrotando o cache.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Ordene o Dockerfile',
        description: 'Arrume essas linhas de Dockerfile na ordem certa, amigável ao cache.',
        items: [
          'CMD ["node", "app.js"]',
          'FROM node:18',
          'COPY . .',
          'WORKDIR /app',
          'COPY package.json .',
          'RUN npm install'
        ],
        correctOrder: [1, 3, 4, 5, 2, 0],
        feedback: 'Imagem base → workdir → arquivos de pacote → install → fonte → comando. Essa ordem maximiza acertos de cache.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Monte a Tag',
        instructions: 'Você quer publicar no GitHub Container Registry como user "dev", imagem "meu-bot", versão "1.0.0". Qual a tag?',
        code: `// formato: REGISTRY/USER/IMAGE:VERSION
// GitHub Container Registry é ghcr.io`,
        question: 'Qual tag tá certa?',
        options: [
          { text: 'meu-bot:1.0.0', feedback: 'Sem registry e user — usaria docker.io por padrão e falharia ao publicar.' },
          { text: 'ghcr.io/dev/meu-bot:1.0.0', feedback: 'Isso! registry/user/imagem:versão é a forma canônica.', correct: true },
          { text: 'ghcr.io:1.0.0/dev/meu-bot', feedback: 'Tag vai no final depois de dois pontos, não no registry.' },
          { text: 'dev/meu-bot/ghcr.io@1.0.0', feedback: 'Separador e ordem errados.' }
        ],
        feedback: 'Referências de imagem seguem registry/path:tag — sempre tague explicitamente, nunca confie em `latest`.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'parseDockerfile',
        instructions: [
          'Escreva parseDockerfile(text) que parseia um Dockerfile num array de { instruction, args }.',
          'Cada linha não vazia e não comentário é "INSTRUCTION resto da linha".',
          'parseDockerfile("FROM node:18\\nRUN npm install") → [{instruction:"FROM",args:"node:18"},{instruction:"RUN",args:"npm install"}]'
        ],
        sampleCode: `function parseDockerfile(text) {
  // TODO
}`,
        solution: `function parseDockerfile(text) {
  const result = [];
  const lines = text.split('\\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const space = trimmed.indexOf(' ');
    if (space < 0) {
      result.push({ instruction: trimmed, args: '' });
    } else {
      result.push({ instruction: trimmed.slice(0, space), args: trimmed.slice(space + 1) });
    }
  }
  return result;
}`,
        tests: [
          { input: 'parseDockerfile("FROM node:18\\nRUN npm install\\nCMD node app.js")', expected: [{ instruction: 'FROM', args: 'node:18' }, { instruction: 'RUN', args: 'npm install' }, { instruction: 'CMD', args: 'node app.js' }], desc: 'três instruções' },
          { input: 'parseDockerfile("# comment\\nFROM alpine")', expected: [{ instruction: 'FROM', args: 'alpine' }], desc: 'pula comentário' },
          { input: 'parseDockerfile("")', expected: [], desc: 'entrada vazia' }
        ],
        hints: [
          'Divida em newlines, dê trim em cada linha.',
          'Pule linhas vazias e comentários #.',
          'A primeira palavra é a instrução, o resto é args.'
        ]
      },
      {
        level: 2,
        title: 'buildTag',
        instructions: [
          'Escreva buildTag(image, version, registry) que monta uma referência de imagem.',
          'Se registry não for vazio: "registry/image:version". Se vazio: "image:version".',
          'buildTag("myapp","1.0.0","ghcr.io/user") → "ghcr.io/user/myapp:1.0.0"'
        ],
        sampleCode: `function buildTag(image, version, registry) {
  // TODO
}`,
        solution: `function buildTag(image, version, registry) {
  if (registry) return registry + '/' + image + ':' + version;
  return image + ':' + version;
}`,
        tests: [
          { input: 'buildTag("myapp","1.0.0","ghcr.io/user")', expected: 'ghcr.io/user/myapp:1.0.0', desc: 'com registry' },
          { input: 'buildTag("app","latest","")', expected: 'app:latest', desc: 'sem registry' },
          { input: 'buildTag("coe","v2","docker.io/elly")', expected: 'docker.io/elly/coe:v2', desc: 'estilo docker hub' }
        ],
        hints: [
          'Cheque se registry é truthy.',
          'Concatenação de string resolve os dois casos.',
          'Sem lógica de barra extra pros casos de teste.'
        ]
      },
      {
        level: 3,
        title: 'validateDockerfile',
        instructions: [
          'Escreva validateDockerfile(instructions) que retorna { valid, errors }.',
          'Regra: a PRIMEIRA instrução deve ser FROM. Se não, empurre "Must start with FROM" pros errors.',
          'Regra: lista vazia é inválida com erro "Empty Dockerfile".',
          'valid é true se errors estiver vazio.'
        ],
        sampleCode: `function validateDockerfile(instructions) {
  // TODO
}`,
        solution: `function validateDockerfile(instructions) {
  const errors = [];
  if (instructions.length === 0) {
    errors.push('Empty Dockerfile');
  } else if (instructions[0].instruction !== 'FROM') {
    errors.push('Must start with FROM');
  }
  return { valid: errors.length === 0, errors };
}`,
        tests: [
          { input: 'validateDockerfile([{instruction:"RUN",args:"npm i"}])', expected: { valid: false, errors: ['Must start with FROM'] }, desc: 'falta FROM' },
          { input: 'validateDockerfile([{instruction:"FROM",args:"node:18"},{instruction:"RUN",args:"npm i"}])', expected: { valid: true, errors: [] }, desc: 'começo válido' },
          { input: 'validateDockerfile([])', expected: { valid: false, errors: ['Empty Dockerfile'] }, desc: 'lista vazia' }
        ],
        hints: [
          'Cheque o tamanho primeiro pra lidar com o caso vazio.',
          'Depois cheque que instructions[0].instruction === "FROM".',
          'valid é só errors.length === 0.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Teste Final de Docker',
      steps: [
        {
          type: 'coding',
          title: 'extractBaseImage',
          instructions: 'Escreva extractBaseImage(dockerfileText) que retorna a imagem base da primeira linha FROM, ou null se não achar. extractBaseImage("FROM node:18\\nRUN npm i") → "node:18".',
          sampleCode: `function extractBaseImage(dockerfileText) {
  // TODO
}`,
          solution: `function extractBaseImage(dockerfileText) {
  const lines = dockerfileText.split('\\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('FROM ')) {
      return trimmed.slice(5).trim();
    }
  }
  return null;
}`,
          tests: [
            { input: 'extractBaseImage("FROM node:18\\nRUN npm i")', expected: 'node:18', desc: 'FROM padrão' },
            { input: 'extractBaseImage("# comment\\nFROM alpine:3.18")', expected: 'alpine:3.18', desc: 'pula comentário' },
            { input: 'extractBaseImage("RUN echo hi")', expected: null, desc: 'sem FROM' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Por que multi-stage Docker build é usado pra apps Node em produção?',
          options: [
            { text: 'Roda vários containers em paralelo', feedback: 'Stages são sobre build, não sobre rodar.' },
            { text: 'Separa o ambiente de build (toolchain completo) da imagem de runtime (mínima), reduzindo MUITO o tamanho final', feedback: 'Isso! Você builda numa imagem "gorda" com devDependencies e copia só os artefatos pra uma imagem de runtime enxuta.', correct: true },
            { text: 'Permite hot reload', feedback: 'Hot reload é coisa de dev, não de stage de Docker.' },
            { text: 'É exigido pelo Vercel', feedback: 'O Vercel não exige nenhum padrão Docker em particular.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Devo containerizar meu app React, ou o Vercel basta? Quando o Docker realmente compensa?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre DevOps e deploy. Use exemplos de publicar jogos no Roblox, fazer deploy de bots do Discord, atualizar apps na Play Store. Mostre como devs reais shipam coisas. Seja direto, sem fluff.'
    },
    resources: [
      { title: 'Docker Get Started', url: 'https://docs.docker.com/get-started/' },
      { title: 'Best Practices for Dockerfiles', url: 'https://docs.docker.com/develop/develop-images/dockerfile_best-practices/' }
    ]
  },

  // ─── do-8 ───────────────────────────────────────────────────────────────────
  {
    id: 'do-8-cicd',
    title: 'Pipelines de CI/CD',
    week: 9,
    xp: 80,
    difficulty: 'Intermediário',
    priority: '⭐',
    hook: 'Você sobe código no GitHub, e automaticamente o site fica no ar. Magia? CI/CD. Todo push pra main testa, builda e publica seu app sozinho — depois que você configura, para de se preocupar se uma mudança é "segura pra subir".',

    assess: {
      type: 'multipleChoice',
      question: 'Qual a principal diferença entre CI (Continuous Integration) e CD (Continuous Deployment)?',
      options: [
        { text: 'São sinônimos', feedback: 'São relacionados mas distintos.' },
        { text: 'CI roda testes e build em todo push; CD publica builds que passam direto pra produção', feedback: 'Isso! CI verifica código; CD coloca no ar. Muitos times têm CI mas com gate manual pra publicar.', correct: true },
        { text: 'CI é pra backend, CD é pra frontend', feedback: 'Os dois servem pra qualquer camada do app.' },
        { text: 'CI roda local, CD roda na nuvem', feedback: 'Os dois geralmente rodam na nuvem (GitHub Actions, etc.).' }
      ]
    },

    learn: {
      hook: 'O Vercel já faz isso pra você — mas entender o que GitHub Actions / CircleCI / GitLab CI rodam por baixo te deixa adicionar testes, checks de lint e deploys condicionais com confiança.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/9/',
        title: 'CS50 Semana 9: CI/CD',
        duration: '25 min',
        yourTakeaway: 'Repare como uma pipeline é um grafo direcionado de jobs — cada job tem dependências, e o runner escolhe a ordem.'
      },
      conceptText: `**Continuous Integration (CI)** é a prática de rodar testes e builds automaticamente em toda mudança de código. **Continuous Deployment (CD)** publica builds que passam direto pra produção. Juntos pegam regressões antes de chegarem nos usuários.\n\nUma pipeline é definida em YAML (ou parecido) e vive no seu repo. **GitHub Actions** usa \`.github/workflows/*.yml\`. **CircleCI** usa \`.circleci/config.yml\`. A estrutura é parecida em todos:\n\n\`\`\`yaml\nname: CI\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n      - run: npm ci\n      - run: npm test\n  build:\n    needs: test\n    runs-on: ubuntu-latest\n    steps:\n      - run: npm run build\n\`\`\`\n\nConceitos principais:\n- **Workflow**: a pipeline inteira.\n- **Job**: uma unidade de trabalho que roda num runner próprio (VM ou container novo).\n- **Step**: um único comando ou action dentro de um job.\n- **Needs**: declara que um job depende de outro — define a DAG.\n- **Trigger** (\`on:\`): o que dispara o workflow — pushes, PRs, agendados, manual.\n- **Runner**: a máquina onde o job roda (ubuntu-latest, macos-latest, etc.).\n\nJobs declarados com \`needs\` formam um **grafo de dependências**. O runner ordena topologicamente — jobs sem dependências rodam primeiro, depois jobs cujas dependências terminaram. Jobs paralelos rodam em máquinas separadas ao mesmo tempo, acelerando MUITO a pipeline.\n\n**Secrets** (chaves de API, tokens de deploy) ficam guardados na UI da plataforma, NÃO no YAML, e são expostos pros steps como variáveis de ambiente.\n\n**Cache** (tipo \`actions/cache\`) é o que deixa pipelines rápidas — restaurar node_modules de uma run anterior economiza minutos em todo push.`,
      realWorldExample: 'Pro seu site no Vercel, o deploy É o CI/CD — todo push gera um build com URL de preview, todo merge na main publica em produção. Adicionar um workflow do GitHub Actions que roda `npm test` antes do Vercel tentar publicar significa que testes quebrados bloqueiam o deploy.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Trigger da Pipeline',
        question: 'Você quer um workflow que roda em todo pull request aberto contra a main. Qual config de trigger é certa?',
        options: [
          { text: 'on: schedule', feedback: 'Esse roda em cron, não em PR.' },
          { text: 'on: pull_request', feedback: 'Isso! pull_request dispara quando PR é aberto, sincronizado ou reaberto.', correct: true },
          { text: 'on: deploy', feedback: 'Não existe evento deploy built-in.' },
          { text: 'on: every-five-minutes', feedback: 'Evento inválido no GitHub Actions.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Ordene a Pipeline de CI',
        description: 'Uma pipeline típica de CI roda esses passos. Ordene certo.',
        items: [
          'Roda testes',
          'Faz checkout do código',
          'Builda o bundle de produção',
          'Instala dependências',
          'Sobe artefato / publica'
        ],
        correctOrder: [1, 3, 0, 2, 4],
        feedback: 'Checkout → install → test → build → deploy. Testes rodam antes do build pra falhar rápido.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Lendo o Workflow',
        instructions: 'Nesse workflow, o que roda primeiro?',
        code: `jobs:
  deploy:
    needs: build
    steps: [...]
  build:
    needs: test
    steps: [...]
  test:
    steps: [...]`,
        question: 'Qual a ordem de execução?',
        options: [
          { text: 'deploy, build, test', feedback: 'Você lê de cima pra baixo — o runner usa needs pra calcular a ordem.' },
          { text: 'test, build, deploy', feedback: 'Isso! test não tem needs (roda primeiro), build precisa de test, deploy precisa de build.', correct: true },
          { text: 'Todos em paralelo', feedback: 'needs força execução sequencial pela cadeia de dependências.' },
          { text: 'build, test, deploy', feedback: 'build precisa de test — então test tem que rodar primeiro.' }
        ],
        feedback: 'A ordem do YAML não define execução — o grafo `needs` define. O runner ordena topologicamente.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'buildWorkflowStep',
        instructions: [
          'Escreva buildWorkflowStep(name, run) que retorna um objeto de step do workflow.',
          'Só { name, run } — o step mais simples possível.',
          'buildWorkflowStep("run tests", "npm test") → { name: "run tests", run: "npm test" }'
        ],
        sampleCode: `function buildWorkflowStep(name, run) {
  // TODO
}`,
        solution: `function buildWorkflowStep(name, run) {
  return { name, run };
}`,
        tests: [
          { input: 'buildWorkflowStep("run tests","npm test")', expected: { name: 'run tests', run: 'npm test' }, desc: 'step de teste' },
          { input: 'buildWorkflowStep("build","npm run build")', expected: { name: 'build', run: 'npm run build' }, desc: 'step de build' },
          { input: 'buildWorkflowStep("lint","npm run lint")', expected: { name: 'lint', run: 'npm run lint' }, desc: 'step de lint' }
        ],
        hints: [
          'Shorthand de objeto: { name, run } é igual a { name: name, run: run }.',
          'Sem transformação — só retorne o objeto.',
          'Steps reais também aceitam uses, with, env — mas isso captura a forma central.'
        ]
      },
      {
        level: 2,
        title: 'orderJobs',
        instructions: [
          'Escreva orderJobs(jobs) que retorna um array de nomes de job ordenados topologicamente por `needs`.',
          'Cada job é { name, needs } onde needs é o nome do job pré-requisito (ou null).',
          'orderJobs([{name:"deploy",needs:"build"},{name:"build",needs:"test"},{name:"test",needs:null}]) → ["test","build","deploy"]',
          'Suponha uma cadeia linear simples (cada job tem no máximo um need).'
        ],
        sampleCode: `function orderJobs(jobs) {
  // TODO
}`,
        solution: `function orderJobs(jobs) {
  const byName = {};
  for (const j of jobs) byName[j.name] = j;
  const result = [];
  const visited = new Set();
  function visit(name) {
    if (visited.has(name)) return;
    visited.add(name);
    const job = byName[name];
    if (job && job.needs) visit(job.needs);
    result.push(name);
  }
  for (const j of jobs) visit(j.name);
  return result;
}`,
        tests: [
          { input: 'orderJobs([{name:"deploy",needs:"build"},{name:"build",needs:"test"},{name:"test",needs:null}])', expected: ['test', 'build', 'deploy'], desc: 'cadeia de três jobs' },
          { input: 'orderJobs([{name:"a",needs:null}])', expected: ['a'], desc: 'um job' },
          { input: 'orderJobs([{name:"b",needs:"a"},{name:"a",needs:null}])', expected: ['a', 'b'], desc: 'entrada invertida' }
        ],
        hints: [
          'Topological sort clássico com DFS — visite o need primeiro, depois empurre self.',
          'Rastreie visited num Set pra ciclos ou repetições não quebrarem o loop.',
          'Indexe jobs por nome pra lookup O(1).'
        ]
      },
      {
        level: 3,
        title: 'parsePipelineYaml',
        instructions: [
          'Escreva parsePipelineYaml(text) que extrai { name, jobs } de uma entrada estilo YAML simplificado.',
          'Procure "name:" no topo. Procure nomes de job sob "jobs:" (linhas tipo "  jobname:").',
          'parsePipelineYaml("name: CI\\njobs:\\n  test:\\n  build:") → { name: "CI", jobs: ["test","build"] }'
        ],
        sampleCode: `function parsePipelineYaml(text) {
  // TODO
}`,
        solution: `function parsePipelineYaml(text) {
  const lines = text.split('\\n');
  let name = '';
  const jobs = [];
  let inJobs = false;
  for (const line of lines) {
    const nameMatch = line.match(/^name:\\s*(.+)$/);
    if (nameMatch) { name = nameMatch[1].trim(); continue; }
    if (/^jobs:\\s*$/.test(line)) { inJobs = true; continue; }
    if (inJobs) {
      const jobMatch = line.match(/^\\s{2}([a-zA-Z0-9_-]+):\\s*$/);
      if (jobMatch) jobs.push(jobMatch[1]);
    }
  }
  return { name, jobs };
}`,
        tests: [
          { input: 'parsePipelineYaml("name: CI\\njobs:\\n  test:\\n  build:")', expected: { name: 'CI', jobs: ['test', 'build'] }, desc: 'pipeline simples' },
          { input: 'parsePipelineYaml("name: Deploy\\njobs:\\n  release:")', expected: { name: 'Deploy', jobs: ['release'] }, desc: 'um job' },
          { input: 'parsePipelineYaml("name: Empty\\njobs:")', expected: { name: 'Empty', jobs: [] }, desc: 'sem jobs' }
        ],
        hints: [
          'Use uma flag inJobs quando ver "jobs:".',
          'Bata linhas de job com regex exigindo indent de 2 espaços e dois pontos no final.',
          'Parse de YAML real é bem mais difícil — essa é uma versão simplificada de propósito.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Teste Final de CI/CD',
      steps: [
        {
          type: 'coding',
          title: 'findRoots',
          instructions: 'Escreva findRoots(jobs) que retorna os nomes dos jobs sem `needs` (pontos de entrada da pipeline). findRoots([{name:"a",needs:null},{name:"b",needs:"a"}]) → ["a"].',
          sampleCode: `function findRoots(jobs) {
  // TODO
}`,
          solution: `function findRoots(jobs) {
  return jobs.filter(j => !j.needs).map(j => j.name);
}`,
          tests: [
            { input: 'findRoots([{name:"a",needs:null},{name:"b",needs:"a"}])', expected: ['a'], desc: 'uma raiz' },
            { input: 'findRoots([{name:"lint",needs:null},{name:"test",needs:null},{name:"build",needs:"test"}])', expected: ['lint', 'test'], desc: 'duas raízes em paralelo' },
            { input: 'findRoots([])', expected: [], desc: 'sem jobs' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Por que secrets (chaves de API, tokens de deploy) devem ser configurados na UI da plataforma e não no YAML?',
          options: [
            { text: 'YAML não suporta aspas', feedback: 'YAML suporta string com aspas tranquilamente.' },
            { text: 'O YAML fica no seu repo — commitar segredos lá expõe pra qualquer um com acesso de leitura', feedback: 'Isso! Secrets na UI ficam criptografados e injetados em runtime; YAML no repo é permanentemente visível pra todo colaborador e em qualquer vazamento.', correct: true },
            { text: 'É só preferência de estilo', feedback: 'É uma necessidade de segurança.' },
            { text: 'Plataformas cobram por secrets no YAML', feedback: 'Não existe essa cobrança.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Quero adicionar uma GitHub Action no meu repo que roda meus testes antes do Vercel publicar. Como é o setup mínimo?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre DevOps e deploy. Use exemplos de publicar jogos no Roblox, fazer deploy de bots do Discord, atualizar apps na Play Store. Mostre como devs reais shipam coisas. Seja direto, sem fluff.'
    },
    resources: [
      { title: 'GitHub Actions Quickstart', url: 'https://docs.github.com/en/actions/quickstart' },
      { title: 'Awesome Actions', url: 'https://github.com/sdras/awesome-actions' }
    ]
  },

  // ─── do-9 ───────────────────────────────────────────────────────────────────
  {
    id: 'do-9-deploy',
    title: 'Deploy: Publicando em Produção',
    week: 9,
    xp: 80,
    difficulty: 'Intermediário',
    priority: '⭐',
    hook: 'Publicar seu jogo no Roblox, seu app na Play Store, seu site no Vercel — TUDO é deploy. Antigamente publicar um app React significava configurar nginx e SSL. Hoje é um comando `vercel` — mas entender o que acontece por trás é o que te deixa debugar quando quebra.',

    assess: {
      type: 'multipleChoice',
      question: 'O que é um "preview deployment" no Vercel?',
      options: [
        { text: 'Um servidor dev no localhost', feedback: 'Isso é `vercel dev` — preview fica hospedado.' },
        { text: 'Um deploy ao vivo, totalmente buildado, criado automaticamente pra cada pull request ou branch', feedback: 'Isso! URLs de preview deixam você (e revisores) testar mudanças numa URL real e isolada antes do merge.', correct: true },
        { text: 'Uma screenshot só de leitura do app', feedback: 'Não — preview deployments são totalmente funcionais.' },
        { text: 'Um ambiente de staging que precisa de setup manual', feedback: 'Previews do Vercel são automáticos em todo PR.' }
      ]
    },

    learn: {
      hook: 'Seu laptop fecha no fim do dia; produção precisa ficar no ar pra sempre. Plataformas modernas tipo Vercel, Netlify e Fly.io abstraem o mais difícil — mas os conceitos (DNS, SSL, cache de edge, redirects) ainda te pegam na primeira vez.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/9/',
        title: 'CS50 Semana 9: Deployment',
        duration: '30 min',
        yourTakeaway: 'Repare como DNS, SSL e um host de arquivos estáticos se combinam pra deixar um site acessível pelo seu domínio.'
      },
      conceptText: `**Publicar** é deixar seu código alcançável na internet pública. A stack clássica era: servidor + DNS + cert SSL + reverse proxy + seu app. Plataformas modernas colapsam tudo isso num único git push.\n\n**Vercel** (que você já usa) transforma cada push num build. Assets estáticos vão pra um CDN global; funções serverless cuidam das partes dinâmicas. Um arquivo de configuração — \`vercel.json\` — controla roteamento, redirects, headers e environment.\n\n\`\`\`json\n{\n  "version": 2,\n  "routes": [\n    { "src": "/blog-velho/(.*)", "dest": "/blog/$1" }\n  ]\n}\n\`\`\`\n\nO campo \`version\` é obrigatório — diz pro Vercel qual schema você usa.\n\n**Redirects** vs **rewrites**:\n- Um **redirect** manda pro navegador uma resposta 3xx com nova URL. O usuário vê a URL mudar. \`301\` = permanente (cacheado por navegadores e search engines). \`302\`/\`307\` = temporário.\n- Um **rewrite** silenciosamente serve outro arquivo na URL original. O usuário não vê a mudança.\n\nA maior parte de configs SPA inclui um rewrite catch-all pra \`index.html\` pra o React Router lidar com rotas client-side.\n\n**DNS** mapeia seu domínio (\`meu-bot.com\`) pra um servidor (um IP ou um CNAME de destino). O Vercel te dá um CNAME tipo \`cname.vercel-dns.com\` — você aponta seu domínio pra ele no registrador.\n\n**SSL/TLS** (HTTPS) hoje é obrigatório. O Vercel emite e renova certificados Let\'s Encrypt automaticamente — você não faz nada.\n\n**Headers de cache** controlam por quanto tempo o CDN guarda uma resposta. \`Cache-Control: public, max-age=31536000, immutable\` pra bundles JS com hash; \`no-cache\` pra HTML pra updates aparecerem na hora.\n\nUma pipeline de deploy real: \`git push\` → CI builda e testa → se passar, Vercel builda o bundle de produção → assets vão pro CDN, funções pro edge → DNS já aponta pra cá → você tá no ar em menos de um minuto.`,
      realWorldExample: 'Seu site provavelmente tá publicado exatamente assim: push pra main → Vercel builda → deploy instantâneo no seu-site.com. Adicionar um vercel.json com redirects é como você lida com mudança de URL (caminhos de blog velhos → novos) sem quebrar links antigos.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: '301 vs 302',
        question: 'Você moveu /precos pra /planos permanentemente. Qual status de redirect usar?',
        options: [
          { text: '301 Permanent', feedback: 'Isso! 301 diz pros navegadores e Google "essa mudança é permanente" — a URL nova é cacheada e herda o peso de SEO.', correct: true },
          { text: '302 Temporary', feedback: '302 é pra movimentos curtos — navegadores ficam checando a URL antiga.' },
          { text: '404 Not Found', feedback: 'Esse diz que a página sumiu, não que mudou.' },
          { text: '500 Server Error', feedback: 'Nem é redirect.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Ordene o Fluxo de Deploy',
        description: 'Arrume os passos que acontecem entre `git push` e seu site no ar.',
        items: [
          'Assets estáticos sobem pro CDN, funções pro edge',
          'CI builda e roda os testes',
          'Você dá push no GitHub',
          'Vercel roda npm run build',
          'Deploy tá no ar no seu domínio'
        ],
        correctOrder: [2, 1, 3, 0, 4],
        feedback: 'Push → CI → build → upload → no ar. Cada passo leva segundos com plataformas modernas.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Conserto de SPA Routing',
        instructions: 'Seu app React Router funciona local mas visitar /sobre direto em produção mostra 404. Qual o fix?',
        code: `// vercel.json sem rewrites
// React Router usa rotas client-side
// Acessos diretos vão pro file server, que não tem arquivo /sobre`,
        question: 'Qual configuração resolve?',
        options: [
          { text: 'Adicionar um renderer React do lado do servidor', feedback: 'Exagero pra SPA.' },
          { text: 'Adicionar um rewrite pegando todas as rotas pra /index.html', feedback: 'Isso! Aí o index.html carrega, React Router lê a URL e renderiza a rota certa.', correct: true },
          { text: 'Usar só hash routing (#/sobre)', feedback: 'Funciona mas é geralmente considerado pior pra SEO e UX.' },
          { text: 'Desativar roteamento client-side', feedback: 'Aí você não tem mais um SPA.' }
        ],
        feedback: 'O rewrite catch-all é a mágica que faz qualquer host de SPA (Vercel, Netlify, etc.) funcionar com roteamento client-side.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'parseVercelConfig',
        instructions: [
          'Escreva parseVercelConfig(json) que recebe um objeto de config Vercel parseado e retorna { routes, env }.',
          'routes default []. env default {}.',
          'parseVercelConfig({routes:[{src:"/a"}], env:{KEY:"v"}}) → { routes:[{src:"/a"}], env:{KEY:"v"} }'
        ],
        sampleCode: `function parseVercelConfig(json) {
  // TODO
}`,
        solution: `function parseVercelConfig(json) {
  return {
    routes: json.routes || [],
    env: json.env || {}
  };
}`,
        tests: [
          { input: 'parseVercelConfig({routes:[{src:"/a"}], env:{KEY:"v"}})', expected: { routes: [{ src: '/a' }], env: { KEY: 'v' } }, desc: 'config completo' },
          { input: 'parseVercelConfig({})', expected: { routes: [], env: {} }, desc: 'defaults vazios' },
          { input: 'parseVercelConfig({routes:[]})', expected: { routes: [], env: {} }, desc: 'config parcial' }
        ],
        hints: [
          'Use `||` pra default de cada campo.',
          'Retorne um objeto plano com as duas chaves sempre presentes.',
          'Um parser real também lidaria com redirects, rewrites, headers — mesmo padrão.'
        ]
      },
      {
        level: 2,
        title: 'buildRedirectRule',
        instructions: [
          'Escreva buildRedirectRule(from, to, status) que retorna um objeto de redirect.',
          '{ source: from, destination: to, permanent: status === 301 }.',
          'buildRedirectRule("/old","/new",301) → { source:"/old", destination:"/new", permanent:true }',
          'buildRedirectRule("/a","/b",302) → { source:"/a", destination:"/b", permanent:false }'
        ],
        sampleCode: `function buildRedirectRule(from, to, status) {
  // TODO
}`,
        solution: `function buildRedirectRule(from, to, status) {
  return {
    source: from,
    destination: to,
    permanent: status === 301
  };
}`,
        tests: [
          { input: 'buildRedirectRule("/old","/new",301)', expected: { source: '/old', destination: '/new', permanent: true }, desc: '301 permanente' },
          { input: 'buildRedirectRule("/a","/b",302)', expected: { source: '/a', destination: '/b', permanent: false }, desc: '302 temporário' },
          { input: 'buildRedirectRule("/x","/y",307)', expected: { source: '/x', destination: '/y', permanent: false }, desc: '307 também temporário' }
        ],
        hints: [
          'permanent é só status === 301.',
          'Use os nomes do input como chaves do objeto.',
          'Esse é o formato exato que Next.js / Vercel usam na config.'
        ]
      },
      {
        level: 3,
        title: 'isValidDeployConfig',
        instructions: [
          'Escreva isValidDeployConfig(config) que retorna true se o config tem um campo `version`.',
          'Tudo mais é opcional.',
          'isValidDeployConfig({version:2,routes:[]}) → true. isValidDeployConfig({}) → false.'
        ],
        sampleCode: `function isValidDeployConfig(config) {
  // TODO
}`,
        solution: `function isValidDeployConfig(config) {
  return config != null && config.version !== undefined;
}`,
        tests: [
          { input: 'isValidDeployConfig({version:2,routes:[]})', expected: true, desc: 'tem version' },
          { input: 'isValidDeployConfig({})', expected: false, desc: 'sem version' },
          { input: 'isValidDeployConfig({version:2})', expected: true, desc: 'só version' }
        ],
        hints: [
          'Cheque que config existe e tem campo version definido.',
          'config != null protege contra null/undefined.',
          'Um validador real também checaria o tipo/valor de version.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Teste Final de Deploy',
      steps: [
        {
          type: 'coding',
          title: 'buildCacheControl',
          instructions: 'Escreva buildCacheControl(seconds, immutable) que retorna um valor do header Cache-Control. Se immutable é true: "public, max-age=N, immutable". Senão: "public, max-age=N". buildCacheControl(3600, false) → "public, max-age=3600".',
          sampleCode: `function buildCacheControl(seconds, immutable) {
  // TODO
}`,
          solution: `function buildCacheControl(seconds, immutable) {
  const base = 'public, max-age=' + seconds;
  return immutable ? base + ', immutable' : base;
}`,
          tests: [
            { input: 'buildCacheControl(3600, false)', expected: 'public, max-age=3600', desc: 'cache mutável' },
            { input: 'buildCacheControl(31536000, true)', expected: 'public, max-age=31536000, immutable', desc: 'imutável por um ano' },
            { input: 'buildCacheControl(0, false)', expected: 'public, max-age=0', desc: 'sem cache' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Seu deploy de produção tá no ar mas seu domínio customizado retorna "DNS_PROBE_FINISHED_NXDOMAIN". Qual o problema mais provável?',
          options: [
            { text: 'Um bug no seu código React', feedback: 'Erros de DNS acontecem antes do código rodar.' },
            { text: 'Seu registrador de domínio não tá apontando pro Vercel — o CNAME ou registro A precisa ser configurado', feedback: 'Isso! NXDOMAIN significa que o resolver não achou seu domínio. Os registros estão faltando ou apontando pro lugar errado.', correct: true },
            { text: 'O Vercel tá fora', feedback: 'Uma queda da plataforma não daria erro de DNS pra um domínio específico.' },
            { text: 'Arquivo .env faltando', feedback: 'Problemas de env dão erro de runtime, não DNS.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Qual o jeito certo de configurar domínio customizado no Vercel pro meu app, incluindo subdomínios pra staging?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre DevOps e deploy. Use exemplos de publicar jogos no Roblox, fazer deploy de bots do Discord, atualizar apps na Play Store. Mostre como devs reais shipam coisas. Seja direto, sem fluff.'
    },
    resources: [
      { title: 'Vercel Deployment Docs', url: 'https://vercel.com/docs/deployments/overview' },
      { title: 'MDN: HTTP Caching', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching' }
    ]
  },

  // ─── do-10 ──────────────────────────────────────────────────────────────────
  {
    id: 'do-10-migrations',
    title: 'Migrations: Mudando o Banco sem Quebrar Tudo',
    week: 7,
    xp: 70,
    difficulty: 'Intermediário',
    priority: '⭐',
    hook: 'Quando o Discord muda algo no banco de dados sem perder mensagens — migration. Quando seu schema muda, seu código E seu banco em produção precisam evoluir juntos — migrations são como times shipam mudanças de schema sem quebrar prod.',

    assess: {
      type: 'multipleChoice',
      question: 'Por que migrations de banco são guardadas como arquivos sequenciais com timestamp?',
      options: [
        { text: 'Por estética', feedback: 'Tem motivo de engenharia real.' },
        { text: 'Pra todo ambiente aplicar as mesmas mudanças na mesma ordem, e a ferramenta saber quais já rodaram', feedback: 'Isso! Timestamps dão ordem total; uma tabela de migrations rastreia quais foram aplicadas por ambiente.', correct: true },
        { text: 'Porque o Postgres exige', feedback: 'O Postgres não exige isso — é convenção de ferramenta.' },
        { text: 'Timestamps são gerados aleatoriamente', feedback: 'Eles codificam o momento de criação, que dá a ordem.' }
      ]
    },

    learn: {
      hook: 'Você adiciona uma coluna na sua tabela de posts. Seu código espera essa coluna. Produção não tem. A próxima requisição quebra. Migrations são a disciplina que evita esse desastre exato.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/7/',
        title: 'CS50 Semana 7: SQL & Migrations',
        duration: '30 min',
        yourTakeaway: 'Repare como mudanças de schema são código — versionadas, revisáveis e reversíveis.'
      },
      conceptText: `Uma **migration** é um arquivo com o SQL (ou comandos de ORM) pra evoluir seu schema em um passo. Cada migration tem nome com prefixo de timestamp — \`20240115_add_users_table.sql\` — pra o runner aplicar em ordem determinística.\n\nO runner mantém uma tabela escondida \`schema_migrations\` no seu banco que registra quais já foram aplicadas. A cada deploy, compara a lista de arquivos com a tabela e roda as que faltam, em ordem.\n\n**Up e down**: toda migration tem um "up" (a mudança que você quer) e idealmente um "down" (o rollback). \`ADD COLUMN\` ↔ \`DROP COLUMN\`. Nem toda mudança tem down limpo — destrutivas (DROP TABLE) perdem dados pra sempre.\n\n**Convenção de nome**: timestamps em \`YYYYMMDDHHMMSS\` ou \`YYYYMMDD\`, depois underscore, depois descrição curta em snake_case: \`20240301_add_posts_index.sql\`. Ferramentas ordenam lexicalmente, então o prefixo de timestamp garante a ordem certa.\n\n**Idempotente**: uma migration bem escrita deveria ser segura pra rodar duas vezes (use \`IF NOT EXISTS\`). O runner geralmente garante execução única, mas SQL defensivo ajuda quando migrations são esmagadas ou reaplicadas em ambientes de teste.\n\n**Padrões zero-downtime**: em produção, você não pode simplesmente \`ALTER TABLE\` algo que usuários estão escrevendo. Estratégias: adiciona coluna → backfill em lotes → muda reads → drop coluna velha ao longo de vários deploys. Cada passo é uma migration.\n\nNo **Supabase**, migrations ficam em \`supabase/migrations/\` e o CLI aplica com \`supabase db push\`. Cada migration é um arquivo SQL com convenção de timestamp. Dá pra escrever migrations contra um Postgres local e dar push pro remoto.\n\n**Seeds vs migrations**: migrations mudam schema; seeds populam dados. Mantenha separados — você quer rodar todas as migrations em todos os ambientes, mas seeds só em dev/test.`,
      realWorldExample: 'No banco do seu bot do Discord (onde você guarda configurações de servidor, XP de usuários, etc.), toda mudança de schema (coluna nova, tabela nova, índice novo) é um arquivo SQL numerado em supabase/migrations/. Quando você publica, `supabase db push` aplica as novas em produção. Se um colega esquece e edita o schema direto no dashboard, seu histórico desincroniza — conserta escrevendo uma migration que bate com o que ele fez, pra ambientes futuros se reconstruirem certo.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Nome da Migration',
        question: 'Qual é um arquivo de migration com nome correto?',
        options: [
          { text: 'add-users-table.sql', feedback: 'Sem timestamp — o runner não consegue ordenar.' },
          { text: '20240115_add_users_table.sql', feedback: 'Isso! Prefixo de timestamp + nome descritivo snake_case + extensão .sql.', correct: true },
          { text: 'migration1.sql', feedback: 'Ordenável mas não informativo.' },
          { text: '2024-01-15 add users table.sql', feedback: 'Espaços e traços quebram algumas ferramentas — siga a convenção.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Ordene a Migration Zero-Downtime',
        description: 'Você quer RENOMEAR uma coluna de `name` pra `full_name` num banco de produção ao vivo. Ordene os passos.',
        items: [
          'Backfill full_name a partir de name nas linhas existentes',
          'Publicar código que escreve nas DUAS colunas',
          'Dropar a coluna name velha',
          'Publicar código que lê de full_name',
          'Adicionar a nova coluna full_name'
        ],
        correctOrder: [4, 1, 0, 3, 2],
        feedback: 'Adiciona coluna → escrita dupla → backfill → muda leitura → dropa antiga. Cada passo mantém o app funcionando.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Ordene os Arquivos',
        instructions: 'Dado esses nomes de migration, em que ordem o runner aplica?',
        code: `// arquivos em supabase/migrations/:
// 20240120_add_index.sql
// 20240110_create_posts.sql
// 20240115_add_user_fk.sql`,
        question: 'Qual a ordem correta de aplicação?',
        options: [
          { text: 'index, posts, user_fk (ordem do file system)', feedback: 'O runner ordena por timestamp, não por ordem do sistema de arquivos.' },
          { text: 'create_posts, add_user_fk, add_index', feedback: 'Isso! 20240110 < 20240115 < 20240120 — sort lexical nos timestamps.', correct: true },
          { text: 'Ordem aleatória', feedback: 'O runner é determinístico.' },
          { text: 'add_index primeiro (alfabético)', feedback: 'Ordena pelo prefixo de timestamp, não pela descrição.' }
        ],
        feedback: 'Ordenação lexical funciona porque o prefixo de timestamp tem largura fixa e é cronológico.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'parseMigration',
        instructions: [
          'Escreva parseMigration(filename) que divide um nome de migration em { timestamp, name }.',
          'Formato: "TIMESTAMP_name.sql". Timestamp é tudo antes do primeiro underscore.',
          'Name é tudo entre o primeiro underscore e o ".sql".',
          'parseMigration("20240115_add_users_table.sql") → { timestamp: "20240115", name: "add_users_table" }'
        ],
        sampleCode: `function parseMigration(filename) {
  // TODO
}`,
        solution: `function parseMigration(filename) {
  const underscore = filename.indexOf('_');
  const timestamp = filename.slice(0, underscore);
  const dot = filename.lastIndexOf('.');
  const name = filename.slice(underscore + 1, dot);
  return { timestamp, name };
}`,
        tests: [
          { input: 'parseMigration("20240115_add_users_table.sql")', expected: { timestamp: '20240115', name: 'add_users_table' }, desc: 'formato padrão' },
          { input: 'parseMigration("20240301_add_index.sql")', expected: { timestamp: '20240301', name: 'add_index' }, desc: 'nome simples' },
          { input: 'parseMigration("20240520_rename_full_name_column.sql")', expected: { timestamp: '20240520', name: 'rename_full_name_column' }, desc: 'nome longo com underscores' }
        ],
        hints: [
          'Ache o PRIMEIRO underscore pra fronteira do timestamp.',
          'Ache o ÚLTIMO ponto pra fronteira da extensão.',
          'Slice entre eles pro nome.'
        ]
      },
      {
        level: 2,
        title: 'orderMigrations',
        instructions: [
          'Escreva orderMigrations(filenames) que retorna os nomes ordenados por timestamp ascendente.',
          'Como timestamps são strings de largura fixa, sort lexical funciona.',
          'orderMigrations(["20240120_b.sql","20240110_a.sql"]) → ["20240110_a.sql","20240120_b.sql"]'
        ],
        sampleCode: `function orderMigrations(filenames) {
  // TODO
}`,
        solution: `function orderMigrations(filenames) {
  return [...filenames].sort();
}`,
        tests: [
          { input: 'orderMigrations(["20240120_b.sql","20240110_a.sql"])', expected: ['20240110_a.sql', '20240120_b.sql'], desc: 'dois arquivos' },
          { input: 'orderMigrations(["20240301_c.sql","20240115_b.sql","20240110_a.sql"])', expected: ['20240110_a.sql', '20240115_b.sql', '20240301_c.sql'], desc: 'três arquivos' },
          { input: 'orderMigrations([])', expected: [], desc: 'lista vazia' }
        ],
        hints: [
          'Array.sort() do JS por padrão ordena strings lexicalmente — perfeito pra timestamps de largura fixa.',
          'Spread pra um array novo se quiser evitar mutar a entrada.',
          'Pra timestamps de tamanho misto precisaria de comparator customizado — não aqui.'
        ]
      },
      {
        level: 3,
        title: 'buildMigrationFilename',
        instructions: [
          'Escreva buildMigrationFilename(name, timestamp) que retorna um nome de arquivo de migration bem formatado.',
          'Formato: "TIMESTAMP_name.sql".',
          'buildMigrationFilename("add_index", "20240301") → "20240301_add_index.sql"'
        ],
        sampleCode: `function buildMigrationFilename(name, timestamp) {
  // TODO
}`,
        solution: `function buildMigrationFilename(name, timestamp) {
  return timestamp + '_' + name + '.sql';
}`,
        tests: [
          { input: 'buildMigrationFilename("add_index","20240301")', expected: '20240301_add_index.sql', desc: 'nome simples' },
          { input: 'buildMigrationFilename("create_posts_table","20240110")', expected: '20240110_create_posts_table.sql', desc: 'nome mais longo' },
          { input: 'buildMigrationFilename("rename_col","20240520")', expected: '20240520_rename_col.sql', desc: 'formato padrão' }
        ],
        hints: [
          'Concatene: timestamp + "_" + name + ".sql".',
          'Sem validação pra esse exercício — confie nos inputs.',
          'Numa ferramenta real você geraria o timestamp automaticamente também.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Teste Final de Migrations',
      steps: [
        {
          type: 'coding',
          title: 'findPending',
          instructions: 'Escreva findPending(allMigrations, applied) que retorna as migrations ainda não aplicadas. Os dois inputs são arrays de nomes. findPending(["a.sql","b.sql","c.sql"], ["a.sql"]) → ["b.sql","c.sql"].',
          sampleCode: `function findPending(allMigrations, applied) {
  // TODO
}`,
          solution: `function findPending(allMigrations, applied) {
  const set = new Set(applied);
  return allMigrations.filter(m => !set.has(m));
}`,
          tests: [
            { input: 'findPending(["a.sql","b.sql","c.sql"], ["a.sql"])', expected: ['b.sql', 'c.sql'], desc: 'duas pendentes' },
            { input: 'findPending(["a.sql"], ["a.sql"])', expected: [], desc: 'todas aplicadas' },
            { input: 'findPending(["a.sql","b.sql"], [])', expected: ['a.sql', 'b.sql'], desc: 'nada aplicado ainda' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Um colega editou o schema manualmente no dashboard do Supabase em vez de escrever uma migration. Qual o jeito certo de consertar?',
          options: [
            { text: 'Reverter as mudanças e pedir pra ele refazer como migration', feedback: 'Funciona mas é disruptivo — dá pra capturar a mudança retroativamente.' },
            { text: 'Escrever uma migration nova que bate com a mudança dele, pra ambientes futuros reproduzirem', feedback: 'Isso! Os arquivos de migration são a fonte da verdade pra TODOS os ambientes. Capture a mudança retroativamente e comite.', correct: true },
            { text: 'Ignorar — produção já tem a mudança', feedback: 'Staging e novos setups de dev não terão — quebra a reprodutibilidade.' },
            { text: 'Apagar a pasta de migrations e começar do zero', feedback: 'Catastrófico — você perde o histórico inteiro.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Vou adicionar uma coluna "scheduled_at" na tabela posts. Me guia escrevendo a migration com segurança, incluindo o rollback.',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre DevOps e deploy. Use exemplos de publicar jogos no Roblox, fazer deploy de bots do Discord, atualizar apps na Play Store. Mostre como devs reais shipam coisas. Seja direto, sem fluff.'
    },
    resources: [
      { title: 'Supabase Migrations', url: 'https://supabase.com/docs/guides/cli/local-development#database-migrations' },
      { title: 'Strong Migrations (padrões Postgres)', url: 'https://github.com/ankane/strong_migrations' }
    ]
  }
];
