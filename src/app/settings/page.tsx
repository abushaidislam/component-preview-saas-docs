import { Navbar } from '@/components/layout/Navbar'
import { User, Settings as SettingsIcon, AlertTriangle, CreditCard, Key } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <Navbar title="Settings" />
      <main className="flex-1 flex max-w-5xl mx-auto w-full">
        {/* Sidebar */}
        <aside className="w-64 border-r border-zinc-900 py-8 pr-8">
          <h2 className="text-sm font-semibold text-zinc-400 mb-4 px-3 uppercase tracking-wider">Account</h2>
          <nav className="space-y-1">
            <a href="#" className="flex items-center space-x-2 px-3 py-2 text-sm bg-zinc-900 text-white rounded-md font-medium">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </a>
            <a href="#" className="flex items-center space-x-2 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-md transition-colors">
              <SettingsIcon className="w-4 h-4" />
              <span>Workspace</span>
            </a>
            <a href="#" className="flex items-center space-x-2 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-md transition-colors">
              <CreditCard className="w-4 h-4" />
              <span>Billing</span>
            </a>
            <a href="#" className="flex items-center space-x-2 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-md transition-colors">
              <Key className="w-4 h-4" />
              <span>API Keys</span>
            </a>
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 py-8 pl-8">
          <div className="max-w-2xl">
            <h1 className="text-2xl font-bold text-white mb-8">Profile Settings</h1>

            <section className="mb-10">
              <h3 className="text-lg font-medium text-white mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Name</label>
                  <input
                    type="text"
                    defaultValue="Developer"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Email</label>
                  <input
                    type="email"
                    defaultValue="developer@example.com"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700"
                  />
                </div>
                <div className="pt-2">
                  <button className="px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-950 text-sm font-medium rounded-md transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </section>

            <section className="mb-10 border-t border-zinc-900 pt-10">
              <h3 className="text-lg font-medium text-white mb-4">Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-white">Dark Mode Preview</h4>
                    <p className="text-xs text-zinc-400 mt-1">Render previews in dark mode by default.</p>
                  </div>
                  <button className="relative inline-flex h-5 w-9 items-center rounded-full bg-blue-500">
                    <span className="translate-x-4 inline-block h-4 w-4 rounded-full bg-white transition" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-white">Auto-save Drafts</h4>
                    <p className="text-xs text-zinc-400 mt-1">Automatically save local drafts as you type.</p>
                  </div>
                  <button className="relative inline-flex h-5 w-9 items-center rounded-full bg-blue-500">
                    <span className="translate-x-4 inline-block h-4 w-4 rounded-full bg-white transition" />
                  </button>
                </div>
              </div>
            </section>

            <section className="border-t border-zinc-900 pt-10">
              <div className="flex items-center space-x-2 text-rose-500 mb-4">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-lg font-medium">Danger Zone</h3>
              </div>
              <div className="p-4 border border-rose-900/50 bg-rose-950/10 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-white">Delete Account</h4>
                    <p className="text-xs text-zinc-500 mt-1">Permanently remove your account and all projects.</p>
                  </div>
                  <button className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium rounded-md transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
