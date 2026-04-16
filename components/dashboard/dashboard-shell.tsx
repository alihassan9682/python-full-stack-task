'use client'

import { useState } from 'react'
import { LayoutDashboard } from 'lucide-react'
import type { Contact } from '@/lib/types'
import { AssignmentForm } from '@/components/form'
import { Insights } from '@/components/dashboard/insights'
import { RecentContacts } from '@/components/dashboard/recent-contacts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Topbar } from '@/components/ui/topbar'
import { RefreshProvider } from '@/components/dashboard/refresh-context'
import { Tabs } from '@/components/ui/tabs'

export function DashboardShell({ contacts }: { contacts: Contact[] }) {
  const [activeTab, setActiveTab] = useState<'contacts' | 'insights'>('contacts')

  return (
    <RefreshProvider>
      <main className="min-h-screen bg-gray-50 text-gray-900">
        <Topbar icon={<LayoutDashboard size={20} />} title="Contact Intake Dashboard" />

        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
            {/* Left: form */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Card>
                <CardHeader>
                  <CardTitle>Register a contact</CardTitle>
                  <CardDescription>
                    Add a name and phone number. On success, the record is persisted and the right panel updates.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AssignmentForm />
                </CardContent>
              </Card>
            </div>

            {/* Right: tabs */}
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold tracking-tight text-gray-900">Dashboard</h2>
                  <p className="mt-1 text-sm text-gray-500">Contacts and activity insights.</p>
                </div>
                <Tabs
                  value={activeTab}
                  onChange={setActiveTab}
                  options={[
                    { value: 'contacts', label: 'Contacts' },
                    { value: 'insights', label: 'Insights' },
                  ]}
                />
              </div>

              {activeTab === 'contacts' ? (
                <RecentContacts contacts={contacts} className="mt-0" />
              ) : (
                <Insights contacts={contacts} className="mt-0" />
              )}
            </div>
          </div>
        </div>
      </main>
    </RefreshProvider>
  )
}

