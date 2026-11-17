/**
 * The two packaged offers: the Portfolio Finance System (institutions) and
 * the 90-Day Financial Performance System (growing businesses).
 *
 * Same writing rules as lib/content/types.ts. In addition:
 * - Both are managed services delivered by CFOIP, never software products.
 * - No fees on the site; pricing drivers only. Internal pricing hypotheses
 *   live in the strategy document, not here.
 * - Describe deliverables and implementation work, not outcomes, until
 *   outcomes have been measured and approved.
 */
import type { Fact, Faq, SeoFields } from "./types";

export type OfferSlug = "portfolio-finance-system" | "90-day-financial-performance-system";

export interface OfferComponent {
  name: string;
  level: "Company" | "Portfolio" | "Both";
  detail: string;
}

export interface EngagementOption {
  key: string;
  name: string;
  summary: string;
  facts: Fact[];
  deliverables: string[];
}

export interface Phase {
  weeks: string;
  stage: string;
  activity: string;
  receive: string[];
}

export interface OfferContent {
  slug: OfferSlug;
  name: string;
  /** Plain descriptor that always accompanies the name (search and clarity). */
  descriptor: string;
  seo: SeoFields;
  eyebrow: string;
  h1: string;
  proposition: string;
  summary: string;
  whoFor: string[];
  problems: string[];
  components: OfferComponent[];
  options: EngagementOption[];
  phases: Phase[];
  clientProvides: string[];
  exclusions: string[];
  pricingDrivers: string[];
  after?: { title: string; text: string; href: string; label: string };
  integration?: { title: string; points: string[] };
  faqs: Faq[];
  cta: { kind: "institutional" | "sme"; label: string; offer: string };
  secondaryCta: { label: string; href: string };
}

