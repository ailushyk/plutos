import React from 'react'
import { List, Section, Widget } from 'ui'
import { TagIcon } from '@heroicons/react/24/solid'
import { formatMoney } from '@/utils/money'
import { useTranslation } from '@/i18n/useTranslation'
import { PageHeader } from '@/components/PageHeader'

async function WalletPage({ params }: { params: { lang: Locale } }) {
  const { t } = await useTranslation(params.lang)
  let [integer, decimal] = formatMoney(45599)
  let currency = 'PLN'

  return (
    <main className="flex min-h-screen flex-col items-center gap-8">
      <PageHeader lang={params.lang} title={t('wallet.title')} />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col gap-6">
          <Widget
            label={t('wallet.current-balance')}
            integer={integer}
            decimal={decimal}
            currency={currency}
          />

          <Section>
            <div className="text-white/60">{t('wallet.transactions')}</div>
            <List>
              {Array.from({ length: 50 }).map((_, i) => (
                <div key={`index-${i}`} className="">
                  <div className="flex justify-between gap-4 py-3">
                    <div className="flex items-start gap-2">
                      <div className="rounded-full bg-zinc-800 p-1">
                        <TagIcon className="h-5 w-5 text-amber-300" />
                      </div>
                      <div>
                        <div>Food</div>
                        <div className="text-xs text-white/60">Today 12:41</div>
                      </div>
                    </div>
                    <div>
                      {integer}
                      <sup>{decimal}</sup> PLN
                    </div>
                  </div>
                </div>
              ))}
            </List>
          </Section>
        </div>
      </div>
    </main>
  )
}

export default WalletPage
