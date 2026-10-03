export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-8">Settings</h1>
      <div className="space-y-6">
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <h2 className="text-lg font-medium mb-2">Profile</h2>
          <p className="text-sm text-muted-foreground mb-4">Manage your profile settings.</p>
          <div className="text-sm border rounded-md p-4 bg-muted/50">Not authenticated</div>
        </div>
      </div>
    </div>
  );
}
