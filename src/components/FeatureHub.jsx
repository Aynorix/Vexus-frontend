import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import ToDoPanel from './ToDoPanel'
import CommunityPanel from './CommunityPanel'
import AcademicsPanel from './AcademicsPanel'
import HobbiesPanel from './HobbiesPanel'

/* ------------------------------------------------------------------ *
 * The five dashboard features, laid out in a single horizontal line.
 * Each tile opens its own sub-categories directly beneath the rail,
 * stacked vertically. Personalized Challenges has no sub-categories —
 * it routes straight to its own page.
 * ------------------------------------------------------------------ */

const FEATURES = [
  {
    id: 'todo',
    label: 'To-Do List',
    tagline: 'Daily quests',
    icon: 'list',
    tint: 'violet',
    taglineClass: 'tag--violet',
    Panel: ToDoPanel,
  },
  {
    id: 'community',
    label: 'Community',
    tagline: 'Find your circle',
    icon: 'users',
    tint: 'cyan',
    taglineClass: 'tag--cyan',
    Panel: CommunityPanel,
  },
  {
    id: 'academics',
    label: 'Academics',
    tagline: 'Study & progress',
    icon: 'cap',
    tint: 'gold',
    taglineClass: 'tag--gold',
    Panel: AcademicsPanel,
  },
  {
    id: 'hobbies',
    label: 'Hobbies',
    tagline: 'Off the clock',
    icon: 'spark',
    tint: 'pink',
    taglineClass: 'tag--pink',
    Panel: HobbiesPanel,
  },
]

export default function FeatureHub() {
  // To-Do opens first so its dropdown is already on screen.
  const [active, setActive] = useState('todo')
  const current = FEATURES.find((feature) => feature.id === active)
  const ActivePanel = current.Panel

  return (
    <section className="hub" id="features">
      <header className="hub__head">
        <div>
          <span className="tag tag--gold">
            <Icon name="spark" size={13} /> Command deck
          </span>
          <h2 className="hub__title">Everything you track, one tap away.</h2>
          <p className="hub__lede">
            Five systems, side by side. Pick a tile to open its sub-categories right here on the
            dashboard — no page reload required.
          </p>
        </div>
        <div className="hub__hint">
          <Icon name="bolt" size={16} />
          <span>
            Actions here feed the <strong>Gamification</strong> service once the Gateway is live.
          </span>
        </div>
      </header>

      {/* ---- the five features, single horizontal line ---- */}
      <nav className="rail" aria-label="Dashboard features">
        {FEATURES.map((feature) => {
          const isActive = feature.id === active
          return (
            <button
              key={feature.id}
              type="button"
              className={`railtile railtile--${feature.tint}${isActive ? ' is-active' : ''}`}
              aria-pressed={isActive}
              onClick={() => setActive(feature.id)}
            >
              <span className="railtile__icon">
                <Icon name={feature.icon} size={24} />
              </span>
              <span className="railtile__text">
                <strong>{feature.label}</strong>
                <em>{feature.tagline}</em>
              </span>
              <span className="railtile__chev" aria-hidden="true">
                <Icon name="chevron" size={16} />
              </span>
            </button>
          )
        })}

        {/* No sub-categories — this one leaves the dashboard. */}
        <Link
          to="/challenges"
          className="railtile railtile--mint railtile--link"
        >
          <span className="railtile__icon">
            <Icon name="quest" size={24} />
          </span>
          <span className="railtile__text">
            <strong>Personalized Challenges</strong>
            <em>Adaptive quests</em>
          </span>
          <span className="railtile__chev" aria-hidden="true">
            <Icon name="arrow" size={16} />
          </span>
        </Link>
      </nav>

      {/* ---- vertical sub-categories, falling beneath the rail ---- */}
      <div className="hub__panel" key={current.id}>
        <div className={`hub__panelhead hub__panelhead--${current.tint}`}>
          <span className="hub__paneltitle">
            <Icon name={current.icon} size={18} />
            {current.label}
          </span>
          <span className="hub__panelmeta">{current.tagline}</span>
        </div>
        <ActivePanel />
      </div>
    </section>
  )
}