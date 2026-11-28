import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/content/types";

/**
 * Server-rendered FAQ list using native <details>, so answers are in the
 * HTML for readers, search engines and assistive technology.
 */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-line rounded-card border border-line bg-white">
      {faqs.map((f) => (
        <details key={f.q} className="group px-6 py-1">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-[1rem] font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2 [&::-webkit-details-marker]:hidden">
            <h3 className="m-0 font-sans text-[1rem] font-semibold leading-snug">{f.q}</h3>
            <ChevronDown
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 flex-none text-ink-2 transition-transform group-open:rotate-180 motion-reduce:transition-none"
            />
          </summary>
          <p className="mb-5 mt-0 max-w-[72ch] text-[0.95rem] leading-7 text-ink-2">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
