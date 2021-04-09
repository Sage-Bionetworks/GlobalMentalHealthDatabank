import React from 'react'
import ProgressBar from '../../progressBar/ProgressBar'
import { ReactComponent as LogoNoText } from '../../../assets/logo-no-text.svg'
import { ReactComponent as ArrowButtonLeft } from '../../../assets/arrow_button_left.svg'
import { ReactComponent as ArrowButtonRight } from '../../../assets/arrow_button_right.svg'

type ArmFlowOneProps = {
  step: number
  setStep: Function
  maxSteps: number
  updateClientData: Function
}

function ArmFlowOne({
  step,
  setStep,
  maxSteps,
  updateClientData,
}: ArmFlowOneProps) {
  return (
    <div className="textStepWrapper">
      <ProgressBar step={step} maxSteps={maxSteps} />
      <LogoNoText />
      <div className="headerWrapper">
        <h1>How will your study data be used?</h1>
      </div>
      <h2>
        Your study data will be part of a global databank for researchers.{' '}
      </h2>
      <ul>
        <li>
          Researchers will be able to download a copy of the data from the
          databank. They will have to agree to follow strict data security
          rules. They will have to sign an agreement saying they will not try to
          find out who you are.
        </li>
        <li>
          {' '}
          The researchers who access this data will be from all over the world,
          and are investigating all kinds of topics. Researchers will use your
          data to make discoveries. If any of their studies lead to new tests,
          drugs, or other commercial products, you will not get any profits.
          These inventions will be the property of the researchers who develop
          them.
        </li>
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

export default ArmFlowOne
