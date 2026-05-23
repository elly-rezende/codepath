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

export default function CodingWithConsole({ exercise, onComplete }) {
  const { t } = useLang();
  const [output, setOutput] = useState(null);
  const [hasRun, setHasRun] = useState(false);
  const [selected, setSelected] = useState(null);
  const [canContinue, setCanContinue] = useState(false);

  useEffect(() => {
    setOutput(null);
    setHasRun(false);
    setSelected(null);
    setCanContinue(false);
  }, [exercise]);

  const runCode = () => {
    const logs = [];
    const originalLog = console.log;
    console.log = (...args) => {
      logs.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
    };
    try {
      // eslint-disable-next-line no-new-func
      new Function(exercise.code)();
    } catch (err) {
      logs.push(`${t('errorLabel')}: ${err.message}`);
    } finally {
      console.log = originalLog;
    }
    setOutput(logs.join('\n') || t('noOutput'));
    setHasRun(true);
  };

  const handleSelect = (index) => {
    if (canContinue) return;
    setSelected(index);
    if (exercise.options[index].correct) {
      setTimeout(() => setCanContinue(true), 1000);
    }
  };

  return (
    <div className="exercise-card">
      {exercise.title && (
        <div className="exercise-title">{exercise.title}</div>
      )}

      {exercise.instructions && (
        <p style={{ marginBottom: '16px', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          {exercise.instructions}
        </p>
      )}

      <pre className="code-display">
        <code>{exercise.code}</code>
      </pre>

      <button className="run-btn" style={{ marginBottom: '12px' }} onClick={runCode}>
        {t('runCode')}
      </button>

      {hasRun && (
        <div style={{ marginBottom: '20px' }}>
          <div
            style={{
              fontSize: '12px',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              marginBottom: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {t('consoleOutput')}
          </div>
          <div
            style={{
              background: '#0d0f1a',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '12px 16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              whiteSpace: 'pre-wrap',
              color: 'var(--accent-green)',
            }}
          >
            {output}
          </div>
        </div>
      )}

      {hasRun && (
        <div>
          <p style={{ marginBottom: '16px', fontSize: '16px', lineHeight: '1.6' }}>
            {renderMarkdown(exercise.question)}
          </p>

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
      )}
    </div>
  );
}
