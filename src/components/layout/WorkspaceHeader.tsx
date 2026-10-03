'use client'

import Link from 'next/link'
import { ViewportToolbar } from '@/features/preview/ViewportToolbar'
import {
  Code2,
  Share2,
  Save,
  Download,
  Search,
  History,
  Sparkles,
  RefreshCw,
  TerminalSquare
} from 'lucide-react'

interface WorkspaceHeaderProps {
  title?: string
  isSaved?: boolean
  versionNumber?: number
  onSave?: () => void
  onShare?: () => void
  onExport?: () => void
  onOpenVersions?: () => void
  onOpenCommandPalette?: () => void
  onOpenTemplates?: () => void
  // IDE specific controls
  onRefresh?: () => void
  viewport?: 'desktop' | 'tablet' | 'mobile'
  onChangeViewport?: (viewport: 'desktop' | 'tablet' | 'mobile') => void
  isDrawerOpen?: boolean
  onToggleDrawer?: () => void
}

export function WorkspaceHeader({
  title = 'Interactive React Card',
  isSaved = true,
  versionNumber = 1,
  onSave,
  onShare,
  onExport,
  onOpenVersions,
  onOpenCommandPalette,
  onOpenTemplates,
  onRefresh,
  viewport = 'desktop',
  onChangeViewport,
  isDrawerOpen = false,
  onToggleDrawer,
}: WorkspaceHeaderProps) {
  return (
    <header className="h-12 border-b border-zinc-800 bg-zinc-950 px-4 flex items-center justify-between select-none shrink-0 z-20">
      {/* Project Info */}
      <div className="flex items-center space-x-3 flex-1">
        <Link
          href="/"
          className="flex items-center space-x-2 text-zinc-100 hover:text-white transition-colors"
          title="Home"
        >
          <div className="w-6 h-6 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200">
            <Code2 className="w-3.5 h-3.5 text-zinc-300" />
          </div>
        </Link>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-zinc-200">{title}</span>
          <span
            className={`w-2 h-2 rounded-full ${
              isSaved ? 'bg-zinc-600' : 'bg-amber-400'
            }`}
            title={isSaved ? 'All changes saved' : 'Unsaved changes'}
          />
          {versionNumber > 0 && (
            <span className="px-1.5 py-0.2 bg-zinc-900 border border-zinc-800 rounded font-mono text-[10px] text-zinc-400">
              v{versionNumber}
            </span>
          )}
        </div>
      </div>

      {/* Center: Viewport & Run Controls */}
      <div className="flex items-center space-x-2 flex-1 justify-center">
        {onChangeViewport && (
          <ViewportToolbar viewport={viewport} onChange={onChangeViewport} />
        )}

        {onRefresh && (
          <button
            onClick={onRefresh}
            className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 rounded transition-colors"
            title="Reload Preview"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end space-x-1.5 flex-1">
        {onOpenCommandPalette && (
          <button
            onClick={onOpenCommandPalette}
            className="hidden lg:flex items-center space-x-2 px-2.5 py-1 text-xs text-zinc-400 bg-zinc-900 hover:bg-zinc-850 hover:text-zinc-200 border border-zinc-800 rounded-md transition-colors"
            title="Command Palette"
          >
            <Search className="w-3.5 h-3.5" />
            <kbd className="text-[10px] font-mono px-1 bg-zinc-950 border border-zinc-800 rounded text-zinc-500">
              ⌘K
            </kbd>
          </button>
        )}

        {onOpenTemplates && (
          <button
            onClick={onOpenTemplates}
            className="flex items-center space-x-1 p-1.5 md:px-2.5 md:py-1 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded transition-colors"
            title="Templates"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Templates</span>
          </button>
        )}

        {onOpenVersions && (
          <button
            onClick={onOpenVersions}
            className="flex items-center space-x-1 p-1.5 md:px-2.5 md:py-1 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded transition-colors"
            title="History"
          >
            <History className="w-3.5 h-3.5" />
          </button>
        )}

        {onExport && (
          <button
            onClick={onExport}
            className="flex items-center space-x-1 p-1.5 md:px-2.5 md:py-1 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded transition-colors"
            title="Export"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        )}

        {onShare && (
          <button
            onClick={onShare}
            className="flex items-center space-x-1 p-1.5 md:px-2.5 md:py-1 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded transition-colors"
            title="Share"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        )}

        {onSave && (
          <button
            onClick={onSave}
            className="flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold text-zinc-950 bg-zinc-100 hover:bg-white rounded transition-colors"
            title="Save (⌘S)"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Save</span>
          </button>
        )}

        {onToggleDrawer && (
          <>
            <div className="h-4 w-px bg-zinc-800 mx-1" />
            <button
              onClick={onToggleDrawer}
              className={`p-1.5 rounded transition-colors ${
                isDrawerOpen ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
              title="Toggle Console/Errors"
            >
              <TerminalSquare className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </header>
  )
}
