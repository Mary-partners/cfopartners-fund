/**
 * Illustrative dashboards for the two offer pages. Every figure here is
 * modelled sample data, not a client's, and each dashboard says so on its
 * face. Status is always shown in words as well as colour.
 */

const TIER_CLS: Record<string, string> = {
  Low: "bg-emerald-50 text-emerald-800 border-emerald-200",
  Watch: "bg-gold-soft text-ink border-accent/40",
  High: "bg-red-50 text-red-800 border-red-200",
};

const PORTFOLIO = [
  { co: "Company A", sector: "Agro-processing", pack: "On time", dq: 86, runway: "9.5", margin: "+1.8", debtors: 38, tier: "Low", open: 1 },
  { co: "Company B", sector: "Logistics", pack: "4 days late", dq: 71, runway: "4.0", margin: "−2.6", debtors: 64, tier: "Watch", open: 2 },
  { co: "Company C", sector: "Health clinics", pack: "On time", dq: 78, runway: "11.2", margin: "+0.4", debtors: 41, tier: "Low", open: 1 },
  { co: "Company D", sector: "Solar distribution", pack: "Missing", dq: 52, runway: "2.1", margin: "−4.9", debtors: 87, tier: "High", open: 3 },
  { co: "Company E", sector: "Light manufacturing", pack: "On time", dq: 74, runway: "6.3", margin: "+0.9", debtors: 52, tier: "Watch", open: 1 },
];

function Frame({ title, period, children }: { title: string; period: string; children: React.ReactNode }) {
  return (
    <figure className="m-0 overflow-hidden rounded-card border border-line bg-white shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-ink px-5 py-3 text-white">
        <span className="font-semibold">{title}</span>
        <span className="text-[0.82rem] text-slate-300">{period}</span>
      </div>
      <div className="p-5">{children}</div>
      <figcaption className="border-t border-line bg-bg-alt px-5 py-3 text-[0.82rem] font-semibold text-ink">
        Illustrative sample. Modelled figures for fictional companies, not client data.
      </figcaption>
    </figure>
  );
}

function Tile({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-lg border border-line p-3">
      <div className="text-[0.78rem] font-semibold text-ink-2">{label}</div>
      <div className="font-serif text-[1.5rem] font-semibold tabular-nums text-ink">{value}</div>
      {note && <div className="text-[0.78rem] text-ink-2">{note}</div>}
    </div>
  );
}

export function PortfolioDashboardSample() {
  return (
    <Frame title="Portfolio dashboard · Sample Fund I" period="Month ending 30 September">
      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Tile label="Reporting packs received" value="4 of 5" note="1 missing, 1 late" />
        <Tile label="Average data quality" value="72 / 100" note="Up from 58 at baseline" />
        <Tile label="On runway watch-list" value="2" note="Under 6 months of cash" />
        <Tile label="Interventions" value="8 open" note="5 closed this quarter" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-[0.88rem]">
          <caption className="sr-only">Sample portfolio dashboard: reporting, data quality, runway, margin, receivables and risk tier by company</caption>
          <thead>
            <tr className="border-b border-line text-[0.75rem] uppercase tracking-[0.05em] text-ink-2">
              <th scope="col" className="py-2 pr-3">Company</th>
              <th scope="col" className="py-2 pr-3">Monthly pack</th>
              <th scope="col" className="py-2 pr-3 text-right">Data quality</th>
              <th scope="col" className="py-2 pr-3 text-right">Cash runway (months)</th>
              <th scope="col" className="py-2 pr-3 text-right">Gross margin vs last qtr (pts)</th>
              <th scope="col" className="py-2 pr-3 text-right">Debtor days</th>
              <th scope="col" className="py-2 pr-3">Risk tier</th>
              <th scope="col" className="py-2 text-right">Open actions</th>
            </tr>
          </thead>
          <tbody>
            {PORTFOLIO.map((r) => (
              <tr key={r.co} className="border-b border-line last:border-0">
                <th scope="row" className="py-2.5 pr-3 font-semibold text-ink">
                  {r.co}
                  <span className="block text-[0.78rem] font-normal text-ink-2">{r.sector}</span>
                </th>
                <td className="py-2.5 pr-3 text-ink-2">{r.pack}</td>
                <td className="py-2.5 pr-3 text-right tabular-nums">{r.dq}</td>
                <td className="py-2.5 pr-3 text-right tabular-nums">{r.runway}</td>
                <td className="py-2.5 pr-3 text-right tabular-nums">{r.margin}</td>
                <td className="py-2.5 pr-3 text-right tabular-nums">{r.debtors}</td>
                <td className="py-2.5 pr-3">
                  <span className={`rounded-full border px-2.5 py-0.5 text-[0.75rem] font-semibold ${TIER_CLS[r.tier]}`}>{r.tier}</span>
                </td>
                <td className="py-2.5 text-right tabular-nums">{r.open}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 rounded-lg bg-bg-alt p-4 text-[0.88rem] leading-6 text-ink-2">
        <span className="font-semibold text-ink">Analyst note (sample): </span>
        Company D has about two months of cash and has not submitted September accounts.
        Receivables have risen to 87 days on two distributor accounts. Recommended: finance
        associate on site for the October close, a collections plan for the two accounts, and a
        13-week forecast before the next investment committee.
      </div>
    </Frame>
  );
}

const WEEKS = [2.4, 2.1, 1.8, 1.5, 1.1, 0.8, 0.6, 0.9, 1.3, 1.6, 1.9, 2.2, 2.6];

export function SmeDashboardSample() {
  const max = Math.max(...WEEKS);
  return (
    <Frame title="Management dashboard · Sample Trading Ltd" period="Month ending 30 September">
      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Tile label="Revenue vs budget" value="KES 4.1M" note="Budget KES 4.4M (−7%)" />
        <Tile label="Gross margin" value="31%" note="Up 2 pts after price review" />
        <Tile label="Debtor days" value="48" note="Target 35" />
        <Tile label="13-week cash low point" value="KES 0.6M" note="Week 7" />
      </div>
      <div>
        <p className="mb-2 text-[0.82rem] font-semibold text-ink-2">13-week cash forecast (KES millions, closing balance)</p>
        <div className="flex h-36 items-end gap-1.5" aria-hidden="true">
          {WEEKS.map((v, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={`w-full rounded-t ${v < 1 ? "bg-accent-2" : "bg-ink"}`}
                style={{ height: `${(v / max) * 100}%` }}
              />
              <span className="text-[0.68rem] tabular-nums text-ink-2">W{i + 1}</span>
            </div>
          ))}
        </div>
        <p className="sr-only">
          Closing cash by week, KES millions: {WEEKS.map((v, i) => `week ${i + 1}: ${v}`).join(", ")}.
          Cash falls below 1 million in weeks 5 to 8, with a low of 0.6 million in week 7.
        </p>
        <p className="mt-2 text-[0.78rem] text-ink-2">Weeks below KES 1M are shown in gold.</p>
      </div>
      <div className="mt-4 rounded-lg bg-bg-alt p-4 text-[0.88rem] leading-6 text-ink-2">
        <span className="font-semibold text-ink">Actions agreed (sample): </span>
        delay the second equipment payment to week 10; collect the two largest overdue invoices
        before week 5; raise prices on the two lowest-margin product lines from November.
      </div>
    </Frame>
  );
}
