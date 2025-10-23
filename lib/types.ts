export type SupportedCondition = 'dementia' | 'down_syndrome' | 'adhd'

export interface BigFiveScores {
  openness: number
  conscientiousness: number
  extraversion: number
  agreeableness: number
  neuroticism: number
}

export interface IntakeFormValues {
  name: string
  sex: 'Male' | 'Female' | 'Other'
  birthplaceCity: string
  birthplaceCountry: string
  dateOfBirth: string
  condition: SupportedCondition
  instruments: string[]
  preferredLanguages: string[]
  favoriteGenres: string[]
  favoriteMusician: string
  favoriteSeason: string
  naturalElements: string[]
  difficultySleeping: boolean
  troubleRemembering: boolean
  forgetsEverydayThings: boolean
  difficultyRecallingOldMemories: boolean
  memoryWorseThanYearAgo: boolean
  visitedMentalHealthProfessional: boolean
  bigFiveResponses: number[]
}

export interface RecommendationSong {
  title: string
  url?: string
  channel?: string
  description?: string
  id?: string
  [key: string]: unknown
}

export interface RecommendationCategory {
  label?: string
  songs: RecommendationSong[]
  query?: string | string[]
}

export interface RecommendationPayload {
  session_id: string
  patient_id: string
  condition: SupportedCondition
  total_songs: number
  categories: Record<
    string,
    {
      query?: string | string[]
      songs: RecommendationSong[]
      [key: string]: unknown
    }
  >
  bandit_stats?: {
    n_interactions: number
    avg_reward: number
    exploration_rate: number
  }
  patient_context?: Record<string, unknown>
  method?: string
}

export interface RecommendationResponse {
  recommendations: RecommendationPayload
  patientInfo: PatientSummary
  bigFive: BigFiveScores
}

export interface PatientSummary {
  patientId: string
  sessionId: string
  name: string
  age: number
  sex: string
  condition: string
  birthplaceCity: string
  birthplaceCountry: string
}

export interface PatientRecord {
  patientId: string
  name: string
  age: number | null
  condition: string
  birthYear: number | null
  createdAt: string | null
  patientInfo: Record<string, unknown>
}

export interface PatientDetail {
  patient: PatientRecord
  sessions: Array<{
    sessionId: string
    sessionDate: string
    recommendationsCount: number
    sessionData: Record<string, unknown>
  }>
  feedback: Array<{
    id: number
    feedbackType: string
    reward: number
    songTitle: string | null
    videoId: string | null
    createdAt: string
  }>
  bigFive: null | {
    openness: number
    conscientiousness: number
    extraversion: number
    agreeableness: number
    neuroticism: number
    reinforcementLearning: number
    capturedAt: string
  }
}

export interface AnalyticsSnapshot {
  totals: {
    totalSessions: number
    totalFeedback: number
    totalPatients: number
  }
  rewardsByCondition: Array<{
    condition: string
    averageReward: number
    count: number
  }>
  sessionsOverTime: Array<{
    date: string
    sessions: number
  }>
}
