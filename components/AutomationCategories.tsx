"use client";

import { useState } from "react";
import { Check, ClipboardList, Megaphone, Target, Truck } from "lucide-react";
import {
  AUTOMATION_CATEGORIES,
  type AutomationCategory,
} from "@/lib/automation-categories";

const ICONS = {
  admin: ClipboardList,
  delivery: Truck,
  marketing: Megaphone,
  leadership: Target,
} as const;

/**
 * Tabbed explorer for the four automation categories. Clicking a tab
 * swaps the description, example list, and the drawn dashboard mockup
 * with a soft crossfade.
 */
export function AutomationCategories() {
  const [active, setActive] = useState(0);
  const cat = AUTOMATION_CATEGORIES[active];

  return (
    <div>
      {/* TABS */}
      <div className="mb-8 flex flex-wrap gap-2">
        {AUTOMATION_CATEGORIES.map((c, i) => {
          const Icon = ICONS[c.key];
          const on = i === active;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={on}
              className={`inline-flex items-center gap-2 rounded-full border-[1.5px] px-5 py-3 text-[0.92rem] font-semibold transition-all ${
                on
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-white text-ink-2 hover:border-accent hover:text-ink"
              }`}
            >
              <Icon className="h-4 w-4" />
              {c.name}
            </button>
          );
        })}
      </div>

      {/* PANEL */}
      <div
        key={cat.key}
        className="grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]"
        style={{ animation: "fadeSlide 0.35s ease" }}
      >
        <div>
          <div className="mb-1 text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-accent-2">
            {cat.tagline}
          </div>
          <h3 className="mb-3 font-serif text-[1.5rem]">{cat.name}</h3>
          <p className="mb-5 text-[0.98rem] leading-7 text-ink-2">
            {cat.description}
          </p>
          <ul className="space-y-2.5">
            {cat.examples.map((e) => (
              <li
                key={e}
                className="flex items-start gap-2.5 text-[0.92rem] leading-6 text-ink-2"
              >
                <Check className="mt-1 h-4 w-4 flex-none text-accent" />
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-line bg-ink p-5 shadow-card">
          <Dashboard cat={cat} />
        </div>
      </div>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ============================================================
// DASHBOARD MOCKUPS
// ============================================================

const GOLD = "#D4A437";
const CREAM = "#F4F1EA";
const DIM = "rgba(244,241,234,0.35)";
const PANEL = "rgba(255,255,255,0.07)";

function Dashboard({ cat }: { cat: AutomationCategory }) {
  switch (cat.key) {
    case "admin":
      return <AdminDashboard />;
    case "delivery":
      return <DeliveryDashboard />;
    case "marketing":
      return <MarketingDashboard />;
    case "leadership":
      return <LeadershipDashboard />;
  }
}

function Frame({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 600 380"
      xmlns="http://www.w3.org/2000/svg"
      className="block w-full"
      role="img"
      aria-label={title}
    >
      {/* window chrome */}
      <circle cx="24" cy="22" r="5" fill="rgba(255,255,255,0.25)" />
      <circle cx="42" cy="22" r="5" fill="rgba(255,255,255,0.18)" />
      <circle cx="60" cy="22" r="5" fill="rgba(255,255,255,0.12)" />
      <text x="300" y="27" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fill={DIM}>
        {title}
      </text>
      <line x1="0" y1="42" x2="600" y2="42" stroke="rgba(255,255,255,0.1)" />
      {children}
    </svg>
  );
}

/** Admin: reconciliation, filings, deadlines, hours saved. */
function AdminDashboard() {
  return (
    <Frame title="Admin autopilot · this week">
      {[
        ["Payments reconciled", "142 / 142", "auto-matched overnight"],
        ["Documents filed", "38", "sorted to the right folders"],
        ["Deadlines ahead", "2", "VAT 20th · PAYE 9th"],
      ].map(([label, value, note], i) => (
        <g key={label}>
          <rect x={22 + i * 190} y="58" width="176" height="96" rx="10" fill={PANEL} stroke={DIM} />
          <text x={38 + i * 190} y="84" fontFamily="Inter, sans-serif" fontSize="12" fill={CREAM} opacity="0.7">{label}</text>
          <text x={38 + i * 190} y="116" fontFamily="Georgia, serif" fontSize="24" fontWeight="bold" fill={CREAM}>{value}</text>
          <text x={38 + i * 190} y="140" fontFamily="Inter, sans-serif" fontSize="10.5" fill={GOLD}>{note}</text>
        </g>
      ))}
      <text x="22" y="192" fontFamily="Georgia, serif" fontSize="15" fontWeight="bold" fill={CREAM}>
        Morning summary · sent 07:00 to WhatsApp
      </text>
      {[
        ["3 till payments could not be matched, flagged for review", true],
        ["Q3 instalment tax due in 12 days, reminder scheduled", true],
        ["Supplier statement filed against March PO", false],
      ].map(([line, urgent], i) => (
        <g key={String(line)}>
          <rect x="22" y={206 + i * 44} width="556" height="36" rx="8" fill={PANEL} />
          <circle cx="44" cy={224 + i * 44} r="5" fill={urgent ? GOLD : DIM} />
          <text x="62" y={229 + i * 44} fontFamily="Inter, sans-serif" fontSize="12.5" fill={CREAM} opacity="0.85">
            {String(line)}
          </text>
        </g>
      ))}
      <text x="22" y="366" fontFamily="Inter, sans-serif" fontSize="12" fill={GOLD}>
        Founder hours saved this week: 6.5
      </text>
    </Frame>
  );
}

/** Delivery: pipeline from order to paid. */
function DeliveryDashboard() {
  const stages: [string, number][] = [
    ["Orders", 24],
    ["In progress", 9],
    ["Delivered", 11],
    ["Invoiced", 11],
    ["Paid", 8],
  ];
  return (
    <Frame title="Delivery pipeline · live">
      {stages.map(([name, count], i) => (
        <g key={name}>
          <rect x={22 + i * 114} y="58" width="102" height="88" rx="10" fill={i === 4 ? GOLD : PANEL} stroke={i === 4 ? GOLD : DIM} />
          <text x={73 + i * 114} y="82" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11.5" fill={i === 4 ? "#3B2D05" : CREAM} opacity={i === 4 ? 1 : 0.7}>
            {name}
          </text>
          <text x={73 + i * 114} y="120" textAnchor="middle" fontFamily="Georgia, serif" fontSize="28" fontWeight="bold" fill={i === 4 ? "#3B2D05" : CREAM}>
            {count}
          </text>
          {i < 4 && (
            <path d={`M${124 + i * 114} 102 l8 0 m-3 -4 l4 4 -4 4`} stroke={DIM} strokeWidth="2" fill="none" />
          )}
        </g>
      ))}
      <text x="22" y="184" fontFamily="Georgia, serif" fontSize="15" fontWeight="bold" fill={CREAM}>
        Automations fired today
      </text>
      {[
        "09:12 · Invoice #2214 sent to Mwangi Traders on delivery confirmation",
        "10:40 · Order status update sent to 6 customers via WhatsApp",
        "13:05 · Payment reminder (day 14) sent to Bella Stores, tone: polite",
        "15:30 · Dispatch alert to rider + customer for order #2219",
      ].map((line, i) => (
        <g key={line}>
          <rect x="22" y={198 + i * 38} width="556" height="30" rx="8" fill={PANEL} />
          <text x="38" y={218 + i * 38} fontFamily="Inter, sans-serif" fontSize="12" fill={CREAM} opacity="0.85">
            {line}
          </text>
        </g>
      ))}
      <text x="22" y="368" fontFamily="Inter, sans-serif" fontSize="12" fill={GOLD}>
        Average days to payment: 16 → 9 since follow-ups went automatic
      </text>
    </Frame>
  );
}

/** Marketing: leads, scheduled posts, follow-ups. */
function MarketingDashboard() {
  const bars = [12, 18, 9, 22, 16, 27, 31];
  return (
    <Frame title="Marketing engine · this month">
      {[
        ["New leads", "63", "+41% vs last month"],
        ["Posts scheduled", "18", "3 weeks ahead"],
        ["Follow-ups sent", "112", "9 replies waiting"],
      ].map(([label, value, note], i) => (
        <g key={label}>
          <rect x={22 + i * 190} y="58" width="176" height="90" rx="10" fill={PANEL} stroke={DIM} />
          <text x={38 + i * 190} y="82" fontFamily="Inter, sans-serif" fontSize="12" fill={CREAM} opacity="0.7">{label}</text>
          <text x={38 + i * 190} y="114" fontFamily="Georgia, serif" fontSize="24" fontWeight="bold" fill={CREAM}>{value}</text>
          <text x={38 + i * 190} y="136" fontFamily="Inter, sans-serif" fontSize="10.5" fill={GOLD}>{note}</text>
        </g>
      ))}
      <text x="22" y="182" fontFamily="Georgia, serif" fontSize="15" fontWeight="bold" fill={CREAM}>
        Leads per week
      </text>
      {bars.map((v, i) => (
        <g key={i}>
          <rect
            x={30 + i * 78}
            y={330 - v * 4}
            width="52"
            height={v * 4}
            rx="6"
            fill={i === bars.length - 1 ? GOLD : "rgba(244,241,234,0.5)"}
          />
          <text x={56 + i * 78} y="348" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill={DIM}>
            W{i + 1}
          </text>
        </g>
      ))}
      <text x="22" y="372" fontFamily="Inter, sans-serif" fontSize="12" fill={GOLD}>
        Best performing: WhatsApp broadcast · Tuesday 10:00
      </text>
    </Frame>
  );
}

/** Leadership: team skills, friction removal, decision support. */
function LeadershipDashboard() {
  const team: [string, number, string][] = [
    ["Achieng · Sales", 78, "upskill: pricing conversations"],
    ["Kamau · Operations", 62, "upskill: stock forecasting"],
    ["Wanjiru · Accounts", 85, "ready for month-end ownership"],
  ];
  return (
    <Frame title="Leadership decision cockpit · week 24">
      {/* TEAM SKILLS */}
      <text x="22" y="66" fontFamily="Georgia, serif" fontSize="14" fontWeight="bold" fill={CREAM}>
        Team skills and upskilling
      </text>
      {team.map(([person, pct, note], i) => {
        const y = 80 + i * 40;
        return (
          <g key={person}>
            <text x="22" y={y + 10} fontFamily="Inter, sans-serif" fontSize="11.5" fill={CREAM} opacity="0.9">
              {person}
            </text>
            <rect x="180" y={y} width="180" height="11" rx="5.5" fill="rgba(255,255,255,0.1)" />
            <rect x="180" y={y} width={180 * (pct / 100)} height="11" rx="5.5" fill={pct >= 75 ? GOLD : "rgba(244,241,234,0.55)"} />
            <text x="370" y={y + 10} fontFamily="Inter, sans-serif" fontSize="10" fill={GOLD}>
              {note}
            </text>
          </g>
        );
      })}
      {/* FRICTION */}
      <text x="22" y="222" fontFamily="Georgia, serif" fontSize="14" fontWeight="bold" fill={CREAM}>
        Friction found this week
      </text>
      {[
        "Quotes wait 2.5 days for your approval. Suggest: limit to KES 100K+",
        "Stock counted twice, by sales and by stores. One count would do.",
      ].map((line, i) => (
        <g key={line}>
          <rect x="22" y={234 + i * 36} width="556" height="28" rx="8" fill={PANEL} stroke="rgba(192,57,43,0.5)" />
          <circle cx="42" cy={248 + i * 36} r="4.5" fill="#C0392B" />
          <text x="58" y={252 + i * 36} fontFamily="Inter, sans-serif" fontSize="11.5" fill={CREAM} opacity="0.9">
            {line}
          </text>
        </g>
      ))}
      {/* DECISION BRIEF */}
      <rect x="22" y="312" width="556" height="44" rx="10" fill={PANEL} stroke={GOLD} />
      <text x="38" y="330" fontFamily="Georgia, serif" fontSize="12.5" fontWeight="bold" fill={GOLD}>
        Decision brief: add a second delivery van?
      </text>
      <text x="38" y="348" fontFamily="Inter, sans-serif" fontSize="11" fill={CREAM} opacity="0.9">
        Utilisation 91%, 4 late deliveries last month. Numbers say yes from August. Your call.
      </text>
      <text x="22" y="374" fontFamily="Inter, sans-serif" fontSize="11" fill={DIM}>
        Assembled every Monday from your sales, HR, and delivery data. You decide with the full picture.
      </text>
    </Frame>
  );
}
