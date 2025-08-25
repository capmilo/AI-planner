import React, { useState } from 'react';
import { X, Save, Trash2, Plus } from 'lucide-react';
import { Project } from '../types';
import { useProject } from '../context/ProjectContext';

interface ProjectSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

const ProjectSettings: React.FC<ProjectSettingsProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const { saveProject, deleteProject, setProject } = useProject();
  const [formData, setFormData] = useState({
    name: project.name,
    objective: project.objective,
    tools: [...project.tools],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.objective.trim()) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    const updatedProject: Project = {
      ...project,
      name: formData.name.trim(),
      objective: formData.objective.trim(),
      tools: formData.tools.filter(tool => tool.trim() !== ''),
      updatedAt: new Date(),
    };

    saveProject(updatedProject);
    onClose();
  };

  const handleDelete = () => {
    if (confirm('¿Estás seguro de que quieres eliminar este proyecto? Esta acción no se puede deshacer.')) {
      deleteProject(project.id);
      setProject(null);
      onClose();
    }
  };

  const handleToolChange = (index: number, value: string) => {
    const newTools = [...formData.tools];
    newTools[index] = value;
    setFormData({ ...formData, tools: newTools });
  };

  const addTool = () => {
    setFormData({
      ...formData,
      tools: [...formData.tools, ''],
    });
  };

  const removeTool = (index: number) => {
    if (formData.tools.length > 1) {
      const newTools = formData.tools.filter((_, i) => i !== index);
      setFormData({ ...formData, tools: newTools });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Configuración del Proyecto
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Proyecto *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field"
              placeholder="Nombre del proyecto"
              required
            />
          </div>

          <div>
            <label htmlFor="objective" className="block text-sm font-medium text-gray-700 mb-2">
              Objetivo del Proyecto *
            </label>
            <textarea
              id="objective"
              value={formData.objective}
              onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
              className="input-field resize-none"
              rows={4}
              placeholder="Describe el objetivo principal de tu proyecto..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Herramientas a Utilizar
            </label>
            <div className="space-y-2">
              {formData.tools.map((tool, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={tool}
                    onChange={(e) => handleToolChange(index, e.target.value)}
                    className="input-field flex-1"
                    placeholder="Ej: TensorFlow, Python, React..."
                  />
                  {formData.tools.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTool(index)}
                      className="px-3 py-2 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addTool}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Agregar Herramienta
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Información del Proyecto</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">ID:</span>
                <p className="font-mono text-gray-900">{project.id}</p>
              </div>
              <div>
                <span className="text-gray-600">Creado:</span>
                <p className="text-gray-900">
                  {new Date(project.createdAt).toLocaleDateString('es-ES')}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Última modificación:</span>
                <p className="text-gray-900">
                  {new Date(project.updatedAt).toLocaleDateString('es-ES')}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Nodos en el flujo:</span>
                <p className="text-gray-900">
                  {project.flowData?.nodes.length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar Proyecto
            </button>
            
            <div className="flex-1"></div>
            
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectSettings;
