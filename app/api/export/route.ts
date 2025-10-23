import { NextRequest, NextResponse } from 'next/server'

import { runTheraMuse } from '@/lib/server/theramuse'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { format, patientInfo, recommendations, bigFive, patientSummary } = body ?? {}

    if (!format || !patientInfo || !recommendations || !bigFive) {
      return NextResponse.json({ error: 'Missing export payload.' }, { status: 400 })
    }

    const result = await runTheraMuse({
      action: 'export',
      data: {
        format,
        patient_info: patientInfo,
        recommendations,
        big5_scores: bigFive,
        patient_summary: patientSummary,
      },
    })

    const buffer = Buffer.from(result.content, 'base64')
    const filename = result.filename || `theramuse_export.${format}`
    const response = new NextResponse(buffer, {
      headers: {
        'Content-Type': result.mimeType || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
    return response
  } catch (error) {
    console.error('Export API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate export.' },
      { status: 500 },
    )
  }
}
