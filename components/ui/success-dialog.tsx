'use client'

import * as React from 'react'
import { Modal } from '@/components/ui/modal'

export function SuccessDialog({
  open,
  onOpenChange,
  title = 'Success',
  message,
  buttonText = 'OK',
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  message: string
  buttonText?: string
}) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={message}
      footer={
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          {buttonText}
        </button>
      }
    />
  )
}

