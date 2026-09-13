import type { Metadata } from "next";
import { CTA } from "@/components/shared";
import { services } from "@/lib/content";
import Link from "next/link";
import StudioPageHero from "@/components/studio-page-hero";
import ProcessJourney from "@/components/process-journey";
import PageSections from "@/components/page-sections";
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
              "Clarity before complexity",
              "We agree on the problem, audience, and desired outcome before exploring solutions.",
            ],
            [
              "Honest collaboration",
              "We make space for questions, explain our decisions, and use focused feedback to move the work forward.",
            ],
            [
              "One connected idea",
              "Strategy, design, production, and distribution inform each other from the start.",
            ],
            [
              "A useful handover",
              "We create systems and guidance that help the work keep going beyond the launch.",
            ],
          ].map(([title, text], i) => (
            <details key={title} name="studio-principle" open={i === 0}>
              <summary><span className="eyebrow">0{i + 1}</span><h3>{title}</h3><span className="principle-toggle" aria-hidden="true">+</span></summary>
              <div className="principle-answer"><span className="eyebrow">IN PRACTICE</span><p>{text}</p></div>
            </details>
          ))}
        </div>
        <div className="capabilities">
          <span className="eyebrow">Core capabilities</span>
          <div className="studio-capability-links">{services.map((s, index) => <Link href={`/services#service-${index + 1}`} key={s.name}>{s.name}<span aria-hidden="true">↗</span></Link>)}</div>
        </div>
      </section>
      <section className="section paper process" id="our-process">
        <div className="section-title"><span className="eyebrow">FROM FIRST THOUGHT TO FULL FLIGHT</span><h2>A clear way<br />forward.</h2></div>
        <ProcessJourney />
      </section>
      <CTA />
    </main>
  );
}
