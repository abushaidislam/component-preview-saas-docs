export default function PublicSharePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="max-w-2xl w-full p-8 border rounded-xl bg-card shadow-sm text-center">
        <h1 className="text-xl font-medium mb-4">Shared Component Preview</h1>
        <div className="aspect-video bg-muted rounded-md flex items-center justify-center border text-muted-foreground">
          Public sandbox runtime goes here
        </div>
      </div>
    </div>
  );
}
