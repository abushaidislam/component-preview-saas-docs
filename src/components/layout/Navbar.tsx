'use client'

import Link from 'next/link'
import {
  Code2,
  LayoutDashboard,
  Share2,
  Save,
  Download,
  Search,
  History,
  Settings,
  Sparkles,
} from 'lucide-react'

interface NavbarProps {
  title?: string
  isSaved?: boolean
  versionNumber?: number
  onSave?: () => void
  onShare?: () => void
  onExport?: () => void
  onOpenVersions?: () => void
  onOpenCommandPalette?: () => void
  onOpenTemplates?: () => void
}

export function Navbar({
  title = 'Interactive React Card',
  isSaved = true,
  versionNumber = 1,
  onSave,
  onShare,
  onExport,
  onOpenVersions,
  onOpenCommandPalette,
  onOpenTemplates,
}: NavbarProps) {
  return (
    <header className="h-12 border-b border-zinc-800 bg-zinc-950 px-4 flex items-center justify-between select-none shrink-0 z-20">
      {/* Brand & Project Info */}
      <div className="flex items-center space-x-3">
        <Link
          href="/"
          className="flex items-center space-x-2 text-zinc-100 hover:text-white transition-colors"
        >
          <div className="w-6 h-6 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200">
            <Code2 className="w-3.5 h-3.5 text-zinc-300" />
          </div>
          <span className="font-semibold text-xs tracking-tight">ComponentPreview</span>
        </Link>

        <span className="text-zinc-700">/</span>

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

      {/* Center: Command Palette Button */}
      {onOpenCommandPalette && (
        <button
          onClick={onOpenCommandPalette}
          className="hidden md:flex items-center space-x-2 px-2.5 py-1 text-xs text-zinc-400 bg-zinc-900 hover:bg-zinc-850 hover:text-zinc-200 border border-zinc-800 rounded-md transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Quick actions &amp; templates...</span>
          <kbd className="text-[10px] font-mono px-1 bg-zinc-950 border border-zinc-800 rounded text-zinc-500">
            ⌘K
          </kbd>
        </button>
      )}

      {/* Actions */}
      <div className="flex items-center space-x-1.5">
        {onOpenTemplates && (
          <button
            onClick={onOpenTemplates}
            className="flex items-center space-x-1 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded transition-colors"
            title="Browse starter components"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Templates</span>
          </button>
        )}

        {onOpenVersions && (
          <button
            onClick={onOpenVersions}
            className="flex items-center space-x-1 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded transition-colors"
            title="View version snapshots"
          >
            <History className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">History</span>
          </button>
        )}

        {onExport && (
          <button
            onClick={onExport}
            className="flex items-center space-x-1 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded transition-colors"
            title="Download .tsx file"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>
        )}

        {onShare && (
          <button
            onClick={onShare}
            className="flex items-center space-x-1 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded transition-colors"
            title="Copy share link"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>
        )}

        {onSave && (
          <button
            onClick={onSave}
            className="flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold text-zinc-950 bg-zinc-100 hover:bg-white rounded transition-colors"
            title="Save version (⌘S)"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save</span>
          </button>
        )}

        <div className="h-4 w-px bg-zinc-800 mx-1" />

        <Link
          href="/dashboard"
          className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 rounded transition-colors"
          title="Dashboard"
        >
          <LayoutDashboard className="w-4 h-4" />
        </Link>

        <Link
          href="/settings"
          className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 rounded transition-colors"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </Link>
      </div>
    </header>
  )
}
