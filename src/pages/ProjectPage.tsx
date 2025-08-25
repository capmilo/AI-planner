import React, { useState } from 'react';
import { ArrowLeft, Settings, Save, BarChart3 } from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import FlowBoard from '../components/FlowBoard';
import ChatPanel from '../components/ChatPanel';
import ProjectSettings from '../components/ProjectSettings';
import ProjectAnalytics from '../components/ProjectAnalytics';

const ProjectPage: React.FC = () => {
  const { project, setProject } = useProject();
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<'flow' | 'chat' | 'analytics'>('flow');

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            No hay proyecto seleccionado
          </h2>
          <button
            onClick={() => setProject(null)}
            className="btn-primary"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setProject(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver</span>
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {project.name}
              </h1>
              <p className="text-sm text-gray-600">
                {project.objective}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Configuración</span>
            </button>
            <button className="btn-primary flex items-center gap-2">
              <Save className="w-4 h-4" />
              <span>Guardar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('flow')}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'flow'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Tablero de Flujos
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'chat'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Chat con IA
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'analytics'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </div>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'flow' ? (
          <FlowBoard project={project} />
        ) : activeTab === 'chat' ? (
          <ChatPanel project={project} />
        ) : (
          <div className="h-full overflow-y-auto p-6">
            <ProjectAnalytics project={project} />
          </div>
        )}
      </div>

      {/* Settings Modal */}
      <ProjectSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        project={project}
      />
    </div>
  );
};

export default ProjectPage;
