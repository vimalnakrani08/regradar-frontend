import Link from "next/link";

import { DocumentList } from "@/components/documents/DocumentList";

export default async function DocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const pageNum = Math.max(1, Number(page) || 1);

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-8 px-6 py-16">
      <header className="space-y-2">
        <div className="flex items-baseline justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">Documents</h1>
          <Link href="/" className="text-sm text-primary underline-offset-4 hover:underline">
            Ask a question →
          </Link>
        </div>
        <p className="text-muted-foreground">
          Recent U.S. Federal Register documents, most recently published first.
        </p>
      </header>

      <DocumentList page={pageNum} />
    </main>
  );
}
