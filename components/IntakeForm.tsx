'use client'

import { useState, type ChangeEvent, type FormEvent } from 'react'
import {
  User,
  MapPin,
  Calendar,
  Heart,
  Music,
  CloudSun,
  Feather,
  Languages,
} from 'lucide-react'

import type { IntakeFormValues, SupportedCondition } from '@/lib/types'

interface IntakeFormProps {
  onSubmit: (data: IntakeFormValues) => void
  loading: boolean
}

const CONDITIONS: Record<SupportedCondition, string> = {
  dementia: "Dementia / Alzheimer's",
  down_syndrome: 'Down Syndrome',
  adhd: 'ADHD',
}

const INSTRUMENTS = [
  'Piano',
  'Guitar',
  'Violin',
  'Flute',
  'Sitar',
  'Tabla',
  'Drums',
  'Saxophone',
  'Harmonium',
  'Cello',
]

const LANGUAGES = [
  'English',
  'Bengali',
  'Hindi',
  'Urdu',
  'Spanish',
  'French',
  'German',
  'Arabic',
  'Mandarin',
  'Japanese',
]

const NATURAL_ELEMENTS = ['Rain', 'Ocean', 'Forest', 'Wind', 'Fireplace', 'Birdsong', 'Mountain Breeze']

const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter', 'Monsoon']

const BIG_FIVE_STATEMENTS = [
  'I see myself as extraverted, enthusiastic',
  'I see myself as critical, quarrelsome',
  'I see myself as dependable, self-disciplined',
  'I see myself as anxious, easily upset',
  'I see myself as open to new experiences, complex',
  'I see myself as reserved, quiet',
  'I see myself as sympathetic, warm',
  'I see myself as disorganized, careless',
  'I see myself as calm, emotionally stable',
  'I see myself as conventional, uncreative',
]

const INITIAL_FORM: IntakeFormValues = {
  name: '',
  sex: 'Female',
  birthplaceCity: '',
  birthplaceCountry: '',
  dateOfBirth: '',
  condition: 'dementia',
  instruments: [],
  preferredLanguages: ['Bengali'],
  favoriteGenres: [],
  favoriteMusician: '',
  favoriteSeason: 'Spring',
  naturalElements: [],
  difficultySleeping: false,
  troubleRemembering: false,
  forgetsEverydayThings: false,
  difficultyRecallingOldMemories: false,
  memoryWorseThanYearAgo: false,
  visitedMentalHealthProfessional: false,
  bigFiveResponses: Array(10).fill(4),
}

