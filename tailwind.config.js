/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        game: ["var(--font-game)"]
      },
      boxShadow: {
        jelly: "0 18px 35px rgba(31, 41, 55, 0.14)"
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
