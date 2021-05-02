import React from 'react'
import NavigationArrows from '../common/NavigationArrows'
import { useRankedChoice } from './RankedChoice/context/RankedChoiceContext'

type Props = {
  step: number
  setStep: Function
  updateClientData: Function
}

function RankedChoiceSummary({ step, setStep, updateClientData }: Props) {
  const { cards } = useRankedChoice()

  const handleNext = () => {
    setStep((current: number) => current + 1)
    const cardTitles = cards.map(card => card.title)
    updateClientData(step, { rankedChoiceFinal: cardTitles, skipRanking: true })
  }
  return (
    <div className="ranking-summary">
      <h1>Voting Confirmation</h1>
      <p>Review the list below to confirm this represents your choices.</p>
      {cards.map(card => (
        <p className="option">&gt; {card.title}</p>
      ))}
      <NavigationArrows preventBack onNext={handleNext} />
    </div>
  )
}

export default RankedChoiceSummary
