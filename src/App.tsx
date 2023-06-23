import { useRef } from 'react'
import './App.css'
import { useWindowSize } from './utils/useWindowSize.ts'
import { useRunOnMount } from './utils/useRunOnMount.ts'
import { createAPI } from '@novorender/webgl-api'
import { novo } from './scripts/novo.ts'

const SCENE_ID = '3b5e65560dc4422da5c7c3f827b6a77c'

const api = createAPI({
  // Path to where the files previously copied from node_modules are hosted
  scriptBaseUrl: `${window.location.origin}/novorender/webgl-api/`,
})
function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { width, height } = useWindowSize()

  useRunOnMount(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    novo(api, canvas, SCENE_ID)
  })

  return (
    <>
      <canvas ref={canvasRef} width={width} height={height} />
    </>
  )
}

export default App
