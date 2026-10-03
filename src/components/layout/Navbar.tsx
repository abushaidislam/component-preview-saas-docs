'use client'

import Link from 'next/link'
import { Code2, LayoutDashboard, Share2, Save, Download, Play, RefreshCw, Layers } from 'lucide-react'

interface NavbarProps {
  title?: string
  isSaved?: boolean
  onSave?: () => void
  onShare?: () => void
  onExport?: () => void
  onReset?: () => void
}

export function Navbar({ title = 'Untitled Component', isSaved = true, onSave, onShare, onExport, onReset }: NavbarProps) {
  return (
    <header className="h-12 border-b border-zinc-800 bg-zinc-950 px-4 flex items-center justify-between select-none">
      <div className="flex items-center space-x-4">
        <Link href="/" className="flex items-center space-x-2 text-zinc-100 hover:text-white transition-colors">
          <Code2 className="w-5 h-5 text-zinc-400" />
          <span className="font-semibold text-sm tracking-tight">ComponentPreview</span>
        </Link>
        <span className="text-zinc-700">/</span>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-zinc-300">{title}</span>
          <span className={`w-2 h-2 rounded-full ${isSaved ? 'bg-zinc-600' : 'bg-amber-500'}`} title={isSaved ? 'Saved' : 'Unsaved changes'} />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {onReset && (
          <button
            onClick={onReset}
            className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded transition-colors"
            title="Reset code template"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}
        {onExport && (
          <button
            onClick={onExport}
            className="flex items-center space-x-1 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        )}
        {onShare && (
          <button
            onClick={onShare}
            className="flex items-center space-x-1 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        )}
        {onSave && (
          <button
            onClick={onSave}
            className="flex items-center space-x-1 px-2.5 py-1 text-xs font-medium text-zinc-950 bg-zinc-100 hover:bg-white rounded transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save</span>
          </button>
        )}
        <div className="h-4 w-px bg-zinc-800 mx-1" />
        <Link
          href="/dashboard"
          className="flex items-center space-x-1 px-2.5 py-1 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </Link>
      </div>
    </header>
  )
}
