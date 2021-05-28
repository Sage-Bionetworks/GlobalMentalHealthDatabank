import React, { useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import NavigationArrows from '../../common/NavigationArrows'
import useBreakpoint from '../../../helpers/hooks/useBreakpoint'
import MobileRanking from './mobile/MobileRanking'
import DesktopRanking from './desktop/DesktopRanking'
import { useRankedChoice } from './context/RankedChoiceContext'
import { PAGE_ID_FIELD_NAME, PAGE_ID } from '../../../constants/constants'

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Typography variant="h3">
          {t('form.secondCommonConsent.ranking.title')}
        </Typography>
        <Typography variant="body2">
          {t('form.secondCommonConsent.ranking.paragraph1')}
        </Typography>
        <Typography variant="body2">
          {t('form.secondCommonConsent.ranking.paragraph2')}
        </Typography>
        <Typography variant="body2">
          {t('form.secondCommonConsent.ranking.paragraph3')}
        </Typography>
        <Typography variant="body2">
          {t('form.secondCommonConsent.ranking.paragraph4')}
        </Typography>
        <Typography variant="h6">
          {t('form.secondCommonConsent.ranking.paragraph5')}
        </Typography>
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
