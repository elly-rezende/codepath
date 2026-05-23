// BugHunt — click the buggy token in a code snippet
// 30-second timer. Hint button reveals approximate location.
// Coin reward based on time + hint usage.

import { useState, useEffect } from 'react';
import { useGamification } from '../../context/GamificationContext';

// Each level: a tokenized line of code, the index of the buggy token, and an explanation
const BUGS = [
  {
    intro: 'O loop deveria parar quando i for menor que 10. Cadê o bug?',
    tokens: ['for', '(', 'let', 'i', '=', '0', ';', 'i', '<=', '10', ';', 'i', '++', ')'],
    buggyIndex: 8,
    explanation: 'Era pra ser < (menor que) e não <= (menor ou igual). Com <=, o loop roda 11 vezes em vez de 10!',
  },
  {
    intro: 'Esta função deveria somar dois números. Tem algo errado:',
    tokens: ['function', 'soma', '(', 'a', ',', 'b', ')', '{', 'return', 'a', '-', 'b', ';', '}'],
    buggyIndex: 10,
    explanation: 'O sinal de subtração (-) deveria ser soma (+). A função tá fazendo subtração!',
  },
  {
    intro: 'Verificar se idade é maior ou igual a 18:',
    tokens: ['if', '(', 'idade', '=', '18', ')', '{', 'liberado', '=', 'true', ';', '}'],
    buggyIndex: 3,
    explanation: 'Tem 1 sinal de = que é atribuição. Pra comparar precisa de === (ou >=).',
  },
  {
    intro: 'Esta função deveria retornar o primeiro item da lista:',
    tokens: ['function', 'primeiro', '(', 'lista', ')', '{', 'return', 'lista', '[', '1', ']', ';', '}'],
    buggyIndex: 9,
    explanation: 'Em programação, o primeiro item de uma lista é o índice 0, não 1!',
  },
  {
    intro: 'Imprimir cada nome da lista — falta algo:',
    tokens: ['for', '(', 'let', 'nome', 'lista', ')', '{', 'console', '.', 'log', '(', 'nome', ')', ';', '}'],
    buggyIndex: 4,
    explanation: 'Faltou a palavra "of" entre "nome" e "lista" — for...of é como você itera arrays.',
  },
];

const TIME_LIMIT = 30;

export default function BugHunt({ onComplete }) {
  const { play, addCoins } = useGamification();
  const [bug] = useState(() => BUGS[Math.floor(Math.random() * BUGS.length)]);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [finished, setFinished] = useState(false);
  const [wrong, setWrong] = useState([]); // indices clicked but wrong
  const [hintUsed, setHintUsed] = useState(false);
  const [hintRange, setHintRange] = useState(null);
  const [reward, setReward] = useState(0);
  const [success, setSuccess] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (finished) return;
    if (timeLeft <= 0) {
      setFinished(true);
      setSuccess(false);
      play('wrong');
      return;
    }
    const interval = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(interval);
  }, [timeLeft, finished, play]);

  const handleTokenClick = (idx) => {
    if (finished) return;
    if (wrong.includes(idx)) return;

    if (idx === bug.buggyIndex) {
      // Correct!
      setSelectedIdx(idx);
      setFinished(true);
      setSuccess(true);
      // Reward: time bonus + hint penalty
      const timeBonus = Math.floor(timeLeft * 1.5);
      const hintPenalty = hintUsed ? 10 : 0;
      const wrongPenalty = wrong.length * 5;
      const r = Math.max(10, 30 + timeBonus - hintPenalty - wrongPenalty);
      setReward(r);
      addCoins(r);
      play('allTestsPass');
    } else {
      setWrong(prev => [...prev, idx]);
      play('testFail');
    }
  };

  const handleHint = () => {
    if (hintUsed || finished) return;
    setHintUsed(true);
    // Highlight a range of 4 tokens including the buggy one
    const halfRange = 1;
    const lo = Math.max(0, bug.buggyIndex - halfRange);
    const hi = Math.min(bug.tokens.length - 1, bug.buggyIndex + halfRange);
    setHintRange([lo, hi]);
    play('hover');
  };

  const isHintActive = (idx) => hintRange && idx >= hintRange[0] && idx <= hintRange[1];

  return (
    <div className="bug-hunt">
      <div className="mg-header">
        <div className="mg-stat">
          <div className="mg-stat-label">Tempo</div>
          <div className={`mg-stat-value ${timeLeft <= 5 ? 'danger' : ''}`}>{timeLeft}s</div>
        </div>
        <div className="bh-intro">{bug.intro}</div>
        <button
          className="bh-hint-btn"
          onClick={handleHint}
          disabled={hintUsed || finished}
        >
          💡 {hintUsed ? 'Dica usada' : 'Dica (-10 moedas)'}
        </button>
      </div>

      <div className="bh-code">
        {bug.tokens.map((token, idx) => {
          const isCorrect = finished && success && idx === bug.buggyIndex;
          const isWrong = wrong.includes(idx);
          const isHinted = isHintActive(idx) && !finished;
          return (
            <button
              key={idx}
              className={`bh-token ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''} ${isHinted ? 'hinted' : ''}`}
              onClick={() => handleTokenClick(idx)}
              disabled={finished || isWrong}
            >
              {token}
            </button>
          );
        })}
      </div>

      {finished && (
        <div className="mg-result">
          <div className="mg-result-emoji">{success ? '🔍' : '⏱️'}</div>
          <div className="mg-result-title">
            {success ? 'Bug capturado!' : 'Tempo esgotado!'}
          </div>
          <div className="mg-result-subtitle bh-explanation">
            {bug.explanation}
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
