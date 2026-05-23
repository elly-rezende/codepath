import { useState, useEffect } from 'react';
import { useLang } from '../../context/LanguageContext';

function renderMarkdown(text) {
  if (!text) return '';
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function MultipleChoiceExercise({ exercise, onComplete, compact }) {
  const { t } = useLang();
  const [selected, setSelected] = useState(null);
  const [canContinue, setCanContinue] = useState(false);

  useEffect(() => {
    setSelected(null);
    setCanContinue(false);
  }, [exercise]);

  const handleSelect = (index) => {
    if (canContinue) return;
    setSelected(index);
    if (exercise.options[index].correct) {
      setTimeout(() => setCanContinue(true), 1000);
    }
  };

  const padding = compact ? '16px' : '24px';

  return (
    <div className="exercise-card" style={{ padding }}>
      {exercise.title && (
        <div className="exercise-title">{exercise.title}</div>
      )}
      <p style={{ marginBottom: '20px', fontSize: '16px', lineHeight: '1.6' }}>
        {renderMarkdown(exercise.question)}
      </p>

      <div>
        {exercise.options.map((option, i) => {
          let className = 'option-btn';
          if (selected === i) {
            className += option.correct ? ' correct' : ' wrong';
          }
          return (
            <div key={i}>
              <button
                className={className}
                onClick={() => handleSelect(i)}
                disabled={canContinue}
              >
                {renderMarkdown(option.text)}
              </button>
              {selected === i && option.feedback && (
                <div
                  className="option-feedback"
                  style={{
                    background: option.correct
                      ? 'rgba(0,255,100,0.08)'
                      : 'rgba(255,71,87,0.08)',
                    color: option.correct ? 'var(--accent-green)' : 'var(--accent-red, #ff4757)',
                  }}
                >
                  {option.correct ? '✓ ' : '✗ '}{option.feedback}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {canContinue && (
        <button
          className="continue-btn"
          style={{ marginTop: '16px' }}
          onClick={onComplete}
        >
          {t('continueBtn')}
        </button>
      )}
    </div>
  );
}
