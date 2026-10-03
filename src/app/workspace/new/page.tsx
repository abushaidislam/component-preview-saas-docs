'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { CodeEditor } from '@/features/editor/CodeEditor'
import { PreviewRuntime } from '@/features/preview/PreviewRuntime'
import { ErrorDrawer } from '@/features/diagnostics/ErrorDrawer'
import { DEFAULT_TEMPLATE, saveProjectAndVersion, createShareToken } from '@/features/projects/projectService'

export default function WorkspacePage() {
  const [code, setCode] = useState(DEFAULT_TEMPLATE)
  const [title] = useState('Interactive React Card')
  const [isSaved, setIsSaved] = useState(true)
  const [runtimeError, setRuntimeError] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
    setIsSaved(false)
  }

  const handleSave = async () => {
    const res = await saveProjectAndVersion({ title, source: code })
    if (res.success) {
      setIsSaved(true)
      showToast(res.isLocal ? 'Saved locally to browser storage!' : 'Saved to Supabase project!')
    } else {
      showToast(`Save failed: ${res.error}`)
    }
  }

  const handleShare = async () => {
    const token = await createShareToken(code)
    const shareUrl = `${window.location.origin}/p/${token}`
    await navigator.clipboard.writeText(shareUrl)
    showToast('Share link copied to clipboard!')
  }

  const handleExport = () => {
    const blob = new Blob([code], { type: 'text/typescript-jsx' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Component.tsx'
    a.click()
    URL.revokeObjectURL(url)
    showToast('Downloaded Component.tsx')
  }

  const handleReset = () => {
    if (window.confirm('Reset code to default template?')) {
      setCode(DEFAULT_TEMPLATE)
      setIsSaved(true)
      showToast('Reset to default template')
    }
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <Navbar
        title={title}
        isSaved={isSaved}
        onSave={handleSave}
        onShare={handleShare}
        onExport={handleExport}
        onReset={handleReset}
      />

      {toastMessage && (
        <div className="absolute top-14 right-4 z-50 bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs px-3 py-2 rounded shadow-xl animate-fade-in">
          {toastMessage}
        </div>
      )}

      <main className="flex-1 flex overflow-hidden">
        {/* Left Pane: Code Editor */}
        <div className="w-1/2 h-full min-w-[300px]">
          <CodeEditor code={code} onChange={handleCodeChange} />
        </div>

        {/* Right Pane: Live Sandbox Preview */}
        <div className="w-1/2 h-full flex flex-col border-l border-zinc-800">
          <div className="flex-1">
            <PreviewRuntime
              code={code}
              onErrorChange={(err) => setRuntimeError(err)}
            />
          </div>
          <ErrorDrawer error={runtimeError} onClear={() => setRuntimeError(null)} />
        </div>
      </main>
    </div>
  )
}
