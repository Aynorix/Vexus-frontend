import { Link } from 'react-router-dom'
import Icon from './Icon'
import { communities } from '../data/mock'

const fmt = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1).replace('.0', '')}k` : n)

/* ------------------------------------------------------------------ *
 * Community — sub-categories are always visible; each one navigates
 * to its own page (routing targets are stubbed for now).
 * ------------------------------------------------------------------ */

export default function CommunityPanel() {
  return (
    <div className="subpanel">
      <p className="subpanel__hint">
        <Icon name="users" size={15} />
        Pick your circle. Each space is a separate community page — routing lands in a later
        milestone.
      </p>

      <ul className="subcards">
        {communities.map((space) => (
          <li key={space.slug}>
            <Link to={`/community/${space.slug}`} className={`subcard subcard--${space.tint}`}>
              <span className="subcard__icon">
                <Icon name={space.icon} size={20} />
              </span>
              <span className="subcard__body">
                <strong>{space.name}</strong>
                <em>{space.blurb}</em>
                <span className="subcard__meta">
                  <Icon name="users" size={13} />
                  {fmt(space.members)} members
                </span>
              </span>
              <span className="subcard__go">
                <Icon name="chevron" size={18} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}