'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, Mic, Paperclip, Plus, MoreVertical } from 'lucide-react'
import { useConversationStore } from '@/lib/stores/conversationStore'
import { useActivityStore } from '@/lib/stores/activityStore'
import MessageBubble from './MessageBubble'
import InputArea from './InputArea'

interface ChatInterfaceProps {
  conversationId?: string
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ conversationId }) => {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const {
    conversations,
    activeConversationId,
    addMessage,
    getActiveConversation,
    setActiveConversation,
  } = useConversationStore()

  const { startActivity, updateActivityStatus, completeActivity } = useActivityStore()

  const currentConversationId = conversationId || activeConversationId
  const conversation = conversations.find((c) => c.id === currentConversationId)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation?.messages])

  useEffect(() => {
    if (conversationId && conversationId !== activeConversationId) {
      setActiveConversation(conversationId)
    }
  }, [conversationId, activeConversationId, setActiveConversation])

  const handleSendMessage = async () => {
    if (!input.trim() || !currentConversationId) return

    // Add user message
    addMessage(currentConversationId, 'user', input)
    setInput('')
    setIsLoading(true)

    // Simulate AI processing
    const activity = startActivity('query', 'Processing your message', 'Analyzing request and generating response')
    updateActivityStatus(activity.id, 'planning')

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))
      updateActivityStatus(activity.id, 'executing')

      // Add simulated response
      const response = `I understood your request: "${input}". This is a placeholder response. In Phase 2, I'll integrate with real AI providers like OpenAI, Gemini, or Anthropic.`
      addMessage(currentConversationId, 'assistant', response)

      completeActivity(activity.id, { success: true })
    } catch (error) {
      console.error('Error processing message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-apex-dark to-apex-darker">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-apex-accent mb-4">Welcome to APEX JARVIS</h2>
          <p className="text-gray-400 mb-4">Select or create a conversation to begin</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-apex-dark via-apex-darker to-apex-dark">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-apex-border flex items-center justify-between bg-apex-dark/50 backdrop-blur">
        <div>
          <h2 className="text-lg font-bold text-white">{conversation.title}</h2>
          {conversation.description && (
            <p className="text-xs text-gray-400 mt-1">{conversation.description}</p>
          )}
        </div>
        <button className="p-2 hover:bg-apex-border rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin scrollbar-thumb-apex-accent scrollbar-track-transparent">
        {conversation.messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p className="text-sm">No messages yet. Start the conversation!</p>
            </div>
          </div>
        ) : (
          conversation.messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-apex-border rounded-lg px-4 py-3 max-w-xs">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-apex-accent rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-apex-accent rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-apex-accent rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <InputArea
        input={input}
        setInput={setInput}
        onSend={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  )
}

export default ChatInterface
