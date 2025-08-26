import React from 'react';
import { ProjectProvider } from './context/ProjectContext';
import { NotificationProvider } from './context/NotificationContext';
import { useProject } from './context/ProjectContext';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import NotificationContainer from './components/NotificationContainer';

const AppContent: React.FC = () => {
  const { project } = useProject();

  return project ? <ProjectPage /> : <Home />;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <ProjectProvider>
          <div className="min-h-screen relative">
            <AppContent />
            <NotificationContainer />
            <div className="fixed top-4 right-4">
              <ThemeToggle />
            </div>
          </div>
        </ProjectProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
