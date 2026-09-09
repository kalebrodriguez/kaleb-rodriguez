// All site content. Sourced only from public-facing material (public résumé,
// public LinkedIn profile, public GitHub repos, project summaries). No private
// records, contact numbers, credential IDs, or unpublished research data.

export type DetailLink = { label: string; href: string }

export type Project = {
  id: string
  name: string
  status: string
  kind: string
  summary: string
  detail: string
  highlights: string[]
  stack: string[]
  link: string
  links: DetailLink[]
  featured?: boolean
}

export type ResearchItem = {
  id: string
  title: string
  status: string
  meta?: string
  org: string
  plain: string
  detail: string
  highlights: string[]
  link?: string
  linkLabel?: string
  links: DetailLink[]
}

export type ExperienceItem = {
  id: string
  org: string
  role: string
  period: string
  note: string
  detail: string
  highlights: string[]
  links?: DetailLink[]
}

export const profile = {
  name: 'Kaleb Rodriguez',
  role: 'Student Researcher & Builder',
  location: 'Tampa, Florida',
  email: 'kalebrodriguez@usf.edu',
  github: 'https://github.com/kalebrodriguez',
  linkedin: 'https://www.linkedin.com/in/kaleb-rodriguez-8212a235a/',
  resume: `${import.meta.env.BASE_URL}Kaleb_Rodriguez_Resume.pdf`,
  tagline:
    'High-school researcher studying neurodegeneration and building software that reaches real users.',
  intro:
    'I split my time between the questions behind neurodegenerative disease and the tools that help people live with it — protein purification and mitophagy pathways on one screen, and assistive software on the other. I am a dual-enrollment student at the University of South Florida, Hillsborough College, and the University of Florida, graduating high school in 2027.',
  path: 'Drawn to the intersection of computational methods with biology and medicine — exploring Biomedical Engineering, Biology, Computer Science, and Data Science through research across multiple university labs.',
}

export const focusAreas = [
  {
    label: 'Neurodegeneration',
    detail:
      'Parkinson’s mitophagy (PINK1/Parkin) — a published scoping review — plus CJD bibliometrics and how error-based learning maps onto neuronal circuits.',
  },
  {
    label: 'Computational biology',
    detail:
      'Protein language models for peptide activity, omics analysis through NASA GeneLab, and NLP for health-misinformation detection.',
  },
  {
    label: 'Wet lab',
    detail:
      'Expressing and purifying elastin-like polypeptide fusion proteins for drug delivery and regenerative medicine at the USF Koria Lab.',
  },
  {
    label: 'Assistive technology',
    detail:
      'Software people actually use: dementia companionship, medication adherence, posture correction, and verified service tracking.',
  },
]

