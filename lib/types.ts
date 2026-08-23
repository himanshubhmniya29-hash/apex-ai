// AI Provider Types
export type AIProvider = 'openai' | 'gemini' | 'anthropic' | 'local'

export interface AIProviderConfig {
  provider: AIProvider
  apiKey?: string
  model?: string
  baseUrl?: string
}

// Message Types
export type MessageRole = 'user' | 'assistant' | 'system'

export interface Message {
  id: string
  conversationId: string
  role: MessageRole
  content: string
  timestamp: number
  metadata?: {
    voiceInput?: boolean
    toolsUsed?: string[]
    attachments?: string[]
  }
}

// Conversation Types
export interface Conversation {
  id: string
  title: string
  description?: string
  messages: Message[]
  createdAt: number
  updatedAt: number
  isArchived: boolean
  tags?: string[]
  summary?: string
}

// Tool Registry Types
export type ToolCategory = 'cybersecurity' | 'productivity' | 'automation' | 'analysis' | 'utility' | 'development'
export type ToolStatus = 'available' | 'beta' | 'disabled' | 'requires_config'

export interface ToolParameter {
  name: string
  type: 'string' | 'number' | 'boolean' | 'array' | 'object'
  description: string
  required: boolean
  default?: unknown
}

export interface Tool {
  id: string
  name: string
  description: string
  category: ToolCategory
  status: ToolStatus
  icon?: string
  parameters?: ToolParameter[]
  requiresAuth?: boolean
  rateLimit?: number
  lastUsed?: number
  usageCount?: number
}

// Task/Activity Types
export type ActivityStatus = 'idle' | 'thinking' | 'planning' | 'executing' | 'complete' | 'error'
export type ActivityType = 'analysis' | 'tool_execution' | 'memory_update' | 'file_process' | 'query'

export interface Activity {
  id: string
  type: ActivityType
  status: ActivityStatus
  title: string
  description?: string
  progress: number
  startTime: number
  endTime?: number
  result?: unknown
  error?: string
}

// Memory Types
export interface MemoryItem {
  id: string
  key: string
  value: unknown
  type: 'short_term' | 'long_term' | 'episodic'
  createdAt: number
  updatedAt: number
  importance: number // 0-10
  tags?: string[]
}

export interface MemoryContext {
  shortTerm: MemoryItem[]
  longTerm: MemoryItem[]
  episodic: MemoryItem[]
}

// Permission Types
export type Permission = 'read' | 'write' | 'execute' | 'admin'
export type PermissionScope = 'memory' | 'tools' | 'files' | 'settings' | 'system'

export interface PermissionRule {
  id: string
  scope: PermissionScope
  permissions: Permission[]
  isAllowed: boolean
  description?: string
}

export interface PermissionsProfile {
  id: string
  name: string
  description?: string
  rules: PermissionRule[]
  createdAt: number
}

// Settings Types
export interface ApexSettings {
  theme: 'dark' | 'light' | 'auto'
  language: string
  voice: {
    enabled: boolean
    language: string
    rate: number
    pitch: number
  }
  notifications: {
    enabled: boolean
    sound: boolean
    desktop: boolean
  }
  privacy: {
    storeHistory: boolean
    allowAnalytics: boolean
    dataRetention: 'never' | '30days' | '90days' | 'forever'
  }
  ai: AIProviderConfig
}

// System Status
export interface SystemStatus {
  isOnline: boolean
  apiLatency: number
  memoryUsage: number
  activeConnections: number
  lastSyncAt: number
}
