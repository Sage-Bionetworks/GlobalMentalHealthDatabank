import React from 'react'
import { Container } from './Container'
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import { HTML5Backend } from 'react-dnd-html5-backend'

type DndProps = {
  data: any
  setData: Function
  platform?: string
}

export const Dnd: React.FunctionComponent<DndProps> = ({
  data,
  setData,
  platform,
}: DndProps) => {
  let backendPlatform = platform

  if (!backendPlatform) {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      backendPlatform = 'mobile'
    } else {
      backendPlatform = 'web'
    }
  }

  return (
    <div className="App">
      <DndProvider
        backend={backendPlatform === 'web' ? HTML5Backend : TouchBackend}
      >
        <Container data={data} setData={setData} />
      </DndProvider>
    </div>
  )
}
