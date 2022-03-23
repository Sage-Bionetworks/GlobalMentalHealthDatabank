import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import ResponsiveStepWrapper from '../../common/ResponsiveStepWrapper'
import Card, { HubCardProps } from './Card'
import { useLocation } from 'react-router-dom'

type Props = {
  cards: HubCardProps[]
}

function Hub({ cards }: Props) {
  const [showEnrollment, setShowEnrollment] = useState(false)
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const forceShowEnrollmentURLParam = params.get('forceShowEnrollment')

  useEffect(() => {
    if (forceShowEnrollmentURLParam === 'true') {
      setShowEnrollment(true)
    }
  }, [forceShowEnrollmentURLParam])

  return (
    <div className="hub">
      <ResponsiveStepWrapper variant="card">
        <div className="quiz-wrapper">
          <Typography variant="h3">Hello</Typography>
          <Typography variant="h5">
            Thank you for your interest. Enrollment for the MindKind study is
            now closed.
          </Typography>
          {showEnrollment && (
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
          )}
        </div>
      </ResponsiveStepWrapper>
    </div>
  )
}

export default Hub
