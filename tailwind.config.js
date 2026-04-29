module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        bgElevated: "var(--bg-elevated)",
        bgSunken: "var(--bg-sunken)",
        ink: "var(--ink)",
        inkMuted: "var(--ink-muted)",
        accent: "var(--accent)",
        accentBright: "var(--accent-bright)",
        rule: "var(--rule)",
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "Arial", "sans-serif"],
      },
      maxWidth: {
        wide: "var(--wide)",
        content: "var(--content)",
      },
      fontSize: {
        xs: "var(--fs-xs)",
        sm: "var(--fs-sm)",
        base: "var(--fs-base)",
        md: "var(--fs-md)",
        lg: "var(--fs-lg)",
        xl: "var(--fs-xl)",
        "2xl": "var(--fs-2xl)",
        display: "var(--fs-display)",
        wordmark: "var(--fs-wordmark)",
      },
      borderRadius: {
        none: "0",
        sm: "0",
        DEFAULT: "0",
        md: "0",
        lg: "0",
        xl: "0",
        "2xl": "0",
        "3xl": "0",
        full: "0",
      },
    },
  },
  plugins: [],
};
