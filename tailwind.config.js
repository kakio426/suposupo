/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      borderRadius: {
        control: "var(--radius-control)",
        button: "var(--radius-button)",
        card: "var(--radius-card)",
        panel: "var(--radius-panel)",
        choice: "var(--radius-choice)",
        pill: "var(--radius-pill)"
      },
      colors: {
        surface: {
          base: "rgb(var(--color-surface-base) / <alpha-value>)",
          panel: "rgb(var(--color-surface-panel) / <alpha-value>)",
          raised: "rgb(var(--color-surface-raised) / <alpha-value>)"
        },
        ink: {
          strong: "rgb(var(--color-ink-strong) / <alpha-value>)",
          base: "rgb(var(--color-ink-base) / <alpha-value>)",
          muted: "rgb(var(--color-ink-muted) / <alpha-value>)"
        },
        brand: tokenScale("brand", [50, 100, 200, 300, 400, 500, 600, 700]),
        success: tokenScale("success", [50, 100, 300, 500, 600, 700]),
        warning: tokenScale("warning", [50, 100, 200, 300, 500, 600, 700, 900]),
        danger: tokenScale("danger", [50, 100, 300, 400, 500, 600, 700, 800]),
        neutral: tokenScale("neutral", [50, 100, 200, 300, 400, 500, 600, 700, 800, 900])
      },
      fontFamily: {
        body: ["var(--font-body)"],
        display: ["var(--font-display)"],
        game: ["var(--font-game)"]
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        control: "var(--shadow-control)",
        jelly: "var(--shadow-jelly)",
        panel: "var(--shadow-panel)"
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        base: "var(--duration-base)",
        slow: "var(--duration-slow)"
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-7px)" },
          "75%": { transform: "translateX(7px)" }
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        pop: {
          "0%": { transform: "scale(0.92)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        }
      },
      animation: {
        shake: "shake 0.22s ease-in-out 0s 2",
        floaty: "floaty 3.2s ease-in-out infinite",
        pop: "pop 0.28s ease-out both"
      }
    }
  },
  plugins: []
};

function tokenScale(name, steps) {
  return steps.reduce((tokens, step) => {
    tokens[step] = `rgb(var(--color-${name}-${step}) / <alpha-value>)`;
    return tokens;
  }, {});
}
