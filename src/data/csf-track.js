// CS Fundamentals — 10 lições estilo ALPA
// Versão PT-BR para crianças e adolescentes (8-17 anos)
export const csfLessons = [
  // ─── csf-1 ──────────────────────────────────────────────────────────────────
  {
    id: 'csf-1-computational',
    title: 'Pensamento Computacional: Pensando Como um Computador',
    week: 0,
    xp: 50,
    difficulty: 'Beginner',
    priority: '⭐',
    hook: 'Antes de programar qualquer coisa, você precisa pensar como um computador — quebrar o problema, achar padrões, abstrair e transformar tudo em passos.',

    assess: {
      type: 'multipleChoice',
      question: 'Qual destas NÃO é um dos quatro pilares do pensamento computacional?',
      options: [
        { text: 'Decomposição', feedback: 'Decomposição (quebrar o problema em partes menores) é um dos pilares.' },
        { text: 'Reconhecimento de padrões', feedback: 'Reconhecimento de padrões é um pilar essencial.' },
        { text: 'Memorização', feedback: '✓ Acertou na mosca! Os quatro pilares são decomposição, padrões, abstração e algoritmos — memorização não está na lista.', correct: true },
        { text: 'Abstração', feedback: 'Abstração (ignorar detalhes que não importam) é um pilar.' }
      ]
    },

    learn: {
      hook: 'Todo problema que você já resolveu — passar uma fase difícil no Minecraft, descobrir por que o Wi-Fi tá ruim — começou quebrando o problema em pedaços menores. Pensamento computacional é só o nome técnico disso.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/0/',
        title: 'CS50 Semana 0: Scratch & Pensamento Computacional',
        duration: '1h 45min',
        yourTakeaway: 'Repara como o professor Brian quebra problemas em partes e escreve os passos em "português" antes de virar código.'
      },
      conceptText: `Pensamento computacional é o jeito de organizar um problema pra que um computador consiga resolver. Ele tem quatro pilares: **decomposição**, **reconhecimento de padrões**, **abstração** e **algoritmos**.\n\n**Decomposição** é quebrar um problema grande em problemas menores. Em vez de "criar um jogo tipo Minecraft", você decompõe em "gerar o mapa", "controlar o personagem", "calcular dano", "salvar o save".\n\n**Reconhecimento de padrões** é perceber quando um sub-problema parece com algo que você já resolveu. Se você já fez uma função que conta vidas no jogo, dá pra usar a mesma ideia pra contar moedas.\n\n**Abstração** é esconder a parte chata atrás de uma interface limpa. Quando você aperta o botão de pular no Fortnite, não precisa pensar em gravidade, física, animação — tudo isso tá escondido. Você só "pula".\n\n**Algoritmos** são os passos exatos que o computador segue. Pseudocódigo é a ponte entre a sua ideia e o código de verdade — escreve os passos em português primeiro, depois traduz.`,
      realWorldExample: 'Pensa no TikTok: o app precisa decidir qual vídeo te mostrar agora. Decomposição: "ver o que você curtiu", "ver quanto tempo você assistiu", "ver o que seus amigos curtiram". Padrão: "se gostou de um vídeo de gato, talvez goste de outro". Abstração: você só rola a tela, não vê o algoritmo gigante por trás. Algoritmo: a regra exata que escolhe o próximo vídeo.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Teste de Decomposição',
        question: 'Você quer criar um bot do Discord que dá boas-vindas pra novos membros. Qual é a melhor decomposição?',
        options: [
          { text: 'Escrever uma função gigante que faz tudo', feedback: 'Hmm, não é por aí — isso é o oposto de decomposição.' },
          { text: 'Separar em: detectar entrada → montar mensagem → enviar no canal → registrar', feedback: '✓ Mandou bem! Cada parte é pequena, testável e reaproveitável.', correct: true },
          { text: 'Esperar entender TODOS os casos antes de começar', feedback: 'Dá pra começar a decompor agora e ajustar conforme aparece.' },
          { text: 'Copiar código de outro bot sem mudar nada', feedback: 'Padrões ajudam, mas você ainda precisa decompor o seu problema.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Ordene os Passos pra Resolver um Problema',
        description: 'Coloca esses passos na ordem que um bom programador seguiria.',
        items: [
          'Escrever pseudocódigo de cada parte',
          'Entender e reescrever o problema com suas palavras',
          'Traduzir pseudocódigo pra código real',
          'Quebrar em problemas menores',
          'Testar com um exemplo pequeno'
        ],
        correctOrder: [1, 3, 0, 2, 4],
        feedback: 'Primeiro entende, depois quebra, planeja em pseudocódigo, codifica e por fim testa.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Lendo o Pseudocódigo',
        instructions: 'O que esse pseudocódigo produz quando n = 4?',
        code: `// pseudocódigo:
// pra cada i de 1 até n:
//   se i é par, mostra i ao quadrado
//   senão mostra i
function run(n) {
  const out = [];
  for (let i = 1; i <= n; i++) {
    out.push(i % 2 === 0 ? i * i : i);
  }
  return out;
}
console.log(run(4));`,
        question: 'O que aparece no console?',
        options: [
          { text: '[1, 2, 3, 4]', feedback: 'Os pares são elevados ao quadrado — não ficam iguais.' },
          { text: '[1, 4, 3, 16]', feedback: '✓ Isso aí! 1 fica, 2 vira 4, 3 fica, 4 vira 16.', correct: true },
          { text: '[1, 4, 9, 16]', feedback: 'Aí seriam TODOS ao quadrado — mas só os pares.' },
          { text: '[2, 4, 6, 8]', feedback: 'Padrão errado — relê a condição.' }
        ],
        feedback: 'Pseudocódigo é uma ferramenta de pensar — traduzir linha por linha mantém sua lógica honesta.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'isPrime',
        instructions: [
          'Escreva isPrime(n) que retorna true se n for um número primo, false caso contrário.',
          'Um primo é um inteiro positivo maior que 1 cujos únicos divisores são 1 e ele mesmo.',
          'Retorne false para n <= 1.'
        ],
        sampleCode: `function isPrime(n) {
  // TODO
}`,
        solution: `function isPrime(n) {
  if (n <= 1) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}`,
        tests: [
          { input: 'isPrime(7)', expected: true, desc: '7 é primo' },
          { input: 'isPrime(4)', expected: false, desc: '4 não é primo' },
          { input: 'isPrime(1)', expected: false, desc: '1 não é primo' },
          { input: 'isPrime(2)', expected: true, desc: '2 é primo' },
          { input: 'isPrime(17)', expected: true, desc: '17 é primo' }
        ],
        hints: [
          'Trate o caso n <= 1 primeiro.',
          'Use um loop de 2 até sqrt(n) — se algum i divide n direitinho, não é primo.',
          'Use i * i <= n no lugar de Math.sqrt — fica mais limpo.'
        ]
      },
      {
        level: 2,
        title: 'fizzBuzz',
        instructions: [
          'Escreva fizzBuzz(n) que retorna um array de strings dos números 1 até n.',
          'Múltiplos de 3 → "Fizz", múltiplos de 5 → "Buzz", múltiplos de ambos → "FizzBuzz", senão o número como string.'
        ],
        sampleCode: `function fizzBuzz(n) {
  // TODO
}`,
        solution: `function fizzBuzz(n) {
  const out = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) out.push('FizzBuzz');
    else if (i % 3 === 0) out.push('Fizz');
    else if (i % 5 === 0) out.push('Buzz');
    else out.push(String(i));
  }
  return out;
}`,
        tests: [
          { input: 'fizzBuzz(5)', expected: ['1','2','Fizz','4','Buzz'], desc: 'primeiros 5' },
          { input: 'fizzBuzz(15)', expected: ['1','2','Fizz','4','Buzz','Fizz','7','8','Fizz','Buzz','11','Fizz','13','14','FizzBuzz'], desc: 'inclui FizzBuzz no 15' },
          { input: 'fizzBuzz(1)', expected: ['1'], desc: 'um elemento só' }
        ],
        hints: [
          'Verifica o caso mais específico primeiro — múltiplos de 15 (tanto 3 quanto 5).',
          'Use String(i) ou i.toString() pra converter número em string.',
          'Pergunta clássica de entrevista — resolver limpo mostra que você sabe decompor.'
        ]
      },
      {
        level: 3,
        title: 'collatz',
        instructions: [
          'A sequência de Collatz: começa com n. Se n é par, divide por 2. Se n é ímpar, multiplica por 3 e soma 1. Repete até chegar em 1.',
          'Escreva collatz(n) que retorna o NÚMERO DE PASSOS até chegar em 1.',
          'collatz(1) → 0 (já tá em 1).'
        ],
        sampleCode: `function collatz(n) {
  // TODO
}`,
        solution: `function collatz(n) {
  let steps = 0;
  while (n !== 1) {
    n = n % 2 === 0 ? n / 2 : 3 * n + 1;
    steps++;
  }
  return steps;
}`,
        tests: [
          { input: 'collatz(6)', expected: 8, desc: '6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1' },
          { input: 'collatz(1)', expected: 0, desc: 'já tá em 1' },
          { input: 'collatz(27)', expected: 111, desc: '27 leva 111 passos' }
        ],
        hints: [
          'Use um while que roda até n virar 1.',
          'Dentro do loop, aplica a regra dependendo se n é par ou ímpar.',
          'Incrementa um contador a cada iteração.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Desafio Final: Pensamento Computacional',
      steps: [
        {
          type: 'coding',
          title: 'sumDigits',
          instructions: 'Escreva sumDigits(n) que retorna a soma dos dígitos de um inteiro positivo n. Exemplo: sumDigits(123) → 6.',
          sampleCode: `function sumDigits(n) {
  // TODO
}`,
          solution: `function sumDigits(n) {
  let sum = 0;
  while (n > 0) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }
  return sum;
}`,
          tests: [
            { input: 'sumDigits(123)', expected: 6, desc: '1 + 2 + 3 = 6' },
            { input: 'sumDigits(9)', expected: 9, desc: 'um dígito só' },
            { input: 'sumDigits(1000)', expected: 1, desc: 'com zeros' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Por que pseudocódigo é útil mesmo quando você já sabe programar?',
          options: [
            { text: 'Roda mais rápido que código real', feedback: 'Pseudocódigo não roda — é só uma ferramenta de planejamento.' },
            { text: 'Deixa você pensar na lógica sem se preocupar com sintaxe', feedback: '✓ Isso aí! Pseudocódigo separa "o que fazer" de "como escrever".', correct: true },
            { text: 'É obrigatório na maioria das empresas', feedback: 'Não é obrigatório — mas é um hábito poderoso.' },
            { text: 'Substitui os testes', feedback: 'Você ainda precisa testar.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Como eu aplicaria os quatro pilares do pensamento computacional pra criar um bot do Discord que organiza eventos do servidor?',
      systemPrompt: 'Você é um professor de programação brasileiro, descolado, que ensina crianças e adolescentes (8-17 anos) a programar. Use exemplos de jogos, redes sociais e apps que eles conhecem (Minecraft, Roblox, TikTok, Discord, Spotify, Instagram, Fortnite). Seja direto, com humor leve mas sem ser infantil. Explique conceitos técnicos com analogias do mundo deles. Conecte o conteúdo à lição que o aluno acabou de fazer.'
    },
    resources: [
      { title: 'CS50 Semana 0 — Scratch', url: 'https://cs50.harvard.edu/x/2024/weeks/0/' },
      { title: 'BBC: Introdução ao Pensamento Computacional', url: 'https://www.bbc.co.uk/bitesize/topics/z7tp34j' }
    ]
  },

  // ─── csf-2 ──────────────────────────────────────────────────────────────────
  {
    id: 'csf-2-binary',
    title: 'Binário & Como o Computador Guarda Tudo',
    week: 0,
    xp: 60,
    difficulty: 'Beginner',
    priority: '⭐',
    hook: 'Sabia que TUDO no seu celular — vídeos do TikTok, mensagens do Discord, skins do Fortnite — é só 1 e 0 no fundo? Bora descobrir como!',

    assess: {
      type: 'multipleChoice',
      question: 'Qual o valor decimal do número binário 1011?',
      options: [
        { text: '7', feedback: 'Perto — reconta as casas da direita pra esquerda.' },
        { text: '11', feedback: '✓ Mandou bem! 8 + 0 + 2 + 1 = 11.', correct: true },
        { text: '13', feedback: 'Você pode ter incluído alguma casa que é 0.' },
        { text: '1011', feedback: 'Esse é o próprio binário, não o valor decimal.' }
      ]
    },

    learn: {
      hook: 'Seu computador não guarda o número 42 como "42" — ele guarda como 101010. Entender isso explica por que 0.1 + 0.2 dá um resultado estranho e como skins, sons e imagens são só números.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/0/',
        title: 'CS50 Semana 0: Binário & Representação',
        duration: '20min',
        yourTakeaway: 'Repara como números, ASCII e Unicode todos viram bits no final.'
      },
      conceptText: `**Binário** é um sistema de numeração de base 2 que usa só 0 e 1. Cada dígito é um **bit**, e 8 bits formam um **byte**. É tipo o código Morse, mas só com dois símbolos.\n\nCada posição em um número binário vale uma potência de 2, da direita pra esquerda: 1, 2, 4, 8, 16, 32, 64, 128. Então o binário 1011 vale 8 + 0 + 2 + 1 = 11.\n\nPra converter decimal pra binário, divide por 2 várias vezes e lê os restos de baixo pra cima. Pra converter binário pra decimal, multiplica cada bit pelo valor da casa e soma.\n\nTexto também é guardado como número. O **ASCII** mapeia cada letra em inglês pra um número de 0 a 127 (a letra "A" é 65, ou 01000001 em binário). O **Unicode** estende isso pra todos os idiomas e emojis — UTF-8 é o formato mais comum. Por isso seu emoji de risada é só um número grande no fundo.\n\n**Operações bitwise** trabalham direto nos bits: AND (&), OR (|), XOR (^), NOT (~), e shifts (<<, >>). É como skins do Fortnite podem ser armazenadas com flags compactas.\n\nNúmeros decimais (tipo 0.1) nem sempre podem ser representados exatamente em binário — por isso 0.1 + 0.2 === 0.30000000000000004 no JavaScript. Esse é um dos bugs mais famosos da programação.`,
      realWorldExample: 'No Minecraft, cada bloco do mundo é guardado como um ID binário pequeno. Em vez de salvar "bloco de pedra" como texto, o jogo salva como uns poucos bits. Por isso um mundo gigante cabe em poucos megabytes — milhões de blocos comprimidos em 1 e 0.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Contando Bits',
        question: 'Quantos valores diferentes dá pra representar com 4 bits?',
        options: [
          { text: '4', feedback: 'Esse é o número de bits, não de valores.' },
          { text: '8', feedback: 'Isso seria 3 bits (2^3).' },
          { text: '16', feedback: '✓ Isso aí! 2^4 = 16, então valores de 0 a 15.', correct: true },
          { text: '32', feedback: 'Isso seria 5 bits.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Ordene os Passos da Conversão',
        description: 'Coloca esses passos na ordem certa pra converter o decimal 13 pra binário.',
        items: [
          'Dividir 1 por 2 → quociente 0, resto 1',
          'Dividir 13 por 2 → quociente 6, resto 1',
          'Ler os restos de baixo pra cima: 1101',
          'Dividir 6 por 2 → quociente 3, resto 0',
          'Dividir 3 por 2 → quociente 1, resto 1'
        ],
        correctOrder: [1, 3, 4, 0, 2],
        feedback: 'Divide por 2 várias vezes coletando os restos, depois lê de trás pra frente.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Trace a Operação Bitwise',
        instructions: 'O que esse código mostra?',
        code: `const a = 0b1100; // 12
const b = 0b1010; // 10
console.log(a & b);`,
        question: 'Qual o valor de a & b?',
        options: [
          { text: '22', feedback: 'Isso seria a + b — mas & é AND, não soma.' },
          { text: '8', feedback: '✓ Acertou na mosca! 1100 & 1010 = 1000 = 8.', correct: true },
          { text: '14', feedback: 'Isso seria a | b (OR).' },
          { text: '6', feedback: 'Isso seria a ^ b (XOR).' }
        ],
        feedback: 'AND retorna 1 só quando OS DOIS bits são 1. Aqui só a casa do 8 tem 1 nos dois números.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'decimalToBinary',
        instructions: [
          'Escreva decimalToBinary(n) que retorna a representação binária de n como string.',
          'decimalToBinary(10) → "1010"',
          'decimalToBinary(0) → "0"'
        ],
        sampleCode: `function decimalToBinary(n) {
  // TODO
}`,
        solution: `function decimalToBinary(n) {
  if (n === 0) return '0';
  let result = '';
  while (n > 0) {
    result = (n % 2) + result;
    n = Math.floor(n / 2);
  }
  return result;
}`,
        tests: [
          { input: 'decimalToBinary(10)', expected: '1010', desc: '10 em binário' },
          { input: 'decimalToBinary(0)', expected: '0', desc: 'caso especial: zero' },
          { input: 'decimalToBinary(255)', expected: '11111111', desc: '255 são 8 uns' }
        ],
        hints: [
          'Pega n % 2 várias vezes e cola no começo do resultado.',
          'Depois atualiza n = Math.floor(n / 2).',
          'Trata o caso n === 0 separado.'
        ]
      },
      {
        level: 2,
        title: 'binaryToDecimal',
        instructions: [
          'Escreva binaryToDecimal(s) que converte uma string binária de volta pra número decimal.',
          'binaryToDecimal("1010") → 10'
        ],
        sampleCode: `function binaryToDecimal(s) {
  // TODO
}`,
        solution: `function binaryToDecimal(s) {
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    result = result * 2 + Number(s[i]);
  }
  return result;
}`,
        tests: [
          { input: 'binaryToDecimal("1010")', expected: 10, desc: '1010 → 10' },
          { input: 'binaryToDecimal("0")', expected: 0, desc: 'zero' },
          { input: 'binaryToDecimal("11111111")', expected: 255, desc: 'oito uns → 255' }
        ],
        hints: [
          'Percorre a string da esquerda pra direita.',
          'A cada caractere, multiplica o acumulador por 2 e soma o bit atual.',
          'parseInt(s, 2) também funciona — mas escrever o loop ensina o algoritmo.'
        ]
      },
      {
        level: 3,
        title: 'countBits',
        instructions: [
          'Escreva countBits(n) que retorna quantos bits 1 tem a representação binária de n.',
          'countBits(7) → 3 (binário 111 tem três uns).'
        ],
        sampleCode: `function countBits(n) {
  // TODO
}`,
        solution: `function countBits(n) {
  let count = 0;
  while (n > 0) {
    count += n & 1;
    n = n >>> 1;
  }
  return count;
}`,
        tests: [
          { input: 'countBits(7)', expected: 3, desc: '111 tem 3 uns' },
          { input: 'countBits(0)', expected: 0, desc: 'zero não tem uns' },
          { input: 'countBits(255)', expected: 8, desc: '11111111 tem 8 uns' },
          { input: 'countBits(10)', expected: 2, desc: '1010 tem 2 uns' }
        ],
        hints: [
          'Verifica o bit mais baixo com n & 1.',
          'Faz shift à direita com n >>> 1 pra ir pro próximo bit.',
          'Mantém um contador.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Desafio Final: Binário',
      steps: [
        {
          type: 'coding',
          title: 'isPowerOfTwo',
          instructions: 'Escreva isPowerOfTwo(n) que retorna true se n é uma potência positiva de 2 (1, 2, 4, 8, ...). Dica: potência de 2 tem exatamente um bit 1.',
          sampleCode: `function isPowerOfTwo(n) {
  // TODO
}`,
          solution: `function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}`,
          tests: [
            { input: 'isPowerOfTwo(8)', expected: true, desc: '8 é potência de 2' },
            { input: 'isPowerOfTwo(10)', expected: false, desc: '10 não é potência de 2' },
            { input: 'isPowerOfTwo(1)', expected: true, desc: '1 = 2^0' },
            { input: 'isPowerOfTwo(0)', expected: false, desc: '0 não é potência de 2' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Por que `0.1 + 0.2` não dá `0.3` exato no JavaScript?',
          options: [
            { text: 'É um bug do JavaScript', feedback: 'Não — é uma característica de TODAS as linguagens que usam IEEE 754.' },
            { text: '0.1 não pode ser representado exatamente em binário', feedback: '✓ Mandou bem! Tipo 1/3 em decimal, 0.1 tem uma representação infinita em binário que precisa ser cortada.', correct: true },
            { text: 'Os números são muito pequenos', feedback: 'Eles tão bem dentro da precisão do JS.' },
            { text: 'JavaScript usa matemática de inteiros por padrão', feedback: 'JS usa floats de precisão dupla pra todos os números.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Como o Spotify guarda músicas e playlists usando bits? Tem alguma vantagem usar binário ao invés de texto?',
      systemPrompt: 'Você é um professor de programação brasileiro, descolado, que ensina crianças e adolescentes (8-17 anos) a programar. Use exemplos de jogos, redes sociais e apps que eles conhecem (Minecraft, Roblox, TikTok, Discord, Spotify, Instagram, Fortnite). Seja direto, com humor leve mas sem ser infantil. Explique conceitos técnicos com analogias do mundo deles. Conecte o conteúdo à lição que o aluno acabou de fazer.'
    },
    resources: [
      { title: 'CS50 Semana 0 — Binário', url: 'https://cs50.harvard.edu/x/2024/weeks/0/' },
      { title: 'MDN: Operadores Bitwise', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#bitwise_operators' }
    ]
  },

  // ─── csf-3 ──────────────────────────────────────────────────────────────────
  {
    id: 'csf-3-big-o',
    title: 'Big O: Por Que Seu Código Trava com Muita Coisa',
    week: 3,
    xp: 80,
    difficulty: 'Intermediate',
    priority: '⭐⭐⭐',
    hook: 'Quanto mais coisas, mais lento. Mas QUÃO mais lento? Big O responde — e te salva do dia em que seu código trava com 10 mil jogadores online.',

    assess: {
      type: 'multipleChoice',
      question: 'Qual a complexidade de tempo da busca binária em um array ordenado?',
      options: [
        { text: 'O(n)', feedback: 'Isso é busca linear. Binária é mais rápida.' },
        { text: 'O(log n)', feedback: '✓ Acertou na mosca! Cada passo corta o espaço de busca pela metade.', correct: true },
        { text: 'O(n log n)', feedback: 'Essa é a complexidade de ordenações eficientes tipo mergesort.' },
        { text: 'O(1)', feedback: 'Tempo constante seria busca instantânea — isso é hash map, não busca binária.' }
      ]
    },

    learn: {
      hook: 'Seu código "funciona aqui" com 10 itens. Trava feio com 10 mil. A diferença entre O(n) e O(n²) é a diferença entre um servidor de Minecraft que aguenta a galera e um que crasha no primeiro evento.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/3/',
        title: 'CS50 Semana 3: Algoritmos & Big O',
        duration: '1h 30min',
        yourTakeaway: 'Repara como loops aninhados crescem rápido e por que busca binária precisa de dados ordenados.'
      },
      conceptText: `**Big O** descreve como o tempo (ou memória) do seu algoritmo cresce conforme o tamanho da entrada n aumenta. É sobre escala, não velocidade absoluta.\n\nAs complexidades comuns, da mais rápida pra mais lenta:\n\n- **O(1) — constante**: mesmo tempo independente do tamanho. Buscar um valor em um hash map pela chave.\n- **O(log n) — logarítmica**: dobrar a entrada acrescenta só um passo. Busca binária.\n- **O(n) — linear**: tempo proporcional à entrada. Percorrer um array uma vez.\n- **O(n log n) — quase linear**: ordenações eficientes (mergesort, heapsort, Array.sort do JS).\n- **O(n²) — quadrática**: loops aninhados no mesmo dado. Detecção de duplicatas ingênua.\n- **O(2^n) — exponencial**: cada item adicional dobra o trabalho. Fibonacci recursivo ingênuo.\n\nNo JavaScript, **\`arr.includes(x)\`** é O(n) — varre o array todo. **\`set.has(x)\`** é O(1) na média — Set usa hash table. Essa troca pode transformar um loop O(n²) em O(n).\n\n**Complexidade de espaço** mede memória, não tempo. Um algoritmo pode ser rápido mas comer memória, ou lento mas pequeno.\n\nAo analisar seu próprio código, procura por **loops aninhados nos mesmos dados** (geralmente O(n²)), **\`includes\` dentro de loop** (O(n²) escondido), e **chamadas recursivas sem memoização** (geralmente exponencial).\n\nO objetivo não é se obcecar com constantes — é detectar o **ritmo de crescimento** antes que sua entrada cresça.\n\nUm exemplo clássico: verificar se dois posts têm o mesmo título. A abordagem ingênua com loops aninhados é O(n²). Colocar os títulos num Set e checar com \`.has()\` é O(n) — com 10 mil posts, isso é a diferença entre 100 milhões de operações e 10 mil.\n\nPensa no Discord: milhões de mensagens chegando ao mesmo tempo. Se cada nova mensagem fizesse uma varredura O(n²) pra detectar spam, o servidor travaria. Com hash tables, fica O(n) e aguenta.`,
      realWorldExample: 'Imagina o feed do TikTok: tem 1 bilhão de vídeos. Se ele percorresse TODOS pra descobrir qual te mostrar, você esperaria horas. Em vez disso, usa estruturas que dão O(log n) ou O(1) por consulta. Por isso o feed carrega em milissegundos, mesmo com bilhões de vídeos.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Detecta a Complexidade',
        question: 'Qual a complexidade desse código?\n\n```js\nfor (let i = 0; i < arr.length; i++) {\n  for (let j = 0; j < arr.length; j++) {\n    if (arr[i] === arr[j]) count++;\n  }\n}\n```',
        options: [
          { text: 'O(1)', feedback: 'Otimista demais — tem loops.' },
          { text: 'O(n)', feedback: 'Aparece só um loop — mas são dois aninhados.' },
          { text: 'O(n²)', feedback: '✓ Isso aí! Dois loops aninhados no mesmo array — n × n.', correct: true },
          { text: 'O(log n)', feedback: 'Logarítmica precisa de divisão por 2 — nenhum loop faz isso.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Ordene da Mais Rápida à Mais Lenta',
        description: 'Coloca essas complexidades da mais rápida (melhor) à mais lenta (pior).',
        items: [
          'O(n²)',
          'O(1)',
          'O(n log n)',
          'O(log n)',
          'O(n)'
        ],
        correctOrder: [1, 3, 4, 2, 0],
        feedback: 'Constante → logarítmica → linear → quase linear → quadrática. Memoriza essa ordem.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'O(n²) Escondido',
        instructions: 'Qual a complexidade dessa função?',
        code: `function hasDuplicate(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr.slice(i + 1).includes(arr[i])) return true;
  }
  return false;
}
console.log(hasDuplicate([1, 2, 3, 2]));`,
        question: 'Qual a complexidade?',
        options: [
          { text: 'O(n)', feedback: 'Parece só um loop — mas slice e includes também iteram.' },
          { text: 'O(n log n)', feedback: 'Não tem passo logarítmico aqui.' },
          { text: 'O(n²)', feedback: '✓ Mandou bem! O loop externo é n, e slice + includes são O(n) cada — total O(n²).', correct: true },
          { text: 'O(1)', feedback: 'Definitivamente não é constante.' }
        ],
        feedback: 'Complexidade escondida em includes/indexOf/find dentro de loop é um dos bugs de performance mais comuns no JS.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'linearSearch',
        instructions: [
          'Escreva linearSearch(arr, target) que retorna o índice de target em arr, ou -1 se não encontrar.',
          'Esse é o O(n) básico — varredura simples da esquerda pra direita.'
        ],
        sampleCode: `function linearSearch(arr, target) {
  // TODO
}`,
        solution: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
        tests: [
          { input: 'linearSearch([5,2,8], 8)', expected: 2, desc: 'acha 8 no índice 2' },
          { input: 'linearSearch([1,2,3], 99)', expected: -1, desc: 'não achou retorna -1' },
          { input: 'linearSearch([], 5)', expected: -1, desc: 'array vazio' },
          { input: 'linearSearch([7], 7)', expected: 0, desc: 'um elemento que bate' }
        ],
        hints: [
          'Um único for é tudo que precisa.',
          'Retorne o índice na hora que achar.',
          'Retorne -1 depois do loop se não achou nada.'
        ]
      },
      {
        level: 2,
        title: 'binarySearch',
        instructions: [
          'Escreva binarySearch(arr, target) que retorna o índice de target em um array ORDENADO, ou -1 se não encontrar.',
          'Use o algoritmo O(log n): mantenha ponteiros low e high, verifica o meio, vai estreitando.'
        ],
        sampleCode: `function binarySearch(arr, target) {
  // TODO
}`,
        solution: `function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
        tests: [
          { input: 'binarySearch([1,2,5,8,9], 5)', expected: 2, desc: 'acha 5 no índice 2' },
          { input: 'binarySearch([1,2,5,8,9], 9)', expected: 4, desc: 'acha o último' },
          { input: 'binarySearch([1,2,5,8,9], 7)', expected: -1, desc: 'não achou' },
          { input: 'binarySearch([], 5)', expected: -1, desc: 'array vazio' }
        ],
        hints: [
          'Rastreia low e high definindo a janela atual.',
          'Calcula mid como Math.floor((low + high) / 2).',
          'Se arr[mid] for pequeno demais, sobe low; se grande demais, desce high.'
        ]
      },
      {
        level: 3,
        title: 'findDuplicate',
        instructions: [
          'Escreva findDuplicate(posts) que retorna true se dois posts quaisquer têm o mesmo título.',
          'posts é um array de objetos tipo { title: "..." }.',
          'IMPORTANTE: use um Set pra ter O(n) — não loops aninhados.'
        ],
        sampleCode: `function findDuplicate(posts) {
  // TODO: use um Set pra O(n)
}`,
        solution: `function findDuplicate(posts) {
  const seen = new Set();
  for (const post of posts) {
    if (seen.has(post.title)) return true;
    seen.add(post.title);
  }
  return false;
}`,
        tests: [
          { input: 'findDuplicate([{title:"A"},{title:"A"}])', expected: true, desc: 'detecta duplicata' },
          { input: 'findDuplicate([{title:"A"},{title:"B"},{title:"C"}])', expected: false, desc: 'todos únicos' },
          { input: 'findDuplicate([])', expected: false, desc: 'array vazio' },
          { input: 'findDuplicate([{title:"X"}])', expected: false, desc: 'um post só' }
        ],
        hints: [
          'Cria um Set vazio antes do loop.',
          'Pra cada post, verifica se o título já tá no Set — se sim, retorna true.',
          'Senão adiciona. Set.has() e Set.add() são O(1) na média.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Desafio Final: Big O',
      steps: [
        {
          type: 'coding',
          title: 'intersect',
          instructions: 'Escreva intersect(a, b) que retorna um array de valores presentes em AMBOS a e b (sem duplicatas no resultado). Use um Set pra ter O(n + m) em vez de loops aninhados.',
          sampleCode: `function intersect(a, b) {
  // TODO: O(n + m) usando Set
}`,
          solution: `function intersect(a, b) {
  const setA = new Set(a);
  const result = new Set();
  for (const x of b) {
    if (setA.has(x)) result.add(x);
  }
  return Array.from(result);
}`,
          tests: [
            { input: 'intersect([1,2,3], [2,3,4])', expected: [2,3], desc: 'valores em comum' },
            { input: 'intersect([1,2], [3,4])', expected: [], desc: 'sem sobreposição' },
            { input: 'intersect([1,1,2], [1,2,2])', expected: [1,2], desc: 'sem duplicatas no resultado' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Você vê `arr.includes(x)` dentro de um `for` que percorre o mesmo `arr`. Qual a complexidade e como conserta?',
          options: [
            { text: 'O(n), sem precisar consertar', feedback: 'É O(n²) escondido — includes varre o array a cada chamada.' },
            { text: 'O(n²) — converte arr pra Set e usa set.has(x) pra ter O(n) total', feedback: '✓ Isso aí! Lookups de Set são O(1) na média, derrubando o total pra O(n).', correct: true },
            { text: 'O(log n) — já tá ótimo', feedback: 'includes é linear, não logarítmica.' },
            { text: 'O(1) — o JavaScript otimiza isso', feedback: 'Nenhuma engine otimiza esse padrão.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Meu servidor de Minecraft tá lento quando tem 50 jogadores online. Como sei se é problema de Big O do meu código ou outra coisa?',
      systemPrompt: 'Você é um professor de programação brasileiro, descolado, que ensina crianças e adolescentes (8-17 anos) a programar. Use exemplos de jogos, redes sociais e apps que eles conhecem (Minecraft, Roblox, TikTok, Discord, Spotify, Instagram, Fortnite). Seja direto, com humor leve mas sem ser infantil. Explique conceitos técnicos com analogias do mundo deles. Conecte o conteúdo à lição que o aluno acabou de fazer.'
    },
    resources: [
      { title: 'CS50 Semana 3 — Algoritmos', url: 'https://cs50.harvard.edu/x/2024/weeks/3/' },
      { title: 'Big-O Cheat Sheet', url: 'https://www.bigocheatsheet.com/' }
    ]
  },

  // ─── csf-4 ──────────────────────────────────────────────────────────────────
  {
    id: 'csf-4-searching',
    title: 'Algoritmos de Busca: Achando Coisas Rápido',
    week: 3,
    xp: 70,
    difficulty: 'Intermediate',
    priority: '⭐⭐',
    hook: 'Procurar o nome de um amigo na lista do Discord um por um (linear) ou abrir no meio e ir cortando metade (binária). Qual escolher? Depende.',

    assess: {
      type: 'multipleChoice',
      question: 'Qual algoritmo de busca exige que a entrada esteja ordenada?',
      options: [
        { text: 'Busca linear', feedback: 'Linear funciona em qualquer ordem.' },
        { text: 'Busca binária', feedback: '✓ Acertou! Binária divide o intervalo no meio, e isso só funciona se os dados tão ordenados.', correct: true },
        { text: 'Busca por hash', feedback: 'Hash usa chave, não ordem.' },
        { text: 'Nenhuma exige ordenação', feedback: 'Binária exige sim.' }
      ]
    },

    learn: {
      hook: 'Achar um valor em um array parece simples — até você ter 1 milhão de linhas. Escolher a estratégia certa de busca é a diferença entre o app voar e travar.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/3/',
        title: 'CS50 Semana 3: Busca',
        duration: '30min',
        yourTakeaway: 'Repara como cada busca troca pré-condições (ordenado? hash?) por velocidade.'
      },
      conceptText: `Busca é o problema de achar um valor em uma coleção. Três estratégias comuns:\n\n**Busca linear** varre cada elemento até achar o alvo ou chegar no fim. Tempo O(n), espaço O(1). Funciona em qualquer entrada, ordenada ou não. Use quando os dados são pequenos ou não tão ordenados.\n\n**Busca binária** divide repetidamente um intervalo ordenado pela metade. Tempo O(log n), espaço O(1). Exige entrada ordenada. É tipo procurar palavra no dicionário: você abre no meio, vê se sua palavra vem antes ou depois, e corta metade fora.\n\n**Busca por hash** usa um hash map ou Set. Tempo O(1) na média, espaço O(n) (pro mapa). Use quando você precisa de muitas consultas e tem memória disponível. É como o WhatsApp acha sua conversa quando você digita o nome do amigo — instantâneo.\n\nNo JavaScript:\n- **\`Array.prototype.find\`** e **\`indexOf\`** são lineares.\n- **\`Set.prototype.has\`** e **\`Map.prototype.get\`** são O(1) na média.\n- Não tem busca binária embutida no JS — você implementa quando precisa.\n\nProblemas reais de busca geralmente envolvem mais do que "existe?" — você pode precisar da **primeira ocorrência**, da **última**, de **todas**, ou de um **par** de elementos com alguma condição. O problema Two Sum (achar dois índices cujos valores somam um alvo) é clássico: O(n²) com loops aninhados, O(n) com hash map.`,
      realWorldExample: 'Quando o Discord precisa achar uma mensagem específica, ele usa índice no banco (que por baixo é busca binária em árvore). Mas se você já carregou 500 mensagens no app e quer filtrar por usuário, construir um Map de uma vez é mais rápido que chamar .find() várias vezes.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Escolha a Busca Certa',
        question: 'Você tem um array desordenado de 100.000 nomes e precisa checar se um nome existe, UMA VEZ SÓ. Qual a melhor?',
        options: [
          { text: 'Ordenar o array, depois busca binária', feedback: 'Ordenar custa O(n log n) — bem mais que uma varredura linear simples.' },
          { text: 'Busca linear', feedback: '✓ Mandou bem! Pra uma única consulta em dados desordenados, linear é ótimo — ordenar custaria mais que a busca economiza.', correct: true },
          { text: 'Construir um Set, depois checar', feedback: 'Pra uma consulta só, construir o Set também custa O(n) — sem vantagem.' },
          { text: 'Binária direto', feedback: 'Binária exige dados ordenados.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Monte o Two Sum com Hash Map',
        description: 'Coloca esses passos pra resolver Two Sum em O(n) com hash map.',
        items: [
          'Retorne [seenIndex, i]',
          'Inicialize um Map vazio chamado seen',
          'Se o complemento tá em seen, pega o índice',
          'Pra cada i, calcula complement = target - nums[i]',
          'Senão, adiciona nums[i] → i no seen'
        ],
        correctOrder: [1, 3, 2, 0, 4],
        feedback: 'Inicia o mapa, faz loop, calcula complemento, checa no mapa, retorna se achou, senão registra o atual.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Map vs. find',
        instructions: 'Você vai consultar usuários por ID 10.000 vezes. Qual abordagem é melhor?',
        code: `// opção A:
const user = users.find(u => u.id === targetId);
// opção B:
const userMap = new Map(users.map(u => [u.id, u]));
const user = userMap.get(targetId);`,
        question: 'Qual é melhor pra 10.000 consultas em um array de 5.000 usuários?',
        options: [
          { text: 'Opção A — mais simples', feedback: 'Simples, mas 10.000 × O(5.000) = 50 milhões de operações.' },
          { text: 'Opção B — O(n) pra construir, O(1) por consulta', feedback: '✓ Acertou! 5.000 pra construir + 10.000 consultas O(1) = 15.000 ops no total.', correct: true },
          { text: 'Os dois são iguais', feedback: 'Não — opção B é dramaticamente mais rápida nessa escala.' },
          { text: 'Opção A — Map tem overhead', feedback: 'O overhead é minúsculo comparado a varrer milhares de vezes.' }
        ],
        feedback: 'O padrão "constrói um mapa de lookup uma vez" é uma das otimizações de maior retorno que dá pra aplicar.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'countOccurrences',
        instructions: [
          'Escreva countOccurrences(arr, val) que retorna quantas vezes val aparece em arr.',
          'countOccurrences([1,2,2,3], 2) → 2'
        ],
        sampleCode: `function countOccurrences(arr, val) {
  // TODO
}`,
        solution: `function countOccurrences(arr, val) {
  let count = 0;
  for (const x of arr) {
    if (x === val) count++;
  }
  return count;
}`,
        tests: [
          { input: 'countOccurrences([1,2,2,3], 2)', expected: 2, desc: 'dois 2s' },
          { input: 'countOccurrences([1,2,3], 4)', expected: 0, desc: 'não tem' },
          { input: 'countOccurrences([], 1)', expected: 0, desc: 'array vazio' },
          { input: 'countOccurrences(["a","b","a","a"], "a")', expected: 3, desc: 'com strings' }
        ],
        hints: [
          'Faz loop e incrementa um contador a cada match.',
          'arr.filter(x => x === val).length também funciona.',
          'reduce é outra opção: arr.reduce((acc, x) => x === val ? acc+1 : acc, 0).'
        ]
      },
      {
        level: 2,
        title: 'findFirstLast',
        instructions: [
          'Escreva findFirstLast(arr, target) que retorna [firstIndex, lastIndex] de target em arr.',
          'Se não achou, retorna [-1, -1].',
          'findFirstLast([1,2,2,3], 2) → [1, 2]'
        ],
        sampleCode: `function findFirstLast(arr, target) {
  // TODO
}`,
        solution: `function findFirstLast(arr, target) {
  let first = -1;
  let last = -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      if (first === -1) first = i;
      last = i;
    }
  }
  return [first, last];
}`,
        tests: [
          { input: 'findFirstLast([1,2,2,3], 2)', expected: [1,2], desc: 'primeiro e último 2' },
          { input: 'findFirstLast([1,2,3], 99)', expected: [-1,-1], desc: 'não achou' },
          { input: 'findFirstLast([5,5,5], 5)', expected: [0,2], desc: 'todos batem' }
        ],
        hints: [
          'Uma passada só — rastreia first (define uma vez) e last (atualiza a cada match).',
          'Se first ainda é -1 no fim, você nunca viu o alvo.',
          'Retorna os dois índices em um array.'
        ]
      },
      {
        level: 3,
        title: 'twoSum',
        instructions: [
          'Escreva twoSum(nums, target) que retorna [i, j] onde nums[i] + nums[j] === target e i < j.',
          'Use hash map pra ter O(n) — não loops aninhados.',
          'Assume que existe exatamente uma solução.'
        ],
        sampleCode: `function twoSum(nums, target) {
  // TODO: O(n) com Map
}`,
        solution: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i);
  }
  return [-1, -1];
}`,
        tests: [
          { input: 'twoSum([2,7,11,15], 9)', expected: [0,1], desc: 'primeiro par que soma 9' },
          { input: 'twoSum([3,2,4], 6)', expected: [1,2], desc: 'par em 1,2' },
          { input: 'twoSum([3,3], 6)', expected: [0,1], desc: 'duplicatas permitidas' }
        ],
        hints: [
          'Pra cada número, o complemento é target - nums[i].',
          'Antes de adicionar no mapa, verifica se o complemento já tá lá.',
          'Se achou, retorna o índice salvo e o atual.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Desafio Final: Busca',
      steps: [
        {
          type: 'coding',
          title: 'firstNotIn',
          instructions: 'Escreva firstNotIn(arr, blocked) que retorna o primeiro elemento de arr que NÃO tá no array blocked. Use Set pra ter O(n + m).',
          sampleCode: `function firstNotIn(arr, blocked) {
  // TODO
}`,
          solution: `function firstNotIn(arr, blocked) {
  const set = new Set(blocked);
  for (const x of arr) {
    if (!set.has(x)) return x;
  }
  return null;
}`,
          tests: [
            { input: 'firstNotIn([1,2,3,4], [1,2])', expected: 3, desc: 'primeiro não bloqueado' },
            { input: 'firstNotIn([1,2], [1,2])', expected: null, desc: 'todos bloqueados' },
            { input: 'firstNotIn(["a","b","c"], ["b"])', expected: 'a', desc: 'com strings' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Quando converter "busca dentro de loop" pra lookup em hash map NÃO compensa?',
          options: [
            { text: 'Quando o array é minúsculo ou o lookup acontece uma vez só', feedback: '✓ Isso aí! Pra entradas pequenas ou consulta única, o custo de construir o mapa supera a economia.', correct: true },
            { text: 'Nunca — hash sempre é melhor', feedback: 'Tem overhead — pra trabalho minúsculo ou pontual, linear tá ótimo.' },
            { text: 'Só quando as chaves são strings', feedback: 'Strings e outros primitivos funcionam como chave de Map.' },
            { text: 'Quando o array tá ordenado', feedback: 'Arrays ordenados favorecem binária, mas hash ainda compensa pra muitas consultas.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Quando eu deveria buscar no servidor (tipo no banco do Roblox) vs. baixar um lote e buscar no cliente (no próprio jogo)?',
      systemPrompt: 'Você é um professor de programação brasileiro, descolado, que ensina crianças e adolescentes (8-17 anos) a programar. Use exemplos de jogos, redes sociais e apps que eles conhecem (Minecraft, Roblox, TikTok, Discord, Spotify, Instagram, Fortnite). Seja direto, com humor leve mas sem ser infantil. Explique conceitos técnicos com analogias do mundo deles. Conecte o conteúdo à lição que o aluno acabou de fazer.'
    },
    resources: [
      { title: 'CS50 Semana 3 — Busca', url: 'https://cs50.harvard.edu/x/2024/weeks/3/' },
      { title: 'MDN: Map vs Object', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map' }
    ]
  },

  // ─── csf-5 ──────────────────────────────────────────────────────────────────
  {
    id: 'csf-5-recursion',
    title: 'Recursão: Função Que Se Chama Sozinha',
    week: 3,
    xp: 90,
    difficulty: 'Intermediate',
    priority: '⭐⭐⭐',
    hook: 'Função que se chama de novo dentro dela mesma. Tipo abrir uma pasta dentro de outra pasta dentro de outra... Parece magia, mas quando cai a ficha, tudo fica fácil.',

    assess: {
      type: 'multipleChoice',
      question: 'Quais são as duas partes essenciais de toda função recursiva correta?',
      options: [
        { text: 'Um loop e um contador', feedback: 'Isso descreve iteração, não recursão.' },
        { text: 'Um caso base e um caso recursivo que se aproxima do caso base', feedback: '✓ Mandou bem! Sem caso base você tem recursão infinita; sem progresso, também.', correct: true },
        { text: 'Um return e um console.log', feedback: 'Log não é necessário pra recursão.' },
        { text: 'Um try/catch', feedback: 'Tratamento de erro é opcional.' }
      ]
    },

    learn: {
      hook: 'Uma função que se chama parece insano — mas todo problema recursivo tem o mesmo formato: resolve um caso minúsculo direto, depois confia na recursão pra cuidar do resto.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/3/',
        title: 'CS50 Semana 3: Recursão',
        duration: '40min',
        yourTakeaway: 'Repara como o professor desenha a call stack — visualizar é o segredo pra "sacar" recursão.'
      },
      conceptText: `**Recursão** é quando uma função se chama com uma versão menor do mesmo problema. Toda função recursiva correta tem duas partes:\n\n1. **Caso base**: a menor versão do problema que você resolve direto, sem chamar recursivo.\n2. **Caso recursivo**: você quebra o problema em um sub-problema menor e chama a função nele, depois combina o resultado.\n\nExemplo clássico — fatorial:\n\n\`\`\`js\nfunction factorial(n) {\n  if (n <= 1) return 1;        // caso base\n  return n * factorial(n - 1); // caso recursivo\n}\n\`\`\`\n\nA **call stack** é o modelo mental que faz a recursão clicar. Cada chamada empilha uma nova caixinha com suas variáveis locais. Quando uma chamada retorna, sua caixinha sai da pilha e o resultado volta pra quem chamou. \`factorial(4)\` empilha 4 caixinhas, depois desempilha: \`1 → 2 → 6 → 24\`.\n\nOnde recursão **brilha**: qualquer problema com estrutura aninhada, em árvore, ou auto-similar. Andar pelo DOM, achatar arrays aninhados, parsear JSON, percorrer pastas, calcular combinações, explorar caminhos num grafo — todos naturalmente recursivos.\n\nA pasta de Downloads tem subpastas, que têm mais subpastas. Toda hierarquia que se repete pede recursão.\n\nOnde recursão **falha**: pilhas muito profundas (JS geralmente explode em 10.000–30.000 chamadas), sub-problemas caros repetidos (Fibonacci ingênuo recomputa exponencialmente), e problemas com solução iterativa fácil.\n\n**Dois superpoderes**:\n- **Confiança**: assume que a chamada recursiva funciona pra uma entrada menor, depois escreve o que fazer com o resultado dela.\n- **Memoização**: guarda resultados por argumento pra cada sub-problema ser computado uma vez — transforma Fibonacci exponencial em linear.\n\nQuando ler código recursivo, percorre com a mão numa entrada pequena. Desenha a árvore de chamadas. Faz isso três ou quatro vezes pra problemas diferentes e o padrão vira natural.\n\nNo mundo real, recursão aparece em: renderizar comentários aninhados (resposta de resposta de resposta), achatar blocos do Notion, andar por pastas, mesclar configs profundamente aninhadas.`,
      realWorldExample: 'No Discord, quando alguém responde uma mensagem que era uma resposta de outra que era resposta de outra, a interface usa recursão pra desenhar essa cadeia. Uma função renderReply chama ela mesma pra cada resposta filha — não importa quantos níveis, o código se adapta.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Ache o Caso Base',
        question: 'Qual o caso base dessa função?\n\n```js\nfunction sum(arr) {\n  if (arr.length === 0) return 0;\n  return arr[0] + sum(arr.slice(1));\n}\n```',
        options: [
          { text: 'arr[0] + sum(arr.slice(1))', feedback: 'Esse é o caso recursivo.' },
          { text: 'arr.length === 0 retorna 0', feedback: '✓ Isso aí! Quando o array tá vazio, retornamos 0 sem chamar recursivo.', correct: true },
          { text: 'sum(arr.slice(1))', feedback: 'Parte do caso recursivo, não do caso base.' },
          { text: 'Não tem caso base', feedback: 'Tem sim — o if.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Ordene a Call Stack',
        description: 'Pra factorial(3), coloca esses eventos na ordem que acontecem.',
        items: [
          'factorial(0) retorna 1 → desempilha',
          'factorial(3) é chamada',
          'factorial(2) é chamada',
          'factorial(1) é chamada',
          'Resultado final 6 retorna pra quem chamou'
        ],
        correctOrder: [1, 2, 3, 0, 4],
        feedback: 'Chamadas empilham: 3 → 2 → 1 → 0. Depois a pilha desempilha: 1 → 1 → 2 → 6.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Trace a Recursão',
        instructions: 'O que isso mostra?',
        code: `function count(n) {
  if (n <= 0) return 0;
  return 1 + count(n - 2);
}
console.log(count(7));`,
        question: 'O que aparece?',
        options: [
          { text: '3', feedback: 'Quase — count(7)→count(5)→count(3)→count(1)→count(-1)=0. São 4 returns somando 1.' },
          { text: '4', feedback: '✓ Acertou! 7, 5, 3, 1 cada um soma 1; -1 bate no caso base e retorna 0. Total 4.', correct: true },
          { text: '7', feedback: 'Não é o valor de n — conta quantos passos recursivos somam 1.' },
          { text: '0', feedback: 'Só o caso base retorna 0 — mas cada chamada recursiva soma 1.' }
        ],
        feedback: 'O truque: traça as chamadas até bater no caso base, depois conta os returns somando 1 na volta.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'factorial',
        instructions: [
          'Escreva factorial(n) recursivamente.',
          'factorial(0) === 1, factorial(n) === n * factorial(n-1) pra n > 0.',
          'NÃO use loop.'
        ],
        sampleCode: `function factorial(n) {
  // TODO: recursivo
}`,
        solution: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`,
        tests: [
          { input: 'factorial(5)', expected: 120, desc: '5! = 120' },
          { input: 'factorial(0)', expected: 1, desc: '0! = 1' },
          { input: 'factorial(1)', expected: 1, desc: '1! = 1' },
          { input: 'factorial(6)', expected: 720, desc: '6! = 720' }
        ],
        hints: [
          'Caso base: se n <= 1, retorna 1.',
          'Caso recursivo: retorna n * factorial(n - 1).',
          'Confia na recursão — assume que factorial(n-1) já dá o resultado certo.'
        ]
      },
      {
        level: 2,
        title: 'fibonacci',
        instructions: [
          'Escreva fibonacci(n) recursivamente.',
          'fibonacci(0) = 0, fibonacci(1) = 1, fibonacci(n) = fibonacci(n-1) + fibonacci(n-2).',
          'Pra esse exercício, a versão recursiva simples tá ok (sem memoização).'
        ],
        sampleCode: `function fibonacci(n) {
  // TODO
}`,
        solution: `function fibonacci(n) {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
        tests: [
          { input: 'fibonacci(0)', expected: 0, desc: 'fib(0) = 0' },
          { input: 'fibonacci(1)', expected: 1, desc: 'fib(1) = 1' },
          { input: 'fibonacci(7)', expected: 13, desc: 'fib(7) = 13' },
          { input: 'fibonacci(10)', expected: 55, desc: 'fib(10) = 55' }
        ],
        hints: [
          'Dois casos base: n === 0 → 0, n === 1 → 1.',
          'Recursivo: retorna fibonacci(n-1) + fibonacci(n-2).',
          'Essa versão ingênua é O(2^n) — funciona pra n pequeno; depois otimizamos com memoização.'
        ]
      },
      {
        level: 3,
        title: 'flattenArray',
        instructions: [
          'Escreva flattenArray(arr) que retorna um array totalmente achatado, não importa quão aninhado.',
          'flattenArray([1, [2, [3]], 4]) → [1, 2, 3, 4]',
          'Use recursão — NÃO use Array.prototype.flat(Infinity).'
        ],
        sampleCode: `function flattenArray(arr) {
  // TODO: recursivo
}`,
        solution: `function flattenArray(arr) {
  const result = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flattenArray(item));
    } else {
      result.push(item);
    }
  }
  return result;
}`,
        tests: [
          { input: 'flattenArray([1,[2,[3]],4])', expected: [1,2,3,4], desc: 'aninhado profundo' },
          { input: 'flattenArray([1,2,3])', expected: [1,2,3], desc: 'já tá flat' },
          { input: 'flattenArray([])', expected: [], desc: 'array vazio' },
          { input: 'flattenArray([[1,2],[3,[4,[5]]]])', expected: [1,2,3,4,5], desc: 'aninhamento misto' }
        ],
        hints: [
          'Percorre cada item.',
          'Se o item for array, achata recursivamente e espalha no resultado.',
          'Senão, só dá push.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Desafio Final: Recursão',
      steps: [
        {
          type: 'coding',
          title: 'power',
          instructions: 'Escreva power(base, exp) recursivamente. power(2, 4) → 16. Assume que exp é um inteiro não-negativo.',
          sampleCode: `function power(base, exp) {
  // TODO: recursivo
}`,
          solution: `function power(base, exp) {
  if (exp === 0) return 1;
  return base * power(base, exp - 1);
}`,
          tests: [
            { input: 'power(2, 4)', expected: 16, desc: '2^4 = 16' },
            { input: 'power(5, 0)', expected: 1, desc: 'qualquer^0 = 1' },
            { input: 'power(3, 3)', expected: 27, desc: '3^3 = 27' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Por que Fibonacci recursivo ingênuo fica tão lento pra n grande?',
          options: [
            { text: 'Usa memória demais', feedback: 'Memória é secundário — o problema maior é velocidade.' },
            { text: 'Recomputa os mesmos sub-problemas exponencialmente', feedback: '✓ Isso aí! fib(50) calcula fib(48) duas vezes, fib(47) três vezes, e por aí vai. Memoização resolve.', correct: true },
            { text: 'JavaScript não suporta recursão', feedback: 'JS suporta recursão tranquilo.' },
            { text: 'O caso base tá errado', feedback: 'Caso base tá certo — o problema é o trabalho repetido.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Como usar recursão pra desenhar uma thread de respostas no Discord (resposta de resposta de resposta) numa página React?',
      systemPrompt: 'Você é um professor de programação brasileiro, descolado, que ensina crianças e adolescentes (8-17 anos) a programar. Use exemplos de jogos, redes sociais e apps que eles conhecem (Minecraft, Roblox, TikTok, Discord, Spotify, Instagram, Fortnite). Seja direto, com humor leve mas sem ser infantil. Explique conceitos técnicos com analogias do mundo deles. Conecte o conteúdo à lição que o aluno acabou de fazer.'
    },
    resources: [
      { title: 'CS50 Semana 3 — Recursão', url: 'https://cs50.harvard.edu/x/2024/weeks/3/' },
      { title: 'MDN: Recursão', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Recursion' }
    ]
  },

  // ─── csf-6 ──────────────────────────────────────────────────────────────────
  {
    id: 'csf-6-sorting',
    title: 'Ordenação: Do Mais Lento ao Mais Esperto',
    week: 3,
    xp: 90,
    difficulty: 'Intermediate',
    priority: '⭐⭐⭐',
    hook: 'Como o Spotify descobre quais músicas estão no topo? Como o YouTube ordena os trending? Ordenação! E entender o porquê é a base de toda conversa sobre "deixar mais rápido".',

    assess: {
      type: 'multipleChoice',
      question: 'Qual a complexidade média do merge sort?',
      options: [
        { text: 'O(n)', feedback: 'Nenhuma ordenação por comparação bate O(n log n) na média.' },
        { text: 'O(n²)', feedback: 'Isso é bubble/insertion/selection sort.' },
        { text: 'O(n log n)', feedback: '✓ Acertou! Merge sort sempre roda em O(n log n) — divide log n vezes, mescla cada nível em O(n).', correct: true },
        { text: 'O(log n)', feedback: 'Logarítmico é rápido demais — você precisa tocar todo elemento ao menos uma vez.' }
      ]
    },

    learn: {
      hook: 'Array.prototype.sort esconde um algoritmo sofisticado de O(n log n). Entender o que acontece por baixo te deixa raciocinar sobre performance e estabilidade.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/3/',
        title: 'CS50 Semana 3: Ordenação',
        duration: '1h',
        yourTakeaway: 'Repara na animação de dividir-pra-conquistar do merge sort — é o coração do algoritmo.'
      },
      conceptText: `Ordenação é um dos problemas mais estudados em CC porque quase toda busca, deduplicação e análise fica mais fácil em dados ordenados.\n\n**Bubble sort**: compara pares adjacentes repetidamente e troca se tão fora de ordem. Fácil de entender, O(n²) na média. Útil pra ensinar, inútil em produção.\n\n**Insertion sort**: constrói um prefixo ordenado inserindo cada novo elemento na posição certa. O(n²) no pior caso, mas O(n) em dados já quase ordenados — rápido pra arrays pequenos ou quase ordenados. Engines do JS geralmente trocam pra insertion sort em arrays minúsculos.\n\n**Selection sort**: acha o mínimo da parte não ordenada repetidamente e coloca na frente. O(n²) sempre. Mais histórico.\n\n**Merge sort**: divide o array no meio, ordena cada metade recursivamente, depois mescla as duas metades ordenadas. **O(n log n) garantido** — o log n vem da divisão, o n vem da mesclagem em cada nível. Usa O(n) de memória extra porque precisa de buffer. **Estável** — preserva a ordem de elementos iguais.\n\n**Quick sort**: escolhe um pivô, particiona em "menor que" e "maior que", recorre. O(n log n) na média, O(n²) no pior caso (raro com pivô aleatório). No lugar, mas instável. Geralmente o mais rápido na prática.\n\nO **\`Array.prototype.sort\`** do JavaScript usa **Timsort** (híbrido de merge sort com insertion sort) no V8 desde 2018. É **estável** desde ES2019.\n\nUma pegadinha crítica do JS: **\`[1, 10, 2].sort()\` retorna \`[1, 10, 2]\`** porque o sort padrão compara como string ("10" < "2" lexicograficamente). Sempre passa um comparador pra números: \`arr.sort((a, b) => a - b)\`.\n\nPra objetos, ordena por chave com: \`posts.sort((a, b) => a.createdAt - b.createdAt)\` pra números/datas, ou \`a.title.localeCompare(b.title)\` pra strings.\n\nQuando ordenação vira gargalo? Quando seu pipeline "ordena depois processa" roda em dados que crescem. Ordenar 100 itens é grátis. Ordenar 100.000 itens leva 10ms. Ordenar bilhões precisa de outra estratégia.`,
      realWorldExample: 'No Spotify, quando você abre a aba "Para Você" com suas top músicas, o servidor precisa ordenar milhares de músicas pelas suas curtidas. Eles não usam bubble sort (travaria) — usam merge sort ou quick sort com índices no banco. Pra você ver o resultado em milissegundos.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Escolha a Ordenação',
        question: 'Você precisa de uma ordenação estável com O(n log n) garantido — mesmo no pior caso. Qual?',
        options: [
          { text: 'Quick sort', feedback: 'Quick sort é instável e O(n²) no pior caso.' },
          { text: 'Merge sort', feedback: '✓ Mandou bem! Merge sort é estável e O(n log n) garantido.', correct: true },
          { text: 'Bubble sort', feedback: 'O(n²) — lento demais em escala.' },
          { text: 'Selection sort', feedback: 'Também O(n²) e instável.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Ordene os Passos do Merge Sort',
        description: 'Coloca esses passos pra merge sort em [4, 2, 8, 1].',
        items: [
          'Ordena recursivamente [4,2] → [2,4] e [8,1] → [1,8]',
          'Mescla as metades ordenadas: [1,2,4,8]',
          'Bate no caso base com sub-arrays de 1 elemento',
          'Divide em [4,2] e [8,1]',
          'Retorna o array final ordenado'
        ],
        correctOrder: [3, 2, 0, 1, 4],
        feedback: 'Divide → recorre até o caso base → mescla na volta → retorna.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'A Pegadinha do Sort',
        instructions: 'O que isso mostra?',
        code: `const nums = [1, 10, 2, 20, 3];
console.log(nums.sort());`,
        question: 'O que aparece?',
        options: [
          { text: '[1, 2, 3, 10, 20]', feedback: 'Era o que VOCÊ QUERIA — mas o sort padrão usa comparação de string.' },
          { text: '[1, 10, 2, 20, 3]', feedback: 'Quase — o sort padrão ainda reordena, só que lexicograficamente.' },
          { text: '[1, 10, 2, 20, 3] (ordem de string)', feedback: '✓ Isso aí! O sort padrão trata como string, então "10" < "2".', correct: true },
          { text: '[20, 10, 3, 2, 1]', feedback: 'Isso seria descendente — sort padrão é crescente.' }
        ],
        feedback: 'Sempre passa um comparador ao ordenar números: nums.sort((a,b) => a - b).'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'bubbleSort',
        instructions: [
          'Escreva bubbleSort(arr) que retorna um NOVO array ordenado (crescente).',
          'NÃO modifique o array original.',
          'Use o algoritmo bubble sort: compara pares adjacentes e troca.'
        ],
        sampleCode: `function bubbleSort(arr) {
  // TODO: retorna novo array ordenado
}`,
        solution: `function bubbleSort(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
  }
  return a;
}`,
        tests: [
          { input: 'bubbleSort([3,1,4,1,5])', expected: [1,1,3,4,5], desc: 'ordena com duplicatas' },
          { input: 'bubbleSort([])', expected: [], desc: 'array vazio' },
          { input: 'bubbleSort([1])', expected: [1], desc: 'um elemento' },
          { input: 'bubbleSort([5,4,3,2,1])', expected: [1,2,3,4,5], desc: 'entrada invertida' }
        ],
        hints: [
          'Copia o input primeiro: const a = [...arr] — não mute.',
          'Loops aninhados: externo é passes, interno compara pares adjacentes.',
          'Troca com destructuring: [a[j], a[j+1]] = [a[j+1], a[j]].'
        ]
      },
      {
        level: 2,
        title: 'insertionSort',
        instructions: [
          'Escreva insertionSort(arr) que retorna um novo array ordenado.',
          'Pra cada elemento, insere ele na posição certa do prefixo ordenado.',
          'NÃO mute o input.'
        ],
        sampleCode: `function insertionSort(arr) {
  // TODO: retorna novo array ordenado
}`,
        solution: `function insertionSort(arr) {
  const a = [...arr];
  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      j--;
    }
    a[j + 1] = key;
  }
  return a;
}`,
        tests: [
          { input: 'insertionSort([5,2,4,6,1,3])', expected: [1,2,3,4,5,6], desc: 'ordenação básica' },
          { input: 'insertionSort([])', expected: [], desc: 'array vazio' },
          { input: 'insertionSort([1,2,3])', expected: [1,2,3], desc: 'já ordenado' }
        ],
        hints: [
          'Começa o loop externo no índice 1 (trata índice 0 como prefixo ordenado).',
          'Salva o elemento atual como key, depois empurra maiores pra direita.',
          'Coloca key no espaço aberto.'
        ]
      },
      {
        level: 3,
        title: 'mergeSort',
        instructions: [
          'Escreva mergeSort(arr) que retorna um novo array ordenado usando merge sort.',
          'Divide recursivamente, ordena cada metade, depois mescla.',
          'NÃO mute o input.'
        ],
        sampleCode: `function mergeSort(arr) {
  // TODO: dividir e conquistar
}`,
        solution: `function mergeSort(arr) {
  if (arr.length <= 1) return [...arr];
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);
  return result;
}`,
        tests: [
          { input: 'mergeSort([4,2,8])', expected: [2,4,8], desc: 'três elementos' },
          { input: 'mergeSort([5,2,4,6,1,3])', expected: [1,2,3,4,5,6], desc: 'seis elementos' },
          { input: 'mergeSort([])', expected: [], desc: 'array vazio' },
          { input: 'mergeSort([1])', expected: [1], desc: 'um elemento' }
        ],
        hints: [
          'Caso base: length <= 1, retorna uma cópia.',
          'Divide em metades left e right, recorre em cada.',
          'Mescla dois arrays ordenados comparando as cabeças e dando push no menor.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Desafio Final: Ordenação',
      steps: [
        {
          type: 'coding',
          title: 'sortBy',
          instructions: 'Escreva sortBy(arr, keyFn) que retorna um novo array ordenado crescente pelo valor que keyFn(item) retorna. Exemplo: sortBy([{age:3},{age:1}], x => x.age) → [{age:1},{age:3}].',
          sampleCode: `function sortBy(arr, keyFn) {
  // TODO
}`,
          solution: `function sortBy(arr, keyFn) {
  return [...arr].sort((a, b) => {
    const ka = keyFn(a);
    const kb = keyFn(b);
    if (ka < kb) return -1;
    if (ka > kb) return 1;
    return 0;
  });
}`,
          tests: [
            { input: 'sortBy([{age:3},{age:1},{age:2}], x => x.age)', expected: [{age:1},{age:2},{age:3}], desc: 'ordena por idade' },
            { input: 'sortBy([{n:"b"},{n:"a"}], x => x.n)', expected: [{n:"a"},{n:"b"}], desc: 'ordena por chave string' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Por que o `arr.sort()` padrão do JavaScript é perigoso pra arrays numéricos?',
          options: [
            { text: 'Modifica o array original', feedback: 'Modifica sim — mas o perigo maior é a ordem errada.' },
            { text: 'Converte elementos pra string e ordena lexicograficamente', feedback: '✓ Isso aí! [1, 10, 2].sort() retorna [1, 10, 2] porque "10" < "2" como string.', correct: true },
            { text: 'Só funciona com arrays menores que 100', feedback: 'Não tem esse limite.' },
            { text: 'Não é estável', feedback: 'É estável desde ES2019 — mas a pegadinha de string é o problema real.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Quando ordenar no JavaScript vs. pedir o backend ordenar antes de mandar pra mim? Tipo, quando vejo o trending do YouTube, quem ordena?',
      systemPrompt: 'Você é um professor de programação brasileiro, descolado, que ensina crianças e adolescentes (8-17 anos) a programar. Use exemplos de jogos, redes sociais e apps que eles conhecem (Minecraft, Roblox, TikTok, Discord, Spotify, Instagram, Fortnite). Seja direto, com humor leve mas sem ser infantil. Explique conceitos técnicos com analogias do mundo deles. Conecte o conteúdo à lição que o aluno acabou de fazer.'
    },
    resources: [
      { title: 'CS50 Semana 3 — Ordenação', url: 'https://cs50.harvard.edu/x/2024/weeks/3/' },
      { title: 'V8 blog: Stable Array.prototype.sort', url: 'https://v8.dev/features/stable-sort' }
    ]
  },

  // ─── csf-7 ──────────────────────────────────────────────────────────────────
  {
    id: 'csf-7-references',
    title: 'Referências & Memória: Por Que Suas Variáveis Bugam',
    week: 4,
    xp: 70,
    difficulty: 'Intermediate',
    priority: '⭐⭐',
    hook: 'Quando duas variáveis "magicamente" mudam juntas, você caiu na pegadinha das referências — entender isso elimina uma classe inteira de bugs.',

    assess: {
      type: 'multipleChoice',
      question: 'O que `const a = [1, 2]; const b = a; b.push(3); console.log(a);` mostra?',
      options: [
        { text: '[1, 2]', feedback: 'b não é uma cópia — aponta pro mesmo array que a.' },
        { text: '[1, 2, 3]', feedback: '✓ Mandou bem! a e b referenciam o mesmo array, então mudanças via b são visíveis via a.', correct: true },
        { text: 'TypeError porque a é const', feedback: 'const impede reatribuição, não mutação do array referenciado.' },
        { text: 'undefined', feedback: 'a tá definido e ainda é um array.' }
      ]
    },

    learn: {
      hook: 'Você espalhou um objeto achando que clonou — mas o objeto aninhado dentro ainda tá compartilhado. Bem-vindo ao mundo divertido de cópia rasa vs. cópia profunda.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/4/',
        title: 'CS50 Semana 4: Memória & Ponteiros',
        duration: '1h',
        yourTakeaway: 'CS50 usa ponteiros em C, mas o modelo é o mesmo: objetos e arrays em JS são acessados por referência.'
      },
      conceptText: `No JavaScript, valores **primitivos** (números, strings, booleanos, null, undefined, symbol, bigint) são armazenados e passados **por valor**. Duas variáveis com o número 5 são independentes.\n\n**Objetos** (incluindo arrays e funções) são armazenados no heap e acessados via **referências**. Quando você faz \`const b = a\` onde a é um array, b guarda a mesma referência — ambos apontam pro mesmo array.\n\nPor isso mutar por uma variável afeta a outra, e \`a === b\` pra objetos verifica identidade de referência (mesmo objeto), não igualdade profunda.\n\n**Cópia rasa (shallow)** cria uma nova estrutura de cima mas compartilha referências aninhadas. \`[...arr]\`, \`Object.assign({}, obj)\` e \`{...obj}\` são todas rasas.\n\n**Cópia profunda (deep)** clona recursivamente cada nível. Use \`structuredClone(obj)\` (moderno), \`JSON.parse(JSON.stringify(obj))\` (funciona mas perde Dates, funções, undefined, etc.), ou escreve uma cópia recursiva.\n\n**Garbage collection** libera memória automaticamente quando nenhuma referência viva aponta pra um valor. Você quase nunca pensa nisso — mas **memory leaks** acontecem quando você segura referências sem querer (event listeners não removidos, closures capturando objetos grandes, caches globais que nunca limpam).\n\n**Igualdade importa**: \`{a: 1} === {a: 1}\` é false (objetos diferentes). Pra comparar conteúdo, escreve uma função de deep-equal ou usa biblioteca.`,
      realWorldExample: 'No Minecraft, quando você dá um item pro seu amigo, ele só funciona porque é uma cópia — se fosse a mesma "referência", quando ele usasse, sumiria do seu inventário também. Tipo no React: se você modifica state direto, o componente não re-renderiza porque é a mesma referência. Sempre cria nova: setState({...state, hp: state.hp - 10}).'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Teste de Referência',
        question: 'Depois de `const obj = {n: 1}; const arr = [obj]; arr[0].n = 2;`, qual o valor de `obj.n`?',
        options: [
          { text: '1', feedback: 'Não — arr[0] e obj são a mesma referência de objeto.' },
          { text: '2', feedback: '✓ Acertou! arr[0] e obj apontam pro mesmo objeto, então a mutação aparece nos dois.', correct: true },
          { text: 'undefined', feedback: 'obj continua definido.' },
          { text: 'Erro — não pode reatribuir const', feedback: 'const permite mutar o objeto referenciado.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Ordene uma Cópia Profunda Recursiva',
        description: 'Coloca esses passos pra uma cópia profunda recursiva de array/objeto.',
        items: [
          'Se o valor não é objeto nem array, retorna ele direto',
          'Pra arrays, mapeia cada elemento pela função de clone',
          'Senão, monta um novo objeto com valores clonados',
          'Define a função deepClone(value)',
          'Retorna a estrutura clonada'
        ],
        correctOrder: [3, 0, 1, 2, 4],
        feedback: 'Define a função, trata primitivos, depois recorre em arrays e objetos.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Shallow vs Deep',
        instructions: 'O que isso mostra?',
        code: `const a = { nested: { x: 1 } };
const b = { ...a };
b.nested.x = 99;
console.log(a.nested.x);`,
        question: 'O que aparece?',
        options: [
          { text: '1', feedback: 'Spread faz cópia rasa — o objeto aninhado ainda é compartilhado.' },
          { text: '99', feedback: '✓ Isso aí! { ...a } copia o nível de cima, mas a.nested e b.nested são a mesma referência.', correct: true },
          { text: 'undefined', feedback: 'a.nested ainda existe.' },
          { text: 'TypeError', feedback: 'Sem erro — JS válido.' }
        ],
        feedback: 'Spread é cópia rasa. Pra clonar o objeto aninhado também, use structuredClone(a) ou um deep clone recursivo.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'cloneArray',
        instructions: [
          'Escreva cloneArray(arr) que retorna uma cópia PROFUNDA de um array (que pode conter arrays aninhados).',
          'Mutar o resultado não deve afetar o original.',
          'Use recursão — NÃO use structuredClone nem truques com JSON.'
        ],
        sampleCode: `function cloneArray(arr) {
  // TODO: cópia profunda
}`,
        solution: `function cloneArray(arr) {
  return arr.map(item => Array.isArray(item) ? cloneArray(item) : item);
}`,
        tests: [
          { input: 'cloneArray([1,[2,3]])', expected: [1,[2,3]], desc: 'estrutura clonada' },
          { input: 'cloneArray([])', expected: [], desc: 'array vazio' },
          { input: 'cloneArray([[1],[2,[3]]])', expected: [[1],[2,[3]]], desc: 'profundamente aninhado' }
        ],
        hints: [
          'Use .map pra andar por cada elemento.',
          'Se o elemento for array, chama cloneArray recursivo.',
          'Senão retorna o elemento (primitivos são copiados por valor).'
        ]
      },
      {
        level: 2,
        title: 'deepEqual',
        instructions: [
          'Escreva deepEqual(a, b) que retorna true quando a e b têm a mesma estrutura e valores.',
          'Trata primitivos, arrays e objetos comuns.',
          'deepEqual({a:1}, {a:1}) → true; deepEqual([1,2], [1,2]) → true'
        ],
        sampleCode: `function deepEqual(a, b) {
  // TODO
}`,
        solution: `function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (const k of keysA) {
    if (!deepEqual(a[k], b[k])) return false;
  }
  return true;
}`,
        tests: [
          { input: 'deepEqual({a:1},{a:1})', expected: true, desc: 'objetos iguais' },
          { input: 'deepEqual({a:1},{a:2})', expected: false, desc: 'valores diferentes' },
          { input: 'deepEqual([1,2,3],[1,2,3])', expected: true, desc: 'arrays iguais' },
          { input: 'deepEqual({a:{b:1}},{a:{b:1}})', expected: true, desc: 'aninhado igual' },
          { input: 'deepEqual(1,1)', expected: true, desc: 'primitivos' }
        ],
        hints: [
          'Começa com === pra primitivos e mesmo-referência.',
          'Se um dos dois não for objeto (ou for null), retorna o resultado de ===.',
          'Compara keys.length, depois recorre em cada chave.'
        ]
      },
      {
        level: 3,
        title: 'mergeObjects',
        instructions: [
          'Escreva mergeObjects(target, source) que retorna um NOVO objeto combinando os dois.',
          'Propriedades de source sobrescrevem as de target em conflito.',
          'NÃO mute nenhum dos inputs.'
        ],
        sampleCode: `function mergeObjects(target, source) {
  // TODO
}`,
        solution: `function mergeObjects(target, source) {
  return { ...target, ...source };
}`,
        tests: [
          { input: 'mergeObjects({a:1},{b:2})', expected: {a:1,b:2}, desc: 'chaves distintas' },
          { input: 'mergeObjects({a:1,b:2},{b:3})', expected: {a:1,b:3}, desc: 'source sobrescreve' },
          { input: 'mergeObjects({},{x:1})', expected: {x:1}, desc: 'target vazio' },
          { input: 'mergeObjects({x:1},{})', expected: {x:1}, desc: 'source vazio' }
        ],
        hints: [
          'Espalha os dois em um novo objeto: { ...target, ...source }.',
          'Propriedades do segundo spread (source) ganham em conflito.',
          'Object.assign({}, target, source) também funciona.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Desafio Final: Referências',
      steps: [
        {
          type: 'coding',
          title: 'freeze',
          instructions: 'Escreva freeze(obj) que retorna uma cópia congelada rasa de obj (não dá pra adicionar/remover/mudar propriedades do nível de cima). Use Object.freeze numa cópia nova. Dica: spread e depois freeze.',
          sampleCode: `function freeze(obj) {
  // TODO
}`,
          solution: `function freeze(obj) {
  return Object.freeze({ ...obj });
}`,
          tests: [
            { input: '(function(){ const f = freeze({a:1}); try { f.a = 99; } catch(e){} return f.a; })()', expected: 1, desc: 'valor congelado não muda' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Por que setState do React às vezes não dispara re-render quando você atualiza um array?',
          options: [
            { text: 'React agrupa todas as atualizações', feedback: 'Agrupar atrasa renders mas não pula eles.' },
            { text: 'Você mutou o array em vez de criar nova referência', feedback: '✓ Isso aí! React compara por referência — mesma referência = "sem mudança", mesmo se conteúdo for diferente.', correct: true },
            { text: 'Arrays são imutáveis no React', feedback: 'Não são — mas o React espera que você trate state como imutável.' },
            { text: 'Você esqueceu de dar await no setState', feedback: 'setState não é Promise.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'No meu joguinho em React, quando atualizo o inventário do personagem o componente não re-renderiza. Como debug?',
      systemPrompt: 'Você é um professor de programação brasileiro, descolado, que ensina crianças e adolescentes (8-17 anos) a programar. Use exemplos de jogos, redes sociais e apps que eles conhecem (Minecraft, Roblox, TikTok, Discord, Spotify, Instagram, Fortnite). Seja direto, com humor leve mas sem ser infantil. Explique conceitos técnicos com analogias do mundo deles. Conecte o conteúdo à lição que o aluno acabou de fazer.'
    },
    resources: [
      { title: 'CS50 Semana 4 — Memória', url: 'https://cs50.harvard.edu/x/2024/weeks/4/' },
      { title: 'MDN: structuredClone', url: 'https://developer.mozilla.org/en-US/docs/Web/API/structuredClone' }
    ]
  },

  // ─── csf-8 ──────────────────────────────────────────────────────────────────
  {
    id: 'csf-8-adt',
    title: 'Tipos Abstratos de Dados: Pilha, Fila e Cia',
    week: 5,
    xp: 70,
    difficulty: 'Intermediate',
    priority: '⭐',
    hook: 'Pilha de pratos = stack (o último que entra é o primeiro que sai). Fila do McDonald\'s = queue (primeiro a chegar é o primeiro atendido). Cada problema pede uma estrutura certa.',

    assess: {
      type: 'multipleChoice',
      question: 'Qual estrutura implementa naturalmente a função de "desfazer" (undo)?',
      options: [
        { text: 'Queue (FIFO)', feedback: 'Uma fila repetiria as ações em ordem, não desfaria a última.' },
        { text: 'Stack (LIFO)', feedback: '✓ Mandou bem! Empilha cada ação — undo tira a mais recente.', correct: true },
        { text: 'Set', feedback: 'Um set não tem ordem — inútil pra histórico.' },
        { text: 'Hash map', feedback: 'Map é pra lookup chave-valor, não ordem cronológica.' }
      ]
    },

    learn: {
      hook: 'Um TAD é um contrato — "eu suporto push e pop" — independente de como é implementado. Escolha o TAD certo e seu código vira autoexplicativo.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/5/',
        title: 'CS50 Semana 5: Estruturas de Dados',
        duration: '1h',
        yourTakeaway: 'Foca nas operações que cada TAD suporta, não em como é implementado por baixo.'
      },
      conceptText: `Um **Tipo Abstrato de Dados (TAD)** é uma descrição de comportamento — um conjunto de operações e o que elas fazem — independente de como é implementado na memória.\n\n**Stack** (LIFO — Last In, First Out): push adiciona no topo, pop tira do topo. Tipo pilha de pratos. Exemplos: call stack de funções, histórico de undo, validação de parênteses aninhados.\n\n**Queue** (FIFO — First In, First Out): enqueue adiciona atrás, dequeue tira da frente. Tipo fila do McDonald\'s. Exemplos: filas de tarefas, mensagens, busca em largura.\n\n**Deque** (fila dupla): adiciona/remove de qualquer ponta. Útil pra algoritmos de janela deslizante.\n\n**Set**: coleção sem ordem de valores únicos. Operações: add, remove, has. Exemplos: deduplicação, "já vi isso?". JavaScript tem \`Set\` embutido.\n\n**Map**: coleção de pares chave→valor com chaves únicas. Operações: set, get, has, delete. JavaScript tem \`Map\` embutido (e objetos comuns também servem).\n\n**Priority Queue** (fila com prioridade): dequeue sempre retorna o item de maior prioridade. Implementada com heap. Exemplos: agendamento, Dijkstra. Tipo lobby de Fortnite que prioriza streamers.\n\nNo JavaScript, arrays podem agir como pilhas (\`push\`/\`pop\`) e filas toscas (\`push\`/\`shift\`), embora \`shift\` seja O(n). Pra performance real de fila, use lista encadeada ou buffer circular.\n\n**Parênteses balanceados** é o problema clássico de pilha: percorre da esquerda pra direita, empilha aberturas, em fechamentos verifica que o topo bate.`,
      realWorldExample: 'No Roblox, quando jogadores entram na fila pra entrar num servidor, é uma queue: primeiro a clicar, primeiro a entrar. Já o histórico de comandos do Minecraft (apertar seta pra cima pra ver o último comando) é uma stack: o último que você digitou é o primeiro a aparecer.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Escolha o TAD',
        question: 'Você precisa processar pedidos de API na ordem em que chegaram. Qual TAD?',
        options: [
          { text: 'Stack', feedback: 'Stack é LIFO — o mais recente sairia primeiro.' },
          { text: 'Queue', feedback: '✓ Isso aí! Queue é FIFO — primeiro a entrar, primeiro a sair.', correct: true },
          { text: 'Set', feedback: 'Set não tem ordem.' },
          { text: 'Hash map', feedback: 'Map é pra lookup, não processamento ordenado.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Parênteses Balanceados com Pilha',
        description: 'Coloca esses passos pra validar "({[]})" com pilha.',
        items: [
          'Em fechamento, faz pop e verifica que bate',
          'Se a pilha tá vazia no fim, tá balanceado',
          'Inicializa pilha vazia',
          'Percorre cada caractere da esquerda pra direita',
          'Em abertura, dá push na pilha'
        ],
        correctOrder: [2, 3, 4, 0, 1],
        feedback: 'Inicia pilha, percorre, empilha aberturas, faz pop e verifica em fechamentos, confere vazio no fim.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Stack vs. Queue na Prática',
        instructions: 'O que isso mostra?',
        code: `const stack = [];
stack.push(1); stack.push(2); stack.push(3);
const a = stack.pop();
stack.push(4);
const b = stack.pop();
console.log(a, b);`,
        question: 'O que aparece?',
        options: [
          { text: '1 2', feedback: 'Não — push/pop trabalham no FINAL do array, não no começo.' },
          { text: '3 4', feedback: '✓ Acertou! Push 1,2,3 → pop retorna 3. Push 4 → pop retorna 4.', correct: true },
          { text: '2 3', feedback: 'Retraça as operações.' },
          { text: '3 2', feedback: 'Depois de tirar 3, empurramos 4, então o próximo pop é 4, não 2.' }
        ],
        feedback: 'push/pop em array do JS implementa pilha (LIFO) no final do array.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'isBalanced',
        instructions: [
          'Escreva isBalanced(str) que retorna true se todos os parênteses (), colchetes [] e chaves {} tão balanceados e aninhados certo.',
          'isBalanced("({[]})") → true',
          'isBalanced("([)]") → false',
          'Use uma pilha.'
        ],
        sampleCode: `function isBalanced(str) {
  // TODO: use pilha
}`,
        solution: `function isBalanced(str) {
  const stack = [];
  const pairs = { ')': '(', ']': '[', '}': '{' };
  const openers = new Set(['(', '[', '{']);
  for (const ch of str) {
    if (openers.has(ch)) stack.push(ch);
    else if (pairs[ch]) {
      if (stack.pop() !== pairs[ch]) return false;
    }
  }
  return stack.length === 0;
}`,
        tests: [
          { input: 'isBalanced("({[]})")', expected: true, desc: 'bem aninhado' },
          { input: 'isBalanced("([)]")', expected: false, desc: 'cruzado' },
          { input: 'isBalanced("")', expected: true, desc: 'string vazia' },
          { input: 'isBalanced("(()")', expected: false, desc: 'abertura sem fechar' }
        ],
        hints: [
          'Dá push em toda abertura na pilha.',
          'Em todo fechamento, dá pop e verifica que o valor bate.',
          'No fim, a pilha precisa tá vazia.'
        ]
      },
      {
        level: 2,
        title: 'stackSim',
        instructions: [
          'Escreva stackSim(ops) que executa uma lista de operações de pilha e retorna a pilha final.',
          'Operações: "push:N" empurra o número N, "pop" remove o topo.',
          'stackSim(["push:5","push:3","pop"]) → [5]'
        ],
        sampleCode: `function stackSim(ops) {
  // TODO
}`,
        solution: `function stackSim(ops) {
  const stack = [];
  for (const op of ops) {
    if (op.startsWith('push:')) {
      stack.push(Number(op.slice(5)));
    } else if (op === 'pop') {
      stack.pop();
    }
  }
  return stack;
}`,
        tests: [
          { input: 'stackSim(["push:5","push:3","pop"])', expected: [5], desc: 'dois push, um pop' },
          { input: 'stackSim(["push:1","push:2","push:3"])', expected: [1,2,3], desc: 'três pushes' },
          { input: 'stackSim([])', expected: [], desc: 'sem ops' },
          { input: 'stackSim(["push:1","pop","pop"])', expected: [], desc: 'pop em vazio é seguro' }
        ],
        hints: [
          'Parseia "push:N" com slice(5) e Number().',
          'Em "pop", só chama stack.pop() — retorna undefined se vazio.',
          'Retorna a pilha final.'
        ]
      },
      {
        level: 3,
        title: 'queueSim',
        instructions: [
          'Escreva queueSim(ops) que executa operações FIFO de fila e retorna o array de valores REMOVIDOS em ordem.',
          'Operações: "enq:N" enfileira N, "deq" tira da frente e registra o valor.',
          'queueSim(["enq:1","enq:2","deq"]) → [1]'
        ],
        sampleCode: `function queueSim(ops) {
  // TODO
}`,
        solution: `function queueSim(ops) {
  const queue = [];
  const out = [];
  for (const op of ops) {
    if (op.startsWith('enq:')) {
      queue.push(Number(op.slice(4)));
    } else if (op === 'deq') {
      const v = queue.shift();
      if (v !== undefined) out.push(v);
    }
  }
  return out;
}`,
        tests: [
          { input: 'queueSim(["enq:1","enq:2","deq"])', expected: [1], desc: 'primeiro a sair é o primeiro a entrar' },
          { input: 'queueSim(["enq:1","enq:2","deq","deq"])', expected: [1,2], desc: 'dois deqs em ordem' },
          { input: 'queueSim([])', expected: [], desc: 'sem operações' }
        ],
        hints: [
          'Use array.push pra enfileirar atrás.',
          'Use array.shift pra remover da frente (O(n) no JS mas ok pra entradas pequenas).',
          'Coleta os removidos num array separado.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Desafio Final: TADs',
      steps: [
        {
          type: 'coding',
          title: 'reverseString',
          instructions: 'Escreva reverseString(str) que retorna a string invertida usando pilha (dá push em cada caractere, depois pop em todos).',
          sampleCode: `function reverseString(str) {
  // TODO: use semântica de pilha
}`,
          solution: `function reverseString(str) {
  const stack = [];
  for (const ch of str) stack.push(ch);
  let result = '';
  while (stack.length > 0) result += stack.pop();
  return result;
}`,
          tests: [
            { input: 'reverseString("hello")', expected: 'olleh', desc: 'inverte simples' },
            { input: 'reverseString("")', expected: '', desc: 'string vazia' },
            { input: 'reverseString("a")', expected: 'a', desc: 'um caractere' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Por que usar array do JS como fila (com push/shift) pode ser lento?',
          options: [
            { text: 'push é O(n)', feedback: 'push é O(1) amortizado.' },
            { text: 'shift é O(n) porque reindexa todo elemento restante', feedback: '✓ Isso aí! shift tira da frente, forçando todos os outros a moverem uma posição.', correct: true },
            { text: 'Arrays não podem ter tipos misturados', feedback: 'Podem — não é isso.' },
            { text: 'Usa memória demais', feedback: 'Memória não é o gargalo — reindexação é.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'No meu joguinho, quero implementar "desfazer movimento" tipo Ctrl+Z. Devo usar uma pilha em memória ou guardar no banco?',
      systemPrompt: 'Você é um professor de programação brasileiro, descolado, que ensina crianças e adolescentes (8-17 anos) a programar. Use exemplos de jogos, redes sociais e apps que eles conhecem (Minecraft, Roblox, TikTok, Discord, Spotify, Instagram, Fortnite). Seja direto, com humor leve mas sem ser infantil. Explique conceitos técnicos com analogias do mundo deles. Conecte o conteúdo à lição que o aluno acabou de fazer.'
    },
    resources: [
      { title: 'CS50 Semana 5 — Estruturas de Dados', url: 'https://cs50.harvard.edu/x/2024/weeks/5/' },
      { title: 'MDN: Set', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set' }
    ]
  },

  // ─── csf-9 ──────────────────────────────────────────────────────────────────
  {
    id: 'csf-9-data-structures',
    title: 'Hash Tables: O Superpoder dos Programadores',
    week: 5,
    xp: 80,
    difficulty: 'Intermediate',
    priority: '⭐',
    hook: 'Como o WhatsApp acha sua conversa quando você digita o nome do amigo? Hash table. É tipo um índice de livro — sabe o nome, acha na hora.',

    assess: {
      type: 'multipleChoice',
      question: 'Qual o tempo médio de busca em um hash map?',
      options: [
        { text: 'O(1)', feedback: '✓ Acertou! Hashing converte uma chave em índice em tempo constante na média.', correct: true },
        { text: 'O(log n)', feedback: 'Isso seria um map baseado em árvore.' },
        { text: 'O(n)', feedback: 'Só no pior caso (com colisões horríveis) — na média é O(1).' },
        { text: 'O(n log n)', feedback: 'Lento demais — esse é tempo de ordenação.' }
      ]
    },

    learn: {
      hook: 'Contar ocorrências. Agrupar itens. Cachear computações caras. Tudo isso é só "constrói um hash map". Domina uma vez e usa pra sempre.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/5/',
        title: 'CS50 Semana 5: Hash Tables',
        duration: '45min',
        yourTakeaway: 'Entende hashing, colisões e por que lookup em tempo constante é tão poderoso.'
      },
      conceptText: `**Listas encadeadas** são uma cadeia de nós, cada um com um valor e um ponteiro pro próximo. Permitem inserção/remoção O(1) em posições conhecidas mas lookup por índice O(n). Úteis internamente pra filas, caches LRU e sistemas de undo.\n\n**Hash tables** (a implementação por trás do Map e Set no JS) fornecem inserção, remoção e busca por chave em O(1) na média. Uma função hash converte a chave em um índice de array. Colisões (duas chaves no mesmo índice) são resolvidas com chaining ou endereçamento aberto.\n\nNo JavaScript:\n- **\`Map\`** preserva ordem de inserção, aceita qualquer valor como chave (até objetos), e é a escolha certa pra adições/remoções frequentes.\n- **\`Set\`** é pra valores únicos com has/add/delete em O(1).\n- **Objetos comuns** \`{}\` também servem como hash maps mas têm desvantagens: risco de poluição de protótipo, só strings/symbols como chave, e algumas operações mais lentas.\n\n**Padrões comuns**:\n- **Contagem**: \`words.reduce((acc, w) => { acc[w] = (acc[w] || 0) + 1; return acc; }, {});\` — mapa de frequência.\n- **Agrupamento**: mesmo formato mas o valor é um array de itens.\n- **Primeiro único**: conta primeiro, depois varre de novo retornando o primeiro com contagem 1.\n- **Memoização**: cacheia resultados de função pelos argumentos.\n\nQuando usar o quê: arrays pra sequências ordenadas, Set pra "tá na coleção?", Map pra "qual valor associado a essa chave?"`,
      realWorldExample: 'No Instagram, quando alguém curte sua foto, o sistema precisa saber rapidinho se você já tinha curtido ou não. Em vez de procurar em uma lista de milhões de curtidas, usa hash table: chave é seu ID, valor é true/false. Busca instantânea, sem importar quantas curtidas a foto tem.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Map ou Set?',
        question: 'Você quer registrar quantas vezes cada hashtag aparece numa lista de tweets. Qual estrutura?',
        options: [
          { text: 'Set', feedback: 'Set só guarda presença — sem contagem.' },
          { text: 'Map (ou objeto comum)', feedback: '✓ Isso aí! Map de hashtag → contagem dá incremento e lookup em O(1).', correct: true },
          { text: 'Array', feedback: 'Possível mas O(n) por lookup — Map é bem mais rápido.' },
          { text: 'Lista encadeada', feedback: 'Sem vantagem aqui.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Monte um Contador de Frequência',
        description: 'Coloca esses passos pra contar frequência de palavras.',
        items: [
          'Senão, define o valor como 1',
          'Inicializa um objeto/map vazio',
          'Retorna o objeto de frequência',
          'Percorre cada palavra',
          'Se a palavra já é chave, incrementa o valor'
        ],
        correctOrder: [1, 3, 4, 0, 2],
        feedback: 'Inicia o mapa, percorre, verifica e atualiza cada chave, retorna no fim.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Ache o Primeiro Único',
        instructions: 'O que isso mostra pra [1,2,1,3]?',
        code: `function firstUnique(arr) {
  const count = {};
  for (const x of arr) count[x] = (count[x] || 0) + 1;
  for (const x of arr) if (count[x] === 1) return x;
  return null;
}
console.log(firstUnique([1, 2, 1, 3]));`,
        question: 'O que aparece?',
        options: [
          { text: '1', feedback: '1 aparece duas vezes — não é único.' },
          { text: '2', feedback: '✓ Mandou bem! 2 tem contagem 1 e vem antes de 3 no array.', correct: true },
          { text: '3', feedback: '3 também é único, mas vem depois de 2 — retornamos o primeiro.' },
          { text: 'null', feedback: '2 e 3 são únicos — null só se todos repetidos.' }
        ],
        feedback: 'Padrão de duas passadas: monta contagens, depois varre achando o primeiro com contagem 1. Ambas são O(n).'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'wordFrequency',
        instructions: [
          'Escreva wordFrequency(words) que retorna um objeto mapeando cada palavra à sua contagem.',
          'wordFrequency(["a","b","a"]) → { a: 2, b: 1 }'
        ],
        sampleCode: `function wordFrequency(words) {
  // TODO
}`,
        solution: `function wordFrequency(words) {
  const counts = {};
  for (const w of words) {
    counts[w] = (counts[w] || 0) + 1;
  }
  return counts;
}`,
        tests: [
          { input: 'wordFrequency(["a","b","a"])', expected: {a:2,b:1}, desc: 'contagens básicas' },
          { input: 'wordFrequency([])', expected: {}, desc: 'array vazio' },
          { input: 'wordFrequency(["x"])', expected: {x:1}, desc: 'uma palavra' }
        ],
        hints: [
          'Inicializa um objeto vazio como armazenamento.',
          'Pra cada palavra, counts[word] = (counts[word] || 0) + 1.',
          'reduce também funciona: words.reduce((acc, w) => ({...acc, [w]: (acc[w]||0)+1}), {}).'
        ]
      },
      {
        level: 2,
        title: 'firstUnique',
        instructions: [
          'Escreva firstUnique(arr) que retorna o primeiro elemento que aparece exatamente uma vez, ou null se nenhum.',
          'firstUnique([1,2,1,3]) → 2'
        ],
        sampleCode: `function firstUnique(arr) {
  // TODO
}`,
        solution: `function firstUnique(arr) {
  const counts = {};
  for (const x of arr) counts[x] = (counts[x] || 0) + 1;
  for (const x of arr) if (counts[x] === 1) return x;
  return null;
}`,
        tests: [
          { input: 'firstUnique([1,2,1,3])', expected: 2, desc: '2 é o primeiro único' },
          { input: 'firstUnique([1,1,2,2])', expected: null, desc: 'nenhum único' },
          { input: 'firstUnique([])', expected: null, desc: 'array vazio' },
          { input: 'firstUnique([5])', expected: 5, desc: 'um elemento' }
        ],
        hints: [
          'Duas passadas: primeiro monta o mapa de contagem, depois acha o primeiro com 1.',
          'Retorna null se terminar o segundo loop sem achar.',
          'O(n) total — cada passada é O(n).'
        ]
      },
      {
        level: 3,
        title: 'groupBy',
        instructions: [
          'Escreva groupBy(arr, key) que agrupa um array de objetos pelo valor em key.',
          'Retorna um objeto onde cada valor único de chave mapeia pra um array dos itens correspondentes.',
          'groupBy([{t:"a"},{t:"b"},{t:"a"}], "t") → { a: [{t:"a"},{t:"a"}], b: [{t:"b"}] }'
        ],
        sampleCode: `function groupBy(arr, key) {
  // TODO
}`,
        solution: `function groupBy(arr, key) {
  const groups = {};
  for (const item of arr) {
    const k = item[key];
    if (!groups[k]) groups[k] = [];
    groups[k].push(item);
  }
  return groups;
}`,
        tests: [
          { input: 'groupBy([{t:"a"},{t:"b"},{t:"a"}],"t")', expected: { a: [{t:"a"},{t:"a"}], b: [{t:"b"}] }, desc: 'agrupa por t' },
          { input: 'groupBy([],"t")', expected: {}, desc: 'array vazio' },
          { input: 'groupBy([{n:1,c:"x"}],"c")', expected: { x: [{n:1,c:"x"}] }, desc: 'um item' }
        ],
        hints: [
          'Pra cada item, pega o valor da chave com item[key].',
          'Cria o array do grupo se não existe, depois dá push no item.',
          'reduce também rola: arr.reduce((acc, it) => { ... return acc; }, {}).'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Desafio Final: Estruturas de Dados',
      steps: [
        {
          type: 'coding',
          title: 'mostCommon',
          instructions: 'Escreva mostCommon(arr) que retorna o valor mais frequente em arr. Em caso de empate, retorna qualquer um dos empatados.',
          sampleCode: `function mostCommon(arr) {
  // TODO
}`,
          solution: `function mostCommon(arr) {
  const counts = {};
  for (const x of arr) counts[x] = (counts[x] || 0) + 1;
  let best = null;
  let bestCount = 0;
  for (const k of Object.keys(counts)) {
    if (counts[k] > bestCount) {
      best = k;
      bestCount = counts[k];
    }
  }
  return best;
}`,
          tests: [
            { input: 'mostCommon(["a","b","a","c","a"])', expected: 'a', desc: '"a" aparece mais' },
            { input: 'mostCommon(["x"])', expected: 'x', desc: 'um único valor' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Por que preferir `Map` em vez de objeto `{}` quando as chaves vêm de usuário?',
          options: [
            { text: 'Map é sempre mais rápido', feedback: 'Performance é parecida em muitos casos.' },
            { text: 'Objetos comuns têm risco de poluição de protótipo e chaves reservadas tipo __proto__', feedback: '✓ Acertou! Map evita chaves herdadas e aceita qualquer valor (até objetos) como chave.', correct: true },
            { text: 'Objetos não armazenam muitas entradas', feedback: 'Objetos escalam bem.' },
            { text: 'Chaves do Map precisam ser string', feedback: 'O contrário — Map aceita qualquer valor como chave.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'No Spotify, como eles acham rapidinho qual música tocar quando você digita o nome? Eles usam hash table?',
      systemPrompt: 'Você é um professor de programação brasileiro, descolado, que ensina crianças e adolescentes (8-17 anos) a programar. Use exemplos de jogos, redes sociais e apps que eles conhecem (Minecraft, Roblox, TikTok, Discord, Spotify, Instagram, Fortnite). Seja direto, com humor leve mas sem ser infantil. Explique conceitos técnicos com analogias do mundo deles. Conecte o conteúdo à lição que o aluno acabou de fazer.'
    },
    resources: [
      { title: 'CS50 Semana 5 — Hash Tables', url: 'https://cs50.harvard.edu/x/2024/weeks/5/' },
      { title: 'MDN: Map', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map' }
    ]
  },

  // ─── csf-10 ─────────────────────────────────────────────────────────────────
  {
    id: 'csf-10-trees',
    title: 'Árvores: Toda Hierarquia é Uma',
    week: 5,
    xp: 80,
    difficulty: 'Advanced',
    priority: '⭐',
    hook: 'A pasta de Downloads tem subpastas, que têm mais subpastas. Isso é uma árvore. Comentários do YouTube, categorias no Instagram, HTML — tudo árvore.',

    assess: {
      type: 'multipleChoice',
      question: 'Qual a profundidade (altura) de uma árvore com só um nó raiz?',
      options: [
        { text: '0', feedback: 'Uma árvore de um nó tipicamente tem profundidade 1 (um nível).' },
        { text: '1', feedback: '✓ Mandou bem! Pela convenção usada aqui, uma árvore de um nó tem profundidade 1 — a raiz conta como um nível.', correct: true },
        { text: '-1', feedback: 'Só árvore vazia (null) tem profundidade 0; -1 não é padrão.' },
        { text: 'undefined', feedback: 'Profundidade sempre é definida pra árvore real.' }
      ]
    },

    learn: {
      hook: 'Uma árvore é só nós apontando pra filhos. Recursão foi feita pra árvores — e quando você vê um algoritmo de árvore, o resto cai por conta própria.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/5/',
        title: 'CS50 Semana 5: Árvores & Tries',
        duration: '45min',
        yourTakeaway: 'Repara que toda travessia é só recursão com uma ordem de visita diferente.'
      },
      conceptText: `Uma **árvore** é uma estrutura hierárquica de nós. Cada nó tem um valor e zero ou mais nós filhos. Uma **árvore binária** é uma árvore onde cada nó tem no máximo dois filhos (esquerdo e direito).\n\nTermos-chave: a **raiz** é o nó mais no topo, **folhas** não têm filhos, **profundidade** (ou altura) é o caminho mais longo da raiz até uma folha, e uma **subárvore** é qualquer nó e seus descendentes vistos como uma árvore própria.\n\nUma **Árvore Binária de Busca (BST)** mantém a regra de que pra todo nó, todos os valores na subárvore esquerda são menores e todos na direita são maiores. Isso dá busca/inserção O(log n) numa BST balanceada.\n\n**Travessias** visitam todos os nós, mudando só a ordem:\n- **Inorder** (esquerda, nó, direita) — numa BST, retorna valores ordenados.\n- **Preorder** (nó, esquerda, direita) — útil pra copiar árvores e expressões prefixadas.\n- **Postorder** (esquerda, direita, nó) — útil pra deletar e expressões postfixadas.\n- **Em largura** (nível por nível) — usa uma fila em vez de recursão.\n\n**Tries** (árvores de prefixo) guardam strings caractere por caractere. Elas alimentam autocomplete e corretor ortográfico: andar pela trie casa um prefixo em O(comprimento), independente do tamanho do dicionário. É como o YouTube começa a sugerir vídeos antes de você terminar de digitar.\n\nNo JavaScript, árvores geralmente são objetos aninhados: \`{ val: 1, left: null, right: {...} }\`. Operações de árvore são naturalmente recursivas — caso base em null, caso recursivo combina resultados dos filhos.`,
      realWorldExample: 'No Discord, os canais ficam dentro de categorias, que ficam dentro de servidores. Isso é uma árvore. Quando você expande uma categoria pra ver os canais, o app usa travessia em árvore. E pra contar quantas mensagens não lidas tem em todo o servidor, ele soma recursivamente — exatamente o algoritmo sumTree.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Inorder numa BST',
        question: 'O que uma travessia inorder de uma Árvore Binária de Busca retorna?',
        options: [
          { text: 'Valores em ordem aleatória', feedback: 'Inorder é determinístico.' },
          { text: 'Valores em ordem crescente', feedback: '✓ Isso aí! Inorder numa BST visita valores da esquerda pra direita em ordem.', correct: true },
          { text: 'Valores em ordem decrescente', feedback: 'Isso seria inorder invertida (direita, nó, esquerda).' },
          { text: 'Valores nível por nível', feedback: 'Isso é busca em largura, não inorder.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Ordene a Travessia Recursiva',
        description: 'Coloca esses passos pra travessia inorder coletando valores num array.',
        items: [
          'Recorre no filho direito',
          'Se o nó é null, retorna',
          'Visita o nó atual (faz push do valor)',
          'Recorre no filho esquerdo',
          'Define inorder(node, out)'
        ],
        correctOrder: [4, 1, 3, 2, 0],
        feedback: 'Define a função, trata o caso base de null, depois esquerda → nó → direita.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Profundidade da Árvore',
        instructions: 'O que treeDepth retorna pra essa árvore?',
        code: `function treeDepth(node) {
  if (!node) return 0;
  return 1 + Math.max(treeDepth(node.left), treeDepth(node.right));
}
const t = { val: 1, left: { val: 2, left: null, right: null }, right: null };
console.log(treeDepth(t));`,
        question: 'O que aparece?',
        options: [
          { text: '0', feedback: 'Só árvore vazia (null) dá 0.' },
          { text: '1', feedback: 'Árvore de um nó dá 1 — essa tem dois níveis.' },
          { text: '2', feedback: '✓ Acertou! Raiz + um nível de filho esquerdo = profundidade 2.', correct: true },
          { text: '3', feedback: 'Não tem terceiro nível — conta de novo.' }
        ],
        feedback: 'Profundidade = 1 + max(prof da subárvore esquerda, prof da direita). Subárvores null contribuem 0.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'treeDepth',
        instructions: [
          'Escreva treeDepth(node) que retorna a profundidade de uma árvore binária.',
          'Um nó tem o formato { val, left, right }. Subárvores vazias são null.',
          'treeDepth(null) → 0. Um único nó → 1.'
        ],
        sampleCode: `function treeDepth(node) {
  // TODO: recursivo
}`,
        solution: `function treeDepth(node) {
  if (!node) return 0;
  return 1 + Math.max(treeDepth(node.left), treeDepth(node.right));
}`,
        tests: [
          { input: 'treeDepth({val:1,left:{val:2,left:null,right:null},right:null})', expected: 2, desc: 'árvore de dois níveis' },
          { input: 'treeDepth(null)', expected: 0, desc: 'árvore vazia' },
          { input: 'treeDepth({val:1,left:null,right:null})', expected: 1, desc: 'um único nó' }
        ],
        hints: [
          'Caso base: null → 0.',
          'Caso recursivo: 1 + max(prof esquerda, prof direita).',
          'Confia na recursão — assume que a chamada já dá o resultado certo.'
        ]
      },
      {
        level: 2,
        title: 'countNodes',
        instructions: [
          'Escreva countNodes(node) que retorna o total de nós em uma árvore binária.',
          'countNodes(null) → 0.'
        ],
        sampleCode: `function countNodes(node) {
  // TODO: recursivo
}`,
        solution: `function countNodes(node) {
  if (!node) return 0;
  return 1 + countNodes(node.left) + countNodes(node.right);
}`,
        tests: [
          { input: 'countNodes({val:1,left:{val:2,left:null,right:null},right:{val:3,left:null,right:null}})', expected: 3, desc: 'três nós' },
          { input: 'countNodes(null)', expected: 0, desc: 'árvore vazia' },
          { input: 'countNodes({val:1,left:null,right:null})', expected: 1, desc: 'um único nó' }
        ],
        hints: [
          'Caso base: null → 0.',
          'Caso recursivo: 1 (esse nó) + contagem esquerda + contagem direita.',
          'Muito parecido com treeDepth — soma em vez de max.'
        ]
      },
      {
        level: 3,
        title: 'inorderArray',
        instructions: [
          'Escreva inorderArray(node) que retorna um array de todos os valores via travessia inorder (esquerda, nó, direita).',
          'Numa BST, isso retorna os valores em ordem crescente.',
          'inorderArray(null) → [].'
        ],
        sampleCode: `function inorderArray(node) {
  // TODO: recursivo
}`,
        solution: `function inorderArray(node) {
  if (!node) return [];
  return [...inorderArray(node.left), node.val, ...inorderArray(node.right)];
}`,
        tests: [
          { input: 'inorderArray({val:2,left:{val:1,left:null,right:null},right:{val:3,left:null,right:null}})', expected: [1,2,3], desc: 'BST retorna em ordem' },
          { input: 'inorderArray(null)', expected: [], desc: 'árvore vazia' },
          { input: 'inorderArray({val:5,left:null,right:null})', expected: [5], desc: 'um único nó' }
        ],
        hints: [
          'Caso base: null → [].',
          'Caso recursivo: junta esquerda + [node.val] + direita.',
          'Spread é o jeito mais limpo de juntar: [...left, val, ...right].'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Desafio Final: Árvores',
      steps: [
        {
          type: 'coding',
          title: 'sumTree',
          instructions: 'Escreva sumTree(node) que retorna a soma de todos os valores em uma árvore binária. sumTree(null) → 0.',
          sampleCode: `function sumTree(node) {
  // TODO: recursivo
}`,
          solution: `function sumTree(node) {
  if (!node) return 0;
  return node.val + sumTree(node.left) + sumTree(node.right);
}`,
          tests: [
            { input: 'sumTree({val:1,left:{val:2,left:null,right:null},right:{val:3,left:null,right:null}})', expected: 6, desc: '1+2+3 = 6' },
            { input: 'sumTree(null)', expected: 0, desc: 'árvore vazia' },
            { input: 'sumTree({val:5,left:null,right:null})', expected: 5, desc: 'um único nó' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Por que uma trie (árvore de prefixo) é melhor que um hash set pra autocomplete?',
          options: [
            { text: 'Tries usam menos memória', feedback: 'Tries geralmente usam MAIS memória — mas permitem busca por prefixo.' },
            { text: 'Uma trie pode retornar eficientemente TODAS as palavras que começam com um prefixo', feedback: '✓ Acertou! Uma trie anda até o nó do prefixo e retorna todas as completações — hash set não faz isso sem varrer tudo.', correct: true },
            { text: 'Hash sets não aceitam string', feedback: 'Aceitam tranquilo.' },
            { text: 'Tries são sempre mais rápidas pra lookup exato', feedback: 'Hash sets são O(1) na média pra lookup exato — tries são O(comprimento).' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Como modelar a árvore de categorias do YouTube (Música → Rock → Brasileiro) e como buscar "todos os vídeos da categoria Música incluindo subcategorias"?',
      systemPrompt: 'Você é um professor de programação brasileiro, descolado, que ensina crianças e adolescentes (8-17 anos) a programar. Use exemplos de jogos, redes sociais e apps que eles conhecem (Minecraft, Roblox, TikTok, Discord, Spotify, Instagram, Fortnite). Seja direto, com humor leve mas sem ser infantil. Explique conceitos técnicos com analogias do mundo deles. Conecte o conteúdo à lição que o aluno acabou de fazer.'
    },
    resources: [
      { title: 'CS50 Semana 5 — Árvores & Tries', url: 'https://cs50.harvard.edu/x/2024/weeks/5/' },
      { title: 'MDN: Recursão & Árvores', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Recursion' }
    ]
  }
];
