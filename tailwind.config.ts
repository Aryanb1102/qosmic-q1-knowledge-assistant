import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#040814",
        panel: "rgba(10, 18, 38, 0.72)",
        line: "rgba(124, 228, 255, 0.2)",
        glow: "#72d5ff",
        violet: "#7a5cff",
        success: "#5fe6b4",
        warning: "#f6c760",
        danger: "#ff7895"
      },
      boxShadow: {
        panel: "0 20px 60px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
        glow: "0 0 40px rgba(114, 213, 255, 0.18)"
      },
      backgroundImage: {
        orbital: "radial-gradient(circle at top, rgba(114,213,255,0.12), transparent 32%), linear-gradient(135deg, rgba(122,92,255,0.12), transparent 40%)"
      }
    },
  },
  plugins: [],
};

export default config;
