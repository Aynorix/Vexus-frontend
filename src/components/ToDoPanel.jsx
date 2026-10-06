import { useState } from 'react'
import Icon from './Icon'
import { useGame } from '../state/GameContext'

/* ------------------------------------------------------------------ *
 * To-Do list
 *
 * Sub-categories (Today / Tomorrow / Scheduled) are always rendered —
 * they are not hidden behind a click on the parent tile. Clicking a
 * sub-category reveals its checklist underneath, where tasks can be
 * ticked (banks XP), deleted via the cross button, or added inline.
 * ------------------------------------------------------------------ */

function TaskRow({ task, onToggle, onDelete }) {
  return (
    <li className={`task${task.done ? ' is-done' : ''}`}>
      <button
        type="button"
        className="task__check"
        role="checkbox"
        aria-checked={task.done}
        aria-label={task.done ? `Mark "${task.text}" as not done` : `Mark "${task.text}" as done`}
        onClick={onToggle}
      >
        <Icon name="check" size={14} strokeWidth={3} />
      </button>
      <span className="task__text">{task.text}</span>
      <span className="task__xp">+{task.xp}</span>
      <button
        type="button"
        className="task__del"
        aria-label={`Delete "${task.text}"`}
        onClick={onDelete}
      >
        <Icon name="x" size={15} strokeWidth={2.4} />
      </button>
    </li>
  )
}

function Checklist({ listId = null, accent = 'violet', tasks, onAddTask, onToggle, onRemove }) {
  const [draft, setDraft] = useState('')
  const done = tasks.filter((task) => task.done).length
  const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0

  function submit(event) {
    event.preventDefault()
    if (!draft.trim()) return
    onAddTask(draft)
    setDraft('')
  }

  return (
    <div className={`checklist checklist--${accent}`}>
      <div className="checklist__meter">
        <div className="bar">
          <span className="bar__fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="checklist__count">
          {done}/{tasks.length} cleared
        </span>
      </div>

      {tasks.length > 0 ? (
        <ul className="checklist__list">
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} onToggle={() => onToggle(task)} onDelete={() => onRemove(task)} />
          ))}
        </ul>
      ) : (
        <p className="checklist__empty">
          <Icon name="spark" size={15} />
          Nothing here yet — add the first task below.
        </p>
      )}

      <form className="checklist__add" onSubmit={submit}>
        <Icon name="plus" size={16} strokeWidth={2.2} />
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={listId ? 'Add a task to this list…' : 'Add a task…'}
          aria-label="New task"
        />
        <button type="submit" className="btn btn--sm btn--primary" disabled={!draft.trim()}>
          Add
        </button>
      </form>
    </div>
  )
}

export default function ToDoPanel() {
  const { todos, dispatch, awardXp } = useGame()
  const [open, setOpen] = useState({ today: true, tomorrow: false })
  const [scheduleDraft, setScheduleDraft] = useState('')

  const toggleSection = (scope) =>
    setOpen((prev) => ({ ...prev, [scope]: !prev[scope] }))

  /** Shared task operations, scoped to a list ('today' | 'tomorrow' | 'scheduled'). */
  const ops = (scope, listId = null) => ({
    add: (text) => dispatch({ type: 'task/add', scope, listId, text }),
    toggle: (task) => {
      dispatch({ type: 'task/toggle', scope, listId, id: task.id })
      // `task.done` is the pre-toggle state, so completing earns XP and reopening refunds it.
      if (task.done) awardXp(-task.xp, `${task.text} — reopened`)
      else awardXp(task.xp, task.text)
    },
    remove: (task) => dispatch({ type: 'task/remove', scope, listId, id: task.id }),
  })

  function createSchedule(event) {
    event.preventDefault()
    if (!scheduleDraft.trim()) return
    dispatch({ type: 'list/add', label: scheduleDraft })
    setScheduleDraft('')
  }

  const sections = [
    { id: 'today', label: 'Today', icon: 'bolt', tint: 'gold' },
    { id: 'tomorrow', label: 'Tomorrow', icon: 'clock', tint: 'cyan' },
  ]

  return (
    <div className="subpanel">
      <p className="subpanel__hint">
        <Icon name="bolt" size={15} />
        Tick a task to bank XP, cross it to delete it, or type a new one straight into any list.
      </p>

      <ul className="sublist">
        {sections.map((sub) => {
          const isOpen = Boolean(open[sub.id])
          const tasks = todos[sub.id]
          const scopeOps = ops(sub.id)
          return (
            <li key={sub.id} className={`subitem subitem--${sub.tint}${isOpen ? ' is-open' : ''}`}>
              <button
                type="button"
                className="subitem__head"
                aria-expanded={isOpen}
                onClick={() => toggleSection(sub.id)}
              >
                <span className="subitem__icon">
                  <Icon name={sub.icon} size={18} />
                </span>
                <span className="subitem__label">
                  <strong>{sub.label}</strong>
                  <em>
                    {tasks.filter((t) => t.done).length}/{tasks.length} cleared
                  </em>
                </span>
                <span className="subitem__caret">
                  <Icon name="chevron" size={18} />
                </span>
              </button>

              {isOpen && (
                <Checklist
                  accent={sub.tint}
                  tasks={tasks}
                  onAddTask={scopeOps.add}
                  onToggle={scopeOps.toggle}
                  onRemove={scopeOps.remove}
                />
              )}
            </li>
          )
        })}

        {/* Scheduled — user-typed lists, always visible */}
        <li className="subitem subitem--violet is-open">
          <div className="subitem__head subitem__head--static">
            <span className="subitem__icon">
              <Icon name="quest" size={18} />
            </span>
            <span className="subitem__label">
              <strong>Scheduled</strong>
              <em>{todos.scheduled.length} lists</em>
            </span>
          </div>

          <form className="schedform" onSubmit={createSchedule}>
            <input
              value={scheduleDraft}
              onChange={(e) => setScheduleDraft(e.target.value)}
              placeholder="Name a schedule — e.g. Exam Week"
              aria-label="New schedule list name"
            />
            <button type="submit" className="btn btn--sm btn--primary" disabled={!scheduleDraft.trim()}>
              <Icon name="plus" size={15} strokeWidth={2.4} />
              Add
            </button>
          </form>

          {todos.scheduled.length === 0 ? (
            <p className="checklist__empty">
              <Icon name="spark" size={15} />
              No scheduled lists yet — type a name above to create one.
            </p>
          ) : (
            <ul className="schedlist">
              {todos.scheduled.map((list) => {
                const listOps = ops('scheduled', list.id)
                return (
                  <li key={list.id} className={`schedcard schedcard--${list.tint}`}>
                    <div className="schedcard__head">
                      <span className="schedcard__icon">
                        <Icon name={list.icon} size={16} />
                      </span>
                      <strong>{list.label}</strong>
                      <span className="schedcard__count">{list.tasks.length}</span>
                      <button
                        type="button"
                        className="task__del"
                        aria-label={`Delete schedule "${list.label}"`}
                        onClick={() => dispatch({ type: 'list/remove', listId: list.id })}
                      >
                        <Icon name="x" size={15} strokeWidth={2.4} />
                      </button>
                    </div>
                    <Checklist
                      listId={list.id}
                      accent={list.tint}
                      tasks={list.tasks}
                      onAddTask={listOps.add}
                      onToggle={listOps.toggle}
                      onRemove={listOps.remove}
                    />
                  </li>
                )
              })}
            </ul>
          )}
        </li>
      </ul>
    </div>
  )
}