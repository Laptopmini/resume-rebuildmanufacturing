import { WORDMARK_TEXT } from "../lib/content";
import { wordmarkBreathe } from "../lib/motion";

const CHARS = WORDMARK_TEXT.split("").map((char, i) => ({ char, id: `${char}-${i}` }));

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
        {CHARS.map(({ char, id }, index) => (
          <span
            key={id}
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
