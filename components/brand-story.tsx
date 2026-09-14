import Link from "next/link";
import { Smartphone, Film, Camera, Rocket, Handshake, Fingerprint, Palette, Brain, BookOpen, Target, TrendingUp, Zap, ArrowUpRight } from "lucide-react";

const labels = [
  ["Social", Smartphone, 3], ["Production", Film, 4], ["Shoots", Camera, 4],
  ["Performance", Rocket, 6], ["Influencers", Handshake, 5], ["Branding", Fingerprint, 2],
  ["Design", Palette, 2], ["Strategy", Brain, 1], ["Moodboards", BookOpen, 2],
  ["Content", Target, 3], ["Growth", TrendingUp, 6], ["Media", Zap, 6],
] as const;

export function ServiceConstellation() {
  return <nav className="brand-service-cloud" aria-label="Explore our creative services">
    {labels.map(([label, Icon, section]) => <Link key={label} href={`/services#service-${section}`}><Icon aria-hidden="true" size={18} /><span>{label}</span><ArrowUpRight aria-hidden="true" size={14} /></Link>)}
  </nav>;
}

export function BrandOutcomes() {
  return <div className="brand-outcomes">
    <div><span className="eyebrow">What we work towards</span><h3>Beyond the output.</h3><p>Every creative choice should have a purpose. These are the shifts we plan for and measure against your goals.</p></div>
    <ul>{[["Ideas","Impact"],["Clicks","Customers"],["Content","Conversations"],["Brands","Communities"],["Views","Value"]].map(([from,to]) => <li key={from}><span>{from}</span><ArrowUpRight aria-hidden="true" size={20} /><strong>{to}</strong></li>)}</ul>
  </div>;
}

export function BrandManifesto() {
  return <section className="section brand-manifesto" aria-labelledby="manifesto-title"><span className="eyebrow">THAT’S WHAT IT MEANS TO MAGNIFLY</span><h2 id="manifesto-title">Every idea deserves<br />to travel further.</h2><p>Every story deserves to reach the right people.<br />Every brand deserves to grow beyond expectations.</p><p className="manifesto-signoff">Where potential becomes presence.</p></section>;
}
