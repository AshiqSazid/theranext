'use client'

import { ReactNode } from 'react'
import { TrendingUp, Activity, Users } from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import type { AnalyticsSnapshot } from '@/lib/types'
import { formatCondition } from '@/lib/utils'

interface AnalyticsDashboardProps {
  snapshot: AnalyticsSnapshot
}

export default function AnalyticsDashboard({ snapshot }: AnalyticsDashboardProps) {
  return (
    <div className="space-y-8">
      <div className="glass-card">
        <div className="mb-4 flex items-center gap-3">
          <TrendingUp className="h-6 w-6 text-accent-teal" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
            <p className="text-sm text-gray-500">Realtime metrics sourced directly from the TheraMuse SQLite datastore.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Stat icon={<Activity className="h-5 w-5" />} label="Total Sessions" value={snapshot.totals.totalSessions} />
          <Stat icon={<Users className="h-5 w-5" />} label="Unique Patients" value={snapshot.totals.totalPatients} />
          <Stat icon={<TrendingUp className="h-5 w-5" />} label="Feedback Logged" value={snapshot.totals.totalFeedback} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">Average Reward by Condition</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <BarChart data={snapshot.rewardsByCondition}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="condition" tickFormatter={(value) => formatCondition(value)} />
                <YAxis domain={[0, 1]} tickFormatter={(value) => value.toFixed(2)} />
                <Tooltip
                  formatter={(value: number) => value.toFixed(3)}
                  labelFormatter={(label) => formatCondition(label)}
                />
                <Bar dataKey="averageReward" fill="#5B9C96" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">Sessions Over Time</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <AreaChart data={snapshot.sessionsOverTime}>
                <defs>
                  <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5B9C96" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#5B9C96" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip formatter={(value: number) => value.toString()} labelFormatter={(label) => label} />
                <Area
                  type="monotone"
                  dataKey="sessions"
                  stroke="#5B9C96"
                  fillOpacity={1}
                  fill="url(#colorSessions)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: number }) {
  return (
    <div className="glass-card flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-teal text-white">{icon}</div>
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
        <p className="text-xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  )
}
