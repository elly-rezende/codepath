# 🚀 Deploy em produção — CodePath

Guia rápido pra colocar o app no ar. **3 opções** de complexidade crescente.

---

## 🎯 Opção 1 — Vercel via GitHub (mais fácil, 5 minutos)

Funciona porque seu código já está no GitHub. Vercel detecta tudo automático.

### Passo a passo:

1. Acessa **https://vercel.com/signup** → "Continue with GitHub"
2. Autoriza Vercel a ler seus repos
3. Na home do Vercel, clica **"Add New..." → "Project"**
4. Procura **`elly-rezende/codepath`** → clica **"Import"**
5. Tela de config:
   - **Framework Preset:** Vite (detectado automático)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `dist` (default)
   - **Install Command:** `npm install` (default)
6. **Environment Variables** (opcional — só se você quiser ligar Supabase):
   - Adiciona `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
7. Clica **"Deploy"**
8. Aguarda ~1-2 minutos → recebe URL tipo `codepath-elly.vercel.app`

### Pronto!
- A URL é **pública** — qualquer um pode acessar
- Toda vez que você fizer `git push origin master`, o Vercel rebuilda automaticamente
- HTTPS grátis, CDN global, ilimitado pra projetos pequenos

---

## ⚡ Opção 2 — Vercel CLI (controle total, 3 minutos)

Pra fazer deploy direto do terminal sem mexer no GitHub.

```bash
# Instala a CLI (uma vez só)
npm install -g vercel

# Na pasta do projeto:
cd C:\Users\CCE\codepath
vercel login

# Primeiro deploy:
vercel
# Responde as perguntas:
#   ? Set up and deploy? Y
#   ? Which scope? (sua conta)
#   ? Link to existing project? N
#   ? Project name? codepath
#   ? In which directory is your code located? ./
#   ? Want to modify these settings? N

# Deploys subsequentes:
vercel --prod
```

URL fica disponível imediatamente. Adicionar env vars:

```bash
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_ANON_KEY production
vercel --prod    # redeploya com as novas vars
```

---

## 🌐 Opção 3 — Outros providers (também grátis)

Caso queira evitar Vercel, alternativas equivalentes:

### Netlify
- Mesmo fluxo: conecta GitHub → autoseleciona Vite
- Comando build: `npm run build`
- Pasta: `dist`
- URL: `codepath-elly.netlify.app`

### Cloudflare Pages
- Conecta GitHub → seleciona o repo
- Framework: Vite
- Build command: `npm run build`
- Output: `dist`
- URL: `codepath.pages.dev`

### GitHub Pages (mais técnico)
Precisa de uma config extra no `vite.config.js` (base path). Não recomendo a não ser que queira ficar no ecossistema GitHub.

---

## 🔧 Domínio próprio (opcional)

Se você comprar um domínio (`codepath.com.br`, `appcodepath.com`, etc.):

1. Compra em **Registro.br** (~R$40/ano pra .com.br) ou **Namecheap** (~R$45/ano pra .com)
2. No Vercel: **Project → Settings → Domains → Add**
3. Vercel te dá registros DNS pra adicionar no painel do seu domínio
4. Em 1-24 horas, seu site fica em `https://codepath.com.br`

Custo total: só o domínio. Hospedagem continua grátis.

---

## ✅ Checklist antes do primeiro deploy

- [x] `npm run build` roda sem erro (verifica localmente com `npm run preview`)
- [x] `.env.example` existe (não commita `.env` real)
- [x] `vercel.json` está commitado com headers de cache e segurança
- [x] Manifest + service worker no `public/`
- [x] Git push tá em dia (`git status` limpo)

---

## 🆘 Se der erro

**Build falha no Vercel mas funciona local:**
- Vercel usa Node 18 por padrão. Se você usa Node 20+, adiciona em `package.json`:
  ```json
  "engines": { "node": ">=20" }
  ```

**404 em rotas internas (ex: `/profile`):**
- O `vercel.json` já tem rewrites pra mandar tudo pro `index.html`. Se ainda assim falhar, confere se o `vercel.json` foi commitado.

**Service worker não atualiza:**
- Limpa o cache: DevTools → Application → Service Workers → "Unregister"
- Recarrega a página

**Env vars não aparecem:**
- Precisa começar com `VITE_` pra Vite expor pro browser
- Adicionou no Vercel mas não funciona? Faz redeploy: **Deployments → ... → Redeploy**

---

## 📊 O que a usuária vê após deploy

- URL pública (ex: `codepath-elly.vercel.app`)
- Funciona em qualquer dispositivo com browser
- **Instalável como PWA** (aparece "Adicionar à tela inicial")
- HTTPS automático
- CDN global (carrega rápido no Brasil e no mundo)
- Analytics grátis no Vercel Dashboard
