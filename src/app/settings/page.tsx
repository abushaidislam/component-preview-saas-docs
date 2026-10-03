'use client'

import { useState, useEffect, useCallback } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import {
  HardDrive,
  Code,
  Shield,
  Trash2,
  Check,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react'
import { clearLocalDraft } from '@/features/projects/projectService'

export default function SettingsPage() {
  const [projectCount, setProjectCount] = useState(0)
  const [storageUsedKb, setStorageUsedKb] = useState(0)
  const [clearedToast, setClearedToast] = useState<string | null>(null)

  const calculateStorage = useCallback(() => {
    if (typeof window === 'undefined') return
    let count = 0
    let totalChars = 0

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && (key.startsWith('project_') || key.startsWith('share_') || key.startsWith('component_'))) {
        const val = localStorage.getItem(key) || ''
        totalChars += key.length + val.length
        if (key.startsWith('project_')) count++
      }
    }

    setProjectCount(count)
    setStorageUsedKb(Math.round((totalChars * 2) / 1024))
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      calculateStorage()
    }, 0)
    return () => clearTimeout(timer)
  }, [calculateStorage])

  const handleClearDraft = () => {
    clearLocalDraft()
    calculateStorage()
    setClearedToast('Active local workspace draft cleared.')
    setTimeout(() => setClearedToast(null), 3000)
  }

  const handlePurgeAll = () => {
    if (
      window.confirm(
        'Warning: This will permanently delete all locally saved projects and drafts. Continue?'
      )
    ) {
      const keysToRemove: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && (key.startsWith('project_') || key.startsWith('share_') || key.startsWith('component_'))) {
          keysToRemove.push(key)
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k))
      calculateStorage()
      setClearedToast('All local storage data purged.')
      setTimeout(() => setClearedToast(null), 3000)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <Navbar title="Settings" />

      {clearedToast && (
        <div className="fixed top-14 right-4 z-50 bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs px-3.5 py-2.5 rounded-lg shadow-xl flex items-center space-x-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{clearedToast}</span>
        </div>
      )}

      <main className="flex-1 p-6 sm:p-10 max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight">Workspace Preferences</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Configure local runtime behavior, view storage usage, and inspect sandbox security boundaries.
          </p>
        </div>

        <div className="space-y-6">
          {/* Storage & Drafts */}
          <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
            <div className="flex items-center space-x-2.5 mb-4">
              <HardDrive className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-semibold text-white">Browser Storage &amp; Drafts</h2>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed mb-5">
              ComponentPreview stores local drafts, project snapshots, and shared tokens in your browser&apos;s localStorage for offline resilience.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              <div className="p-3 bg-zinc-950 border border-zinc-800/80 rounded-lg">
                <span className="text-[11px] text-zinc-500 block mb-1">Local Projects</span>
                <span className="text-lg font-bold text-white font-mono">{projectCount}</span>
              </div>
              <div className="p-3 bg-zinc-950 border border-zinc-800/80 rounded-lg">
                <span className="text-[11px] text-zinc-500 block mb-1">Estimated Storage</span>
                <span className="text-lg font-bold text-white font-mono">{storageUsedKb} KB</span>
              </div>
              <div className="p-3 bg-zinc-950 border border-zinc-800/80 rounded-lg col-span-2 sm:col-span-1">
                <span className="text-[11px] text-zinc-500 block mb-1">Persistence Engine</span>
                <span className="text-xs font-semibold text-emerald-400">Indexed Local + Cloud</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleClearDraft}
                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-750 text-zinc-200 text-xs font-medium rounded-lg transition-colors flex items-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Active Workspace Draft</span>
              </button>
            </div>
          </div>

          {/* Sandbox Dependency Allowlist */}
          <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
            <div className="flex items-center space-x-2.5 mb-4">
              <Shield className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-semibold text-white">Sandbox Package Allowlist</h2>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              To protect execution security and maintain sub-300ms compile speeds, runtime sandboxes allow a curated selection of frontend libraries:
            </p>

            <div className="space-y-2">
              {[
                { pkg: 'lucide-react', ver: '^1.50.0', desc: 'Over 1,400 clean SVG icons for UI creation' },
                { pkg: 'clsx', ver: '^2.1.1', desc: 'Tiny utility for conditional className strings' },
                { pkg: 'tailwind-merge', ver: '^3.7.0', desc: 'Merge Tailwind CSS classes without style conflicts' },
                { pkg: 'class-variance-authority', ver: '^0.7.1', desc: 'CVA component variant authoring' },
                { pkg: 'motion', ver: '^12.40.0', desc: 'Hardware-accelerated animations & gestures' },
              ].map((dep, i) => (
                <div
                  key={i}
                  className="p-3 bg-zinc-950 border border-zinc-800/80 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <Code className="w-4 h-4 text-zinc-400" />
                    <div>
                      <span className="text-xs font-mono font-medium text-white">{dep.pkg}</span>
                      <span className="text-[11px] text-zinc-500 ml-2 hidden sm:inline">{dep.desc}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                    {dep.ver}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="p-6 bg-rose-950/20 border border-rose-900/40 rounded-xl">
            <div className="flex items-center space-x-2.5 mb-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <h2 className="text-base font-semibold text-rose-300">Danger Zone</h2>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              Purging local data will wipe all saved components, versions, and share links stored in this browser.
            </p>

            <button
              onClick={handlePurgeAll}
              className="px-3.5 py-1.5 bg-rose-900/60 hover:bg-rose-900 text-rose-200 border border-rose-800 text-xs font-medium rounded-lg transition-colors flex items-center space-x-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Purge All Local Component Data</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
