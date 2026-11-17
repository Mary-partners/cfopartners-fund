import Link from "next/link";
import { SmartLink } from "@/components/site/SmartLink";
import { ArrowRight } from "lucide-react";
import type { EnquiryKind } from "@/lib/content/types";

/** Closing call to action that opens the matching enquiry form on /contact. */
export function CtaBand({
  kind,
  label,
  title,
  text,
  secondary,
}: {
  kind: EnquiryKind;
  label: string;
  title: string;
  text: string;
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="bg-ink py-[72px] text-white">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-[640px]">
          <h2 className="mb-3 text-white">{title}</h2>
          <p className="m-0 text-[1.05rem] leading-7 text-slate-300">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/contact?enquiry=${kind}#enquiry`}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[0.95rem] font-semibold text-ink transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            {label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          {secondary && (
            <SmartLink
              href={secondary.href}
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-white/50 px-6 py-3.5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-white hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {secondary.label}
            </SmartLink>
          )}
        </div>
      </div>
    </section>
  );
}
