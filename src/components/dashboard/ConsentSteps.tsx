import React, { useEffect, useState } from 'react'

import { ReactComponent as LogoNoText } from '../../assets/logo-no-text.svg'
import { ReactComponent as ArrowButtonLeft } from '../../assets/arrow_button_left.svg'
import { ReactComponent as ArrowButtonRight } from '../../assets/arrow_button_right.svg'
import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button/Button'
import moment from 'moment'
import i18next from 'i18next'
import Separator from '../static/Separator'

import SageForm from './SageForm'
import { ReactComponent as ErrorMessageIcon } from '../../assets/error_message_icon.svg'

const MAX_STEPS: number = 3

const ConsentSteps: React.FunctionComponent = () => {
  const [step, setStep] = useState(1)
  const [consented, setConsented] = useState(false)
  const [signatureName, setSignatureName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setErrorMessage('')
  }, [step])

  const renderProgresBar = () => {
    return (
      <>
        <div className="progressBarHeader">{`STEP ${step} OF N`}</div>
        <div className="progressBarWrapper">
          <LinearProgress
            variant="determinate"
            value={(step * 100) / MAX_STEPS}
          />
        </div>
      </>
    )
  }

  if (step === MAX_STEPS) {
    return (
      <div>
        {renderProgresBar()}
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
              consent process. All of my questions have been answered. I freely
              and willingly choose to participate in the MindKind study. By
              signing this consent, I have not given up any of my legal rights.
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
          //onClick={() => alert('sent')}
          onClick={() => setStep(1)}
          disabled={!consented || signatureName.length < 5}
        >
          Submit
        </Button>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div>
        {renderProgresBar()}
        <div className="headerWrapper">
          <h1>What are we studying?</h1>
        </div>

        {errorMessage && (
          <div className="errorMessage">
            <ErrorMessageIcon />
            {errorMessage}
          </div>
        )}
        <Separator />

        <SageForm
          formId={'countrySelector'}
          onSubmit={(event: any) => {
            const selectedCountry = event.formData.country_chooser
            if (selectedCountry && Object.keys(selectedCountry).length === 0)
              setErrorMessage('You must choose an option')
            else {
              if (selectedCountry.your_country === 'Other')
                setErrorMessage(
                  'We are sorry but your country is not supported in this survey',
                )
              else
                setStep((current: number) =>
                  current < MAX_STEPS ? current + 1 : current,
                )
            }
          }}
        />
      </div>
    )
  }

  return (
    <div>
      {renderProgresBar()}
      <LogoNoText />
      <div className="headerWrapper">
        <h1>What are we studying?</h1>
      </div>
      <h2>We are trying to answer these questions:</h2>
      <ul>
        <li>
          Are young people willing to use an app to collect information (data)
          about their mental health? If so, will they use it for 3 months?
        </li>
        <li>
          Are young people willing to share that data for health research? If
          so, under what conditions?
        </li>
      </ul>
      <div>
        This study is funded by The Wellcome Foundation, and lead by Dr. Lara
        Mangravite in the United States. It is being conducted under the
        supervision of scientists in South Africa, India, and the United
        Kingdom. You can{' '}
        <a className="dashboardLink">learn more about our team</a> of
        researchers on the study website{' '}
      </div>

      <div className="arrowButtonsWrapper">
        <ArrowButtonLeft
          onClick={() =>
            setStep((current: number) => (current > 1 ? current - 1 : current))
          }
        />
        <ArrowButtonRight
          onClick={() =>
            setStep((current: number) =>
              current < MAX_STEPS ? current + 1 : current,
            )
          }
        />
      </div>
    </div>
  )
}

export default ConsentSteps