export default function IntakeForm({ onSubmit, loading }: IntakeFormProps) {
  const [formData, setFormData] = useState<IntakeFormValues>(INITIAL_FORM)
  const [error, setError] = useState<string | null>(null)

  const handleFieldChange =
    (field: keyof IntakeFormValues) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { value } = event.target
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }

  const handleToggleOption = (field: keyof Pick<IntakeFormValues, 'instruments' | 'preferredLanguages' | 'favoriteGenres' | 'naturalElements'>, option: string) => {
    setFormData((prev) => {
      const current = new Set(prev[field])
      if (current.has(option)) {
        current.delete(option)
      } else {
        current.add(option)
      }
      return {
        ...prev,
        [field]: Array.from(current),
      }
    })
  }

  const handleCheckboxChange =
    (field: keyof Pick<
      IntakeFormValues,
      | 'difficultySleeping'
      | 'troubleRemembering'
      | 'forgetsEverydayThings'
      | 'difficultyRecallingOldMemories'
      | 'memoryWorseThanYearAgo'
      | 'visitedMentalHealthProfessional'
    >) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.checked,
      }))
    }

  const handleBigFiveChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    setFormData((prev) => {
      const updated = [...prev.bigFiveResponses]
      updated[index] = value
      return { ...prev, bigFiveResponses: updated }
    })
  }

  const resetForm = () => {
    setFormData(INITIAL_FORM)
    setError(null)
  }

  const validateForm = () => {
    if (!formData.name.trim()) return 'Please provide the patient name.'
    if (!formData.dateOfBirth) return 'Date of birth is required.'
    if (!formData.birthplaceCountry.trim()) return 'Birthplace country is required.'
    if (formData.favoriteGenres.length === 0) return 'Select at least one favorite genre.'
    return null
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }
    setError(null)
    onSubmit(formData)
  }

  return (
    <div className="glass-card max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <User className="w-8 h-8 text-accent-teal mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">Patient Intake</h2>
        </div>
        <button type="button" className="btn-secondary" onClick={resetForm} disabled={loading}>
          Reset
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Demographics */}
        <section>
          <h3 className="section-heading flex items-center gap-2">
            <User className="h-5 w-5 text-accent-teal" />
            Demographics
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="input-label">Full Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={handleFieldChange('name')}
                required
                placeholder="Enter patient's name"
              />
            </div>
            <div>
              <label className="input-label">Sex *</label>
              <select value={formData.sex} onChange={handleFieldChange('sex')}>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="input-label flex items-center gap-2">
                <Calendar className="h-4 w-4 text-accent-teal" />
                Date of Birth *
              </label>
              <input type="date" value={formData.dateOfBirth} onChange={handleFieldChange('dateOfBirth')} required />
            </div>
            <div>
              <label className="input-label flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent-teal" />
                Birthplace City
              </label>
              <input
                type="text"
                value={formData.birthplaceCity}
                onChange={handleFieldChange('birthplaceCity')}
                placeholder="e.g. Dhaka"
              />
            </div>
            <div>
              <label className="input-label flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent-teal" />
                Birthplace Country *
              </label>
              <input
                type="text"
                value={formData.birthplaceCountry}
                onChange={handleFieldChange('birthplaceCountry')}
                required
                placeholder="e.g. Bangladesh"
              />
            </div>
            <div>
              <label className="input-label flex items-center gap-2">
                <Heart className="h-4 w-4 text-accent-teal" />
                Therapy Focus *
              </label>
              <select value={formData.condition} onChange={handleFieldChange('condition')}>
                {Object.entries(CONDITIONS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section>
          <h3 className="section-heading flex items-center gap-2">
            <Music className="h-5 w-5 text-accent-teal" />
            Musical Preferences
          </h3>
          <div className="space-y-6">
            <div>
              <label className="input-label">Favorite Genres (select up to 3) *</label>
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  'Classical',
                  'Folk',
                  'Jazz',
                  'Pop',
                  'Rock',
                  'Traditional',
                  'Instrumental',
                  'Devotional',
                  'Ambient',
                  'Meditation',
                ].map((genre) => (
                  <label key={genre} className="checkbox-pill">
                    <input
                      type="checkbox"
                      checked={formData.favoriteGenres.includes(genre)}
                      onChange={() => handleToggleOption('favoriteGenres', genre)}
                    />
                    <span>{genre}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="input-label flex items-center gap-2">
                  <Music className="h-4 w-4 text-accent-teal" />
                  Instruments
                </label>
                <div className="grid gap-3 md:grid-cols-2">
                  {INSTRUMENTS.map((instrument) => (
                    <label key={instrument} className="checkbox-pill">
                      <input
                        type="checkbox"
                        checked={formData.instruments.includes(instrument)}
                        onChange={() => handleToggleOption('instruments', instrument)}
                      />
                      <span>{instrument}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="input-label flex items-center gap-2">
                  <Languages className="h-4 w-4 text-accent-teal" />
                  Preferred Languages
                </label>
                <div className="grid gap-3 md:grid-cols-2">
                  {LANGUAGES.map((language) => (
                    <label key={language} className="checkbox-pill">
                      <input
                        type="checkbox"
                        checked={formData.preferredLanguages.includes(language)}
                        onChange={() => handleToggleOption('preferredLanguages', language)}
                      />
                      <span>{language}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="input-label">Favorite Musician / Artist</label>
                <input
                  type="text"
                  value={formData.favoriteMusician}
                  onChange={handleFieldChange('favoriteMusician')}
                  placeholder="e.g. Miles, Lata Mangeshkar"
                />
              </div>
              <div>
                <label className="input-label flex items-center gap-2">
                  <CloudSun className="h-4 w-4 text-accent-teal" />
                  Favorite Season
                </label>
                <select value={formData.favoriteSeason} onChange={handleFieldChange('favoriteSeason')}>
                  {SEASONS.map((season) => (
                    <option key={season} value={season}>
                      {season}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="input-label flex items-center gap-2">
                <Feather className="h-4 w-4 text-accent-teal" />
                Natural Elements
              </label>
              <div className="grid gap-3 md:grid-cols-3">
                {NATURAL_ELEMENTS.map((element) => (
                  <label key={element} className="checkbox-pill">
                    <input
                      type="checkbox"
                      checked={formData.naturalElements.includes(element)}
                      onChange={() => handleToggleOption('naturalElements', element)}
                    />
                    <span>{element}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Health Assessment */}
        <section>
          <h3 className="section-heading flex items-center gap-2">
            <Heart className="h-5 w-5 text-accent-teal" />
            Cognitive & Lifestyle Indicators
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="checkbox-card">
              <input
                type="checkbox"
                checked={formData.difficultySleeping}
                onChange={handleCheckboxChange('difficultySleeping')}
              />
              <span>Difficulty Sleeping</span>
            </label>
            <label className="checkbox-card">
              <input
                type="checkbox"
                checked={formData.troubleRemembering}
                onChange={handleCheckboxChange('troubleRemembering')}
              />
              <span>Trouble Remembering Recent Events</span>
            </label>
            <label className="checkbox-card">
              <input
                type="checkbox"
                checked={formData.forgetsEverydayThings}
                onChange={handleCheckboxChange('forgetsEverydayThings')}
              />
              <span>Forgets Everyday Tasks</span>
            </label>
            <label className="checkbox-card">
              <input
                type="checkbox"
                checked={formData.difficultyRecallingOldMemories}
                onChange={handleCheckboxChange('difficultyRecallingOldMemories')}
              />
              <span>Difficulty Recalling Older Memories</span>
            </label>
            <label className="checkbox-card">
              <input
                type="checkbox"
                checked={formData.memoryWorseThanYearAgo}
                onChange={handleCheckboxChange('memoryWorseThanYearAgo')}
              />
              <span>Memory Worse Than a Year Ago</span>
            </label>
            <label className="checkbox-card">
              <input
                type="checkbox"
                checked={formData.visitedMentalHealthProfessional}
                onChange={handleCheckboxChange('visitedMentalHealthProfessional')}
              />
              <span>Visited Mental Health Professional</span>
            </label>
          </div>
        </section>

        {/* Big Five */}
        <section>
          <h3 className="section-heading">Big Five Personality Assessment</h3>
          <p className="text-sm text-gray-600">
            Rate each statement from <strong>1 (Strongly Disagree)</strong> to <strong>7 (Strongly Agree)</strong>.
          </p>
          <div className="space-y-6">
            {BIG_FIVE_STATEMENTS.map((statement, index) => (
              <div key={statement} className="rounded-lg border border-table-border/60 bg-white/60 p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-700">
                    {index + 1}. {statement}
                  </p>
                  <span className="text-xs font-medium text-accent-teal">
                    {formData.bigFiveResponses[index]} / 7
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={7}
                  value={formData.bigFiveResponses[index]}
                  onChange={handleBigFiveChange(index)}
                  className="range-slider"
                />
                <div className="mt-2 flex justify-between text-[11px] uppercase tracking-wide text-gray-400">
                  <span>Disagree</span>
                  <span>Neutral</span>
                  <span>Agree</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-center gap-4">
          <button type="submit" className="btn-primary min-w-[220px]" disabled={loading}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="btn-spinner" aria-hidden />
                Generating Recommendations…
              </span>
            ) : (
              'Generate Recommendations'
            )}
          </button>
          <button type="button" className="btn-secondary" onClick={resetForm} disabled={loading}>
            Clear Form
          </button>
        </div>
      </form>
    </div>
  )
}
