/**
 * Blog posts built from CFOIP strategic insights, Q2 2026 cohort data,
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
      "Our diagnostic data is clear. When founders blame capital, the real blocker is almost always structure: bank accounts, records, registration, customer concentration. Capital cannot fix what structure has not built yet.",
    category: "Diagnostic Insight",
    date: "2026-06-10",
    readTime: "6 min read",
    author: "Mary Ndinda, Founder & Managing Partner",
    imageGradient: ["#0F172A", "#B8860B"],
    imageIcon: "target",
    body: [
      {
        type: "p",
        text: "In our diagnostic work with founders across East Africa, a consistent pattern keeps emerging. When founders are asked what is holding the business back, they name money. But when we look at the structure underneath, at bank accounts, sales records, tax registration, and customer concentration, the real blocker is almost never capital.",
      },
      {
        type: "quote",
        text: "Capital cannot fix what structure has not built yet.",
        attribution: "From our diagnostic work with founders",
      },
      {
        type: "h2",
        text: "What the data shows",
      },
      {
        type: "p",
        text: "Across the Business Growth Check-Ups completed in Q2 2026, three structural patterns repeat regardless of business age, industry, or score band:",
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
        text: "A capital deployment vehicle calibrated to founders who think they need money, when what they actually need is structure, will under-perform. A diagnostic that surfaces the binding constraint before the capital conversation begins gives founders, lenders and investors a better starting point.",
      },
      {
        type: "p",
        text: "The pipeline is being built one founder, one accelerator, and one institutional partner at a time. Demand for the model is structural, not promotional.",
      },
    ],
  },
  {
    slug: "customer-concentration-the-quiet-risk",
    title:
      "Customer concentration: the risk founders normalise until it kills the business",
    excerpt:
      "A diversified manufacturer in our cohort scored 117 of 150 as a Scaler. The diagnostic still surfaced two gaps the founder had not named, including one structural risk that quietly kills more African SMEs than anything else.",
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
          "An unfiled tax position that, left another quarter, would have blocked her from any institutional credit conversation.",
        ],
      },
      {
        type: "p",
        text: "The founder replied within 48 hours. Both items are now her stated priorities for the next quarter. She moved into ongoing advisory support.",
      },
      {
        type: "h2",
        text: "Why this matters",
      },
      {
        type: "p",
        text: "Customer concentration is the risk most African SME founders normalise until it is too late. The Scaler-trajectory founders we see most often are not blind to it; they have diversified. But the related risks, such as CRM discipline, tax position, and supplier dependency, quietly compound underneath them. A structured diagnostic surfaces these before the capital conversation. Capital does not solve them.",
      },
      {
        type: "quote",
        text: "The value is not only the report. The value is the business clarity and action pathway that comes from it.",
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
        text: "Scale-ups are founder-dependent, under-governed, and short of senior decision support. Growth at this stage compounds dysfunction unless leadership rhythm, board-style governance, and execution discipline have been installed first. We deliver this through fractional CFO support, the Virtual Board, and the Strategy Committee rather than through generic training.",
      },
      {
        type: "h2",
        text: "Capability before complexity",
      },
      {
        type: "p",
        text: "We do not start with a product. We start with the business reality. Every engagement begins with a structured diagnostic: the Business Growth Check-Up for early and growing founders, or the Scale-Up Business Assessment for established businesses. The support is calibrated to the binding constraint surfaced by the data, not to a pre-packaged offering.",
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
