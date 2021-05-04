import React from 'react'
import { Dnd } from './dnd/Dnd'

type Card = {
  id: number
  title: string
  text: string
}

type Props = {
  cards: Card[]
  setCards: Function
}

function DesktopRanking({ cards, setCards }: Props) {
  return (
    <div className="desktop-ranking">
      <Dnd data={cards} setData={setCards} />
    </div>
  )
}

export default DesktopRanking
