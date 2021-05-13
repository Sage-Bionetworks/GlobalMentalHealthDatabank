import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import NavigationArrows from '../../common/NavigationArrows'
import useBreakpoint from '../../../helpers/hooks/useBreakpoint'
import MobileRanking from './mobile/MobileRanking'
import DesktopRanking from './desktop/DesktopRanking'
import { useRankedChoice } from './context/RankedChoiceContext'
import { PAGE_ID_FIELD_NAME, PAGE_ID } from '../../../types/types'

type Props = {
  step: number
  setStep: Function
  updateClientData: Function
}

function RankChoice({ step, setStep, updateClientData }: Props) {
  const { cards, setCards, activeCard, setActiveCard } = useRankedChoice()
  const breakpoint = useBreakpoint()
  const isMobile = breakpoint < 768
  const { t } = useTranslation()

  useEffect(() => {
    const cardTitles = cards.map(card => card.title)
    updateClientData(step, {
      rankedChoiceInitial: cardTitles,
      [PAGE_ID_FIELD_NAME]: PAGE_ID.RANKING_CHOICE,
    })
  }, [])

  const handleNext = () => {
    setStep((current: number) => current + 1)
    updateClientData(step + 1, {
      [PAGE_ID_FIELD_NAME]: PAGE_ID.REVIEW_RANKING_CHOICE,
    })
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
