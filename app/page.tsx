
import UiIcon from "@/components/ui-icon";
import Link from "next/link";
import Hero from "@/components/hero";
import { ServiceConstellation, BrandOutcomes } from "@/components/brand-story";
import ServicesPreview from "@/components/services-preview";
import { ProjectCard } from "@/components/shared";
import { projects } from "@/lib/content";
export default function Home() {
  return (
    <main>
      <Hero />
      <div className="brand-strip">
        <span>MAGNIFLY MEDIA</span>
        <span>Strategy with purpose.</span>
        <span>Creative with direction.</span>
        <span>Where brands take flight. <UiIcon name="arrow" /></span>
      </div>
      <section id="studio" className="intro section">
        <span className="eyebrow">01 / The studio</span>
        <h2 className="studio-manifesto">
          One team. <span>Every step.</span>
          <br />
          Built to <em>Magnifly.</em>
          <span className="manifesto-arrow" aria-hidden="true">
            <UiIcon name="arrow" />
          </span>
        </h2>
        <p>
          From brand strategy and design to production, social media, and performance
          marketing, the same team connects the thinking with the making. We build
          websites and apps too, so your brand’s next step feels connected from first
          impression to everyday experience.
        </p>
        <Link className="text-link" href="/about">
          Meet MAGNIFLY MEDIA <UiIcon name="arrow" />
        </Link>
        <div className="brand-idea-lines" aria-label="What we Magnifly">
          <p>Beyond content. <strong>We Magnifly ideas.</strong></p>
          <p>Beyond campaigns. <strong>We Magnifly impact.</strong></p>
          <p>Beyond followers. <strong>We Magnifly communities.</strong></p>
          <p>Beyond trends. <strong>We Magnifly brands.</strong></p>
        </div>
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
            ["01 / ABOUT", "Meet the studio.", "Our thinking, our principles, and the five steps from discovery to growth.", "/about", "Explore our approach"],
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
        <div className="brand-service-intro"><h3>One agency. Connected possibilities.</h3><p>Everything your brand needs. Nothing it doesn’t. Strategy, branding, content, shoots, social, influencers, paid media, design, and production—working together with web and app development. One partner, from first idea to final delivery.</p></div>
        <ServiceConstellation />
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
        <p className="home-process-copy">Discover. Strategize. Create. Launch. Scale. We learn your brand, find the opportunity, and make work people care about. Then we measure, improve, and build on what works.</p>
        <Link className="text-link" href="/about#our-process">Explore how we work <UiIcon name="arrow" /></Link>
        <BrandOutcomes />
      </section>
    </main>
  );
}
