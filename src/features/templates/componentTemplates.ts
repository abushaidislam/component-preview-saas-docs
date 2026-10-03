export interface ComponentTemplate {
  id: string
  name: string
  description: string
  category: string
  files: {
    'component.tsx': string
    'index.css'?: string
    'default.tsx'?: string
  }
  dependencies: Record<string, string>
}

export const CANCEL_PLAN_MODAL_CODE = `import React, { useState } from 'react';
import { X, Car, Folder, Info } from 'lucide-react';

export default function CancelPlanModal() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <div className="flex items-center justify-center p-8">
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Open Cancel Plan Modal
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 z-50">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-zinc-100 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Cancel the Team Plan?
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-zinc-400 hover:text-zinc-200 p-1 rounded-md hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-zinc-400 leading-relaxed mb-5">
          Your billing will pause immediately and expire at the current period's end.
        </p>

        {/* Consequences List */}
        <div className="space-y-3 mb-5">
          <div className="flex items-center gap-3 text-xs text-zinc-300">
            <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 shrink-0">
              <Car className="w-4 h-4" />
            </div>
            <span>
              <strong className="text-white font-semibold">4 Team Seats</strong> will be unassigned.
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-zinc-300">
            <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 shrink-0">
              <Folder className="w-4 h-4" />
            </div>
            <span>
              <strong className="text-white font-semibold">2 Production Projects</strong> will be set to read-only.
            </span>
          </div>
        </div>

        {/* Read-Only Access Banner */}
        <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-3.5 mb-6">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-white">Read-Only Access</span>
            <span className="flex items-center gap-1 text-[11px] text-zinc-400">
              <Info className="w-3.5 h-3.5" />
              <span>Info</span>
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Project modifications will be disabled, but all historical data will remain viewable. For full editing, a new plan must be started.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2.5">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
          >
            Keep Plan
          </button>
          <button
            onClick={() => {
              alert('Plan cancelled (Preview Action)');
              setIsOpen(false);
            }}
            className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-lg text-xs font-semibold transition-all shadow-lg shadow-orange-950/40"
          >
            Cancel Plan
          </button>
        </div>
      </div>
    </div>
  );
}
`;

export const DEFAULT_DEMO_CODE = `import React from 'react';
import Component from './component';

export default function Demo() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-zinc-950 text-zinc-100 font-sans">
      <Component />
    </div>
  );
}
`;

export const DEFAULT_CSS_CODE = `@import "tailwindcss";

body {
  margin: 0;
  padding: 0;
  font-family: system-ui, -apple-system, sans-serif;
  background-color: #09090b;
  color: #f4f4f5;
}
`;

export const COMPONENT_TEMPLATES: ComponentTemplate[] = [
  {
    id: 'cancel-team-plan',
    name: 'Cancel Team Plan Modal',
    description: 'The 21st-style confirmation dialog with consequence list and read-only banner',
    category: 'Modals & Dialogs',
    files: {
      'component.tsx': CANCEL_PLAN_MODAL_CODE,
      'default.tsx': DEFAULT_DEMO_CODE,
      'index.css': DEFAULT_CSS_CODE,
    },
    dependencies: {
      'lucide-react': '^0.450.0',
    },
  },
  {
    id: 'interactive-card',
    name: 'Interactive React Card',
    description: 'A clean card with interactive like counter and status pills',
    category: 'Cards',
    files: {
      'component.tsx': `import React, { useState } from 'react';
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

        <span className="text-xs text-zinc-500 font-mono">component.tsx</span>
      </div>
    </div>
  );
}
`,
      'default.tsx': DEFAULT_DEMO_CODE,
      'index.css': DEFAULT_CSS_CODE,
    },
    dependencies: {
      'lucide-react': '^0.450.0',
    },
  },
  {
    id: 'developer-dock',
    name: 'Floating Action Dock',
    description: 'Floating bottom navigation bar with smooth micro-interactions',
    category: 'Navigation',
    files: {
      'component.tsx': `import React, { useState } from 'react';
import { Home, Search, Bell, Settings, Terminal, Shield } from 'lucide-react';

export default function FloatingDock() {
  const [active, setActive] = useState('home');

  const items = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'terminal', icon: Terminal, label: 'Terminal' },
    { id: 'alerts', icon: Bell, label: 'Alerts' },
    { id: 'security', icon: Shield, label: 'Security' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex items-center gap-1.5 p-2 bg-zinc-900/90 border border-zinc-800 rounded-2xl shadow-2xl backdrop-blur-md">
      {items.map(({ id, icon: Icon, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => setActive(id)}
            title={label}
            className={\`p-2.5 rounded-xl transition-all relative group \${
              isActive
                ? 'bg-white text-zinc-950 shadow-md scale-105'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60'
            }\`}
          >
            <Icon className="w-4 h-4" />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-zinc-800 text-zinc-200 text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-zinc-700">
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
`,
      'default.tsx': DEFAULT_DEMO_CODE,
      'index.css': DEFAULT_CSS_CODE,
    },
    dependencies: {
      'lucide-react': '^0.450.0',
    },
  },
  {
    id: 'blank-component',
    name: 'Blank Component',
    description: 'Empty starter canvas to paste custom React TSX code',
    category: 'Starter',
    files: {
      'component.tsx': `import React from 'react';

export default function CustomComponent() {
  return (
    <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-xl text-center max-w-md mx-auto">
      <h2 className="text-xl font-bold text-white mb-2">Paste Your Component Here</h2>
      <p className="text-xs text-zinc-400 mb-4">
        Replace this code with any React TSX component from 21st.dev, shadcn/ui, or your own project.
      </p>
      <div className="p-3 bg-zinc-950 rounded-lg text-xs font-mono text-zinc-500 border border-zinc-800">
        export default function Component() { ... }
      </div>
    </div>
  );
}
`,
      'default.tsx': DEFAULT_DEMO_CODE,
      'index.css': DEFAULT_CSS_CODE,
    },
    dependencies: {
      'lucide-react': '^0.450.0',
    },
  },
]
