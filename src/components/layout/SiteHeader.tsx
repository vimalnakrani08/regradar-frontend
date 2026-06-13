"use client";

/**
 * The shared site header: brand + primary nav (Ask / Search / Documents),
 * with the current section highlighted. Lives in the root layout so every
 * page shares one nav instead of per-page links.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Ask" },
  { href: "/search", label: "Search" },
  { href: "/documents", label: "Documents" },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-serif text-xl font-semibold tracking-tight text-foreground"
        >
          Regradar
        </Link>
        <nav className="flex gap-6 text-sm" aria-label="Primary">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "underline-offset-[6px] transition-colors",
                  active
                    ? "font-medium text-foreground underline decoration-primary decoration-2"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
