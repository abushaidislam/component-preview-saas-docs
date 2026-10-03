import Link from 'next/link'
import { Code2, Play, Share2, Layers, GitBranch } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-zinc-800 selection:text-white">
      {/* Navigation */}
      <header className="h-16 border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2 text-white transition-colors">
            <Code2 className="w-5 h-5 text-white" />
            <span className="font-semibold text-sm tracking-tight">ComponentPreview</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-zinc-400">
            <Link href="#product" className="hover:text-white transition-colors">Product</Link>
            <Link href="#docs" className="hover:text-white transition-colors">Docs</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4 text-sm font-medium">
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="hidden sm:flex text-zinc-400 hover:text-white transition-colors">
            <GitBranch className="w-4 h-4" />
          </Link>
          <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">
            Sign in
          </Link>
          <Link
            href="/workspace/new"
            className="px-3 py-1.5 bg-zinc-100 hover:bg-white text-zinc-950 rounded transition-colors"
          >
            Get started
          </Link>
        </div>
      </header>

      <main className="flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full max-w-6xl mx-auto px-6 pt-32 pb-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
            Write components.<br />
            <span className="text-zinc-400">See them live.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            A secure browser-based playground for React. Paste your TSX, instantly preview the rendered UI, and share the result without setting up a project.
          </p>
          <div className="flex items-center justify-center space-x-4 mb-20">
            <Link
              href="/workspace/new"
              className="px-6 py-3 bg-zinc-100 hover:bg-white text-zinc-950 font-medium rounded-lg transition-colors flex items-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Start building</span>
            </Link>
            <Link
              href="#docs"
              className="px-6 py-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 text-zinc-300 font-medium rounded-lg transition-colors"
            >
              View docs
            </Link>
          </div>

          {/* Product Demo Mockup */}
          <div className="relative mx-auto rounded-xl border border-zinc-800 bg-zinc-900/50 shadow-2xl overflow-hidden aspect-video max-w-5xl">
            <div className="absolute inset-0 flex">
              {/* Fake Editor */}
              <div className="w-1/2 h-full border-r border-zinc-800 bg-zinc-950 p-6 flex flex-col">
                <div className="flex items-center space-x-2 mb-4 border-b border-zinc-800 pb-4">
                  <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                  <span className="text-xs text-zinc-500 font-mono ml-2">App.tsx</span>
                </div>
                <div className="font-mono text-sm text-zinc-400 leading-relaxed text-left opacity-70">
                  <span className="text-rose-400">import</span> React <span className="text-rose-400">from</span> <span className="text-emerald-400">&apos;react&apos;</span>;<br /><br />
                  <span className="text-rose-400">export default function</span> <span className="text-amber-200">Button</span>() {'{'}<br />
                  &nbsp;&nbsp;<span className="text-rose-400">return</span> (<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-blue-400">button</span> <span className="text-purple-400">className</span>=<span className="text-emerald-400">&quot;px-4 py-2 bg-blue-500 text-white rounded&quot;</span>&gt;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Click me<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-blue-400">button</span>&gt;<br />
                  &nbsp;&nbsp;);<br />
                  {'}'}
                </div>
              </div>
              {/* Fake Preview */}
              <div className="w-1/2 h-full bg-white flex items-center justify-center p-6 relative">
                 <div className="absolute top-4 right-4 flex space-x-2">
                    <div className="px-2 py-1 bg-zinc-100 text-zinc-500 text-[10px] rounded uppercase font-bold tracking-wider">Preview</div>
                 </div>
                 <button className="px-5 py-2.5 bg-blue-500 text-white font-medium rounded-md shadow-sm hover:bg-blue-600 transition-colors">
                   Click me
                 </button>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Split Section */}
        <section className="w-full max-w-6xl mx-auto px-6 py-24 border-t border-zinc-900">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">From TSX to working UI in seconds</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">No local environment needed. The browser does the heavy lifting.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
              <div className="w-10 h-10 rounded bg-zinc-800 flex items-center justify-center mb-4">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Instant compilation</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Type or paste React code. Our browser runtime compiles and renders it instantly in an isolated iframe.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
              <div className="w-10 h-10 rounded bg-zinc-800 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Tailwind built-in</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Use utility classes immediately. Tailwind CSS is pre-configured so you can focus on design.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
              <div className="w-10 h-10 rounded bg-zinc-800 flex items-center justify-center mb-4">
                <Share2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Share anywhere</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Generate a unique link to share your live component with teammates, designers, or clients.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full max-w-4xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-6">Ready to start building?</h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Join thousands of developers prototyping components faster than ever. Free for personal use.
          </p>
          <Link
            href="/workspace/new"
            className="px-8 py-4 bg-white hover:bg-zinc-200 text-zinc-950 font-medium rounded-lg transition-colors inline-block"
          >
            Open Creator Workspace
          </Link>
        </section>
      </main>

      <footer className="w-full border-t border-zinc-900 py-8 text-center mt-auto">
        <p className="text-sm text-zinc-600">
          &copy; {new Date().getFullYear()} Component Preview. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
