'use client'

import { AlertCircle, ChevronUp, ChevronDown, X } from 'lucide-react'
import { useState } from 'react'

interface ErrorDrawerProps {
  error: string | null
  onClear?: () => void
}

export function ErrorDrawer({ error, onClear }: ErrorDrawerProps) {
  const [isOpen, setIsOpen] = useState(true)

  if (!error) return null

  return (
    <div className="border-t border-zinc-800 bg-zinc-950 text-zinc-100 font-mono text-xs select-text">
      <div className="h-8 px-3 bg-red-950/40 border-b border-red-900/50 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-red-400 font-semibold">
          <AlertCircle className="w-4 h-4" />
          <span>Compilation / Runtime Error</span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-zinc-400 hover:text-zinc-200 rounded transition-colors"
          >
            {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
          {onClear && (
            <button
              onClick={onClear}
              className="p-1 text-zinc-400 hover:text-zinc-200 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="p-3 max-h-48 overflow-y-auto bg-zinc-950 text-red-300 leading-relaxed whitespace-pre-wrap font-mono">
          {error}
        </div>
      )}
    </div>
  )
}
