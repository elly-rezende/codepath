// ThemePicker — visual selector for unlocked color themes
// Shows preview swatches (3 colors) + name. Locked themes show but are disabled.
// Applies theme via CSS variable injection (see data/themes.js).

import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useGamification } from '../../context/GamificationContext';
import { THEMES, getThemesWithUnlockStatus, applyTheme } from '../../data/themes';

export default function ThemePicker() {
  const { user, updateUser } = useAuth();
  const { inventory, play, pushToast } = useGamification();

  const equippedThemeId = user?.equipped?.theme || 'default';
  const themes = getThemesWithUnlockStatus(inventory);

  // Apply the equipped theme whenever this component mounts or selection changes
  useEffect(() => {
    applyTheme(equippedThemeId);
  }, [equippedThemeId]);

  const handlePick = (theme) => {
    if (!theme.unlocked) {
      pushToast({
        title: '🔒 Tema bloqueado',
        subtitle: 'Abra baús pra desbloquear este tema',
      });
      play('wrong');
      return;
    }
    const newEquipped = { ...(user?.equipped || {}) };
    if (theme.id === 'default') {
      delete newEquipped.theme;
    } else {
      newEquipped.theme = theme.id;
    }
    updateUser({ equipped: newEquipped });
    applyTheme(theme.id);
    play('correct');
    pushToast({
      title: `Tema ${theme.name} ativado!`,
      subtitle: `${theme.icon} Visual do app mudou`,
    });
  };

  return (
    <div className="theme-picker">
      <div className="theme-picker-header">
        <h2 className="theme-picker-title">🎨 Tema visual</h2>
        <div className="theme-picker-subtitle">
          Muda toda a paleta do app. Desbloqueie temas nos baús de raros e épicos!
        </div>
      </div>

      <div className="theme-grid">
        {themes.map(theme => {
          const isActive = theme.id === equippedThemeId;
          return (
            <button
              key={theme.id}
              className={`theme-card ${isActive ? 'active' : ''} ${theme.unlocked ? '' : 'locked'}`}
              onClick={() => handlePick(theme)}
              disabled={!theme.unlocked && !isActive}
            >
              {/* Preview gradient bar */}
              <div className="theme-preview-bar">
                {theme.preview.map((color, i) => (
                  <div
                    key={i}
                    className="theme-swatch"
                    style={{ background: color }}
                  />
                ))}
              </div>

              <div className="theme-card-body">
                <div className="theme-icon">{theme.icon}</div>
                <div className="theme-name">{theme.name}</div>
                {isActive && <div className="theme-active-tag">✓ Em uso</div>}
                {!theme.unlocked && (
                  <div className="theme-locked-tag">🔒 Bloqueado</div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
