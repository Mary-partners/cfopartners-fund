import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckupTrigger } from "@/components/CheckupTrigger";
import { BlogCover } from "@/components/BlogCover";
import { POSTS, postFor, allPostSlugs, type BlockType } from "@/lib/blog";

export function generateStaticParams() {
  return allPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = postFor(params.slug);
  if (!post) return { title: "Post not found | CFO Partners" };
  return {
    title: `${post.title} | CFO Partners`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = postFor(params.slug);
  if (!post) notFound();
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-bg">
      <Nav />

      {/* HEADER */}
      <header className="bg-bg-alt pt-[40px] pb-[60px]">
        <div className="mx-auto max-w-[820px] px-6">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-1.5 text-[0.85rem] text-ink-3 hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to journal
          </Link>
          <div className="mb-3 flex flex-wrap items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-accent-2">
            <span>{post.category}</span>
            <span className="text-ink-3">·</span>
            <span className="text-ink-3">{post.readTime}</span>
          </div>
          <h1 className="mb-5 text-[clamp(1.9rem,4vw,2.8rem)] leading-[1.15]">
            {post.title}
          </h1>
          <p className="mb-5 text-[1.15rem] text-ink-2">{post.excerpt}</p>
          <div className="text-[0.9rem] text-ink-3">
            {post.author} ·{" "}
            {new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>
      </header>

      {/* COVER */}
      <section className="py-10">
        <div className="mx-auto max-w-[1080px] px-6">
          <BlogCover post={post} size="hero" className="aspect-[16/8]" />
        </div>
      </section>

      {/* BODY */}
      <article className="py-[40px]">
        <div className="mx-auto max-w-[720px] px-6">
          <div className="prose-body">
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="bg-bg-alt py-[60px]">
        <div className="mx-auto max-w-[820px] px-6 text-center">
          <h2 className="mb-4">Want to know where your business stands?</h2>
          <p className="mx-auto mb-6 max-w-[560px] text-ink-2">
            The Business Growth Check-Up takes about 10 minutes. You get your
            archetype, six-pillar scorecard, and a recommended next step.
          </p>
          <CheckupTrigger variant="primary" className="px-7 py-4 text-base">
            Take the free diagnostic
            <ArrowRight className="h-4 w-4" />
          </CheckupTrigger>
        </div>
      </section>

      {/* RELATED */}
      <section className="py-[60px]">
        <div className="mx-auto max-w-[1180px] px-6">
          <h2 className="mb-8 text-[1.5rem]">More from the journal</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group block"
              >
                <Card className="flex h-full flex-col overflow-hidden p-0 transition-all group-hover:-translate-y-0.5 group-hover:shadow-card">
                  <BlogCover post={p} className="aspect-[16/10]" />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.06em] text-accent-2">
                      {p.category}
                    </div>
                    <h3 className="m-0 text-[1rem] leading-tight">{p.title}</h3>
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

function Block({ block }: { block: BlockType }) {
  switch (block.type) {
    case "p":
      return <p className="mb-5 text-[1.05rem] leading-[1.7] text-ink-2">{block.text}</p>;
    case "h2":
      return (
        <h2 className="mb-4 mt-8 font-serif text-[1.6rem] leading-tight">
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 className="mb-3 mt-6 text-[1.2rem]">{block.text}</h3>;
    case "quote":
      return (
        <blockquote className="my-7 border-l-[3px] border-accent bg-bg-alt p-6">
          <p className="m-0 font-serif text-[1.3rem] leading-[1.4] text-ink">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.attribution && (
            <footer className="mt-3 text-[0.85rem] text-ink-3">
              {block.attribution}
            </footer>
          )}
        </blockquote>
      );
    case "list":
      return (
        <ul className="my-5 ml-6 list-disc space-y-2 text-[1.05rem] leading-[1.7] text-ink-2 marker:text-accent">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "stat":
      return (
        <div className="my-6 rounded-2xl border-l-4 border-accent bg-gold-soft p-6">
          <div className="font-serif text-[3rem] font-semibold leading-none text-accent-2">
            {block.num}
          </div>
          <div className="mt-2 text-[0.95rem] font-medium text-ink-2">
            {block.label}
          </div>
        </div>
      );
  }
}
