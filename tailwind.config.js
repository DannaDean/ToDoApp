module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "todo-main": "#dddde5",
        "todo-second": "#e67875",
        "text-color": "#484343"
      },
      inset: {
        "minus-15": "-4rem",
        "minus-32": "-2rem",
        "minus-16": "-.01px"
      }
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"]
    },
    container: {
      padding: "1rem",
      center: true
    },
    screens: {
      sm: "640px",
      ms: "768px"
    }
  },
  plugins: [],
}

