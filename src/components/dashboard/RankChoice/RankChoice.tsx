import React, { useEffect, useState } from 'react'
import { cloneDeep, shuffle } from 'lodash'
import Card from './components/Card'
import { rankOptions } from './options'

function RankChoice() {
  const [cards, setCards] = useState(rankOptions)
  const [activeCard, setActiveCard] = useState<number | undefined>()
  useEffect(() => {
    setCards(shuffle(rankOptions))
  }, [])
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
    <div className="rankingChoice">
      <h1>Which is correct?</h1>
      <p>
        All of the people who join the study will get to vote on how the data is
        used. <span>Now is the time for you to cast your ballot.</span>
      </p>
      <p>
        Based on how all the people in the study vote, the top items will be the
        rules for the databank.
      </p>
      <p>
        If there is disagreement between two items, only the top-most will be
        used. For example, if the second highest voted item is: “No one can use
        this data to make a profit” and the third highest voted item is: “Anyone
        can use this data and make a profit,” we will not let researchers use
        the data to make a profit.
      </p>
      <p>
        <span>
          Order the statements below from your top choice (most preferred) to
          your bottom choice (least preferred). Tap or click an option to select
          it.
        </span>
      </p>
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
    </div>
  )
}

export default RankChoice
