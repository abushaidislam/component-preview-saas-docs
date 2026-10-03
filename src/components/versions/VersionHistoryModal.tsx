'use client'

import { X, History, RotateCcw, Clock } from 'lucide-react'
import { VersionSnapshot } from '@/features/projects/projectService'

interface VersionHistoryModalProps {
  isOpen: boolean
  onClose: () => void
  versions: VersionSnapshot[]
  currentVersion?: number
  onRestore: (version: VersionSnapshot) => void
}

export function VersionHistoryModal({
  isOpen,
  onClose,
  versions,
  currentVersion,
  onRestore,
}: VersionHistoryModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="h-12 px-4 border-b border-zinc-800 flex items-center justify-between select-none">
          <div className="flex items-center space-x-2">
            <History className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-semibold text-white tracking-tight">Version Snapshots</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1">
          {versions.length === 0 ? (
            <div className="py-8 text-center text-xs text-zinc-500">
              No previous version snapshots saved for this session yet.
            </div>
          ) : (
            versions.map((ver) => {
              const isCurrent = currentVersion === ver.version_number
              return (
                <div
                  key={ver.id}
                  className={`p-3 rounded-lg border transition-all flex items-center justify-between ${
                    isCurrent
                      ? 'bg-zinc-850 border-zinc-700'
                      : 'bg-zinc-950 border-zinc-800/80 hover:border-zinc-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold text-white">
                        v{ver.version_number}
                      </span>
                      {isCurrent && (
                        <span className="px-1.5 py-0.2 bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] rounded font-medium">
                          Active
                        </span>
                      )}
                      <span className="text-xs text-zinc-300 font-medium">
                        {ver.note || `Snapshot #${ver.version_number}`}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-[11px] text-zinc-500 font-mono">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(ver.created_at).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        onRestore(ver)
                        onClose()
                      }}
                      className="flex items-center space-x-1 px-2.5 py-1 text-xs font-medium rounded border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white transition-colors"
                      title="Restore code from this snapshot"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Restore</span>
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer */}
        <div className="h-10 px-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500">
          <span>Snapshots preserve TSX code before experimental modifications.</span>
          <button onClick={onClose} className="hover:text-zinc-300">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
