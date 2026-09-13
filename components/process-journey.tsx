"use client";
import UiIcon from "@/components/ui-icon";

import { useEffect, useRef, useState } from "react";
import { stages } from "@/lib/content";

export default function ProcessJourney() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const container = root.current;
      if (!container) return;
      const bounds = container.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > innerHeight) return;
      const cards = Array.from(container.querySelectorAll<HTMLElement>(".journey-stage"));
      let nearest = 0, distance = Infinity;
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const next = Math.abs(rect.top + rect.height / 2 - innerHeight * .5);
        if (next < distance) { nearest = index; distance = next; }
      });
      setActive(nearest);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return <div className="process-journey" ref={root}>
    <aside className="journey-map">
      <span className="eyebrow">THE FLIGHT PLAN</span>
      <div className="journey-counter" aria-hidden="true">0{active + 1}<span> / 04</span></div>
      <div className="journey-progress" aria-hidden="true"><span style={{ transform: `scaleX(${(active + 1) / stages.length})` }} /></div>
      <nav aria-label="Process stages">
        {stages.map((stage, index) => <a key={stage.name} href={`#process-step-${index}`} aria-current={active === index ? "step" : undefined} onClick={() => setActive(index)}><span>0{index + 1}</span>{stage.name}<span aria-hidden="true"><UiIcon name="arrow" /></span></a>)}
      </nav>
      <p>One clear direction.<br />From the first question to launch.</p>
    </aside>
    <ol className="journey-stages">
      {stages.map((stage, index) => <li className="journey-stage" id={`process-step-${index}`} key={stage.name} data-active={active === index}>
        <button className="journey-stage-heading" onClick={() => setActive(index)} aria-expanded={active === index} aria-controls={`process-output-${index}`}><span className="eyebrow">0{index + 1} /</span><h3>{stage.name}</h3><span aria-hidden="true">{active === index ? <><UiIcon name="minus" /></> : <><UiIcon name="plus" /></>}</span></button>
        <p>{stage.text}</p>
        <div id={`process-output-${index}`} className="journey-output" hidden={active !== index}><span className="eyebrow">WHAT YOU WALK AWAY WITH</span><p>{stage.output}</p><span className="journey-check" aria-hidden="true"><UiIcon name="arrow" /></span></div>
      </li>)}
    </ol>
  </div>;
}
