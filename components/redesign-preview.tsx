"use client";
import { useState } from "react";
import Image from "next/image";
export default function RedesignPreview() {
  const [split, setSplit] = useState(50);
  return <section className="section redesign-section" id="redesign-preview">
    <div className="redesign-heading"><div><span className="eyebrow">WEB DESIGN / A CHANGE IN PERSPECTIVE</span><h2>Same brand.<br /><em>New possibilities.</em></h2></div><p>Drag to explore how typography, imagery, and a clearer hierarchy change the experience.</p></div>
    <div className="redesign-comparison" role="group" aria-label="Compare two fictional DAYBREAK website designs">
      <div className="redesign-before"><header>Daybreak Coffee</header><div><h3>Welcome to Daybreak</h3><p>Discover our coffee collection.<br />Good coffee for everyday moments.</p><span className="redesign-fake-button">Our collection</span></div><footer>COFFEE · OUR STORY · CONTACT</footer></div>
      <div className="redesign-after" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}><header><strong>DAYBREAK</strong><span>A LITTLE ROOM FOR MORNING ↗</span></header><div className="redesign-after-content"><div><span>MAKE THE MOMENT YOURS</span><h3>GOOD THINGS<br />START SLOW.</h3><p>Your first pause of the day.<br />Make it a good one.</p><span className="redesign-fake-button">Find your morning ↗</span></div><div className="redesign-image"><Image src="/images/daybreak.webp" alt="" fill sizes="(max-width:700px) 50vw, 600px" /></div></div></div>
      <span className="redesign-divider" style={{ left: `${split}%` }} aria-hidden="true"><span>↔</span></span>
      <div className="redesign-labels" aria-hidden="true"><span>REIMAGINED</span><span>STARTING POINT</span></div>
      <input className="redesign-range" type="range" min="0" max="100" value={split} aria-label="Reveal redesigned website" aria-valuetext={`${split}% redesigned view revealed`} onChange={event => setSplit(Number(event.target.value))} />
    </div>
    <div className="redesign-controls"><p>Drag the divider, or use the arrow keys.</p><div>{[[0,"Starting point"],[50,"Compare"],[100,"Reimagined"]].map(([value,label]) => <button key={label} type="button" aria-pressed={split === value} onClick={() => setSplit(Number(value))}>{label}</button>)}</div></div>
    <p className="redesign-note">Illustrative comparison for DAYBREAK, a fictional concept brand. Both layouts were created for this demonstration.</p>
  </section>;
}
