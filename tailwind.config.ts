import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b0d0f",
        panel: "#111418",
        line: "#252a31",
        signal: "#1fbf75",
        caution: "#f2b84b",
        danger: "#f26b6b",
        terminal: "#d8f3dc",
      },
      boxShadow: {
        terminal: "0 16px 60px rgba(0, 0, 0, 0.28)",
      },
    },
  },
  plugins: [],
};

export default config;
