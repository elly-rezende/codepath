# 🎨 Workflow: editando o CodePath no Figma

Este guia mostra como você (não-dev) consegue **editar a aparência do app no Figma** e sincronizar com o código.

---

## 🎯 O que você consegue editar no Figma

✅ **Cores** — paleta inteira (backgrounds, texto, marcas, badges de trilha, raridades de item)
✅ **Fontes** — família, tamanhos, pesos
✅ **Espaçamentos** — margins, paddings (escala de 4px)
✅ **Raios de borda** — quão arredondados são os elementos
✅ **Sombras** — incluindo o "glow" roxo do botão principal

❌ **Não dá pra editar via Figma:** layouts complexos, animações, lógica do app, texto das lições

> Pra qualquer mudança que **não** seja apenas visual, você me pede aqui no chat e eu faço.

---

## 🚀 Setup inicial (uma vez)

### 1. Criar arquivo Figma novo
- Abre o **Figma** (figma.com)
- Cria um arquivo novo: **File → New Design File**
- Renomeia pra `CodePath Design System`

### 2. Instalar o plugin "Tokens Studio"
- No Figma, abre **Plugins → Browse plugins in Community**
- Procura por **"Tokens Studio"** (anteriormente "Figma Tokens")
- Clica **"Save"** (favoritar) e **"Run"**

### 3. Importar os tokens do app
- No Tokens Studio que abriu, clica **"Settings → JSON"**
- Cola o conteúdo de `src/styles/tokens.json` deste projeto
- Clica **"Save"**
- ✅ Pronto — você vai ver TODAS as cores/fontes/espaçamentos do app listadas como variáveis

---

## ✏️ Workflow de edição

### Cenário A: trocar uma cor
1. No Figma, no Tokens Studio, encontra a variável (ex: `color.brand.primary`)
2. Clica nela e muda o hexcode (ex: `#7C5CFF` → `#FF6B6B`)
3. Exporta: **Tokens Studio → Export → JSON → Save**
4. **Cola o JSON exportado em `src/styles/tokens.json`** (sobrescreve)
5. No terminal do projeto: `npm run sync-tokens`
6. App atualiza automaticamente — pronto! 🎉

### Cenário B: ajustar fonte ou tamanho
1. Mesma coisa — edita `font.size.lg` no Figma
2. Exporta + sync

### Cenário C: criar tema novo (ex: "Halloween")
1. No Tokens Studio, clica **"+ New Token Set"** → "Halloween"
2. Adiciona overrides das cores (laranja, preto, roxo)
3. Exporta como tema separado
4. Me pede aqui pra criar um seletor de tema no perfil — eu uso esse JSON

---

## 🔍 Mapa das variáveis principais

| Token | Onde aparece no app |
|---|---|
| `color.brand.primary` (#7C5CFF) | Botão principal "Continuar", mascote Bit padrão, gradients |
| `color.brand.secondary` (#10D9C4) | Itens incomuns, badges de XP, sucesso |
| `color.brand.accent` (#EC4899) | Conquistas, destaques |
| `color.semantic.success` (#4ADE80) | Testes passando, feedback "correto" |
| `color.semantic.warning` (#FBBF24) | XP, moedas, conquistas |
| `color.semantic.error` (#F56565) | Erros, testes falhando |
| `color.tracks.csFundamentals` (#00D4FF) | Trilha CS Fundamentals |
| `color.tracks.frontendWeb` (#FF6B6B) | Trilha Frontend |
| `color.tracks.backendApis` (#4ECDC4) | Trilha Backend |
| `color.tracks.devopsInfrastructure` (#FFE66D) | Trilha DevOps |
| `color.tracks.systemDesign` (#A8E6CF) | Trilha System Design |
| `color.bg.primary` (#12141C) | Fundo principal do app |
| `color.bg.card` (#1E2235) | Cards de lições, modais |
| `font.family.sans` (Inter) | Texto geral |
| `font.family.mono` (JetBrains Mono) | Códigos, valores numéricos (XP, streak) |
| `radius.lg` (16px) | Maioria dos cards arredondados |

---

## 🛠 Para casos mais avançados

### Quero criar telas novas no Figma e gerar código
- Desenha a tela no Figma usando os tokens importados
- Tira screenshot e cola aqui no chat
- Me explica o que cada elemento faz
- Eu gero o código React

### Quero ver os componentes do app no Figma
- (Próximo passo) Configurar **Figma Code Connect** — me peça pra fazer isso quando quiser
- Aí cada componente React (Mascot, LessonCard, Button) aparece no Figma como componente "real"

### Tenho um arquivo Figma de outra pessoa que quero usar
- Compartilha o link do Figma comigo (em modo View ou com permissão de leitura)
- Eu uso a ferramenta `mcp__Figma__get_design_context` pra ler os designs
- Converto pra código

---

## 🆘 Resolução de problemas

**"Mudei o tokens.json mas o app não atualiza"**
→ Esqueceu de rodar `npm run sync-tokens` depois de editar. Esse comando regenera o `tokens.css` que o Vite/app consome.

**"Quebrou alguma cor"**
→ Provavelmente um nome de token foi removido/renomeado. Confere se ainda existe `color.brand.primary` etc. no JSON.

**"O Vite não recarregou"**
→ Salva qualquer arquivo `.css` (Ctrl+S) ou recarrega a página manualmente.

---

## 📂 Arquivos relevantes

```
codepath/
├── src/styles/
│   ├── tokens.json     ← FONTE DA VERDADE (edita aqui ou no Figma)
│   └── tokens.css      ← AUTO-GERADO (não edite)
├── scripts/
│   └── sync-tokens.mjs ← Script que converte JSON → CSS
└── docs/
    └── FIGMA-WORKFLOW.md ← Este arquivo
```

---

## 🎯 Próximos passos sugeridos

1. **Testa o workflow básico** — muda `color.brand.primary` no `tokens.json` direto, roda `npm run sync-tokens`, vê o app mudar
2. **Cria conta Figma** + instala Tokens Studio
3. **Importa o tokens.json** no Figma
4. **Edita uma cor visualmente** e exporta de volta
5. Quando estiver confortável, pede pra eu setup **Code Connect** (componentes mapeados)
