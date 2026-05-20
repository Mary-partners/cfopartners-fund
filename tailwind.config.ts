import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#FAFAF7",
          alt: "#F4F1EA",
        },
        ink: {
          DEFAULT: "#0F172A",
          2: "#334155",
          3: "#64748B",
        },
        line: "#E2DED3",
        accent: {
          DEFAULT: "#B8860B",
          2: "#8B6914",
        },
        gold: {
          soft: "#F5EBD0",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Fraunces", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "14px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
