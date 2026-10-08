import Icon from '../Icon'
import { useGame } from '../../state/GameContext'

const fmtFocus = (minutes) => {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

/* Compact "how am I doing right now?" stats — four answers, no charts. */
export default function StatsGrid() {
  const { player, goals, focusMinutes } = useGame()
  const activeGoals = goals.filter((goal) => goal.progress < 100).length

  const stats = [
    { id: 'streak', label: 'Streak', value: `${player.streak} days`, icon: 'flame', tint: 'pink' },
    { id: 'xp', label: 'XP', value: `${player.xp.toLocaleString()} XP`, icon: 'bolt', tint: 'gold' },
    {
      id: 'goals',
      label: 'Goals',
      value: `${activeGoals} active goal${activeGoals === 1 ? '' : 's'}`,
      icon: 'target',
      tint: 'violet',
    },
    { id: 'focus', label: 'Focus time', value: fmtFocus(focusMinutes), icon: 'clock', tint: 'cyan' },
  ]

  return (
    <section className="dstats" aria-label="Basic statistics">
      {stats.map((stat) => (
        <div key={stat.id} className={`dstat dstat--${stat.tint}`}>
          <span className="dstat__icon">
            <Icon name={stat.icon} size={18} strokeWidth={2} />
          </span>
          <span className="dstat__body">
            <strong>{stat.value}</strong>
            <em>{stat.label}</em>
          </span>
        </div>
      ))}
    </section>
  )
}
