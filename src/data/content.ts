// All site content. Sourced only from public-facing material (public résumé,
// public LinkedIn profile, public GitHub repos, project summaries). No private
// records, contact numbers, credential IDs, or unpublished research data.

export const profile = {
  name: 'Kaleb Rodriguez',
  role: 'Student Researcher & Builder',
  location: 'Tampa, Florida',
  email: 'kalebrodriguez@usf.edu',
  github: 'https://github.com/kalebrodriguez',
  linkedin: 'https://www.linkedin.com/in/kaleb-rodriguez-8212a235a/',
  tagline:
    'High-school researcher studying neurodegeneration and building software that reaches real users.',
  intro:
    'I split my time between the questions behind neurodegenerative disease and the tools that help people live with it — protein purification and mitophagy pathways on one screen, and assistive software on the other. I am a dual-enrollment student at the University of South Florida, Hillsborough College, and the University of Florida, graduating high school in 2027.',
}

export const focusAreas = [
  {
    label: 'Neurodegeneration',
    detail:
      'Parkinson’s mitophagy (PINK1/Parkin) — a published scoping review — plus Alzheimer’s biomarker detection and how error-based learning maps onto neuronal circuits.',
  },
  {
    label: 'Computational biology',
    detail:
      'Protein language models for peptide activity, omics analysis through NASA GeneLab, and NLP for health-misinformation detection.',
  },
  {
    label: 'Wet lab',
    detail:
      'Expressing and purifying elastin-like polypeptide fusion proteins for drug delivery and regenerative medicine at USF.',
  },
  {
    label: 'Assistive technology',
    detail:
      'Software people actually use: dementia companionship, medication adherence, posture correction, and verified service tracking.',
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
    kind: 'iOS app · built at ThinkNeuro',
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

// status: published | ongoing | completed
export const research = [
  {
    title:
      'Nanoparticle-mediated modulation of the PINK1/Parkin mitophagy pathway in Parkinson’s disease',
    status: 'published',
    meta: 'Scoping review · Jul 2026',
    org: 'ThinkNeuro',
    link: 'https://doi.org/10.21203/rs.3.rs-10308858/v1',
    linkLabel: 'Read the paper',
    plain:
      'A scoping review of whether nanoparticles that target damaged mitochondria could restore the cell’s quality-control system (mitophagy) that fails in Parkinson’s disease, synthesizing evidence across the published literature.',
  },
  {
    title:
      'AI-driven vs. traditional approaches for early neural biomarker detection in Alzheimer’s disease',
    status: 'ongoing',
    meta: 'Systematic review · leading a team of 6',
    org: 'Synthica',
    plain:
      'Leading a six-person team on a systematic review comparing machine-learning and conventional clinical methods for catching Alzheimer’s biomarkers early — working toward peer-reviewed publication.',
  },
  {
    title:
      'Operational parallels between biologically-informed machine learning and dopaminergic / acetylcholinergic mechanisms',
    status: 'completed',
    meta: 'Poster & oral defense · Spring 2026',
    org: 'ThinkNeuro',
    link: `${import.meta.env.BASE_URL}operational-parallels-poster.pdf`,
    linkLabel: 'View the poster',
    plain:
      'Investigated how closely machine-learning models resemble the neuronal mechanisms behind error-based learning and memory, presented as a poster and oral defense at the Spring Research Symposium.',
  },
  {
    title: 'Predicting hemolytic peptide activity with protein language models',
    status: 'ongoing',
    meta: 'Computational biology',
    org: 'USF Health Taneja College of Pharmacy',
    plain:
      'Exploring fine-tuning strategies for protein language models to predict whether a peptide will rupture red blood cells, optimizing performance on experimental peptide datasets.',
  },
  {
    title: 'Detecting mental-health misinformation in online forums',
    status: 'ongoing',
    meta: 'Natural language processing',
    org: 'Oakland University',
    plain:
      'NLP research on flagging harmful or misleading advice in depression-related online communities — spanning literature review, dataset exploration, and computational approaches.',
  },
]

export const experience = [
  {
    org: 'USF College of Engineering',
    role: 'Laboratory Research Assistant',
    period: 'Jun 2026 — Present',
    note: 'Wet-lab research on elastin-like polypeptide (ELP) fusion proteins for drug delivery and regenerative medicine — bacterial expression, sonication, and purification by inverse temperature cycling in the Protein Engineering & Dynamic Living Systems Lab.',
  },
  {
    org: 'USF Health Taneja College of Pharmacy',
    role: 'Student Researcher',
    period: 'Feb 2026 — Present',
    note: 'Computational-biology research predicting hemolytic peptide activity with protein language models and fine-tuning strategies.',
  },
  {
    org: 'MIT CSAIL',
    role: 'Research Intern — MANTIS',
    period: 'May 2026 — Present',
    note: 'Working on the Mantis platform: cognitive cartography for multimodal AI and agentic reasoning.',
  },
  {
    org: 'Oakland University',
    role: 'Research Intern',
    period: 'May 2026 — Present',
    note: 'NLP research on detecting mental-health misinformation in online forums with Dr. Weicheng Ma.',
  },
  {
    org: 'Synthica',
    role: 'Lead Researcher',
    period: 'Apr 2026 — Present',
    note: 'Leading a six-person team on a systematic review of AI vs. traditional early Alzheimer’s biomarker detection, working toward publication.',
  },
  {
    org: 'ThinkNeuro, LLC',
    role: 'Research Intern & Co-Associate',
    period: 'Jan 2026 — Present',
    note: 'Help lead a student neuroscience team on neurodegenerative-disease research through literature review and bibliometric analysis, contributed to a published scoping review, and built MedAlert as a software engineering intern.',
  },
  {
    org: 'NASA GeneLab',
    role: 'Student Intern',
    period: 'Jun 2026 — Jul 2026',
    note: 'Selected for a competitive bioinformatics and space-biology program analyzing omics datasets from spaceflight experiments.',
  },
  {
    org: 'AdventHealth Tampa — Progressive Care Unit',
    role: 'PCU Nursing Support Volunteer',
    period: 'Dec 2025 — Present',
    note: 'Support nursing staff with patient mobility, comfort rounds, and a safe, well-stocked care environment.',
  },
]

export const leadership = [
  {
    org: 'Environmental Conservation Organization (ECO)',
    role: 'President',
    period: 'May 2025 — May 2026',
    note: 'Led a student environmental club — organizing cleanups, e-waste drives, and outreach with Keep Tampa Bay Beautiful.',
  },
  {
    org: 'Back on Track America — Middleton Chapter',
    role: 'Chapter Lead',
    period: 'Dec 2025 — Present',
    note: 'Coordinate food-insecurity efforts and hunger-relief events, including partnerships with Metropolitan Ministries.',
  },
  {
    org: 'Synthica',
    role: 'Head of User Generated Content',
    period: 'Apr 2026 — Present',
    note: 'Mentor a team of UGC creators and drive short-form content strategy to grow the company’s reach and brand awareness.',
  },
  {
    org: 'ThinkNeuro, LLC',
    role: 'Co-Lead, User Generated Content',
    period: 'Jan 2026 — Present',
    note: 'Co-led short-form content to grow ThinkNeuro’s digital presence — 80K+ views across the inaugural cohort — and mentored creators on video quality, science communication, and audience engagement.',
  },
  {
    org: 'Common Ground Foundation',
    role: 'Student Ambassador',
    period: 'Jan 2026 — Jul 2026',
    note: 'Connected ESL and immigrant students with tutoring and academic support for a national education-equity nonprofit.',
  },
  {
    org: 'UOTY',
    role: 'Founding Member & Head of PR',
    period: 'Jul 2020 — Present',
    note: 'Helped shape a youth organization’s mission and ran its communications and digital media.',
  },
]

export const education = [
  {
    org: 'University of South Florida',
    detail: 'Dual enrollment',
    period: 'Aug 2025 — May 2027',
  },
  {
    org: 'Hillsborough College',
    detail: 'Dual enrollment',
    period: 'May 2024 — May 2027',
  },
  {
    org: 'University of Florida',
    detail: 'Dual enrollment',
    period: 'Ongoing',
  },
  {
    org: 'Middleton High School',
    detail: 'Cyber Security (CSIT) Magnet',
    period: 'Aug 2023 — May 2027',
  },
]

export const skills = {
  Languages: ['Python', 'JavaScript', 'TypeScript', 'Java', 'Swift', 'R', 'HTML', 'CSS'],
  'Research & data': [
    'Computational biology',
    'Protein language models',
    'Bibliometric research',
    'Systematic review',
    'NLP',
    'Data analysis',
  ],
  'Wet lab': ['Protein expression', 'Purification (ITC)', 'Biosafety', 'Lab safety'],
  Tools: ['Git', 'GitHub', 'Networking fundamentals', 'Cybersecurity fundamentals'],
  Spoken: ['English (native)', 'Amharic (proficient)'],
}

export const awards = [
  'BigFuture National Recognition Program — College Board (2026)',
  'State Finalist (7th) — TSA Biotechnology Design, Florida State Leadership Conference (2026)',
  'HOSA CPR/First Aid — 1st Place, Winter Leadership Conference (2026)',
  'FBLA Parliamentary Procedures — 2nd Place, District Leadership Conference (2026)',
  'FBLA UX Design — 4th Place, District Leadership Conference (2025)',
  'AP Scholar with Honor — College Board (2025)',
  '250+ logged community-service hours',
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
  'AEST Agriculture Associate',
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
