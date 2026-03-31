import { useState } from 'react';
import { useApp } from '../context/AppContext';
import CodeEditor from './CodeEditor';
import AIExplainer from './AIExplainer';

export default function LessonView() {
  const {
    currentLesson, currentTrack, completedLessons,
    setCurrentView, setCurrentLesson,
    completeLesson, recordFail, recordInstantCorrect,
    shouldSimplify, getTrackProgress,
  } = useApp();

  const [lessonStep, setLessonStep] = useState('concept'); // concept, challenge, complete
  const [xpEarned, setXpEarned] = useState(0);

  if (!currentLesson || !currentTrack) {
    setCurrentView('dashboard');
    return null;
  }

  const isCompleted = completedLessons.includes(currentLesson.id);
  const simplified = shouldSimplify(currentLesson.id);
  const progress = getTrackProgress(currentTrack.id);

  const handleCodeResult = (result) => {
    if (result.allPassed) {
      const earned = result.passed === result.total ? currentLesson.xp : Math.round(currentLesson.xp * 0.5);
      setXpEarned(earned);
      if (!isCompleted) {
        completeLesson(currentLesson.id, earned);
        recordInstantCorrect(currentLesson.id);
      }
      setLessonStep('complete');
    } else if (result.passed > 0) {
      // Partial success
      setXpEarned(Math.round(currentLesson.xp * 0.5));
    } else {
      recordFail(currentLesson.id);
    }
  };

  const goToNextLesson = () => {
    const currentIndex = currentTrack.lessons.findIndex(l => l.id === currentLesson.id);
    if (currentIndex < currentTrack.lessons.length - 1) {
      setCurrentLesson(currentTrack.lessons[currentIndex + 1]);
      setLessonStep('concept');
      setXpEarned(0);
    } else {
      setCurrentView('track');
    }
  };

  return (
    <div className="lesson-view fade-in">
      <div className="lesson-topbar">
        <button className="back-btn" onClick={() => setCurrentView(currentTrack ? 'track' : 'dashboard')}>
          ← Back
        </button>
        <div className="lesson-progress">
          <div className="lesson-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="lesson-xp-badge">+{currentLesson.xp} XP</div>
      </div>

      <div className="lesson-content">
        {/* Hook */}
        <div className="lesson-hook">{currentLesson.hook}</div>

        {/* Title */}
        <h1 className="lesson-title">{currentLesson.title}</h1>

        {/* Concept */}
        {(lessonStep === 'concept' || lessonStep === 'challenge') && (
          <div className="lesson-concept">{currentLesson.concept}</div>
        )}

        {/* Start Challenge Button */}
        {lessonStep === 'concept' && (
          <button className="continue-btn" onClick={() => setLessonStep('challenge')} style={{ alignSelf: 'flex-start' }}>
            Start Challenge →
          </button>
        )}

        {/* Code Challenge */}
        {lessonStep === 'challenge' && (
          <CodeEditor
            challenge={currentLesson.challenge}
            onResult={handleCodeResult}
            simplified={simplified}
          />
        )}

        {/* XP Reward */}
        {lessonStep === 'complete' && (
          <div className="xp-reward slide-up">
            <h3>Challenge Complete!</h3>
            <div className="xp-amount">+{xpEarned} XP</div>
            <div className="message">
              {xpEarned === currentLesson.xp
                ? "Perfect score! You nailed it."
                : "Good effort! You're getting there."
              }
            </div>
            <div className="xp-reward-actions">
              <button className="back-btn" onClick={() => setCurrentView('track')}>
                Back to Track
              </button>
              <button className="continue-btn" onClick={goToNextLesson}>
                Next Lesson →
              </button>
            </div>
          </div>
        )}

        {/* AI Explainer - always available */}
        <AIExplainer lesson={currentLesson} />
      </div>
    </div>
  );
}
