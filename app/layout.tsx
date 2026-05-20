import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { CheckupProvider } from "@/components/CheckupProvider";
import { CheckupModal } from "@/components/CheckupModal";

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
  title: "CFO Partners — The Virtual C-Suite for African Founders",
  description:
    "Human strategist. AI-powered platform. M-Pesa-native. KRA-fluent. CFO Partners installs the systems, financial visibility, and growth discipline African businesses need to scale — without taking on capital they're not ready for.",
  openGraph: {
    title: "CFO Partners — The Virtual C-Suite for African Founders",
    description:
      "Take the free Business Growth Check-Up. 10 minutes. 6 pillars. Get your archetype and tier match.",
    url: "https://www.cfopartners.fund",
    siteName: "CFO Partners",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CFO Partners — The Virtual C-Suite for African Founders",
    description:
      "Take the free Business Growth Check-Up. 10 minutes. 6 pillars. Get your archetype and tier match.",
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
        <CheckupProvider>
          {children}
          <CheckupModal />
        </CheckupProvider>
      </body>
    </html>
  );
}
