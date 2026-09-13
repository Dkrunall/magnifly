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
        const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 24;
        const sectionNav = target.closest(".service-details")?.querySelector(".service-route-nav")
          ?? (target.classList.contains("case-chapter") ? document.querySelector(".case-chapters") : null);
        const offset = Math.max(margin, sectionNav ? sectionNav.getBoundingClientRect().height + 20 : 24);
        lenis.scrollTo(target, { offset: -offset, onComplete: () => {
          const previous = target.getAttribute("tabindex");
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
          if (previous === null) target.removeAttribute("tabindex");
          else target.setAttribute("tabindex", previous);
        } });
      };
      document.addEventListener("click", anchorClick);
      cleanups.push(() => document.removeEventListener("click", anchorClick));

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
