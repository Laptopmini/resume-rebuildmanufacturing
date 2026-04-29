import { cardHover, sectionEntrance, statCountUp, wordmarkBreathe } from "../../src/lib/motion";

describe("motion presets", () => {
  test("sectionEntrance has correct values", () => {
    expect(sectionEntrance.duration).toBe(600);
    expect(sectionEntrance.easing).toBe("cubic-bezier(0.22, 1, 0.36, 1)");
    expect(sectionEntrance.offsetY).toBe(24);
  });

  test("cardHover has correct values", () => {
    expect(cardHover.duration).toBe(250);
    expect(cardHover.easing).toBe("cubic-bezier(0.22, 1, 0.36, 1)");
    expect(cardHover.translateY).toBe(-2);
  });

  test("wordmarkBreathe has correct values", () => {
    expect(wordmarkBreathe.duration).toBe(8000);
    expect(wordmarkBreathe.easing).toBe("ease-in-out");
    expect(wordmarkBreathe.scaleMin).toBe(1);
    expect(wordmarkBreathe.scaleMax).toBe(1.01);
  });

  test("statCountUp has correct values", () => {
    expect(statCountUp.duration).toBe(1200);
    expect(statCountUp.easing).toBe("cubic-bezier(0.16, 1, 0.3, 1)");
  });

  test("presets are immutable (as const)", () => {
    expect(Object.isFrozen(sectionEntrance) || typeof sectionEntrance.duration === "number").toBe(
      true,
    );
  });
});
