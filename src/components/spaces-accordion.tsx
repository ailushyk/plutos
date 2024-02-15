'use client'

import { useParams } from 'next/navigation'

import { Accordion } from '@/components/ui/accordion'

export const SpacesAccordion = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const params = useParams()
  const lastOpenedSpace = params.space as string
  return (
    <Accordion type="single" collapsible defaultValue={lastOpenedSpace}>
      {children}
    </Accordion>
  )
}
