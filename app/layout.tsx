import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd } from "@/components/site/JsonLd";
import { founderSchema, graph, organizationSchema } from "@/lib/schema";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cfopartners.fund"),
  title: {
    default:
      "CFO Innovation Partners | Financial Leadership & Investment Readiness",
    template: "%s",
  },
  description:
    "The finance partner for African investment portfolios and growing businesses: embedded CFO support, investment readiness and portfolio financial management, from Nairobi.",
  // Title and description are left out of openGraph/twitter here so each
  // page's own title and description are used for link previews instead of
  // the homepage's.
  openGraph: {
    siteName: "CFO Innovation Partners",
    type: "website",
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to main content
        </a>
        <JsonLd data={graph(organizationSchema(), founderSchema())} />
        {children}
        <WhatsAppButton />
        {/* Vercel Web Analytics (cookieless page views). Enabled on the Vercel
            project; this script only reports on deployed sites. */}
        <Script id="vercel-analytics-queue" strategy="afterInteractive">
          {`window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };`}
        </Script>
        <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
