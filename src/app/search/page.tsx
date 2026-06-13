import Link from "next/link";

import { SearchBar } from "@/components/search/SearchBar";
import { SearchResults } from "@/components/search/SearchResults";

const MIN_QUERY = 3;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const hasQuery = query.length >= MIN_QUERY;

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-8 px-6 py-16">
      <header className="space-y-2">
        <div className="flex items-baseline justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">Search</h1>
          <Link href="/" className="text-sm text-primary underline-offset-4 hover:underline">
            Ask a question →
          </Link>
        </div>
        <p className="text-muted-foreground">
          Find Federal Register passages by meaning, not just keywords.
        </p>
      </header>

      {/* key={query} resets the field to match the URL on back/forward. */}
      <SearchBar key={query} defaultQuery={q ?? ""} />

      {hasQuery ? (
        <SearchResults query={query} />
      ) : (
        <p className="text-sm text-muted-foreground">
          Enter at least {MIN_QUERY} characters above to see matching passages.
        </p>
      )}
    </main>
  );
}
