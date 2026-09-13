
import UiIcon from "@/components/ui-icon";
import type { Metadata } from "next";
import Link from "next/link";
import { services, projects } from "@/lib/content";
import { CTA, ProjectArt } from "@/components/shared";
import ServiceNavigation from "@/components/service-navigation";
import StudioPageHero from "@/components/studio-page-hero";
import RedesignPreview from "@/components/redesign-preview";
import CampaignBuilder from "@/components/campaign-builder";
import PageSections from "@/components/page-sections";
import DevelopmentArt from "@/components/development-art";
export const metadata: Metadata = {
  title: "Services",
  description:
    "Brand strategy, visual identity, social media, content production, influencer campaigns, and paid social.",
};
const faqs = [
  [
    "How long does a project take?",
    "Timing depends on scope, production needs, and review rounds. We agree on a realistic schedule after discovery, with clear milestones and responsibilities.",
  ],
  [
    "What happens during onboarding?",
    "We begin with a conversation about your business, audience, and goals. We review existing assets, gather relevant access, and agree on the brief and ways of working.",
  ],
  [
    "How do feedback and approvals work?",
    "We set review points and consolidate feedback through a nominated point of contact. The scope defines revision rounds so decisions stay focused and transparent.",
  ],
  [
    "How will we communicate?",
    "We agree on a communication channel and meeting rhythm during onboarding. You will know who to contact, what is in progress, and when a decision is needed.",
  ],
  [
    "How do you report on performance?",
    "We define meaningful measures before launch and report against them. For ongoing work, audience and campaign findings inform the next content and testing cycle.",
  ],
];
export default function Services() {
  return (
    <main className="studio-inner-page services-page">
      <StudioPageHero number="03" label="OUR CAPABILITIES" first="IDEAS INTO" second="IMPACT" description="Brand, social, web, and app experiences. Eight connected disciplines, shaped around your next move." target="#service-1" action="Explore our services" />
      <PageSections links={[["Capabilities", "#service-1"], ["Try our approach", "#service-demos"], ["Ways to work together", "#engagements"], ["FAQs", "#questions"]]} />
      <div className="service-details">
        <ServiceNavigation />
        {services.map((s, i) => (
          <section
            className={`section service-detail ${i % 2 === 0 ? "paper" : ""}`}
            id={`service-${i + 1}`}
            key={s.name}
          >
            <div>
              <span className="eyebrow">
                0{i + 1} / {s.name}
              </span>
              <h2>{s.short}</h2>
              <p>{s.problem}</p>
              <p>{s.approach}</p>
              <h3 className="deliverable-title">What we can deliver</h3>
              <ul>
                {s.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <Link className="text-link" href={`/contact?service=${encodeURIComponent(s.name)}`}>
                Let’s talk about {s.name.toLowerCase()} <UiIcon name="arrow" />
              </Link>
            </div>
            <div>
              {projects[i] ? <ProjectArt project={projects[i]} /> : <DevelopmentArt app={i === 7} />}
              <p className="visual-caption">
                {projects[i] ? `${projects[i].brand} — ${projects[i].industry} concept exploration` : "From prototype to launch, shaped around your users."}
              </p>
            </div>
          </section>
        ))}
      </div>
      <div id="service-demos"><RedesignPreview /><CampaignBuilder /></div>
      <section className="section" id="engagements">
        <div className="section-title">
          <span className="eyebrow">Ways to work together</span>
          <h2>
            The right shape
            <br />
            for your ambition.
          </h2>
        </div>
        <div className="engagements">
          {[
            [
              "Launch",
              "Build a strong beginning.",
              "Brand foundations, identity, and a launch campaign that bring your next chapter into focus.",
            ],
            [
              "Grow",
              "Show up with purpose.",
              "Ongoing social content, community management, and a clear rhythm of learning and improvement.",
            ],
            [
              "Partner",
              "Move forward, together.",
              "Integrated strategy, creative, and campaign support across the moments that matter for your brand.",
            ],
          ].map(([title, sub, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <strong>{sub}</strong>
              <p>{text}</p>
              <Link className="text-link" href="/contact">
                Discuss your project <UiIcon name="arrow" />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="section paper faq" id="questions">
        <span className="eyebrow">Before we begin</span>
        <h2>A few good questions.</h2>
        {faqs.map(([q, a]) => (
          <details key={q} name="services-faq">
            <summary>
              {q}
              <span aria-hidden="true"><UiIcon name="plus" /></span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
      <CTA />
    </main>
  );
}
