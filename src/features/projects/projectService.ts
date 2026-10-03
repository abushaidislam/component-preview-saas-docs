import { createClient } from '@/lib/supabase/client'
import { TEMPLATES } from '@/lib/templates'

export const DEFAULT_TEMPLATE = TEMPLATES[0].code

export interface VersionSnapshot {
  id: string
  version_number: number
  source: string
  created_at: string
  note?: string
}

export interface StoredProject {
  id: string
  name: string
  title?: string
  source: string
  description?: string
  created_at: string
  updated_at: string
  versions?: VersionSnapshot[]
}

const LOCAL_DRAFT_KEY = 'component_preview_current_draft'

export function getLocalDraft(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(LOCAL_DRAFT_KEY)
}

export function setLocalDraft(code: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(LOCAL_DRAFT_KEY, code)
}

export function clearLocalDraft(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(LOCAL_DRAFT_KEY)
}

export async function getProjectById(projectId: string): Promise<StoredProject | null> {
  if (typeof window === 'undefined') return null

  // Check Supabase if configured
  try {
    const supabase = createClient()
    const { data: proj, error } = await supabase
      .from('projects')
      .select('id, name, description, created_at, updated_at')
      .eq('id', projectId)
      .single()

    if (!error && proj) {
      const { data: comp } = await supabase
        .from('components')
        .select('id')
        .eq('project_id', proj.id)
        .single()

      if (comp) {
        const { data: versions } = await supabase
          .from('component_versions')
          .select('id, version_number, source, created_at')
          .eq('component_id', comp.id)
          .order('version_number', { ascending: false })

        const latestSource = versions?.[0]?.source || DEFAULT_TEMPLATE

        return {
          id: proj.id,
          name: proj.name,
          title: proj.name,
          source: latestSource,
          created_at: proj.created_at,
          updated_at: proj.updated_at,
          versions: versions || [],
        }
      }
    }
  } catch {
    // Continue to local storage fallback
  }

  // Check localStorage
  const item = localStorage.getItem(`project_${projectId}`)
  if (item) {
    try {
      const parsed = JSON.parse(item)
      return {
        id: parsed.id,
        name: parsed.name || parsed.title || 'Untitled Project',
        title: parsed.name || parsed.title || 'Untitled Project',
        source: parsed.source || DEFAULT_TEMPLATE,
        created_at: parsed.created_at || new Date().toISOString(),
        updated_at: parsed.updated_at || new Date().toISOString(),
        versions: parsed.versions || [
          {
            id: 'v1',
            version_number: 1,
            source: parsed.source || DEFAULT_TEMPLATE,
            created_at: parsed.created_at || new Date().toISOString(),
          },
        ],
      }
    } catch {
      return null
    }
  }

  return null
}

export async function saveProjectAndVersion({
  title,
  source,
  projectId,
  versionNote,
}: {
  title: string
  source: string
  projectId?: string
  versionNote?: string
}): Promise<{ success: boolean; projectId?: string; isLocal?: boolean; versionNumber?: number; error?: string }> {
  let user = null
  let supabase = null

  try {
    supabase = createClient()
    const { data } = await supabase.auth.getUser()
    user = data?.user ?? null
  } catch {
    user = null
  }

  if (!user || !supabase) {
    // Save to local storage
    const currentId = projectId && !projectId.startsWith('remote_') ? projectId : `local_${Date.now()}`
    const existing = localStorage.getItem(`project_${currentId}`)
    let versions: VersionSnapshot[] = []

    if (existing) {
      try {
        const parsed = JSON.parse(existing)
        versions = parsed.versions || []
      } catch {}
    }

    const nextVer = versions.length + 1
    const newVersion: VersionSnapshot = {
      id: `v_${Date.now()}`,
      version_number: nextVer,
      source,
      created_at: new Date().toISOString(),
      note: versionNote || `Version ${nextVer}`,
    }

    const localProject: StoredProject = {
      id: currentId,
      name: title,
      title,
      source,
      created_at: existing ? JSON.parse(existing).created_at : new Date().toISOString(),
      updated_at: new Date().toISOString(),
      versions: [newVersion, ...versions],
    }

    localStorage.setItem(`project_${currentId}`, JSON.stringify(localProject))
    setLocalDraft(source)
    return { success: true, projectId: currentId, isLocal: true, versionNumber: nextVer }
  }

  try {
    let currentProjectId = projectId

    if (!currentProjectId || currentProjectId.startsWith('local_')) {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString(36)
      const { data: newProj, error: projErr } = await supabase
        .from('projects')
        .insert({
          user_id: user.id,
          name: title,
          slug,
        })
        .select()
        .single()

      if (projErr) throw projErr
      if (!newProj) throw new Error('Failed to create project')
      currentProjectId = newProj.id

      const { data: newComp, error: compErr } = await supabase
        .from('components')
        .insert({
          project_id: currentProjectId,
          name: title,
          entry_file: 'App.tsx',
        })
        .select()
        .single()

      if (compErr) throw compErr
      if (!newComp) throw new Error('Failed to create component')

      const { error: verErr } = await supabase.from('component_versions').insert({
        component_id: newComp.id,
        version_number: 1,
        source,
        preview_config: { note: versionNote || 'Initial Snapshot' },
      })

      if (verErr) throw verErr

      setLocalDraft(source)
      return { success: true, projectId: currentProjectId, isLocal: false, versionNumber: 1 }
    } else {
      const { data: comp } = await supabase
        .from('components')
        .select('id')
        .eq('project_id', currentProjectId)
        .single()

      let nextVerNum = 1
      if (comp) {
        const { data: latestVer } = await supabase
          .from('component_versions')
          .select('version_number')
          .eq('component_id', comp.id)
          .order('version_number', { ascending: false })
          .limit(1)
          .single()

        nextVerNum = (latestVer?.version_number || 0) + 1

        await supabase.from('component_versions').insert({
          component_id: comp.id,
          version_number: nextVerNum,
          source,
          preview_config: { note: versionNote || `Version ${nextVerNum}` },
        })
      }

      await supabase.from('projects').update({ updated_at: new Date().toISOString(), name: title }).eq('id', currentProjectId)

      setLocalDraft(source)
      return { success: true, projectId: currentProjectId, isLocal: false, versionNumber: nextVerNum }
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Save project error:', message)
    return { success: false, error: message }
  }
}

export async function deleteProject(projectId: string): Promise<boolean> {
  if (typeof window === 'undefined') return false

  // Remove local
  localStorage.removeItem(`project_${projectId}`)

  // Remove Supabase
  try {
    const supabase = createClient()
    await supabase.from('projects').delete().eq('id', projectId)
  } catch {}

  return true
}

export async function createShareToken(source: string, title: string = 'Component Preview'): Promise<string> {
  const token = Math.random().toString(36).substring(2, 10) + Date.now().toString(36).slice(-4)
  const payload = {
    source,
    title,
    created_at: new Date().toISOString(),
  }
  localStorage.setItem(`share_${token}`, JSON.stringify(payload))
  return token
}

export async function getSharedSource(token: string): Promise<{ source: string; title: string } | null> {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(`share_${token}`)
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw)
    if (typeof parsed === 'string') {
      return { source: parsed, title: 'Shared Component' }
    }
    return { source: parsed.source, title: parsed.title || 'Shared Component' }
  } catch {
    return { source: raw, title: 'Shared Component' }
  }
}
