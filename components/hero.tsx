"use client";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, RotateCcw } from "lucide-react";
import Intro from "./intro";
import HeroPlane from "./hero-plane";

export default function Hero() {
  return (
    <section className="hero immersive-hero">
      <Intro />
      <div className="flight-topline">
        <span><i /> INDEPENDENT CREATIVE STUDIO</span>
        <button onClick={() => window.dispatchEvent(new Event("replay-intro"))}><RotateCcw size={13} /> Replay intro</button>
      </div>
      <div className="flight-world">
        <div className="flight-grid" aria-hidden="true" />
        <svg className="flight-route" viewBox="0 0 1400 640" preserveAspectRatio="none" aria-hidden="true"><path d="M-80 560C180 610 270 20 660 120S1000 690 1490 90" /></svg>
        <h1 className="flight-title"><span>THINK</span><span>BIGGER<span className="flight-period">.</span></span></h1>
        <span className="flight-side-note">NO SMALL IDEAS.<br />NO ORDINARY BRANDS.</span>
        <HeroPlane />
        <span className="flight-label">01 — IDEAS IN MOTION</span>
      </div>
      <div className="flight-bottomline">
        <a href="#studio" className="flight-scroll" aria-label="Explore the studio"><ArrowDown size={21} /></a>
        <p>We give ambitious brands<br /><strong>the space to take flight.</strong></p>
        <div className="flight-cta"><Link href="/brands">Explore our work <ArrowUpRight size={22} /></Link><Link href="/contact">Start something big <ArrowUpRight size={17} /></Link></div>
      </div>
    </section>
  );
}
