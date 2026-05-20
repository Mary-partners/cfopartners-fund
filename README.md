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

## Editing common things

| Want to change | Where |
|---|---|
| Hero copy | `app/page.tsx` |
| Tier prices | `app/page.tsx` (Tiers section) |
| Check-Up questions | `lib/checkup-data.ts` |
| Archetype tiers / scoring bands | `lib/checkup-data.ts` |
| Brand colours | `tailwind.config.ts` |
| Fonts | `app/layout.tsx` |

## License

© CFO Innovation Partners. All rights reserved.
