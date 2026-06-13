import Link from "next/link";

import { DocumentDetail } from "@/components/documents/DocumentDetail";

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ document_number: string }>;
}) {
  const { document_number } = await params;

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-8 px-6 py-16">
      <Link href="/documents" className="text-sm text-primary underline-offset-4 hover:underline">
        ← All documents
      </Link>
      <DocumentDetail documentNumber={document_number} />
    </main>
  );
}
