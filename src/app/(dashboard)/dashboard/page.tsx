import Link from "next/link";
export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Your Components</h1>
        <Link href="/workspace/new" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
          New Component
        </Link>
      </div>
      <div className="rounded-xl border bg-card text-card-foreground shadow p-8 text-center text-muted-foreground">
        No components yet. Create one to get started.
      </div>
    </div>
  );
}
