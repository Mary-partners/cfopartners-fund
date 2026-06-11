import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { BlogCover } from "@/components/BlogCover";
import { POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Journal | CFO Partners",
  description:
    "Diagnostic insights, cohort findings, and the operating beliefs behind the CFO Innovation Partners model. Published as we learn them.",
};

export default function BlogIndexPage() {
  const [featured, ...rest] = POSTS;
  return (
    <main className="min-h-screen bg-bg">
      <Nav />

      {/* HEADER */}
      <header className="border-b border-line bg-bg-alt py-[60px]">
        <div className="mx-auto max-w-[1180px] px-6">
          <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
            The CFOIP Journal
          </span>
          <h1 className="mb-4 max-w-[820px]">
            Diagnostic insights, cohort findings, and operating beliefs.
          </h1>
          <p className="m-0 max-w-[720px] text-[1.1rem] text-ink-2">
            What we are learning from running structured diagnostics with
            African founders, SMEs, and scale-ups. Published as we learn it.
          </p>
        </div>
      </header>

      {/* FEATURED POST */}
      <section className="py-[60px]">
        <div className="mx-auto max-w-[1180px] px-6">
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]"
          >
            <BlogCover
              post={featured}
              size="hero"
              className="aspect-[16/10] transition-transform group-hover:-translate-y-1"
            />
            <div>
              <div className="mb-3 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-accent-2">
                Featured · {featured.category} · {featured.readTime}
              </div>
              <h2 className="mb-4 text-[clamp(1.6rem,3vw,2.4rem)] leading-tight">
                {featured.title}
              </h2>
              <p className="mb-5 text-[1.05rem] text-ink-2">
                {featured.excerpt}
              </p>
              <div className="mb-5 text-[0.85rem] text-ink-3">
                {featured.author} ·{" "}
                {new Date(featured.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <span className="inline-flex items-center gap-1 text-[0.95rem] font-semibold text-accent-2 group-hover:text-accent">
                Read the post
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* GRID OF REMAINING POSTS */}
      <section className="bg-bg-alt py-[80px]">
        <div className="mx-auto max-w-[1180px] px-6">
          <h2 className="mb-10 text-[1.6rem]">More from the journal</h2>
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <Card className="flex h-full flex-col overflow-hidden p-0 transition-all group-hover:-translate-y-0.5 group-hover:shadow-card">
                  <BlogCover post={post} className="aspect-[16/10]" />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2 text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-accent-2">
                      {post.category} · {post.readTime}
                    </div>
                    <h3 className="mb-2 text-[1.05rem] leading-tight">
                      {post.title}
                    </h3>
                    <p className="m-0 text-[0.88rem] text-ink-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 text-[0.78rem] text-ink-3">
                      {new Date(post.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
