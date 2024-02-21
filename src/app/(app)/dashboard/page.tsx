import React from 'react'
import Link from 'next/link'

import { auth } from '@/lib/auth/auth'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Dashboard',
}

async function DashboardPage() {
  const session = await auth()
  return (
    <div>
      <h1>Dashboard Page</h1>
      <div>
        <Button asChild variant="link">
          <Link href="/settings">Settings link</Link>
        </Button>
      </div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}

export default DashboardPage
