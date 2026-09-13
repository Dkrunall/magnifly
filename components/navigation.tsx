"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
const links = [
  ["Services", "/services"],
  ["Brands", "/brands"],
  ["About", "/about"],
  ["Let’s talk", "/contact"],
];
export default function Navigation() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(0);
  const previews = [
    { brand: "FORMA", image: "/images/forma.webp", caption: "Less noise. More presence.", slug: "forma" },
    { brand: "ORRA", image: "/images/orra.webp", caption: "A brighter kind of everyday.", slug: "orra" },
    { brand: "DAYBREAK", image: "/images/daybreak.webp", caption: "Make room for morning.", slug: "daybreak" },
  ];
  const project = previews[preview];
  const path = usePathname();
  const current = (href: string) => path.replace(/\/$/, "") === href || (href === "/brands" && path.startsWith("/case-studies/"));
  const close = () => {
    dialog.current?.close();
    setOpen(false);
    trigger.current?.focus();
  };
  useEffect(() => {
    dialog.current?.close();
    setOpen(false);
  }, [path]);
  useEffect(() => {
    const header = trigger.current?.closest("header");
    const update = () => header?.classList.toggle("is-scrolled", window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => { window.removeEventListener("scroll", update); header?.classList.remove("is-scrolled"); };
  }, []);
  const menuIcon = <svg className="menu-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h18" /><path d="M3 16h18" /></svg>;
  return (
    <>
      <div className="header-actions"><Link className="header-contact" href="/contact" aria-current={current("/contact") ? "page" : undefined}><span>Let’s talk</span><ArrowUpRight aria-hidden="true" /></Link>
      <button
        className="menu-trigger"
        aria-label="Open navigation"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="site-navigation-dialog"
        ref={trigger}
        onClick={() => { dialog.current?.showModal(); setOpen(true); }}
      >
        <span>Menu</span>{menuIcon}
      </button>
      </div>
      <dialog ref={dialog} id="site-navigation-dialog" className="mobile-menu modern-menu" aria-label="Navigation" onClose={() => setOpen(false)}>
        <div className="menu-top">
          <span className="eyebrow">MAGNIFLY MEDIA</span>
          <button className="menu-close" aria-label="Close navigation" onClick={close} autoFocus>
            <span>Close</span>{menuIcon}
          </button>
        </div>
        <div className="menu-editorial-grid"><div><span className="eyebrow menu-caption">EXPLORE THE STUDIO</span>
        <nav aria-label="Site navigation">
          <Link href="/" onMouseEnter={() => setPreview(0)} onFocus={() => setPreview(0)} onClick={close} aria-current={path === "/" ? "page" : undefined}><span className="menu-number">00</span><span>Home</span><ArrowUpRight aria-hidden="true" /></Link>
          {links.map(([label, href], index) => (
            <Link
              key={href}
              href={href}
              onClick={close}
              onMouseEnter={() => setPreview((index + 1) % previews.length)}
              onFocus={() => setPreview((index + 1) % previews.length)}
              aria-current={current(href) ? "page" : undefined}
              style={{ animationDelay: `${100 + index * 70}ms` }}
            >
              <span className="menu-number">0{index + 1}</span><span>{label}</span><ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </nav></div>
        <aside className="menu-preview"><span className="eyebrow">A GLIMPSE OF WHAT’S POSSIBLE</span><Link href={`/case-studies/${project.slug}`} onClick={close} className="menu-preview-link"><div className="menu-preview-image" key={project.slug}>{open && <Image src={project.image} alt={`${project.brand} concept campaign`} fill sizes="(max-width:900px) 1px, 40vw" />}</div><div className="menu-preview-caption"><div><span>CONCEPT WORK / {project.brand}</span><strong>{project.caption}</strong></div><ArrowUpRight aria-hidden="true" /></div></Link></aside></div>
        <div className="menu-project"><span className="eyebrow">HAVE SOMETHING IN MIND?</span><Link href="/contact" onClick={close}>Let’s make it happen.<ArrowUpRight aria-hidden="true" /></Link><p>Ideas take flight.</p></div>
      </dialog>
    </>
  );
}
