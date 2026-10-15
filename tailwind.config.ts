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
        bg: "var(--bg)",
        "bg-elevated": "var(--bg-elevated)",
        "bg-elevated-2": "var(--bg-elevated-2)",
        ink: "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        "ink-faint": "var(--ink-faint)",
        line: "var(--line)",
        gold: "var(--gold)",
        "gold-strong": "var(--gold-strong)",
        "gold-soft": "var(--gold-soft)",
        red: "var(--red)",
        "aurora-brown": "var(--aurora-brown)",
        "aurora-wine": "var(--aurora-wine)",
        "primary-foreground": "var(--primary-foreground)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-oswald)", "sans-serif"],
        script: ["var(--font-kaushan)", "cursive"],
      },
      borderRadius: {
        brand: "18px",
      },
    },
  },
  plugins: [],
};
export default config;
