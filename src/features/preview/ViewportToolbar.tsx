'use client'

import { Monitor, Tablet, Smartphone } from 'lucide-react'

export type ViewportSize = 'desktop' | 'tablet' | 'mobile'

interface ViewportToolbarProps {
  viewport: ViewportSize
  onChange: (viewport: ViewportSize) => void
}

export function ViewportToolbar({ viewport, onChange }: ViewportToolbarProps) {
  return (
    <div className="flex items-center space-x-0.5 border border-zinc-800 rounded p-0.5 bg-zinc-950">
      <button
        onClick={() => onChange('desktop')}
        className={`p-1 rounded transition-colors ${
          viewport === 'desktop' ? 'bg-zinc-800 text-white shadow-xs' : 'text-zinc-400 hover:text-zinc-200'
        }`}
        title="Desktop View (100%)"
      >
        <Monitor className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => onChange('tablet')}
        className={`p-1 rounded transition-colors ${
          viewport === 'tablet' ? 'bg-zinc-800 text-white shadow-xs' : 'text-zinc-400 hover:text-zinc-200'
        }`}
        title="Tablet View (768px)"
      >
        <Tablet className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => onChange('mobile')}
        className={`p-1 rounded transition-colors ${
          viewport === 'mobile' ? 'bg-zinc-800 text-white shadow-xs' : 'text-zinc-400 hover:text-zinc-200'
        }`}
        title="Mobile View (375px)"
      >
        <Smartphone className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
