'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { createClient } from '@/lib/supabase/client'
import { deleteProject } from '@/features/projects/projectService'
import { TEMPLATES } from '@/lib/templates'
import {
  Plus,
  Folder,
  Clock,
  ArrowRight,
  Search,
  Trash2,
  Layers,
  Sparkles,
} from 'lucide-react'

interface ProjectItem {
  id: string
  name: string
  updated_at: string
  versionsCount?: number
  isLocal?: boolean
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name'>('newest')

  useEffect(() => {
    let active = true

    async function fetchAllProjects() {
      const list: ProjectItem[] = []

      // 1. Try Supabase
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('projects')
          .select('id, name, updated_at')
          .order('updated_at', { ascending: false })

        if (data && !error && data.length > 0) {
          data.forEach((p) => {
            list.push({
              id: p.id,
              name: p.name || 'Untitled Project',
              updated_at: p.updated_at,
              isLocal: false,
            })
          })
        }
      } catch {}

      // 2. Fetch Local Storage Projects
      if (typeof window !== 'undefined') {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i)
          if (key && key.startsWith('project_')) {
            try {
              const raw = localStorage.getItem(key)
              if (raw) {
                const item = JSON.parse(raw)
                if (!list.some((p) => p.id === item.id)) {
                  list.push({
                    id: item.id,
                    name: item.name || item.title || 'Untitled Project',
                    updated_at: item.updated_at || new Date().toISOString(),
                    versionsCount: item.versions?.length || 1,
                    isLocal: true,
                  })
                }
              }
            } catch {}
          }
        }
      }

      if (active) {
        setProjects(list)
        setLoading(false)
      }
    }

    void fetchAllProjects()

    return () => {
      active = false
    }
  }, [])

  const handleDelete = async (e: React.MouseEvent, projId: string) => {
    e.preventDefault()
    e.stopPropagation()

    if (window.confirm('Are you sure you want to delete this project?')) {
      await deleteProject(projId)
      setProjects((prev) => prev.filter((p) => p.id !== projId))
    }
  }

  // Filter and Sort
  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    if (sortBy === 'oldest') {
      return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
    }
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  })

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <Navbar title="Dashboard" />

      <main className="flex-1 p-6 sm:p-10 max-w-5xl mx-auto w-full">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Component Projects</h1>
            <p className="text-xs text-zinc-400 mt-1">
              Browse, reopen, and manage your saved React component sandboxes.
            </p>
          </div>

          <Link
            href="/workspace/new"
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs rounded-lg transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>New Component</span>
          </Link>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 outline-none transition-colors"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end text-xs text-zinc-400">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'name')}
              className="bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs rounded-md px-2 py-1 outline-none"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-zinc-500 text-xs py-16 text-center">Loading component archives...</div>
        ) : sorted.length === 0 ? (
          <div className="border border-dashed border-zinc-800 rounded-2xl p-10 text-center bg-zinc-900/20">
            <Folder className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-zinc-200">No projects found</h3>
            <p className="text-xs text-zinc-500 mt-1 mb-6 max-w-sm mx-auto">
              {searchQuery
                ? `No components match "${searchQuery}". Try a different keyword.`
                : 'Start your first component or choose from curated starter templates.'}
            </p>

            <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto mb-6">
              {TEMPLATES.map((tmpl) => (
                <Link
                  key={tmpl.id}
                  href="/workspace"
                  className="px-2.5 py-1 text-xs bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-md transition-colors flex items-center space-x-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{tmpl.name}</span>
                </Link>
              ))}
            </div>

            <Link
              href="/workspace/new"
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold rounded-lg transition-colors"
            >
              <span>Open Blank Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sorted.map((proj) => (
              <div
                key={proj.id}
                className="group p-5 bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-white tracking-tight line-clamp-1">
                      {proj.name}
                    </h3>
                    <button
                      onClick={(e) => handleDelete(e, proj.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-rose-400 rounded transition-opacity"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-3 text-zinc-500 text-[11px] font-mono mt-3">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(proj.updated_at).toLocaleDateString()}</span>
                    </span>
                    {proj.versionsCount && (
                      <span className="flex items-center space-x-1">
                        <Layers className="w-3 h-3" />
                        <span>v{proj.versionsCount}</span>
                      </span>
                    )}
                    <span className="px-1.5 py-0.2 bg-zinc-950 border border-zinc-800 rounded text-[10px] text-zinc-400">
                      {proj.isLocal ? 'Local' : 'Cloud'}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500 font-mono">App.tsx</span>
                  <Link
                    href={`/workspace/${proj.id}`}
                    className="text-xs font-medium text-amber-400 hover:text-amber-300 flex items-center space-x-1"
                  >
                    <span>Launch</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
