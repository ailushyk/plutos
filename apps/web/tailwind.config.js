// tailwind config is required for editor support
const sharedConfig = require('tailwind-config/tailwind.config.js')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  presets: [sharedConfig],
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx}`,
    './node_modules/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // fontFamily: {
      //   sans: [
      //     'var(--font-inter)',
      //     ...defaultTheme.fontFamily.sans,
      //   ],
      // },
    },
  },
}
