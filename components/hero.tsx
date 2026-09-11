"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import HeroPlane from "./hero-plane";

export default function Hero() {
  return (
    <section className="hero hero-v2">
      <div className="hero-kicker">
        <span className="eyebrow">Independent creative studio</span>
        <span className="hero-coordinate" aria-hidden="true">
          ↗ THINK BIG. GO FURTHER.
        </span>
      </div>
      <div className="hero-composition">
        <h1>
          <span className="headline-line">Big ideas.</span>
          <span className="headline-line accent-line">Bigger</span>
          <span className="headline-line">
            impact<span className="period">.</span>
          </span>
        </h1>
        <HeroPlane />
      </div>
      <div className="hero-baseline">
        <div className="hero-description">
          <span className="eyebrow">Social. Brand. Creative.</span>
          <p>
            We turn ambitious brands
            <br />
            into impossible-to-ignore ones.
          </p>
        </div>
        <div className="hero-baseline-links">
          <Link href="/brands" className="round-link">
            <span>
              Explore
              <br />
              our work
            </span>
            <ArrowUpRight size={25} />
          </Link>
          <Link className="quiet-link" href="/contact">
            Let’s talk <ArrowUpRight size={16} />
          </Link>
        </div>
        <a className="scroll-link" href="#studio">
          <ArrowDown size={18} />
          <span className="eyebrow">Keep exploring</span>
        </a>
      </div>
    </section>
  );
}
