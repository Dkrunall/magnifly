// Lightweight fallback for initial rendering and reduced-motion visitors.
export default function HeroPlane() {
  return <div className="plane-stage plane-stage-v2" data-ready="false"><div className="plane-flight" aria-hidden="true"><svg className="static-plane" viewBox="0 0 600 440" focusable="false">
    <polygon points="48,240 550,76 215,278" fill="#f5f3ee" />
    <polygon points="215,278 550,76 277,373" fill="#747967" />
    <polygon points="277,373 550,76 318,266" fill="#c2c6b5" />
    <polygon points="318,266 550,76 477,326" fill="#f5f3ee" />
    <path d="M437 290L469 305" stroke="#d6ff3f" strokeWidth="9" />
  </svg></div></div>;
}
