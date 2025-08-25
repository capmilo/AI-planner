import React, { useState } from 'react';
import { Plus, FolderOpen, Trash2, Calendar, Target } from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { Project } from '../types';
import CreateProjectModal from '../components/CreateProjectModal';
import AnimatedBackground from '../components/AnimatedBackground';

const Home: React.FC = () => {
  const { loadProjects, deleteProject, setProject } = useProject();
  const [projects, setProjects] = useState<Project[]>(loadProjects());
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleOpenProject = (project: Project) => {
    setProject(project);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      deleteProject(id);
      setProjects(loadProjects());
    }
  };

  const handleCreateProject = () => {
    setShowCreateModal(true);
  };

  const handleProjectCreated = (newProject: Project) => {
    setProjects(loadProjects());
    setShowCreateModal(false);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Planner
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Planifica tus proyectos de IA de forma visual y colaborativa. 
            Diseña flujos, conecta ideas y obtén ayuda de nuestro agente inteligente.
          </p>
        </div>

        {/* Create Project Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleCreateProject}
            className="btn-primary flex items-center gap-2 text-lg px-8 py-3 hover-lift animate-fade-in"
          >
            <Plus className="w-5 h-5" />
            Crear Nuevo Proyecto
          </button>
        </div>

        {/* Projects Grid */}
        <div className="max-w-6xl mx-auto">
          {projects.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                <FolderOpen className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No hay proyectos aún
              </h3>
              <p className="text-gray-500 mb-6">
                Crea tu primer proyecto para empezar a planificar
              </p>
              <button
                onClick={handleCreateProject}
                className="btn-primary flex items-center gap-2 mx-auto"
              >
                <Plus className="w-4 h-4" />
                Crear Proyecto
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div 
                  key={project.id} 
                  className="card hover:shadow-lg transition-all duration-300 hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {project.name}
                    </h3>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Eliminar proyecto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Target className="w-4 h-4" />
                      <span className="font-medium">Objetivo:</span>
                    </div>
                    <p className="text-gray-700 text-sm line-clamp-2">
                      {project.objective}
                    </p>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span className="font-medium">Herramientas:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.tools.slice(0, 3).map((tool, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                        >
                          {tool}
                        </span>
                      ))}
                      {project.tools.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{project.tools.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Creado: {formatDate(project.createdAt)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenProject(project)}
                    className="w-full btn-primary"
                  >
                    Abrir Proyecto
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CreateProjectModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onProjectCreated={handleProjectCreated}
      />
    </div>
  );
};

export default Home;