export const PORTFOLIO_FINANCE_SYSTEM: OfferContent = {
  slug: "portfolio-finance-system",
  name: "Portfolio Finance System",
  descriptor: "Embedded CFO support and portfolio financial management for investment funds and enterprise programmes",
  seo: {
    title: "Portfolio Finance System: CFO Support for Fund Portfolios | CFOIP",
    description:
      "Embedded CFO support, standard reporting, cash-runway monitoring and portfolio dashboards for investment funds and enterprise programmes in Africa.",
    primaryKeyword: "portfolio finance support for investment funds in Africa",
    secondaryKeywords: [
      "fractional CFO for portfolio companies",
      "portfolio company CFO support Africa",
      "embedded CFO for portfolio companies",
      "financial management technical assistance for portfolio companies",
    ],
  },
  eyebrow: "For investment funds and enterprise programmes",
  h1: "One Financial Management Framework. Better Visibility Across Your Portfolio.",
  proposition:
    "A structured advisory and implementation service that helps investment funds and enterprise programmes assess financial risk, strengthen company-level finance functions and monitor performance across their portfolios.",
  summary:
    "The Portfolio Finance System is a managed service from CFO Innovation Partners, not a software product. We put every company in your portfolio on one reporting standard, support the companies that need it with embedded finance leadership, and give your team a monthly view of performance, cash runway and risk. Funds, DFIs, accelerators and technical assistance facilities in Kenya and East Africa can start with a diagnostic, a 90-day implementation or an ongoing retainer.",
  whoFor: [
    "Impact, private equity and venture funds investing in SMEs and growth-stage companies",
    "Development finance institutions and SME debt funds",
    "Accelerators and enterprise programmes supporting a cohort of businesses",
    "Technical assistance facilities that need to target financial-management support",
    "Banks and non-bank lenders with a portfolio of SME borrowers",
  ],
  problems: [
    "Every company reports in a different format, late or not at all, so the portfolio can't be compared.",
    "Most portfolio companies have no senior finance lead, and management accounts are unreliable.",
    "Cash problems surface when a company asks for a bridge, not months earlier.",
    "The investment or programme team spends its time chasing numbers instead of acting on them.",
    "Technical assistance is spread evenly instead of going where the financial risk is highest.",
    "Post-investment reporting to the investment committee, LPs or donors takes too long to assemble.",
  ],
  components: [
    { name: "Portfolio financial diagnostics", level: "Portfolio", detail: "One instrument applied to every company: reporting quality, financial performance, cash position, controls and management capacity." },
    { name: "Enterprise financial health scorecards", level: "Company", detail: "A scorecard per company that shows where it stands and what to fix first." },
    { name: "Standardised reporting framework", level: "Portfolio", detail: "A common reporting template and data dictionary so figures mean the same thing across companies and accounting systems." },
    { name: "Cash-flow and liquidity monitoring", level: "Both", detail: "13-week cash forecasts in the companies and a runway watch-list at portfolio level." },
    { name: "Financial risk segmentation", level: "Portfolio", detail: "Companies grouped by risk and binding constraint, so support is prioritised." },
    { name: "Embedded fractional CFO support", level: "Company", detail: "A CFOIP finance lead working inside the companies that need it: monthly close, forecasting, board packs, lender reporting." },
    { name: "Financial systems implementation", level: "Company", detail: "Chart of accounts mapping, accounting system set-up or clean-up, basic controls and a monthly close routine." },
    { name: "Forecasts and capital requirements", level: "Company", detail: "Budgets, projections and capital requirement analysis for companies planning further financing." },
    { name: "Consolidated portfolio dashboard", level: "Portfolio", detail: "Built and run by CFOIP for each engagement, with analyst commentary on every update." },
    { name: "Investment-readiness and post-investment support", level: "Company", detail: "Preparation for the next raise or loan, and 100-day finance plans after a new investment." },
    { name: "Technical assistance coordination", level: "Portfolio", detail: "Matching support to need and tracking interventions through to completion." },
    { name: "Portfolio manager reporting and reviews", level: "Portfolio", detail: "Monthly reporting to your team and a quarterly portfolio review meeting." },
  ],
  options: [
    {
      key: "A",
      name: "Portfolio Diagnostic",
      summary: "A defined assessment of financial reporting quality, financial performance, management capacity and priority interventions across your portfolio.",
      facts: [
        { label: "Best for", value: "Funds, DFIs and programmes that want to know where their companies stand before committing to support" },
        { label: "Typical portfolio", value: "5 to 20 companies" },
        { label: "Timeline", value: "4 to 6 weeks" },
        { label: "Team", value: "Engagement lead and analyst" },
      ],
      deliverables: [
        "Financial health scorecard for each company",
        "Portfolio heat-map and risk segmentation",
        "Data-quality assessment",
        "Prioritised intervention plan",
        "Investment committee or programme briefing",
      ],
    },
    {
      key: "B",
      name: "90-Day Portfolio Finance Implementation",
      summary: "A structured implementation assignment covering reporting standardisation, financial controls, forecasting, dashboards and targeted company-level support.",
      facts: [
        { label: "Best for", value: "Funds and programmes ready to fix the gaps, and first-time buyers who want a defined pilot" },
        { label: "Typical portfolio", value: "A pilot of 5 companies; larger portfolios in waves of 5 to 10" },
        { label: "Timeline", value: "90 days" },
        { label: "Team", value: "Engagement lead, portfolio analyst and finance associates (about one per 2 to 3 companies)" },
      ],
      deliverables: [
        "Reporting template and data dictionary",
        "Company reporting packs live",
        "13-week cash forecast in each company",
        "Controls checklist and improvement plan per company",
        "Portfolio dashboard live with the first two periods",
        "Close-out report and next-phase plan",
      ],
    },
    {
      key: "C",
      name: "Embedded Portfolio CFO Retainer",
      summary: "Ongoing company-level financial support and portfolio-level financial oversight over an agreed term.",
      facts: [
        { label: "Best for", value: "Funds and programmes that want continuing oversight and finance leadership in their companies" },
        { label: "Typical portfolio", value: "5 to 15 companies, with company-level support for an agreed subset" },
        { label: "Term", value: "12 months, renewable" },
        { label: "Team", value: "Engagement lead, portfolio analyst and finance associates for an agreed number of days per company each month" },
      ],
      deliverables: [
        "Monthly portfolio dashboard and commentary",
        "Cash-runway watch-list and intervention log",
        "Monthly close and forecasts in companies within scope",
        "Quarterly portfolio report and review meeting",
      ],
    },
  ],
  phases: [
    { weeks: "Weeks 1–3", stage: "Diagnose and set up", activity: "Agree the reporting standard and indicators, collect the baseline from every company and map each chart of accounts to the template.", receive: ["Baseline scorecards", "Reporting template and data dictionary"] },
    { weeks: "Weeks 4–9", stage: "Implement in companies", activity: "Finance associates work with each company on records, the monthly close, controls and a 13-week cash forecast.", receive: ["Company reporting packs", "Cash forecasts", "Controls checklists"] },
    { weeks: "Weeks 8–11", stage: "Dashboard and review", activity: "The portfolio dashboard goes live with the first two periods and analyst commentary. First review with your team.", receive: ["Portfolio dashboard", "Runway watch-list", "Intervention log"] },
    { weeks: "Weeks 12–13", stage: "Handover and next phase", activity: "Close-out review, improvement plans per company and a recommendation for what comes next.", receive: ["Close-out report", "Company improvement plans", "Next-phase plan"] },
  ],
  clientProvides: [
    "The portfolio list, key investment terms that matter for reporting, and a named contact on your team",
    "An introduction to each company explaining the mandate",
    "A finance contact in each company, available about 2 to 4 hours a week",
    "Timely access to accounts, bank statements and existing reports",
    "Decisions on reporting standards and sign-off at agreed milestones",
  ],
  exclusions: [
    "Statutory audit, valuation, tax filing or legal opinions",
    "Fund administration, NAV calculation or investor servicing",
    "Investment decisions, which stay with your committee",
    "Raising capital or guaranteeing financing for any company",
    "Bookkeeping backlogs beyond the months agreed in scope",
    "Software licences for accounting systems",
  ],
  pricingDrivers: [
    "Number of companies in scope",
    "State of each company's records and the number of different accounting systems",
    "Depth of company-level support (days per company per month)",
    "Reporting frequency and investment committee, LP or donor requirements",
    "Countries covered and the need for on-site work",
  ],
  integration: {
    title: "Working with your technical assistance facility",
    points: [
      "The diagnostic ranks companies by financial risk and binding constraint, so TA budgets go where they make the most difference.",
      "Company-level work can be scoped as TA assignments, with the portfolio layer funded by the fund or programme.",
      "Every intervention is logged with an owner, status and result, which supports TA reporting to donors.",
      "We can respond to terms of reference and work alongside other TA providers in your pool.",
    ],
  },
  faqs: [
    { q: "Is the Portfolio Finance System a software product?", a: "No. It is an advisory and implementation service delivered by CFO Innovation Partners. We build and run the reporting template and portfolio dashboard for each engagement, and our team does the work inside the companies. If you already use portfolio monitoring software, we can feed it, and our role is to make the underlying numbers reliable and to act on what they show." },
    { q: "How can reporting be standardised when companies use different accounting systems?", a: "We map each company's chart of accounts to one reporting template and a data dictionary that defines every line. Companies keep their own systems, whether QuickBooks, Xero, Zoho Books, Sage or spreadsheets, and submit a standard monthly pack. Where records are weak, our finance associates help the company produce the pack until it can do so on its own." },
    { q: "How does the system identify liquidity and financial risk early?", a: "Each company keeps a 13-week cash forecast, and the portfolio dashboard tracks cash runway, covenant headroom, customer concentration, margin trend and receivables ageing against thresholds you agree. Companies below a threshold move onto a watch-list with the drivers and a recommended response, usually months before a request for bridge funding." },
    { q: "Can you support companies that have no senior finance lead?", a: "Yes. That is the most common gap. A CFOIP finance associate works inside the company for an agreed number of days each month, running the monthly close, forecasts and board or lender reporting, and building the team's capability so the company can take over over time." },
    { q: "What does it cost?", a: "Each engagement is scoped after a call. Pricing depends on the number of companies, the state of their records and systems, the depth of company-level support, reporting requirements and geography. The diagnostic is priced per portfolio, the 90-day implementation per company plus a portfolio layer, and the retainer monthly. We'll send a short written proposal after the scoping call." },
    { q: "Do you guarantee financing or investment outcomes?", a: "No. We are not a broker and we don't arrange capital. We strengthen the financial management of the companies you back and give you reliable visibility of their performance. Investment and lending decisions stay with you and other funders." },
  ],
  cta: { kind: "institutional", label: "Discuss a Portfolio Finance Pilot", offer: "Portfolio Finance System: 90-day pilot" },
  secondaryCta: { label: "Explore Portfolio Support Services", href: "/portfolio-financial-management" },
};

