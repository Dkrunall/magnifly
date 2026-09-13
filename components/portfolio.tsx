"use client";
import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/content";
import { ProjectArt } from "./shared";
import Link from "next/link";
export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const visible = projects.filter(
    (p) => filter === "All" || p.tags.includes(filter),
  );
  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [filter]);
  return (
    <>
      <div
        className="filters"
        role="group"
        aria-label="Filter projects by service"
      >
        {["All", "Branding", "Social Media", "Content", "Campaigns"].map(
          (f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              aria-controls="filtered-projects"
              onClick={() => setFilter(f)}
            >
              <span>{f}</span><span className="filter-total" aria-hidden="true">{projects.filter(project => f === "All" || project.tags.includes(f)).length}</span>
            </button>
          ),
        )}
      </div>
      <p className="eyebrow result-count" aria-live="polite">
        {visible.length} projects / {filter}
      </p>
      <div className="portfolio-grid animated-portfolio" id="filtered-projects" key={filter}>
        {visible.map((p, index) => (
          <article className="portfolio-entry brand-project" key={p.slug} style={{ animationDelay: `${index * 65}ms` }}>
            <Link className="brand-project-visual" href={`/case-studies/${p.slug}`} aria-label={`Explore ${p.brand} case study`}>
              <ProjectArt project={p} />
              <span className="brand-project-open" aria-hidden="true">Explore project <span>↗</span></span>
            </Link>
            <div className="brand-project-caption">
              <div className="brand-project-kicker"><span>0{projects.indexOf(p) + 1} / {p.industry}</span><span>{p.tags[0]}</span></div>
              <Link href={`/case-studies/${p.slug}`} className="brand-project-title"><h3>{p.brand}</h3><span aria-hidden="true">↗</span></Link>
              <p>{p.title}</p>
              <div className="brand-project-tags">{p.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
