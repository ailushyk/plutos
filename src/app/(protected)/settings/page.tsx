import React from 'react'
import Link from 'next/link'

import { auth } from '@/lib/auth/auth'
import { Button } from '@/components/ui/button'

async function SettingsPage() {
  const session = await auth()
  return (
    <div>
      <h1>Settings Page</h1>
      <div>
        <Button asChild variant="link">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}

export default SettingsPage
