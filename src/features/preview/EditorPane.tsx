'use client'

import Editor, { OnMount, loader } from '@monaco-editor/react'
import { Copy, Check, FileCode, AlignLeft, RefreshCw, Code2, Edit3 } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import type { editor } from 'monaco-editor'

// Configure CDN for Monaco if user toggles to it
if (typeof window !== 'undefined') {
  loader.config({
    paths: {
      vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs',
    },
  })
}

interface EditorPaneProps {
  code: string
  onChange: (value: string) => void
  readOnly?: boolean
  onFormat?: () => void
  onReset?: () => void
}

export function EditorPane({ code, onChange, readOnly = false, onReset }: EditorPaneProps) {
  const [copied, setCopied] = useState(false)
  const [isFormatting, setIsFormatting] = useState(false)
  // Default to instant, zero-latency plain editor so user is NEVER blocked by CDN loading
  const [editorMode, setEditorMode] = useState<'plain' | 'monaco'>('plain')
  const [monacoTimedOut, setMonacoTimedOut] = useState(false)
  const [isMonacoMounted, setIsMonacoMounted] = useState(false)
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 })
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const lineNumbersRef = useRef<HTMLDivElement | null>(null)

  // Timer for Monaco if user explicitly activates Monaco mode
  useEffect(() => {
    if (editorMode === 'monaco' && !isMonacoMounted) {
      const timer = setTimeout(() => {
        if (!isMonacoMounted) {
          setMonacoTimedOut(true)
        }
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [editorMode, isMonacoMounted])

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Simple and fast code formatter
  const handleFormat = () => {
    setIsFormatting(true)
    if (editorRef.current && editorMode === 'monaco') {
      editorRef.current.getAction('editor.action.formatDocument')?.run()
    } else {
      // Basic indentation cleanup
      try {
        const lines = code.split('\n')
        let indentLevel = 0
        const formatted = lines
          .map((line) => {
            const trimmed = line.trim()
            if (!trimmed) return ''
            if (trimmed.startsWith('}') || trimmed.startsWith(']') || trimmed.startsWith('</')) {
              indentLevel = Math.max(0, indentLevel - 1)
            }
            const res = '  '.repeat(indentLevel) + trimmed
            if (
              (trimmed.endsWith('{') || trimmed.endsWith('(') || (trimmed.endsWith('>') && !trimmed.startsWith('</') && !trimmed.endsWith('/>'))) &&
              !trimmed.includes('=> { return')
            ) {
              indentLevel++
            }
            return res
          })
          .join('\n')
        onChange(formatted)
      } catch {}
    }
    setTimeout(() => setIsFormatting(false), 300)
  }

  const handleEditorMount: OnMount = (editorInstance, monaco) => {
    editorRef.current = editorInstance
    setIsMonacoMounted(true)
    setMonacoTimedOut(false)

    try {
      if (monaco?.languages?.typescript?.typescriptDefaults) {
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
          target: 99,
          allowNonTsExtensions: true,
          moduleResolution: 2,
          module: 1,
          noEmit: true,
          esModuleInterop: true,
          jsx: 4,
          reactNamespace: 'React',
          allowJs: true,
        })
      }
    } catch {}

    if (!readOnly) {
      editorInstance.focus()
    }
  }

  // Auto-focus textarea on mount or mode switch
  useEffect(() => {
    if (editorMode === 'plain' && textareaRef.current && !readOnly) {
      textareaRef.current.focus()
    }
  }, [editorMode, readOnly])

  const lineCount = (code.match(/\n/g) || []).length + 1

  // Synchronize scroll between line numbers column and textarea
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop
    }
  }

  // Update cursor position tracking
  const updateCursorPosition = (target: HTMLTextAreaElement) => {
    const textBefore = target.value.substring(0, target.selectionStart)
    const lines = textBefore.split('\n')
    const currentLine = lines.length
    const currentCol = lines[lines.length - 1].length + 1
    setCursorPos({ line: currentLine, col: currentCol })
  }

  // Handle Tab key in plain textarea
  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const target = e.currentTarget
      const start = target.selectionStart
      const end = target.selectionEnd
      const newCode = code.substring(0, start) + '  ' + code.substring(end)
      onChange(newCode)
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2
        updateCursorPosition(target)
      }, 0)
    }
  }

  return (
    <div className="flex flex-col h-full w-full flex-1 bg-zinc-950 overflow-hidden select-none">
      {/* Editor Sub-header */}
      <div className="h-9 px-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between select-none shrink-0 w-full">
        <div className="flex items-center space-x-2">
          <FileCode className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-mono text-zinc-300">App.tsx</span>
          <span className="text-[11px] text-zinc-500 font-mono">
            ({lineCount} lines)
          </span>
        </div>

        <div className="flex items-center space-x-1.5">
          {/* Editor Mode Selector */}
          <div className="flex items-center space-x-0.5 border border-zinc-800 rounded p-0.5 bg-zinc-950">
            <button
              onClick={() => setEditorMode('plain')}
              className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors flex items-center space-x-1 ${
                editorMode === 'plain'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Instant Local Code Editor (0ms load time, 100% reliable)"
            >
              <Edit3 className="w-3 h-3 text-amber-400" />
              <span>Instant Editor</span>
            </button>
            <button
              onClick={() => setEditorMode('monaco')}
              className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors flex items-center space-x-1 ${
                editorMode === 'monaco'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Monaco IDE Mode (IntelliSense)"
            >
              <Code2 className="w-3 h-3" />
              <span>Monaco</span>
            </button>
          </div>

          {!readOnly && (
            <>
              <button
                onClick={handleFormat}
                disabled={isFormatting}
                className="flex items-center space-x-1 px-2 py-0.5 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded transition-colors"
                title="Format document"
              >
                <AlignLeft className="w-3.5 h-3.5" />
                <span>Format</span>
              </button>
              {onReset && (
                <button
                  onClick={onReset}
                  className="flex items-center space-x-1 px-2 py-0.5 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded transition-colors"
                  title="Reset to starter"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-2 py-0.5 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded transition-colors"
            title="Copy TSX code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Editor Content Area - Stretches 100% of the pane */}
      <div
        className="flex-1 w-full h-full overflow-hidden relative cursor-text select-text"
        onClick={() => {
          if (!readOnly) {
            if (editorMode === 'monaco') editorRef.current?.focus()
            else textareaRef.current?.focus()
          }
        }}
      >
        {editorMode === 'plain' ? (
          <div className="h-full w-full flex bg-zinc-950 font-mono text-xs overflow-hidden relative">
            {/* Line Numbers Column */}
            <div
              ref={lineNumbersRef}
              className="w-12 bg-zinc-900/70 border-r border-zinc-800/80 text-zinc-600 select-none py-3 text-right pr-2.5 font-mono text-xs overflow-hidden shrink-0"
            >
              {Array.from({ length: lineCount }).map((_, i) => {
                const isCurrentLine = cursorPos.line === i + 1
                return (
                  <div
                    key={i}
                    className={`leading-5 font-mono text-[11px] transition-colors ${
                      isCurrentLine ? 'text-amber-400 font-semibold' : 'text-zinc-600'
                    }`}
                  >
                    {i + 1}
                  </div>
                )
              })}
            </div>

            {/* Instant Code Textarea */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => {
                onChange(e.target.value)
                updateCursorPosition(e.target)
              }}
              onKeyUp={(e) => updateCursorPosition(e.currentTarget)}
              onClick={(e) => updateCursorPosition(e.currentTarget)}
              onScroll={handleScroll}
              onKeyDown={handleTextareaKeyDown}
              readOnly={readOnly}
              placeholder="Paste or write your React component TSX here..."
              className="flex-1 w-full h-full bg-transparent text-zinc-100 p-3 outline-none resize-none leading-5 font-mono text-xs selection:bg-zinc-800 whitespace-pre overflow-auto border-none focus:ring-0"
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
            />

            {/* Bottom Status Indicator */}
            <div className="absolute bottom-2 right-4 pointer-events-none select-none px-2 py-0.5 rounded bg-zinc-900/90 border border-zinc-800 text-[10px] font-mono text-zinc-500 flex items-center space-x-2">
              <span>Ln {cursorPos.line}, Col {cursorPos.col}</span>
              <span>•</span>
              <span className="text-emerald-400 font-medium">Ready</span>
            </div>
          </div>
        ) : (
          <Editor
            height="100%"
            width="100%"
            language="typescript"
            value={code}
            onChange={(val) => onChange(val || '')}
            onMount={handleEditorMount}
            theme="vs-dark"
            loading={
              <div className="flex flex-col items-center justify-center h-full text-zinc-400 text-xs font-mono p-6 text-center select-none">
                <span className="w-5 h-5 border-2 border-zinc-700 border-t-amber-400 rounded-full animate-spin mb-3" />
                <span className="text-zinc-300 font-medium">Initializing Monaco Editor...</span>
                {monacoTimedOut && (
                  <div className="mt-3 flex flex-col items-center">
                    <span className="text-[11px] text-zinc-500 mb-2">
                      External CDN is blocked or slow in this environment.
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setEditorMode('plain')
                      }}
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded text-xs transition-colors border border-zinc-700 font-sans font-medium flex items-center space-x-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Switch to Instant Editor</span>
                    </button>
                  </div>
                )}
              </div>
            }
            options={{
              fontSize: 13,
              fontFamily: 'var(--font-geist-mono), JetBrains Mono, Menlo, Monaco, Consolas, monospace',
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              smoothScrolling: true,
              padding: { top: 12, bottom: 12 },
              lineNumbersMinChars: 3,
              readOnly,
              tabSize: 2,
              wordWrap: 'on',
              automaticLayout: true,
              cursorBlinking: 'blink',
              cursorSmoothCaretAnimation: 'on',
              lineNumbers: 'on',
              renderLineHighlight: 'all',
              selectOnLineNumbers: true,
            }}
          />
        )}
      </div>
    </div>
  )
}
