// OnboardingFlow — 8-step wizard for new users
// Steps: welcome → name → age → experience → interests → motivation → time → auth → done
// On finish: creates user account (or guest) + saves all answers + generates study plan

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useAuth } from '../../context/AuthContext';
import { useGamification } from '../../context/GamificationContext';
import { buildStudyPlan } from '../../data/studyPlan';
import Mascot from '../gamification/Mascot';

// AGE COMES FIRST — affects vocabulary, parental consent requirements, and visual style
// from this point onward.
const STEPS = ['welcome', 'age', 'name', 'experience', 'interests', 'motivation', 'time', 'auth', 'plan'];

const AGE_OPTIONS = [
  { value: 9,  label: '8-10',  icon: '🧒', desc: 'Criança',        kid: true },
  { value: 12, label: '11-13', icon: '🎒', desc: 'Pré-adolescente', kid: true },
  { value: 15, label: '14-16', icon: '🎮', desc: 'Adolescente',     kid: false },
  { value: 17, label: '17+',   icon: '🚀', desc: 'Jovem adulto',    kid: false },
];

// Helper: returns true if the selected age requires parental consent (under 13)
function needsParentalConsent(age) {
  return age !== null && age <= 12;
}

// Helper: simplifies wording for younger kids (8-10 specifically)
function isYoungKid(age) {
  return age !== null && age <= 10;
}

const EXPERIENCE_OPTIONS = [
  { value: 'none',        icon: '🌱', title: 'Nunca, mas tô curioso(a)!', desc: 'Vamos começar do zero juntos' },
  { value: 'beginner',    icon: '👀', title: 'Já vi/ouvi falar',          desc: 'Sei o que é, nunca tentei' },
  { value: 'some',        icon: '⚡', title: 'Já fiz algumas coisas',     desc: 'Scratch, tutoriais, etc.' },
  { value: 'experienced', icon: '🔥', title: 'Já programo um pouco',      desc: 'Quero ir além' },
];

const INTEREST_OPTIONS = [
  { value: 'games',    icon: '🎮', label: 'Criar jogos',           desc: 'Roblox, Minecraft mods, game dev' },
  { value: 'apps',     icon: '📱', label: 'Apps para celular',     desc: 'TikTok, Insta, jogos mobile' },
  { value: 'websites', icon: '🌐', label: 'Sites e páginas web',   desc: 'Portfolio, blog, e-commerce' },
  { value: 'bots',     icon: '🤖', label: 'Bots e automações',     desc: 'Discord bots, scripts úteis' },
  { value: 'ai',       icon: '🧠', label: 'Inteligência Artificial', desc: 'ChatGPT, geração de imagem' },
  { value: 'cybersec', icon: '🛡️', label: 'Hackear (white-hat)',   desc: 'Cibersegurança ética' },
  { value: 'art',      icon: '🎨', label: 'Animações e arte',      desc: 'Arte digital, gráficos' },
  { value: 'systems',  icon: '🏗️', label: 'Como sistemas grandes funcionam', desc: 'Netflix, TikTok, etc.' },
];

const MOTIVATION_OPTIONS = [
  { value: 'fun',    icon: '🎉', label: 'Diversão e curiosidade' },
  { value: 'hobby',  icon: '✨', label: 'É meu hobby' },
  { value: 'school', icon: '📚', label: 'Pra escola/projetos' },
  { value: 'career', icon: '💼', label: 'Quero uma carreira em tech' },
];

const TIME_OPTIONS = [
  { value: '10min',   icon: '⚡', label: '10 min/dia',  desc: 'Rapidinho, mas todo dia' },
  { value: '30min',   icon: '🎯', label: '30 min/dia',  desc: 'Foco diário' },
  { value: '1hour',   icon: '🚀', label: '1h+/dia',     desc: 'Imersão total' },
  { value: 'weekend', icon: '📅', label: 'Só fim de semana', desc: 'Quando der tempo' },
];

