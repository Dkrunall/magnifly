"use client";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Intro from "./intro";
import HeroPlane from "./hero-plane";
import { useEffect, useRef } from "react";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    let animations: Animation[] = [];
    let frame = 0;
    const cancel = () => { animations.forEach(animation => animation.cancel()); animations = []; };
    const enter = () => {
      cancel();
      if (matchMedia("(prefers-reduced-motion: reduce)").matches || window.scrollY > 100) return;
      root.current?.querySelectorAll<HTMLElement>(".flight-title > span").forEach((line, index) => {
        animations.push(line.animate([
          { clipPath: "inset(100% 0 0 0)", transform: "translateY(28px)", opacity: 0 },
          { clipPath: "inset(0% 0 0 0)", transform: "translateY(0)", opacity: 1 },
        ], { duration: 1000, delay: index * 130, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" }));
      });
      root.current?.querySelectorAll<HTMLElement>(".flight-topline, .flight-bottomline").forEach((element, index) => {
        animations.push(element.animate([{ opacity: 0, transform: "translateY(14px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 700, delay: 250 + index * 70, easing: "ease-out", fill: "backwards" }));
      });
    };
    frame = requestAnimationFrame(() => { if (!root.current?.querySelector("dialog[open]")) enter(); });
    window.addEventListener("magnifly-intro-finished", enter);
    window.addEventListener("replay-intro", cancel);
    return () => { cancelAnimationFrame(frame); cancel(); window.removeEventListener("magnifly-intro-finished", enter); window.removeEventListener("replay-intro", cancel); };
  }, []);
  return (
    <section ref={root} className="hero immersive-hero stacked-flight-hero">
      <Intro />
      <div className="flight-topline">
        <span><i /> INDEPENDENT CREATIVE STUDIO</span>
      </div>
      <div className="flight-world">
        <div className="flight-grid" aria-hidden="true" />
        <svg className="flight-route" viewBox="0 0 1400 640" preserveAspectRatio="none" aria-hidden="true"><path d="M-80 560C180 610 270 20 660 120S1000 690 1490 90" /></svg>
        <h1 className="flight-title"><span>THINK</span>{" "}<span>BIGGER<span className="flight-period">.</span></span></h1>
        <HeroPlane />
      </div>
      <div className="flight-bottomline">
        <a href="#studio" className="flight-scroll" aria-label="Explore the studio"><ArrowDown size={21} /></a>
        <p>We give ambitious brands<br /><strong>the space to take flight.</strong></p>
        <div className="flight-cta"><Link href="/brands">Explore our work <ArrowUpRight size={22} /></Link><Link href="/contact">Start something big <ArrowUpRight size={17} /></Link></div>
      </div>
    </section>
  );
}
