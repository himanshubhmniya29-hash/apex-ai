import { create } from 'zustand'
import { MemoryItem, MemoryContext } from '@/lib/types'

interface MemoryStore {
  shortTerm: MemoryItem[]
  longTerm: MemoryItem[]
  episodic: MemoryItem[]
  
  // Memory operations
  addMemory: (key: string, value: unknown, type: 'short_term' | 'long_term' | 'episodic', importance?: number) => MemoryItem
  updateMemory: (id: string, value: unknown, importance?: number) => void
  deleteMemory: (id: string) => void
  getMemory: (id: string) => MemoryItem | null
  searchMemory: (query: string) => MemoryItem[]
  getMemoryContext: () => MemoryContext
  clearMemory: (type: 'short_term' | 'long_term' | 'episodic') => void
}

const generateId = () => `mem-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

export const useMemoryStore = create<MemoryStore>((set, get) => ({
  shortTerm: [],
  longTerm: [],
  episodic: [],

  addMemory: (key, value, type, importance = 5) => {
    const item: MemoryItem = {
      id: generateId(),
      key,
      value,
      type,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      importance,
    }
    
    set((state) => ({
      [type]: [...state[type], item],
    }))
    
    return item
  },

  updateMemory: (id, value, importance) =>
    set((state) => {
      const updateItem = (items: MemoryItem[]) =>
        items.map((item) =>
          item.id === id
            ? {
                ...item,
                value,
                importance: importance ?? item.importance,
                updatedAt: Date.now(),
              }
            : item
        )

      return {
        shortTerm: updateItem(state.shortTerm),
        longTerm: updateItem(state.longTerm),
        episodic: updateItem(state.episodic),
      }
    }),

  deleteMemory: (id) =>
    set((state) => ({
      shortTerm: state.shortTerm.filter((m) => m.id !== id),
      longTerm: state.longTerm.filter((m) => m.id !== id),
      episodic: state.episodic.filter((m) => m.id !== id),
    })),

  getMemory: (id) => {
    const state = get()
    return (
      state.shortTerm.find((m) => m.id === id) ||
      state.longTerm.find((m) => m.id === id) ||
      state.episodic.find((m) => m.id === id) ||
      null
    )
  },

  searchMemory: (query) => {
    const state = get()
    const allMemory = [...state.shortTerm, ...state.longTerm, ...state.episodic]
    const lowerQuery = query.toLowerCase()
    return allMemory.filter(
      (m) =>
        m.key.toLowerCase().includes(lowerQuery) ||
        (typeof m.value === 'string' && m.value.toLowerCase().includes(lowerQuery))
    )
  },

  getMemoryContext: () => {
    const state = get()
    return {
      shortTerm: state.shortTerm,
      longTerm: state.longTerm,
      episodic: state.episodic,
    }
  },

  clearMemory: (type) =>
    set((state) => ({
      [type]: [],
    })),
}))
