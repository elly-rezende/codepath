export const beLessons = [
  // ─── be-1 ───────────────────────────────────────────────────────────────────
  {
    id: 'be-1-variables',
    title: 'Variáveis, Tipos e Condicionais',
    week: 1,
    xp: 50,
    difficulty: 'Beginner',
    priority: '⭐',
    hook: 'Quando você cria um personagem no Roblox, o jogo guarda seu nível em uma variável. Sem entender tipos, seu backend vai bugar de um jeito que ninguém entende.',

    assess: {
      type: 'multipleChoice',
      question: 'O que `typeof null` retorna em JavaScript?',
      options: [
        { text: '"null"', feedback: 'Quase! Mas o JavaScript tem um bug famoso aqui.' },
        { text: '"object"', feedback: 'Isso! Esse é um bug histórico do JS que nunca foi corrigido pra não quebrar código antigo.', correct: true },
        { text: '"undefined"', feedback: 'undefined é o que aparece pra variáveis declaradas mas sem valor.' },
        { text: 'null', feedback: 'typeof sempre retorna uma string.' }
      ]
    },

    learn: {
      hook: 'Cada valor que o servidor do Roblox guarda sobre você (XP, nível, moedas) tem um tipo. Misturar os tipos é receita pra bug em produção. Bora deixar isso explícito.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/6/',
        title: 'Variables & Data Types — CS50',
        duration: '18 min',
        yourTakeaway: 'Foca nos tipos primitivos e em como a tipagem dinâmica do JS é diferente de linguagens tipadas.'
      },
      conceptText: `JavaScript tem sete tipos primitivos: number, string, boolean, null, undefined, symbol e bigint — mais o tipo object (que inclui arrays, objetos comuns e funções).\n\nA palavra-chave \`let\` declara uma variável com escopo de bloco que você pode reatribuir. \`const\` também é de escopo de bloco mas não pode ser reatribuída (mas propriedades de objetos ainda podem mudar). Evita \`var\` no código moderno — ele tem escopo de função e faz hoisting de um jeito confuso.\n\nChecar tipo é mais complicado do que parece. \`typeof\` funciona pra maioria dos primitivos mas falha com null (retorna "object") e não diferencia array de objeto. Usa \`Array.isArray()\` pra arrays e cheque null antes de assumir que algo é objeto.\n\nCondicionais controlam o fluxo com base em "truthiness". JavaScript tem seis valores falsy: false, 0, "" (string vazia), null, undefined e NaN. Todo o resto é truthy — incluindo arrays e objetos vazios, o que surpreende muita gente.`,
      realWorldExample: 'Quando você cria um personagem no Roblox, o jogo guarda seu nível, XP e moedas em variáveis. Se o servidor confundir "100" (string) com 100 (number), você pode acabar com bug ao tentar somar XP — tipo "10" + 5 virar "105" em vez de 15.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Truthy ou Falsy?',
        question: 'Qual dos valores abaixo é TRUTHY em JavaScript?',
        options: [
          { text: '0', feedback: 'Zero é falsy.' },
          { text: '""', feedback: 'String vazia é falsy.' },
          { text: '[]', feedback: 'Isso! Array vazio é truthy no JavaScript — pegadinha clássica.', correct: true },
          { text: 'null', feedback: 'null é falsy.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Ordene a Checagem de Tipo',
        description: 'Coloque essas checagens na ordem certa pra identificar com segurança um tipo "array" (mais específico primeiro).',
        items: [
          'Cheque Array.isArray(val)',
          'Cheque val === null',
          'Cheque typeof val',
          'Retorne a string do tipo'
        ],
        correctOrder: [1, 0, 2, 3],
        feedback: 'Você precisa checar null antes de typeof (porque typeof null é "object"), depois Array.isArray antes da checagem genérica de objeto.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Leia a Saída do Tipo',
        instructions: 'O que esse código mostra no console?',
        code: `const val = [1, 2, 3];
console.log(typeof val === 'object' && !Array.isArray(val) ? 'object' : 'array');`,
        question: 'O que aparece?',
        options: [
          { text: '"object"', feedback: 'typeof [] é "object", mas Array.isArray pega isso.' },
          { text: '"array"', feedback: 'Isso! Array.isArray retorna true, então o ternário escolhe "array".', correct: true },
          { text: 'TypeError', feedback: 'Sem erro aqui — JS válido.' },
          { text: '"undefined"', feedback: 'val tá claramente definido.' }
        ],
        feedback: 'Sempre usa Array.isArray() quando precisar diferenciar arrays de objetos comuns.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'parseType',
        instructions: [
          'Escreva uma função parseType(val) que retorna o tipo como uma string.',
          'Retorne "null" pra null, "array" pra arrays, e o typeof pro resto.',
          'NÃO use biblioteca — só condicionais e typeof.'
        ],
        sampleCode: `function parseType(val) {
  // TODO: retorne 'null', 'array', 'number', 'string', 'boolean', 'undefined' ou 'object'
}`,
        solution: `function parseType(val) {
  if (val === null) return 'null';
  if (Array.isArray(val)) return 'array';
  return typeof val;
}`,
        tests: [
          { input: 'parseType(42)', expected: 'number', desc: 'retorna number pra 42' },
          { input: 'parseType("hello")', expected: 'string', desc: 'retorna string' },
          { input: 'parseType(null)', expected: 'null', desc: 'retorna null pra null' },
          { input: 'parseType([])', expected: 'array', desc: 'retorna array pra []' },
          { input: 'parseType({})', expected: 'object', desc: 'retorna object pra {}' }
        ],
        hints: [
          'Cheque null primeiro com ===, já que typeof null é "object".',
          'Use Array.isArray() antes do fallback typeof.',
          'typeof cuida dos casos restantes automaticamente.'
        ]
      },
      {
        level: 2,
        title: 'clamp',
        instructions: [
          'Escreva clamp(val, min, max) que limita val entre min e max.',
          'Se val < min retorne min; se val > max retorne max; caso contrário, retorne val.'
        ],
        sampleCode: `function clamp(val, min, max) {
  // TODO
}`,
        solution: `function clamp(val, min, max) {
  if (val < min) return min;
  if (val > max) return max;
  return val;
}`,
        tests: [
          { input: 'clamp(150, 0, 100)', expected: 100, desc: 'limita acima do max' },
          { input: 'clamp(-5, 0, 100)', expected: 0, desc: 'limita abaixo do min' },
          { input: 'clamp(50, 0, 100)', expected: 50, desc: 'retorna val quando está no intervalo' }
        ],
        hints: [
          'Dois if, um return.',
          'Cheque min primeiro, depois max.',
          'Math.min e Math.max também resolvem isso em uma linha.'
        ]
      },
      {
        level: 3,
        title: 'ternaryChain',
        instructions: [
          'Escreva ternaryChain(score) que retorna uma nota como letra.',
          'A: 90+, B: 80-89, C: 70-79, D: 60-69, F: abaixo de 60.'
        ],
        sampleCode: `function ternaryChain(score) {
  // TODO: retorne 'A' | 'B' | 'C' | 'D' | 'F'
}`,
        solution: `function ternaryChain(score) {
  return score >= 90 ? 'A'
    : score >= 80 ? 'B'
    : score >= 70 ? 'C'
    : score >= 60 ? 'D'
    : 'F';
}`,
        tests: [
          { input: 'ternaryChain(95)', expected: 'A', desc: '95 é A' },
          { input: 'ternaryChain(85)', expected: 'B', desc: '85 é B' },
          { input: 'ternaryChain(72)', expected: 'C', desc: '72 é C' },
          { input: 'ternaryChain(55)', expected: 'F', desc: '55 é F' }
        ],
        hints: [
          'Ternários encadeados são lidos de cima pra baixo — cheque o limiar mais alto primeiro.',
          'Cada condição só roda se a anterior foi false.',
          'Você também pode usar if/else if — a cadeia de ternários é só um exercício de estilo.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Check Final de Tipos e Condicionais',
      steps: [
        {
          type: 'coding',
          title: 'Construa um getter type-safe',
          instructions: 'Escreva safeGet(obj, key, defaultVal) que retorna obj[key] se existir e não for null/undefined, caso contrário retorna defaultVal.',
          sampleCode: `function safeGet(obj, key, defaultVal) {
  // TODO
}`,
          solution: `function safeGet(obj, key, defaultVal) {
  const val = obj[key];
  return (val !== null && val !== undefined) ? val : defaultVal;
}`,
          tests: [
            { input: 'safeGet({name:"Elly"}, "name", "unknown")', expected: 'Elly', desc: 'retorna valor quando presente' },
            { input: 'safeGet({name:null}, "name", "unknown")', expected: 'unknown', desc: 'retorna default pra null' },
            { input: 'safeGet({}, "missing", 42)', expected: 42, desc: 'retorna default pra chave que não existe' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Por que preferir const em vez de let quando a variável não vai ser reatribuída?',
          options: [
            { text: 'const é mais rápido em runtime', feedback: 'Não é verdade em motores modernos.' },
            { text: 'Sinaliza a intenção e previne reatribuição acidental', feedback: 'Isso! const comunica "esse valor não vai mudar" pra quem ler depois.', correct: true },
            { text: 'Variáveis const não podem ser mudadas de jeito nenhum', feedback: 'Propriedades de objeto e elementos de array ainda podem ser mutados com const.' },
            { text: 'let causa vazamento de memória', feedback: 'Mentira.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Qual a diferença entre == e === em JavaScript, e quando usar == pode causar um bug em produção (tipo num app de jogo)?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre backend. Use exemplos de Discord (servidores, bots), Roblox (sistema de login), Minecraft (multiplayer), Spotify (recomendações). Mostre como o que rola por trás dos apps que eles usam funciona. Seja direto, com humor leve.'
    },
    resources: [
      { title: 'MDN: Tipos de Dados em JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures' },
      { title: 'JavaScript.info: Variáveis', url: 'https://javascript.info/variables' }
    ]
  },

  // ─── be-2 ───────────────────────────────────────────────────────────────────
  {
    id: 'be-2-loops',
    title: 'Loops e Controle de Fluxo',
    week: 1,
    xp: 50,
    difficulty: 'Beginner',
    priority: '⭐',
    hook: 'Como o feed do Insta carrega 50 posts de uma vez? Loop! Toda lista que você vê em app é um loop disfarçado.',

    assess: {
      type: 'multipleChoice',
      question: 'O que Array.prototype.reduce retorna se nenhum valor inicial for passado e o array tem um elemento?',
      options: [
        { text: 'undefined', feedback: 'Não exatamente — pensa no que reduce faz com um único elemento.' },
        { text: 'Esse único elemento', feedback: 'Isso! Sem valor inicial, um array de um elemento só retorna esse elemento.', correct: true },
        { text: '0', feedback: '0 só seria o resultado se você passasse explicitamente como valor inicial.' },
        { text: 'Solta um erro', feedback: 'Só solta erro num array vazio sem valor inicial.' }
      ]
    },

    learn: {
      hook: 'Você escreve um for loop, funciona — mas três meses depois ninguém entende o que faz. Aprender o loop certo deixa sua intenção óbvia.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/6/',
        title: 'Loops & Iteration — CS50',
        duration: '20 min',
        yourTakeaway: 'Presta atenção em como a escolha do loop expressa intenção, não só mecânica.'
      },
      conceptText: `JavaScript oferece vários tipos de loop, cada um com semântica diferente.\n\nLoops \`for\` são explícitos sobre o índice e são melhores quando você precisa do índice ou de passos não padrão. Loops \`while\` são melhores quando você não sabe quantas iterações vão rolar. \`for...of\` itera sobre valores iteráveis (arrays, strings, Maps) sem precisar do índice — mais limpo pra maioria do trabalho com arrays. \`for...in\` itera sobre chaves de objeto e é útil principalmente pra objetos comuns.\n\n\`break\` sai do loop totalmente; \`continue\` pula pra próxima iteração. Abusar disso deixa a lógica difícil de seguir — prefira early returns ou métodos de array quando der.\n\nO padrão reduce é o canivete suíço da transformação de dados. \`arr.reduce((acc, cur) => acc + cur, 0)\` constrói um único resultado a partir de todos os elementos. Combinado com map e filter, você pode expressar quase qualquer pipeline de dados como uma sequência legível de operações.`,
      realWorldExample: 'Quando você abre o Instagram e o feed mostra 50 posts, o servidor rodou um loop pra buscar os posts dos seus amigos, ordenar por data, e mandar pra você. Sem loop, o app teria que pedir um post de cada vez — imagina a lentidão.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Escolha o Loop',
        question: 'Você precisa iterar sobre um array de mensagens do Discord e não precisa do índice. Qual loop é mais idiomático?',
        options: [
          { text: 'for (let i = 0; i < msgs.length; i++)', feedback: 'Funciona, mas é verboso quando você não precisa do i.' },
          { text: 'for (const msg of msgs)', feedback: 'Isso! for...of é a escolha idiomática quando você só precisa do valor.', correct: true },
          { text: 'for (const key in msgs)', feedback: 'for...in é pra chaves de objeto, não valores de array.' },
          { text: 'while (msgs.length)', feedback: 'Isso mutaria o array e é confuso.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Construa um Pipeline com reduce',
        description: 'Coloque esses passos na ordem certa pra somar apenas os números pares de um array usando reduce.',
        items: [
          'Começa com acumulador inicial de 0',
          'Cheque se o elemento atual é par',
          'Adicione o elemento atual ao acumulador',
          'Retorne o acumulador',
          'Chame arr.reduce com o callback'
        ],
        correctOrder: [4, 0, 1, 2, 3],
        feedback: 'Configure o reduce primeiro, estabeleça o valor inicial, depois filtre e acumule dentro do callback.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Trace o Loop',
        instructions: 'O que esse código mostra?',
        code: `const result = [];
for (let i = 0; i < 5; i++) {
  if (i % 2 === 0) continue;
  result.push(i);
}
console.log(result);`,
        question: 'O que aparece?',
        options: [
          { text: '[0, 2, 4]', feedback: 'Esses são os pares — continue pula eles.' },
          { text: '[1, 3]', feedback: 'Isso! continue pula os pares, então só 1 e 3 entram no array.', correct: true },
          { text: '[0, 1, 2, 3, 4]', feedback: 'continue pularia algumas iterações — os pares.' },
          { text: '[1, 2, 3, 4]', feedback: 'Não exatamente — trace quais iterações são puladas.' }
        ],
        feedback: 'continue pula o resto da iteração atual. Valores pares de i caem no continue, ímpares chegam no push.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'sumArray',
        instructions: [
          'Escreva sumArray(arr) que retorna a soma de todos os números em arr.',
          'Retorne 0 pra array vazio.'
        ],
        sampleCode: `function sumArray(arr) {
  // TODO
}`,
        solution: `function sumArray(arr) {
  return arr.reduce((acc, cur) => acc + cur, 0);
}`,
        tests: [
          { input: 'sumArray([1,2,3,4])', expected: 10, desc: 'soma [1,2,3,4]' },
          { input: 'sumArray([])', expected: 0, desc: 'array vazio retorna 0' },
          { input: 'sumArray([5])', expected: 5, desc: 'um elemento só' }
        ],
        hints: [
          'Use Array.reduce com valor inicial 0.',
          'O acumulador começa em 0 e cresce a cada elemento.',
          'acc + cur é tudo que você precisa no callback.'
        ]
      },
      {
        level: 2,
        title: 'filterMap',
        instructions: [
          'Escreva filterMap(arr, pred, transform) que filtra elementos onde pred(el) é true, e aplica transform em cada um.',
          'Retorne o array resultante.',
          'Exemplo: filterMap([1,2,3,4], x=>x>2, x=>x*2) → [6,8]'
        ],
        sampleCode: `function filterMap(arr, pred, transform) {
  // TODO
}`,
        solution: `function filterMap(arr, pred, transform) {
  return arr.filter(pred).map(transform);
}`,
        tests: [
          { input: 'filterMap([1,2,3,4], x=>x>2, x=>x*2)', expected: [6,8], desc: 'filtra >2 depois dobra' },
          { input: 'filterMap([1,2,3], x=>x%2===0, x=>x+10)', expected: [12], desc: 'filtra pares depois soma 10' },
          { input: 'filterMap([], x=>x>0, x=>x)', expected: [], desc: 'array vazio' }
        ],
        hints: [
          'Encadeia .filter() e .map().',
          'pred é a função passada pra .filter(), transform pra .map().',
          'Tanto filter quanto map retornam novos arrays — encadeia eles.'
        ]
      },
      {
        level: 3,
        title: 'chunk',
        instructions: [
          'Escreva chunk(arr, size) que divide arr em sub-arrays de tamanho size.',
          'O último chunk pode ser menor se arr.length não for divisível por size.',
          'Exemplo: chunk([1,2,3,4,5], 2) → [[1,2],[3,4],[5]]'
        ],
        sampleCode: `function chunk(arr, size) {
  // TODO
}`,
        solution: `function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}`,
        tests: [
          { input: 'chunk([1,2,3,4,5], 2)', expected: [[1,2],[3,4],[5]], desc: 'divide com resto' },
          { input: 'chunk([1,2,3,4], 2)', expected: [[1,2],[3,4]], desc: 'divisão exata' },
          { input: 'chunk([], 3)', expected: [], desc: 'array vazio' }
        ],
        hints: [
          'Loop com passo variável em vez de passo 1.',
          'Use arr.slice(i, i + size) pra pegar cada chunk.',
          'Empurre cada slice num array de resultado.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Check Final de Loops',
      steps: [
        {
          type: 'coding',
          title: 'Agrupe por chave',
          instructions: 'Escreva groupBy(arr, key) que agrupa um array de objetos pelo valor de key, retornando um objeto onde cada chave mapeia pra um array de itens.',
          sampleCode: `function groupBy(arr, key) {
  // TODO
}`,
          solution: `function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const k = item[key];
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {});
}`,
          tests: [
            { input: 'groupBy([{type:"post",id:1},{type:"post",id:2},{type:"video",id:3}],"type")', expected: { post: [{type:'post',id:1},{type:'post',id:2}], video: [{type:'video',id:3}] }, desc: 'agrupa por tipo' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Quando preferir um for loop em vez de Array.reduce?',
          options: [
            { text: 'Sempre — for loops são mais rápidos', feedback: 'Não é verdade em motores modernos; legibilidade importa mais.' },
            { text: 'Quando precisa de saída antecipada (break) ou lógica complexa em vários passos', feedback: 'Isso! Reduce não consegue dar break, e callbacks complexos ficam difíceis de ler.', correct: true },
            { text: 'For loops só servem pra números', feedback: 'for...of funciona ótimo com qualquer iterável.' },
            { text: 'Quando o array está vazio', feedback: 'Reduce lida com array vazio numa boa se tiver valor inicial.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Qual a diferença entre Array.forEach e Array.map? Quando usar forEach é um erro?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre backend. Use exemplos de Discord (servidores, bots), Roblox (sistema de login), Minecraft (multiplayer), Spotify (recomendações). Mostre como o que rola por trás dos apps que eles usam funciona. Seja direto, com humor leve.'
    },
    resources: [
      { title: 'MDN: Array.prototype.reduce', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce' },
      { title: 'JavaScript.info: Loops', url: 'https://javascript.info/while-for' }
    ]
  },

  // ─── be-3 ───────────────────────────────────────────────────────────────────
  {
    id: 'be-3-functions',
    title: 'Funções e Escopo',
    week: 2,
    xp: 60,
    difficulty: 'Intermediate',
    priority: '⭐',
    hook: 'Função é tipo um emote do Discord — você chama, ele faz a coisa, pronto. Sem precisar reescrever o código toda vez.',

    assess: {
      type: 'multipleChoice',
      question: 'O que é uma closure em JavaScript?',
      options: [
        { text: 'Uma função que não retorna nada', feedback: 'Isso é uma função void — não tem nada a ver com closure.' },
        { text: 'Uma função que lembra das variáveis do escopo externo mesmo depois que aquele escopo terminou', feedback: 'Isso! Closure é uma função empacotada com seu ambiente léxico.', correct: true },
        { text: 'Uma função que não pode ser reatribuída', feedback: 'Isso seria uma referência de função const.' },
        { text: 'Uma função declarada com a palavra-chave function', feedback: 'Tanto arrow functions quanto function declarations podem formar closures.' }
      ]
    },

    learn: {
      hook: 'Toda vez que você escreve useState ou useCallback no React, tá usando closure. Entender closure deixa você raciocinar sobre valores travados e loops infinitos de render.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/6/',
        title: 'Functions & Scope — CS50',
        duration: '22 min',
        yourTakeaway: 'Foca na cadeia de escopo e em como funções internas acessam variáveis externas.'
      },
      conceptText: `Uma closure é criada toda vez que uma função é definida — ela captura uma referência ao escopo ao redor, não uma cópia. Isso significa que a função interna pode ler e modificar variáveis externas mesmo depois que a função externa retornou.\n\nHoisting é o comportamento do JavaScript de mover declarações pro topo do escopo antes da execução. Function declarations são totalmente "hoisted" (você pode chamar antes da linha onde foi definida). Declarações com \`var\` são hoisted mas não inicializadas (você pega undefined, não erro). \`let\` e \`const\` são hoisted mas ficam na "temporal dead zone" até a linha — acessar antes solta ReferenceError.\n\nArrow functions diferem de funções normais em três pontos: não têm seu próprio \`this\`, não podem ser construtores, e sempre são anônimas (mas podem ser guardadas em variáveis nomeadas). Use arrow pra callbacks e utilitários curtos; use function declarations pra funções nomeadas e reusáveis.\n\nFunções de ordem superior recebem funções como argumento ou retornam funções. compose, partial application e memoization são padrões clássicos que aparecem em código real.`,
      realWorldExample: 'Um bot do Discord que responde a comandos é só um monte de função: !play chama uma, !skip chama outra. Cada emote, cada comando do servidor — é uma função esperando pra ser chamada.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Ache a Closure',
        question: 'Qual código usa corretamente uma closure pra criar um contador?',
        options: [
          { text: 'let count = 0; function inc() { count++; }', feedback: 'Isso usa uma variável global, não uma closure.' },
          { text: 'function makeCounter() { let n = 0; return () => ++n; }', feedback: 'Isso! n é capturado na closure da arrow function retornada.', correct: true },
          { text: 'function inc(n) { return n + 1; }', feedback: 'Isso é uma função pura, não closure — n não é capturado.' },
          { text: 'const counter = { n: 0, inc() { this.n++; } }', feedback: 'Isso é método de objeto, não padrão de closure.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Monte compose Passo a Passo',
        description: 'Coloque essas linhas na ordem certa pra implementar compose(f, g) que retorna uma função que aplica g primeiro, depois f.',
        items: [
          'return function composed(x)',
          'function compose(f, g)',
          'return f(g(x));',
          '{ // aplica g primeiro, depois f'
        ],
        correctOrder: [1, 0, 3, 2],
        feedback: 'compose recebe duas funções e retorna uma nova função que encadeia da direita pra esquerda (g primeiro, depois f).'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Trace a Closure',
        instructions: 'O que esse código mostra?',
        code: `function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}
const add5 = makeAdder(5);
console.log(add5(3));`,
        question: 'O que aparece?',
        options: [
          { text: '5', feedback: 'Esse é o x sozinho — a closure soma y também.' },
          { text: '3', feedback: 'Esse é o y sozinho.' },
          { text: '8', feedback: 'Isso! add5 fechou em cima de x=5, depois soma y=3.', correct: true },
          { text: 'NaN', feedback: 'Tanto x quanto y são números — soma funciona normal.' }
        ],
        feedback: 'makeAdder retorna uma função que fecha em cima de x. Quando chamamos add5(3), ele calcula 5 + 3 = 8.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'compose',
        instructions: [
          'Escreva compose(f, g) que retorna uma nova função.',
          'A função retornada aplica g no argumento primeiro, depois passa o resultado pra f.',
          'compose(f, g)(x) deve ser igual a f(g(x)).'
        ],
        sampleCode: `function compose(f, g) {
  // TODO: retorne uma função que aplica g primeiro, depois f
}`,
        solution: `function compose(f, g) {
  return function(x) {
    return f(g(x));
  };
}`,
        tests: [
          { input: 'compose(x=>x+1, x=>x*2)(3)', expected: 7, desc: 'g=*2 dá 6, f=+1 dá 7' },
          { input: 'compose(x=>x*2, x=>x+1)(3)', expected: 8, desc: 'g=+1 dá 4, f=*2 dá 8' },
          { input: 'compose(String, x=>x+1)(4)', expected: '5', desc: 'converte pra string depois de somar 1' }
        ],
        hints: [
          'Retorne uma função (não um valor) de compose.',
          'Dentro da função retornada, chame g(x) primeiro, depois passe o resultado pra f.',
          'f(g(x)) é o corpo inteiro.'
        ]
      },
      {
        level: 2,
        title: 'partial',
        instructions: [
          'Escreva partial(fn, ...presetArgs) que retorna uma nova função.',
          'A função retornada aceita os argumentos restantes e chama fn com os args preset primeiro, depois os novos.',
          'partial((a,b)=>a+b, 5)(3) deve retornar 8.'
        ],
        sampleCode: `function partial(fn, ...presetArgs) {
  // TODO
}`,
        solution: `function partial(fn, ...presetArgs) {
  return function(...remainingArgs) {
    return fn(...presetArgs, ...remainingArgs);
  };
}`,
        tests: [
          { input: 'partial((a,b)=>a+b, 5)(3)', expected: 8, desc: 'aplicação parcial de soma' },
          { input: 'partial((a,b,c)=>a+b+c, 1, 2)(3)', expected: 6, desc: 'dois args preset' },
          { input: 'partial(Math.max, 10)(5)', expected: 10, desc: 'partial com Math.max' }
        ],
        hints: [
          'Use rest parameters (...presetArgs) pra capturar os args preset.',
          'Retorne uma função que também usa rest parameters pros args restantes.',
          'Spread os dois arrays na chamada: fn(...presetArgs, ...remainingArgs).'
        ]
      },
      {
        level: 3,
        title: 'once',
        instructions: [
          'Escreva once(fn) que retorna uma função wrapper.',
          'O wrapper chama fn só na primeira execução e retorna esse resultado.',
          'Todas as chamadas seguintes retornam o mesmo resultado sem chamar fn de novo.'
        ],
        sampleCode: `function once(fn) {
  // TODO
}`,
        solution: `function once(fn) {
  let called = false;
  let result;
  return function(...args) {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}`,
        tests: [
          { input: '(function(){ const f = once(x => x * 2); return f(5) + f(10); })()', expected: 10, desc: 'segunda chamada retorna o primeiro resultado' },
          { input: '(function(){ let n = 0; const inc = once(() => ++n); inc(); inc(); inc(); return n; })()', expected: 1, desc: 'fn por baixo só roda uma vez' }
        ],
        hints: [
          'Você precisa de duas variáveis na closure: uma flag (called) e o resultado em cache.',
          'Na primeira chamada, marca a flag, calcula e guarda o resultado.',
          'Nas chamadas seguintes, só retorna o resultado em cache.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Check Final de Funções e Escopo',
      steps: [
        {
          type: 'coding',
          title: 'memoize',
          instructions: 'Escreva memoize(fn) que guarda resultados em cache pelo primeiro argumento. Se fn já foi chamado com aquele argumento, retorna o resultado em cache.',
          sampleCode: `function memoize(fn) {
  // TODO
}`,
          solution: `function memoize(fn) {
  const cache = {};
  return function(arg) {
    if (cache[arg] !== undefined) return cache[arg];
    cache[arg] = fn(arg);
    return cache[arg];
  };
}`,
          tests: [
            { input: '(function(){ let calls = 0; const f = memoize(x => { calls++; return x*2; }); f(5); f(5); return calls; })()', expected: 1, desc: 'fn chamada só uma vez pro mesmo arg' },
            { input: '(function(){ const double = memoize(x => x*2); return double(7); })()', expected: 14, desc: 'retorna resultado correto' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Qual a diferença principal entre arrow functions e function declarations no que diz respeito ao `this`?',
          options: [
            { text: 'Arrow functions criam seu próprio this ligado à função', feedback: 'É o contrário — arrow functions não criam seu próprio this.' },
            { text: 'Arrow functions herdam this do escopo léxico ao redor', feedback: 'Isso! Arrow functions fecham em cima do this de onde foram definidas.', correct: true },
            { text: 'Funções normais sempre têm this = undefined', feedback: 'Funções normais têm this dinâmico — depende de como são chamadas.' },
            { text: 'Não tem diferença no JS moderno', feedback: 'A diferença de comportamento do this é importante e afeta métodos de classe e callbacks.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Explica o que é uma closure travada (stale closure) no React e dá um exemplo concreto de quando ela causa bug com useEffect.',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre backend. Use exemplos de Discord (servidores, bots), Roblox (sistema de login), Minecraft (multiplayer), Spotify (recomendações). Mostre como o que rola por trás dos apps que eles usam funciona. Seja direto, com humor leve.'
    },
    resources: [
      { title: 'MDN: Closures', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures' },
      { title: 'JavaScript.info: Closure', url: 'https://javascript.info/closure' }
    ]
  },

  // ─── be-4 ───────────────────────────────────────────────────────────────────
  {
    id: 'be-4-sql-basics',
    title: 'Fundamentos de SQL',
    week: 7,
    xp: 70,
    difficulty: 'Intermediate',
    priority: '⭐⭐',
    hook: 'Como o Spotify acha suas músicas favoritas no banco com bilhões de faixas em meio segundo? SQL!',

    assess: {
      type: 'multipleChoice',
      question: 'Qual cláusula SQL filtra linhas DEPOIS da agregação?',
      options: [
        { text: 'WHERE', feedback: 'WHERE filtra antes da agregação — não consegue referenciar resultados agregados.' },
        { text: 'HAVING', feedback: 'Isso! HAVING filtra o resultado das agregações com GROUP BY.', correct: true },
        { text: 'FILTER', feedback: 'Não é uma cláusula SQL padrão pra isso.' },
        { text: 'LIMIT', feedback: 'LIMIT restringe quantas linhas voltam, não filtra elas.' }
      ]
    },

    learn: {
      hook: 'Quando o Spotify mostra "Suas mais ouvidas do ano" em 1 segundo, é SQL trabalhando: filtra suas faixas, agrupa por música, conta plays, ordena. Tudo numa query só.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/7/',
        title: 'SQL — CS50 Week 7',
        duration: '2 hr',
        yourTakeaway: 'Foca em SELECT, WHERE, ORDER BY, LIMIT e as funções de agregação.'
      },
      conceptText: `SQL (Structured Query Language) é a linguagem dos bancos de dados relacionais. Toda consulta de tabela no Supabase, toda função do Postgres, toda política RLS no fim das contas vira SQL.\n\nA estrutura básica do SELECT é: SELECT colunas FROM tabela WHERE condição ORDER BY coluna LIMIT n. Cada cláusula é opcional menos SELECT e FROM.\n\nFunções de agregação calculam um valor a partir de várias linhas: COUNT(*) conta linhas, SUM(col) soma valores, AVG(col) calcula a média, MIN e MAX acham extremos. Agregações são usadas com GROUP BY pra calcular estatísticas por grupo — tipo COUNT de músicas por artista.\n\nWHERE filtra linhas individuais antes da agregação. HAVING filtra grupos depois da agregação — então "artistas com mais de 5 músicas" precisa de HAVING COUNT(*) > 5, não WHERE.\n\nORDER BY ordena resultados. Adiciona DESC pra ordem decrescente. LIMIT restringe a quantidade de linhas retornadas — essencial pra paginação e performance.`,
      realWorldExample: 'Quando você abre o Spotify e vê "Top 50 - Brasil", o servidor rodou: SELECT música, COUNT(plays) FROM streams WHERE pais = "BR" GROUP BY música ORDER BY COUNT DESC LIMIT 50. Em milissegundos, em bilhões de linhas.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Leia a Query',
        question: 'O que `SELECT COUNT(*), artista FROM musicas GROUP BY artista ORDER BY COUNT(*) DESC` retorna?',
        options: [
          { text: 'Todas as músicas ordenadas pelo nome do artista', feedback: 'Ele agrupa e conta, não só ordena.' },
          { text: 'O número de músicas por artista, do maior pro menor', feedback: 'Isso! GROUP BY artista + COUNT(*) dá a contagem por artista, DESC ordena do maior pro menor.', correct: true },
          { text: 'Um único total geral de músicas', feedback: 'Sem GROUP BY, COUNT(*) daria um número só — mas GROUP BY divide.' },
          { text: 'Erro — não dá pra ORDER BY uma agregação', feedback: 'Dá pra ORDER BY funções de agregação em SQL.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Ordene as Cláusulas SQL',
        description: 'Coloque essas cláusulas SQL na ordem sintática correta pra uma instrução SELECT válida.',
        items: [
          'LIMIT 10',
          'FROM musicas',
          'WHERE genero = "pop"',
          'SELECT id, titulo',
          'ORDER BY plays DESC'
        ],
        correctOrder: [3, 1, 2, 4, 0],
        feedback: 'Ordem das cláusulas SQL: SELECT → FROM → WHERE → ORDER BY → LIMIT.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Query Builder do Supabase',
        instructions: 'Qual SQL essa consulta do Supabase JS representa?',
        code: `const { data } = await supabase
  .from('musicas')
  .select('id, titulo')
  .eq('publicada', true)
  .order('criada_em', { ascending: false })
  .limit(5);`,
        question: 'Qual é o SQL equivalente?',
        options: [
          { text: 'SELECT * FROM musicas WHERE publicada = true', feedback: 'Faltou seleção de colunas, ordem e limite.' },
          { text: 'SELECT id, titulo FROM musicas WHERE publicada = true ORDER BY criada_em DESC LIMIT 5', feedback: 'Isso! Cada método encadeado vira uma cláusula SQL.', correct: true },
          { text: 'SELECT id, titulo FROM musicas LIMIT 5', feedback: 'Faltaram WHERE e ORDER BY.' },
          { text: 'SELECT id, titulo FROM musicas ORDER BY criada_em ASC LIMIT 5', feedback: 'ascending: false significa DESC, não ASC.' }
        ],
        feedback: 'O cliente JS do Supabase é um query builder — cada método adiciona uma cláusula SQL. Saber SQL deixa esses métodos óbvios.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'buildSelect',
        instructions: [
          'Escreva buildSelect(table, cols) que retorna uma string SQL SELECT.',
          'cols é um array de strings com nomes de colunas.',
          'buildSelect("users", ["id","name"]) → "SELECT id, name FROM users"'
        ],
        sampleCode: `function buildSelect(table, cols) {
  // TODO
}`,
        solution: `function buildSelect(table, cols) {
  return 'SELECT ' + cols.join(', ') + ' FROM ' + table;
}`,
        tests: [
          { input: 'buildSelect("users", ["id","name"])', expected: 'SELECT id, name FROM users', desc: 'select básico' },
          { input: 'buildSelect("posts", ["*"])', expected: 'SELECT * FROM posts', desc: 'select de tudo' },
          { input: 'buildSelect("items", ["id","title","status"])', expected: 'SELECT id, title, status FROM items', desc: 'três colunas' }
        ],
        hints: [
          'Junte o array cols com ", " e coloque "SELECT " no início.',
          'Adicione " FROM " e o nome da tabela.',
          'Concatenação de string ou template literal funcionam.'
        ]
      },
      {
        level: 2,
        title: 'buildWhere',
        instructions: [
          'Escreva buildWhere(conditions) que pega um array de strings de condição e retorna uma cláusula WHERE.',
          'Várias condições devem ser unidas com " AND ".',
          'buildWhere(["age > 18", "active = true"]) → "WHERE age > 18 AND active = true"'
        ],
        sampleCode: `function buildWhere(conditions) {
  // TODO
}`,
        solution: `function buildWhere(conditions) {
  if (!conditions || conditions.length === 0) return '';
  return 'WHERE ' + conditions.join(' AND ');
}`,
        tests: [
          { input: 'buildWhere(["age > 18", "active = true"])', expected: 'WHERE age > 18 AND active = true', desc: 'duas condições' },
          { input: 'buildWhere(["id = 1"])', expected: 'WHERE id = 1', desc: 'uma condição só' },
          { input: 'buildWhere([])', expected: '', desc: 'vazio retorna string vazia' }
        ],
        hints: [
          'Junte as condições com " AND ".',
          'Coloque "WHERE " no início.',
          'Trate o caso de array vazio — retorne string vazia.'
        ]
      },
      {
        level: 3,
        title: 'buildOrderBy',
        instructions: [
          'Escreva buildOrderBy(col, dir) que retorna uma cláusula ORDER BY.',
          'dir deve ser "ASC" ou "DESC".',
          'buildOrderBy("created_at", "DESC") → "ORDER BY created_at DESC"'
        ],
        sampleCode: `function buildOrderBy(col, dir) {
  // TODO
}`,
        solution: `function buildOrderBy(col, dir) {
  return 'ORDER BY ' + col + ' ' + dir;
}`,
        tests: [
          { input: 'buildOrderBy("created_at", "DESC")', expected: 'ORDER BY created_at DESC', desc: 'ordem decrescente' },
          { input: 'buildOrderBy("name", "ASC")', expected: 'ORDER BY name ASC', desc: 'ordem crescente' }
        ],
        hints: [
          'Concatenação simples: "ORDER BY " + col + " " + dir.',
          'Não precisa validar dir — só confia na entrada nesse exercício.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Check Final de SQL',
      steps: [
        {
          type: 'coding',
          title: 'buildQuery',
          instructions: 'Escreva buildQuery(table, cols, conditions, orderCol, orderDir, limit) que monta uma query SELECT completa. conditions é um array (pode ser vazio). orderCol/orderDir/limit podem ser null.',
          sampleCode: `function buildQuery(table, cols, conditions, orderCol, orderDir, limit) {
  // TODO: monte uma query SQL SELECT completa
}`,
          solution: `function buildQuery(table, cols, conditions, orderCol, orderDir, limit) {
  let q = 'SELECT ' + cols.join(', ') + ' FROM ' + table;
  if (conditions && conditions.length > 0) q += ' WHERE ' + conditions.join(' AND ');
  if (orderCol) q += ' ORDER BY ' + orderCol + ' ' + orderDir;
  if (limit) q += ' LIMIT ' + limit;
  return q;
}`,
          tests: [
            { input: 'buildQuery("users",["id","name"],["active=true"],"name","ASC",10)', expected: 'SELECT id, name FROM users WHERE active=true ORDER BY name ASC LIMIT 10', desc: 'query completa' },
            { input: 'buildQuery("posts",["*"],[],null,null,null)', expected: 'SELECT * FROM posts', desc: 'query mínima' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Por que `SELECT *` é considerado má prática em queries de produção?',
          options: [
            { text: 'É sintaxe SQL inválida', feedback: 'SELECT * é válido — mas não é ideal.' },
            { text: 'Retorna todas as colunas inclusive sensíveis, e quebra se adicionar/remover colunas', feedback: 'Isso! Busca dados desnecessários e cria dependência frágil com o esquema.', correct: true },
            { text: 'Sempre causa varredura completa de tabela', feedback: 'Isso é outra coisa — índices ainda podem ser usados.' },
            { text: 'Supabase não suporta SELECT *', feedback: 'Supabase suporta tranquilo — só não é boa prática.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'O que é um índice em SQL e quando vale a pena adicionar um numa tabela do Supabase?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre backend. Use exemplos de Discord (servidores, bots), Roblox (sistema de login), Minecraft (multiplayer), Spotify (recomendações). Mostre como o que rola por trás dos apps que eles usam funciona. Seja direto, com humor leve.'
    },
    resources: [
      { title: 'CS50 SQL Week 7', url: 'https://cs50.harvard.edu/x/2024/weeks/7/' },
      { title: 'Supabase: Filtros em Consultas', url: 'https://supabase.com/docs/reference/javascript/using-filters' }
    ]
  },

  // ─── be-5 ───────────────────────────────────────────────────────────────────
  {
    id: 'be-5-sql-joins',
    title: 'JOINs em SQL e Consultas Complexas',
    week: 7,
    xp: 80,
    difficulty: 'Intermediate',
    priority: '⭐⭐',
    hook: 'Pra mostrar quem te seguiu no Insta, o banco precisa "juntar" (JOIN) sua tabela de usuários com a tabela de follows. Sem JOIN, sem feed.',

    assess: {
      type: 'multipleChoice',
      question: 'Qual a diferença entre INNER JOIN e LEFT JOIN?',
      options: [
        { text: 'INNER JOIN retorna todas as linhas da tabela da esquerda; LEFT JOIN só retorna correspondências', feedback: 'Tá ao contrário.' },
        { text: 'INNER JOIN retorna só as linhas que casam; LEFT JOIN retorna todas as linhas da esquerda mais as correspondências da direita', feedback: 'Isso! LEFT JOIN preserva todas as linhas da tabela da esquerda.', correct: true },
        { text: 'São idênticos — só sintaxe diferente', feedback: 'Eles se comportam muito diferente quando tem linhas sem correspondência.' },
        { text: 'LEFT JOIN é mais rápido que INNER JOIN', feedback: 'Geralmente o oposto — LEFT JOIN faz mais trabalho.' }
      ]
    },

    learn: {
      hook: 'Quando o Insta mostra "Fulano curtiu sua foto", o banco fez um JOIN entre a tabela de curtidas e a tabela de usuários pra pegar o nome do fulano. Sem JOIN, você veria só o ID.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/7/',
        title: 'SQL JOINs — CS50 Week 7',
        duration: '45 min',
        yourTakeaway: 'Entenda como a cláusula ON casa linhas e o que acontece com linhas sem correspondência em diferentes tipos de JOIN.'
      },
      conceptText: `JOINs combinam linhas de duas ou mais tabelas baseado numa coluna relacionada.\n\nINNER JOIN retorna só as linhas onde a condição ON casa nas duas tabelas. Se um post não tem usuário correspondente, ele fica de fora.\n\nLEFT JOIN (LEFT OUTER JOIN) retorna todas as linhas da tabela da esquerda, com NULLs nas colunas da direita quando não tem correspondência. Útil pra "mostra todos os posts, mesmo os sem curtida ainda."\n\nGROUP BY junta linhas com o mesmo valor numa coluna específica numa única linha, permitindo funções de agregação por grupo. GROUP BY user_id + COUNT(*) dá o número de posts por usuário.\n\nHAVING filtra os resultados agrupados — é tipo WHERE mas pra agregações. "Só usuários com mais de 5 posts" é GROUP BY user_id HAVING COUNT(*) > 5.\n\nSubqueries embutem um SELECT dentro de outra query. São poderosas mas podem ser lentas — um JOIN geralmente é mais eficiente.`,
      realWorldExample: 'No Instagram, quando você abre suas notificações: "Maria, João e mais 5 pessoas curtiram seu post". O banco fez um JOIN entre a tabela curtidas, a tabela usuários e a tabela posts pra montar isso. Sem JOIN, você só veria IDs.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Escolha o JOIN Certo',
        question: 'Você quer todos os posts, mais o nome do autor se tiver conta. Alguns posts não têm autor. Qual JOIN?',
        options: [
          { text: 'INNER JOIN autores ON posts.autor_id = autores.id', feedback: 'Isso excluiria os posts sem autor.' },
          { text: 'LEFT JOIN autores ON posts.autor_id = autores.id', feedback: 'Isso! LEFT JOIN mantém todos os posts e preenche NULL onde não tem autor.', correct: true },
          { text: 'RIGHT JOIN autores ON posts.autor_id = autores.id', feedback: 'Isso manteria todos os autores, não todos os posts.' },
          { text: 'FULL OUTER JOIN', feedback: 'Isso retorna todas as linhas das duas tabelas — mais do que precisa.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Ordene a Query Complexa',
        description: 'Coloque essas cláusulas pra montar: "Total de posts por usuário, só usuários com mais de 3 posts, ordenados por total decrescente."',
        items: [
          'ORDER BY total DESC',
          'SELECT user_id, COUNT(*) as total',
          'HAVING COUNT(*) > 3',
          'FROM posts',
          'GROUP BY user_id'
        ],
        correctOrder: [1, 3, 4, 2, 0],
        feedback: 'Ordem de execução SQL: FROM → GROUP BY → HAVING → SELECT → ORDER BY. Escreva nessa ordem lógica.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Sintaxe de JOIN do Supabase',
        instructions: 'Qual SQL essa query do Supabase representa?',
        code: `const { data } = await supabase
  .from('posts')
  .select('id, titulo, usuarios(nome)')
  .eq('publicado', true);`,
        question: 'Qual o comportamento efetivo do JOIN?',
        options: [
          { text: 'Um LEFT JOIN buscando post e nome do usuário pros posts publicados', feedback: 'Isso! Os selects aninhados do Supabase usam semântica de LEFT JOIN.', correct: true },
          { text: 'Um CROSS JOIN combinando todos os posts com todos os usuários', feedback: 'Não — o Supabase faz JOIN automaticamente pela foreign key.' },
          { text: 'Duas queries separadas mescladas no client', feedback: 'O Supabase resolve isso no server como uma query só.' },
          { text: 'Um INNER JOIN que exclui posts sem usuário', feedback: 'Select aninhado do Supabase usa LEFT JOIN, não INNER JOIN.' }
        ],
        feedback: 'A sintaxe de select aninhado do Supabase é açúcar sintático pra LEFT JOIN via relacionamentos de foreign key definidos no esquema.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'buildInnerJoin',
        instructions: [
          'Escreva buildInnerJoin(t1, t2, on) que retorna uma string de cláusula INNER JOIN.',
          'buildInnerJoin("posts","usuarios","posts.user_id = usuarios.id") → "INNER JOIN usuarios ON posts.user_id = usuarios.id"'
        ],
        sampleCode: `function buildInnerJoin(t1, t2, on) {
  // TODO
}`,
        solution: `function buildInnerJoin(t1, t2, on) {
  return 'INNER JOIN ' + t2 + ' ON ' + on;
}`,
        tests: [
          { input: 'buildInnerJoin("posts","platforms","posts.platform_id = platforms.id")', expected: 'INNER JOIN platforms ON posts.platform_id = platforms.id', desc: 'join posts com platforms' },
          { input: 'buildInnerJoin("orders","users","orders.user_id = users.id")', expected: 'INNER JOIN users ON orders.user_id = users.id', desc: 'join orders com users' }
        ],
        hints: [
          'A cláusula começa com "INNER JOIN " seguido do nome da segunda tabela.',
          'Depois " ON " e a condição.',
          't1 (tabela da esquerda) não aparece na string da cláusula em si.'
        ]
      },
      {
        level: 2,
        title: 'buildGroupBy',
        instructions: [
          'Escreva buildGroupBy(cols, agg) que retorna uma cláusula GROUP BY seguida de uma cláusula HAVING usando a agregação.',
          'buildGroupBy(["platform_id"], "COUNT(*) as total") → "GROUP BY platform_id HAVING COUNT(*) as total"'
        ],
        sampleCode: `function buildGroupBy(cols, agg) {
  // TODO
}`,
        solution: `function buildGroupBy(cols, agg) {
  return 'GROUP BY ' + cols.join(', ') + ' HAVING ' + agg;
}`,
        tests: [
          { input: 'buildGroupBy(["platform_id"],"COUNT(*) as total")', expected: 'GROUP BY platform_id HAVING COUNT(*) as total', desc: 'uma coluna de grupo' },
          { input: 'buildGroupBy(["year","month"],"SUM(revenue) > 1000")', expected: 'GROUP BY year, month HAVING SUM(revenue) > 1000', desc: 'duas colunas de grupo' }
        ],
        hints: [
          'Junte cols com ", ", coloque "GROUP BY " no início.',
          'Adicione " HAVING " e a string agg.',
          'Concatenação simples.'
        ]
      },
      {
        level: 3,
        title: 'countUnique',
        instructions: [
          'Escreva countUnique(arr) que retorna o número de valores únicos no array.',
          'countUnique([1,2,2,3,3,3]) → 3'
        ],
        sampleCode: `function countUnique(arr) {
  // TODO
}`,
        solution: `function countUnique(arr) {
  return new Set(arr).size;
}`,
        tests: [
          { input: 'countUnique([1,2,2,3,3,3])', expected: 3, desc: 'três valores únicos' },
          { input: 'countUnique(["a","b","a","c"])', expected: 3, desc: 'valores string' },
          { input: 'countUnique([])', expected: 0, desc: 'array vazio' }
        ],
        hints: [
          'Um Set guarda só valores únicos.',
          'new Set(arr) remove duplicados.',
          '.size num Set dá a contagem de valores únicos.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Check Final de JOINs',
      steps: [
        {
          type: 'coding',
          title: 'groupByKey',
          instructions: 'Escreva groupByKey(arr, key) que agrupa um array de objetos pelo valor em key, contando itens por grupo. Retorna um objeto tipo {chave: contagem}.',
          sampleCode: `function groupByKey(arr, key) {
  // TODO: retorne { [keyValue]: count }
}`,
          solution: `function groupByKey(arr, key) {
  return arr.reduce((acc, item) => {
    const k = item[key];
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});
}`,
          tests: [
            { input: 'groupByKey([{p:"twitter"},{p:"twitter"},{p:"linkedin"}],"p")', expected: { twitter: 2, linkedin: 1 }, desc: 'conta por plataforma' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Num esquema do Supabase, o que permite a sintaxe de select aninhado `supabase.from("posts").select("*, autores(*)")`?',
          options: [
            { text: 'Uma trigger na tabela posts', feedback: 'Triggers rodam em mudanças de dados, não em consultas.' },
            { text: 'Um relacionamento de foreign key definido no esquema', feedback: 'Isso! Supabase usa o relacionamento FK pra saber qual tabela juntar e em qual coluna.', correct: true },
            { text: 'Uma política RLS', feedback: 'RLS controla acesso, não comportamento de JOIN.' },
            { text: 'Uma Supabase Edge Function', feedback: 'Não é necessária pra JOINs básicos.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'O que é o problema N+1 de queries e como JOINs (ou selects aninhados do Supabase) resolvem isso?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre backend. Use exemplos de Discord (servidores, bots), Roblox (sistema de login), Minecraft (multiplayer), Spotify (recomendações). Mostre como o que rola por trás dos apps que eles usam funciona. Seja direto, com humor leve.'
    },
    resources: [
      { title: 'CS50 SQL Week 7', url: 'https://cs50.harvard.edu/x/2024/weeks/7/' },
      { title: 'Supabase: Joins em Consultas', url: 'https://supabase.com/docs/guides/database/joins-and-nesting' }
    ]
  },

  // ─── be-6 ───────────────────────────────────────────────────────────────────
  {
    id: 'be-6-db-design',
    title: 'Modelagem de Banco e Normalização',
    week: 7,
    xp: 70,
    difficulty: 'Intermediate',
    priority: '⭐',
    hook: 'Por que o Discord não duplica mensagens entre canais? Boa modelagem de banco. Schema ruim = bugs que só migração resolve.',

    assess: {
      type: 'multipleChoice',
      question: 'Que problema a normalização de banco de dados resolve principalmente?',
      options: [
        { text: 'Performance lenta de consultas', feedback: 'Normalização pode até atrapalhar performance — índices ajudam mais com isso.' },
        { text: 'Redundância de dados e anomalias de atualização', feedback: 'Isso! Normalização garante que cada fato é guardado uma vez só, prevenindo atualizações inconsistentes.', correct: true },
        { text: 'Falta de foreign key constraints', feedback: 'FKs são ferramenta; normalização é o princípio de design.' },
        { text: 'Arquivos de tabela grandes', feedback: 'Tamanho de armazenamento é preocupação secundária.' }
      ]
    },

    learn: {
      hook: 'Antes de escrever uma migration do Supabase, entender 1NF/2NF/3NF significa que você não vai ter que refazer seu esquema três meses depois.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/7/',
        title: 'Database Design — CS50 Week 7',
        duration: '30 min',
        yourTakeaway: 'Foca nas formas normais e em por que foreign keys garantem integridade de dados.'
      },
      conceptText: `Normalização de banco é o processo de estruturar tabelas pra reduzir redundância e dependência.\n\n1NF (Primeira Forma Normal): cada coluna tem valores atômicos (indivisíveis) e cada linha é única. Sem arrays ou listas separadas por vírgula numa célula.\n\n2NF (Segunda Forma Normal): tem que estar em 1NF, e toda coluna não-chave deve depender da chave primária inteira — não só de parte dela. Relevante pra chaves primárias compostas.\n\n3NF (Terceira Forma Normal): tem que estar em 2NF, e nenhuma coluna não-chave deve depender de outra coluna não-chave (sem dependências transitivas). Se uma tabela users guarda cidade e país e cidade determina país, isso viola 3NF — país deve ficar numa tabela cidades.\n\nChaves primárias identificam cada linha de forma única. Foreign keys referenciam uma chave primária em outra tabela e garantem integridade referencial — você não consegue ter um post referenciando um usuário que não existe.\n\nÍndices aceleram consultas em colunas que você filtra ou junta com frequência. O trade-off: índices deixam escritas mais lentas e usam armazenamento. Adicione depois de medir, não antes em toda coluna.`,
      realWorldExample: 'No Discord, sua mensagem fica numa tabela messages, e seu nome de usuário fica numa tabela users. Se duplicasse seu nome em cada mensagem, mudar seu nick exigiria atualizar 10 mil linhas. Com normalização, atualiza uma linha só.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Ache a Violação de 3NF',
        question: 'Uma tabela users tem colunas: user_id, cidade, pais. Cidade determina país. Qual forma normal é violada?',
        options: [
          { text: '1NF', feedback: 'Os valores são atômicos — 1NF tá ok.' },
          { text: '2NF', feedback: '2NF é sobre chaves compostas — essa é uma chave mais simples.' },
          { text: '3NF', feedback: 'Isso! País depende de cidade (uma coluna não-chave), não de user_id — isso é dependência transitiva.', correct: true },
          { text: 'Sem violação', feedback: 'Tem violação sim — país deveria estar numa tabela cidades separada.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Normalize o Esquema',
        description: 'Ordene esses passos pra normalizar corretamente uma tabela posts desnormalizada (posts tem post_id, titulo, platform_name, platform_url).',
        items: [
          'Crie uma tabela platforms com platform_id, name, url',
          'Adicione coluna FK platform_id em posts',
          'Identifique o grupo repetido (platform_name, platform_url)',
          'Remova platform_name e platform_url de posts',
          'Migre os dados existentes pra tabela platforms'
        ],
        correctOrder: [2, 0, 4, 1, 3],
        feedback: 'Primeiro identifica o problema, depois desenha a nova tabela, migra os dados, adiciona a FK, e por fim remove as colunas redundantes.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Ache o Erro de Integridade Referencial',
        instructions: 'O que acontece quando você roda isso no Supabase?',
        code: `// tabela platforms tem id: 1, 2, 3
// tabela posts tem FK: platform_id referencia platforms(id)

const { error } = await supabase
  .from('posts')
  .insert({ title: 'Post novo', platform_id: 999 });`,
        question: 'Qual o resultado?',
        options: [
          { text: 'O post é inserido com platform_id = 999', feedback: 'A constraint de FK previne isso.' },
          { text: 'Erro de violação de foreign key constraint', feedback: 'Isso! platform_id 999 não existe em platforms — Postgres rejeita o insert.', correct: true },
          { text: 'O post é inserido e platform_id vira null', feedback: 'Postgres não converte silenciosamente pra null.' },
          { text: 'Uma plataforma nova com id=999 é criada automaticamente', feedback: 'Constraints de FK garantem integridade — não criam linhas relacionadas sozinhas.' }
        ],
        feedback: 'Foreign key constraints garantem integridade referencial no nível do banco — a camada de aplicação não consegue criar linhas órfãs por acidente.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'normalizeTable',
        instructions: [
          'Escreva normalizeTable(rows, primaryKey) que converte um array de objetos pra forma normalizada.',
          'Retorne {byId: {}, ids: []} onde byId mapeia IDs como string pra objetos linha e ids é um array dos valores de chave primária.'
        ],
        sampleCode: `function normalizeTable(rows, primaryKey) {
  // TODO: retorne { byId: {}, ids: [] }
}`,
        solution: `function normalizeTable(rows, primaryKey) {
  const byId = {};
  const ids = [];
  for (const row of rows) {
    const key = row[primaryKey];
    byId[String(key)] = row;
    ids.push(key);
  }
  return { byId, ids };
}`,
        tests: [
          { input: 'normalizeTable([{id:1,name:"A"},{id:2,name:"B"}],"id")', expected: { byId: { "1": {id:1,name:"A"}, "2": {id:2,name:"B"} }, ids: [1,2] }, desc: 'normaliza duas linhas' },
          { input: 'normalizeTable([],"id")', expected: { byId: {}, ids: [] }, desc: 'array vazio' }
        ],
        hints: [
          'Loop pelas rows construindo byId e ids ao mesmo tempo.',
          'Use String(row[primaryKey]) como chave do byId.',
          'Empurre o valor bruto da chave primária (não string) em ids.'
        ]
      },
      {
        level: 2,
        title: 'hasNullValues',
        instructions: [
          'Escreva hasNullValues(row) que retorna true se algum valor no objeto for null ou undefined.',
          'Isso simula checar violações de NULL numa linha de banco.'
        ],
        sampleCode: `function hasNullValues(row) {
  // TODO: retorne true se algum valor é null ou undefined
}`,
        solution: `function hasNullValues(row) {
  return Object.values(row).some(v => v === null || v === undefined);
}`,
        tests: [
          { input: 'hasNullValues({a:1,b:null})', expected: true, desc: 'valor null encontrado' },
          { input: 'hasNullValues({a:1,b:"hello"})', expected: false, desc: 'nenhum valor null' },
          { input: 'hasNullValues({a:undefined})', expected: true, desc: 'undefined também conta' }
        ],
        hints: [
          'Use Object.values pra pegar todos os valores.',
          'Use .some() pra checar se algum valor é null ou undefined.',
          'Cheque ambos null e undefined.'
        ]
      },
      {
        level: 3,
        title: 'buildInsert',
        instructions: [
          'Escreva buildInsert(table, data) que retorna uma instrução SQL INSERT.',
          'data é um objeto comum.',
          "buildInsert(\"users\", {name:\"Elly\",role:\"admin\"}) → \"INSERT INTO users (name, role) VALUES ('Elly', 'admin')\""
        ],
        sampleCode: `function buildInsert(table, data) {
  // TODO
}`,
        solution: `function buildInsert(table, data) {
  const cols = Object.keys(data).join(', ');
  const vals = Object.values(data).map(v => "'" + v + "'").join(', ');
  return 'INSERT INTO ' + table + ' (' + cols + ') VALUES (' + vals + ')';
}`,
        tests: [
          { input: "buildInsert('users',{name:'Elly',role:'admin'})", expected: "INSERT INTO users (name, role) VALUES ('Elly', 'admin')", desc: 'insert básico' },
          { input: "buildInsert('posts',{title:'Hello'})", expected: "INSERT INTO posts (title) VALUES ('Hello')", desc: 'uma coluna só' }
        ],
        hints: [
          'Use Object.keys pros nomes das colunas.',
          'Use Object.values pros valores, embrulhando cada um em aspas simples.',
          'Junte os dois arrays com ", " e monte a string completa.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Check Final de Modelagem',
      steps: [
        {
          type: 'coding',
          title: 'flattenToTable',
          instructions: 'Escreva flattenToTable(normalizedData) que pega {byId, ids} e retorna um array de objetos linha na ordem dos ids.',
          sampleCode: `function flattenToTable(normalizedData) {
  // TODO: retorne array de linhas na ordem dos ids
}`,
          solution: `function flattenToTable(normalizedData) {
  return normalizedData.ids.map(id => normalizedData.byId[String(id)]);
}`,
          tests: [
            { input: 'flattenToTable({byId:{"1":{id:1,name:"A"},"2":{id:2,name:"B"}},ids:[1,2]})', expected: [{id:1,name:"A"},{id:2,name:"B"}], desc: 'volta pra array' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Quando você desnormalizaria uma tabela de banco de propósito?',
          options: [
            { text: 'Quando quer deixar o esquema mais fácil de entender', feedback: 'Normalização geralmente é mais lógica, não menos.' },
            { text: 'Pra workloads de leitura pesada onde performance de JOIN é gargalo', feedback: 'Isso! Desnormalização troca complexidade de escrita por leituras mais rápidas — comum em analytics ou cache.', correct: true },
            { text: 'Quando você não tem suporte a foreign key', feedback: 'Você deveria normalizar logicamente mesmo sem enforcement de FK.' },
            { text: 'Desnormalização é sempre erro', feedback: 'Tem casos válidos, especialmente pra performance.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Qual a diferença entre uma migration do Supabase e só editar uma tabela no dashboard? Quando importa?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre backend. Use exemplos de Discord (servidores, bots), Roblox (sistema de login), Minecraft (multiplayer), Spotify (recomendações). Mostre como o que rola por trás dos apps que eles usam funciona. Seja direto, com humor leve.'
    },
    resources: [
      { title: 'Supabase: Design de Banco', url: 'https://supabase.com/docs/guides/database/tables' },
      { title: 'CS50 SQL Week 7', url: 'https://cs50.harvard.edu/x/2024/weeks/7/' }
    ]
  },

  // ─── be-7 ───────────────────────────────────────────────────────────────────
  {
    id: 'be-7-python-basics',
    title: 'Fundamentos de Python',
    week: 6,
    xp: 60,
    difficulty: 'Beginner',
    priority: '⭐',
    hook: 'Python: linguagem que turbinou o ChatGPT, as recomendações do YouTube e do Instagram. Saber Python = poder escrever IA e automação.',

    assess: {
      type: 'multipleChoice',
      question: 'Qual construção de Python mais se parece com o Array.map() do JavaScript?',
      options: [
        { text: 'for loop com append', feedback: 'Funciona mas não é o equivalente idiomático.' },
        { text: 'List comprehension: [f(x) for x in arr]', feedback: 'Isso! List comprehensions são o equivalente conciso de map() em Python.', correct: true },
        { text: 'dict comprehension', feedback: 'Dict comprehensions produzem mapas de chave-valor, não arrays.' },
        { text: 'expressões lambda', feedback: 'Lambdas são funções anônimas — parecidas com arrow functions, não com map.' }
      ]
    },

    learn: {
      hook: 'O algoritmo do YouTube que decide o próximo vídeo? Python. As recomendações de música do Spotify? Python. Se você quer mexer com IA, esse é o caminho.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/6/',
        title: 'Python — CS50 Week 6',
        duration: '2 hr',
        yourTakeaway: 'Foca em list comprehensions, dicionários e métodos de string — mapeiam direto pros equivalentes em JS que você já conhece.'
      },
      conceptText: `Sintaxe Python é diferente de JavaScript mas os conceitos são os mesmos. Diferenças principais:\n\nIndentação é estrutura em Python (sem chaves). def define função. Variáveis não precisam de let/const. None é o null do Python. True/False são com letra maiúscula.\n\nList comprehensions são a transformação elegante de array do Python: [x * 2 for x in nums if x > 0] equivale a nums.filter(x => x > 0).map(x => x * 2). Você faz filter e map numa expressão só.\n\nDicionários ({key: value}) são o equivalente Python de objetos JS. .keys(), .values(), .items() dão os mesmos padrões de acesso que Object.keys/values/entries.\n\nMétodos de string são parecidos: .split(), .strip() (equivale a .trim()), .lower()/.upper() e f-strings (f"Hello {name}") combinam com template literals do JS.\n\nEm termos de JS: camelCase vira snake_case em Python, === vira ==, null vira None, console.log vira print, Array vira list, Object vira dict.`,
      realWorldExample: 'Quando o YouTube te recomenda um vídeo, o algoritmo provavelmente foi treinado em Python usando bibliotecas tipo PyTorch ou TensorFlow. Mesma coisa pro ChatGPT — Python é a linguagem nº1 de IA.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Tradução Python pra JS',
        question: 'Qual o equivalente JavaScript da list comprehension Python `[x.strip() for x in lines if x]`?',
        options: [
          { text: 'lines.map(x => x.trim())', feedback: 'Quase — mas isso não filtra strings vazias.' },
          { text: 'lines.filter(x => x).map(x => x.trim())', feedback: 'Isso! filter(x => x) remove valores falsy (strings vazias), depois map dá trim.', correct: true },
          { text: 'lines.reduce((a,x) => x ? [...a, x.trim()] : a, [])', feedback: 'Funciona mas é mais verboso do que precisa.' },
          { text: 'lines.forEach(x => x.trim())', feedback: 'forEach não retorna um novo array.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Mapeamento de Conceitos Python → JS',
        description: 'Ordene os conceitos JS (de cima pra baixo) pra alinhar com seus equivalentes Python: strip(), list comprehension, dict, None, == (estrito em Python).',
        items: [
          'JS: trim()',
          'JS: filter().map()',
          'JS: Object',
          'JS: null',
          'JS: ==='
        ],
        correctOrder: [0, 1, 2, 3, 4],
        feedback: 'Python strip() → JS trim(), list comprehension → filter().map(), dict → Object, None → null, Python == (estrito por padrão) → JS ===.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Trace as Operações de String',
        instructions: 'O que esse código mostra?',
        code: `function toCamelCase(str) {
  return str
    .split('_')
    .map((word, i) => i === 0 ? word : word[0].toUpperCase() + word.slice(1))
    .join('');
}
console.log(toCamelCase('hello_world_test'));`,
        question: 'O que aparece?',
        options: [
          { text: '"Hello_World_Test"', feedback: 'Isso seria TitleCase, não camelCase.' },
          { text: '"helloWorldTest"', feedback: 'Isso! A primeira palavra fica minúscula, as seguintes ficam capitalizadas.', correct: true },
          { text: '"hello_world_test"', feedback: 'Isso é o input sem mudança.' },
          { text: '"HelloWorldTest"', feedback: 'A primeira palavra deve continuar minúscula no camelCase.' }
        ],
        feedback: 'O map checa o índice: índice 0 fica como tá, todos os outros têm a primeira letra capitalizada.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'toCamelCase',
        instructions: [
          'Escreva toCamelCase(str) que converte uma string snake_case pra camelCase.',
          'A primeira palavra fica minúscula; cada palavra seguinte é capitalizada.',
          'toCamelCase("hello_world") → "helloWorld"'
        ],
        sampleCode: `function toCamelCase(str) {
  // TODO: converter snake_case pra camelCase
}`,
        solution: `function toCamelCase(str) {
  return str
    .split('_')
    .map((word, i) => i === 0 ? word : word[0].toUpperCase() + word.slice(1))
    .join('');
}`,
        tests: [
          { input: 'toCamelCase("hello_world")', expected: 'helloWorld', desc: 'snake pra camel básico' },
          { input: 'toCamelCase("my_api_key")', expected: 'myApiKey', desc: 'três palavras' },
          { input: 'toCamelCase("name")', expected: 'name', desc: 'uma palavra sem mudança' }
        ],
        hints: [
          'Faça split por "_", depois map em cada palavra.',
          'Pro índice 0, retorne a palavra como tá.',
          'Pros outros índices, capitalize a primeira letra e adicione o resto.'
        ]
      },
      {
        level: 2,
        title: 'toSnakeCase',
        instructions: [
          'Escreva toSnakeCase(str) que converte uma string camelCase pra snake_case.',
          'Insere um underscore antes de cada letra maiúscula e deixa tudo minúsculo.',
          'toSnakeCase("helloWorld") → "hello_world"'
        ],
        sampleCode: `function toSnakeCase(str) {
  // TODO: converter camelCase pra snake_case
}`,
        solution: `function toSnakeCase(str) {
  return str
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase();
}`,
        tests: [
          { input: 'toSnakeCase("helloWorld")', expected: 'hello_world', desc: 'camel pra snake básico' },
          { input: 'toSnakeCase("myApiKey")', expected: 'my_api_key', desc: 'três palavras' },
          { input: 'toSnakeCase("name")', expected: 'name', desc: 'uma palavra sem mudança' }
        ],
        hints: [
          'Use regex pra achar letras maiúsculas: /([A-Z])/g',
          'Substitua cada uma por "_" + a letra, depois toLowerCase na string toda.',
          'str.replace(/([A-Z])/g, "_$1").toLowerCase()'
        ]
      },
      {
        level: 3,
        title: 'parseKwargs',
        instructions: [
          'Escreva parseKwargs(str) que analisa uma string "key=val key2=val2" num objeto.',
          'Pares chave=valor separados por espaço.',
          'parseKwargs("name=elly role=admin") → {name:"elly",role:"admin"}'
        ],
        sampleCode: `function parseKwargs(str) {
  // TODO: analisar "key=val key2=val2" num objeto
}`,
        solution: `function parseKwargs(str) {
  return str.trim().split(' ').reduce((acc, pair) => {
    const [key, val] = pair.split('=');
    acc[key] = val;
    return acc;
  }, {});
}`,
        tests: [
          { input: 'parseKwargs("name=elly role=admin")', expected: { name: 'elly', role: 'admin' }, desc: 'dois kwargs' },
          { input: 'parseKwargs("port=3000")', expected: { port: '3000' }, desc: 'um kwarg só' }
        ],
        hints: [
          'Faça split por espaço pra ter cada par.',
          'Faça split de cada par por "=" pra ter chave e valor.',
          'Reduza num objeto.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Check Final de Python',
      steps: [
        {
          type: 'coding',
          title: 'keyMapper',
          instructions: 'Escreva keyMapper(obj, mapFn) que aplica mapFn em toda chave de obj, retornando um novo objeto com chaves transformadas mas os mesmos valores.',
          sampleCode: `function keyMapper(obj, mapFn) {
  // TODO: transformar todas as chaves usando mapFn
}`,
          solution: `function keyMapper(obj, mapFn) {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    acc[mapFn(k)] = v;
    return acc;
  }, {});
}`,
          tests: [
            { input: 'keyMapper({hello_world:1,my_key:2}, k=>k.split("_").map((w,i)=>i===0?w:w[0].toUpperCase()+w.slice(1)).join(""))', expected: { helloWorld: 1, myKey: 2 }, desc: 'converte todas as chaves pra camelCase' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Qual conceito de Python mais inspirou diretamente a destruturação de arrays do JavaScript (`const [a, b] = arr`)?',
          options: [
            { text: 'Tuple unpacking do Python: a, b = arr', feedback: 'Isso! Tuple unpacking do Python é a inspiração direta da destruturação do JS.', correct: true },
            { text: 'Slicing de lista: arr[0:2]', feedback: 'Slicing produz uma nova lista, não variáveis individuais.' },
            { text: 'Dict comprehension do Python', feedback: 'Dict comprehension cria objetos, não binding de variáveis.' },
            { text: 'Funções lambda do Python', feedback: 'Lambdas são funções anônimas — conceito diferente.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Me mostra um script Python que lê um arquivo CSV e agrupa linhas por uma coluna, e depois o código equivalente em JavaScript. Explica as principais diferenças de sintaxe.',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre backend. Use exemplos de Discord (servidores, bots), Roblox (sistema de login), Minecraft (multiplayer), Spotify (recomendações). Mostre como o que rola por trás dos apps que eles usam funciona. Seja direto, com humor leve.'
    },
    resources: [
      { title: 'CS50 Python Week 6', url: 'https://cs50.harvard.edu/x/2024/weeks/6/' },
      { title: 'JavaScript.info', url: 'https://javascript.info/' }
    ]
  },

  // ─── be-8 ───────────────────────────────────────────────────────────────────
  {
    id: 'be-8-apis-http',
    title: 'APIs e HTTP',
    week: 9,
    xp: 80,
    difficulty: 'Intermediate',
    priority: '⭐⭐',
    hook: 'Quando você curte um vídeo no TikTok, o app manda uma requisição HTTP pra API do TikTok. É assim que tudo conversa.',

    assess: {
      type: 'multipleChoice',
      question: 'Qual método HTTP deve ser usado pra atualizar parcialmente um recurso?',
      options: [
        { text: 'PUT', feedback: 'PUT substitui o recurso inteiro — todos os campos têm que ser enviados.' },
        { text: 'PATCH', feedback: 'Isso! PATCH aplica uma atualização parcial — só os campos mudados são necessários.', correct: true },
        { text: 'POST', feedback: 'POST cria um recurso novo.' },
        { text: 'UPDATE', feedback: 'UPDATE não é método HTTP — é palavra-chave de SQL.' }
      ]
    },

    learn: {
      hook: 'Cada vez que você dá like, comenta, faz scroll no TikTok, o app dispara uma requisição HTTP pro servidor. Aprender HTTP é entender como todo app moderno funciona.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/9/',
        title: 'HTTP & APIs — CS50 Week 9',
        duration: '1 hr',
        yourTakeaway: 'Entenda o ciclo requisição/resposta, métodos HTTP, e como convenções REST deixam APIs previsíveis.'
      },
      conceptText: `HTTP (Hypertext Transfer Protocol) é o protocolo por trás de toda chamada de API web. Toda requisição tem um método, URL, headers e body opcional. Toda resposta tem um status code, headers e body.\n\nMétodos HTTP: GET busca dados (sem body, idempotente). POST cria um recurso novo (body tem os dados novos). PUT substitui um recurso completamente. PATCH atualiza um recurso parcialmente — manda só os campos mudados. DELETE remove um recurso.\n\nREST (Representational State Transfer) é uma convenção de design pra APIs HTTP: recursos são substantivos (/posts, /users), IDs vão no caminho (/posts/42), e ações são expressas pelo método HTTP.\n\nCategorias de status: 2xx Sucesso (200 OK, 201 Created, 204 No Content). 3xx Redirecionamento (301 Permanente, 302 Temporário). 4xx Erro do cliente (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found). 5xx Erro do servidor (500 Internal Server Error).\n\nHeaders carregam metadados: Authorization pra token de autenticação, Content-Type pra formato dos dados, headers de CORS pra requisições entre origens.`,
      realWorldExample: 'Quando você abre o TikTok e dá scroll, cada like é um POST pra api.tiktok.com/like, cada vídeo carregado é um GET. Toda interação no app é HTTP por baixo dos panos.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Significado do Status Code',
        question: 'Sua API do Supabase retorna 401. O que isso significa?',
        options: [
          { text: 'O recurso não foi encontrado', feedback: 'Isso é 404.' },
          { text: 'A requisição tá sem autenticação ou com auth inválida', feedback: 'Isso! 401 Unauthorized significa que autenticação é necessária ou falhou.', correct: true },
          { text: 'O servidor crashou', feedback: 'Isso é 500.' },
          { text: 'O formato da requisição é inválido', feedback: 'Isso é 400 ou 422.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Design de Endpoint REST',
        description: 'Ordene esses designs de endpoint do mais RESTful (em cima) pro menos RESTful (embaixo).',
        items: [
          'GET /posts/42',
          'DELETE /posts/42',
          'POST /deletePost?id=42',
          'POST /getPost'
        ],
        correctOrder: [0, 1, 2, 3],
        feedback: 'Design RESTful usa métodos HTTP como verbos e substantivos como caminhos. GET e DELETE com ID de recurso são mais REST-compliant; usar POST pra leitura ou codificar ações na URL não é RESTful.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Leia o Fetch',
        instructions: 'Qual requisição HTTP esse código faz?',
        code: `const res = await fetch('/api/posts/5', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ status: 'published' })
});`,
        question: 'Qual a semântica REST dessa chamada?',
        options: [
          { text: 'Cria um post novo com id 5', feedback: 'Criar usa POST, não PATCH.' },
          { text: 'Substitui o post 5 inteiro com os novos dados', feedback: 'Substituir inteiro usa PUT.' },
          { text: 'Atualiza parcialmente o post 5 — só mudando o status', feedback: 'Isso! PATCH com body parcial atualiza só os campos enviados.', correct: true },
          { text: 'Deleta o post 5', feedback: 'Deletar usa método DELETE.' }
        ],
        feedback: 'PATCH é o método certo quando você tá atualizando um subconjunto de campos. Só os campos no body são alterados.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'parseHttpMethod',
        instructions: [
          'Escreva parseHttpMethod(req) que extrai o método HTTP de um objeto de requisição.',
          'Retorne o método como string em maiúsculas.'
        ],
        sampleCode: `function parseHttpMethod(req) {
  // TODO: retorne o método em maiúsculas
}`,
        solution: `function parseHttpMethod(req) {
  return req.method.toUpperCase();
}`,
        tests: [
          { input: 'parseHttpMethod({method:"GET"})', expected: 'GET', desc: 'método GET' },
          { input: 'parseHttpMethod({method:"post"})', expected: 'POST', desc: 'minúsculo é normalizado' },
          { input: 'parseHttpMethod({method:"delete"})', expected: 'DELETE', desc: 'método delete' }
        ],
        hints: [
          'Acesse req.method.',
          'Chame .toUpperCase().',
          'Uma linha.'
        ]
      },
      {
        level: 2,
        title: 'buildRestEndpoint',
        instructions: [
          'Escreva buildRestEndpoint(resource, id) que retorna um caminho de URL REST.',
          'Se id for null ou undefined, retorne "/resource".',
          'Senão, retorne "/resource/id".'
        ],
        sampleCode: `function buildRestEndpoint(resource, id) {
  // TODO
}`,
        solution: `function buildRestEndpoint(resource, id) {
  if (id === null || id === undefined) return '/' + resource;
  return '/' + resource + '/' + id;
}`,
        tests: [
          { input: 'buildRestEndpoint("posts", 42)', expected: '/posts/42', desc: 'com ID' },
          { input: 'buildRestEndpoint("users", null)', expected: '/users', desc: 'endpoint de coleção' },
          { input: 'buildRestEndpoint("platforms", undefined)', expected: '/platforms', desc: 'id undefined' }
        ],
        hints: [
          'Cheque se id é null ou undefined.',
          'Use "/" + resource pra coleção, adicione "/" + id pra recurso único.',
          'null e undefined devem retornar a URL de coleção.'
        ]
      },
      {
        level: 3,
        title: 'statusCodeMeaning',
        instructions: [
          'Escreva statusCodeMeaning(code) que retorna uma descrição em string.',
          '200→"OK", 201→"Created", 204→"No Content", 400→"Bad Request", 401→"Unauthorized", 403→"Forbidden", 404→"Not Found", 500→"Internal Server Error", desconhecido→"Unknown"'
        ],
        sampleCode: `function statusCodeMeaning(code) {
  // TODO: retorne descrição do status code
}`,
        solution: `function statusCodeMeaning(code) {
  const map = {
    200: 'OK', 201: 'Created', 204: 'No Content',
    400: 'Bad Request', 401: 'Unauthorized',
    403: 'Forbidden', 404: 'Not Found',
    500: 'Internal Server Error'
  };
  return map[code] || 'Unknown';
}`,
        tests: [
          { input: 'statusCodeMeaning(401)', expected: 'Unauthorized', desc: '401' },
          { input: 'statusCodeMeaning(200)', expected: 'OK', desc: '200' },
          { input: 'statusCodeMeaning(404)', expected: 'Not Found', desc: '404' },
          { input: 'statusCodeMeaning(999)', expected: 'Unknown', desc: 'código desconhecido' }
        ],
        hints: [
          'Use um objeto de lookup com status codes como chaves.',
          'Retorne map[code] || "Unknown".',
          'Liste todos os códigos das instruções.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Check Final de APIs e HTTP',
      steps: [
        {
          type: 'coding',
          title: 'parseRequest',
          instructions: 'Escreva parseRequest(req) que retorna {method, resource, id, hasBody}. resource é o primeiro segmento do path (sem /), id é o segundo (ou null), hasBody é true se req.body for truthy.',
          sampleCode: `function parseRequest(req) {
  // req = { method, path, body }
  // TODO: retorne { method, resource, id, hasBody }
}`,
          solution: `function parseRequest(req) {
  const parts = req.path.split('/').filter(Boolean);
  return {
    method: req.method.toUpperCase(),
    resource: parts[0] || null,
    id: parts[1] || null,
    hasBody: !!req.body
  };
}`,
          tests: [
            { input: 'parseRequest({method:"GET",path:"/posts/5",body:null})', expected: { method: 'GET', resource: 'posts', id: '5', hasBody: false }, desc: 'GET com ID' },
            { input: 'parseRequest({method:"post",path:"/users",body:{name:"Elly"}})', expected: { method: 'POST', resource: 'users', id: null, hasBody: true }, desc: 'POST pra coleção' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Qual a diferença entre 401 Unauthorized e 403 Forbidden?',
          options: [
            { text: 'São idênticos na prática', feedback: 'Têm semântica significativamente diferente.' },
            { text: '401 significa autenticação faltando/inválida; 403 significa autenticado mas sem permissão', feedback: 'Isso! 401 diz "quem é você?" e 403 diz "sei quem é você mas não pode fazer isso."', correct: true },
            { text: '403 significa token faltando; 401 significa role errada', feedback: 'É o contrário.' },
            { text: '401 é pra APIs; 403 é pra páginas web', feedback: 'Os dois se aplicam a qualquer endpoint HTTP.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'O que é CORS e por que ele bloqueia suas requisições do Supabase a partir do localhost? Qual a solução certa?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre backend. Use exemplos de Discord (servidores, bots), Roblox (sistema de login), Minecraft (multiplayer), Spotify (recomendações). Mostre como o que rola por trás dos apps que eles usam funciona. Seja direto, com humor leve.'
    },
    resources: [
      { title: 'MDN: Métodos HTTP', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods' },
      { title: 'CS50 Web Week 9', url: 'https://cs50.harvard.edu/x/2024/weeks/9/' }
    ]
  },

  // ─── be-9 ───────────────────────────────────────────────────────────────────
  {
    id: 'be-9-auth-security',
    title: 'Autenticação e Segurança',
    week: 8,
    xp: 80,
    difficulty: 'Intermediate',
    priority: '⭐⭐',
    hook: 'Como o Discord sabe que VOCÊ é você quando faz login? Tokens JWT. Sem isso, qualquer um entrava na sua conta.',

    assess: {
      type: 'multipleChoice',
      question: 'Qual parte de um JWT contém as claims do usuário (tipo ID e role)?',
      options: [
        { text: 'O header', feedback: 'O header tem metadados tipo o tipo do algoritmo.' },
        { text: 'A signature', feedback: 'A signature verifica integridade — não carrega claims.' },
        { text: 'O payload', feedback: 'Isso! O payload (segundo segmento) contém as claims — ID do usuário, expiração, role, etc.', correct: true },
        { text: 'O cookie', feedback: 'Cookies podem guardar um JWT, mas claims estão no payload.' }
      ]
    },

    learn: {
      hook: 'Quando você faz login no Discord, o servidor te dá um JWT — uma "pulseira VIP" digital. Cada vez que você manda mensagem, o app mostra a pulseira pra provar quem é.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/9/',
        title: 'Security & Authentication — CS50',
        duration: '45 min',
        yourTakeaway: 'Foca em como tokens funcionam, por que sessões são menos escaláveis que JWTs, e o que o HTTPS oferece.'
      },
      conceptText: `Autenticação verifica identidade. Autorização controla acesso.\n\nJWT (JSON Web Token) são três segmentos codificados em base64url separados por pontos: header.payload.signature. O header nomeia o algoritmo. O payload carrega claims — ID do usuário (sub), expiração (exp), roles. A signature deixa o servidor verificar que o token foi emitido por ele e não foi adulterado.\n\nAuth por session guarda estado no servidor. JWT é stateless — o servidor verifica a assinatura sem consulta ao banco, deixando escalonamento horizontal trivial.\n\nHash de senha: nunca guarde senhas em texto puro. bcrypt é o padrão — lento de propósito (brute force custoso), com salt pra prevenir ataques de rainbow table.\n\nSQL injection: se você concatena input do usuário direto no SQL, um atacante pode quebrar a string e rodar queries arbitrárias. Sempre use queries parametrizadas.\n\nXSS (Cross-Site Scripting): injetar scripts maliciosos via input do usuário. Sanitize input removendo caracteres HTML antes de guardar ou renderizar.`,
      realWorldExample: 'No Discord, quando você faz login, o servidor te dá um JWT. Toda mensagem que você manda, o app envia esse token pra provar "sou eu mesmo". Se alguém roubar seu JWT, consegue se passar por você — por isso nunca compartilha token.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Como Guardar Senha',
        question: 'Um usuário envia a senha "myPassword123". O que deve ser guardado no banco?',
        options: [
          { text: '"myPassword123" como tá', feedback: 'Nunca guarda senha em texto puro — vazamento expõe todas as contas.' },
          { text: 'Hash MD5 da senha', feedback: 'MD5 é criptograficamente quebrado e rápido demais — brute force é trivial.' },
          { text: 'Um hash bcrypt da senha', feedback: 'Isso! bcrypt é lento, com salt, e padrão da indústria.', correct: true },
          { text: 'Senha criptografada com AES', feedback: 'Criptografia é reversível. Hash é só ida — melhor pra senhas.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Fluxo de Login com JWT',
        description: 'Ordene os passos de um fluxo de login JWT corretamente.',
        items: [
          'Servidor verifica a assinatura e lê as claims do payload',
          'Usuário envia credenciais',
          'Client envia o JWT no header Authorization',
          'Servidor verifica credenciais e emite um JWT assinado',
          'Servidor permite acesso baseado nas claims'
        ],
        correctOrder: [1, 3, 2, 0, 4],
        feedback: 'Login → verifica credenciais → emite JWT → client envia JWT nas requisições → servidor verifica assinatura → permite acesso.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Ache o SQL Injection',
        instructions: 'Qual versão desse código tá vulnerável a SQL injection?',
        code: `// Versão A
const query = \`SELECT * FROM users WHERE id = \${userId}\`;

// Versão B
const query = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);`,
        question: 'Qual tá vulnerável?',
        options: [
          { text: 'Versão B — o ? deixa insegura', feedback: 'O contrário — ? é um placeholder parametrizado, que é seguro.' },
          { text: 'Versão A — userId é interpolado direto', feedback: 'Isso! Se userId for "1; DROP TABLE users;--" a query vira maliciosa.', correct: true },
          { text: 'As duas são igualmente seguras', feedback: 'Interpolação com template literal é perigosa; queries parametrizadas são seguras.' },
          { text: 'Nenhuma — SQL injection só afeta formulário de login', feedback: 'SQL injection pode explorar qualquer query que use input do usuário.' }
        ],
        feedback: 'Versão A interpola userId direto. Versão B usa query parametrizada — o driver do banco escapa o valor com segurança.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'isStrongPassword',
        instructions: [
          'Escreva isStrongPassword(pwd) que retorna true se a senha atender todos os critérios:',
          'No mínimo 8 caracteres, pelo menos uma letra maiúscula, pelo menos um número, pelo menos um caractere especial (!@#$%^&*).'
        ],
        sampleCode: `function isStrongPassword(pwd) {
  // TODO: retornar true se pwd atende todos os critérios de força
}`,
        solution: `function isStrongPassword(pwd) {
  if (pwd.length < 8) return false;
  if (!/[A-Z]/.test(pwd)) return false;
  if (!/[0-9]/.test(pwd)) return false;
  if (!/[!@#$%^&*]/.test(pwd)) return false;
  return true;
}`,
        tests: [
          { input: 'isStrongPassword("weak")', expected: false, desc: 'curta demais' },
          { input: 'isStrongPassword("Str0ng!pwd")', expected: true, desc: 'atende todos os critérios' },
          { input: 'isStrongPassword("alllowercase1!")', expected: false, desc: 'sem maiúscula' },
          { input: 'isStrongPassword("NoNumbers!!")', expected: false, desc: 'sem número' }
        ],
        hints: [
          'Cheque o tamanho primeiro.',
          'Use regex: /[A-Z]/ pra maiúscula, /[0-9]/ pra número.',
          'Use /[!@#$%^&*]/ pra caracteres especiais.'
        ]
      },
      {
        level: 2,
        title: 'parseJwtPayload',
        instructions: [
          'Escreva parseJwtPayload(token) que decodifica e parseia o payload (seção do meio) de um JWT.',
          'JWTs são três segmentos base64-encoded separados por pontos.',
          'Use atob() pra decodificar. Base64url usa - e _ em vez de + e / — substitua primeiro.',
          'Retorne o objeto JSON parseado.'
        ],
        sampleCode: `function parseJwtPayload(token) {
  // token = "header.payload.signature"
  // TODO: decodificar e parsear o payload do JWT
}`,
        solution: `function parseJwtPayload(token) {
  const payload = token.split('.')[1];
  const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
  return JSON.parse(decoded);
}`,
        tests: [
          { input: 'parseJwtPayload("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyXzEiLCJyb2xlIjoiYWRtaW4ifQ.sig")', expected: { sub: 'user_1', role: 'admin' }, desc: 'parseia claims do payload' }
        ],
        hints: [
          'Faça split em "." e pegue índice [1].',
          'Substitua - por + e _ por / pra compatibilidade base64url.',
          'Use atob() depois JSON.parse().'
        ]
      },
      {
        level: 3,
        title: 'sanitizeInput',
        instructions: [
          'Escreva sanitizeInput(str) que remove caracteres que permitem XSS.',
          "Remove todas as ocorrências de: < > \" ' (sinais de maior/menor e aspas).",
          "sanitizeInput(\"<script>alert('xss')</script>\") → \"scriptalert(xss)/script\""
        ],
        sampleCode: `function sanitizeInput(str) {
  // TODO: remover caracteres < > " '
}`,
        solution: `function sanitizeInput(str) {
  return str.replace(/[<>"']/g, '');
}`,
        tests: [
          { input: "sanitizeInput(\"<script>alert('xss')</script>\")", expected: 'scriptalert(xss)/script', desc: 'remove HTML e aspas' },
          { input: 'sanitizeInput("hello world")', expected: 'hello world', desc: 'input seguro fica igual' },
          { input: 'sanitizeInput("<b>bold</b>")', expected: 'bbold/b', desc: 'remove sinais de maior/menor' }
        ],
        hints: [
          'Use uma classe de caracteres em regex: /[<>"\']/g',
          'Substitua por string vazia.',
          'A flag g substitui todas as ocorrências.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Check Final de Auth e Segurança',
      steps: [
        {
          type: 'coding',
          title: 'isValidJwt',
          instructions: 'Escreva isValidJwt(token) que retorna true se o token for estruturalmente válido — três segmentos separados por ponto, cada um não-vazio.',
          sampleCode: `function isValidJwt(token) {
  // TODO
}`,
          solution: `function isValidJwt(token) {
  if (typeof token !== 'string') return false;
  const parts = token.split('.');
  return parts.length === 3 && parts.every(p => p.length > 0);
}`,
          tests: [
            { input: 'isValidJwt("a.b.c")', expected: true, desc: 'estrutura válida' },
            { input: 'isValidJwt("a.b")', expected: false, desc: 'só dois segmentos' },
            { input: 'isValidJwt("a..c")', expected: false, desc: 'segmento do meio vazio' },
            { input: 'isValidJwt(null)', expected: false, desc: 'não é string' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Qual a principal vantagem de segurança de guardar JWTs em cookies httpOnly em vez de localStorage?',
          options: [
            { text: 'Cookies são criptografados automaticamente', feedback: 'httpOnly previne acesso por JS, mas não criptografa.' },
            { text: 'JavaScript não consegue ler cookies httpOnly, protegendo contra ataques XSS', feedback: 'Isso! Um JS injetado por atacante não consegue roubar um cookie httpOnly.', correct: true },
            { text: 'Cookies têm armazenamento ilimitado', feedback: 'Cookies são limitados a ~4KB.' },
            { text: 'Cookies httpOnly expiram automaticamente em 24 horas', feedback: 'Expiração é configurada separadamente.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'O que é Row Level Security (RLS) do Supabase e como ela usa as claims do JWT pra proteger dados?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre backend. Use exemplos de Discord (servidores, bots), Roblox (sistema de login), Minecraft (multiplayer), Spotify (recomendações). Mostre como o que rola por trás dos apps que eles usam funciona. Seja direto, com humor leve.'
    },
    resources: [
      { title: 'Supabase: Row Level Security', url: 'https://supabase.com/docs/guides/database/postgres/row-level-security' },
      { title: 'jwt.io: Debugger de JWT', url: 'https://jwt.io/' }
    ]
  },

  // ─── be-10 ──────────────────────────────────────────────────────────────────
  {
    id: 'be-10-file-io',
    title: 'I/O de Arquivos e Processamento de Dados',
    week: 5,
    xp: 70,
    difficulty: 'Intermediate',
    priority: '⭐',
    hook: 'Quando você faz upload de uma foto no Insta, ele lê o arquivo, processa, salva. Isso é I/O — entrada e saída de arquivos.',

    assess: {
      type: 'multipleChoice',
      question: 'Quando parseia um CSV com headers, qual a abordagem mais comum pra produzir dados estruturados?',
      options: [
        { text: 'Splitar por nova linha e retornar as strings brutas', feedback: 'Isso te dá strings, não objetos estruturados.' },
        { text: 'Usar a primeira linha como chaves e mapear linhas seguintes pra objetos', feedback: 'Isso! A linha do header vira as chaves; cada linha de dados vira um array de valores mapeado pra essas chaves.', correct: true },
        { text: 'JSON.parse na string CSV inteira', feedback: 'JSON.parse só funciona em JSON — CSV precisa de parser próprio.' },
        { text: 'Guardar cada linha como array de valores', feedback: 'Arrays funcionam mas são frágeis — chaves nomeadas são mais úteis.' }
      ]
    },

    learn: {
      hook: 'Toda foto que você posta no Insta, todo vídeo no YouTube, todo print que você manda no Discord — tudo isso é I/O de arquivo. O app lê os bytes, processa e salva no servidor.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/6/',
        title: 'File I/O & Data Processing — CS50',
        duration: '25 min',
        yourTakeaway: 'Foca em ler arquivos estruturados e transformar dados entre formatos.'
      },
      conceptText: `I/O de Arquivos (Input/Output) é como programas leem e escrevem arquivos. No Node.js, o módulo fs lida com isso: fs.readFileSync() pra leituras síncronas, fs.promises.readFile() pra assíncrono.\n\nCSV (Comma-Separated Values) é o formato universal de troca. Regras de parsing: splita por nova linha pra ter as linhas, splita por vírgula pra ter as colunas (cuidado com vírgulas dentro de campos com aspas). A primeira linha geralmente é o header.\n\nJSON é nativo do JS — JSON.parse() e JSON.stringify() fazem a conversão. Supabase retorna JSON; Edge Functions muitas vezes precisam transformar antes de retornar.\n\nPipelines de transformação de dados encadeiam operações: ler → parsear → filtrar → mapear → validar → saída. Cada passo deve ser uma função pura que faz uma coisa. Isso facilita os testes — testa cada passo com input de amostra.\n\nMapeamento de campo: quando os nomes de campo da origem não batem com o seu esquema alvo, um objeto de mapeamento ({sourceKey: "targetKey"}) deixa você transformar chaves sistematicamente.`,
      realWorldExample: 'Quando você posta uma foto no Insta: o app lê o arquivo do seu celular, comprime, gera várias versões (thumbnail, feed, stories), e salva tudo no servidor. Cada etapa é I/O — ler, processar, escrever.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Caso Especial de CSV',
        question: 'Uma célula de CSV contém `"Hello, World"` (com aspas em volta e vírgula dentro). Como deve ser parseado?',
        options: [
          { text: 'Duas células: "Hello" e "World"', feedback: 'As aspas externas sinalizam que é uma célula só contendo uma vírgula.' },
          { text: 'Uma célula: Hello, World (sem as aspas externas)', feedback: 'Isso! Campos entre aspas permitem vírgulas dentro — as aspas externas são delimitadores, não conteúdo.', correct: true },
          { text: 'Uma célula incluindo as aspas externas', feedback: 'As aspas externas são sintaxe do CSV, não parte do valor.' },
          { text: 'Erro de parsing', feedback: 'Isso é CSV válido — campos com aspas são padrão.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Ordem do Pipeline de Dados',
        description: 'Coloque esses passos do pipeline na ordem correta pra um import de CSV pro Supabase.',
        items: [
          'Batch insert das linhas no Supabase',
          'Ler conteúdo do arquivo CSV como string',
          'Mapear campos pros nomes do esquema do Supabase',
          'Parsear a string CSV em array de objetos',
          'Filtrar linhas inválidas ou incompletas'
        ],
        correctOrder: [1, 3, 4, 2, 0],
        feedback: 'Ler → Parsear → Filtrar → Transformar → Carregar. Cada passo alimenta o próximo.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Trace o Construtor de CSV',
        instructions: 'O que esse código mostra?',
        code: `function buildCsv(rows) {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const lines = rows.map(r => headers.map(h => r[h]).join(','));
  return [headers.join(','), ...lines].join('\\n');
}
console.log(buildCsv([{id:1,name:'Elly'}]));`,
        question: 'O que aparece?',
        options: [
          { text: '"id,name,1,Elly"', feedback: 'Headers e valores ficariam em linhas separadas.' },
          { text: '"id,name\\n1,Elly"', feedback: 'Isso! A linha do header e depois a linha de dados, separadas por nova linha.', correct: true },
          { text: '"1,Elly"', feedback: 'A linha do header seria incluída.' },
          { text: '[["id","name"],["1","Elly"]]', feedback: 'buildCsv retorna uma string.' }
        ],
        feedback: 'buildCsv extrai os headers da primeira linha, mapeia cada linha pra uma string de valores, e junta todas as linhas com nova linha.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'parseCsv',
        instructions: [
          'Escreva parseCsv(csvString) que parseia uma string CSV num array de objetos.',
          'A primeira linha é o header — use elas como chaves do objeto.',
          'parseCsv("id,name\\n1,Elly\\n2,Bob") → [{id:"1",name:"Elly"},{id:"2",name:"Bob"}]',
          'Todos os valores vão ser strings.'
        ],
        sampleCode: `function parseCsv(csvString) {
  // TODO: parsear CSV em array de objetos
}`,
        solution: `function parseCsv(csvString) {
  const lines = csvString.trim().split('\\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, h, i) => {
      obj[h] = values[i];
      return obj;
    }, {});
  });
}`,
        tests: [
          { input: 'parseCsv("id,name\\n1,Elly\\n2,Bob")', expected: [{id:"1",name:"Elly"},{id:"2",name:"Bob"}], desc: 'parse básico de CSV' },
          { input: 'parseCsv("x,y\\n10,20")', expected: [{x:"10",y:"20"}], desc: 'uma linha' }
        ],
        hints: [
          'Splita por "\\n" pra ter linhas, depois a primeira por "," pros headers.',
          'Pra cada linha de dados, combine headers e values com reduce.',
          'Use lines.slice(1) pra pular a linha de header.'
        ]
      },
      {
        level: 2,
        title: 'buildCsv',
        instructions: [
          'Escreva buildCsv(rows) que converte um array de objetos numa string CSV.',
          'A primeira linha é o header. Cada linha seguinte tem valores na mesma ordem das colunas.',
          'buildCsv([{id:1,name:"Elly"}]) → "id,name\\n1,Elly"'
        ],
        sampleCode: `function buildCsv(rows) {
  // TODO: construir string CSV a partir de array de objetos
}`,
        solution: `function buildCsv(rows) {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const lines = rows.map(r => headers.map(h => r[h]).join(','));
  return [headers.join(','), ...lines].join('\\n');
}`,
        tests: [
          { input: 'buildCsv([{id:1,name:"Elly"}])', expected: 'id,name\n1,Elly', desc: 'CSV de uma linha' },
          { input: 'buildCsv([{id:1,name:"Elly"},{id:2,name:"Bob"}])', expected: 'id,name\n1,Elly\n2,Bob', desc: 'duas linhas' },
          { input: 'buildCsv([])', expected: '', desc: 'array vazio' }
        ],
        hints: [
          'Pegue os headers de Object.keys da primeira linha.',
          'Mapeie cada linha pra uma string de valores separados por vírgula na ordem dos headers.',
          'Coloque a linha de header no início e junte tudo com "\\n".'
        ]
      },
      {
        level: 3,
        title: 'transformData',
        instructions: [
          'Escreva transformData(rows, mapping) que renomeia chaves em cada objeto de linha.',
          'mapping é {oldKey: newKey}. Chaves que não estão no mapping ficam como tão.',
          'transformData([{first:"Elly"}], {first:"name"}) → [{name:"Elly"}]'
        ],
        sampleCode: `function transformData(rows, mapping) {
  // TODO: renomear chaves de acordo com o mapping
}`,
        solution: `function transformData(rows, mapping) {
  return rows.map(row =>
    Object.entries(row).reduce((acc, [k, v]) => {
      acc[mapping[k] || k] = v;
      return acc;
    }, {})
  );
}`,
        tests: [
          { input: 'transformData([{first:"Elly"}],{first:"name"})', expected: [{name:"Elly"}], desc: 'renomeia chave' },
          { input: 'transformData([{id:1,first:"Elly"}],{first:"name"})', expected: [{id:1,name:"Elly"}], desc: 'chaves não mapeadas ficam' },
          { input: 'transformData([],{a:"b"})', expected: [], desc: 'array vazio' }
        ],
        hints: [
          'Faça map nas linhas.',
          'Pra cada linha, use Object.entries depois reduce.',
          'Use mapping[k] || k pra nova chave.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Check Final de I/O de Arquivos',
      steps: [
        {
          type: 'coding',
          title: 'csvToJsonl',
          instructions: 'Escreva csvToJsonl(csvString) que converte uma string CSV pro formato JSONL (JSON Lines) — um JSON.stringify por linha, juntados por nova linha.',
          sampleCode: `function csvToJsonl(csvString) {
  // TODO
}`,
          solution: `function csvToJsonl(csvString) {
  const lines = csvString.trim().split('\\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const obj = headers.reduce((acc, h, i) => { acc[h] = values[i]; return acc; }, {});
    return JSON.stringify(obj);
  }).join('\\n');
}`,
          tests: [
            { input: 'csvToJsonl("id,name\\n1,Elly\\n2,Bob")', expected: '{"id":"1","name":"Elly"}\n{"id":"2","name":"Bob"}', desc: 'converte pra JSONL' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Quando faz batch insert de 500 linhas CSV no Supabase, por que dividir em batches de ~50 em vez de uma chamada de insert só?',
          options: [
            { text: 'Supabase cobra por linha inserida', feedback: 'Supabase não cobra por linha em insert.' },
            { text: 'Pra evitar limites de tamanho de requisição, timeouts, e permitir recuperação de falha parcial', feedback: 'Isso! Inserts únicos grandes podem dar timeout e uma linha ruim derruba o batch todo.', correct: true },
            { text: 'Supabase não consegue inserir mais de 50 linhas de uma vez', feedback: 'Supabase suporta batch insert grande — batches menores só são mais seguros.' },
            { text: 'Batching é sempre mais lento', feedback: 'Batching é quase sempre mais rápido que 500 inserts individuais.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Me mostra como escrever um script Node.js que lê um arquivo CSV e faz bulk insert de linhas no Supabase usando o cliente JS, com tratamento de erro.',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) sobre backend. Use exemplos de Discord (servidores, bots), Roblox (sistema de login), Minecraft (multiplayer), Spotify (recomendações). Mostre como o que rola por trás dos apps que eles usam funciona. Seja direto, com humor leve.'
    },
    resources: [
      { title: 'Node.js: módulo fs', url: 'https://nodejs.org/api/fs.html' },
      { title: 'Supabase: Batch Insert', url: 'https://supabase.com/docs/reference/javascript/insert' }
    ]
  },
];
