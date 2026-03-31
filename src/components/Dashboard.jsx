import { useApp } from '../context/AppContext';
import { useLang } from '../context/LanguageContext';
import OrbitingSkills from './ui/OrbitingSkills';

const mockLeaderboard = [
  { name: "Average Learner", xp: 1200 },
  { name: "Dedicated Dev", xp: 2800 },
  { name: "Weekend Warrior", xp: 600 },
  { name: "Night Owl", xp: 1800 },
];

export default function Dashboard() {
  const {
    xp, streak, tracks, completedLessons, earnedBadges,
    setCurrentView, setCurrentLesson, setCurrentTrack,
    getLevel, getTrackProgress, getNextLesson, getWeakSpots,
  } = useApp();
  const { lang, toggleLang, t } = useLang();

  const level = getLevel();
  const nextLesson = getNextLesson();
  const weakSpots = getWeakSpots();

  const allEntries = [...mockLeaderboard, { name: "You", xp }]
    .sort((a, b) => b.xp - a.xp);

  const startLesson = (track, lesson) => {
    setCurrentTrack(track);
    setCurrentLesson(lesson);
    setCurrentView('lesson');
  };

  const openTrack = (track) => {
    setCurrentTrack(track);
    setCurrentView('track');
  };

  const levelName = t(level.name.toLowerCase());

  return (
    <div className="fade-in">
      <nav className="navbar">
        <button className="navbar-brand" onClick={() => setCurrentView('dashboard')}>
          &gt;_ CodePath <span>v1.0</span>
        </button>
        <div className="navbar-stats">
          <button className="lang-toggle" onClick={toggleLang} title="Switch language">
            {lang === 'en' ? '🇧🇷 PT' : '🇺🇸 EN'}
          </button>
          <div className="stat-badge streak">
            <span>{t('streak')}</span>
            <span className="value">{streak}d</span>
          </div>
          <div className="stat-badge">
            <span>XP</span>
            <span className="value">{xp}</span>
          </div>
          <div className="stat-badge">
            <span>{t('level')}</span>
            <span className="value">{levelName}</span>
          </div>
        </div>
        <div className="navbar-nav">
          <button className="nav-btn active" onClick={() => setCurrentView('dashboard')}>{t('dashboard')}</button>
          <button className="nav-btn" onClick={() => setCurrentView('profile')}>{t('profile')}</button>
        </div>
      </nav>

      <div className="dashboard">
        <div style={{ marginBottom: '2rem' }}>
          <OrbitingSkills />
        </div>

        <div className="dashboard-header">
          <h1>{t('welcomeBack')}</h1>
          <p>
            {completedLessons.length === 0
              ? t('readyToStart')
              : `${completedLessons.length} ${t('lessonsCompleted')} ${tracks.filter(t => t.lessons.some(l => completedLessons.includes(l.id))).length} ${t('tracks')}`
            }
          </p>
        </div>

        <div className="dashboard-grid">
          <div>
            {nextLesson && (
              <div className="card continue-card" onClick={() => startLesson(nextLesson.track, nextLesson.lesson)} style={{ marginBottom: 24 }}>
                <div className="card-header">
                  <h2>{t('continueLearning')}</h2>
                  <span className="subtitle">{nextLesson.track.icon} {t(nextLesson.track.title)}</span>
                </div>
                <div className="lesson-title">{nextLesson.lesson.title}</div>
                <div className="track-name">{nextLesson.lesson.hook}</div>
                <button className="continue-btn">{t('continue')}</button>
              </div>
            )}

            <div className="card">
              <div className="card-header">
                <h2>{t('learningTracks')}</h2>
                <span className="subtitle">{tracks.length} {t('tracks')}</span>
              </div>
              <div className="track-list">
                {tracks.map(track => {
                  const progress = getTrackProgress(track.id);
                  const completedCount = track.lessons.filter(l => completedLessons.includes(l.id)).length;
                  return (
                    <div key={track.id} className="track-card" onClick={() => openTrack(track)}>
                      <div className="track-icon">{track.icon}</div>
                      <div className="track-info">
                        <h3>{t(track.title)}</h3>
                        <div className="meta">{completedCount}/{track.lessons.length} {t('lessons')} · {track.lessons.reduce((s, l) => s + l.xp, 0)} {t('xpTotal')}</div>
                        <div className="progress-bar">
                          <div className="progress-bar-fill" style={{ width: `${progress}%`, backgroundColor: track.color }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="sidebar-cards">
            <div className="card level-card">
              <div className="level-label">{t('currentLevel')}</div>
              <div className="level-name" style={{ color: level.color }}>{levelName}</div>
              <div className="progress-bar" style={{ marginBottom: 8 }}>
                <div className="progress-bar-fill" style={{
                  width: `${Math.min(100, ((xp - level.minXP) / (level.maxXP - level.minXP)) * 100)}%`,
                  backgroundColor: level.color,
                }} />
              </div>
              <div className="xp-display">
                <span className="current">{xp}</span> / {level.maxXP === Infinity ? '∞' : level.maxXP} XP
              </div>
            </div>

            <div className="card streak-card">
              <div className="streak-label">{t('dailyStreak')}</div>
              <div className="streak-number" style={{ color: streak > 0 ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                {streak}
              </div>
              <div className="streak-label">{streak === 0 ? t('startStreak') : streak === 1 ? t('day') : t('daysInRow')}</div>
            </div>

            {weakSpots.length > 0 && (
              <div className="card">
                <div className="card-header">
                  <h2>{t('reviewNeeded')}</h2>
                </div>
                {weakSpots.slice(0, 3).map(ws => (
                  <div key={ws.lesson.id} className="weak-spot-item" onClick={() => startLesson(ws.track, ws.lesson)}>
                    <div>
                      <div className="label">{ws.lesson.title}</div>
                      <div className="reason">{t('multipleFailures')}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="card">
              <div className="card-header">
                <h2>{t('leaderboard')}</h2>
              </div>
              {allEntries.map((entry, i) => (
                <div key={entry.name} className="leaderboard-item">
                  <div className={`leaderboard-rank ${i === 0 ? 'gold' : ''}`}>{i + 1}</div>
                  <div className={`leaderboard-name ${entry.name === 'You' ? 'you' : ''}`}>{entry.name}</div>
                  <div className="leaderboard-xp">{entry.xp} XP</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
