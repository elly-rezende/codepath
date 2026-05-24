# 📱 Deploy iOS — CodePath na App Store

Guia completo pra empacotar o CodePath como app iOS nativo via Capacitor e enviar pra App Store.

> ⚠️ **Você vai precisar:**
> - **Mac com macOS 14+** (Xcode só roda em Mac)
> - **Xcode 15+** (grátis na App Store do Mac)
> - **Apple Developer Program** — US$ 99/ano (https://developer.apple.com/programs/)
> - **iPhone/iPad** (opcional) pra testar antes de submeter

---

## 1. Configuração inicial (já feita no projeto)

Já está pronto:
- ✅ `@capacitor/core`, `@capacitor/ios`, plugins de status bar, splash, haptics
- ✅ `capacitor.config.ts` com appId, appName, theme colors
- ✅ Scripts npm: `cap:add:ios`, `cap:sync`, `cap:open:ios`, `ios:build`
- ✅ `src/lib/capacitor.js` com helpers (haptics, status bar) que viram no-ops no browser

---

## 2. Setup no Mac

### a) Clona o projeto

```bash
git clone https://github.com/elly-rezende/codepath.git
cd codepath
npm install
```

### b) Adiciona a plataforma iOS (uma vez só)

```bash
npm run cap:add:ios
```

Isso cria a pasta `ios/` com um projeto Xcode completo.

### c) Build + sync

```bash
npm run cap:sync
```

Isso:
1. Roda `vite build` (gera `dist/`)
2. Copia os arquivos web pro app iOS
3. Atualiza plugins Capacitor

### d) Abre o projeto no Xcode

```bash
npm run cap:open:ios
```

Ou direto: `open ios/App/App.xcworkspace`

---

## 3. Configurar no Xcode

### a) Bundle Identifier
- No Xcode → seleciona "App" no Navigator
- Aba **General → Identity**:
  - **Bundle Identifier:** `app.codepath.mobile` (mesmo do `capacitor.config.ts`)
  - **Version:** `1.0.0`
  - **Build:** `1`

### b) Signing & Capabilities
- Aba **Signing & Capabilities**:
  - Marca ✅ **Automatically manage signing**
  - **Team:** seleciona seu time Apple Developer
- Se ainda não tem time: vai pra https://developer.apple.com/account → cadastra

### c) Display Name + ícones
- **General → Identity → Display Name:** `CodePath`
- **General → App Icons and Launch Images → AppIcon:**
  - Use o ícone existente em `public/icon-512.svg`
  - Você precisa **convertê-lo pra PNG** em vários tamanhos
  - Recomendo o gerador: https://www.appicon.co/ → upload do SVG → ele gera o `.zip` com todos os PNGs
  - Arrasta o conteúdo pra dentro do `Assets.xcassets/AppIcon` no Xcode

### d) Permissões no Info.plist
- Xcode → `App/Info.plist`
- Adiciona conforme necessário:
  - `NSCameraUsageDescription`: "Pra você tirar foto de perfil" (se ativar câmera)
  - `NSPhotoLibraryUsageDescription`: "Pra escolher foto de perfil"
  - `NSUserNotificationsUsageDescription`: "Pra te lembrar de estudar"

---

## 4. Testar no simulador

No Xcode:
1. Topo: escolhe um simulador (ex: iPhone 15 Pro)
2. ▶ Botão Play (ou `Cmd+R`)
3. O app abre no simulador iOS

Em segundos você vê o app rodando como nativo. 🎉

---

## 5. Testar num iPhone real

1. Conecta o iPhone via cabo USB no Mac
2. No Xcode, no topo, escolhe seu iPhone como destino
3. ▶ Play
4. **Primeira vez:** o iPhone vai dizer "Untrusted Developer" — vai em Ajustes → Geral → Gerenciamento de VPN e Dispositivo → confia no seu certificado

---

## 6. Preparar pra App Store

### a) Build pra Release
- Xcode → topo → seleciona **Any iOS Device (arm64)**
- **Product → Archive** (Cmd+Shift+B primeiro pra confirmar que builda)
- Espera ~5min
- Janela "Organizer" abre com seu archive

### b) Validar
- No Organizer → seleciona seu archive → **Validate App**
- Espera... se passar, ✅ verde
- Se falhar: lê o erro, ajusta, repete

### c) Distribuir
- **Distribute App → App Store Connect → Upload**
- Espera ~5-15min pra upload
- Quando terminar, vai pra https://appstoreconnect.apple.com

---

## 7. App Store Connect (preencher metadados)

1. Acessa https://appstoreconnect.apple.com
2. **My Apps → + → New App**
3. Preenche:
   - **Platform:** iOS
   - **Name:** CodePath
   - **Primary Language:** Portuguese (Brazil)
   - **Bundle ID:** `app.codepath.mobile` (o que você criou no Xcode)
   - **SKU:** `codepath-001` (qualquer string única sua)
   - **User Access:** Full Access
4. Preenche todas as abas:
   - **App Information:** categoria principal **Education**, secundária **Games**
   - **Pricing and Availability:** grátis ou pago (escolha)
   - **App Privacy:** declarar coleta de dados (idade, email, etc.) — use respostas honestas
   - **Version 1.0:** screenshots (6.5" + 5.5"), descrição, palavras-chave, suporte URL

### Screenshots obrigatórios
- 6.5" iPhone (1284 x 2778 px) — pelo menos 3
- 5.5" iPhone (1242 x 2208 px) — pelo menos 3
- Use o simulador no Xcode + `Cmd+S` pra screenshots

### Descrição sugerida
```
CodePath — Aprenda a programar de um jeito divertido!

🎮 Pra crianças e adolescentes (8-17 anos)
🧠 50 lições de Big O, recursão, sistemas e mais
🤖 Mascote Bit pra te acompanhar
🏆 Conquistas, missões semanais, e ranking entre amigos
🎨 Customize seu Bit com skins e temas
👨‍🏫 Modo Professor pra escolas e educadores

Exemplos com Discord, TikTok, Roblox, Minecraft — programação que faz sentido pro seu dia a dia.

CodePath é gratuito pra começar. Vire Pro pra desbloquear todas as 50 lições, mini-jogos premium e explicações com IA.
```

---

## 8. Review da Apple

- Submete → **In Review** (status muda)
- Apple revisa em 24-72h normalmente
- Se aprovar: ✅ **Pending Developer Release** → você clica "Release Now"
- Se rejeitar: leem o motivo, ajustam, resubmitem

### Coisas que reprovam apps de programação:
- ❌ Permitir executar código arbitrário de outros usuários (cuidado com o AIExplainer — só roda na conta do user)
- ❌ Funcionar como "navegador" pra outros sites (não é o caso)
- ❌ Cobrar fora do sistema de IAP (in-app purchases) — Stripe Checkout em webview pode ser problema

> ⚠️ **Importante sobre pagamentos no iOS:**
> A Apple exige que assinaturas digitais usem o **In-App Purchase** deles (toma 15-30%). O Stripe Checkout pode ser rejeitado se for usado pra desbloquear conteúdo digital dentro do app.
>
> **Solução:** Tem 2 opções:
> 1. **Versão iOS sem paywall**: app gratuito completo no iOS, paywall só no web
> 2. **Implementar StoreKit (IAP)**: troca Stripe por Apple Payment dentro do app iOS
>
> Recomendo opção 1 pra começar. Pode usar Stripe na versão web/Android sem problema.

---

## 9. Manutenção / atualizações

Cada vez que você fizer mudanças no app:

```bash
# 1. Faz suas mudanças no código React normalmente
# 2. Roda o build + sync
npm run cap:sync

# 3. No Xcode, sobe a build number
#    (Version: 1.0.1 ou 1.1.0, Build: 2)
# 4. Product → Archive → Distribute → Upload
# 5. No App Store Connect, cria nova versão e submete pra review
```

---

## 🗂 Estrutura do projeto após `cap add ios`

```
codepath/
├── ios/                          ← Gerado pelo Capacitor
│   └── App/
│       ├── App.xcworkspace      ← Abre isso no Xcode (não o .xcodeproj!)
│       ├── App/
│       │   ├── Info.plist
│       │   ├── Assets.xcassets/  ← Ícones do app
│       │   └── public/           ← Web app copiado
│       └── Podfile               ← CocoaPods (auto-gerenciado)
├── capacitor.config.ts           ← Config principal
└── src/lib/capacitor.js          ← Helpers JS
```

---

## 🆘 Problemas comuns

**"Pod install failed":**
```bash
cd ios/App && pod install --repo-update
```

**Build dá erro de signing:**
- Vá em Xcode → Signing & Capabilities → reativa "Automatically manage signing"

**App branco depois do splash:**
- Capacitor está procurando `dist/` mas você não rodou `npm run build` antes
- Solução: `npm run cap:sync` (que faz build + copy)

**Push notifications não funcionam no iOS:**
- iOS exige `NSUserNotificationsUsageDescription` no Info.plist
- E `capabilities: Push Notifications` ativado no Xcode

---

## 💸 Custos

| Item | Custo |
|---|---|
| Apple Developer Program | US$ 99/ano |
| Xcode | Grátis |
| Mac (se não tem) | Mac mini M4 ~R$ 5.000 |
| App Store taxa | 15-30% das vendas (só se usar IAP) |

> **Dica:** se você não tem Mac, pode alugar um na nuvem por ~US$ 20/mês (https://www.macincloud.com/) pra fazer só o build/upload.

---

## ✅ Checklist final antes de submeter

- [ ] App roda no simulador sem crashes
- [ ] App roda no iPhone real
- [ ] Ícones em todos os tamanhos
- [ ] Splash screen funciona
- [ ] Conta Apple Developer ativa
- [ ] Privacy Policy URL (obrigatório!) — crie uma página simples
- [ ] Screenshots em 6.5" e 5.5"
- [ ] Descrição em PT-BR
- [ ] Categoria definida (Education / Games)
- [ ] Faixa etária (4+ ou 9+)
- [ ] Política de IAP se aplicável

Quando tudo estiver ok: **Submit for Review** 🚀
