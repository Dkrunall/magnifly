import type { Metadata } from "next";
import { CTA } from "@/components/shared";
import { services } from "@/lib/content";
export const metadata: Metadata = {
  title: "About the studio",
  description:
    "Creative thinking. Clear purpose. Get to know the approach behind MAGNIFLY MEDIA.",
};
export default function About() {
  return (
    <main>
      <section className="page-heading section">
        <span className="eyebrow">The studio / Our point of view</span>
        <h1>
          Creative thinking.
          <br />
          <span className="outline">Clear purpose.</span>
        </h1>
        <p>
          MAGNIFLY MEDIA connects brand strategy, visual identity, and social
          storytelling. We make the thinking clear so the creative can go
          further.
        </p>
      </section>
      <section className="section paper about-statement">
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
      <section className="section">
        <div className="section-title">
          <span className="eyebrow">How we work together</span>
          <h2>
            Good work is
            <br />a shared effort.
          </h2>
        </div>
        <div className="principles">
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
            <article key={title}>
              <span className="eyebrow">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="capabilities">
          <span className="eyebrow">Core capabilities</span>
          <p>{services.map((s) => s.name).join(" / ")}</p>
        </div>
      </section>
      <CTA />
    </main>
  );
}
