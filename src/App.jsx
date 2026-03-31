import { useApp } from './context/AppContext'
import Dashboard from './components/Dashboard'
import LessonView from './components/LessonView'
import Profile from './components/Profile'
import TrackView from './components/TrackView'
import HeroSection from './components/ui/HeroSection'

function App() {
  const { currentView, setCurrentView } = useApp();

  return (
    <div className="app">
      {currentView === 'landing' && <HeroSection onStart={() => setCurrentView('dashboard')} />}
      {currentView === 'dashboard' && <Dashboard />}
      {currentView === 'lesson' && <LessonView />}
      {currentView === 'profile' && <Profile />}
      {currentView === 'track' && <TrackView />}
    </div>
  );
}

export default App
