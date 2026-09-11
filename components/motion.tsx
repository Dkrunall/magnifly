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
        gsap.fromTo(
          ".headline-line",
          { y: 45, clipPath: "inset(100% 0 0 0)" },
          {
            y: 0,
            clipPath: "inset(0% 0 0 0)",
            duration: 0.85,
            stagger: 0.09,
            ease: "power3.out",
            clearProps: "clipPath",
          },
        );
        gsap.fromTo(
          ".orbit-system",
          { rotation: -16, opacity: 0.1 },
          { rotation: 0, opacity: 0.8, duration: 1.3, ease: "power2.out" },
        );
        if (document.querySelector(".plane-flight"))
          gsap.to(".plane-flight", {
            y: -55,
            x: 35,
            rotation: -12,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
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
