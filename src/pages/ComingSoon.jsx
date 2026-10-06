import { Link, useLocation } from 'react-router-dom'
import Icon from '../components/Icon'
import TopBar from '../components/TopBar'
import ToastStack from '../components/ToastStack'

const TITLES = {
  community: 'Community Space',
  academics: 'Academics',
  challenges: 'Personalized Challenges',
  hobbies: 'Hobbies',
}

const BLURB = {
  'community/gym-freaks': 'Gym Freaks — PRs, macros and midnight lift sessions.',
  'community/readers-space': 'Readers Space — book clubs, reading streaks and lore debates.',
  'community/artistic-heads': 'Artistic Heads — sketches, tracks, edits and works in progress.',
  'community/academics-scholars': 'Academics Scholars — study rooms, exam squads and notes.',
  'academics/subjects': 'Subjects — courses, assignments, exams and study sessions.',
  'academics/progress-analysis': 'Progress Analysis — completion rates, consistency and time split.',
  challenges: 'Adaptive daily, weekly and personalized challenges with difficulty scaling.',
  hobbies: 'Every hobby you track, in one catalogue.',
}

const tint = (path) => (path.startsWith('/community') ? 'cyan' : path.startsWith('/academics') ? 'gold' : path.startsWith('/hobbies') ? 'pink' : 'mint')

/**
 * Stub target for every sub-category that redirects somewhere else.
 * Kept styled so navigation feels continuous instead of 404-ish.
 */
export default function ComingSoon() {
  const { pathname } = useLocation()
  const segment = pathname.split('/').filter(Boolean)
  const section = TITLES[segment[0]] ?? 'VexusIQ'
  const color = tint(pathname)

  return (
    <>
      <TopBar />
      <main className="page">
        <section className={`soon soon--${color}`}>
          <div className="soon__glow" aria-hidden="true" />
          <span className="tag tag--violet">
            <Icon name="spark" size={13} /> Placeholder route
          </span>
          <h1 className="soon__title">{section}</h1>
          <p className="soon__blurb">{BLURB[pathname.slice(1)] ?? 'This screen is on the roadmap.'}</p>

          <div className="soon__card">
            <span className="soon__lock">
              <Icon name="lock" size={22} />
            </span>
            <h2>Routing comes with the API Gateway</h2>
            <p>
              This destination is reserved. It fills in once the matching microservice answers
              through the Gateway — Community, Academics, Hobbies and Challenge Services land in
              later milestones.
            </p>
            <div className="soon__actions">
              <Link to="/dashboard" className="btn btn--primary">
                <Icon name="arrow" size={17} />
                Back to Dashboard
              </Link>
              <code className="soon__path">{pathname}</code>
            </div>
          </div>
        </section>
      </main>
      <ToastStack />
    </>
  )
}