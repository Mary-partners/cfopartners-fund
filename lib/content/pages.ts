import type { Faq, Step } from "./types";

export interface AboutContent {
  seo: { title: string; description: string };
  h1: string;
  summary: string;
  firmFacts: { label: string; value: string }[];
  whatWeDo: string[];
  howWeWork: string[];
  founder: {
    name: string;
    title: string;
    bio: string[];
    experience: { num: string; label: string }[];
    research: string;
  };
  bench: { area: string; detail: string }[];
  tools: {
    name: string;
    status: "Available" | "Delivered within engagements" | "In development";
    detail: string;
  }[];
  faqs: Faq[];
}

export interface ApproachContent {
  seo: { title: string; description: string };
  h1: string;
  summary: string;
  stages: {
    stage: Step["stage"];
    summary: string;
    enterprise: string;
    portfolio: string;
    outputs: string[];
  }[];
  principles: { title: string; detail: string }[];
  faqs: Faq[];
}

export const ABOUT: AboutContent = {
  seo: {
    title: "About CFO Innovation Partners | Nairobi, Kenya",
    description:
      "CFO Innovation Partners (CFOIP) is a Nairobi advisory and implementation firm supporting SMEs, investment funds, DFIs, accelerators and development partners.",
  },
  h1: "About CFO Innovation Partners",
  summary:
    "CFO Innovation Partners (CFOIP) is a Nairobi-based advisory and implementation firm. We provide fractional CFO support, investment readiness and financial systems implementation for growing SMEs; portfolio financial management and post-investment support for investment funds and DFIs; and enterprise development, technical assistance and programme design for accelerators and development partners.",
  firmFacts: [
    { label: "Firm", value: "CFO Innovation Partners (CFOIP)" },
    { label: "Type", value: "Advisory and implementation firm" },
    { label: "Registered", value: "Kenya, 2024" },
    { label: "Office", value: "Cove Court, Watermark Business Park, Nairobi" },
    { label: "Markets", value: "Kenya and East Africa, with selected African markets" },
    { label: "Founder", value: "Mary Ndinda, Founder & Managing Partner" },
    { label: "Email", value: "partner@cfopartners.fund" },
    { label: "Phone", value: "+254 748 918 910" },
  ],
  whatWeDo: [
    "For growing SMEs: fractional CFO support, financial systems, financial modelling, investment readiness and access-to-finance advisory.",
    "For investment funds, DFIs and lenders: portfolio financial management, pre- and post-investment support and portfolio reporting.",
    "For accelerators and development partners: enterprise development, technical assistance and programme design, with cohort diagnostics and progress reporting.",
  ],
  howWeWork: [
    "We understand the financial and management constraints that hold enterprises back, and we start from the business as it is.",
    "We deliver across many portfolio companies at once, using the same diagnostic and reporting framework for each.",
    "We design and implement systems and programmes that keep working after our reports are delivered.",
    "We help institutions monitor the financial and operational progress of the enterprises they back.",
    "We prepare businesses for investment and lending. We never promise that financing will be approved.",
    "Our fractional CFO support is practical: management accounts, forecasts, budgets and decisions, month by month.",
    "Digital tools make our delivery faster and more consistent. Professional judgement still makes the call.",
  ],
  founder: {
    name: "Mary Ndinda",
    title: "Founder & Managing Partner",
    bio: [
      "Mary Ndinda helps investment funds, accelerators, development partners and growing African businesses strengthen financial performance, access finance and build the management systems needed for growth. She has more than 12 years of experience in SME finance, enterprise development and investment advisory, and has supported more than 2,000 businesses across 11 sectors.",
      "Her work combines fractional CFO leadership, investment readiness, portfolio support and programme implementation. She leads on financial strategy, budgeting, forecasting, cash-flow and working-capital management, pricing, unit economics, financial modelling, board reporting and systems implementation. She prepares businesses for debt, equity and grant financing through financial diagnostics, three-statement models, funding strategies, due diligence and investor data rooms. Her investment assessment experience includes more than 50 enterprises recommended for investment consideration in the USD 100K–500K range.",
      "Mary has supported more than 15 OceanHub Africa portfolio businesses with financial diagnostics, accounting systems, unit economics, forecasts and capital planning, and designs portfolio reporting frameworks and dashboards that help funds identify financial risk. Her programme experience includes initiatives reaching more than 800 SMEs, for which she designs diagnostics, segmentation tools, advisory pathways and founder capacity-building programmes.",
    ],
    experience: [
      { num: "12+", label: "Years in SME finance, enterprise development and investment advisory" },
      { num: "2,000+", label: "Businesses supported across 11 sectors" },
      { num: "50+", label: "Enterprises recommended for investment consideration (USD 100K–500K)" },
      { num: "15+", label: "OceanHub Africa portfolio businesses supported" },
      { num: "800+", label: "SMEs reached through enterprise programmes" },
    ],
    research:
      "Her ongoing doctoral research examines how management capability and access to finance influence SME growth in Kenya and South Africa.",
  },
  bench: [
    {
      area: "Finance and capital readiness",
      detail:
        "Associate specialists in financial modelling, management reporting, due diligence preparation and investor documentation.",
    },
    {
      area: "Operations and systems",
      detail:
        "Associate specialists who set up accounting software, reporting processes, controls and operational workflows.",
    },
    {
      area: "Governance and strategy",
      detail:
        "Associate specialists who support board structures, strategy reviews, policies and management rhythms.",
    },
    {
      area: "Enterprise development and MEL",
      detail:
        "Associate specialists in cohort delivery, curriculum, monitoring, evaluation and learning for enterprise programmes.",
    },
    {
      area: "Specialist tax and legal support",
      detail:
        "Arranged through trusted partners when an engagement needs tax or legal input outside our scope.",
    },
  ],
  tools: [
    {
      name: "Business Growth Check-Up",
      status: "Available",
      detail:
        "A free online diagnostic for growing businesses. It gives a first view of financial and management readiness and helps us scope a conversation.",
    },
    {
      name: "Portfolio reporting dashboards",
      status: "Delivered within engagements",
      detail:
        "Built and run by CFOIP for each fund or programme mandate, using the same indicators across every company in the portfolio or cohort.",
    },
    {
      name: "Resource library",
      status: "Available",
      detail:
        "Practical guides and templates for business owners. The KRA filing checklist is available now, and more templates are published as they are ready.",
    },
    {
      name: "Cash Flow Tracker and other templates",
      status: "In development",
      detail:
        "Self-service templates for cash-flow tracking and financial planning. We will publish them once they have been tested with businesses.",
    },
  ],
  faqs: [
    {
      q: "What does CFO Innovation Partners do?",
      a: "CFO Innovation Partners (CFOIP) is a Nairobi-based advisory and implementation firm. We provide fractional CFO support, financial systems and investment readiness for growing SMEs. For investment funds, DFIs and lenders, we provide portfolio financial management and pre- and post-investment support. For accelerators and development partners, we design and deliver enterprise development, technical assistance and investment readiness programmes. In each case we diagnose the business, set priorities, do the implementation work and track progress against agreed measures.",
    },
    {
      q: "Where are you based, and which markets do you cover?",
      a: "We are based at Cove Court, Watermark Business Park, Nairobi, and registered in Kenya in 2024. Most of our work is in Kenya and the wider East African region. We also take on work in selected African markets, particularly for funds and programmes whose portfolios or cohorts span several countries. Much of our advisory and reporting work can be delivered remotely, with in-person sessions arranged where the engagement needs them.",
    },
    {
      q: "Who will work on our engagement?",
      a: "Mary Ndinda, our Founder and Managing Partner, leads every engagement and remains your main point of contact. Depending on the scope, she is supported by associate specialists matched to the work, drawn from our bench in finance and capital readiness, operations and systems, governance and strategy, and enterprise development and MEL. Specialist tax and legal support is arranged through partners when needed. We confirm the team in our proposal before any work begins.",
    },
    {
      q: "Do you raise capital or guarantee financing?",
      a: "No. We are not a broker, and we do not guarantee financing, investment or grant approval. We prepare businesses so their financial records, models and documents meet the standard investors and lenders expect, and we help them identify and approach suitable sources. Decisions rest with the funder. Figures in our founder's experience, such as enterprises recommended for investment consideration, refer to recommendations made during assessments, not capital raised.",
    },
    {
      q: "How do digital tools fit into your work?",
      a: "We use digital tools to make delivery faster and more consistent: a structured online diagnostic, standard templates and portfolio reporting dashboards that we build and run within engagements. These tools support our advisers. They do not replace professional judgement, and every recommendation is reviewed by a person who understands the business. We label each tool honestly as available, delivered within engagements or in development.",
    },
  ],
};

