"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { SERVICE_GROUPS } from "@/lib/services";

const N = SERVICE_GROUPS.length;
const SEGMENT_VH = 85; // scroll distance per item, in vh

/**
 * Scroll-driven service showcase. On large screens the section pins while
 * the visitor scrolls through it: each service group activates in turn on
 * the left, and the visual card on the right swaps to illustrate it.
 * Clicking an item jumps to its segment. On small screens the groups
 * render as a simple stacked list with their visuals.
 */
export function ServicesShowcase() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(Math.max(-rect.top / total, 0), 0.999);
      setActive(Math.floor(progress * N));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isDesktop]);

  const jumpTo = useCallback((i: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top =
      el.getBoundingClientRect().top +
      window.scrollY +
      (total * (i + 0.5)) / N;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  // Small screens: stacked, no pinning.
  if (!isDesktop) {
    return (
      <div className="space-y-10">
        {SERVICE_GROUPS.map((g, i) => (
          <div key={g.key}>
            <h3 className="mb-1 text-[1.25rem] text-accent">{g.name}</h3>
            <p className="mb-3 text-[0.92rem] italic text-slate-400">
              {g.question}
            </p>
            <p className="mb-4 text-[0.95rem] leading-6 text-slate-300">
              {g.summary}
            </p>
            <div className="mb-4 rounded-2xl border border-white/15 bg-white/5 p-4">
              <ServiceVisual index={i} />
              <p className="mb-0 mt-3 text-[0.85rem] leading-6 text-slate-300">
                {g.caption}
              </p>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {g.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[0.9rem] leading-6 text-slate-200"
                >
                  <Check className="mt-1 h-4 w-4 flex-none text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={wrapRef} style={{ height: `${N * SEGMENT_VH + 15}vh` }}>
      <div className="sticky top-0 flex h-screen items-center">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
          {/* LEFT: item list */}
          <div className="relative">
            <div className="absolute bottom-3 left-[7px] top-3 w-px bg-white/15" />
            <div className="space-y-9">
              {SERVICE_GROUPS.map((g, i) => {
                const on = i === active;
                return (
                  <button
                    key={g.key}
                    type="button"
                    onClick={() => jumpTo(i)}
                    className="relative block w-full pl-9 text-left"
                  >
                    <span
                      className={`absolute left-0 top-2.5 h-[15px] w-[15px] rounded-full border-2 transition-all duration-300 ${
                        on
                          ? "border-accent bg-accent"
                          : "border-white/30 bg-transparent"
                      }`}
                    />
                    <span
                      className={`block font-serif text-[1.5rem] leading-tight transition-colors duration-300 ${
                        on ? "text-white" : "text-white/40"
                      }`}
                    >
                      {g.name}
                    </span>
                    <span
                      className={`mt-1 block text-[0.9rem] transition-colors duration-300 ${
                        on ? "text-slate-300" : "text-white/25"
                      }`}
                    >
                      {g.question}
                    </span>
                    <div
                      className="grid overflow-hidden transition-all duration-500"
                      style={{ gridTemplateRows: on ? "1fr" : "0fr" }}
                    >
                      <ul className="min-h-0 space-y-1.5 overflow-hidden pt-3">
                        {g.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-[0.88rem] leading-6 text-slate-200"
                          >
                            <Check className="mt-1 h-3.5 w-3.5 flex-none text-accent" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: swapping visual card */}
          <div className="relative">
            {SERVICE_GROUPS.map((g, i) => (
              <div
                key={g.key}
                aria-hidden={i !== active}
                className="transition-all duration-500"
                style={{
                  opacity: i === active ? 1 : 0,
                  transform:
                    i === active ? "translateY(0)" : "translateY(16px)",
                  position: i === 0 ? "relative" : "absolute",
                  inset: i === 0 ? undefined : 0,
                  pointerEvents: i === active ? "auto" : "none",
                }}
              >
                <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur">
                  <ServiceVisual index={i} />
                  <p className="mb-0 mt-4 text-[0.9rem] leading-6 text-slate-300">
                    {g.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// VISUALS: one drawn scene per service group
// ============================================================

const GOLD = "#D4A437";
const CREAM = "#F4F1EA";
const DIM = "rgba(244,241,234,0.35)";

function ServiceVisual({ index }: { index: number }) {
  switch (index) {
    case 0:
      return <VisualDiagnostic />;
    case 1:
      return <VisualAdvisory />;
    case 2:
      return <VisualFinance />;
    default:
      return <VisualExecution />;
  }
}

/** Six-pillar scorecard with archetype badge. */
function VisualDiagnostic() {
  const pillars: [string, number][] = [
    ["Revenue Clarity", 19],
    ["Customer Base", 16],
    ["Cost Structure", 15],
    ["Financial Readiness", 12],
    ["Operations & Systems", 13],
    ["Growth Path & Vision", 20],
  ];
  return (
    <svg viewBox="0 0 560 330" xmlns="http://www.w3.org/2000/svg" className="block w-full">
      <text x="24" y="36" fontFamily="Georgia, serif" fontSize="20" fontWeight="bold" fill={CREAM}>
        Business Growth Check-Up
      </text>
      <rect x="404" y="16" rx="14" width="132" height="30" fill={GOLD} />
      <text x="470" y="36" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="600" fill="#3B2D05">
        Stabilizer
      </text>
      {pillars.map(([name, score], i) => {
        const y = 70 + i * 40;
        const w = (score / 25) * 320;
        return (
          <g key={name}>
            <text x="24" y={y + 12} fontFamily="Inter, sans-serif" fontSize="13" fill={CREAM} opacity="0.85">
              {name}
            </text>
            <rect x="200" y={y} width="320" height="16" rx="8" fill="rgba(255,255,255,0.1)" />
            <rect x="200" y={y} width={w} height="16" rx="8" fill={i === 3 ? "#C0392B" : GOLD} opacity={i === 3 ? 0.9 : 1} />
            <text x="532" y={y + 13} fontFamily="Inter, sans-serif" fontSize="12" fill={CREAM} opacity="0.7" textAnchor="end">
              {score}/25
            </text>
          </g>
        );
      })}
      <text x="24" y="322" fontFamily="Inter, sans-serif" fontSize="13" fill={GOLD}>
        Fix first: Financial Readiness. Recommended path: Business Build Sprint.
      </text>
    </svg>
  );
}

/** Board pack and decision memo mockup. */
function VisualAdvisory() {
  return (
    <svg viewBox="0 0 560 330" xmlns="http://www.w3.org/2000/svg" className="block w-full">
      {/* board pack document */}
      <rect x="30" y="30" width="250" height="270" rx="10" fill={CREAM} />
      <rect x="30" y="30" width="250" height="8" rx="4" fill={GOLD} />
      <text x="52" y="70" fontFamily="Georgia, serif" fontSize="17" fontWeight="bold" fill="#0F172A">
        Monthly Board Pack
      </text>
      <text x="52" y="92" fontFamily="Inter, sans-serif" fontSize="12" fill="#64748B">
        June 2026 · prepared by CFOIP
      </text>
      {["Revenue and cash position", "Top three risks", "Decisions required", "KPIs against plan"].map((line, i) => (
        <g key={line}>
          <circle cx="60" cy={124 + i * 34} r="4" fill={GOLD} />
          <text x="76" y={129 + i * 34} fontFamily="Inter, sans-serif" fontSize="13" fill="#334155">
            {line}
          </text>
        </g>
      ))}
      <rect x="52" y="264" width="150" height="22" rx="11" fill="#0F172A" />
      <text x="127" y="279" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill={CREAM}>
        Reviewed by Virtual Board
      </text>
      {/* decision memo card */}
      <rect x="310" y="70" width="220" height="190" rx="10" fill="rgba(255,255,255,0.08)" stroke={DIM} />
      <text x="330" y="102" fontFamily="Georgia, serif" fontSize="15" fontWeight="bold" fill={CREAM}>
        Decision memo
      </text>
      <text x="330" y="126" fontFamily="Inter, sans-serif" fontSize="12" fill={CREAM} opacity="0.7">
        Should we open the Mombasa branch?
      </text>
      {["Context", "Options considered", "Recommendation"].map((line, i) => (
        <g key={line}>
          <rect x="330" y={142 + i * 30} width="180" height="14" rx="7" fill="rgba(255,255,255,0.12)" />
          <text x="336" y={153 + i * 30} fontFamily="Inter, sans-serif" fontSize="10" fill={CREAM} opacity="0.8">
            {line}
          </text>
        </g>
      ))}
      <rect x="330" y="232" width="96" height="16" rx="8" fill={GOLD} />
      <text x="378" y="244" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" fill="#3B2D05">
        Not yet: 9 months
      </text>
    </svg>
  );
}

/** Cash position vs plan chart with annotations. */
function VisualFinance() {
  return (
    <svg viewBox="0 0 560 330" xmlns="http://www.w3.org/2000/svg" className="block w-full">
      <text x="24" y="36" fontFamily="Georgia, serif" fontSize="20" fontWeight="bold" fill={CREAM}>
        Cash position vs plan
      </text>
      {/* grid */}
      {[80, 130, 180, 230].map((y) => (
        <line key={y} x1="40" y1={y} x2="530" y2={y} stroke="rgba(255,255,255,0.08)" />
      ))}
      {/* plan dashed */}
      <path
        d="M40 240 C160 228, 300 200, 530 150"
        stroke={DIM}
        strokeWidth="2.5"
        strokeDasharray="6 6"
        fill="none"
      />
      {/* actual */}
      <path
        d="M40 250 L110 235 L180 245 L250 205 L320 215 L390 170 L460 145 L530 105"
        stroke={GOLD}
        strokeWidth="3.5"
        fill="none"
        strokeLinejoin="round"
      />
      <circle cx="530" cy="105" r="6" fill={GOLD} />
      {/* annotations */}
      <line x1="250" y1="205" x2="250" y2="165" stroke={DIM} strokeWidth="1.5" />
      <text x="250" y="155" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fill={CREAM}>
        Invoice terms renegotiated
      </text>
      <line x1="390" y1="170" x2="390" y2="130" stroke={DIM} strokeWidth="1.5" />
      <text x="390" y="120" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fill={CREAM}>
        New pricing live
      </text>
      {/* x labels */}
      {["Jan", "Mar", "May", "Jul", "Sep", "Nov"].map((m, i) => (
        <text key={m} x={40 + i * 98} y="290" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill={CREAM} opacity="0.75">
          {m}
        </text>
      ))}
      <text x="24" y="322" fontFamily="Inter, sans-serif" fontSize="13" fill={GOLD}>
        Runway: 7.2 months. Data room: 92% complete.
      </text>
    </svg>
  );
}

/** KPI dashboard tiles with weekly rhythm checklist. */
function VisualExecution() {
  const tiles: [string, string, string][] = [
    ["Revenue", "KES 2.4M", "+12% vs plan"],
    ["Gross margin", "38%", "+4 pts"],
    ["On-time delivery", "94%", "+9 pts"],
  ];
  const rhythm = [
    ["Mon standup", true],
    ["Wed check-in", true],
    ["Fri review", false],
  ] as const;
  return (
    <svg viewBox="0 0 560 330" xmlns="http://www.w3.org/2000/svg" className="block w-full">
      <text x="24" y="36" fontFamily="Georgia, serif" fontSize="20" fontWeight="bold" fill={CREAM}>
        Week 24 operating dashboard
      </text>
      {tiles.map(([name, value, delta], i) => (
        <g key={name}>
          <rect x={24 + i * 176} y="56" width="160" height="104" rx="10" fill="rgba(255,255,255,0.08)" stroke={DIM} />
          <text x={40 + i * 176} y="84" fontFamily="Inter, sans-serif" fontSize="12" fill={CREAM} opacity="0.7">
            {name}
          </text>
          <text x={40 + i * 176} y="118" fontFamily="Georgia, serif" fontSize="24" fontWeight="bold" fill={CREAM}>
            {value}
          </text>
          <text x={40 + i * 176} y="144" fontFamily="Inter, sans-serif" fontSize="12" fill={GOLD}>
            {delta}
          </text>
        </g>
      ))}
      <text x="24" y="200" fontFamily="Georgia, serif" fontSize="16" fontWeight="bold" fill={CREAM}>
        This week&apos;s rhythm
      </text>
      {rhythm.map(([label, done], i) => (
        <g key={label}>
          <rect x="24" y={214 + i * 34} width="20" height="20" rx="5" fill={done ? GOLD : "rgba(255,255,255,0.1)"} stroke={done ? GOLD : DIM} />
          {done && (
            <path d={`M29 ${224 + i * 34} l4 4 8 -9`} stroke="#3B2D05" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          )}
          <text x="56" y={229 + i * 34} fontFamily="Inter, sans-serif" fontSize="13" fill={CREAM} opacity={done ? 0.9 : 0.6}>
            {label}
          </text>
        </g>
      ))}
      <text x="300" y="248" fontFamily="Inter, sans-serif" fontSize="13" fill={GOLD}>
        3 actions closed this week
      </text>
      <text x="300" y="270" fontFamily="Inter, sans-serif" fontSize="13" fill={CREAM} opacity="0.7">
        1 escalated to the advisory session
      </text>
    </svg>
  );
}
