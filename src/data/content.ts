// All site content. Sourced only from public-facing material (resume, public
// GitHub repos, project summaries). No private records, contact numbers, or
// unpublished research data are included here.

export const profile = {
  name: 'Kaleb Rodriguez',
  role: 'Student Researcher & Builder',
  location: 'Tampa, Florida',
  email: 'kalebrodriguez@usf.edu',
  github: 'https://github.com/kalebrodriguez',
  tagline:
    'High-school researcher studying neurodegeneration and building software that reaches real users.',
  intro:
    'I split my time between the questions behind neurodegenerative disease and the tools that help people live with it. That means reading omics data and mitophagy pathways on one screen, and shipping assistive apps on the other. I am a dual-enrollment student at the University of South Florida and Hillsborough Community College, graduating high school in 2027.',
}

export const focusAreas = [
  {
    label: 'Neurodegeneration',
    detail:
      'Parkinson’s mitophagy (PINK1/Parkin), ALS and TDP-43, and how error-based learning maps onto dopaminergic and cholinergic circuits.',
  },
  {
    label: 'Bioinformatics',
    detail:
      'Analyzing omics datasets — including spaceflight biology through NASA GeneLab — and applying machine learning to biomedical data.',
  },
  {
    label: 'Assistive technology',
    detail:
      'Software people actually use: dementia companionship, medication adherence, posture correction, and verified service tracking.',
  },
  {
    label: 'Wet lab',
    detail:
      'Hands-on work with elastin-like polypeptide fusion proteins and H&E histology imaging.',
  },
]

// status: active | ongoing | shipped | prototype | concept
export const projects = [
  {
    name: 'DigitalTwin',
    status: 'active',
    kind: 'Product · pitch-competition winner',
    summary:
      'An AI daily companion for people living with dementia, paired with a live dashboard that keeps family caregivers in the loop. Voice reminders, fall detection, and real-time patient–caregiver sync — built to run without a backend. Took first place at a startup pitch competition.',
    stack: ['TypeScript', 'RAG', 'Cloudflare Pages'],
    link: 'https://github.com/kalebrodriguez/digital-twin-1',
  },
  {
    name: 'Kora',
    status: 'active',
    kind: 'Platform',
    summary:
      'Verified, QR-signed community-service hours for high schools, with separate portals for students, organizations, and administrators — so a logged hour can actually be trusted.',
    stack: ['Web', 'QR signing', 'Multi-role auth'],
    link: 'https://github.com/kalebrodriguez/Kora',
  },
  {
    name: 'ClearCredit',
    status: 'active',
    kind: 'Platform · used by 50+ students',
    summary:
      'A dual-enrollment degree-audit tool for Florida students that merges HCC, USF, and AP credit into a single unified dashboard, so students can see where they actually stand toward a degree.',
    stack: ['Web', 'Degree audit'],
    link: 'https://github.com/kalebrodriguez/clearcredit',
  },
  {
    name: 'MedAlert',
    status: 'prototype',
    kind: 'iOS app',
    summary:
      'A medication-reminder app focused on adherence: scheduled dosing, interval-based logic, and notification alerts, with an interface kept deliberately simple for real patient use.',
    stack: ['Swift', 'iOS', 'Local notifications'],
    link: 'https://github.com/kalebrodriguez/medalertios',
  },
  {
    name: 'Posture+',
    status: 'shipped',
    kind: 'AI coaching',
    summary:
      'An AI posture coach with a QR-based demo that gives real-time correction cues — assistive technology aimed at everyday ergonomics.',
    stack: ['Computer vision', 'Web'],
    link: 'https://github.com/kalebrodriguez/postureplus',
  },
  {
    name: 'Cramb',
    status: 'active',
    kind: 'Open-source extension',
    summary:
      'A privacy-first browser extension that turns what you read and watch online into spaced-repetition flashcards, so long-term retention happens in the background.',
    stack: ['Browser extension', 'Spaced repetition'],
    link: 'https://github.com/kalebrodriguez/cramb-extension',
  },
]

