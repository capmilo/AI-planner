import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, ProjectContext as ProjectContextType } from '../types';

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

interface ProjectProviderProps {
  children: React.ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const [project, setProject] = useState<Project | null>(null);

  const saveProject = (projectToSave: Project) => {
    const projects = loadProjects();
    const existingIndex = projects.findIndex(p => p.id === projectToSave.id);
    
    if (existingIndex >= 0) {
      projects[existingIndex] = { ...projectToSave, updatedAt: new Date() };
    } else {
      projects.push({ ...projectToSave, updatedAt: new Date() });
    }
    
    localStorage.setItem('ai-planner-projects', JSON.stringify(projects));
    setProject(projectToSave);
  };

  const loadProjects = (): Project[] => {
    try {
      const stored = localStorage.getItem('ai-planner-projects');
      if (stored) {
        const projects = JSON.parse(stored);
        return projects.map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt),
        }));
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    }
    return [];
  };

  const deleteProject = (id: string) => {
    const projects = loadProjects();
    const filteredProjects = projects.filter(p => p.id !== id);
    localStorage.setItem('ai-planner-projects', JSON.stringify(filteredProjects));
    
    if (project?.id === id) {
      setProject(null);
    }
  };

  const value: ProjectContextType = {
    project,
    setProject,
    saveProject,
    loadProjects,
    deleteProject,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};
