const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    screens: {
      xs: "22em",
      // => @media (min-width: 352px) { ... }
      sm: "30em",
      // => @media (min-width: 480px) { ... }
      md: "48em",
      // => @media (min-width: 768px) { ... }
      lg: "62em",
      // => @media (min-width: 992px) { ... }
      xl: "80em",
      // => @media (min-width: 1280px) { ... }
      "2xl": "96em",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        sans: ["Proxima Nova", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        action: "#00b6f0",
        foreground: "#1a2129",
        foregroundMuted: "#667175",
        foregroundSubtle: "#99a1a3",
        elevatedBackground: "#f5f5f6",
        stroke: "#e5e7e8",
      },
    },
    gridTemplateColumns: {
      fluid: "repeat(auto-fit , minmax(134px , 1fr))",
      container: "minmax(auto , 1440px)",
    },
  },
  plugins: [],
};
