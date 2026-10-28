"use client";

import { useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Leaf,
  LoaderCircle,
  RotateCcw,
} from "lucide-react";
import { answerFromProfile } from "@/lib/profile";

type Answer = {
  answer: string;
  href?: string;
  linkLabel?: string;
  source: "profile" | "ai";
};

export function ProfileGuide({ aiAvailable }: { aiAvailable: boolean }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [asked, setAsked] = useState("");
  const [cloud, setCloud] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const inFlight = useRef(false);

  async function ask(value: string) {
    const text = value.trim();
    if (!text || inFlight.current) return;
    setError("");
    setAsked(text);
    setQuestion(text);
    if (!cloud) {
      setAnswer({ ...answerFromProfile(text), source: "profile" });
      return;
    }
    inFlight.current = true;
    setPending(true);
    setAnswer(null);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          consent: true,
          messages: [{ role: "user", content: text }],
        }),
        signal: AbortSignal.timeout(20000),
      });
      const data = await response.json();
      if (!response.ok || typeof data.reply !== "string")
        throw new Error("unavailable");
      setAnswer({ answer: data.reply, source: "ai" });
    } catch {
      setError(
        "The AI assistant couldn’t connect. Here’s an answer from my published profile instead.",
      );
      setAnswer({ ...answerFromProfile(text), source: "profile" });
    } finally {
      setPending(false);
      inFlight.current = false;
    }
  }

  return (
    <section
      id="ask"
      className="guide scroll-mt-8"
      aria-labelledby="guide-title"
    >
      <div className="flex items-center gap-2.5 text-sm font-medium">
        <Leaf size={16} aria-hidden="true" />
        <h2 id="guide-title">Make yourself at home. Ask a question.</h2>
      </div>
      <form
        className="question-form"
        onSubmit={(event) => {
          event.preventDefault();
          void ask(question);
        }}
      >
        <label htmlFor="question" className="sr-only">
          Your question about Laura’s work
        </label>
        <input
          ref={input}
          id="question"
          name="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What are you building, Laura?"
          maxLength={600}
          autoComplete="off"
          disabled={pending}
        />
        <button
          type="submit"
          className="ask-button"
          disabled={pending || !question.trim()}
          aria-label="Ask about Laura’s work"
        >
          {pending ? (
            <LoaderCircle
              size={19}
              className="motion-safe:animate-spin"
              aria-hidden="true"
            />
          ) : (
            <ArrowRight size={20} aria-hidden="true" />
          )}
        </button>
      </form>
      <div className="suggestions" aria-label="Suggested questions">
        {["What are you building?", "Why private AI?", "Your path here?"].map(
          (label, i) => (
            <button
              key={label}
              type="button"
              disabled={pending}
              onClick={() =>
                void ask(
                  [
                    "What are you building?",
                    "Why private AI?",
                    "What is your experience?",
                  ][i],
                )
              }
            >
              {label}
              <ArrowUpRight size={12} aria-hidden="true" />
            </button>
          ),
        )}
      </div>
      <div aria-live="polite" aria-atomic="true">
        {pending && (
          <p className="guide-note mt-4" role="status">
            Finding an answer…
          </p>
        )}
        {answer && (
          <div className="guide-answer">
            <div className="flex items-start justify-between gap-3">
              <p className="guide-question">{asked}</p>
              <button
                type="button"
                aria-label="Clear answer"
                className="clear-answer"
                onClick={() => {
                  setAnswer(null);
                  setError("");
                  setQuestion("");
                  input.current?.focus();
                }}
              >
                <RotateCcw size={15} aria-hidden="true" />
              </button>
            </div>
            {error && <p className="guide-note mb-3">{error}</p>}
            <p className="answer-copy">{answer.answer}</p>
            {answer.href && (
              <a className="text-link mt-4 inline-flex" href={answer.href}>
                {answer.linkLabel}
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            )}
            <p className="answer-source">
              <BookOpen size={12} aria-hidden="true" />
              {answer.source === "profile"
                ? "From my published profile · matched in your browser"
                : "AI-generated with Anthropic · may make mistakes"}
            </p>
          </div>
        )}
      </div>
      <details className="guide-privacy">
        <summary>
          <Check size={12} aria-hidden="true" />
          No sign-in. No saved questions.
          <span className="privacy-more">How it works</span>
        </summary>
        <div>
          <p>
            The default guide matches your question to my published profile in
            your browser. It doesn’t send your question to a server or a model,
            and it doesn’t store it. It’s a small guide, so it won’t know
            everything.
          </p>
          {aiAvailable && (
            <label className="cloud-consent">
              <input
                type="checkbox"
                checked={cloud}
                disabled={pending}
                onChange={(e) => {
                  setCloud(e.target.checked);
                  setAnswer(null);
                  setError("");
                }}
              />
              <span>
                Use the AI assistant for my next question. I understand that my
                question will be sent to Anthropic through this site. Please
                don’t include sensitive information.
              </span>
            </label>
          )}
        </div>
      </details>
    </section>
  );
}
