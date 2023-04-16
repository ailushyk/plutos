import Link from 'next/link'
import { i18n } from '@/i18n/i18n-config'

export function LangSwitch() {
  const locales = i18n.getInstance().getLocales()

  return (
    <div className="flex">
      <div>LangSwitch: </div>
      <ul className="flex divide-x">
        {locales.map((locale) => {
          return (
            <li key={locale}>
              <Link href={`/${locale}`} className="px-4">
                {locale}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
