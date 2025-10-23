export interface ResearchSection {
  title: string
  summary: string
  bullets: string[]
}

export interface ResearchLink {
  label: string
  url: string
}

export interface DetailedEntry {
  title: string
  details: string
  keyPoints?: string[]
  links?: ResearchLink[]
}

export interface DetailedCompilationSection {
  heading: string
  description?: string
  entries?: DetailedEntry[]
  bullets?: string[]
  paragraphs?: string[]
}

export interface ResearchPaper {
  title: string
  citation: string
  studyDesign?: string
  sample?: string
  intervention?: string
  frequency?: string
  keyFindings: string[]
  significance?: string
  application?: string
  links: ResearchLink[]
}

export interface ResearchCategory {
  heading: string
  description?: string
  papers: ResearchPaper[]
}

export interface ApplicationInsight {
  title: string
  bullets: string[]
}

export const researchSections: ResearchSection[] = [
  {
    title: 'Dementia & Cognitive Health',
    summary:
      'Music therapy improves orientation, episodic recall, agitation, and quality of life metrics across mild-to-moderate dementia cohorts. Meta-analyses highlight strongest gains when culturally familiar repertoires are used.',
    bullets: [
      'Systematic reviews (Moreno-Morales et al., 2020) report clinically meaningful improvements on cognitive scales and anxiety inventories.',
      'Longitudinal trials demonstrate reduced caregiver burden when playlists are aligned with autobiographical memory triggers.',
      'EEG and imaging studies show enhanced frontal alpha synchronisation and memory-network activation following structured music listening blocks.',
    ],
  },
  {
    title: 'ADHD & Executive Function',
    summary:
      'Structured rhythm, amplitude modulation, and binaural beat scaffolding strengthen sustained attention, working memory, and inhibitory control for paediatric and adult ADHD cohorts.',
    bullets: [
      'Beta-band (16 Hz) modulation in background music improves sustained attention, with greatest benefit for high ADHD-trait listeners.',
      'Gamma (40 Hz) binaural beats synchronise EEG microstates and enhance working-memory performance.',
      'Clinical RCTs show 15 Hz binaural beats improve subjective study performance for adults with ADHD.',
    ],
  },
  {
    title: 'Down Syndrome & Sensory Integration',
    summary:
      'Active music engagement and 40 Hz sensory stimulation promote neurogenesis, memory formation, and socio-emotional development for individuals with Down Syndrome.',
    bullets: [
      'MIT Picower Institute studies show 40 Hz light + sound stimulation improves cognition and hippocampal connectivity in Down Syndrome models.',
      'Orff-based music and movement programmes increase attention span and memory retention in children with Down Syndrome.',
      '528 Hz music interventions reduce cortisol, elevate oxytocin, and improve mood scores, indicating powerful autonomic regulation.',
    ],
  },
  {
    title: 'Big Five Personality & Musical Preference',
    summary:
      'Large-scale personality studies confirm durable correlations between trait profiles and musical preferences, validating personality-aligned playlist generation.',
    bullets: [
      'Openness strongly predicts preference for diverse, sophisticated, and experimental genres.',
      'Extraversion correlates with contemporary, upbeat, and rhythmically engaging music across global populations.',
      'Neuroticism aligns with intense musical styles, highlighting the need to balance catharsis and relaxation strategies.',
    ],
  },
  {
    title: 'Caregiver & Home Delivery Models',
    summary:
      'Family-delivered interventions, home-based playlists, and choir participation provide scalable music therapy pathways outside clinical settings.',
    bullets: [
      'HOMESIDE and similar trials demonstrate clinically meaningful reductions in behavioural symptoms when caregivers deliver personalised playlists.',
      'Recreational choir singing sustains depression improvements for 12 months and augments quality-of-life measures.',
      'Hybrid models combining active and passive music work best when tailored to stage of cognitive impairment.',
    ],
  },
  {
    title: 'Integrated Therapeutic Framework',
    summary:
      'TheraMuse RX combines personality insights, nostalgia windows, and reinforcement learning to deliver evidence-aligned therapy playlists.',
    bullets: [
      'Patient context drives personalised YouTube retrieval with strict filters against non-music content.',
      'Feedback loops update Linear Thompson Sampling bandits, automatically improving recommendation quality.',
      'Clinicians can export structured reports containing personality radar charts, generational ragas, and bandit statistics.',
    ],
  },
]

