import type { Metadata } from "next";
import { OfferPage } from "@/components/site/OfferPage";
import { PORTFOLIO_FINANCE_SYSTEM } from "@/lib/content/offers";

export const metadata: Metadata = {
  title: PORTFOLIO_FINANCE_SYSTEM.seo.title,
  description: PORTFOLIO_FINANCE_SYSTEM.seo.description,
  alternates: { canonical: "/portfolio-finance-system" },
  openGraph: { title: PORTFOLIO_FINANCE_SYSTEM.seo.title, description: PORTFOLIO_FINANCE_SYSTEM.seo.description, url: "/portfolio-finance-system" },
};

export default function Page() {
  return <OfferPage o={PORTFOLIO_FINANCE_SYSTEM} />;
}
