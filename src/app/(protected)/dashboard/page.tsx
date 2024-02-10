import React from 'react'
import Link from 'next/link'

import { auth, signOut } from '@/lib/auth/auth'
import { Button } from '@/components/ui/button'
import { SubmitButton } from '@/components/form'

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
      <form
        action={async () => {
          'use server'
          await signOut()
        }}
      >
        <SubmitButton>Sign Out</SubmitButton>
      </form>
    </div>
  )
}

export default DashboardPage
