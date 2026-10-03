'use client'

import { use } from 'react'
import { WorkspaceView } from '@/components/workspace/WorkspaceView'

export default function ProjectWorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  return <WorkspaceView initialProjectId={id} />
}
