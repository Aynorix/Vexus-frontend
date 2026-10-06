import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import { useGame } from '../state/GameContext'
import { levelProgress } from '../data/mock'

function Ring({ value, max, size = 132, stroke = 11 }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(1, value / max))
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} aria-hidden="true">
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--gold)" />
            <stop offset="55%" stopColor="var(--pink)" />
            <stop offset="100%" stopColor="var(--violet)" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,.09)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset .9s cubic-bezier(.22,1,.36,1)' }}
        />
      </svg>
      <div className="ring__center">
        <strong>{value.toLocaleString()}</strong>
        <span>XP</span>
      </div>
    </div>
  )
}

export default function Hero() {
  const { player } = useGame()
  const [mode, setMode] = useState(null) // null | 'login' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [notice, setNotice] = useState('')

  // `player.xp` is cumulative — derive level, progress and the next threshold from it.
  const { level, into, needed, pct } = levelProgress(player.xp)

  function submit(event) {
    event.preventDefault()
    // Auth Service isn't wired yet — acknowledge locally and hand over to the dashboard.
    setNotice(
      mode === 'login'
        ? `Welcome back, ${player.name}. Auth Service connection comes with the API Gateway.`
        : `Account queued for ${form.email || 'you'}. Auth Service lands in a later milestone.`,
    )
    window.setTimeout(() => setNotice(''), 4200)
  }

  return (
    <section className="hero">
      <div className="hero__aura" aria-hidden="true" />
      <div className="hero__inner">
        <div className="hero__copy">
          <span className="tag tag--live">
            <span className="tag__pulse" /> Season 4 · Iron ascent live
          </span>

          <h1 className="hero__title">
            Level up every part of
            <span className="grad"> your life.</span>
          </h1>

          <p className="hero__lede">
            VexusIQ turns academics, hobbies, tasks and challenges into one progression
            system. Show up, clear the quest, collect the XP — and watch the streak
            you built carry you into the next league.
          </p>

          <div className="hero__cta">
            <Link to="/dashboard" className="btn btn--primary btn--lg">
              <Icon name="bolt" size={18} strokeWidth={2.2} />
              Enter Dashboard
            </Link>
            <button
              type="button"
              className="btn btn--ghost btn--lg"
              onClick={() => setMode(mode === 'signup' ? null : 'signup')}
            >
              <Icon name="spark" size={18} />
              Create Account
            </button>
            <button
              type="button"
              className="btn btn--quiet btn--lg"
              onClick={() => setMode(mode === 'login' ? null : 'login')}
            >
              <Icon name="lock" size={17} />
              Log In
            </button>
          </div>

          <ul className="hero__badges" aria-label="Recent unlocks">
            <li className="mini-badge mini-badge--gold"><Icon name="trophy" size={14} /> Top 5% Consistency</li>
            <li className="mini-badge mini-badge--cyan"><Icon name="shield" size={14} /> 21-Day Best Streak</li>
            <li className="mini-badge mini-badge--pink"><Icon name="star" size={14} /> 148 Quests Cleared</li>
          </ul>

          {(mode === 'login' || mode === 'signup') && (
            <form className="authcard" onSubmit={submit}>
              <div className="authcard__head">
                <h3>{mode === 'login' ? 'Log in to VexusIQ' : 'Create your account'}</h3>
                <button
                  type="button"
                  className="icon-btn"
                  aria-label="Close"
                  onClick={() => setMode(null)}
                >
                  <Icon name="x" size={18} />
                </button>
              </div>

              {mode === 'signup' && (
                <label className="field">
                  <span>Display name</span>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="How should VexusIQ call you?"
                    autoComplete="nickname"
                  />
                </label>
              )}

              <label className="field">
                <span>Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@vexusiq.app"
                  autoComplete="email"
                  required
                />
              </label>

              <label className="field">
                <span>Password</span>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  required
                />
              </label>

              <button type="submit" className="btn btn--primary btn--block">
                {mode === 'login' ? 'Log In' : 'Create Account'}
                <Icon name="arrow" size={17} />
              </button>

              <p className="authcard__foot">
                {mode === 'login' ? (
                  <>
                    No account yet?{' '}
                    <button type="button" onClick={() => setMode('signup')}>Sign up free</button>
                  </>
                ) : (
                  <>
                    Already registered?{' '}
                    <button type="button" onClick={() => setMode('login')}>Log in instead</button>
                  </>
                )}
              </p>
            </form>
          )}

          {notice && (
            <p className="hero__notice" role="status">
              <Icon name="check" size={16} strokeWidth={2.4} />
              {notice}
            </p>
          )}
        </div>

        <aside className="hero__panel" aria-label="Player status">
          <div className="playercard">
            <div className="playercard__glow" aria-hidden="true" />
            <div className="playercard__top">
              <div className="playercard__avatar">{player.avatar}</div>
              <div className="playercard__id">
                <h2>{player.name}</h2>
                <span>{player.handle}</span>
              </div>
              <span className="league">
                <Icon name="trophy" size={13} /> {player.league}
              </span>
            </div>

            <div className="playercard__ring">
              <Ring value={into} max={needed} />
              <div className="playercard__level">
                <span className="lvl-badge">
                  <em>LVL</em>
                  {level}
                </span>
                <p>
                  <strong>{pct}%</strong> to level {level + 1}
                </p>
                <div className="bar">
                  <span className="bar__fill" style={{ width: `${pct}%` }} />
                </div>
              </div>
            </div>

            <div className="playercard__stats">
              <div className="stat stat--flame">
                <Icon name="flame" size={18} />
                <strong>{player.streak}</strong>
                <span>day streak</span>
              </div>
              <div className="stat stat--gold">
                <Icon name="quest" size={18} />
                <strong>{player.questsDone}</strong>
                <span>quests done</span>
              </div>
              <div className="stat stat--cyan">
                <Icon name="layers" size={18} />
                <strong>#{player.rank}</strong>
                <span>rank</span>
              </div>
            </div>

            <div className="playercard__boost">
              <Icon name="spark" size={16} />
              <p>
                <strong>Daily boost active.</strong> Clearing any quest before noon pays 1.5× XP.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}