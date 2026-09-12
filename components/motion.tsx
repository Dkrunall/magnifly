"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Motion() {
  const pathname = usePathname();
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 901px)" }, (context) => {
      if (!context.conditions?.motion) return;
      const desktop = !!context.conditions.desktop;
      const lenis = new Lenis({
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
        anchors: false,
        stopInertiaOnNavigate: true,
        prevent: (node) => !!node.closest("dialog, textarea, [data-lenis-prevent]"),
      });
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      const syncModal = () => document.querySelector("dialog[open]") ? lenis.stop() : lenis.start();
      const observer = new MutationObserver(syncModal);
      document.querySelectorAll("dialog").forEach((dialog) => observer.observe(dialog, { attributes: true, attributeFilter: ["open"] }));
      syncModal();
      const cleanups: (() => void)[] = [];
      // Own same-page anchors so the browser's default jump cannot race Lenis.
      const anchorClick = (event: MouseEvent) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
        if (!link || link.target || link.hasAttribute("download")) return;
        const url = new URL(link.href);
        if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
        let id: string;
        try { id = decodeURIComponent(url.hash.slice(1)); } catch { return; }
        const target = document.getElementById(id);
        if (!target) return;
        event.preventDefault();
        history.pushState(history.state, "", url.hash);
        lenis.scrollTo(target, { offset: -24, onComplete: () => {
          const previous = target.getAttribute("tabindex");
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
          if (previous === null) target.removeAttribute("tabindex");
          else target.setAttribute("tabindex", previous);
        } });
      };
      document.addEventListener("click", anchorClick);
      cleanups.push(() => document.removeEventListener("click", anchorClick));

      const hero = document.querySelector<HTMLElement>(".immersive-hero");
      const world = document.querySelector<HTMLElement>(".flight-world");
      const stage = document.querySelector<HTMLElement>(".plane-stage");
      const plane = document.querySelector<HTMLElement>(".plane-flight");
      const svg = document.querySelector<SVGSVGElement>(".flight-route");
      const route = svg?.querySelector("path");
      if (hero && world && stage && plane && svg && route) {
        const originalPath = route.getAttribute("d")!;
        const originalViewBox = svg.getAttribute("viewBox")!;
        let length = 1, origin = { x: 0, y: 0 };
        const flight = { progress: 0 };
        const setX = gsap.quickSetter(plane, "x", "px");
        const setY = gsap.quickSetter(plane, "y", "px");
        const setRotation = gsap.quickSetter(plane, "rotation", "deg");
        const setScale = gsap.quickSetter(plane, "scale");
        const setOpacity = gsap.quickSetter(plane, "opacity");
        const draw = () => {
          const p = route.getPointAtLength(length * flight.progress);
          const next = route.getPointAtLength(Math.min(length, length * flight.progress + 2));
          const previous = route.getPointAtLength(Math.max(0, length * flight.progress - 2));
          const angle = Math.atan2(next.y - previous.y, next.x - previous.x) * 180 / Math.PI;
          setX(p.x - origin.x);
          setY(p.y - origin.y);
          setRotation((angle + 30) * Math.min(1, flight.progress * 8));
          setScale(1 - flight.progress * .65);
          setOpacity(1 - Math.max(0, flight.progress - .88) / .12);
          route.style.strokeDashoffset = String(length * (1 - flight.progress));
        };
        const measure = () => {
          const w = world.clientWidth, h = world.clientHeight;
          const a = stage.getBoundingClientRect(), b = world.getBoundingClientRect();
          origin = { x: a.left - b.left + a.width / 2, y: a.top - b.top + a.height / 2 };
          svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
          route.setAttribute("d", `M${origin.x} ${origin.y} C${w * .92} ${h * .04} ${w * 1.02} ${h * .53} ${w * .7} ${h * .65} S${w * .12} ${h * .59} ${w * .29} ${h * .94}`);
          length = route.getTotalLength();
          route.style.strokeDasharray = String(length);
          draw();
        };
        measure();
        gsap.to(flight, {
          progress: 1, ease: "none", onUpdate: draw,
          scrollTrigger: { trigger: hero, start: "top top", end: () => desktop ? `+=${window.innerHeight * .9}` : "bottom top", pin: desktop, scrub: .75, anticipatePin: 1, invalidateOnRefresh: true, onRefreshInit: measure },
        });
        gsap.to(".flight-title > span:first-child", { xPercent: -5, opacity: .5, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: () => `+=${window.innerHeight}`, scrub: 1 } });
        gsap.to(".flight-title > span:nth-child(2)", { xPercent: 3, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: () => `+=${window.innerHeight}`, scrub: 1 } });
        cleanups.push(() => { plane.style.removeProperty("transform"); plane.style.removeProperty("opacity"); route.setAttribute("d", originalPath); svg.setAttribute("viewBox", originalViewBox); route.style.removeProperty("stroke-dasharray"); route.style.removeProperty("stroke-dashoffset"); });
      }

      gsap.utils.toArray<HTMLElement>(".section-title h2, .studio-manifesto, .process-grid li, .project-caption, .closing-copy").forEach((element) => {
        if (element.getBoundingClientRect().top < window.innerHeight * .85) return;
        gsap.fromTo(element, { y: 42, opacity: .2 }, { y: 0, opacity: 1, duration: .85, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 91%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".project-image-link").forEach((element) => {
        gsap.fromTo(element, { clipPath: "inset(10% 4% 10% 4%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 90%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".featured-work .project-art img").forEach((image) => {
        gsap.fromTo(image, { yPercent: -4, scale: 1.1 }, { yPercent: 4, scale: 1.1, ease: "none", scrollTrigger: { trigger: image.parentElement, start: "top bottom", end: "bottom top", scrub: .7 } });
      });
      if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
        document.querySelectorAll<HTMLElement>(".flight-cta a, .button, .nav-cta").forEach((button) => {
          const x = gsap.quickTo(button, "x", { duration: .35, ease: "power3.out" });
          const y = gsap.quickTo(button, "y", { duration: .35, ease: "power3.out" });
          const move = (event: PointerEvent) => { const rect = button.getBoundingClientRect(); x((event.clientX - rect.left - rect.width / 2) * .13); y((event.clientY - rect.top - rect.height / 2) * .18); };
          const leave = () => { x(0); y(0); };
          button.addEventListener("pointermove", move);
          button.addEventListener("pointerleave", leave);
          button.addEventListener("blur", leave);
          cleanups.push(() => { button.removeEventListener("pointermove", move); button.removeEventListener("pointerleave", leave); button.removeEventListener("blur", leave); });
        });
      }
      const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => {
        cancelAnimationFrame(refresh);
        observer.disconnect();
        gsap.ticker.remove(tick);
        lenis.destroy();
        cleanups.forEach((cleanup) => cleanup());
      };
    });
    return () => mm.revert();
  }, { dependencies: [pathname], revertOnUpdate: true });
  return null;
}
