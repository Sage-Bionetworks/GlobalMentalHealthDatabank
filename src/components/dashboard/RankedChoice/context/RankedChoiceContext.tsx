import React, { useState } from 'react'
import { rankOptions } from '../../../../data/ranking/options'

type Card = {
  id: number
  title: string
  text: string
}

type RankedChoiceState = {
  cards: Card[]
  setCards: (state: Card[]) => void
  activeCard?: number
  setActiveCard: (state: number | undefined) => void
}

const RankedChoiceContext = React.createContext<RankedChoiceState>({
  cards: [],
  setCards: (state: Card[]) => {},
  activeCard: undefined,
  setActiveCard: (state: number | undefined) => {},
})

export const useRankedChoice = () => React.useContext(RankedChoiceContext)

export function RankedChoiceProvider(props: { children: React.ReactNode }) {
  const { children } = props

  const [cards, setCards] = useState(rankOptions)
  const [activeCard, setActiveCard] = useState<number | undefined>()

  const value = {
    cards,
    setCards,
    activeCard,
    setActiveCard,
  }

  return (
    <RankedChoiceContext.Provider value={value}>
      {children}
    </RankedChoiceContext.Provider>
  )
}
