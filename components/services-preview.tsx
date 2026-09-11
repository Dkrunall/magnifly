"use client";
import { useState } from "react";
import Link from "next/link";
import { services, projects } from "@/lib/content";
import { ProjectArt } from "./shared";
export default function ServicesPreview() {
  const [active, setActive] = useState(0);
  return (
    <div className="services-preview">
      <div className="service-aside" aria-live="polite">
        <div className="service-preview-art" key={active}>
          <ProjectArt project={projects[active]} />
        </div>
        <span className="eyebrow">A clear point of view</span>
        <h3>{services[active].short}</h3>
        <p>{services[active].approach}</p>
        <Link className="text-link" href={`/services#service-${active + 1}`}>
          Explore the service ↗
        </Link>
      </div>
      <div className="service-list">
        {services.map((s, i) => (
          <Link
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            href={`/services#service-${i + 1}`}
            key={s.name}
            className={active === i ? "active" : ""}
          >
            <span className="eyebrow">0{i + 1}</span>
            <div>
              <h3>{s.name}</h3>
              <p className="mobile-description">{s.short}</p>
            </div>
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
