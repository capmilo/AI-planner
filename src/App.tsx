import React from 'react';
import { ProjectProvider } from './context/ProjectContext';
import { NotificationProvider } from './context/NotificationContext';
import { useProject } from './context/ProjectContext';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import NotificationContainer from './components/NotificationContainer';

const AppContent: React.FC = () => {
  const { project } = useProject();

  return project ? <ProjectPage /> : <Home />;
};

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <ProjectProvider>
        <AppContent />
        <NotificationContainer />
      </ProjectProvider>
    </NotificationProvider>
  );
};

export default App;
