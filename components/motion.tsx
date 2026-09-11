"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
gsap.registerPlugin(useGSAP, ScrollTrigger);
export default function Motion() {
  const path = usePathname();
  useGSAP(
    () => {
      if (path !== "/" || !document.querySelector(".hero")) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils
          .toArray<HTMLElement>(".featured-work .project-art img")
          .forEach((image) => {
            gsap.fromTo(
              image,
              { yPercent: -3, scale: 1.08 },
              {
                yPercent: 3,
                scale: 1.08,
                ease: "none",
                scrollTrigger: {
                  trigger: image.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              },
            );
          });
      });
      return () => mm.revert();
    },
    { dependencies: [path], revertOnUpdate: true },
  );
  return null;
}
