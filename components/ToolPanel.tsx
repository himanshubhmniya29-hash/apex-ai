'use client'

import React, { useState } from 'react'
import { Zap, Search, Grid, List } from 'lucide-react'
import { useToolRegistry } from '@/lib/stores/toolRegistry'
import { ToolCategory } from '@/lib/types'

const ToolPanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const { getAvailableTools, getToolsByCategory, recordToolUsage } = useToolRegistry()

  const categories: (ToolCategory | 'all')[] = [
    'all',
    'cybersecurity',
    'productivity',
    'automation',
    'analysis',
    'utility',
    'development',
  ]

  let tools = getAvailableTools()
  if (selectedCategory !== 'all') {
    tools = getToolsByCategory(selectedCategory as ToolCategory)
  }

  tools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleToolClick = (toolId: string) => {
    recordToolUsage(toolId)
  }

  return (
    <div className="bg-apex-dark rounded-lg border border-apex-border flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-4 border-b border-apex-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Zap className="w-5 h-5 text-apex-accent" />
            <span>Tool Registry</span>
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' ? 'bg-apex-accent text-apex-dark' : 'hover:bg-apex-border'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list' ? 'bg-apex-accent text-apex-dark' : 'hover:bg-apex-border'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-apex-border border border-apex-border/50 rounded pl-9 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-apex-accent"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-apex-accent text-apex-dark'
                  : 'bg-apex-border hover:bg-apex-border/80 text-gray-300'
              }`}
            >
              {cat === 'all' ? 'All Tools' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid/List */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {tools.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Zap className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No tools found</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-3">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool.id)}
                className="p-3 bg-apex-border/50 hover:bg-apex-border border border-apex-border/50 hover:border-apex-accent rounded-lg transition-all hover:shadow-lg hover:glow-cyan text-left group"
              >
                <div className="text-2xl mb-2">{tool.icon || '🔧'}
                <p className="font-medium text-sm text-white group-hover:text-apex-accent transition-colors">
                  {tool.name}
                </p>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{tool.description}</p>
                {tool.usageCount ? (
                  <p className="text-xs text-apex-accent mt-2">Used {tool.usageCount}x</p>
                ) : null}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool.id)}
                className="w-full p-3 bg-apex-border/50 hover:bg-apex-border border border-apex-border/50 hover:border-apex-accent rounded-lg transition-all text-left flex items-center space-x-3 group"
              >
                <span className="text-2xl">{tool.icon || '🔧'}</span>
                <div className="flex-1">
                  <p className="font-medium text-sm text-white group-hover:text-apex-accent transition-colors">
                    {tool.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{tool.description}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ToolPanel
