import { ArrowUpRight, ArrowDown, ArrowLeft, ArrowRight, ArrowLeftRight, RotateCcw, RotateCw, Check, Plus, Minus, Play, Pause } from "lucide-react";
const icons = { arrow: ArrowUpRight, down: ArrowDown, left: ArrowLeft, right: ArrowRight, exchange: ArrowLeftRight, reset: RotateCcw, replay: RotateCw, check: Check, plus: Plus, minus: Minus, play: Play, pause: Pause };
export default function UiIcon({ name }: { name: keyof typeof icons }) {
  const Icon = icons[name];
  return <Icon className="ui-icon" aria-hidden="true" focusable="false" strokeWidth={1.75} />;
}
