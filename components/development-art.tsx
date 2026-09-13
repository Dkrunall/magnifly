
import UiIcon from "@/components/ui-icon";
export default function DevelopmentArt({ app = false }: { app?: boolean }) {
  return <div className="development-art"><span className="eyebrow">{app ? "APP / EXPERIENCE" : "WEB / EXPERIENCE"}</span><div className="development-frame"><span>DESIGNED AROUND PEOPLE</span><strong>{app ? "Less friction. More flow." : "Your next digital chapter."}</strong><div>Discover <UiIcon name="right" /> Explore <UiIcon name="right" /> Connect</div></div><p>Illustrative interface direction</p></div>;
}
