'use client'

import React, { useState } from 'react'
import { Plus, MessageSquare, Archive, Settings, Trash2, Search, Zap } from 'lucide-react'
import { useConversationStore } from '@/lib/stores/conversationStore'
import ConversationList from './ConversationList'

interface SidebarProps {
  onSettingsClick?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ onSettingsClick }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showArchived, setShowArchived] = useState(false)
  const { conversations, createConversation, activeConversationId, deleteConversation } =
    useConversationStore()

  const handleNewConversation = () => {
    const conversation = createConversation('New Conversation')
  }

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch = conv.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesArchive = showArchived ? conv.isArchived : !conv.isArchived
    return matchesSearch && matchesArchive
  })

  return (
    <div className="w-64 bg-apex-dark border-r border-apex-border flex flex-col h-screen">
      {/* Header */}
      <div className="px-4 py-4 border-b border-apex-border">
        <div className="flex items-center space-x-2 mb-4">
          <Zap className="w-6 h-6 text-apex-accent" />
          <span className="text-lg font-bold text-white">APEX</span>
        </div>
        <button
          onClick={handleNewConversation}
          className="w-full flex items-center justify-center space-x-2 bg-apex-accent hover:bg-apex-accentDim text-apex-dark font-medium py-2 px-4 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b border-apex-border">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-apex-border border border-apex-border/50 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-apex-accent transition-colors"
          />
        </div>
      </div>

      {/* Conversation List */}
      <ConversationList
        conversations={filteredConversations}
        activeConversationId={activeConversationId}
        onDeleteConversation={deleteConversation}
      />

      {/* Footer */}
      <div className="mt-auto px-4 py-4 border-t border-apex-border space-y-2">
        <button
          onClick={() => setShowArchived(!showArchived)}
          className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-apex-border text-gray-400 hover:text-white transition-colors text-sm"
        >
          <Archive className="w-4 h-4" />
          <span>{showArchived ? 'Show Active' : 'Archived'}</span>
        </button>
        <button
          onClick={onSettingsClick}
          className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-apex-border text-gray-400 hover:text-white transition-colors text-sm"
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
