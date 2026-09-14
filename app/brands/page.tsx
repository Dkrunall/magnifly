import type { Metadata } from "next";
import Portfolio from "@/components/portfolio";
import StudioPageHero from "@/components/studio-page-hero";
import BrandPlayground from "@/components/brand-playground";
import ReelShowcase from "@/components/reel-showcase";
import PageSections from "@/components/page-sections";
export const metadata: Metadata = {
  title: "Brands & selected work",
  description:
    "Six concept brands. Six distinct points of view. Explore our approach to branding, social content, and campaigns.",
};
export default function Brands() {
  return (
    <main className="studio-inner-page brands-page">
      <StudioPageHero number="02" label="SELECTED WORK" first="MADE TO" second="STAND OUT" description="Different worlds. One clear idea. Explore six concept brands built to make their presence felt." target="#selected-projects" action="Explore selected projects" />
      <PageSections links={[["Selected projects", "#selected-projects"], ["Social, web & app demos", "#brand-playground"], ["Reel showcase", "#reel-showcase"]]} />
      <section className="section portfolio-section" id="selected-projects">
        <div className="section-note">
          <span className="eyebrow">Selected concepts</span>
          <p>
            All projects below are fictional Concept Work, created to
            demonstrate our approach. They are not client commissions.
          </p>
        </div>
        <Portfolio />
      </section>
      <BrandPlayground />
      <ReelShowcase />
    </main>
  );
}
