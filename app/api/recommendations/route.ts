import { NextRequest, NextResponse } from 'next/server'
import { differenceInYears, parseISO } from 'date-fns'

import type { BigFiveScores, IntakeFormValues, RecommendationPayload, PatientSummary } from '@/lib/types'
import { runTheraMuse } from '@/lib/server/theramuse'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const intake = body?.intake as IntakeFormValues | undefined

    if (!intake) {
      return NextResponse.json({ error: 'Missing intake payload.' }, { status: 400 })
    }

    const { patientInfo, patientSummary, bigFive } = transformIntake(intake)
    const patientId = patientSummary.patientId

    const pythonPayload = {
      action: 'recommend',
      data: {
        patient_info: patientInfo,
        condition: intake.condition,
        patient_id: patientId,
      },
      db_path: process.env.THERAMUSE_DB_PATH,
      model_path: process.env.THERAMUSE_MODEL_PATH,
    }

    const result = await runTheraMuse(pythonPayload)
    const recommendations = result?.recommendations as RecommendationPayload | undefined

    if (!recommendations) {
      throw new Error('TheraMuse did not return recommendations.')
    }

    const sessionId = recommendations.session_id ?? 'session_unknown'

    const response = {
      recommendations,
      patientSummary: {
        ...patientSummary,
        sessionId,
      },
      patientInfo,
      bigFive,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Recommendation API error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to generate recommendations.',
      },
      { status: 500 },
    )
  }
}

function transformIntake(intake: IntakeFormValues) {
  const birthDate = parseIsoDate(intake.dateOfBirth)
  const birthYear = birthDate?.getFullYear()
  const age = birthDate ? Math.max(differenceInYears(new Date(), birthDate), 0) : 0

  const bigFive = computeBigFive(intake.bigFiveResponses)

  const patientInfo = {
    name: intake.name,
    sex: intake.sex,
    age,
    birth_year: birthYear,
    birthplace_city: intake.birthplaceCity,
    birthplace_country: intake.birthplaceCountry,
    condition: intake.condition,
    instruments: intake.instruments,
    preferred_languages: intake.preferredLanguages,
    favorite_genre: intake.favoriteGenres.join(', '),
    favorite_musician: intake.favoriteMusician,
    favorite_season: intake.favoriteSeason,
    natural_elements: intake.naturalElements,
    difficulty_sleeping: intake.difficultySleeping,
    trouble_remembering: intake.troubleRemembering,
    forgets_everyday_things: intake.forgetsEverydayThings,
    difficulty_recalling_old_memories: intake.difficultyRecallingOldMemories,
    memory_worse_than_year_ago: intake.memoryWorseThanYearAgo,
    visited_mental_health_professional: intake.visitedMentalHealthProfessional,
    big5_scores: bigFive,
  }

  const patientSummary: PatientSummary = {
    patientId: generatePatientId(),
    sessionId: '',
    name: intake.name,
    age,
    sex: intake.sex,
    condition: intake.condition,
    birthplaceCity: intake.birthplaceCity,
    birthplaceCountry: intake.birthplaceCountry,
  }

  return { patientInfo, patientSummary, bigFive }
}

function computeBigFive(responses: number[]): BigFiveScores {
  const reverse = (value: number) => 8 - value

  const padded = [...responses]
  while (padded.length < 10) {
    padded.push(4)
  }

  const [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10] = padded

  const openness = average(q5, reverse(q10))
  const conscientiousness = average(q3, reverse(q8))
  const extraversion = average(q1, reverse(q6))
  const agreeableness = average(reverse(q2), q7)
  const neuroticism = average(q4, reverse(q9))

  return {
    openness,
    conscientiousness,
    extraversion,
    agreeableness,
    neuroticism,
  }
}

function average(...values: number[]) {
  const valid = values.filter((value) => Number.isFinite(value))
  if (!valid.length) return 0
  const sum = valid.reduce((total, value) => total + value, 0)
  return Number((sum / valid.length).toFixed(2))
}

function parseIsoDate(value: string | undefined) {
  if (!value) return null
  try {
    return parseISO(value)
  } catch {
    return null
  }
}

function generatePatientId() {
  return `patient_${Date.now()}`
}