export const APPROACH: ApproachContent = {
  seo: {
    title: "Our Six-Stage Advisory Method | CFOIP",
    description:
      "How CFOIP works: Diagnose, Interpret, Recommend, Advise, Execute, Track. One method for single businesses and for fund portfolios or programme cohorts.",
  },
  h1: "How we work: six stages from diagnosis to tracked results",
  summary:
    "CFO Innovation Partners (CFOIP) uses one six-stage method for every engagement: Diagnose, Interpret, Recommend, Advise, Execute and Track. For a single business, it moves from a structured diagnostic to an ordered action plan and hands-on implementation. For a fund portfolio or programme cohort, the same instrument runs across every company, so results can be compared, segmented and reported.",
  stages: [
    {
      stage: "Diagnose",
      summary:
        "Assess business fundamentals, scale-up readiness, or advisory need through a structured instrument.",
      enterprise:
        "We review records, cash position, margins, reporting, systems and management capacity, and interview the founder and finance team. The diagnostic shows where the business stands today, with evidence.",
      portfolio:
        "We run the same instrument across every portfolio company or cohort participant. That gives the fund or programme a consistent baseline and shows which companies could not provide the minimum data.",
      outputs: [
        "Completed diagnostic for each enterprise",
        "Baseline scores by area",
        "Data gaps register",
      ],
    },
    {
      stage: "Interpret",
      summary:
        "Classify the business by stage, archetype, profile, and binding constraint.",
      enterprise:
        "We classify the business by growth stage and profile, and name the one or two constraints that limit progress most, such as cash, pricing, reporting or management capacity.",
      portfolio:
        "We segment the portfolio or cohort by stage and binding constraint, and assign each company a risk tier. Investment and programme teams can see at a glance where attention is needed.",
      outputs: [
        "Business profile and binding constraint",
        "Portfolio or cohort segmentation",
        "Risk tier for each company",
      ],
    },
    {
      stage: "Recommend",
      summary:
        "Provide a 90-day or 6-to-12-month action map with priorities ordered.",
      enterprise:
        "The business receives an action map with priorities in order, owners named and a 90-day or 6-to-12-month horizon. Each action links back to a diagnostic finding.",
      portfolio:
        "We write an intervention plan by segment, so support and budget go first to the companies and constraints that carry the most risk.",
      outputs: [
        "90-day action map",
        "6-to-12-month priority plan",
        "Intervention plan by segment",
      ],
    },
    {
      stage: "Advise",
      summary:
        "Deliver expert input through advisory sessions, the Expert Advisory Panel, virtual board, or strategy committee.",
      enterprise:
        "The founder and management team meet us regularly for advisory sessions. For larger decisions, we can convene the Expert Advisory Panel or act as a virtual board or strategy committee.",
      portfolio:
        "We brief the investment committee or programme team on findings, flag companies that need closer attention and advise on how to allocate technical assistance.",
      outputs: [
        "Advisory session notes and decisions",
        "Investment committee or programme team briefing",
        "TA allocation guidance",
      ],
    },
    {
      stage: "Execute",
      summary:
        "Deploy fractional CFO, operational, financial, systems, or investor readiness support.",
      enterprise:
        "We do the work alongside the team: management accounts, forecasts, budgets, pricing analysis, financial models, accounting systems and investor documents.",
      portfolio:
        "We deliver technical assistance company by company, using common templates and standards so outputs are comparable across the portfolio or cohort.",
      outputs: [
        "Management accounts and forecasts",
        "Financial model or systems set-up",
        "Investor readiness documents",
        "Company-level TA records",
      ],
    },
    {
      stage: "Track",
      summary:
        "Monitor progress through reports, KPIs, check-ins, and a defined accountability rhythm.",
      enterprise:
        "We report against agreed KPIs, hold regular check-ins and adjust the plan as the business changes. The founder can see what has improved and what still needs work.",
      portfolio:
        "We produce a quarterly portfolio report and an intervention log, showing movement against the baseline for each company and where risk remains.",
      outputs: [
        "KPI reports",
        "Quarterly portfolio report",
        "Intervention log",
      ],
    },
  ],
  principles: [
    {
      title: "Start from the business as it is",
      detail:
        "We work from the records and constraints a business actually has. Incomplete data is a finding, and we plan around it.",
    },
    {
      title: "One instrument across every company",
      detail:
        "Funds and programmes get the same diagnostic and reporting framework for each company, so results can be compared and aggregated.",
    },
    {
      title: "Implement as well as advise",
      detail:
        "We set up the systems, models and reporting routines we recommend, and stay involved until the team can run them.",
    },
    {
      title: "Readiness without promises",
      detail:
        "We prepare businesses to meet investor and lender standards. We never guarantee financing, and we are not a broker.",
    },
    {
      title: "Tools support judgement",
      detail:
        "Digital tools make our delivery faster and more consistent. Every recommendation is reviewed by an experienced adviser.",
    },
  ],
  faqs: [
    {
      q: "Do we have to go through all six stages?",
      a: "Most engagements use all six stages, but the weight given to each depends on the work. A financial model for a single business may move quickly through diagnosis and focus on execution. A portfolio mandate usually spends more time on diagnosis, segmentation and tracking. We always start with some form of diagnostic, because recommendations without evidence are guesses. We agree with you during scoping which stages need the most time and what each will produce.",
    },
    {
      q: "How long does the diagnostic stage take?",
      a: "For a single business, the diagnostic usually takes one to three weeks, depending on how quickly records can be shared and how complete they are. Growing businesses can start with our free online Business Growth Check-Up for a first view. For a portfolio or cohort, timing depends on the number of companies and how quickly each responds. We set a timetable during scoping and report on companies that have not provided the data needed.",
    },
    {
      q: "How does the method work for a portfolio or cohort?",
      a: "We apply the same diagnostic instrument to every company, which gives the fund or programme a consistent baseline. We then segment companies by stage and binding constraint, assign risk tiers and write an intervention plan by segment. We brief the investment committee or programme team, deliver technical assistance company by company, and report quarterly with a portfolio report and an intervention log. The result is comparable information across the whole group.",
    },
    {
      q: "What is the Expert Advisory Panel?",
      a: "The Expert Advisory Panel is a group of associate specialists we convene when a business faces a decision that needs more than one perspective, such as a major expansion, a financing round or a restructuring. Panel members are matched to the question, drawing on our bench in finance and capital readiness, operations and systems, governance and strategy, and enterprise development. The panel advises; the business's own leadership makes the decision.",
    },
    {
      q: "How do you measure whether the work has made a difference?",
      a: "We agree KPIs at the Recommend stage and report against them at the Track stage. For a single business, these usually cover reporting timeliness, cash visibility, forecast accuracy, margins and progress on the action map. For a portfolio or cohort, we repeat the diagnostic at agreed points and report movement against the baseline by company and by segment. We report what changed honestly, including where progress has been slower than planned.",
    },
  ],
};
