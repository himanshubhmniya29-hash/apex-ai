'use client'

import React, { useState } from 'react'
import Sidebar from './Sidebar'
import ChatInterface from './ChatInterface'
import RightPanel from './RightPanel'
import SettingsPanel from './SettingsPanel'

const MainLayout: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false)
  const [rightPanelView, setRightPanelView] = useState<'activity' | 'tools' | 'permissions' | 'memory'>('activity')

  return (
    <div className="flex h-screen bg-apex-darker">
      {/* Sidebar */}
      <Sidebar onSettingsClick={() => setShowSettings(true)} />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatInterface />
      </div>

      {/* Right Panel */}
      <RightPanel view={rightPanelView} onViewChange={setRightPanelView} />

      {/* Settings Modal */}
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </div>
  )
}

export default MainLayout
