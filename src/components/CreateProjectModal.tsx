import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { Project } from '../types';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated: (project: Project) => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onProjectCreated,
}) => {
  const { saveProject } = useProject();
  const [formData, setFormData] = useState({
    name: '',
    objective: '',
    tools: [''],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.objective.trim()) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    const newProject: Project = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      objective: formData.objective.trim(),
      tools: formData.tools.filter(tool => tool.trim() !== ''),
      createdAt: new Date(),
      updatedAt: new Date(),
      flowData: {
        nodes: [],
        edges: [],
      },
    };

    saveProject(newProject);
    onProjectCreated(newProject);
    
    // Reset form
    setFormData({
      name: '',
      objective: '',
      tools: [''],
    });
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
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Crear Nuevo Proyecto
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
              placeholder="Ej: Sistema de Recomendación IA"
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
              rows={3}
              placeholder="Describe el objetivo principal de tu proyecto de IA..."
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

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              Crear Proyecto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;
