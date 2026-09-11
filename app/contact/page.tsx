import type { Metadata } from "next";
import InquiryForm from "@/components/inquiry-form";
export const metadata: Metadata = {
  title: "Start a project",
  description: "Tell us about your next brand, social, or creative project.",
};
export default function Contact() {
  return (
    <main>
      <section className="section page-heading contact-heading">
        <span className="eyebrow">Your next chapter starts here</span>
        <h1>
          Let’s give your
          <br />
          <span className="outline">next idea wings.</span>
        </h1>
        <p>
          A new brand, a fresh direction, or a bigger ambition. Tell us what you
          have in mind.
        </p>
      </section>
      <section className="section contact-section">
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
        </aside>
        <InquiryForm />
      </section>
    </main>
  );
}
