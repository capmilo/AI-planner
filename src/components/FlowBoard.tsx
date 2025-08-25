import React, { useState, useCallback, useMemo, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  Panel,
  NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Plus, Trash2, Save, Download, Upload, RotateCcw } from 'lucide-react';
import { Project } from '../types';
import { useProject } from '../context/ProjectContext';
import { CustomNode, DecisionNode, StartEndNode } from './CustomNodes';

interface FlowBoardProps {
  project: Project;
}

const FlowBoard: React.FC<FlowBoardProps> = ({ project }) => {
  const { saveProject } = useProject();
  
  // Initialize nodes and edges from project data
  const initialNodes: Node[] = useMemo(() => 
    project.flowData?.nodes || [], [project.flowData?.nodes]
  );
  const initialEdges: Edge[] = useMemo(() => 
    project.flowData?.edges || [], [project.flowData?.edges]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [showNodePanel, setShowNodePanel] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = useCallback((nodeType: string = 'task') => {
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: nodeType === 'decision' ? 'decision' : nodeType === 'start' || nodeType === 'end' ? 'startEnd' : 'custom',
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
      data: {
        label: getDefaultLabel(nodeType),
        description: getDefaultDescription(nodeType),
        type: nodeType,
        duration: nodeType === 'task' ? '2-3 días' : undefined,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  const getDefaultLabel = (type: string): string => {
    const labels = {
      task: 'Nueva Tarea',
      decision: 'Decisión',
      input: 'Entrada de Datos',
      output: 'Resultado',
      process: 'Procesamiento',
      config: 'Configuración',
      action: 'Acción',
      goal: 'Objetivo',
      start: 'Inicio',
      end: 'Fin',
    };
    return labels[type as keyof typeof labels] || 'Nuevo Paso';
  };

  const getDefaultDescription = (type: string): string => {
    const descriptions = {
      task: 'Describe la tarea a realizar',
      decision: 'Punto de decisión en el flujo',
      input: 'Datos de entrada del sistema',
      output: 'Resultados o salidas',
      process: 'Procesamiento de datos',
      config: 'Configuración del sistema',
      action: 'Acción específica a ejecutar',
      goal: 'Objetivo a alcanzar',
      start: 'Punto de inicio del proyecto',
      end: 'Punto final del proyecto',
    };
    return descriptions[type as keyof typeof descriptions] || 'Describe este paso';
  };

  const deleteSelectedNode = useCallback(() => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
      setEdges((eds) => eds.filter((edge) => 
        edge.source !== selectedNode.id && edge.target !== selectedNode.id
      ));
      setSelectedNode(null);
    }
  }, [selectedNode, setNodes, setEdges]);

  const saveFlow = useCallback(() => {
    const updatedProject = {
      ...project,
      flowData: {
        nodes,
        edges,
      },
      updatedAt: new Date(),
    };
    saveProject(updatedProject);
  }, [project, nodes, edges, saveProject]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  // Update selectedNode when nodes change
  useEffect(() => {
    if (selectedNode) {
      const updatedNode = nodes.find(node => node.id === selectedNode.id);
      if (updatedNode && JSON.stringify(updatedNode) !== JSON.stringify(selectedNode)) {
        setSelectedNode(updatedNode);
      }
    }
  }, [nodes, selectedNode]);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const nodeTypes = useMemo<NodeTypes>(() => ({
    custom: CustomNode,
    decision: DecisionNode,
    startEnd: StartEndNode,
  }), []);

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls />
        <MiniMap 
          nodeStrokeColor={(n) => {
            if (n.style?.background) return n.style.background;
            if (n.type === 'input') return '#0041d0';
            if (n.type === 'output') return '#ff0072';
            if (n.type === 'default') return '#1a192b';
            return '#eee';
          }}
          nodeColor={(n) => {
            if (n.style?.background) return n.style.background;
            return '#fff';
          }}
          nodeBorderRadius={2}
        />
        
        <Panel position="top-left" className="bg-white rounded-lg shadow-md p-2">
          <div className="flex gap-2">
            <div className="relative">
              <button
                onClick={() => setShowNodePanel(!showNodePanel)}
                className="flex items-center gap-2 px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm"
                title="Agregar nodo"
              >
                <Plus className="w-4 h-4" />
                Agregar Paso
              </button>
              
              {showNodePanel && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-10 min-w-[200px]">
                  <div className="grid grid-cols-2 gap-1">
                    <button
                      onClick={() => { addNode('task'); setShowNodePanel(false); }}
                      className="text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                    >
                      📋 Tarea
                    </button>
                    <button
                      onClick={() => { addNode('decision'); setShowNodePanel(false); }}
                      className="text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                    >
                      ❓ Decisión
                    </button>
                    <button
                      onClick={() => { addNode('input'); setShowNodePanel(false); }}
                      className="text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                    >
                      📥 Entrada
                    </button>
                    <button
                      onClick={() => { addNode('output'); setShowNodePanel(false); }}
                      className="text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                    >
                      📤 Salida
                    </button>
                    <button
                      onClick={() => { addNode('process'); setShowNodePanel(false); }}
                      className="text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                    >
                      ⚙️ Proceso
                    </button>
                    <button
                      onClick={() => { addNode('action'); setShowNodePanel(false); }}
                      className="text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                    >
                      ⚡ Acción
                    </button>
                    <button
                      onClick={() => { addNode('start'); setShowNodePanel(false); }}
                      className="text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                    >
                      🟢 Inicio
                    </button>
                    <button
                      onClick={() => { addNode('end'); setShowNodePanel(false); }}
                      className="text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                    >
                      🔴 Fin
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {selectedNode && (
              <button
                onClick={deleteSelectedNode}
                className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
                title="Eliminar nodo seleccionado"
              >
                <Trash2 className="w-4 h-4" />
                Eliminar
              </button>
            )}
            
            <button
              onClick={saveFlow}
              className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
              title="Guardar flujo"
            >
              <Save className="w-4 h-4" />
              Guardar
            </button>
          </div>
        </Panel>

        {selectedNode && (
          <Panel position="top-right" className="bg-white rounded-lg shadow-md p-4 max-w-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Editar Nodo</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  value={selectedNode.data.label}
                  onChange={(e) => {
                    const updatedNode = { ...selectedNode, data: { ...selectedNode.data, label: e.target.value } };
                    setSelectedNode(updatedNode);
                    setNodes((nds) =>
                      nds.map((node) =>
                        node.id === selectedNode.id ? updatedNode : node
                      )
                    );
                  }}
                  className="input-field text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={selectedNode.data.description || ''}
                  onChange={(e) => {
                    const updatedNode = { ...selectedNode, data: { ...selectedNode.data, description: e.target.value } };
                    setSelectedNode(updatedNode);
                    setNodes((nds) =>
                      nds.map((node) =>
                        node.id === selectedNode.id ? updatedNode : node
                      )
                    );
                  }}
                  className="input-field text-sm resize-none"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo
                </label>
                <select
                  value={selectedNode.data.type || 'task'}
                  onChange={(e) => {
                    const updatedNode = { ...selectedNode, data: { ...selectedNode.data, type: e.target.value as any } };
                    setSelectedNode(updatedNode);
                    setNodes((nds) =>
                      nds.map((node) =>
                        node.id === selectedNode.id ? updatedNode : node
                      )
                    );
                  }}
                  className="input-field text-sm"
                >
                  <option value="task">📋 Tarea</option>
                  <option value="decision">❓ Decisión</option>
                  <option value="input">📥 Entrada</option>
                  <option value="output">📤 Salida</option>
                  <option value="process">⚙️ Proceso</option>
                  <option value="action">⚡ Acción</option>
                  <option value="goal">🎯 Objetivo</option>
                  <option value="start">🟢 Inicio</option>
                  <option value="end">🔴 Fin</option>
                </select>
              </div>

              {selectedNode.data.type === 'task' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duración Estimada
                  </label>
                  <input
                    type="text"
                    value={selectedNode.data.duration || ''}
                    onChange={(e) => {
                      const updatedNode = { ...selectedNode, data: { ...selectedNode.data, duration: e.target.value } };
                      setSelectedNode(updatedNode);
                      setNodes((nds) =>
                        nds.map((node) =>
                          node.id === selectedNode.id ? updatedNode : node
                        )
                      );
                    }}
                    className="input-field text-sm"
                    placeholder="Ej: 2-3 días, 1 semana..."
                  />
                </div>
              )}

              <div className="pt-2 border-t border-gray-200">
                <button
                  onClick={() => setSelectedNode(null)}
                  className="w-full btn-secondary text-sm"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
};

export default FlowBoard;
