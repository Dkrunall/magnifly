# MAGNIFLY MEDIA

A responsive creative-agency website built with Next.js App Router, TypeScript, Tailwind CSS, GSAP, React Three Fiber, Drei, React Hook Form, Zod, and Lucide.

## Run locally

Requires Node.js 22 and npm. From this directory:

```sh
npm ci
npm run dev -- --port 3012
```

Open http://localhost:3012. If that port is already used by this project, reuse the running server. Pick a different port for a separate project.

## Production

```sh
npm run build
npm run typecheck
npm run lint
npm run verify
npm start -- --port 3100
```

The production preview opens at http://127.0.0.1:3100. `next build` creates a static export in `out/`. Deploy that directory to a static host with directory-index support and the generated `404.html` as the not-found page. `npm start` serves the export; it does not invoke `next start`, which does not support static exports.

## Pages and content

- Home, services, brands, about, and contact.
- Six complete case-study routes generated from `lib/content.ts`.
- Six service categories with deliverables and FAQs.
- Portfolio category filters, project hover interactions, and a responsive native-dialog menu.
- Original supplied transparent logo, three generated campaign images, and typographic concept artwork.

Edit project descriptions, services, case-study narratives, and intended success measures in `lib/content.ts`. Add new images to `public/images/`. All portfolio entries are fictional **Concept Work**; no client relationships, results, or testimonials are implied.

`app/globals.css` contains the structural styles; `app/modern.css` contains the final editorial design and interaction styling. Typography uses open-source Space Grotesk, Manrope, and IBM Plex Mono through `next/font`. Google font files are downloaded at build time and self-hosted in the output.

## 3D and motion

The hero uses one dynamically imported WebGL canvas with lightweight procedural folded-paper geometry. Pointer movement adjusts its orientation; the accessible “Give it a spin” button also works with the keyboard. Rendering stops while the hero is offscreen or the document is hidden. Pixel ratio is capped at 1.5.

A static decorative plane is rendered before JavaScript and remains available if WebGL fails, reduced motion is requested, data saving is enabled, or the device has limited concurrency. Reduced motion also disables continuous movement, reveal animation, parallax, custom hover cursors, and smooth scrolling. The decorative plane is separate from the original brand logo.

GSAP owns coordinated reveals and the localized flight transition; CSS handles small interface transitions. Animation cleanup runs on route changes. Reading and navigation remain usable without animation.

## Inquiry form

The form is deliberately a **demo**. It validates fields with React Hook Form and Zod, then displays “Your inquiry has not been sent or stored.” It makes no submission request and does not persist personal information. Budget ranges are briefing options, not agency prices.

Before accepting real inquiries, configure a submission service, add server-side schema validation, rate limiting and spam protection, and a suitable privacy notice. Replace the demo confirmation only after confirmed delivery. A Next.js server endpoint requires removing `output: 'export'` and deploying a supported server runtime; alternatively use a separately hosted, validated submission service. Never place mail/API secrets in client code.

## Metadata and assets

The supplied PNG logo retains its 1600 × 243 aspect ratio and transparency. It is not a vector conversion. Campaign images are optimized WebP files. `public/og.png` is the social-sharing preview. Set `metadataBase` in `app/layout.tsx` if the deployment origin changes. Case studies set project-specific titles and descriptions.

## Verification

`npm run verify` checks generated HTML for missing local links and image/script/font assets. Browser checks cover the hero spin, portfolio filters, invalid/valid demo form behavior, mobile navigation and Escape focus restoration. Desktop and 390px mobile layouts are reviewed separately. The build and lint commands are the authoritative checks after any future changes.

Useful API references: [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports), [React Three Fiber Canvas](https://r3f.docs.pmnd.rs/api/canvas), [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [React Hook Form](https://react-hook-form.com/docs/useform), and [Zod](https://zod.dev/).
