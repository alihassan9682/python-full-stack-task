import prisma from '@/lib/prisma';
import { DashboardScreen } from '@/components/dashboard/dashboard-screen'

export const dynamic = 'force-dynamic';

async function getContacts() {
  return prisma.contact.findMany({ orderBy: { createdAt: 'desc' }, take: 20 })
}

export default async function AssignmentDashboard() {
  const contacts = await getContacts()
  return <DashboardScreen contacts={contacts} />
}
