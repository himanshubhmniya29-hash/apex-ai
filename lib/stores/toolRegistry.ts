import { create } from 'zustand'
import { Tool, ToolCategory, ToolStatus } from '@/lib/types'

interface ToolRegistryStore {
  tools: Tool[]
  
  // Tool management
  registerTool: (tool: Tool) => void
  unregisterTool: (id: string) => void
  updateTool: (id: string, updates: Partial<Tool>) => void
  getTool: (id: string) => Tool | null
  getToolsByCategory: (category: ToolCategory) => Tool[]
  getAvailableTools: () => Tool[]
  recordToolUsage: (id: string) => void
  setToolStatus: (id: string, status: ToolStatus) => void
}

// Built-in tools
const DEFAULT_TOOLS: Tool[] = [
  {
    id: 'port-scanner',
    name: 'Port Scanner',
    description: 'Scan open ports on network devices (authorized only)',
    category: 'cybersecurity',
    status: 'available',
    icon: '🔍',
    requiresAuth: true,
    rateLimit: 10,
    usageCount: 0,
    parameters: [
      {
        name: 'host',
        type: 'string',
        description: 'Target host or IP address',
        required: true,
      },
      {
        name: 'ports',
        type: 'string',
        description: 'Port range (e.g., 1-1000 or 80,443,3000)',
        required: true,
      },
    ],
  },
  {
    id: 'dependency-audit',
    name: 'Dependency Audit',
    description: 'Audit project dependencies for vulnerabilities',
    category: 'cybersecurity',
    status: 'available',
    icon: '📦',
    requiresAuth: false,
    rateLimit: 30,
    usageCount: 0,
  },
  {
    id: 'memory-search',
    name: 'Memory Search',
    description: 'Search conversation history and memories',
    category: 'productivity',
    status: 'available',
    icon: '🧠',
    requiresAuth: false,
    usageCount: 0,
  },
  {
    id: 'file-analyzer',
    name: 'File Analyzer',
    description: 'Analyze code files and generate documentation',
    category: 'development',
    status: 'available',
    icon: '📄',
    requiresAuth: false,
    usageCount: 0,
  },
  {
    id: 'code-executor',
    name: 'Code Executor',
    description: 'Execute and test code snippets (sandboxed)',
    category: 'development',
    status: 'beta',
    icon: '⚙️',
    requiresAuth: true,
    rateLimit: 5,
    usageCount: 0,
  },
  {
    id: 'data-visualizer',
    name: 'Data Visualizer',
    description: 'Create charts and visualizations from data',
    category: 'analysis',
    status: 'available',
    icon: '📊',
    requiresAuth: false,
    usageCount: 0,
  },
]

export const useToolRegistry = create<ToolRegistryStore>((set, get) => ({
  tools: DEFAULT_TOOLS,

  registerTool: (tool) =>
    set((state) => ({
      tools: [...state.tools, tool],
    })),

  unregisterTool: (id) =>
    set((state) => ({
      tools: state.tools.filter((t) => t.id !== id),
    })),

  updateTool: (id, updates) =>
    set((state) => ({
      tools: state.tools.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    })),

  getTool: (id) => {
    const state = get()
    return state.tools.find((t) => t.id === id) || null
  },

  getToolsByCategory: (category) => {
    const state = get()
    return state.tools.filter((t) => t.category === category)
  },

  getAvailableTools: () => {
    const state = get()
    return state.tools.filter((t) => t.status === 'available' || t.status === 'beta')
  },

  recordToolUsage: (id) =>
    set((state) => ({
      tools: state.tools.map((t) =>
        t.id === id
          ? { ...t, usageCount: (t.usageCount || 0) + 1, lastUsed: Date.now() }
          : t
      ),
    })),

  setToolStatus: (id, status) =>
    set((state) => ({
      tools: state.tools.map((t) =>
        t.id === id ? { ...t, status } : t
      ),
    })),
}))
