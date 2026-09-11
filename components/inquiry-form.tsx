"use client";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inquirySchema, type Inquiry } from "@/lib/inquiry";
import { services } from "@/lib/content";
export default function InquiryForm() {
  const [complete, setComplete] = useState(false);
  const status = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inquiry>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { services: [] },
  });
  const error = (key: keyof Inquiry) =>
    errors[key] ? (
      <p className="field-error" id={`${key}-error`} role="alert">
        {errors[key]?.message}
      </p>
    ) : null;
  useEffect(() => {
    if (complete) status.current?.focus();
  }, [complete]);
  async function submit() {
    setComplete(false);
    await new Promise((r) => setTimeout(r, 350));
    setComplete(true);
  }
  return (
    <form noValidate onSubmit={handleSubmit(submit)} className="inquiry-form">
      <div className="demo-note">
        <span className="eyebrow">Demo inquiry form</span>
        <p>
          You can explore the form and validate your brief. Nothing is sent or
          stored.
        </p>
      </div>
      <div className="form-grid">
        {(
          [
            ["name", "Your name", "text", "name"],
            ["email", "Email address", "email", "email"],
            ["company", "Company", "text", "organization"],
            ["website", "Website or social profile (optional)", "url", "url"],
          ] as const
        ).map(([key, label, type, autoComplete]) => (
          <div className="field" key={key}>
            <label htmlFor={key}>{label}</label>
            <input
              id={key}
              type={type}
              autoComplete={autoComplete}
              {...register(key)}
              aria-invalid={!!errors[key]}
              aria-describedby={errors[key] ? `${key}-error` : undefined}
              placeholder={key === "website" ? "https://" : undefined}
            />
            {error(key)}
          </div>
        ))}
      </div>
      <fieldset
        aria-describedby={errors.services ? "services-error" : undefined}
      >
        <legend>What can we help with?</legend>
        <div className="service-options">
          {services.map((s) => (
            <label key={s.name}>
              <input type="checkbox" value={s.name} {...register("services")} />
              <span>{s.name}</span>
            </label>
          ))}
        </div>
        {error("services")}
      </fieldset>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="budget">Budget range (INR)</label>
          <select
            id="budget"
            {...register("budget")}
            aria-invalid={!!errors.budget}
            aria-describedby={errors.budget ? "budget-error" : undefined}
          >
            <option value="">Select a range</option>
            {[
              "Under ₹1 lakh",
              "₹1–3 lakh",
              "₹3–5 lakh",
              "₹5 lakh+",
              "Not sure yet",
            ].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
          {error("budget")}
        </div>
        <div className="field">
          <label htmlFor="timeline">Desired timeline</label>
          <select
            id="timeline"
            {...register("timeline")}
            aria-invalid={!!errors.timeline}
            aria-describedby={errors.timeline ? "timeline-error" : undefined}
          >
            <option value="">Select a timeline</option>
            {[
              "As soon as possible",
              "Within 1–3 months",
              "Within 3–6 months",
              "Just exploring",
            ].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
          {error("timeline")}
        </div>
      </div>
      <div className="field">
        <label htmlFor="description">Tell us about your project</label>
        <textarea
          id="description"
          rows={5}
          {...register("description")}
          aria-invalid={!!errors.description}
          aria-describedby={
            errors.description ? "description-error" : undefined
          }
          placeholder="Your ambition, your challenge, and what a great outcome looks like."
        />
        {error("description")}
      </div>
      <p className="form-hint">
        Budget ranges help frame your brief. They are not service prices.
      </p>
      <button className="button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Checking your brief…" : "Preview inquiry"}{" "}
        <span>↗</span>
      </button>
      <div
        ref={status}
        tabIndex={-1}
        role="status"
        className={complete ? "form-success" : ""}
      >
        {complete && (
          <>
            <strong>Your brief is ready to review.</strong>
            <p>This is a demo. Your inquiry has not been sent or stored.</p>
          </>
        )}
      </div>
    </form>
  );
}
