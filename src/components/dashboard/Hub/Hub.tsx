import React from 'react'
import { Typography } from '@material-ui/core'
import ResponsiveStepWrapper from '../../common/ResponsiveStepWrapper'
import Card, { HubCardProps } from './Card'

function Hub() {
  const hubCards: HubCardProps[] = [
    {
      title: 'Eligibility',
      subtitle: 'Are you eligible for the study?',
      time: 'Approx. 2 minutes',
      status: 'active',
      route: '/hub/eligibility',
    },
    {
      title: 'Registration',
      subtitle: 'Enter your phone number to create an account',
      time: 'Approx. 2 minutes',
      status: 'disabled',
      route: '/hub/registration',
    },
    {
      title: 'About the study',
      subtitle: 'Learn about the study and the risks and benefits of joining',
      time: 'Approx. 7 minutes',
      status: 'disabled',
      route: '/hub/about-the-study',
    },
    {
      title: 'About data sharing',
      subtitle: 'Learn how your data will be used.',
      time: 'Approx. 7 minutes',
      status: 'disabled',
      route: '/hub/about-data-sharing',
    },
    {
      title: 'Summary and signature',
      subtitle: 'Review and confirm',
      time: 'Approx. 3 minutes',
      status: 'disabled',
      route: '/hub/summary-and-signature',
    },
  ]
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
