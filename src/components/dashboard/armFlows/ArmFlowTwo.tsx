import React from 'react'
import ProgressBar from '../../progressBar/ProgressBar'
import { ReactComponent as LogoNoText } from '../../../assets/logo-no-text.svg'
import { ReactComponent as ArrowButtonLeft } from '../../../assets/arrow_button_left.svg'
import { ReactComponent as ArrowButtonRight } from '../../../assets/arrow_button_right.svg'

type ArmFlowTwoProps = {
  step: number
  setStep: Function
  maxSteps: number
  updateClientData: Function
}

function ArmFlowTwo({
  step,
  setStep,
  maxSteps,
  updateClientData,
}: ArmFlowTwoProps) {
  return (
    <div className="textStepWrapper">
      <ProgressBar step={step} maxSteps={maxSteps} />
      <LogoNoText />
      <div className="headerWrapper">
        <h1>How will your study data be used?</h1>
      </div>
      <h2>
        All of the people who join the study will get to vote on how the data is
        used. The vote takes place after you join the study. We will ask for you
        to vote on questions like:
      </h2>
      <ul>
        <li>
          What topics should researchers using the study data be allowed to
          study? (Mental health only? Health generally? Any topic?)
        </li>
        <li>
          Who reviews requests to use the data? (Participants like you? A
          special panel?)
        </li>
        <li>
          Is it okay for researchers to make a profit from using the data?
        </li>
      </ul>

      <h2>
        No matter what the result of the vote is, researchers will only be able
        to access the data in a secure server.
      </h2>
      <ul>
        <li>
          They will not be able to download the study data. Also, they will have
          to sign an agreement saying they will not try to find out who you are.
        </li>
        <li>
          We will tell you the results of the vote before we let any researchers
          use the data. If you disagree with the vote, you can quit (withdraw)
          from the study. We will delete any information that directly
          identifies you. We will not delete any coded study data.
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

export default ArmFlowTwo
