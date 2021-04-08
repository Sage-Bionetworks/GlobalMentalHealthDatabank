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

const MAX_STEPS: number = 6

const INITIAL_QUIZ_CHOICES = {
  howDidYouHear: -1,
  accessToSupport: '',
  userLocation: -1,
  hasAndroid: '',
  understandsEnglish: '',
  inAgeRange: '',
}

export const Eligibility: React.FunctionComponent<EligibilityProps> = ({
  setEligibilityFn,
}: EligibilityProps) => {
  const [step, setStep] = useState(1)
  const [errorMessage, setErrorMessage] = useState('')
  const [quizChoices, setQuizChoices] = useState(INITIAL_QUIZ_CHOICES)

  useEffect(() => {
    setErrorMessage('')
  }, [step])

  window.scrollTo(0, 0)

  switch (step) {
    case 1:
      return (
        <div className="quizWrapper">
          <ProgressBar step={step} maxSteps={MAX_STEPS} />
          <SageForm
            title={'How did you hear about us?'}
            errorMessage={errorMessage}
            formId={'howDidYouHear'}
            onSubmit={(event: any) => {
              const selectedOption = event.formData.how_did_you_hear
              if (selectedOption && Object.keys(selectedOption).length === 0)
                setErrorMessage('You must choose an option')
              else {
                setQuizChoices((prev: any) => ({
                  ...prev,
                  howDidYouHear: selectedOption.how_options,
                }))
                setStep((current: number) =>
                  current < MAX_STEPS ? current + 1 : current,
                )
              }
            }}
          />
        </div>
      )
    case 2:
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
                setQuizChoices(prev => {
                  return { ...prev, accessToSupport: selectedOption.accept }
                })
                setStep((current: number) =>
                  current < MAX_STEPS ? current + 1 : current,
                )
              }
            }}
          />
        </div>
      )
    case 3:
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
                setQuizChoices(prev => {
                  return {
                    ...prev,
                    userLocation: selectedCountry.your_country,
                  }
                })
                setStep((current: number) =>
                  current < MAX_STEPS ? current + 1 : current,
                )
              }
            }}
          />
        </div>
      )

    case 4:
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
                setQuizChoices(prev => {
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

    case 5:
      return (
        <div className="quizWrapper">
          <ProgressBar step={step} maxSteps={MAX_STEPS} />
          <SageForm
            title={'Are you comfortable reading and writing in English?'}
            errorMessage={errorMessage}
            formId={'understandsEnglish'}
            onSubmit={(event: any) => {
              const selectedOption = event.formData.understands_english
              if (selectedOption && Object.keys(selectedOption).length === 0)
                setErrorMessage('You must choose an option')
              else {
                setQuizChoices(prev => {
                  return {
                    ...prev,
                    understandsEnglish:
                      selectedOption.understands_english_option,
                  }
                })
                setStep((current: number) =>
                  current < MAX_STEPS ? current + 1 : current,
                )
              }
            }}
          />
        </div>
      )

    case 6:
      return (
        <div className="quizWrapper">
          <ProgressBar step={step} maxSteps={MAX_STEPS} />
          <SageForm
            title={
              'Are you between the ages of 18 to 24 years old, or 16-24 years old if you live in the United Kingdom?'
            }
            errorMessage={errorMessage}
            formId={'ageVerify'}
            onSubmit={(event: any) => {
              const selectedOption = event.formData.age_verify
              if (selectedOption && Object.keys(selectedOption).length === 0)
                setErrorMessage('You must choose an option')
              else {
                setQuizChoices(prev => {
                  return { ...prev, inAgeRange: selectedOption.age_range }
                })
                setStep((current: number) =>
                  current <= MAX_STEPS ? current + 1 : current,
                )
              }
            }}
          />
        </div>
      )
  }

  if (step > MAX_STEPS) {
    if (
      quizChoices.userLocation !== COUNTRIES.OTHER &&
      quizChoices.hasAndroid &&
      quizChoices.inAgeRange &&
      quizChoices.understandsEnglish
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
