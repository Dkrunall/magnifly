"use client";
import { useEffect, useState } from "react";
const chapters = [["case-overview", "Overview"], ["case-strategy", "Strategy"], ["case-execution", "Execution"], ["case-social", "Social"]];
export default function CaseChapters() {
  const [active, setActive] = useState("case-overview");
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-15% 0px -60% 0px" });
    chapters.forEach(([id]) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);
  return <nav className="case-chapters" aria-label="Project chapters">{chapters.map(([id, label], index) => <a key={id} href={`#${id}`} onClick={() => setActive(id)} aria-current={active === id ? "location" : undefined}><span>0{index + 1}</span>{label}</a>)}</nav>;
}
