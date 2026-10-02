'use client'

import { SandpackProvider, SandpackPreview, SandpackConsole, useSandpack } from '@codesandbox/sandpack-react'
import { useState, useEffect } from 'react'
import { Monitor, Tablet, Smartphone, Moon, Sun, Terminal, AlertTriangle, RotateCcw } from 'lucide-react'

interface PreviewRuntimeProps {
  code: string
  onLogsChange?: (logs: Array<{ type: string; message: string }>) => void
  onErrorChange?: (error: string | null) => void
}

const DEFAULT_DEPENDENCIES = {
  'lucide-react': '^0.450.0',
  'clsx': '^2.1.1',
  'tailwind-merge': '^2.5.2',
  'class-variance-authority': '^0.7.0',
  'framer-motion': '^11.5.4',
}

function PreviewListener({
  onLogsChange,
  onErrorChange,
}: {
  onLogsChange?: (logs: Array<{ type: string; message: string }>) => void
  onErrorChange?: (error: string | null) => void
}) {
  const { sandpack } = useSandpack()

  useEffect(() => {
    if (onErrorChange) {
      if (sandpack.error) {
        onErrorChange(sandpack.error.message)
      } else {
        onErrorChange(null)
      }
    }
  }, [sandpack.error, onErrorChange])

  return null
}

export function PreviewRuntime({ code, onLogsChange, onErrorChange }: PreviewRuntimeProps) {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark')
  const [activeTab, setActiveTab] = useState<'preview' | 'console'>('preview')

  const files = {
    '/App.tsx': code,
    '/index.tsx': `import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
    '/styles.css': `@import "tailwindcss";

body {
  margin: 0;
  padding: 1rem;
  background-color: ${themeMode === 'dark' ? '#09090b' : '#ffffff'};
  color: ${themeMode === 'dark' ? '#f4f4f5' : '#09090b'};
  font-family: system-ui, -apple-system, sans-serif;
}`,
  }

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

  return (
    <div className="flex flex-col h-full bg-zinc-950">
      {/* Toolbar */}
      <div className="h-9 px-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between select-none">
        <div className="flex items-center space-x-1 border border-zinc-800 rounded p-0.5 bg-zinc-950">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
              activeTab === 'preview' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab('console')}
            className={`px-2 py-0.5 text-xs font-medium rounded flex items-center space-x-1 transition-colors ${
              activeTab === 'console' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Terminal className="w-3 h-3" />
            <span>Console</span>
          </button>
        </div>

        {activeTab === 'preview' && (
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-0.5 border border-zinc-800 rounded p-0.5 bg-zinc-950">
              <button
                onClick={() => setViewport('desktop')}
                className={`p-1 rounded transition-colors ${
                  viewport === 'desktop' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Desktop View"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewport('tablet')}
                className={`p-1 rounded transition-colors ${
                  viewport === 'tablet' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Tablet View"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewport('mobile')}
                className={`p-1 rounded transition-colors ${
                  viewport === 'mobile' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Mobile View"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
              className="p-1 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded transition-colors"
              title="Toggle Canvas Theme"
            >
              {themeMode === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}
      </div>

      {/* Main Canvas / Sandpack */}
      <div className="flex-1 bg-zinc-950 flex items-center justify-center p-4 overflow-hidden">
        <SandpackProvider
          template="react-ts"
          theme="dark"
          files={files}
          customSetup={{
            dependencies: DEFAULT_DEPENDENCIES,
          }}
          options={{
            recompileMode: 'delayed',
            recompileDelay: 300,
          }}
        >
          <PreviewListener onLogsChange={onLogsChange} onErrorChange={onErrorChange} />
          {activeTab === 'preview' ? (
            <div className={`h-full transition-all duration-200 border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900 shadow-xl ${getViewportWidth()}`}>
              <SandpackPreview
                showNavigator={false}
                showOpenInCodeSandbox={false}
                showRefreshButton={true}
                showRestartButton={true}
                style={{ height: '100%' }}
              />
            </div>
          ) : (
            <div className="w-full h-full border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900 p-2">
              <SandpackConsole style={{ height: '100%' }} />
            </div>
          )}
        </SandpackProvider>
      </div>
    </div>
  )
}
