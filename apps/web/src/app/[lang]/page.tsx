import { PageHeader } from '@/components/PageHeader'
import { GradientText } from 'ui'
import React from 'react'
import { Locale, useTranslation } from '@/i18n'
import Link from 'next/link'
import { api } from '@/utils/api'
import { auth } from '@clerk/nextjs'

async function HomePage({ params }: { params: { lang: Locale } }) {
  const { t } = await useTranslation(params.lang)
  const data = await api().star.getAll()

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

      <div>
        {data.map((star) => (
          <div key={star.id}>
            <div>{star.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default HomePage
