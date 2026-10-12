/**
 * The Founder Diagnostic — question bank, verbatim from the live Notion
 * instrument ("Founder Intelligence Database" / "The Founder Diagnostic"),
 * so the on-site version asks the exact same things in the exact same
 * order. Source: Notion pages "🧭 Founder Intelligence Workspace",
 * "🔬 Diagnostic Framework — Master Synthesis", and "📝 Founder-Friendly
 * Question Copy — Q15, Q16 and Q30–Q39" (fetched 2026-10-12).
 *
 * `pillar` tags the ~17 questions that feed the seven Operational Maturity
 * scores — see lib/diagnostic/scoring.ts for how. Everything else is
 * either Capital Fit input (Q30-39), Founder Interior State (Q24-29, flags
 * only, not score-weighted), fit/sales context (Q14, Q18-23), pure
 * identity, or free text — none of those are pillar-scored, matching the
 * diagnostic's own stated principle that some questions are "diagnostic,
 * not scored."
 *
 * For select-type questions that ARE pillar-scored, `options` are listed
 * BEST first, WORST last — lib/diagnostic/scoring.ts turns that position
 * into a 0-5 point value. Order here is for scoring only; the form UI
 * does not need to (and mostly does not) present them in this order.
 */

export type PillarKey =
  | "financialClarity"
  | "revenueQuality"
  | "operations"
  | "teamCapacity"
  | "governance"
  | "capitalReadiness"
  | "advisoryUrgency";

export type QuestionType = "select" | "multi_select" | "text";

export type Question = {
  id: string;
  label: string;
  helperText?: string;
  type: QuestionType;
  /** Display order for the form. For select/multi_select, NOT necessarily best-first. */
  displayOptions?: string[];
  /** Only set for pillar-scored select questions — best option first, worst last. */
  scoredOptions?: string[];
  pillar?: PillarKey;
  required: boolean;
};

export type Section = {
  number: number;
  title: string;
  intro: string;
  questions: Question[];
};

export const IDENTITY_FIELDS = {
  businessName: "Business Name",
  founderName: "Founder Name",
  email: "Email",
  phone: "Phone / WhatsApp",
  location: "Location",
  sector: "Sector",
  websiteUrl: "Website / Social Link",
} as const;

export const SECTOR_OPTIONS = [
  "Agribusiness",
  "Manufacturing",
  "Retail or Wholesale",
  "Food and Beverage",
  "Tech or Digital",
  "Professional Services",
  "Health or Wellness",
  "Education",
  "Logistics or Transport",
  "Construction or Real Estate",
  "Fashion or Apparel",
  "Creative or Media",
  "Financial Services",
  "Hospitality",
  "Energy or Climate",
  "Other",
];

