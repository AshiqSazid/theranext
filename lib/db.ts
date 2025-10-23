import Database, { Database as SQLiteDatabase } from 'better-sqlite3'
import path from 'path'

import { AnalyticsSnapshot, PatientDetail, PatientRecord } from '@/lib/types'

let dbInstance: SQLiteDatabase | null = null

function resolveDatabasePath(): string {
  if (process.env.THERAMUSE_DB_PATH) {
    return process.env.THERAMUSE_DB_PATH
  }
  return path.join(process.cwd(), 'theramuse.db')
}

function getDb(): SQLiteDatabase {
  if (!dbInstance) {
    dbInstance = new Database(resolveDatabasePath(), { fileMustExist: false })
    dbInstance.pragma('journal_mode = WAL')
  }
  return dbInstance
}

function safeJsonParse<T>(value: unknown, fallback: T): T {
  if (typeof value !== 'string') {
    return fallback
  }
  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

export function fetchPatients(): PatientRecord[] {
  const db = getDb()

  const rows = db
    .prepare(
      `
        SELECT
          COALESCE(patient_id, id) AS patient_id,
          name,
          age,
          condition,
          birth_year,
          patient_info,
          created_at
        FROM patients
        ORDER BY datetime(created_at) DESC
      `,
    )
    .all()

  return rows.map((row: any) => {
    const info = safeJsonParse<Record<string, unknown>>(row.patient_info, {})
    return {
      patientId: row.patient_id,
      name: row.name,
      age: row.age ?? null,
      condition: row.condition ?? 'unknown',
      birthYear: row.birth_year ?? null,
      createdAt: row.created_at ?? null,
      patientInfo: info,
    }
  })
}

export function fetchPatientDetail(patientId: string): PatientDetail | null {
  const db = getDb()

  const patientRow = db
    .prepare(
      `
        SELECT
          COALESCE(patient_id, id) AS patient_id,
          name,
          age,
          condition,
          birth_year,
          patient_info,
          created_at
        FROM patients
        WHERE COALESCE(patient_id, id) = ?
      `,
    )
    .get(patientId)

  if (!patientRow) {
    return null
  }

  const sessions = db
    .prepare(
      `
        SELECT
          session_id,
          session_date,
          recommendations_count,
          session_data
        FROM therapy_sessions
        WHERE patient_id = ?
        ORDER BY datetime(session_date) DESC
      `,
    )
    .all(patientId)

  const feedback = db
    .prepare(
      `
        SELECT
          id,
          feedback_type,
          reward,
          song_title,
          video_id,
          created_at
        FROM therapy_feedback
        WHERE patient_id = ?
        ORDER BY datetime(created_at) DESC
      `,
    )
    .all(patientId)

  const big5 = db
    .prepare(
      `
        SELECT
          openness,
          conscientiousness,
          extraversion,
          agreeableness,
          neuroticism,
          reinforcement_learning,
          created_at
        FROM big5_scores
        WHERE patient_id = ?
        ORDER BY datetime(created_at) DESC
        LIMIT 1
      `,
    )
    .get(patientId)

  const patientInfo = safeJsonParse<Record<string, unknown>>(patientRow.patient_info, {})

  return {
    patient: {
      patientId: patientRow.patient_id,
      name: patientRow.name,
      age: patientRow.age,
      condition: patientRow.condition,
      birthYear: patientRow.birth_year,
      createdAt: patientRow.created_at,
      patientInfo,
    },
    sessions: sessions.map((session: any) => ({
      sessionId: session.session_id,
      sessionDate: session.session_date,
      recommendationsCount: session.recommendations_count,
      sessionData: safeJsonParse<Record<string, unknown>>(session.session_data, {}),
    })),
    feedback: feedback.map((row: any) => ({
      id: row.id,
      feedbackType: row.feedback_type,
      reward: row.reward,
      songTitle: row.song_title,
      videoId: row.video_id,
      createdAt: row.created_at,
    })),
    bigFive: big5
      ? {
          openness: big5.openness,
          conscientiousness: big5.conscientiousness,
          extraversion: big5.extraversion,
          agreeableness: big5.agreeableness,
          neuroticism: big5.neuroticism,
          reinforcementLearning: big5.reinforcement_learning ?? 0,
          capturedAt: big5.created_at,
        }
      : null,
  }
}

export function fetchAnalytics(): AnalyticsSnapshot {
  const db = getDb()

  const totals = db
    .prepare(
      `
        SELECT
          (SELECT COUNT(*) FROM therapy_sessions) AS total_sessions,
          (SELECT COUNT(*) FROM therapy_feedback) AS total_feedback,
          (SELECT COUNT(DISTINCT COALESCE(patient_id, id)) FROM patients) AS total_patients
      `,
    )
    .get()

  const rewards = db
    .prepare(
      `
        SELECT
          condition,
          AVG(reward) AS avg_reward,
          COUNT(*) AS samples
        FROM therapy_feedback
        GROUP BY condition
      `,
    )
    .all()

  const sessionsOverTime = db
    .prepare(
      `
        SELECT
          date(session_date) AS date,
          COUNT(*) AS sessions
        FROM therapy_sessions
        GROUP BY date(session_date)
        ORDER BY date(session_date) ASC
      `,
    )
    .all()

  return {
    totals: {
      totalSessions: totals?.total_sessions ?? 0,
      totalFeedback: totals?.total_feedback ?? 0,
      totalPatients: totals?.total_patients ?? 0,
    },
    rewardsByCondition: rewards.map((row: any) => ({
      condition: row.condition ?? 'unknown',
      averageReward: row.avg_reward ?? 0,
      count: row.samples ?? 0,
    })),
    sessionsOverTime: sessionsOverTime.map((row: any) => ({
      date: row.date,
      sessions: row.sessions ?? 0,
    })),
  }
}