export const detailedCompilation = {
  title:
    'Research Evidence of Music Therapy for Dementia, ADHD, Down Syndrome, and Big Five Personality Traits & Music Genre Preferences',
  sections: <DetailedCompilationSection[]>[
    {
      heading: 'Research Papers on Music Therapy for Dementia and Big Five Personality Traits',
      entries: [
        {
          title: '1. Music Therapy in the Treatment of Dementia (Moreno-Morales et al., 2020)',
          details:
            'Systematic review and meta-analysis (8 studies, 816 participants) examining the impact of music therapy on dementia.',
          keyPoints: [
            'Improved cognitive function (SMD −0.23) and quality of life after intervention.',
            'Demonstrated long-term reductions in depressive symptoms.',
            'Highlights need for stage-specific, standardised protocols.',
          ],
          links: [{ label: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/32509790/' }],
        },
        {
          title:
            '2. Music-Based Interventions on BPSD (de Witte et al., 2024)',
          details:
            'Network meta-analysis protocol comparing active vs passive music interventions for behavioural and psychological symptoms of dementia.',
          keyPoints: [
            'Prior meta-analyses show reductions in agitation (g −0.66) and anxiety (g −0.51).',
            'Active music therapy by trained therapists improves global cognition (SMD 0.29).',
            'Therapist-delivered interventions outperform passive listening for depression outcomes.',
          ],
          links: [{ label: 'Journal Article', url: 'https://www.tandfonline.com/doi/full/10.1080/13607863.2024.2373969' }],
        },
        {
          title:
            '3. Cochrane Review: Music-Based Therapeutic Interventions (van der Steen et al., 2018/Updated 2024)',
          details:
            'Comprehensive meta-analysis (30 RCTs, 1,720 participants across 15 countries).',
          keyPoints: [
            'Moderate-certainty evidence for reductions in depressive symptoms (SMD −0.23).',
            'Low-certainty improvement for overall behavioural problems (SMD −0.31).',
            'Limited impact on agitation/aggression (SMD −0.05) but minimal adverse effects.',
          ],
          links: [
            { label: 'Cochrane Summary', url: 'https://www.cochrane.org/evidence/CD003477_does-music-based-therapy-help-people-dementia' },
            { label: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/30033623/' },
          ],
        },
        {
          title: '4. HOMESIDE: Home-Based Caregiver-Delivered Music (Baker et al., 2023)',
          details:
            '2 × 2 factorial cluster RCT protocol evaluating caregiver-delivered music vs standard care.',
          keyPoints: [
            'Targets reduction in behavioural and psychological symptoms within 90 days.',
            'Explores neuroplasticity, auditory-motor coupling, and autobiographical memory mechanisms.',
            'Scales music therapy to home settings, reducing admissions.',
          ],
          links: [
            {
              label: 'EClinicalMedicine',
              url: 'https://www.thelancet.com/journals/eclinm/article/PIIS2589-5370(23)00401-7/fulltext',
            },
          ],
        },
        {
          title:
            '5. MIDDEL Trial: GMT vs Recreational Choir Singing (Baker et al., 2022)',
          details:
            'Factorial cluster RCT comparing group music therapy (GMT), recreational choir singing (RCS), combination therapy, and standard care.',
          keyPoints: [
            'RCS reduced depressive symptoms and improved neuropsychiatric measures after 6 months.',
            'Singing effects sustained at 12 months, indicating durable benefits.',
            'Provides first large-scale head-to-head comparison of music therapy modalities.',
          ],
          links: [
            {
              label: 'Article',
              url: 'https://www.sciencedirect.com/science/article/pii/S2666756822000277',
            },
            {
              label: 'Lancet Healthy Longevity',
              url: 'https://www.thelancet.com/journals/lanhl/article/PIIS2666-7568(22)00027-7/fulltext',
            },
          ],
        },
        {
          title: '6. ALMUTH Study: 12-Month Choir Intervention (Matziorinis et al., 2023)',
          details:
            'Three-arm RCT (choir singing vs physical activity vs control) for mild-to-moderate Alzheimer’s disease.',
          keyPoints: [
            'Longest duration RCT (12 months) with MRI/DTI biomarkers.',
            'Choir sessions (45–60 min, 4× monthly) preserved memory networks.',
            'Demonstrates neurobiological rationale: musical memory networks remain spared late in AD.',
          ],
          links: [{ label: 'PMC Article', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10114372/' }],
        },
        {
          title: '7. The Promise of Music Therapy for Alzheimer’s Disease (Fang et al., 2022)',
          details:
            'Narrative review focused on Music-Evoked Autobiographical Memories (MEAMs) within Alzheimer’s disease.',
          keyPoints: [
            'Self-selected music evokes faster, more emotional autobiographical recall.',
            'Unfamiliar music can also enhance memory and reduce trait anxiety.',
            'Anterior hippocampus connects emotion and autobiographical retrieval, explaining resilience of musical memory.',
          ],
          links: [{ label: 'PMC Article', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9796133/' }],
        },
        {
          title: '8. Individualised Music Listening Protocol (Jakob et al., 2024)',
          details:
            'App-based protocol delivered by family caregivers (20 minutes every other day for 6 weeks).',
          keyPoints: [
            'Evaluates wellbeing, stress biomarkers (hair cortisol), quality of life, and caregiver burden.',
            'Targets resistance during care and behavioural symptoms.',
            'Builds caregiver capacity through structured playlists.',
          ],
          links: [{ label: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/38532365/' }],
        },
        {
          title: '9. Personalised Playlists & Individual Differences (Garrido et al., 2018)',
          details:
            'Explores how depression, apathy, and cognitive impairment modulate response to personalised music playlists.',
          keyPoints: [
            'Personalisation is necessary but not sufficient—emotional state moderates outcomes.',
            'High depression can increase sadness even with favourite music.',
            'Recommends clinical screening before deploying strong nostalgia cues.',
          ],
          links: [{ label: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/29966193/' }],
        },
        {
          title:
            '10. How and Why Music Therapy Reduces Distress in Advanced Dementia (Thompson et al., 2024)',
          details:
            'Realist review synthesising neurological, psychological, and social mechanisms underpinning music therapy.',
          keyPoints: [
            'Highlights hidden mechanisms: meeting unmet needs, enhancing communication, supporting identity.',
            'Frames interventions within individual, interpersonal, and institutional contexts.',
            'Validates multi-dimensional, person-centred delivery models.',
          ],
          links: [{ label: 'Nature Article', url: 'https://www.nature.com/articles/s44220-024-00342-x' }],
        },
      ],
    },
    {
      heading: 'Big Five Personality Traits and Music Preferences',
      entries: [
        {
          title: '11. Associations Between Personality Traits and Music Preference (Boccia, 2020)',
          details:
            'Empirical study (n=175) linking Big Five scores with genre enjoyment using controlled audio excerpts.',
          keyPoints: [
            'Openness, Extraversion, and Agreeableness correlate positively with overall enjoyment.',
            'Neuroticism correlates negatively; Conscientiousness shows neutral association.',
            'Genre-specific correlations validate trait-informed curation.',
          ],
          links: [{ label: 'Full Text', url: 'https://digitalcommons.lindenwood.edu/cgi/viewcontent.cgi?article=1000&context=psych_journals' }],
        },
        {
          title: '12. MUSIC Model of Preferences (Rentfrow, Goldberg & Levitin, 2011)',
          details:
            'Factor-analytic framework describing five latent preference dimensions (Mellow, Urban, Sophisticated, Intense, Campestral).',
          keyPoints: [
            'Moves beyond genre labels to acoustic/emotional descriptors.',
            'Supports trait-aligned recommendation systems.',
          ],
          links: [{ label: 'PMC Article', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3138530/' }],
        },
        {
          title:
            '13. Big Five and Embodied Musical Emotions (Mendoza Garay, 2023)',
          details:
            'Investigates relationships between embodied musical emotions and personality.',
          keyPoints: [
            'Openness and Agreeableness most strongly linked to embodied emotional responses.',
            'Supports sensory/emotional tailoring of therapy playlists.',
          ],
          links: [{ label: 'SAGE Journal', url: 'https://journals.sagepub.com/doi/10.1177/03057356221135355' }],
        },
        {
          title:
            '14. Global Personality–Music Links (Greenberg et al., 2022)',
          details:
            'Large-scale cross-cultural study (350,000+ participants, 50 countries) linking Big Five traits to song-level preferences.',
          keyPoints: [
            'Extraversion correlates with contemporary/upbeat music worldwide.',
            'Openness maps to sophisticated tracks; Agreeableness to communal, positive songs.',
            'Neuroticism aligns with intense styles, demonstrating cross-cultural consistency.',
          ],
          links: [
            {
              label: 'Technology Networks Summary',
              url: 'https://www.technologynetworks.com/neuroscience/news/nirvana-for-neuroticism-how-musical-preferences-match-personality-traits-around-the-world-358429',
            },
          ],
        },
        {
          title: '15. Music Listening and Higher Neuroticism (Chan et al., 2024)',
          details:
            'Examines physiological vs subjective responses to music among high vs low neuroticism groups.',
          keyPoints: [
            'Music reduces physiological stress for both groups.',
            'High-neurotic individuals may report smaller subjective improvements, highlighting cognitive bias.',
            'Recommends combining physiological and self-report measures.',
          ],
          links: [{ label: 'PMC Article', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11129041/' }],
        },
        {
          title:
            '16. Personality Computing with Naturalistic Listening (Hansen et al., 2023)',
          details:
            'Analyses streaming logs to model personality traits from listening behaviour.',
          keyPoints: [
            'Openness correlates (r=.25) with diverse listening; Conscientiousness (r=.13) with structured choices.',
            'Audio features most predictive for Openness; lyric features for Conscientiousness.',
          ],
          links: [{ label: 'Collabra Psychology', url: 'https://online.ucpress.edu/collabra/article/9/1/75214/196347/Personality-Computing-With-Naturalistic-Music' }],
        },
        {
          title:
            '17. Big Five Domains & Music Listening (Hansen et al., 2025)',
          details:
            'Explores macro-scale associations between Big Five domains and music listening habits.',
          keyPoints: [
            'Open-mindedness shows strongest association with diverse music selection.',
            'Agreeableness and Neuroticism also show reliable links.',
          ],
          links: [{ label: 'Nature Scientific Reports', url: 'https://www.nature.com/articles/s41598-025-95661-z' }],
        },
        {
          title: '18. Musical Capacity and Big Five (2023)',
          details:
            'Assesses musical capacity, listening sophistication, and Big Five correlations.',
          keyPoints: [
            'Listening sophistication correlates with all Big Five traits.',
            'Indifference to music negatively correlates with Openness and Conscientiousness.',
          ],
          links: [{ label: 'IJIP Article', url: 'https://ijip.in/wp-content/uploads/2023/02/18.01.087.20231101.pdf' }],
        },
        {
          title:
            '19. Personality, Music Listening, and Well-Being (Martarelli et al., 2024)',
          details:
            'Investigates how personality shapes emotional regulation through music listening.',
          keyPoints: [
            'Highlights emotion regulation, empathy, and absorption as mediators.',
            'Listening to sad music often reflects immersive, not depressive, tendencies.',
          ],
          links: [{ label: 'PMC Article', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11064775/' }],
        },
      ],
    },
    {
      heading: 'Integrated Takeaways',
      bullets: [
        'Personalisation is powerful but must consider depression, apathy, and impairment severity to avoid adverse emotional responses.',
        'Active therapist-led music-making often delivers stronger effects on depression than passive listening.',
        'Music-evoked autobiographical memories (MEAMs) remain accessible even in advanced dementia, supporting nostalgia-based programming.',
        'Caregiver-delivered interventions are scalable when guided by structured protocols and monitoring.',
        'Personality-aligned selections leverage Big Five correlations: openness thrives on variety, extraversion on upbeat tracks, neuroticism on intense catharsis monitored with physiological markers.',
      ],
    },
  ],
}

export const dementiaResearch: ResearchCategory = {
  heading: 'Music Therapy for Dementia: Key Research Papers',
  description: 'Selected clinical trials and reviews demonstrating the breadth of dementia-focused music therapy outcomes.',
  papers: [
    {
      title: 'Music Therapy in the Treatment of Dementia',
      citation: 'Moreno-Morales et al., 2020',
      studyDesign: 'Systematic review and meta-analysis (8 studies, 816 participants)',
      keyFindings: [
        'Improved cognitive function and quality of life metrics post-intervention.',
        'Demonstrated sustained improvements in depression scores.',
        'Recommends stage-specific, standardised protocols for therapy delivery.',
      ],
      significance: 'Establishes music therapy as a promising, low-risk adjunct to pharmacological care.',
      links: [{ label: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/32509790/' }],
    },
    {
      title: 'The Effects of Music-Based Interventions on BPSD',
      citation: 'de Witte et al., 2024',
      studyDesign: 'Systematic review and network meta-analysis protocol',
      keyFindings: [
        'Highlights prior evidence for reductions in agitation and anxiety.',
        'Notes superior outcomes for therapist-delivered active music therapy on global cognition and depression.',
        'Addresses heterogeneity by comparing intervention types.',
      ],
      links: [{ label: 'Full Text', url: 'https://www.tandfonline.com/doi/full/10.1080/13607863.2024.2373969' }],
    },
    {
      title: 'Cochrane Review of Music-Based Therapeutic Interventions',
      citation: 'van der Steen et al., 2018/2024 update',
      studyDesign: 'Cochrane systematic review (30 studies, n=1,720)',
      keyFindings: [
        'Moderate-certainty improvements in depressive symptoms and overall behavioural issues.',
        'No significant effect on agitation/aggression but minimal adverse outcomes.',
        'Effect sizes comparable to some pharmacological interventions.',
      ],
      links: [
        { label: 'Cochrane Summary', url: 'https://www.cochrane.org/evidence/CD003477_does-music-based-therapy-help-people-dementia' },
        { label: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/30033623/' },
      ],
    },
    {
      title: 'HOMESIDE Caregiver-Delivered Intervention',
      citation: 'Baker et al., 2023',
      studyDesign: 'Randomised controlled trial protocol (2 × 2 factorial)',
      keyFindings: [
        'Empowers caregivers to deliver structured music interventions at home.',
        'Targets reductions in behavioural symptoms and caregiver burden.',
        'Maps neurobiological mechanisms: neuroplasticity, auditory-motor coupling, arousal regulation.',
      ],
      links: [
        {
          label: 'EClinicalMedicine',
          url: 'https://www.thelancet.com/journals/eclinm/article/PIIS2589-5370(23)00401-7/fulltext',
        },
      ],
    },
    {
      title: 'MIDDEL Trial (GMT vs RCS)',
      citation: 'Baker et al., 2022',
      studyDesign: '2 × 2 factorial cluster-RCT',
      keyFindings: [
        'Recreational choir singing reduced depressive symptoms at 6 months with sustained impact at 12 months.',
        'Combined interventions improved neuropsychiatric symptoms and quality of life.',
        'Standardises intensity and dosage across international sites.',
      ],
      links: [
        { label: 'ScienceDirect', url: 'https://www.sciencedirect.com/science/article/pii/S2666756822000277' },
        {
          label: 'Lancet Healthy Longevity',
          url: 'https://www.thelancet.com/journals/lanhl/article/PIIS2666-7568(22)00027-7/fulltext',
        },
      ],
    },
  ],
}

export const adhdResearch: ResearchCategory = {
  heading: 'Music Therapy for ADHD: Key Research Papers',
  papers: [
    {
      title: 'Modulation in Background Music Influences Sustained Attention',
      citation: 'Woods et al., 2019',
      studyDesign: 'Large-scale experimental study (n=677)',
      keyFindings: [
        '16 Hz beta-band amplitude modulation improved sustained attention scores.',
        'Listeners with higher ADHD traits showed the strongest performance gains.',
        'Supports rhythmically modulated playlists for focus sessions.',
      ],
      links: [{ label: 'arXiv', url: 'https://arxiv.org/abs/1907.06909' }],
    },
    {
      title: 'Effect of 40 Hz Binaural Beats on Working Memory',
      citation: 'Wang, Zhang, Li & Yang, 2022',
      studyDesign: 'Controlled EEG study (n=40 healthy adults)',
      keyFindings: [
        '40 Hz binaural beats improved working-memory task performance.',
        'Enhanced duration and coverage of attention-related EEG microstates.',
        'Demonstrated frequency-following responses aligning neural oscillations to the stimulus.',
      ],
      links: [{ label: 'IEEE Xplore', url: 'https://ieeexplore.ieee.org/document/9802990' }],
    },
    {
      title: 'Pilot Add-on RCT Evaluating Binaural Beats in Adult ADHD',
      citation: 'Malandrone et al., 2022',
      studyDesign: 'Randomised controlled trial',
      frequency: '15 Hz binaural beats (beta range)',
      keyFindings: [
        'Significant improvements in subjective studying performance (p < 0.001).',
        'Benefits maintained through fortnightly follow-ups.',
        'Highlights need for combined objective + subjective outcome measures.',
      ],
      links: [{ label: 'PMC Article', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9564012/' }],
    },
  ],
}

export const downSyndromeResearch: ResearchCategory = {
  heading: 'Music Therapy for Down Syndrome: Key Research Papers',
  papers: [
    {
      title: '40 Hz Sensory Stimulation Improves Cognition in Down Syndrome Mice',
      citation: 'Islam, Jackson et al., 2025 (MIT Picower Institute)',
      studyDesign: 'Preclinical Ts65Dn mouse model',
      intervention: '40 Hz combined light and sound stimulation (GENUS) for 1 hour daily over 3 weeks',
      keyFindings: [
        'Enhanced performance across three short-term memory tasks.',
        'Increased hippocampal activity, connectivity, and neurogenesis.',
        'Human clinical trial underway to translate findings.',
      ],
      links: [
        {
          label: 'Technology Networks Summary',
          url: 'https://www.technologynetworks.com/genomics/news/40hz-sensory-stimulation-improves-cognition-in-down-syndrome-mice-398950',
        },
        {
          label: 'Full Research',
          url: 'https://picower.mit.edu/news/down-syndrome-mice-40hz-light-and-sound-improve-cognition-neurogenesis-connectivity',
        },
      ],
    },
    {
      title: 'Effect of 528 Hz Music on the Endocrine and Autonomic Nervous System',
      citation: 'Akimoto et al., 2018',
      studyDesign: 'Controlled study (n=9 healthy participants)',
      keyFindings: [
        '528 Hz music produced significant cortisol reductions and oxytocin increases after 5 minutes.',
        'Reduced tension-anxiety scores and total mood disturbance.',
        'Demonstrated relaxation response vs control condition (440 Hz).',
      ],
      links: [{ label: 'Study', url: 'https://www.scirp.org/journal/paperinformation?paperid=87146' }],
    },
    {
      title: 'Music Engagement and Movement for Children with Down Syndrome',
      citation: 'Orff-Schulwerk Study, 2024',
      studyDesign: '8-week experimental programme for children aged 7–10',
      intervention: 'Orff-based Music Engagement and Movement (MEM) programme',
      keyFindings: [
        'Significant improvements in attention span and memory retention vs control.',
        'Combines rhythm, movement, singing, and instrument play for multisensory stimulation.',
        'Supports group-based, active participation models.',
      ],
      links: [{ label: 'Study PDF', url: 'https://archive.conscientiabeam.com/index.php/61/article/download/3626/7913' }],
    },
  ],
}

export const personalityResearch: ResearchCategory = {
  heading: 'Big Five Personality Traits and Music Preferences',
  papers: [
    {
      title: 'Associations Between Personality Traits and Music Preference',
      citation: 'Boccia, 2020',
      studyDesign: 'Empirical study (n=175) combining Big Five assessments with audio clip ratings',
      keyFindings: [
        'Openness, Extraversion, and Agreeableness positively correlated with enjoyment across genres.',
        'Neuroticism negatively correlated; Conscientiousness showed no significant relationship.',
        'Provides trait-specific genre correlations (e.g., Openness → rap/classical, Extraversion → pop/country).',
      ],
      links: [{ label: 'Full Text', url: 'https://digitalcommons.lindenwood.edu/cgi/viewcontent.cgi?article=1000&context=psych_journals' }],
    },
    {
      title: 'Structure of Musical Preferences: MUSIC Model',
      citation: 'Rentfrow, Goldberg & Levitin, 2011',
      studyDesign: 'Multi-study factor analysis',
      keyFindings: [
        'Identified five acoustic/emotional preference factors beyond genre labels.',
        'Framework adopted by recommender systems to personalise playlists.',
      ],
      links: [{ label: 'PMC Article', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3138530/' }],
    },
    {
      title: 'Global Personality-Music Links',
      citation: 'Greenberg et al., 2022',
      studyDesign: 'International dataset (>350k participants, 50 countries)',
      keyFindings: [
        'Universal patterns linking Extraversion to upbeat contemporary music and Openness to sophisticated tracks.',
        'Neuroticism preferences for intense styles (e.g., alternative rock) consistent across regions.',
      ],
      links: [
        {
          label: 'Technology Networks Summary',
          url: 'https://www.technologynetworks.com/neuroscience/news/nirvana-for-neuroticism-how-musical-preferences-match-personality-traits-around-the-world-358429',
        },
      ],
    },
  ],
}

export const applicationInsights: ApplicationInsight[] = [
  {
    title: 'Application to Dementia Music Therapy',
    bullets: [
      'Personalise playlists while screening for depression, apathy, and severity to avoid negative emotional reactions.',
      'Prioritise active music-making (singing, instrument play) for stronger impact on depression and engagement.',
      'Leverage Music-Evoked Autobiographical Memories (MEAMs); even unfamiliar music can reduce anxiety and support recall.',
      'Empower caregivers with structured protocols; monitor behavioural and physiological responses.',
    ],
  },
  {
    title: 'Personality-Matched Music Selection',
    bullets: [
      'Openness: deliver diverse, sophisticated, world and experimental genres.',
      'Extraversion: emphasise contemporary, rhythmic, upbeat tracks for social stimulation.',
      'Agreeableness: provide positive-valence, communal genres such as pop, country, and soul.',
      'Neuroticism: balance intense cathartic music with relaxation strategies; capture physiological metrics.',
      'Conscientiousness: focus on meaningful lyrics and narrative-driven selections.',
    ],
  },
  {
    title: 'Combined Application (Dementia + Personality)',
    bullets: [
      'Align therapy playlists with lifelong personality and formative-era music to maximise nostalgia effects.',
      'Blend active and passive interventions; escalate therapist involvement when behavioural symptoms escalate.',
      'Track outcomes behaviourally and physiologically, particularly for high-neuroticism profiles.',
    ],
  },
]

export const referenceLinks: ResearchLink[] = [
  { label: 'Frontiers in Medicine – Meta-Analyses of Music Therapy', url: 'https://www.frontiersin.org/journals/medicine/articles/10.3389/fmed.2020.00160/full' },
  { label: 'Frontiers in Psychiatry – Music Therapy for Mental Health', url: 'https://www.frontiersin.org/journals/psychiatry/articles/10.3389/fpsyt.2025.1618324/full' },
  { label: 'PMC – Music Therapy and Cognitive Decline', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12307461/' },
  { label: 'Nature – Music Therapy Distress Mechanisms', url: 'https://www.nature.com/articles/s44220-024-00342-x' },
  { label: 'Journal of Palliative Care – Music Therapy for Geriatrics', url: 'https://jpalliativecare.com/effect-of-music-therapy-on-quality-of-life-in-geriatric-population-a-systematic-review-and-meta-analysis/' },
  { label: 'PubMed – Dementia Music Therapy Meta-analysis', url: 'https://pubmed.ncbi.nlm.nih.gov/40680190/' },
  { label: 'PMC – Music Interventions for Cognitive Health', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10221503/' },
  { label: 'Sapienza Journal – Sensory Music Intervention Study', url: 'https://journals.sapienzaeditorial.com/index.php/SIJIS/article/view/e25044' },
  { label: 'PLOS ONE – Music-Based Cognitive Training', url: 'https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0324369' },
  { label: 'PMC – Therapeutic Music Review', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12316199/' },
  { label: 'Conscientiabeam – Orff Music Engagement Study', url: 'https://archive.conscientiabeam.com/index.php/61/article/download/3626/7913' },
  { label: 'Scholarly Review – Music as Language Therapy', url: 'https://www.scholarlyreview.org/api/v1/articles/121698-music-as-a-language-assessing-the-extent-to-which-active-music-therapy-promotes-socialization-development-for-children-under-12-with-down-syndrome.pdf' },
  { label: 'SAGE – Music Therapy for Neurodiversity', url: 'https://journals.sagepub.com/doi/abs/10.1080/03080188.2020.1755556' },
  { label: 'PMC – Music Cognition Study', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12191269/' },
  { label: 'Lindenwood Archives – Personality and Music', url: 'https://digitalcommons.lindenwood.edu/cgi/viewcontent.cgi?article=1000&context=psych_journals' },
  { label: 'UMAP Proceedings – Personality Dimensions & Recommenders', url: 'https://www.cp.jku.at/people/schedl/Research/Publications/pdf/ferwerda_umap_2017.pdf' },
  { label: 'Nave et al., 2018 – Facebook Musical Preferences', url: 'https://www.davidmgreenberg.com/wp-content/uploads/2018/11/Nave-et-al-2018-music-preferences-from-fb-likes.pdf' },
  { label: 'Cambridge – Global Personality & Music', url: 'https://www.cam.ac.uk/stories/musical-preferences-unite-personalities-worldwide' },
  { label: 'Spotify Research – Music Listening & Personality', url: 'https://research.atspotify.com/just-the-way-you-are-music-listening-and-personality' },
  { label: 'PMC – MUSIC Model', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3138530/' },
  { label: 'Illinois State – Music Therapy Dissertation', url: 'https://ir.library.illinoisstate.edu/cgi/viewcontent.cgi?article=2574&context=etd' },
  { label: 'Pioneer Publisher – Music & Well-being', url: 'https://www.pioneerpublisher.com/jrssh/article/download/1045/948/1097' },
  { label: 'Nature Scientific Reports – Personality & Music', url: 'https://www.nature.com/articles/s41598-025-95661-z' },
  { label: 'SAGE – Embodied Musical Emotions', url: 'https://journals.sagepub.com/doi/10.1177/03057356221135355' },
  { label: 'SAGE – Musical Taste & Personality', url: 'https://journals.sagepub.com/doi/pdf/10.1177/0305735616658957' },
  { label: 'Nature – Music & Personality Predictors', url: 'https://www.nature.com/articles/s41598-025-93795-8' },
  { label: 'ScienceDirect – Music for Behavioural Health', url: 'https://www.sciencedirect.com/science/article/abs/pii/S0190740925001343' },
  { label: 'Frontiers in Psychiatry – Music Therapy Review', url: 'https://www.frontiersin.org/journals/psychiatry/articles/10.3389/fpsyt.2022.905113/full' },
  { label: 'SAGE – Personality & Emotional Music Use', url: 'https://journals.sagepub.com/doi/10.1177/23320249241265240' },
  { label: 'PMC – Music & Social Interaction', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3280156/' },
  {
    label: 'Auctores – Musical Social Story Therapy',
    url: 'https://www.auctoresonline.org/article/use-and-effectiveness-of-musical-social-story-therapy-in-children-with-developmental-disorders-down-syndrome-autism-spectrum-disorder-fragile-x-syndrome-fetal-alcohol-spectrum-disorder-cerebral-palsy-and-adhd',
  },
  { label: 'Baylor Thesis – Music for Neurodevelopment', url: 'https://baylor-ir.tdl.org/bitstreams/81c66bd2-202f-4051-b3b5-3aaee0e48fa9/download' },
  { label: 'PMC – Music & Emotional Regulation', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12235852/' },
  { label: 'ERIC – Music Therapy in Education', url: 'https://files.eric.ed.gov/fulltext/EJ976663.pdf' },
  { label: 'ScienceDirect – Music & Stress Physiology', url: 'https://www.sciencedirect.com/science/article/pii/S002239562200231X' },
  { label: 'PMC – Music & Neuroplasticity', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6481398/' },
  { label: 'PagePress – Geriatric Music Studies', url: 'https://www.pagepress.org/medicine/gimle/article/view/595' },
]
