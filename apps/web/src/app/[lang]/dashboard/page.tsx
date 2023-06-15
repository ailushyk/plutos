import React from 'react'
import Link from 'next/link'
import { Locale, useTranslation } from '@/i18n'
import { CARD_CONTENT } from '@/constants'
import { PageHeader } from '@/components/PageHeader'
import { Card, GradientText } from 'ui'

export default async function Dashboard({
  params,
}: {
  params: { lang: Locale }
}) {
  const { t } = await useTranslation(params.lang)

  return (
    <div className="flex flex-col items-center">
      <PageHeader lang={params.lang}>
        <GradientText>
          <span className="sm:text-4xl">{t('home.title')}</span>
        </GradientText>
      </PageHeader>

      <main className="mx-auto w-full max-w-xl px-4 pb-8 pt-16 sm:pt-24 lg:px-8">
        <div className="grid grid-cols-1 place-content-evenly gap-4 sm:grid-cols-2">
          {CARD_CONTENT.map((card) => (
            <Link
              key={card.title}
              href={{
                pathname: `/${params.lang}/${card.href}`,
              }}
            >
              <Card href={card.href} title={t(card.title)} cta={t(card.cta)} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
