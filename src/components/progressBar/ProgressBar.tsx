import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'

type ProgressBarProps = {
  step: number
  maxSteps: number
}

const ProgressBar = ({ step, maxSteps }: ProgressBarProps) => {
  return (
    <>
      <div className="progressBarHeader">{`STEP ${step} OF ${maxSteps}`}</div>
      <div className="progressBarWrapper">
        <LinearProgress variant="determinate" value={(step * 100) / maxSteps} />
      </div>
    </>
  )
}

export default ProgressBar
