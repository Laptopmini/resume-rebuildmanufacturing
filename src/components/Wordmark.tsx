import { WORDMARK_TEXT } from "../lib/content";
import { wordmarkBreathe } from "../lib/motion";

export default function Wordmark() {
  return (
    <div
      data-testid="wordmark"
      className="bg-bgSunken overflow-hidden"
      style={{
        animation:
          "wordmark-breathe " +
          wordmarkBreathe.duration +
          "ms " +
          wordmarkBreathe.easing +
          " infinite",
      }}
    >
      <span className="block text-wordmark font-bold uppercase tracking-[-0.04em] leading-[0.85] text-ink whitespace-nowrap text-center select-none">
        {WORDMARK_TEXT}
      </span>
    </div>
  );
}
