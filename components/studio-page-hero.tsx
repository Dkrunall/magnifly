import Link from "next/link";
export default function StudioPageHero({ number, label, first, second, description, target, action }: {
  number: string; label: string; first: string; second: string; description: string; target: string; action: string;
}) {
  return <section className="studio-page-hero section">
    <div className="studio-page-topline"><span className="eyebrow"><i /> INDEPENDENT CREATIVE STUDIO</span><span className="eyebrow">{number} / {label}</span></div>
    <h1><span>{first}</span><span>{second}<em>.</em></span></h1>
    <div className="studio-page-bottom"><a href={target} className="studio-page-jump" aria-label={action}>↓</a><p>{description}</p><Link href={target === "#project-brief" ? target : "/contact"} className="button">{target === "#project-brief" ? "Start your brief" : "Start something big"} <span>↗</span></Link></div>
  </section>;
}
