'use client'

import type { Contact } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DeleteContactButton } from '@/components/dashboard/delete-contact-button'
import { useRefresh } from '@/components/dashboard/refresh-context'

export function RecentContacts({ contacts }: { contacts: Contact[] }) {
  const { isRefreshing } = useRefresh()
  return (
    <Card className="mt-8">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle className="text-xl">Recent submissions</CardTitle>
        <p className="text-sm text-gray-500">{contacts.length} total</p>
      </CardHeader>
      <CardContent>
        {contacts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-6 text-sm text-gray-600">
            No contacts yet. Submit the form to create your first record.
          </div>
        ) : (
          <div className="relative overflow-x-auto rounded-xl border border-gray-100">
            {isRefreshing ? (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-[1px]">
                <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 shadow-sm">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600" />
                  Updating list…
                </div>
              </div>
            ) : null}
            <table className="w-full border-collapse text-left">
              <thead className="bg-gray-50/60">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Name</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Phone</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Created</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {contacts.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{c.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{c.phone}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(c.createdAt).toLocaleString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <DeleteContactButton id={c.id} name={c.name} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

