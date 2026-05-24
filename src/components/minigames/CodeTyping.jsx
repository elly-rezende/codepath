// CodeTyping — speed-typing of code snippets. Tracks WPM + accuracy.
// Player must type the snippet exactly. Wrong chars highlighted in real-time.
// Reward = WPM * accuracy multiplier.

import { useState, useEffect, useRef } from 'react';
import { useGamification } from '../../context/GamificationContext';

const SNIPPETS = [
  { code: 'const nome = "Bit";', label: 'JavaScript' },
  { code: 'function soma(a, b) { return a + b; }', label: 'JavaScript' },
  { code: 'for (let i = 0; i < 10; i++) console.log(i);', label: 'JavaScript' },
  { code: 'const xp = posts.filter(p => p.likes > 100);', label: 'JavaScript' },
  { code: 'if (vida === 0) gameOver();', label: 'JavaScript' },
  { code: 'def saudacao(nome): print(f"Oi, {nome}!")', label: 'Python' },
  { code: '<button onClick={curtir}>❤️</button>', label: 'React' },
  { code: 'SELECT nome FROM usuarios WHERE nivel >= 10;', label: 'SQL' },
];

export default function CodeTyping({ onComplete }) {
  const { play, addCoins } = useGamification();
  const [snippet] = useState(() => SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)]);
  const [typed, setTyped] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [finished, setFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [reward, setReward] = useState(0);
  const inputRef = useRef(null);

  // Autofocus the input
  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleChange = (e) => {
    if (finished) return;
    const value = e.target.value;
    if (!startTime && value.length > 0) setStartTime(Date.now());
    setTyped(value);

    // Did they finish?
    if (value === snippet.code) {
      const elapsed = (Date.now() - (startTime || Date.now())) / 1000 / 60; // minutes
      const wordCount = snippet.code.split(/\s+/).length;
      const calcWpm = elapsed > 0 ? Math.round(wordCount / elapsed) : 0;

      // Accuracy: count chars typed correctly out of total chars typed
      // (we only track the path that got them to victory, so it's based
      //  on the final string being a prefix-match)
      const calcAccuracy = 100; // they only finish if they match exactly
      const calcReward = Math.min(80, Math.max(15, Math.round(calcWpm * 1.2)));

      setWpm(calcWpm);
      setAccuracy(calcAccuracy);
      setReward(calcReward);
      addCoins(calcReward);
      play('allTestsPass');
      setFinished(true);
    } else {
      play('hover');
    }
  };

  // Build the colored display: green for correct chars, red for wrong, dim for not-yet-typed
  const renderColored = () => {
    return snippet.code.split('').map((ch, i) => {
      const userCh = typed[i];
      let className = 'ct-char';
      if (i < typed.length) {
        className += userCh === ch ? ' correct' : ' wrong';
      } else if (i === typed.length) {
        className += ' cursor';
      }
      return (
        <span key={i} className={className}>
          {ch === ' ' && i === typed.length ? '·' : ch}
        </span>
      );
    });
  };

  const progress = typed.length / snippet.code.length;

  return (
    <div className="code-typing">
      <div className="mg-header center">
        <div>
          <div className="ct-title">⌨️ Digite Rápido!</div>
          <div className="ct-subtitle">Linguagem: <strong>{snippet.label}</strong></div>
        </div>
      </div>

      <div className="ct-progress-bar">
        <div
          className="ct-progress-fill"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="ct-snippet">
        {renderColored()}
      </div>

      <input
        ref={inputRef}
        type="text"
        className="ct-input"
        value={typed}
        onChange={handleChange}
        disabled={finished}
        placeholder="Comece a digitar aqui..."
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />

      {finished && (
        <div className="mg-result">
          <div className="mg-result-emoji">⚡</div>
          <div className="mg-result-title">Velocidade impressionante!</div>
          <div className="mg-result-subtitle">
            {wpm} palavras/minuto · {accuracy}% precisão
          </div>
          <div className="mg-result-reward">
            <span>🪙</span>
            <span>+{reward} moedas</span>
          </div>
          <button className="mg-result-btn" onClick={onComplete}>
            Continuar →
          </button>
        </div>
      )}
    </div>
  );
}
