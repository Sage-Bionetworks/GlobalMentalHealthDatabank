import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import { cloneDeep } from 'lodash'
import ResponsiveStepWrapper from '../../common/ResponsiveStepWrapper'
import Card from './Card'
import { useEligibility } from 'components/eligibility/context/EligibilityContext'
import { hubSteps } from 'data/hub/hub'
import { HUB_STEPS } from 'constants/constants'

function Hub() {
  const [hubCards, setHubCards] = useState(hubSteps)
  const { isEligible } = useEligibility()
  if (isEligible) {
    const newCards = cloneDeep(hubCards)
    newCards[HUB_STEPS.ELEGIBILITY - 1].status = 'complete'
    newCards[HUB_STEPS.REGISTRATION - 1].status = 'active'
    setHubCards(newCards)
  }
  return (
    <div className="hub">
      <ResponsiveStepWrapper variant="card">
        <div className="quiz-wrapper">
          <Typography variant="h3">Hello</Typography>
          <Typography variant="h6" className="btm-20">
            Please complete the sections below to sign up for the MindKind
            Study.
          </Typography>
          <div className="hub__cards">
            {hubCards.map(card => (
              <Card
                key={card.id}
                title={card.title}
                subtitle={card.subtitle}
                time={card.time}
                status={card.status}
                route={card.route}
              />
            ))}
          </div>
        </div>
      </ResponsiveStepWrapper>
    </div>
  )
}

export default Hub
