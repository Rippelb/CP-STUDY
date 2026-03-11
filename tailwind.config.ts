import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0A0A0F",
          card: "#12121A",
          elevated: "#1A1A2E",
        },
        foreground: {
          DEFAULT: "#E8E8F0",
          muted: "#8888AA",
          dim: "#5555770",
        },
        accent: {
          purple: "#6C63FF",
          cyan: "#00D4FF",
          pink: "#FF6584",
          green: "#00E676",
          orange: "#FF9100",
          yellow: "#FFD600",
        },
        border: {
          DEFAULT: "rgba(108, 99, 255, 0.2)",
          hover: "rgba(108, 99, 255, 0.4)",
          active: "rgba(108, 99, 255, 0.6)",
        },
        subject: {
          math: "#6C63FF",
          physics: "#00D4FF",
          chemistry: "#FF6584",
          biology: "#00E676",
          portuguese: "#FF9100",
          history: "#FFD600",
          geography: "#26A69A",
          philosophy: "#AB47BC",
          sociology: "#EF5350",
          english: "#42A5F5",
          writing: "#FF7043",
          arts: "#EC407A",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "slide-down": "slide-down 0.5s ease-out",
        "slide-left": "slide-left 0.5s ease-out",
        "slide-right": "slide-right 0.5s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "spin-slow": "spin 3s linear infinite",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "counter": "counter 1s ease-out",
        "progress-fill": "progress-fill 1s ease-out forwards",
        "xp-fly": "xp-fly 1s ease-out forwards",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(108, 99, 255, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(108, 99, 255, 0.6)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-left": {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-right": {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "progress-fill": {
          "0%": { width: "0%" },
          "100%": { width: "var(--progress-width)" },
        },
        "xp-fly": {
          "0%": { transform: "translateY(0) scale(1)", opacity: "1" },
          "100%": { transform: "translateY(-60px) scale(0.5)", opacity: "0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-mesh": "linear-gradient(135deg, #6C63FF22, #00D4FF11, #FF658422)",
        "glass": "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "glow-purple": "0 0 20px rgba(108, 99, 255, 0.3)",
        "glow-cyan": "0 0 20px rgba(0, 212, 255, 0.3)",
        "glow-pink": "0 0 20px rgba(255, 101, 132, 0.3)",
        "glow-green": "0 0 20px rgba(0, 230, 118, 0.3)",
        "card": "0 4px 20px rgba(0, 0, 0, 0.3)",
        "card-hover": "0 8px 40px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
