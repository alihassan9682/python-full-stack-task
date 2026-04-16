'use client'

import { useState, useTransition } from 'react'
import { Trash2 } from 'lucide-react'
import { deleteContact } from '@/lib/actions'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { SuccessDialog } from '@/components/ui/success-dialog'
import { useRefresh } from '@/components/dashboard/refresh-context'

export function DeleteContactButton({ id, name }: { id: number; name: string }) {
  const { refresh } = useRefresh()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)

  return (
    <div className="flex items-center justify-end gap-3">
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
      <button
        type="button"
        disabled={isPending}
        aria-label={`Delete ${name}`}
        title="Delete"
        onClick={() => {
          setError(null)
          setConfirmOpen(true)
        }}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-white text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Trash2 size={16} />
      </button>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete contact?"
        description={`Delete "${name}"? This cannot be undone.`}
        confirmText="Delete"
        onConfirm={() => {
          startTransition(async () => {
            const result = await deleteContact(id)
            if (!result.success) {
              setError(result.error || 'Delete failed.')
              setConfirmOpen(false)
              return
            }
            setConfirmOpen(false)
            setSuccessOpen(true)
            refresh()
          })
        }}
        isPending={isPending}
      />

      <SuccessDialog
        open={successOpen}
        onOpenChange={setSuccessOpen}
        title="Deleted"
        message="The contact was deleted successfully."
      />
    </div>
  )
}

