"use client";
import { useState } from "react";
import { projects } from "@/lib/content";
import { ProjectCard } from "./shared";
export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const visible = projects.filter(
    (p) => filter === "All" || p.tags.includes(filter),
  );
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
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ),
        )}
      </div>
      <p className="eyebrow result-count" aria-live="polite">
        {visible.length} projects / {filter}
      </p>
      <div className="portfolio-grid">
        {visible.map((p) => (
          <ProjectCard key={p.slug} project={p} index={projects.indexOf(p)} />
        ))}
      </div>
    </>
  );
}
