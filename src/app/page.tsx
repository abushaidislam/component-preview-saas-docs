'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Code2,
  ArrowRight,
  Sparkles,
  Terminal,
  Shield,
  Layers,
  Zap,
  Smartphone,
  ChevronRight,
  GitBranch,
  Play,
  Share2,
} from 'lucide-react'
import { TEMPLATES } from '@/lib/templates'

export default function LandingPage() {
  const [activeTemplateIdx, setActiveTemplateIdx] = useState(0)
  const currentTemplate = TEMPLATES[activeTemplateIdx]

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-zinc-800">
      {/* Top Navigation */}
      <header className="h-14 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2 text-white">
            <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-zinc-200" />
            </div>
            <span className="font-semibold text-sm tracking-tight">ComponentPreview</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-5 text-xs text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#workflow" className="hover:text-white transition-colors">
              Workflow
            </a>
            <a href="#templates" className="hover:text-white transition-colors">
              Templates
            </a>
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 rounded-lg transition-colors"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <Link
            href="/workspace"
            className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-semibold bg-zinc-100 hover:bg-white text-zinc-950 rounded-lg transition-colors shadow-xs"
          >
            <span>Open Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 max-w-5xl mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/60 text-xs text-zinc-400 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>React 19 &amp; TypeScript Sandbox Infrastructure</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white max-w-3xl leading-[1.12]">
          Write TSX, render instantly, iterate faster.
        </h1>

        <p className="mt-5 text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed">
          An isolated browser sandbox for frontend engineers. Paste or draft standalone React components with Monaco editor intelligence, real-time diagnostics, and shareable preview tokens.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Link
            href="/workspace"
            className="w-full sm:w-auto px-6 py-3 bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-sm rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg"
          >
            <Play className="w-4 h-4 fill-zinc-950" />
            <span>Launch Live Workspace</span>
          </Link>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-6 py-3 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-zinc-200 font-medium text-sm rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <span>View Saved Projects</span>
          </Link>
        </div>

        {/* Live Interactive Hero Showcase */}
        <div className="mt-14 w-full border border-zinc-800 rounded-2xl bg-zinc-900/40 p-2 shadow-2xl backdrop-blur-xs">
          <div className="h-10 px-4 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <span className="text-zinc-500 font-mono text-[11px] ml-2">sandbox://App.tsx</span>
            </div>
            <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
              {TEMPLATES.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTemplateIdx(i)}
                  className={`px-2 py-0.5 text-[11px] rounded transition-colors ${
                    activeTemplateIdx === i
                      ? 'bg-zinc-800 text-white font-medium'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {t.name}
                </button>
              ))}
              <Link
                href="/workspace"
                className="px-2 py-0.5 text-[11px] bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded transition-colors hidden sm:inline"
              >
                Launch
              </Link>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-left">
            {/* Left: Code Sneak Peek */}
            <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto max-h-[360px] leading-relaxed">
              <div className="text-zinc-500 pb-2 mb-2 border-b border-zinc-850 flex justify-between">
                <span>App.tsx (TypeScript JSX)</span>
                <span className="text-emerald-400">✓ Typechecked</span>
              </div>
              <pre className="text-zinc-300">
                {currentTemplate.code.slice(0, 520)}...
              </pre>
            </div>

            {/* Right: Render Preview */}
            <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-6 flex flex-col justify-center items-center min-h-[320px]">
              <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-zinc-100 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    {currentTemplate.name}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">180ms</span>
                </div>
                <h4 className="text-base font-semibold text-white mb-1.5">
                  {currentTemplate.name}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  {currentTemplate.description}
                </p>
                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500 font-mono">Isolated Canvas</span>
                  <Link
                    href="/workspace"
                    className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-20 border-t border-zinc-800/80 px-6 max-w-5xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
            ENGINEERING SPECIFICATION
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-2">
            Built for design engineers and frontend architects
          </h2>
          <p className="text-sm text-zinc-400 mt-2">
            Eliminates the friction of spinning up throwaway dev servers just to inspect a single component.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
            <Zap className="w-5 h-5 text-amber-400 mb-3" />
            <h3 className="text-sm font-semibold text-white">Instant Sandbox Execution</h3>
            <p className="text-xs text-zinc-400 leading-relaxed mt-1.5">
              Client-side bundler adapter compiles and executes TSX code in sub-300ms without sending your source to any remote build queue.
            </p>
          </div>

          <div className="p-5 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
            <Terminal className="w-5 h-5 text-zinc-300 mb-3" />
            <h3 className="text-sm font-semibold text-white">Monaco Code Intelligence</h3>
            <p className="text-xs text-zinc-400 leading-relaxed mt-1.5">
              Full TypeScript compiler options, automated document formatting, smart indentation, and customizable line numbers.
            </p>
          </div>

          <div className="p-5 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
            <Smartphone className="w-5 h-5 text-zinc-300 mb-3" />
            <h3 className="text-sm font-semibold text-white">Multi-Device Viewports</h3>
            <p className="text-xs text-zinc-400 leading-relaxed mt-1.5">
              Switch immediately between Desktop (100%), Tablet (768px), and Mobile (375px) presets to stress test responsive layouts.
            </p>
          </div>

          <div className="p-5 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
            <Layers className="w-5 h-5 text-zinc-300 mb-3" />
            <h3 className="text-sm font-semibold text-white">Version Snapshot System</h3>
            <p className="text-xs text-zinc-400 leading-relaxed mt-1.5">
              Save snapshots as you iterate. Inspect previous version checkpoints and restore code at any time with a single click.
            </p>
          </div>

          <div className="p-5 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
            <Shield className="w-5 h-5 text-emerald-400 mb-3" />
            <h3 className="text-sm font-semibold text-white">Sandboxed Security</h3>
            <p className="text-xs text-zinc-400 leading-relaxed mt-1.5">
              Isolated iframes enforce strict runtime boundaries. Curated allowlist includes Lucide, Tailwind, clsx, and Motion.
            </p>
          </div>

          <div className="p-5 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
            <Share2 className="w-5 h-5 text-zinc-300 mb-3" />
            <h3 className="text-sm font-semibold text-white">Shareable URL Tokens</h3>
            <p className="text-xs text-zinc-400 leading-relaxed mt-1.5">
              Generate read-only preview permalinks. Teammates can view, copy, download, or fork components straight into their own workspace.
            </p>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-20 border-t border-zinc-800/80 px-6 max-w-5xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
            HOW IT WORKS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-2">
            From raw snippet to rendered component in 4 steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              step: '01',
              title: 'Open Workspace',
              desc: 'Select a clean template or paste any standalone React TSX component into the Monaco editor.',
            },
            {
              step: '02',
              title: 'Live Compilation',
              desc: 'Changes debounce automatically and transform into an isolated React 19 iframe preview.',
            },
            {
              step: '03',
              title: 'Diagnostics',
              desc: 'Inspect stack traces, line references, and browser console messages in the collapsible bottom drawer.',
            },
            {
              step: '04',
              title: 'Persist & Share',
              desc: 'Save project snapshots, export the .tsx file, or create a public read-only share link.',
            },
          ].map((item, i) => (
            <div key={i} className="p-5 bg-zinc-950 border border-zinc-800/80 rounded-xl relative">
              <span className="text-xs font-mono font-bold text-amber-400 block mb-2">
                {item.step}
              </span>
              <h3 className="text-sm font-semibold text-white mb-1.5">{item.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Templates Showcase */}
      <section id="templates" className="py-20 border-t border-zinc-800/80 px-6 max-w-5xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
              STARTER LIBRARY
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-2">
              Explore curated component templates
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Jumpstart development with tested, accessible micro-components.
            </p>
          </div>

          <Link
            href="/workspace"
            className="mt-4 md:mt-0 inline-flex items-center space-x-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium"
          >
            <span>Open workspace with template</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              className="p-5 bg-zinc-900/40 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 bg-zinc-950 border border-zinc-800 rounded text-zinc-400 mb-2 inline-block">
                  {tmpl.category}
                </span>
                <h3 className="text-sm font-semibold text-white tracking-tight">
                  {tmpl.name}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                  {tmpl.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500 font-mono">React 19</span>
                <Link
                  href="/workspace"
                  className="text-xs font-medium text-zinc-200 hover:text-white flex items-center space-x-1"
                >
                  <span>Launch</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 border-t border-zinc-800/80 px-6 max-w-5xl mx-auto w-full text-center">
        <div className="p-8 sm:p-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Ready to inspect your next React component?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-lg leading-relaxed">
            No signup required to start experimenting. Instant sandbox preview in your browser with local persistence.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/workspace"
              className="px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Launch Component Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-800/80 py-8 px-6 bg-zinc-950 text-xs text-zinc-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Code2 className="w-4 h-4 text-zinc-400" />
            <span className="font-semibold text-zinc-300">ComponentPreview</span>
            <span>— Isolated Developer Runtime</span>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/workspace" className="hover:text-zinc-300">
              Workspace
            </Link>
            <Link href="/dashboard" className="hover:text-zinc-300">
              Dashboard
            </Link>
            <Link href="/settings" className="hover:text-zinc-300">
              Settings
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
