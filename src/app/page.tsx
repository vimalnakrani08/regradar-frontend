import Link from "next/link";

import { AskPanel } from "@/components/ask/AskPanel";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-16">
      <header className="space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Federal Register Intelligence
        </p>
        <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
          Regulatory clarity,
          <br className="hidden sm:block" /> grounded in the record.
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
          Ask questions about U.S. federal regulations and get answers grounded in retrieved
          documents, with citations — and an honest “I don’t have information on that” when the
          record doesn’t cover it.
        </p>
      </header>

      <AskPanel />

      <p className="border-t border-border pt-6 text-sm text-muted-foreground">
        Or{" "}
        <Link href="/search" className="text-primary underline-offset-4 hover:underline">
          search passages
        </Link>{" "}
        and{" "}
        <Link href="/documents" className="text-primary underline-offset-4 hover:underline">
          browse documents
        </Link>
        .
      </p>
    </main>
  );
}
