'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export type TabsOption<T extends string> = {
  value: T
  label: string
}

export function Tabs<T extends string>({
  value,
  onChange,
  options,
  className,
}: {
  value: T
  onChange: (value: T) => void
  options: TabsOption<T>[]
  className?: string
}) {
  return (
    <div className={cn('inline-flex rounded-xl border border-gray-200 bg-white p-1', className)}>
      {options.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors',
              active ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

