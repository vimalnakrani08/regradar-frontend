import type { Metadata } from "next";
import Link from "next/link";

import { DocumentDetail } from "@/components/documents/DocumentDetail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ document_number: string }>;
}): Promise<Metadata> {
  const { document_number } = await params;
  return { title: document_number };
}

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ document_number: string }>;
}) {
  const { document_number } = await params;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-12">
      <Link href="/documents" className="text-sm text-primary underline-offset-4 hover:underline">
        ← All documents
      </Link>
      <DocumentDetail documentNumber={document_number} />
    </main>
  );
}
