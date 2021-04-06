import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button/Button'
import ProgressBar from '../progressBar/ProgressBar'
import SageForm from '../form/SageForm'
import { COUNTRIES } from '../form/types'
import Separator from '../static/Separator'
import { Redirect } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

type EligibilityProps = {
  setEligibilityFn: Function
}

const MAX_STEPS: number = 5

export const Eligibility: React.FunctionComponent<EligibilityProps> = ({
  setEligibilityFn,
}: EligibilityProps) => {
  const [checks, setChecks] = useState({
    validAgeRange: false,
    hasAndroid: false,
    inValidLocation: false,
    supportSurvey: false,
  })

  const [step, setStep] = useState(1)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setErrorMessage('')
  }, [step])

  if (step === 1) {
    return (
      <div className="quizWrapper">
        <ProgressBar step={step} maxSteps={MAX_STEPS} />
        <SageForm
          title={'Where do you currently live?'}
          errorMessage={errorMessage}
          formId={'countrySelector'}
          onSubmit={(event: any) => {
            const selectedCountry = event.formData.country_chooser
            if (selectedCountry && Object.keys(selectedCountry).length === 0)
              setErrorMessage('You must choose an option')
            else {
              window.localStorage.setItem(
                'selected_country',
                selectedCountry.your_country,
              )
              if (selectedCountry.your_country !== COUNTRIES.OTHER)
                setChecks(prev => {
                  return { ...prev, inValidLocation: true }
                })
              setStep((current: number) =>
                current < MAX_STEPS ? current + 1 : current,
              )
            }
          }}
        />
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="quizWrapper">
        <ProgressBar step={step} maxSteps={MAX_STEPS} />
        <SageForm
          title={'Are you between the ages of 18 - 24 years old?'}
          errorMessage={errorMessage}
          formId={'ageVerify'}
          onSubmit={(event: any) => {
            const selectedOption = event.formData.age_verify
            if (selectedOption && Object.keys(selectedOption).length === 0)
              setErrorMessage('You must choose an option')
            else {
              setChecks(prev => {
                return { ...prev, validAgeRange: selectedOption.age_range }
              })
              setStep((current: number) =>
                current < MAX_STEPS ? current + 1 : current,
              )
            }
          }}
        />
      </div>
    )
  }

  if (step === 3) {
    return (
      <div className="quizWrapper">
        <ProgressBar step={step} maxSteps={MAX_STEPS} />
        <SageForm
          title={'Do you have access to an Android smart phone?'}
          errorMessage={errorMessage}
          formId={'androidVerify'}
          onSubmit={(event: any) => {
            const selectedOption = event.formData.android_verify
            if (selectedOption && Object.keys(selectedOption).length === 0)
              setErrorMessage('You must choose an option')
            else {
              setChecks(prev => {
                return { ...prev, hasAndroid: selectedOption.has_android }
              })
              setStep((current: number) =>
                current < MAX_STEPS ? current + 1 : current,
              )
            }
          }}
        />
      </div>
    )
  }

  if (step === 4) {
    return (
      <div className="quizWrapper">
        <ProgressBar step={step} maxSteps={MAX_STEPS} />
        <SageForm
          title={
            'Have you ever felt you could have benefited / did benefit from access to support for anxiety or depression?'
          }
          errorMessage={errorMessage}
          formId={'supportVerify'}
          onSubmit={(event: any) => {
            const selectedOption = event.formData.support_verify
            if (selectedOption && Object.keys(selectedOption).length === 0)
              setErrorMessage('You must choose an option')
            else {
              setChecks(prev => {
                return { ...prev, supportSurvey: selectedOption.accept }
              })
              setStep((current: number) =>
                current < MAX_STEPS ? current + 1 : current,
              )
            }
          }}
        />
      </div>
    )
  }

  if (step === 5) {
    if (
      checks.hasAndroid &&
      checks.inValidLocation &&
      checks.supportSurvey &&
      checks.validAgeRange
    )
      setEligibilityFn()

    return (
      <div className="quizWrapper">
        <div className="headerWrapper">
          <h1>Thank you for your time!</h1>
        </div>
        <Separator />
        <div className="rejectionText">
          It looks like this is not the right study for you, but we really
          appreciate your interest in helping us out!
        </div>
        <NavLink to="/home">
          <Button
            color="primary"
            variant="contained"
            size="large"
            className="wideButton"
            onClick={() => {
              return <Redirect to="/home" />
            }}
          >
            Back to home
          </Button>
        </NavLink>
      </div>
    )
  }

  return null
}

export default Eligibility
