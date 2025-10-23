import { Info, Cpu, Share2, Shield } from 'lucide-react'

import { formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'

const releaseDate = formatDate(new Date().toISOString())

const pillars = [
  {
    icon: <Cpu className="h-6 w-6" />,
    title: 'Hybrid Intelligence Stack',
    description:
      'Blends deterministic therapy heuristics with Linear Thompson Sampling, capturing feedback to progressively personalise playlists.',
  },
  {
    icon: <Share2 className="h-6 w-6" />,
    title: 'YouTube Knowledge Graph',
    description:
      'Enriched query pipelines surface culturally aligned performances, long-form recordings, and therapy-specific arrangements.',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Clinical Observability',
    description:
      'Full telemetry covering patient intake, feedback audit trails, and reinforcement learning counters for compliance reviews.',
  },
]

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <section className="glass-card">
        <div className="mb-4 flex items-center gap-3">
          <Info className="h-6 w-6 text-accent-teal" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">About TheraMuse RX</h1>
            <p className="text-sm text-gray-500">Last synchronised: {releaseDate}</p>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          TheraMuse RX is a research-driven music therapy assistant designed by clinicians and machine learning engineers to
          accelerate personalised interventions for dementia, Down Syndrome, and ADHD populations. The system ingests rich
          intake assessments, maps them to generational nostalgia cues, and curates long-form content from YouTube with
          rigorous filtering. Reinforcement learning closes the loop, ensuring every interaction refines the catalogue.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="glass-card bg-white/80">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent-teal text-white">
              {pillar.icon}
            </div>
            <h2 className="text-lg font-semibold text-gray-800">{pillar.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{pillar.description}</p>
          </div>
        ))}
      </section>

      <section className="glass-card">
        <h2 className="text-lg font-semibold text-gray-800">Core Capabilities</h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          <li className="rounded-lg border border-table-border/60 bg-white/70 p-4 text-sm text-gray-600">
            Comprehensive intake covering demographics, cultural preferences, and a ten-item Big Five assessment.
          </li>
          <li className="rounded-lg border border-table-border/60 bg-white/70 p-4 text-sm text-gray-600">
            Python machine learning core orchestrated via Next.js API routes for real-time recommendations.
          </li>
          <li className="rounded-lg border border-table-border/60 bg-white/70 p-4 text-sm text-gray-600">
            SQLite persistence for patients, sessions, feedback, and generated artefacts with instant analytics dashboards.
          </li>
          <li className="rounded-lg border border-table-border/60 bg-white/70 p-4 text-sm text-gray-600">
            Feedback capture (like/dislike/skip) feeding into Linear Thompson Sampling for continual improvement.
          </li>
        </ul>
      </section>
    </div>
  )
}
