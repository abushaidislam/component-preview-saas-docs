'use client'

import { AlertCircle, ChevronUp, ChevronDown, X, Copy, Check, Terminal, AlertTriangle } from 'lucide-react'
import { useState } from 'react'

export type ErrorDrawerTab = 'errors' | 'console' | 'warnings'

interface ErrorDrawerProps {
  error: string | null

  logs?: Array<{ id: string; type: string; message: string; timestamp: string }>
  warnings?: Array<string>
  onClear?: () => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function ErrorDrawer({ error, logs = [], warnings = [], onClear, isOpen, setIsOpen }: ErrorDrawerProps) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<ErrorDrawerTab>('errors')

  const errorMsg = error

  if (!error && logs.length === 0 && warnings.length === 0 && !isOpen) return null

  const handleCopy = () => {
    let textToCopy = ''
    if (activeTab === 'errors' && errorMsg) {
      textToCopy = errorMsg
    } else if (activeTab === 'console') {
      textToCopy = logs.map(l => `[${l.timestamp}] ${l.type.toUpperCase()}: ${l.message}`).join('\n')
    } else if (activeTab === 'warnings') {
      textToCopy = warnings.join('\n')
    }

    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Extract possible line number like "App.tsx: 12:5"
  const lineMatch = errorMsg?.match(/(?:App\.tsx|index\.tsx):?(\d+)?(?::(\d+))?/)
  const lineInfo = lineMatch ? lineMatch[0] : null

  return (
    <div
      className={`border-t border-zinc-800 bg-zinc-950 text-zinc-100 font-mono text-xs select-text shrink-0 flex flex-col transition-all duration-300 ease-in-out ${
        isOpen ? 'h-48' : 'h-8'
      }`}
    >
      <div className="h-8 px-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between shadow-sm cursor-pointer shrink-0" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center space-x-1 h-full">
          <button
            onClick={(e) => { e.stopPropagation(); setActiveTab('errors'); setIsOpen(true) }}
            className={`h-full px-3 flex items-center space-x-1.5 border-b-2 transition-colors ${
              activeTab === 'errors' ? 'border-red-500 bg-zinc-800/50' : 'border-transparent hover:bg-zinc-800/30'
            }`}
          >
            <AlertCircle className={`w-3.5 h-3.5 ${error ? 'text-red-400' : 'text-zinc-500'}`} />
            <span className={error ? 'text-red-400 font-medium' : 'text-zinc-400'}>Errors</span>
            {error && (
              <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 text-[9px] leading-none">1</span>
            )}
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); setActiveTab('console'); setIsOpen(true) }}
            className={`h-full px-3 flex items-center space-x-1.5 border-b-2 transition-colors ${
              activeTab === 'console' ? 'border-blue-500 bg-zinc-800/50' : 'border-transparent hover:bg-zinc-800/30'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-zinc-400">Console</span>
            {logs.length > 0 && (
              <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[9px] leading-none">{logs.length}</span>
            )}
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); setActiveTab('warnings'); setIsOpen(true) }}
            className={`h-full px-3 flex items-center space-x-1.5 border-b-2 transition-colors ${
              activeTab === 'warnings' ? 'border-amber-500 bg-zinc-800/50' : 'border-transparent hover:bg-zinc-800/30'
            }`}
          >
            <AlertTriangle className={`w-3.5 h-3.5 ${warnings.length > 0 ? 'text-amber-400' : 'text-zinc-500'}`} />
            <span className={warnings.length > 0 ? 'text-amber-400' : 'text-zinc-400'}>Warnings</span>
            {warnings.length > 0 && (
              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[9px] leading-none">{warnings.length}</span>
            )}
          </button>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={(e) => { e.stopPropagation(); handleCopy() }}
            className="flex items-center space-x-1 px-1.5 py-0.5 text-[11px] text-zinc-400 hover:text-zinc-200 rounded transition-colors"
            title="Copy contents"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen) }}
            className="p-1 text-zinc-400 hover:text-zinc-200 rounded transition-colors"
            title={isOpen ? 'Collapse drawer' : 'Expand drawer'}
          >
            {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>

          {onClear && (
            <button
              onClick={(e) => { e.stopPropagation(); onClear() }}
              className="p-1 text-zinc-400 hover:text-zinc-200 rounded transition-colors"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto bg-zinc-950/90 p-3 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={(e) => e.stopPropagation()}>
        {activeTab === 'errors' && (
          <div className="text-red-300 leading-relaxed whitespace-pre-wrap font-mono text-[11px] selection:bg-red-900/50">
            {errorMsg ? (
              <>
                {lineInfo && (
                  <div className="mb-2 px-1.5 py-0.5 inline-block bg-red-900/60 text-red-200 text-[10px] rounded font-mono">
                    {lineInfo}
                  </div>
                )}
                <div>{errorMsg}</div>
              </>
            ) : (
              <div className="text-zinc-500 italic">No runtime errors.</div>
            )}
          </div>
        )}

        {activeTab === 'console' && (
          <div className="font-mono text-xs space-y-1.5">
            {logs.length === 0 ? (
              <div className="text-zinc-600 italic">No console logs.</div>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className={`flex items-start space-x-2 py-1 px-2 rounded font-mono text-[11px] ${
                    log.type === 'error'
                      ? 'bg-rose-950/40 text-rose-300 border-l-2 border-rose-500'
                      : log.type === 'warn'
                      ? 'bg-amber-950/40 text-amber-300 border-l-2 border-amber-500'
                      : 'bg-zinc-900/60 text-zinc-300 border-l-2 border-zinc-700'
                  }`}
                >
                  <span className="text-zinc-500 select-none text-[10px]">{log.timestamp}</span>
                  <span className="font-semibold uppercase text-[9px] px-1 rounded bg-zinc-800 text-zinc-400 select-none">
                    {log.type}
                  </span>
                  <span className="flex-1 whitespace-pre-wrap break-all">{log.message}</span>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'warnings' && (
          <div className="font-mono text-[11px] text-amber-300 space-y-1.5">
            {warnings.length === 0 ? (
              <div className="text-zinc-600 italic">No bundler warnings.</div>
            ) : (
              warnings.map((warn, i) => (
                <div key={i} className="bg-amber-950/40 border-l-2 border-amber-500 py-1 px-2 rounded whitespace-pre-wrap">
                  {warn}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
