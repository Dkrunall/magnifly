import Link from "next/link";

export default function PageSections({ links }: { links: [string, string][] }) {
  return <nav className="page-sections" aria-label="Explore this page">
    <span className="eyebrow">ON THIS PAGE</span>
    {links.map(([label, href]) => <Link key={href} href={href}>{label}<span aria-hidden="true">↗</span></Link>)}
  </nav>;
}