// status: active | ongoing | shipped | prototype | concept
export const projects: Project[] = [
  {
    id: 'neuropd',
    name: 'NeuroPD',
    status: 'active',
    kind: 'Open-source research pipeline',
    featured: true,
    summary:
      'A reproducible pipeline testing whether interpretable resting-state EEG features for Parkinson’s disease generalize across independent datasets and recording systems.',
    detail:
      'NeuroPD is built for research reuse: participant-level train/test isolation, frozen external validation, and leakage-prevention safeguards so claimed biomarkers can be stress-tested instead of overfit. Published with a formal CITATION.cff so other labs can cite and extend the work.',
    highlights: [
      'Cross-dataset EEG biomarker validation for Parkinson’s',
      'Participant-level isolation and frozen external validation',
      'Leakage-prevention safeguards for honest generalization tests',
      'CITATION.cff for formal research reuse',
    ],
    stack: ['Python', 'EEG', 'Validation', 'Open science'],
    link: 'https://github.com/kalebrodriguez/neuropd',
    links: [
      { label: 'GitHub repository', href: 'https://github.com/kalebrodriguez/neuropd' },
    ],
  },
  {
    id: 'clearcredit',
    name: 'ClearCredit',
    status: 'active',
    kind: 'Platform · Florida dual enrollment',
    summary:
      'A full-stack degree-audit tool that maps HCC, USF, and AP credit against all 21 HCC AA/AS pathways in real time — so dual-enrollment students can see where they actually stand.',
    detail:
      'ClearCredit merges Florida dual-enrollment credit into one dashboard and includes a “Pick My Best Fit” algorithm that scores degree programs against a student’s existing credits. Built with React, Supabase, and Vite; awaiting launch at Middleton High School with planned expansion across Hillsborough County Public Schools.',
    highlights: [
      'Maps credit against all 21 HCC AA/AS degree pathways',
      '“Pick My Best Fit” program-scoring algorithm',
      'Live app for Florida dual-enrollment students',
      'Planned school / district rollout',
    ],
    stack: ['React', 'Supabase', 'Vite', 'Degree audit'],
    link: 'https://clearcredit.vercel.app',
    links: [
      { label: 'Open live app', href: 'https://clearcredit.vercel.app' },
      { label: 'GitHub', href: 'https://github.com/kalebrodriguez/clearcredit' },
    ],
  },
  {
    id: 'digitaltwin',
    name: 'DigitalTwin',
    status: 'active',
    kind: 'Product · pitch-competition winner',
    summary:
      'An AI daily companion for people living with dementia, paired with a live dashboard that keeps family caregivers in the loop.',
    detail:
      'Voice reminders, fall detection, and real-time patient–caregiver sync — designed to run without a traditional backend so families can actually deploy it. Took first place at a startup pitch competition.',
    highlights: [
      'Caregiver dashboard with live patient sync',
      'Voice reminders and fall detection',
      'Runs without a heavyweight backend',
      'Pitch-competition winner',
    ],
    stack: ['TypeScript', 'RAG', 'Cloudflare Pages'],
    link: 'https://github.com/kalebrodriguez/digital-twin-1',
    links: [
      { label: 'GitHub repository', href: 'https://github.com/kalebrodriguez/digital-twin-1' },
    ],
  },
  {
    id: 'kora',
    name: 'Kora',
    status: 'active',
    kind: 'Platform · service verification',
    summary:
      'An API-first platform that replaces forged paper signatures with QR-verified check-in, fraud detection, and FERPA-aware portals for students, organizations, and admins.',
    detail:
      'Kora is built so a logged community-service hour can actually be trusted — QR-signed check-in, fraud detection, and separate portals for each role instead of legacy hour-tracking spreadsheets.',
    highlights: [
      'QR-verified check-in instead of paper signatures',
      'Fraud detection for forged service hours',
      'Student / organization / admin portals',
      'FERPA-aware design for schools',
    ],
    stack: ['Web', 'QR signing', 'Multi-role auth', 'API-first'],
    link: 'https://github.com/kalebrodriguez/Kora',
    links: [{ label: 'GitHub repository', href: 'https://github.com/kalebrodriguez/Kora' }],
  },
  {
    id: 'posture',
    name: 'Posture+',
    status: 'shipped',
    kind: 'AI coaching · TYE Tampa Bay Finalist',
    summary:
      'A real-time AI posture coach using MediaPipe Pose to detect slouching, uneven shoulders, and head tilt with a live 0–100 score.',
    detail:
      'Built as co-founder / developer (and COO of the venture) for TYE Tampa Bay. The product targets students and remote workers with a SaaS-style free/premium model and a QR-based demo for live correction cues.',
    highlights: [
      'MediaPipe Pose for real-time posture scoring',
      'TYE Tampa Bay Finalist',
      'Co-founder / COO of the venture',
      'SaaS free/premium model for students & remote workers',
    ],
    stack: ['Computer vision', 'MediaPipe', 'Web'],
    link: 'https://github.com/kalebrodriguez/postureplus',
    links: [
      { label: 'GitHub repository', href: 'https://github.com/kalebrodriguez/postureplus' },
    ],
  },
  {
    id: 'cramb',
    name: 'Cramb',
    status: 'active',
    kind: 'Open-source extension',
    summary:
      'A privacy-first browser extension that turns what you read and watch online into spaced-repetition flashcards.',
    detail:
      'Cramb keeps retention in the background: it converts online reading and viewing into spaced-repetition cards without shipping your browsing history to a server. Live demo is up; Chrome Web Store submission is pending review.',
    highlights: [
      'Privacy-first spaced repetition',
      'Converts reading/watching into flashcards automatically',
      'Live demo available',
      'Chrome Web Store review pending',
    ],
    stack: ['Browser extension', 'Spaced repetition'],
    link: 'https://kalebrodriguez.github.io/cramb-extension',
    links: [
      { label: 'Open live demo', href: 'https://kalebrodriguez.github.io/cramb-extension' },
      {
        label: 'GitHub',
        href: 'https://github.com/kalebrodriguez/cramb-extension',
      },
    ],
  },
  {
    id: 'medalert',
    name: 'MedAlert',
    status: 'prototype',
    kind: 'iOS app · ThinkNeuro',
    summary:
      'A medication-reminder app in Swift/SwiftUI focused on adherence: scheduled dosing, interval logic, and notification alerts.',
    detail:
      'Built as a ThinkNeuro software engineering intern with a deliberately simple interface for real patient use — scheduled dosing, local notifications, and medication tracking without account friction.',
    highlights: [
      'Swift / SwiftUI native iOS app',
      'Scheduled dosing and local notifications',
      'UI designed for real-world patient use',
      'Built during ThinkNeuro SE internship',
    ],
    stack: ['Swift', 'SwiftUI', 'iOS', 'Local notifications'],
    link: 'https://github.com/kalebrodriguez/medalertios',
    links: [
      { label: 'GitHub repository', href: 'https://github.com/kalebrodriguez/medalertios' },
    ],
  },
]

