'use client'

import { AlertCircle, ChevronUp, ChevronDown, X, Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface ErrorDrawerProps {
  error: string | null
  onClear?: () => void
}

export function ErrorDrawer({ error, onClear }: ErrorDrawerProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [copied, setCopied] = useState(false)

  if (!error) return null

  const handleCopyError = () => {
    navigator.clipboard.writeText(error)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Extract possible line number like "App.tsx: 12:5"
  const lineMatch = error.match(/(?:App\.tsx|index\.tsx):?(\d+)?(?::(\d+))?/)
  const lineInfo = lineMatch ? lineMatch[0] : null

  return (
    <div className="border-t border-zinc-800 bg-zinc-950 text-zinc-100 font-mono text-xs select-text shrink-0">
      <div className="h-8 px-3 bg-red-950/40 border-b border-red-900/50 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-red-400 font-semibold">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>Diagnostics / Compilation Error</span>
          {lineInfo && (
            <span className="px-1.5 py-0.2 bg-red-900/60 text-red-200 text-[10px] rounded font-mono">
              {lineInfo}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={handleCopyError}
            className="flex items-center space-x-1 px-1.5 py-0.5 text-[11px] text-zinc-400 hover:text-zinc-200 rounded transition-colors"
            title="Copy error stack"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-zinc-400 hover:text-zinc-200 rounded transition-colors"
            title={isOpen ? 'Collapse drawer' : 'Expand drawer'}
          >
            {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>

          {onClear && (
            <button
              onClick={onClear}
              className="p-1 text-zinc-400 hover:text-zinc-200 rounded transition-colors"
              title="Dismiss error"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="p-3 max-h-40 overflow-y-auto bg-zinc-950/90 text-red-300 leading-relaxed whitespace-pre-wrap font-mono text-[11px] selection:bg-red-900/50">
          {error}
        </div>
      )}
    </div>
  )
}
