import { createContext, useContext, useState, useCallback } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    // Navbar
    dashboard: "Dashboard",
    profile: "Profile",
    streak: "streak",
    level: "Level",

    // Dashboard
    welcomeBack: "Welcome back, Elly",
    readyToStart: "Ready to start your journey? Pick a track below.",
    lessonsCompleted: "lessons completed across",
    tracks: "tracks",
    continueLearning: "Continue Learning",
    continue: "Continue →",
    learningTracks: "Learning Tracks",
    lessons: "lessons",
    xpTotal: "XP total",
    currentLevel: "Current Level",
    dailyStreak: "Daily Streak",
    startStreak: "Start your streak today!",
    day: "day",
    daysInRow: "days in a row",
    reviewNeeded: "Review Needed",
    leaderboard: "Leaderboard",
    multipleFailures: "Multiple failures",

    // Track View
    backToDashboard: "← Back to Dashboard",
    complete: "complete",

    // Lesson View
    back: "← Back",
    startChallenge: "Start Challenge →",
    challengeComplete: "Challenge Complete!",
    perfectScore: "Perfect score! You nailed it.",
    goodEffort: "Good effort! You're getting there.",
    backToTrack: "Back to Track",
    nextLesson: "Next Lesson →",

    // Code Editor
    challenge: "// challenge",
    reset: "Reset",
    run: "▶ Run (Ctrl+Enter)",
    running: "Running...",
    output: "output",
    clickRun: 'Click "Run" to see output...',
    hint: "Hint: Look at the solution structure carefully. The key patterns you need are already in the starter code — focus on replacing the TODO comments with the right values.",

    // AI Explainer
    goDeeper: "✨ Go Deeper — Get an AI-Powered Explanation",
    apiKeyRequired: "🔑 OpenRouter API Key Required",
    apiKeyDescription: "Enter your OpenRouter API key to enable AI explanations. Get one free at",
    apiKeyStored: ". Uses free AI model — no cost. Key is stored locally in your browser.",
    apiKeyPlaceholder: "sk-or-...",
    saveAndGo: "Save & Go",
    aiThinking: "✨ AI is thinking...",
    generating: "Generating a personalized explanation...",
    error: "Error",
    tryAgain: "Try Again",
    aiExplanation: "✨ AI Explanation",
    didThisHelp: "Did this help?",
    explainDifferently: "I still don't understand — explain differently",

    // Profile
    skillBadges: "Skill Badges",
    earned: "earned",
    earnedBadge: "Earned!",
    trackProgress: "Track Progress",
    levelProgression: "Level Progression",
    resetAllProgress: "Reset All Progress",
    resetConfirm: "Reset all progress? This cannot be undone.",

    // Levels
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    plena: "Plena",

    // Hero
    heroSubtitle1: "Master the fundamentals.",
    heroSubtitle2: "Code like a senior dev.",
    heroStartBtn: "Start Learning →",
    heroLearnTitle: "LEARN",
    heroLearnLine1: "From Big O to deployment,",
    heroLearnLine2: "every concept explained with real-world projects",
    heroBuildTitle: "BUILD",
    heroBuildLine1: "Interactive challenges that make you think,",
    heroBuildLine2: "not just copy-paste",

    // Track names
    "CS Fundamentals": "CS Fundamentals",
    "Frontend Mastery": "Frontend Mastery",
    "Backend Fundamentals": "Backend Fundamentals",
    "DevOps Essentials": "DevOps Essentials",
    "System Design": "System Design",
  },

  pt: {
    // Navbar
    dashboard: "Painel",
    profile: "Perfil",
    streak: "sequência",
    level: "Nível",

    // Dashboard
    welcomeBack: "Bem-vinda de volta, Elly",
    readyToStart: "Pronta para começar sua jornada? Escolha uma trilha abaixo.",
    lessonsCompleted: "lições completas em",
    tracks: "trilhas",
    continueLearning: "Continuar Aprendendo",
    continue: "Continuar →",
    learningTracks: "Trilhas de Aprendizado",
    lessons: "lições",
    xpTotal: "XP total",
    currentLevel: "Nível Atual",
    dailyStreak: "Sequência Diária",
    startStreak: "Comece sua sequência hoje!",
    day: "dia",
    daysInRow: "dias seguidos",
    reviewNeeded: "Revisão Necessária",
    leaderboard: "Ranking",
    multipleFailures: "Múltiplas tentativas",

    // Track View
    backToDashboard: "← Voltar ao Painel",
    complete: "completo",

    // Lesson View
    back: "← Voltar",
    startChallenge: "Iniciar Desafio →",
    challengeComplete: "Desafio Completo!",
    perfectScore: "Nota perfeita! Você arrasou.",
    goodEffort: "Bom esforço! Você está chegando lá.",
    backToTrack: "Voltar à Trilha",
    nextLesson: "Próxima Lição →",

    // Code Editor
    challenge: "// desafio",
    reset: "Resetar",
    run: "▶ Executar (Ctrl+Enter)",
    running: "Executando...",
    output: "saída",
    clickRun: 'Clique em "Executar" para ver a saída...',
    hint: "Dica: Olhe a estrutura da solução com atenção. Os padrões que você precisa já estão no código inicial — foque em substituir os comentários TODO com os valores corretos.",

    // AI Explainer
    goDeeper: "✨ Aprofundar — Explicação com IA",
    apiKeyRequired: "🔑 Chave da API OpenRouter Necessária",
    apiKeyDescription: "Insira sua chave da API OpenRouter para habilitar explicações com IA. Obtenha uma grátis em",
    apiKeyStored: ". Usa modelo de IA gratuito — sem custo. A chave é armazenada localmente no seu navegador.",
    apiKeyPlaceholder: "sk-or-...",
    saveAndGo: "Salvar e Ir",
    aiThinking: "✨ IA está pensando...",
    generating: "Gerando uma explicação personalizada...",
    error: "Erro",
    tryAgain: "Tentar Novamente",
    aiExplanation: "✨ Explicação da IA",
    didThisHelp: "Isso ajudou?",
    explainDifferently: "Ainda não entendi — explique de outro jeito",

    // Profile
    skillBadges: "Badges de Habilidade",
    earned: "conquistados",
    earnedBadge: "Conquistado!",
    trackProgress: "Progresso das Trilhas",
    levelProgression: "Progressão de Nível",
    resetAllProgress: "Resetar Todo Progresso",
    resetConfirm: "Resetar todo progresso? Isso não pode ser desfeito.",

    // Levels
    beginner: "Iniciante",
    intermediate: "Intermediário",
    advanced: "Avançado",
    plena: "Plena",

    // Hero
    heroSubtitle1: "Domine os fundamentos.",
    heroSubtitle2: "Code como um dev sênior.",
    heroStartBtn: "Começar a Aprender →",
    heroLearnTitle: "APRENDA",
    heroLearnLine1: "De Big O ao deploy,",
    heroLearnLine2: "cada conceito explicado com projetos reais",
    heroBuildTitle: "CONSTRUA",
    heroBuildLine1: "Desafios interativos que fazem você pensar,",
    heroBuildLine2: "não apenas copiar e colar",

    // Track names
    "CS Fundamentals": "Fundamentos de CS",
    "Frontend Mastery": "Domínio Frontend",
    "Backend Fundamentals": "Fundamentos Backend",
    "DevOps Essentials": "DevOps Essencial",
    "System Design": "Design de Sistemas",
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('codepath_lang') || 'en');

  const toggleLang = useCallback(() => {
    setLang(prev => {
      const next = prev === 'en' ? 'pt' : 'en';
      localStorage.setItem('codepath_lang', next);
      return next;
    });
  }, []);

  const t = useCallback((key) => {
    return translations[lang]?.[key] || translations.en[key] || key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLang must be used within LanguageProvider');
  return context;
}
