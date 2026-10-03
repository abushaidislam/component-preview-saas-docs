'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ChevronLeft,
  Code2,
  Hash,
  Package,
  Plus,
  Sliders,
  Share2,
  FileCode,
  ArrowRight,
  Trash2,
  Check,
  Copy,
} from 'lucide-react'
import { COMPONENT_TEMPLATES, ComponentTemplate } from '@/features/templates/componentTemplates'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export type ActiveTabType = 'files' | 'components' | 'demos' | 'controls' | 'publish'

interface SidebarProps {
  activeFile: string
  onSelectFile: (fileName: string) => void
  onOpenAddDependency: () => void
  dependencies: Record<string, string>
  onRemoveDependency: (name: string) => void
  onSelectTemplate: (template: ComponentTemplate) => void
  onNewDemo: () => void
  demoFiles: string[]
  onContinueAction: () => void
  componentCode: string
}

export function Sidebar({
  activeFile,
  onSelectFile,
  onOpenAddDependency,
  dependencies,
  onRemoveDependency,
  onSelectTemplate,
  onNewDemo,
  demoFiles,
  onContinueAction,
  componentCode,
}: SidebarProps) {
  const [activeTab, setActiveTab] = useState<ActiveTabType>('files')
  const [copiedCode, setCopiedCode] = useState(false)

  const handleCopyComponent = () => {
    navigator.clipboard.writeText(componentCode)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const tabs: { id: ActiveTabType; label: string }[] = [
    { id: 'files', label: 'Files' },
    { id: 'components', label: 'Comp...' },
    { id: 'demos', label: 'Demos' },
    { id: 'controls', label: 'Controls' },
    { id: 'publish', label: 'Publish' },
  ]

  return (
    <aside className="w-64 h-full bg-zinc-950 border-r border-zinc-800 flex flex-col select-none shrink-0 font-sans z-20">
      {/* Top Brand & Header bar aligned with ComponentPreview theme */}
      <div className="h-12 px-3 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Project identity badge */}
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded text-xs font-semibold text-zinc-200 transition-colors"
            title="Return to Dashboard"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-zinc-400" />
            <Code2 className="w-3.5 h-3.5 text-zinc-300" />
            <span className="tracking-tight text-white">Preview</span>
          </Link>

          <span className="text-zinc-700 text-xs">/</span>
          <span className="text-xs font-medium text-zinc-400">Workspace</span>
        </div>

        <Badge variant="outline" className="text-[10px] text-zinc-500 font-mono">
          TSX
        </Badge>
      </div>

      {/* Segmented Tab Switcher (shadcn style) */}
      <div className="p-2 border-b border-zinc-800/80 bg-zinc-950">
        <div className="grid grid-cols-5 gap-0.5 bg-zinc-900/70 p-1 rounded-lg border border-zinc-800/80">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-1 text-[11px] font-medium rounded transition-all text-center truncate ${
                activeTab === tab.id
                  ? 'bg-zinc-800 text-zinc-100 shadow-xs border border-zinc-700/60 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-y-auto p-3 text-xs">
        {activeTab === 'files' && (
          <div className="space-y-4">
            {/* Component Group */}
            <div>
              <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-2 px-1">
                Component
              </div>
              <div className="space-y-1">
                {/* component.tsx */}
                <button
                  onClick={() => onSelectFile('component.tsx')}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all text-left group ${
                    activeFile === 'component.tsx'
                      ? 'bg-zinc-800 text-zinc-100 border border-zinc-700/60 font-medium'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Code2 className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200 shrink-0" />
                    <span className="truncate">component.tsx</span>
                  </div>
                  {activeFile === 'component.tsx' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0" />
                  )}
                </button>

                {/* index.css */}
                <button
                  onClick={() => onSelectFile('index.css')}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all text-left group ${
                    activeFile === 'index.css'
                      ? 'bg-zinc-800 text-zinc-100 border border-zinc-700/60 font-medium'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Hash className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200 shrink-0" />
                    <span className="truncate">index.css</span>
                  </div>
                  {activeFile === 'index.css' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0" />
                  )}
                </button>

                {/* + Add dependency */}
                <button
                  onClick={onOpenAddDependency}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors group mt-1.5 border border-dashed border-zinc-800 hover:border-zinc-700"
                >
                  <div className="flex items-center gap-2">
                    <Package className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                    <span>Add dependency</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] text-zinc-500 group-hover:text-zinc-400">
                    registry
                  </Badge>
                </button>
              </div>

              {/* Show installed dependencies */}
              {Object.keys(dependencies).length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-zinc-800/80 px-1 space-y-1">
                  <div className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1.5">
                    Dependencies ({Object.keys(dependencies).length})
                  </div>
                  {Object.entries(dependencies).map(([name, ver]) => (
                    <div
                      key={name}
                      className="flex items-center justify-between py-1 text-zinc-400 hover:text-zinc-200 group text-[11px]"
                    >
                      <span className="font-mono truncate">{name}</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[10px] text-zinc-500 font-mono">{ver}</span>
                        <button
                          onClick={() => onRemoveDependency(name)}
                          className="opacity-0 group-hover:opacity-100 p-0.5 text-zinc-500 hover:text-red-400 transition"
                          title="Remove dependency"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Demos Group */}
            <div>
              <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-2 px-1">
                Demos
              </div>
              <div className="space-y-1">
                {demoFiles.map((file) => (
                  <button
                    key={file}
                    onClick={() => onSelectFile(file)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all text-left group ${
                      activeFile === file
                        ? 'bg-zinc-800 text-zinc-100 border border-zinc-700/60 font-medium'
                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Code2 className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200 shrink-0" />
                      <span className="truncate">{file}</span>
                    </div>
                    {activeFile === file && (
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0" />
                    )}
                  </button>
                ))}

                {/* + New demo */}
                <button
                  onClick={onNewDemo}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors group mt-1.5 border border-dashed border-zinc-800 hover:border-zinc-700"
                >
                  <Plus className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                  <span>New demo</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Components Tab (Template Library & Cancel Plan Modal) */}
        {activeTab === 'components' && (
          <div className="space-y-3">
            <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-1 px-1">
              Component Presets
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed mb-3 px-1">
              Select any prebuilt component or paste your custom React component directly into <code className="text-zinc-200 bg-zinc-900 px-1 py-0.5 rounded border border-zinc-800 font-mono text-[10px]">component.tsx</code>.
            </p>

            <div className="space-y-2">
              {COMPONENT_TEMPLATES.map((tmpl) => (
                <div
                  key={tmpl.id}
                  onClick={() => onSelectTemplate(tmpl)}
                  className="p-2.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 rounded-lg cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-zinc-200 group-hover:text-white transition-colors text-xs">
                      {tmpl.name}
                    </span>
                    <Badge variant="outline" className="text-[10px]">
                      {tmpl.category}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    {tmpl.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Demos Tab */}
        {activeTab === 'demos' && (
          <div className="space-y-3">
            <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-1 px-1">
              Active Demos
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed mb-3 px-1">
              Mount your component under different containers and view states.
            </p>

            <div className="space-y-1.5">
              {demoFiles.map((demo) => (
                <div
                  key={demo}
                  onClick={() => onSelectFile(demo)}
                  className={`p-2.5 rounded-lg border cursor-pointer transition-colors ${
                    activeFile === demo
                      ? 'bg-zinc-800/90 border-zinc-600 text-white'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileCode className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="font-mono font-medium text-xs">{demo}</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 mt-1 block">
                    {demo === 'default.tsx' ? 'Centered isolated preview container' : 'Custom demo variation'}
                  </span>
                </div>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={onNewDemo}
                className="w-full mt-2 border-dashed"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Demo</span>
              </Button>
            </div>
          </div>
        )}

        {/* Controls Tab */}
        {activeTab === 'controls' && (
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-500 uppercase tracking-wider px-1">
              <Sliders className="w-3.5 h-3.5 text-zinc-400" />
              <span>Environment</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed px-1">
              Live preview runtime configuration and compilation states.
            </p>

            <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-lg space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Live Reload</span>
                <Badge variant="emerald">Active</Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Sandpack Sandbox</span>
                <span className="text-zinc-300 font-mono text-[11px]">react-ts</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Tailwind Engine</span>
                <span className="text-zinc-300 font-mono text-[11px]">v4 CSS</span>
              </div>
            </div>
          </div>
        )}

        {/* Publish / Export Tab */}
        {activeTab === 'publish' && (
          <div className="space-y-3">
            <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-1 px-1">
              Publish & Share
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed mb-3 px-1">
              Distribute your component preview link or export raw source files.
            </p>

            <div className="space-y-2">
              <Button
                variant="secondary"
                onClick={handleCopyComponent}
                className="w-full justify-between"
              >
                <div className="flex items-center gap-2">
                  <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Copy TSX Code</span>
                </div>
                {copiedCode && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              </Button>

              <Button
                variant="secondary"
                onClick={onContinueAction}
                className="w-full justify-between"
              >
                <div className="flex items-center gap-2">
                  <Share2 className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Generate Share Link</span>
                </div>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA Button matching the project's primary button style (zinc-100 / white) */}
      <div className="p-3 border-t border-zinc-800 bg-zinc-950">
        <Button
          variant="default"
          onClick={onContinueAction}
          className="w-full font-medium text-xs"
        >
          <span>Continue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </aside>
  )
}
