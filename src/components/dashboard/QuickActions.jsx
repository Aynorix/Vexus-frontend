import { useEffect, useRef, useState } from 'react'
import Icon from '../Icon'
import Button from '../common/Button'
import { useGame } from '../../state/GameContext'
import { TIMER_XP_PER_MIN, timerPresets } from '../../data/mockData'

const fmtClock = (secs) => {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

/* Two quick actions only — create a goal, start a focus timer.
   Everything else lives in the navbar. */
export default function QuickActions() {
  const { dispatch, awardXp } = useGame()

  const [showGoal, setShowGoal] = useState(false)
  const [showTimer, setShowTimer] = useState(false)
  const [goalTitle, setGoalTitle] = useState('')
  const [goalDesc, setGoalDesc] = useState('')
  const [created, setCreated] = useState(null)

  const [topic, setTopic] = useState('')
  const [minutes, setMinutes] = useState(timerPresets[1])
  const [remaining, setRemaining] = useState(0)
  const [running, setRunning] = useState(false)
  // Completion timeout for the current session (scheduled on start/resume).
  const bankRef = useRef(null)

  const clearBank = () => {
    if (bankRef.current) {
      window.clearTimeout(bankRef.current)
      bankRef.current = null
    }
  }

  // Tick the clock while a session runs.
  useEffect(() => {
    if (!running) return undefined
    const id = window.setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000)
    return () => window.clearInterval(id)
  }, [running])

  // A session that runs to zero banks its focus time and XP automatically.
  // (Scheduled as an event-driven timeout, not inside an effect.)
  function completeSession() {
    bankRef.current = null
    setRunning(false)
    setShowTimer(false)
    setRemaining(0)
    dispatch({ type: 'focus/log', minutes })
    awardXp(minutes * TIMER_XP_PER_MIN, `${topic || 'Focus session'} — ${minutes} min`)
  }

  function toggleGoal() {
    setCreated(null)
    setShowGoal((v) => !v)
    setShowTimer(false)
  }

  function toggleTimer() {
    setShowGoal(false)
    setShowTimer((v) => !v)
  }

  function submitGoal(event) {
    event.preventDefault()
    const title = goalTitle.trim()
    if (!title) return
    dispatch({ type: 'goal/add', title, desc: goalDesc })
    setCreated(title)
    setGoalTitle('')
    setGoalDesc('')
    setShowGoal(false)
  }

  function startSession(event) {
    event.preventDefault()
    const secs = minutes * 60
    clearBank()
    setRemaining(secs)
    setRunning(true)
    bankRef.current = window.setTimeout(completeSession, secs * 1000)
  }

  function toggleRunning() {
    if (running) {
      // Pause — freeze the clock and cancel the completion alarm.
      clearBank()
      setRunning(false)
      return
    }
    // Resume — re-arm the alarm for whatever time is left.
    setRunning(true)
    bankRef.current = window.setTimeout(completeSession, remaining * 1000)
  }

  function stopSession() {
    const elapsed = minutes * 60 - remaining
    const focused = Math.ceil(elapsed / 60)
    clearBank()
    setRunning(false)
    setRemaining(0)
    setShowTimer(false)
    if (focused > 0) {
      dispatch({ type: 'focus/log', minutes: focused })
      awardXp(focused * TIMER_XP_PER_MIN, `${topic || 'Focus session'} — ${focused} min focused`)
    }
  }

  return (
    <section className="dsec">
      <header className="dsec__head">
        <div>
          <span className="tag tag--violet">
            <Icon name="bolt" size={13} /> Quick actions
          </span>
          <h2 className="dsec__title">What can you do right now?</h2>
        </div>
      </header>

      <div className="qa">
        <div className="qa__row">
          <Button variant="primary" size="lg" aria-expanded={showGoal} onClick={toggleGoal}>
            <Icon name="plus" size={17} strokeWidth={2.4} /> Create Goal
          </Button>
          <Button variant="ghost" size="lg" aria-expanded={showTimer} onClick={toggleTimer}>
            <Icon name="clock" size={17} /> {running ? fmtClock(remaining) : 'Start Timer'}
          </Button>
          {running && (
            <span className="qa__live">
              <span className="qa__livedot" aria-hidden="true" />
              {topic || 'Focus session'} · +{TIMER_XP_PER_MIN} XP/min
            </span>
          )}
        </div>

        {created && !showGoal && (
          <p className="qa__done">
            <Icon name="check" size={15} strokeWidth={3} /> “{created}” created — track it on the
            Goals page.
          </p>
        )}

        {showGoal && (
          <form className="qa__panel" onSubmit={submitGoal}>
            <div className="qa__fields">
              <input
                value={goalTitle}
                onChange={(e) => setGoalTitle(e.target.value)}
                placeholder="Goal title — e.g. Run a 10K"
                aria-label="Goal title"
              />
              <input
                value={goalDesc}
                onChange={(e) => setGoalDesc(e.target.value)}
                placeholder="Optional short description"
                aria-label="Goal description"
              />
            </div>
            <div className="qa__actions">
              <Button type="submit" variant="primary" size="sm" disabled={!goalTitle.trim()}>
                Create goal
              </Button>
              <Button variant="quiet" size="sm" onClick={() => setShowGoal(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}

        {showTimer && (
          <div className="qa__panel">
            {running || remaining > 0 ? (
              <div className="qa__timer">
                <span className="qa__timerlabel">
                  <Icon name="bolt" size={15} /> {topic || 'Focus session'}
                </span>
                <strong className="qa__clock">{fmtClock(remaining)}</strong>
                <span className="qa__xphint">+{TIMER_XP_PER_MIN} XP per focused minute</span>
                <div className="qa__actions">
                  <Button size="sm" variant="ghost" onClick={toggleRunning}>
                    {running ? 'Pause' : 'Resume'}
                  </Button>
                  <Button size="sm" variant="danger" onClick={stopSession}>
                    Stop & bank XP
                  </Button>
                </div>
              </div>
            ) : (
              <form className="qa__timer" onSubmit={startSession}>
                <label className="qa__field">
                  <span>What do you want to focus on?</span>
                  <input
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Linear Algebra problem set"
                    aria-label="Focus topic"
                  />
                </label>
                <div className="qa__presets" role="group" aria-label="Timer length">
                  {timerPresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      className={`qa__preset${minutes === preset ? ' is-active' : ''}`}
                      aria-pressed={minutes === preset}
                      onClick={() => setMinutes(preset)}
                    >
                      {preset} min
                    </button>
                  ))}
                </div>
                <div className="qa__actions">
                  <Button type="submit" variant="primary" size="sm">
                    Start focus
                  </Button>
                  <Button variant="quiet" size="sm" onClick={() => setShowTimer(false)}>
                    Cancel
                  </Button>
                </div>
                <p className="qa__xphint">
                  <Icon name="bolt" size={13} /> Completing focus time banks +{TIMER_XP_PER_MIN} XP
                  per minute.
                </p>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
