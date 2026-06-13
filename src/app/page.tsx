import { AskPanel } from "@/components/ask/AskPanel";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-8 px-6 py-16">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Regradar</h1>
        <p className="text-muted-foreground">
          Ask a question about U.S. Federal Register regulations. Answers are grounded in retrieved
          documents and cite their sources — and the system tells you honestly when it does not have
          the information.
        </p>
      </header>
      <AskPanel />
    </main>
  );
}
