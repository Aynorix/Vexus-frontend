import Icon from './Icon'
import { useGame } from '../state/GameContext'

/* Transient XP / level-up feedback. Lives above everything, never blocks input. */

export default function ToastStack() {
  const { toasts, levelUp, dismissLevelUp } = useGame()

  return (
    <>
      {levelUp && (
        <div className="levelup" role="status">
          <button
            type="button"
            className="levelup__badge"
            onClick={dismissLevelUp}
            aria-label="Dismiss level up notification"
          >
            <Icon name="spark" size={26} strokeWidth={2} />
            <span>LVL {levelUp.level}</span>
          </button>
          <div className="levelup__text">
            <strong>Level up!</strong>
            <span>New rank unlocks are waiting in your progression.</span>
          </div>
        </div>
      )}

      <div className="toasts" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast--${toast.kind}`}>
            <span className="toast__icon">
              <Icon name={toast.kind === 'xp-loss' ? 'x' : 'bolt'} size={15} strokeWidth={2.4} />
            </span>
            <span className="toast__text">
              <strong>{toast.title}</strong>
              {toast.note && <em>{toast.note}</em>}
            </span>
          </div>
        ))}
      </div>
    </>
  )
}