// InstallPrompt — floating "Install app" button that appears when the browser
// supports installation (beforeinstallprompt event). Hides itself after install
// or if the user dismisses it. State persists across sessions in localStorage.

import { useEffect, useState } from 'react';
import { useGamification } from '../../context/GamificationContext';

const DISMISS_KEY = 'codepath_install_dismissed';
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export default function InstallPrompt() {
  const { play } = useGamification();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed (in standalone display mode)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;
    if (isStandalone) {
      setInstalled(true);
      return;
    }

    // Check if user dismissed recently
    const dismissedAt = parseInt(localStorage.getItem(DISMISS_KEY) || '0', 10);
    if (dismissedAt && Date.now() - dismissedAt < DISMISS_DURATION) {
      return;
    }

    // Listen for the install prompt event
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Wait a couple seconds before showing — don't interrupt onboarding
      setTimeout(() => setVisible(true), 3000);
    };

    const handleAppInstalled = () => {
      setInstalled(true);
      setVisible(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    play('pop');
    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        play('correct');
      }
    } catch (e) {
      // User canceled or browser rejected — that's fine
    }
    setDeferredPrompt(null);
    setVisible(false);
  };

  const handleDismiss = () => {
    play('click');
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setVisible(false);
  };

  if (installed || !visible || !deferredPrompt) return null;

  return (
    <div className="install-prompt">
      <button className="install-close" onClick={handleDismiss} aria-label="Fechar">✕</button>
      <div className="install-icon">📱</div>
      <div className="install-content">
        <div className="install-title">Instalar como app!</div>
        <div className="install-desc">
          Acesso rápido pela tela inicial. Funciona até sem internet.
        </div>
      </div>
      <button className="install-cta" onClick={handleInstall}>
        Instalar
      </button>
    </div>
  );
}
