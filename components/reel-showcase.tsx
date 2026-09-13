"use client";
import UiIcon from "@/components/ui-icon";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
const reels = [
  { brand: "ORRA", image: "/images/orra.webp", title: "Your daily bright side.", category: "Product story", color: "#d9e756" },
  { brand: "FORMA", image: "/images/forma.webp", title: "Less noise. More presence.", category: "Fashion editorial", color: "#e5e4de" },
  { brand: "DAYBREAK", image: "/images/daybreak.webp", title: "Good things start slow.", category: "Brand ritual", color: "#ef936b" },
];
export default function ReelShowcase() {
  const [active, setActive] = useState(0), [playing, setPlaying] = useState(false), [progress, setProgress] = useState(0);
  const root = useRef<HTMLElement>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) setPlaying(false); });
    if (root.current) observer.observe(root.current);
    const visibility = () => { if (document.hidden) setPlaying(false); };
    document.addEventListener("visibilitychange", visibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", visibility); };
  }, []);
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => setProgress(value => Math.min(100, value + 1)), 80);
    return () => clearInterval(timer);
  }, [playing]);
  useEffect(() => { if (progress >= 100) setPlaying(false); }, [progress]);
  const choose = (index: number) => { setActive((index + reels.length) % reels.length); setProgress(0); setPlaying(false); };
  const reel = reels[active];
  return <section className="section reel-showcase" id="reel-showcase" ref={root}>
    <div className="reel-heading"><span className="eyebrow">SHORT FORM / BIG IMPRESSION</span><h2>Made to<br /><em>move you.</em></h2><p>Three ideas. Three moods. Explore our motion concepts.</p></div>
    <div className="reel-layout"><div className="reel-list" role="group" aria-label="Choose a demo reel">{reels.map((item,index) => <button key={item.brand} aria-pressed={active === index} onClick={() => choose(index)}><span>0{index + 1} / {item.category}</span><strong>{item.brand}</strong><span>{item.title} <UiIcon name="arrow" /></span></button>)}</div>
      <div className="reel-player" data-playing={playing} onTouchStart={event => { start.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }} onTouchCancel={() => { start.current = null; }} onTouchEnd={event => { if (start.current !== null) { const distance = event.changedTouches[0].clientX - start.current.x; const vertical = event.changedTouches[0].clientY - start.current.y; if (Math.abs(distance) > 50 && Math.abs(distance) > Math.abs(vertical) * 1.5) choose(active + (distance < 0 ? 1 : -1)); } start.current = null; }}>
        <div className="reel-art" key={active} style={{ transform: `scale(${1 + progress * .0012}) translateY(${-progress * .02}%)` }}><Image src={reel.image} alt={`${reel.brand} concept campaign artwork`} fill sizes="(max-width:700px) 90vw, 380px" /></div>
        <div className="reel-overlay"><span className="reel-demo-label">DEMO MOTION / NO AUDIO</span><div className="reel-copy" style={{ color: reel.color }}><span>{reel.brand} / 0{active + 1}</span><h3>{progress < 45 ? reel.title : "A fresh perspective."}</h3></div><div className="reel-progress" role="progressbar" aria-label="Demo reel progress" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${progress}%` }} /></div><div className="reel-controls"><button aria-label="Previous demo reel" onClick={() => choose(active - 1)}><UiIcon name="left" /></button><button onClick={() => { if (progress >= 100) setProgress(0); setPlaying(!playing); }}>{playing ? <>Pause <UiIcon name="pause" /></> : progress >= 100 ? <>Replay <UiIcon name="replay" /></> : <>Play demo <UiIcon name="play" /></>}</button><button aria-label="Next demo reel" onClick={() => choose(active + 1)}><UiIcon name="right" /></button></div></div>
      </div><div className="reel-description"><span className="eyebrow">{reel.category} / 8 SECONDS</span><h3>{reel.title}</h3><p>Play the concept or swipe to explore the next direction.</p><p className="reel-disclaimer">Placeholder animation made from concept artwork, not a filmed reel. Real videos and audio will replace these demos.</p></div></div>
  </section>;
}
