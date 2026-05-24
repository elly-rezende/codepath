# 🤖 Deploy Android — CodePath no Google Play Store

Guia completo pra empacotar o CodePath como app Android e enviar pra Play Store.

> 🎯 **Por que Android primeiro:**
> - Funciona em **Windows/Linux/Mac** (não precisa de Mac!)
> - Taxa única de **R$ 130** (vs $99/ano da Apple)
> - **70% dos brasileiros** usam Android
> - Processo de review **mais rápido** (1-3 dias vs 1 semana Apple)
> - **Pagamentos Stripe permitidos** (Google é mais flexível que Apple com IAP)

---

## 📋 O que você vai precisar

| Item | Custo | Onde |
|---|---|---|
| **Android Studio** | Grátis | https://developer.android.com/studio |
| **Java JDK 17+** | Grátis | https://adoptium.net/ |
| **Conta Google Play Console** | **R$ 130** (taxa única) | https://play.google.com/console |
| **Cartão de crédito internacional** | — | Pra pagar a taxa |
| **Email Google** | Grátis | Use o mesmo do seu GitHub se quiser |

---

## 1. Setup inicial (uma vez)

### a) Instalar Android Studio
1. Baixe em https://developer.android.com/studio
2. Roda o instalador, aceita os termos
3. Na primeira execução, ele baixa automaticamente:
   - **Android SDK** (~3 GB)
   - **Android Emulator**
   - **Android SDK Platform-Tools**
4. Espera tudo terminar (~10-20 min dependendo da internet)

### b) Instalar Java JDK (se ainda não tem)
1. https://adoptium.net/ → baixa o **Temurin 17 LTS** pra Windows
2. Roda o instalador, marca **"Set JAVA_HOME variable"**
3. Reinicia o terminal pra pegar a variável

### c) Configurar variáveis de ambiente Windows
Pesquisa "variáveis de ambiente" no menu Iniciar → Editar:
- **JAVA_HOME** = `C:\Program Files\Eclipse Adoptium\jdk-17...`
- **ANDROID_HOME** = `C:\Users\CCE\AppData\Local\Android\Sdk`
- Adicione ao **PATH**:
  - `%JAVA_HOME%\bin`
  - `%ANDROID_HOME%\platform-tools`
  - `%ANDROID_HOME%\emulator`

Pra testar: abre um novo PowerShell e roda:
```bash
java --version       # deve mostrar "openjdk 17"
adb --version        # deve mostrar "Android Debug Bridge"
```

---

## 2. Adicionar a plataforma Android no projeto

```bash
cd C:\Users\CCE\codepath
npm run cap:add:android
```

Isso cria a pasta `android/` com um projeto Android Studio completo.

> Se der erro "android not found", confirma se você está no projeto correto e se o `@capacitor/android` está em `node_modules/`. Se não estiver: `npm install -D @capacitor/android`.

---

## 3. Build + sync

Toda vez que mudar o código:

```bash
npm run cap:sync:android
```

Isso:
1. Roda `vite build` (gera `dist/`)
2. Copia tudo pro app Android
3. Atualiza plugins

---

## 4. Testar no emulador

### Opção A: Pelo Android Studio
```bash
npm run cap:open:android
```

No Android Studio:
1. Topo direito: clica em **"Device Manager"**
2. **"Create Device"** → escolhe **"Pixel 7"** → próximo
3. Escolhe a imagem **"Tiramisu (API 33)"** → próximo → Finish
4. Volta pra janela do app → seleciona o emulador no topo
5. ▶ Botão Play verde

Em 30s o app abre no emulador. 🎉

### Opção B: Direto pelo terminal (mais rápido pra dev)
```bash
npm run cap:sync:android
cd android
./gradlew installDebug
```

---

## 5. Testar num celular Android real

