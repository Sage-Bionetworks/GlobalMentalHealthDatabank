import React, { useEffect, useState } from 'react'
import { shuffle } from 'lodash'
import { useTranslation } from 'react-i18next'
import { rankOptions } from '../../../data/ranking/options'
import NavigationArrows from '../../common/NavigationArrows'
import useBreakpoint from '../../../helpers/hooks/useBreakpoint'
import MobileRanking from './mobile/MobileRanking'
import DesktopRanking from './desktop/DesktopRanking'

type Card = {
  id: number
  title: string
  text: string
}

type Props = {
  step: number
  setStep: Function
  updateClientData: Function
}

function RankChoice({ step, setStep, updateClientData }: Props) {
  const [cards, setCards] = useState(rankOptions)
  const [activeCard, setActiveCard] = useState<number | undefined>()
  const breakpoint = useBreakpoint()
  const isMobile = breakpoint < 768
  const { t } = useTranslation()

  useEffect(() => {
    const shuffledCards = shuffle(rankOptions)
    setCards(shuffledCards)
    const cardTitles = shuffledCards.map(card => card.title)
    updateClientData(step - 1, { rankedChoiceInitial: cardTitles })
  }, [])

  const handleNext = () => {
    setStep((current: number) => current + 1)
    const cardTitles = cards.map(card => card.title)
    updateClientData(step, { rankedChoiceFinal: cardTitles, skipRanking: true })
  }

  const handleBack = () => setStep((current: number) => current - 1)
  return (
    <div>
      <div className="rankingChoice">
        <h1>{t('form.secondCommonConsent.ranking.title')}</h1>
        <p>{t('form.secondCommonConsent.ranking.paragraph1')}</p>
        <p>{t('form.secondCommonConsent.ranking.paragraph2')}</p>
        <p>{t('form.secondCommonConsent.ranking.paragraph3')}</p>
        <p>{t('form.secondCommonConsent.ranking.paragraph4')}</p>
        <p>
          <span>{t('form.secondCommonConsent.ranking.paragraph5')}</span>
        </p>
        {isMobile ? (
          <MobileRanking
            cards={cards}
            setCards={setCards}
            activeCard={activeCard}
            setActiveCard={setActiveCard}
          />
        ) : (
          <DesktopRanking cards={cards} setCards={setCards} />
        )}
      </div>
      <NavigationArrows onBack={handleBack} onNext={handleNext} />
    </div>
  )
}

export default RankChoice
