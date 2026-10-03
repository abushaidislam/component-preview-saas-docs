'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { EditorPane as CodeEditor } from '@/features/preview/EditorPane'
import { PreviewRuntime } from '@/features/preview/PreviewRuntime'
import { getSharedSource, setLocalDraft } from '@/features/projects/projectService'
import {
  Code,
  Eye,
  GitFork,
  Download,
  Copy,
  Check,
  ArrowRight,
} from 'lucide-react'

export default function SharedPreviewPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = use(params)
  const router = useRouter()
  const [data, setData] = useState<{ source: string; title: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function load() {
      const res = await getSharedSource(token)
      setData(res)
      setLoading(false)
    }
    load()
  }, [token])

  const handleCopy = () => {
    if (data?.source) {
      navigator.clipboard.writeText(data.source)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = () => {
    if (data?.source) {
      const blob = new Blob([data.source], { type: 'text/typescript-jsx' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${(data.title || 'Component').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.tsx`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const handleFork = () => {
    if (data?.source) {
      setLocalDraft(data.source)
      router.push('/workspace')
    }
  }

  if (loading) {
    return (
      <div className="h-screen w-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-400 text-xs font-mono">
        <span className="w-4 h-4 border-2 border-zinc-600 border-t-zinc-200 rounded-full animate-spin mb-3" />
        <span>Loading shared sandbox environment...</span>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="h-screen w-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-300 text-sm font-sans p-6">
        <div className="max-w-md w-full p-8 border border-zinc-800 rounded-2xl bg-zinc-900/40 text-center">
          <h2 className="text-base font-semibold text-white mb-2">Share Link Not Found</h2>
          <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
            The shared token <span className="font-mono text-zinc-300">{token}</span> may have expired or was created in a separate browser context.
          </p>
          <Link
            href="/workspace"
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold rounded-lg transition-colors"
          >
            <span>Open New Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100 font-sans">
      {/* Share Header */}
      <header className="h-12 border-b border-zinc-800 bg-zinc-950 px-4 flex items-center justify-between select-none shrink-0 z-20">
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
          >
            ComponentPreview
          </Link>
          <span className="text-zinc-700">/</span>
          <span className="text-xs font-medium text-white">{data.title}</span>
          <span className="px-1.5 py-0.2 bg-zinc-900 border border-zinc-800 rounded font-mono text-[10px] text-zinc-400">
            {token.slice(0, 8)}
          </span>
        </div>

        {/* Tab switch & Actions */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 border border-zinc-800 rounded p-0.5 bg-zinc-900">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-2 py-0.5 text-xs font-medium rounded transition-colors flex items-center space-x-1 ${
                activeTab === 'preview'
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-2 py-0.5 text-xs font-medium rounded flex items-center space-x-1 transition-colors ${
                activeTab === 'code'
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Code className="w-3 h-3" />
              <span>Code</span>
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 rounded transition-colors"
            title="Copy code"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center space-x-1 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 rounded transition-colors"
            title="Download .tsx"
          >
            <Download className="w-3 h-3" />
            <span className="hidden sm:inline">Export</span>
          </button>

          <button
            onClick={handleFork}
            className="flex items-center space-x-1 px-3 py-1 text-xs font-semibold text-zinc-950 bg-zinc-100 hover:bg-white rounded transition-colors shadow-xs"
            title="Fork this component into your workspace"
          >
            <GitFork className="w-3.5 h-3.5" />
            <span>Fork to Workspace</span>
          </button>
        </div>
      </header>

      {/* Main View */}
      <main className="flex-1 flex overflow-hidden">
        {activeTab === 'code' ? (
          <div className="w-full h-full flex flex-col">
            <CodeEditor code={data.source} onChange={() => {}} readOnly={true} />
          </div>
        ) : (
          <div className="w-full h-full">
            <PreviewRuntime code={data.source} />
          </div>
        )}
      </main>
    </div>
  )
}
