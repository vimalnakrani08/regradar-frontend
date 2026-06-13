/**
 * Shared chrome for every ask-result state (answer, decline, loading, error).
 *
 * Using one card frame and one band component for all states guarantees they
 * share identical size and prominence — the honest decline is never visually
 * diminished relative to a confident answer. Only the band's color, label, and
 * icon change between states, and color is reinforcement only: the uppercase
 * label and the icon each signal the state independently (for colorblind users
 * and washed-out screens).
 */

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface StatusCardProps {
  /** "status" for answers/loading, "alert" for errors — drives screen-reader urgency. */
  role: "status" | "alert";
  children: ReactNode;
}

/** The outer card frame, identical for every state. */
export function StatusCard({ role, children }: StatusCardProps) {
  return (
    <div role={role} className="overflow-hidden rounded-xl border bg-card shadow-sm">
      {children}
    </div>
  );
}

interface StatusBandProps {
  icon: LucideIcon;
  /** Rendered uppercase; must read unambiguously without color, e.g. "No information found". */
  label: string;
  /** Background + text color utility classes for the band. */
  className: string;
  iconClassName?: string;
}

/** The full-width colored header band that carries the at-a-glance signal. */
export function StatusBand({ icon: Icon, label, className, iconClassName }: StatusBandProps) {
  return (
    <div className={cn("flex items-center gap-2 px-5 py-2.5", className)}>
      <Icon className={cn("size-4 shrink-0", iconClassName)} aria-hidden />
      <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
    </div>
  );
}
