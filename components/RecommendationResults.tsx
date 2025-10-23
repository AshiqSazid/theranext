'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Heart,
  Target,
  Music,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  MoveRight,
  Download,
  FileType2,
  FileText,
  ArrowUp,
} from 'lucide-react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'

import type {
  BigFiveScores,
  PatientSummary,
  RecommendationPayload,
  RecommendationSong,
} from '@/lib/types'
import { deriveCategories, formatCondition } from '@/lib/utils'

interface RecommendationResultsProps {
  recommendations: RecommendationPayload
  patientSummary: PatientSummary
  bigFive: BigFiveScores
  patientInfo: Record<string, unknown>
  feedbackLoadingId?: string | null
  onFeedback?: (args: { categoryKey: string; song: RecommendationSong; feedbackType: string }) => Promise<void>
}

const RADAR_KEYS = [
  { key: 'openness', label: 'Openness' },
  { key: 'conscientiousness', label: 'Conscientiousness' },
  { key: 'extraversion', label: 'Extraversion' },
  { key: 'agreeableness', label: 'Agreeableness' },
  { key: 'neuroticism', label: 'Emotional Stability' },
] as const

export default function RecommendationResults({
  recommendations,
  patientSummary,
  bigFive,
  patientInfo,
  feedbackLoadingId,
  onFeedback,
}: RecommendationResultsProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [feedbackNotice, setFeedbackNotice] = useState<{ message: string; tone: 'success' | 'error' } | null>(null)
  const [exportLoading, setExportLoading] = useState<'json' | 'pdf' | 'docx' | null>(null)
  const [exportError, setExportError] = useState<string | null>(null)

  const categories = useMemo(() => deriveCategories(recommendations), [recommendations])

  const banditStats = recommendations.bandit_stats

  const radarData = RADAR_KEYS.map(({ key, label }) => ({
    trait: label,
    value: Number(bigFive[key as keyof BigFiveScores]) ?? 0,
  }))

  useEffect(() => {
    if (categories.length && expandedCategories.size === 0) {
      setExpandedCategories(new Set([categories[0].key]))
    }
  }, [categories, expandedCategories.size])

  const handleToggleCategory = (key: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  const handleFeedback = async (categoryKey: string, song: RecommendationSong, feedbackType: string) => {
    if (!onFeedback) return
    try {
      setFeedbackNotice(null)
      await onFeedback({ categoryKey, song, feedbackType })
      setFeedbackNotice({
        message: `Thanks! Your ${feedbackType.toLowerCase()} feedback was recorded.`,
        tone: 'success',
      })
    } catch (error) {
      setFeedbackNotice({
        message: error instanceof Error ? error.message : 'Failed to record feedback.',
        tone: 'error',
      })
    }
  }

  const downloadRecommendations = () => {
    setExportError(null)
    setExportLoading('json')
    try {
      const blob = new Blob([JSON.stringify(recommendations, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `theramuse_${patientSummary.sessionId || 'recommendations'}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } finally {
      setExportLoading(null)
    }
  }

  const downloadReport = async (format: 'pdf' | 'docx') => {
    try {
      setExportError(null)
      setExportLoading(format)
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          format,
          patientInfo,
          recommendations,
          bigFive,
          patientSummary,
        }),
      })

      if (!response.ok) {
        const payload = await safeJson(response)
        throw new Error(payload?.error || `Failed to download ${format.toUpperCase()} export.`)
      }

      const blob = await response.blob()
      const disposition = response.headers.get('content-disposition') || ''
      const match = disposition.match(/filename=\"?([^\";]+)\"?/)
      const filename = match ? match[1] : `theramuse_report.${format}`

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      setExportError(error instanceof Error ? error.message : 'Unable to generate export.')
    } finally {
      setExportLoading(null)
    }
  }

  return (
    <div className="space-y-10" id="personalized-recommendations">
      {/* Summary */}
      <div className="glass-card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Heart className="h-8 w-8 text-red-500" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Personalised Therapy Plan</h2>
              <p className="text-sm text-gray-500">
                Session {patientSummary.sessionId} • {recommendations.total_songs ?? 0} curated tracks
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="btn-secondary flex items-center gap-2"
              onClick={downloadRecommendations}
              disabled={exportLoading !== null}
            >
              {exportLoading === 'json' ? <span className="btn-spinner" aria-hidden /> : <Download className="h-4 w-4" />}
              Download JSON
            </button>
            <button
              type="button"
              className="btn-secondary flex items-center gap-2"
              onClick={() => downloadReport('pdf')}
              disabled={exportLoading !== null}
            >
              {exportLoading === 'pdf' ? <span className="btn-spinner" aria-hidden /> : <FileText className="h-4 w-4" />}
              Download PDF
            </button>
            <button
              type="button"
              className="btn-secondary flex items-center gap-2"
              onClick={() => downloadReport('docx')}
              disabled={exportLoading !== null}
            >
              {exportLoading === 'docx' ? <span className="btn-spinner" aria-hidden /> : <FileType2 className="h-4 w-4" />}
              Download DOCX
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <SummaryItem label="Patient" value={patientSummary.name} />
          <SummaryItem label="Age" value={patientSummary.age.toString()} />
          <SummaryItem label="Birthplace" value={`${patientSummary.birthplaceCity || '—'}, ${patientSummary.birthplaceCountry}`} />
          <SummaryItem label="Sex" value={patientSummary.sex} />
          <SummaryItem label="Condition" value={formatCondition(patientSummary.condition)} />
          <SummaryItem label="Patient ID" value={patientSummary.patientId} />
        </div>
      </div>

      {exportError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{exportError}</div>
      ) : null}

      {/* Bandit Stats + Patient Context */}
      {(banditStats || recommendations.patient_context) && (
        <div className="grid gap-6 lg:grid-cols-2">
          {banditStats && (
            <div className="glass-card">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-accent-teal" />
                <h3 className="text-lg font-semibold text-gray-800">Reinforcement Learning Snapshot</h3>
              </div>
              <dl className="mt-4 grid gap-4 md:grid-cols-3">
                <Stat label="Interactions" value={banditStats.n_interactions} />
                <Stat label="Average Reward" value={banditStats.avg_reward?.toFixed(3) ?? '0.000'} />
                <Stat label="Exploration Rate" value={banditStats.exploration_rate?.toFixed(2) ?? '0.00'} />
              </dl>
              <p className="mt-3 text-xs text-gray-500">
                Thompson Sampling adaptively balances exploration and exploitation using the latest feedback.
              </p>
            </div>
          )}
          {recommendations.patient_context && (
            <div className="glass-card">
              <div className="flex items-center gap-2">
                <Music className="h-5 w-5 text-accent-teal" />
                <h3 className="text-lg font-semibold text-gray-800">Patient Context</h3>
              </div>
              <pre className="mt-3 max-h-48 overflow-auto rounded-lg bg-gray-900/90 p-4 text-xs text-gray-100">
                {JSON.stringify(recommendations.patient_context, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Big Five Radar */}
      <div className="glass-card">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Big Five Personality Profile</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#cbd5f5" />
              <PolarAngleAxis dataKey="trait" stroke="#4b5563" />
              <PolarRadiusAxis domain={[0, 7]} stroke="#cbd5f5" />
              <Radar dataKey="value" stroke="#5B9C96" fill="#5B9C96" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {feedbackNotice && (
        <div
          className={`rounded-lg border px-4 py-3 text-sm ${
            feedbackNotice.tone === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
              : 'border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {feedbackNotice.message}
        </div>
      )}

      {/* Categories */}
      <div className="space-y-6">
        {categories.map((category) => {
          const isExpanded = expandedCategories.has(category.key)
          return (
            <div key={category.key} className="glass-card bg-white/80">
              <button
                type="button"
                className="flex w-full items-center justify-between text-left"
                onClick={() => handleToggleCategory(category.key)}
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{category.label}</h3>
                  <p className="text-sm text-gray-500">{category.songs.length} songs curated</p>
                </div>
                {isExpanded ? <ChevronUp className="h-6 w-6 text-accent-teal" /> : <ChevronDown className="h-6 w-6 text-accent-teal" />}
              </button>

              {isExpanded && (
                <div className="mt-6 space-y-4">
                  {category.songs.map((song, index) => {
                    return (
                      <div
                        key={`${category.key}-${index}`}
                        className="rounded-xl border border-table-border/60 bg-white/80 p-4 shadow-sm"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="rank-badge">#{index + 1}</span>
                              <h4 className="text-lg font-semibold text-gray-800">{song.title}</h4>
                            </div>
                            {song.channel && <p className="text-sm text-gray-500">Channel • {song.channel}</p>}
                            {song.description && (
                              <p className="mt-2 text-sm text-gray-600">{String(song.description).slice(0, 180)}...</p>
                            )}
                          </div>
                          {song.url && (
                            <a
                              href={song.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-secondary flex items-center gap-2"
                            >
                              <ExternalLink className="h-4 w-4" />
                              Watch on YouTube
                            </a>
                          )}
                        </div>

                        {onFeedback && (
                          <div className="mt-4 flex flex-wrap items-center gap-3">
                            <button
                              type="button"
                              className="feedback-btn like"
                              onClick={() => handleFeedback(category.key, song, 'like')}
                              disabled={feedbackLoadingId === `${category.key}-${song.title}-like`}
                            >
                              <ThumbsUp className="h-4 w-4" />
                              Like
                            </button>
                            <button
                              type="button"
                              className="feedback-btn dislike"
                              onClick={() => handleFeedback(category.key, song, 'dislike')}
                              disabled={feedbackLoadingId === `${category.key}-${song.title}-dislike`}
                            >
                              <ThumbsDown className="h-4 w-4" />
                              Dislike
                            </button>
                            <button
                              type="button"
                              className="feedback-btn skip"
                              onClick={() => handleFeedback(category.key, song, 'skip')}
                              disabled={feedbackLoadingId === `${category.key}-${song.title}-skip`}
                            >
                              <MoveRight className="h-4 w-4" />
                              Skip
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          className="btn-primary flex items-center gap-2"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUp className="h-4 w-4" />
          Scroll to Top
        </button>
      </div>
    </div>
  )
}

async function safeJson(response: Response) {
  try {
    return await response.json()
  } catch {
    return null
  }
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-table-border/60 bg-white/80 p-3 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-gray-400">{label}</p>
      <p className="text-sm font-semibold text-gray-700">{value || '—'}</p>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-gray-400">{label}</p>
      <p className="text-xl font-semibold text-gray-800">{value}</p>
    </div>
  )
}
