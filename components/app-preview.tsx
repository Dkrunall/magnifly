"use client";
import UiIcon from "@/components/ui-icon";

import { useState } from "react";
import Image from "next/image";
const products = [
  { name: "The daily cleanse", detail: "A fresh start for your daily ritual. Concept packaging in ORRA’s signature citrus and cobalt.", type: "01 / CLEANSE" },
  { name: "The everyday hydrate", detail: "A simple second step. A companion concept designed around an uncomplicated daily routine.", type: "02 / HYDRATE" },
];
export default function AppPreview() {
  const [view, setView] = useState<"shop" | "detail" | "bag">("shop");
  const [selected, setSelected] = useState(0);
  const [bag, setBag] = useState<number[]>([]);
  const [message, setMessage] = useState("");
  return <div className="shop-demo demo-app">
    <header><strong>ORRA</strong><button onClick={() => { setView("bag"); setMessage(""); }} aria-label={`Open demo bag, ${bag.length} items`}>Bag ({bag.length})</button></header>
    <div className="shop-demo-body">
    {view === "shop" && <><span className="eyebrow">THE EVERYDAY COLLECTION</span><h3>A brighter<br />kind of daily.</h3><div className="shop-demo-image"><Image src="/images/orra.webp" alt="ORRA skincare concept collection" fill sizes="(max-width:700px) 80vw, 350px" /></div><div className="shop-demo-products">{products.map((product,index) => <button key={product.name} onClick={() => { setSelected(index); setView("detail"); setMessage(""); }}><span>{product.type}</span><strong>{product.name}</strong><span>Explore <UiIcon name="arrow" /></span></button>)}</div></>}
    {view === "detail" && <><button className="shop-demo-back" onClick={() => setView("shop")}><UiIcon name="left" /> Collection</button><div className="shop-demo-image"><Image src="/images/orra.webp" alt="ORRA concept packaging" fill sizes="(max-width:700px) 80vw, 350px" /></div><span className="eyebrow">{products[selected].type}</span><h3>{products[selected].name}</h3><p>{products[selected].detail}</p><button className="shop-demo-primary" onClick={() => { setBag(items => [...items, selected]); setMessage("Added to your demo bag."); }}>Add to demo bag <UiIcon name="plus" /></button></>}
    {view === "bag" && <><button className="shop-demo-back" onClick={() => { setView("shop"); setMessage(""); }}><UiIcon name="left" /> Keep exploring</button><h3>Your daily<br />bright side.</h3>{bag.length ? <><ul className="shop-demo-bag">{products.map((product,index) => { const quantity=bag.filter(item => item === index).length; return quantity ? <li key={product.name}><strong>{product.name}</strong><span>Quantity: {quantity}</span><button aria-label={`Remove one ${product.name}`} onClick={() => { setBag(items => { const next=[...items]; next.splice(next.indexOf(index),1); return next; }); setMessage(""); }}>Remove <UiIcon name="minus" /></button></li> : null; })}</ul><button className="shop-demo-primary" onClick={() => setMessage("Demo complete. No order was placed and no payment is required.")}>Preview checkout <UiIcon name="arrow" /></button></> : <div className="shop-demo-empty"><p>Your bag is waiting for a little sunshine.</p><button className="shop-demo-primary" onClick={() => setView("shop")}>Explore the collection <UiIcon name="arrow" /></button></div>}</>}
    <p className="shop-demo-status" role="status">{message}</p>
    </div><footer>Interactive prototype · No real orders or payments</footer>
  </div>;
}
