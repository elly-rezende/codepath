import { useState } from 'react';
import MultipleChoiceExercise from './exercises/MultipleChoiceExercise';
import DragDropExercise from './exercises/DragDropExercise';
import CodingWithConsole from './exercises/CodingWithConsole';
import CodingExercise from './exercises/CodingExercise';
import SequentialExercise from './exercises/SequentialExercise';
import AIExplainer from './AIExplainer';
import { useApp } from '../context/AppContext';
import { useLang } from '../context/LanguageContext';

const PHASES = ['assess', 'learn', 'practice', 'apply', 'final'];
const PHASE_KEYS = { assess: 'phaseAssess', learn: 'phaseLearn', practice: 'phasePractice', apply: 'phaseApply', final: 'phaseFinal' };

function renderConceptText(text) {
  if (!text) return null;
  const lines = text.split('\n');
  const result = [];
  let bulletBuffer = [];

  const flushBullets = (key) => {
    if (bulletBuffer.length > 0) {
      result.push(
        <ul key={`ul-${key}`} style={{ paddingLeft: '20px', marginBottom: '12px', color: 'var(--text-secondary)' }}>
          {bulletBuffer.map((b, i) => <li key={i} style={{ marginBottom: '4px' }}>{renderInline(b)}</li>)}
        </ul>
      );
      bulletBuffer = [];
    }
  };

  lines.forEach((line, i) => {
    if (line.startsWith('- ')) {
      bulletBuffer.push(line.slice(2));
    } else {
      flushBullets(i);
      if (line.trim()) {
        result.push(
          <p key={i} style={{ marginBottom: '12px', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
            {renderInline(line)}
          </p>
        );
      }
    }
  });
  flushBullets('end');
  return result;
}

function renderInline(text) {
  if (!text) return '';
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function PhaseTabs({ phase, completedPhases, trackColor, onTabClick, t }) {
  return (
    <div className="phase-tabs">
      {PHASES.map((p) => {
        const isDone = completedPhases.includes(p);
        const isActive = phase === p;
        const isLocked = !isDone && !isActive;
        let className = 'phase-tab';
        if (isActive) className += ' active';
        else if (isDone) className += ' done';
        else if (isLocked) className += ' locked';

        return (
          <button
            key={p}
            className={className}
            style={isActive ? { background: trackColor || '#00D4FF' } : {}}
            onClick={() => !isLocked && onTabClick(p)}
            disabled={isLocked}
          >
            {isDone && !isActive ? '✓ ' : ''}{t(PHASE_KEYS[p])}
          </button>
        );
      })}
    </div>
  );
}

export default function LessonView() {
  const {
    currentLesson, currentTrack, completedLessons,
    setCurrentView, setCurrentLesson,
    completeLesson, recordFail,
  } = useApp();
  const { lang, toggleLang, t } = useLang();

  const lesson = currentLesson;

  const [phase, setPhase] = useState('assess');
  const [completedPhases, setCompletedPhases] = useState([]);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [applyIndex, setApplyIndex] = useState(0);

  if (!lesson || !currentTrack) {
    setCurrentView('dashboard');
    return null;
  }

  const trackColor = currentTrack.color || '#00D4FF';

  const progressPct = (() => {
    const order = ['assess', 'learn', 'practice', 'apply', 'final'];
    const idx = order.indexOf(phase);
    return Math.round(((idx + 1) / (order.length + 1)) * 100);
  })();

  const markPhaseComplete = (p) => {
    setCompletedPhases(prev => prev.includes(p) ? prev : [...prev, p]);
  };

  const handleComplete = () => {
    completeLesson(lesson.id, lesson.xp);
    markPhaseComplete('final');
    setPhase('complete');
  };

  const goToNextLesson = () => {
    const idx = currentTrack.lessons.findIndex(l => l.id === lesson.id);
    if (idx >= 0 && idx < currentTrack.lessons.length - 1) {
      setCurrentLesson(currentTrack.lessons[idx + 1]);
      setPhase('assess');
      setCompletedPhases([]);
      setPracticeIndex(0);
      setApplyIndex(0);
    } else {
      setCurrentView('track');
    }
  };

  const handleTabClick = (p) => {
    if (completedPhases.includes(p) || p === phase) {
      setPhase(p);
    }
  };

  const renderPracticeExercise = () => {
    const ex = lesson.practice && lesson.practice[practiceIndex];
    if (!ex) return null;
    const advance = () => {
      if (practiceIndex < 2) {
        setPracticeIndex(i => i + 1);
      } else {
        markPhaseComplete('practice');
        setApplyIndex(0);
        setPhase('apply');
      }
    };
    switch (ex.type) {
      case 'dragDrop':
        return <DragDropExercise exercise={ex} onComplete={advance} />;
      case 'multipleChoiceWithConsole':
        return <CodingWithConsole exercise={ex} onComplete={advance} />;
      case 'multipleChoice':
      default:
        return <MultipleChoiceExercise exercise={ex} onComplete={advance} />;
    }
  };

  return (
    <div className="lesson-view fade-in">
      {/* Topbar */}
      <div className="lesson-topbar">
        <button className="back-btn" onClick={() => setCurrentView('track')}>
          {t('back')}
        </button>
        <div className="lesson-progress">
          <div className="lesson-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <button className="lang-toggle" onClick={toggleLang} title="Switch language">
          {lang === 'en' ? '🇧🇷 PT' : '🇺🇸 EN'}
        </button>
        <div className="lesson-xp-badge">+{lesson.xp} XP</div>
      </div>

      {/* Phase tabs (not shown on complete screen) */}
      {phase !== 'complete' && (
        <PhaseTabs
          phase={phase}
          completedPhases={completedPhases}
          trackColor={trackColor}
          onTabClick={handleTabClick}
          t={t}
        />
      )}

      <div className="lesson-content">
        {/* ASSESS */}
        {phase === 'assess' && lesson.assess && (
          <div>
            <MultipleChoiceExercise
              exercise={lesson.assess}
              onComplete={() => {
                markPhaseComplete('assess');
                setPhase('learn');
              }}
            />
            <button
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '13px',
                marginTop: '8px',
                textDecoration: 'underline',
              }}
              onClick={() => {
                markPhaseComplete('assess');
                setPhase('learn');
              }}
            >
              {t('skipPhase')}
            </button>
          </div>
        )}

        {/* LEARN */}
        {phase === 'learn' && lesson.learn && (
          <div>
            {lesson.learn.hook && (
              <div className="learn-hook">{lesson.learn.hook}</div>
            )}

            {lesson.learn.video && (
              <div className="video-card">
                <div className="video-thumbnail">▶</div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '15px', marginBottom: '4px' }}>
                    {lesson.learn.video.title || lesson.title}
                  </div>
                  {lesson.learn.video.duration && (
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      {lesson.learn.video.duration}
                    </div>
                  )}
                  {lesson.learn.video.url && (
                    <a
                      href={lesson.learn.video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '13px', color: 'var(--accent-blue)', textDecoration: 'none' }}
                    >
                      {t('watchOnCS50')}
                    </a>
                  )}
                </div>
              </div>
            )}

            {lesson.learn.conceptText && (
              <div className="concept-text" style={{ marginBottom: '20px' }}>
                {renderConceptText(lesson.learn.conceptText)}
              </div>
            )}

            {lesson.learn.realWorldExample && (
              <div className="realworld-callout">
                <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--accent-amber)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {t('realWorld')}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                  {lesson.learn.realWorldExample}
                </div>
              </div>
            )}

            <button
              className="continue-btn"
              style={{ marginTop: '24px' }}
              onClick={() => {
                markPhaseComplete('learn');
                setPracticeIndex(0);
                setPhase('practice');
              }}
            >
              {t('readyToPractice')}
            </button>
          </div>
        )}

        {/* PRACTICE */}
        {phase === 'practice' && lesson.practice && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div className="phase-progress-bar">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className={`phase-progress-dot ${i < practiceIndex ? 'done' : i === practiceIndex ? 'active' : ''}`}
                  />
                ))}
              </div>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                {t('exerciseLabel')} {practiceIndex + 1} {t('of')} 3
              </span>
            </div>
            {renderPracticeExercise()}
          </div>
        )}

        {/* APPLY */}
        {phase === 'apply' && lesson.apply && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div className="phase-progress-bar">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className={`phase-progress-dot ${i < applyIndex ? 'done' : i === applyIndex ? 'active' : ''}`}
                  />
                ))}
              </div>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                {t('levelLabel')} {applyIndex + 1} {t('of')} 3
              </span>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--accent-amber)', marginBottom: '16px', fontFamily: 'var(--font-mono)' }}>
              {t('completeAllFor')} +{lesson.xp} XP
            </div>
            <CodingExercise
              key={applyIndex}
              level={lesson.apply[applyIndex]}
              lessonId={lesson.id}
              onComplete={() => {
                if (applyIndex < 2) {
                  setApplyIndex(i => i + 1);
                } else {
                  markPhaseComplete('apply');
                  setPhase('final');
                }
              }}
            />
          </div>
        )}

        {/* FINAL */}
        {phase === 'final' && lesson.assessFinal && (
          <SequentialExercise
            assessFinal={lesson.assessFinal}
            onComplete={handleComplete}
          />
        )}

        {/* COMPLETE */}
        {phase === 'complete' && (
          <div className="celebration slide-up">
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎉</div>
            <h2 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--accent-green)', marginBottom: '8px' }}>
              {t('lessonComplete')}
            </h2>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '36px', fontWeight: '700', color: 'var(--accent-amber)', marginBottom: '8px' }}>
              +{lesson.xp} XP
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '24px' }}>
              {lesson.title}
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="back-btn" onClick={() => setCurrentView('track')}>
                {t('backToTrack')}
              </button>
              <button className="continue-btn" onClick={goToNextLesson}>
                {t('nextLesson')}
              </button>
            </div>
            <div style={{ marginTop: '32px' }}>
              <AIExplainer lesson={lesson} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
