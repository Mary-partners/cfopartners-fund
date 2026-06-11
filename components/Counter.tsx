"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  value: string; // e.g. "56", "44%", "$50M+", "16%"
  className?: string;
  durationMs?: number;
}

/**
 * Animates the numeric part of a stat from 0 to its final value when it
 * first scrolls into view. Non-numeric prefix/suffix characters (%, $, M, +)
 * are preserved around the counting number.
 */
export function Counter({ value, className = "", durationMs = 1200 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    const match = value.match(/^([^0-9]*)([0-9,.]+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr.replace(/,/g, ""));
    if (Number.isNaN(target)) {
      setDisplay(value);
      return;
    }

    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplay(value);
      return;
    }

    setDisplay(`${prefix}0${suffix}`);
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / durationMs, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          const current = Math.round(target * eased);
          setDisplay(`${prefix}${current.toLocaleString()}${suffix}`);
          if (t < 1) requestAnimationFrame(tick);
          else setDisplay(value);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
