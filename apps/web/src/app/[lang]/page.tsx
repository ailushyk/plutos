import { PageHeader } from '@/components/PageHeader'
import { GradientText } from 'ui'
import React from 'react'
import { useTranslation } from '@/i18n/useTranslation'
import Link from 'next/link'

async function HomePage({ params, ...rest }: { params: { lang: Locale } }) {
  const { t } = await useTranslation(params.lang)

  return (
    <div className="flex flex-col items-center">
      <PageHeader lang={params.lang}>
        <GradientText>
          <span className="sm:text-4xl">{t('home.title')}</span>
        </GradientText>
      </PageHeader>

      <div className="py-8">
        <Link href={`/${params.lang}/dashboard`}>Dashboard</Link>
      </div>
    </div>
  )
}
export default HomePage
