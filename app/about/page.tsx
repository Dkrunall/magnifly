
import UiIcon from "@/components/ui-icon";
import type { Metadata } from "next";
import { services } from "@/lib/content";
import Link from "next/link";
import StudioPageHero from "@/components/studio-page-hero";
import ProcessJourney from "@/components/process-journey";
import PageSections from "@/components/page-sections";
import { BrandManifesto } from "@/components/brand-story";
export const metadata: Metadata = {
  title: "About the studio",
  description:
    "Creative thinking. Clear purpose. Get to know the approach behind MAGNIFLY MEDIA.",
};
export default function About() {
  return (
    <main className="studio-inner-page about-page">
      <StudioPageHero number="01" label="THE STUDIO" first="CLEAR" second="PURPOSE" description="Strategy, identity, and social storytelling. Clear thinking gives our creative the space to take flight." target="#our-belief" action="Explore our approach" />
      <PageSections links={[["Our belief", "#our-belief"], ["Working together", "#working-together"], ["Our process", "#our-process"]]} />
      <section className="section paper about-statement" id="our-belief">
        <span className="eyebrow">What we believe</span>
        <h2>
          Attention is a moment.
          <br />
          Meaning is what stays.
        </h2>
        <div className="copy-columns">
          <p>
            A memorable brand knows what it stands for. It speaks with a
            distinct voice, shows up consistently, and gives people something
            worth caring about.
          </p>
          <p>
            Our work connects the strategic question with the creative answer.
            From positioning to a single social post, each piece should feel
            part of the same idea.
          </p>
        </div>
        <div className="brand-purpose-grid"><article><span className="eyebrow">Our purpose</span><h3>Help ambitious brands rise above the ordinary.</h3></article><article><span className="eyebrow">Our promise</span><h3>Turn potential into presence.</h3><p>We bring confidence, clarity, and momentum to the work, helping your brand show up with a stronger sense of who it is.</p></article></div>
      </section>
      <section className="section" id="working-together">
        <div className="section-title">
          <span className="eyebrow">How we work together</span>
          <h2>
            Good work is
            <br />a shared effort.
          </h2>
        </div>
        <div className="principles studio-principles">
          {[
            [
              "One team. Every step.",
              "The same team thinks, creates, and scales. We stay with your brand from the first brief through the next stage of growth.",
            ],
            [
              "Strategy that reaches production.",
              "Ideas don’t change hands and lose direction. From brief to shoot, the people shaping the concept help bring it to life on set.",
            ],
            [
              "No silos. No agency juggling.",
              "Creative, media, and performance work as one. Shared direction keeps the message consistent across every channel.",
            ],
            [
              "Built under one roof.",
              "One partner connects the disciplines your project needs, with clear responsibilities and useful systems that support your team beyond launch.",
            ],
          ].map(([title, text], i) => (
            <details key={title} name="studio-principle" open={i === 0}>
              <summary><span className="eyebrow">0{i + 1}</span><h3>{title}</h3><span className="principle-toggle" aria-hidden="true"><UiIcon name="plus" /></span></summary>
              <div className="principle-answer"><span className="eyebrow">IN PRACTICE</span><p>{text}</p></div>
            </details>
          ))}
        </div>
        <div className="capabilities">
          <span className="eyebrow">Core capabilities</span>
          <div className="studio-capability-links">{services.map((s, index) => <Link href={`/services#service-${index + 1}`} key={s.name}>{s.name}<span aria-hidden="true"><UiIcon name="arrow" /></span></Link>)}</div>
        </div>
      </section>
      <section className="section paper process" id="our-process">
        <div className="section-title"><span className="eyebrow">FROM FIRST THOUGHT TO FULL FLIGHT</span><h2>A clear way<br />forward.</h2></div>
        <ProcessJourney />
      </section>
      <section className="section brand-partnership"><span className="eyebrow">GOOD COMPANIES KEEP GOOD COMPANY</span><h2>For brands that<br />trust the process.</h2><p>Growing together, one campaign at a time. We work best with ambitious teams who value shared thinking, honest feedback, and steady improvement.</p><Link className="text-link" href="/contact">Build with us <UiIcon name="arrow" /></Link></section>
      <BrandManifesto />
    </main>
  );
}
