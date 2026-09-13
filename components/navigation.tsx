"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
const links = [
  ["Services", "/services"],
  ["Brands", "/brands"],
  ["About", "/about"],
  ["Let’s talk ↗", "/contact"],
];
export default function Navigation() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const path = usePathname();
  const close = () => {
    dialog.current?.close();
    trigger.current?.focus();
  };
  useEffect(() => {
    dialog.current?.close();
  }, [path]);
  useEffect(() => {
    const m = matchMedia("(min-width: 701px)");
    const change = () => {
      if (m.matches) dialog.current?.close();
    };
    m.addEventListener("change", change);
    return () => m.removeEventListener("change", change);
  }, []);
  return (
    <>
      <nav aria-label="Main navigation" className="desktop-nav">
        {links.map(([label, href], i) => (
          <Link
            key={href}
            href={href}
            className={i === 3 ? "nav-cta" : ""}
            aria-current={path === href ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>
      <button
        className="menu-trigger"
        aria-label="Open navigation"
        aria-haspopup="dialog"
        ref={trigger}
        onClick={() => dialog.current?.showModal()}
      >
        <Menu size={24} />
      </button>
      <dialog ref={dialog} className="mobile-menu" aria-label="Navigation">
        <div className="menu-top">
          <span className="eyebrow">MAGNIFLY MEDIA</span>
          <button aria-label="Close navigation" onClick={close} autoFocus>
            <X />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {links.map(([label, href], index) => (
            <Link
              key={href}
              href={href}
              onClick={close}
              aria-current={path === href ? "page" : undefined}
              style={{ animationDelay: `${100 + index * 70}ms` }}
            >
              {label}
            </Link>
          ))}
        </nav>
        <p>Ideas take flight.</p>
      </dialog>
    </>
  );
}
