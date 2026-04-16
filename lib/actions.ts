'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function submitContactForm(data: { name: string; phone: string }) {
  try {
    if (!data.name?.trim() || !data.phone?.trim()) {
      return { success: false, error: 'Name and phone are required.' };
    }

    const phoneRegex = /^[\d\s\-+()]{7,20}$/;
    if (!phoneRegex.test(data.phone)) {
      return { success: false, error: 'Invalid phone format.' };
    }

    await prisma.contact.create({
      data: {
        name: data.name.trim(),
        phone: data.phone.trim(),
      },
    });

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Save error:', error);
    return { success: false, error: 'Failed to save due to a server error.' };
  }
}

export async function deleteContact(id: number) {
  try {
    if (!Number.isFinite(id)) {
      return { success: false, error: 'Invalid contact id.' }
    }

    await prisma.contact.delete({ where: { id } })
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Delete error:', error)
    return { success: false, error: 'Failed to delete due to a server error.' }
  }
}
