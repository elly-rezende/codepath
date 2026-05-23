// Frontend & Web — 10 ALPA lessons
// CS50 weeks 0, 8, 9 — JS/CSS/HTML/DOM/Async/React-thinking
export const fwLessons = [
  // ─── fw-1 ───────────────────────────────────────────────────────────────────
  {
    id: 'fw-1-binary',
    title: 'Binário: Como o Computador Enxerga Tudo',
    week: 0,
    xp: 50,
    difficulty: 'Beginner',
    priority: '⭐',
    hook: 'Sabia que o emoji 😎 que você manda no Instagram vira só 0 e 1 antes de viajar pela internet? Bora entender como.',

    assess: {
      type: 'multipleChoice',
      question: 'Quantos valores diferentes a gente consegue representar com 8 bits?',
      options: [
        { text: '8', feedback: '✗ Esse é o número de bits, não de valores.' },
        { text: '128', feedback: '✗ Quase — isso é 2^7, não 2^8.' },
        { text: '256', feedback: '✓ Mandou bem! 2^8 = 256, valores de 0 a 255 — é por isso que cores RGB vão de 0 a 255.', correct: true },
        { text: '512', feedback: '✗ Isso seria 9 bits.' }
      ]
    },

    learn: {
      hook: 'Toda cor que aparece no Instagram, todo pixel da tela do seu celular, todo caractere de uma mensagem no Discord — por baixo dos panos é só 0 e 1.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/0/',
        title: 'CS50 Semana 0: Binário e Representação',
        duration: '20 min',
        yourTakeaway: 'Repara como números, letras (ASCII) e cores RGB no fundo são só padrões de bits.'
      },
      conceptText: `**Binário** é base 2: todo número é feito só com 0 e 1. Cada dígito é um **bit**, e 8 bits formam um **byte**.\n\nCada posição vale uma potência de 2, da direita pra esquerda: 1, 2, 4, 8, 16, 32, 64, 128. O binário 1010 vale 8 + 0 + 2 + 0 = 10.\n\nNo mundo front-end, binário aparece em todo lugar — mesmo quando você não vê. **Cores RGB** usam 8 bits por canal (vermelho, verde, azul), então cada canal vai de 0 a 255 (2^8 = 256 valores). **Unicode** dá um número pra cada caractere (a letra "A" é 65, armazenada como 01000001). **Operadores bitwise** do JavaScript (&, |, ^, ~, <<, >>) trabalham direto com bits.\n\nCom n bits dá pra representar 2^n valores. 4 bits = 16 (um dígito hexa, tipo #FF0000). 8 bits = 256 (um canal RGB). 24 bits = uns 16,7 milhões (uma cor RGB inteira).\n\nPor que isso importa? Quando a cor #FF8800 da sua story não bate com a do Figma, saber que são três bytes (FF = 255 vermelho, 88 = 136 verde, 00 = 0 azul) te ajuda a debugar em vez de chutar.`,
      realWorldExample: 'Quando você posta uma foto no Instagram e o filtro deixa ela com um tom roxo, cada pixel virou um conjunto de bytes (#A020F0 = 160-32-240 em RGB). Entender que cor hexa é só binário é o que separa "tá meio estranho" de "ah, o designer usou A020F0 em vez de B020F0".'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Lê esse Binário',
        question: 'Qual o valor decimal do binário 1010?',
        options: [
          { text: '8', feedback: '✗ Esse é só o bit mais à esquerda.' },
          { text: '10', feedback: '✓ Acertou na mosca! 8 + 0 + 2 + 0 = 10.', correct: true },
          { text: '12', feedback: '✗ Confere de novo o valor de cada posição.' },
          { text: '1010', feedback: '✗ Isso é a forma binária, não o decimal.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Converte Decimal pra Binário',
        description: 'Coloca os passos na ordem certa pra converter o número 10 pra binário.',
        items: [
          'Divide 2 por 2 → quociente 1, resto 0',
          'Divide 10 por 2 → quociente 5, resto 0',
          'Lê os restos de baixo pra cima: 1010',
          'Divide 5 por 2 → quociente 2, resto 1',
          'Divide 1 por 2 → quociente 0, resto 1'
        ],
        correctOrder: [1, 3, 0, 4, 2],
        feedback: 'Divide por 2 várias vezes, anota os restos, depois lê de baixo pra cima.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Hexa pra Decimal',
        instructions: 'Qual RGB decimal corresponde à cor hexa #FF8800?',
        code: `// #FF8800 dividido em canais:
// FF = ?  88 = ?  00 = ?
// cada dígito hexa é 4 bits, cada canal tem 8 bits (2 dígitos hexa)
console.log(parseInt('FF', 16), parseInt('88', 16), parseInt('00', 16));`,
        question: 'O que isso imprime?',
        options: [
          { text: '255 88 0', feedback: '✗ O primeiro e o último tão certos, mas 88 em hexa não é 88 em decimal.' },
          { text: '255 136 0', feedback: '✓ Acertou! FF = 255, 88 (hexa) = 8*16 + 8 = 136, 00 = 0.', correct: true },
          { text: '15 8 0', feedback: '✗ Você leu só o primeiro dígito de cada canal.' },
          { text: '256 137 1', feedback: '✗ Errou por um em cada posição — conta de novo.' }
        ],
        feedback: 'Cada canal hexa de 2 dígitos vira direto um byte (0-255). É essa a ponte entre cor do Figma e CSS.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'toBinary',
        instructions: [
          'Escreve toBinary(n) que retorna a representação binária de n como string.',
          'toBinary(10) → "1010"',
          'toBinary(0) → "0"'
        ],
        sampleCode: `function toBinary(n) {
  // TODO
}`,
        solution: `function toBinary(n) {
  if (n === 0) return '0';
  let result = '';
  while (n > 0) {
    result = (n % 2) + result;
    n = Math.floor(n / 2);
  }
  return result;
}`,
        tests: [
          { input: 'toBinary(10)', expected: '1010', desc: '10 em binário' },
          { input: 'toBinary(0)', expected: '0', desc: 'caso especial: zero' },
          { input: 'toBinary(255)', expected: '11111111', desc: '255 são oito 1s' },
          { input: 'toBinary(1)', expected: '1', desc: 'um' }
        ],
        hints: [
          'Pega n % 2 várias vezes e vai colocando na frente do resultado.',
          'Depois atualiza n = Math.floor(n / 2).',
          'Não esquece de tratar o caso n === 0.'
        ]
      },
      {
        level: 2,
        title: 'fromBinary',
        instructions: [
          'Escreve fromBinary(s) que converte uma string binária de volta pra número.',
          'fromBinary("1010") → 10'
        ],
        sampleCode: `function fromBinary(s) {
  // TODO
}`,
        solution: `function fromBinary(s) {
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    result = result * 2 + Number(s[i]);
  }
  return result;
}`,
        tests: [
          { input: 'fromBinary("1010")', expected: 10, desc: '1010 → 10' },
          { input: 'fromBinary("0")', expected: 0, desc: 'zero' },
          { input: 'fromBinary("11111111")', expected: 255, desc: 'oito 1s → 255' },
          { input: 'fromBinary("1")', expected: 1, desc: 'um bit' }
        ],
        hints: [
          'Percorre a string da esquerda pra direita.',
          'A cada caractere, multiplica o acumulador por 2 e soma o bit atual.',
          'parseInt(s, 2) também funcionaria — mas o loop ensina a lógica.'
        ]
      },
      {
        level: 3,
        title: 'maxValueForBits',
        instructions: [
          'Escreve maxValueForBits(bits) que retorna o maior valor possível com essa quantidade de bits.',
          'maxValueForBits(8) → 255 (porque 2^8 - 1)',
          'maxValueForBits(4) → 15'
        ],
        sampleCode: `function maxValueForBits(bits) {
  // TODO
}`,
        solution: `function maxValueForBits(bits) {
  return Math.pow(2, bits) - 1;
}`,
        tests: [
          { input: 'maxValueForBits(8)', expected: 255, desc: '8 bits → 255' },
          { input: 'maxValueForBits(4)', expected: 15, desc: '4 bits → 15' },
          { input: 'maxValueForBits(1)', expected: 1, desc: '1 bit → 1' },
          { input: 'maxValueForBits(16)', expected: 65535, desc: '16 bits → 65535' }
        ],
        hints: [
          'Com n bits dá pra representar 2^n valores, de 0 até 2^n - 1.',
          'Math.pow(2, bits) - 1 ou (1 << bits) - 1 funcionam.',
          'É essa a matemática por trás do canal RGB ir só até 255 (8 bits).'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Desafio Final: Binário',
      steps: [
        {
          type: 'coding',
          title: 'countBits',
          instructions: 'Escreve countBits(n) que retorna quantos bits 1 existem na representação binária de n. Exemplo: countBits(7) → 3 (porque 111 tem três 1s).',
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
            { input: 'countBits(255)', expected: 8, desc: '11111111 tem 8 uns' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Por que um canal RGB vai só até 255 e não até 256 ou 1000?',
          options: [
            { text: 'É um limite aleatório que os navegadores escolheram', feedback: '✗ Não é aleatório, vem do tamanho em bits.' },
            { text: 'Cada canal usa 8 bits, então o intervalo é de 0 a 2^8 - 1 = 255', feedback: '✓ Isso! 256 valores diferentes, numerados de 0 a 255.', correct: true },
            { text: '255 é o maior número que o JavaScript aceita', feedback: '✗ JavaScript trabalha com números bem maiores que 255.' },
            { text: 'Designers acham números redondos confusos', feedback: '✗ O motivo é técnico, não estético.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Como eu penso em cor hexa do CSS em binário, e quando esse modelo realmente me ajuda a debugar?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) front-end. Use exemplos do TikTok, Instagram, YouTube, Discord, Roblox. Conecte HTML/CSS/JS ao que eles veem nas redes sociais e games. Seja direto, com humor, sem ser infantil.'
    },
    resources: [
      { title: 'CS50 Semana 0 — Binário', url: 'https://cs50.harvard.edu/x/2024/weeks/0/' },
      { title: 'MDN: Valores de cor CSS', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/color_value' }
    ]
  },

  // ─── fw-2 ───────────────────────────────────────────────────────────────────
  {
    id: 'fw-2-html',
    title: 'HTML: Estrutura com Significado',
    week: 8,
    xp: 50,
    difficulty: 'Beginner',
    priority: '⭐',
    hook: 'Toda página web — do YouTube ao site do seu jogo favorito — usa "tags" tipo etiquetas. <h1> é tipo o nome gigante do canal, e usar a tag certa muda tudo.',

    assess: {
      type: 'multipleChoice',
      question: 'Qual dessas é uma tag HTML que se fecha sozinha (sem tag de fechamento)?',
      options: [
        { text: '<div>', feedback: '✗ div é uma caixa — sempre precisa fechar.' },
        { text: '<img>', feedback: '✓ Mandou bem! img é uma tag void — não tem conteúdo nem fechamento.', correct: true },
        { text: '<span>', feedback: '✗ span é inline mas ainda precisa de fechamento.' },
        { text: '<p>', feedback: '✗ p envolve conteúdo — precisa fechar.' }
      ]
    },

    learn: {
      hook: 'Aquela página cheia de <div> em todo canto começou porque alguém usou <div> quando tinha uma tag certinha tipo <article> ou <section>. HTML semântico é acessibilidade de graça.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/8/',
        title: 'CS50 Semana 8: HTML e a Web',
        duration: '45 min',
        yourTakeaway: 'Presta atenção em como as tags semânticas dão estrutura pra página e ajudam leitores de tela.'
      },
      conceptText: `**HTML** (HyperText Markup Language) descreve a estrutura de uma página. Cada elemento é uma tag envolvendo conteúdo — \`<h1>Oi</h1>\` é um título com o texto "Oi" dentro.\n\n**Tags semânticas** dizem o que o conteúdo *significa*, não como ele aparece. As principais:\n\n- **\`<header>\`** — topo da página ou de uma seção\n- **\`<nav>\`** — links de navegação\n- **\`<main>\`** — o conteúdo principal (só um por página)\n- **\`<article>\`** — algo que faz sentido sozinho (post, vídeo, story)\n- **\`<section>\`** — uma área temática dentro da página\n- **\`<aside>\`** — conteúdo lateral, relacionado mas não principal\n- **\`<footer>\`** — rodapé\n\n**Tags void** não têm conteúdo nem fechamento: \`<img>\`, \`<br>\`, \`<hr>\`, \`<input>\`, \`<meta>\`, \`<link>\`. No HTML5 você escreve sem barra. No JSX precisa fechar com barra: \`<img />\`.\n\n**Por que tags semânticas importam**:\n1. **Acessibilidade** — leitores de tela falam "artigo" ou "navegação"; \`<div>\` não diz nada.\n2. **SEO** — o Google dá mais peso a conteúdo dentro de \`<article>\` e \`<main>\`.\n3. **Legibilidade** — \`<article class="post">\` se explica sozinho; \`<div class="post-wrapper-outer">\` não.\n\n**Atributos** dão informação extra: \`<a href="...">\`, \`<img alt="...">\`. O \`alt\` da imagem é essencial — sem ele, leitor de tela só fala "imagem" e mais nada.`,
      realWorldExample: 'Quando você abre o YouTube, o vídeo principal tá num <main>, o menu lateral num <nav>, e cada comentário num <article>. É isso que faz o app funcionar legal no leitor de tela e o Google entender o conteúdo automaticamente — sem você fazer nada extra.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Escolhe a Tag Certa',
        question: 'Você tá fazendo uma lista de posts recentes numa barra lateral, tipo o "stories" do Insta. Qual tag usar?',
        options: [
          { text: '<div class="sidebar">', feedback: '✗ Funciona mas não é semântico.' },
          { text: '<aside>', feedback: '✓ Mandou bem! <aside> é justamente pra conteúdo lateral.', correct: true },
          { text: '<section>', feedback: '✗ <section> é muito genérica — <aside> é mais específica.' },
          { text: '<nav>', feedback: '✗ <nav> é pra links de navegação, não conteúdo.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Ordena uma Página Semântica',
        description: 'Coloca essas tags na ordem de cima pra baixo numa página típica.',
        items: [
          '<main>',
          '<header>',
          '<footer>',
          '<nav>',
          '<aside>'
        ],
        correctOrder: [1, 3, 0, 4, 2],
        feedback: 'Layout comum: header → nav → main (com aside do lado) → footer. O aside pode vir antes ou depois do main.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Acha a Tag sem Fechamento',
        instructions: 'Qual versão desse HTML tá certa?',
        code: `// Versão A:
// <img src="hero.jpg" alt="Hero">
// Versão B:
// <img src="hero.jpg" alt="Hero"></img>
// Versão C:
// <img src="hero.jpg" alt="Hero" />
console.log('Qual é HTML5 válido?');`,
        question: 'Qual versão é válida no HTML5?',
        options: [
          { text: 'Só a A', feedback: '✗ A é válida sim, mas a C também funciona (estilo JSX).' },
          { text: 'A e C — ambas são válidas (C também é compatível com JSX)', feedback: '✓ Acertou! HTML5 aceita <img>, e a barra de fechamento também é válida (e obrigatória no JSX).', correct: true },
          { text: 'Só a C', feedback: '✗ A é válida no HTML5 também.' },
          { text: 'B — toda tag precisa de fechamento', feedback: '✗ B tá errada — img é void, não pode ter tag de fechamento.' }
        ],
        feedback: 'Tags void (img, br, input, etc.) nunca têm fechamento. A barra de auto-fechamento é opcional no HTML5 mas obrigatória no JSX.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'wrapTag',
        instructions: [
          'Escreve wrapTag(tag, content) que envolve o conteúdo na tag HTML.',
          'wrapTag("p","oi") → "<p>oi</p>"',
          'wrapTag("h1","Bem-vindo") → "<h1>Bem-vindo</h1>"'
        ],
        sampleCode: `function wrapTag(tag, content) {
  // TODO
}`,
        solution: `function wrapTag(tag, content) {
  return '<' + tag + '>' + content + '</' + tag + '>';
}`,
        tests: [
          { input: 'wrapTag("p","oi")', expected: '<p>oi</p>', desc: 'parágrafo simples' },
          { input: 'wrapTag("h1","Bem-vindo")', expected: '<h1>Bem-vindo</h1>', desc: 'título' },
          { input: 'wrapTag("article","")', expected: '<article></article>', desc: 'conteúdo vazio' }
        ],
        hints: [
          'Concatena: abre <, tag, fecha >, conteúdo, abre </, tag, fecha >.',
          'Template literal também rola: `<${tag}>${content}</${tag}>`.',
          'Aqui você não trata tags void — isso vem no próximo nível.'
        ]
      },
      {
        level: 2,
        title: 'isSelfClosing',
        instructions: [
          'Escreve isSelfClosing(tag) que retorna true se a tag for void (auto-fecha).',
          'Tags void: img, br, hr, input, meta, link, area, base, col, embed, source, track, wbr.',
          'isSelfClosing("img") → true, isSelfClosing("div") → false'
        ],
        sampleCode: `function isSelfClosing(tag) {
  // TODO
}`,
        solution: `function isSelfClosing(tag) {
  const voidElements = ['img','br','hr','input','meta','link','area','base','col','embed','source','track','wbr'];
  return voidElements.includes(tag);
}`,
        tests: [
          { input: 'isSelfClosing("img")', expected: true, desc: 'img é void' },
          { input: 'isSelfClosing("div")', expected: false, desc: 'div não é void' },
          { input: 'isSelfClosing("br")', expected: true, desc: 'br é void' },
          { input: 'isSelfClosing("p")', expected: false, desc: 'p não é void' },
          { input: 'isSelfClosing("input")', expected: true, desc: 'input é void' }
        ],
        hints: [
          'Guarda as tags void num array.',
          'Usa Array.includes() pra checar.',
          'Set seria mais rápido pra listas gigantes — mas pra 13 itens, array tá ótimo.'
        ]
      },
      {
        level: 3,
        title: 'extractTagName',
        instructions: [
          'Escreve extractTagName(html) que pega o nome da tag de uma string HTML de abertura.',
          'extractTagName("<div class=\'x\'>") → "div"',
          'extractTagName("<img src=\'a.png\' />") → "img"'
        ],
        sampleCode: `function extractTagName(html) {
  // TODO
}`,
        solution: `function extractTagName(html) {
  const match = html.match(/^<([a-zA-Z][a-zA-Z0-9]*)/);
  return match ? match[1] : '';
}`,
        tests: [
          { input: 'extractTagName("<div class=\'x\'>")', expected: 'div', desc: 'div com atributo' },
          { input: 'extractTagName("<img src=\'a.png\' />")', expected: 'img', desc: 'auto-fechamento com atributos' },
          { input: 'extractTagName("<h1>Oi</h1>")', expected: 'h1', desc: 'tag com conteúdo' },
          { input: 'extractTagName("<article>")', expected: 'article', desc: 'sem atributos' }
        ],
        hints: [
          'Usa uma regex que começa no < e captura os caracteres do nome.',
          '/^<([a-zA-Z][a-zA-Z0-9]*)/ pega tags tipo div, h1, article.',
          'match[1] te dá o grupo capturado.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Desafio Final: HTML Semântico',
      steps: [
        {
          type: 'coding',
          title: 'buildElement',
          instructions: 'Escreve buildElement(tag, content) que retorna uma string HTML válida. Se a tag for void (img, br, hr, input, meta, link), retorna "<tag />" ignorando o conteúdo. Caso contrário "<tag>content</tag>".',
          sampleCode: `function buildElement(tag, content) {
  // TODO
}`,
          solution: `function buildElement(tag, content) {
  const voids = ['img','br','hr','input','meta','link'];
  if (voids.includes(tag)) return '<' + tag + ' />';
  return '<' + tag + '>' + content + '</' + tag + '>';
}`,
          tests: [
            { input: 'buildElement("p","oi")', expected: '<p>oi</p>', desc: 'elemento normal' },
            { input: 'buildElement("img","ignorado")', expected: '<img />', desc: 'void ignora conteúdo' },
            { input: 'buildElement("article","Oi")', expected: '<article>Oi</article>', desc: 'elemento semântico' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Por que usar <article> em vez de <div class="article"> faz diferença além da estética?',
          options: [
            { text: 'Carrega mais rápido', feedback: '✗ Não tem diferença mensurável de carregamento.' },
            { text: 'Leitor de tela anuncia como artigo e o Google trata como conteúdo principal', feedback: '✓ Isso! Tags semânticas dão significado pra tecnologias assistivas e buscadores — acessibilidade e SEO de graça.', correct: true },
            { text: 'Seletores CSS ficam mais simples', feedback: '✗ CSS funciona nos dois — é um efeito colateral menor.' },
            { text: 'É obrigatório no HTML5', feedback: '✗ É recomendado, não obrigatório.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Quando eu monto uma página tipo um post do Instagram em HTML, qual estrutura semântica devo usar e como isso afeta como o link aparece quando alguém compartilha?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) front-end. Use exemplos do TikTok, Instagram, YouTube, Discord, Roblox. Conecte HTML/CSS/JS ao que eles veem nas redes sociais e games. Seja direto, com humor, sem ser infantil.'
    },
    resources: [
      { title: 'CS50 Semana 8 — HTML/CSS', url: 'https://cs50.harvard.edu/x/2024/weeks/8/' },
      { title: 'MDN: Referência de elementos HTML', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element' }
    ]
  },

  // ─── fw-3 ───────────────────────────────────────────────────────────────────
  {
    id: 'fw-3-flexbox',
    title: 'CSS: Flexbox na Veia',
    week: 8,
    xp: 60,
    difficulty: 'Beginner',
    priority: '⭐',
    hook: 'Já reparou como a barra superior do Discord alinha os ícones perfeitamente? É Flexbox. Centralizar uma div em 2024 virou coisa de 3 linhas.',

    assess: {
      type: 'multipleChoice',
      question: 'Num container flex, o que `justify-content: center` faz?',
      options: [
        { text: 'Centraliza os itens no eixo cruzado', feedback: '✗ Isso é align-items, não justify-content.' },
        { text: 'Centraliza no eixo principal (horizontal por padrão)', feedback: '✓ Mandou bem! justify-content cuida do eixo principal, que é horizontal quando flex-direction é row.', correct: true },
        { text: 'Centraliza horizontal E vertical ao mesmo tempo', feedback: '✗ Pra isso precisa de justify-content E align-items.' },
        { text: 'Estica os itens pra preencher o container', feedback: '✗ Isso é align-items: stretch.' }
      ]
    },

    learn: {
      hook: 'Antes do Flexbox, centralizar uma div era um truque de 12 linhas. Agora é `display: flex; justify-content: center; align-items: center;` — três linhas que funcionam em qualquer lugar.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/8/',
        title: 'CS50 Semana 8: CSS e Flexbox',
        duration: '50 min',
        yourTakeaway: 'Foca na diferença entre eixo principal e eixo cruzado — esse conceito desbloqueia o Flexbox.'
      },
      conceptText: `**Flexbox** é um sistema de layout de uma dimensão: os itens fluem num eixo (linha ou coluna) e as regras dizem como eles dividem espaço, alinham e encolhem.\n\nO container declara \`display: flex\`. Por padrão, os itens ficam em linha. **flex-direction** muda isso — \`row\`, \`row-reverse\`, \`column\`, \`column-reverse\`.\n\nFlexbox tem dois eixos: o **eixo principal** (definido pelo flex-direction — horizontal pra row) e o **eixo cruzado** (perpendicular). **justify-content** controla o alinhamento no eixo principal. **align-items** controla no eixo cruzado.\n\nValores comuns de justify-content: \`flex-start\`, \`center\`, \`flex-end\`, \`space-between\`, \`space-around\`, \`space-evenly\`. Valores comuns de align-items: \`stretch\` (padrão), \`center\`, \`flex-start\`, \`flex-end\`, \`baseline\`.\n\nCada filho tem três propriedades flex que dizem como ele cresce e encolhe:\n- **flex-grow** — quanto espaço extra esse item pega (0 = nenhum, 1 = parte igual)\n- **flex-shrink** — quanto ele pode encolher se não tiver espaço\n- **flex-basis** — tamanho inicial antes do grow/shrink\n\nO atalho \`flex: 1 1 auto\` define os três. \`flex: 1\` é o caso comum (equivale a \`1 1 0%\`). \`flex: none\` significa não cresce nem encolhe (equivale a \`0 0 auto\`).\n\n**gap** define o espaçamento entre itens sem precisar de margin — \`gap: 16px\` é a forma mais limpa.\n\nFlexbox é 1D — perfeito pra barra de navegação, grupos de botões, linhas de formulário, conteúdo de card. Pra layouts grid completos (linhas E colunas ao mesmo tempo), usa CSS Grid.`,
      realWorldExample: 'Pensa na story do Instagram: foto de perfil à esquerda, nome no meio, botão "X" à direita, tudo alinhado verticalmente. Isso é display: flex; justify-content: space-between; align-items: center; — três linhas substituem trinta linhas de gambiarra antiga.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Lê o Layout Flex',
        question: 'Um container tem `display: flex; justify-content: space-between` e três filhos. Como eles ficam?',
        options: [
          { text: 'Todos colados na esquerda', feedback: '✗ Isso seria justify-content: flex-start.' },
          { text: 'Primeiro na esquerda, último na direita, o do meio no meio com espaço igual', feedback: '✓ Acertou! space-between gruda o primeiro e o último nas bordas e distribui o resto.', correct: true },
          { text: 'Todos centralizados sem espaço', feedback: '✗ Isso seria justify-content: center.' },
          { text: 'Empilhados verticalmente', feedback: '✗ flex-direction é row por padrão — vão na horizontal.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Centraliza uma Div nos Dois Eixos',
        description: 'Coloca essas linhas CSS na ordem certa pra centralizar uma div filha dentro de uma pai.',
        items: [
          'align-items: center;',
          '/* no pai */',
          'display: flex;',
          'justify-content: center;'
        ],
        correctOrder: [1, 2, 3, 0],
        feedback: 'No pai: display: flex liga o flexbox, justify-content: center faz o horizontal, align-items: center faz o vertical.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Atalho do flex',
        instructions: 'O que esse atalho CSS significa?',
        code: `// .item { flex: 1 1 200px; }
// flex é atalho pra: flex-grow, flex-shrink, flex-basis
console.log('flex-grow=1, flex-shrink=1, flex-basis=200px');`,
        question: 'O que `flex: 1 1 200px` significa na prática?',
        options: [
          { text: 'O item tem exatamente 200px e nunca muda', feedback: '✗ Não — grow e shrink são 1, então ele muda com o espaço disponível.' },
          { text: 'Começa com 200px, cresce pra preencher espaço extra, encolhe se precisar', feedback: '✓ Acertou! basis 200px é o tamanho inicial; grow 1 e shrink 1 deixam ele se ajustar.', correct: true },
          { text: 'Tem 1px de largura com 200px de padding', feedback: '✗ Não é isso.' },
          { text: 'Cresce 1x, encolhe 1x, com máximo de 200px', feedback: '✗ flex-basis é o tamanho inicial, não máximo.' }
        ],
        feedback: 'A ordem do atalho é grow / shrink / basis. Decora isso — aparece em todo código.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'calcFlexBasis',
        instructions: [
          'Escreve calcFlexBasis(grow, total, containerWidth) que retorna a largura em pixels alocada pra um item.',
          'Quando os itens têm valores de flex-grow iguais, a largura do container é dividida igualmente.',
          'calcFlexBasis(1, 3, 300) → 100 (1 parte de 3 em 300px)'
        ],
        sampleCode: `function calcFlexBasis(grow, total, containerWidth) {
  // TODO
}`,
        solution: `function calcFlexBasis(grow, total, containerWidth) {
  return (grow / total) * containerWidth;
}`,
        tests: [
          { input: 'calcFlexBasis(1, 3, 300)', expected: 100, desc: '1 de 3 partes de 300px' },
          { input: 'calcFlexBasis(2, 4, 400)', expected: 200, desc: '2 de 4 partes de 400px' },
          { input: 'calcFlexBasis(1, 1, 500)', expected: 500, desc: 'único item pega tudo' }
        ],
        hints: [
          'É só uma proporção: (grow / total) * containerWidth.',
          'Não precisa tratar borda — total sempre vai ser > 0.',
          'Isso espelha como o navegador distribui as partes do flex-grow.'
        ]
      },
      {
        level: 2,
        title: 'parseFlexShorthand',
        instructions: [
          'Escreve parseFlexShorthand(val) que pega uma string atalho "flex" e retorna um objeto {grow, shrink, basis}.',
          'parseFlexShorthand("1 1 auto") → {grow:1, shrink:1, basis:"auto"}',
          'Números devem ser convertidos com Number; basis fica como string.'
        ],
        sampleCode: `function parseFlexShorthand(val) {
  // TODO
}`,
        solution: `function parseFlexShorthand(val) {
  const parts = val.split(' ');
  return {
    grow: Number(parts[0]),
    shrink: Number(parts[1]),
    basis: parts[2]
  };
}`,
        tests: [
          { input: 'parseFlexShorthand("1 1 auto")', expected: { grow: 1, shrink: 1, basis: 'auto' }, desc: 'clássico flex: 1 1 auto' },
          { input: 'parseFlexShorthand("2 0 200px")', expected: { grow: 2, shrink: 0, basis: '200px' }, desc: 'basis fixa' },
          { input: 'parseFlexShorthand("0 1 100%")', expected: { grow: 0, shrink: 1, basis: '100%' }, desc: 'basis em porcentagem' }
        ],
        hints: [
          'Divide a string pelos espaços.',
          'Converte as duas primeiras partes com Number().',
          'Deixa a terceira (basis) como string — pode ser "auto", "200px", "100%".'
        ]
      },
      {
        level: 3,
        title: 'getJustifyValue',
        instructions: [
          'Escreve getJustifyValue(alignment) que mapeia um nome amigável pra um valor CSS válido de justify-content.',
          'Mapa: "start" → "flex-start", "end" → "flex-end", "center" → "center", "between" → "space-between", "around" → "space-around", "evenly" → "space-evenly".',
          'Retorna a entrada sem mudança se já for um valor CSS válido.'
        ],
        sampleCode: `function getJustifyValue(alignment) {
  // TODO
}`,
        solution: `function getJustifyValue(alignment) {
  const map = {
    'start': 'flex-start',
    'end': 'flex-end',
    'center': 'center',
    'between': 'space-between',
    'around': 'space-around',
    'evenly': 'space-evenly'
  };
  return map[alignment] || alignment;
}`,
        tests: [
          { input: 'getJustifyValue("center")', expected: 'center', desc: 'center fica center' },
          { input: 'getJustifyValue("between")', expected: 'space-between', desc: 'between → space-between' },
          { input: 'getJustifyValue("start")', expected: 'flex-start', desc: 'start → flex-start' },
          { input: 'getJustifyValue("space-evenly")', expected: 'space-evenly', desc: 'já válido fica' }
        ],
        hints: [
          'Usa um objeto como mapa de lookup.',
          'Retorna o valor mapeado, ou cai pra entrada original se não tiver no mapa.',
          'Esse padrão é igual ao que design systems usam pra normalizar props.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Desafio Final: Flexbox',
      steps: [
        {
          type: 'coding',
          title: 'buildFlexCSS',
          instructions: 'Escreve buildFlexCSS(direction, justify, align) que retorna uma string CSS com display: flex e as três propriedades. Exemplo: buildFlexCSS("row","center","center") → "display: flex; flex-direction: row; justify-content: center; align-items: center;".',
          sampleCode: `function buildFlexCSS(direction, justify, align) {
  // TODO
}`,
          solution: `function buildFlexCSS(direction, justify, align) {
  return 'display: flex; flex-direction: ' + direction + '; justify-content: ' + justify + '; align-items: ' + align + ';';
}`,
          tests: [
            { input: 'buildFlexCSS("row","center","center")', expected: 'display: flex; flex-direction: row; justify-content: center; align-items: center;', desc: 'linha centralizada' },
            { input: 'buildFlexCSS("column","flex-start","stretch")', expected: 'display: flex; flex-direction: column; justify-content: flex-start; align-items: stretch;', desc: 'layout coluna' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Você quer três cards lado a lado, com largura igual e espaçamento igual. Qual a forma mais limpa com Flexbox?',
          options: [
            { text: 'display: flex; gap: 16px; no pai, flex: 1 em cada filho', feedback: '✓ Isso! gap cuida do espaçamento, flex: 1 deixa cada filho pegar parte igual da largura.', correct: true },
            { text: 'Float em cada card com margin-right', feedback: '✗ Isso é jeito pré-Flexbox — frágil e antigo.' },
            { text: 'Position absolute e calcular larguras em JS', feedback: '✗ Muito mais código que o necessário.' },
            { text: 'display: grid com uma linha', feedback: '✗ Grid também funcionaria mas é exagero pra uma linha só.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Quando eu uso Flexbox e quando uso CSS Grid nos meus componentes? Tem uma regra clara ou é só feeling?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) front-end. Use exemplos do TikTok, Instagram, YouTube, Discord, Roblox. Conecte HTML/CSS/JS ao que eles veem nas redes sociais e games. Seja direto, com humor, sem ser infantil.'
    },
    resources: [
      { title: 'CS50 Semana 8 — CSS', url: 'https://cs50.harvard.edu/x/2024/weeks/8/' },
      { title: 'CSS-Tricks: Guia Completo do Flexbox', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' }
    ]
  },

  // ─── fw-4 ───────────────────────────────────────────────────────────────────
  {
    id: 'fw-4-grid',
    title: 'CSS: Dominando o Grid',
    week: 8,
    xp: 60,
    difficulty: 'Intermediate',
    priority: '⭐',
    hook: 'Sabe o feed do Instagram com fotos em quadrados perfeitos? CSS Grid. Flexbox é uma dimensão. Grid é duas — e qualquer layout de dashboard vira 5 linhas.',

    assess: {
      type: 'multipleChoice',
      question: 'O que a unidade CSS `fr` representa num grid?',
      options: [
        { text: 'Um tamanho fixo em pixels', feedback: '✗ fr é fracionário, não fixo.' },
        { text: 'Uma fração do espaço disponível restante', feedback: '✓ Mandou bem! 1fr significa "uma parte do espaço sobrando", parecido com flex-grow.', correct: true },
        { text: 'Uma porcentagem da viewport', feedback: '✗ Isso é vw ou %.' },
        { text: 'Um múltiplo do font-size raiz', feedback: '✗ Isso é rem.' }
      ]
    },

    learn: {
      hook: 'Tabelas dos anos 90. Floats dos anos 2000. Flexbox dos anos 2010. CSS Grid é o sistema de layout que você esperava — 2D de verdade, intuitivo, funciona em todo lugar.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/8/',
        title: 'CS50 Semana 8: CSS Grid',
        duration: '40 min',
        yourTakeaway: 'Foca em como grid-template-columns + grid-template-rows definem o layout todo num lugar só.'
      },
      conceptText: `**CSS Grid** é um sistema de layout 2D: você define linhas E colunas ao mesmo tempo, depois coloca os itens nas células.\n\nO container declara \`display: grid\`. Aí você define os tamanhos:\n\n\`\`\`css\n.container {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr; /* 3 colunas iguais */\n  grid-template-rows: auto auto;       /* 2 linhas do tamanho do conteúdo */\n  gap: 16px;                           /* espaço entre células */\n}\n\`\`\`\n\nA unidade **\`fr\`** é a mágica — significa "parte fracionária do espaço restante". \`1fr 1fr\` = duas colunas iguais. \`1fr 2fr\` = 1/3 e 2/3. Pode misturar: \`200px 1fr\` = sidebar de 200px e área principal flexível.\n\n**repeat()** poupa digitação: \`grid-template-columns: repeat(4, 1fr)\` = quatro colunas iguais. **minmax()** define limites: \`minmax(200px, 1fr)\` = pelo menos 200px, no máximo uma parte. **auto-fit** + **minmax** = grids responsivos sem media query: \`repeat(auto-fit, minmax(250px, 1fr))\` empacota o máximo de colunas ~250px que couber e estica pra preencher.\n\n**Posicionando itens**: \`grid-column: 1 / 4\` faz o item ir da linha 1 até a 4 (três colunas). \`grid-column: span 2\` ocupa 2 colunas a partir de onde estiver. \`grid-row\` funciona igual.\n\n**Linhas e áreas nomeadas** deixam layouts complexos legíveis:\n\`\`\`css\ngrid-template-areas:\n  "header header header"\n  "sidebar main main"\n  "footer footer footer";\n\`\`\`\nAí cada filho recebe \`grid-area: header\` e o navegador posiciona automaticamente.\n\n**Grid vs. Flexbox**: Grid pra layouts 2D (dashboard, galeria de fotos, feed do Insta). Flexbox pra linhas ou colunas 1D (barra de nav, grupo de botões, conteúdo de card). UIs modernas usam os dois — Grid pra estrutura da página, Flexbox dentro de cada célula.`,
      realWorldExample: 'O Pinterest é o exemplo clássico de CSS Grid: cards de tamanhos diferentes em colunas perfeitas. Define o layout uma vez com grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) e os cards se ajustam sozinhos no celular, tablet, desktop — sem media query nenhuma.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Lê o Grid',
        question: 'O que `grid-template-columns: 200px 1fr 1fr` produz?',
        options: [
          { text: 'Três colunas iguais', feedback: '✗ Só as duas últimas são iguais — a primeira é fixa em 200px.' },
          { text: 'Uma coluna fixa de 200px, depois duas colunas flexíveis iguais', feedback: '✓ Acertou! 200px é fixo, as duas colunas 1fr dividem o espaço restante.', correct: true },
          { text: 'Uma coluna de 200px e uma de largura total', feedback: '✗ São três valores, três colunas.' },
          { text: '200 colunas de 1fr cada', feedback: '✗ Você leu errado.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Monta um Grid Responsivo',
        description: 'Coloca essas linhas CSS pra fazer um grid de cards responsivo que cabe o máximo de cards ~300px por linha.',
        items: [
          'gap: 16px;',
          'display: grid;',
          'grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));',
          '/* no pai */'
        ],
        correctOrder: [3, 1, 2, 0],
        feedback: 'display: grid liga o grid, repeat(auto-fit, minmax(...)) empacota os cards de forma responsiva, e gap dá o espaçamento.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Item Ocupando Várias Colunas',
        instructions: 'O que esse CSS faz com .featured?',
        code: `// .grid { display: grid; grid-template-columns: repeat(4, 1fr); }
// .featured { grid-column: span 2; }
console.log('Quantas colunas .featured ocupa?');`,
        question: 'Como .featured se comporta?',
        options: [
          { text: 'Ocupa uma coluna como os outros', feedback: '✗ Não — grid-column: span 2 faz ele ocupar 2 colunas.' },
          { text: 'Ocupa 2 das 4 colunas (metade do grid)', feedback: '✓ Isso! span 2 significa o item ocupa 2 colunas.', correct: true },
          { text: 'Ocupa a linha toda (todas as 4 colunas)', feedback: '✗ Isso seria span 4 ou 1 / -1.' },
          { text: 'Fica escondido por causa do span', feedback: '✗ span não esconde nada.' }
        ],
        feedback: 'grid-column: span N é o jeito mais fácil de fazer um item "destaque" ocupar mais espaço sem mexer no grid pai.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'buildGridTemplate',
        instructions: [
          'Escreve buildGridTemplate(cols) que retorna um valor CSS grid-template-columns com `cols` colunas iguais.',
          'buildGridTemplate(3) → "1fr 1fr 1fr"',
          'buildGridTemplate(1) → "1fr"'
        ],
        sampleCode: `function buildGridTemplate(cols) {
  // TODO
}`,
        solution: `function buildGridTemplate(cols) {
  return new Array(cols).fill('1fr').join(' ');
}`,
        tests: [
          { input: 'buildGridTemplate(3)', expected: '1fr 1fr 1fr', desc: 'três colunas' },
          { input: 'buildGridTemplate(1)', expected: '1fr', desc: 'uma coluna' },
          { input: 'buildGridTemplate(5)', expected: '1fr 1fr 1fr 1fr 1fr', desc: 'cinco colunas' }
        ],
        hints: [
          'Faz um array de tamanho cols preenchido com "1fr".',
          'Junta com espaços.',
          'Array(n).fill("1fr").join(" ") é uma forma.'
        ]
      },
      {
        level: 2,
        title: 'gridSpan',
        instructions: [
          'Escreve gridSpan(start, end) que retorna um valor CSS span.',
          'gridSpan(1, 4) → "span 3" (porque end - start = 3 colunas).',
          'gridSpan(2, 5) → "span 3"'
        ],
        sampleCode: `function gridSpan(start, end) {
  // TODO
}`,
        solution: `function gridSpan(start, end) {
  return 'span ' + (end - start);
}`,
        tests: [
          { input: 'gridSpan(1, 4)', expected: 'span 3', desc: 'ocupa 3 colunas' },
          { input: 'gridSpan(2, 3)', expected: 'span 1', desc: 'ocupa 1 coluna' },
          { input: 'gridSpan(1, 5)', expected: 'span 4', desc: 'ocupa 4 colunas' }
        ],
        hints: [
          'Só (end - start) dá o número de colunas pra ocupar.',
          'Concatena com "span ".',
          'Isso espelha como números de linha do grid mapeiam pra contagem de spans.'
        ]
      },
      {
        level: 3,
        title: 'calcGridColumns',
        instructions: [
          'Escreve calcGridColumns(containerWidth, minColWidth) que retorna quantas colunas cabem no container.',
          'Usa Math.floor — coluna parcial não conta.',
          'calcGridColumns(900, 300) → 3'
        ],
        sampleCode: `function calcGridColumns(containerWidth, minColWidth) {
  // TODO
}`,
        solution: `function calcGridColumns(containerWidth, minColWidth) {
  return Math.floor(containerWidth / minColWidth);
}`,
        tests: [
          { input: 'calcGridColumns(900, 300)', expected: 3, desc: '900 / 300 = 3' },
          { input: 'calcGridColumns(1000, 300)', expected: 3, desc: '1000 / 300 = 3.33 → 3' },
          { input: 'calcGridColumns(250, 300)', expected: 0, desc: 'coluna mín maior que container' },
          { input: 'calcGridColumns(1200, 300)', expected: 4, desc: '1200 / 300 = 4' }
        ],
        hints: [
          'Só Math.floor(containerWidth / minColWidth).',
          'É a matemática por trás do auto-fit com minmax() decidindo a quantidade de colunas.',
          'Usa quando precisar calcular layout manualmente.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Desafio Final: CSS Grid',
      steps: [
        {
          type: 'coding',
          title: 'buildResponsiveGrid',
          instructions: 'Escreve buildResponsiveGrid(minColWidth, gap) que retorna uma string CSS pra grid responsivo auto-fit. Exemplo: buildResponsiveGrid(250, 16) → "display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;".',
          sampleCode: `function buildResponsiveGrid(minColWidth, gap) {
  // TODO
}`,
          solution: `function buildResponsiveGrid(minColWidth, gap) {
  return 'display: grid; grid-template-columns: repeat(auto-fit, minmax(' + minColWidth + 'px, 1fr)); gap: ' + gap + 'px;';
}`,
          tests: [
            { input: 'buildResponsiveGrid(250, 16)', expected: 'display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;', desc: 'grid de cards padrão' },
            { input: 'buildResponsiveGrid(300, 24)', expected: 'display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;', desc: 'cards maiores' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Você precisa de um layout com header em cima, sidebar + conteúdo no meio, footer embaixo. Qual a forma mais limpa?',
          options: [
            { text: 'Três flex containers aninhados', feedback: '✗ Funciona mas o aninhamento vira bagunça rápido.' },
            { text: 'CSS Grid com grid-template-areas nomeando cada região', feedback: '✓ Acertou! Grid template areas deixam o layout visível direto no CSS, sem aninhamento.', correct: true },
            { text: 'Position absolute com z-indexes', feedback: '✗ Frágil, quebra no redimensionamento.' },
            { text: 'Elemento <table>', feedback: '✗ Table é pra dados tabulares, não layout.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Quero montar um layout tipo o painel do YouTube Studio com header, sidebar, área principal de vídeos e cards de métricas. Como estruturo isso com CSS Grid?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) front-end. Use exemplos do TikTok, Instagram, YouTube, Discord, Roblox. Conecte HTML/CSS/JS ao que eles veem nas redes sociais e games. Seja direto, com humor, sem ser infantil.'
    },
    resources: [
      { title: 'CS50 Semana 8 — CSS', url: 'https://cs50.harvard.edu/x/2024/weeks/8/' },
      { title: 'CSS-Tricks: Guia Completo do Grid', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/' }
    ]
  },

  // ─── fw-5 ───────────────────────────────────────────────────────────────────
  {
    id: 'fw-5-js-types',
    title: 'JavaScript: Fundamentos e Tipos',
    week: 8,
    xp: 60,
    difficulty: 'Beginner',
    priority: '⭐',
    hook: 'Sabe quando você digita "idade: 15" num formulário do TikTok? O computador precisa saber se é número ou texto. Aí entra o tipo.',

    assess: {
      type: 'multipleChoice',
      question: 'O que `typeof null` retorna em JavaScript?',
      options: [
        { text: '"null"', feedback: '✗ Quase, mas o JavaScript tem uma esquisitice famosa.' },
        { text: '"object"', feedback: '✓ Acertou! É um bug histórico de 1995 que nunca corrigiram pra não quebrar código antigo.', correct: true },
        { text: '"undefined"', feedback: '✗ undefined é o que typeof retorna pra variáveis sem valor.' },
        { text: 'null', feedback: '✗ typeof sempre retorna uma string.' }
      ]
    },

    learn: {
      hook: 'Todo bug esquisito em JavaScript — "Cannot read property of undefined", "object Object" aparecendo na tela, NaN no lugar do número — vem de não entender os tipos. Domina os tipos e os bugs somem.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/8/',
        title: 'CS50 Semana 8: Básico de JavaScript',
        duration: '40 min',
        yourTakeaway: 'Presta atenção em como tipagem dinâmica é diferente de linguagens tipadas — e por que existe o TypeScript.'
      },
      conceptText: `JavaScript tem **sete tipos primitivos**: number, string, boolean, null, undefined, symbol, bigint. Mais o tipo **object** (que inclui arrays, objetos, funções, datas, regex).\n\n**Declaração de variáveis**:\n- **\`const\`** — escopo de bloco, não pode reatribuir (mas propriedades de objeto podem mudar).\n- **\`let\`** — escopo de bloco, pode reatribuir.\n- **\`var\`** — escopo de função, hoisted, evita em código moderno.\n\nRegra: começa com \`const\`. Usa \`let\` só quando precisar reatribuir.\n\n**Checar tipo é traiçoeiro**:\n- \`typeof\` funciona pra primitivos mas retorna "object" pra null E arrays E objetos.\n- \`Array.isArray(x)\` é o jeito certo de detectar array.\n- Pra objeto puro: \`typeof x === 'object' && x !== null && !Array.isArray(x)\`.\n\n**Verdadeiro/falso** — JS tem seis valores "falsy": \`false\`, \`0\`, \`""\` (string vazia), \`null\`, \`undefined\`, \`NaN\`. Tudo o mais é truthy — incluindo array vazio \`[]\` e objeto vazio \`{}\` (pega muita gente).\n\n**== vs ===**: \`==\` converte tipo (\`"5" == 5\` é true). \`===\` compara estrito (\`"5" === 5\` é false). **Sempre usa \`===\`** a menos que tenha motivo específico — \`==\` causa bugs silenciosos que demoram horas pra achar.\n\n**Optional chaining (\`?.\`)** e **nullish coalescing (\`??\`)** são salva-vidas modernos. \`user?.profile?.name\` retorna undefined se qualquer elo for null/undefined — em vez de crashar. \`val ?? padrao\` retorna o padrão SÓ se val for null/undefined (não 0 ou "", diferente do \`||\`).\n\n**JSON** — JavaScript Object Notation. \`JSON.stringify(obj)\` converte pra string. \`JSON.parse(str)\` converte de volta. Os dois podem dar erro — envolve em try/catch quando a entrada não for confiável.`,
      realWorldExample: 'Quando você abre uma página do anime no Crunchyroll e o título do episódio às vezes não aparece, é porque o app puxou um objeto onde "episode.title" tava null. Usar safeGet(episode, "title", "Sem título") protege todo componente lá embaixo de crashar quando algum campo opcional vier vazio.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Quem é Truthy?',
        question: 'Qual dessas opções é TRUTHY em JavaScript?',
        options: [
          { text: '0', feedback: '✗ 0 é falsy.' },
          { text: '""', feedback: '✗ String vazia é falsy.' },
          { text: '[]', feedback: '✓ Acertou! Array vazio é truthy — só os seis valores falsy específicos viram false.', correct: true },
          { text: 'null', feedback: '✗ null é falsy.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Detecta Array com Segurança',
        description: 'Coloca esses checks na ordem certa pra escrever um parseType seguro (mais específico primeiro).',
        items: [
          'Checa Array.isArray(val)',
          'Checa val === null',
          'Cai pro typeof val',
          'Retorna a string do tipo'
        ],
        correctOrder: [1, 0, 2, 3],
        feedback: 'Checa null primeiro (typeof null é "object"), depois Array.isArray (typeof [] também é "object"), aí typeof pra tudo o resto.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Optional Chaining',
        instructions: 'O que esse código imprime?',
        code: `const user = { profile: null };
console.log(user?.profile?.name ?? 'visitante');`,
        question: 'O que aparece no console?',
        options: [
          { text: 'TypeError', feedback: '✗ Sem erro — optional chaining protege de null/undefined.' },
          { text: 'null', feedback: '✗ O ?? cai pro fallback quando é null.' },
          { text: '"visitante"', feedback: '✓ Mandou bem! profile é null, então ?.name vira undefined, e ?? "visitante" retorna "visitante".', correct: true },
          { text: 'undefined', feedback: '✗ ?? converte null/undefined pro fallback.' }
        ],
        feedback: 'Optional chaining (?.) + nullish coalescing (??) é O padrão moderno pra acessar propriedades com segurança.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'getType',
        instructions: [
          'Escreve getType(val) que retorna o tipo como string.',
          'Retorna "null" pra null, "array" pra arrays, senão o typeof.',
          'getType(null) → "null", getType([1,2]) → "array", getType("oi") → "string"'
        ],
        sampleCode: `function getType(val) {
  // TODO
}`,
        solution: `function getType(val) {
  if (val === null) return 'null';
  if (Array.isArray(val)) return 'array';
  return typeof val;
}`,
        tests: [
          { input: 'getType(null)', expected: 'null', desc: 'null retorna "null"' },
          { input: 'getType([1,2])', expected: 'array', desc: 'array retorna "array"' },
          { input: 'getType("oi")', expected: 'string', desc: 'string retorna "string"' },
          { input: 'getType(42)', expected: 'number', desc: 'number retorna "number"' },
          { input: 'getType({})', expected: 'object', desc: 'object retorna "object"' }
        ],
        hints: [
          'Checa null primeiro (typeof null é "object" — a esquisitice famosa).',
          'Depois Array.isArray (typeof [] também é "object").',
          'No fim, cai pro typeof.'
        ]
      },
      {
        level: 2,
        title: 'safeGet',
        instructions: [
          'Escreve safeGet(obj, path, fallback) que acessa propriedades aninhadas com segurança.',
          'path é uma string com pontos tipo "a.b.c".',
          'Retorna o valor no path, ou fallback se algum elo faltar.',
          'safeGet({a:{b:1}}, "a.b", 0) → 1; safeGet({}, "a.b", 99) → 99'
        ],
        sampleCode: `function safeGet(obj, path, fallback) {
  // TODO
}`,
        solution: `function safeGet(obj, path, fallback) {
  const keys = path.split('.');
  let val = obj;
  for (const key of keys) {
    if (val === null || val === undefined) return fallback;
    val = val[key];
  }
  return val !== undefined ? val : fallback;
}`,
        tests: [
          { input: 'safeGet({a:{b:1}}, "a.b", 0)', expected: 1, desc: 'acesso aninhado' },
          { input: 'safeGet({}, "a.b", 99)', expected: 99, desc: 'path ausente retorna fallback' },
          { input: 'safeGet({a:{b:{c:"oi"}}}, "a.b.c", "")', expected: 'oi', desc: 'bem aninhado' },
          { input: 'safeGet({a:null}, "a.b", "padrao")', expected: 'padrao', desc: 'null no caminho' }
        ],
        hints: [
          'Divide o path pelo ".".',
          'Percorre o objeto chave por chave.',
          'Se bater em null ou undefined, retorna o fallback na hora.'
        ]
      },
      {
        level: 3,
        title: 'parseNumber',
        instructions: [
          'Escreve parseNumber(val) que converte val pra número, ou retorna NaN se falhar.',
          'parseNumber("42") → 42, parseNumber("abc") → NaN, parseNumber(null) → NaN',
          'Dica: Number(val) é um bom começo.'
        ],
        sampleCode: `function parseNumber(val) {
  // TODO
}`,
        solution: `function parseNumber(val) {
  if (val === null || val === undefined || val === '') return NaN;
  const n = Number(val);
  return n;
}`,
        tests: [
          { input: 'parseNumber("42")', expected: 42, desc: 'string numérica' },
          { input: 'parseNumber(42)', expected: 42, desc: 'já é número' },
          { input: 'parseNumber("3.14")', expected: 3.14, desc: 'decimal' },
          { input: 'Number.isNaN(parseNumber("abc"))', expected: true, desc: 'não-numérico retorna NaN' },
          { input: 'Number.isNaN(parseNumber(null))', expected: true, desc: 'null retorna NaN' }
        ],
        hints: [
          'Number("") é 0 no JS — protege da string vazia explicitamente.',
          'Number(null) é 0 — protege de null também.',
          'Pra tudo o resto, Number(val) faz a coisa certa ou retorna NaN.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Desafio Final: Tipos JS',
      steps: [
        {
          type: 'coding',
          title: 'isEmpty',
          instructions: 'Escreve isEmpty(val) que retorna true se val for null, undefined, "", [], ou {}. Caso contrário false.',
          sampleCode: `function isEmpty(val) {
  // TODO
}`,
          solution: `function isEmpty(val) {
  if (val === null || val === undefined) return true;
  if (val === '') return true;
  if (Array.isArray(val) && val.length === 0) return true;
  if (typeof val === 'object' && Object.keys(val).length === 0) return true;
  return false;
}`,
          tests: [
            { input: 'isEmpty(null)', expected: true, desc: 'null é vazio' },
            { input: 'isEmpty("")', expected: true, desc: 'string vazia é vazio' },
            { input: 'isEmpty([])', expected: true, desc: 'array vazio é vazio' },
            { input: 'isEmpty({})', expected: true, desc: 'objeto vazio é vazio' },
            { input: 'isEmpty([1])', expected: false, desc: 'array com item' },
            { input: 'isEmpty(0)', expected: false, desc: '0 NÃO é vazio' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Quando usar == em vez de === em código de produção?',
          options: [
            { text: 'Sempre — é mais flexível', feedback: '✗ == causa bugs silenciosos. Evita.' },
            { text: 'Só pra comparar com null e pegar null e undefined juntos', feedback: '✓ Acertou! `x == null` é o único uso idiomático — retorna true pra null e undefined.', correct: true },
            { text: 'Pra comparar string com número', feedback: '✗ Isso é exatamente quando == é perigoso.' },
            { text: 'Nunca — não tem motivo pra usar ==', feedback: '✗ Quase — o check de null é o único caso aceitável pra alguns guias.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'No meu projeto com React, quando vale a pena usar TypeScript? É muito complicado pra um iniciante?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) front-end. Use exemplos do TikTok, Instagram, YouTube, Discord, Roblox. Conecte HTML/CSS/JS ao que eles veem nas redes sociais e games. Seja direto, com humor, sem ser infantil.'
    },
    resources: [
      { title: 'CS50 Semana 8 — JavaScript', url: 'https://cs50.harvard.edu/x/2024/weeks/8/' },
      { title: 'MDN: Tipos de dados em JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures' }
    ]
  },

  // ─── fw-6 ───────────────────────────────────────────────────────────────────
  {
    id: 'fw-6-dom',
    title: 'Manipulação do DOM e Eventos',
    week: 8,
    xp: 70,
    difficulty: 'Beginner',
    priority: '⭐',
    hook: 'Quando você clica no coração 💜 no TikTok e ele fica vermelho na hora, é o DOM mudando. React esconde isso — mas pra entender bugs, precisa saber o que é o DOM.',

    assess: {
      type: 'multipleChoice',
      question: 'Quando você clica num botão dentro de uma div, em que ordem os listeners disparam por padrão?',
      options: [
        { text: 'Botão primeiro, depois div (subindo / bubbling)', feedback: '✓ Acertou! Eventos sobem do alvo pra fora, a menos que você use a fase de captura.', correct: true },
        { text: 'Div primeiro, depois botão (descendo / capture)', feedback: '✗ Essa é a fase de captura, que é opcional.' },
        { text: 'Disparam ao mesmo tempo', feedback: '✗ Listeners disparam em sequência, não em paralelo.' },
        { text: 'Só o botão — a div não dispara', feedback: '✗ A div dispara sim, pelo bubbling.' }
      ]
    },

    learn: {
      hook: 'O DOM é só uma árvore. Quando você enxerga seu HTML como uma hierarquia de nós, fazer query, mudar e escutar eventos fica óbvio.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/8/',
        title: 'CS50 Semana 8: O DOM',
        duration: '50 min',
        yourTakeaway: 'Foca em como a árvore do DOM é construída do HTML e como o JavaScript faz query e modifica.'
      },
      conceptText: `O **DOM (Document Object Model)** é uma árvore de nós que o navegador monta do seu HTML. Cada tag vira um nó, cada atributo vira uma propriedade, cada texto vira um nó de texto.\n\n**Query no DOM** — seletores:\n- \`document.querySelector(".foo")\` — primeiro elemento que bate com o seletor CSS.\n- \`document.querySelectorAll(".foo")\` — NodeList com todos.\n- \`document.getElementById("foo")\` — jeito mais rápido de pegar um por id.\n\n**Seletores** espelham CSS:\n- \`#myId\` bate com id="myId"\n- \`.myClass\` bate com class="myClass"\n- \`div\` bate com todas as divs\n- \`div.foo#bar\` combina — div com classe foo e id bar\n\n**Mudando o DOM**:\n- \`el.textContent = "..."\` — define texto com segurança (escapa HTML)\n- \`el.innerHTML = "..."\` — interpreta como HTML (risco de XSS com input do usuário!)\n- \`el.classList.add("foo")\` / \`.remove()\` / \`.toggle()\` — manipula classes\n- \`el.setAttribute("data-id", "5")\` / \`.getAttribute("data-id")\` — trabalha com atributos\n\n**Eventos** — escutando interação:\n\n\`\`\`js\nbutton.addEventListener("click", (e) => {\n  console.log(e.target);    // o elemento clicado de verdade\n  console.log(e.currentTarget); // o elemento que tem o listener\n});\n\`\`\`\n\n**Fluxo de evento tem três fases**:\n1. **Captura** — evento viaja da window até o alvo (opt-in com o terceiro argumento: \`addEventListener("click", fn, true)\`).\n2. **Alvo** — evento chega no elemento clicado.\n3. **Bubble** — evento sobe do alvo até a window (padrão).\n\n**Delegação de eventos** — em vez de 100 listeners em 100 itens, coloca UM listener no pai <ul> e usa \`e.target\` pra descobrir qual filho foi clicado. Ganho de performance enorme em listas longas.\n\n**preventDefault() e stopPropagation()** são os dois métodos chave. \`preventDefault\` impede a ação padrão do navegador (ex.: envio de formulário). \`stopPropagation\` impede o evento de continuar subindo.\n\n**Por que isso importa com React**: React tem virtual DOM e eventos sintéticos, mas o modelo é igual. Quando você escreve \`onClick={handler}\` no JSX, React anexa um único listener na raiz e usa delegação. Saber o DOM de verdade é o que te deixa debugar refs, foco e edge cases.`,
      realWorldExample: 'Quando você abre o Discord e clica em qualquer mensagem da lista pra reagir com emoji, o app não tem 1000 listeners (um por mensagem). Tem um listener no container da lista e descobre qual mensagem foi clicada pelo e.target. Isso é delegação de eventos — e o React faz isso pra você automaticamente.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Lê o Seletor',
        question: 'O que `document.querySelector("article.post:first-child h2")` retorna?',
        options: [
          { text: 'O primeiro <article> com classe "post"', feedback: '✗ Não é o article — relê o seletor.' },
          { text: 'O primeiro h2 dentro de qualquer article.post que seja first-child', feedback: '✓ Mandou bem! O seletor encadeia: acha article.post que seja first-child, depois o h2 dentro.', correct: true },
          { text: 'Todos os h2 da página', feedback: '✗ O seletor é bem mais específico.' },
          { text: 'Uma lista com todos os matches', feedback: '✗ querySelector retorna o PRIMEIRO — querySelectorAll retorna lista.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Monta um Event Listener',
        description: 'Coloca esses passos pra anexar um handler de clique num botão.',
        items: [
          'Dentro do handler, faz a ação',
          'Faz query do botão: const btn = document.querySelector("#submit")',
          'Anexa: btn.addEventListener("click", handler)',
          'Define o handler: function handler(e) {',
          'Chama e.preventDefault() se for formulário'
        ],
        correctOrder: [1, 3, 4, 0, 2],
        feedback: 'Query → define handler → preventDefault se precisar → faz a ação → anexa o listener por último pra não disparar no início.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Bubbling',
        instructions: 'O que isso imprime quando você clica no span interno?',
        code: `// <div id="outer"><span id="inner">clica</span></div>
document.getElementById('outer').addEventListener('click', () => console.log('outer'));
document.getElementById('inner').addEventListener('click', () => console.log('inner'));
// clica no span`,
        question: 'O que aparece no console?',
        options: [
          { text: 'Só "inner"', feedback: '✗ Os dois disparam — o evento sobe de inner pra outer.' },
          { text: 'Só "outer"', feedback: '✗ Inner dispara primeiro, é o alvo.' },
          { text: '"inner" depois "outer"', feedback: '✓ Acertou! Evento chega no alvo primeiro, depois sobe pelos ancestrais.', correct: true },
          { text: '"outer" depois "inner"', feedback: '✗ Isso seria a fase de captura, que é opcional.' }
        ],
        feedback: 'O fluxo padrão é alvo → bubble. Adicionar stopPropagation() no handler interno impede o outer de disparar.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'parseSelector',
        instructions: [
          'Escreve parseSelector(sel) que parseia um seletor CSS simples em {tag, id, classes}.',
          'parseSelector("#myId.foo.bar") → {tag:"", id:"myId", classes:["foo","bar"]}',
          'parseSelector("div#x") → {tag:"div", id:"x", classes:[]}',
          'parseSelector(".only") → {tag:"", id:"", classes:["only"]}'
        ],
        sampleCode: `function parseSelector(sel) {
  // TODO
}`,
        solution: `function parseSelector(sel) {
  const result = { tag: '', id: '', classes: [] };
  const tagMatch = sel.match(/^[a-zA-Z][a-zA-Z0-9]*/);
  if (tagMatch) result.tag = tagMatch[0];
  const idMatch = sel.match(/#([a-zA-Z][\\w-]*)/);
  if (idMatch) result.id = idMatch[1];
  const classMatches = sel.match(/\\.([a-zA-Z][\\w-]*)/g);
  if (classMatches) result.classes = classMatches.map(c => c.slice(1));
  return result;
}`,
        tests: [
          { input: 'parseSelector("#myId.foo.bar")', expected: { tag: '', id: 'myId', classes: ['foo','bar'] }, desc: 'id com duas classes' },
          { input: 'parseSelector("div#x")', expected: { tag: 'div', id: 'x', classes: [] }, desc: 'tag com id' },
          { input: 'parseSelector(".only")', expected: { tag: '', id: '', classes: ['only'] }, desc: 'só classe' },
          { input: 'parseSelector("article")', expected: { tag: 'article', id: '', classes: [] }, desc: 'só tag' }
        ],
        hints: [
          'Extrai a tag inicial com regex (só letras).',
          'Acha #id com /#(\\w+)/.',
          'Acha todas as .classes com /\\.(\\w+)/g e tira os pontos.'
        ]
      },
      {
        level: 2,
        title: 'matchesSelector',
        instructions: [
          'Escreve matchesSelector(el, sel) que checa se um objeto {tag, id, classes} bate com um seletor.',
          'sel é string tipo "div#x.foo". el é {tag, id, classes}.',
          'Usa parseSelector internamente (assume que existe).',
          'matchesSelector({tag:"div",id:"x",classes:["foo"]}, "div#x") → true'
        ],
        sampleCode: `function matchesSelector(el, sel) {
  // TODO — assume que parseSelector existe
}`,
        solution: `function matchesSelector(el, sel) {
  function parseSelector(s) {
    const result = { tag: '', id: '', classes: [] };
    const tagMatch = s.match(/^[a-zA-Z][a-zA-Z0-9]*/);
    if (tagMatch) result.tag = tagMatch[0];
    const idMatch = s.match(/#([a-zA-Z][\\w-]*)/);
    if (idMatch) result.id = idMatch[1];
    const classMatches = s.match(/\\.([a-zA-Z][\\w-]*)/g);
    if (classMatches) result.classes = classMatches.map(c => c.slice(1));
    return result;
  }
  const parsed = parseSelector(sel);
  if (parsed.tag && parsed.tag !== el.tag) return false;
  if (parsed.id && parsed.id !== el.id) return false;
  for (const cls of parsed.classes) {
    if (!el.classes.includes(cls)) return false;
  }
  return true;
}`,
        tests: [
          { input: 'matchesSelector({tag:"div",id:"x",classes:["foo"]}, "div#x")', expected: true, desc: 'bate tag e id' },
          { input: 'matchesSelector({tag:"span",id:"",classes:["foo","bar"]}, ".foo")', expected: true, desc: 'bate classe' },
          { input: 'matchesSelector({tag:"div",id:"x",classes:[]}, "span")', expected: false, desc: 'tag não bate' },
          { input: 'matchesSelector({tag:"div",id:"a",classes:["foo"]}, "div.bar")', expected: false, desc: 'classe faltando' }
        ],
        hints: [
          'Parseia o seletor primeiro.',
          'Se a tag estiver no seletor, tem que bater.',
          'Mesmo pra id. Pra classes, toda classe no seletor tem que existir no elemento.'
        ]
      },
      {
        level: 3,
        title: 'buildEventPath',
        instructions: [
          'Escreve buildEventPath(target, ancestor) que simula um caminho de bubbling.',
          'target e ancestor são objetos com propriedade .parent.',
          'Sobe de target via .parent até alcançar (e incluir) ancestor.',
          'Retorna o array de elementos em ordem de bubble (target primeiro).'
        ],
        sampleCode: `function buildEventPath(target, ancestor) {
  // TODO — sobe pelos .parent
}`,
        solution: `function buildEventPath(target, ancestor) {
  const path = [];
  let cur = target;
  while (cur) {
    path.push(cur);
    if (cur === ancestor) break;
    cur = cur.parent;
  }
  return path;
}`,
        tests: [
          { input: '(function(){ const a={name:"a"}; const b={name:"b",parent:a}; const c={name:"c",parent:b}; return buildEventPath(c, a).map(x=>x.name); })()', expected: ['c','b','a'], desc: 'sobe pela árvore' },
          { input: '(function(){ const a={name:"a"}; return buildEventPath(a, a).map(x=>x.name); })()', expected: ['a'], desc: 'target é o ancestor' }
        ],
        hints: [
          'Começa no target e sobe via .parent.',
          'Coloca cada nó no array path.',
          'Para quando alcançar o ancestor (incluindo ele).'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Desafio Final: DOM e Eventos',
      steps: [
        {
          type: 'coding',
          title: 'classListToggle',
          instructions: 'Escreve classListToggle(classes, name) que retorna um novo array com name removido se existir, ou adicionado se faltar. Exemplo: classListToggle(["foo","bar"], "foo") → ["bar"]; classListToggle(["foo"], "bar") → ["foo","bar"].',
          sampleCode: `function classListToggle(classes, name) {
  // TODO
}`,
          solution: `function classListToggle(classes, name) {
  if (classes.includes(name)) {
    return classes.filter(c => c !== name);
  }
  return [...classes, name];
}`,
          tests: [
            { input: 'classListToggle(["foo","bar"], "foo")', expected: ['bar'], desc: 'remove existente' },
            { input: 'classListToggle(["foo"], "bar")', expected: ['foo','bar'], desc: 'adiciona faltante' },
            { input: 'classListToggle([], "new")', expected: ['new'], desc: 'adiciona no vazio' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Você tem uma lista de 500 itens e cada um precisa ser clicável. Qual o melhor padrão?',
          options: [
            { text: 'Anexa 500 listeners individuais', feedback: '✗ Funciona mas é desperdício — e quebra com itens adicionados dinamicamente.' },
            { text: 'Delegação de eventos: um listener no pai, usa e.target pra identificar qual item', feedback: '✓ Mandou bem! Um listener, escala infinito, funciona com itens dinâmicos.', correct: true },
            { text: 'Usa onclick inline no HTML', feedback: '✗ Handlers inline misturam responsabilidades e são difíceis de manter.' },
            { text: 'Loop com setInterval pra checar cliques', feedback: '✗ Polling — ferramenta errada totalmente.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Numa lista de mensagens tipo Discord no React, como o React lida com eventos do DOM por baixo dos panos, e quando isso importa pra mim?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) front-end. Use exemplos do TikTok, Instagram, YouTube, Discord, Roblox. Conecte HTML/CSS/JS ao que eles veem nas redes sociais e games. Seja direto, com humor, sem ser infantil.'
    },
    resources: [
      { title: 'CS50 Semana 8 — DOM', url: 'https://cs50.harvard.edu/x/2024/weeks/8/' },
      { title: 'MDN: Introdução a eventos', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events' }
    ]
  },

  // ─── fw-7 ───────────────────────────────────────────────────────────────────
  {
    id: 'fw-7-async',
    title: 'JavaScript Async e Fetch API',
    week: 8,
    xp: 80,
    difficulty: 'Intermediate',
    priority: '⭐⭐',
    hook: 'Por que o feed do TikTok não trava esperando o vídeo carregar? Async! Toda chamada de API, toda busca de dados — tudo roda no mesmo modelo.',

    assess: {
      type: 'multipleChoice',
      question: 'O que uma função async sempre retorna?',
      options: [
        { text: 'O valor que você retornar dentro dela', feedback: '✗ Quase — mas ela envolve o valor de retorno.' },
        { text: 'Uma Promise', feedback: '✓ Acertou! Funções async sempre retornam Promise, mesmo se você retornar um valor normal.', correct: true },
        { text: 'Uma função callback', feedback: '✗ Callback é um padrão async diferente.' },
        { text: 'undefined', feedback: '✗ Só se você nunca retornar nada — e ainda assim vem envolvido numa Promise.' }
      ]
    },

    learn: {
      hook: 'JavaScript é single-thread — só faz uma coisa por vez. Async é o truque que deixa ele ESPERAR coisas (internet, disco, usuário) sem travar a página inteira.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/8/',
        title: 'CS50 Semana 8: JavaScript Async',
        duration: '45 min',
        yourTakeaway: 'Foca em como o event loop agenda trabalho async — esse modelo faz Promises e async/await fazerem sentido.'
      },
      conceptText: `JavaScript roda numa **única thread** mas usa um **event loop** pra lidar com operações async sem travar. Quando você faz uma requisição de rede, a engine entrega o trabalho pro navegador/SO e continua executando outro código. Quando a resposta chega, o callback é enfileirado.\n\n**Promises** são objetos que representam o eventual sucesso (ou falha) de uma operação async. Uma Promise tá em um de três estados: **pending** (pendente), **fulfilled** (cumprida, com valor) ou **rejected** (rejeitada, com erro).\n\nTrês jeitos de lidar com resultados async:\n\n1. **Callbacks** (jeito antigo) — passa uma função pra chamar quando terminar. Vira "callback hell" com aninhamento profundo.\n2. **.then() / .catch()** — métodos de Promise. \`fetch(url).then(r => r.json()).then(data => usa(data)).catch(err => trata(err))\`.\n3. **async / await** (moderno) — escreve código async que PARECE síncrono:\n\n\`\`\`js\nasync function loadPost(id) {\n  try {\n    const res = await fetch(\`/api/posts/\${id}\`);\n    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error(err);\n    return null;\n  }\n}\n\`\`\`\n\n**Fetch API** é o jeito moderno de fazer HTTP no navegador:\n\n\`\`\`js\nfetch("/api/posts", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ title: "Oi" })\n})\n  .then(res => res.json())\n  .then(data => console.log(data));\n\`\`\`\n\n**Pegadinhas críticas**:\n- \`fetch\` NÃO rejeita em erros HTTP (404, 500). Só rejeita em falha de rede. SEMPRE checa \`res.ok\` ou \`res.status\` manualmente.\n- \`res.json()\` também é async — retorna Promise que resolve com o body parseado.\n- O body precisa ser stringified pra requests JSON.\n\n**Códigos HTTP**:\n- 2xx — sucesso (200 OK, 201 Created, 204 No Content)\n- 3xx — redirect (301, 302)\n- 4xx — erro do cliente (400 Bad Request, 401 Unauthorized, 404 Not Found)\n- 5xx — erro do servidor (500 Internal Server Error, 503 Service Unavailable)\n\n**Promise.all** roda várias promises em paralelo e espera todas terminarem. **Promise.race** retorna a primeira que terminar. **Promise.allSettled** espera todas e retorna cada resultado individualmente (sem rejeitar antes). Usa pra otimizar fluxos com várias requests.`,
      realWorldExample: 'Quando você abre o YouTube, o app não espera o vídeo principal carregar pra mostrar os comentários e recomendações. Tudo é puxado em paralelo com Promise.all — e cada parte aparece quando fica pronta. Sem async, você ficaria 10 segundos olhando pra tela branca.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Pegadinha do fetch',
        question: 'Você chama `fetch("/api/posts/999")` e o servidor retorna 404. O que acontece?',
        options: [
          { text: 'fetch rejeita com erro', feedback: '✗ Surpreendentemente não — fetch só rejeita em falha de REDE, não em erro HTTP.' },
          { text: 'fetch resolve com sucesso retornando Response com ok: false e status: 404', feedback: '✓ Acertou! Você tem que checar res.ok ou res.status manualmente — fetch trata erros HTTP como respostas bem-sucedidas.', correct: true },
          { text: 'fetch retorna null', feedback: '✗ fetch retorna um objeto Response.' },
          { text: 'O navegador mostra um alerta', feedback: '✗ Sem alerta automático.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Ordena um POST async',
        description: 'Coloca esses passos pra fazer um POST seguro com tratamento de erro.',
        items: [
          'Parseia res.json() e retorna o dado',
          'Checa se res.ok — se não, dá throw',
          'Envolve tudo em try/catch',
          'Chama fetch com method, headers, body',
          'Aguarda a resposta'
        ],
        correctOrder: [2, 3, 4, 1, 0],
        feedback: 'Envolve em try/catch primeiro, depois fetch, await, checa ok, parseia json. Erros vão pro catch.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Paralelo vs. Serial',
        instructions: 'Qual abordagem é mais rápida pra dados de três APIs independentes?',
        code: `// opção A — serial:
const a = await fetch('/api/a').then(r => r.json());
const b = await fetch('/api/b').then(r => r.json());
const c = await fetch('/api/c').then(r => r.json());

// opção B — paralelo:
const [a, b, c] = await Promise.all([
  fetch('/api/a').then(r => r.json()),
  fetch('/api/b').then(r => r.json()),
  fetch('/api/c').then(r => r.json())
]);`,
        question: 'Qual é mais rápida?',
        options: [
          { text: 'A — serial é mais seguro', feedback: '✗ Mais lento sem nenhum ganho de segurança em chamadas independentes.' },
          { text: 'B — Promise.all roda os três em paralelo, tempo total = call mais lenta', feedback: '✓ Mandou bem! Requests independentes devem disparar em paralelo. Tempo é max(a, b, c), não a + b + c.', correct: true },
          { text: 'Os dois são iguais', feedback: '✗ Não são — serial espera cada um antes do próximo.' },
          { text: 'A — Promise.all tem overhead', feedback: '✗ Overhead desprezível. Os ganhos são gigantes pra APIs lentas.' }
        ],
        feedback: 'Padrão: Promise.all pra requests independentes. Só vai serial quando call posterior depende do resultado anterior.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'parseHttpStatus',
        instructions: [
          'Escreve parseHttpStatus(code) que retorna {ok, message} pra códigos HTTP comuns.',
          '200 → {ok:true, message:"OK"}',
          '404 → {ok:false, message:"Not Found"}',
          '500 → {ok:false, message:"Internal Server Error"}',
          'Códigos desconhecidos → {ok: code >= 200 && code < 300, message:"Unknown"}'
        ],
        sampleCode: `function parseHttpStatus(code) {
  // TODO
}`,
        solution: `function parseHttpStatus(code) {
  const messages = {
    200: 'OK',
    201: 'Created',
    204: 'No Content',
    301: 'Moved Permanently',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
    503: 'Service Unavailable'
  };
  return {
    ok: code >= 200 && code < 300,
    message: messages[code] || 'Unknown'
  };
}`,
        tests: [
          { input: 'parseHttpStatus(200)', expected: { ok: true, message: 'OK' }, desc: '200 OK' },
          { input: 'parseHttpStatus(404)', expected: { ok: false, message: 'Not Found' }, desc: '404 Not Found' },
          { input: 'parseHttpStatus(500)', expected: { ok: false, message: 'Internal Server Error' }, desc: '500 ISE' },
          { input: 'parseHttpStatus(201)', expected: { ok: true, message: 'Created' }, desc: '201 Created' }
        ],
        hints: [
          'Usa um objeto de lookup pras mensagens.',
          'ok é true pra códigos no intervalo 2xx.',
          'Cai pra "Unknown" pra códigos fora do mapa.'
        ]
      },
      {
        level: 2,
        title: 'buildFetchOptions',
        instructions: [
          'Escreve buildFetchOptions(method, body) que retorna o objeto de opções pro fetch().',
          'Se method for "GET" (ou sem body), omite body e Content-Type.',
          'Caso contrário, define Content-Type como application/json e stringifica o body.',
          'buildFetchOptions("POST", {name:"test"}) → {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({name:"test"})}'
        ],
        sampleCode: `function buildFetchOptions(method, body) {
  // TODO
}`,
        solution: `function buildFetchOptions(method, body) {
  if (method === 'GET' || body === undefined || body === null) {
    return { method };
  }
  return {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
}`,
        tests: [
          { input: 'buildFetchOptions("POST", {name:"test"})', expected: { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'test' }) }, desc: 'POST com body' },
          { input: 'buildFetchOptions("GET")', expected: { method: 'GET' }, desc: 'GET sem body' },
          { input: 'buildFetchOptions("PUT", {id:1})', expected: { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: 1 }) }, desc: 'PUT com body' }
        ],
        hints: [
          'Checa se é GET ou sem body — retorna só {method}.',
          'Senão define o content type JSON e stringifica o body.',
          'JSON.stringify é crítico — fetch não converte objeto pra você.'
        ]
      },
      {
        level: 3,
        title: 'handleApiError',
        instructions: [
          'Escreve handleApiError(status, body) que retorna uma string amigável de erro.',
          'Pra 401 → "Please sign in to continue"',
          'Pra 403 → "You do not have permission for this action"',
          'Pra 404 → "Resource not found"',
          'Pra 5xx → "Server error — try again later"',
          'Pra outros códigos → "Error: " + status'
        ],
        sampleCode: `function handleApiError(status, body) {
  // TODO
}`,
        solution: `function handleApiError(status, body) {
  if (status === 401) return 'Please sign in to continue';
  if (status === 403) return 'You do not have permission for this action';
  if (status === 404) return 'Resource not found';
  if (status >= 500) return 'Server error — try again later';
  return 'Error: ' + status;
}`,
        tests: [
          { input: 'handleApiError(401, null)', expected: 'Please sign in to continue', desc: '401 sign in' },
          { input: 'handleApiError(403, null)', expected: 'You do not have permission for this action', desc: '403 forbidden' },
          { input: 'handleApiError(404, null)', expected: 'Resource not found', desc: '404 not found' },
          { input: 'handleApiError(500, null)', expected: 'Server error — try again later', desc: '500 server' },
          { input: 'handleApiError(503, null)', expected: 'Server error — try again later', desc: '503 server' },
          { input: 'handleApiError(400, null)', expected: 'Error: 400', desc: '400 genérico' }
        ],
        hints: [
          'Checa códigos específicos primeiro (401, 403, 404).',
          'Depois um check de intervalo pra 5xx.',
          'Cai pra string genérica "Error: " + status.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Desafio Final: Async',
      steps: [
        {
          type: 'coding',
          title: 'shouldRetry',
          instructions: 'Escreve shouldRetry(status, attempt) que retorna true se a gente deve repetir um fetch falho. Repete só pra erros 5xx E se attempt < 3. Exemplo: shouldRetry(503, 1) → true; shouldRetry(404, 1) → false; shouldRetry(500, 3) → false.',
          sampleCode: `function shouldRetry(status, attempt) {
  // TODO
}`,
          solution: `function shouldRetry(status, attempt) {
  return status >= 500 && status < 600 && attempt < 3;
}`,
          tests: [
            { input: 'shouldRetry(503, 1)', expected: true, desc: '5xx, tentativa 1 → repete' },
            { input: 'shouldRetry(404, 1)', expected: false, desc: '404 nunca repete' },
            { input: 'shouldRetry(500, 3)', expected: false, desc: 'tentativa 3 → para' },
            { input: 'shouldRetry(500, 0)', expected: true, desc: 'primeira tentativa → repete' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Você precisa pegar um post e seus comentários. Os comentários precisam do post.author_id. Promise.all ou awaits seriais?',
          options: [
            { text: 'Promise.all — sempre paralelo', feedback: '✗ Não dá pra paralelizar quando call posterior depende do resultado anterior.' },
            { text: 'Serial — pega o post primeiro, depois comentários usando o author_id', feedback: '✓ Acertou! Comentários dependem do post, então rodam depois.', correct: true },
            { text: 'Qualquer um serve', feedback: '✗ Promise.all não teria o author_id quando a chamada de comentários começasse.' },
            { text: 'Usa cadeia de callbacks', feedback: '✗ async/await é o jeito moderno — mas a ordem importa.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Quando eu postar uma foto em várias redes sociais ao mesmo tempo, como faço pra não esperar uma terminar pra começar a outra?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) front-end. Use exemplos do TikTok, Instagram, YouTube, Discord, Roblox. Conecte HTML/CSS/JS ao que eles veem nas redes sociais e games. Seja direto, com humor, sem ser infantil.'
    },
    resources: [
      { title: 'CS50 Semana 8 — Async', url: 'https://cs50.harvard.edu/x/2024/weeks/8/' },
      { title: 'MDN: Usando Fetch', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch' }
    ]
  },

  // ─── fw-8 ───────────────────────────────────────────────────────────────────
  {
    id: 'fw-8-forms',
    title: 'Validação de Formulário e UX',
    week: 8,
    xp: 60,
    difficulty: 'Beginner',
    priority: '⭐',
    hook: 'Aquele "email inválido" que aparece quando você esquece o @ no cadastro do TikTok? É validação de formulário. Forms é onde o usuário encontra seu código.',

    assess: {
      type: 'multipleChoice',
      question: 'Quando validar um formulário no cliente E no servidor?',
      options: [
        { text: 'Só no cliente — é mais rápido', feedback: '✗ Validação cliente pode ser burlada (devtools, chamada direta na API) — validação servidor é obrigatória.' },
        { text: 'Só no servidor — é a fonte da verdade', feedback: '✗ Servidor é a fonte da verdade, mas validação cliente melhora muito a UX.' },
        { text: 'Os dois — cliente pra feedback instantâneo, servidor pra segurança', feedback: '✓ Acertou! Validação cliente é UX; validação servidor é segurança. Sempre os dois.', correct: true },
        { text: 'Nunca — formulários são simples demais pra precisar', feedback: '✗ Até formulário simples recebe entrada estranha — validação é obrigatória.' }
      ]
    },

    learn: {
      hook: 'Um formulário bom tem UX invisível: feedback instantâneo, erros claros, autofill que funciona, navegação por teclado que não quebra. Um formulário ruim faz o usuário desistir.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/8/',
        title: 'CS50 Semana 8: Formulários e Validação',
        duration: '30 min',
        yourTakeaway: 'Foca na relação entre tipos de input HTML5, validação do navegador e validação JS.'
      },
      conceptText: `**Formulários** são o jeito mais comum de entrada de dados na web. Um bom formulário:\n\n1. **Tem os tipos de input certos** — \`type="email"\`, \`type="number"\`, \`type="tel"\`, \`type="date"\` dão o teclado certo no celular e validação grátis do navegador.\n2. **Valida em tempo real** — mostra erros enquanto o usuário digita, não só no submit.\n3. **Usa labels claras** — sempre associa \`<label>\` ao input via \`for\` e \`id\`. Leitor de tela depende disso.\n4. **Submete direito** — desabilita o botão durante o envio; mostra sucesso ou erro depois.\n\n**Validação nativa HTML5**:\n- \`required\` — precisa ter valor\n- \`minlength\` / \`maxlength\` — limites de tamanho\n- \`min\` / \`max\` — limites numéricos/de data\n- \`pattern="regex"\` — precisa bater com regex\n- \`type="email"\` — precisa parecer email\n\nNavegador mostra tooltips de erro embutidos quando falha. Você pode estilizar, substituir ou sobrescrever com JS — mas é validação base de graça.\n\n**Validação JavaScript** roda em tempo real:\n\n\`\`\`js\nfunction validateEmail(email) {\n  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);\n}\n\`\`\`\n\nA regex acima checa: ao menos um char antes do @, um após o @, um após o ponto. Validação de email é famosa por ser difícil — RFC 5322 permite coisas esquisitas — mas essa regex pega 99% dos erros sem falso negativo.\n\n**Validação de senha** geralmente exige:\n- Tamanho mínimo (8+ chars)\n- Tipos misturados (maiúscula, minúscula, dígito, símbolo — mas cuidado: regras muito estritas levam a senhas ruins)\n- NÃO numa lista de senhas comuns\n\nRetorna info estruturada — \`{valid: false, errors: ["muito curta", "sem dígito"]}\` — pra UI mostrar feedback específico por campo.\n\n**Nota crítica de segurança**: **NUNCA confia só na validação cliente**. Usuário pode desligar JS, editar DOM, chamar API direto. Validação no servidor é a fronteira de segurança real. Validação cliente é só UX.\n\n**Acessibilidade**:\n- Todo input precisa de \`<label>\`.\n- Usa \`aria-invalid="true"\` e \`aria-describedby\` pra ligar mensagens de erro aos inputs.\n- Foca no primeiro campo inválido no submit.\n- Anuncia erros via \`role="alert"\` pro leitor de tela pegar.`,
      realWorldExample: 'Quando você cria conta no TikTok e digita email sem @, aparece "email inválido" antes mesmo de clicar em "criar". Isso é validação cliente — instantâneo. Mas o servidor TAMBÉM checa de novo, porque alguém poderia mandar dado falso por fora do app. Duas camadas, UX boa.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Tipo de Input Certo',
        question: 'Você precisa do usuário digitar telefone num formulário mobile. Qual tipo dá a melhor UX?',
        options: [
          { text: 'type="text"', feedback: '✗ Funciona mas mostra teclado normal com letras.' },
          { text: 'type="number"', feedback: '✗ Remove hífen e parênteses — ruim pra telefone formatado.' },
          { text: 'type="tel"', feedback: '✓ Acertou! tel abre o teclado numérico no celular e aceita caracteres de formatação.', correct: true },
          { text: 'type="email"', feedback: '✗ Teclado de email é diferente — tem @ e . em destaque.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Ordena o Fluxo de Submit',
        description: 'Coloca esses passos pra um fluxo limpo de submit.',
        items: [
          'Mostra UI de sucesso/erro com base na resposta',
          'No submit, previne o reload da página',
          'Envia pro servidor com fetch',
          'Valida todos os campos no cliente',
          'Desabilita o botão de submit pra evitar duplo envio'
        ],
        correctOrder: [1, 3, 4, 2, 0],
        feedback: 'preventDefault → valida → desabilita → envia → mostra resultado. Desabilitar previne duplo envio durante a chamada.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Regex de Email',
        instructions: 'O que essa regex de email checa?',
        code: `// regex: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
// quebra:
//   ^[^\\s@]+    um ou mais chars não-espaço não-@
//   @           @ literal
//   [^\\s@]+     mais chars não-espaço não-@
//   \\.          ponto literal
//   [^\\s@]+$    mais chars não-espaço não-@, fim
console.log('O que isso pega?');`,
        question: 'Qual dessas FALHARIA nessa regex?',
        options: [
          { text: 'test@example.com', feedback: '✗ Esse passa — tem todas as partes.' },
          { text: 'usuario.nome@kiver.org', feedback: '✗ Esse passa — pontos no nome local são permitidos.' },
          { text: 'naoeumemail', feedback: '✓ Mandou bem! Sem @ e sem ponto — falha na regex.', correct: true },
          { text: 'a@b.c', feedback: '✗ Tecnicamente passa na regex — tem todas as partes. Não é email real mas bate no padrão.' }
        ],
        feedback: 'Essa regex pega erros de digitação mas não impõe regras reais. Pra fluxos importantes, manda email de verificação.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'validateEmail',
        instructions: [
          'Escreve validateEmail(email) que retorna true se o email parecer válido, false senão.',
          'Usa a regex /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.',
          'validateEmail("test@example.com") → true; validateEmail("naoeumemail") → false'
        ],
        sampleCode: `function validateEmail(email) {
  // TODO
}`,
        solution: `function validateEmail(email) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}`,
        tests: [
          { input: 'validateEmail("test@example.com")', expected: true, desc: 'email padrão' },
          { input: 'validateEmail("naoeumemail")', expected: false, desc: 'sem @ sem ponto' },
          { input: 'validateEmail("user.name@coe.org")', expected: true, desc: 'ponto no nome local' },
          { input: 'validateEmail("missing@dot")', expected: false, desc: 'sem ponto após @' },
          { input: 'validateEmail("@example.com")', expected: false, desc: 'sem parte local' }
        ],
        hints: [
          'Usa regex.test(string) pra retornar boolean.',
          'A regex checa: chars, @, chars, ponto, chars.',
          'Em produção, valida também no servidor e confirma por email.'
        ]
      },
      {
        level: 2,
        title: 'validatePassword',
        instructions: [
          'Escreve validatePassword(pwd) que retorna {valid, errors[]}.',
          'Tamanho mínimo: 8 caracteres. Se for curta, errors deve incluir "too short".',
          'validatePassword("abc") → {valid:false, errors:["too short"]}',
          'validatePassword("Str0ng!pwd") → {valid:true, errors:[]}'
        ],
        sampleCode: `function validatePassword(pwd) {
  // TODO
}`,
        solution: `function validatePassword(pwd) {
  const errors = [];
  if (pwd.length < 8) errors.push('too short');
  return {
    valid: errors.length === 0,
    errors
  };
}`,
        tests: [
          { input: 'validatePassword("abc")', expected: { valid: false, errors: ['too short'] }, desc: 'curta demais' },
          { input: 'validatePassword("Str0ng!pwd")', expected: { valid: true, errors: [] }, desc: 'tamanho ok' },
          { input: 'validatePassword("12345678")', expected: { valid: true, errors: [] }, desc: 'exatamente 8' },
          { input: 'validatePassword("1234567")', expected: { valid: false, errors: ['too short'] }, desc: '7 chars' }
        ],
        hints: [
          'Começa com array errors vazio.',
          'Adiciona strings de erro específicas quando regra falha.',
          'valid é true se errors tá vazio.'
        ]
      },
      {
        level: 3,
        title: 'buildFieldError',
        instructions: [
          'Escreve buildFieldError(field, rule) que retorna uma string de erro amigável.',
          'Regras: "required" → "{field} is required", "tooShort" → "{field} is too short", "invalid" → "{field} is invalid".',
          'buildFieldError("Email", "required") → "Email is required"',
          'Capitaliza o nome do campo como dado (não transforma).'
        ],
        sampleCode: `function buildFieldError(field, rule) {
  // TODO
}`,
        solution: `function buildFieldError(field, rule) {
  const templates = {
    required: field + ' is required',
    tooShort: field + ' is too short',
    invalid: field + ' is invalid'
  };
  return templates[rule] || field + ' has an error';
}`,
        tests: [
          { input: 'buildFieldError("Email", "required")', expected: 'Email is required', desc: 'email obrigatório' },
          { input: 'buildFieldError("Password", "tooShort")', expected: 'Password is too short', desc: 'senha curta' },
          { input: 'buildFieldError("Username", "invalid")', expected: 'Username is invalid', desc: 'username inválido' },
          { input: 'buildFieldError("Name", "unknown")', expected: 'Name has an error', desc: 'fallback' }
        ],
        hints: [
          'Monta um objeto templates mapeando regras pra mensagens.',
          'Concatena field com o template.',
          'Cai pra mensagem genérica em regras desconhecidas.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Desafio Final: Formulários',
      steps: [
        {
          type: 'coding',
          title: 'validateForm',
          instructions: 'Escreve validateForm({email, password}) que retorna {valid, errors:{email?, password?}}. Valida email com regex e senha com mín 8. Exemplo: validateForm({email:"bad",password:"abc"}) → {valid:false, errors:{email:"invalid email", password:"too short"}}.',
          sampleCode: `function validateForm(data) {
  // TODO
}`,
          solution: `function validateForm(data) {
  const errors = {};
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(data.email)) {
    errors.email = 'invalid email';
  }
  if (!data.password || data.password.length < 8) {
    errors.password = 'too short';
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}`,
          tests: [
            { input: 'validateForm({email:"bad",password:"abc"})', expected: { valid: false, errors: { email: 'invalid email', password: 'too short' } }, desc: 'ambos inválidos' },
            { input: 'validateForm({email:"a@b.co",password:"longenough"})', expected: { valid: true, errors: {} }, desc: 'ambos válidos' },
            { input: 'validateForm({email:"a@b.co",password:"abc"})', expected: { valid: false, errors: { password: 'too short' } }, desc: 'só senha' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Por que validação no servidor é obrigatória, mesmo com validação cliente ótima?',
          options: [
            { text: 'Validação servidor é mais rápida', feedback: '✗ Servidor geralmente é mais lento (ida e volta de rede).' },
            { text: 'Validação cliente pode ser burlada — devtools, JS desligado, ou chamada direta à API', feedback: '✓ Acertou! Cliente é só UX. Servidor é a fronteira de segurança real.', correct: true },
            { text: 'Navegadores não suportam todos os tipos de input', feedback: '✗ Navegadores modernos suportam todos os tipos padrão.' },
            { text: 'É exigência da LGPD', feedback: '✗ LGPD é sobre proteção de dados, não validação.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Quero fazer um cadastro tipo o do Discord. O que valido no front e o que valido no back?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) front-end. Use exemplos do TikTok, Instagram, YouTube, Discord, Roblox. Conecte HTML/CSS/JS ao que eles veem nas redes sociais e games. Seja direto, com humor, sem ser infantil.'
    },
    resources: [
      { title: 'CS50 Semana 8 — Formulários', url: 'https://cs50.harvard.edu/x/2024/weeks/8/' },
      { title: 'MDN: Validação de formulário no cliente', url: 'https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation' }
    ]
  },

  // ─── fw-9 ───────────────────────────────────────────────────────────────────
  {
    id: 'fw-9-react-thinking',
    title: 'Pensando em React',
    week: 8,
    xp: 70,
    difficulty: 'Intermediate',
    priority: '⭐',
    hook: 'Pensa numa story do Instagram: cada uma é igual mas com conteúdo diferente. Isso é um "componente" em React. Quando você sacar isso, hooks param de parecer mágica.',

    assess: {
      type: 'multipleChoice',
      question: 'Qual o modelo mental certo pra um componente React?',
      options: [
        { text: 'Um objeto com métodos que mudam o DOM', feedback: '✗ Isso é o mundo de classes — React moderno pensa diferente.' },
        { text: 'Uma função que recebe props e retorna UI, re-executada quando o estado muda', feedback: '✓ Mandou bem! Componente = função, props = argumentos, estado = memória, render = chamar de novo.', correct: true },
        { text: 'Um template que o navegador compila pra HTML', feedback: '✗ JSX compila pra chamadas de função, não templates.' },
        { text: 'Um elemento HTML customizado com shadow DOM', feedback: '✗ Isso é Web Components — outra coisa.' }
      ]
    },

    learn: {
      hook: 'React não é mágica. É um framework de função-pura-do-estado: você descreve como a UI deve ficar pra um estado, e o React resolve as mudanças no DOM. O modelo mental é tudo.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/8/',
        title: 'CS50 Semana 8: SPAs e React',
        duration: '1 hora',
        yourTakeaway: 'Presta atenção em como o React substitui mutação imperativa do DOM por um modelo declarativo de função.'
      },
      conceptText: `O modelo mental do React em quatro palavras: **componente, props, estado, render**.\n\n**Componente = função**. Um componente é uma função JavaScript que retorna JSX (que vira uma descrição da UI):\n\n\`\`\`jsx\nfunction Button({ label, onClick }) {\n  return <button onClick={onClick}>{label}</button>;\n}\n\`\`\`\n\n**Props = argumentos**. Props são entradas. Fluem PRA BAIXO de pai pra filho. Um componente NÃO pode modificar suas próprias props — são read-only.\n\n**Estado = memória**. Estado é memória por-componente que persiste entre renders. \`useState\` te dá um valor e um setter. Chamar o setter dispara re-render.\n\n\`\`\`jsx\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}\n\`\`\`\n\n**Render = chamar a função de novo**. Quando estado ou props mudam, React chama a função do componente de novo com os valores novos. A função retorna JSX novo. React compara as árvores antiga e nova e atualiza só os nós do DOM que mudaram.\n\n**Regras chave**:\n1. **Render puro** — com mesmas props e estado, componente deve retornar a mesma UI. Side effects vão pro \`useEffect\`.\n2. **Atualizações imutáveis** — nunca muta estado direto (\`state.count++\`). Sempre cria valor novo (\`setCount(count + 1)\`).\n3. **Keys em listas** — cada filho numa lista mapeada precisa de \`key\` único. React usa keys pra rastrear o que moveu, foi adicionado ou removido.\n4. **Reducers pra estado complexo** — quando estado tem muitos campos ou transições complexas, \`useReducer\` (state, action) → newState dá um padrão mais limpo que cinco \`useState\`.\n\n**Ciclo de vida no React moderno**:\n- Mount → useEffect com deps vazias dispara uma vez.\n- Update (state/props muda) → componente re-renderiza; useEffect dispara se deps mudaram.\n- Unmount → função de cleanup do useEffect dispara.\n\n**Por que isso importa**: quando um dado realtime chega, seu componente re-renderiza. Quando usuário digita num input, seu componente re-renderiza. Tudo é uma árvore de funções puras reagindo a mudanças de estado.`,
      realWorldExample: 'Pensa no Discord: cada mensagem da lista é um componente que recebe props (texto, autor, hora). Quando alguém manda mensagem nova, o React não redesenha a tela toda — só adiciona o componente novo. UI inteira é uma função de (mensagens, usuário atual). Previsível e debugável.'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Props vs. Estado',
        question: 'Qual afirmação tá certa sobre props no React?',
        options: [
          { text: 'Props podem ser modificadas pelo componente que recebe', feedback: '✗ Props são read-only dentro do componente que recebe.' },
          { text: 'Props fluem de pai pra filho e são read-only no filho', feedback: '✓ Acertou! Props são entradas — filhos não podem modificar.', correct: true },
          { text: 'Props persistem entre re-renders como estado', feedback: '✗ Props são passadas fresh em todo render.' },
          { text: 'Props ficam guardadas no localStorage', feedback: '✗ Sem persistência automática — props são só argumentos.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Ordena o Fluxo de Re-render',
        description: 'Coloca o que acontece quando você chama setCount(count + 1).',
        items: [
          'React compara JSX antigo vs. novo',
          'React agenda um re-render',
          'Função do componente é chamada de novo com estado novo',
          'React atualiza só os nós do DOM que mudaram',
          'Função retorna JSX novo'
        ],
        correctOrder: [1, 2, 4, 0, 3],
        feedback: 'Agenda re-render → chama função com estado novo → recebe JSX novo → compara → atualiza o DOM real. Esse é o ciclo do React.'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Acompanha a Atualização',
        instructions: 'O que esse reducer estilo React produz?',
        code: `function reduce(state, action) {
  if (action.type === 'increment') {
    return { ...state, count: state.count + action.payload };
  }
  if (action.type === 'reset') {
    return { ...state, count: 0 };
  }
  return state;
}
const state1 = reduce({count:0}, {type:'increment', payload:5});
const state2 = reduce(state1, {type:'increment', payload:3});
console.log(state2);`,
        question: 'Como fica state2?',
        options: [
          { text: '{count: 5}', feedback: '✗ Esqueceu do segundo increment.' },
          { text: '{count: 8}', feedback: '✓ Mandou bem! 0 + 5 = 5, depois 5 + 3 = 8.', correct: true },
          { text: '{count: 3}', feedback: '✗ Ignorou o primeiro increment.' },
          { text: 'undefined', feedback: '✗ O reducer sempre retorna um objeto de estado.' }
        ],
        feedback: 'Reducers pegam (state, action) e retornam um NOVO objeto de estado (nunca muta). É o padrão que o useReducer usa internamente.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'mergeProps',
        instructions: [
          'Escreve mergeProps(defaults, overrides) que mescla dois objetos de props — overrides ganham em conflito.',
          'mergeProps({color:"blue", size:14}, {color:"red"}) → {color:"red", size:14}',
          'É assim que default props ficam sobrescritas.'
        ],
        sampleCode: `function mergeProps(defaults, overrides) {
  // TODO
}`,
        solution: `function mergeProps(defaults, overrides) {
  return { ...defaults, ...overrides };
}`,
        tests: [
          { input: 'mergeProps({color:"blue",size:14}, {color:"red"})', expected: { color: 'red', size: 14 }, desc: 'sobrescreve color, mantém size' },
          { input: 'mergeProps({a:1,b:2}, {b:99,c:3})', expected: { a: 1, b: 99, c: 3 }, desc: 'sobrescreve e adiciona' },
          { input: 'mergeProps({}, {x:1})', expected: { x: 1 }, desc: 'defaults vazio' }
        ],
        hints: [
          'Spread defaults primeiro, depois overrides — o último ganha em conflito de chave.',
          '{...defaults, ...overrides} é a solução inteira.',
          'É exatamente o padrão que React usa pra merge de props em composição de componentes.'
        ]
      },
      {
        level: 2,
        title: 'computeNewState',
        instructions: [
          'Escreve computeNewState(state, action) — um mini reducer.',
          'action é {type, payload}.',
          'Tipo "increment" → {...state, count: state.count + payload}',
          'Tipo "decrement" → {...state, count: state.count - payload}',
          'Tipo "reset" → {...state, count: 0}',
          'Caso contrário retorna state sem mudança.'
        ],
        sampleCode: `function computeNewState(state, action) {
  // TODO
}`,
        solution: `function computeNewState(state, action) {
  if (action.type === 'increment') {
    return { ...state, count: state.count + action.payload };
  }
  if (action.type === 'decrement') {
    return { ...state, count: state.count - action.payload };
  }
  if (action.type === 'reset') {
    return { ...state, count: 0 };
  }
  return state;
}`,
        tests: [
          { input: 'computeNewState({count:0}, {type:"increment", payload:1})', expected: { count: 1 }, desc: 'incrementa 1' },
          { input: 'computeNewState({count:5}, {type:"decrement", payload:2})', expected: { count: 3 }, desc: 'decrementa 2' },
          { input: 'computeNewState({count:42}, {type:"reset"})', expected: { count: 0 }, desc: 'reseta pra 0' },
          { input: 'computeNewState({count:1}, {type:"unknown"})', expected: { count: 1 }, desc: 'tipo desconhecido retorna o mesmo' }
        ],
        hints: [
          'Sempre retorna um NOVO objeto — nunca muta state.',
          'Spread o state antigo, depois sobrescreve o campo que muda.',
          'Pra actions desconhecidas, retorna state sem mudança.'
        ]
      },
      {
        level: 3,
        title: 'buildListKey',
        instructions: [
          'Escreve buildListKey(item, index) que retorna uma string key pra item de lista React.',
          'Se item.id existir, retorna como string.',
          'Senão cai pro index como string.',
          'buildListKey({id:"abc"}, 0) → "abc"',
          'buildListKey({name:"x"}, 2) → "2"'
        ],
        sampleCode: `function buildListKey(item, index) {
  // TODO
}`,
        solution: `function buildListKey(item, index) {
  if (item.id !== undefined && item.id !== null) {
    return String(item.id);
  }
  return String(index);
}`,
        tests: [
          { input: 'buildListKey({id:"abc"}, 0)', expected: 'abc', desc: 'id string' },
          { input: 'buildListKey({name:"x"}, 2)', expected: '2', desc: 'fallback pro index' },
          { input: 'buildListKey({id:42}, 0)', expected: '42', desc: 'id numérico vira string' },
          { input: 'buildListKey({id:null}, 5)', expected: '5', desc: 'id null cai pro index' }
        ],
        hints: [
          'Checa se item.id existe (não null, não undefined).',
          'String(value) lida com número e string.',
          'Fallback pro index é arriscado em React real (quebra em reorder) — mas é padrão quando id falta.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Desafio Final: Pensar em React',
      steps: [
        {
          type: 'coding',
          title: 'updateItemInList',
          instructions: 'Escreve updateItemInList(items, id, changes) que retorna um NOVO array com o item que bate com id atualizado pelo objeto changes. Outros itens sem mudança. Exemplo: updateItemInList([{id:1,n:"a"},{id:2,n:"b"}], 2, {n:"B"}) → [{id:1,n:"a"},{id:2,n:"B"}]. Importante: não muta o input.',
          sampleCode: `function updateItemInList(items, id, changes) {
  // TODO
}`,
          solution: `function updateItemInList(items, id, changes) {
  return items.map(item =>
    item.id === id ? { ...item, ...changes } : item
  );
}`,
          tests: [
            { input: 'updateItemInList([{id:1,n:"a"},{id:2,n:"b"}], 2, {n:"B"})', expected: [{ id: 1, n: 'a' }, { id: 2, n: 'B' }], desc: 'atualiza item que bate' },
            { input: 'updateItemInList([{id:1,n:"a"}], 99, {n:"X"})', expected: [{ id: 1, n: 'a' }], desc: 'sem match deixa tudo igual' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Por que mutar estado direto (tipo `state.items.push(novoItem)`) é bug no React?',
          options: [
            { text: 'É mais lento que atualizações imutáveis', feedback: '✗ Performance é secundário aqui.' },
            { text: 'React compara estado por referência — se a referência não muda, ele pula o re-render', feedback: '✓ Acertou! Mutar estado mantém a mesma referência, então React acha que nada mudou e não re-renderiza.', correct: true },
            { text: 'Causa vazamento de memória', feedback: '✗ Sem vazamento — só UI desatualizada.' },
            { text: 'Lança erro em produção', feedback: '✗ Sem erro — só re-render faltando.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'No meu projeto de feed estilo TikTok, tenho um useState pra o filtro e outro pra a lista de vídeos. Eles ficam dessincronizados. Devo usar useReducer ou reestruturar?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) front-end. Use exemplos do TikTok, Instagram, YouTube, Discord, Roblox. Conecte HTML/CSS/JS ao que eles veem nas redes sociais e games. Seja direto, com humor, sem ser infantil.'
    },
    resources: [
      { title: 'CS50 Semana 8 — React', url: 'https://cs50.harvard.edu/x/2024/weeks/8/' },
      { title: 'React Docs: Pensando em React', url: 'https://react.dev/learn/thinking-in-react' }
    ]
  },

  // ─── fw-10 ──────────────────────────────────────────────────────────────────
  {
    id: 'fw-10-performance',
    title: 'Performance Web e Otimização',
    week: 9,
    xp: 80,
    difficulty: 'Intermediate',
    priority: '⭐⭐',
    hook: 'Por que alguns sites travam o celular e outros voam tipo o Spotify rolando suave? Performance! 1 segundo de atraso e o usuário sai.',

    assess: {
      type: 'multipleChoice',
      question: 'Qual a diferença entre debounce e throttle?',
      options: [
        { text: 'São iguais', feedback: '✗ Eles se comportam bem diferente na prática.' },
        { text: 'Debounce espera a atividade parar; throttle dispara no máximo uma vez por intervalo', feedback: '✓ Mandou bem! Debounce = "dispara depois que o usuário para de digitar por 300ms"; throttle = "dispara no máximo a cada 300ms, não importa o que."', correct: true },
        { text: 'Debounce dispara na hora; throttle espera', feedback: '✗ Debounce especificamente espera ficar idle.' },
        { text: 'Throttle é pra storage; debounce é pra eventos', feedback: '✗ Os dois são pra eventos — estratégias de tempo diferentes.' }
      ]
    },

    learn: {
      hook: 'Otimização prematura é pecado — mas ignorar performance até o usuário reclamar é pior. Conhecer as ferramentas certas (memoize, debounce, lazy-load, code-split) te deixa consertar a coisa certa.',
      conceptVideo: {
        url: 'https://cs50.harvard.edu/x/2024/weeks/9/',
        title: 'CS50 Semana 9: Performance Web',
        duration: '40 min',
        yourTakeaway: 'Foca nos Core Web Vitals e nos padrões (cache, lazy-load, debounce) que melhoram eles.'
      },
      conceptText: `Performance web é o tempo entre intenção do usuário e atualização da tela. Três números definem isso (Core Web Vitals):\n\n- **LCP (Largest Contentful Paint)** — quando o maior elemento visível renderiza. Alvo: menos de 2,5s.\n- **INP (Interaction to Next Paint)** — quão rápido a página reage a cliques. Alvo: menos de 200ms.\n- **CLS (Cumulative Layout Shift)** — quanto a página "pula" enquanto carrega. Alvo: menos de 0,1.\n\n**Memoização** é cachear resultado de chamadas caras pelos inputs. Primeira call computa; chamadas subsequentes com mesmo input retornam do cache:\n\n\`\`\`js\nfunction memoize(fn) {\n  const cache = new Map();\n  return function(arg) {\n    if (cache.has(arg)) return cache.get(arg);\n    const result = fn(arg);\n    cache.set(arg, result);\n    return result;\n  };\n}\n\`\`\`\n\nNo React, **useMemo** cacheia valor computado entre renders. **useCallback** cacheia uma referência de função. Os dois previnem trabalho desnecessário quando inputs não mudaram.\n\n**Debouncing** atrasa uma função até a atividade parar. Perfeito pra input de busca — dispara a chamada de API depois do usuário parar de digitar por 300ms, não a cada tecla:\n\n\`\`\`js\nfunction debounce(fn, delay) {\n  let timer;\n  return function(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}\n\`\`\`\n\n**Throttling** limita a frequência. Usa pra handler de scroll, resize, mouse-move — dispara no máximo a cada 100ms.\n\n**Lazy loading** adia carregar algo até ser preciso:\n- \`<img loading="lazy">\` — navegador só carrega imagem perto da viewport.\n- React.lazy + Suspense — carrega componente só quando renderiza.\n- Intersection Observer — dispara callback quando elemento entra na viewport.\n\n**Code splitting** quebra seu bundle JS em chunks menores carregados sob demanda. Com Vite/webpack, \`import()\` dinâmico cria chunk separado:\n\n\`\`\`js\nconst HeavyChart = React.lazy(() => import("./HeavyChart"));\n\`\`\`\n\n**Estratégias de cache**:\n- **Cache HTTP** — headers Cache-Control falam pro navegador quanto tempo guardar assets. Filenames com hash (\`app.a3b9.js\`) deixam cachear pra sempre.\n- **Service worker** — cache programável pra offline e visitas repetidas instantâneas.\n- **localStorage / IndexedDB** — armazenamento persistente no cliente pra dado que não muda muito.\n\n**Regra 80/20**: na maioria dos apps, os maiores ganhos vêm de (1) mandar menos JS, (2) lazy-load de imagens, (3) cache de respostas de API. Técnicas mais avançadas só quando profiling provar que ajudam.\n\n**Mede antes de otimizar**: Chrome DevTools Performance, Lighthouse, e o painel Network te dizem onde o tempo vai. Chutar o que tá lento é o erro mais comum.`,
      realWorldExample: 'O Spotify roda suave porque usa lazy loading pesado: a playlist que você não tá vendo nem é carregada até você rolar até ela. E quando você busca uma música, ele faz debounce — só chama a API depois que você para de digitar por 300ms. Sem isso, ia ter 7 requests pra "billie eilish".'
    },

    practice: [
      {
        type: 'multipleChoice',
        title: 'Ferramenta Certa',
        question: 'Usuário digita numa busca. Você quer consultar a API mas não a cada tecla. Qual técnica?',
        options: [
          { text: 'Throttle a 300ms — dispara regularmente durante a digitação', feedback: '✗ Throttle ainda dispara durante a digitação, gasta requests à toa.' },
          { text: 'Debounce a 300ms — dispara uma vez depois que para de digitar', feedback: '✓ Acertou! Debounce é perfeito pra busca-enquanto-digita — uma chamada por pausa.', correct: true },
          { text: 'Memoiza a função de busca', feedback: '✗ Memoização cacheia resultados mas não atrasa chamadas.' },
          { text: 'Lazy-load o componente de busca', feedback: '✗ Lazy loading é sobre adiar código, não tempo de evento.' }
        ]
      },
      {
        type: 'dragDrop',
        title: 'Otimiza um Dashboard Lento',
        description: 'Coloca essas otimizações na ordem que aplicaria (maior ROI primeiro).',
        items: [
          'Adiciona memoização pra valores computados caros',
          'Mede com Chrome DevTools pra achar o gargalo real',
          'Code-split rotas pesadas com React.lazy',
          'Debounce o input de busca',
          'Lazy-load imagens fora da viewport'
        ],
        correctOrder: [1, 4, 3, 0, 2],
        feedback: 'Mede sempre primeiro. Depois vitórias rápidas (debounce no input, lazy nas imagens). Depois mudanças mais pesadas (memoize, code-split).'
      },
      {
        type: 'multipleChoiceWithConsole',
        title: 'Memoize na Prática',
        instructions: 'Acompanha essa função memoizada.',
        code: `function memoize(fn) {
  const cache = new Map();
  return function(arg) {
    if (cache.has(arg)) return cache.get(arg);
    const r = fn(arg);
    cache.set(arg, r);
    return r;
  };
}
const expensive = memoize(x => x * 2);
console.log(expensive(5));
console.log(expensive(5));
console.log(expensive(10));`,
        question: 'Quantas vezes a função x => x * 2 roda de verdade?',
        options: [
          { text: '3 — uma por call', feedback: '✗ Memoize cacheia — repetidos não rodam de novo.' },
          { text: '2 — uma pra 5, uma pra 10. O segundo expensive(5) bate no cache.', feedback: '✓ Acertou! Mesmo input retorna do cache; input novo recomputa.', correct: true },
          { text: '1 — só a primeira call roda', feedback: '✗ Inputs novos DISPARAM computação fresca.' },
          { text: '0 — memoize previne tudo', feedback: '✗ Memoize previne repetidos, não a primeira call.' }
        ],
        feedback: 'Memoize troca memória por tempo — perfeito quando computações são puras e argumentos repetem.'
      }
    ],

    apply: [
      {
        level: 1,
        title: 'memoize',
        instructions: [
          'Escreve memoize(fn) que retorna uma versão memoizada de fn.',
          'Na primeira call com um argumento, computa e cacheia. Em chamadas repetidas com o mesmo argumento, retorna do cache.',
          'memoize(x => x * 2)(5) → 10 (computado na primeira vez)',
          'Usa o primeiro argumento como chave do cache.'
        ],
        sampleCode: `function memoize(fn) {
  // TODO
}`,
        solution: `function memoize(fn) {
  const cache = new Map();
  return function(arg) {
    if (cache.has(arg)) return cache.get(arg);
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}`,
        tests: [
          { input: 'memoize(x => x * 2)(5)', expected: 10, desc: 'computa certo' },
          { input: 'memoize(x => x + 1)(7)', expected: 8, desc: 'funciona com soma' },
          { input: '(function(){ let calls = 0; const f = memoize(x => { calls++; return x*2; }); f(5); f(5); f(5); return calls; })()', expected: 1, desc: 'função roda só uma vez pro mesmo arg' }
        ],
        hints: [
          'Usa um Map pro cache (lida com qualquer tipo de chave).',
          'Na call, checa cache.has(arg). Se sim, retorna valor cacheado.',
          'Se não, computa fn(arg), guarda, retorna.'
        ]
      },
      {
        level: 2,
        title: 'debounceTimer',
        instructions: [
          'Escreve debounceTimer(lastCall, delay, now) que retorna true se uma função debounced DEVE disparar.',
          'Dispara quando o gap (now - lastCall) é >= delay.',
          'debounceTimer(1000, 300, 1200) → false (só 200ms passaram)',
          'debounceTimer(1000, 300, 1400) → true (400ms passaram)'
        ],
        sampleCode: `function debounceTimer(lastCall, delay, now) {
  // TODO
}`,
        solution: `function debounceTimer(lastCall, delay, now) {
  return (now - lastCall) >= delay;
}`,
        tests: [
          { input: 'debounceTimer(1000, 300, 1200)', expected: false, desc: 'gap 200ms — cedo demais' },
          { input: 'debounceTimer(1000, 300, 1400)', expected: true, desc: 'gap 400ms — dispara' },
          { input: 'debounceTimer(1000, 300, 1300)', expected: true, desc: 'exatamente 300ms — dispara' },
          { input: 'debounceTimer(0, 100, 50)', expected: false, desc: 'gap 50ms com delay de 100ms' }
        ],
        hints: [
          'Só checa se (now - lastCall) >= delay.',
          'É o teste central dentro de um debounce real — quando passou tempo suficiente desde a última atividade, dispara.',
          'Debounce de verdade usa setTimeout por baixo com a mesma lógica.'
        ]
      },
      {
        level: 3,
        title: 'calcCacheHitRate',
        instructions: [
          'Escreve calcCacheHitRate(hits, total) que retorna a porcentagem de cache hit como número 0-100.',
          'calcCacheHitRate(8, 10) → 80',
          'calcCacheHitRate(0, 0) → 0 (trata divisão por zero)'
        ],
        sampleCode: `function calcCacheHitRate(hits, total) {
  // TODO
}`,
        solution: `function calcCacheHitRate(hits, total) {
  if (total === 0) return 0;
  return (hits / total) * 100;
}`,
        tests: [
          { input: 'calcCacheHitRate(8, 10)', expected: 80, desc: '8/10 = 80%' },
          { input: 'calcCacheHitRate(0, 0)', expected: 0, desc: 'total zero retorna 0' },
          { input: 'calcCacheHitRate(10, 10)', expected: 100, desc: 'taxa perfeita' },
          { input: 'calcCacheHitRate(1, 4)', expected: 25, desc: '1/4 = 25%' }
        ],
        hints: [
          'Protege contra total === 0 — retorna 0 nesse caso.',
          '(hits / total) * 100 dá a porcentagem.',
          'Um cache com taxa de hit abaixo de 50% pode tá custando mais do que economiza.'
        ]
      }
    ],

    assessFinal: {
      type: 'sequential',
      title: 'Desafio Final: Performance',
      steps: [
        {
          type: 'coding',
          title: 'shouldUpdate',
          instructions: 'Escreve shouldUpdate(prevProps, nextProps) que retorna true se algum valor mudou (comparação rasa). É a lógica por trás do React.memo. Exemplo: shouldUpdate({a:1,b:2}, {a:1,b:3}) → true. shouldUpdate({a:1}, {a:1}) → false.',
          sampleCode: `function shouldUpdate(prevProps, nextProps) {
  // TODO
}`,
          solution: `function shouldUpdate(prevProps, nextProps) {
  const prevKeys = Object.keys(prevProps);
  const nextKeys = Object.keys(nextProps);
  if (prevKeys.length !== nextKeys.length) return true;
  for (const key of nextKeys) {
    if (prevProps[key] !== nextProps[key]) return true;
  }
  return false;
}`,
          tests: [
            { input: 'shouldUpdate({a:1,b:2}, {a:1,b:3})', expected: true, desc: 'valor mudou' },
            { input: 'shouldUpdate({a:1}, {a:1})', expected: false, desc: 'sem mudança' },
            { input: 'shouldUpdate({a:1}, {a:1,b:2})', expected: true, desc: 'chave adicionada' }
          ]
        },
        {
          type: 'multipleChoice',
          question: 'Qual a abordagem certa pra otimização de performance num app novo?',
          options: [
            { text: 'Otimiza tudo de cara — assume o pior', feedback: '✗ Otimização prematura desperdiça tempo em código que talvez nem seja gargalo.' },
            { text: 'Mede primeiro, depois otimiza o gargalo real', feedback: '✓ Acertou! Profila com DevTools/Lighthouse, acha o que tá lento, conserta.', correct: true },
            { text: 'Nunca otimiza — deixa o framework cuidar', feedback: '✗ Framework ajuda mas não conserta erros algorítmicos (O(n²), N+1 queries).' },
            { text: 'Cacheia tudo por padrão', feedback: '✗ Invalidação de cache é difícil; cache demais gera bugs de dado velho.' }
          ]
        }
      ]
    },

    goDeeper: {
      prompt: 'Meu app de feed de jogos do Roblox tá lento filtrando 5000 jogos. Como diagnosticar — é re-render do React, a query, ou os 5000 nós no DOM?',
      systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes (8-17) front-end. Use exemplos do TikTok, Instagram, YouTube, Discord, Roblox. Conecte HTML/CSS/JS ao que eles veem nas redes sociais e games. Seja direto, com humor, sem ser infantil.'
    },
    resources: [
      { title: 'CS50 Semana 9 — Escalabilidade e Performance', url: 'https://cs50.harvard.edu/x/2024/weeks/9/' },
      { title: 'web.dev: Core Web Vitals', url: 'https://web.dev/vitals/' }
    ]
  }
];
