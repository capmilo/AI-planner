export interface Project {
  id: string;
  name: string;
  objective: string;
  tools: string[];
  createdAt: Date;
  updatedAt: Date;
  flowData?: FlowData;
}

export interface FlowData {
  nodes: Node[];
  edges: Edge[];
}

export interface Node {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    description?: string;
    type?: 'task' | 'decision' | 'input' | 'output';
  };
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  type: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ProjectContext {
  project: Project | null;
  setProject: (project: Project | null) => void;
  saveProject: (project: Project) => void;
  loadProjects: () => Project[];
  deleteProject: (id: string) => void;
}
