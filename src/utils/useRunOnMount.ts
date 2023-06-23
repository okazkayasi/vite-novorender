import { useEffect, useRef } from 'react'

export const useRunOnMount = (effect: () => void, cleanup?: () => void) => {
  const runOnce = useRef(true)
  const firstCleanup = useRef(true)
  useEffect(() => {
    if (runOnce.current) {
      effect()
      runOnce.current = false
    }
    return () => {
      if (firstCleanup.current) {
        firstCleanup.current = false
        return
      }
      cleanup?.()
    }
  }, [])
}
