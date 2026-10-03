'use client'

import React, { useState } from 'react'
import { X, Plus, Package, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface AddDependencyModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (pkgName: string, version: string) => void
  currentDeps: Record<string, string>
}

const POPULAR_PACKAGES = [
  { name: 'framer-motion', version: '^11.5.4', desc: 'Production-ready animation library' },
  { name: 'canvas-confetti', version: '^1.9.4', desc: 'Performant confetti animations' },
  { name: '@radix-ui/react-dialog', version: '^1.1.2', desc: 'Accessible modal dialog component' },
  { name: '@radix-ui/react-dropdown-menu', version: '^2.1.2', desc: 'Accessible dropdown menus' },
  { name: '@radix-ui/react-tooltip', version: '^1.1.3', desc: 'Hover & focus tooltips' },
  { name: 'date-fns', version: '^4.1.0', desc: 'Modern JavaScript date utility' },
  { name: 'sonner', version: '^1.7.0', desc: 'Opinionated toast component for React' },
  { name: 'recharts', version: '^2.12.7', desc: 'Redesigned charting library' },
]

export function AddDependencyModal({ isOpen, onClose, onAdd, currentDeps }: AddDependencyModalProps) {
  const [packageName, setPackageName] = useState('')
  const [version, setVersion] = useState('latest')
  const [filter, setFilter] = useState('')

  if (!isOpen) return null

  const handleCustomAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!packageName.trim()) return
    onAdd(packageName.trim(), version.trim() || 'latest')
    setPackageName('')
    setVersion('latest')
    onClose()
  }

  const filteredPopular = POPULAR_PACKAGES.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase()) ||
    p.desc.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 font-sans">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-zinc-300" />
            <h3 className="text-sm font-semibold text-zinc-100">Add NPM Dependency</h3>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Custom Input */}
          <form onSubmit={handleCustomAdd} className="space-y-3">
            <label className="text-xs font-medium text-zinc-300">Custom Package Name</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                placeholder="e.g. framer-motion, @radix-ui/react-slot"
                className="flex-1 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 font-mono"
              />
              <input
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="latest"
                className="w-24 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 font-mono"
              />
              <Button
                type="submit"
                disabled={!packageName.trim()}
                variant="default"
                size="sm"
                className="h-auto py-2"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </Button>
            </div>
          </form>

          {/* Registry suggestions */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400">
                Popular Component Packages
              </span>
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filter presets..."
                className="px-2 py-1 bg-zinc-950 border border-zinc-800 rounded text-[11px] text-zinc-300 placeholder-zinc-600 focus:outline-none"
              />
            </div>

            <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
              {filteredPopular.map((pkg) => {
                const isInstalled = Boolean(currentDeps[pkg.name])
                return (
                  <div
                    key={pkg.name}
                    className="flex items-center justify-between p-2.5 bg-zinc-950/60 hover:bg-zinc-950 border border-zinc-800/80 rounded-lg transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-medium text-white">{pkg.name}</span>
                        <span className="text-[10px] text-zinc-500 font-mono">{pkg.version}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5">{pkg.desc}</p>
                    </div>

                    {isInstalled ? (
                      <Badge variant="emerald" className="gap-1">
                        <Check className="w-3 h-3" /> Installed
                      </Badge>
                    ) : (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onAdd(pkg.name, pkg.version)}
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add</span>
                      </Button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
          <span>Packages resolve automatically in Sandpack sandbox</span>
          <Button variant="outline" size="sm" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  )
}
