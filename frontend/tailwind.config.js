import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "forest", // 🌿 Yoda theme (already built-in)
      {
        darth: {
          primary: "#ff1e1e",
          secondary: "#1f1f1f",
          accent: "#ff4d4d",
          neutral: "#1a1a1a",
          "base-100": "#0f0f0f",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },
};
