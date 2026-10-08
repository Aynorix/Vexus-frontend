import { Link, useLocation } from 'react-router-dom'
import Icon from '../components/Icon'
import Navbar from '../components/layout/Navbar'
import ToastStack from '../components/ToastStack'

const TITLES = {
  community: 'Community Space',
  academics: 'Academics',
  'code-red': 'Code Red',
}

const BLURB = {
  'community/gym-freaks': 'Gym Freaks — PRs, macros and midnight lift sessions.',
  'community/readers-space': 'Readers Space — book clubs, reading streaks and lore debates.',
  'community/artistic-heads': 'Artistic Heads — sketches, tracks, edits and works in progress.',
  'community/academics-scholars': 'Academics Scholars — study rooms, exam squads and notes.',
  'academics/subjects': 'Subjects — courses, assignments, exams and study sessions.',
  'academics/progress-analysis': 'Progress Analysis — completion rates, consistency and time split.',
  'code-red':
    'Code Red — the emergency productivity mode for when a day is going sideways. It becomes its own feature in a later milestone.',
}

const tint = (path) =>
  path.startsWith('/code-red')
    ? 'red'
    : path.startsWith('/community')
      ? 'cyan'
      : path.startsWith('/academics')
        ? 'gold'
        : 'violet'

/**
 * Stub target for every destination whose full flow isn't built yet.
 * Styled so navigation feels continuous instead of 404-ish.
 */
export default function ComingSoon() {
  const { pathname } = useLocation()
  const segment = pathname.split('/').filter(Boolean)
  const section = TITLES[segment[0]] ?? 'VexusIQ'
  const color = tint(pathname)

  return (
    <>
      <Navbar />
      <main className="page">
        <section className={`soon soon--${color}`}>
          <div className="soon__glow" aria-hidden="true" />
          <span className="tag tag--violet">
            <Icon name="spark" size={13} /> Coming later
          </span>
          <h1 className="soon__title">{section}</h1>
          <p className="soon__blurb">
            {BLURB[pathname.slice(1)] ?? 'This screen is on the roadmap.'}
          </p>

          <div className="soon__card">
            <span className="soon__lock">
              <Icon name={color === 'red' ? 'shield' : 'lock'} size={22} />
            </span>
            <h2>Reserved for a later milestone</h2>
            <p>
              The full experience for this destination is designed next — for now this placeholder
              keeps navigation continuous while the rest of VexusIQ comes together.
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
