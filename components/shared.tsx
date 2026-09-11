import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/content";
import ProjectHover from "./project-hover";
export function CTA() {
  return (
    <section className="closing section">
      <span className="eyebrow">Good things begin with a conversation</span>
      <div>
        <h2>
          READY FOR
          <br />
          WHAT’S NEXT?
        </h2>
        <div className="closing-copy">
          <p>
            Tell us where you want to go. Let’s build the brand that gets you
            there.
          </p>
          <Link className="button dark-button" href="/contact">
            Start a project <span>↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
export function ProjectArt({
  project: p,
  variant = false,
}: {
  project: Project;
  variant?: boolean;
}) {
  return (
    <div
      className={`project-art ${p.image ? "photo-art" : "type-art"} ${variant ? "art-variant" : ""}`}
      style={{ background: p.color, color: p.ink }}
    >
      {p.image ? (
        <Image
          src={p.image}
          alt={`${p.brand} concept campaign: ${p.description}`}
          fill
          sizes="(max-width: 700px) 100vw, 90vw"
        />
      ) : (
        <>
          <span className="art-brand">{p.brand}</span>
          <strong>
            {p.phrase.split("\n").map((s, i) => (
              <span key={i}>
                {s}
                <br />
              </span>
            ))}
          </strong>
          <span className="eyebrow">{p.industry} / Brand concept</span>
        </>
      )}
      <span className="concept-label">Concept Work</span>
    </div>
  );
}
export function ProjectCard({
  project: p,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <article className="project-card">
      <ProjectHover
        href={`/case-studies/${p.slug}`}
        label={`View ${p.brand} case study`}
      >
        <ProjectArt project={p} />
        <span className="image-arrow" aria-hidden="true">
          ↗
        </span>
      </ProjectHover>
      <div className="project-caption">
        <div>
          <span className="eyebrow">
            0{index + 1} / {p.industry}
          </span>
          <h3>
            {p.brand} <span>— {p.title}</span>
          </h3>
          <p>{p.description}</p>
        </div>
        <div className="project-meta">
          <span>{p.tags.join(" / ")}</span>
          <Link className="text-link" href={`/case-studies/${p.slug}`}>
            View case study ↗
          </Link>
        </div>
      </div>
    </article>
  );
}
