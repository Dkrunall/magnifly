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
      let destinations: { top: number; bottom: number; name: string }[] = [];
      const labels = craft.querySelector<SVGGElement>(".flight-wing-labels");
      const sectionLabel = craft.querySelector<SVGTextElement>(".flight-section-label");
      const draw = () => {
        // Lenis already smooths scrolling; use one clock for path and viewport.
        const scroll = window.scrollY;
        const progress = Math.min(1, Math.max(0, scroll / Math.max(1, ScrollTrigger.maxScroll(window))));
        const targetY = startY + (endY - startY) * progress;
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
        const raw = Math.min(1, scroll / 420);
        const takeoff = raw * raw * (3 - 2 * raw);
        const destination = destinations.find(item => targetY >= item.top && targetY < item.bottom);
        const landing = (destination ? Math.max(0, Math.min(1, (targetY - destination.top) / 120, (destination.bottom - targetY) / 120)) : 0) * takeoff;
        // Labels affect only their opacity: the craft stays on the route with
        // the same size and tangent heading through every section boundary.
        const approach = Math.max(0, Math.min(1, 1 - (endY - targetY) / 280));
        const touchdown = approach * approach * (3 - 2 * approach);
        const heading = (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180 / Math.PI + 30) * takeoff;
        const angle = heading * (1 - touchdown) + 210 * touchdown;
        const flightWidth = width < 700 ? Math.min(190, width * .48) : 300;
        const size = 1 + (flightWidth / stageWidth - 1) * takeoff;
        craft.style.transform = `translate3d(${point.x - stageWidth / 2}px, ${point.y - scroll - stageHeight / 2}px, 0) rotate(${angle}deg) scale(${size})`;
        // The same SVG owns the plane at rest and in flight. Crossfading a
        // stationary WebGL plane with this moving SVG leaves a ghost behind.
        craft.style.opacity = "1";
        route.style.strokeDashoffset = String(length - distance);
        if (labels) labels.style.opacity = String(Math.max(landing, touchdown));
        if (sectionLabel && destination && sectionLabel.textContent !== destination.name) sectionLabel.textContent = destination.name;
      };
      const measure = () => {
        width = document.documentElement.clientWidth;
        svg.style.height = "0px";
        const totalHeight = document.documentElement.scrollHeight;
        const a = stage.getBoundingClientRect();
        stageWidth = a.width; stageHeight = a.height;
        destinations = ([
          ["#studio", "The Studio"], [".featured-work", "Selected Work"],
          ["#brand-playground", "Explore More"], ["#redesign-preview", "New Perspective"], [".services-section", "Our Services"], [".process", "Our Process"],
          ["#campaign-builder", "Campaign Lab"], ["#reel-showcase", "Motion Ideas"], [".closing", "Let's Talk"], [".footer", "The Footer"],
        ] as const).flatMap(([selector, name]) => {
          const element = document.querySelector(selector);
          if (!element) return [];
          const rect = element.getBoundingClientRect();
          return [{ top: rect.top + window.scrollY, bottom: rect.bottom + window.scrollY, name }];
        });
        startY = a.top + window.scrollY + a.height / 2;
        craft.style.width = `${stageWidth}px`;
        craft.style.height = `${stageHeight}px`;
        svg.setAttribute("viewBox", `0 0 ${width} ${totalHeight}`);
        svg.style.height = `${totalHeight}px`;
        const points = [{ x: a.left + a.width / 2, y: startY }];
        // Keep the route itself inside the viewport, rather than moving the
        // plane away from it when a label appears.
        const routeMargin = Math.min(width / 2, (width < 700 ? Math.min(190, width * .48) : 300) / 2 + 16);
        const routeX = (fraction: number) => Math.max(routeMargin, Math.min(width - routeMargin, width * fraction));
        const stops: [string, number, number][] = [
          [".immersive-hero", .9, .92], ["#studio", .2, .48],
          [".featured-work", .88, .08],
          [".featured-grid .project-card:nth-child(1)", .09, .65],
          [".featured-grid .project-card:nth-child(2)", .91, .65],
          [".featured-grid .project-card:nth-child(3)", .09, .72],
          ["#brand-playground", .78, .25],
          ["#brand-playground", .22, .75],
          ["#redesign-preview", .18, .18],
          ["#redesign-preview", .82, .56],
          ["#redesign-preview", .18, .9],
          ["#campaign-builder", .82, .25], ["#campaign-builder", .18, .8],
          ["#reel-showcase", .82, .25], ["#reel-showcase", .18, .8],
          // Match Explore's two broad bends, continuing the same rhythm
          // across the boundary rather than turning again at section entry.
          [".services-section", .78, .25],
          [".services-section", .22, .75],
          [".process", .78, .25],
          [".process", .22, .75],
          [".closing", .87, .75],
        ];
        for (const [selector, horizontal, vertical] of stops) {
          const element = document.querySelector(selector);
          if (!element) continue;
          const rect = element.getBoundingClientRect();
          const point = { x: routeX(horizontal), y: rect.top + window.scrollY + rect.height * vertical };
          if (point.y > points[points.length - 1].y + 30) points.push(point);
        }
        const foot = footer.getBoundingClientRect();
        // Reserve a clear landing bay above the footer links.
        endY = foot.top + window.scrollY + 95;
        points.push({ x: routeX(.5), y: endY });
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
      ScrollTrigger.create({ start: 0, end: "max", onUpdate: draw, onRefreshInit: measure });
      let frame = requestAnimationFrame(() => ScrollTrigger.refresh());
      // The interactive previews can change height when switching views.
      // Re-measure their route without observing the SVG overlay itself.
      const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => ScrollTrigger.refresh());
      });
      const content = document.getElementById("content");
      if (content) resizeObserver.observe(content);
      return () => {
        resizeObserver.disconnect();
        cancelAnimationFrame(frame);
        document.body.classList.remove("has-page-flight");
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
      <g className="flight-wing-labels" fill="#24281d" stroke="none" fontFamily="Arial, sans-serif" fontWeight="700" opacity="0">
        <text x="177" y="229" fontSize="23" transform="rotate(-18 177 229)">You landed in</text>
        <text className="flight-section-label" x="348" y="266" fontSize="22" textLength="133" lengthAdjust="spacingAndGlyphs" transform="rotate(-36 348 266)">The Studio</text>
      </g>
    </svg></div>
  </div>;
}
