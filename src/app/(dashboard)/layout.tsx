import React from 'react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b px-6 py-4 flex items-center justify-between bg-card">
        <h1 className="font-semibold text-lg">Component Preview</h1>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
          <Link href="/settings" className="hover:text-foreground transition-colors">Settings</Link>
        </nav>
      </header>
      <main className="flex-1 bg-background p-6">
        {children}
      </main>
    </div>
  );
}
