/**
 * Static/mock data for the VexusIQ frontend.
 * Everything the UI shows lives here first, shaped so a future API can
 * swap in without touching the components.
 */

/* ---------------- Player / progression ---------------- */

export const player = {
  name: 'Ayaan',
  handle: '@aynorix',
  avatar: 'AY',
  /** Cumulative lifetime XP. Level is derived from it — never stored separately. */
  xp: 3_420,
  streak: 9,
  longestStreak: 21,
  league: 'Platinum III',
  questsDone: 148,
  rank: 27,
}

/** The avatar unlocks once the player reaches this level. */
export const avatarConfig = {
  unlockLevel: 15,
}

/* ---------------- Tasks — yesterday / today / tomorrow ---------------- */

export const todolistSeed = {
  yesterday: [
    { id: 'y1', text: 'Watch DB normalisation lecture', done: true, xp: 25 },
    { id: 'y2', text: '30 min push session — upper body', done: false, xp: 25 },
    { id: 'y3', text: 'Reply to community threads', done: true, xp: 10 },
  ],
  today: [
    { id: 't1', text: 'Finish Linear Algebra problem set 4', done: true, xp: 40 },
    { id: 't2', text: '30 min push session — lower body', done: false, xp: 25 },
    { id: 't3', text: 'Read 20 pages of "Deep Work"', done: false, xp: 15 },
  ],
  tomorrow: [
    { id: 't4', text: 'Draft Operating Systems assignment intro', done: false, xp: 50 },
    { id: 't5', text: 'Evening walk — 5 km', done: false, xp: 20 },
  ],
  // Reserved for the scheduled-lists feature; empty until it returns.
  scheduled: [],
}

/* ---------------- Goals ---------------- */

export const goalSeeds = [
  {
    id: 'g1',
    title: 'Run a 10K',
    desc: 'Build up to 10 km without stopping.',
    category: 'Personal',
    tint: 'violet',
    progress: 65,
  },
  {
    id: 'g2',
    title: 'Finish Linear Algebra course',
    desc: 'Complete all modules before finals week.',
    category: 'Academics',
    tint: 'cyan',
    progress: 80,
  },
  {
    id: 'g3',
    title: 'Ship portfolio refresh',
    desc: 'Three new case studies, deployed and polished.',
    category: 'Skills',
    tint: 'gold',
    progress: 45,
  },
  {
    id: 'g4',
    title: 'Practice guitar daily',
    desc: 'Twenty minutes a day for thirty days.',
    category: 'Hobbies',
    tint: 'pink',
    progress: 30,
  },
]

/* ---------------- Focus timer ---------------- */

/** Seed focus time in minutes — displayed as 02:35. */
export const focusMinutesSeed = 155

export const timerPresets = [15, 25, 50]

/** Small XP reward per focused minute. */
export const TIMER_XP_PER_MIN = 2

/* ---------------- Motivation ---------------- */

export const quotes = [
  'Small progress is still progress.',
  'Discipline beats motivation on the days it matters most.',
  'One focused hour today is a gift to tomorrow’s you.',
  'You don’t need more time — you need more clarity.',
  'Show up small. Compound big.',
]

/* ---------------- Analytics charts ---------------- */

/** Weekly productivity / activity trend — values are 0–100. */
export const weeklyTrend = [
  { day: 'Mon', v: 46 },
  { day: 'Tue', v: 62 },
  { day: 'Wed', v: 38 },
  { day: 'Thu', v: 71 },
  { day: 'Fri', v: 57 },
  { day: 'Sat', v: 88 },
  { day: 'Sun', v: 74 },
]

/** Category balance for the last 7 days — values are 0–100. */
export const categoryBalance = [
  { label: 'Academics', v: 78, tint: 'cyan' },
  { label: 'Hobbies', v: 52, tint: 'pink' },
  { label: 'Personal', v: 64, tint: 'violet' },
  { label: 'Skills', v: 41, tint: 'gold' },
]

/* ---------------- Recommendations ---------------- */

/**
 * Mock guidance — the future AI/LLM recommender replaces this array
 * without changing RecommendationCard.
 */
export const recommendations = [
  {
    id: 'r1',
    icon: 'spark',
    title: 'Rebalance your week',
    text: 'You’ve been focusing heavily on academics this week. Consider spending 30 minutes on a hobby today.',
    to: '/hobbies',
    action: 'Open hobbies',
  },
  {
    id: 'r2',
    icon: 'flame',
    title: 'Protect your streak',
    text: 'You’re one task away from maintaining your current streak. Tick something small off right now.',
    to: '/dashboard',
    action: 'Go to my tasks',
  },
  {
    id: 'r3',
    icon: 'target',
    title: 'Stretch a goal',
    text: '“Run a 10K” is at 65%. A short recovery run today keeps it exactly on track.',
    to: '/goals',
    action: 'View goals',
  },
]

/* ---------------- Social links ---------------- */

export const socialLinks = [
  { label: 'Discord', href: 'https://discord.com' },
  { label: 'Telegram', href: 'https://t.me' },
  { label: 'GitHub', href: 'https://github.com/Aynorix/Vexus-frontend' },
]

/* ---------------- Domain seeds (feature pages) ---------------- */

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
  return {
    level,
    into: xp - floor,
    needed: ceiling - floor,
    pct: Math.round(((xp - floor) / (ceiling - floor)) * 100),
  }
}
