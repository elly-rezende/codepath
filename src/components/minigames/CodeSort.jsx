// CodeSort — drag code snippets into correct execution order
// Picks a random scenario each play. Reward scales with attempts.

import { useState, useEffect } from 'react';
import { useGamification } from '../../context/GamificationContext';

// Each scenario is a sequence of code lines. Player must reconstruct correct order.
const SCENARIOS = [
  {
    title: 'Como funciona um login?',
    snippets: [
      'usuario digita email e senha',
      'sistema verifica se senha está correta',
      'se correta → cria um token de sessão',
      'navega para a home logada',
    ],
  },
  {
    title: 'Como o TikTok mostra um vídeo?',
    snippets: [
      'app pede vídeo para o servidor',
      'servidor escolhe vídeo do feed',
      'app baixa o vídeo',
      'player começa a tocar o vídeo',
    ],
  },
  {
    title: 'Algoritmo de bubble sort',
    snippets: [
      'percorre a lista do início ao fim',
      'compara elemento atual com o próximo',
      'troca de posição se estiverem fora de ordem',
      'repete até a lista ficar toda ordenada',
    ],
  },
  {
    title: 'Como o Discord envia uma mensagem?',
    snippets: [
      'você digita a mensagem e aperta Enter',
      'app envia a mensagem para o servidor',
      'servidor distribui para todos do canal',
      'mensagem aparece pra todo mundo em tempo real',
    ],
  },
  {
    title: 'Como o Spotify recomenda música?',
    snippets: [
      'analisa as músicas que você curte',
      'compara com gostos de outros usuários parecidos',
      'busca músicas novas que essas pessoas escutam',
      'monta sua playlist personalizada',
    ],
  },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function CodeSort({ onComplete }) {
  const { play, addCoins } = useGamification();

  // Pick a random scenario; shuffle into starting order
  const [scenario] = useState(() => SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)]);
  const [order, setOrder] = useState(() => {
    let shuffled = shuffle(scenario.snippets.map((s, i) => ({ text: s, originalIndex: i })));
    // Make sure it's not already in correct order
    while (shuffled.every((s, i) => s.originalIndex === i)) {
      shuffled = shuffle(shuffled);
    }
    return shuffled;
  });
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [finished, setFinished] = useState(false);
  const [reward, setReward] = useState(0);

  const handleDragStart = (e, idx) => {
    setDraggedIdx(idx);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIdx) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === dropIdx) return;
    const newOrder = [...order];
    const [removed] = newOrder.splice(draggedIdx, 1);
    newOrder.splice(dropIdx, 0, removed);
    setOrder(newOrder);
    setDraggedIdx(null);
    play('hover');
  };

  const handleCheck = () => {
    setAttempts(a => a + 1);
    const correct = order.every((s, i) => s.originalIndex === i);
    if (correct) {
      const r = Math.max(15, 40 - attempts * 5);
      setReward(r);
      addCoins(r);
      play('correct');
      setFinished(true);
    } else {
      play('wrong');
    }
  };

  return (
    <div className="code-sort">
      <div className="mg-header center">
        <div>
          <div className="cs-title">{scenario.title}</div>
          <div className="cs-subtitle">Arraste os passos pra ordem correta ↕</div>
        </div>
      </div>

      <div className="cs-list">
        {order.map((step, idx) => (
          <div
            key={step.originalIndex}
            className={`cs-step ${draggedIdx === idx ? 'dragging' : ''}`}
            draggable={!finished}
            onDragStart={e => handleDragStart(e, idx)}
            onDragOver={handleDragOver}
            onDrop={e => handleDrop(e, idx)}
          >
            <div className="cs-step-number">{idx + 1}</div>
            <div className="cs-step-text">{step.text}</div>
            {!finished && <div className="cs-drag-handle">⠿</div>}
          </div>
        ))}
      </div>

      {!finished && (
        <div className="cs-actions">
          <div className="cs-attempts">
            {attempts > 0 && `${attempts} tentativa${attempts > 1 ? 's' : ''}`}
          </div>
          <button className="cs-check-btn" onClick={handleCheck}>
            Verificar ordem
          </button>
        </div>
      )}

      {finished && (
        <div className="mg-result">
          <div className="mg-result-emoji">🧠</div>
          <div className="mg-result-title">Cérebro afiado!</div>
          <div className="mg-result-subtitle">Você acertou em {attempts} tentativa{attempts > 1 ? 's' : ''}</div>
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
