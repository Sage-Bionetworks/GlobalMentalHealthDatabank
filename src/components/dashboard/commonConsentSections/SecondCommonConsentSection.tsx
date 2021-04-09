import React, { useEffect, useState } from 'react'
import ProgressBar from '../../progressBar/ProgressBar'
import { ReactComponent as LogoNoText } from '../../../assets/logo-no-text.svg'
import { ReactComponent as ArrowButtonLeft } from '../../../assets/arrow_button_left.svg'
import { ReactComponent as ArrowButtonRight } from '../../../assets/arrow_button_right.svg'
import Button from '@material-ui/core/Button/Button'
import moment from 'moment'
import SageForm from '../../form/SageForm'
import i18next from 'i18next'

type SecondCommonConsentProps = {
  startingStep: number
  step: number
  setStep: Function
  maxSteps: number
  updateClientData: Function
}

function SecondCommonConsentSection({
  startingStep,
  step,
  setStep,
  maxSteps,
  updateClientData,
}: SecondCommonConsentProps) {
  const [consented, setConsented] = useState(false)
  const [signatureName, setSignatureName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setErrorMessage('')
    setSignatureName('')
    setConsented(false)
  }, [step])

  switch (step) {
    case startingStep: {
      return (
        <div className="textStepWrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <LogoNoText />
          <div className="headerWrapper">
            <h1>This is second consent section placeholder</h1>
          </div>
          <h2>Subtitle placeholder</h2>
          <ul>
            <li>Content A</li>
            <li>Content B</li>
          </ul>

          <div className="arrowButtonsWrapper">
            <ArrowButtonLeft
              onClick={() =>
                setStep((current: number) =>
                  current > 1 ? current - 1 : current,
                )
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
    case maxSteps:
      return (
        <div className="textStepWrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <LogoNoText />
          <div className="headerWrapper">
            <h1>Consent Signature</h1>
          </div>
          <h3>
            Please <b>check the box below</b> if you <b>agree</b> to take part:
          </h3>
          <span className="consentWrapper">
            <input
              type="checkbox"
              id="consented"
              value="consented"
              onClick={() => setConsented(prev => !prev)}
            />
            <div>
              <b>
                I have read and understand the information presented in this
                consent process. All of my questions have been answered. I
                freely and willingly choose to participate in the MindKind
                study. By signing this consent, I have not given up any of my
                legal rights.
              </b>
            </div>
          </span>

          <h2>{moment().locale(i18next.language).format('MMMM Do, YYYY')}</h2>

          <fieldset>
            <legend>Full Name of adult participant:</legend>
            <input
              type="text"
              value={signatureName}
              onChange={e => {
                setSignatureName(e.target.value)
              }}
            ></input>
          </fieldset>

          <Button
            type="button"
            variant="contained"
            fullWidth
            color="primary"
            style={{ margin: '40px 0' }}
            onClick={() => setStep(1)}
            disabled={!consented || signatureName.length < 5}
          >
            Submit
          </Button>
        </div>
      )
    default:
      return (
        <div className="textStepWrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <LogoNoText />
          <div className="headerWrapper">
            <h1>You are in step {step}</h1>
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
}

export default SecondCommonConsentSection
