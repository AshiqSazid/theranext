import { format } from 'date-fns'

import type { RecommendationPayload, RecommendationSong, SupportedCondition } from '@/lib/types'

const CONDITION_LABELS: Record<SupportedCondition, string> = {
  dementia: "Dementia / Alzheimer's",
  down_syndrome: 'Down Syndrome',
  adhd: 'ADHD',
}

export function formatCondition(condition: string): string {
  return CONDITION_LABELS[condition as SupportedCondition] ?? condition
}

export function formatDate(value: string | null | undefined, fallback = 'Unknown'): string {
  if (!value) return fallback
  try {
    return format(new Date(value), 'PPP')
  } catch {
    return fallback
  }
}

export function normaliseSong(song: RecommendationSong) {
  const { url, video_id, id, ...rest } = song as any
  const href = url || (video_id ? `https://www.youtube.com/watch?v=${video_id}` : undefined)

  return {
    url: href,
    videoId: video_id ?? id ?? null,
    ...rest,
  }
}

export function deriveCategories(payload: RecommendationPayload) {
  const entries = Object.entries(payload.categories ?? {})

  return entries.map(([rawKey, category]) => {
    const label = CATEGORY_LABELS[rawKey] ?? toTitleCase(rawKey.replace(/_/g, ' '))
    const songs = (category.songs ?? []).map((song) => normaliseSong(song))
    return {
      key: rawKey,
      label,
      songs,
      query: category.query,
    }
  })
}

const CATEGORY_LABELS: Record<string, string> = {
  birthplace_country: 'From Your Country',
  birthplace_city: 'From Your City',
  instruments: 'Instrumental Favorites',
  seasonal: 'Seasonal Music',
  natural_elements: 'Nature Inspired',
  favorite_genre: 'Favorite Genres',
  favorite_musician: 'Favorite Musician',
  therapeutic: 'Therapeutic Selections',
  personality_based: 'Personality Match',
  calming_sensory: 'Calming Sensory',
  concentration: 'Focus & Concentration',
  binaural_beats: 'Binaural Beats',
  relief_study: 'Study & Relief',
  additional_calm: 'Additional Calming',
  additional_focus: 'Additional Focus',
}

function toTitleCase(value: string) {
  return value
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
