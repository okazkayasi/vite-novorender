import { useRunOnMount } from '../utils/useRunOnMount.ts'
import { useEffect } from 'react'

export const Button = () => {
  useRunOnMount(
    () => {
      console.log('i run once')
    },
    () => {
      console.log('i run on unmount')
    },
  )

  useEffect(() => {
    console.log('i run on mount eff')
    return () => {
      console.log('i run on unmount useeff')
    }
  }, [])
  return <button>Click me</button>
}
