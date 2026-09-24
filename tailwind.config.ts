import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F8FAFC", // Brand Identity Slate-50 Canvas Neutral
        surface: "#FFFFFF",
        primary: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        marketplace: {
          shopee: "#EE4D2D",
          tokopedia: "#03AC0E",
          tiktok: "#000000",
          lazada: "#0F146D",
        },
        profit: {
          light: "#ecfdf5",
          DEFAULT: "#059669",
          dark: "#047857",
        },
        loss: {
          light: "#fff1f2",
          DEFAULT: "#e11d48",
          dark: "#be123c",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Plus Jakarta Sans", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.04), 0 1px 3px 0 rgba(0, 0, 0, 0.02)",
        card: "0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.03)",
        elevated: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)",
      },
      animation: {
        marquee: "marquee 32s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
