"use client";
import { useEffect, useState } from "react";
import { serviceGroups } from "@/lib/content";

export default function ServiceNavigation() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting);
      if (visible.length) setActive(Number(visible[0].target.id.replace("service-", "")) - 1);
    }, { rootMargin: "-20% 0px -55% 0px", threshold: 0 });
    document.querySelectorAll(".service-detail").forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return <nav className="service-route-nav" aria-label="Explore services">
    {serviceGroups.map((group, index) => <a key={group.name} href={`#service-${group.start + 1}`} aria-current={active >= group.start && active < group.end ? "location" : undefined} onClick={() => setActive(group.start)}><span>0{index + 1}</span>{group.name}</a>)}
  </nav>;
}
