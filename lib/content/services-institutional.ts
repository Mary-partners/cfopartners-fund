import type { ServiceContent } from "./types";

/**
 * Services for institutions: investment funds, DFIs, accelerators, ESOs,
 * TA facilities and development partners.
 *
 * Founder figures are attributed to Mary Ndinda's prior experience and match
 * FOUNDER_EXPERIENCE (lib/impact.ts). No fees, no guaranteed outcomes.
 */
export const INSTITUTIONAL_SERVICES: ServiceContent[] = [
  /* ------------------------------------------------------------------ */
  /* 1. Portfolio Financial Management                                   */
  /* ------------------------------------------------------------------ */
  {
    slug: "portfolio-financial-management",
    name: "Portfolio Financial Management",
    seo: {
      title: "Portfolio Company Financial Management | CFOIP",
      description:
        "Portfolio company financial management for funds in East Africa: standard reporting, risk indicators, runway watch-lists and quarterly IC reports.",
      primaryKeyword: "portfolio company financial management",
      secondaryKeywords: [
        "portfolio monitoring",
        "financial reporting for investment funds",
        "portfolio company CFO support Africa",
      ],
    },
    eyebrow: "For investment funds",
    h1: "Portfolio Financial Management",
    summary:
      "CFO Innovation Partners runs portfolio company financial management for investment funds backing growing businesses in Kenya and East Africa. We put every portfolio company on one reporting template, track financial risk indicators and cash runway, and give the investment committee a quarterly portfolio report with an intervention log. Where a company needs more, we place fractional CFO support inside it.",
    atAGlance: [
      { label: "Who it's for", value: "Fund managers, investment directors and portfolio teams with SME or growth-stage portfolios" },
      { label: "Coverage", value: "Every portfolio company on one template, or a defined sub-set" },
      { label: "Reporting cadence", value: "Monthly or quarterly company submissions; quarterly portfolio report" },
      { label: "Location", value: "Nairobi-based, working across Kenya, East Africa and selected African markets" },
      { label: "Dashboard", value: "Portfolio reporting dashboard built and run for each engagement" },
      { label: "How to start", value: "Scoping call, then a short proposal covering portfolio size, depth and reporting needs" },
    ],
    whoFor: [
      "Fund managers investing in SMEs and growth-stage companies in East Africa",
      "Investment directors who need consistent numbers across the whole portfolio",
      "Portfolio and value-creation teams stretched across too many companies",
      "Impact and blended-finance funds reporting to LPs and DFI investors",
      "Funds whose portfolio companies lack a qualified finance lead",
    ],
    problems: [
      "Every portfolio company sends accounts in a different format, so we can't compare them.",
      "We find out about cash problems when the company asks for a bridge, not three months earlier.",
      "Management accounts arrive late, unreconciled or not at all.",
      "Our team spends IC preparation time chasing numbers instead of analysing them.",
      "We don't know whether covenants are close to breach until the annual audit.",
      "Several companies need a CFO but can't afford a full-time hire.",
    ],
    deliverables: [
      {
        name: "Standard reporting template and data dictionary",
        detail:
          "One template for all portfolio companies covering P&L, balance sheet, cash flow and KPIs, with a data dictionary that defines every line so figures mean the same thing across companies.",
        cadence: "Once, at set-up; reviewed annually",
      },
      {
        name: "Financial risk indicators",
        detail:
          "A defined set of indicators per company: cash runway, covenant headroom, customer concentration, gross and operating margin trend, and receivables ageing, with thresholds agreed with the fund.",
        cadence: "Monthly or quarterly",
      },
      {
        name: "Cash-runway watch-list",
        detail:
          "A ranked list of companies with less than the agreed months of runway, the drivers behind it and the recommended response.",
        cadence: "Monthly",
      },
      {
        name: "Data-quality score per company",
        detail:
          "A score for each submission based on timeliness, completeness, reconciliation and consistency with prior periods, so the IC knows how far to rely on the numbers.",
        cadence: "Each submission",
      },
      {
        name: "Intervention log and tracking",
        detail:
          "A record of every issue raised, the action agreed with management, who owns it and its status, carried forward period to period.",
        cadence: "Updated continuously; summarised quarterly",
      },
      {
        name: "Quarterly portfolio report for the investment committee",
        detail:
          "Portfolio-level view of performance, risk tiers, watch-list movements and open interventions, with analyst commentary on each company that needs attention.",
        cadence: "Quarterly",
      },
      {
        name: "Fractional CFO support inside selected companies",
        detail:
          "A CFOIP finance lead working inside companies the fund prioritises: monthly close, cash forecasting, board packs and lender reporting.",
        cadence: "Agreed days per month, per company",
      },
      {
        name: "Portfolio reporting dashboard",
        detail:
          "A dashboard built and run by CFOIP for the engagement, showing indicators per company and across the portfolio. Delivered within the engagement, with access arranged per mandate.",
        cadence: "Refreshed each reporting cycle",
      },
    ],
    process: [
      {
        stage: "Diagnose",
        detail:
          "We run the same financial diagnostic on every portfolio company: quality of records, reporting capacity, cash position, covenant terms and finance team.",
      },
      {
        stage: "Interpret",
        detail:
          "We compare results across the portfolio, assign each company a risk tier and identify which issues are company-specific and which are common.",
      },
      {
        stage: "Recommend",
        detail:
          "We propose an intervention plan by segment: template-only monitoring, light-touch support or fractional CFO placement, with the reasoning for each company.",
      },
      {
        stage: "Advise",
        detail:
          "We brief the investment committee and portfolio team on priorities, watch-list companies and decisions the fund needs to take.",
      },
      {
        stage: "Execute",
        detail:
          "We roll out the template, collect and quality-check submissions, and deliver hands-on finance support company by company where agreed.",
      },
      {
        stage: "Track",
        detail:
          "We update the dashboard and intervention log each cycle and issue a quarterly portfolio report showing what changed and what is still open.",
      },
    ],
    engagement: [
      { label: "Typical duration", value: "12 months, renewable; set-up usually completed in the first 6 to 8 weeks" },
      { label: "Cadence", value: "Monthly or quarterly submissions, quarterly IC report, ad hoc watch-list alerts" },
      { label: "Inputs needed", value: "Portfolio list, investment terms and covenants, latest accounts, a named contact at each company" },
      { label: "Team", value: "Engagement lead, portfolio analyst and fractional CFOs assigned to selected companies" },
      { label: "Scoping", value: "Scoped by number of companies, depth of support and reporting requirements" },
    ],
    evidence: {
      title: "Founder experience: OceanHub Africa portfolio support",
      text: "Before founding CFOIP, Mary Ndinda supported 15+ OceanHub Africa portfolio businesses with financial diagnostics, accounting systems, unit economics, forecasts and capital planning.",
      href: "/about",
    },
    faqs: [
      {
        q: "What data do you need from portfolio companies?",
        a: "At minimum, monthly or quarterly management accounts: P&L, balance sheet and a cash position, plus a small set of operating KPIs agreed with the fund. Where companies cannot yet produce these, we provide the standard template and help their finance staff complete it. We also need the investment terms and any covenants so we can track headroom. We do not ask companies for anything the fund would not reasonably expect under its investment agreement, and we agree the data list with you before roll-out.",
      },
      {
        q: "How do you handle confidentiality?",
        a: "We sign an NDA with the fund and, where needed, with each portfolio company. Company data is used only for the mandate and shared only with the people the fund names. Portfolio data is held in access-controlled storage and is not combined with other clients' data. Where a company provides information it does not want shared with the fund in detail, we agree in advance how it is summarised. We return or delete data at the end of the engagement as the contract specifies.",
      },
      {
        q: "How is this different from your pre- and post-investment support?",
        a: "Portfolio financial management is ongoing, portfolio-wide monitoring: one template, one set of indicators and one quarterly report across every company. Pre- and post-investment support is deal-linked. It covers work around a specific transaction, such as preparing a company for due diligence, setting up reporting after closing or delivering a 100-day finance plan. Many funds use both: deal-linked support as companies enter the portfolio, then ongoing monitoring once they are in.",
      },
      {
        q: "Is the portfolio dashboard a software product we subscribe to?",
        a: "No. The dashboard is built and run by CFOIP for each engagement. We set up the data model, collect and quality-check submissions, and publish the dashboard with analyst commentary. Access arrangements for your team are agreed per mandate. We do not sell it as a self-service product, and it does not replace the analysis we provide. Where your portfolio companies' accounting systems allow exports, we can use them to reduce manual work.",
      },
      {
        q: "Do you work in-country with portfolio companies?",
        a: "Yes. We are based at Watermark Business Park in Nairobi and work on site with companies in Kenya. For companies elsewhere in East Africa and in selected African markets, we combine remote work with site visits planned around key points such as set-up, year-end close and board meetings. Fractional CFO support usually includes regular in-person time where the company is within reach, and is agreed per company.",
      },
      {
        q: "How is work priced?",
        a: "Every mandate is scoped individually after a scoping call. The main drivers are the number of portfolio companies, the depth of support each one needs, how many receive fractional CFO time, and your reporting requirements to the IC and to LPs. We then send a short proposal with scope, team, timeline and commercial terms. We do not publish fees and we do not charge success fees.",
      },
    ],
    related: ["pre-post-investment-support", "portfolio-intelligence", "fractional-cfo-services"],
    audiences: ["investment-funds"],
    featuredOffer: {
      title: "Part of the Portfolio Finance System",
      text: "This service is one component of our flagship for funds and programmes, which combines portfolio reporting, embedded finance support and risk monitoring. Start with a diagnostic, a 90-day pilot or an ongoing retainer.",
      href: "/portfolio-finance-system",
      cta: "Explore the Portfolio Finance System",
    },
    cta: { kind: "institutional", label: "Discuss a Portfolio Support Mandate" },
    status: "Delivered within engagements",
  },

  /* ------------------------------------------------------------------ */
  /* 2. Pre- and Post-Investment Support                                 */
  /* ------------------------------------------------------------------ */
  {
    slug: "pre-post-investment-support",
    name: "Pre- and Post-Investment Support",
    seo: {
      title: "Pre- and Post-Investment Support in Africa | CFOIP",
      description:
        "Pre-investment assessment and post-investment support in Africa: quality-of-information reviews, IC briefings, 100-day finance plans and TA facility delivery.",
      primaryKeyword: "post-investment support Africa",
      secondaryKeywords: [
        "pre-investment assessment",
        "technical assistance facility",
        "100-day plan",
        "value creation",
      ],
    },
    eyebrow: "For funds and development partners",
    h1: "Pre- and Post-Investment Support",
    summary:
      "CFO Innovation Partners provides finance support around specific investments for funds, DFIs and TA facilities in Kenya and East Africa. Before investment, we assess the company's financial information, prepare it for due diligence and brief the investment committee. After closing, we deliver the 100-day finance plan, set up reporting and covenants, and strengthen the finance function.",
    atAGlance: [
      { label: "Who it's for", value: "Investment teams, DFIs and TA facility managers working on specific deals" },
      { label: "Pre-investment", value: "Typically 3 to 6 weeks per company" },
      { label: "Post-investment", value: "100-day finance plan, then TA as scoped" },
      { label: "Funding routes", value: "Fund-paid, or delivered under a technical assistance facility" },
      { label: "Location", value: "Nairobi-based; Kenya, East Africa and selected African markets" },
      { label: "How to start", value: "Share the pipeline or deal list; we scope company by company" },
    ],
    whoFor: [
      "Investment managers preparing a pipeline company for IC",
      "Funds that have closed a deal and need the finance basics in place quickly",
      "Technical assistance facilities attached to a fund or DFI programme",
      "DFIs and development partners co-financing SME investments",
      "Value-creation teams with more post-investment plans than capacity",
    ],
    problems: [
      "The company looks promising, but its numbers aren't ready for due diligence.",
      "We can't tell whether the management accounts reflect the business.",
      "The use-of-funds plan doesn't tie back to the forecast.",
      "We closed the deal and three months later still have no reliable monthly reporting.",
      "Covenants are in the agreement but nobody at the company is tracking them.",
      "Our TA facility has budget, but we need a provider who implements finance systems inside companies.",
    ],
    deliverables: [
      {
        name: "Pre-investment financial assessment",
        detail:
          "Review of historical accounts, management accounts, cash flow, unit economics and the finance team, with a clear view of strengths and gaps.",
        cadence: "Once per company, pre-IC",
      },
      {
        name: "Quality-of-information review",
        detail:
          "Assessment of how reliable the company's records are: reconciliations, revenue recognition, tax position, related-party items and consistency between sources.",
        cadence: "Once per company",
      },
      {
        name: "Financial due-diligence preparation (investee side)",
        detail:
          "Help for the company to assemble a data room, reconcile figures and answer finance questions, so the fund's diligence runs on clean information. We do not perform the fund's own due diligence.",
        cadence: "During the diligence window",
      },
      {
        name: "Use-of-funds review",
        detail:
          "Check that the proposed use of funds ties to the forecast, the operating plan and realistic timing, with risks flagged.",
        cadence: "Once per deal",
      },
      {
        name: "Readiness gap plan and IC briefing note",
        detail:
          "A short plan of what must be fixed before or after closing, and a briefing note for the investment committee summarising financial findings and conditions to consider.",
        cadence: "Once per deal",
      },
      {
        name: "100-day finance plan",
        detail:
          "A prioritised post-closing plan covering monthly close, cash forecasting, reporting to the fund, controls and finance staffing, with owners and dates.",
        cadence: "Agreed within the first 30 days after closing",
      },
      {
        name: "Reporting and covenant set-up",
        detail:
          "Monthly reporting pack in the fund's format and a covenant tracker the company maintains, with early-warning thresholds.",
        cadence: "Set up once; reviewed monthly",
      },
      {
        name: "Finance-function strengthening and TA delivery",
        detail:
          "Hands-on support to the company's finance team, including chart of accounts, controls, IFRS for SMEs alignment and audit readiness, delivered directly or under a TA facility.",
        cadence: "As scoped per company",
      },
      {
        name: "Quarterly progress report",
        detail:
          "Report to the fund or TA facility on progress against the 100-day plan and TA objectives, with open issues and next steps.",
        cadence: "Quarterly",
      },
    ],
    process: [
      {
        stage: "Diagnose",
        detail:
          "For each pipeline or newly closed company, we run a standard financial diagnostic covering records, reporting, cash, controls and finance capacity.",
      },
      {
        stage: "Interpret",
        detail:
          "We separate issues that affect the investment decision from those that can be fixed after closing, and compare companies on a consistent basis.",
      },
      {
        stage: "Recommend",
        detail:
          "We set out a readiness gap plan pre-investment and a 100-day finance plan post-investment, with priorities and owners.",
      },
      {
        stage: "Advise",
        detail:
          "We brief the deal team and investment committee, and agree with the TA facility which support will be funded and how it is measured.",
      },
      {
        stage: "Execute",
        detail:
          "We work with each company's management and finance staff to prepare for diligence, set up reporting and covenants, and deliver the agreed TA.",
      },
      {
        stage: "Track",
        detail:
          "We report progress against the plan to the fund or facility each quarter and record what has been completed, delayed or reprioritised.",
      },
    ],
    engagement: [
      { label: "Pre-investment", value: "3 to 6 weeks per company, aligned with the deal timetable" },
      { label: "Post-investment", value: "100 days for the finance plan; TA typically 3 to 12 months" },
      { label: "Inputs needed", value: "Investment memo or term sheet, company accounts, management access and the TA facility's ToR where relevant" },
      { label: "Contracting", value: "Directly with the fund, with the TA facility, or under a facility manager" },
      { label: "Scoping", value: "Scoped per company or as a call-off arrangement across a pipeline" },
    ],
    evidence: {
      title: "Founder experience: investment-readiness assessments",
      text: "In prior roles, Mary Ndinda assessed and recommended 50+ enterprises for investment consideration, with proposed tickets of USD 100K to 500K. These were recommendations for consideration; investment decisions rested with the funders.",
      href: "/about",
    },
    faqs: [
      {
        q: "Can you work under a donor-funded TA facility or respond to a ToR?",
        a: "Yes. We can contract with a fund's TA facility, a DFI-funded facility or a facility manager, and respond to ToRs and RFPs for finance-related TA. We work to the facility's reporting format and eligibility rules, and we agree measurable objectives per company at the start. Where the facility requires co-financing or company contributions, we build that into the work plan. We can also join a consortium led by another implementing partner.",
      },
      {
        q: "Do you carry out due diligence for the fund?",
        a: "No. We work on the investee side, helping the company prepare clean, reconciled information and respond to diligence questions. The fund's own financial due diligence should be done by its appointed adviser. Keeping these roles separate avoids conflicts. Where the fund asks us for a pre-investment financial assessment before formal diligence, we are clear in the briefing note about the scope of our review and what it does not cover.",
      },
      {
        q: "What does a 100-day finance plan cover?",
        a: "It covers the finance basics a fund needs from a new portfolio company: a monthly close, a 13-week cash forecast, a reporting pack in the fund's format, a covenant tracker, key controls over payments and payroll, and a view on finance staffing. Each item has an owner, a deadline and a definition of done. We agree it with management and the fund within 30 days of closing and report against it until it is complete.",
      },
      {
        q: "Does your involvement improve a company's chances of investment?",
        a: "We do not guarantee investment or influence a fund's decision. Our work improves the quality of the financial information the fund sees and identifies gaps early, so both sides can deal with them openly. Investment decisions remain entirely with the investor and its committee. We are not a broker, we do not introduce companies to investors for fees, and we do not take success fees on transactions.",
      },
      {
        q: "How do you handle confidentiality between the fund and the company?",
        a: "We agree at the start who our client is and who receives which outputs. Typically the fund or TA facility is the client, and the company consents to sharing its information for the engagement. Sensitive items, such as personal tax matters of founders, are summarised rather than passed on in detail unless the company agrees. Everyone involved signs appropriate NDAs, and data is held in access-controlled storage for the life of the mandate only.",
      },
      {
        q: "How is work priced?",
        a: "We scope each mandate after a scoping call. Pricing depends on the number of companies, the stage of each deal, the depth of TA required and the reporting the fund or facility expects. For pipelines, we can agree a call-off arrangement with a defined scope per company. We send a written proposal with scope, team, timeline and commercial terms. We do not publish fees and do not charge success fees.",
      },
    ],
    related: ["portfolio-financial-management", "investment-readiness", "enterprise-development-technical-assistance"],
    audiences: ["investment-funds", "accelerators-development-partners"],
    featuredOffer: {
      title: "Part of the Portfolio Finance System",
      text: "This service is one component of our flagship for funds and programmes, which combines portfolio reporting, embedded finance support and risk monitoring. Start with a diagnostic, a 90-day pilot or an ongoing retainer.",
      href: "/portfolio-finance-system",
      cta: "Explore the Portfolio Finance System",
    },
    cta: { kind: "institutional", label: "Discuss a Portfolio Support Mandate" },
  },

  /* ------------------------------------------------------------------ */
  /* 3. Enterprise Development & Technical Assistance                    */
  /* ------------------------------------------------------------------ */
  {
    slug: "enterprise-development-technical-assistance",
    name: "Enterprise Development & Technical Assistance",
    seo: {
      title: "Enterprise Development Consulting, East Africa | CFOIP",
      description:
        "Enterprise development consulting in East Africa: SME diagnostics, tailored TA pathways, financial management capacity building and MEL reporting for funders.",
      primaryKeyword: "enterprise development consulting East Africa",
      secondaryKeywords: [
        "SME technical assistance Africa",
        "MSME capacity building",
        "business development services Kenya",
      ],
    },
    eyebrow: "For development partners and funds",
    h1: "Enterprise Development & Technical Assistance",
    summary:
      "CFO Innovation Partners delivers enterprise development and technical assistance for development partners, ESOs and funds supporting SMEs in Kenya and East Africa. We diagnose each enterprise, group them by stage and binding constraint, and deliver tailored TA in financial management, systems and management capability. Funders receive MEL reporting on capability change per enterprise, not only attendance.",
    atAGlance: [
      { label: "Who it's for", value: "Development partners, ESOs, TA facilities and funds supporting SME cohorts" },
      { label: "Cohort size", value: "From a handful of enterprises to large multi-cohort programmes" },
      { label: "Delivery mix", value: "Group sessions, one-to-one advisory and hands-on implementation" },
      { label: "Reporting", value: "Per-enterprise progress tracking and MEL reporting to the funder" },
      { label: "Location", value: "Nairobi-based; in-person across Kenya, remote and on-site in East Africa" },
    ],
    whoFor: [
      "Donor and DFI programmes funding SME and MSME support",
      "Enterprise support organisations (ESOs) needing specialist finance TA",
      "Funds running a TA facility for portfolio or pipeline companies",
      "Corporate and foundation programmes supporting suppliers or local enterprises",
      "Lead implementing partners looking for a finance-focused delivery partner",
    ],
    problems: [
      "Our BDS reaches lots of enterprises, but we can't show that their finance practices changed.",
      "Every enterprise gets the same training, whatever its stage.",
      "Workshops are well attended, but nothing is implemented afterwards.",
      "Enterprises still can't produce the records a lender or investor asks for.",
      "Our MEL framework counts participants, and the funder is asking about outcomes.",
      "We need a partner who can deliver finance TA at scale without losing quality.",
    ],
    deliverables: [
      {
        name: "Enterprise diagnostics",
        detail:
          "A standard diagnostic for every enterprise covering records, financial performance, cash management, systems, governance and management capability.",
        cadence: "At intake; repeated at exit",
      },
      {
        name: "Segmentation by stage and binding constraint",
        detail:
          "Enterprises grouped by growth stage and the main constraint holding them back, such as records, cash, pricing, systems or management, so TA is matched to need.",
        cadence: "Once per cohort, after diagnostics",
      },
      {
        name: "Tailored TA pathways",
        detail:
          "A defined pathway per segment setting out which modules, one-to-one sessions and implementation support each enterprise receives, with expected milestones.",
        cadence: "Once per cohort; adjusted at mid-point",
      },
      {
        name: "Financial management capacity building",
        detail:
          "Group sessions on bookkeeping, management accounts, cash flow, costing and pricing, followed by one-to-one sessions applying them to each enterprise's own numbers.",
        cadence: "Weekly or fortnightly over the programme",
      },
      {
        name: "Implementation support",
        detail:
          "Hands-on help to set up accounting systems, records, reconciliations and a monthly reporting routine inside the enterprise.",
        cadence: "Per enterprise, as scoped",
      },
      {
        name: "Management capability development",
        detail:
          "Work with owners and managers on planning, delegation, financial decision-making and reporting to boards, lenders and investors.",
        cadence: "Through the programme",
      },
      {
        name: "Progress tracking per enterprise",
        detail:
          "A tracker showing each enterprise's milestones, practices adopted and remaining gaps, updated after every touchpoint.",
        cadence: "Updated continuously",
      },
      {
        name: "MEL reporting to the funder",
        detail:
          "Reports against agreed indicators that measure capability change, such as records kept, accounts produced and cash forecasts in use, alongside reach and attendance.",
        cadence: "Quarterly and end of programme",
      },
    ],
    process: [
      {
        stage: "Diagnose",
        detail:
          "Every enterprise in the cohort completes the same diagnostic, giving a consistent baseline for targeting and for MEL.",
      },
      {
        stage: "Interpret",
        detail:
          "We segment the cohort by stage and binding constraint and identify common gaps that are best handled in groups.",
      },
      {
        stage: "Recommend",
        detail:
          "We set out a TA pathway for each segment and a support plan for each enterprise, agreed with the programme team.",
      },
      {
        stage: "Advise",
        detail:
          "We guide the programme team on where to focus TA resources, which enterprises need more intensive support and which are ready for finance conversations.",
      },
      {
        stage: "Execute",
        detail:
          "We deliver group sessions, one-to-one advisory and implementation support enterprise by enterprise.",
      },
      {
        stage: "Track",
        detail:
          "We update the per-enterprise tracker after each touchpoint and report capability change to the funder quarterly and at programme close.",
      },
    ],
    engagement: [
      { label: "Typical duration", value: "6 to 18 months per cohort" },
      { label: "Cadence", value: "Weekly or fortnightly touchpoints per enterprise; quarterly funder reporting" },
      { label: "Inputs needed", value: "Programme objectives, enterprise list or selection criteria, MEL requirements and reporting formats" },
      { label: "Contracting", value: "Direct, under a TA facility, or as a sub-contractor to a lead implementer" },
      { label: "Scoping", value: "Scoped by number of enterprises, depth of TA and reporting requirements" },
    ],
    evidence: {
      title: "Founder experience: enterprise development at scale",
      text: "Mary Ndinda brings 12+ years in SME finance and enterprise development, with 2,000+ businesses supported across 11 sectors and programme experience including initiatives reaching 800+ SMEs.",
      href: "/about",
    },
    faqs: [
      {
        q: "Can you work under a donor-funded programme or respond to a ToR?",
        a: "Yes. We respond to ToRs and RFPs for SME technical assistance and enterprise development, either as lead or as a partner to an implementing organisation. We adapt to the funder's reporting formats, results framework and compliance requirements. Where a programme already has a design, we deliver against it. Where it does not, we can propose one through our programme design service. We are a Kenyan-registered firm based in Nairobi.",
      },
      {
        q: "How do you measure capability change rather than attendance?",
        a: "We use the same diagnostic at intake and at exit, scored against defined practices: for example, whether an enterprise keeps up-to-date books, produces monthly management accounts, reconciles its bank, uses a cash forecast and prices with costs in view. Change is recorded per enterprise, with evidence such as a completed set of accounts. Attendance and reach are still reported, but alongside these practice indicators, so the funder sees what has changed in the business.",
      },
      {
        q: "What data do you need from enterprises?",
        a: "At intake, we need basic business information, any existing records or accounts, bank statements for a recent period and time with the owner or manager for the diagnostic. Many enterprises start with incomplete records, and that is expected. During the programme, we work from their own books and help them build the records we later use to measure progress. Data requests are agreed with the programme team and kept proportionate to the support offered.",
      },
      {
        q: "How do you handle confidentiality?",
        a: "Enterprises share financial information with us for the purpose of the programme only. We agree with the funder what is reported at enterprise level and what is aggregated, and we get enterprises' consent for any named reporting. Data is held in access-controlled storage, not shared with third parties such as lenders without the enterprise's permission, and returned or deleted at programme close as the contract specifies.",
      },
      {
        q: "Do you work in-country?",
        a: "Yes. Our team is based in Nairobi and delivers in person across Kenya, including outside the main cities where the programme requires it. For cohorts elsewhere in East Africa and in selected African markets, we combine remote group sessions and one-to-one calls with planned field visits, or deliver with a local implementing partner. The delivery mix is agreed at scoping based on cohort location and budget.",
      },
      {
        q: "How is work priced?",
        a: "Each mandate is scoped after a scoping call or in response to a ToR. Pricing depends on the number of enterprises, the depth of TA per enterprise, the balance of group and one-to-one work, travel, and the MEL and reporting the funder requires. We then submit a proposal or bid with scope, team, work plan and budget in the format requested. We do not publish fees.",
      },
    ],
    related: ["programme-design", "pre-post-investment-support", "portfolio-intelligence"],
    audiences: ["accelerators-development-partners", "investment-funds"],
    cta: { kind: "institutional", label: "Discuss an Enterprise Support Programme" },
  },

  /* ------------------------------------------------------------------ */
  /* 4. Programme Design & Implementation                                */
  /* ------------------------------------------------------------------ */
  {
    slug: "programme-design",
    name: "Programme Design & Implementation",
    seo: {
      title: "Accelerator Programme Design & Implementation | CFOIP",
      description:
        "Accelerator and enterprise support programme design in Kenya and East Africa: selection tools, TA pathways, investment-readiness tracks and MEL frameworks.",
      primaryKeyword: "accelerator programme design",
      secondaryKeywords: [
        "enterprise support programme design",
        "investment readiness programme",
        "MEL framework",
      ],
    },
    eyebrow: "For accelerators and development partners",
    h1: "Programme Design & Implementation",
    summary:
      "CFO Innovation Partners designs and implements enterprise support, accelerator and investment-readiness programmes for development partners, foundations and ESOs in Kenya and East Africa. We produce the programme design, selection and diagnostic tools, TA pathways and MEL framework, and can run cohorts ourselves or with implementing partners. We also respond to ToRs and RFPs.",
    atAGlance: [
      { label: "Who it's for", value: "Development partners, foundations, DFIs, accelerators and ESOs" },
      { label: "Scope", value: "Design only, or design and implementation" },
      { label: "Design phase", value: "Typically 6 to 12 weeks" },
      { label: "Delivery", value: "Led by CFOIP or co-delivered with implementing partners" },
      { label: "Location", value: "Nairobi-based; Kenya, East Africa and selected African markets" },
      { label: "How to start", value: "Share your concept note, ToR or RFP" },
    ],
    whoFor: [
      "Development partners and DFIs commissioning new SME programmes",
      "Foundations and corporates launching accelerators or supplier development programmes",
      "Accelerators and ESOs redesigning an existing programme",
      "Funds building an investment-readiness pipeline programme",
      "Lead implementers needing a finance and investment-readiness design partner",
    ],
    problems: [
      "We have funding and a target group but no detailed programme design.",
      "Our accelerator selects enterprises on pitch quality, not on what support they need.",
      "Every cohort gets the same curriculum, whatever its stage.",
      "Investment-readiness outcomes are vague, and so is the reporting.",
      "Our MEL framework was added at the end and doesn't match the activities.",
      "We need a partner who can design the programme and also deliver it.",
    ],
    deliverables: [
      {
        name: "Programme design document",
        detail:
          "Objectives, target enterprises, eligibility, theory of change, delivery model, partner roles and risks, written to be shared with funders and boards.",
        cadence: "Once, design phase",
      },
      {
        name: "Selection and diagnostic instruments",
        detail:
          "Application form, scoring rubric and a standard enterprise diagnostic that serves both selection and the MEL baseline.",
        cadence: "Once; used each cohort",
      },
      {
        name: "Segmentation and pathway design",
        detail:
          "Rules for grouping enterprises by stage and binding constraint, and the support pathway for each segment.",
        cadence: "Once, design phase",
      },
      {
        name: "Curriculum and TA mix",
        detail:
          "Module outlines and the balance between group training, one-to-one advisory and hands-on implementation for each pathway.",
        cadence: "Once; refined after each cohort",
      },
      {
        name: "Investment-readiness track design",
        detail:
          "A track for enterprises approaching finance: financial records, model, use of funds, data room and readiness assessment criteria. It prepares enterprises for investor conversations and does not promise financing.",
        cadence: "Once, design phase",
      },
      {
        name: "MEL framework and indicators",
        detail:
          "Results framework, indicator definitions, data collection tools and reporting calendar, with capability-change indicators alongside reach.",
        cadence: "Once; reporting per agreed calendar",
      },
      {
        name: "Implementation plan, budget structure and staffing",
        detail:
          "Work plan, cohort calendar, budget lines and staffing model the funder can cost and approve.",
        cadence: "Once, design phase",
      },
      {
        name: "Delivery and cohort management",
        detail:
          "Where CFOIP implements: recruitment, selection, diagnostics, TA delivery, partner coordination and day-to-day cohort management.",
        cadence: "Through each cohort",
      },
      {
        name: "End-of-programme report",
        detail:
          "Results against the MEL framework, per-enterprise progress, lessons and recommendations for the next phase.",
        cadence: "At programme close",
      },
    ],
    process: [
      {
        stage: "Diagnose",
        detail:
          "We review the funder's objectives, target population and any previous programmes, and test assumptions with a sample of enterprises and partners.",
      },
      {
        stage: "Interpret",
        detail:
          "We identify the segments within the target group and the binding constraints the programme needs to address.",
      },
      {
        stage: "Recommend",
        detail:
          "We set out the programme design: theory of change, selection approach, pathways, TA mix, investment-readiness track and MEL framework.",
      },
      {
        stage: "Advise",
        detail:
          "We work through the design with the funder and programme team, adjust it to budget and partner capacity, and support approval.",
      },
      {
        stage: "Execute",
        detail:
          "Where we implement, we recruit and select the cohort, run diagnostics and deliver TA, alone or with implementing partners.",
      },
      {
        stage: "Track",
        detail:
          "We collect MEL data per enterprise, report on the agreed calendar and produce an end-of-programme report with lessons for the next phase.",
      },
    ],
    engagement: [
      { label: "Design phase", value: "6 to 12 weeks, depending on consultation and approvals" },
      { label: "Implementation", value: "Typically 6 to 24 months, one or more cohorts" },
      { label: "Inputs needed", value: "Concept note or ToR, funder objectives, target group, budget envelope and any existing MEL requirements" },
      { label: "Procurement", value: "Response to ToR or RFP, direct contract, or as part of a consortium" },
      { label: "Scoping", value: "Scoped by programme size, number of cohorts and whether CFOIP implements" },
    ],
    evidence: {
      title: "Founder experience: programme delivery",
      text: "Mary Ndinda's programme experience includes initiatives reaching 800+ SMEs, within 12+ years in SME finance, enterprise development and investment advisory.",
      href: "/about",
    },
    faqs: [
      {
        q: "Can you respond to a ToR or RFP?",
        a: "Yes. We respond to ToRs and RFPs for programme design, implementation, or both. We can bid as lead or as a technical partner within a consortium. Our proposals follow the format requested, including technical approach, work plan, team CVs and financial proposal. If a ToR is still in draft, we are happy to discuss scope at an early stage, provided this does not conflict with the funder's procurement rules.",
      },
      {
        q: "Can you design a programme that another organisation implements?",
        a: "Yes. Many clients ask us for design only. In that case we produce the design document, tools, curriculum outline, MEL framework and implementation plan in a form the implementer can use, and run a handover with their team. We can also provide light-touch quality assurance during the first cohort, reviewing diagnostics and MEL data, without taking on delivery. The handover pack is written so a new implementer can run a cohort without our involvement.",
      },
      {
        q: "How do you co-deliver with implementing partners?",
        a: "We agree roles at design stage. Typically CFOIP leads the finance, investment-readiness and MEL components, while partners lead areas such as sector-specific technical support, market access or community outreach. We share one diagnostic, one tracker and one reporting calendar so the funder receives a single picture. Coordination, quality standards, data-sharing terms and escalation routes are written into the implementation plan.",
      },
      {
        q: "Does the investment-readiness track lead to financing for enterprises?",
        a: "We do not guarantee financing for any enterprise. The track prepares enterprises to present reliable financial information, a credible forecast and a clear use of funds, and assesses readiness against defined criteria. Some programmes include investor sessions organised by the funder or partners. Investment decisions rest with investors. We are not a broker and do not take fees for investor introductions.",
      },
      {
        q: "What does your MEL framework measure?",
        a: "It measures reach, delivery and outcomes. Alongside the usual counts of enterprises and sessions, it tracks capability change per enterprise using the intake and exit diagnostic: practices such as monthly management accounts, cash forecasting and costing. Where the funder requires business outcomes such as revenue or jobs, we define them carefully and set out the data sources and their limits. Indicators are agreed with the funder before the first cohort starts.",
      },
      {
        q: "How is work priced?",
        a: "We scope each mandate after a scoping call or from the ToR. The main drivers are whether the work is design only or design and implementation, the number of cohorts and enterprises, the depth of TA, consultation required and MEL obligations. We then submit a proposal with scope, team, work plan and budget in the format the funder requests. We do not publish fees.",
      },
    ],
    related: ["enterprise-development-technical-assistance", "investment-readiness", "portfolio-intelligence"],
    audiences: ["accelerators-development-partners"],
    cta: { kind: "institutional", label: "Discuss an Enterprise Support Programme" },
  },

  /* ------------------------------------------------------------------ */
  /* 5. Portfolio Intelligence                                           */
  /* ------------------------------------------------------------------ */
  {
    slug: "portfolio-intelligence",
    name: "Portfolio Intelligence",
    seo: {
      title: "Portfolio Monitoring Dashboards for Funds | CFOIP",
      description:
        "Portfolio monitoring dashboards built and run for funds and programmes in East Africa: company indicators, risk tiers, data-quality checks and analyst notes.",
      primaryKeyword: "portfolio monitoring dashboard",
      secondaryKeywords: [
        "impact fund reporting",
        "cohort reporting dashboard",
        "portfolio data",
      ],
    },
    eyebrow: "For funds and programmes",
    h1: "Portfolio Intelligence",
    summary:
      "CFO Innovation Partners builds and runs portfolio monitoring dashboards for investment funds and enterprise support programmes in Kenya and East Africa. Each dashboard is set up for the engagement and shows financial indicators, risk tiers, cash runway, data quality and intervention progress per company and across the portfolio. Every update comes with analyst commentary, a quarterly report and an IC briefing.",
    atAGlance: [
      { label: "Who it's for", value: "Funds, DFIs, TA facilities and programmes monitoring many companies" },
      { label: "Status", value: "Delivered within engagements; not a self-service product" },
      { label: "Data source", value: "Monthly or quarterly management accounts, or a standard template" },
      { label: "Refresh", value: "Each reporting cycle, after quality checks" },
      { label: "Outputs", value: "Dashboard, quarterly report and IC or programme briefing" },
      { label: "How to start", value: "Scoping call on portfolio size, indicators and reporting needs" },
    ],
    whoFor: [
      "Investment funds needing a consistent view across portfolio companies",
      "Impact funds reporting to LPs and DFI investors",
      "TA facilities and programmes tracking cohort progress",
      "Development partners needing comparable data across implementing partners",
    ],
    problems: [
      "Our portfolio data sits in dozens of spreadsheets in different formats.",
      "We can't see which companies are running out of cash until it's urgent.",
      "LP reporting takes weeks because the numbers have to be rebuilt each quarter.",
      "We have a dashboard, but nobody trusts the data behind it.",
      "Our programme reports show attendance, not whether enterprises are improving.",
    ],
    deliverables: [
      {
        name: "Portfolio data model and indicator set",
        detail:
          "Agreed indicators and definitions for every company, aligned with the standard reporting template, so figures are comparable across the portfolio.",
        cadence: "Once, at set-up",
      },
      {
        name: "Portfolio reporting dashboard",
        detail:
          "Built and run by CFOIP for the engagement. Shows financial indicators per company and across the portfolio, risk tiers, the runway watch-list, data quality, intervention progress and, for programmes, cohort capability change. Access arrangements are agreed per mandate.",
        cadence: "Refreshed each reporting cycle",
      },
      {
        name: "Submission collection and quality checks",
        detail:
          "We collect submissions, check them against prior periods and source documents, follow up gaps with companies and score data quality before anything is published.",
        cadence: "Each reporting cycle",
      },
      {
        name: "Company reporting support",
        detail:
          "Help for companies that cannot yet produce management accounts or complete the template, so the dataset is complete.",
        cadence: "As needed",
      },
      {
        name: "Quarterly portfolio report",
        detail:
          "Written analysis of portfolio performance, risk-tier movements, watch-list companies and intervention status, suitable for IC, LP or funder reporting.",
        cadence: "Quarterly",
      },
      {
        name: "IC or programme briefing",
        detail:
          "A short briefing for the investment committee or programme team on what changed, why it matters and decisions to consider.",
        cadence: "Quarterly, or ahead of IC meetings",
      },
    ],
    process: [
      {
        stage: "Diagnose",
        detail:
          "We review current portfolio reporting, the data each company can produce and what the IC, LPs or funder need to see.",
      },
      {
        stage: "Interpret",
        detail:
          "We define the indicator set, risk-tier rules and data-quality criteria, and map each company's data to the standard model.",
      },
      {
        stage: "Recommend",
        detail:
          "We agree the dashboard views, reporting calendar and thresholds that trigger a watch-list entry or intervention.",
      },
      {
        stage: "Advise",
        detail:
          "Each cycle, we brief the portfolio or programme team on what the data shows and where judgement is needed.",
      },
      {
        stage: "Execute",
        detail:
          "We set up the data model and dashboard, collect and quality-check submissions, and support companies that need help producing their figures.",
      },
      {
        stage: "Track",
        detail:
          "We refresh the dashboard each cycle, log interventions and issue the quarterly report with analyst commentary.",
      },
    ],
    engagement: [
      { label: "Set-up", value: "Typically 4 to 8 weeks to agree indicators, build the data model and load the first period" },
      { label: "Cadence", value: "Monthly or quarterly refresh; quarterly report and briefing" },
      { label: "Inputs needed", value: "Portfolio or cohort list, existing reports, investment terms and a contact at each company" },
      { label: "Access", value: "Dashboard access arrangements agreed per mandate" },
      { label: "Scoping", value: "Scoped by number of companies, indicators, refresh frequency and reporting requirements" },
    ],
    evidence: {
      title: "Founder experience: portfolio-level financial work",
      text: "Before founding CFOIP, Mary Ndinda supported 15+ OceanHub Africa portfolio businesses with financial diagnostics, accounting systems, unit economics, forecasts and capital planning.",
      href: "/about",
    },
    faqs: [
      {
        q: "Is this a software product we log into and run ourselves?",
        a: "No. Portfolio Intelligence is delivered within engagements. CFOIP builds the dashboard for your portfolio, collects and checks the data, and publishes each update with analyst commentary. Access arrangements for your team are agreed per mandate. We do not offer it as a self-service subscription, and the dashboard does not replace professional judgement: every report is reviewed by an analyst before it reaches you.",
      },
      {
        q: "What data do you need from portfolio companies?",
        a: "Monthly or quarterly management accounts, or a completed standard template covering P&L, balance sheet, cash and a small set of agreed operating KPIs. For programmes, we also use the intake and exit diagnostic to show capability change. Where companies cannot produce this yet, we help them. We agree the data list with you so it stays proportionate to the size of the companies and the support they receive.",
      },
      {
        q: "Can the dashboard pull data directly from companies' accounting systems?",
        a: "Where the client's and companies' systems allow, we can use exports from accounting software to reduce manual entry. In practice, many SMEs in the region use a mix of systems or spreadsheets, so we design the process around a standard submission template that works for everyone. Every submission goes through the same quality checks, whatever its source. We do not claim automated feeds where they are not in place.",
      },
      {
        q: "How do you handle confidentiality and data security?",
        a: "Company data is used only for the mandate and shared only with people the client names. Data is held in access-controlled storage, separated by client, and is not combined with other clients' data or used for benchmarking without written consent. Everyone working on the engagement is bound by confidentiality terms. At the end of the mandate, data is returned or deleted as the contract specifies.",
      },
      {
        q: "Can you produce reports for our LPs or funder?",
        a: "Yes. The quarterly portfolio report can be structured to support LP, DFI or donor reporting, and we can map indicators to the formats you already use. For impact funds, we can include the operating and impact indicators you report on, provided companies can supply them reliably. We flag where data quality limits what can be said, so your reports stay accurate.",
      },
      {
        q: "How is work priced?",
        a: "Each mandate is scoped after a scoping call. Pricing depends on the number of companies, the indicator set, how often the dashboard is refreshed, how much reporting support companies need and the reports you require for the IC, LPs or funders. We then send a proposal with scope, team, timeline and commercial terms. Pricing is set per mandate and we do not publish fees.",
      },
    ],
    related: ["portfolio-financial-management", "pre-post-investment-support", "enterprise-development-technical-assistance"],
    audiences: ["investment-funds", "accelerators-development-partners"],
    featuredOffer: {
      title: "Part of the Portfolio Finance System",
      text: "This service is one component of our flagship for funds and programmes, which combines portfolio reporting, embedded finance support and risk monitoring. Start with a diagnostic, a 90-day pilot or an ongoing retainer.",
      href: "/portfolio-finance-system",
      cta: "Explore the Portfolio Finance System",
    },
    cta: { kind: "institutional", label: "Discuss a Portfolio Support Mandate" },
    status: "Delivered within engagements",
  },
];
