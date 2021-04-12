import React, { useEffect, useState } from 'react'
import ProgressBar from '../../progressBar/ProgressBar'
import { ReactComponent as LogoNoText } from '../../../assets/logo-no-text.svg'
import { ReactComponent as ArrowButtonLeft } from '../../../assets/arrow_button_left.svg'
import { ReactComponent as ArrowButtonRight } from '../../../assets/arrow_button_right.svg'
import SageForm from '../../form/SageForm'
import { PARTICIPATE_OPTIONS, FORM_IDS } from '../../form/types'

type FirstCommonConsentProps = {
  step: number
  setStep: Function
  maxSteps: number
  updateClientData: Function
}

function FirstCommonConsentSection({
  step,
  setStep,
  maxSteps,
  updateClientData,
}: FirstCommonConsentProps) {
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    setErrorMessage('')
    setSuccessMessage('')
  }, [step])

  const renderArrows = (preventBack?: boolean) => {
    return (
      <div className="arrowButtonsWrapper">
        <ArrowButtonLeft
          style={{ visibility: preventBack ? 'hidden' : 'visible' }}
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
    )
  }

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
            <a className="dashboardLink" href="/dashboard">
              learn more about our team
            </a>{' '}
            of researchers on the study website{' '}
          </div>
          {renderArrows()}
        </div>
      )

    case 2:
      return (
        <div className="textStepWrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <LogoNoText />
          <div className="headerWrapper">
            <h1>What will you ask me to do?</h1>
          </div>
          <p>
            <h2>
              1. Finish reading this consent. Ask any questions you have. Sign
              up.
            </h2>{' '}
          </p>
          <p>
            <h2>2. Install the MindKind Study App on your phone.</h2>
          </p>
          <p>
            <h2>3. Open the MindKind Study App to take part.</h2>{' '}
          </p>
          <ul>
            <li>
              Week 1: answer questions about your health and background. It
              should take about 15 minutes. You can skip any questions you do
              not wish to answer.
            </li>
            <li>
              Week 2 - Week 12: answer one or two surveys about your wellbeing.
              They should take less than 10 minutes each. You can skip any
              questions you do not wish to answer.
            </li>
            <li>
              Also! We will ask for your permission to collect data directly
              from your phone, like screen-time and step count. We will NEVER
              collect your exact location. We will NEVER collect what you say or
              type outside of the app (voice memos, text messages, emails,
              etc.). If you don’t want to share data from your phone with us
              that’s okay -- you can still participate in the rest of study.
            </li>
          </ul>
          {renderArrows()}
        </div>
      )

    case 3:
      return (
        <div className="quizWrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <SageForm
            title={'Which of the following will you be asked to do?'}
            errorMessage={errorMessage}
            infoMessage={successMessage}
            formId={FORM_IDS.HOW_TO_PARTICIPATE}
            buttonText={successMessage ? 'Next' : undefined}
            onSubmit={(event: any) => {
              const selectedOption = event.formData.how_to_participate

              if (successMessage) {
                setStep((current: number) =>
                  current < maxSteps ? current + 1 : current,
                )
              }

              if (selectedOption && Object.keys(selectedOption).length === 0) {
                setErrorMessage('You must choose an option')
                setSuccessMessage('')
              } else {
                if (
                  selectedOption.participate_option ===
                  PARTICIPATE_OPTIONS.ANSWER_SURVEY_QUESTIONS
                ) {
                  setSuccessMessage(
                    'This study will only require you to answer weekly survey questions.',
                  )
                  setErrorMessage('')
                  updateClientData(
                    step,
                    FORM_IDS.HOW_TO_PARTICIPATE,
                    selectedOption.participate_option,
                  )
                } else {
                  setErrorMessage(
                    'This study will only require you to answer weekly survey questions.',
                  )
                  setSuccessMessage('')
                }
              }
            }}
          />
        </div>
      )

    case 4:
      return (
        <div className="textStepWrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <LogoNoText />
          <div className="headerWrapper">
            <h1>Data Collection, Storage & Privacy</h1>
          </div>
          <h2>Your study data is:</h2>
          <ul>
            <li>the data you share with us in the MindKind Study App and</li>
            <li>the data you give us permission to collect from your phone.</li>
          </ul>
          <div>
            <p>We will encrypt your study data.</p>
            <p>We will transfer it to our server.</p>
            <p>
              Once we get your study data, we will replace your name with a
              random code.{' '}
            </p>
            <p>
              We will combine your coded study data with coded data from the
              other people in the study.
            </p>
            <p>
              We store all of the coded study data on a secure cloud server.
            </p>
          </div>
          {renderArrows(true)}
        </div>
      )

    case 5:
      return (
        <div className="textStepWrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <LogoNoText />
          <div className="headerWrapper">
            <h1>Transfer of Data & your data rights.</h1>
          </div>
          <p>We will transfer your study data out of your home country.</p>{' '}
          <p>
            We may transfer your study data anywhere in the world, including to
            the United States.
          </p>
          <h2>You have rights when it comes to your data:</h2>
          <ul>
            <li>You can request a copy of the data you have provided.</li>
            <li>
              You can ask us to correct information about you that is incorrect.
            </li>
          </ul>
          <div>
            If you are a citizen or resident of the European Union, click here
            to{' '}
            <a className="dashboardLink" href="/dashboard">
              learn more about your data rights.
            </a>
          </div>
          {renderArrows()}
        </div>
      )
  }
  return null
}

export default FirstCommonConsentSection
