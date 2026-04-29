export const sectionEntrance = {
  duration: 600,
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  offsetY: 24,
} as const;

export const cardHover = {
  duration: 250,
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  translateY: -2,
} as const;

export const wordmarkBreathe = {
  duration: 8000,
  easing: "ease-in-out",
  scaleMin: 1,
  scaleMax: 1.01,
} as const;

export const statCountUp = {
  duration: 1200,
  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;
