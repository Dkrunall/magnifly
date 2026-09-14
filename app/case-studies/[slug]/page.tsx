
import UiIcon from "@/components/ui-icon";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";
import { ProjectArt } from "@/components/shared";
import CaseChapters from "@/components/case-chapters";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return {
    title: p ? `${p.brand} — ${p.title}` : "Project not found",
    description: p?.description,
    openGraph: {
      title: p ? `${p.brand} — ${p.title}` : "Project not found",
      description: p?.description,
      images: p?.image ? [{ url: p.image, alt: p.description }] : [],
    },
    twitter: {
      card: p?.image ? "summary_large_image" : "summary",
      title: p ? `${p.brand} — ${p.title}` : "Project not found",
      description: p?.description,
      images: p?.image ? [p.image] : [],
    },
  };
}
export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const p = projects[index],
    next = projects[(index + 1) % projects.length];
  return (
    <main>
      <section className="section case-heading">
        <Link href="/brands" className="eyebrow">
          <UiIcon name="left" /> Back to selected work
        </Link>
        <div className="case-title">
          <h1>{p.brand}</h1>
          <p>{p.title}</p>
        </div>
        <div className="case-disclaimer">
          Concept Work — Fictional brand. This is an independent creative
          exploration, not a client commission.
        </div>
      </section>
      <div className="case-hero">
        <ProjectArt project={p} />
      </div>
      <CaseChapters />
      <section className="section paper case-chapter" id="case-overview">
        <div className="case-facts">
          <div>
            <span>Industry</span>
            <p>{p.industry}</p>
          </div>
          <div>
            <span>Scope</span>
            <p>Concept strategy & creative system</p>
          </div>
          <div>
            <span>Services</span>
            <p>{p.tags.join(", ")}</p>
          </div>
          <div>
            <span>Timeline</span>
            <p>{p.timeline}</p>
          </div>
        </div>
        <div className="case-overview">
          <span className="eyebrow">01 / The overview</span>
          <h2>{p.description}</h2>
        </div>
        <div className="case-narrative">
          <article>
            <span className="eyebrow">02 / The challenge</span>
            <h3>A problem worth solving.</h3>
            <p>{p.challenge}</p>
          </article>
          <article>
            <span className="eyebrow">03 / Audience insight</span>
            <h3>Start with people.</h3>
            <p>{p.insight}</p>
          </article>
        </div>
      </section>
      <section className="section strategy case-chapter" id="case-strategy">
        <span className="eyebrow">04 / The strategy</span>
        <h2>{p.title}</h2>
        <p>{p.strategy}</p>
      </section>
      <section className="campaign-gallery">
        <ProjectArt project={p} variant />
        <div
          className="campaign-poster"
          style={{ background: p.color, color: p.ink }}
        >
          <span className="eyebrow">{p.brand} / Campaign language</span>
          <h2>
            {p.phrase.split("\n").map((s, i) => (
              <span key={i}>
                {s}
                <br />
              </span>
            ))}
          </h2>
          <span className="eyebrow">Concept Work / Editorial application</span>
        </div>
      </section>
      <section className="section paper case-narrative case-chapter" id="case-execution">
        <article>
          <span className="eyebrow">05 / Creative execution</span>
          <h3>One idea. Every touchpoint.</h3>
          <p>{p.execution}</p>
        </article>
        <article>
          <span className="eyebrow">06 / Intended success measures</span>
          <h3>What we would learn.</h3>
          <p>
            This concept has not been launched. There are no verified campaign
            results. A live rollout would evaluate:
          </p>
          <ul>
            {p.measures.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </article>
      </section>
      <section className="section social-execution case-chapter" id="case-social">
        <span className="eyebrow">07 / Social execution — concept layouts</span>
        <h2>
          A story made
          <br />
          for the feed.
        </h2>
        <div className="social-mockups">
          <article className="social-mockup">
            <header>
              <span
                className="social-avatar"
                style={{ background: p.color, color: p.ink }}
              >
                {p.brand[0]}
              </span>
              <strong>{p.brand}</strong>
            </header>
            <ProjectArt project={p} />
            <p>{p.title} Discover a new point of view.</p>
          </article>
          <article className="social-mockup">
            <header>
              <span
                className="social-avatar"
                style={{ background: p.color, color: p.ink }}
              >
                {p.brand[0]}
              </span>
              <strong>{p.brand}</strong>
            </header>
            <div
              className="social-type"
              style={{ background: p.color, color: p.ink }}
            >
              <span className="eyebrow">{p.brand} / A point of view</span>
              <strong>
                {p.phrase.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </strong>
              <span className="eyebrow">A little different. Entirely you.</span>
            </div>
            <p>{p.description}</p>
          </article>
          <article className="social-mockup">
            <header>
              <span
                className="social-avatar"
                style={{ background: p.ink, color: p.color }}
              >
                {p.brand[0]}
              </span>
              <strong>{p.brand}</strong>
            </header>
            <div
              className="social-type"
              style={{ background: p.ink, color: p.color }}
            >
              <span className="eyebrow">Introducing</span>
              <strong>
                {p.brand}
                <br />A fresh
                <br />
                perspective.
              </strong>
              <span className="eyebrow">The next chapter starts here <UiIcon name="arrow" /></span>
            </div>
            <p>
              Meet {p.brand}. A concept exploring a different direction for{" "}
              {p.industry.toLowerCase()}.
            </p>
          </article>
        </div>
      </section>
      <Link
        href={`/case-studies/${next.slug}`}
        className="next-project section next-project-preview"
      >
        <span className="eyebrow">Next concept / {next.industry}</span>
        <h2>
          {next.brand} <span><UiIcon name="arrow" /></span>
        </h2>
        <div className="next-project-art" aria-hidden="true"><ProjectArt project={next} /></div>
        <span className="next-project-description">{next.title}</span>
      </Link>
    </main>
  );
}
