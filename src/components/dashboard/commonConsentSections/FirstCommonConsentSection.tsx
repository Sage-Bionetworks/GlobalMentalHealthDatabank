import React, { useEffect, useState } from 'react'
import ProgressBar from '../../progressBar/ProgressBar'
import { ReactComponent as LogoNoText } from '../../../assets/logo-no-text.svg'
import { ReactComponent as ArrowButtonLeft } from '../../../assets/arrow_button_left.svg'
import { ReactComponent as ArrowButtonRight } from '../../../assets/arrow_button_right.svg'
import SageForm from '../../form/SageForm'

type FirstCommonConsentProps = {
  step: number
  setStep: Function
  maxSteps: number
}

function FirstCommonConsentSection({
  step,
  setStep,
  maxSteps,
}: FirstCommonConsentProps) {
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setErrorMessage('')
  }, [step])

  switch (step) {
    case 1:
      return (
        <div className="textStepWrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <LogoNoText />
          <div className="headerWrapper">
            <h1>What are we studying?</h1>
          </div>
          <h2>We are trying to answer these questions:</h2>
          <ul>
            <li>
              Are young people willing to use an app to collect information
              (data) about their mental health? If so, will they use it for 3
              months?
            </li>
            <li>
              Are young people willing to share that data for health research?
              If so, under what conditions?
            </li>
          </ul>
          <div>
            This study is funded by The Wellcome Foundation, and lead by Dr.
            Lara Mangravite in the United States. It is being conducted under
            the supervision of scientists in South Africa, India, and the United
            Kingdom. You can{' '}
            <a className="dashboardLink">learn more about our team</a> of
            researchers on the study website{' '}
          </div>

          <div className="arrowButtonsWrapper">
            <ArrowButtonLeft
              onClick={() =>
                setStep((current: number) =>
                  current > 1 ? current - 1 : current,
                )
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

    case 3:
      return (
        <div className="quizWrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <SageForm
            title={'Which of the following will you be asked to do?'}
            errorMessage={errorMessage}
            formId={'howToParticipate'}
            onSubmit={(event: any) => {
              //TODO handle wrong answer and setErrorMessage
              const selectedOption = event.formData.how_to_participate
              if (selectedOption && Object.keys(selectedOption).length === 0)
                setErrorMessage('You must choose an option')
              else {
                setStep((current: number) =>
                  current < maxSteps ? current + 1 : current,
                )
              }
            }}
          />
        </div>
      )

    default:
      //TODO replace this with actual steps
      return (
        <div className="textStepWrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <LogoNoText />
          <div className="headerWrapper">
            <h1>You are in step {step} of 5</h1>
          </div>
          <div className="arrowButtonsWrapper">
            <ArrowButtonLeft
              onClick={() =>
                setStep((current: number) =>
                  current > 1 ? current - 1 : current,
                )
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
}

export default FirstCommonConsentSection
