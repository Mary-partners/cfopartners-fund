import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { DiagnosticForm } from "@/components/DiagnosticForm";

export const metadata: Metadata = {
  title: "The Founder Diagnostic | CFO Partners",
  description:
    "40 questions, 15 minutes, instant results: where your business stands, what kind of capital actually fits it, and what to do next.",
};

export default function DiagnosticPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-[720px] px-6 py-16 sm:py-24">
        <div className="mb-10 text-center">
          <h1 className="font-serif text-[2.2rem] leading-tight sm:text-[2.6rem]">The Founder Diagnostic</h1>
          <p className="mx-auto mt-3 max-w-[520px] text-[1rem] text-ink-2">
            Forty questions about your business and how you're doing as a founder. Honest answers, no wrong ones.
            Your results — where you stand, and what capital actually fits — are ready the moment you finish.
          </p>
        </div>
        <DiagnosticForm />
      </main>
      <Footer />
    </>
  );
}
