/**
 * Blog posts — built from CFOIP strategic insights, Q2 2026 cohort data,
 * and the published MEL report. Each post has a branded SVG mock image
 * (no external assets) and structured body content.
 */

export type BlockType =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[] }
  | { type: "stat"; num: string; label: string };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  imageGradient: [string, string]; // for the SVG cover
  imageIcon: "compass" | "chart" | "shield" | "users" | "lightbulb" | "target";
  body: BlockType[];
}

export const POSTS: BlogPost[] = [
  {
    slug: "the-capital-misdiagnosis",
    title:
      "The capital misdiagnosis: why African founders are wrong about what is blocking growth",
    excerpt:
      "Our diagnostic data is clear. When founders blame capital, the real blocker is almost always structure — bank accounts, records, registration, customer concentration. Capital cannot fix what structure has not built yet.",
    category: "Diagnostic Insight",
    date: "2026-06-10",
    readTime: "6 min read",
    author: "Mary Ndinda, Founder & Managing Partner",
    imageGradient: ["#0F172A", "#B8860B"],
    imageIcon: "target",
    body: [
      {
        type: "p",
        text: "We have been running the Business Growth Check-Up with founders across East Africa for two quarters. A consistent pattern keeps emerging in the responses: when founders are asked what is holding the business back, they name money. But when we look at the structure underneath — bank accounts, sales records, tax registration, customer concentration — the real blocker is almost never capital.",
      },
      {
        type: "quote",
        text: "Capital cannot fix what structure has not built yet.",
        attribution: "A finding from the CFO Partners diagnostic cohort, Q2 2026",
      },
      {
        type: "h2",
        text: "What the data shows",
      },
      {
        type: "p",
        text: "Across the 47 Business Growth Check-Ups completed in Q2 2026, three structural patterns repeat regardless of business age, industry, or score band:",
      },
      {
        type: "list",
        items: [
          "Founders score higher on Growth Path and Vision than on Operations and Systems. They know where they want to go. They do not have what they need to get there.",
          "Customer concentration risk is normalised. Founders flag capital as a worry; they do not flag the fact that one customer is 75 per cent of revenue.",
          "Tax compliance is the principal capital-access blocker. The moment a founder applies for credit, KRA standing is the first question asked.",
        ],
      },
      {
        type: "h2",
        text: "Why this matters",
      },
      {
        type: "p",
        text: "A capital deployment vehicle calibrated to founders who think they need money — when what they actually need is structure — will under-perform. The CFO Partners diagnostic surfaces the binding constraint before the capital conversation begins, which is why our diagnostic-to-paid conversion sits at 16 per cent against a market benchmark of 8 to 12 per cent.",
      },
      {
        type: "p",
        text: "The pipeline is being built one founder, one accelerator, and one institutional partner at a time. Demand for the model is structural, not promotional.",
      },
    ],
  },
  {
    slug: "44-percent-women-led",
    title:
      "44% women-led: what the Kenyan credit book got wrong about SME readiness",
    excerpt:
      "Our Q2 2026 cohort is 44% women-led — against a Kenyan commercial bank SME benchmark of around 17%. Women founders are scoring higher than men on Revenue Clarity, Cost Structure, and Operations. The risk profile of a capital vehicle routed through this pipeline would look materially different.",
    category: "Cohort Data",
    date: "2026-06-08",
    readTime: "5 min read",
    author: "CFOIP MEL Team",
    imageGradient: ["#1E40AF", "#B8860B"],
    imageIcon: "users",
    body: [
      {
        type: "p",
        text: "The most material finding in our Q2 2026 cohort is not the headline number of 56 founders served. It is the gender composition underneath it.",
      },
      {
        type: "stat",
        num: "44%",
        label: "Women founders in the Q2 2026 cohort",
      },
      {
        type: "p",
        text: "Against a published Kenyan commercial bank SME book benchmark of approximately 17 per cent women-led penetration, the CFOIP pipeline is over-indexing women founders by a factor of more than two and a half. This is not the result of a targeting strategy. It is the result of the diagnostic itself — a structured, low-friction, evidence-led instrument that women founders are choosing to engage with.",
      },
      {
        type: "h2",
        text: "What the scoring shows",
      },
      {
        type: "p",
        text: "Women founders in the Q2 2026 cohort score above the cohort mean on three of the six diagnostic pillars:",
      },
      {
        type: "list",
        items: [
          "Pillar 1 — Revenue Clarity",
          "Pillar 2 — Cost Structure",
          "Pillar 4 — Operations and Systems",
        ],
      },
      {
        type: "p",
        text: "Several of the cohort's strongest businesses by score are women-led — including the highest-scoring Scaler-trajectory founder in the cohort. Geographic spread within the women-led segment includes both urban (Nairobi) and peri-urban (Kilifi, rural Kenya) founders.",
      },
      {
        type: "h2",
        text: "The implication for partners",
      },
      {
        type: "quote",
        text: "A capital deployment vehicle calibrated to women-led businesses surfacing through the CFOIP pathway would carry a materially different risk profile from the prevailing benchmark.",
        attribution: "CFOIP Q2 2026 Impact Report",
      },
      {
        type: "p",
        text: "This is what we mean when we say diagnostic-led pipeline construction produces a different distribution than open-market origination. The pipeline does not have to be built around demographic targets — the diagnostic does the segmentation work upstream.",
      },
    ],
  },
  {
    slug: "three-pathways-to-impact",
    title:
      "Three pathways from diagnostic to growth: founder, institutional, systems",
    excerpt:
      "Founder, institutional, and systems pathways operate on different timelines and require different MEL methodologies. Here is how we measure what we are actually doing — and why every diagnostic activates one of the three.",
    category: "Theory of Change",
    date: "2026-06-05",
    readTime: "7 min read",
    author: "CFOIP MEL Team",
    imageGradient: ["#065F46", "#B8860B"],
    imageIcon: "compass",
    body: [
      {
        type: "p",
        text: "Every Business Growth Check-Up activates one of three pathways through the firm. The MEL report calls them Pathway A, B, and C. They sit on different timelines, serve different audiences, and require different measurement methods.",
      },
      {
        type: "h2",
        text: "Pathway A — the founder",
      },
      {
        type: "p",
        text: "Diagnostic completed → Archetype identified → Action map issued → At least one action taken → Operating discipline improves → Bankable, investable, partner-ready.",
      },
      {
        type: "p",
        text: "This is the most common pathway. It is also the most measurable. We track founder reply rates to advisory letters (~60% qualitative), 30-day action taken, separation of personal and business accounts, and conversion to paid advisory engagement.",
      },
      {
        type: "h2",
        text: "Pathway B — the institution",
      },
      {
        type: "p",
        text: "Cohort segmentation delivered to partner → Partner routes portfolio through diagnostic → Partner improves SME pipeline quality → Measurable improvement in underwriting, programme, or capital productivity.",
      },
      {
        type: "p",
        text: "Institutional pathways move slower than founder pathways but produce larger downstream effects. A single bank or accelerator routing its portfolio through CFOIP surfaces tens or hundreds of founder pathways in parallel.",
      },
      {
        type: "h2",
        text: "Pathway C — the system",
      },
      {
        type: "p",
        text: "Cohort intelligence published → Segment patterns become visible to the ecosystem → Ecosystem actors recalibrate programme design → Segment-wide capability uplift.",
      },
      {
        type: "p",
        text: "Pathway C is the longest-running and the hardest to attribute. It is also where the 44% women-led finding belongs — a piece of cohort intelligence that, once visible to the ecosystem, changes how other actors design SME support.",
      },
      {
        type: "quote",
        text: "Each operates on a different timeline. Each requires different MEL methodology to assess.",
        attribution: "CFOIP Q2 2026 Impact Report",
      },
    ],
  },
  {
    slug: "customer-concentration-the-quiet-risk",
    title:
      "Customer concentration: the risk founders normalise until it kills the business",
    excerpt:
      "A diversified manufacturer in our cohort scored 117 of 150 as a Scaler. The diagnostic still surfaced two unlocks the founder had not named — including one structural risk that quietly kills more African SMEs than anything else.",
    category: "Founder Story",
    date: "2026-06-02",
    readTime: "5 min read",
    author: "CFOIP Advisory Team",
    imageGradient: ["#7F1D1D", "#B8860B"],
    imageIcon: "shield",
    body: [
      {
        type: "p",
        text: "A woman founder running a five-year manufacturing business at over KES 500,000 in monthly revenue completed the Business Growth Check-Up. She had a fully diversified customer base, a repaid formal loan, and clear documentation. The diagnostic classified her as a Scaler at 117 of 150.",
      },
      {
        type: "p",
        text: "On paper, a textbook strong founder. And yet the advisory letter still named two unlocks she had not surfaced in her intake responses.",
      },
      {
        type: "h2",
        text: "What the diagnostic found",
      },
      {
        type: "list",
        items: [
          "No customer relationship management system. At her revenue scale and diversification level, this is the single largest source of revenue leakage waiting to happen.",
          "An unfiled tax position that — left another quarter — would have blocked her from any institutional credit conversation.",
        ],
      },
      {
        type: "p",
        text: "The founder replied within 48 hours. Both items are now her stated priorities for the next quarter. She has been routed into a paid Monthly Membership at the Expert Advisory Panel.",
      },
      {
        type: "h2",
        text: "Why this matters",
      },
      {
        type: "p",
        text: "Customer concentration is the risk most African SME founders normalise. Until they cannot. The Scaler-trajectory founders we see most often are not blind to it — they have diversified. But the related risks — CRM discipline, tax position, supplier dependency — quietly compound underneath them. A structured diagnostic surfaces these before the capital conversation. Capital does not solve them.",
      },
      {
        type: "quote",
        text: "The value is not only the report. The value is the business clarity and action pathway that comes from it.",
        attribution: "CFOIP Company Presentation, June 2026",
      },
    ],
  },
  {
    slug: "what-56-founders-taught-us",
    title:
      "What 56 founders taught us in Q2 2026",
    excerpt:
      "Eight structural insights from the first operating cohort. Founders know revenue better than margins. Sales activity is mistaken for business structure. And affordable senior advisory is a clear market need.",
    category: "Q2 Review",
    date: "2026-05-29",
    readTime: "8 min read",
    author: "Mary Ndinda, Founder & Managing Partner",
    imageGradient: ["#1E3A8A", "#B8860B"],
    imageIcon: "chart",
    body: [
      {
        type: "p",
        text: "Q2 2026 was our first full operating quarter as CFO Innovation Partners. Fifty-six founders served. Eleven sectors. Two countries. The patterns inside that cohort are sharp enough to publish.",
      },
      {
        type: "h2",
        text: "Eight things we are seeing",
      },
      {
        type: "list",
        items: [
          "Founders know their revenue better than their margins.",
          "Sales activity is consistently mistaken for business structure.",
          "Customer concentration is under-recognised as a risk.",
          "Many founders seek capital before they are operationally ready.",
          "Scale-ups are constrained by leadership, governance, and execution rhythm.",
          "Financial records remain the principal readiness gap.",
          "Founders want practical next steps, not generic training.",
          "Affordable senior advisory is a clear market need.",
        ],
      },
      {
        type: "h2",
        text: "What this means for the model",
      },
      {
        type: "p",
        text: "We did not start with a product. We started with the business reality. Six quarters of diagnostic data confirm that the support that actually changes founder behaviour is sequential, not modular: diagnose, interpret, recommend, advise, execute, track. Each stage works because the stages before it were delivered with discipline.",
      },
      {
        type: "p",
        text: "The conversion data confirms the demand. 16 per cent of completed diagnostics convert into paid engagement, against an 8 to 12 per cent benchmark for comparable entrants. The 100 per cent routing rate confirms the model is calibrated — every diagnostic ends with a named next step.",
      },
      {
        type: "quote",
        text: "The biggest gaps are structural, not motivational.",
        attribution: "CFOIP Company Presentation, June 2026",
      },
    ],
  },
  {
    slug: "clarity-before-capital",
    title:
      "Clarity before capital. Structure before scale. Capability before complexity.",
    excerpt:
      "Our three operating beliefs explained. Most businesses do not fail because founders lack ambition. They struggle because the business lacks the financial clarity, systems, governance, and decision-support infrastructure required for the next stage.",
    category: "Core Belief",
    date: "2026-05-25",
    readTime: "4 min read",
    author: "Mary Ndinda, Founder & Managing Partner",
    imageGradient: ["#0F172A", "#92400E"],
    imageIcon: "lightbulb",
    body: [
      {
        type: "p",
        text: "Three operating beliefs sit underneath everything we build at CFO Innovation Partners. They are sequential, deliberate, and load-bearing.",
      },
      {
        type: "h2",
        text: "Clarity before capital",
      },
      {
        type: "p",
        text: "Founders are routinely pushed toward capital before their businesses are ready to absorb it. Our diagnostic data shows the pattern: when founders are asked what is blocking growth, they name money. When we look at the structure underneath, the actual blocker is records, registration, or customer concentration. Capital is the last conversation, not the first.",
      },
      {
        type: "h2",
        text: "Structure before scale",
      },
      {
        type: "p",
        text: "Scale-ups are founder-dependent, under-governed, and short of senior decision support. Growth at this stage compounds dysfunction unless leadership rhythm, board-style governance, and execution discipline have been installed first. We deliver this through fractional CFO support, the Virtual Board, and Strategy Committee — not through generic training.",
      },
      {
        type: "h2",
        text: "Capability before complexity",
      },
      {
        type: "p",
        text: "We do not start with a product. We start with the business reality. Every engagement begins with a structured diagnostic — Business Growth Check-Up for early and growing founders, Scale-Up Business Assessment for established businesses — and the support is calibrated to the binding constraint surfaced by the data, not to a pre-packaged offering.",
      },
      {
        type: "quote",
        text: "Our work helps founders stop guessing and start building from evidence.",
      },
    ],
  },
];

export function postFor(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function allPostSlugs(): string[] {
  return POSTS.map((p) => p.slug);
}
