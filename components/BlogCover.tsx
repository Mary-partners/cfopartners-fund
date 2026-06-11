import type { BlogPost } from "@/lib/blog";

interface Props {
  post: BlogPost;
  className?: string;
  size?: "card" | "hero";
}

/**
 * Illustrated SVG cover for blog posts. Each post key renders a distinct
 * vector scene: charts, pathways, pie risks, cohort dots. Zero external
 * assets, crisp at any size, themed to the brand palette.
 */
export function BlogCover({ post, className = "", size = "card" }: Props) {
  const [c1, c2] = post.imageGradient;
  const gradId = `g-${post.slug}`;

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <svg
        viewBox="0 0 800 450"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={post.title}
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c1} />
            <stop offset="100%" stopColor={c2} stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <rect width="800" height="450" fill={c1} />
        <rect width="800" height="450" fill={`url(#${gradId})`} opacity="0.6" />
        {/* faint grid */}
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 100}
            y1="0"
            x2={i * 100}
            y2="450"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={i * 100}
            x2="800"
            y2={i * 100}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        ))}
        <Scene kind={post.imageIcon} />
      </svg>
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
        <div className="flex items-center gap-2 self-start rounded-full bg-white/15 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur">
          {post.category}
        </div>
        {size === "hero" && (
          <div className="self-end font-serif text-[1.05rem] italic text-white/70">
            CFOIP Journal
          </div>
        )}
      </div>
    </div>
  );
}

const GOLD = "#D4A437";
const CREAM = "#F4F1EA";

function Scene({ kind }: { kind: BlogPost["imageIcon"] }) {
  switch (kind) {
    case "target":
      return <SceneMisdiagnosis />;
    case "users":
      return <SceneWomenLed />;
    case "compass":
      return <ScenePathways />;
    case "shield":
      return <SceneConcentration />;
    case "chart":
      return <SceneCohort />;
    case "lightbulb":
      return <SceneClarity />;
  }
}

/** Coins stacked above a cracked foundation block: capital on weak structure. */
function SceneMisdiagnosis() {
  return (
    <g>
      <rect x="250" y="330" width="90" height="50" rx="6" fill={CREAM} opacity="0.9" />
      <rect x="350" y="330" width="90" height="50" rx="6" fill={CREAM} opacity="0.55" />
      <rect x="460" y="330" width="90" height="50" rx="6" fill={CREAM} opacity="0.9" />
      <rect x="300" y="270" width="90" height="50" rx="6" fill={CREAM} opacity="0.9" />
      <rect x="410" y="270" width="90" height="50" rx="6" fill={CREAM} opacity="0.9" />
      <path
        d="M385 330 l8 14 -10 12 9 13 -6 11"
        stroke="#C0392B"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      {[0, 1, 2, 3].map((i) => (
        <ellipse
          key={i}
          cx="400"
          cy={210 - i * 22}
          rx="52"
          ry="14"
          fill={GOLD}
          stroke="#8B6914"
          strokeWidth="2"
          opacity={0.95 - i * 0.08}
        />
      ))}
      <text x="400" y="218" textAnchor="middle" fontFamily="Georgia, serif" fontSize="16" fill="#5C470B" fontWeight="bold">
        KES
      </text>
      <circle cx="540" cy="250" r="46" fill="none" stroke={CREAM} strokeWidth="8" opacity="0.95" />
      <line x1="572" y1="284" x2="612" y2="324" stroke={CREAM} strokeWidth="10" strokeLinecap="round" opacity="0.95" />
    </g>
  );
}

