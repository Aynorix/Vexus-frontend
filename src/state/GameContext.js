import { createContext, useContext } from 'react'

/** Shared dashboard state: todos, hobbies, XP/level, toasts. */
export const GameContext = createContext(null)

/** Hook for reading the dashboard game state. Must be used inside <GameProvider>. */
export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used inside <GameProvider>')
  return ctx
}
