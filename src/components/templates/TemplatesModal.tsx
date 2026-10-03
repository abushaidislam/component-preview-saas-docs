'use client'

import { X, Sparkles, Check, ArrowRight } from 'lucide-react'
import { TEMPLATES, TemplateItem } from '@/lib/templates'

interface TemplatesModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (template: TemplateItem) => void
  currentTemplateId?: string
}

export function TemplatesModal({
  isOpen,
  onClose,
  onSelect,
  currentTemplateId,
}: TemplatesModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4">
      <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="h-12 px-5 border-b border-zinc-800 flex items-center justify-between select-none bg-zinc-950">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-semibold text-white tracking-tight">
              Component Starter Templates
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Templates Grid */}
        <div className="p-5 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {TEMPLATES.map((tmpl) => {
            const isSelected = currentTemplateId === tmpl.id
            return (
              <div
                key={tmpl.id}
                className={`p-4 rounded-lg border text-left flex flex-col justify-between transition-all ${
                  isSelected
                    ? 'bg-zinc-850 border-amber-500/60 shadow-lg'
                    : 'bg-zinc-950 border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-zinc-400">
                      {tmpl.category}
                    </span>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[11px] text-amber-400 font-medium">
                        <Check className="w-3.5 h-3.5" />
                        <span>Active</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    {tmpl.name}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                    {tmpl.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800/80 flex justify-end">
                  <button
                    onClick={() => {
                      onSelect(tmpl)
                      onClose()
                    }}
                    className="flex items-center space-x-1 px-2.5 py-1 text-xs font-medium rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-100 transition-colors"
                  >
                    <span>Load Template</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="h-10 px-5 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500">
          <span>Loading a template replaces the current editor code.</span>
          <button onClick={onClose} className="hover:text-zinc-300">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
