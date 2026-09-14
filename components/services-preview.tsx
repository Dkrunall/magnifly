"use client";
import UiIcon from "@/components/ui-icon";

import { useState } from "react";
import Link from "next/link";
import { services, projects, serviceGroups } from "@/lib/content";
import { ProjectArt } from "./shared";
import DevelopmentArt from "./development-art";
export default function ServicesPreview() {
  const [active, setActive] = useState(0);
  return (
    <div className="services-preview">
      <div className="service-aside" id="service-preview-panel" aria-live="polite">
        <div className="service-preview-art" key={active}>
          {projects[active] ? <ProjectArt project={projects[active]} /> : <DevelopmentArt app={active === 7} />}
          <div className="service-art-caption"><span>0{active + 1} / IN FOCUS</span><strong>{services[active].name}</strong></div>
        </div>
        <span className="eyebrow">A clear point of view</span>
        <h3>{services[active].short}</h3>
        <p>{services[active].approach}</p>
        <ul className="service-deliverable-chips">{services[active].deliverables.slice(0, 3).map(item => <li key={item}>{item}</li>)}</ul>
        <Link className="text-link" href={`/services#service-${active + 1}`}>
          Explore the service <UiIcon name="arrow" />
        </Link>
      </div>
      <div className="service-list">
        {serviceGroups.map(group => <div className="service-preview-group" key={group.name}>
          <h3 className="service-group-title">{group.name}</h3><p className="service-group-description">{group.description}</p>
        {services.slice(group.start, group.end).map((s, offset) => { const i = group.start + offset; return (
          <button
            type="button"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            aria-controls="service-preview-panel"
            key={s.name}
            className={active === i ? "active" : ""}
          >
            <span className="eyebrow">0{i + 1}</span>
            <div>
              <h3>{s.name}</h3>
              <p className="mobile-description">{s.short}</p>
            </div>
            <span aria-hidden="true"><UiIcon name="arrow" /></span>
          </button>
        ); })}</div>)}
      </div>
    </div>
  );
}
