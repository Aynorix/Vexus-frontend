import Icon from '../Icon'
import ProgressBar from '../common/ProgressBar'
import { useGame } from '../../state/GameContext'
import { avatarConfig } from '../../data/mockData'

/* Compact product intro — the avatar sits locked until the player
   reaches its unlock level, so identity itself becomes progression. */
export default function HeroSection() {
  const { player } = useGame()
  const unlockAt = avatarConfig.unlockLevel
  const unlocked = player.level >= unlockAt
  const pct = Math.min(100, Math.round((player.level / unlockAt) * 100))

  return (
    <section className="dhero">
      <div className="dhero__aura" aria-hidden="true" />

      <div className="dhero__copy">
        <span className="tag tag--violet">
          <Icon name="spark" size={13} /> Personal growth system
        </span>
        <h1 className="dhero__title">VexusIQ</h1>
        <p className="dhero__tagline">Build yourself, one action at a time.</p>
        <div className="dhero__meta">
          <span className="mini-badge mini-badge--gold">
            <Icon name="bolt" size={14} strokeWidth={2.2} /> Level {player.level}
          </span>
          <span className="mini-badge mini-badge--cyan">
            <Icon name="shield" size={14} /> {player.league}
          </span>
        </div>
      </div>

      <div className="dhero__avatar">
        <div className={`davatar${unlocked ? ' is-unlocked' : ''}`}>
          {unlocked ? (
            <span className="davatar__initials">{player.avatar}</span>
          ) : (
            <Icon name="lock" size={26} strokeWidth={2} />
          )}
        </div>
        <div className="dhero__avatarnote">
          <strong>{unlocked ? 'Avatar unlocked' : 'Avatar locked'}</strong>
          <span>
            {unlocked
              ? 'Your identity is live across VexusIQ.'
              : `Reaches you at Level ${unlockAt} — keep going.`}
          </span>
          <ProgressBar pct={pct} tint="gold" label="Avatar unlock progress" />
          <em>
            Level {player.level}
            {!unlocked && ` · ${unlockAt - player.level} levels to go`}
          </em>
        </div>
      </div>
    </section>
  )
}
