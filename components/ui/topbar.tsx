import * as React from 'react'
import { cn } from '@/lib/utils'

export function Topbar({
  icon,
  title,
  right,
  className,
}: {
  icon?: React.ReactNode
  title: string
  right?: React.ReactNode
  className?: string
}) {
  return (
    <header className={cn('sticky top-0 z-20 border-b border-gray-200 bg-white', className)}>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-6">
        {icon ? <div className="rounded-lg bg-indigo-600 p-2 text-white shadow-sm">{icon}</div> : null}
        <h1 className="text-xl font-bold tracking-tight text-gray-900">{title}</h1>
        <div className="ml-auto">{right}</div>
      </div>
    </header>
  )
}

