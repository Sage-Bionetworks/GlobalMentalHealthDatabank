import React from 'react'
import { cloneDeep } from 'lodash'

import Card from './Card'

type Card = {
  id: number
  title: string
  text: string
}

type Props = {
  cards: Card[]
  setCards: Function
  activeCard?: number
  setActiveCard: Function
}

function MobileRanking({ cards, setCards, activeCard, setActiveCard }: Props) {
  const moveUp = (position: number) => {
    if (position > 0) {
      const newCards = cloneDeep(cards)
      const temp = cards[position - 1]
      newCards[position - 1] = cards[position]
      newCards[position] = temp
      setCards(newCards)
    }
  }
  const moveDown = (position: number) => {
    if (position < cards.length - 1) {
      const newCards = cloneDeep(cards)
      const temp = cards[position + 1]
      newCards[position + 1] = cards[position]
      newCards[position] = temp
      setCards(newCards)
    }
  }
  return (
    <div className="cards">
      {cards.map((card, index) => (
        <Card
          key={card.id}
          title={card.title}
          text={card.text}
          active={card.id === activeCard}
          onClick={() => setActiveCard(card.id)}
          moveUp={() => moveUp(index)}
          moveDown={() => moveDown(index)}
          disableUp={index === 0}
          disableDown={index === cards.length - 1}
        />
      ))}
    </div>
  )
}

export default MobileRanking
