"use client";
import UiIcon from "@/components/ui-icon";

import { useState } from "react";
import Link from "next/link";
const goals = ["Launch a brand", "Build awareness", "Start conversations"];
const audiences = ["First-time visitors", "Returning followers", "Existing customers"];
const formats = ["Carousel", "Short video", "Landing page"];
export default function CampaignBuilder() {
  const [goal, setGoal] = useState(goals[0]), [audience, setAudience] = useState(audiences[0]), [format, setFormat] = useState(formats[0]);
  const headline = goal === goals[0] ? "Meet your next bright idea." : goal === goals[1] ? "Make everyday a little brighter." : "What does your bright side look like?";
  const hook = audience === audiences[0] ? "Introduce the brand with one clear promise." : audience === audiences[1] ? "Reveal a new angle on a story they already know." : "Invite the community to share its own experience.";
  const structure = format === formats[0] ? ["Open with a bold question", "Show the idea in everyday life", "Close with one invitation"] : format === formats[1] ? ["0–3s: a striking opening", "3–10s: the idea in motion", "10–15s: a clear next step"] : ["A focused headline and hero", "A clear story with supporting visuals", "One prominent call to action"];
  return <section className="section campaign-builder" id="campaign-builder"><div className="campaign-builder-heading"><span className="eyebrow">CAMPAIGN LAB / TRY A DIRECTION</span><h2>What’s your<br /><em>next big idea?</em></h2><p>Choose a brief. Explore how the creative direction changes.</p></div><div className="campaign-builder-grid"><div className="campaign-brief-controls">{[{label:"01 / The goal",value:goal,options:goals,set:setGoal},{label:"02 / The audience",value:audience,options:audiences,set:setAudience},{label:"03 / The format",value:format,options:formats,set:setFormat}].map(group => <fieldset key={group.label}><legend>{group.label}</legend><div>{group.options.map(option => <button key={option} aria-pressed={group.value === option} onClick={() => group.set(option)}>{option}</button>)}</div></fieldset>)}<button className="campaign-reset" onClick={() => { setGoal(goals[0]); setAudience(audiences[0]); setFormat(formats[0]); }}>Reset brief <UiIcon name="reset" /></button></div><div className="campaign-result" aria-live="polite"><span className="eyebrow">ORRA / SAMPLE CAMPAIGN</span><h3>{headline}</h3><p>{hook}</p><div className="campaign-result-tags"><span>{goal}</span><span>{format}</span></div><ol>{structure.map((step,index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol><Link href="/contact?service=Content%20Production" className="button">Build a campaign with us <UiIcon name="arrow" /></Link></div></div><p className="campaign-lab-note">Illustrative creative directions for a fictional brand. This demo uses predefined examples; it does not generate, publish, or predict campaign results.</p></section>;
}
