# CFO Partners — cfopartners.fund

The Virtual C-Suite for African Founders.

A Next.js 14 (App Router) site for [cfopartners.fund](https://www.cfopartners.fund), featuring the Business Growth Check-Up — a 30-question, 6-pillar founder diagnostic that maps every visitor to one of four archetypes and a matched engagement tier.

## Stack

- **Next.js 14** (App Router, React Server Components)
- **TypeScript** (strict mode)
- **Tailwind CSS** (custom brand tokens)
- **Vercel** (hosting, auto-deploy from main)

## Local development

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deployment

This repo auto-deploys to Vercel on every push to `main`.

- Production: https://www.cfopartners.fund
- Preview deploys: every branch and PR gets its own URL

## Lead capture

Check-Up submissions are POSTed to `/api/leads`. By default the endpoint logs to the Vercel function console — to capture leads permanently, add one of:

- `LEADS_WEBHOOK_URL` (env var) → forwards every submission to a webhook (Zapier, Make, Apps Script → Notion)
- Vercel Postgres / Supabase / Notion API integration in `app/api/leads/route.ts`

## Project structure

```
app/
├── layout.tsx         # root layout, fonts, metadata
├── page.tsx           # homepage (assembles all sections)
├── globals.css        # Tailwind directives + CSS variables
└── api/
    └── leads/
        └── route.ts   # POST endpoint for Check-Up submissions

components/
├── Nav.tsx            # sticky top nav (client — scroll-aware)
├── CheckupProvider.tsx # modal state context
├── CheckupTrigger.tsx  # button that opens the modal
└── CheckupModal.tsx    # full 30-question flow + scoring + results

lib/
└── checkup-data.ts    # questions, pillars, archetypes, tier mapping
```

## CFOIP OS (`/os`)

The practice's internal operating system — client portfolio, workflow
management, quality review — lives at `/os`, in this same app and
deployment (reachable from "Access your OS" in the main nav). It has its
own database (Supabase Postgres via Prisma) and auth (Supabase Auth),
scoped entirely under `app/os/`, `components/os/`, `lib/os/`, and
`prisma/`. See [`/docs`](./docs) for the full picture — start with
[`/docs/architecture.md`](./docs/architecture.md) and
[`/docs/setup.md`](./docs/setup.md) (connecting the Supabase project).

## Editing common things

All public copy is plain data. Change it in one file and the page, its
metadata and its structured data update together.

| Want to change | Where |
|---|---|
| Firm name, description, founding year, profiles | `lib/site.ts` |
| Founder figures (homepage, About) | `lib/impact.ts` (`FOUNDER_EXPERIENCE`) |
| Homepage sections | `app/page.tsx` |
| Service pages (10) | `lib/content/services-business.ts`, `lib/content/services-institutional.ts` |
| Audience pages (3) | `lib/content/audiences.ts` |
| About and Our Approach | `lib/content/pages.ts` |
| Insights articles | `lib/blog.ts` |
| Enquiry form fields | `lib/enquiry.ts` |
| Redirects from old URLs | `next.config.mjs` |
| Brand colours | `tailwind.config.ts` |

Writing rules for public copy are at the top of `lib/content/types.ts`: no
fees, no financing guarantees, and only approved, attributed figures.

Enquiries post to `/api/enquiry` and are emailed via `lib/notify.ts`. Set
`ENQUIRY_WEBHOOK_URL` to also forward them to a CRM or spreadsheet.

## License

© CFO Innovation Partners. All rights reserved.
