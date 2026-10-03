export interface TemplateItem {
  id: string
  name: string
  description: string
  category: string
  code: string
}

export const TEMPLATES: TemplateItem[] = [
  {
    id: 'card',
    name: 'Interactive React Card',
    description: 'Clean card with stateful like counter, tags, and animated badge.',
    category: 'Cards',
    code: `import React, { useState } from 'react';
import { Heart, Share2, Sparkles, ExternalLink } from 'lucide-react';

export default function InteractiveCard() {
  const [likes, setLikes] = useState(128);
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="max-w-sm mx-auto bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-zinc-100 shadow-2xl font-sans">
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/80">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Component Architecture
        </span>
        <button
          className="text-zinc-400 hover:text-zinc-200 transition-colors p-1"
          aria-label="Share"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <h3 className="text-lg font-semibold tracking-tight text-white mb-2">
        Stateless & Stateful Micro-UI
      </h3>
      <p className="text-sm text-zinc-400 leading-relaxed mb-6">
        Isolated sandbox environment running live TSX transforms with standard Tailwind CSS utilities and React 19 hooks.
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
        <button
          onClick={toggleLike}
          className={\`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all \${
            isLiked
              ? 'bg-rose-950/80 text-rose-300 border border-rose-800'
              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
          }\`}
        >
          <Heart className={\`w-3.5 h-3.5 \${isLiked ? 'fill-rose-400 text-rose-400' : ''}\`} />
          <span>{likes}</span>
        </button>

        <span className="text-xs font-mono text-zinc-500">CardComponent.tsx</span>
      </div>
    </div>
  );
}
`,
  },
  {
    id: 'pricing',
    name: 'Pricing Tier Table',
    description: 'Developer infrastructure pricing tier with annual toggle and feature checks.',
    category: 'Marketing',
    code: `import React, { useState } from 'react';
import { Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function PricingCard() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="max-w-md mx-auto bg-zinc-950 border border-zinc-800 rounded-2xl p-7 text-zinc-100 shadow-xl font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400">Pro Developer</span>
          <h3 className="text-2xl font-bold text-white mt-1">Infrastructure Tier</h3>
        </div>
        <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl">
          <Zap className="w-5 h-5 text-amber-400" />
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-6">
        <span className="text-4xl font-extrabold text-white tracking-tight">
          {annual ? '$24' : '$29'}
        </span>
        <span className="text-xs text-zinc-400">/ user / month</span>
      </div>

      <div className="flex items-center gap-2 p-1 bg-zinc-900 border border-zinc-800 rounded-lg mb-6 text-xs">
        <button
          onClick={() => setAnnual(false)}
          className={\`flex-1 py-1.5 rounded-md font-medium transition-colors \${!annual ? 'bg-zinc-800 text-white' : 'text-zinc-400'}\`}
        >
          Monthly billing
        </button>
        <button
          onClick={() => setAnnual(true)}
          className={\`flex-1 py-1.5 rounded-md font-medium transition-colors \${annual ? 'bg-zinc-800 text-white' : 'text-zinc-400'}\`}
        >
          Yearly (20% off)
        </button>
      </div>

      <ul className="space-y-3 text-sm text-zinc-300 mb-8">
        {[
          'Unlimited isolated sandbox execution',
          'Monaco editor with full TypeScript intellisense',
          'Private version snapshot persistence',
          'Custom shareable vanity tokens',
          'Direct component file export (.tsx)',
        ].map((feat, i) => (
          <li key={i} className="flex items-center gap-2.5">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{feat}</span>
          </li>
        ))}
      </ul>

      <button className="w-full py-2.5 px-4 bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-sm rounded-lg flex items-center justify-center gap-2 transition-colors">
        <span>Upgrade Workspace</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
`,
  },
  {
    id: 'analytics',
    name: 'Metrics & Analytics Grid',
    description: 'System metrics monitor with trends, latency stats, and status badges.',
    category: 'Dashboard',
    code: `import React, { useState } from 'react';
import { Activity, ArrowUpRight, ArrowDownRight, Clock, Server, CheckCircle2 } from 'lucide-react';

export default function AnalyticsGrid() {
  const [period, setPeriod] = useState<'24h' | '7d'>('24h');

  const stats = [
    { label: 'Sandbox Runs', val: '42,910', delta: '+14.2%', up: true },
    { label: 'Median Latency', val: '184ms', delta: '-8.1%', up: true },
    { label: 'Compile Success', val: '99.94%', delta: '+0.2%', up: true },
  ];

  return (
    <div className="max-w-lg mx-auto bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-zinc-100 font-sans shadow-2xl">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-zinc-400" />
          <h4 className="text-sm font-semibold text-white">Runtime Telemetry</h4>
        </div>
        <div className="flex gap-1 bg-zinc-950 p-1 border border-zinc-800 rounded-md text-xs">
          <button
            onClick={() => setPeriod('24h')}
            className={\`px-2 py-0.5 rounded \${period === '24h' ? 'bg-zinc-800 text-white' : 'text-zinc-400'}\`}
          >
            24h
          </button>
          <button
            onClick={() => setPeriod('7d')}
            className={\`px-2 py-0.5 rounded \${period === '7d' ? 'bg-zinc-800 text-white' : 'text-zinc-400'}\`}
          >
            7d
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-zinc-950 border border-zinc-800/80 p-3.5 rounded-lg">
            <span className="text-[11px] text-zinc-400 block mb-1">{s.label}</span>
            <div className="text-lg font-bold text-white tracking-tight">{s.val}</div>
            <div className="flex items-center gap-1 text-[11px] mt-1 text-emerald-400">
              <ArrowUpRight className="w-3 h-3" />
              <span>{s.delta}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-400 bg-zinc-950 p-3 rounded-lg border border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Active Edge Node: us-east</span>
        </div>
        <span className="font-mono text-zinc-500">v2.4.1</span>
      </div>
    </div>
  );
}
`,
  },
  {
    id: 'auth',
    name: 'Authentication Form',
    description: 'Clean developer sign-in form with validation state and clean input design.',
    category: 'Forms',
    code: `import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, GitBranch } from 'lucide-react';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-zinc-950 border border-zinc-800 rounded-xl p-6 text-zinc-100 shadow-xl font-sans">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">Welcome back</h3>
        <p className="text-xs text-zinc-400 mt-1">Sign in to sync your component workspace snapshots.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1.5">Email address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@engineer.dev"
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-600 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 outline-none transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-medium text-zinc-300">Password</label>
            <a href="#forgot" className="text-[11px] text-zinc-400 hover:text-white">Forgot?</a>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-600 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 outline-none transition-colors"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-3 bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors"
        >
          <span>{submitted ? 'Authenticated!' : 'Sign In'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-800" /></div>
        <div className="relative flex justify-center text-[10px] uppercase font-mono"><span className="bg-zinc-950 px-2 text-zinc-500">Or continue with</span></div>
      </div>

      <button className="w-full py-2 px-3 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 text-xs rounded-lg flex items-center justify-center gap-2 transition-colors">
        <GitBranch className="w-4 h-4" />
        <span>GitHub Account</span>
      </button>
    </div>
  );
}
`,
  },
]
