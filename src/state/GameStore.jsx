import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import {
  focusMinutesSeed,
  goalSeeds,
  hobbySeeds,
  levelFromXp,
  player,
  todolistSeed,
} from '../data/mockData'
import { GameContext } from './GameContext'

/* ------------------------------------------------------------------ *
 * Persistence — the dashboard survives a refresh on localhost.
 * ------------------------------------------------------------------ */

const KEY = 'vexusiq.dashboard.v1'

const clone = (value) => JSON.parse(JSON.stringify(value))

const initialState = () => ({
  // `level` is derived from cumulative XP on every load, so a payload saved by
  // an older build can never resurrect a stale level.
  player: { ...clone(player), level: levelFromXp(player.xp) },
  todos: clone(todolistSeed),
  hobbies: clone(hobbySeeds),
  goals: clone(goalSeeds),
  focusMinutes: focusMinutesSeed,
  questsDone: player.questsDone,
})

function readStored() {
  if (typeof window === 'undefined') return initialState()
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return initialState()
    const parsed = JSON.parse(raw)
    const base = initialState()
    // Merge defensively so a stale/partial payload can never crash the app.
    return {
      player: {
        ...base.player,
        ...(parsed.player || {}),
        level: levelFromXp((parsed.player || base.player).xp),
      },
      // Merge per-key so a payload saved by an older build (no `yesterday`
      // column, no goals) can never crash the dashboard.
      todos: { ...base.todos, ...(parsed.todos || {}) },
      hobbies: Array.isArray(parsed.hobbies) ? parsed.hobbies : base.hobbies,
      goals: Array.isArray(parsed.goals) ? parsed.goals : base.goals,
      focusMinutes:
        typeof parsed.focusMinutes === 'number' ? parsed.focusMinutes : base.focusMinutes,
      questsDone: parsed.questsDone ?? base.questsDone,
    }
  } catch {
    return initialState()
  }
}

/* ------------------------------------------------------------------ *
 * Reducer — all dashboard mutations live here.
 * ------------------------------------------------------------------ */

let seq = 0
const uid = (prefix) => `${prefix}-${Date.now().toString(36)}-${(seq += 1)}`

const TINTS = ['violet', 'cyan', 'gold', 'pink', 'mint']
const nextTint = (name) => {
  let hash = 0
  for (let i = 0; i < name.length; i += 1) hash = (hash * 31 + name.charCodeAt(i)) >>> 0
  return TINTS[hash % TINTS.length]
}

function grantXp(state, amount) {
  if (!amount) return state.player
  // XP is cumulative; the level is always derived, so it can never drift.
  const xp = Math.max(0, state.player.xp + amount)
  return { ...state.player, xp, level: levelFromXp(xp) }
}

