import { useApp } from '../context/AppContext';

export default function Profile() {
  const {
    xp, streak, completedLessons, earnedBadges, tracks, badges, levels,
    setCurrentView, getLevel, getTrackProgress, resetProgress,
  } = useApp();

  const level = getLevel();
  const totalLessons = tracks.reduce((s, t) => s + t.lessons.length, 0);

  return (
    <div className="fade-in">
      <nav className="navbar">
        <button className="navbar-brand" onClick={() => setCurrentView('dashboard')}>
          &gt;_ CodePath
        </button>
        <div className="navbar-nav">
          <button className="nav-btn" onClick={() => setCurrentView('dashboard')}>Dashboard</button>
          <button className="nav-btn active" onClick={() => setCurrentView('profile')}>Profile</button>
        </div>
      </nav>

      <div className="profile">
        <div className="profile-header">
          <div style={{ fontSize: 64, marginBottom: 8 }}>👩‍💻</div>
          <div className="profile-level" style={{ color: level.color }}>{level.name}</div>
          <div className="profile-xp">{xp} XP</div>
          <div style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 8 }}>
            {completedLessons.length}/{totalLessons} lessons · {streak} day streak
          </div>
        </div>

        <div className="card" style={{ marginBottom: 24 }}>
          <div className="card-header">
            <h2>Skill Badges</h2>
            <span className="subtitle">{earnedBadges.length}/{badges.length} earned</span>
          </div>
          <div className="badges-grid">
            {badges.map(badge => {
              const isEarned = earnedBadges.includes(badge.id);
              return (
                <div key={badge.id} className={`badge-card ${isEarned ? 'earned' : 'locked'}`}>
                  <div className="badge-icon">{badge.icon}</div>
                  <div className="badge-name">{badge.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                    {isEarned ? 'Earned!' : badge.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card" style={{ marginBottom: 24 }}>
          <div className="card-header">
            <h2>Track Progress</h2>
          </div>
          {tracks.map(track => {
            const progress = getTrackProgress(track.id);
            const completedCount = track.lessons.filter(l => completedLessons.includes(l.id)).length;
            return (
              <div key={track.id} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{track.icon} {track.title}</span>
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

        <div className="card">
          <div className="card-header">
            <h2>Level Progression</h2>
          </div>
          {levels.map(lvl => {
            const isCurrent = lvl.name === level.name;
            return (
              <div key={lvl.name} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                background: isCurrent ? 'rgba(74, 222, 128, 0.08)' : 'transparent',
                marginBottom: 4,
              }}>
                <div style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: xp >= lvl.minXP ? lvl.color : 'var(--border)',
                }} />
                <span style={{ flex: 1, fontSize: 14, color: isCurrent ? lvl.color : 'var(--text-secondary)' }}>
                  {lvl.name}
                </span>
                <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  {lvl.minXP} - {lvl.maxXP === Infinity ? '∞' : lvl.maxXP} XP
                </span>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => { if (window.confirm('Reset all progress? This cannot be undone.')) resetProgress(); }}
          style={{
            marginTop: 24,
            padding: '8px 16px',
            background: 'transparent',
            border: '1px solid var(--error)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--error)',
            fontFamily: 'var(--font-sans)',
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          Reset All Progress
        </button>
      </div>
    </div>
  );
}
