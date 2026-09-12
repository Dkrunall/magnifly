"use client";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function PageFlight() {
  const pathname = usePathname();
  useGSAP(() => {
    if (pathname !== "/") return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const stage = document.querySelector<HTMLElement>(".plane-stage");
      const heroPlane = document.querySelector<HTMLElement>(".plane-flight");
      const craft = document.querySelector<HTMLElement>(".page-flight-craft");
      const svg = document.querySelector<SVGSVGElement>(".page-flight-trail");
      const route = svg?.querySelector("path");
      const footer = document.querySelector<HTMLElement>(".footer");
      if (!stage || !heroPlane || !craft || !svg || !route || !footer) return;
      let startY = 0, endY = 0, length = 0, width = 0, stageWidth = 0, stageHeight = 0;
      const state = { progress: 0 };
      const draw = () => {
        const targetY = startY + (endY - startY) * state.progress;
        // Monotonic vertical curves keep the plane in view even on very long pages.
        let low = 0, high = length;
        for (let i = 0; i < 18; i++) {
          const middle = (low + high) / 2;
          if (route.getPointAtLength(middle).y < targetY) low = middle;
          else high = middle;
        }
        const distance = (low + high) / 2;
        const point = route.getPointAtLength(distance);
        const ahead = route.getPointAtLength(Math.min(length, distance + 2));
        const behind = route.getPointAtLength(Math.max(0, distance - 2));
        const takeoff = Math.min(1, window.scrollY / 260);
        const blend = Math.min(1, window.scrollY / 70);
        const angle = (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180 / Math.PI + 30) * takeoff;
        const size = 1 + ((width < 700 ? 82 : 125) / stageWidth - 1) * takeoff;
        craft.style.transform = `translate3d(${point.x - stageWidth / 2}px, ${point.y - window.scrollY - stageHeight / 2}px, 0) rotate(${angle}deg) scale(${size})`;
        craft.style.opacity = String(blend);
        heroPlane.style.opacity = String(1 - blend);
        route.style.strokeDashoffset = String(length - distance);
      };
      const measure = () => {
        width = document.documentElement.clientWidth;
        svg.style.height = "0px";
        const totalHeight = document.documentElement.scrollHeight;
        const a = stage.getBoundingClientRect();
        stageWidth = a.width; stageHeight = a.height;
        startY = a.top + window.scrollY + a.height / 2;
        craft.style.width = `${stageWidth}px`;
        craft.style.height = `${stageHeight}px`;
        svg.setAttribute("viewBox", `0 0 ${width} ${totalHeight}`);
        svg.style.height = `${totalHeight}px`;
        const points = [{ x: a.left + a.width / 2, y: startY }];
        const stops: [string, number, number][] = [
          [".immersive-hero", .9, .92], ["#studio", .2, .48],
          [".featured-work", .88, .08],
          [".featured-grid .project-card:nth-child(1)", .09, .65],
          [".featured-grid .project-card:nth-child(2)", .91, .65],
          [".featured-grid .project-card:nth-child(3)", .09, .72],
          [".services-section", .91, .5], [".process", .1, .55],
          [".closing", .87, .75],
        ];
        for (const [selector, horizontal, vertical] of stops) {
          const element = document.querySelector(selector);
          if (!element) continue;
          const rect = element.getBoundingClientRect();
          const point = { x: width * horizontal, y: rect.top + window.scrollY + rect.height * vertical };
          if (point.y > points[points.length - 1].y + 30) points.push(point);
        }
        const foot = footer.getBoundingClientRect();
        endY = foot.top + window.scrollY + Math.min(foot.height * .45, 65);
        points.push({ x: width * (width < 700 ? .83 : .68), y: endY });
        let d = `M${points[0].x} ${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
          const from = points[i - 1], to = points[i], bend = (to.y - from.y) * .52;
          d += ` C${from.x} ${from.y + bend} ${to.x} ${to.y - bend} ${to.x} ${to.y}`;
        }
        route.setAttribute("d", d);
        length = route.getTotalLength();
        route.style.strokeDasharray = String(length);
        draw();
      };
      document.body.classList.add("has-page-flight");
      measure();
      gsap.to(state, { progress: 1, ease: "none", onUpdate: draw,
        scrollTrigger: { start: 0, end: "max", scrub: .25, invalidateOnRefresh: true, onRefreshInit: measure },
      });
      const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => {
        cancelAnimationFrame(frame);
        document.body.classList.remove("has-page-flight");
        heroPlane.style.removeProperty("opacity");
        craft.style.opacity = "0";
      };
    });
    return () => mm.revert();
  }, { dependencies: [pathname], revertOnUpdate: true });
  if (pathname !== "/") return null;
  return <div className="page-flight-layer" aria-hidden="true">
    <svg className="page-flight-trail"><path fill="none" /></svg>
    <div className="page-flight-craft"><svg viewBox="0 0 600 440">
      <polygon points="48,240 550,76 215,278" fill="#f5f3ee" />
      <polygon points="215,278 550,76 277,373" fill="#747967" />
      <polygon points="277,373 550,76 318,266" fill="#c2c6b5" />
      <polygon points="318,266 550,76 477,326" fill="#f5f3ee" />
      <path d="M437 290L469 305" stroke="#d6ff3f" strokeWidth="9" />
    </svg></div>
  </div>;
}
