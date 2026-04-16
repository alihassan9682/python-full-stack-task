'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'

type RefreshContextValue = {
  isRefreshing: boolean
  refresh: () => void
}

const RefreshContext = React.createContext<RefreshContextValue | null>(null)

export function RefreshProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isRefreshing, startTransition] = React.useTransition()

  const refresh = React.useCallback(() => {
    startTransition(() => {
      router.refresh()
    })
  }, [router])

  return <RefreshContext.Provider value={{ isRefreshing, refresh }}>{children}</RefreshContext.Provider>
}

export function useRefresh() {
  const ctx = React.useContext(RefreshContext)
  if (!ctx) throw new Error('useRefresh must be used within RefreshProvider')
  return ctx
}

