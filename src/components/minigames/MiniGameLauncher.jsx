// MiniGameLauncher — modal that picks a random mini-game to play
// Triggered from GamificationContext (e.g. after a lesson completes, 1 in 3 chance)
// The user can skip; otherwise they play and earn coins.

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useGamification } from '../../context/GamificationContext';
import { useQuests } from '../../context/QuestsContext';
import MemoryMatch from './MemoryMatch';
import CodeSort from './CodeSort';
import BugHunt from './BugHunt';
import CodeTyping from './CodeTyping';
import VariableHunter from './VariableHunter';

const GAMES = [
  {
    id: 'memory',
    title: 'Jogo da Memória',
    icon: '🃏',
    description: 'Vire as cartas e ache os pares — testa sua memória!',
    estimatedTime: '~2 min',
    Component: MemoryMatch,
  },
  {
    id: 'codesort',
    title: 'Ordem do Código',
    icon: '🧠',
    description: 'Arraste os passos pra ordem correta — pensa lógico!',
    estimatedTime: '~1 min',
    Component: CodeSort,
  },
  {
    id: 'bughunt',
    title: 'Caça ao Bug',
    icon: '🐛',
    description: 'Encontre o erro no código contra o relógio — 30s!',
    estimatedTime: '~30s',
    Component: BugHunt,
  },
  {
    id: 'codetyping',
    title: 'Digite Rápido!',
    icon: '⌨️',
    description: 'Digite o código exatamente igual — quanto mais rápido, mais moedas!',
    estimatedTime: '~1 min',
    Component: CodeTyping,
  },
  {
    id: 'varhunter',
    title: 'Caça às Variáveis',
    icon: '🎯',
    description: 'Encontre todas as variáveis declaradas no código — olho de águia!',
    estimatedTime: '~30s',
    Component: VariableHunter,
  },
];

export default function MiniGameLauncher() {
  const { pendingMiniGame, closeMiniGame, play } = useGamification();
  const { trackMinigamePlayed } = useQuests();
  const overlayRef = useRef(null);
  const cardRef = useRef(null);
  const [stage, setStage] = useState('intro'); // 'intro' | 'playing'
  const [selectedGame, setSelectedGame] = useState(null);

  // When a mini-game gets queued, pick a random one
  useEffect(() => {
    if (pendingMiniGame) {
      const game = GAMES[Math.floor(Math.random() * GAMES.length)];
      setSelectedGame(game);
      setStage('intro');
    }
  }, [pendingMiniGame]);

  // Entry animation
  useEffect(() => {
    if (!pendingMiniGame || !cardRef.current) return;
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(
      cardRef.current,
      { scale: 0.8, y: 40, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' }
    );
  }, [pendingMiniGame, stage]);

  if (!pendingMiniGame || !selectedGame) return null;

  const handleStart = () => {
    play('pop');
    setStage('playing');
  };

  const handleSkip = () => {
    play('click');
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        onComplete: closeMiniGame,
      });
    } else {
      closeMiniGame();
    }
  };

  const handleFinish = () => {
    play('xpGain');
    // Mark this mini-game as played for weekly quest progress
    if (selectedGame) trackMinigamePlayed(selectedGame.id);
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: closeMiniGame,
      });
    } else {
      closeMiniGame();
    }
  };

  const { Component } = selectedGame;

  return (
    <div ref={overlayRef} className="mg-overlay">
      <div ref={cardRef} className="mg-modal">
        {stage === 'intro' && (
          <div className="mg-intro">
            <div className="mg-intro-emoji">{selectedGame.icon}</div>
            <div className="mg-intro-label">🎁 BÔNUS — MINI-JOGO</div>
            <h2 className="mg-intro-title">{selectedGame.title}</h2>
            <p className="mg-intro-desc">{selectedGame.description}</p>
            <div className="mg-intro-time">⏱ {selectedGame.estimatedTime}</div>

            <div className="mg-intro-buttons">
              <button className="mg-intro-skip" onClick={handleSkip}>
                Pular
              </button>
              <button className="mg-intro-start" onClick={handleStart}>
                Vamos jogar! →
              </button>
            </div>
          </div>
        )}

        {stage === 'playing' && (
          <div className="mg-game-wrap">
            <button className="mg-quit-btn" onClick={handleSkip} title="Sair do jogo">
              ✕
            </button>
            <Component onComplete={handleFinish} />
          </div>
        )}
      </div>
    </div>
  );
}