// status: published | ongoing | completed
export const research: ResearchItem[] = [
  {
    id: 'mitophagy',
    title:
      'Nanoparticle-mediated modulation of the PINK1/Parkin mitophagy pathway in Parkinson’s disease',
    status: 'published',
    meta: 'Scoping review · Penn NRC 2026',
    org: 'ThinkNeuro',
    link: 'https://doi.org/10.21203/rs.3.rs-10308858/v1',
    linkLabel: 'Read the paper',
    plain:
      'A scoping review of whether nanoparticles that target damaged mitochondria could restore the cell’s quality-control system (mitophagy) that fails in Parkinson’s disease. Accepted for presentation at the 2026 National Research Conference at Penn.',
    detail:
      'Co-authored preprint on Research Square examining nanoparticle strategies aimed at the PINK1/Parkin mitophagy pathway. The work synthesizes published evidence on mitochondrial quality control in Parkinson’s and will be presented at NRCP at the University of Pennsylvania.',
    highlights: [
      'Research Square preprint with DOI',
      'Accepted to National Research Conference at Penn (2026)',
      'Focus: PINK1/Parkin mitophagy in Parkinson’s',
      'Collaborative ThinkNeuro authorship',
    ],
    links: [
      {
        label: 'Read the preprint',
        href: 'https://doi.org/10.21203/rs.3.rs-10308858/v1',
      },
      { label: 'Penn NRC conference', href: 'https://upennnrc.org/' },
    ],
  },
  {
    id: 'operational-parallels',
    title:
      'Operational parallels between biologically-informed machine learning and dopaminergic / acetylcholinergic mechanisms',
    status: 'completed',
    meta: 'Poster · NYC Neuromodulation & World Neurology 2026',
    org: 'ThinkNeuro',
    link: 'https://doi.org/10.6084/m9.figshare.33115934',
    linkLabel: 'View on Figshare',
    plain:
      'Investigated how closely machine-learning models resemble neuronal mechanisms behind error-based learning and memory. Presented at the 2026 NYC Neuromodulation Conference and the Neurology World Conference; pending publication.',
    detail:
      'First-author work evaluating operational parallels between dopaminergic / acetylcholinergic mechanisms and biologically-informed ML models. Presented after a ThinkNeuro Spring Research Symposium poster and oral defense; Figshare DOI available while journal publication is pending.',
    highlights: [
      'NYC Neuromodulation Conference 2026',
      'Neurology World Conference (Miami)',
      'ThinkNeuro Spring Symposium poster + oral defense',
      'Figshare DOI · publication pending',
    ],
    links: [
      {
        label: 'Figshare DOI',
        href: 'https://doi.org/10.6084/m9.figshare.33115934',
      },
      {
        label: 'Conference poster (PDF)',
        href: `${import.meta.env.BASE_URL}operational-parallels-poster.pdf`,
      },
    ],
  },
  {
    id: 'cjd-bibliometrics',
    title:
      'Tracking the biomarker landscape: bibliometric dynamics in CJD and rapidly progressive dementia differential diagnosis',
    status: 'completed',
    meta: 'Poster · ThinkNeuro Summer Symposium 2026',
    org: 'ThinkNeuro',
    link: 'https://doi.org/10.6084/m9.figshare.33457435',
    linkLabel: 'View on Figshare',
    plain:
      'Bibliometric analysis of how biomarkers for Creutzfeldt–Jakob disease and rapidly progressive dementias are discussed and differentiated across the literature.',
    detail:
      'Poster work mapping bibliometric dynamics in CJD / rapidly progressive dementia differential diagnosis — how biomarker literature clusters, shifts, and informs clinical distinction. Presented at the ThinkNeuro Summer Research Symposium with a public Figshare DOI.',
    highlights: [
      'ThinkNeuro Summer Research Symposium poster',
      'Focus: CJD & rapidly progressive dementia biomarkers',
      'Bibliometric trend analysis',
      'Public Figshare DOI',
    ],
    links: [
      {
        label: 'Figshare DOI',
        href: 'https://doi.org/10.6084/m9.figshare.33457435',
      },
    ],
  },
  {
    id: 'hemolytic-peptides',
    title: 'Predicting hemolytic peptide activity with protein language models',
    status: 'ongoing',
    meta: 'Computational biology · USF Cheng Lab',
    org: 'USF Cheng Lab',
    plain:
      'Applying ESM2-8M protein language model embeddings to predict whether a peptide will rupture red blood cells, running the full pipeline locally under Prof. Feng Cheng.',
    detail:
      'Binary classification of hemolytic peptide activity from ESM2-8M embeddings, with a developing proposal on residue-level attribution methods for ESM2-based classifiers. Research assistant work in the USF Cheng Lab (currently on hiatus from active lab time per schedule).',
    highlights: [
      'ESM2-8M embeddings for peptide activity',
      'Local end-to-end ML pipeline',
      'Residue-level attribution methods in proposal',
      'PI: Prof. Feng Cheng',
    ],
    links: [],
  },
  {
    id: 'health-misinfo',
    title: 'Detecting health misinformation on social media',
    status: 'ongoing',
    meta: 'Natural language processing',
    org: 'Oakland University',
    plain:
      'NLP research on detecting and tracing health-misinformation propagation on social media — building classification models on iteratively refined annotated datasets with Dr. Weicheng Ma.',
    detail:
      'Remote research assistantship focused on unreliable health claims online. Models leverage prior biomedical ML experience and iteratively refined annotations to flag misinformation and study how it spreads.',
    highlights: [
      'Health-misinformation classification',
      'Social-media propagation analysis',
      'Iteratively annotated training data',
      'PI: Dr. Weicheng Ma',
    ],
    links: [],
  },
]

