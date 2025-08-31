/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        black: "#282625",
        white: "#FFFFFF",
        point: {
          1: "#FFF6D9",
          2: "#F0CFB3",
          3: "#D56E14",
          4: "#A55615"
        }
      },
      fontFamily: {
        "suit-regular": ["SUITRegular", "sans-serif"],
        "suit-semibold": ["SUITSemiBold", "sans-serif"],
        "suit-bold": ["SUITBold", "sans-serif"]
      },
      fontSize: {
        display1: "28px",
        title1: "24px",
        title2: "20px",
        subtitle1: "18px",
        subtitle2: "18px",
        body1: "16px",
        body2: "16px",
        body3: "14px",
        body4: "14px",
        caption1: "12px"
      },
      lineHeight: {
        140: "140%"
      },
      letterSpacing: {
        0: "0px"
      }
    }
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".display1": {
          fontSize: "28px",
          lineHeight: "140%",
          letterSpacing: "0px",
          fontFamily: "SUITBold, sans-serif"
        },
        ".title1": {
          fontSize: "24px",
          lineHeight: "140%",
          letterSpacing: "0px",
          fontFamily: "SUITBold, sans-serif"
        },
        ".title2": {
          fontSize: "20px",
          lineHeight: "140%",
          letterSpacing: "0px",
          fontFamily: "SUITBold, sans-serif"
        },
        ".subtitle1": {
          fontSize: "18px",
          lineHeight: "140%",
          letterSpacing: "0px",
          fontFamily: "SUITBold, sans-serif"
        },
        ".subtitle2": {
          fontSize: "18px",
          lineHeight: "140%",
          letterSpacing: "0px",
          fontFamily: "SUITRegular, sans-serif"
        },
        ".body1": {
          fontSize: "16px",
          lineHeight: "140%",
          letterSpacing: "0px",
          fontFamily: "SUITBold, sans-serif"
        },
        ".body2": {
          fontSize: "16px",
          lineHeight: "140%",
          letterSpacing: "0px",
          fontFamily: "SUITRegular, sans-serif"
        },
        ".body3": {
          fontSize: "14px",
          lineHeight: "140%",
          letterSpacing: "0px",
          fontFamily: "SUITBold, sans-serif"
        },
        ".body4": {
          fontSize: "14px",
          lineHeight: "140%",
          letterSpacing: "0px",
          fontFamily: "SUITRegular, sans-serif"
        },
        ".caption1": {
          fontSize: "12px",
          lineHeight: "140%",
          letterSpacing: "0px",
          fontFamily: "SUITSemibold, sans-serif"
        }
      };
      addUtilities(newUtilities);
    }
  ]
};

