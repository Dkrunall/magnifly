"use client";
import UiIcon from "@/components/ui-icon";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import SocialFeed from "./social-feed";
import AppPreview from "./app-preview";
const modes = ["Social", "Website", "App"] as const;
const palettes = [
  { name: "Citrus", paper: "#d9e756", ink: "#1634b4", surface: "#fafbf6" },
  { name: "Apricot", paper: "#ffc39c", ink: "#522348", surface: "#fff5ee" },
  { name: "Electric", paper: "#bed2ff", ink: "#202c65", surface: "#f3f6ff" },
];
const typefaces = [
  { name: "Modern", value: "var(--font-display), sans-serif" },
  { name: "Editorial", value: "Georgia, serif" },
  { name: "Technical", value: "var(--font-mono), monospace" },
];
export default function BrandPlayground() {
  const [mode, setMode] = useState<typeof modes[number]>("Social");
  const [device, setDevice] = useState("Desktop");
  const [routine, setRoutine] = useState("Morning");
  const [steps, setSteps] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [appMode, setAppMode] = useState("Collection");
  const [palette, setPalette] = useState(0);
  const [typeface, setTypeface] = useState(0);
  const theme = { "--demo-paper": palettes[palette].paper, "--demo-ink": palettes[palette].ink, "--demo-surface": palettes[palette].surface, "--demo-font": typefaces[typeface].value } as CSSProperties;
  return <section className="section brand-playground" id="brand-playground" style={theme}>
    <div className="playground-heading"><div><span className="eyebrow">SOCIAL / WEB / APP</span><h2>One brand.<br /><em>Every screen.</em></h2></div><p>A feed worth saving. A website worth exploring. An app worth opening. Try the same idea in three different places.</p></div>
    <div className="playground-modes" role="group" aria-label="Choose a brand experience">{modes.map((item, index) => <button key={item} type="button" aria-pressed={mode === item} aria-controls="brand-experience" onClick={() => setMode(item)}><span>0{index + 1}</span>{item}<span aria-hidden="true"><UiIcon name="arrow" /></span></button>)}</div>
    <div className="brand-customizer">
      <div><span className="eyebrow">MAKE IT YOURS</span><p>One design system. Three experiences.</p></div>
      <fieldset><legend>Palette</legend><div>{palettes.map((item,index) => <button key={item.name} aria-pressed={palette === index} onClick={() => setPalette(index)}><i style={{ background: item.paper, borderColor: item.ink }} />{item.name}</button>)}</div></fieldset>
      <fieldset><legend>Typography</legend><div>{typefaces.map((item,index) => <button key={item.name} aria-pressed={typeface === index} onClick={() => setTypeface(index)}>{item.name}</button>)}</div></fieldset>
      <button className="customizer-reset" onClick={() => { setPalette(0); setTypeface(0); }}>Reset <UiIcon name="reset" /></button>
      <p className="customizer-status" role="status">{palettes[palette].name} palette · {typefaces[typeface].name} type. Preview layouts update together; campaign photography keeps its original colors.</p>
    </div>
    <div className="playground-stage" id="brand-experience">
      <div className="playground-note"><span className="eyebrow">ORRA / CONCEPT EXPERIENCE</span><h3>{mode === "Social" ? "Stop the scroll." : mode === "Website" ? "Turn interest into exploration." : "Build a daily connection."}</h3><p>{mode === "Social" ? "Browse the carousel and save your favourite idea." : mode === "Website" ? "Switch screen sizes and explore the collection story." : "Choose a routine and tick off each step."}</p><Link href="/case-studies/orra">Explore the ORRA concept <UiIcon name="arrow" /></Link></div>
      <div className={`playground-device mode-${mode.toLowerCase()}`} data-app-mode={appMode}>
        <div hidden={mode !== "App"}><div className="demo-device-controls" role="group" aria-label="Choose app demo">{["Collection", "Daily ritual"].map(item => <button key={item} aria-pressed={appMode === item} onClick={() => setAppMode(item)}>{item}</button>)}</div><div hidden={appMode !== "Collection"}><AppPreview /></div></div>
        <div hidden={mode !== "Social"}><SocialFeed /></div>
        {mode === "Website" && <div className="demo-web-shell"><div className="demo-device-controls" role="group" aria-label="Website preview size">{["Desktop", "Tablet", "Mobile"].map(item => <button key={item} aria-pressed={device === item} onClick={() => setDevice(item)}>{item}</button>)}</div><p className="demo-device-description" aria-live="polite">{device === "Desktop" ? "An editorial layout with room to explore." : device === "Tablet" ? "A tighter composition, with the same clear hierarchy." : "A focused, single-column experience."}</p><div className={`demo-website device-${device.toLowerCase()} ${device === "Mobile" ? "is-compact" : ""}`}><header><strong>ORRA</strong><span>Everyday, brighter.</span></header><div className="demo-web-content"><div><span className="eyebrow">A LITTLE DAILY JOY</span><h3>Your daily<br />bright side.</h3><button onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls="orra-collection">{expanded ? <>Close the story <UiIcon name="minus" /></> : <>Explore the collection <UiIcon name="arrow" /></>}</button></div><div className="demo-web-image"><Image src="/images/orra.webp" alt="ORRA concept collection" fill sizes="(max-width:700px) 80vw, 400px" /></div></div><div className="demo-collection" id="orra-collection" hidden={!expanded}>Simple routines. Confident colour. A skincare concept built around the small moments that brighten your day.</div></div></div>}
        {mode === "App" && <div className="demo-app"><header><strong>ORRA</strong><span>Your daily ritual</span></header><h3>A little care.<br />A brighter day.</h3><div className="demo-routine-tabs" role="group" aria-label="Choose routine">{["Morning", "Evening"].map(item => <button key={item} aria-pressed={routine === item} onClick={() => setRoutine(item)}>{item}</button>)}</div><p className="demo-routine-note">{routine === "Morning" ? "Make a little room before the day begins." : "Slow down. Make this moment yours."}</p><div className="demo-routine-steps">{["Cleanse", "Hydrate", "Take a moment"].map((step, index) => { const id = `${routine}-${step}`; const checked = steps.includes(id); return <button key={id} aria-pressed={checked} onClick={() => setSteps(checked ? steps.filter(item => item !== id) : [...steps, id])}><span>0{index + 1}</span>{step}<span>{checked ? <><UiIcon name="check" /></> : <><UiIcon name="plus" /></>}</span></button>; })}</div><p className="demo-routine-status" role="status">{steps.filter(item => item.startsWith(routine)).length} of 3 moments complete</p></div>}
      </div>
    </div>
    <p className="playground-disclaimer">Interactive concept for a fictional brand. Saves and routine choices are temporary; no account, purchase, or data submission.</p>
  </section>;
}
