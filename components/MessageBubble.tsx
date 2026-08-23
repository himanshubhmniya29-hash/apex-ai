'use client'

import React from 'react'
import { Message } from '@/lib/types'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface MessageBubbleProps {
  message: Message
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === 'user'

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-slideInUp`}>
      <div
        className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg ${
          isUser
            ? 'bg-apex-accent/20 border border-apex-accent text-white'
            : 'bg-apex-border border border-apex-border/50 text-gray-100'
        }`}
      >
        <p className="text-sm leading-relaxed break-words">{message.content}</p>
        <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
          <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
          {!isUser && (
            <button
              onClick={handleCopy}
              className="ml-2 p-1 hover:text-apex-accent transition-colors"
              title="Copy message"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default MessageBubble
