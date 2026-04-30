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
      <div className="flex justify-between items-center w-full leading-[0.85] select-none px-0">
        {WORDMARK_TEXT.split("").map((char, index) => (
          <span
            key={char}
            data-testid={`wordmark-char-${index}`}
            className="font-bold uppercase text-wordmark text-ink"
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
