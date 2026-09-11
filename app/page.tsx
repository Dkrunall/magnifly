import Link from "next/link";
import Hero from "@/components/hero";
import ServicesPreview from "@/components/services-preview";
import { CTA, ProjectCard } from "@/components/shared";
import { projects, stages } from "@/lib/content";
export default function Home() {
  return (
    <main>
      <Hero />
      <div className="brand-strip">
        <span>MAGNIFLY MEDIA</span>
        <span>Strategy with purpose.</span>
        <span>Creative with direction.</span>
        <span>Ideas take flight. ↗</span>
      </div>
      <section id="studio" className="intro section">
        <span className="eyebrow">01 / The studio</span>
        <h2 className="studio-manifesto">
          Your brand has <span>potential.</span>
          <br />
          We give it <em>direction.</em>
          <span className="manifesto-arrow" aria-hidden="true">
            ↗
          </span>
        </h2>
        <p>
          Strategy sharpens the idea. Design makes it distinctive. Content
          brings it to life. We bring them together with thoughtful distribution
          to move your brand forward.
        </p>
        <Link className="text-link" href="/about">
          Meet MAGNIFLY MEDIA ↗
        </Link>
      </section>
      <section className="section featured-work">
        <div className="section-title">
          <span className="eyebrow">02 / Selected work</span>
          <h2>
            Made to
            <br />
            <em>stand out.</em>
          </h2>
          <Link className="text-link" href="/brands">
            All selected work ↗
          </Link>
        </div>
        <p className="concept-note">
          An exploration of what’s possible. All featured projects are fictional
          Concept Work.
        </p>
        <div className="featured-grid">
          {projects.slice(0, 3).map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>
      <section className="section services-section">
        <div className="section-title">
          <span className="eyebrow">03 / Our capabilities</span>
          <h2>
            Everything your brand
            <br />
            needs to move forward.
          </h2>
        </div>
        <ServicesPreview />
      </section>
      <section className="section paper process">
        <div className="section-title">
          <span className="eyebrow">
            04 / From first thought to full flight
          </span>
          <h2>
            Good ideas need
            <br />a clear way forward.
          </h2>
        </div>
        <ol className="process-grid">
          {stages.map((s, i) => (
            <li key={s.name}>
              <span className="process-point">0{i + 1}</span>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
              <div className="process-output">
                <span className="eyebrow">You receive</span>
                <p>{s.output}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <CTA />
    </main>
  );
}