export const NINETY_DAY_SYSTEM: OfferContent = {
  slug: "90-day-financial-performance-system",
  name: "90-Day Financial Performance System",
  descriptor: "A 90-day financial management programme for growing businesses in Kenya and East Africa",
  seo: {
    title: "90-Day Financial Performance System for SMEs, Kenya | CFOIP",
    description:
      "A 90-day programme led by CFO Innovation Partners: cash-flow forecast, profitability and pricing analysis, budget, management dashboard and a 12-month roadmap.",
    primaryKeyword: "90-day financial management programme for SMEs in Kenya",
    secondaryKeywords: [
      "improve SME financial performance",
      "13-week cash flow forecast Kenya",
      "SME budget and financial projections",
      "monthly management reporting for SMEs",
      "cash flow management for Kenyan SMEs",
    ],
  },
  eyebrow: "For growing businesses",
  h1: "Know Your Numbers. Improve Financial Performance. Build a Business You Can Manage.",
  proposition:
    "A 90-day financial management implementation programme that helps growing businesses set up reliable financial reporting, cash-flow forecasts, profitability analysis and management routines.",
  summary:
    "The 90-Day Financial Performance System is a fixed-scope engagement with CFO Innovation Partners. In 90 days we review your records, build a 13-week cash-flow forecast, analyse profitability and pricing, set a budget and projections, and set up a management dashboard and a monthly review routine. At the end your team owns the system, with an optional fractional CFO to keep it running.",
  whoFor: [
    "Revenue-generating businesses whose numbers arrive late or can't be relied on",
    "Owners who want to know which products, customers or branches actually make money",
    "Businesses preparing to borrow or raise investment",
    "Companies that have grown past running the business from a bank balance and a spreadsheet",
  ],
  problems: [
    "We only know how we did when the accountant finishes the books, months later.",
    "Cash runs short even in good months, and we don't see it coming.",
    "We're not sure our prices cover our costs on every product.",
    "There's no budget, so there's nothing to measure performance against.",
    "The bank or investor asked for projections and we don't have them.",
    "Management meetings discuss problems without the numbers in front of us.",
  ],
  components: [
    { name: "Financial health diagnostic and baseline", level: "Company", detail: "Where the business stands today, scored and explained." },
    { name: "Financial records and reporting quality review", level: "Company", detail: "What's reliable, what's missing and what to fix." },
    { name: "13-week cash-flow forecast", level: "Company", detail: "A rolling forecast your team updates every week." },
    { name: "Profitability, pricing and unit economics analysis", level: "Company", detail: "Margins by product, customer or branch, and where pricing needs to change." },
    { name: "Budget and financial projections", level: "Company", detail: "A 12-month budget and multi-year projections." },
    { name: "Integrated financial model", level: "Company", detail: "Where the business needs one, for example before a loan or raise." },
    { name: "Management performance dashboard", level: "Company", detail: "One page of the numbers that matter, reviewed every month." },
    { name: "Monthly reporting and review framework", level: "Company", detail: "What gets reported, by when, and how the review meeting runs." },
    { name: "Financial performance action plan", level: "Company", detail: "The specific changes agreed, with owners and dates." },
    { name: "Handover and 12-month financial roadmap", level: "Company", detail: "What your team runs from day 91, and what comes next." },
  ],
  options: [],
  phases: [
    { weeks: "Weeks 1–2", stage: "Diagnose", activity: "Financial health diagnostic and a review of your records, bank and M-Pesa statements, KRA position and existing reports.", receive: ["Baseline assessment", "Records and reporting quality review"] },
    { weeks: "Weeks 3–5", stage: "Interpret and recommend", activity: "Cash position, profitability by product or customer, pricing and unit economics.", receive: ["13-week cash-flow forecast", "Profitability, pricing and unit economics analysis"] },
    { weeks: "Weeks 6–8", stage: "Build", activity: "Budget and projections, and an integrated model where the business needs one.", receive: ["Budget and financial projections", "Integrated financial model (where appropriate)"] },
    { weeks: "Weeks 9–11", stage: "Run", activity: "Dashboard and monthly review routine set up, and the first review held with your management team.", receive: ["Management performance dashboard", "Monthly reporting and review framework"] },
    { weeks: "Weeks 12–13", stage: "Hand over", activity: "Improvement actions agreed and the system handed over to your team.", receive: ["Financial performance action plan", "12-month financial roadmap"] },
  ],
  clientProvides: [
    "12 to 24 months of financial records, bank and M-Pesa statements",
    "Access to your accounting system, or the spreadsheets you use today",
    "About 2 to 3 hours a week of the owner's or managing director's time",
    "Time from whoever keeps your books or handles finance",
  ],
  exclusions: [
    "Bookkeeping backlogs beyond the months agreed in scope",
    "Tax filing and statutory audit",
    "Raising finance or guaranteeing a loan or investment",
    "Software licences",
  ],
  pricingDrivers: [
    "Size and complexity of the business",
    "State of the records at the start",
    "Whether an integrated financial model is needed",
    "Number of entities, branches or product lines",
  ],
  after: {
    title: "After day 90",
    text: "Your team can run the routine on its own. If you want senior finance leadership to keep it going, continue with a fractional CFO for an agreed number of days each month. Businesses that already have reliable systems can start with a fractional CFO directly.",
    href: "/fractional-cfo-services",
    label: "Explore Fractional CFO Services",
  },
  faqs: [
    { q: "What is included in a 90-day financial management engagement?", a: "Ten deliverables: a financial health diagnostic, a records and reporting review, a 13-week cash-flow forecast, profitability and pricing analysis, a budget and projections, an integrated model where needed, a management dashboard, a monthly reporting and review framework, an action plan, and a handover with a 12-month roadmap. Each one is agreed at the start." },
    { q: "What does a fractional CFO do for a growing SME?", a: "A fractional CFO gives you senior finance leadership for part of the month: management accounts, cash forecasts, budgets, pricing decisions, board and lender reporting, and the finance routines that keep the business in control. The 90-day system sets those routines up; a fractional CFO keeps them running if you want ongoing support." },
    { q: "How long does it take to set up management reporting?", a: "For most growing businesses, a working monthly reporting pack and review routine takes 8 to 11 weeks to set up, which is why it sits inside the 90-day programme. It takes longer when records need reconstructing first, and we agree that scope at the start." },
    { q: "Do we need an accounting system before we start?", a: "No. Many businesses start from spreadsheets and bank or M-Pesa statements. If an accounting system would help, we'll recommend one, and our Financial Systems service can set it up." },
    { q: "What does it cost?", a: "It is a fixed-scope engagement priced after a short consultation. The price depends on the size of the business, the state of the records, whether a full financial model is needed and how many entities or branches are involved. You'll receive a written proposal with the scope and deliverables before anything starts." },
    { q: "Will this help us get a loan or investment?", a: "It will give you the numbers lenders and investors ask for: reliable accounts, a cash forecast, a budget and projections. We don't arrange or guarantee finance. If you're preparing for a specific raise or loan, our Investment Readiness and Access to Finance services build on this work." },
  ],
  cta: { kind: "sme", label: "Discuss Your 90-Day Financial Plan", offer: "90-Day Financial Performance System" },
  secondaryCta: { label: "Explore Fractional CFO Services", href: "/fractional-cfo-services" },
};

export const OFFERS = [PORTFOLIO_FINANCE_SYSTEM, NINETY_DAY_SYSTEM];
