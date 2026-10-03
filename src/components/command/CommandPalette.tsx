'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Search,
  Save,
  Download,
  Share2,
  AlignLeft,
  LayoutDashboard,
  Settings,
  History,
  Sparkles,
  RefreshCw,
  Plus,
} from 'lucide-react'
import { TEMPLATES } from '@/lib/templates'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onSave?: () => void
  onShare?: () => void
  onExport?: () => void
  onFormat?: () => void
  onReset?: () => void
  onSelectTemplate?: (code: string, name: string) => void
  onOpenVersions?: () => void
}

export function CommandPalette({
  isOpen,
  onClose,
  onSave,
  onShare,
  onExport,
  onFormat,
  onReset,
  onSelectTemplate,
  onOpenVersions,
}: CommandPaletteProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
        else {
          setQuery('')
          // toggle handled by parent
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const actions = [
    {
      id: 'save',
      label: 'Save Project Snapshot',
      icon: Save,
      shortcut: '⌘S',
      run: () => {
        onSave?.()
        onClose()
      },
    },
    {
      id: 'format',
      label: 'Format TypeScript JSX',
      icon: AlignLeft,
      shortcut: 'Alt+Shift+F',
      run: () => {
        onFormat?.()
        onClose()
      },
    },
    {
      id: 'versions',
      label: 'View Version History',
      icon: History,
      run: () => {
        onOpenVersions?.()
        onClose()
      },
    },
    {
      id: 'share',
      label: 'Generate Share URL',
      icon: Share2,
      run: () => {
        onShare?.()
        onClose()
      },
    },
    {
      id: 'export',
      label: 'Download Component.tsx',
      icon: Download,
      run: () => {
        onExport?.()
        onClose()
      },
    },
    {
      id: 'reset',
      label: 'Reset to Starter Code',
      icon: RefreshCw,
      run: () => {
        onReset?.()
        onClose()
      },
    },
    {
      id: 'new',
      label: 'Open New Blank Workspace',
      icon: Plus,
      run: () => {
        router.push('/workspace/new')
        onClose()
      },
    },
    {
      id: 'dashboard',
      label: 'Go to Dashboard',
      icon: LayoutDashboard,
      run: () => {
        router.push('/dashboard')
        onClose()
      },
    },
    {
      id: 'settings',
      label: 'Go to Settings',
      icon: Settings,
      run: () => {
        router.push('/settings')
        onClose()
      },
    },
  ]

  const filteredActions = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  )

  const filteredTemplates = TEMPLATES.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.category.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/75 backdrop-blur-xs p-4">
      <div className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Input */}
        <div className="h-12 px-4 border-b border-zinc-800 flex items-center space-x-3 bg-zinc-950">
          <Search className="w-4 h-4 text-zinc-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search starter templates..."
            className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none"
          />
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 rounded">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-4">
          {filteredActions.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                Actions
              </div>
              <div className="space-y-0.5">
                {filteredActions.map((act) => {
                  const Icon = act.icon
                  return (
                    <button
                      key={act.id}
                      onClick={act.run}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs text-zinc-200 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors text-left"
                    >
                      <div className="flex items-center space-x-2.5">
                        <Icon className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{act.label}</span>
                      </div>
                      {act.shortcut && (
                        <span className="font-mono text-[10px] text-zinc-500">
                          {act.shortcut}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {onSelectTemplate && filteredTemplates.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                Component Templates
              </div>
              <div className="space-y-0.5">
                {filteredTemplates.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => {
                      onSelectTemplate(tmpl.code, tmpl.name)
                      onClose()
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs text-zinc-200 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors text-left"
                  >
                    <div className="flex items-center space-x-2.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <div>
                        <div className="font-medium text-white">{tmpl.name}</div>
                        <div className="text-[11px] text-zinc-500">{tmpl.description}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 bg-zinc-950 border border-zinc-800 rounded text-zinc-400">
                      {tmpl.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredActions.length === 0 && filteredTemplates.length === 0 && (
            <div className="py-8 text-center text-xs text-zinc-500">
              No matching commands or templates found for &quot;{query}&quot;
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
