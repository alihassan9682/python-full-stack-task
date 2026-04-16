'use client'

import * as React from 'react'

function useDialog(open: boolean, onOpenChange: (open: boolean) => void) {
  const ref = React.useRef<HTMLDialogElement | null>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    if (open && !el.open) {
      el.showModal()
      return
    }

    if (!open && el.open) {
      el.close()
    }
  }, [open])

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const onCancel = (e: Event) => {
      e.preventDefault()
      onOpenChange(false)
    }
    const onClose = () => onOpenChange(false)

    el.addEventListener('cancel', onCancel)
    el.addEventListener('close', onClose)
    return () => {
      el.removeEventListener('cancel', onCancel)
      el.removeEventListener('close', onClose)
    }
  }, [onOpenChange])

  return ref
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children?: React.ReactNode
  footer?: React.ReactNode
}) {
  const ref = useDialog(open, onOpenChange)

  return (
    <dialog
      ref={ref}
      className="fixed left-1/2 top-1/2 w-[min(520px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-200 bg-white p-0 text-gray-900 shadow-2xl backdrop:bg-black/40"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h3 className="text-base font-semibold">{title}</h3>
            {description ? <p className="mt-1 text-sm text-gray-600">{description}</p> : null}
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-lg px-2 py-1 text-gray-500 hover:bg-gray-50 hover:text-gray-800"
            aria-label="Close dialog"
            title="Close"
          >
            ×
          </button>
        </div>

        {children ? <div className="mt-4">{children}</div> : null}
      </div>

      {footer ? <div className="flex items-center justify-end gap-3 border-t border-gray-100 p-4">{footer}</div> : null}
    </dialog>
  )
}