export const SECTIONS: Section[] = [
  {
    number: 1,
    title: "About your business",
    intro: "Let's start with the basics. Just the shape of your business today.",
    questions: [
      {
        id: "q1",
        label: "What stage is your business at right now?",
        type: "select",
        displayOptions: [
          "Idea — not yet selling",
          "Started selling — informal",
          "Generating regular revenue",
          "Team and some systems in place",
          "Established — trying to scale",
          "Preparing for funding / credit / expansion",
        ],
        required: true,
      },
      {
        id: "q2",
        label: "How long has the business been operating?",
        type: "select",
        displayOptions: ["Less than 6 months", "6 to 12 months", "1 to 3 years", "3 to 5 years", "5+ years"],
        scoredOptions: ["5+ years", "3 to 5 years", "1 to 3 years", "6 to 12 months", "Less than 6 months"],
        pillar: "revenueQuality",
        required: true,
      },
      {
        id: "q3",
        label: "What is your average monthly revenue right now?",
        type: "select",
        displayOptions: [
          "No consistent revenue yet",
          "Below KES 100K",
          "KES 100K to 500K",
          "KES 500K to 1M",
          "KES 1M to 5M",
          "KES 5M+",
          "Prefer not to say",
        ],
        scoredOptions: [
          "KES 5M+",
          "KES 1M to 5M",
          "KES 500K to 1M",
          "KES 100K to 500K",
          "Below KES 100K",
          "No consistent revenue yet",
          "Prefer not to say",
        ],
        pillar: "revenueQuality",
        required: true,
      },
      {
        id: "q4",
        label: "How many people work in the business today?",
        type: "select",
        displayOptions: ["Founder only", "2 to 5", "6 to 10", "11 to 25", "26 to 50", "50+"],
        scoredOptions: ["50+", "26 to 50", "11 to 25", "6 to 10", "2 to 5", "Founder only"],
        pillar: "teamCapacity",
        required: true,
      },
    ],
  },
  {
    number: 2,
    title: "How you handle money and records",
    intro:
      "These five questions look at how the business tracks and understands its own money. There is no \"right\" answer — be honest. A clear \"no\" is more useful to us than a soft \"kind of.\"",
    questions: [
      {
        id: "q5",
        label: "How separate are your business and personal finances?",
        type: "select",
        displayOptions: ["Yes fully", "Partly", "No"],
        scoredOptions: ["Yes fully", "Partly", "No"],
        pillar: "financialClarity",
        required: true,
      },
      {
        id: "q6",
        label: "How often do you update the business's books?",
        type: "select",
        displayOptions: ["Weekly", "Monthly", "Quarterly", "Only when needed", "I do not keep proper books yet"],
        scoredOptions: ["Weekly", "Monthly", "Quarterly", "Only when needed", "I do not keep proper books yet"],
        pillar: "financialClarity",
        required: true,
      },
      {
        id: "q7",
        label: "How well do you know your monthly profit?",
        type: "select",
        displayOptions: ["Yes clearly", "Roughly", "No"],
        scoredOptions: ["Yes clearly", "Roughly", "No"],
        pillar: "financialClarity",
        required: true,
      },
      {
        id: "q8",
        label: "Could you produce six months of records within 48 hours if asked?",
        type: "select",
        displayOptions: ["Yes", "Maybe with effort", "No"],
        scoredOptions: ["Yes", "Maybe with effort", "No"],
        pillar: "financialClarity",
        required: true,
      },
      {
        id: "q9",
        label: "Do you keep a cash flow forecast for the next 6 to 12 months?",
        type: "select",
        displayOptions: ["Yes", "No", "I am not sure what that is"],
        scoredOptions: ["Yes", "No", "I am not sure what that is"],
        pillar: "financialClarity",
        required: true,
      },
    ],
  },
  {
    number: 3,
    title: "Operations, team, and governance",
    intro:
      "Now the running of the business — how dependent it is on you, what's documented, what's tracked, who holds you accountable.",
    questions: [
      {
        id: "q10",
        label: "If you stepped away for two weeks — what would happen to the business?",
        type: "select",
        displayOptions: ["Yes — almost everything depends on me", "Somewhat", "No — team can operate without me"],
        scoredOptions: ["No — team can operate without me", "Somewhat", "Yes — almost everything depends on me"],
        pillar: "teamCapacity",
        required: true,
      },
      {
        id: "q11",
        label: "Are the ways your business runs written down anywhere?",
        type: "select",
        displayOptions: ["Yes - most key processes documented", "Some are documented", "No"],
        scoredOptions: ["Yes - most key processes documented", "Some are documented", "No"],
        pillar: "operations",
        required: true,
      },
      {
        id: "q12",
        label: "Do you look at regular reports or numbers to run the business?",
        type: "select",
        displayOptions: ["Yes", "Some", "No"],
        scoredOptions: ["Yes", "Some", "No"],
        pillar: "operations",
        required: true,
      },
      {
        id: "q13",
        label: "Who holds you accountable outside the business itself?",
        type: "select",
        displayOptions: ["Yes", "Informally", "No"],
        scoredOptions: ["Yes", "Informally", "No"],
        pillar: "governance",
        required: true,
      },
    ],
  },
  {
    number: 4,
    title: "Growth and capital",
    intro:
      "The next four questions look at where the business is going and whether external capital fits into that path. If you are not planning to raise, that is a perfectly valid answer — say so on Q15.",
    questions: [
      {
        id: "q14",
        label: "What is the single biggest thing blocking the business right now?",
        type: "select",
        displayOptions: [
          "Understanding my numbers",
          "Improving cash flow",
          "Getting more customers",
          "Reducing business chaos",
          "Building systems",
          "Preparing for funding or credit",
          "Improving team performance",
          "Making a major business decision",
          "Scaling into a new market",
          "Other",
        ],
        required: true,
      },
      {
        id: "q15",
        label: "Are you currently raising or planning to raise capital?",
        helperText:
          "This is a real question, not a leading one. Many founders don't need external capital right now, and that is completely fine — sometimes the right answer is to build revenue first. Others are actively in the market. Wherever you are, tell us honestly.",
        type: "select",
        displayOptions: [
          "Yes - actively raising right now",
          "Yes - planning to start within the next 6 months",
          "Considering it but not sure yet",
          "No - not raising and not planning to",
          "Not sure if I should raise - help me think about it",
        ],
        scoredOptions: [
          "Yes - actively raising right now",
          "Yes - planning to start within the next 6 months",
          "Not sure if I should raise - help me think about it",
          "Considering it but not sure yet",
          "No - not raising and not planning to",
        ],
        pillar: "capitalReadiness",
        required: true,
      },
      {
        id: "q16",
        label: "If you are or might raise, what type of capital are you considering?",
        helperText:
          "There are many types of capital — bank loans, equity investment, grants, revenue-based financing, asset finance, and combinations. If you haven't decided, pick \"I don't know yet\" — that's exactly what this diagnostic helps answer.",
        type: "select",
        displayOptions: [
          "Bank loan",
          "Equity investment from angels or investors",
          "Grant funding",
          "Revenue-based financing — pay back as a percentage of sales",
          "Asset finance for specific equipment",
          "A mix of these",
          "I do not know yet — help me figure out what fits",
          "Not applicable — I am not raising",
        ],
        required: true,
      },
      {
        id: "q17",
        label: "Which of these do you already have ready?",
        helperText: "Select everything you currently have in reasonable shape.",
        type: "multi_select",
        displayOptions: [
          "Audited or reviewed accounts for the last 2 to 3 years",
          "Current management accounts (monthly or quarterly with variance)",
          "12 to 18 month cash flow forecast with scenarios",
          "3 to 5 year financial model or projections",
          "Unit economics document (CAC, LTV, margins by segment)",
          "Cap table showing all owners and any prior investors",
          "Investor or lender deck reflecting where the business is today",
          "Data room (customer contracts, tax certificates, incorporation, insurance)",
          "Board pack or regular KPI reporting format",
          "Impact framework or theory of change (for grants or impact investors)",
          "Collateral schedule (for debt raises)",
          "None of the above yet — I need help preparing these",
          "Not applicable — I am not raising",
        ],
        pillar: "capitalReadiness",
        required: true,
      },
    ],
  },
  {
    number: 5,
    title: "What you need from us",
    intro:
      "These questions help us match you to the right kind of support. Be honest about your budget, your urgency, and what you actually think would help. This is not a sales screening — it is a fit check.",
    questions: [
      {
        id: "q18",
        label: "What kind of support would be most useful to you right now?",
        type: "select",
        displayOptions: [
          "Diagnostic report — where my business stands",
          "One-off expert advisory session",
          "Monthly advisory support",
          "Financial records and reporting support",
          "Investor or bank readiness support",
          "Strategy and growth support",
          "I need a recommendation",
        ],
        required: true,
      },
      {
        id: "q19",
        label: "How urgent is finding the right support?",
        type: "select",
        displayOptions: ["Immediate", "Within 30 days", "Within 3 months", "Important but not urgent"],
        scoredOptions: ["Immediate", "Within 30 days", "Within 3 months", "Important but not urgent"],
        pillar: "advisoryUrgency",
        required: true,
      },
      {
        id: "q20",
        label: "Are you willing to pay for practical support if the fit is right?",
        type: "select",
        displayOptions: ["Yes immediately", "Yes within 30 days", "Maybe depending on price", "Not right now"],
        scoredOptions: ["Yes immediately", "Yes within 30 days", "Maybe depending on price", "Not right now"],
        pillar: "advisoryUrgency",
        required: true,
      },
      {
        id: "q21",
        label: "Roughly what would you consider investing in outside support?",
        type: "select",
        displayOptions: [
          "KES 30K to 75K — diagnostic only",
          "KES 75K to 200K — deeper engagement",
          "KES 200K to 500K — significant engagement",
          "KES 500K+ — embedded or retainer",
          "Open to a recommendation based on business evaluation need",
        ],
        required: true,
      },
      {
        id: "q22",
        label: "If you could solve one thing in the next 90 days — what would it be?",
        type: "text",
        required: false,
      },
      {
        id: "q23",
        label: "Anything else about the business we should know?",
        type: "text",
        required: false,
      },
    ],
  },
  {
    number: 6,
    title: "How you are doing, as a founder",
    intro:
      "These questions are about you, not the business. Founders often carry things they don't talk about anywhere else. How you're doing shapes what kind of advisory actually helps, so we ask — respectfully, and with the understanding that everything you share stays confidential.",
    questions: [
      {
        id: "q24",
        label: "Which stage of the founder journey are you in right now?",
        type: "select",
        displayOptions: [
          "Start — building from scratch",
          "Survive — keeping the lights on",
          "Scale — pushing for growth",
          "Break — hit a wall and reassessing",
          "Rebuild — coming back from a setback",
          "Transition — exiting or handing over",
          "Legacy — focused on long-term impact",
        ],
        required: true,
      },
      {
        id: "q25",
        label: "What is your main focus right now?",
        type: "select",
        displayOptions: [
          "Finding customers — proving demand",
          "Building revenue — converting demand to sales",
          "Building repeatability — same outcome every time",
          "Scaling — same model with more volume",
          "Raising capital — bringing in external funding",
          "Not sure or a mix of these",
        ],
        required: true,
      },
      {
        id: "q26",
        label: "How would you describe your energy and capacity right now?",
        type: "select",
        displayOptions: [
          "Energised — clear and focused",
          "Steady — managing well day to day",
          "Stretched — running on adrenaline",
          "Depleted — burning out",
          "Recovering — coming back from burnout",
        ],
        required: true,
      },
      {
        id: "q27",
        label: "What decision are you currently wrestling with?",
        type: "text",
        required: false,
      },
      {
        id: "q28",
        label: "What kind of founder support would help most right now?",
        type: "multi_select",
        displayOptions: [
          "Mindset — moving from scarcity to abundance",
          "Emotional — resilience and processing setbacks",
          "Strategic — timing and risk calibration",
          "Social — peer networks and belonging",
          "Spiritual — legacy and meaning",
        ],
        required: false,
      },
      {
        id: "q29",
        label: "Are you rebuilding after a setback?",
        type: "select",
        displayOptions: [
          "No — current trajectory is forward",
          "Yes — within the last 12 months",
          "Yes — within the last 1 to 3 years",
          "Yes — earlier and still navigating",
        ],
        required: true,
      },
    ],
  },
  {
    number: 7,
    title: "Where your business fits in the capital landscape",
    intro:
      "The next seven questions are about the shape of your business — not how well it is run, but what its economics can support. There are no wrong answers here. Two founders in the same industry can have completely different profiles, and that is exactly why we ask.",
    questions: [
      {
        id: "q30",
        label: "What does your revenue look like today?",
        helperText:
          "Different capital types fit different revenue patterns. Pre-revenue is also a valid answer if you are still building. Pick the option that most honestly describes the last three months.",
        type: "select",
        displayOptions: [
          "Pre-revenue — not yet selling",
          "Early revenue — one-off transactions",
          "Emerging repeatability — some regular customers",
          "Fully recurring and predictable",
        ],
        required: true,
      },
      {
        id: "q31",
        label: "How proven is your type of business?",
        helperText:
          "By \"type of business\" we mean the category or model, not your specific company. This helps us know how much risk lenders and investors will attach to your business.",
        type: "select",
        displayOptions: [
          "Novel or unvalidated — nothing like this exists locally",
          "Validated model — similar models work elsewhere",
          "Mature model — established local playbook exists",
        ],
        required: true,
      },
      {
        id: "q32",
        label: "If you needed to borrow money, what could the business offer as security?",
        helperText:
          "Collateral is anything the business owns that a lender could take if you did not repay a loan — business assets only, not personal ones.",
        type: "select",
        displayOptions: [
          "No meaningful collateral",
          "Some assets available — inventory, receivables, small equipment",
          "Strong collateral — real estate, significant equipment, verified receivables",
        ],
        required: true,
      },
      {
        id: "q33",
        label: "How \"heavy\" is your business to run?",
        helperText:
          "How much your business depends on physical assets, direct labour, and people showing up in person versus how much can happen digitally.",
        type: "select",
        displayOptions: [
          "High operational intensity — heavy assets, direct labour, in-person delivery",
          "Medium operational intensity — mix of physical and digital",
          "Light operational intensity — digital, asset-light, replicable",
        ],
        required: true,
      },
      {
        id: "q34",
        label: "How big is your market, and how easily could the business open somewhere new?",
        helperText:
          "First, how big is the market you serve today. Second, if you wanted to open in another city or country, would it be relatively easy or would you essentially start from scratch.",
        type: "select",
        displayOptions: [
          "Constrained — small local market, model does not travel",
          "Moderate — reasonable market with some portability",
          "Significant — large addressable market or highly portable",
        ],
        required: true,
      },
      {
        id: "q35",
        label: "Roughly how fast has your revenue been growing over the last 12 months?",
        helperText:
          "Compare your monthly revenue a year ago to now. If pre-revenue or too inconsistent to be sure, pick \"Low — 0 to 5 percent.\"",
        type: "select",
        displayOptions: [
          "Low — 0 to 5 percent",
          "Low to Medium — 5 to 15 percent",
          "Medium — 15 to 40 percent",
          "Medium to High — 40 to 100 percent",
          "High — above 100 percent",
        ],
        required: true,
      },
      {
        id: "q36",
        label: "For every 100 shillings in sales, roughly how much is left after direct costs?",
        helperText:
          "This is gross margin — sales minus the direct cost of what you delivered. It's fine to estimate: restaurants often keep 20-40%, manufacturing 15-35%, software 60-90%, retail 15-30%.",
        type: "select",
        displayOptions: [
          "Low — 0 to 20 percent",
          "Low to Medium — 20 to 40 percent",
          "Medium — 40 to 60 percent",
          "Medium to High — 60 to 80 percent",
          "High — above 80 percent",
        ],
        required: true,
      },
    ],
  },
  {
    number: 8,
    title: "What matters to you about how capital comes in",
    intro:
      "Two businesses in the same segment can still land on very different recommendations depending on you — what you prefer, what you'd use the money for, and where currency risk sits. Three questions to close this out.",
    questions: [
      {
        id: "q37",
        label: "How important is it to you to keep majority ownership and control of your business?",
        helperText:
          "Equity investors typically want a share of the business and a say in decisions. Debt doesn't touch ownership but requires repayment. There is no right answer here.",
        type: "select",
        displayOptions: [
          "Very important — I want to retain full control",
          "Important but flexible — I would give up equity for the right partner",
          "Not a priority — I care more about growth than control",
          "Not sure yet",
        ],
        required: true,
      },
      {
        id: "q38",
        label: "If you received capital, what would it primarily fund?",
        helperText: "Pick everything that applies — this is one of the most important questions on the form.",
        type: "multi_select",
        displayOptions: [
          "Working capital",
          "Inventory or asset purchase",
          "Marketing and customer acquisition",
          "Team hiring",
          "R&D or product development",
          "Geographic expansion",
          "Refinancing existing debt",
        ],
        required: true,
      },
      {
        id: "q39",
        label: "How much of your business happens in foreign currency?",
        helperText:
          "Some businesses sell in shillings but buy materials or services in dollars, euros, or yuan — that creates real risk if the shilling weakens.",
        type: "select",
        displayOptions: [
          "Low exposure — mostly local currency both sides",
          "Moderate exposure — some foreign currency costs",
          "High exposure — significant foreign currency costs, local revenue",
          "Naturally hedged — matching foreign revenue and costs",
          "Not sure",
        ],
        required: true,
      },
    ],
  },
  {
    number: 9,
    title: "In your own words",
    intro: "Almost done. Before we let you finish, one last question with no options, no boxes, and no wrong answer.",
    questions: [
      {
        id: "q40",
        label: "Is there something about your business you wish someone would ask you?",
        type: "text",
        required: false,
      },
    ],
  },
];

export const ALL_QUESTIONS: Question[] = SECTIONS.flatMap((s) => s.questions);

export const CONSENTS = [
  {
    id: "consent1",
    label:
      "I understand CFO Innovation Partners will use my answers to prepare my results and may follow up about relevant support.",
  },
  {
    id: "consent2",
    label:
      "I agree my anonymised answers may inform CFOIP's own research and ecosystem reporting (never shared with my name, business name, or contact details attached).",
  },
  {
    id: "consent3",
    label:
      "I understand I can ask CFO Innovation Partners to delete my submission at any time by emailing partner@cfopartners.fund.",
  },
] as const;
