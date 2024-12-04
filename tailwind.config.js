const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@material-tailwind/react/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
