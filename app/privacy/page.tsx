import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CONTACT_EMAIL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Privacy Notice | CFO Innovation Partners",
  description:
    "How CFO Innovation Partners collects, uses and protects personal data submitted through cfopartners.fund, in line with Kenya's Data Protection Act, 2019.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main" className="bg-white py-[64px]">
        <article className="mx-auto max-w-[760px] px-6 text-[1rem] leading-7 text-ink-2">
          <h1 className="mb-3 text-ink">Privacy notice</h1>
          <p className="mb-8 text-[0.9rem]">Last updated: November 2026</p>

          <h2 className="mb-3 mt-8 text-[1.4rem] text-ink">Who we are</h2>
          <p>
            CFO Innovation Partners (CFOIP) is an advisory firm registered in
            Kenya, based at Cove Court, Watermark Business Park, Nairobi. We are
            responsible for personal data collected through this website. Contact
            us at {CONTACT_EMAIL} with any question about your data.
          </p>

          <h2 className="mb-3 mt-8 text-[1.4rem] text-ink">What we collect</h2>
          <ul className="mb-4 list-disc pl-6">
            <li>Details you give us in an enquiry form: your name, organisation, email, phone number (optional), country and a description of what you need.</li>
            <li>Your email address if you sign up for our newsletter or download a resource.</li>
            <li>Your answers if you complete the Management Capability Assessment.</li>
            <li>Anonymous usage statistics, such as pages visited and the site that referred you. Our analytics does not use cookies or identify individual visitors.</li>
          </ul>

          <h2 className="mb-3 mt-8 text-[1.4rem] text-ink">How we use it</h2>
          <p>
            We use enquiry details to reply to you and to prepare for a
            conversation about working together. We use newsletter addresses to
            send the newsletter. We use diagnostic answers to prepare your
            results and recommendation. We use anonymous statistics to improve
            the website. We don&rsquo;t sell or share your data for marketing.
          </p>

          <h2 className="mb-3 mt-8 text-[1.4rem] text-ink">Who processes it for us</h2>
          <p>
            Our website is hosted by Vercel. Form submissions are delivered to us
            by email through a form or email delivery service. The Management
            Capability Assessment runs on the Management Capital Lab platform. These providers process data on our
            behalf and may store it outside Kenya, with safeguards as required by
            the Data Protection Act, 2019.
          </p>

          <h2 className="mb-3 mt-8 text-[1.4rem] text-ink">How long we keep it</h2>
          <p>
            We keep enquiry details for as long as needed to respond and, if we
            work together, for the duration of the engagement and any legal
            record-keeping period afterwards. You can unsubscribe from the
            newsletter at any time.
          </p>

          <h2 className="mb-3 mt-8 text-[1.4rem] text-ink">Your rights</h2>
          <p>
            Under Kenya&rsquo;s Data Protection Act, 2019, you can ask to see,
            correct or delete the personal data we hold about you, and object to
            how we use it. Email {CONTACT_EMAIL} and we&rsquo;ll respond within
            the time the law requires. You can also complain to the Office of the
            Data Protection Commissioner.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
