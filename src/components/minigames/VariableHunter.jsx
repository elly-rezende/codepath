// VariableHunter — given a code snippet, find and click all variable declarations
// (let/const/var). 30 seconds. Wrong clicks penalty, right clicks reward.

import { useState, useEffect } from 'react';
import { useGamification } from '../../context/GamificationContext';

// Each level: a code snippet split into tokens, with indices of variable name positions
const LEVELS = [
  {
    intro: 'Clique em TODAS as variáveis declaradas (let/const/var):',
    tokens: ['let', 'nome', '=', '"Bit"', ';', 'const', 'idade', '=', '15', ';', 'let', 'pontos', '=', '100', ';'],
    targets: [1, 6, 11],
  },
  {
    intro: 'Clique em TODAS as variáveis (3 delas):',
    tokens: ['const', 'usuarios', '=', '[', ']', ';', 'let', 'i', '=', '0', ';', 'var', 'total', '=', '0', ';'],
    targets: [1, 7, 12],
  },
  {
    intro: 'Encontre os nomes das variáveis (let/const apenas):',
    tokens: ['function', 'somar', '(', 'a', ',', 'b', ')', '{', 'const', 'resultado', '=', 'a', '+', 'b', ';', 'let', 'historico', '=', '[', ']', ';', '}'],
    targets: [9, 16],
  },
  {
    intro: 'Quais são as variáveis aqui? Clica em todas:',
    tokens: ['const', 'tiktoks', '=', 'feed', '.', 'filter', '(', 'v', '=>', 'v', '.', 'likes', '>', '1000', ')', ';', 'let', 'top', '=', 'tiktoks', '[', '0', ']', ';'],
    targets: [1, 17],
  },
];

const TIME_LIMIT = 30;

export default function VariableHunter({ onComplete }) {
  const { play, addCoins } = useGamification();
  const [level] = useState(() => LEVELS[Math.floor(Math.random() * LEVELS.length)]);
  const [found, setFound] = useState([]);
  const [wrong, setWrong] = useState([]);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [finished, setFinished] = useState(false);
  const [reward, setReward] = useState(0);

  const remaining = level.targets.filter(i => !found.includes(i));

  // Countdown
  useEffect(() => {
    if (finished) return;
    if (timeLeft <= 0) {
      setFinished(true);
      return;
    }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, finished]);

  // Check for win
  useEffect(() => {
    if (remaining.length === 0 && !finished) {
      const timeBonus = Math.floor(timeLeft * 1.5);
      const wrongPenalty = wrong.length * 5;
      const r = Math.max(10, 25 + timeBonus - wrongPenalty);
      setReward(r);
      addCoins(r);
      play('allTestsPass');
      setFinished(true);
    }
  }, [remaining.length, finished, timeLeft, wrong.length, addCoins, play]);

  const handleClick = (idx) => {
    if (finished || found.includes(idx) || wrong.includes(idx)) return;
    if (level.targets.includes(idx)) {
      setFound(prev => [...prev, idx]);
      play('correct');
    } else {
      setWrong(prev => [...prev, idx]);
      play('testFail');
    }
  };

  const success = remaining.length === 0;

  return (
    <div className="var-hunter">
      <div className="mg-header">
        <div className="mg-stat">
          <div className="mg-stat-label">Tempo</div>
          <div className={`mg-stat-value ${timeLeft <= 5 ? 'danger' : ''}`}>{timeLeft}s</div>
        </div>
        <div className="bh-intro">{level.intro}</div>
        <div className="mg-stat">
          <div className="mg-stat-label">Achadas</div>
          <div className="mg-stat-value">{found.length}/{level.targets.length}</div>
        </div>
      </div>

      <div className="bh-code">
        {level.tokens.map((token, idx) => {
          const isFound = found.includes(idx);
          const isWrong = wrong.includes(idx);
          return (
            <button
              key={idx}
              className={`bh-token ${isFound ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
              onClick={() => handleClick(idx)}
              disabled={finished || isFound || isWrong}
            >
              {token}
            </button>
          );
        })}
      </div>

      {finished && (
        <div className="mg-result">
          <div className="mg-result-emoji">{success ? '🎯' : '⏱️'}</div>
          <div className="mg-result-title">
            {success ? 'Olho de águia!' : 'Tempo esgotado!'}
          </div>
          <div className="mg-result-subtitle">
            {success
              ? `Achou ${level.targets.length} variáveis${wrong.length > 0 ? ` (com ${wrong.length} erros)` : ' sem errar'}!`
              : `Faltou ${remaining.length}. Era as palavras antes do = (sinal de atribuição).`}
          </div>
          {success && (
            <div className="mg-result-reward">
              <span>🪙</span>
              <span>+{reward} moedas</span>
            </div>
          )}
          <button className="mg-result-btn" onClick={onComplete}>
            Continuar →
          </button>
        </div>
      )}
    </div>
  );
}
