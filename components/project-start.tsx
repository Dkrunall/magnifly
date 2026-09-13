"use client";
import { useState } from "react";
import Link from "next/link";

const directions = [
  { label: "Build my brand", service: "Brand Strategy", detail: "Find your position. Build an identity people remember." },
  { label: "Create a campaign", service: "Content Production", detail: "Turn your next big idea into work people feel." },
  { label: "Grow my presence", service: "Social Media Management", detail: "Give your audience a reason to keep coming back." },
];
export default function ProjectStart() {
  const [selected, setSelected] = useState(0);
  const direction = directions[selected];
  return <div className="project-start">
    <span className="eyebrow">01 / CHOOSE YOUR NEXT MOVE</span>
    <div className="project-direction-options" role="group" aria-label="What would you like to do?">
      {directions.map((item, index) => <button type="button" key={item.label} aria-pressed={selected === index} onClick={() => setSelected(index)}><span>{item.label}</span><span aria-hidden="true">{selected === index ? "↗" : "+"}</span></button>)}
    </div>
    <p className="project-direction-detail" aria-live="polite">{direction.detail}</p>
    <Link className="button dark-button" href={`/contact?service=${encodeURIComponent(direction.service)}`}>Let’s talk about it <span>↗</span></Link>
    <Link className="direction-unsure" href="/contact">Still figuring it out? Start here ↗</Link>
  </div>;
}