export const research = [
  {
    title:
      'Nanoparticle-mediated modulation of the PINK1/Parkin mitophagy pathway in Parkinson’s disease',
    status: 'ongoing',
    org: 'ThinkNeuro',
    plain:
      'A systematic review of whether nanoparticles that target damaged mitochondria could restore the cell’s quality-control system (mitophagy) that fails in Parkinson’s disease. The work involves structured evidence extraction and risk-of-bias assessment across the published literature.',
  },
  {
    title:
      'Operational parallels between machine learning and dopaminergic / cholinergic error-based learning',
    status: 'ongoing',
    org: 'ThinkNeuro',
    plain:
      'Investigating how closely machine-learning models resemble the neuronal mechanisms behind error-based learning and memory. Presented as a research abstract and poster, with analysis done in R.',
  },
  {
    title: 'Neurodegeneration: ALS, TDP-43, and motor-neuron disease',
    status: 'ongoing',
    org: 'Independent',
    plain:
      'Reading and synthesizing the biology of ALS — protein aggregation and axonal transport — as the throughline connecting my research interests to the assistive tools I build.',
  },
  {
    title: 'Elastin-like polypeptide fusion proteins',
    status: 'completed',
    org: 'Wet lab',
    plain:
      'Wet-lab experience expressing and purifying elastin-like polypeptide fusion proteins, alongside H&E histology imaging.',
  },
]

export const experience = [
  {
    org: 'NASA GeneLab',
    role: 'Student Research Intern',
    period: 'Mar 2026 — Present',
    note: 'Selected for a competitive bioinformatics and space-biology program analyzing omics datasets from spaceflight experiments.',
  },
  {
    org: 'MIT Beaver Works Summer Institute — Medlytics',
    role: 'Intern',
    period: 'Feb 2026 — Present',
    note: 'Applying data science and machine learning to real healthcare and biomedical datasets in Python.',
  },
  {
    org: 'ThinkNeuro, LLC',
    role: 'Research Intern & Software Engineering Intern',
    period: 'Jan 2026 — Present',
    note: 'Running neurodegeneration research and co-leading a content initiative, while building MedAlert on a small dev team using Git and GitHub.',
  },
  {
    org: 'AdventHealth Tampa — Progressive Care Unit',
    role: 'Clinical Support Assistant',
    period: 'Dec 2025 — Present',
    note: 'Supporting nursing staff with patient mobility, comfort rounds, and a safe, well-stocked care environment.',
  },
]

export const leadership = [
  {
    org: 'Environmental Conservation Organization (ECO)',
    role: 'President',
    note: 'Lead a student environmental club — organizing cleanups, e-waste drives, and outreach with Keep Tampa Bay Beautiful.',
  },
  {
    org: 'Back on Track America — Middleton Chapter',
    role: 'Chapter Lead',
    note: 'Coordinate food-insecurity efforts and hunger-relief events, including partnerships with Metropolitan Ministries.',
  },
  {
    org: 'Common Ground Foundation',
    role: 'Student Ambassador',
    note: 'Connect ESL and immigrant students with tutoring and academic support for a national education-equity nonprofit.',
  },
  {
    org: 'UOTY',
    role: 'Founding Member & Head of PR',
    note: 'Helped shape a youth organization’s mission and ran its communications and digital media.',
  },
]

export const skills = {
  Languages: ['Python', 'JavaScript', 'TypeScript', 'Java', 'Swift', 'R', 'HTML', 'CSS'],
  'Research & data': [
    'Bibliometric research',
    'Data analysis',
    'Machine learning',
    'Omics datasets',
    'Systematic review',
  ],
  Tools: ['Git', 'GitHub', 'Networking fundamentals', 'Cybersecurity fundamentals'],
  Spoken: ['English (native)', 'Amharic (proficient)'],
}

export const awards = [
  'State Finalist (7th) — TSA Biotechnology Design, Florida State Leadership Conference (2026)',
  'HOSA CPR/First Aid — 1st Place, Winter Leadership Conference (2026)',
  'FBLA Parliamentary Procedures — 2nd Place, District Leadership Conference (2026)',
  'FBLA UX Design — 4th Place, District Leadership Conference (2025)',
  'AP Scholar with Honor — College Board (2025)',
  '250+ logged community-service hours',
]

export const certifications = [
  'Python Coding Specialist — Knowledge Pillars',
  'Java Coding Specialist — Knowledge Pillars',
  'CompTIA IT Fundamentals (ITF+)',
  'IT Specialist — Networking & Device Configuration',
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
}