export default function OnboardingFlow({ onComplete }) {
  const { signUp, signIn, continueAsGuest, completeOnboarding, onboardingComplete } = useAuth();
  const { setMascot, play, fireConfetti } = useGamification();

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({
    name: '',
    age: null,
    experience: null,
    interests: [],
    motivation: null,
    timePerDay: null,
  });
  const [authMode, setAuthMode] = useState('signup'); // 'signup' | 'signin' | 'guest'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [parentalEmail, setParentalEmail] = useState('');
  const [parentalConsent, setParentalConsent] = useState(false);
  const [authError, setAuthError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [plan, setPlan] = useState(null);

  // Derived: do we need parental consent based on selected age?
  const requiresParental = needsParentalConsent(answers.age);
  const youngKid = isYoungKid(answers.age);

  const cardRef = useRef(null);
  const step = STEPS[stepIndex];

  // Animate step transitions
  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.45, ease: 'power3.out' }
    );
    play('swipe');
  }, [stepIndex, play]);

  const next = () => {
    if (stepIndex < STEPS.length - 1) {
      setStepIndex(i => i + 1);
    }
  };

  const back = () => {
    if (stepIndex > 0) setStepIndex(i => i - 1);
  };

  const toggleInterest = (value) => {
    setAnswers(a => ({
      ...a,
      interests: a.interests.includes(value)
        ? a.interests.filter(v => v !== value)
        : [...a.interests, value],
    }));
    play('click');
  };

  const selectOption = (key, value) => {
    setAnswers(a => ({ ...a, [key]: value }));
    play('click');
    setTimeout(() => next(), 400);
  };

  const handleSubmitAuth = async () => {
    setAuthError('');
    setSubmitting(true);

    if (authMode === 'guest') {
      // Guest mode is not allowed for under-13 users — must have an account with parental consent
      if (requiresParental) {
        setAuthError('Crianças menores de 13 anos precisam de uma conta com autorização do responsável.');
        setSubmitting(false);
        return;
      }
      continueAsGuest(answers);
      finishOnboarding();
      return;
    }

    if (!email || !password) {
      setAuthError('Preencha email e senha.');
      setSubmitting(false);
      return;
    }
    if (password.length < 6) {
      setAuthError('A senha precisa de pelo menos 6 letras.');
      setSubmitting(false);
      return;
    }

    // Parental consent validation for under-13 signups
    if (requiresParental && authMode === 'signup') {
      if (!parentalConsent) {
        setAuthError('O responsável precisa marcar o consentimento.');
        setSubmitting(false);
        return;
      }
      if (!parentalEmail || !/^[^@]+@[^@]+\.[^@]+$/.test(parentalEmail)) {
        setAuthError('Email do responsável é obrigatório e precisa ser válido.');
        setSubmitting(false);
        return;
      }
    }

    // Enrich answers with parental info if applicable
    const enrichedAnswers = {
      ...answers,
      ...(requiresParental ? {
        parentalEmail,
        parentalConsentAt: new Date().toISOString(),
        requiresParentalConsent: true,
      } : {}),
    };

    let result;
    if (authMode === 'signup') {
      result = await signUp({ email, password, name: answers.name, onboardingData: enrichedAnswers });
    } else {
      result = await signIn({ email, password });
    }

    if (result.error) {
      setAuthError(result.error);
      setSubmitting(false);
    } else if (authMode === 'signin') {
      // Returning user — skip plan step, go straight in
      const builtPlan = buildStudyPlan({ ...answers, ...result.user });
      if (onComplete) onComplete(builtPlan);
    } else {
      finishOnboarding();
    }
  };

  const finishOnboarding = () => {
    const builtPlan = buildStudyPlan(answers);
    setPlan(builtPlan);
    setSubmitting(false);
    fireConfetti();
    setMascot('celebrating', `Bem-vindo(a) ao CodePath, ${answers.name}!`, 5000);
    setStepIndex(STEPS.indexOf('plan'));
  };

  const handleStartLearning = () => {
    play('levelUp');
    completeOnboarding();   // NOW mark onboarding done — App will switch to dashboard
    if (onComplete) onComplete(plan);
  };

  // Can we proceed from the current step? (validates required fields)
  const canProceed = () => {
    switch (step) {
      case 'name':       return answers.name.trim().length >= 2;
      case 'age':        return answers.age !== null;
      case 'experience': return answers.experience !== null;
      case 'interests':  return answers.interests.length >= 1;
      case 'motivation': return answers.motivation !== null;
      case 'time':       return answers.timePerDay !== null;
      default:           return true;
    }
  };

  const progressPct = ((stepIndex + 1) / STEPS.length) * 100;

  // Apply age-group class to root for adaptive styling
  // Determined as soon as age is selected (step 2)
  const ageClass = answers.age === null
    ? 'age-unknown'
    : youngKid ? 'age-young-kid'
    : requiresParental ? 'age-tween'
    : answers.age >= 17 ? 'age-young-adult'
    : 'age-teen';

  return (
    <div className={`onboarding-root ${ageClass}`}>
      {/* Animated background gradients */}
      <div className="onboarding-bg-glow onboarding-bg-glow-1" />
      <div className="onboarding-bg-glow onboarding-bg-glow-2" />

      {/* Progress bar */}
      <div className="onboarding-progress">
        <div className="onboarding-progress-fill" style={{ width: `${progressPct}%` }} />
      </div>

      {/* Mascot in corner */}
      <Mascot mood={step === 'welcome' ? 'waving' : step === 'plan' ? 'celebrating' : 'idle'} position="fixed-bottom-left" size={92} showBubble={false} />

      <div className="onboarding-container">
        <div ref={cardRef} className="onboarding-card">

          {step === 'welcome' && (
            <div className="onboarding-step">
              <div className="onboarding-emoji">👋</div>
              <h1 className="onboarding-title">Oi! Eu sou o Bit!</h1>
              <p className="onboarding-subtitle">
                Vou te ajudar a aprender a programar de um jeito divertido. 🎮
                <br /><br />
                <strong>Pra começar, preciso saber sua idade</strong> — assim eu adapto tudo (jeito de falar, exercícios, exemplos) certinho pra você.
              </p>
              <button className="onboarding-cta" onClick={next}>
                Tô pronto(a)! →
              </button>
              <div style={{ marginTop: 24, fontSize: 11, color: 'rgba(255,255,255,0.35)', maxWidth: 400, lineHeight: 1.5 }}>
                🔒 Sua privacidade é importante. A gente só usa seus dados pra personalizar o aprendizado — nunca compartilhamos com terceiros.
              </div>
            </div>
          )}

          {step === 'name' && (
            <div className="onboarding-step">
              <div className="onboarding-emoji">✏️</div>
              <h1 className="onboarding-title">
                {youngKid ? 'Como você quer ser chamado(a)?' : 'Qual é o seu nome?'}
              </h1>
              <p className="onboarding-subtitle">
                {youngKid
                  ? 'Pode ser seu nome ou um apelido legal! 😊'
                  : 'Pode ser seu nome real ou um apelido — como preferir.'}
              </p>
              <input
                type="text"
                className="onboarding-input"
                placeholder={youngKid ? 'Ex: Lucas, Bia, GamerKid...' : 'Seu nome ou apelido...'}
                value={answers.name}
                onChange={e => setAnswers(a => ({ ...a, name: e.target.value }))}
                onKeyDown={e => e.key === 'Enter' && canProceed() && next()}
                autoFocus
                maxLength={30}
              />
              <button className="onboarding-cta" onClick={next} disabled={!canProceed()}>
                Próximo →
              </button>
              {youngKid && (
                <div style={{ marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                  💡 Dica: não precisa colocar seu nome completo!
                </div>
              )}
            </div>
          )}

          {step === 'age' && (
            <div className="onboarding-step">
              <div className="onboarding-emoji">🎂</div>
              <h1 className="onboarding-title">Quantos anos você tem?</h1>
              <p className="onboarding-subtitle">
                Isso me ajuda a escolher o jeito certo de te ensinar.
              </p>
              <div className="onboarding-options grid-4">
                {AGE_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    className={`onboarding-option ${answers.age === opt.value ? 'selected' : ''}`}
                    onClick={() => selectOption('age', opt.value)}
                  >
                    <div className="onboarding-option-icon">{opt.icon}</div>
                    <div className="onboarding-option-label">{opt.label}</div>
                    <div className="onboarding-option-desc">{opt.desc}</div>
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.45)', maxWidth: 480, margin: '12px auto 0', lineHeight: 1.5 }}>
                ⚠️ Se você tem menos de 13 anos, vou pedir o email do seu pai, mãe ou responsável mais pra frente — é uma exigência da lei pra te proteger.
              </div>
            </div>
          )}

          {step === 'experience' && (
            <div className="onboarding-step">
              <div className="onboarding-emoji">💻</div>
              <h1 className="onboarding-title">Já teve contato com programação?</h1>
              <p className="onboarding-subtitle">Sem julgamento — vou começar do nível certo pra você.</p>
              <div className="onboarding-options grid-2">
                {EXPERIENCE_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    className={`onboarding-option ${answers.experience === opt.value ? 'selected' : ''}`}
                    onClick={() => selectOption('experience', opt.value)}
                  >
                    <div className="onboarding-option-icon">{opt.icon}</div>
                    <div className="onboarding-option-label">{opt.title}</div>
                    <div className="onboarding-option-desc">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'interests' && (
            <div className="onboarding-step">
              <div className="onboarding-emoji">🎯</div>
              <h1 className="onboarding-title">O que você quer aprender a fazer?</h1>
              <p className="onboarding-subtitle">Escolha quantas quiser! (mínimo 1)</p>
              <div className="onboarding-options grid-2-tight">
                {INTEREST_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    className={`onboarding-option compact ${answers.interests.includes(opt.value) ? 'selected' : ''}`}
                    onClick={() => toggleInterest(opt.value)}
                  >
                    <div className="onboarding-option-icon">{opt.icon}</div>
                    <div>
                      <div className="onboarding-option-label">{opt.label}</div>
                      <div className="onboarding-option-desc">{opt.desc}</div>
                    </div>
                    {answers.interests.includes(opt.value) && (
                      <div className="onboarding-check">✓</div>
                    )}
                  </button>
                ))}
              </div>
              <button className="onboarding-cta" onClick={next} disabled={!canProceed()}>
                Próximo → ({answers.interests.length} selecionado{answers.interests.length !== 1 ? 's' : ''})
              </button>
            </div>
          )}

          {step === 'motivation' && (
            <div className="onboarding-step">
              <div className="onboarding-emoji">🌟</div>
              <h1 className="onboarding-title">Por que quer aprender a programar?</h1>
              <p className="onboarding-subtitle">Não tem resposta certa — só pra eu entender você.</p>
              <div className="onboarding-options grid-2">
                {MOTIVATION_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    className={`onboarding-option ${answers.motivation === opt.value ? 'selected' : ''}`}
                    onClick={() => selectOption('motivation', opt.value)}
                  >
                    <div className="onboarding-option-icon">{opt.icon}</div>
                    <div className="onboarding-option-label">{opt.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'time' && (
            <div className="onboarding-step">
              <div className="onboarding-emoji">⏰</div>
              <h1 className="onboarding-title">Quanto tempo você tem por dia?</h1>
              <p className="onboarding-subtitle">Vou montar um ritmo de aprendizado realista.</p>
              <div className="onboarding-options grid-2">
                {TIME_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    className={`onboarding-option ${answers.timePerDay === opt.value ? 'selected' : ''}`}
                    onClick={() => selectOption('timePerDay', opt.value)}
                  >
                    <div className="onboarding-option-icon">{opt.icon}</div>
                    <div className="onboarding-option-label">{opt.label}</div>
                    <div className="onboarding-option-desc">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'auth' && (
            <div className="onboarding-step">
              <div className="onboarding-emoji">{requiresParental ? '👨‍👩‍👧' : '🔐'}</div>
              <h1 className="onboarding-title">
                {requiresParental ? 'Hora de chamar um adulto!' : 'Quase lá!'}
              </h1>

              {/* Parental consent flow for under 13 */}
              {requiresParental && authMode !== 'signin' && (
                <>
                  <p className="onboarding-subtitle">
                    Como você tem {answers.age <= 10 ? 'menos de 11' : 'menos de 13'} anos, a gente precisa que <strong>um adulto da sua família (pai, mãe ou responsável)</strong> autorize sua conta. É uma regra da lei (LGPD) pra te proteger.
                  </p>

                  <div className="parental-notice">
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#FBBF24', marginBottom: 8 }}>
                      📋 O que vai ser feito:
                    </div>
                    <ul style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', textAlign: 'left', lineHeight: 1.7, paddingLeft: 18, margin: 0 }}>
                      <li>Coletar nome (ou apelido) e idade</li>
                      <li>Salvar seu progresso de estudos</li>
                      <li>Mostrar conteúdo apropriado pra sua idade</li>
                      <li>Email do responsável pra notificações importantes</li>
                    </ul>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 12 }}>
                      Não compartilhamos seus dados com ninguém. Você pode pedir pra deletar tudo a qualquer momento.
                    </div>
                  </div>

                  <input
                    type="email"
                    className="onboarding-input"
                    placeholder="Email do pai/mãe/responsável"
                    value={parentalEmail}
                    onChange={e => setParentalEmail(e.target.value)}
                    autoComplete="email"
                  />
                  <input
                    type="email"
                    className="onboarding-input"
                    placeholder="Seu email (pode ser o mesmo)"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                  <input
                    type="password"
                    className="onboarding-input"
                    placeholder="Crie uma senha (mín. 6 letras)"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && parentalConsent && handleSubmitAuth()}
                    autoComplete="new-password"
                  />

                  <label className="parental-checkbox">
                    <input
                      type="checkbox"
                      checked={parentalConsent}
                      onChange={e => setParentalConsent(e.target.checked)}
                    />
                    <span>
                      Eu sou o(a) <strong>responsável</strong> e autorizo {answers.name || 'esta criança'} a usar o CodePath. Li e concordo com a coleta de dados acima.
                    </span>
                  </label>

                  {authError && <div className="auth-error">{authError}</div>}

                  <button
                    className="onboarding-cta"
                    onClick={handleSubmitAuth}
                    disabled={submitting || !parentalConsent}
                  >
                    {submitting ? 'Salvando...' : 'Autorizar e criar conta →'}
                  </button>

                  <button
                    className="onboarding-guest-link"
                    onClick={() => { setAuthMode('signin'); setAuthError(''); }}
                  >
                    Já temos uma conta — fazer login
                  </button>
                </>
              )}

              {/* Sign-in flow (any age) OR normal signup for 13+ */}
              {(!requiresParental || authMode === 'signin') && (
                <>
                  <p className="onboarding-subtitle">
                    {authMode === 'signin'
                      ? 'Entre na sua conta pra continuar de onde parou.'
                      : 'Crie uma conta pra salvar seu progresso e voltar de qualquer lugar.'}
                  </p>

                  <div className="auth-mode-switch">
                    <button
                      className={`auth-mode-btn ${authMode === 'signup' ? 'active' : ''}`}
                      onClick={() => { setAuthMode('signup'); setAuthError(''); }}
                    >
                      Criar conta
                    </button>
                    <button
                      className={`auth-mode-btn ${authMode === 'signin' ? 'active' : ''}`}
                      onClick={() => { setAuthMode('signin'); setAuthError(''); }}
                    >
                      Já tenho conta
                    </button>
                  </div>

                  <input
                    type="email"
                    className="onboarding-input"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                  <input
                    type="password"
                    className="onboarding-input"
                    placeholder="Sua senha (mín. 6 letras)"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSubmitAuth()}
                    autoComplete={authMode === 'signup' ? 'new-password' : 'current-password'}
                  />

                  {authError && <div className="auth-error">{authError}</div>}

                  <button
                    className="onboarding-cta"
                    onClick={handleSubmitAuth}
                    disabled={submitting}
                  >
                    {submitting ? 'Salvando...' : authMode === 'signup' ? 'Criar conta e começar →' : 'Entrar →'}
                  </button>

                  {!requiresParental && (
                    <button
                      className="onboarding-guest-link"
                      onClick={() => { setAuthMode('guest'); handleSubmitAuth(); }}
                      disabled={submitting}
                    >
                      Pular por agora (continuar como visitante)
                    </button>
                  )}
                </>
              )}
            </div>
          )}

          {step === 'plan' && plan && (
            <div className="onboarding-step plan-step">
              <div className="onboarding-emoji">🎉</div>
              <h1 className="onboarding-title">{plan.summary.welcomeMessage}</h1>
              <p className="onboarding-subtitle">Aqui está seu plano personalizado:</p>

              <div className="plan-cards">
                <div className="plan-card">
                  <div className="plan-card-label">Por onde você vai começar</div>
                  <div className="plan-card-value">{plan.summary.primaryTrack}</div>
                </div>
                <div className="plan-card">
                  <div className="plan-card-label">Sua meta semanal</div>
                  <div className="plan-card-value">{plan.summary.weeklyGoal}</div>
                </div>
                <div className="plan-card">
                  <div className="plan-card-label">Meta diária de XP</div>
                  <div className="plan-card-value">{plan.summary.dailyXpGoal} XP</div>
                </div>
                <div className="plan-card">
                  <div className="plan-card-label">Tempo estimado</div>
                  <div className="plan-card-value">{plan.summary.estimatedTime}</div>
                </div>
              </div>

              <button className="onboarding-cta" onClick={handleStartLearning}>
                Vamos codar! 🚀
              </button>
            </div>
          )}

          {/* Back button (not shown on welcome or plan) */}
          {step !== 'welcome' && step !== 'plan' && stepIndex > 0 && (
            <button className="onboarding-back" onClick={back}>
              ← Voltar
            </button>
          )}
        </div>

        <div className="onboarding-step-counter">
          Passo {stepIndex + 1} de {STEPS.length}
        </div>
      </div>
    </div>
  );
}