function reducer(state, action) {
  switch (action.type) {
    /* ---------------- To-Do list ---------------- */
    case 'task/add': {
      const { scope, listId, text, xp = 10 } = action
      const task = { id: uid('t'), text: text.trim(), done: false, xp }
      if (scope === 'scheduled') {
        return {
          ...state,
          todos: {
            ...state.todos,
            scheduled: state.todos.scheduled.map((list) =>
              list.id === listId
                ? { ...list, tasks: [...list.tasks, task] }
                : list,
            ),
          },
        }
      }
      return {
        ...state,
        todos: { ...state.todos, [scope]: [...state.todos[scope], task] },
      }
    }

    case 'task/toggle': {
      const { scope, listId, id } = action
      const mapTask = (task) =>
        task.id === id ? { ...task, done: !task.done } : task
      if (scope === 'scheduled') {
        return {
          ...state,
          todos: {
            ...state.todos,
            scheduled: state.todos.scheduled.map((list) =>
              list.id === listId ? { ...list, tasks: list.tasks.map(mapTask) } : list,
            ),
          },
        }
      }
      return {
        ...state,
        todos: { ...state.todos, [scope]: state.todos[scope].map(mapTask) },
      }
    }

    case 'task/remove': {
      const { scope, listId, id } = action
      if (scope === 'scheduled') {
        return {
          ...state,
          todos: {
            ...state.todos,
            scheduled: state.todos.scheduled.map((list) =>
              list.id === listId
                ? { ...list, tasks: list.tasks.filter((task) => task.id !== id) }
                : list,
            ),
          },
        }
      }
      return {
        ...state,
        todos: {
          ...state.todos,
          [scope]: state.todos[scope].filter((task) => task.id !== id),
        },
      }
    }

    case 'list/add': {
      const label = action.label.trim()
      if (!label) return state
      const list = {
        id: uid('s'),
        label,
        icon: 'quest',
        tint: nextTint(label),
        tasks: [],
      }
      return { ...state, todos: { ...state.todos, scheduled: [...state.todos.scheduled, list] } }
    }

    case 'list/remove': {
      return {
        ...state,
        todos: {
          ...state.todos,
          scheduled: state.todos.scheduled.filter((list) => list.id !== action.listId),
        },
      }
    }

    /* ---------------- Hobbies ---------------- */
    case 'hobby/add': {
      const name = action.name.trim()
      if (!name) return state
      const hobby = {
        id: uid('h'),
        name,
        icon: 'spark',
        tint: nextTint(name),
        sessions: 0,
        streak: 0,
      }
      return { ...state, hobbies: [...state.hobbies, hobby] }
    }

    case 'hobby/remove':
      return { ...state, hobbies: state.hobbies.filter((hobby) => hobby.id !== action.id) }

    /* ---------------- Goals ---------------- */
    case 'goal/add': {
      const title = action.title.trim()
      if (!title) return state
      const goal = {
        id: uid('g'),
        title,
        desc: (action.desc || '').trim(),
        category: action.category || 'Personal',
        tint: 'violet',
        progress: 0,
      }
      return { ...state, goals: [goal, ...state.goals] }
    }

    case 'goal/progress':
      return {
        ...state,
        goals: state.goals.map((goal) =>
          goal.id === action.id
            ? { ...goal, progress: Math.min(100, goal.progress + (action.step || 10)) }
            : goal,
        ),
      }

    case 'goal/remove':
      return { ...state, goals: state.goals.filter((goal) => goal.id !== action.id) }

    /* ---------------- Focus timer ---------------- */
    case 'focus/log':
      return { ...state, focusMinutes: state.focusMinutes + Math.max(0, action.minutes || 0) }

    /* ---------------- Progression ---------------- */
    case 'xp/award': {
      const amount = action.amount || 0
      return {
        ...state,
        player: grantXp(state, amount),
        questsDone: state.questsDone + (action.countQuest || 0),
      }
    }

    case 'state/reset':
      return initialState()

    default:
      return state
  }
}

/* ------------------------------------------------------------------ *
 * Toasts — small XP / level-up notifications.
 * ------------------------------------------------------------------ */

let toastSeq = 0

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, readStored)
  const [toasts, setToasts] = useState([])
  const [levelUp, setLevelUp] = useState(null)
  // Mirrors the latest cumulative XP so rapid successive awards each resolve
  // against the real current total rather than a stale render closure.
  const xpRef = useRef(state.player.xp)

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* storage full or blocked — the UI still works in-memory */
    }
  }, [state])

  const pushToast = useCallback((toast) => {
    const id = (toastSeq += 1)
    setToasts((prev) => [...prev.slice(-3), { id, ...toast }])
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id))
    }, 2600)
  }, [])

  const awardXp = useCallback(
    (amount, label) => {
      if (!amount) return
      const beforeLevel = levelFromXp(xpRef.current)
      xpRef.current = Math.max(0, xpRef.current + amount)
      const afterLevel = levelFromXp(xpRef.current)

      if (afterLevel > beforeLevel) {
        setLevelUp({ level: afterLevel })
        window.setTimeout(() => setLevelUp(null), 3000)
      }

      dispatch({ type: 'xp/award', amount })
      pushToast({
        kind: amount >= 0 ? 'xp' : 'xp-loss',
        title: `${amount >= 0 ? '+' : '−'}${Math.abs(amount)} XP`,
        note: label || 'Progress recorded',
      })
    },
    [pushToast],
  )

  // Keep the ref honest if state is restored or reset out from under us.
  useEffect(() => {
    xpRef.current = state.player.xp
  }, [state.player.xp])

  const value = useMemo(
    () => ({
      ...state,
      dispatch,
      awardXp,
      toasts,
      levelUp,
      dismissLevelUp: () => setLevelUp(null),
    }),
    [state, awardXp, toasts, levelUp],
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}
