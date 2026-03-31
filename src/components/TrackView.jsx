import { useApp } from '../context/AppContext';

export default function TrackView() {
  const {
    currentTrack, completedLessons,
    setCurrentView, setCurrentLesson, setCurrentTrack, getTrackProgress,
  } = useApp();

  if (!currentTrack) {
    setCurrentView('dashboard');
    return null;
  }

  const progress = getTrackProgress(currentTrack.id);

  const startLesson = (lesson) => {
    setCurrentLesson(lesson);
    setCurrentView('lesson');
  };

  return (
    <div className="fade-in">
      <nav className="navbar">
        <button className="navbar-brand" onClick={() => setCurrentView('dashboard')}>
          &gt;_ CodePath
        </button>
        <div className="navbar-nav">
          <button className="nav-btn" onClick={() => setCurrentView('dashboard')}>Dashboard</button>
          <button className="nav-btn" onClick={() => setCurrentView('profile')}>Profile</button>
        </div>
      </nav>

      <div className="track-view">
        <button className="back-btn" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</button>

        <div className="track-view-header" style={{ marginTop: 16 }}>
          <div className="track-view-icon">{currentTrack.icon}</div>
          <div>
            <h1>{currentTrack.title}</h1>
            <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>
              {currentTrack.lessons.length} lessons · {progress}% complete
            </div>
          </div>
        </div>

        <div className="progress-bar" style={{ marginBottom: 24 }}>
          <div className="progress-bar-fill" style={{ width: `${progress}%`, backgroundColor: currentTrack.color }} />
        </div>

        <div className="lesson-list">
          {currentTrack.lessons.map((lesson, i) => {
            const isCompleted = completedLessons.includes(lesson.id);
            return (
              <div
                key={lesson.id}
                className={`lesson-item ${isCompleted ? 'completed' : ''}`}
                onClick={() => startLesson(lesson)}
              >
                <div className="lesson-number">
                  {isCompleted ? '✓' : i + 1}
                </div>
                <div className="lesson-item-info">
                  <h3>{lesson.title}</h3>
                  <div className="xp-label">+{lesson.xp} XP · {lesson.difficulty}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
