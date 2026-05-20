import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

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
  title:
    "CFO Partners — AI-powered executive support for African businesses",
  description:
    "Your business needs more than advice — it needs an executive system. CFO Partners gives African founders AI-powered executive assistants, practical business tools, diagnostics, and expert support in one platform. Start with the free Business Growth Check-Up.",
  openGraph: {
    title: "CFO Partners — Executive support for African businesses",
    description:
      "Seven Executive Rooms. AI assistants for CFO, COO, CMO, CRO, Board and more. Free Business Growth Check-Up in 10 minutes.",
    url: "https://www.cfopartners.fund",
    siteName: "CFO Partners",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CFO Partners — Executive support for African businesses",
    description:
      "Seven Executive Rooms. AI assistants for CFO, COO, CMO, CRO, Board and more. Free Business Growth Check-Up in 10 minutes.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
