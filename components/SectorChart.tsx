"use client";

import { useEffect, useRef, useState } from "react";
import { SECTORS_Q2_2026 } from "@/lib/impact";

/**
 * Animated horizontal bar chart of the Q2 2026 cohort by sector.
 * Bars grow from zero the first time the chart scrolls into view.
 */
export function SectorChart() {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  const max = Math.max(...SECTORS_Q2_2026.map((s) => s.count));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setAnimate(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-3">
      {SECTORS_Q2_2026.map((s, i) => {
        const pct = (s.count / max) * 100;
        const lead = i === 0;
        return (
          <div key={s.name} className="grid grid-cols-[160px_1fr_32px] items-center gap-3 sm:grid-cols-[200px_1fr_36px]">
            <div className="truncate text-right text-[0.85rem] font-medium text-ink-2">
              {s.name}
            </div>
            <div className="h-7 overflow-hidden rounded-md bg-bg-alt">
              <div
                className={`h-full rounded-md ${lead ? "bg-accent" : "bg-ink/80"}`}
                style={{
                  width: animate ? `${pct}%` : "0%",
                  transition: `width 0.9s ease ${i * 70}ms`,
                }}
              />
            </div>
            <div className="text-[0.9rem] font-semibold text-ink">
              {s.count}
            </div>
          </div>
        );
      })}
    </div>
  );
}
