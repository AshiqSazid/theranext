import { NextRequest, NextResponse } from 'next/server'

import { runTheraMuse } from '@/lib/server/theramuse'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, patientId, condition, feedbackType, song, patientInfo } = body ?? {}

    if (!sessionId || !patientId || !condition || !feedbackType) {
      return NextResponse.json({ error: 'Missing feedback fields.' }, { status: 400 })
    }

    await runTheraMuse({
      action: 'feedback',
      data: {
        session_id: sessionId,
        patient_id: patientId,
        condition,
        feedback_type: feedbackType,
        song,
        patient_info: patientInfo,
      },
      db_path: process.env.THERAMUSE_DB_PATH,
      model_path: process.env.THERAMUSE_MODEL_PATH,
    })

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('Feedback API error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to record feedback.',
      },
      { status: 500 },
    )
  }
}
