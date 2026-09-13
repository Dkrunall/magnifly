"use client";
import UiIcon from "@/components/ui-icon";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
const Scene = dynamic(() => import("./plane-scene"), { ssr: false });
class SceneBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export default function HeroPlane() {
  const [enabled, setEnabled] = useState(false),
    [ready, setReady] = useState(false),
    [active, setActive] = useState(true);
  const root = useRef<HTMLDivElement>(null),
    pointer = useRef({ x: 0, y: 0 }),
    reduced = useRef(true);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const update = () => {
      reduced.current = media.matches;
      if (media.matches || connection?.saveData) {
        setEnabled(false);
        setReady(false);
        return;
      }
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2");
      setEnabled(!!gl && (navigator.hardwareConcurrency || 4) > 2);
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    };
    update();
    media.addEventListener("change", update);
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      setActive(visible && !document.hidden);
    });
    if (root.current) observer.observe(root.current);
    const visibility = () => setActive(visible && !document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  const fail = () => {
    setEnabled(false);
    setReady(false);
  };
  return (
    <div
      ref={root}
      className="plane-stage plane-stage-v2"
      data-ready={ready}
      onPointerMove={(e) => {
        if (reduced.current) return;
        const r = e.currentTarget.getBoundingClientRect();
        pointer.current = {
          x: ((e.clientX - r.left) / r.width) * 2 - 1,
          y: 1 - ((e.clientY - r.top) / r.height) * 2,
        };
        root.current?.style.setProperty(
          "--pointer-x",
          `${pointer.current.x * 9}deg`,
        );
        root.current?.style.setProperty(
          "--pointer-y",
          `${-pointer.current.y * 7}deg`,
        );
      }}
      onPointerLeave={() => {
        pointer.current = { x: 0, y: 0 };
        root.current?.style.setProperty("--pointer-x", "0deg");
        root.current?.style.setProperty("--pointer-y", "0deg");
      }}
    >
      <div className="orbit-system" aria-hidden="true">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <span className="orbit-mark"><UiIcon name="plus" /></span>
        <span className="orbit-mark orbit-mark-two"><UiIcon name="plus" /></span>
        <div className="orbit-origin" />
      </div>
      <div className="plane-flight" aria-hidden="true">
        <svg className="static-plane" viewBox="0 0 600 440">
          <defs>
            <linearGradient id="paper-fold">
              <stop stopColor="#fffef8" />
              <stop offset="1" stopColor="#d2d3c7" />
            </linearGradient>
            <linearGradient id="paper-wing" x2="0" y2="1">
              <stop stopColor="#f7f7ec" />
              <stop offset="1" stopColor="#a5a799" />
            </linearGradient>
          </defs>
          <polygon points="48,240 550,76 215,278" fill="url(#paper-fold)" />
          <polygon points="215,278 550,76 277,373" fill="#666a5a" />
          <polygon points="277,373 550,76 318,266" fill="url(#paper-wing)" />
          <polygon points="318,266 550,76 477,326" fill="url(#paper-fold)" />
          <path d="M437 290L469 305" stroke="#d6ff3f" strokeWidth="9" />
          <path
            d="M48 240L550 76L477 326"
            stroke="#fff"
            strokeOpacity=".4"
            fill="none"
          />
        </svg>
        {enabled && (
          <SceneBoundary onFailure={fail}>
            <div className="canvas-wrap">
              <Scene
                active={active}
                pointer={pointer}
                spin={0}
                onReady={() => setReady(true)}
                onFailure={fail}
              />
            </div>
          </SceneBoundary>
        )}
      </div>
      <span className="plane-index eyebrow" aria-hidden="true">
        MM—01 / THE NEXT DIRECTION
      </span>
    </div>
  );
}
