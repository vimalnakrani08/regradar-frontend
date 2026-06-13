import type { Metadata } from "next";

import { DocumentList } from "@/components/documents/DocumentList";

export const metadata: Metadata = { title: "Documents" };

export default async function DocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const pageNum = Math.max(1, Number(page) || 1);

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Documents</h1>
        <p className="text-muted-foreground">
          Recent U.S. Federal Register documents, most recently published first.
        </p>
      </header>

      <DocumentList page={pageNum} />
    </main>
  );
}
