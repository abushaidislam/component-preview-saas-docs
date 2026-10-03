import { createClient } from '@/lib/supabase/client'

export const DEFAULT_TEMPLATE = `import React, { useState } from 'react';
import { Sparkles, Heart, Share2 } from 'lucide-react';

export default function CardComponent() {
  const [likes, setLikes] = useState(42);
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(prev => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="max-w-sm mx-auto bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-zinc-100 shadow-xl font-sans">
      <div className="flex items-center justify-between mb-4">
        <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Component Preview
        </span>
        <button className="text-zinc-400 hover:text-zinc-200 transition">
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <h3 className="text-lg font-semibold text-white tracking-tight mb-2">
        Interactive React Card
      </h3>
      <p className="text-sm text-zinc-400 leading-relaxed mb-6">
        Edit this component in Monaco Editor on the left and watch the live preview render instantly in Sandpack.
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
        <button
          onClick={toggleLike}
          className={\`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors \${
            liked
              ? 'bg-rose-950/80 text-rose-300 border border-rose-800'
              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
          }\`}
        >
          <Heart className={\`w-3.5 h-3.5 \${liked ? 'fill-rose-400 text-rose-400' : ''}\`} />
          <span>{likes} Likes</span>
        </button>

        <span className="text-xs text-zinc-500 font-mono">App.tsx</span>
      </div>
    </div>
  );
}
`

export async function saveProjectAndVersion({
  title,
  source,
  projectId,
}: {
  title: string
  source: string
  projectId?: string
}) {
  const supabase = createClient()

  // Get current user session
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    // Save to local storage if unauthenticated
    const localId = projectId || `local_${Date.now()}`
    const localProject = {
      id: localId,
      title,
      source,
      updated_at: new Date().toISOString(),
    }
    localStorage.setItem(`project_${localId}`, JSON.stringify(localProject))
    return { success: true, projectId: localId, isLocal: true }
  }

  try {
    let currentProjectId = projectId

    if (!currentProjectId || currentProjectId.startsWith('local_')) {
      // Create new project
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString(36)
      const { data: newProj, error: projErr } = await (supabase
        .from('projects') as any)
        .insert({
          user_id: user.id,
          name: title,
          slug,
        })
        .select()
        .single()

      if (projErr) throw projErr
      currentProjectId = newProj.id

      // Create component
      const { data: newComp, error: compErr } = await (supabase
        .from('components') as any)
        .insert({
          project_id: currentProjectId,
          name: title,
          entry_file: 'App.tsx',
        })
        .select()
        .single()

      if (compErr) throw compErr

      // Create initial version
      const { error: verErr } = await (supabase.from('component_versions') as any).insert({
        component_id: newComp.id,
        version_number: 1,
        source,
      })

      if (verErr) throw verErr
    } else {
      // Fetch component
      const { data: comp } = await (supabase
        .from('components') as any)
        .select('id')
        .eq('project_id', currentProjectId)
        .single()

      if (comp) {
        // Fetch latest version number
        const { data: latestVer } = await (supabase
          .from('component_versions') as any)
          .select('version_number')
          .eq('component_id', comp.id)
          .order('version_number', { ascending: false })
          .limit(1)
          .single()

        const nextVerNum = (latestVer?.version_number || 0) + 1

        await (supabase.from('component_versions') as any).insert({
          component_id: comp.id,
          version_number: nextVerNum,
          source,
        })
      }
    }

    return { success: true, projectId: currentProjectId, isLocal: false }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Save project error:', message)
    return { success: false, error: message }
  }
}

export async function createShareToken(source: string) {
  const token = Math.random().toString(36).substring(2, 12) + Date.now().toString(36)
  localStorage.setItem(`share_${token}`, source)
  return token
}

export async function getSharedSource(token: string) {
  const source = localStorage.getItem(`share_${token}`)
  return source || null
}
