import { useState, useRef } from 'react';

export default function CodeEditor({ challenge, onResult, simplified }) {
  const [code, setCode] = useState(challenge.starterCode);
  const [output, setOutput] = useState('');
  const [outputType, setOutputType] = useState('neutral');
  const [testResults, setTestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const textareaRef = useRef(null);

  const handleRun = () => {
    setIsRunning(true);
    setOutput('');
    setTestResults(null);

    try {
      // Capture console.log output
      const logs = [];
      const originalLog = console.log;
      console.log = (...args) => {
        logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
      };

      try {
        // eslint-disable-next-line no-new-func
        new Function(code)();
      } catch (err) {
        logs.push(`Error: ${err.message}`);
        setOutputType('error');
        setOutput(logs.join('\n'));
        console.log = originalLog;
        setIsRunning(false);
        if (onResult) onResult({ passed: 0, total: challenge.tests.length, allPassed: false });
        return;
      }

      console.log = originalLog;
      setOutput(logs.join('\n'));

      // Run tests
      const results = challenge.tests.map(test => {
        try {
          // eslint-disable-next-line no-new-func
          const pass = new Function('code', `return ${test.check}`)(code);
          return { ...test, pass: !!pass };
        } catch {
          return { ...test, pass: false };
        }
      });

      setTestResults(results);
      const passed = results.filter(r => r.pass).length;
      const allPassed = passed === results.length;
      setOutputType(allPassed ? 'success' : passed > 0 ? 'neutral' : 'error');

      if (onResult) onResult({ passed, total: results.length, allPassed });
    } catch (err) {
      setOutput(`Error: ${err.message}`);
      setOutputType('error');
      if (onResult) onResult({ passed: 0, total: challenge.tests.length, allPassed: false });
    }

    setIsRunning(false);
  };

  const handleReset = () => {
    setCode(challenge.starterCode);
    setOutput('');
    setTestResults(null);
    setOutputType('neutral');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);
      requestAnimationFrame(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      });
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleRun();
    }
  };

  return (
    <div className="code-editor-section slide-up">
      <div className="editor-header">
        <h3>// challenge</h3>
        <div className="editor-actions">
          <button className="reset-btn" onClick={handleReset}>Reset</button>
          <button className="run-btn" onClick={handleRun} disabled={isRunning}>
            {isRunning ? 'Running...' : '▶ Run (Ctrl+Enter)'}
          </button>
        </div>
      </div>

      <div className="editor-instructions">{challenge.instructions}</div>

      {simplified && (
        <div className="simplified-hint">
          Hint: Look at the solution structure carefully. The key patterns you need are already in the starter code — focus on replacing the TODO comments with the right values.
        </div>
      )}

      <textarea
        ref={textareaRef}
        className="code-textarea"
        value={code}
        onChange={e => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
      />

      <div className="output-panel">
        <div className="output-header">
          <span>output</span>
        </div>
        <div className={`output-content ${outputType}`}>
          {output || 'Click "Run" to see output...'}
        </div>
      </div>

      {testResults && (
        <div className="test-results">
          {testResults.map((test, i) => (
            <div key={i} className={`test-item ${test.pass ? 'pass' : 'fail'}`}>
              <span className="test-icon">{test.pass ? '✓' : '✗'}</span>
              <span>{test.description}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
