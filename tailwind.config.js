/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "suit-regular": ["SUITRegular", "sans-serif"],
        "suit-semibold": ["SUITSemiBold", "sans-serif"],
        "suit-bold": ["SUITBold", "sans-serif"]
      }
    }
  },
  plugins: []
};

