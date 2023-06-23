import { useRef } from 'react'
import './App.css'
import { useWindowSize } from './utils/useWindowSize.ts'
import { useRunOnMount } from './utils/useRunOnMount.ts'
import { createAPI } from '@novorender/webgl-api'
import { novo } from './scripts/novo.ts'

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
    novo(api, canvas)
  })

  return (
    <>
      <canvas ref={canvasRef} width={width} height={height} />
    </>
  )
}

export default App
