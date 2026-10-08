import { useState } from 'react'
import Icon from './Icon'
import { useGame } from '../state/GameContext'

/* ------------------------------------------------------------------ *
 * Hobbies — create and delete hobbies inline. Clicking any hobby opens
 * the hobbies page where the full catalogue is listed.
 * ------------------------------------------------------------------ */

export default function HobbiesPanel() {
  const { hobbies, dispatch } = useGame()
  const [draft, setDraft] = useState('')

  function submit(event) {
    event.preventDefault()
    const name = draft.trim()
    if (!name) return
    dispatch({ type: 'hobby/add', name })
    setDraft('')
  }

  return (
    <div className="subpanel">
      <p className="subpanel__hint">
        <Icon name="spark" size={15} />
        Add the extra-curriculars you actually want to keep. Cross one to drop it.
      </p>

      <form className="hobbyform" onSubmit={submit}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add a hobby — e.g. Skateboarding, Chess, Baking"
          aria-label="New hobby name"
        />
        <button type="submit" className="btn btn--sm btn--primary" disabled={!draft.trim()}>
          <Icon name="plus" size={15} strokeWidth={2.4} />
          Create Hobby
        </button>
      </form>

      {hobbies.length === 0 ? (
        <p className="checklist__empty">
          <Icon name="spark" size={15} />
          No hobbies yet — create your first one above.
        </p>
      ) : (
        <ul className="hobbylist">
          {hobbies.map((hobby) => (
            <li key={hobby.id} className={`hobbyitem hobbyitem--${hobby.tint}`}>
              <div className="hobbyitem__link">
                <span className="hobbyitem__icon">
                  <Icon name={hobby.icon} size={18} />
                </span>
                <span className="hobbyitem__body">
                  <strong>{hobby.name}</strong>
                  <em>
                    {hobby.sessions} sessions · {hobby.streak}-day streak
                  </em>
                </span>
                <span className="hobbyitem__go">
                  <Icon name="chevron" size={17} />
                </span>
              </div>
              <button
                type="button"
                className="task__del"
                aria-label={`Delete hobby "${hobby.name}"`}
                onClick={() => dispatch({ type: 'hobby/remove', id: hobby.id })}
              >
                <Icon name="x" size={15} strokeWidth={2.4} />
              </button>
            </li>
          ))}
        </ul>
      )}

    </div>
  )
}