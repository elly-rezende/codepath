// MemoryMatch — flip cards in pairs, find all matches
// 16 cards (8 pairs) on a 4x4 grid. Tracks moves + time.
// Coin reward scales with performance (less moves + faster time = more coins).

import { useState, useEffect, useMemo } from 'react';
import { useGamification } from '../../context/GamificationContext';

// 8 emojis used as matching pairs — programming/gaming themed
const EMOJI_PAIRS = ['💻', '🐛', '🚀', '⚡', '🎮', '🔥', '⭐', '🏆'];

function shuffleCards() {
  const deck = [...EMOJI_PAIRS, ...EMOJI_PAIRS]
    .map((emoji, idx) => ({ id: idx, emoji, matched: false, flipped: false }))
    .sort(() => Math.random() - 0.5);
  return deck;
}

export default function MemoryMatch({ onComplete }) {
  const { play, addCoins } = useGamification();
  const [cards, setCards] = useState(() => shuffleCards());
  const [flippedIds, setFlippedIds] = useState([]);
  const [moves, setMoves] = useState(0);
  const [startTime] = useState(() => Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [finished, setFinished] = useState(false);
  const [finalReward, setFinalReward] = useState(0);

  const matchedCount = cards.filter(c => c.matched).length;
  const totalPairs = EMOJI_PAIRS.length;

  // Tick timer every second
  useEffect(() => {
    if (finished) return;
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [finished, startTime]);

  // Detect when 2 cards are flipped — compare them
  useEffect(() => {
    if (flippedIds.length !== 2) return;
    const [aId, bId] = flippedIds;
    const a = cards.find(c => c.id === aId);
    const b = cards.find(c => c.id === bId);
    setMoves(m => m + 1);

    if (a.emoji === b.emoji) {
      // Match!
      setTimeout(() => {
        setCards(prev => prev.map(c =>
          c.id === aId || c.id === bId ? { ...c, matched: true, flipped: true } : c
        ));
        setFlippedIds([]);
        play('correct');
      }, 400);
    } else {
      // No match — flip back after a moment
      setTimeout(() => {
        setCards(prev => prev.map(c =>
          c.id === aId || c.id === bId ? { ...c, flipped: false } : c
        ));
        setFlippedIds([]);
        play('wrong');
      }, 900);
    }
  }, [flippedIds, cards, play]);

  // Detect game completion (all matched)
  useEffect(() => {
    if (matchedCount === totalPairs * 2 && !finished) {
      const finalElapsed = Math.floor((Date.now() - startTime) / 1000);
      setElapsed(finalElapsed);
      setFinished(true);

      // Reward formula: base 30 + bonus for low moves & fast time
      // Perfect play (8 moves, <30s) = ~60 coins; sloppy play = ~25 coins
      const moveBonus = Math.max(0, 40 - moves * 2); // up to 40 for 0 extra moves
      const timeBonus = Math.max(0, 30 - Math.floor(finalElapsed / 2));
      const reward = 20 + moveBonus + timeBonus;
      setFinalReward(reward);
      addCoins(reward);
      play('chestOpen');
    }
  }, [matchedCount, totalPairs, finished, moves, startTime, addCoins, play]);

  const handleCardClick = (cardId) => {
    if (finished) return;
    if (flippedIds.length >= 2) return;
    const card = cards.find(c => c.id === cardId);
    if (!card || card.matched || card.flipped) return;

    play('click');
    setCards(prev => prev.map(c => c.id === cardId ? { ...c, flipped: true } : c));
    setFlippedIds(prev => [...prev, cardId]);
  };

  return (
    <div className="memory-match">
      <div className="mg-header">
        <div className="mg-stat">
          <div className="mg-stat-label">Pares</div>
          <div className="mg-stat-value">{matchedCount / 2} / {totalPairs}</div>
        </div>
        <div className="mg-stat">
          <div className="mg-stat-label">Jogadas</div>
          <div className="mg-stat-value">{moves}</div>
        </div>
        <div className="mg-stat">
          <div className="mg-stat-label">Tempo</div>
          <div className="mg-stat-value">{elapsed}s</div>
        </div>
      </div>

      <div className="memory-grid">
        {cards.map(card => (
          <button
            key={card.id}
            className={`mem-card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
            onClick={() => handleCardClick(card.id)}
            disabled={card.flipped || card.matched || finished}
            aria-label={card.flipped ? `Carta com ${card.emoji}` : 'Carta virada para baixo'}
          >
            <div className="mem-card-inner">
              <div className="mem-card-back">?</div>
              <div className="mem-card-front">{card.emoji}</div>
            </div>
          </button>
        ))}
      </div>

      {finished && (
        <div className="mg-result">
          <div className="mg-result-emoji">🎉</div>
          <div className="mg-result-title">Memória nível 100!</div>
          <div className="mg-result-subtitle">
            {moves} jogadas · {elapsed}s
          </div>
          <div className="mg-result-reward">
            <span>🪙</span>
            <span>+{finalReward} moedas</span>
          </div>
          <button className="mg-result-btn" onClick={onComplete}>
            Continuar →
          </button>
        </div>
      )}
    </div>
  );
}
