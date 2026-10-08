import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import PageContainer from '../components/layout/PageContainer'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import ProgressBar from '../components/common/ProgressBar'
import ToastStack from '../components/ToastStack'
import Icon from '../components/Icon'
import { useGame } from '../state/GameContext'

/* Goals — create, log progress and retire goals. All frontend state. */
export default function Goals() {
  const { goals, dispatch } = useGame()
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  function submit(event) {
    event.preventDefault()
    if (!title.trim()) return
    dispatch({ type: 'goal/add', title, desc })
    setTitle('')
    setDesc('')
  }

  const active = goals.filter((goal) => goal.progress < 100)
  const complete = goals.filter((goal) => goal.progress >= 100)

  return (
    <>
      <Navbar />
      <PageContainer>
        <header className="phead">
          <span className="tag tag--violet">
            <Icon name="target" size={13} /> Goals
          </span>
          <h1>Goals</h1>
          <p>
            {active.length} active · {complete.length} completed — progress you can see.
          </p>
        </header>

        <form className="goalform" onSubmit={submit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New goal — e.g. Run a 10K"
            aria-label="Goal title"
          />
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Optional short description"
            aria-label="Goal description"
          />
          <Button type="submit" variant="primary" size="sm" disabled={!title.trim()}>
            <Icon name="plus" size={15} strokeWidth={2.4} /> Add goal
          </Button>
        </form>

        {goals.length === 0 ? (
          <Card className="emptycard">
            <Icon name="target" size={20} />
            <p>No goals yet — add your first one above.</p>
          </Card>
        ) : (
          <ul className="goalgrid">
            {goals.map((goal) => {
              const done = goal.progress >= 100
              return (
                <li key={goal.id}>
                  <Card className={`goalcard goalcard--${done ? 'done' : goal.tint}`}>
                    <div className="goalcard__top">
                      <span className={`tag tag--${done ? 'mint' : goal.tint}`}>
                        {done ? 'Completed' : goal.category}
                      </span>
                      <button
                        type="button"
                        className="task__del"
                        aria-label={`Delete goal "${goal.title}"`}
                        onClick={() => dispatch({ type: 'goal/remove', id: goal.id })}
                      >
                        <Icon name="x" size={15} strokeWidth={2.4} />
                      </button>
                    </div>
                    <strong className="goalcard__title">{goal.title}</strong>
                    {goal.desc && <p className="goalcard__desc">{goal.desc}</p>}
                    <div className="goalcard__meter">
                      <ProgressBar
                        pct={goal.progress}
                        tint={done ? 'mint' : goal.tint}
                        label={goal.title}
                      />
                      <span>{goal.progress}%</span>
                    </div>
                    {!done && (
                      <div className="goalcard__actions">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => dispatch({ type: 'goal/progress', id: goal.id, step: 10 })}
                        >
                          <Icon name="check" size={14} strokeWidth={2.6} /> Log progress +10%
                        </Button>
                      </div>
                    )}
                  </Card>
                </li>
              )
            })}
          </ul>
        )}
      </PageContainer>
      <ToastStack />
    </>
  )
}
