import React from 'react'
import NavigationArrows from '../common/NavigationArrows'
import { useRankedChoice } from './RankedChoice/context/RankedChoiceContext'
import { useTranslation } from 'react-i18next'
import { useSessionDataState } from '../../AuthContext'
import { HealthService } from '../../services/health.service'

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

  const handleNext = async () => {
    if (token) {
      setStep((current: number) => current + 1)
      const cardTitles = cards.map(card => card.title)
      const response = await updateClientData(step, {
        rankedChoiceFinal: cardTitles,
        skipRanking: true,
      })
      const { clientData } = response.data
      await HealthService.sendHealthData(token, clientData)
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
      <NavigationArrows preventBack onNext={handleNext} />
    </div>
  )
}

export default RankedChoiceSummary
