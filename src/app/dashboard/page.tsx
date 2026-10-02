'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { createClient } from '@/lib/supabase/client'
import { Plus, Folder, Clock, ArrowRight } from 'lucide-react'

interface ProjectItem {
  id: string
  name: string
  updated_at: string
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProjects() {
      const supabase = createClient()
      const { data } = await supabase.from('projects').select('id, name, updated_at').order('updated_at', { ascending: false })
      if (data) {
        setProjects(data)
      } else {
        // Fallback to local storage projects
        const localProjects: ProjectItem[] = []
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i)
          if (key && key.startsWith('project_')) {
            try {
              const item = JSON.parse(localStorage.getItem(key) || '{}')
              localProjects.push({
                id: item.id,
                name: item.title || 'Untitled Local Project',
                updated_at: item.updated_at || new Date().toISOString(),
              })
            } catch (e) {}
          }
        }
        setProjects(localProjects)
      }
      setLoading(false)
    }
    loadProjects()
  }, [])

  return (
    <div className="flex flex-col h-screen w-screen bg-zinc-950 text-zinc-100">
      <Navbar title="Dashboard" />
      <main className="flex-1 p-8 max-w-5xl mx-auto w-full overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-semibold text-white tracking-tight">Your Projects</h1>
            <p className="text-xs text-zinc-400 mt-1">Manage and reopen saved React component previews.</p>
          </div>
          <Link
            href="/"
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs rounded transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Component</span>
          </Link>
        </div>

        {loading ? (
          <div className="text-zinc-500 text-xs py-12 text-center">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="border border-dashed border-zinc-800 rounded-xl p-12 text-center">
            <Folder className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-sm font-medium text-zinc-300">No components saved yet</h3>
            <p className="text-xs text-zinc-500 mt-1 mb-4">Create your first component in the live workspace.</p>
            <Link
              href="/"
              className="inline-flex items-center space-x-1 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs rounded transition-colors"
            >
              <span>Open Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((proj) => (
              <Link
                key={proj.id}
                href="/"
                className="group p-4 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-colors flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
                    {proj.name}
                  </h3>
                  <div className="flex items-center space-x-1 text-zinc-500 text-[11px] mt-2">
                    <Clock className="w-3 h-3" />
                    <span>Updated {new Date(proj.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <span className="text-xs text-zinc-400 group-hover:text-zinc-200 flex items-center space-x-1">
                    <span>Open</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