export const experience: ExperienceItem[] = [
  {
    id: 'koria-lab',
    org: 'USF Koria Lab — College of Engineering',
    role: 'Laboratory Research Assistant',
    period: 'Jun 2026 — Present',
    note: 'Wet-lab research on elastin-like polypeptide (ELP) fusion proteins for drug delivery and regenerative medicine under Dr. Piyush Koria.',
    detail:
      'Bacterial protein expression, cell lysis via sonication, purification by inverse transition cycling (ITC), gel electrophoresis, and buffer prep in the Protein Engineering & Dynamic Living Systems Lab.',
    highlights: [
      'ELP fusion proteins for drug delivery',
      'Expression, sonication, ITC purification',
      'PI: Dr. Piyush Koria',
    ],
  },
  {
    id: 'cheng-lab',
    org: 'USF Cheng Lab — Computational Biology',
    role: 'Research Assistant',
    period: 'Jan 2026 — Present',
    note: 'Protein language models for hemolytic peptide activity prediction under Prof. Feng Cheng (currently on hiatus from active lab scheduling).',
    detail:
      'Apply ESM2-8M embeddings to binary hemolytic-activity classification and develop a computational proposal on residue-level attribution for ESM2-based peptide classifiers.',
    highlights: [
      'ESM2-based peptide classifiers',
      'Local ML pipeline ownership',
      'PI: Prof. Feng Cheng',
    ],
  },
  {
    id: 'mit-csail',
    org: 'MIT CSAIL — Mantis AI Rising Scholars',
    role: 'Research Scholar',
    period: 'May 2026 — Present',
    note: 'Selected for MIT CSAIL’s Mantis AI Rising Scholars program under Prof. Manolis Kellis.',
    detail:
      'Contribute to the Mantis Visual Data Science Platform for AI-driven analysis of medical, biological, and scientific datasets — mapping research datasets (including ESM2 embeddings and literature corpora) onto the platform and working across full-stack, ML, and visualization workflows.',
    highlights: [
      'Program lead: Prof. Manolis Kellis',
      'Mantis Visual Data Science Platform',
      'Medical / biological dataset cartography',
    ],
  },
  {
    id: 'oakland',
    org: 'Oakland University — NLP Research Lab',
    role: 'Research Assistant',
    period: 'Apr 2026 — Present',
    note: 'Health-misinformation detection and propagation research with Dr. Weicheng Ma.',
    detail:
      'Build classification models on annotated social-media datasets to flag unreliable health claims, drawing on prior biomedical ML experience.',
    highlights: ['Health misinformation NLP', 'PI: Dr. Weicheng Ma'],
  },
  {
    id: 'nasa-genelab',
    org: 'NASA GeneLab',
    role: 'Student Research Intern',
    period: 'Jun 2026 — Aug 2026',
    note: 'Competitive bioinformatics and space-biology program analyzing omics datasets from spaceflight experiments.',
    detail:
      'Selected internship focused on biological responses to spaceflight conditions through GeneLab omics analysis workflows.',
    highlights: ['Spaceflight omics analysis', 'Competitive selection'],
  },
  {
    id: 'thinkneuro',
    org: 'ThinkNeuro, LLC',
    role: 'Research Intern, SE Intern & UGC Co-Lead',
    period: 'Jan 2026 — Aug 2026',
    note: 'Neuroscience research, MedAlert iOS engineering, and short-form science content reaching 100K+ views.',
    detail:
      'Helped lead a student neuroscience team through literature review, bibliometrics, and manuscript development; built MedAlert in Swift/SwiftUI; co-led UGC that drove ThinkNeuro’s digital presence past 100K views.',
    highlights: [
      'Published mitophagy scoping review contributor',
      'MedAlert iOS app (Swift/SwiftUI)',
      'UGC co-lead · 100K+ views',
    ],
  },
  {
    id: 'adventhealth',
    org: 'AdventHealth Tampa — Progressive Care Unit',
    role: 'Clinical Support Assistant',
    period: 'Dec 2025 — Present',
    note: 'Support nursing staff with patient mobility, comfort rounds, and a safe care environment.',
    detail:
      'Hospital PCU volunteering focused on bedside support — mobility assistance, comfort rounds, and keeping the unit well stocked for nursing staff.',
    highlights: ['Progressive Care Unit', 'Patient mobility & comfort rounds'],
  },
]

