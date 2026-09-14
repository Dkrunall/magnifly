"use client";
import UiIcon from "@/components/ui-icon";

import Link from "next/link";
import { useId, useRef, useState, type ReactNode } from "react";
export default function ProjectHover({
  href,
  label,
  children,
  preview,
}: {
  href: string;
  label: string;
  children: ReactNode;
  preview?: ReactNode;
}) {
  const root = useRef<HTMLAnchorElement>(null);
  const previewId = useId();
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const revealed = expanded || (hovered && !dismissed);
  return (
    <div className="project-experience" data-expanded={revealed}
      onKeyDown={event => { if (event.key === "Escape" && revealed) { event.stopPropagation(); setExpanded(false); setDismissed(true); } }}
      onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }}
      onPointerLeave={() => { setHovered(false); setDismissed(false); }}>
    <Link
      ref={root}
      href={href}
      aria-label={label}
      className="project-image-link"
      onPointerMove={(e) => {
        if (
          e.pointerType !== "mouse" ||
          matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          return;
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.dataset.tracking = "true";
        e.currentTarget.style.setProperty(
          "--cursor-x",
          `${e.clientX - r.left}px`,
        );
        e.currentTarget.style.setProperty(
          "--cursor-y",
          `${e.clientY - r.top}px`,
        );
      }}
      onPointerLeave={() => {
        if (root.current) root.current.dataset.tracking = "false";
      }}
    >
      {children}
      {preview && <div id={previewId} className="project-reveal" aria-hidden={!revealed} inert={!revealed}>{preview}</div>}
      <span className="project-cursor" aria-hidden="true">
        View
        <br />
        project <UiIcon name="arrow" />
      </span>
    </Link>
    {preview && <button type="button" className="project-preview-toggle" aria-controls={previewId} aria-expanded={revealed} onClick={() => { setExpanded(!revealed); setDismissed(revealed); }}>{revealed ? <>Close preview <UiIcon name="minus" /></> : <>Inside the concept <UiIcon name="plus" /></>}</button>}
    </div>
  );
}
