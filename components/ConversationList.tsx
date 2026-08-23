'use client'

import React from 'react'
import { Conversation } from '@/lib/types'
import { MessageSquare, Trash2 } from 'lucide-react'
import { useConversationStore } from '@/lib/stores/conversationStore'

interface ConversationListProps {
  conversations: Conversation[]
  activeConversationId: string | null
  onDeleteConversation: (id: string) => void
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeConversationId,
  onDeleteConversation,
}) => {
  const { setActiveConversation } = useConversationStore()

  if (conversations.length === 0) {
    return (
      <div className="flex-1 px-4 py-8 text-center text-gray-500">
        <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No conversations yet</p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto px-2 py-2">
      <div className="space-y-1">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={`group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all ${
              activeConversationId === conv.id
                ? 'bg-apex-accent/20 border border-apex-accent text-white'
                : 'hover:bg-apex-border text-gray-400 hover:text-white'
            }}`}
            onClick={() => setActiveConversation(conv.id)}
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate text-sm">{conv.title}</p>
              {conv.description && (
                <p className="text-xs text-gray-500 truncate">{conv.description}</p>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDeleteConversation(conv.id)
              }}
              className="ml-2 p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-apex-border transition-all"
              title="Delete conversation"
            >
              <Trash2 className="w-4 h-4 text-red-400 hover:text-red-300" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ConversationList
