import { useState, useEffect } from 'react';
import { useLang } from '../../context/LanguageContext';

export default function CodingExercise({ level, onComplete, lessonId }) {
  const { t } = useLang();
  const [code, setCode] = useState(level.sampleCode || '');
  const [testResults, setTestResults] = useState(null);
  const [hintIndex, setHintIndex] = useState(-1);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [allPassed, setAllPassed] = useState(false);

  useEffect(() => {
    setCode(level.sampleCode || '');
    setTestResults(null);
    setHintIndex(-1);
    setWrongAttempts(0);
    setShowSolution(false);
    setAllPassed(false);
  }, [level]);

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        e.target.selectionStart = start + 2;
        e.target.selectionEnd = start + 2;
      }, 0);
    }
    if (e.ctrlKey && e.key === 'Enter') {
      runTests();
    }
  };

  const runTests = () => {
    const results = level.tests.map((test) => {
      try {
        // eslint-disable-next-line no-new-func
        const fn = new Function(`${code}; return (${test.input});`);
        const result = fn();
        const passed = JSON.stringify(result) === JSON.stringify(test.expected);
        return { passed, desc: test.desc || test.input, actual: result };
      } catch (err) {
        return { passed: false, desc: test.desc || test.input, error: err.message };
      }
    });

    setTestResults(results);
    const allPass = results.every(r => r.passed);

    if (allPass) {
      setAllPassed(true);
      if (onComplete) {
        onComplete({ hintsUsed: hintIndex + 1, wrongAttempts });
      }
    } else {
      setWrongAttempts(w => w + 1);
    }
  };

  const showNextHint = () => {
    if (hintIndex < level.hints.length - 1) {
      setHintIndex(i => i + 1);
    }
  };

  const passCount = testResults ? testResults.filter(r => r.passed).length : 0;
  const totalTests = level.tests ? level.tests.length : 0;

  return (
    <div className="exercise-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <span
          style={{
            background: 'var(--accent-blue)',
            color: '#000',
            padding: '3px 10px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '700',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {t('levelLabel')} {level.level}
        </span>
        <span style={{ fontSize: '16px', fontWeight: '600' }}>{level.title}</span>
      </div>

      {level.instructions && level.instructions.length > 0 && (
        <ul style={{ marginBottom: '20px', paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.8' }}>
          {level.instructions.map((inst, i) => (
            <li key={i}>{inst}</li>
          ))}
        </ul>
      )}

      <div className="editor-header">
        <h3>solution.js</h3>
        <div className="editor-actions">
          <button className="reset-btn" onClick={() => setCode(level.sampleCode || '')}>
            {t('reset')}
          </button>
          <button className="run-btn" onClick={runTests}>
            {t('runTests')}
          </button>
        </div>
      </div>
      <textarea
        className="code-textarea"
        value={code}
        onChange={e => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        style={{ borderRadius: '0 0 8px 8px', borderTop: 'none' }}
      />

      {testResults && (
        <div style={{ marginTop: '12px' }}>
          {testResults.map((r, i) => (
            <div
              key={i}
              className={`test-row ${r.passed ? 'pass' : 'fail'}`}
            >
              <span>{r.passed ? '✓' : '✗'}</span>
              <span>{r.desc}</span>
              {!r.passed && r.error && (
                <span style={{ opacity: 0.7 }}>— {r.error}</span>
              )}
            </div>
          ))}
          {!allPassed && (
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px' }}>
              {passCount}/{totalTests} {t('testsPassing')}
            </div>
          )}
        </div>
      )}

      {allPassed && (
        <div className="celebration slide-up" style={{ marginTop: '16px' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎉</div>
          <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--accent-green)', marginBottom: '4px' }}>
            {t('allTestsPassed')}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            {t('levelLabel')} {level.level} {t('levelXComplete')}
          </div>
          <button className="continue-btn" style={{ marginTop: '16px' }} onClick={() => onComplete && onComplete({ hintsUsed: hintIndex + 1, wrongAttempts })}>
            {t('continueBtn')}
          </button>
        </div>
      )}

      {!allPassed && level.hints && level.hints.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <button
            className="reset-btn"
            onClick={showNextHint}
            disabled={hintIndex >= level.hints.length - 1}
          >
            {hintIndex < 0 ? t('getHint') : `💡 ${t('hintLabel')} ${hintIndex + 1} ${t('of')} ${level.hints.length} — ${t('nextHint')}`}
          </button>
          {hintIndex >= 0 && (
            <div className="hint-box" style={{ marginTop: '8px' }}>
              <strong>{t('hintLabel')} {hintIndex + 1}:</strong> {level.hints[hintIndex]}
            </div>
          )}
        </div>
      )}

      {!allPassed && wrongAttempts >= 3 && level.solution && (
        <div style={{ marginTop: '16px' }}>
          <button
            className="reset-btn"
            onClick={() => setShowSolution(s => !s)}
          >
            {showSolution ? t('hideSolution') : t('showSolution')}
          </button>
          {showSolution && (
            <div className="solution-reveal" style={{ marginTop: '8px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {t('solutionLabel')}
              </div>
              <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', whiteSpace: 'pre-wrap', color: 'var(--text-secondary)' }}>
                {level.solution}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
