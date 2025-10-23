'use client'

import { ReactNode, useMemo, useState } from 'react'
import { Search, Filter, Users, Calendar, Database } from 'lucide-react'

import type { PatientRecord } from '@/lib/types'
import { formatCondition, formatDate } from '@/lib/utils'

interface PatientDatabaseViewProps {
  records: PatientRecord[]
}

const CONDITION_OPTIONS = [
  { label: 'All Conditions', value: 'all' },
  { label: "Dementia / Alzheimer's", value: 'dementia' },
  { label: 'Down Syndrome', value: 'down_syndrome' },
  { label: 'ADHD', value: 'adhd' },
]

export default function PatientDatabaseView({ records }: PatientDatabaseViewProps) {
  const [query, setQuery] = useState('')
  const [condition, setCondition] = useState('all')

  const filtered = useMemo(() => {
    return records.filter((record) => {
      const matchesQuery = query
        ? record.name?.toLowerCase().includes(query.toLowerCase()) ||
          (record.patientInfo?.name as string | undefined)?.toLowerCase().includes(query.toLowerCase())
        : true
      const matchesCondition =
        condition === 'all' ? true : record.condition?.toLowerCase() === condition.toLowerCase()
      return matchesQuery && matchesCondition
    })
  }, [records, query, condition])

  const totals = useMemo(() => {
    const byCondition: Record<string, number> = {}
    records.forEach((record) => {
      const key = record.condition || 'unknown'
      byCondition[key] = (byCondition[key] ?? 0) + 1
    })
    return {
      patients: records.length,
      dementia: byCondition['dementia'] ?? 0,
      downSyndrome: byCondition['down_syndrome'] ?? 0,
      adhd: byCondition['adhd'] ?? 0,
    }
  }, [records])

  return (
    <div className="space-y-8">
      <div className="glass-card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Database className="h-6 w-6 text-accent-teal" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Patient Repository</h1>
              <p className="text-sm text-gray-500">Persisted sessions, feedback, and personality snapshots.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="input-with-icon">
              <Search className="icon" />
              <input
                type="search"
                placeholder="Search by patient name"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="input-with-icon">
              <Filter className="icon" />
              <select value={condition} onChange={(event) => setCondition(event.target.value)}>
                {CONDITION_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard icon={<Users className="h-5 w-5" />} label="Total Patients" value={totals.patients} />
        <StatCard icon={<Calendar className="h-5 w-5" />} label="Dementia" value={totals.dementia} accent="bg-blue-500" />
        <StatCard icon={<Calendar className="h-5 w-5" />} label="Down Syndrome" value={totals.downSyndrome} accent="bg-emerald-500" />
        <StatCard icon={<Calendar className="h-5 w-5" />} label="ADHD" value={totals.adhd} accent="bg-rose-500" />
      </div>

      <div className="overflow-hidden rounded-xl border border-table-border/50 bg-white/80 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-accent-olive/20">
            <tr>
              <th className="table-head">Patient</th>
              <th className="table-head">Condition</th>
              <th className="table-head">Age</th>
              <th className="table-head">Created</th>
              <th className="table-head">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((record) => (
              <tr key={record.patientId} className="hover:bg-accent-olive/10">
                <td className="table-cell">
                  <div className="text-sm font-semibold text-gray-800">{record.name || '—'}</div>
                  <div className="text-xs text-gray-500">ID: {record.patientId}</div>
                </td>
                <td className="table-cell text-sm font-medium text-gray-700">{formatCondition(record.condition)}</td>
                <td className="table-cell text-sm text-gray-600">{record.age ?? '—'}</td>
                <td className="table-cell text-sm text-gray-600">{formatDate(record.createdAt)}</td>
                <td className="table-cell">
                  <details className="group">
                    <summary className="cursor-pointer text-sm font-medium text-accent-teal underline transition group-open:text-accent-olive">
                      View profile
                    </summary>
                    <div className="mt-2 rounded-lg bg-accent-teal/5 p-3 text-xs text-gray-700">
                      <JsonPreview data={record.patientInfo} />
                    </div>
                  </details>
                </td>
              </tr>
            ))}
            {!filtered.length && (
              <tr>
                <td className="table-cell text-center text-sm text-gray-500" colSpan={5}>
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, accent = 'bg-accent-teal' }: { icon: ReactNode; label: string; value: number; accent?: string }) {
  return (
    <div className="glass-card flex items-center gap-4">
      <div className={`flex h-12 w-12 items-center justify-center rounded-full text-white ${accent}`}>{icon}</div>
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
        <p className="text-xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  )
}

function JsonPreview({ data }: { data: Record<string, unknown> }) {
  const entries = Object.entries(data || {})
  if (!entries.length) {
    return <p className="text-gray-500">No stored profile data.</p>
  }
  return (
    <dl className="grid gap-2">
      {entries.map(([key, value]) => (
        <div key={key} className="grid grid-cols-[120px_1fr] items-start gap-2">
          <dt className="text-gray-500">{formatKey(key)}</dt>
          <dd className="font-medium text-gray-700">{renderValue(value)}</dd>
        </div>
      ))}
    </dl>
  )
}

function formatKey(key: string) {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function renderValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.length ? value.join(', ') : '—'
  }
  if (value === null || value === undefined || value === '') {
    return '—'
  }
  if (typeof value === 'object') {
    return JSON.stringify(value)
  }
  return String(value)
}
