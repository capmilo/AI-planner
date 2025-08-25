import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { 
  Play, 
  CheckCircle, 
  AlertTriangle, 
  Database, 
  Code, 
  Settings,
  Zap,
  Target
} from 'lucide-react';

// Node types
const nodeTypes = {
  task: { icon: Play, color: 'bg-blue-500', borderColor: 'border-blue-500' },
  decision: { icon: AlertTriangle, color: 'bg-yellow-500', borderColor: 'border-yellow-500' },
  input: { icon: Database, color: 'bg-green-500', borderColor: 'border-green-500' },
  output: { icon: CheckCircle, color: 'bg-purple-500', borderColor: 'border-purple-500' },
  process: { icon: Code, color: 'bg-indigo-500', borderColor: 'border-indigo-500' },
  config: { icon: Settings, color: 'bg-gray-500', borderColor: 'border-gray-500' },
  action: { icon: Zap, color: 'bg-orange-500', borderColor: 'border-orange-500' },
  goal: { icon: Target, color: 'bg-red-500', borderColor: 'border-red-500' },
};

export const CustomNode = memo(({ data, selected }: NodeProps) => {
  const nodeType = nodeTypes[data.type as keyof typeof nodeTypes] || nodeTypes.task;
  const IconComponent = nodeType.icon;

  return (
    <div
      className={`
        relative bg-white rounded-lg shadow-md border-2 p-3 min-w-[150px] max-w-[200px]
        ${nodeType.borderColor} ${selected ? 'shadow-lg ring-2 ring-primary-300' : ''}
        transition-all duration-200 hover:shadow-lg
      `}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-primary-500 border-2 border-white"
      />
      
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-6 h-6 rounded-full ${nodeType.color} flex items-center justify-center`}>
          <IconComponent className="w-3 h-3 text-white" />
        </div>
        <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
          {data.type}
        </span>
      </div>
      
      <div className="mb-2">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight">
          {data.label}
        </h3>
        {data.description && (
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            {data.description}
          </p>
        )}
      </div>

      {data.duration && (
        <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
          ⏱️ {data.duration}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-primary-500 border-2 border-white"
      />
    </div>
  );
});

export const DecisionNode = memo(({ data, selected }: NodeProps) => {
  return (
    <div
      className={`
        relative bg-white rounded-lg shadow-md border-2 p-3 min-w-[120px] max-w-[160px]
        border-yellow-500 ${selected ? 'shadow-lg ring-2 ring-yellow-300' : ''}
        transition-all duration-200 hover:shadow-lg
      `}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-yellow-500 border-2 border-white"
      />
      
      <div className="flex items-center justify-center mb-2">
        <AlertTriangle className="w-5 h-5 text-yellow-500" />
      </div>
      
      <div className="text-center">
        <h3 className="font-semibold text-gray-900 text-sm">
          {data.label}
        </h3>
        {data.description && (
          <p className="text-xs text-gray-600 mt-1">
            {data.description}
          </p>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-yellow-500 border-2 border-white"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-yellow-500 border-2 border-white"
      />
    </div>
  );
});

export const StartEndNode = memo(({ data, selected }: NodeProps) => {
  const isStart = data.type === 'start';
  const IconComponent = isStart ? Play : CheckCircle;
  const bgColor = isStart ? 'bg-green-500' : 'bg-red-500';
  const borderColor = isStart ? 'border-green-500' : 'border-red-500';

  return (
    <div
      className={`
        relative bg-white rounded-full shadow-md border-2 p-4 min-w-[100px] max-w-[120px]
        ${borderColor} ${selected ? 'shadow-lg ring-2 ring-primary-300' : ''}
        transition-all duration-200 hover:shadow-lg
      `}
    >
      <Handle
        type={isStart ? "source" : "target"}
        position={isStart ? Position.Bottom : Position.Top}
        className={`w-3 h-3 ${bgColor} border-2 border-white`}
      />
      
      <div className="flex flex-col items-center text-center">
        <div className={`w-8 h-8 rounded-full ${bgColor} flex items-center justify-center mb-2`}>
          <IconComponent className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-semibold text-gray-900 text-sm">
          {data.label}
        </h3>
      </div>
    </div>
  );
});

CustomNode.displayName = 'CustomNode';
DecisionNode.displayName = 'DecisionNode';
StartEndNode.displayName = 'StartEndNode';
