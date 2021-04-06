import React from 'react'
import ProgressBar from '../../progressBar/ProgressBar'
import { ReactComponent as LogoNoText } from '../../../assets/logo-no-text.svg'
import { ReactComponent as ArrowButtonLeft } from '../../../assets/arrow_button_left.svg'
import { ReactComponent as ArrowButtonRight } from '../../../assets/arrow_button_right.svg'

type ArmFlowFourProps = {
  step: number
  setStep: Function
  maxSteps: number
}

function ArmFlowFour({ step, setStep, maxSteps }: ArmFlowFourProps) {
  return (
    <div className="textStepWrapper">
      <ProgressBar step={step} maxSteps={maxSteps} />
      <LogoNoText />
      <div className="headerWrapper">
        <h1>Placeholder for arm 4</h1>
      </div>
      <h2>placeholder h2</h2>
      <ul>
        <li>lorem ipsun</li>
        <li> lorem ipsun</li>
      </ul>

      <div className="arrowButtonsWrapper">
        <ArrowButtonLeft
          onClick={() =>
            setStep((current: number) => (current > 1 ? current - 1 : current))
          }
        />
        <ArrowButtonRight
          onClick={() =>
            setStep((current: number) =>
              current < maxSteps ? current + 1 : current,
            )
          }
        />
      </div>
    </div>
  )
}

export default ArmFlowFour
