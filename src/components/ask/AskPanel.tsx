"use client";

/**
 * The ask interface: question input + the result lifecycle.
 *
 * Owns an explicit state machine (idle → loading → answered | error) so each
 * state renders exactly one card. ApiError is caught as a typed value and
 * mapped to the red error state; everything else degrades to a generic
 * internal_error rather than leaking.
 */

import { type FormEvent, useState } from "react";

import { AnswerCard } from "@/components/answer/AnswerCard";
import { ErrorCard } from "@/components/answer/ErrorCard";
import { LoadingCard } from "@/components/answer/LoadingCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ApiError, ask } from "@/lib/api/client";
import type { AskResponse } from "@/lib/api/types";

const MIN_LENGTH = 3;
const MAX_LENGTH = 1000;

type AskState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "answered"; data: AskResponse }
  | { status: "error"; code: string; message: string };

export function AskPanel() {
  const [question, setQuestion] = useState("");
  const [state, setState] = useState<AskState>({ status: "idle" });

  const trimmed = question.trim();
  const isLoading = state.status === "loading";
  const canSubmit = trimmed.length >= MIN_LENGTH && !isLoading;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    setState({ status: "loading" });
    try {
      const data = await ask(trimmed);
      setState({ status: "answered", data });
    } catch (error) {
      if (error instanceof ApiError) {
        setState({ status: "error", code: error.code, message: error.message });
      } else {
        setState({
          status: "error",
          code: "internal_error",
          message: "An unexpected error occurred.",
        });
      }
    }
  }

  return (
    <section className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-3">
        <Textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          maxLength={MAX_LENGTH}
          rows={3}
          placeholder="e.g. What are the public comment deadlines for recent rules?"
          aria-label="Your question"
          disabled={isLoading}
        />
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground">
            {trimmed.length < MIN_LENGTH
              ? `Enter at least ${MIN_LENGTH} characters`
              : `${question.length}/${MAX_LENGTH}`}
          </span>
          <Button type="submit" disabled={!canSubmit}>
            {isLoading ? "Asking…" : "Ask"}
          </Button>
        </div>
      </form>

      <div aria-live="polite">
        {state.status === "loading" ? <LoadingCard /> : null}
        {state.status === "answered" ? <AnswerCard answer={state.data} /> : null}
        {state.status === "error" ? <ErrorCard code={state.code} message={state.message} /> : null}
      </div>
    </section>
  );
}
