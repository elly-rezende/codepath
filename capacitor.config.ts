import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // App identifier — reverse-DNS format, must match Apple Developer account
  appId: 'app.codepath.mobile',

  // Display name on home screen
  appName: 'CodePath',

  // Where the built web app lives (Vite outputs to dist/)
  webDir: 'dist',

  // Use bundled assets — no live server reload in production builds
  server: {
    androidScheme: 'https',
    iosScheme: 'codepath',
    // For live development on a real device, uncomment + put your local IP:
    // url: 'http://192.168.1.10:5173',
    // cleartext: true,
  },

  // iOS-specific options
  ios: {
    // Allow content under status bar (we handle safe area in CSS)
    contentInset: 'always',
    // Background color shown while web view boots
    backgroundColor: '#12141C',
    // Use the swipe gesture to navigate back (familiar to iOS users)
    handleApplicationNotifications: true,
    // Allow the keyboard to push content (default behavior)
    scrollEnabled: true,
    // Disable selecting text (feels more app-like)
    allowsLinkPreview: false,
    // Allow images to be saved/shared from long-press
    limitsNavigationsToAppBoundDomains: false,
  },

  android: {
    backgroundColor: '#12141C',
    allowMixedContent: false,
  },

  // Native plugin options
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      backgroundColor: '#12141C',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      spinnerColor: '#3B82F6',
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#12141C',
    },
    Keyboard: {
      resize: 'body',
      resizeOnFullScreen: true,
    },
  },
};

export default config;
