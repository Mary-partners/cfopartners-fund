import type { Metadata } from "next";
import { OfferPage } from "@/components/site/OfferPage";
import { NINETY_DAY_SYSTEM } from "@/lib/content/offers";

export const metadata: Metadata = {
  title: NINETY_DAY_SYSTEM.seo.title,
  description: NINETY_DAY_SYSTEM.seo.description,
  alternates: { canonical: "/90-day-financial-performance-system" },
  openGraph: { title: NINETY_DAY_SYSTEM.seo.title, description: NINETY_DAY_SYSTEM.seo.description, url: "/90-day-financial-performance-system" },
};

export default function Page() {
  return <OfferPage o={NINETY_DAY_SYSTEM} />;
}
