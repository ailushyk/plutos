const defaultLocale = 'en'
const definedLocales = [defaultLocale, 'ua', 'pl'] as const
export type Locale = (typeof definedLocales)[number]

const i18n = (() => {
  let instance

  function init() {
    // private variables and functions
    const locales = definedLocales

    return {
      // public variables and functions
      defaultLocale: defaultLocale,
      getLocales: () => locales,
    }
  }

  return {
    getInstance: () => {
      if (!instance) {
        instance = init()
      }
      return instance
    },
  }
})()

export { i18n }
