module.exports = {
  content: ["./**/*.{html}", "./src/**/*.{js}"],
  theme: {
    extend: {
      height: {
        '60rem': '60rem',
        '37rem': '37rem',
        '1/1': '95%',
      },
      screens: {
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }

        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }

        'desktop': '1681px',
        // => @media (min-width: 1681px) { ... }
      },
    },
  },
  plugins: [require("daisyui")],
}
