'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { CodeEditor } from '@/features/editor/CodeEditor'
import { PreviewRuntime } from '@/features/preview/PreviewRuntime'
import { ErrorDrawer } from '@/features/diagnostics/ErrorDrawer'
import { CommandPalette } from '@/components/command/CommandPalette'
import { VersionHistoryModal } from '@/components/versions/VersionHistoryModal'
import { TemplatesModal } from '@/components/templates/TemplatesModal'
import {
  DEFAULT_TEMPLATE,
  saveProjectAndVersion,
  createShareToken,
  getProjectById,
  getLocalDraft,
  setLocalDraft,
  VersionSnapshot,
} from '@/features/projects/projectService'
import { TEMPLATES } from '@/lib/templates'
import { Code, Eye, GripVertical } from 'lucide-react'

interface WorkspaceViewProps {
  initialProjectId?: string
}

export function WorkspaceView({ initialProjectId }: WorkspaceViewProps) {
  const router = useRouter()
  const [code, setCode] = useState<string>(DEFAULT_TEMPLATE)
  const [title, setTitle] = useState<string>('Interactive React Card')
  const [projectId, setProjectId] = useState<string | undefined>(initialProjectId)
  const [isSaved, setIsSaved] = useState(true)
  const [versionNumber, setVersionNumber] = useState(1)
  const [versions, setVersions] = useState<VersionSnapshot[]>([])
  const [runtimeError, setRuntimeError] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Split-pane Resizer state
  const [splitPercent, setSplitPercent] = useState<number>(50)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const mainRef = useRef<HTMLElement | null>(null)

  // Mobile / tablet tab switcher (< 900px)
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor')

  // Modals state
  const [isCommandOpen, setIsCommandOpen] = useState(false)
  const [isVersionsOpen, setIsVersionsOpen] = useState(false)
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false)
  const [currentTemplateId, setCurrentTemplateId] = useState<string>('card')

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3200)
  }

  // Load project or local draft & saved split ratio on mount
  useEffect(() => {
    async function init() {
      // Load saved split ratio
      try {
        const savedSplit = localStorage.getItem('component_preview_split')
        if (savedSplit) {
          const parsed = parseFloat(savedSplit)
          if (!isNaN(parsed) && parsed >= 15 && parsed <= 85) {
            setSplitPercent(parsed)
          }
        }
      } catch {}

      if (initialProjectId && initialProjectId !== 'new') {
        const proj = await getProjectById(initialProjectId)
        if (proj) {
          setTitle(proj.name || proj.title || 'Untitled Project')
          setCode(proj.source)
          setProjectId(proj.id)
          if (proj.versions && proj.versions.length > 0) {
            setVersions(proj.versions)
            setVersionNumber(proj.versions[0].version_number)
          }
          setIsSaved(true)
          return
        }
      }

      // Check if we have an ongoing local draft
      const draft = getLocalDraft()
      if (draft && !initialProjectId) {
        setCode(draft)
        setIsSaved(false)
      }
    }

    init()
  }, [initialProjectId])

  // Bulletproof pointer event handlers for split resizing using setPointerCapture
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    setIsDragging(true)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !mainRef.current) return
    const rect = mainRef.current.getBoundingClientRect()
    if (rect.width <= 0) return
    const rawPercent = ((e.clientX - rect.left) / rect.width) * 100
    const clamped = Math.min(Math.max(rawPercent, 15), 85)
    setSplitPercent(Math.round(clamped * 10) / 10)
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {}
    setIsDragging(false)
    try {
      localStorage.setItem('component_preview_split', String(splitPercent))
    } catch {}
  }

  // Keyboard accessibility for divider
  const handleDividerKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setSplitPercent((prev) => Math.max(15, prev - 2))
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      setSplitPercent((prev) => Math.min(85, prev + 2))
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setSplitPercent(50)
    }
  }

  // Debounced auto-draft saving to localStorage
  const draftTimer = useRef<NodeJS.Timeout | null>(null)
  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
    setIsSaved(false)

    if (draftTimer.current) clearTimeout(draftTimer.current)
    draftTimer.current = setTimeout(() => {
      setLocalDraft(newCode)
    }, 800)
  }

  const handleSave = useCallback(async () => {
    const res = await saveProjectAndVersion({
      title,
      source: code,
      projectId,
      versionNote: `Snapshot ${versionNumber + 1}`,
    })

    if (res.success) {
      setIsSaved(true)
      if (res.projectId) setProjectId(res.projectId)
      if (res.versionNumber) setVersionNumber(res.versionNumber)

      const newSnapshot: VersionSnapshot = {
        id: `v_${Date.now()}`,
        version_number: res.versionNumber || versionNumber + 1,
        source: code,
        created_at: new Date().toISOString(),
        note: `Snapshot ${res.versionNumber || versionNumber + 1}`,
      }
      setVersions((prev) => [newSnapshot, ...prev])

      showToast(
        res.isLocal
          ? `Saved locally as snapshot v${res.versionNumber || versionNumber + 1}!`
          : `Saved to cloud database (v${res.versionNumber || versionNumber + 1})!`
      )

      if (!initialProjectId && res.projectId) {
        router.replace(`/workspace/${res.projectId}`)
      }
    } else {
      showToast(`Save failed: ${res.error}`)
    }
  }, [code, initialProjectId, projectId, router, title, versionNumber])

  const handleShare = async () => {
    const token = await createShareToken(code, title)
    const shareUrl = `${window.location.origin}/p/${token}`
    await navigator.clipboard.writeText(shareUrl)
    showToast('Share link copied to clipboard!')
  }

  const handleExport = () => {
    const blob = new Blob([code], { type: 'text/typescript-jsx' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'Component'}.tsx`
    a.click()
    URL.revokeObjectURL(url)
    showToast('Downloaded .tsx component file')
  }

  const handleReset = () => {
    if (window.confirm('Reset code to starter template?')) {
      setCode(DEFAULT_TEMPLATE)
      setIsSaved(false)
      showToast('Reset to default starter template')
    }
  }

  const handleSelectTemplate = (templateCode: string, templateName: string) => {
    setCode(templateCode)
    setTitle(templateName)
    setIsSaved(false)
    const matched = TEMPLATES.find((t) => t.code === templateCode)
    if (matched) setCurrentTemplateId(matched.id)
    showToast(`Loaded "${templateName}" template`)
  }

  const handleRestoreVersion = (ver: VersionSnapshot) => {
    setCode(ver.source)
    setVersionNumber(ver.version_number)
    setIsSaved(false)
    showToast(`Restored snapshot v${ver.version_number}`)
  }

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault()
        handleSave()
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsCommandOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleSave])

  return (
    <div
      className={`flex flex-col h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100 ${
        isDragging ? 'select-none cursor-col-resize' : ''
      }`}
    >
      <Navbar
        title={title}
        isSaved={isSaved}
        versionNumber={versionNumber}
        onSave={handleSave}
        onShare={handleShare}
        onExport={handleExport}
        onOpenVersions={() => setIsVersionsOpen(true)}
        onOpenCommandPalette={() => setIsCommandOpen(true)}
        onOpenTemplates={() => setIsTemplatesOpen(true)}
      />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-14 right-4 z-50 bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs px-3.5 py-2.5 rounded-lg shadow-2xl flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Dragging Overlay: Prevents iframe or any element from eating mouse events */}
      {isDragging && (
        <div className="fixed inset-0 z-50 cursor-col-resize select-none bg-transparent" />
      )}

      {/* Mobile/Tablet Screen Tab Selector (< 900px) */}
      <div className="flex md:hidden h-10 border-b border-zinc-800 bg-zinc-900/90 px-3 items-center justify-center space-x-2 select-none shrink-0">
        <button
          onClick={() => setMobileTab('editor')}
          className={`flex-1 py-1.5 text-xs font-medium rounded flex items-center justify-center space-x-1.5 transition-colors ${
            mobileTab === 'editor'
              ? 'bg-zinc-800 text-white'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          <span>Code Editor</span>
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-1.5 text-xs font-medium rounded flex items-center justify-center space-x-1.5 transition-colors ${
            mobileTab === 'preview'
              ? 'bg-zinc-800 text-white'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Live Preview</span>
        </button>
      </div>

      {/* Main Split Layout */}
      <main ref={mainRef} className="flex-1 flex overflow-hidden relative w-full h-full">
        {/* Left Pane: Code Editor */}
        <div
          style={{ width: `${splitPercent}%` }}
          className={`h-full min-w-[240px] max-w-[85%] flex flex-col transition-none ${
            mobileTab === 'editor' ? 'w-full flex' : 'hidden md:flex'
          }`}
        >
          <CodeEditor
            code={code}
            onChange={handleCodeChange}
            onReset={handleReset}
          />
        </div>

        {/* Draggable Split Divider */}
        <div
          role="separator"
          tabIndex={0}
          aria-valuenow={Math.round(splitPercent)}
          aria-valuemin={15}
          aria-valuemax={85}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onDoubleClick={() => setSplitPercent(50)}
          onKeyDown={handleDividerKeyDown}
          className={`hidden md:flex w-4 -mx-2 z-40 group cursor-col-resize select-none touch-none items-center justify-center transition-colors relative shrink-0 outline-none ${
            isDragging ? 'bg-amber-500/20' : 'bg-transparent hover:bg-zinc-800/80'
          }`}
          title="Drag left/right to resize split • Double-click to reset (50/50)"
        >
          {/* Subtle vertical line */}
          <div
            className={`w-[2px] h-full transition-colors ${
              isDragging
                ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                : 'bg-zinc-800 group-hover:bg-zinc-500 group-focus:bg-amber-400'
            }`}
          />

          {/* Centered Grip Handle */}
          <div
            className={`absolute w-5 h-9 rounded-md bg-zinc-900 border flex items-center justify-center shadow-xl transition-all ${
              isDragging
                ? 'border-amber-400 text-amber-400 scale-110 shadow-amber-500/20'
                : 'border-zinc-700 text-zinc-400 group-hover:text-zinc-100 group-hover:border-zinc-500 group-focus:border-amber-400 group-focus:text-amber-400'
            }`}
          >
            <GripVertical className="w-3.5 h-3.5" />
          </div>

          {/* Real-time Percentage Tooltip while dragging */}
          {isDragging && (
            <div className="absolute -top-1 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-[10px] font-mono text-zinc-300 shadow-xl whitespace-nowrap pointer-events-none">
              {Math.round(splitPercent)}% | {100 - Math.round(splitPercent)}%
            </div>
          )}
        </div>

        {/* Right Pane: Live Sandbox & Diagnostics */}
        <div
          style={{ width: `${100 - splitPercent}%` }}
          className={`h-full min-w-[240px] max-w-[85%] flex flex-col transition-none relative ${
            mobileTab === 'preview' ? 'w-full flex' : 'hidden md:flex'
          } ${isDragging ? 'pointer-events-none' : ''}`}
        >
          <div className="flex-1 overflow-hidden">
            <PreviewRuntime
              code={code}
              onErrorChange={(err) => setRuntimeError(err)}
            />
          </div>
          <ErrorDrawer
            error={runtimeError}
            onClear={() => setRuntimeError(null)}
          />
        </div>
      </main>

      {/* Modals */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onSave={handleSave}
        onShare={handleShare}
        onExport={handleExport}
        onReset={handleReset}
        onSelectTemplate={handleSelectTemplate}
        onOpenVersions={() => {
          setIsCommandOpen(false)
          setIsVersionsOpen(true)
        }}
      />

      <VersionHistoryModal
        isOpen={isVersionsOpen}
        onClose={() => setIsVersionsOpen(false)}
        versions={versions}
        currentVersion={versionNumber}
        onRestore={handleRestoreVersion}
      />

      <TemplatesModal
        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
        onSelect={(tmpl) => handleSelectTemplate(tmpl.code, tmpl.name)}
        currentTemplateId={currentTemplateId}
      />
    </div>
  )
}
