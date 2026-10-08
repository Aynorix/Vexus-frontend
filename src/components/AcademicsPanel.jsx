import { Link } from 'react-router-dom'
import Icon from './Icon'
import { academicLinks } from '../data/mockData'

/* ------------------------------------------------------------------ *
 * Academics — Subjects and Progress Analysis, both always visible and
 * both leading to their own page.
 * ------------------------------------------------------------------ */

export default function AcademicsPanel() {
  return (
    <div className="subpanel">
      <p className="subpanel__hint">
        <Icon name="cap" size={15} />
        Open either view for the full breakdown of your study life.
      </p>

      <ul className="subcards subcards--wide">
        {academicLinks.map((link) => (
          <li key={link.slug}>
            <Link to={`/academics/${link.slug}`} className={`subcard subcard--${link.tint}`}>
              <span className="subcard__icon">
                <Icon name={link.icon} size={20} />
              </span>
              <span className="subcard__body">
                <strong>{link.label}</strong>
                <em>{link.desc}</em>
                <span className="subcard__meta">
                  <Icon name="layers" size={13} />
                  {link.meta}
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