import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Icon from './Icon'
import { useGame } from '../state/GameContext'

const NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: 'grid' },
  { to: '/academics/subjects', label: 'Academics', icon: 'cap' },
  { to: '/hobbies', label: 'Hobbies', icon: 'spark' },
  { to: '/challenges', label: 'Challenges', icon: 'quest' },
  { to: '/community/gym-freaks', label: 'Community', icon: 'users' },
]

export default function TopBar() {
  const { player } = useGame()
  const [open, setOpen] = useState(false)

  return (
    <header className="topbar">
      <div className="topbar__inner">
        <Link to="/dashboard" className="brand" aria-label="VexusIQ home">
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
          <div className="avatar" title={player.handle}>
            {player.avatar}
          </div>
          <button
            type="button"
            className="icon-btn topbar__menu"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'x' : 'grid'} size={20} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="topnav__mobile" aria-label="Mobile">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
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
