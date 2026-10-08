import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Icon from '../Icon'
import { useGame } from '../../state/GameContext'

/* ------------------------------------------------------------------ *
 * Top navigation — navigation only. The dashboard itself never
 * duplicates these destinations as cards.
 * ------------------------------------------------------------------ */

const NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: 'grid' },
  { to: '/academics', label: 'Academics', icon: 'cap' },
  { to: '/hobbies', label: 'Hobbies', icon: 'spark' },
  { to: '/goals', label: 'Goals', icon: 'target' },
  { to: '/challenges', label: 'Challenges', icon: 'quest' },
  { to: '/community', label: 'Community', icon: 'users' },
]

const MORE = [
  { to: '/analytics', label: 'Analytics', icon: 'chart' },
  { to: '/code-red', label: 'Code Red', icon: 'shield' },
]

export default function Navbar() {
  const { player } = useGame()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  // Click-outside closes the "More" dropdown.
  useEffect(() => {
    if (!moreOpen) return undefined
    const onDocClick = (event) => {
      if (!(event.target instanceof Element) || !event.target.closest('.topnav__morewrap')) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [moreOpen])

  // Click-outside closes the mobile menu.
  useEffect(() => {
    if (!menuOpen) return undefined
    const onDocClick = (event) => {
      if (!(event.target instanceof Element) || !event.target.closest('.topbar')) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [menuOpen])

  const moreActive = MORE.some((item) => pathname.startsWith(item.to))

  return (
    <header className="topbar">
      <div className="topbar__inner">
        <Link
          to="/dashboard"
          className="brand"
          aria-label="VexusIQ home"
          onClick={() => {
            setMenuOpen(false)
            setMoreOpen(false)
          }}
        >
          <span className="brand__mark">
            <Icon name="bolt" size={20} strokeWidth={2} />
          </span>
          <span className="brand__text">
            Vexus<span className="brand__accent">IQ</span>
          </span>
        </Link>

        <nav className="topnav" aria-label="Primary">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `topnav__link${isActive ? ' is-active' : ''}`}
            >
              <Icon name={item.icon} size={17} />
              <span>{item.label}</span>
            </NavLink>
          ))}

          <div className="topnav__morewrap">
            <button
              type="button"
              className={`topnav__link topnav__more${moreOpen || moreActive ? ' is-active' : ''}`}
              aria-expanded={moreOpen}
              aria-haspopup="menu"
              onClick={() => setMoreOpen((v) => !v)}
            >
              <Icon name="layers" size={17} />
              <span>More</span>
              <Icon name="chevron" size={13} className="topnav__morechev" />
            </button>

            {moreOpen && (
              <div className="navdrop" role="menu">
                {MORE.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    role="menuitem"
                    onClick={() => setMoreOpen(false)}
                    className={({ isActive }) => `navdrop__item${isActive ? ' is-active' : ''}`}
                  >
                    <Icon name={item.icon} size={16} />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="topbar__right">
          <div className="chip chip--xp" title="Experience points">
            <Icon name="bolt" size={15} strokeWidth={2.2} />
            <span>{player.xp.toLocaleString()}</span>
            <em>XP</em>
          </div>
          <div className="chip chip--streak" title="Day streak">
            <Icon name="flame" size={15} strokeWidth={2} />
            <span>{player.streak}</span>
          </div>
          <div className="avatar" title={`${player.name} ${player.handle}`}>
            {player.avatar}
          </div>
          <button
            type="button"
            className="icon-btn topbar__menu"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Icon name={menuOpen ? 'x' : 'grid'} size={20} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="topnav__mobile" aria-label="Mobile">
          {[...NAV, ...MORE].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => `topnav__link${isActive ? ' is-active' : ''}`}
            >
              <Icon name={item.icon} size={17} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
