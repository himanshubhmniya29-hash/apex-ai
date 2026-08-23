'use client'

import React from 'react'
import { Activity, Zap, Shield, Brain, ChevronLeft } from 'lucide-react'
import ActivityPanel from './ActivityPanel'
import ToolPanel from './ToolPanel'
import PermissionsCenter from './PermissionsCenter'
import MemoryPanel from './MemoryPanel'

type PanelView = 'activity' | 'tools' | 'permissions' | 'memory'

interface RightPanelProps {
  view: PanelView
  onViewChange: (view: PanelView) => void
}

const RightPanel: React.FC<RightPanelProps> = ({ view, onViewChange }) => {
  const tabs = [
    { id: 'activity' as const, label: 'Activity', icon: Activity },
    { id: 'tools' as const, label: 'Tools', icon: Zap },
    { id: 'permissions' as const, label: 'Permissions', icon: Shield },
    { id: 'memory' as const, label: 'Memory', icon: Brain },
  ]

  return (
    <div className="w-96 bg-apex-dark border-l border-apex-border flex flex-col h-screen overflow-hidden">
      {/* Tab Navigation */}
      <div className="px-4 py-3 border-b border-apex-border flex items-center space-x-1 bg-apex-dark/50 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => onViewChange(tab.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                view === tab.id
                  ? 'bg-apex-accent/20 border border-apex-accent text-apex-accent'
                  : 'text-gray-400 hover:text-white hover:bg-apex-border'
              }`}
              title={tab.label}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-hidden px-3 py-4">
        {view === 'activity' && <ActivityPanel maxHeight="max-h-full" />}
        {view === 'tools' && <ToolPanel />}
        {view === 'permissions' && <PermissionsCenter />}
        {view === 'memory' && <MemoryPanel />}
      </div>
    </div>
  )
}

export default RightPanel
