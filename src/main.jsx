import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProvider } from './context/AppContext'
import { LanguageProvider } from './context/LanguageContext'
import { GamificationProvider } from './context/GamificationContext'
import { AuthProvider } from './context/AuthContext'
import { FriendsProvider } from './context/FriendsContext'
import { QuestsProvider } from './context/QuestsContext'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <FriendsProvider>
          <GamificationProvider>
            <QuestsProvider>
              <AppProvider>
                <App />
              </AppProvider>
            </QuestsProvider>
          </GamificationProvider>
        </FriendsProvider>
      </AuthProvider>
    </LanguageProvider>
  </StrictMode>,
)
