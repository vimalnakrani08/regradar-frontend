"use client";

/**
 * Drives semantic search via the URL: submitting navigates to /search?q=...
 * so results are shareable, bookmarkable, and work with back/forward. The
 * input is keyed by the current query upstream, so back/forward also resets
 * the field to match the URL.
 */

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MIN_LENGTH = 3;

export function SearchBar({ defaultQuery = "" }: { defaultQuery?: string }) {
  const router = useRouter();
  const [value, setValue] = useState(defaultQuery);
  const canSubmit = value.trim().length >= MIN_LENGTH;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    router.push(`/search?q=${encodeURIComponent(value.trim())}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search regulations by meaning…"
        aria-label="Search query"
      />
      <Button type="submit" disabled={!canSubmit}>
        Search
      </Button>
    </form>
  );
}
