import { useApp } from '../context/AppContext';

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

  return (
    <div className="fade-in">
      <nav className="navbar">
        <button className="navbar-brand" onClick={() => setCurrentView('dashboard')}>
          &gt;_ CodePath <span>v1.0</span>
        </button>
        <div className="navbar-stats">
          <div className="stat-badge streak">
            <span>streak</span>
            <span className="value">{streak}d</span>
          </div>
          <div className="stat-badge">
            <span>XP</span>
            <span className="value">{xp}</span>
          </div>
          <div className="stat-badge">
            <span>Level</span>
            <span className="value">{level.name}</span>
          </div>
        </div>
        <div className="navbar-nav">
          <button className="nav-btn active" onClick={() => setCurrentView('dashboard')}>Dashboard</button>
          <button className="nav-btn" onClick={() => setCurrentView('profile')}>Profile</button>
        </div>
      </nav>

      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Welcome back, Elly</h1>
          <p>
            {completedLessons.length === 0
              ? "Ready to start your journey? Pick a track below."
              : `${completedLessons.length} lessons completed across ${tracks.filter(t => t.lessons.some(l => completedLessons.includes(l.id))).length} tracks`
            }
          </p>
        </div>

        <div className="dashboard-grid">
          <div>
            {nextLesson && (
              <div className="card continue-card" onClick={() => startLesson(nextLesson.track, nextLesson.lesson)} style={{ marginBottom: 24 }}>
                <div className="card-header">
                  <h2>Continue Learning</h2>
                  <span className="subtitle">{nextLesson.track.icon} {nextLesson.track.title}</span>
                </div>
                <div className="lesson-title">{nextLesson.lesson.title}</div>
                <div className="track-name">{nextLesson.lesson.hook}</div>
                <button className="continue-btn">Continue →</button>
              </div>
            )}

            <div className="card">
              <div className="card-header">
                <h2>Learning Tracks</h2>
                <span className="subtitle">{tracks.length} tracks</span>
              </div>
              <div className="track-list">
                {tracks.map(track => {
                  const progress = getTrackProgress(track.id);
                  const completedCount = track.lessons.filter(l => completedLessons.includes(l.id)).length;
                  return (
                    <div key={track.id} className="track-card" onClick={() => openTrack(track)}>
                      <div className="track-icon">{track.icon}</div>
                      <div className="track-info">
                        <h3>{track.title}</h3>
                        <div className="meta">{completedCount}/{track.lessons.length} lessons · {track.lessons.reduce((s, l) => s + l.xp, 0)} XP total</div>
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
              <div className="level-label">Current Level</div>
              <div className="level-name" style={{ color: level.color }}>{level.name}</div>
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
              <div className="streak-label">Daily Streak</div>
              <div className="streak-number" style={{ color: streak > 0 ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                {streak}
              </div>
              <div className="streak-label">{streak === 0 ? 'Start your streak today!' : streak === 1 ? 'day' : 'days in a row'}</div>
            </div>

            {weakSpots.length > 0 && (
              <div className="card">
                <div className="card-header">
                  <h2>Review Needed</h2>
                </div>
                {weakSpots.slice(0, 3).map(ws => (
                  <div key={ws.lesson.id} className="weak-spot-item" onClick={() => startLesson(ws.track, ws.lesson)}>
                    <div>
                      <div className="label">{ws.lesson.title}</div>
                      <div className="reason">{ws.reason}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="card">
              <div className="card-header">
                <h2>Leaderboard</h2>
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
