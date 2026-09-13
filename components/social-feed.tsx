"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { Heart, Bookmark, ArrowLeft, ArrowRight } from "lucide-react";
const stories = [
  { title: "Your daily bright side.", caption: "A little sunshine for your everyday. Meet the ORRA concept collection.", slides: ["photo", "A brighter kind of everyday.", "Keep your ritual simple."] },
  { title: "Less routine. More ritual.", caption: "Make a little room for yourself. Small moments deserve good design.", slides: ["Less routine. More ritual.", "Pause. Reset. Begin again.", "photo"] },
  { title: "A colour worth remembering.", caption: "Citrus meets cobalt. A visual identity built to stand out in the feed.", slides: ["CITRUS + COBALT", "photo", "A fresh point of view."] },
];
export default function SocialFeed() {
  const touch = useRef<{x: number; y: number} | null>(null);
  const [selected, setSelected] = useState(0), [slide, setSlide] = useState(0);
  const [saved, setSaved] = useState<number[]>([]), [liked, setLiked] = useState<number[]>([]);
  const [onlySaved, setOnlySaved] = useState(false);
  const visible = stories.map((story, id) => ({ ...story, id })).filter(story => !onlySaved || saved.includes(story.id));
  const current = visible.find(story => story.id === selected) ?? visible[0];
  const toggle = (items: number[], id: number) => items.includes(id) ? items.filter(item => item !== id) : [...items, id];
  const pick = (id: number) => { setSelected(id); setSlide(0); };
  return <div className="interactive-feed" tabIndex={0} aria-label="Interactive social feed. Use left and right arrow keys to change carousel slides."
    onKeyDown={event => { if (event.target !== event.currentTarget || !current) return; if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); setSlide(value => (value + (event.key === "ArrowRight" ? 1 : 2)) % 3); } }}
    onTouchStart={event => { if (!(event.target instanceof Element) || !event.target.closest(".demo-post")) return; const point = event.touches[0]; touch.current = {x: point.clientX, y: point.clientY}; }}
    onTouchCancel={() => { touch.current = null; }}
    onTouchEnd={event => { const start = touch.current; touch.current = null; if (!start || !current) return; const point = event.changedTouches[0]; const dx = point.clientX - start.x, dy = point.clientY - start.y; if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) setSlide(value => (value + (dx < 0 ? 1 : 2)) % 3); }}>
    <div className="feed-profile"><strong>orra<span>®</span></strong><div><b>Everyday, brighter.</b><p>A concept feed by MAGNIFLY MEDIA.</p></div></div>
    <div className="feed-filters" role="group" aria-label="Social feed filter"><button aria-pressed={!onlySaved} onClick={() => { setOnlySaved(false); setSlide(0); }}>All posts</button><button aria-pressed={onlySaved} onClick={() => { setOnlySaved(true); setSlide(0); }}>Saved ({saved.length})</button></div>
    {current ? <div className="feed-layout"><div className="feed-post-list" role="group" aria-label="Choose a post">{visible.map(story => <button key={story.id} onClick={() => pick(story.id)} aria-pressed={current.id === story.id}><span>0{story.id + 1} / CAROUSEL</span><strong>{story.title}</strong><span>Explore ↗</span></button>)}</div>
      <article className="demo-social feed-active-post"><header><strong>orra</strong><span>Concept campaign</span></header><div className="demo-post" aria-live="polite">{current.slides[slide] === "photo" ? <Image src="/images/orra.webp" alt="ORRA citrus and cobalt skincare concept campaign" fill sizes="(max-width:700px) 85vw, 400px" /> : <div className={`demo-post-type post-${(current.id + slide) % 2 + 1}`}><span>ORRA / DAILY NOTES</span><strong>{current.slides[slide]}</strong><span>YOUR DAILY BRIGHT SIDE ↗</span></div>}<span className="demo-post-count">{slide + 1} / 3</span></div>
      <div className="feed-carousel-controls"><button aria-label="Previous slide" onClick={() => setSlide((slide + 2) % 3)}><ArrowLeft size={18}/></button><div className="demo-post-dots">{current.slides.map((_, index) => <button key={index} aria-label={`Show slide ${index + 1}`} aria-pressed={slide === index} onClick={() => setSlide(index)}/>)}</div><button aria-label="Next slide" onClick={() => setSlide((slide + 1) % 3)}><ArrowRight size={18}/></button></div>
      <div className="feed-actions"><button aria-pressed={liked.includes(current.id)} onClick={() => setLiked(items => toggle(items, current.id))}><Heart size={20} fill={liked.includes(current.id) ? "currentColor" : "none"}/>{liked.includes(current.id) ? "Liked" : "Like"}</button><button aria-pressed={saved.includes(current.id)} onClick={() => setSaved(items => toggle(items, current.id))}><Bookmark size={20} fill={saved.includes(current.id) ? "currentColor" : "none"}/>{saved.includes(current.id) ? "Saved" : "Save"}</button></div><p><strong>orra</strong> {current.caption}</p></article>
    </div> : <div className="feed-empty" role="status"><Bookmark size={32}/><h4>Your moodboard starts here.</h4><p>Save a post to collect it in this view.</p><button onClick={() => setOnlySaved(false)}>Explore the feed ↗</button></div>}
    <p className="feed-local-note">Explore freely. Likes and saves stay in this preview only.</p>
  </div>;
}
