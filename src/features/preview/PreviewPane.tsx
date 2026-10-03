import React, { useMemo } from 'react'
import { SandpackProvider, SandpackPreview } from '@codesandbox/sandpack-react'
import { AlertTriangle } from 'lucide-react'
import { PreviewErrorBoundary } from './PreviewErrorBoundary'

export function PreviewPane({
  code,
  engine,
  viewport,
  themeMode,
  activeError,
  evaluated,
  renderCount,
  sandpackKey,
  setRuntimeError,
}: { code: string; engine: "direct" | "sandpack"; viewport: "desktop" | "tablet" | "mobile"; themeMode: "dark" | "light"; activeError: string | null; evaluated: { Component: React.ComponentType | null; error: string | null }; renderCount: number; sandpackKey: number; setRuntimeError: (err: { code: string; message: string } | null) => void }) {
  const LiveComponent = evaluated.Component
  const getViewportWidth = () => {
    switch (viewport) {
      case 'mobile':
        return 'w-[375px]'
      case 'tablet':
        return 'w-[768px]'
      case 'desktop':
      default:
        return 'w-full'
    }
  }

  const sandpackFiles = useMemo(
    () => ({
      '/App.tsx': code,
    }),
    [code]
  )

  return (
<div
            className={`h-full transition-all duration-150 border border-zinc-800 rounded-lg overflow-auto shadow-2xl flex flex-col items-center justify-center p-6 relative ${
              themeMode === 'dark' ? 'bg-zinc-950 text-zinc-100' : 'bg-white text-zinc-900'
            } ${getViewportWidth()}`}
          >
            {/* Compile or Runtime Error Banner */}
            {activeError && (
              <div className="absolute top-3 left-3 right-3 z-30 bg-rose-950/90 border border-rose-800 text-rose-200 text-xs p-3 rounded-lg shadow-xl backdrop-blur-sm flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="flex-1 overflow-hidden">
                  <div className="font-semibold text-rose-100">
                    {evaluated.error ? 'Compilation Error' : 'Runtime Exception'}
                  </div>
                  <pre className="mt-1 font-mono text-[11px] whitespace-pre-wrap overflow-auto max-h-28 text-rose-300">
                    {activeError}
                  </pre>
                </div>
              </div>
            )}

            {/* Direct In-Memory React Runtime (Default Engine) */}
            {engine === 'direct' ? (
              <PreviewErrorBoundary
                key={`${renderCount}_${code.length}`}
                resetKey={code}
                onError={(err) => setRuntimeError({ code, message: err.message })}
              >
                {LiveComponent ? (
                  <div className="w-full flex items-center justify-center">
                    <LiveComponent />
                  </div>
                ) : (
                  <div className="text-zinc-500 text-xs font-mono text-center">
                    Waiting for valid component export...
                  </div>
                )}
              </PreviewErrorBoundary>
            ) : (
              /* CodeSandbox Bundler Engine */
              <div className="w-full h-full overflow-hidden">
                <SandpackProvider
                  key={sandpackKey}
                  template="react-ts"
                  theme="dark"
                  files={sandpackFiles}
                  customSetup={{
                    dependencies: {
                      'lucide-react': '^1.51.0',
                      'clsx': '^2.1.1',
                      'tailwind-merge': '^3.7.0',
                      'class-variance-authority': '^0.7.1',
                    },
                  }}
                  options={{
                    recompileMode: 'delayed',
                    recompileDelay: 300,
                  }}
                >
                  <SandpackPreview
                    showNavigator={false}
                    showOpenInCodeSandbox={false}
                    showRefreshButton={true}
                    showRestartButton={true}
                    style={{ height: '100%', width: '100%' }}
                  />
                </SandpackProvider>
              </div>
            )}
          </div>
  )
}