export const leadership: ExperienceItem[] = [
  {
    id: 'back-on-track',
    org: 'Back on Track America — Middleton Chapter',
    role: 'Founder & Chapter Lead',
    period: 'Dec 2025 — Present',
    note: 'Founded the school chapter addressing food insecurity and homelessness; partner with Metropolitan Ministries.',
    detail:
      'Stand up a new campus chapter of a national nonprofit, run food-distribution events, and coordinate student volunteers for hunger-relief outreach.',
    highlights: ['Founded the Middleton chapter', 'Metropolitan Ministries partnership'],
  },
  {
    id: 'eco',
    org: 'Environmental Conservation Organization (ECO)',
    role: 'President',
    period: 'May 2025 — Present',
    note: 'Lead student sustainability initiatives with Keep Tampa Bay Beautiful.',
    detail:
      'Organize cleanups, e-waste drives, and campus outreach for a student-led environmental club.',
    highlights: ['Keep Tampa Bay Beautiful partnership', 'Campus sustainability leadership'],
  },
  {
    id: 'common-ground',
    org: 'Common Ground Foundation',
    role: 'Student / State Ambassador',
    period: 'Jan 2026 — Aug 2026',
    note: 'Promote educational equity for immigrant and multilingual students.',
    detail:
      'Connect ESL and immigrant learners with tutoring and mentorship through a national education-equity nonprofit.',
    highlights: ['ESL / immigrant student support'],
  },
  {
    id: 'uoty',
    org: 'UOTY',
    role: 'Founding Member & Head of PR',
    period: 'Jul 2020 — Present',
    note: 'Co-founded the PR committee; digital media, speakers, and youth community presence.',
    detail:
      'Long-running faith-based youth organization role spanning communications, speaker coordination, and digital media.',
    highlights: ['Co-founded PR committee', 'Multi-year communications lead'],
  },
]

