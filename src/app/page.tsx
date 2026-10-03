import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b px-6 py-4 flex items-center justify-between">
        <h1 className="font-bold">Component Preview</h1>
        <Link href="/dashboard" className="text-sm font-medium hover:underline">Go to Dashboard</Link>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl font-extrabold tracking-tight mb-4">Write a component. See it live. Ship the code.</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mb-8">A secure browser sandbox for testing and sharing React components.</p>
        <Link href="/workspace/new" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8">
          Start Coding
        </Link>
      </main>
    </div>
  );
}
