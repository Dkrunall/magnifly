import type { Metadata } from "next";
import InquiryForm from "@/components/inquiry-form";
import StudioPageHero from "@/components/studio-page-hero";
export const metadata: Metadata = {
  title: "Start a project",
  description: "Tell us about your next brand, social, or creative project.",
};
export default function Contact() {
  return (
    <main className="studio-inner-page contact-page">
      <StudioPageHero number="04" label="START A CONVERSATION" first="NEXT" second="CHAPTER" description="A new brand. A fresh direction. A bigger ambition. Tell us where you want to go, and we’ll explore what comes next." target="#project-brief" action="Start your project brief" />
      <section className="section contact-section" id="project-brief">
        <aside>
          <span className="eyebrow">A little context goes a long way</span>
          <h2>
            Big plans.
            <br />
            Small first step.
          </h2>
          <p>
            Share where you are, where you want to go, and what’s standing in
            the way. You don’t need to have every answer yet.
          </p>
          <div className="contact-guide"><span className="eyebrow">YOUR BRIEF, IN THREE PARTS</span><ol><li><span>01</span>A little about you</li><li><span>02</span>What you need</li><li><span>03</span>Where you want to go</li></ol></div>
        </aside>
        <InquiryForm />
      </section>
    </main>
  );
}