export const education = [
  {
    org: 'University of South Florida',
    detail: 'Dual enrollment · ~4.0 GPA',
    period: 'Ongoing',
  },
  {
    org: 'Hillsborough College',
    detail: 'Dual enrollment',
    period: 'Ongoing',
  },
  {
    org: 'University of Florida',
    detail: 'Dual enrollment',
    period: 'Ongoing',
  },
  {
    org: 'Middleton High School',
    detail: 'CSIT Magnet · Class of 2027',
    period: 'Aug 2023 — May 2027',
  },
]

export const aboutFacts = [
  {
    id: 'based',
    label: 'Based in',
    value: 'Tampa, Florida',
    detail:
      'Tampa-based student working across USF labs, remote research collaborations, and local hospital volunteering.',
  },
  {
    id: 'studying',
    label: 'Studying',
    value: 'Dual enrollment — USF, HCC & UF',
    detail:
      'Roughly 85 dual-enrollment credit hours across programming, aging sciences, healthcare-adjacent coursework, and general education — plus a CSIT Magnet high-school track.',
  },
  {
    id: 'path',
    label: 'Exploring',
    value: 'BME · Biology · CS · Data Science',
    detail: profile.path,
  },
  {
    id: 'graduating',
    label: 'Graduating',
    value: 'High school, 2027',
    detail:
      'Rising senior at Middleton High School (CSIT Magnet), Class of 2027, with AP Scholar with Honor recognition.',
  },
]

export const skills = {
  Languages: ['Python', 'R', 'Swift / SwiftUI', 'JavaScript', 'TypeScript', 'Java', 'HTML', 'CSS'],
  'Research & data': [
    'Computational biology',
    'Protein language models (ESM2)',
    'Bibliometric research',
    'Systematic review',
    'NLP',
    'PyTorch',
    'Data analysis',
  ],
  'Wet lab': ['Protein expression', 'Purification (ITC)', 'Gel electrophoresis', 'Biosafety'],
  Tools: ['Git / GitHub', 'FastAPI', 'MediaPipe', 'Supabase', 'Networking fundamentals'],
  Spoken: ['English (native)', 'Amharic (fluent)'],
}

export const awards = [
  'Amgen Regional STEM Entrepreneurship Camp — 1st Place & Best Presenter, Health & Wellness (2026)',
  'TYE Tampa Bay Finalist — Posture+ (2026)',
  'State Finalist (7th) — TSA Biotechnology Design, Florida State Leadership Conference (2026)',
  'HOSA CPR/First Aid — 1st Place, regional (qualified for FL State)',
  'FBLA Parliamentary Procedures — 2nd Place; UX Design — 4th Place; State Conference qualifier (3×)',
  'AP Scholar with Honor — College Board (2025)',
  'Varsity Soccer Letter · Honor Roll',
  '400+ documented community-service hours',
]

export const certifications = [
  'NASA Open Science Essentials — NASA',
  'USF Biosafety Principles & Practices',
  'USF Lab Safety Training',
  'USF Biomedical Waste Training',
  'Python Coding Specialist — Knowledge Pillars',
  'Java Coding Specialist — Knowledge Pillars',
  'CompTIA IT Fundamentals (ITF+)',
  'IT Specialist — Networking',
  'IT Specialist — Device Configuration & Management',
  'PMI Project Management Ready',
  'Adult First Aid / CPR / AED — American Red Cross',
]

export const statusLabels: Record<string, string> = {
  active: 'Active',
  ongoing: 'Ongoing',
  shipped: 'Shipped',
  prototype: 'Prototype',
  concept: 'Concept',
  completed: 'Completed',
  published: 'Published',
}
