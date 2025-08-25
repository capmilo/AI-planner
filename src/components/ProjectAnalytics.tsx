import React from 'react';
import { 
  BarChart3, 
  Clock, 
  Target, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Calendar,
  Users
} from 'lucide-react';
import { Project } from '../types';

interface ProjectAnalyticsProps {
  project: Project;
}

const ProjectAnalytics: React.FC<ProjectAnalyticsProps> = ({ project }) => {
  const nodes = project.flowData?.nodes || [];
  const edges = project.flowData?.edges || [];

  // Calculate analytics
  const totalNodes = nodes.length;
  const totalConnections = edges.length;
  const nodeTypes = nodes.reduce((acc, node) => {
    const type = node.data.type || 'unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const taskNodes = nodeTypes.task || 0;
  const decisionNodes = nodeTypes.decision || 0;
  const inputNodes = nodeTypes.input || 0;
  const outputNodes = nodeTypes.output || 0;

  const projectAge = Math.floor((Date.now() - new Date(project.createdAt).getTime()) / (1000 * 60 * 60 * 24));
  const lastModified = Math.floor((Date.now() - new Date(project.updatedAt).getTime()) / (1000 * 60 * 60 * 24));

  const complexityScore = Math.min(100, (totalNodes * 5) + (totalConnections * 3));

  const getProgressColor = (score: number) => {
    if (score < 30) return 'text-red-500';
    if (score < 70) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getProgressBg = (score: number) => {
    if (score < 30) return 'bg-red-100';
    if (score < 70) return 'bg-yellow-100';
    return 'bg-green-100';
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Nodos</p>
              <p className="text-2xl font-bold text-gray-900">{totalNodes}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Conexiones</p>
              <p className="text-2xl font-bold text-gray-900">{totalConnections}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Complejidad</p>
              <p className="text-2xl font-bold text-gray-900">{complexityScore}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Días Activo</p>
              <p className="text-2xl font-bold text-gray-900">{projectAge}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Node Type Distribution */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribución de Tipos de Nodos</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600">Tareas</p>
            <p className="text-xl font-bold text-gray-900">{taskNodes}</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-sm text-gray-600">Decisiones</p>
            <p className="text-xl font-bold text-gray-900">{decisionNodes}</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">Entradas</p>
            <p className="text-xl font-bold text-gray-900">{inputNodes}</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600">Salidas</p>
            <p className="text-xl font-bold text-gray-900">{outputNodes}</p>
          </div>
        </div>
      </div>

      {/* Project Timeline */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline del Proyecto</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Proyecto Creado</p>
                <p className="text-sm text-gray-600">
                  {new Date(project.createdAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            <span className="text-sm text-gray-500">Hace {projectAge} días</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Última Modificación</p>
                <p className="text-sm text-gray-600">
                  {new Date(project.updatedAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {lastModified === 0 ? 'Hoy' : `Hace ${lastModified} días`}
            </span>
          </div>
        </div>
      </div>

      {/* Tools Used */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Herramientas del Proyecto</h3>
        <div className="flex flex-wrap gap-2">
          {project.tools.map((tool, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full font-medium"
            >
              {tool}
            </span>
          ))}
          {project.tools.length === 0 && (
            <p className="text-gray-500 text-sm">No se han especificado herramientas</p>
          )}
        </div>
      </div>

      {/* Recommendations */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recomendaciones</h3>
        <div className="space-y-3">
          {totalNodes === 0 && (
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Target className="w-5 h-5 text-blue-600" />
              <p className="text-sm text-blue-800">
                Comienza agregando nodos a tu flujo para visualizar el proyecto
              </p>
            </div>
          )}
          
          {totalNodes > 0 && totalConnections === 0 && (
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <p className="text-sm text-yellow-800">
                Conecta los nodos para crear un flujo de trabajo coherente
              </p>
            </div>
          )}
          
          {project.tools.length < 3 && (
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-sm text-green-800">
                Considera agregar más herramientas específicas para tu proyecto
              </p>
            </div>
          )}
          
          {complexityScore > 80 && (
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <p className="text-sm text-purple-800">
                Tu proyecto tiene alta complejidad. Considera dividirlo en subproyectos
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectAnalytics;
