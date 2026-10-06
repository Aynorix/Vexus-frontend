/**
 * Static/mock seed data for the VexusIQ dashboard.
 * Mirrors the domain boundaries from the system design so each block maps
 * cleanly onto its future microservice when the API Gateway lands.
 */

export const player = {
  name: 'Aynorix',
  handle: '@aynorix',
  avatar: 'AX',
  /** Cumulative lifetime XP. Level is derived from it — never stored separately. */
  xp: 3_420,
  streak: 9,
  longestStreak: 21,
  league: 'Platinum III',
  questsDone: 148,
  rank: 27,
}

export const communities = [
  {
    slug: 'gym-freaks',
    name: 'Gym Freaks',
    icon: 'dumbbell',
    tint: 'mint',
    members: 2_480,
    blurb: 'PRs, macros and midnight lift sessions.',
  },
  {
    slug: 'readers-space',
    name: 'Readers Space',
    icon: 'book',
    tint: 'gold',
    members: 1_930,
    blurb: 'Book clubs, reading streaks and lore debates.',
  },
  {
    slug: 'artistic-heads',
    name: 'Artistic Heads',
    icon: 'pen',
    tint: 'pink',
    members: 1_240,
    blurb: 'Sketches, tracks, edits and works in progress.',
  },
  {
    slug: 'academics-scholars',
    name: 'Academics Scholars',
    icon: 'cap',
    tint: 'cyan',
    members: 3_105,
    blurb: 'Study rooms, exam squads and research notes.',
  },
]

export const academicLinks = [
  {
    slug: 'subjects',
    label: 'Subjects',
    desc: 'Courses, assignments, exams and study sessions.',
    icon: 'cap',
    tint: 'cyan',
    meta: '6 active subjects',
  },
  {
    slug: 'progress-analysis',
    label: 'Progress Analysis',
    desc: 'Completion rates, consistency and time distribution.',
    icon: 'chart',
    tint: 'violet',
    meta: 'Last 30 days',
  },
]

export const hobbySeeds = [
  { id: 'h1', name: 'Weightlifting', icon: 'dumbbell', tint: 'mint', sessions: 42, streak: 6 },
  { id: 'h2', name: 'Reading', icon: 'book', tint: 'gold', sessions: 67, streak: 11 },
  { id: 'h3', name: 'Guitar', icon: 'pen', tint: 'pink', sessions: 23, streak: 3 },
  { id: 'h4', name: 'Street Photography', icon: 'compass', tint: 'cyan', sessions: 15, streak: 2 },
]

export const challengePreview = {
  title: '7-Day Consistency Sprint',
  desc: 'Clear one task, log one study block and log one hobby session every day for a week.',
  progress: 4,
  total: 7,
  reward: '1,500 XP + Sprint Vanguard badge',
  difficulty: 'Adaptive',
}

export const todolistSeed = {
  today: [
    { id: 't1', text: 'Finish Linear Algebra problem set 4', done: true, xp: 40 },
    { id: 't2', text: '30 min push session — lower body', done: false, xp: 25 },
    { id: 't3', text: 'Read 20 pages of "Deep Work"', done: false, xp: 15 },
  ],
  tomorrow: [
    { id: 't4', text: 'Draft Operating Systems assignment intro', done: false, xp: 50 },
    { id: 't5', text: 'Evening walk — 5 km', done: false, xp: 20 },
  ],
  scheduled: [
    {
      id: 's1',
      label: 'Exam Week',
      icon: 'quest',
      tint: 'violet',
      tasks: [{ id: 's1t1', text: 'Mock exam — Physics', done: false, xp: 60 }],
    },
    {
      id: 's2',
      label: 'Portfolio Push',
      icon: 'pen',
      tint: 'pink',
      tasks: [{ id: 's2t1', text: 'Upload 3 new UI case studies', done: false, xp: 35 }],
    },
  ],
}

/* ------------------------------------------------------------------ *
 * Progression curve
 *
 * `player.xp` is cumulative lifetime XP and the level is always derived
 * from it, so the two can never drift apart. Level N costs
 * `50 * (N - 1)` more than level N - 1, which keeps early levels quick
 * and later ones meaningful.
 * ------------------------------------------------------------------ */

const XP_STEP = 50

/** Total XP required to have reached `level`. Level 1 starts at 0. */
export const xpThreshold = (level) => (XP_STEP * level * (level - 1)) / 2

/** The highest level reachable with `xp` cumulative XP. */
export function levelFromXp(xp) {
  let level = 1
  while (xpThreshold(level + 1) <= xp && level < 99) level += 1
  return level
}

/** XP earned inside the current level, and the amount needed to leave it. */
export function levelProgress(xp) {
  const level = levelFromXp(xp)
  const floor = xpThreshold(level)
  const ceiling = xpThreshold(level + 1)
  return { level, into: xp - floor, needed: ceiling - floor, pct: Math.round(((xp - floor) / (ceiling - floor)) * 100) }
}