/** 44% vs 17% comparison bars beside a founder figure group. */
function SceneWomenLed() {
  return (
    <g>
      <rect x="180" y="160" width="110" height="200" rx="10" fill={GOLD} />
      <rect x="330" y="276" width="110" height="84" rx="10" fill={CREAM} opacity="0.5" />
      <text x="235" y="140" textAnchor="middle" fontFamily="Georgia, serif" fontSize="42" fill={CREAM} fontWeight="bold">
        44%
      </text>
      <text x="385" y="258" textAnchor="middle" fontFamily="Georgia, serif" fontSize="30" fill={CREAM} opacity="0.75" fontWeight="bold">
        17%
      </text>
      <text x="235" y="392" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="15" fill={CREAM} opacity="0.85">
        CFOIP cohort
      </text>
      <text x="385" y="392" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="15" fill={CREAM} opacity="0.65">
        bank book
      </text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${520 + i * 56}, 240)`}>
          <circle cx="0" cy="-30" r="16" fill={i < 2 ? GOLD : CREAM} opacity={i < 2 ? 1 : 0.55} />
          <path
            d="M-20 40 C-20 5 20 5 20 40 Z"
            fill={i < 2 ? GOLD : CREAM}
            opacity={i < 2 ? 1 : 0.55}
          />
        </g>
      ))}
    </g>
  );
}

/** Three branching pathways A, B, C from one origin node. */
function ScenePathways() {
  return (
    <g>
      <circle cx="180" cy="225" r="34" fill={GOLD} />
      <text x="180" y="232" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="16" fill="#3B2D05" fontWeight="bold">
        Start
      </text>
      <path d="M214 210 C320 120, 430 120, 540 130" stroke={CREAM} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M214 225 C340 225, 430 225, 540 235" stroke={GOLD} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M214 242 C320 330, 430 330, 540 330" stroke={CREAM} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.7" />
      <circle cx="585" cy="130" r="30" fill={CREAM} opacity="0.9" />
      <text x="585" y="138" textAnchor="middle" fontFamily="Georgia, serif" fontSize="22" fill="#1F2937" fontWeight="bold">A</text>
      <circle cx="585" cy="235" r="34" fill={GOLD} />
      <text x="585" y="244" textAnchor="middle" fontFamily="Georgia, serif" fontSize="24" fill="#3B2D05" fontWeight="bold">B</text>
      <circle cx="585" cy="330" r="30" fill={CREAM} opacity="0.75" />
      <text x="585" y="338" textAnchor="middle" fontFamily="Georgia, serif" fontSize="22" fill="#1F2937" fontWeight="bold">C</text>
      <text x="655" y="136" fontFamily="Inter, sans-serif" fontSize="15" fill={CREAM} opacity="0.9">Founder</text>
      <text x="655" y="241" fontFamily="Inter, sans-serif" fontSize="15" fill={CREAM} opacity="0.9">Institution</text>
      <text x="655" y="336" fontFamily="Inter, sans-serif" fontSize="15" fill={CREAM} opacity="0.9">System</text>
    </g>
  );
}

/** Pie chart dominated by one oversized customer slice. */
function SceneConcentration() {
  return (
    <g>
      <path
        d="M400 225 L400 95 A130 130 0 1 1 275 260 Z"
        fill={GOLD}
        stroke="#3B2D05"
        strokeWidth="2"
      />
      <path d="M400 225 L275 260 A130 130 0 0 1 310 130 Z" fill={CREAM} opacity="0.75" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
      <path d="M400 225 L310 130 A130 130 0 0 1 400 95 Z" fill={CREAM} opacity="0.5" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
      <text x="470" y="220" textAnchor="middle" fontFamily="Georgia, serif" fontSize="34" fill="#3B2D05" fontWeight="bold">
        75%
      </text>
      <text x="470" y="248" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="14" fill="#3B2D05">
        one customer
      </text>
      <g transform="translate(580, 140)">
        <path d="M0 -34 L30 22 L-30 22 Z" fill="#C0392B" stroke={CREAM} strokeWidth="3" strokeLinejoin="round" />
        <text x="0" y="14" textAnchor="middle" fontFamily="Georgia, serif" fontSize="30" fill={CREAM} fontWeight="bold">!</text>
      </g>
    </g>
  );
}

/** 56 cohort dots in a grid with a rising trend line. */
function SceneCohort() {
  const dots: React.ReactNode[] = [];
  let n = 0;
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 8; col++) {
      n++;
      const gold = n % 9 === 0 || n % 4 === 0;
      dots.push(
        <circle
          key={n}
          cx={210 + col * 42}
          cy={120 + row * 36}
          r="11"
          fill={gold ? GOLD : CREAM}
          opacity={gold ? 1 : 0.45}
        />,
      );
    }
  }
  return (
    <g>
      {dots}
      <path
        d="M190 380 C300 370, 420 330, 620 250"
        stroke={GOLD}
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M620 250 l-26 2 14 22 Z" fill={GOLD} />
      <text x="610" y="120" fontFamily="Georgia, serif" fontSize="46" fill={CREAM} fontWeight="bold">
        56
      </text>
      <text x="610" y="146" fontFamily="Inter, sans-serif" fontSize="15" fill={CREAM} opacity="0.8">
        founders
      </text>
    </g>
  );
}

/** Three ascending steps: clarity, structure, capability. */
function SceneClarity() {
  return (
    <g>
      <rect x="200" y="300" width="130" height="70" rx="8" fill={CREAM} opacity="0.55" />
      <rect x="340" y="250" width="130" height="120" rx="8" fill={CREAM} opacity="0.8" />
      <rect x="480" y="190" width="130" height="180" rx="8" fill={GOLD} />
      <text x="265" y="342" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="15" fill="#1F2937" fontWeight="600">
        Clarity
      </text>
      <text x="405" y="318" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="15" fill="#1F2937" fontWeight="600">
        Structure
      </text>
      <text x="545" y="288" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="15" fill="#3B2D05" fontWeight="600">
        Capability
      </text>
      <path
        d="M230 280 C330 240, 430 190, 540 150"
        stroke={CREAM}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="2 10"
      />
      <path d="M548 146 l-24 -2 8 24 Z" fill={CREAM} />
      <circle cx="620" cy="110" r="26" fill={GOLD} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1={620 + 36 * Math.cos((deg * Math.PI) / 180)}
          y1={110 + 36 * Math.sin((deg * Math.PI) / 180)}
          x2={620 + 48 * Math.cos((deg * Math.PI) / 180)}
          y2={110 + 48 * Math.sin((deg * Math.PI) / 180)}
          stroke={GOLD}
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}
    </g>
  );
}
