// Profile screen — user customization hub
// Sections: Avatar + name, personal info, study plan, badges, track progress,
// settings (sound, language, reset progress, logout)

import { useApp } from '../context/AppContext';
import { useLang } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useGamification } from '../context/GamificationContext';
import { useTranslatedContent } from '../hooks/useTranslatedContent';
import { buildStudyPlan } from '../data/studyPlan';
import AvatarUpload from './profile/AvatarUpload';
import PersonalInfoEditor from './profile/PersonalInfoEditor';
import Inventory from './profile/Inventory';
import StreakFlame from './gamification/StreakFlame';
import AnimatedXPBar from './gamification/AnimatedXPBar';

export default function Profile() {
  const {
    xp, streak, completedLessons, earnedBadges, tracks, badges, levels,
    setCurrentView, getLevel, getTrackProgress, resetProgress,
  } = useApp();
  const { lang, toggleLang, t } = useLang();
  const { user, signOut } = useAuth();
  const { soundEnabled, toggleSound, coins, inventory } = useGamification();
  const { tBadge } = useTranslatedContent();

  const level = getLevel();
  const totalLessons = tracks.reduce((s, t) => s + t.lessons.length, 0);

  // Rebuild plan from user data (if onboarding data exists)
  const plan = user?.experience ? buildStudyPlan(user) : null;

  const handleLogout = () => {
    if (window.confirm('Sair da conta? Seu progresso fica salvo se você logar de novo.')) {
      signOut();
      setCurrentView('landing');
    }
  };

  return (
    <div className="fade-in">
      <nav className="navbar">
        <button className="navbar-brand" onClick={() => setCurrentView('dashboard')}>
          &gt;_ CodePath
        </button>
        <div className="navbar-stats">
          <div className="coin-badge"><span className="icon">🪙</span><span>{coins}</span></div>
          <StreakFlame streak={streak} size="small" />
          <button className="lang-toggle" onClick={toggleLang} title="Switch language">
            {lang === 'en' ? '🇧🇷 PT' : '🇺🇸 EN'}
          </button>
          <button
            className="sound-toggle"
            onClick={toggleSound}
            title={soundEnabled ? 'Desligar som' : 'Ligar som'}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
        </div>
        <div className="navbar-nav">
          <button className="nav-btn" onClick={() => setCurrentView('dashboard')}>{t('dashboard')}</button>
          <button className="nav-btn active" onClick={() => setCurrentView('profile')}>{t('profile')}</button>
        </div>
      </nav>

      <div className="profile">
        {/* === HERO: Avatar + Name + Level === */}
        <div className="profile-hero">
          <AvatarUpload size={140} editable={true} />
          <div className="profile-hero-info">
            <h1 className="profile-name">{user?.name || 'Visitante'}</h1>
            <div className="profile-level-row">
              <span className="profile-level-badge" style={{ background: level.color }}>
                {t(level.name.toLowerCase())}
              </span>
              <span className="profile-xp-text">{xp} XP</span>
            </div>
            <AnimatedXPBar xp={xp} level={level} height={10} showLabels={false} />
            <div className="profile-meta">
              {completedLessons.length}/{totalLessons} {t('lessons')} · {streak} {streak === 1 ? t('day') : t('daysInRow')}
            </div>
          </div>
        </div>

        {/* === Two-column layout === */}
        <div className="profile-grid">

          {/* LEFT COLUMN */}
          <div className="profile-col">

            {/* Personal Info */}
            <div className="card">
              <div className="card-header">
                <h2>👤 Informações pessoais</h2>
              </div>
              <PersonalInfoEditor />
            </div>

            {/* Study Plan */}
            {plan && (
              <div className="card">
                <div className="card-header">
                  <h2>📚 Seu plano de estudo</h2>
                </div>
                <div className="study-plan-grid">
                  <div className="study-plan-tile">
                    <div className="plan-tile-label">Trilha principal</div>
                    <div className="plan-tile-value">{plan.summary.primaryTrack}</div>
                  </div>
                  <div className="study-plan-tile">
                    <div className="plan-tile-label">Meta semanal</div>
                    <div className="plan-tile-value">{plan.summary.weeklyGoal}</div>
                  </div>
                  <div className="study-plan-tile">
                    <div className="plan-tile-label">Meta diária</div>
                    <div className="plan-tile-value">{plan.summary.dailyXpGoal} XP</div>
                  </div>
                  <div className="study-plan-tile">
                    <div className="plan-tile-label">Tempo estimado</div>
                    <div className="plan-tile-value">{plan.summary.estimatedTime}</div>
                  </div>
                </div>
                {plan.recommendedTracks && plan.recommendedTracks.length > 1 && (
                  <div className="plan-recommended">
                    <div className="plan-recommended-label">Trilhas recomendadas pra você:</div>
                    <div className="plan-recommended-list">
                      {plan.recommendedTracks.slice(0, 3).map((trackId, i) => {
                        const track = tracks.find(tr => tr.id === trackId);
                        if (!track) return null;
                        return (
                          <div key={trackId} className="plan-track-chip" style={{ borderColor: track.color }}>
                            <span>{track.icon}</span>
                            <span>{t(track.title)}</span>
                            {i === 0 && <span className="plan-track-badge">⭐ principal</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Track Progress */}
            <div className="card">
              <div className="card-header">
                <h2>📊 {t('trackProgress')}</h2>
              </div>
              {tracks.map(track => {
                const progress = getTrackProgress(track.id);
                const completedCount = track.lessons.filter(l => completedLessons.includes(l.id)).length;
                return (
                  <div key={track.id} style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{track.icon} {t(track.title)}</span>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {completedCount}/{track.lessons.length}
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-bar-fill" style={{ width: `${progress}%`, backgroundColor: track.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="profile-col">

            {/* Stats summary */}
            <div className="card stats-card">
              <div className="card-header">
                <h2>⚡ Resumo</h2>
              </div>
              <div className="stats-grid">
                <div className="stat-tile">
                  <div className="stat-icon">🪙</div>
                  <div className="stat-value">{coins}</div>
                  <div className="stat-label">moedas</div>
                </div>
                <div className="stat-tile">
                  <div className="stat-icon">🎒</div>
                  <div className="stat-value">{inventory.length}</div>
                  <div className="stat-label">items</div>
                </div>
                <div className="stat-tile">
                  <div className="stat-icon">🏆</div>
                  <div className="stat-value">{earnedBadges.length}</div>
                  <div className="stat-label">conquistas</div>
                </div>
                <div className="stat-tile">
                  <div className="stat-icon">📚</div>
                  <div className="stat-value">{completedLessons.length}</div>
                  <div className="stat-label">lições</div>
                </div>
              </div>
            </div>

            {/* Inventory */}
            <div className="card">
              <Inventory />
            </div>

            {/* Badges */}
            <div className="card">
              <div className="card-header">
                <h2>🏆 {t('skillBadges')}</h2>
                <span className="subtitle">{earnedBadges.length}/{badges.length} {t('earned')}</span>
              </div>
              <div className="badges-grid">
                {badges.map(badge => {
                  const translated = tBadge(badge);
                  const isEarned = earnedBadges.includes(badge.id);
                  return (
                    <div key={badge.id} className={`badge-card ${isEarned ? 'earned' : 'locked'}`}>
                      <div className="badge-icon">{badge.icon}</div>
                      <div className="badge-name">{translated.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                        {isEarned ? t('earnedBadge') : translated.description}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Settings */}
            <div className="card">
              <div className="card-header">
                <h2>⚙️ Configurações</h2>
              </div>

              <div className="setting-row">
                <div>
                  <div className="setting-label">Sons</div>
                  <div className="setting-desc">Efeitos sonoros do app</div>
                </div>
                <button className={`toggle-switch ${soundEnabled ? 'on' : 'off'}`} onClick={toggleSound}>
                  <span className="toggle-thumb" />
                </button>
              </div>

              <div className="setting-row">
                <div>
                  <div className="setting-label">Idioma</div>
                  <div className="setting-desc">{lang === 'pt' ? 'Português (BR)' : 'English'}</div>
                </div>
                <button className="setting-action-btn" onClick={toggleLang}>
                  Trocar para {lang === 'pt' ? 'EN' : 'PT'}
                </button>
              </div>

              {!user?.isGuest && user?.email && (
                <div className="setting-row">
                  <div>
                    <div className="setting-label">Conta</div>
                    <div className="setting-desc">{user.email}</div>
                  </div>
                  <button className="setting-action-btn danger-soft" onClick={handleLogout}>
                    Sair
                  </button>
                </div>
              )}

              <div className="setting-row danger">
                <div>
                  <div className="setting-label">Apagar progresso</div>
                  <div className="setting-desc">Zera XP, lições, items, conquistas</div>
                </div>
                <button
                  className="setting-action-btn danger"
                  onClick={() => { if (window.confirm(t('resetConfirm'))) resetProgress(); }}
                >
                  Apagar tudo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
