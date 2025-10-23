'use client'

import { ReactNode, useState } from 'react'
import { Brain, Moon, Smile, Sparkles } from 'lucide-react'

import IntakeForm from '@/components/IntakeForm'
import RecommendationResults from '@/components/RecommendationResults'
import type {
  BigFiveScores,
  IntakeFormValues,
  PatientSummary,
  RecommendationPayload,
  RecommendationSong,
} from '@/lib/types'

interface RecommendationApiResponse {
  recommendations: RecommendationPayload
  patientSummary: PatientSummary
  patientInfo: Record<string, unknown>
  bigFive: BigFiveScores
}

export default function HomePage() {
  const [loading, setLoading] = useState(false)
  const [feedbackLoadingId, setFeedbackLoadingId] = useState<string | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)

  const [recommendations, setRecommendations] = useState<RecommendationPayload | null>(null)
  const [patientSummary, setPatientSummary] = useState<PatientSummary | null>(null)
  const [patientInfo, setPatientInfo] = useState<Record<string, unknown> | null>(null)
  const [bigFive, setBigFive] = useState<BigFiveScores | null>(null)

  const handleReset = () => {
    setRecommendations(null)
    setPatientSummary(null)
    setPatientInfo(null)
    setBigFive(null)
    setApiError(null)
  }

  const handleFormSubmit = async (formData: IntakeFormValues) => {
    setLoading(true)
    setApiError(null)

    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intake: formData }),
      })

      if (!response.ok) {
        const errorPayload = await safeJson(response)
        throw new Error(errorPayload?.error ?? 'Unable to generate recommendations.')
      }

      const data = (await response.json()) as RecommendationApiResponse
      setRecommendations(data.recommendations)
      setPatientSummary(data.patientSummary)
      setPatientInfo(data.patientInfo)
      setBigFive(data.bigFive)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unexpected error generating recommendations.'
      setApiError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleFeedback = async ({
    categoryKey,
    song,
    feedbackType,
  }: {
    categoryKey: string
    song: RecommendationSong
    feedbackType: string
  }) => {
    if (!recommendations || !patientSummary || !patientInfo) return

    const buttonId = `${categoryKey}-${song.title}-${feedbackType}`
    setFeedbackLoadingId(buttonId)

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: recommendations.session_id,
          patientId: patientSummary.patientId,
          condition: recommendations.condition,
          feedbackType,
          song,
          patientInfo,
        }),
      })

      if (!response.ok) {
        const payload = await safeJson(response)
        throw new Error(payload?.error ?? 'Failed to record feedback.')
      }
    } finally {
      setFeedbackLoadingId(null)
    }
  }

  return (
    <div className="mx-auto max-w-6xl">
      <Header showReset={Boolean(recommendations)} onReset={handleReset} />

      <FeatureHighlights />

      {apiError && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{apiError}</div>
      )}

      {!recommendations || !patientSummary || !bigFive || !patientInfo ? (
        <IntakeForm onSubmit={handleFormSubmit} loading={loading} />
      ) : (
        <div className="space-y-6">
          <button type="button" className="btn-secondary" onClick={handleReset}>
            ← Start New Intake
          </button>
          <RecommendationResults
            recommendations={recommendations}
            patientSummary={patientSummary}
            patientInfo={patientInfo}
            bigFive={bigFive}
            onFeedback={handleFeedback}
            feedbackLoadingId={feedbackLoadingId}
          />
        </div>
      )}
    </div>
  )
}

function Header({ showReset, onReset }: { showReset: boolean; onReset: () => void }) {
  return (
    <div className="mb-12 text-center">
      <div className="mb-6 flex justify-center">
        <div className="flex h-24 w-64 items-center justify-center rounded-lg bg-gradient-to-r from-accent-teal to-accent-olive shadow-lg">
          <span className="text-3xl font-bold text-white">TheraMuse RX</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Personalised Music Therapy Engine</h1>
          <p className="mt-2 max-w-2xl text-gray-600">
            Evidence-backed music interventions powered by reinforcement learning and YouTube data fusion.
            Capture a comprehensive intake, generate bespoke recommendations, and iterate with real-time feedback.
          </p>
        </div>
        {showReset && (
          <button type="button" className="btn-secondary flex items-center gap-2" onClick={onReset}>
            <Sparkles className="h-4 w-4" />
            New Session
          </button>
        )}
      </div>
    </div>
  )
}

function FeatureHighlights() {
  return (
    <div className="mb-12 grid gap-6 md:grid-cols-3">
      <HighlightCard
        icon={<Brain className="h-8 w-8 text-white" />}
        title="Cognitive Uplift"
        description="Cross-validates nostalgia windows, therapeutic ragas, and patient context for dementia care."
      />
      <HighlightCard
        icon={<Moon className="h-8 w-8 text-white" />}
        title="Sleep & Calmness"
        description="Delivers circadian-aware playlists that blend binaural beats, ambient focus, and sensory cues."
      />
      <HighlightCard
        icon={<Smile className="h-8 w-8 text-white" />}
        title="Emotional Resilience"
        description="Aligns Big Five personality scores with musical motifs to stabilise mood and motivation."
      />
    </div>
  )
}

function HighlightCard({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <div className="glass-card text-left">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent-teal to-accent-olive text-white">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
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
