'use client'

import * as React from 'react'
import type { Contact } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Point = { day: string; count: number }

function formatDay(d: Date) {
  // YYYY-MM-DD
  return d.toISOString().slice(0, 10)
}

function formatDayLabel(isoDay: string) {
  const d = new Date(isoDay + 'T00:00:00')
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function buildDailySeries(contacts: Contact[], days: number): Point[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const start = new Date(today)
  start.setDate(start.getDate() - (days - 1))

  const counts = new Map<string, number>()
  for (let i = 0; i < days; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    counts.set(formatDay(d), 0)
  }

  for (const c of contacts) {
    const created = new Date(c.createdAt)
    created.setHours(0, 0, 0, 0)
    const key = formatDay(created)
    if (counts.has(key)) counts.set(key, (counts.get(key) || 0) + 1)
  }

  return Array.from(counts.entries()).map(([day, count]) => ({ day, count }))
}

function Sparkline({ data }: { data: Point[] }) {
  const w = 640
  const h = 120
  const padX = 6
  const padY = 10

  const max = Math.max(1, ...data.map((d) => d.count))
  const step = data.length > 1 ? (w - padX * 2) / (data.length - 1) : 0

  const pts = data.map((d, i) => {
    const x = padX + i * step
    const y = padY + (h - padY * 2) * (1 - d.count / max)
    return { x, y }
  })

  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-28 w-full">
      <defs>
        <linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* baseline */}
      <line x1="0" y1={h - 0.5} x2={w} y2={h - 0.5} stroke="#E5E7EB" />

      {/* area */}
      <path
        d={`${path} L ${w - padX} ${h - padY} L ${padX} ${h - padY} Z`}
        fill="url(#lineFill)"
        stroke="none"
      />
      {/* line */}
      <path d={path} fill="none" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" />

      {/* points */}
      {pts.map((p, idx) => (
        <circle key={idx} cx={p.x} cy={p.y} r="3.5" fill="#4f46e5" />
      ))}
    </svg>
  )
}

function Bars({ data }: { data: Point[] }) {
  const w = 640
  const h = 160
  const padX = 8
  const padY = 16

  const max = Math.max(1, ...data.map((d) => d.count))
  const gap = 6
  const barW = (w - padX * 2 - gap * (data.length - 1)) / data.length

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-36 w-full">
      <line x1="0" y1={h - 0.5} x2={w} y2={h - 0.5} stroke="#E5E7EB" />

      {data.map((d, i) => {
        const x = padX + i * (barW + gap)
        const barH = (h - padY * 2) * (d.count / max)
        const y = h - padY - barH
        const labelEvery = data.length > 10 ? 2 : 1
        const showLabel = i % labelEvery === 0 || i === data.length - 1

        return (
          <g key={d.day}>
            <rect x={x} y={y} width={barW} height={barH} rx="6" fill="#818cf8" />
            {showLabel ? (
              <text x={x + barW / 2} y={h - 4} textAnchor="middle" fontSize="10" fill="#6B7280">
                {formatDayLabel(d.day)}
              </text>
            ) : null}
          </g>
        )
      })}
    </svg>
  )
}

export function Insights({ contacts, className }: { contacts: Contact[]; className?: string }) {
  const series = React.useMemo(() => buildDailySeries(contacts, 14), [contacts])
  const total = contacts.length
  const last7 = series.slice(-7).reduce((acc, d) => acc + d.count, 0)
  const maxDay = series.reduce((best, d) => (d.count > best.count ? d : best), series[0]!)

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle className="text-xl">Insights</CardTitle>
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
          <span className="rounded-full border border-gray-200 bg-white px-2.5 py-1">
            <span className="font-semibold text-gray-900">{total}</span> total
          </span>
          <span className="rounded-full border border-gray-200 bg-white px-2.5 py-1">
            <span className="font-semibold text-gray-900">{last7}</span> last 7 days
          </span>
          <span className="rounded-full border border-gray-200 bg-white px-2.5 py-1">
            peak: <span className="font-semibold text-gray-900">{maxDay.count}</span> on {formatDayLabel(maxDay.day)}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-linear-to-b from-indigo-50/40 to-white p-4">
            <div className="mb-2 text-sm font-semibold text-gray-900">Signups (14 days)</div>
            <div className="text-xs text-gray-500">Trend line</div>
            <div className="mt-3">
              <Sparkline data={series} />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-linear-to-b from-purple-50/40 to-white p-4">
            <div className="mb-2 text-sm font-semibold text-gray-900">Daily volume</div>
            <div className="text-xs text-gray-500">Bar chart</div>
            <div className="mt-3">
              <Bars data={series} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

