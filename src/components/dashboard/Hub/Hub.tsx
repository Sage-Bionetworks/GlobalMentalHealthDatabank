import React from 'react'
import { Typography } from '@material-ui/core'
import ResponsiveStepWrapper from '../../common/ResponsiveStepWrapper'
import Card, { HubCardProps } from './Card'

type Props = {
  cards: HubCardProps[]
}

function Hub({ cards }: Props) {
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
            {cards.map(card => (
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
