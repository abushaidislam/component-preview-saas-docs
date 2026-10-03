import React from 'react';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  // Minimal full-screen layout for the editor
  return (
    <div className="h-screen w-screen overflow-hidden bg-background text-foreground flex flex-col">
      {children}
    </div>
  );
}
