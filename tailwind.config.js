/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tema Claro
        light: {
          bg: "#F5F7FA",
          card: "#FFFFFF",
          text: "#1A1A1A",
          textSecondary: "#4A4A4A",
          detail: "#D6D6D6",
        },
        // Tema Escuro (Premium)
        dark: {
          bg: "#0E0E0F",
          card: "#161617",
          border: "#2A2A2C",
          text: "#FFFFFF",
          textSecondary: "#C9C9C9",
        },
        // Cores de Marca
        brand: {
          blue: "#6FAED9",
          green: "#8DC8A9",
          gold: "#E7C888",
          gray: "#A4A4A6",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.75rem", // rounded-xl
        lg: "1rem", // rounded-2xl
      },
      boxShadow: {
        premium: "0 4px 20px rgba(0, 0, 0, 0.08)",
        "premium-dark": "0 4px 20px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};


