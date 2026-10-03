export default function WorkspacePage() {
  return (
    <>
      <header className="h-14 border-b flex items-center px-4 shrink-0 bg-card">
        <div className="text-sm font-medium">Workspace (Saved)</div>
      </header>
      <main className="flex-1 flex overflow-hidden">
        <div className="w-1/2 border-r flex flex-col">
          <div className="p-4 text-sm text-muted-foreground">Editor goes here</div>
        </div>
        <div className="w-1/2 bg-muted/20 flex flex-col">
          <div className="p-4 text-sm text-muted-foreground">Preview goes here</div>
        </div>
      </main>
    </>
  );
}
