import type { Metadata } from "next";
import Portfolio from "@/components/portfolio";
import { CTA } from "@/components/shared";
export const metadata: Metadata = {
  title: "Brands & selected work",
  description:
    "Six concept brands. Six distinct points of view. Explore our approach to branding, social content, and campaigns.",
};
export default function Brands() {
  return (
    <main>
      <section className="page-heading section">
        <span className="eyebrow">
          The work / An exploration of possibility
        </span>
        <h1>
          Distinct brands.
          <br />
          <span className="outline">Work with direction.</span>
        </h1>
        <p>
          Different worlds. One belief: the strongest creative starts with a
          clear idea.
        </p>
      </section>
      <section className="section portfolio-section">
        <div className="section-note">
          <span className="eyebrow">Selected concepts</span>
          <p>
            All projects below are fictional Concept Work, created to
            demonstrate our approach. They are not client commissions.
          </p>
        </div>
        <Portfolio />
      </section>
      <CTA />
    </main>
  );
}
