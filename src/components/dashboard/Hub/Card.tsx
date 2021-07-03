import React from 'react'
import { useHistory } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { ReactComponent as ChevronRight } from '../../../assets/hub/chevron-right-slim.svg'
import { ReactComponent as Lock } from '../../../assets/hub/lock.svg'
import { ReactComponent as CircledCheck } from '../../../assets/hub/circled-check.svg'

export type HubCardProps = {
  title: string
  subtitle: string
  time: string
  status?: 'disabled' | 'active' | 'complete'
  route: string
}

Card.defaultProps = {
  status: 'disabled',
}

function Card({ title, subtitle, time, status, route }: HubCardProps) {
  const { push } = useHistory()
  const handleClick = () => {
    if (status === 'active') {
      push(route)
    }
  }
  return (
    <div className={`hub__card ${status}`} onClick={handleClick}>
      <div className="hub__card__text">
        <Typography variant="h6">{title}</Typography>
        <div className="btm-20">
          <Typography variant="subtitle1">{subtitle}</Typography>
        </div>
        <div className="time">
          {status === 'complete' && <CircledCheck />}
          <Typography variant="subtitle1">
            {status === 'complete' ? 'Complete!' : time}
          </Typography>
        </div>
      </div>
      <div className="hub__card__icon">
        {status === 'active' && <ChevronRight />}
        {status === 'disabled' && <Lock />}
      </div>
    </div>
  )
}

export default Card
