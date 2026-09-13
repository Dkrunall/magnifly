"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
export default function Intro() {
  const dialog = useRef<HTMLDialogElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [leaving, setLeaving] = useState(false);
  const finish = useCallback(() => {
    clearTimeout(timer.current);
    dialog.current?.close();
    window.dispatchEvent(new Event("magnifly-intro-finished"));
    try { sessionStorage.setItem("magnifly-intro-seen", "1"); } catch {}
  }, []);
  const launch = useCallback(() => {
    clearTimeout(timer.current);
    setLeaving(true);
    timer.current = setTimeout(finish, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 650);
  }, [finish]);
  useEffect(() => {
    const open = () => {
      clearTimeout(timer.current);
      setLeaving(false);
      dialog.current?.style.setProperty("--aim", "0deg");
      dialog.current?.showModal();
      timer.current = setTimeout(launch, 2950);
    };
    let seen = false;
    try { seen = sessionStorage.getItem("magnifly-intro-seen") === "1"; } catch {}
    if (!seen && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) open();
    window.addEventListener("replay-intro", open);
    return () => { clearTimeout(timer.current); window.removeEventListener("replay-intro", open); };
  }, [launch]);
  return <dialog ref={dialog} className={`flight-intro ${leaving ? "is-launching" : ""}`} aria-labelledby="intro-title" onCancel={finish} onPointerMove={(event) => { const angle = (event.clientX / window.innerWidth - .5) * 24; dialog.current?.style.setProperty("--aim", `${angle}deg`); }}>
    <div className="intro-top"><span className="eyebrow">MAGNIFLY MEDIA / DEPARTURE 001</span><button onClick={finish} aria-label="Skip intro">Skip intro <X size={16} /></button></div>
    <div className="intro-center"><span className="eyebrow">A new perspective starts here</span><h2 id="intro-title">Ideas take <em>flight.</em></h2><button className="launch-plane" onClick={launch} aria-label="Launch paper plane and enter site"><svg viewBox="0 0 320 220" aria-hidden="true"><path d="M20 108 302 14 131 142Z" fill="#f5f3ee"/><path d="M131 142 302 14 169 204Z" fill="#aaa99f"/><path d="m169 204 28-67 105-123Z" fill="#d6ff3f"/><path d="M197 137 302 14 264 170Z" fill="#f5f3ee"/></svg></button><p>Move to steer. Click to launch.</p></div>
    <div className="intro-bottom eyebrow"><span>Big ideas. Bigger impact.</span><span>Opening the studio…</span></div><div className="intro-track" aria-hidden="true" />
  </dialog>;
}
