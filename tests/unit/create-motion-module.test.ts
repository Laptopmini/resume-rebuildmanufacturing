import { cardHover, sectionEntrance, statCountUp, wordmarkBreathe } from "../../src/lib/motion";

describe("motion presets", () => {
  describe("sectionEntrance", () => {
    it("has correct duration", () => {
      expect(sectionEntrance.duration).toBe(600);
    });

    it("has correct easing", () => {
      expect(sectionEntrance.easing).toBe("cubic-bezier(0.22, 1, 0.36, 1)");
    });

    it("has correct offsetY", () => {
      expect(sectionEntrance.offsetY).toBe(24);
    });
  });

  describe("cardHover", () => {
    it("has correct duration", () => {
      expect(cardHover.duration).toBe(250);
    });

    it("has correct easing", () => {
      expect(cardHover.easing).toBe("cubic-bezier(0.22, 1, 0.36, 1)");
    });

    it("has correct translateY", () => {
      expect(cardHover.translateY).toBe(-2);
    });
  });

  describe("wordmarkBreathe", () => {
    it("has correct duration", () => {
      expect(wordmarkBreathe.duration).toBe(8000);
    });

    it("has correct easing", () => {
      expect(wordmarkBreathe.easing).toBe("ease-in-out");
    });

    it("has correct scaleMin", () => {
      expect(wordmarkBreathe.scaleMin).toBe(1);
    });

    it("has correct scaleMax", () => {
      expect(wordmarkBreathe.scaleMax).toBe(1.01);
    });
  });

  describe("statCountUp", () => {
    it("has correct duration", () => {
      expect(statCountUp.duration).toBe(1200);
    });

    it("has correct easing", () => {
      expect(statCountUp.easing).toBe("cubic-bezier(0.16, 1, 0.3, 1)");
    });
  });
});
