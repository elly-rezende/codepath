import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProvider } from './context/AppContext'
import { LanguageProvider } from './context/LanguageContext'
import { GamificationProvider } from './context/GamificationContext'
import { AuthProvider } from './context/AuthContext'
import { FriendsProvider } from './context/FriendsContext'
import { QuestsProvider } from './context/QuestsContext'
import { TeacherProvider } from './context/TeacherContext'
import { SubscriptionProvider } from './context/SubscriptionContext'
import App from './App.jsx'
import './index.css'
import { initCapacitor } from './lib/capacitor'

// Initialize Capacitor native bridge (no-op on web)
initCapacitor();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <FriendsProvider>
          <GamificationProvider>
            <QuestsProvider>
              <TeacherProvider>
                <AppProvider>
                  <SubscriptionProvider>
                    <App />
                  </SubscriptionProvider>
                </AppProvider>
              </TeacherProvider>
            </QuestsProvider>
          </GamificationProvider>
        </FriendsProvider>
      </AuthProvider>
    </LanguageProvider>
  </StrictMode>,
)
