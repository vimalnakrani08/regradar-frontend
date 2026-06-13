import Link from "next/link";

import { AskPanel } from "@/components/ask/AskPanel";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-6 py-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Ask the Federal Register</h1>
        <p className="text-muted-foreground">
          Get grounded, cited answers about U.S. regulations — and an honest “I don’t have
          information on that” when the answer isn’t in the record. You can also{" "}
          <Link href="/search" className="text-primary underline-offset-4 hover:underline">
            search passages
          </Link>{" "}
          or{" "}
          <Link href="/documents" className="text-primary underline-offset-4 hover:underline">
            browse documents
          </Link>
          .
        </p>
      </header>
      <AskPanel />
    </main>
  );
}
