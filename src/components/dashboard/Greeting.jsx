import { useGame } from '../../state/GameContext'

/* The personal greeting — time-of-day aware, visually prominent. */
export default function Greeting() {
  const { player } = useGame()
  const hour = new Date().getHours()
  const part = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening'
  const firstName = player.name.split(' ')[0]

  return (
    <header className="dgreet">
      <h2>
        Good {part}, {firstName} 👋
      </h2>
      <p>Here’s how you’re doing today.</p>
    </header>
  )
}
