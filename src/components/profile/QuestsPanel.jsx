// QuestsPanel — displays this week's quests with progress bars and claim buttons
// Shows live countdown to next reset, and celebrates when all are claimed.

import { useEffect, useState } from 'react';
import { useQuests } from '../../context/QuestsContext';
import { formatTimeLeft, msUntilNextReset, DIFFICULTY_COLORS } from '../../data/quests';

export default function QuestsPanel() {
  const { weeklyQuests, questState, stats, claimQuest } = useQuests();
  const [timeLeft, setTimeLeft] = useState(msUntilNextReset());

  // Live tick the countdown every minute
  useEffect(() => {
    const tick = () => setTimeLeft(msUntilNextReset());
    tick();
    const interval = setInterval(tick, 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="quests-panel">
      <div className="quests-header">
        <div>
          <div className="quests-title">⚔️ Missões da Semana</div>
          <div className="quests-subtitle">
            {stats.completed}/{stats.total} completadas · {stats.claimed} recompensas pegas
          </div>
        </div>
        <div className="quests-timer">
          <div className="quests-timer-label">Renova em</div>
          <div className="quests-timer-value">⏰ {formatTimeLeft(timeLeft)}</div>
        </div>
      </div>

      <div className="quests-list">
        {weeklyQuests.map(quest => {
          const status = questState.progress[quest.id] || { count: 0, claimed: false, completed: false };
          const pct = Math.min(100, (status.count / quest.target) * 100);
          const diffColor = DIFFICULTY_COLORS[quest.difficulty];

          return (
            <div
              key={quest.id}
              className={`quest-card ${status.completed ? 'completed' : ''} ${status.claimed ? 'claimed' : ''}`}
              style={{ borderLeftColor: diffColor }}
            >
              <div className="quest-icon">{quest.icon}</div>

              <div className="quest-info">
                <div className="quest-top">
                  <div className="quest-name">{quest.title}</div>
                  <div className="quest-diff" style={{ background: `${diffColor}22`, color: diffColor }}>
                    {quest.difficulty === 'easy' ? 'Fácil' : quest.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                  </div>
                </div>
                <div className="quest-desc">{quest.description}</div>

                <div className="quest-progress-row">
                  <div className="quest-progress-bar">
                    <div
                      className="quest-progress-fill"
                      style={{ width: `${pct}%`, background: diffColor }}
                    />
                  </div>
                  <div className="quest-progress-count">
                    {status.count}/{quest.target}
                  </div>
                </div>

                <div className="quest-bottom">
                  <div className="quest-reward">
                    <span>🪙 {quest.reward.coins}</span>
                    {quest.reward.xp > 0 && <span>⚡ {quest.reward.xp} XP</span>}
                    {quest.reward.lootTier && <span>🎁 Baú {quest.reward.lootTier === 'rare' ? 'raro' : 'comum'}</span>}
                  </div>

                  {status.claimed ? (
                    <div className="quest-claimed-tag">✓ Pego</div>
                  ) : status.completed ? (
                    <button
                      className="quest-claim-btn"
                      onClick={() => claimQuest(quest)}
                      style={{ background: diffColor, color: '#000' }}
                    >
                      Pegar! 🎁
                    </button>
                  ) : (
                    <div className="quest-locked-tag">
                      Falta {quest.target - status.count}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {stats.allDone && (
        <div className="quests-done-banner">
          🏆 Você completou TODAS as missões dessa semana! Volta na segunda pra mais.
        </div>
      )}
    </div>
  );
}
