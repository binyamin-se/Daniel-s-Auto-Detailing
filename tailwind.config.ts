import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#0B0F19",
        light: "#F8FAFC",
        accentBlue: "#2563EB",
        accentRed: "#D62828"
      },
      boxShadow: {
        glass: "0 18px 40px rgba(8,15,30,0.35)"
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at center, rgba(37,99,235,0.38), rgba(37,99,235,0) 65%)",
        "luxury-grid":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)"
      },
      animation: {
        shimmer: "shimmer 2.8s linear infinite",
        float: "float 6s ease-in-out infinite"
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(220%)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
