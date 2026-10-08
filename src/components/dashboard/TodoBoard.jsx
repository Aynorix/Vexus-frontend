import { useState } from 'react'
import Icon from '../Icon'
import CodeRedButton from './CodeRedButton'
import { useGame } from '../../state/GameContext'

/* ------------------------------------------------------------------ *
 * Yesterday | Today | Tomorrow — the day in three columns.
 * Ticking a task banks its XP (reopening refunds it); unfinished
 * yesterday tasks visibly carried over.
 * ------------------------------------------------------------------ */

const COLUMNS = [
  { id: 'yesterday', label: 'Yesterday', icon: 'clock', tint: 'cyan' },
  { id: 'today', label: 'Today', icon: 'bolt', tint: 'gold' },
  { id: 'tomorrow', label: 'Tomorrow', icon: 'compass', tint: 'violet' },
]

function TaskRow({ task, carry, onToggle, onRemove }) {
  return (
    <li className={`task${task.done ? ' is-done' : ''}`}>
      <button
        type="button"
        className="task__check"
        role="checkbox"
        aria-checked={task.done}
        aria-label={
          task.done ? `Mark "${task.text}" as not done` : `Mark "${task.text}" as done`
        }
        onClick={onToggle}
      >
        <Icon name="check" size={14} strokeWidth={3} />
      </button>
      <span className="task__text">{task.text}</span>
      {carry && !task.done && <span className="task__carry">carried over</span>}
      <span className="task__xp">+{task.xp}</span>
      <button
        type="button"
        className="task__del"
        aria-label={`Delete "${task.text}"`}
        onClick={onRemove}
      >
        <Icon name="x" size={15} strokeWidth={2.4} />
      </button>
    </li>
  )
}

function Column({ column, tasks, onAdd, onToggle, onRemove }) {
  const [draft, setDraft] = useState('')
  const done = tasks.filter((task) => task.done).length
  const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0

  function submit(event) {
    event.preventDefault()
    if (!draft.trim()) return
    onAdd(draft)
    setDraft('')
  }

  return (
    <div className={`kbcol kbcol--${column.tint}`}>
      <header className="kbcol__head">
        <span className="kbcol__icon">
          <Icon name={column.icon} size={15} strokeWidth={2} />
        </span>
        <strong>{column.label}</strong>
        <span className="kbcol__count">
          {done}/{tasks.length}
        </span>
      </header>

      <div className="bar kbcol__meter" aria-hidden="true">
        <span className="bar__fill" style={{ width: `${pct}%` }} />
      </div>

      {tasks.length > 0 ? (
        <ul className="kbcol__list">
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              carry={column.id === 'yesterday'}
              onToggle={() => onToggle(task)}
              onRemove={() => onRemove(task)}
            />
          ))}
        </ul>
      ) : (
        <p className="kbcol__empty">
          <Icon name="list" size={15} /> No tasks recorded
        </p>
      )}

      <form className="checklist__add" onSubmit={submit}>
        <Icon name="plus" size={15} strokeWidth={2.2} />
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add a task…"
          aria-label={`Add a task to ${column.label}`}
        />
        <button type="submit" className="btn btn--sm btn--primary" disabled={!draft.trim()}>
          Add
        </button>
      </form>
    </div>
  )
}

export default function TodoBoard() {
  const { todos, dispatch, awardXp } = useGame()

  /** Task operations scoped to one day column. */
  const ops = (scope) => ({
    add: (text) => dispatch({ type: 'task/add', scope, text }),
    toggle: (task) => {
      dispatch({ type: 'task/toggle', scope, id: task.id })
      // `task.done` is the pre-toggle state: completing earns XP, reopening refunds it.
      if (task.done) awardXp(-task.xp, `${task.text} — reopened`)
      else awardXp(task.xp, task.text)
    },
    remove: (task) => dispatch({ type: 'task/remove', scope, id: task.id }),
  })

  return (
    <section className="dsec">
      <header className="dsec__head">
        <div>
          <span className="tag tag--gold">
            <Icon name="list" size={13} /> To-Do
          </span>
          <h2 className="dsec__title">Yesterday · Today · Tomorrow</h2>
        </div>
        <CodeRedButton />
      </header>

      <div className="kb">
        {COLUMNS.map((column) => {
          const columnOps = ops(column.id)
          return (
            <Column
              key={column.id}
              column={column}
              tasks={todos[column.id] ?? []}
              onAdd={columnOps.add}
              onToggle={columnOps.toggle}
              onRemove={columnOps.remove}
            />
          )
        })}
      </div>

      <p className="dsec__hint">
        <Icon name="bolt" size={14} /> Tick a task to bank its XP — reopening refunds it, and
        unfinished yesterday tasks show as carried over.
      </p>
    </section>
  )
}
