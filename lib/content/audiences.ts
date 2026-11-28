import type { AudienceContent } from "./types";

/**
 * Audience pages: who we work with, the problems they bring, and how the
 * six-stage method applies to them. Figures are the founder's experience
 * (FOUNDER_EXPERIENCE in lib/impact.ts) and are always attributed to her.
 */
export const AUDIENCES: AudienceContent[] = [
  {
    slug: "investment-funds",
    name: "Investment Funds & DFIs",
    seo: {
      title: "Finance Support for Funds & DFIs in East Africa | CFOIP",
      description:
        "Embedded CFO support, portfolio reporting and post-investment financial management for funds, DFIs and lenders investing in SMEs in Kenya and East Africa.",
      primaryKeyword: "finance support for investment funds and DFIs in East Africa",
      secondaryKeywords: [
        "SME fund portfolio support Kenya",
        "impact fund portfolio support East Africa",
        "post-investment support East Africa",
        "SME fund portfolio reporting",
        "DFI technical assistance Kenya",
        "pre-investment due diligence support",
      ],
    },
    eyebrow: "For investment funds and DFIs",
    h1: "Financial support for the businesses in your portfolio",
    summary:
      "CFO Innovation Partners (CFOIP) is a Nairobi-based advisory and implementation firm that supports investment funds, DFIs and lenders with portfolio financial management, pre- and post-investment support and fractional CFO capacity for portfolio companies. We work across Kenya and East Africa, applying one diagnostic and reporting framework across every company so investment teams can compare performance and act on risk early.",
    whoFor: [
      "Impact funds, private equity and venture capital funds investing in SMEs",
      "Development finance institutions (DFIs) and blended finance facilities",
      "SME debt funds, banks and non-bank lenders",
      "Foundations deploying capital through grants, debt or equity",
      "Portfolio managers responsible for post-investment performance",
      "Investment committees that need better pipeline documentation",
    ],
    problems: [
      "We have limited visibility into how portfolio companies are performing financially between reporting periods.",
      "Each company reports in a different format, so we cannot compare performance across the portfolio.",
      "Investment documentation from pipeline companies is weak, and our team rebuilds models before every committee.",
      "Due diligence preparation takes too long and costs too much for deals of this size.",
      "Founders are running finance alone, and management capacity is thin across the portfolio.",
      "Cash-flow forecasts are unreliable, so covenant pressure and liquidity problems surface late.",
      "Post-investment reporting arrives late, incomplete or with numbers that do not reconcile.",
      "We know some companies need technical assistance, but it is hard to tell which support each one needs.",
    ],
    services: [
      "portfolio-financial-management",
      "pre-post-investment-support",
      "investment-readiness",
      "fractional-cfo-services",
      "portfolio-intelligence",
      "financial-systems",
    ],
    process: [
      {
        stage: "Diagnose",
        detail:
          "We run the same financial diagnostic across every portfolio or pipeline company, covering records, cash flow, reporting, controls and management capacity.",
      },
      {
        stage: "Interpret",
        detail:
          "We segment the portfolio by stage and binding constraint, and assign each company a risk tier your investment team can act on.",
      },
      {
        stage: "Recommend",
        detail:
          "We set out an intervention plan by segment, with priorities ordered for 90 days and for 6 to 12 months, so support goes where risk is highest.",
      },
      {
        stage: "Advise",
        detail:
          "We brief your investment committee and portfolio team on findings, flag companies that need closer attention and advise on TA allocation.",
      },
      {
        stage: "Execute",
        detail:
          "We deliver support company by company: fractional CFO input, management accounts, forecasts, reporting packs and financial systems.",
      },
      {
        stage: "Track",
        detail:
          "We produce a quarterly portfolio report and an intervention log, so you can see what changed in each company and where risk remains.",
      },
    ],
    evidence: {
      title: "Founder experience with fund portfolios",
      text: "Our founder, Mary Ndinda, has supported 15+ OceanHub Africa portfolio businesses with financial diagnostics, accounting systems, unit economics, forecasts and capital planning. Her investment assessment experience includes 50+ enterprises recommended for investment consideration in the USD 100K–500K range.",
      href: "/about",
    },
    faqs: [
      {
        q: "Can you respond to a terms of reference or procurement process?",
        a: "Yes. We respond to terms of reference, requests for proposals and direct procurement from funds, DFIs and lenders. A response usually sets out our understanding of the mandate, the diagnostic and reporting approach, the team matched to the work, the workplan and the reporting schedule. If your process needs a specific format, compliance documents or a technical and financial proposal in separate envelopes, tell us early and we will prepare to that structure. We are happy to take a short scoping call before you issue the ToR.",
      },
      {
        q: "How do you handle confidentiality of portfolio data?",
        a: "We sign a non-disclosure agreement before receiving portfolio or pipeline data, and we can work under your own data-sharing terms. Company data is used only for the mandate. We do not name clients or portfolio companies in our marketing, and we do not share one company's information with another. Portfolio reports go to the people you nominate. Where portfolio companies share data directly with us, we agree in advance what goes into fund-level reporting and what stays between us and the company.",
      },
      {
        q: "What data do you need from us and from portfolio companies?",
        a: "At fund level, we need the portfolio list, the investment terms that matter for reporting (such as covenants and milestones), your current reporting templates and any recent monitoring reports. From each company, we usually ask for the last two to three years of financial statements, recent management accounts, bank statements, the current budget or forecast and a short management interview. Where records are incomplete, that is itself a finding. We tell you which companies could not provide the minimum data set.",
      },
      {
        q: "How is a portfolio mandate scoped and priced?",
        a: "We scope each mandate around the number of companies, the depth of support each one needs and the reporting cadence you want. A typical scope separates the initial portfolio diagnostic from ongoing company support and quarterly reporting, so you can approve each part on its own. We agree the scope in writing before work starts. Pricing follows that scope and is set out in our proposal. We do not publish standard fees because portfolios differ too much in size and need.",
      },
      {
        q: "Do you guarantee that portfolio companies will raise follow-on funding?",
        a: "No. We do not guarantee financing, investment or approval for any company. Our role is to improve the quality of financial information, systems and management practice, and to prepare documentation that lets investors make their own decisions. We are not a broker, and we do not take positions in the companies we support. Funding decisions rest with the investor or lender. We will tell you plainly where a company is not ready for further capital and what would need to change.",
      },
      {
        q: "Can you work alongside our existing TA facility or portfolio team?",
        a: "Yes. Many funds already run a technical assistance facility or have portfolio managers in place. We can take on a defined part of the work, such as the diagnostic, financial reporting support or fractional CFO capacity for selected companies, and report into your existing structure. We agree roles at the start so companies are not asked for the same information twice. We can also help you decide which companies would benefit most from TA before you commit budget.",
      },
    ],
    cta: { kind: "institutional", label: "Discuss a Portfolio Finance Pilot" },
    secondaryCta: {
      label: "Explore Our Portfolio Services",
      href: "/portfolio-financial-management",
    },
    featuredOffer: {
      title: "Portfolio Finance System",
      text: "Our flagship for funds: one reporting standard across your companies, embedded finance support where it is needed, and a monthly view of performance, cash runway and risk. Start with a diagnostic, a 90-day pilot or an ongoing retainer.",
      points: [
        "Portfolio Diagnostic: 4 to 6 weeks",
        "90-Day Portfolio Finance Implementation: a defined pilot",
        "Embedded Portfolio CFO Retainer: ongoing oversight",
      ],
      href: "/portfolio-finance-system",
      cta: "Explore portfolio company CFO support",
    },
    keyQuestions: [
      {
        q: "How does a fund monitor financial performance across its portfolio?",
        a: "With one reporting standard that every company follows, checked for quality each month and summarised in a portfolio dashboard with commentary. We set the standard up, help each company meet it, and run the monthly cycle with your team.",
        deliverables: ["Reporting template and data dictionary", "Monthly data-quality checks", "Portfolio dashboard with analyst commentary", "Quarterly portfolio report"],
      },
      {
        q: "What happens when portfolio companies lack senior finance leadership?",
        a: "A CFOIP finance associate works inside the company for an agreed number of days each month, running the close, forecasts and board or lender reporting, and building the team so the company can take over.",
        deliverables: ["Monthly management accounts", "13-week cash forecast", "Board and lender packs", "Finance-function improvement plan"],
      },
      {
        q: "How can reporting be standardised across companies using different accounting systems?",
        a: "Each company keeps its own system. We map every chart of accounts to one template, define each line in a data dictionary, and help companies produce the standard pack until they can do it alone.",
        deliverables: ["Chart-of-accounts mapping per company", "Standard monthly reporting pack", "Data dictionary", "Submission calendar"],
      },
      {
        q: "How can a fund identify liquidity and financial management risks early?",
        a: "By tracking a small set of indicators against agreed thresholds every month: cash runway, covenant headroom, customer concentration, margin trend and receivables ageing. Companies that cross a threshold go onto a watch-list with the drivers and a recommended response.",
        deliverables: ["Financial risk indicators per company", "Cash-runway watch-list", "Risk tiers across the portfolio", "Recommended responses"],
      },
      {
        q: "What financial support should portfolio companies receive in the first 100 days after investment?",
        a: "Reporting and covenant monitoring set up from day one, a cash forecast that reflects the new capital, basic controls over its use, and a finance plan the board agrees. We deliver this as a 100-day finance plan.",
        deliverables: ["100-day finance plan", "Reporting and covenant set-up", "Use-of-funds controls", "Board-approved budget"],
      },
      {
        q: "How can a technical assistance facility prioritise interventions across a portfolio?",
        a: "Diagnose every company on the same instrument, rank them by financial risk and binding constraint, and fund the interventions that address the highest risks first. Each intervention is logged with an owner, status and result.",
        deliverables: ["Portfolio diagnostic and scorecards", "Risk segmentation", "Prioritised intervention plan", "Intervention log for donor reporting"],
      },
    ],
  },
  {
    slug: "accelerators-development-partners",
    name: "Accelerators & Development Partners",
    seo: {
      title: "SME Technical Assistance in Africa | CFOIP",
      description:
        "Enterprise development, technical assistance and programme design for accelerators, ESOs and development partners supporting SMEs in Kenya and East Africa.",
      primaryKeyword: "SME technical assistance Africa",
      secondaryKeywords: [
        "enterprise development programmes Kenya",
        "accelerator programme design",
        "technical assistance for SMEs East Africa",
        "investment readiness programme",
        "SME cohort diagnostics",
      ],
    },
    eyebrow: "For accelerators and development partners",
    h1: "Enterprise programmes that change how businesses are run",
    summary:
      "CFO Innovation Partners (CFOIP) designs and delivers enterprise development, technical assistance and investment readiness programmes for accelerators, incubators and development partners. Based in Nairobi and working across East Africa, we diagnose every enterprise in a cohort, segment it by need and deliver tailored support company by company, with reporting that shows how capability changes over time.",
    whoFor: [
      "Accelerators and incubators running SME or start-up cohorts",
      "Development partners and donor-funded enterprise programmes",
      "Enterprise support organisations (ESOs)",
      "Technical assistance facilities attached to funds or programmes",
      "Corporate venture and supplier development programmes",
      "Foundations funding enterprise growth",
      "Programme implementers that need a specialist finance partner",
    ],
    problems: [
      "Our training is generic, and enterprises at very different stages sit through the same sessions.",
      "We do not segment cohorts well, so support is not matched to each business's real constraint.",
      "Few enterprises go on to secure financing after the programme ends.",
      "Workshops end, but there is not enough hands-on support to put the changes into practice.",
      "It is hard to measure whether financial and management capability has improved.",
      "Financial reporting across the cohort is inconsistent, so we cannot compare progress.",
      "There is no structured follow-up after the programme, and gains fade.",
    ],
    services: [
      "enterprise-development-technical-assistance",
      "programme-design",
      "investment-readiness",
      "portfolio-intelligence",
      "pre-post-investment-support",
      "financial-modelling",
    ],
    process: [
      {
        stage: "Diagnose",
        detail:
          "Every enterprise in the cohort completes the same structured diagnostic, giving you a consistent baseline on finance, operations and management capacity.",
      },
      {
        stage: "Interpret",
        detail:
          "We segment the cohort by stage, business profile and binding constraint, so each group gets support that fits where it is.",
      },
      {
        stage: "Recommend",
        detail:
          "We design an intervention plan by segment, with an action map for each enterprise and clear priorities for the programme team.",
      },
      {
        stage: "Advise",
        detail:
          "We guide your programme team on cohort design, selection and resourcing, and run advisory sessions with founders on their priorities.",
      },
      {
        stage: "Execute",
        detail:
          "We deliver technical assistance company by company: records, management accounts, models, pricing, systems and investment readiness documents.",
      },
      {
        stage: "Track",
        detail:
          "We measure change against the baseline and report quarterly with an intervention log, giving you evidence for funders and programme reviews.",
      },
    ],
    evidence: {
      title: "Founder experience with enterprise programmes",
      text: "Our founder, Mary Ndinda, has worked on programmes reaching 800+ SMEs and has supported 2,000+ businesses across 11 sectors. She designs diagnostics, segmentation tools, tailored advisory pathways and founder capacity-building programmes for accelerators and development partners.",
      href: "/about",
    },
    faqs: [
      {
        q: "Can you respond to a terms of reference for a programme?",
        a: "Yes. We respond to terms of reference and requests for proposals from development partners, implementers and accelerators, either as lead or as the finance and technical assistance partner in a consortium. A typical response covers the diagnostic approach, segmentation method, delivery model, team, workplan and the MEL indicators we will report against. If you are still shaping the programme, we can take a scoping call before the ToR is issued and comment on what is realistic for the budget and timeline.",
      },
      {
        q: "How do you measure capability change across a cohort?",
        a: "We use the same diagnostic at the start and at agreed points during and after the programme. That gives each enterprise a baseline and a comparable later score on areas such as financial records, cash management, reporting, pricing and governance. We report changes by segment and by enterprise, together with an intervention log showing what support each business received. We can align our indicators with your existing MEL framework or your funder's results framework rather than introducing a separate set.",
      },
      {
        q: "Can you design a programme as well as deliver it?",
        a: "Yes. We design programmes from the start, including selection criteria, the diagnostic instrument, segmentation, advisory pathways, curriculum, follow-up and reporting. We can also review and improve an existing programme design before a new cohort begins. Some partners ask us to design and deliver; others ask us to design the finance and investment readiness components and train their own team to run them. We agree which model suits your capacity and budget during scoping.",
      },
      {
        q: "How is the work scoped and priced?",
        a: "Scope depends on cohort size, the depth of company-by-company support, programme length and reporting requirements. We usually separate design, diagnostic, delivery and follow-up into distinct workstreams so you can see what each part involves. We agree scope and deliverables in writing before work begins, and pricing is set out in our proposal against that scope. We do not publish standard fees because programmes vary widely in size and structure.",
      },
      {
        q: "Do you guarantee that enterprises in the programme will raise funding?",
        a: "No. We do not guarantee financing, investment or grant approval for any enterprise. We prepare businesses so that their financial information, models and documents meet the standard investors and lenders expect, and we help them approach suitable sources. We are not a broker. Funding decisions rest with the investor, lender or grant maker. Your reporting will show how many enterprises reached an agreed readiness standard, which is a measure we can stand behind.",
      },
      {
        q: "How do you keep enterprise data confidential?",
        a: "We sign confidentiality agreements with the programme owner and, where needed, with participating enterprises. Each enterprise's data is used only for the programme and is not shared with other participants. Programme-level reports use aggregated data unless the enterprise has agreed to be named or the reporting terms say otherwise. We agree at the start what the programme team, funders and evaluators will see, so founders know how their information will be used.",
      },
    ],
    cta: { kind: "institutional", label: "Discuss an Enterprise Support Programme" },
    secondaryCta: {
      label: "Explore Technical Assistance Services",
      href: "/enterprise-development-technical-assistance",
    },
    featuredOffer: {
      title: "Portfolio Finance System for cohorts",
      text: "The same framework works for an enterprise cohort or a technical assistance programme: a diagnostic for every business, segmentation by need, hands-on financial management support, capacity building and financing readiness, with cohort-level reporting to your funders.",
      points: [
        "Cohort diagnostic and segmentation",
        "Implementation support and capacity building",
        "Cohort dashboard and reporting to funders",
      ],
      href: "/portfolio-finance-system",
      cta: "Explore the Portfolio Finance System",
    },
  },
  {
    slug: "growing-businesses",
    name: "Growing Businesses",
    seo: {
      title: "CFO Services for SMEs in Kenya | CFOIP",
      description:
        "Fractional CFO support, financial systems, financial modelling and investment readiness for growing SMEs in Kenya and East Africa. Based in Nairobi.",
      primaryKeyword: "CFO services for SMEs Kenya",
      secondaryKeywords: [
        "fractional CFO Nairobi",
        "part-time CFO Kenya",
        "SME financial modelling",
        "investment readiness Kenya",
        "cash flow management for SMEs",
      ],
    },
    eyebrow: "For growing businesses",
    h1: "Senior finance leadership for growing businesses",
    summary:
      "CFO Innovation Partners (CFOIP) gives growing SMEs in Kenya and East Africa access to senior finance leadership on a fractional basis. From our Nairobi base, we set up the records, reporting, forecasts and financial systems a business needs to manage cash, price well and prepare for lenders or investors.",
    whoFor: [
      "Revenue-generating SMEs that have outgrown basic bookkeeping",
      "Growth-stage businesses planning expansion into new products or markets",
      "Founder-led businesses where the founder still runs the finances",
      "Businesses preparing to approach banks, lenders or investors",
      "Companies that need senior finance leadership but not a full-time CFO",
      "Businesses expanding operations, locations or headcount",
    ],
    problems: [
      "Our records are incomplete, and we only find out how we performed months later.",
      "We do not know how much cash we will have next month.",
      "We are not sure which products or customers actually make money.",
      "Our forecasts are guesses, and we keep missing them.",
      "Growth is tying up cash in stock and receivables, and we are always short.",
      "Monthly reports arrive late, if at all.",
      "There are no budgets, approvals or management systems, so everything comes back to the founder.",
      "We want to approach a bank or investor, but we do not know what they will ask for.",
    ],
    services: [
      "fractional-cfo-services",
      "financial-systems",
      "financial-modelling",
      "investment-readiness",
      "access-to-finance-advisory",
    ],
    process: [
      {
        stage: "Diagnose",
        detail:
          "We review your records, cash position, margins, reporting and systems using a structured diagnostic, and talk through what you want the business to achieve.",
      },
      {
        stage: "Interpret",
        detail:
          "We identify your stage of growth and the one or two constraints holding the business back, such as cash, pricing or reporting.",
      },
      {
        stage: "Recommend",
        detail:
          "You receive a 90-day action map and a 6-to-12-month plan, with priorities in order and owners named.",
      },
      {
        stage: "Advise",
        detail:
          "We meet you regularly as your finance lead, and can act as a virtual board or strategy committee for major decisions.",
      },
      {
        stage: "Execute",
        detail:
          "We put the work in place: management accounts, cash-flow forecasts, budgets, pricing analysis, financial models and accounting systems.",
      },
      {
        stage: "Track",
        detail:
          "We report against agreed KPIs each month, review progress with you and adjust the plan as the business changes.",
      },
    ],
    evidence: {
      title: "Founder experience with growing businesses",
      text: "Our founder, Mary Ndinda, has 12+ years in SME finance, enterprise development and investment advisory, and has supported 2,000+ businesses across 11 sectors with financial strategy, forecasting, cash-flow management, pricing and reporting.",
      href: "/about",
    },
    faqs: [
      {
        q: "What is a fractional CFO, and is it right for my business?",
        a: "A fractional CFO is a senior finance lead who works with your business for a set number of days or hours each month. You get financial strategy, forecasting, reporting and decision support without the cost of a full-time hire. It usually suits revenue-generating businesses where the founder is still running finance, the bookkeeper cannot provide forward-looking analysis, or the business is preparing for growth or financing. We will tell you during the first consultation if a smaller piece of work would serve you better.",
      },
      {
        q: "What information do you need to get started?",
        a: "For the first review, we usually ask for your most recent financial statements, management accounts if you have them, bank statements for the last six to twelve months, a list of debtors and creditors, and any budget or forecast. If your records are incomplete, share what you have. Putting records in order is often the first piece of work, and we will tell you what is missing and how to collect it. You can also start with our online Management Capability Assessment.",
      },
      {
        q: "How is the work scoped and priced?",
        a: "We start with a consultation to understand your business and what you need. We then propose a scope, which is either a defined project, such as a financial model or systems set-up, or an ongoing monthly fractional CFO arrangement with agreed days, meetings and reports. Pricing is based on that scope and set out in writing before work starts. We do not publish standard fees because businesses differ in size, complexity and the support they need.",
      },
      {
        q: "Will you guarantee that we get a loan or investment?",
        a: "No. We do not guarantee financing, and no honest adviser can. Lending and investment decisions rest with the bank, lender or investor. What we do is prepare your business so that its records, forecasts, model and documents meet the standard those providers expect, and help you approach sources that fit your stage. We are not a broker. If we think you are not ready to approach funders yet, we will say so and set out what needs to change first.",
      },
      {
        q: "Do you replace our accountant or bookkeeper?",
        a: "No. We work alongside your accountant or bookkeeper. They keep the books and handle statutory filing; we use that information to produce management reporting, forecasts, budgets and analysis that help you run the business. Where record-keeping needs to improve, we set up the processes and systems and show your team how to use them. If you need specialist tax or legal advice, we arrange it through our associate network.",
      },
      {
        q: "Is our financial information kept confidential?",
        a: "Yes. We are happy to sign a non-disclosure agreement before you share any information. Your data is used only to deliver the work you have engaged us for. We do not name clients in our marketing, and we do not share your information with lenders, investors or anyone else without your written agreement. When we help you prepare an investor data room, you decide who gets access and when.",
      },
    ],
    cta: { kind: "sme", label: "Book a Financial Strategy Consultation" },
    secondaryCta: { label: "Take the Management Capability Assessment", href: "/diagnostic" },
    featuredOffer: {
      title: "90-Day Financial Performance System",
      text: "A fixed-scope way to start: in 90 days we set up reliable reporting, a 13-week cash forecast, profitability and pricing analysis, a budget and a management dashboard, then hand the system to your team.",
      points: ["Fixed scope and defined deliverables", "Weekly-to-monthly routines your team owns", "Optional fractional CFO afterwards"],
      href: "/90-day-financial-performance-system",
      cta: "Explore the 90-Day System",
    },
  },
];
