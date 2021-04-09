import React from 'react'
import ProgressBar from '../../progressBar/ProgressBar'
import { ReactComponent as LogoNoText } from '../../../assets/logo-no-text.svg'
import { ReactComponent as ArrowButtonLeft } from '../../../assets/arrow_button_left.svg'
import { ReactComponent as ArrowButtonRight } from '../../../assets/arrow_button_right.svg'

type ArmFlowFourProps = {
  step: number
  setStep: Function
  maxSteps: number
  updateClientData: Function
}

function ArmFlowFour({
  step,
  setStep,
  maxSteps,
  updateClientData,
}: ArmFlowFourProps) {
  return (
    <div className="textStepWrapper">
      <ProgressBar step={step} maxSteps={maxSteps} />
      <LogoNoText />
      <div className="headerWrapper">
        <h1>Placeholder for arm flow 4</h1>
      </div>
      <h2>participant_choice</h2>
      <ul>
        <li>Content A</li>
        <li>Content B</li>
      </ul>

      <div className="arrowButtonsWrapper">
        <ArrowButtonLeft
          onClick={() =>
            setStep((current: number) => (current > 1 ? current - 1 : current))
          }
        />
        <ArrowButtonRight
          onClick={() => {
            setStep((current: number) =>
              current < maxSteps ? current + 1 : current,
            )
            updateClientData(step)
          }}
        />
      </div>
    </div>
  )
}

export default ArmFlowFour
