// Capacitor integration — only active when running inside the native shell.
// In the browser, all functions become no-ops so the same code works everywhere.

let _isNative = null;

export function isNative() {
  if (_isNative !== null) return _isNative;
  if (typeof window === 'undefined') return false;
  _isNative = !!(window.Capacitor?.isNativePlatform?.());
  return _isNative;
}

export function getPlatform() {
  if (typeof window === 'undefined') return 'web';
  return window.Capacitor?.getPlatform?.() || 'web';
}

// === Haptic feedback ===
export async function hapticLight() {
  if (!isNative()) return;
  try {
    const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch { /* package not installed in web-only builds */ }
}

export async function hapticMedium() {
  if (!isNative()) return;
  try {
    const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
    await Haptics.impact({ style: ImpactStyle.Medium });
  } catch { /* ignore */ }
}

export async function hapticSuccess() {
  if (!isNative()) return;
  try {
    const { Haptics, NotificationType } = await import('@capacitor/haptics');
    await Haptics.notification({ type: NotificationType.Success });
  } catch { /* ignore */ }
}

export async function hapticError() {
  if (!isNative()) return;
  try {
    const { Haptics, NotificationType } = await import('@capacitor/haptics');
    await Haptics.notification({ type: NotificationType.Error });
  } catch { /* ignore */ }
}

// === Status bar ===
export async function setStatusBarStyle(style = 'dark') {
  if (!isNative()) return;
  try {
    const { StatusBar, Style } = await import('@capacitor/status-bar');
    await StatusBar.setStyle({ style: style === 'dark' ? Style.Dark : Style.Light });
  } catch { /* ignore */ }
}

export async function hideStatusBar() {
  if (!isNative()) return;
  try {
    const { StatusBar } = await import('@capacitor/status-bar');
    await StatusBar.hide();
  } catch { /* ignore */ }
}

// === Splash screen ===
export async function hideSplash() {
  if (!isNative()) return;
  try {
    const { SplashScreen } = await import('@capacitor/splash-screen');
    await SplashScreen.hide();
  } catch { /* ignore */ }
}

// === App lifecycle ===
export async function onAppStateChange(callback) {
  if (!isNative()) return () => {};
  try {
    const { App } = await import('@capacitor/app');
    const listener = await App.addListener('appStateChange', callback);
    return () => listener.remove();
  } catch {
    return () => {};
  }
}

// === Convenience: run after Capacitor is ready ===
export async function initCapacitor() {
  if (!isNative()) {
    console.log('🌐 Running in browser (Capacitor not active)');
    return;
  }
  console.log(`📱 Running natively on ${getPlatform()}`);

  // Configure status bar
  await setStatusBarStyle('dark');

  // Hide the splash after the app has fully booted
  // (We do it from main.jsx after React mounts)
  setTimeout(() => hideSplash(), 500);
}
