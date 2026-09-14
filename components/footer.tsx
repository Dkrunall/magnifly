import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowUp } from "lucide-react";

export default function Footer() {
  return <footer className="footer studio-footer">
    <div className="footer-invitation">
      <div><span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span><h2>Let’s build a brand<br />people <em>remember.</em></h2></div>
      <Link href="/contact#project-brief" className="footer-project-link"><span>Start your project</span><ArrowUpRight aria-hidden="true" /></Link>
    </div>
    <div className="footer-directory">
      <div className="footer-brand"><Link href="/" aria-label="MAGNIFLY MEDIA home"><Image src="/logo.png" alt="MAGNIFLY MEDIA" width={1600} height={243} className="logo" /></Link><p>Clear thinking. Distinctive design.<br />Ideas that move your brand forward.</p></div>
      <nav aria-label="Footer navigation"><span className="eyebrow">EXPLORE</span>{[["About the studio","/about"],["Our services","/services"],["Brands & work","/brands"],["Contact","/contact"]].map(([label,href])=><Link key={href} href={href}>{label}<ArrowUpRight aria-hidden="true" /></Link>)}</nav>
      <div className="footer-focus"><span className="eyebrow">BUILT TO CONNECT</span><p>Brand strategy.<br />Social storytelling.<br />Web & app experiences.</p><a href="#page-top" className="footer-top">Back to top<ArrowUp aria-hidden="true" /></a></div>
    </div>
    <div className="footer-landing" aria-hidden="true"><span>Where brands take flight.</span></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} MAGNIFLY MEDIA</span><span>Independent creative studio</span></div>
  </footer>;
}
