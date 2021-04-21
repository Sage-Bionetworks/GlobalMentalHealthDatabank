import React, { useEffect, useState } from 'react'
import { cloneDeep, shuffle } from 'lodash'
import { useTranslation } from 'react-i18next'
import Card from './components/Card'
import { rankOptions } from '../../../data/ranking/options'

function RankChoice() {
  const [cards, setCards] = useState(rankOptions)
  const [activeCard, setActiveCard] = useState<number | undefined>()
  const { t } = useTranslation()
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
      <h1>{t('form.secondCommonConsent.ranking.title')}</h1>
      <p>{t('form.secondCommonConsent.ranking.paragraph1')}</p>
      <p>{t('form.secondCommonConsent.ranking.paragraph2')}</p>
      <p>{t('form.secondCommonConsent.ranking.paragraph3')}</p>
      <p>{t('form.secondCommonConsent.ranking.paragraph4')}</p>
      <p>
        <span>{t('form.secondCommonConsent.ranking.paragraph5')}</span>
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
