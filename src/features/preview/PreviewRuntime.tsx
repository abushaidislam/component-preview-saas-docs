'use client'

import React, { useState, useEffect, useMemo } from 'react'
import * as LucideIcons from 'lucide-react'
import {
  Moon,
  Sun,
  Terminal,
  Maximize2,
  Minimize2,
  ExternalLink,
  RefreshCw,
  Cpu,
  Layers,
  Play,
  RotateCcw,
} from 'lucide-react'
import { transform } from 'sucrase'
import { PreviewPane } from './PreviewPane'

export type PreviewStatus = 'idle' | 'compiling' | 'ready' | 'compile-error' | 'runtime-error'

interface PreviewRuntimeProps {
  code: string
  viewport?: 'desktop' | 'tablet' | 'mobile'
  refreshToggle?: boolean

  onErrorChange?: (error: string | null) => void
  onStatusChange?: (status: PreviewStatus) => void
  onLogsChange?: (logs: Array<{ id: string; type: string; message: string; timestamp: string }>) => void
}

interface ConsoleLog {
  id: string
  type: 'log' | 'warn' | 'error' | 'info'
  message: string
  timestamp: string
}

// React Error Boundary for isolating user component errors
export function PreviewRuntime({ code, viewport = "desktop", refreshToggle, onErrorChange, onStatusChange, onLogsChange }: PreviewRuntimeProps) {
  const [engine, setEngine] = useState<'direct' | 'sandpack'>('direct')
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark')
  const [activeTab, setActiveTab] = useState<'preview' | 'console'>('preview')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [runtimeError, setRuntimeError] = useState<{ code: string; message: string } | null>(null)
  const [logs, setLogs] = useState<ConsoleLog[]>([])

  useEffect(() => {
    if (onLogsChange) onLogsChange(logs)
  }, [logs, onLogsChange])
  const [renderCount, setRenderCount] = useState(0)
  const [sandpackKey, setSandpackKey] = useState(0)

  // 1. Transpile TSX to JS using Sucrase (0ms, 100% in-browser)
  const transpiled = useMemo(() => {
    try {
      const res = transform(code, {
        transforms: ['jsx', 'typescript', 'imports'],
        production: true,
      })
      return { code: res.code, error: null }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Syntax error in component'
      return { code: '', error: msg }
    }
  }, [code])

  // 2. Evaluate component directly in React memory
  const evaluated = useMemo(() => {
    if (transpiled.error || !transpiled.code) {
      return { Component: null, error: transpiled.error }
    }

    try {
      const exportsObj: Record<string, unknown> = {}
      const moduleObj = { exports: exportsObj }

      function customRequire(name: string) {
        if (name === 'react') return React
        if (name === 'react-dom' || name === 'react-dom/client') {
          return { createRoot: () => ({ render: () => {} }) }
        }
        if (name === 'lucide-react') return LucideIcons
        if (name === 'clsx') return (...args: unknown[]) => args.filter(Boolean).join(' ')
        if (name === 'tailwind-merge') {
          return { twMerge: (...args: unknown[]) => args.filter(Boolean).join(' ') }
        }
        if (name === 'class-variance-authority') {
          return { cva: () => () => '' }
        }
        return {}
      }

      // Safe evaluation
      const runner = new Function(
        'require',
        'exports',
        'module',
        'React',
        'useState',
        'useEffect',
        'useRef',
        'useMemo',
        'useCallback',
        transpiled.code
      )

      runner(
        customRequire,
        exportsObj,
        moduleObj,
        React,
        React.useState,
        React.useEffect,
        React.useRef,
        React.useMemo,
        React.useCallback
      )

      const Comp =
        moduleObj.exports.default ||
        exportsObj.default ||
        Object.values(moduleObj.exports).find((v) => typeof v === 'function') ||
        Object.values(exportsObj).find((v) => typeof v === 'function')

      if (typeof Comp === 'function') {
        return { Component: Comp as React.ComponentType, error: null }
      } else {
        return {
          Component: null,
          error:
            'No default export found. Make sure your component has: export default function YourComponent() { ... }',
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      return { Component: null, error: msg }
    }
  }, [transpiled])

  const activeRuntimeError = runtimeError?.code === code ? runtimeError.message : null
  const activeError = evaluated.error || activeRuntimeError

  // Derive status directly
  const status: PreviewStatus = evaluated.error
    ? 'compile-error'
    : activeRuntimeError
    ? 'runtime-error'
    : 'ready'

  // Notify parent of status / errors
  useEffect(() => {
    if (activeError) {
      onErrorChange?.(activeError)
      onStatusChange?.(evaluated.error ? 'compile-error' : 'runtime-error')
    } else {
      onErrorChange?.(null)
      onStatusChange?.('ready')
    }
  }, [activeError, evaluated.error, onErrorChange, onStatusChange])

  // Viewport container width calculation


  useEffect(() => {
    handleRestart()
  }, [refreshToggle])

  const handleRestart = () => {
    setRenderCount((prev) => prev + 1)
    setSandpackKey((prev) => prev + 1)
    setRuntimeError(null)
  }

  // Popout standalone window
  const handlePopout = () => {
    const popoutHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Component Standalone Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>body { margin: 0; background: ${themeMode === 'dark' ? '#09090b' : '#ffffff'}; color: ${themeMode === 'dark' ? '#f4f4f5' : '#09090b'}; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }</style>
</head>
<body>
  <div id="root">Preview rendered</div>
</body>
</html>`
    const blob = new Blob([popoutHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
  }


  return (
    <div
      className={`flex flex-col h-full w-full bg-zinc-950 select-none overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50 bg-zinc-950 p-2' : ''
      }`}
    >
      {/* Sandbox Sub-header Toolbar */}
      <div className="h-9 px-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between select-none shrink-0 w-full">
        {/* Left: Tab Switcher & Status Indicator */}
        <div className="flex items-center space-x-2.5">
          <div className="flex items-center space-x-1 border border-zinc-800 rounded p-0.5 bg-zinc-950">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-2 py-0.5 text-xs font-medium rounded transition-colors flex items-center space-x-1 ${
                activeTab === 'preview'
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Play className="w-3 h-3 text-emerald-400" />
              <span>Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('console')}
              className={`px-2 py-0.5 text-xs font-medium rounded flex items-center space-x-1 transition-colors ${
                activeTab === 'console'
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Terminal className="w-3 h-3" />
              <span>Console</span>
              {logs.length > 0 && (
                <span className="ml-1 px-1 py-0.2 rounded-full bg-zinc-800 text-[10px] text-zinc-300">
                  {logs.length}
                </span>
              )}
            </button>
          </div>

          {/* Engine Selector Toggle */}
          <div className="hidden lg:flex items-center space-x-0.5 border border-zinc-800 rounded p-0.5 bg-zinc-950">
            <button
              onClick={() => setEngine('direct')}
              className={`px-2 py-0.5 text-[10px] font-medium rounded transition-colors flex items-center space-x-1 ${
                engine === 'direct'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Direct Live React Runtime (Instant 0ms, 100% reliable)"
            >
              <Cpu className="w-3 h-3 text-amber-400" />
              <span>Live Engine</span>
            </button>
            <button
              onClick={() => setEngine('sandpack')}
              className={`px-2 py-0.5 text-[10px] font-medium rounded transition-colors flex items-center space-x-1 ${
                engine === 'sandpack'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="CodeSandbox Bundler Mode"
            >
              <Layers className="w-3 h-3" />
              <span>Sandpack</span>
            </button>
          </div>

          {/* Status Badge */}
          <div className="flex items-center space-x-1.5 text-[11px] text-zinc-400">
            <span
              className={`w-2 h-2 rounded-full ${
                status === 'ready'
                  ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]'
                  : 'bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.5)]'
              }`}
            />
            <span className="capitalize hidden sm:inline">{status.replace('-', ' ')}</span>
          </div>
        </div>

        {/* Right: Viewport Controls, Dark/Light, Fullscreen */}
        <div className="flex items-center space-x-1.5">


          <button
            onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
            className="p-1 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded transition-colors"
            title={`Toggle Canvas Mode (${themeMode === 'dark' ? 'Switch to Light' : 'Switch to Dark'})`}
          >
            {themeMode === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleRestart}
            className="p-1 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded transition-colors"
            title="Reload sandbox preview"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handlePopout}
            className="p-1 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded transition-colors"
            title="Open in new window"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Preview'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Sandbox Canvas */}
      <div className="flex-1 bg-zinc-950 flex items-center justify-center p-3 overflow-hidden relative w-full h-full">
        {activeTab === 'preview' ? (
          <PreviewPane
            code={code}
            engine={engine}
            viewport={viewport}
            themeMode={themeMode}
            activeError={activeError}
            evaluated={evaluated}
            renderCount={renderCount}
            sandpackKey={sandpackKey}
            setRuntimeError={setRuntimeError}
          />
        ) : (
          /* Live Console Tab */
          <div className="w-full h-full border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900 flex flex-col">
            <div className="h-8 px-3 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>Diagnostics Console ({logs.length} messages)</span>
              <button
                onClick={() => setLogs([])}
                className="hover:text-zinc-200 transition-colors flex items-center space-x-1"
                title="Clear console"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>
            <div className="flex-1 overflow-auto p-3 font-mono text-xs space-y-1.5 bg-zinc-950/80">
              {logs.length === 0 ? (
                <div className="text-zinc-600 italic py-4 text-center">
                  No console logs emitted yet. Use <code>console.log()</code> in your component.
                </div>
              ) : (
                logs.map((log) => (
                  <div
                    key={log.id}
                    className={`flex items-start space-x-2 py-1 px-2 rounded font-mono text-[11px] ${
                      log.type === 'error'
                        ? 'bg-rose-950/40 text-rose-300 border-l-2 border-rose-500'
                        : log.type === 'warn'
                        ? 'bg-amber-950/40 text-amber-300 border-l-2 border-amber-500'
                        : 'bg-zinc-900/60 text-zinc-300 border-l-2 border-zinc-700'
                    }`}
                  >
                    <span className="text-zinc-500 select-none text-[10px]">{log.timestamp}</span>
                    <span className="font-semibold uppercase text-[9px] px-1 rounded bg-zinc-800 text-zinc-400 select-none">
                      {log.type}
                    </span>
                    <span className="flex-1 whitespace-pre-wrap break-all">{log.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
