import { create } from 'zustand'
import { Conversation, Message, MessageRole } from '@/lib/types'

interface ConversationStore {
  conversations: Conversation[]
  activeConversationId: string | null
  
  // Conversation management
  createConversation: (title: string, description?: string) => Conversation
  deleteConversation: (id: string) => void
  updateConversation: (id: string, updates: Partial<Conversation>) => void
  setActiveConversation: (id: string) => void
  getActiveConversation: () => Conversation | null
  
  // Message management
  addMessage: (conversationId: string, role: MessageRole, content: string, metadata?: Message['metadata']) => Message
  updateMessage: (conversationId: string, messageId: string, content: string) => void
  deleteMessage: (conversationId: string, messageId: string) => void
  getMessages: (conversationId: string) => Message[]
  clearMessages: (conversationId: string) => void
}

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

export const useConversationStore = create<ConversationStore>((set, get) => ({
  conversations: [],
  activeConversationId: null,

  createConversation: (title, description) => {
    const conversation: Conversation = {
      id: generateId(),
      title,
      description,
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isArchived: false,
    }
    set((state) => ({
      conversations: [conversation, ...state.conversations],
      activeConversationId: conversation.id,
    }))
    return conversation
  },

  deleteConversation: (id) =>
    set((state) => ({
      conversations: state.conversations.filter((c) => c.id !== id),
      activeConversationId: state.activeConversationId === id ? null : state.activeConversationId,
    })),

  updateConversation: (id, updates) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === id ? { ...c, ...updates, updatedAt: Date.now() } : c
      ),
    })),

  setActiveConversation: (id) =>
    set({ activeConversationId: id }),

  getActiveConversation: () => {
    const state = get()
    return state.conversations.find((c) => c.id === state.activeConversationId) || null
  },

  addMessage: (conversationId, role, content, metadata) => {
    const message: Message = {
      id: generateId(),
      conversationId,
      role,
      content,
      timestamp: Date.now(),
      metadata,
    }
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId
          ? { ...c, messages: [...c.messages, message], updatedAt: Date.now() }
          : c
      ),
    }))
    return message
  },

  updateMessage: (conversationId, messageId, content) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              messages: c.messages.map((m) =>
                m.id === messageId ? { ...m, content } : m
              ),
            }
          : c
      ),
    })),

  deleteMessage: (conversationId, messageId) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              messages: c.messages.filter((m) => m.id !== messageId),
            }
          : c
      ),
    })),

  getMessages: (conversationId) => {
    const state = get()
    const conversation = state.conversations.find((c) => c.id === conversationId)
    return conversation?.messages || []
  },

  clearMessages: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId ? { ...c, messages: [] } : c
      ),
    })),
}))
