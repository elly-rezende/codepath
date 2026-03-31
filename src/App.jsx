import { useApp } from './context/AppContext'
import Dashboard from './components/Dashboard'
import LessonView from './components/LessonView'
import Profile from './components/Profile'
import TrackView from './components/TrackView'

function App() {
  const { currentView } = useApp();

  return (
    <div className="app">
      {currentView === 'dashboard' && <Dashboard />}
      {currentView === 'lesson' && <LessonView />}
      {currentView === 'profile' && <Profile />}
      {currentView === 'track' && <TrackView />}
    </div>
  );
}

export default App
