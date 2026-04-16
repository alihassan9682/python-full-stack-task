'use client'

import { LayoutDashboard } from 'lucide-react'
import type { Contact } from '@/lib/types'
import { AssignmentForm } from '@/components/form'
import { RecentContacts } from '@/components/dashboard/recent-contacts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Topbar } from '@/components/ui/topbar'
import { RefreshProvider } from '@/components/dashboard/refresh-context'

export function DashboardShell({ contacts }: { contacts: Contact[] }) {
  return (
    <RefreshProvider>
      <main className="min-h-screen bg-gray-50 text-gray-900">
        <Topbar icon={<LayoutDashboard size={20} />} title="Contact Intake Dashboard" />

        <div className="mx-auto max-w-4xl px-6 py-10">
          <Card>
            <CardHeader>
              <CardTitle>Register a contact</CardTitle>
              <CardDescription>
                Add a name and phone number. On success, the record is persisted and will appear in the list below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AssignmentForm />
            </CardContent>
          </Card>

          <RecentContacts contacts={contacts} />
        </div>
      </main>
    </RefreshProvider>
  )
}

