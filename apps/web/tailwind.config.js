// tailwind config is required for editor support
const sharedConfig = require('tailwind-config/tailwind.config.js')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  presets: [sharedConfig],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          // 'Inter var',
          'var(--font-inter)',
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
}
