"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { DIAGNOSTIC_URL } from "@/lib/links";
import type { RoomSlug } from "@/lib/rooms";

interface Option {
  label: string;
  room: RoomSlug;
}

interface Question {
  q: string;
  options: Option[];
}

const QUESTIONS: Question[] = [
  {
    q: "What keeps you up at night most often?",
    options: [
      { label: "I do not really know my numbers", room: "cfo" },
      { label: "Everything depends on me personally", room: "coo" },
      { label: "Not enough customers or sales", room: "cmo" },
      { label: "Compliance, tax, or one big customer", room: "cro" },
    ],
  },
  {
    q: "What would help you most in the next 90 days?",
    options: [
      { label: "A clear picture of cash and margins", room: "cfo" },
      { label: "Systems so my team can run without me", room: "coo" },
      { label: "A plan to win more of the right customers", room: "cmo" },
      { label: "A clear strategy and priorities", room: "ceo" },
    ],
  },
  {
    q: "Where do you want the business to be in two years?",
    options: [
      { label: "Bankable, with a loan or investor on board", room: "cfo" },
      { label: "Running profitably without daily firefighting", room: "coo" },
      { label: "Reporting to a board or investors properly", room: "board" },
      { label: "Bigger, with expert guidance along the way", room: "experts" },
    ],
  },
];

const ROOM_NAMES: Record<RoomSlug, string> = {
  ceo: "The CEO Room",
  cfo: "The CFO Room",
  coo: "The COO Room",
  cmo: "The CMO Room",
  cro: "The CRO Room",
  board: "The Board Room",
  experts: "The Expert Marketplace",
};

/**
 * A three-question interactive widget that points visitors at the
 * Executive Room that fits them, then hands off to the full diagnostic.
 * Deliberately light: the Notion Check-Up remains the real assessment.
 */
export function RoomFinder() {
  const [step, setStep] = useState(0);
  const [votes, setVotes] = useState<RoomSlug[]>([]);

  const pick = (room: RoomSlug) => {
    const next = [...votes, room];
    setVotes(next);
    setStep(step + 1);
  };

  const reset = () => {
    setStep(0);
    setVotes([]);
  };

  if (step >= QUESTIONS.length) {
    const tally = votes.reduce<Record<string, number>>((acc, r) => {
      acc[r] = (acc[r] || 0) + 1;
      return acc;
    }, {});
    const winner = (Object.entries(tally).sort(
      (a, b) => b[1] - a[1],
    )[0]?.[0] ?? "cfo") as RoomSlug;

    return (
      <div className="rounded-3xl border-2 border-accent bg-white p-8 text-center">
        <div className="mb-2 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-accent-2">
          Your starting room
        </div>
        <h3 className="mb-3 font-serif text-[1.8rem]">{ROOM_NAMES[winner]}</h3>
        <p className="mx-auto mb-6 max-w-[440px] text-[0.95rem] text-ink-2">
          Based on your answers, this is the room where your business has the
          most to gain right now. The full diagnostic will confirm it and give
          you a complete six-pillar scorecard.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href={`/rooms/${winner}`}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[0.92rem] font-semibold text-white transition-all hover:bg-ink-2"
          >
            Explore {ROOM_NAMES[winner]}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={DIAGNOSTIC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[0.92rem] font-semibold text-white transition-all hover:bg-accent-2"
          >
            Take the full diagnostic
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <button
          type="button"
          onClick={reset}
          className="mx-auto mt-5 flex items-center gap-1.5 text-[0.82rem] text-ink-3 hover:text-ink"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Start again
        </button>
      </div>
    );
  }

  const q = QUESTIONS[step];
  return (
    <div className="rounded-3xl border border-line bg-white p-8">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-accent-2">
          Which room should you start in?
        </span>
        <span className="text-[0.8rem] text-ink-3">
          {step + 1} of {QUESTIONS.length}
        </span>
      </div>
      <div className="mb-2 h-1 overflow-hidden rounded bg-bg-alt">
        <div
          className="h-full rounded bg-accent transition-all duration-300"
          style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
        />
      </div>
      <h3 className="mb-6 mt-4 font-serif text-[1.35rem] leading-snug">
        {q.q}
      </h3>
      <div className="grid gap-2.5">
        {q.options.map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => pick(opt.room)}
            className="rounded-xl border-[1.5px] border-line bg-bg px-5 py-4 text-left text-[0.95rem] text-ink transition-all hover:border-accent hover:bg-gold-soft"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
