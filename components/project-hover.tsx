"use client";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
export default function ProjectHover({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  const root = useRef<HTMLAnchorElement>(null);
  return (
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
      <span className="project-cursor" aria-hidden="true">
        View
        <br />
        project ↗
      </span>
    </Link>
  );
}
