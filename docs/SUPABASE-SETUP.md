# 🗄️ Setup Supabase — Backend Real para CodePath

Este guia te leva do zero ao backend completo em ~10 minutos.

**O que você ganha ao plugar o Supabase:**
- ✅ Login de verdade (não só localStorage)
- ✅ Progresso sincronizado entre dispositivos (celular + computador)
- ✅ Leaderboard global de amigos atualizando em tempo real
- ✅ Upload de avatares em cloud storage
- ✅ Sistema de amigos funcionando entre usuários reais
- ✅ Plano grátis Supabase aguenta milhares de usuários

> **Sem Supabase configurado**, o app continua funcionando 100% em localStorage. É opt-in.

---

## 1. Criar conta + projeto Supabase

1. Acessa https://supabase.com → "Start your project"
2. Faz login com GitHub (rápido) ou email
3. Clica **"New project"**:
   - **Name:** `codepath` (ou o que quiser)
   - **Database Password:** anote essa senha em algum lugar seguro!
   - **Region:** South America (São Paulo) — mais perto = mais rápido
   - **Pricing:** Free tier tá ótimo pra começar
4. Espera ~2 minutos enquanto o projeto é criado

---

## 2. Criar o schema do banco

Quando o projeto estiver pronto:

1. No painel do Supabase, clica **"SQL Editor"** (ícone no menu lateral)
2. Clica **"New query"**
3. Abre o arquivo `supabase/schema.sql` deste projeto e **copia tudo**
4. Cola no editor SQL do Supabase
5. Clica **"Run"** (canto inferior direito)
6. Deve aparecer: ✅ **Success. No rows returned.**

Isso cria 5 tabelas (profiles, progress, inventory, friendships, notifications), todas as políticas de segurança (Row Level Security), e o trigger que cria perfil automaticamente quando um usuário se cadastra.

---

## 3. Criar bucket de avatares (cloud storage)

1. No menu, clica **"Storage"**
2. **"New bucket"**:
   - **Name:** `avatars`
   - **Public bucket:** ✅ marca essa opção (pra avatares serem visíveis)
3. Clica **"Create bucket"**
4. Volta no SQL Editor e roda:

```sql
create policy "Avatar images are publicly accessible"
  on storage.objects for select using (bucket_id = 'avatars');

create policy "Users can upload their own avatar"
  on storage.objects for insert with check (
    bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can update their own avatar"
  on storage.objects for update using (
    bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]
  );
```

---

## 4. Configurar Auth (email)

1. No menu, clica **"Authentication"** → **"Providers"**
2. **Email** já vem ativo por padrão. Configurações recomendadas:
   - **Confirm email:** se quiser exigir confirmação por email (mais seguro)
   - **Secure email change:** ✅ ativa
   - **Secure password change:** ✅ ativa
3. (Opcional) Adicionar OAuth: **Google** ou **GitHub** — bom pra crianças que já têm conta Google escolar

### Configurar emails de notificação (opcional)

Em **Authentication → Email Templates**, traduz os emails de "Confirm signup", "Reset password" etc. pra PT-BR pra ficar mais profissional.

---

## 5. Conectar o app ao seu projeto

1. Na home do Supabase, clica em **"Project Settings"** (engrenagem) → **"API"**
2. Copia 2 valores:
   - **Project URL** (algo como `https://abcdefghijk.supabase.co`)
   - **Project API Key** → use a chave **`anon` `public`** (não a `service_role`!)

3. No projeto local, crie um arquivo `.env` na raiz:

```bash
VITE_SUPABASE_URL=https://abcdefghijk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs.....
```

4. **Reinicie o dev server**: `Ctrl+C` e depois `npm run dev`
5. Abra o app — no console (F12), deve aparecer: 🟢 **Supabase: connected to ...**

---

## 6. Testar

1. No app, faça logout
2. Crie uma conta nova
3. Verifica no Supabase **Authentication → Users** — sua conta deve aparecer
4. Verifica em **Table Editor → profiles** — perfil criado automaticamente
5. Complete uma lição, ganhe XP, verifica em **progress** se atualizou

Se aparecer dado real no Supabase, **PRONTO!** O backend tá funcionando. 🎉

---

## 7. Próximos passos (opcional)

### Leaderboard global
Já pronto — agora qualquer usuário com seu código pode te adicionar como amigo, mesmo em outro celular/país.

### Realtime
A próxima fase (5C) liga `realtime` pra subscriptions. Isso significa: quando seu amigo ganhar XP, sua tela atualiza **sem refresh**.

### Deploy
Depois disso, podemos fazer deploy do app no Vercel (grátis):
- Conecta o repo GitHub no Vercel
- Adiciona as mesmas env vars (VITE_SUPABASE_URL + KEY)
- Vercel detecta Vite + faz build automático
- Pronto — qualquer um pode acessar pelo link

---

## 🆘 Problemas comuns

**"missing role" ao rodar o schema:**
- Você tá no SQL Editor do Supabase, não no `psql` local. Roda lá.

**App não conecta mesmo após criar `.env`:**
- Reinicia o dev server (`Ctrl+C` → `npm run dev`)
- Verifica se a chave começa com `eyJ` (é JWT)
- Confere se é a `anon public` e não a `service_role`

**"Row Level Security policy denied":**
- Significa que tudo tá funcionando! Só precisa estar logado pra ler/escrever
- Faz signup/login antes

**Email de confirmação não chega:**
- Em projetos free, Supabase usa um remetente próprio que cai no spam
- Pra produção: conecta SMTP (SendGrid, Resend, etc.) em **Authentication → Email**

---

## 📂 Arquivos relevantes

```
codepath/
├── supabase/
│   └── schema.sql              ← SQL pra rodar no SQL Editor
├── src/lib/
│   └── supabase.js             ← Cliente Supabase (criado, lendo de .env)
├── .env.example                ← Modelo do .env
├── .env                        ← VOCÊ cria, com suas credenciais
└── docs/
    └── SUPABASE-SETUP.md       ← Este arquivo
```
