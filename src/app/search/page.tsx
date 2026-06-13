import type { Metadata } from "next";

import { SearchBar } from "@/components/search/SearchBar";
import { SearchResults } from "@/components/search/SearchResults";

export const metadata: Metadata = { title: "Search" };

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
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Search</h1>
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
