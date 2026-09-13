
import UiIcon from "@/components/ui-icon";
import Link from "next/link";
import Hero from "@/components/hero";
import ServicesPreview from "@/components/services-preview";
import { CTA, ProjectCard } from "@/components/shared";
import { projects } from "@/lib/content";
export default function Home() {
  return (
    <main>
      <Hero />
      <div className="brand-strip">
        <span>MAGNIFLY MEDIA</span>
        <span>Strategy with purpose.</span>
        <span>Creative with direction.</span>
        <span>Ideas take flight. <UiIcon name="arrow" /></span>
      </div>
      <section id="studio" className="intro section">
        <span className="eyebrow">01 / The studio</span>
        <h2 className="studio-manifesto">
          Your brand has <span>potential.</span>
          <br />
          We give it <em>direction.</em>
          <span className="manifesto-arrow" aria-hidden="true">
            <UiIcon name="arrow" />
          </span>
        </h2>
        <p>
          Strategy sharpens the idea. Design makes it distinctive. Content
          brings it to life. We bring them together with thoughtful distribution
          to move your brand forward.
        </p>
        <Link className="text-link" href="/about">
          Meet MAGNIFLY MEDIA <UiIcon name="arrow" />
        </Link>
      </section>
      <section className="section featured-work">
        <div className="section-title">
          <span className="eyebrow">02 / Selected work</span>
          <h2>
            Made to
            <br />
            <em>stand out.</em>
          </h2>
          <Link className="text-link" href="/brands">
            All selected work <UiIcon name="arrow" />
          </Link>
        </div>
        <p className="concept-note">
          An exploration of what’s possible. All featured projects are fictional
          Concept Work.
        </p>
        <div className="featured-grid">
          {projects.slice(0, 3).map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>
      <section className="section site-explore" id="brand-playground">
        <div className="section-title"><span className="eyebrow">EXPLORE MAGNIFLY</span><h2>Find your<br /><em>next direction.</em></h2></div>
        <div className="site-explore-grid">
          {[
            ["01 / ABOUT", "Meet the studio.", "Our thinking, our principles, and the four steps from first conversation to launch.", "/about", "Explore our approach"],
            ["02 / SERVICES", "Shape your next move.", "Find the right service, compare a website redesign, and try a campaign brief.", "/services", "Find your service"],
            ["03 / BRANDS", "See ideas in action.", "Explore the work, interact with a social feed, try the web and app demos, and play our reels.", "/brands", "Explore the work"],
          ].map(([label,title,copy,href,action]) => <Link className="site-explore-card" href={href} key={href}><span className="eyebrow">{label}</span><h3>{title}</h3><p>{copy}</p><span className="site-explore-action">{action}<span aria-hidden="true"><UiIcon name="arrow" /></span></span></Link>)}
        </div>
      </section>
      <section className="section services-section">
        <div className="section-title">
          <span className="eyebrow">03 / Our capabilities</span>
          <h2>
            Everything your brand
            <br />
            needs to move forward.
          </h2>
        </div>
        <ServicesPreview />
      </section>
      <section className="section paper process">
        <div className="section-title">
          <span className="eyebrow">
            04 / From first thought to full flight
          </span>
          <h2>
            Good ideas need
            <br />a clear way forward.
          </h2>
        </div>
        <p className="home-process-copy">Discover the opportunity. Define the direction. Create the work. Amplify the idea. A clear process, with room for your input at every stage.</p>
        <Link className="text-link" href="/about#our-process">Explore how we work <UiIcon name="arrow" /></Link>
      </section>
      <CTA />
    </main>
  );
}
