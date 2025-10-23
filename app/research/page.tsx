import { BookOpen, ChevronDown, Link } from 'lucide-react'

import {
  adhdResearch,
  applicationInsights,
  detailedCompilation,
  dementiaResearch,
  downSyndromeResearch,
  personalityResearch,
  referenceLinks,
  researchSections,
  type DetailedCompilationSection,
  type ResearchCategory,
  type ResearchPaper,
} from '@/content/researchEvidence'

export const dynamic = 'force-dynamic'

export default function ResearchPage() {
  const categories: ResearchCategory[] = [dementiaResearch, adhdResearch, downSyndromeResearch, personalityResearch]

  return (
    <div className="space-y-10">
      <header className="glass-card bg-white/90">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-accent-teal" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Research Evidence</h1>
              <p className="text-sm text-gray-600">
                Comprehensive scientific evidence supporting music therapy for dementia, ADHD, Down Syndrome, and
                personality-aligned playlist design.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="space-y-8">
        {researchSections.map((section) => (
          <article key={section.title} className="glass-card bg-white/80">
            <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{section.summary}</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              {section.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-accent-teal" aria-hidden />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <DetailsCard
        title={detailedCompilation.title}
        description="Deep-dive summaries covering study design, key findings, and implementation guidance."
        sections={detailedCompilation.sections}
      />

      {categories.map((category) => (
        <CategoryCard key={category.heading} category={category} />
      ))}

      <section className="glass-card bg-white/80">
        <h2 className="text-xl font-semibold text-gray-800">Integrated Practice Guidance</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {applicationInsights.map((block) => (
            <div key={block.title} className="rounded-xl border border-table-border/50 bg-white/70 p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800">{block.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                {block.bullets.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-accent-teal" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section
        className="glass-card border-l-4 border-accent-teal bg-gradient-to-r from-accent-olive/20 to-accent-teal/10"
        aria-labelledby="research-summary"
      >
        <h2 id="research-summary" className="text-xl font-semibold text-gray-800">
          Research Summary
        </h2>
        <p className="mt-3 text-sm text-gray-700">
          The evidence base, spanning systematic reviews, RCTs, longitudinal studies, and large-scale observational
          analyses, demonstrates consistent benefits of personalised music interventions across dementia, ADHD, and Down
          Syndrome populations. Integrating Big Five personality insights further increases adherence and therapeutic
          impact. By combining nostalgia-informed selection, active participation, and reinforcement learning, TheraMuse
          RX delivers clinically aligned music therapy while capturing actionable feedback metrics.
        </p>
      </section>

      <section className="glass-card bg-white/90">
        <h2 className="text-lg font-semibold text-gray-800">Reference Library</h2>
        <p className="mt-1 text-sm text-gray-600">
          Source material for clinicians and researchers exploring music therapy, sensory entrainment, and personality
          aligned playlists.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {referenceLinks.map((ref) => (
            <a
              key={ref.url}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 text-sm font-medium text-accent-teal hover:text-accent-olive"
            >
              <Link className="mt-1 h-4 w-4" />
              <span>{ref.label}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

interface DetailsCardProps {
  title: string
  description?: string
  sections: DetailedCompilationSection[]
}

function DetailsCard({ title, description, sections }: DetailsCardProps) {
  return (
    <section className="glass-card bg-white/85">
      <details className="group">
        <summary className="flex cursor-pointer items-center justify-between text-left text-lg font-semibold text-gray-800">
          <div>
            <div className="flex items-center gap-2">
              <ChevronDown className="h-5 w-5 text-accent-teal transition-transform duration-200 group-open:rotate-180" />
              <span>{title}</span>
            </div>
            {description ? <p className="mt-1 text-sm text-gray-600">{description}</p> : null}
          </div>
        </summary>
        <div className="mt-6 space-y-6">
          {sections.map((section) => (
            <div key={section.heading} className="rounded-xl border border-table-border/40 bg-white/70 p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800">{section.heading}</h3>
              {section.description ? <p className="mt-2 text-sm text-gray-600">{section.description}</p> : null}

              {section.entries ? (
                <div className="mt-4 space-y-4">
                  {section.entries.map((entry) => (
                    <div
                      key={entry.title}
                      className="rounded-lg border border-table-border/40 bg-white/80 p-4 transition hover:border-accent-teal/60 hover:shadow-md"
                    >
                      <h4 className="text-base font-semibold text-gray-800">{entry.title}</h4>
                      <p className="mt-2 text-sm text-gray-600">{entry.details}</p>
                      {entry.keyPoints ? (
                        <ul className="mt-3 space-y-2 text-sm text-gray-700">
                          {entry.keyPoints.map((point) => (
                            <li key={point} className="flex gap-2">
                              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-accent-teal" aria-hidden />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {entry.links ? (
                        <div className="mt-3 flex flex-wrap gap-3">
                          {entry.links.map((link) => (
                            <a
                              key={link.url}
                              href={link.url}
                              className="text-xs font-semibold text-accent-teal underline decoration-accent-teal/40 hover:text-accent-olive"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {link.label}
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}

              {section.bullets ? (
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-accent-teal" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {section.paragraphs ? (
                <div className="mt-3 space-y-3 text-sm text-gray-700">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </details>
    </section>
  )
}

function CategoryCard({ category }: { category: ResearchCategory }) {
  return (
    <section className="glass-card bg-white/90">
      <h2 className="text-xl font-semibold text-gray-800">{category.heading}</h2>
      {category.description ? <p className="mt-2 text-sm text-gray-600">{category.description}</p> : null}
      <div className="mt-4 space-y-5">
        {category.papers.map((paper) => (
          <ResearchPaperCard key={paper.title} paper={paper} />
        ))}
      </div>
    </section>
  )
}

function ResearchPaperCard({ paper }: { paper: ResearchPaper }) {
  return (
    <article className="rounded-xl border border-table-border/40 bg-white/80 p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">{paper.title}</h3>
      <p className="mt-1 text-xs uppercase tracking-wide text-gray-400">{paper.citation}</p>
      {paper.studyDesign ? <p className="mt-2 text-sm text-gray-600">Study Design: {paper.studyDesign}</p> : null}
      {paper.sample ? <p className="mt-1 text-sm text-gray-600">Sample: {paper.sample}</p> : null}
      {paper.intervention ? (
        <p className="mt-1 text-sm text-gray-600">
          Intervention: <span className="font-medium text-gray-700">{paper.intervention}</span>
        </p>
      ) : null}
      {paper.frequency ? (
        <p className="mt-1 text-sm text-gray-600">
          Frequency: <span className="font-medium text-gray-700">{paper.frequency}</span>
        </p>
      ) : null}
      <ul className="mt-3 space-y-2 text-sm text-gray-700">
        {paper.keyFindings.map((finding) => (
          <li key={finding} className="flex gap-2">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-accent-teal" aria-hidden />
            <span>{finding}</span>
          </li>
        ))}
      </ul>
      {paper.significance ? <p className="mt-3 text-sm text-gray-600">{paper.significance}</p> : null}
      {paper.application ? (
        <p className="mt-1 text-sm text-gray-600">
          <span className="font-semibold text-gray-700">Application:</span> {paper.application}
        </p>
      ) : null}
      <div className="mt-3 flex flex-wrap gap-3">
        {paper.links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-accent-teal underline decoration-accent-teal/40 hover:text-accent-olive"
          >
            {link.label}
          </a>
        ))}
      </div>
    </article>
  )
}
