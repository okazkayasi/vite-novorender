import { useRef, useState } from 'react'
import './App.css'
import { useWindowSize } from './utils/useWindowSize.ts'
import { useRunOnMount } from './utils/useRunOnMount.ts'
import { createAPI, View } from '@novorender/webgl-api'
import { novo } from './scripts/novo.ts'
import { quat, vec3 } from 'gl-matrix'

const SCENE_ID = '3b5e65560dc4422da5c7c3f827b6a77c'

const api = createAPI({
  // Path to where the files previously copied from node_modules are hosted
  scriptBaseUrl: `${window.location.origin}/novorender/webgl-api/`,
})

type ButtonDataProps = {
  position: vec3
  rotation: quat
  initialized: boolean
}
type ButtonDataTuple = [ButtonDataProps, ButtonDataProps, ButtonDataProps]

const initialButtonData: ButtonDataProps = {
  position: [0, 0, 0],
  rotation: [0, 0, 0, 1],
  initialized: false,
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [view, setView] = useState<View>(null as unknown as View)
  const { width, height } = useWindowSize()
  const [buttonData, setButtonData] = useState<ButtonDataTuple>([
    initialButtonData,
    initialButtonData,
    initialButtonData,
  ])

  useRunOnMount(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    ;(async () => {
      const novoView = await novo(api, canvas, SCENE_ID)
      setView(novoView)
    })()
  })

  const saveButtonData = (i: 0 | 1 | 2) => {
    console.log('save button data', i + 1)
    const position = [...view.camera.position] as vec3
    const rotation = [...view.camera.rotation] as quat
    const initialized = true
    const newButtonData: ButtonDataTuple = [buttonData[0], buttonData[1], buttonData[2]]
    newButtonData[i] = { position, rotation, initialized }
    setButtonData(newButtonData)
  }

  const moveCamera = (i: 0 | 1 | 2) => {
    console.log('move camera to ', i + 1)
    const currentButtonData = buttonData[i]
    console.log(currentButtonData)
    if (!currentButtonData.initialized) return
    view.camera.controller.moveTo(currentButtonData.position, currentButtonData.rotation)
  }

  const handleClick = (i: 0 | 1 | 2) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e.shiftKey) {
      saveButtonData(i)
    } else {
      moveCamera(i)
    }
  }

  const buttonIndices = [0, 1, 2] as const
  return (
    <div className="relative">
      <canvas ref={canvasRef} width={width} height={height} className="relative" />
      <div className="fixed top-10 left-10 z-10 flex gap-4">
        {buttonIndices.map((i) => (
          <button onClick={handleClick(i)} key={i}>
            Button {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default App
