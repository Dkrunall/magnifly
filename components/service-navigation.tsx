"use client";
import { useEffect, useState } from "react";
import { services } from "@/lib/content";

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
    {services.map((service, index) => <a key={service.name} href={`#service-${index + 1}`} aria-current={active === index ? "location" : undefined} onClick={() => setActive(index)}><span>0{index + 1}</span>{service.name}</a>)}
  </nav>;
}