1. No seu celular: **Configurações → Sobre o telefone**
2. Toca 7x em **"Número da versão"** → vira modo desenvolvedor
3. Volta → **Opções do desenvolvedor → ativa "Depuração USB"**
4. Conecta o celular no computador via USB
5. Confirma a confiança no celular quando perguntar
6. No PowerShell:
   ```bash
   adb devices    # deve listar seu celular
   cd C:\Users\CCE\codepath\android
   ./gradlew installDebug
   ```
7. O app aparece na sua tela inicial 🎉

---

## 6. Gerar APK assinado (pra distribuir manualmente)

APK = arquivo único que pode ser instalado em qualquer Android (mesmo fora da Play Store).

### a) Criar uma chave de assinatura (uma vez só)
```bash
cd C:\Users\CCE\codepath\android\app
keytool -genkey -v -keystore codepath-release.keystore -alias codepath -keyalg RSA -keysize 2048 -validity 10000
```

Responde as perguntas (nome, organização, etc.) — pode ser tudo "CodePath".

**⚠️ GUARDE essa keystore em LUGAR SEGURO.** Se perder, nunca mais consegue atualizar o app na Play Store!

### b) Configurar o build
Edita `android/app/build.gradle` e adiciona dentro de `android { ... }`:

```gradle
signingConfigs {
    release {
        storeFile file("codepath-release.keystore")
        storePassword "SUA_SENHA"
        keyAlias "codepath"
        keyPassword "SUA_SENHA"
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled true
        shrinkResources true
    }
}
```

### c) Gerar APK
```bash
cd C:\Users\CCE\codepath
npm run cap:sync:android
cd android
./gradlew assembleRelease
```

Resultado: `android/app/build/outputs/apk/release/app-release.apk` (~5-10 MB)

Você pode mandar esse arquivo pra qualquer Android — pessoa salva, abre e instala (precisa permitir "Fontes desconhecidas" nas configurações).

---

## 7. Gerar AAB pra Play Store

Google Play Store exige formato **AAB** (Android App Bundle) — não aceita mais APK.

```bash
cd C:\Users\CCE\codepath
npm run cap:sync:android
cd android
./gradlew bundleRelease
```

Resultado: `android/app/build/outputs/bundle/release/app-release.aab`

---

## 8. Criar conta Google Play Console

1. https://play.google.com/console
2. Faz login com sua conta Google
3. Aceita os Termos do Desenvolvedor
4. **Paga R$ 130** (cartão de crédito) — taxa única, vitalícia
5. Preenche informações de identidade (CPF, nome, endereço)
6. Espera aprovação (~horas a 2 dias)

---

## 9. Submeter o app

### a) Criar o app
1. Play Console → **"Create app"**
2. Preenche:
   - **App name:** `CodePath — Aprenda a Programar`
   - **Default language:** Portuguese (Brazil)
   - **App or game:** App
   - **Free or paid:** Free
   - Declarações (anúncios? não, etc.)

### b) Configurar a ficha do app
No menu lateral, vai preenchendo cada item (vai marcando ✓ verde):

#### 📋 App content
- **Privacy policy URL** ← obrigatório! Cria uma página simples em https://policiesgenerator.app/
- **App access:** Tem login? Marca "All functionality available without logging in" se for o caso, ou explica como obter credenciais de teste
- **Ads:** "App does not contain ads"
- **Content rating:** preenche o questionário, vai dar livre (PEGI 3 / ESRB Everyone)
- **Target audience:** marca "13-15" e "16-17" como público alvo (cuidado: se marcar <13, ativa políticas COPPA mais rígidas)
- **News app:** "App is not a news app"
- **Data safety:** declara que coleta nome, email, idade (e usa pra personalização) — preenche honestamente

