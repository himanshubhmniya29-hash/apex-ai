'use client'

import React, { useState } from 'react'
import { Send, Mic, Paperclip, Plus } from 'lucide-react'

interface InputAreaProps {
  input: string
  setInput: (value: string) => void
  onSend: () => void
  isLoading?: boolean
}

const InputArea: React.FC<InputAreaProps> = ({ input, setInput, onSend, isLoading }) => {
  const [isListening, setIsListening] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault()
      onSend()
    }
  }

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    // Voice input will be implemented in Phase 2
  }

  return (
    <div className="px-6 py-4 border-t border-apex-border bg-apex-dark/50 backdrop-blur">
      {/* Attachments Preview (placeholder) */}
      {false && (
        <div className="mb-3 flex space-x-2 text-xs">
          <span className="text-gray-400">Attachments:</span>
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-end space-x-3">
        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            className="p-2 rounded-lg hover:bg-apex-border transition-colors text-gray-400 hover:text-apex-accent"
            title="Add attachment"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <button
            className={`p-2 rounded-lg transition-colors ${
              isListening
                ? 'bg-apex-accent/20 border border-apex-accent text-apex-accent'
                : 'hover:bg-apex-border text-gray-400 hover:text-apex-accent'
            }`}
            onClick={handleVoiceInput}
            title="Voice input"
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>

        {/* Text Input */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message... (Shift+Enter for new line)"
          className="flex-1 bg-apex-border border border-apex-border/50 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-apex-accent transition-colors resize-none max-h-32"
          rows={1}
          disabled={isLoading}
        />

        {/* Send Button */}
        <button
          onClick={onSend}
          disabled={isLoading || !input.trim()}
          className={`p-2 rounded-lg transition-colors ${
            isLoading || !input.trim()
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-apex-accent hover:bg-apex-accentDim text-apex-dark'
          }`}
          title="Send message (Enter)"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {/* Helper Text */}
      <p className="text-xs text-gray-500 mt-2">Shift+Enter to add a new line</p>
    </div>
  )
}

export default InputArea
