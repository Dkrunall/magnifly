"use client";
import UiIcon from "@/components/ui-icon";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inquirySchema, type Inquiry } from "@/lib/inquiry";
import { services, serviceGroups } from "@/lib/content";
export default function InquiryForm() {
  const [complete, setComplete] = useState(false);
  const [deliveryError, setDeliveryError] = useState("");
  const status = useRef<HTMLDivElement>(null);
  const failure = useRef<HTMLParagraphElement>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inquiry>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { services: [] },
  });
  const selectedServices = watch("services") || [];
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("service");
    const aliases: Record<string, string> = { "Paid Social": "Performance Marketing", "Visual Identity": "Branding & Design", "Content Production": "Production & Photography" };
    const chosen = requested ? aliases[requested] || requested : null;
    if (chosen && services.some(service => service.name === chosen)) {
      setValue("services", [chosen]);
    }
  }, [setValue]);
  const error = (key: keyof Inquiry) =>
    errors[key] ? (
      <p className="field-error" id={`${key}-error`} role="alert">
        {errors[key]?.message}
      </p>
    ) : null;
  useEffect(() => {
    if (complete) status.current?.focus();
  }, [complete]);
  useEffect(() => { if (deliveryError) failure.current?.focus(); }, [deliveryError]);
  async function submit(data: Inquiry) {
    setComplete(false);
    setDeliveryError("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data), signal: AbortSignal.timeout(25000) });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.message || "Unable to send your inquiry. Please try again.");
      }
      setComplete(true);
    } catch (error) { setDeliveryError(error instanceof Error && error.name !== "TimeoutError" ? error.message : "Delivery could not be confirmed. Please wait before retrying."); }
  }
  return (
    <form noValidate onSubmit={handleSubmit(submit)} className="inquiry-form" aria-busy={isSubmitting}>
      <div className="demo-note">
        <span className="eyebrow">Your project brief</span>
        <p>
          Send your brief to the studio. We’ll use these details to respond to your inquiry.
        </p>
      </div>
      <div className="brief-direction" aria-live="polite">
        <span className="eyebrow">YOUR NEXT MOVE</span>
        <strong>{selectedServices.length ? selectedServices.join(" + ") : "Let’s find your direction."}</strong>
        <p>{selectedServices.length ? "Your choice is included below. You can add or change services as you go." : "Tell us a little about yourself and the idea you have in mind."}</p>
      </div>
      <h3 className="brief-step-title"><span>01 /</span> A little about you</h3>
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
              required={key !== "website"}
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
        <legend className="brief-step-title"><span>02 /</span> What can we help with?</legend>
        <div className="inquiry-service-groups">
          {serviceGroups.map((group,index) => <div role="group" aria-labelledby={`inquiry-group-${index}`} key={group.name}><h4 id={`inquiry-group-${index}`}>{group.name}</h4><div className="service-options">
          {services.slice(group.start, group.end).map((s) => (
            <label key={s.name}>
              <input type="checkbox" value={s.name} {...register("services")} />
              <span>{s.name}</span>
            </label>
          ))}</div></div>)}
        </div>
        {error("services")}
      </fieldset>
      <h3 className="brief-step-title"><span>03 /</span> Where you want to go</h3>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="budget">Budget range (INR)</label>
          <select
            id="budget"
            required
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
            required
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
          required
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
        {isSubmitting ? "Sending your inquiry…" : "Send inquiry"}{" "}
        <span><UiIcon name="arrow" /></span>
      </button>
      {deliveryError && <p ref={failure} tabIndex={-1} role="alert" className="field-error">{deliveryError}</p>}
      <div
        ref={status}
        tabIndex={-1}
        role="status"
        className={complete ? "form-success" : ""}
      >
        {complete && (
          <>
            <strong>Your inquiry has been submitted.</strong>
            <p>Our mail server accepted your brief. Thank you for sharing your project.</p>
          </>
        )}
      </div>
    </form>
  );
}