#### 🎨 Store listing
- **Short description (80 chars):** "App de programação pra crianças e teens com 50 lições, jogos e missões"
- **Full description (4000 chars):** copia o texto da doc IOS-DEPLOY ou expande
- **App icon (512x512 PNG):** converte `icon-512.svg` em PNG (use https://cloudconvert.com/svg-to-png)
- **Feature graphic (1024x500 PNG):** banner. Pode criar no Canva.
- **Screenshots:**
  - Phone: pelo menos 4 (tira do emulador rodando)
  - 7-inch tablet: opcional
  - 10-inch tablet: opcional
- **Category:** Education (categoria principal)
- **Email + Website:** o seu

### c) Configurar pricing
- Mantém "Free" se quer freemium
- Países: marca "Brasil" + outros se quiser

### d) Upload do AAB
- Menu lateral → **Production → Create new release**
- Drag and drop o `app-release.aab` que você gerou
- Release name: `1.0.0`
- Release notes: "Primeira versão do CodePath! 50 lições, mini-jogos, missões semanais."
- Clica **"Review release" → "Start rollout to Production"**

---

## 10. Review do Google

- **In Review** (status muda na Play Console)
- Google demora **24 horas a 3 dias** pra revisar
- Se aprovar: app aparece na busca em ~2 horas após "Approved"
- Você pode compartilhar o link: `https://play.google.com/store/apps/details?id=app.codepath.mobile`

### Coisas que podem ser pedidas pra ajustar:
- Privacy policy precisa mencionar coleta de dados de menores
- Se aparecer "Children's Privacy Concern", você precisa preencher o questionário extra COPPA
- Ícone pode precisar ter mais detalhes (se tiver tela com fundo branco transparente, vão rejeitar)

---

## 11. Atualizar o app

Pra subir uma nova versão:

1. Aumenta version code + version name em `android/app/build.gradle`:
   ```gradle
   versionCode 2
   versionName "1.0.1"
   ```
2. `npm run cap:sync:android`
3. `cd android && ./gradlew bundleRelease`
4. Play Console → **Production → Create new release**
5. Upload do novo AAB → Submit

---

## 🆘 Problemas comuns

**"SDK location not found":**
- Cria `android/local.properties` (não commita!) com:
  ```
  sdk.dir=C:\\Users\\CCE\\AppData\\Local\\Android\\Sdk
  ```

**"Gradle daemon failed":**
- `cd android && ./gradlew --stop && ./gradlew clean`

**"Cannot find module @capacitor/android":**
- Roda: `npm install -D @capacitor/android` no projeto root
- Depois: `npx cap add android`

**App fica branco depois do splash:**
- Você esqueceu de rodar `npm run build` antes de `cap sync`
- Solução: `npm run cap:sync:android` (que faz tudo junto)

**Permission denied no `./gradlew`:**
- Windows: usa `.\gradlew.bat` em vez de `./gradlew`

---

## 📊 Diferenças Android vs iOS

| | Android | iOS |
|---|---|---|
| **Mac obrigatório?** | ❌ não | ✅ sim |
| **Taxa anual** | R$ 0 | US$ 99 |
| **Taxa inicial** | R$ 130 vitalício | — |
| **Review time** | 1-3 dias | 1-7 dias |
| **Aceita Stripe?** | ✅ sim | ⚠️ não pra digital goods |
| **Cobra 30%?** | só compras digitais | sempre |
| **% de market BR** | ~70% | ~30% |

**Recomendação:** Lança Android primeiro, depois iOS. Mais barato, mais rápido, mais usuários.

---

## ✅ Checklist final

- [ ] Android Studio + JDK instalados
- [ ] `cap:add:android` rodado, pasta `android/` existe
- [ ] App roda no emulador
- [ ] App roda no celular real
- [ ] Keystore criada e GUARDADA
- [ ] AAB assinado gerado com sucesso
- [ ] Privacy policy publicada online
- [ ] Conta Play Console paga (R$ 130)
- [ ] Ficha do app preenchida 100% (todas ✓ verdes)
- [ ] Screenshots tiradas
- [ ] AAB enviado pra Production
- [ ] **Aguardar review do Google**

Quando aprovar: 🎉 **Seu app está na Google Play Store!**
