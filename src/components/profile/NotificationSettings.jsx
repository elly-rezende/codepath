// NotificationSettings — opt-in panel for browser push notifications
// Asks for permission, then lets the user toggle individual notification types.

import { useState } from 'react';
import { useNotifications } from '../../hooks/useNotifications';
import { useGamification } from '../../context/GamificationContext';

export default function NotificationSettings() {
  const { permission, prefs, requestPermission, updatePref, sendDailyReminder } = useNotifications();
  const { play, pushToast } = useGamification();
  const [asking, setAsking] = useState(false);

  const handleEnable = async () => {
    setAsking(true);
    play('click');
    const result = await requestPermission();
    setAsking(false);
    if (result === 'granted') {
      pushToast({ title: 'Notificações ativadas!', subtitle: 'Você vai receber lembretes' });
      play('correct');
    } else if (result === 'denied') {
      pushToast({ title: 'Você negou as notificações', subtitle: 'Pode habilitar nas configurações do navegador' });
      play('wrong');
    }
  };

  const handleTest = () => {
    sendDailyReminder();
    pushToast({ title: 'Notificação teste enviada!', subtitle: 'Veja na sua tela' });
  };

  if (permission === 'unsupported') {
    return (
      <div className="notif-panel">
        <div className="notif-header">
          <span className="notif-emoji">🔕</span>
          <div>
            <div className="notif-title">Notificações não suportadas</div>
            <div className="notif-desc">Seu navegador não suporta notificações push.</div>
          </div>
        </div>
      </div>
    );
  }

  if (permission !== 'granted') {
    return (
      <div className="notif-panel cta">
        <div className="notif-header">
          <span className="notif-emoji">🔔</span>
          <div>
            <div className="notif-title">Ativar notificações</div>
            <div className="notif-desc">
              Receba lembretes pra não perder sua streak e ver quando seus amigos subirem de nível.
            </div>
          </div>
        </div>
        <button className="notif-cta" onClick={handleEnable} disabled={asking}>
          {asking ? 'Pedindo permissão...' : '🔔 Ativar'}
        </button>
        {permission === 'denied' && (
          <div className="notif-denied-hint">
            ⚠️ Você bloqueou anteriormente. Vá no cadeado da barra do navegador → Notificações → Permitir.
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="notif-panel">
      <div className="notif-header">
        <span className="notif-emoji">🔔</span>
        <div>
          <div className="notif-title">Notificações</div>
          <div className="notif-desc">Personalize o que você quer receber.</div>
        </div>
      </div>

      <div className="notif-options">
        <div className="notif-row">
          <div>
            <div className="notif-row-label">Mestre</div>
            <div className="notif-row-desc">Desliga todas as notificações</div>
          </div>
          <button
            className={`toggle-switch ${prefs.enabled ? 'on' : 'off'}`}
            onClick={() => updatePref('enabled', !prefs.enabled)}
          >
            <span className="toggle-thumb" />
          </button>
        </div>

        <div className={`notif-sub-list ${!prefs.enabled ? 'disabled' : ''}`}>
          <div className="notif-row">
            <div>
              <div className="notif-row-label">📅 Lembrete diário</div>
              <div className="notif-row-desc">Te chama pra estudar todo dia</div>
            </div>
            <button
              className={`toggle-switch ${prefs.dailyReminder ? 'on' : 'off'}`}
              onClick={() => updatePref('dailyReminder', !prefs.dailyReminder)}
              disabled={!prefs.enabled}
            >
              <span className="toggle-thumb" />
            </button>
          </div>

          {prefs.dailyReminder && (
            <div className="notif-row sub">
              <div>
                <div className="notif-row-label">Horário</div>
                <div className="notif-row-desc">Quando enviar o lembrete</div>
              </div>
              <input
                type="time"
                className="notif-time-input"
                value={prefs.dailyTime}
                onChange={e => updatePref('dailyTime', e.target.value)}
                disabled={!prefs.enabled}
              />
            </div>
          )}

          <div className="notif-row">
            <div>
              <div className="notif-row-label">🔥 Alerta de streak</div>
              <div className="notif-row-desc">Avisa se você vai perder a sequência (21h)</div>
            </div>
            <button
              className={`toggle-switch ${prefs.streakWarning ? 'on' : 'off'}`}
              onClick={() => updatePref('streakWarning', !prefs.streakWarning)}
              disabled={!prefs.enabled}
            >
              <span className="toggle-thumb" />
            </button>
          </div>

          <div className="notif-row">
            <div>
              <div className="notif-row-label">👥 Atividade dos amigos</div>
              <div className="notif-row-desc">Quando um amigo sobe de nível</div>
            </div>
            <button
              className={`toggle-switch ${prefs.friendActivity ? 'on' : 'off'}`}
              onClick={() => updatePref('friendActivity', !prefs.friendActivity)}
              disabled={!prefs.enabled}
            >
              <span className="toggle-thumb" />
            </button>
          </div>
        </div>

        <button className="notif-test-btn" onClick={handleTest} disabled={!prefs.enabled}>
          🧪 Testar notificação
        </button>
      </div>
    </div>
  );
}
