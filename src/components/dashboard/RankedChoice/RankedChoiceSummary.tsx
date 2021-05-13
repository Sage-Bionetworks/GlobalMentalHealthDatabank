import React from 'react'
import NavigationArrows from '../../common/NavigationArrows'
import { useRankedChoice } from '../RankedChoice/context/RankedChoiceContext'
import { useTranslation } from 'react-i18next'
import { useSessionDataState } from '../../../AuthContext'
import { HealthService } from '../../../services/health.service'
import { PAGE_ID_FIELD_NAME, PAGE_ID } from '../../../types/types'

type Props = {
  step: number
  setStep: Function
  updateClientData: Function
}

function RankedChoiceSummary({ step, setStep, updateClientData }: Props) {
  const { cards } = useRankedChoice()
  const { t } = useTranslation()
  const sessionData = useSessionDataState()
  const { token } = sessionData

  const handleBack = () =>
    setStep((current: number) => (current > 1 ? current - 1 : current))

  const handleNext = async () => {
    if (token) {
      setStep((current: number) => current + 1)
      const cardTitles = cards.map(card => card.title)
      const response = await updateClientData(step + 1, {
        rankedChoiceFinal: cardTitles,
        skipRanking: true,
        [PAGE_ID_FIELD_NAME]: PAGE_ID.APP_DOWNLOAD,
      })
      const { clientData } = response.data
      await HealthService.sendHealthData(token, {
        rankedChoiceFinal: cardTitles,
        rankedChoiceInitial: clientData.rankedChoiceInitial,
      })
    }
  }

  return (
    <div className="ranking-summary">
      <h1>{t('form.secondCommonConsent.ranking.confirmation')}</h1>
      <p>{t('form.secondCommonConsent.ranking.review')}</p>
      {cards.map(card => (
        <p className="option" key={`card-id-${card.id}`}>
          &gt; {card.title}
        </p>
      ))}
      <NavigationArrows onBack={handleBack} onNext={handleNext} />
    </div>
  )
}

export default RankedChoiceSummary
