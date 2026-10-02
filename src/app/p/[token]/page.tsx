'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { CodeEditor } from '@/features/editor/CodeEditor'
import { PreviewRuntime } from '@/features/preview/PreviewRuntime'
import { getSharedSource } from '@/features/projects/projectService'

export default function SharedPreviewPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params)
  const [code, setCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const src = await getSharedSource(token)
      setCode(src)
      setLoading(false)
    }
    load()
  }, [token])

  if (loading) {
    return (
      <div className="h-screen w-screen bg-zinc-950 flex items-center justify-center text-zinc-400 text-sm">
        Loading shared preview...
      </div>
    )
  }

  if (!code) {
    return (
      <div className="h-screen w-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-400 text-sm">
        <p className="text-red-400 mb-2">Share link not found or expired.</p>
        <Link href="/" className="text-zinc-200 underline text-xs">Return to Workspace</Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <Navbar title={`Shared Component (${token.slice(0, 6)})`} />
      <main className="flex-1 flex overflow-hidden">
        <div className="w-1/2 h-full">
          <CodeEditor code={code} onChange={() => {}} readOnly={true} />
        </div>
        <div className="w-1/2 h-full border-l border-zinc-800">
          <PreviewRuntime code={code} />
        </div>
      </main>
    </div>
  )
}
