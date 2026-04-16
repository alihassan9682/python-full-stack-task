import type { Contact } from '@/lib/types'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'

export function DashboardScreen({ contacts }: { contacts: Contact[] }) {
  return <DashboardShell contacts={contacts} />
}

