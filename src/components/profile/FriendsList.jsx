// FriendsList — manage friends + view leaderboard
// Shows: your invite code (copy button), add-friend input, list of friends,
// and a leaderboard ranking you against your friends.

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFriends } from '../../context/FriendsContext';
import { useApp } from '../../context/AppContext';
import { useGamification } from '../../context/GamificationContext';
import { useQuests } from '../../context/QuestsContext';

export default function FriendsList() {
  const { user } = useAuth();
  const { xp, streak } = useApp();
  const { friendCode, friends, addFriend, removeFriend, refreshFriends, refreshing, getLeaderboard } = useFriends();
  const { play, pushToast } = useGamification();
  const { trackFriendAdded } = useQuests();

  const [inviteCodeInput, setInviteCodeInput] = useState('');
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');

  const leaderboard = getLeaderboard(xp, streak);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(friendCode);
      play('pop');
      pushToast({ title: 'Código copiado!', subtitle: `Mande pro seu amigo: ${friendCode}` });
    } catch (e) {
      // Clipboard might not be available — show in alert as fallback
      window.prompt('Copia esse código e manda pro seu amigo:', friendCode);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Adiciona eu no CodePath!',
      text: `Vamos aprender a programar juntos! Adiciona meu código: ${friendCode}`,
      url: window.location.origin,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); play('pop'); } catch (e) { /* user canceled */ }
    } else {
      handleCopyCode();
    }
  };

  const handleAddFriend = async () => {
    setError('');
    if (!inviteCodeInput.trim()) {
      setError('Digite o código do seu amigo');
      return;
    }
    setAdding(true);
    const result = await addFriend(inviteCodeInput);
    if (result.error) {
      setError(result.error);
      play('wrong');
    } else {
      play('correct');
      pushToast({ title: `${result.friend.name} adicionado!`, subtitle: 'Bora competir 🏆' });
      setInviteCodeInput('');
      trackFriendAdded(); // weekly quest progress
    }
    setAdding(false);
  };

  const handleRemove = (friendId, friendName) => {
    if (!window.confirm(`Remover ${friendName} dos amigos?`)) return;
    removeFriend(friendId);
    play('click');
  };

  if (user?.isGuest) {
    return (
      <div className="friends-empty">
        <div className="empty-icon">👥</div>
        <div className="empty-title">Crie uma conta pra adicionar amigos!</div>
        <div className="empty-desc">
          Visitantes não têm código de amigo. Vai em configurações pra criar uma conta.
        </div>
      </div>
    );
  }

  return (
    <div className="friends-list">
      {/* === Your invite code === */}
      <div className="friends-section">
        <div className="fr-section-title">🪪 Seu código de amigo</div>
        <div className="invite-code-card">
          <div className="invite-code">{friendCode}</div>
          <div className="invite-actions">
            <button className="invite-btn" onClick={handleCopyCode} title="Copiar">
              📋 Copiar
            </button>
            <button className="invite-btn share" onClick={handleShare} title="Compartilhar">
              ↗️ Compartilhar
            </button>
          </div>
        </div>
        <div className="fr-section-hint">
          Manda esse código pros seus amigos pra eles te adicionarem.
        </div>
      </div>

      {/* === Add friend === */}
      <div className="friends-section">
        <div className="fr-section-title">➕ Adicionar amigo</div>
        <div className="add-friend-row">
          <input
            type="text"
            className="add-friend-input"
            placeholder="Código do amigo (ex: BIT4K9)"
            value={inviteCodeInput}
            onChange={e => setInviteCodeInput(e.target.value.toUpperCase().slice(0, 6))}
            onKeyDown={e => e.key === 'Enter' && handleAddFriend()}
            maxLength={6}
          />
          <button
            className="add-friend-btn"
            onClick={handleAddFriend}
            disabled={adding || inviteCodeInput.length !== 6}
          >
            {adding ? '...' : 'Adicionar'}
          </button>
        </div>
        {error && <div className="add-friend-error">{error}</div>}
      </div>

      {/* === Leaderboard === */}
      <div className="friends-section">
        <div className="fr-section-header">
          <div className="fr-section-title">🏆 Ranking entre amigos</div>
          {friends.length > 0 && (
            <button
              className="refresh-btn"
              onClick={refreshFriends}
              disabled={refreshing}
              title="Atualizar"
            >
              {refreshing ? '⏳' : '🔄'}
            </button>
          )}
        </div>

        {friends.length === 0 ? (
          <div className="friends-empty small">
            <div className="empty-icon">😢</div>
            <div className="empty-title">Nenhum amigo ainda</div>
            <div className="empty-desc">Adicione amigos acima pra começar a competir!</div>
          </div>
        ) : (
          <div className="leaderboard">
            {leaderboard.map((entry, idx) => (
              <div
                key={entry.id}
                className={`lb-row ${entry.isSelf ? 'is-self' : ''} ${idx === 0 ? 'is-first' : ''}`}
              >
                <div className={`lb-rank rank-${idx + 1}`}>
                  {idx === 0 ? '👑' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                </div>
                <div className="lb-avatar">
                  {entry.avatarUrl ? (
                    <img src={entry.avatarUrl} alt={entry.name} />
                  ) : (
                    <div className="lb-avatar-initial">
                      {(entry.name || '?')[0].toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="lb-info">
                  <div className="lb-name">
                    {entry.name} {entry.isSelf && <span className="lb-you">(você)</span>}
                  </div>
                  <div className="lb-stats">
                    <span className="lb-xp">⚡ {entry.xp} XP</span>
                    {entry.streak > 0 && (
                      <span className="lb-streak">🔥 {entry.streak}d</span>
                    )}
                  </div>
                </div>
                {!entry.isSelf && (
                  <button
                    className="lb-remove"
                    onClick={() => handleRemove(entry.id, entry.name)}
                    title="Remover amigo"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
