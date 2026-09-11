"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, RotateCcw } from "lucide-react";
import Intro from "./intro";
export default function Hero() {
  return <section className="hero editorial-hero">
    <Intro />
    <div className="editorial-top eyebrow"><span><i /> Independent minds. Unforgettable brands.</span><button onClick={() => window.dispatchEvent(new Event("replay-intro"))}><RotateCcw size={13} /> Replay intro</button></div>
    <div className="editorial-grid">
      <div className="editorial-copy">
        <h1><span>Made to</span><span>stand <em>out.</em></span></h1>
        <p>Big ideas deserve more than a scroll past.<br />We build brands, content, and campaigns<br /> that make people stop. And feel something.</p>
        <div className="editorial-actions"><Link href="/brands" className="hero-work">Explore our work <ArrowUpRight size={22} /></Link><Link href="/contact">Let’s make something <ArrowUpRight size={17} /></Link></div>
      </div>
      <Link href="/case-studies/orra" className="hero-art-stack" aria-label="Explore ORRA concept project">
        <div className="art-back art-back-one"><Image src="/images/forma.webp" alt="" fill sizes="40vw" /></div>
        <div className="art-back art-back-two"><Image src="/images/daybreak.webp" alt="" fill sizes="40vw" /></div>
        <div className="art-front"><Image src="/images/orra.webp" alt="ORRA skincare campaign in cobalt blue and sunshine yellow" fill priority sizes="(max-width: 700px) 80vw, 38vw" /><span className="art-sticker">A little bold.<br /><strong>A lot different.</strong><ArrowUpRight size={24} /></span></div>
        <span className="art-caption eyebrow">ORRA / Brand world / Concept project <ArrowUpRight size={17} /></span>
      </Link>
    </div>
    <div className="editorial-bottom"><a href="#studio"><ArrowDown size={16} /> Scroll to discover</a><span>STRATEGY + DESIGN + CONTENT + CULTURE</span><span className="eyebrow">Ideas take flight ↗</span></div>
  </section>;
}
