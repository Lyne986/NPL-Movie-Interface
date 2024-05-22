import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: '#96E072',
        primarypink: '#3DA35D',
        darkpink: '#134611',
        textgray: '#fff',
        textlightgray: '#9D9D9D',
      },
    },
  },
  plugins: [],
};

export default config;
