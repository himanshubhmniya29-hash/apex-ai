'use client'

import React, { useState } from 'react'
import { Brain, Trash2, Search, Zap } from 'lucide-react'
import { useMemoryStore } from '@/lib/stores/memoryStore'

const MemoryPanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'short_term' | 'long_term' | 'episodic'>('short_term')

  const { shortTerm, longTerm, episodic, deleteMemory, searchMemory } = useMemoryStore()

  const tabs = [
    { id: 'short_term', label: 'Short Term', count: shortTerm.length },
    { id: 'long_term', label: 'Long Term', count: longTerm.length },
    { id: 'episodic', label: 'Episodic', count: episodic.length },
  ] as const

  let items = activeTab === 'short_term' ? shortTerm : activeTab === 'long_term' ? longTerm : episodic

  if (searchQuery) {
    items = searchMemory(searchQuery)
  }

  return (
    <div className="bg-apex-dark rounded-lg border border-apex-border flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-4 border-b border-apex-border">
        <div className="flex items-center space-x-2 mb-4">
          <Brain className="w-5 h-5 text-apex-accent" />
          <h2 className="text-lg font-bold text-white">Memory System</h2>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search memories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-apex-border border border-apex-border/50 rounded pl-9 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-apex-accent"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-apex-accent text-apex-dark'
                  : 'bg-apex-border hover:bg-apex-border/80 text-gray-300'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Memory Items */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Brain className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No memories found</p>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="p-3 bg-apex-border/50 rounded-lg border border-apex-border/50 group">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-white truncate">{item.key}</p>
                    <p className="text-xs text-gray-400 mt-1 truncate">
                      {typeof item.value === 'string' ? item.value : JSON.stringify(item.value)}
                    </p>
                    <div className="flex items-center space-x-2 mt-2 text-xs">
                      <div className="flex items-center space-x-1">
                        <Zap className="w-3 h-3 text-apex-accent" />
                        <span className="text-gray-400">{item.importance}/10</span>
                      </div>
                      <span className="text-gray-500">
                        {new Date(item.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteMemory(item.id)}
                    className="ml-3 p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-apex-border transition-all"
                    title="Delete memory"
                  >
                    <Trash2 className="w-4 h-4 text-apex-danger hover:text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MemoryPanel
