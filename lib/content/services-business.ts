import type { ServiceContent } from "./types";

/**
 * Services for growing businesses (and the funds and programmes that back
 * them). Copy follows the rules in ./types.ts: no fees, no guaranteed
 * outcomes, figures only from the founder's experience.
 */
export const BUSINESS_SERVICES: ServiceContent[] = [
  // ---------------------------------------------------------------------------
  // 1. Fractional CFO Services
  // ---------------------------------------------------------------------------
  {
    slug: "fractional-cfo-services",
    name: "Fractional CFO Services",
    seo: {
      title: "Fractional CFO Kenya | Outsourced CFO Services | CFOIP",
      description:
        "Fractional CFO services in Kenya: monthly management accounts, 13-week cash forecasts, budgets, board packs and lender reporting for growing businesses.",
      primaryKeyword: "fractional CFO Kenya",
      secondaryKeywords: [
        "outsourced CFO Kenya",
        "virtual CFO services",
        "CFO services for SMEs",
        "management accounts Kenya",
      ],
    },
    eyebrow: "For growing businesses",
    h1: "Fractional CFO Services",
    summary:
      "CFO Innovation Partners provides part-time CFO leadership to growing businesses, NGOs and fund portfolio companies in Kenya and East Africa. We produce monthly management accounts, a 13-week rolling cash-flow forecast, budgets, board packs and lender reporting, and we strengthen the finance team that runs them.",
    atAGlance: [
      { label: "Who it's for", value: "Growing businesses, NGOs and portfolio companies without a full-time CFO" },
      { label: "Typical length", value: "Ongoing, with a 6-month minimum to set up reporting properly" },
      { label: "Cadence", value: "Monthly close and review, weekly cash check-in, quarterly board pack" },
      { label: "Team", value: "A lead fractional CFO supported by a finance analyst" },
      { label: "Where", value: "Nairobi-based, serving Kenya and East Africa on site and remotely" },
      { label: "How to start", value: "A Financial Strategy Consultation or the Management Capability Assessment" },
    ],
    whoFor: [
      "Founders and CEOs of businesses that have outgrown a bookkeeper but cannot yet justify a full-time CFO",
      "Businesses preparing for a bank facility, DFI loan or equity round that need credible numbers",
      "NGOs and impact organisations that need donor-ready budgets, cash planning and board reporting",
      "Portfolio companies of investment funds that must meet investor reporting requirements",
      "Finance managers who want senior support and a clear plan for the finance function",
    ],
    problems: [
      "We only see our numbers when the accountant files returns with KRA, months after the fact.",
      "We are profitable on paper but keep running short of cash at month end.",
      "Our bank and investors ask for reports we cannot produce on time.",
      "Customers pay late and we do not know our real debtor days.",
      "We have no budget, or the budget is never compared with what actually happened.",
      "The board meets, but there is no proper pack and decisions get deferred.",
    ],
    deliverables: [
      {
        name: "Monthly management accounts",
        detail:
          "Profit and loss, balance sheet and cash flow with key ratios, delivered by working day 10 of the following month.",
        cadence: "Monthly",
      },
      {
        name: "13-week rolling cash-flow forecast",
        detail:
          "Weekly receipts and payments, including M-Pesa and bank collections, updated each week so you can see shortfalls before they arrive.",
        cadence: "Weekly",
      },
      {
        name: "Budget vs actual with variance commentary",
        detail:
          "A line-by-line comparison against budget with plain-language notes on what moved, why, and what to do about it.",
        cadence: "Monthly",
      },
      {
        name: "Annual budget and 3-year financial model",
        detail:
          "An operating budget agreed with management, linked to a three-year model of revenue, costs, capital spend and funding needs.",
        cadence: "Annually, reviewed quarterly",
      },
      {
        name: "Working-capital dashboard",
        detail:
          "Debtor days, creditor days and stock days tracked against targets, with a list of overdue accounts and actions.",
        cadence: "Monthly",
      },
      {
        name: "Quarterly board pack",
        detail:
          "Financial results, cash position, KPIs, risks and decisions required, prepared and presented at the board meeting.",
        cadence: "Quarterly",
      },
      {
        name: "Lender and investor reporting",
        detail:
          "Covenant calculations, compliance certificates and investor updates prepared in the format each bank, DFI or fund requires.",
        cadence: "As required by each facility",
      },
      {
        name: "Finance-function improvement plan",
        detail:
          "A prioritised plan covering people, processes, controls and systems, with owners and dates, reviewed as the business grows.",
        cadence: "Once, month 2, then reviewed quarterly",
      },
    ],
    process: [
      {
        stage: "Diagnose",
        detail:
          "We review your last 12 months of records, bank statements, KRA filings and existing reports, and meet the people who produce them.",
      },
      {
        stage: "Interpret",
        detail:
          "We identify where margin, cash and reporting gaps sit, and which numbers management can and cannot rely on today.",
      },
      {
        stage: "Recommend",
        detail:
          "We agree the reporting calendar, the KPIs that matter and the first fixes to the close process and chart of accounts.",
      },
      {
        stage: "Advise",
        detail:
          "We sit with the founder and leadership team each month to discuss results, cash and decisions on pricing, hiring and spend.",
      },
      {
        stage: "Execute",
        detail:
          "We produce the management accounts, forecasts and board packs, and work with your bookkeeper so the close runs on time.",
      },
      {
        stage: "Track",
        detail:
          "We monitor KPIs, covenant headroom and progress on the improvement plan, and report on them every month and quarter.",
      },
    ],
    engagement: [
      { label: "Duration", value: "Ongoing retainer, minimum 6 months, reviewed every quarter" },
      { label: "Time commitment", value: "Typically 2 to 6 days a month, agreed by scope and stage of the business" },
      { label: "Cadence", value: "Monthly close review, weekly cash call, quarterly board meeting" },
      { label: "Inputs we need", value: "Accounting system access, bank and M-Pesa statements, payroll, debtor and creditor listings" },
      { label: "Team", value: "Lead fractional CFO with analyst support; your bookkeeper or accountant stays in place" },
    ],
    evidence: {
      title: "Founder experience",
      text: "Our founder has supported 15+ OceanHub Africa portfolio businesses with financial diagnostics, accounting systems, unit economics, forecasts and capital planning, and has 12+ years in SME finance and investment advisory.",
      href: "/about",
    },
    faqs: [
      {
        q: "How is a fractional CFO different from an accountant?",
        a: "An accountant records transactions, prepares statutory accounts and handles tax filings with KRA. A fractional CFO uses those numbers to run the business: cash forecasting, budgets, pricing decisions, board reporting and conversations with banks and investors. You get senior financial leadership for a set number of days each month instead of a full-time executive salary. Most of our clients keep their accountant and bookkeeper, and we make sure their work feeds into reports management can use.",
      },
      {
        q: "How many days a month does a fractional CFO work with us?",
        a: "Most engagements run between 2 and 6 days a month. A business setting up management accounts and a cash forecast for the first time usually needs more time in the first three months, then settles into a steadier rhythm. Busy periods such as budget season, a loan application or a board meeting may need extra days, which we agree in advance. We set the time commitment after the first diagnostic so it matches the work, and we review it each quarter.",
      },
      {
        q: "Do you replace our accountant or bookkeeper?",
        a: "No. Your bookkeeper continues to capture transactions and your external accountant or auditor continues with statutory accounts and tax. We sit above that work. We set the month-end timetable, review the books, prepare management reporting and advise leadership. Where we find gaps in bookkeeping, such as missing reconciliations or misclassified costs, we show your team how to fix them. If you have no bookkeeper at all, we can help you recruit one or set up an outsourced arrangement.",
      },
      {
        q: "Can you work with QuickBooks, Xero or Zoho Books?",
        a: "Yes. We work with QuickBooks, Xero, Zoho Books and Sage, and with spreadsheets where a business has not yet moved to an accounting system. We need read access, and in some cases edit access, to produce reports and correct the chart of accounts. If your current system is holding you back, we will say so and can help you choose and set up a better one through our financial systems work. We also check that invoicing is set up correctly for eTIMS.",
      },
      {
        q: "Do you work with NGOs and impact organisations?",
        a: "Yes. NGOs and impact organisations need many of the same disciplines as businesses: cash planning, budget control and clear board reporting. They also need donor budgets, restricted fund tracking and reports in each donor's format. We adapt the management accounts and board pack to those requirements. For funds and programmes that want consistent CFO support across several portfolio companies, see our page for investment funds.",
      },
      {
        q: "Can a fractional CFO help us raise finance?",
        a: "Yes, as preparation. A fractional CFO makes sure your accounts, forecasts and reporting stand up to a lender or investor review, and can attend meetings with banks, DFIs or funds alongside you. We do not guarantee that any lender or investor will approve finance, and we are not a broker. Where a specific raise is planned, we usually add our investment readiness or access to finance advisory work to the engagement so the full application pack is prepared.",
      },
    ],
    related: ["financial-systems", "financial-modelling", "investment-readiness"],
    audiences: ["growing-businesses", "investment-funds"],
    cta: { kind: "sme", label: "Book a Financial Strategy Consultation" },
    featuredOffer: {
      title: "Start with the 90-Day Financial Performance System",
      text: "Most businesses start with a fixed-scope 90-day engagement that sets up reporting, a cash forecast, profitability analysis, a budget and a dashboard. Afterwards you can continue with a fractional CFO for an agreed number of days a month. Businesses that already have reliable systems can start with the monthly retainer directly.",
      points: ["90 days, fixed scope", "Ten defined deliverables", "Optional monthly fractional CFO afterwards"],
      href: "/90-day-financial-performance-system",
      cta: "Explore the 90-Day System",
    },
  },

  // ---------------------------------------------------------------------------
  // 2. Investment Readiness
  // ---------------------------------------------------------------------------
  {
    slug: "investment-readiness",
    name: "Investment Readiness",
    seo: {
      title: "Investment Readiness Kenya | SME Investor Prep | CFOIP",
      description:
        "Investment readiness support for Kenyan and East African SMEs: gap assessment, financial model, data room, due-diligence pack and investor Q&A preparation.",
      primaryKeyword: "investment readiness Kenya",
      secondaryKeywords: [
        "investment readiness assessment",
        "SME investment readiness",
        "investor readiness East Africa",
        "due diligence preparation",
      ],
    },
    eyebrow: "For businesses raising equity",
    h1: "Investment Readiness",
    summary:
      "CFO Innovation Partners prepares growing businesses in Kenya and East Africa for equity investment and investor due diligence. We assess readiness, build the financial model and use-of-funds case, set up the data room and prepare management for investor questions. We also deliver this work across accelerator and fund cohorts.",
    atAGlance: [
      { label: "Who it's for", value: "Growth-stage businesses planning an equity raise, and the programmes that support them" },
      { label: "Typical length", value: "8 to 12 weeks, depending on the starting point" },
      { label: "Cadence", value: "Weekly working sessions with the founder and finance lead" },
      { label: "Team", value: "A lead advisor and a financial analyst" },
      { label: "Where", value: "Kenya and East Africa, with selected African markets" },
      { label: "How to start", value: "A Financial Strategy Consultation or the Management Capability Assessment" },
    ],
    whoFor: [
      "Founders preparing for a first institutional equity round",
      "Businesses that have received investor interest and now face due diligence",
      "Companies that were turned down by investors and want to understand why",
      "Accelerators and funds that want a consistent readiness process across a cohort",
    ],
    problems: [
      "Investors keep asking for documents we do not have.",
      "Our financial model was built for a pitch competition and falls apart under questions.",
      "We cannot explain clearly how much we need and what the money will do.",
      "Due diligence has started and we are scrambling to find contracts and filings.",
      "We have been told we are 'not ready yet' without being told what that means.",
      "Our historical accounts do not match what our pitch deck says.",
    ],
    deliverables: [
      {
        name: "Readiness diagnostic and gap report",
        detail:
          "An assessment of financials, governance, legal and compliance, market evidence and team, scored against what equity investors typically review, with gaps ranked by urgency.",
        cadence: "Once, weeks 1 to 2",
      },
      {
        name: "Three-statement financial model",
        detail:
          "An integrated P&L, balance sheet and cash-flow model with documented assumptions and scenarios, built to survive investor questioning.",
        cadence: "Once, weeks 2 to 5",
      },
      {
        name: "Use of funds and capital requirements",
        detail:
          "How much you need, when, and what each tranche pays for, tied to the model and to milestones an investor can track.",
        cadence: "Once, week 5",
      },
      {
        name: "Investor data room set-up",
        detail:
          "A structured, indexed online data room with corporate, financial, legal, commercial and HR folders, and access controls.",
        cadence: "Once, weeks 4 to 7",
      },
      {
        name: "Due-diligence checklist and document pack",
        detail:
          "A checklist covering KRA compliance, statutory filings, contracts, licences and policies, with the gathered documents filed in the data room.",
        cadence: "Once, weeks 4 to 8",
      },
      {
        name: "Pitch deck and information memorandum review",
        detail:
          "Written comments on your deck and information memorandum so the story, numbers and claims match the model and the records.",
        cadence: "Once, weeks 6 to 8",
      },
      {
        name: "Management Q&A preparation",
        detail:
          "Mock investor sessions on financials, unit economics, risks and valuation questions, with a written bank of answers.",
        cadence: "Once, weeks 8 to 10",
      },
      {
        name: "90-day readiness action plan",
        detail:
          "The remaining actions with owners and dates, so the business keeps improving after our work ends.",
        cadence: "Once, at close",
      },
    ],
    process: [
      {
        stage: "Diagnose",
        detail:
          "We review accounts, management information, cap table, statutory records and the current pitch against an investor-style checklist.",
      },
      {
        stage: "Interpret",
        detail:
          "We separate the gaps that would stop a deal from those an investor would accept as conditions, and test whether equity is the right route at all.",
      },
      {
        stage: "Recommend",
        detail:
          "We set out the work plan, the realistic raise size and timing, and the documents to build first.",
      },
      {
        stage: "Advise",
        detail:
          "We work through the model, valuation drivers and investor expectations with the founder in weekly sessions.",
      },
      {
        stage: "Execute",
        detail:
          "We build the model, set up the data room, assemble the due-diligence pack and run mock investor sessions.",
      },
      {
        stage: "Track",
        detail:
          "We re-score readiness at the end of the engagement and hand over a 90-day action plan with clear owners.",
      },
    ],
    engagement: [
      { label: "Duration", value: "8 to 12 weeks for a single business; cohort programmes run over 3 to 6 months" },
      { label: "Cadence", value: "Weekly working sessions plus document reviews between sessions" },
      { label: "Inputs we need", value: "3 years of accounts where available, management accounts, cap table, company records, contracts and current pitch materials" },
      { label: "Team", value: "Lead advisor and financial analyst; founder and finance lead from your side" },
      { label: "Format", value: "One-to-one for individual businesses, or group workshops plus one-to-one clinics for cohorts" },
    ],
    evidence: {
      title: "Founder experience",
      text: "Our founder has recommended 50+ enterprises for investment consideration, with proposed tickets of USD 100K to 500K, after reviewing their financials, operations and readiness.",
      href: "/about",
    },
    faqs: [
      {
        q: "Do you guarantee funding?",
        a: "No. No advisor can honestly guarantee that an investor will invest, and we do not. Investment decisions belong to investors and depend on their mandate, the market and your business. What we do is make sure your financials, documents and answers stand up to scrutiny, so investors can assess the business itself without being held up by missing or inconsistent information. We are not a broker and we do not sell introductions to investors.",
      },
      {
        q: "What does an investment readiness assessment cover?",
        a: "We review five areas: financial records and reporting, the financial model and capital requirements, governance and legal structure, compliance (including KRA and statutory filings), and commercial evidence such as customers, contracts and unit economics. Each area is scored against what equity investors typically examine during due diligence. You receive a written gap report that ranks issues by how likely they are to stop or delay a deal, with a recommended order for fixing them.",
      },
      {
        q: "Is this for debt or equity?",
        a: "This service focuses on equity, where investors take a share of the business and run a full due diligence. If you are applying for a bank loan, SACCO facility, asset finance or a DFI-backed credit line, our access to finance advisory is the better fit. During the diagnostic we often find that a business is better served by debt, or by a mix of debt and equity, and we will tell you if that is the case.",
      },
      {
        q: "Can you deliver investment readiness across a programme cohort?",
        a: "Yes. Accelerators, funds and development partners can run this as a cohort programme. We use a common diagnostic so every business is assessed on the same basis, then combine group workshops on modelling, data rooms and due diligence with one-to-one clinics for each business. Programme managers receive a readiness summary for each enterprise and for the cohort as a whole, showing gaps closed and actions remaining.",
      },
      {
        q: "How long does it take to become investment ready?",
        a: "For a business with reasonably clean accounts, the core work takes 8 to 12 weeks. Businesses with incomplete records, missing statutory filings or no management accounts need longer, as those foundations have to be fixed first. In that case we may recommend a period of fractional CFO or financial systems support before the readiness work begins. The diagnostic in the first two weeks gives you a realistic timeline.",
      },
      {
        q: "Will you help with valuation?",
        a: "We build the financial model that underpins any valuation discussion and help you understand the methods investors use, such as revenue multiples, comparable transactions and discounted cash flow. We prepare you to explain and defend your assumptions. We do not issue formal valuation opinions. If a formal independent valuation is required for legal or regulatory purposes, we can work alongside the valuer you appoint.",
      },
    ],
    related: ["financial-modelling", "access-to-finance-advisory", "fractional-cfo-services"],
    audiences: ["growing-businesses", "investment-funds", "accelerators-development-partners"],
    cta: { kind: "sme", label: "Book a Financial Strategy Consultation" },
  },

  // ---------------------------------------------------------------------------
  // 3. Access to Finance Advisory
  // ---------------------------------------------------------------------------
  {
    slug: "access-to-finance-advisory",
    name: "Access to Finance Advisory",
    seo: {
      title: "Access to Finance Advisory for SMEs | CFOIP",
      description:
        "Access to finance advisory for SMEs in Kenya: choose the right funding route, then prepare a lender-ready business plan, cash-flow projections and application.",
      primaryKeyword: "access to finance advisory SMEs",
      secondaryKeywords: [
        "bank-ready business plan Kenya",
        "debt readiness",
        "grant applications",
        "blended finance",
      ],
    },
    eyebrow: "For businesses seeking finance",
    h1: "Access to Finance Advisory",
    summary:
      "CFO Innovation Partners helps growing businesses in Kenya and East Africa choose the right source of finance and prepare a credible application for it. We produce lender-ready business plans, cash-flow projections, loan application packs, repayment modelling and grant budgets. We prepare the business and the application; we do not arrange or guarantee finance.",
    atAGlance: [
      { label: "Who it's for", value: "SMEs seeking bank, SACCO, DFI-backed, grant or blended finance" },
      { label: "Typical length", value: "4 to 8 weeks per application" },
      { label: "Cadence", value: "Weekly working sessions until submission" },
      { label: "Team", value: "A lead advisor and a financial analyst" },
      { label: "Where", value: "Kenya and East Africa, with selected African markets" },
      { label: "How to start", value: "A Financial Strategy Consultation or the Management Capability Assessment" },
    ],
    whoFor: [
      "Businesses applying for a bank or SACCO loan, overdraft or asset finance",
      "Exporters and suppliers looking at invoice discounting or trade finance",
      "Enterprises applying to grant programmes or challenge funds",
      "Businesses offered a DFI-backed or blended finance facility that need to meet its reporting terms",
      "Founders unsure whether debt, grants or equity suit their stage",
    ],
    problems: [
      "The bank asked for a business plan and cash-flow projections and we don't know where to start.",
      "We were declined and nobody explained why.",
      "We don't know if we can actually afford the repayments.",
      "Grant applications ask for detailed budgets we've never prepared.",
      "There are many funding programmes and we can't tell which one fits us.",
      "We got the loan, and now the reporting requirements are taking over.",
    ],
    deliverables: [
      {
        name: "Finance route assessment",
        detail:
          "A comparison of the routes open to you, such as bank and SACCO debt, asset finance, invoice and trade finance, DFI-backed facilities, grants, blended finance and equity, with a recommended route and reasons.",
        cadence: "Once, week 1",
      },
      {
        name: "Lender-ready business plan",
        detail:
          "A concise plan covering the business, market, management, purpose of funds and risks, written in the structure credit teams expect.",
        cadence: "Once, weeks 2 to 4",
      },
      {
        name: "Cash-flow projections",
        detail:
          "Monthly projections for at least the loan tenor, reconciled to historical accounts and bank statements, with a downside scenario.",
        cadence: "Once, weeks 2 to 4",
      },
      {
        name: "Loan application pack",
        detail:
          "The completed application with supporting financial statements, KRA compliance documents, statutory records and security details, checked for gaps before submission.",
        cadence: "Once, weeks 4 to 6",
      },
      {
        name: "Covenant and repayment modelling",
        detail:
          "Repayment schedules and covenant tests such as debt service cover, so you know the facility size you can carry before you sign.",
        cadence: "Once, with updates during negotiation",
      },
      {
        name: "Grant application finance sections and budgets",
        detail:
          "Project budgets, co-financing tables, budget narratives and financial sustainability sections in the funder's required format.",
        cadence: "Per application",
      },
      {
        name: "Post-approval reporting set-up",
        detail:
          "Templates and a calendar for lender or funder reporting, covenant monitoring and disbursement conditions.",
        cadence: "Once, after approval",
      },
    ],
    process: [
      {
        stage: "Diagnose",
        detail:
          "We review your accounts, bank and M-Pesa statements, existing debt and funding need to see what a lender or funder will see.",
      },
      {
        stage: "Interpret",
        detail:
          "We assess repayment capacity, security position and eligibility, and which routes are realistic for your sector and stage.",
      },
      {
        stage: "Recommend",
        detail:
          "We recommend a finance route and facility size, and refer equity-stage businesses to our investment readiness work.",
      },
      {
        stage: "Advise",
        detail:
          "We prepare you for credit committee questions and help you read term sheets and facility conditions before you commit.",
      },
      {
        stage: "Execute",
        detail:
          "We write the business plan, build the projections and assemble the application pack for you to submit.",
      },
      {
        stage: "Track",
        detail:
          "After approval, we set up reporting and covenant monitoring so you meet the terms of the facility or grant.",
      },
    ],
    engagement: [
      { label: "Duration", value: "4 to 8 weeks per application, plus optional post-approval support" },
      { label: "Cadence", value: "Weekly working sessions until submission" },
      { label: "Inputs we need", value: "2 to 3 years of accounts, 12 months of bank and M-Pesa statements, KRA compliance certificate, existing loan details" },
      { label: "Team", value: "Lead advisor and financial analyst; founder and finance lead from your side" },
      { label: "What we do not do", value: "We do not arrange, broker or guarantee finance, or sell introductions to lenders" },
    ],
    evidence: {
      title: "Founder experience",
      text: "Our founder has 12+ years in SME finance, enterprise development and investment advisory, and has supported 2,000+ businesses across 11 sectors.",
      href: "/about",
    },
    faqs: [
      {
        q: "Do you guarantee that we will get the loan or grant?",
        a: "No. Lenders and funders make their own decisions based on their criteria, risk appetite and available capital, and no honest advisor can promise approval. We are not a broker and we do not sell introductions. What we do is prepare your business and your application properly: clear projections, a credible plan, complete documents and an honest view of what you can repay. That gives the credit team or grant panel what it needs to assess you fairly.",
      },
      {
        q: "How do we know which type of finance is right for us?",
        a: "It depends on what the money is for, how quickly it pays back, and what security you have. Working capital gaps often suit an overdraft or invoice finance. Equipment suits asset finance. Long-term expansion may need a term loan or a DFI-backed facility. Grants suit specific projects that match a funder's goals. Equity suits fast growth with uncertain early cash flows. The finance route assessment in week one sets out the options and our recommendation.",
      },
      {
        q: "Can you help after we have been declined?",
        a: "Yes. A decline usually has a reason: weak cash flow, gaps in records, insufficient security, tax compliance issues or a facility too large for the business. We review the application and, where possible, the lender's feedback, then identify what needs to change. Sometimes it is the application. Sometimes it is the underlying records, which may need several months of improved management accounts before reapplying. We will tell you which applies.",
      },
      {
        q: "Do you write full grant proposals?",
        a: "We focus on the finance sections: project budgets, co-financing and match-funding tables, budget narratives, cost assumptions and financial sustainability. These are the sections that most often weaken otherwise good applications. Your team usually leads on the technical and impact narrative, which you know best. We review the whole application to make sure the numbers and the narrative are consistent before you submit.",
      },
      {
        q: "What is blended finance and is it relevant to us?",
        a: "Blended finance combines commercial capital with concessional funds, such as grants, guarantees or below-market loans from development partners, to reduce risk for lenders. In Kenya and East Africa this often appears as DFI-backed credit lines through local banks, or programmes that pair a grant with a loan. These facilities usually come with extra reporting and eligibility conditions. We help you check whether you qualify and prepare for the reporting that follows.",
      },
    ],
    related: ["investment-readiness", "financial-modelling", "fractional-cfo-services"],
    audiences: ["growing-businesses", "accelerators-development-partners"],
    cta: { kind: "sme", label: "Book a Financial Strategy Consultation" },
  },

  // ---------------------------------------------------------------------------
  // 4. Financial Modelling
  // ---------------------------------------------------------------------------
  {
    slug: "financial-modelling",
    name: "Financial Modelling",
    seo: {
      title: "Financial Modelling Services Kenya | CFOIP",
      description:
        "Financial modelling services in Kenya: integrated three-statement models, scenario analysis, unit economics and debt schedules built for investors and lenders.",
      primaryKeyword: "financial modelling services Kenya",
      secondaryKeywords: [
        "three-statement financial model",
        "investor financial model",
        "lender model",
        "scenario analysis",
      ],
    },
    eyebrow: "For growing businesses",
    h1: "Financial Modelling",
    summary:
      "CFO Innovation Partners builds and reviews financial models for growing businesses in Kenya and East Africa. We deliver integrated three-statement models with scenario analysis, unit economics, capital requirements and debt-service schedules, structured so investors, lenders and your own team can follow and audit them.",
    atAGlance: [
      { label: "Who it's for", value: "Businesses raising capital, planning growth or reviewing an existing model" },
      { label: "Typical length", value: "3 to 6 weeks for a new model; 1 to 2 weeks for a review" },
      { label: "Cadence", value: "Weekly review sessions on assumptions and outputs" },
      { label: "Team", value: "A lead modeller with oversight from a senior advisor" },
      { label: "Where", value: "Kenya and East Africa, delivered on site or remotely" },
      { label: "How to start", value: "A Financial Strategy Consultation or the Management Capability Assessment" },
    ],
    whoFor: [
      "Founders preparing for an equity raise or investor due diligence",
      "Businesses applying for bank, DFI or blended finance that need a lender model",
      "Management teams planning an expansion, new product line or new market",
      "Finance leads who inherited a model they do not trust and need it reviewed",
    ],
    problems: [
      "Our model breaks whenever we change an assumption.",
      "Nobody except the person who built the spreadsheet understands it.",
      "Investors asked for a balance sheet forecast and we only have a P&L.",
      "We don't know which assumptions actually drive our results.",
      "We can't show the lender how we'll repay under a bad year.",
      "Our pricing feels like guesswork and we don't know our margin per unit.",
    ],
    deliverables: [
      {
        name: "Integrated three-statement model",
        detail:
          "A linked P&L, balance sheet and cash-flow forecast, monthly for the first one to two years and annual to year five, that balances and reconciles to your historical accounts.",
        cadence: "Once, weeks 2 to 5",
      },
      {
        name: "Assumptions book",
        detail:
          "Every key assumption listed with its source, rationale and owner, so investors and lenders can see where the numbers come from.",
        cadence: "Once, weeks 1 to 3",
      },
      {
        name: "Scenario and sensitivity analysis",
        detail:
          "Base, upside and downside cases with switchable scenarios, plus sensitivity tables showing which drivers move cash and profit most.",
        cadence: "Once, week 4",
      },
      {
        name: "Unit economics and pricing analysis",
        detail:
          "Contribution margin per product, customer or channel, customer acquisition cost and payback, with pricing scenarios tested against volume.",
        cadence: "Once, weeks 2 to 4",
      },
      {
        name: "Capital requirements and debt-service schedules",
        detail:
          "Peak funding need, timing of drawdowns, loan amortisation, interest, debt service cover and covenant tests.",
        cadence: "Once, week 4",
      },
      {
        name: "Model documentation and handover training",
        detail:
          "A user guide and a working session with your team on updating actuals, changing assumptions and reading outputs.",
        cadence: "Once, final week",
      },
      {
        name: "Review of an existing model",
        detail:
          "A structured check of formulas, links, logic and assumptions in a model you already have, with a written list of errors and fixes.",
        cadence: "Once, 1 to 2 weeks",
      },
    ],
    process: [
      {
        stage: "Diagnose",
        detail:
          "We review historical accounts, existing forecasts and the decision or audience the model must serve: investor, lender, board or management.",
      },
      {
        stage: "Interpret",
        detail:
          "We identify the business's real drivers, such as volumes, prices, conversion, payment terms and capacity, and where the data supports them.",
      },
      {
        stage: "Recommend",
        detail:
          "We agree the model structure, time periods, level of detail and scenarios before any building starts.",
      },
      {
        stage: "Advise",
        detail:
          "We challenge assumptions with management in weekly sessions so the numbers reflect what the business can actually deliver.",
      },
      {
        stage: "Execute",
        detail:
          "We build the model with inputs, calculations and outputs on separate sheets, consistent formulas and built-in error checks.",
      },
      {
        stage: "Track",
        detail:
          "We train your team to roll the model forward with actuals and offer quarterly refreshes where the model supports ongoing reporting.",
      },
    ],
    engagement: [
      { label: "Duration", value: "3 to 6 weeks for a new model; 1 to 2 weeks for a model review" },
      { label: "Cadence", value: "Weekly sessions on assumptions, then a review of draft outputs" },
      { label: "Inputs we need", value: "Historical accounts, management accounts, sales and cost data, existing forecasts and any lender or investor template" },
      { label: "Format", value: "Excel or Google Sheets, with documentation and a recorded handover session" },
      { label: "Team", value: "Lead modeller with senior advisor review" },
    ],
    evidence: {
      title: "Founder experience",
      text: "Our founder has built forecasts, unit economics and capital plans for 15+ OceanHub Africa portfolio businesses as part of their financial diagnostics.",
      href: "/about",
    },
    faqs: [
      {
        q: "What makes a financial model investor-ready or lender-ready?",
        a: "It needs to be integrated, so the P&L, balance sheet and cash flow link and balance. It needs clear, sourced assumptions that tie back to historical performance. It needs scenarios that show what happens if things go worse than planned. And it needs a clear, auditable structure, with inputs, calculations and outputs kept separate, so an analyst can follow it without calling you. Lenders also look closely at debt service cover and repayment timing, which we build in.",
      },
      {
        q: "Will we be able to update the model ourselves?",
        a: "Yes. That is a core part of how we build. Inputs sit on dedicated sheets, formulas are consistent across rows, and error checks flag problems. At the end we provide written documentation and a handover session with your team covering how to enter actuals, change assumptions and read the outputs. If you prefer us to maintain the model, we can do that through a fractional CFO engagement or quarterly refreshes.",
      },
      {
        q: "Do you use Excel or specialist modelling software?",
        a: "We build in Excel or Google Sheets because investors, lenders and your own team can open and check them without extra licences. Most investors and banks in Kenya and East Africa expect a spreadsheet model they can test themselves. Where a lender or fund provides its own template, we populate it from the main model so the numbers stay consistent across documents.",
      },
      {
        q: "Can you review a model we already have?",
        a: "Yes. A model review checks the structure, formula integrity, links between statements, assumptions and outputs. We look for common problems such as hard-coded numbers in formulas, a balance sheet that does not balance, circular references and assumptions that contradict historical results. You receive a written list of issues ranked by impact and recommended fixes. We can then make the corrections, or your team can, using our notes.",
      },
      {
        q: "How far ahead should our model forecast?",
        a: "Most investor models run five years: monthly for the first one to two years, then annual. Lender models should cover at least the full loan tenor, with monthly cash flow during any grace period and the early repayment months. Management budgeting models usually focus on the next 12 to 18 months. We agree the horizon at the start based on who will use the model and what decision it supports.",
      },
    ],
    related: ["investment-readiness", "access-to-finance-advisory", "fractional-cfo-services"],
    audiences: ["growing-businesses", "investment-funds"],
    cta: { kind: "sme", label: "Book a Financial Strategy Consultation" },
  },

  // ---------------------------------------------------------------------------
  // 5. Financial Systems & Operational Efficiency
  // ---------------------------------------------------------------------------
  {
    slug: "financial-systems",
    name: "Financial Systems",
    seo: {
      title: "Finance Systems for SMEs | Accounting Setup Kenya | CFOIP",
      description:
        "Finance systems for SMEs in Kenya: accounting system set-up, month-end close, internal controls, eTIMS-ready invoicing, reporting dashboards and automation.",
      primaryKeyword: "finance systems for SMEs",
      secondaryKeywords: [
        "management reporting systems",
        "accounting system setup Kenya",
        "operational efficiency",
        "financial controls",
      ],
    },
    eyebrow: "For growing businesses",
    h1: "Financial Systems & Operational Efficiency",
    summary:
      "CFO Innovation Partners designs and implements finance systems for growing businesses in Kenya and East Africa. We set up or migrate accounting systems, redesign the chart of accounts, build the month-end close, internal controls and management reporting, and automate repetitive finance tasks. We then train your team to run it.",
    atAGlance: [
      { label: "Who it's for", value: "Growing businesses whose records, controls or reporting have not kept up with growth" },
      { label: "Typical length", value: "6 to 12 weeks for set-up, plus optional follow-up support" },
      { label: "Cadence", value: "Weekly working sessions and on-site days during implementation" },
      { label: "Team", value: "A lead advisor and a finance systems specialist" },
      { label: "Where", value: "Kenya and East Africa, on site and remotely" },
      { label: "How to start", value: "A Financial Strategy Consultation or the Management Capability Assessment" },
    ],
    whoFor: [
      "Businesses still running finance on spreadsheets, notebooks or a basic invoicing app",
      "Companies whose accounting system was set up quickly and no longer reflects how they operate",
      "Owners who sign every payment because there are no approval controls",
      "Portfolio companies that must produce consistent reports for an investor or fund",
      "Businesses with incomplete historical records that need to be rebuilt before raising finance",
    ],
    problems: [
      "Month-end takes weeks and the numbers still don't reconcile.",
      "We have M-Pesa, bank and cash receipts and no reliable way to match them to invoices.",
      "Our chart of accounts makes it impossible to see profit by product or branch.",
      "Every payment comes to me for approval because nothing else is in place.",
      "We are not sure our invoicing is eTIMS-compliant.",
      "The team spends days each month copying data between spreadsheets.",
    ],
    deliverables: [
      {
        name: "Finance function review",
        detail:
          "An assessment of people, processes, controls, systems and reporting, with a prioritised list of what to fix first.",
        cadence: "Once, weeks 1 to 2",
      },
      {
        name: "Chart of accounts redesign",
        detail:
          "A chart of accounts structured around how you manage the business, with cost centres or classes for products, branches or projects.",
        cadence: "Once, week 3",
      },
      {
        name: "Accounting system selection and set-up or migration",
        detail:
          "Selection, configuration and data migration for QuickBooks, Xero, Zoho Books, Sage or a similar system, including bank feeds and opening balances.",
        cadence: "Once, weeks 3 to 7",
      },
      {
        name: "Historical account reconstruction",
        detail:
          "Where records are incomplete, rebuilding past transactions from bank, M-Pesa and supplier records so opening balances can be relied on.",
        cadence: "Once, where needed",
      },
      {
        name: "Month-end close process and calendar",
        detail:
          "A day-by-day close checklist with owners, covering reconciliations, accruals, payroll and review, so accounts are ready on a fixed date.",
        cadence: "Once, then run monthly",
      },
      {
        name: "Internal controls and approval workflows",
        detail:
          "Segregation of duties, approval limits, purchase and payment workflows and a petty cash policy, sized for the business.",
        cadence: "Once, weeks 5 to 8",
      },
      {
        name: "Management reporting pack and KPI dashboard",
        detail:
          "A standard monthly pack and dashboard pulling from the accounting system, covering revenue, margin, cash, debtors and operational KPIs.",
        cadence: "Set up once, produced monthly",
      },
      {
        name: "eTIMS-ready invoicing process",
        detail:
          "An invoicing process and system configuration that issues compliant electronic tax invoices and ties them to the accounts.",
        cadence: "Once, weeks 4 to 6",
      },
      {
        name: "Practical automation and team training",
        detail:
          "Automation of repetitive tasks such as payment reconciliation and report preparation, plus standard operating procedures and training for your finance team.",
        cadence: "Once, weeks 6 to 10",
      },
    ],
    process: [
      {
        stage: "Diagnose",
        detail:
          "We map how money moves through the business, from quote and invoice to collection, purchasing, payroll and payment, and where records break down.",
      },
      {
        stage: "Interpret",
        detail:
          "We identify the control gaps, manual steps and data problems that cause late, unreliable or missing reports.",
      },
      {
        stage: "Recommend",
        detail:
          "We recommend the system, chart of accounts, controls and reporting design, sized to your budget and the skills of your team.",
      },
      {
        stage: "Advise",
        detail:
          "We agree changes with owners and staff so new approvals and processes fit how the business really works.",
      },
      {
        stage: "Execute",
        detail:
          "We configure the system, migrate data, rebuild records where needed, set up automations and write the procedures.",
      },
      {
        stage: "Track",
        detail:
          "We run the first month-end closes with your team and check that reports arrive on time and reconcile.",
      },
    ],
    engagement: [
      { label: "Duration", value: "6 to 12 weeks, longer where historical records need reconstructing" },
      { label: "Cadence", value: "Weekly sessions with on-site days for set-up and training" },
      { label: "Inputs we need", value: "Access to current records and systems, bank and M-Pesa statements, staff time for process mapping and training" },
      { label: "Team", value: "Lead advisor and finance systems specialist; your finance staff take part throughout" },
      { label: "Follow-up", value: "Optional support for the first quarterly closes or ongoing fractional CFO oversight" },
    ],
    evidence: {
      title: "Founder experience",
      text: "Our founder has set up accounting systems and financial diagnostics for 15+ OceanHub Africa portfolio businesses, and has 12+ years in SME finance and enterprise development.",
      href: "/about",
    },
    faqs: [
      {
        q: "Which accounting system should we use?",
        a: "It depends on transaction volume, number of users, inventory needs, multi-currency, payroll and budget. QuickBooks, Xero and Zoho Books suit most SMEs and integrate with banks and other tools. Sage suits businesses with heavier inventory or that need a local implementation partner. We compare options against your requirements and the skills of your team, and recommend the one that fits. Where you already use a system that works, we improve its set-up instead of replacing it, because a migration costs time and carries risk.",
      },
      {
        q: "Can you fix our records if the books are behind or incomplete?",
        a: "Yes. Many businesses we see have gaps: unreconciled bank and M-Pesa accounts, missing invoices or months not captured at all. We reconstruct historical accounts from bank statements, M-Pesa records, supplier statements and other evidence, then agree opening balances. This is often required before a business can produce reliable management accounts or face lender or investor review. The time needed depends on how far back and how incomplete the records are.",
      },
      {
        q: "Do you help with eTIMS compliance?",
        a: "We help set up an invoicing process and system configuration that issues electronic tax invoices through eTIMS and records them correctly in your accounts. That includes checking which integration route suits your accounting system and making sure sales, credit notes and VAT reconcile. For tax advice, filings or disputes with KRA, we work alongside your tax advisor or external accountant, who remains responsible for those matters.",
      },
      {
        q: "What kind of automation do you set up?",
        a: "Practical, low-maintenance automation of repetitive finance and operations tasks. Typical examples are matching M-Pesa and bank receipts to invoices, pulling data into the monthly reporting pack, payment reminders to customers and approval routing for purchases. We use the features of your accounting system and established integration tools where possible. Automation supports your team's work; review and judgement on the numbers stay with people.",
      },
      {
        q: "Will our team be able to run the system after you leave?",
        a: "That is the aim of the engagement. We write standard operating procedures for each key process, train the people who will run them, and run the first month-end closes alongside your team. If staff change or you need ongoing oversight, we can continue with light follow-up support or a fractional CFO engagement, where we review the close and reporting each month.",
      },
    ],
    related: ["fractional-cfo-services", "financial-modelling", "investment-readiness"],
    audiences: ["growing-businesses", "investment-funds"],
    cta: { kind: "sme", label: "Book a Financial Strategy Consultation" },
  },
];
