import React from 'react'
import { Typography } from '@material-ui/core'
import ResponsiveStepWrapper from '../../common/ResponsiveStepWrapper'
import Card, { HubCardProps } from './Card'
import { useEligibility } from 'components/eligibility/context/EligibilityContext'

function Hub() {
  const hubCards: HubCardProps[] = [
    {
      id: 1,
      title: 'Eligibility',
      subtitle: 'Are you eligible for the study?',
      time: 'Approx. 2 minutes',
      status: 'complete',
      route: '/hub/eligibility',
    },
    {
      id: 2,
      title: 'Registration',
      subtitle: 'Enter your phone number to create an account',
      time: 'Approx. 2 minutes',
      status: 'active',
      route: '/hub/registration',
    },
    {
      id: 3,
      title: 'About the study',
      subtitle: 'Learn about the study and the risks and benefits of joining',
      time: 'Approx. 7 minutes',
      status: 'disabled',
      route: '/hub/about-the-study',
    },
    {
      id: 4,
      title: 'About data sharing',
      subtitle: 'Learn how your data will be used.',
      time: 'Approx. 7 minutes',
      status: 'disabled',
      route: '/hub/about-data-sharing',
    },
    {
      id: 5,
      title: 'Summary and signature',
      subtitle: 'Review and confirm',
      time: 'Approx. 3 minutes',
      status: 'disabled',
      route: '/hub/summary-and-signature',
    },
  ]
  const { isEligible } = useEligibility()
  if (isEligible) {
    hubCards[0].status = 'complete'
    hubCards[1].status = 'active'
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
