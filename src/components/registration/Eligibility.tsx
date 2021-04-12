import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button/Button'
import ProgressBar from '../progressBar/ProgressBar'
import SageForm from '../form/SageForm'
import { COUNTRIES } from '../form/types'
import Separator from '../static/Separator'
import { Redirect, NavLink } from 'react-router-dom'
import { useElegibility } from './context/ElegibilityContext'
import { FORM_IDS } from '../form/types'
import { useTranslation } from 'react-i18next'

const MAX_STEPS: number = 6

const INITIAL_QUIZ_CHOICES = {
  howDidYouHear: -1,
  accessToSupport: '',
  userLocation: -1,
  hasAndroid: '',
  understandsEnglish: '',
  inAgeRange: '',
}

export const Eligibility: React.FunctionComponent = () => {
  const [step, setStep] = useState(1)
  const [errorMessage, setErrorMessage] = useState('')
  const [quizChoices, setQuizChoices] = useState(INITIAL_QUIZ_CHOICES)

  const { setIsEligible } = useElegibility()
  const { t } = useTranslation()

  useEffect(() => {
    setErrorMessage('')
    if (step > MAX_STEPS) {
      if (
        quizChoices.userLocation !== COUNTRIES.OTHER &&
        quizChoices.hasAndroid &&
        quizChoices.inAgeRange &&
        quizChoices.understandsEnglish
      ) {
        setIsEligible(true)
      }
    }
  }, [step])

  window.scrollTo(0, 0)

  switch (step) {
    case 1:
      return (
        <div className="quizWrapper">
          <ProgressBar step={step} maxSteps={MAX_STEPS} />
          <SageForm
            title={t('eligibility.howDidYouHear')}
            errorMessage={errorMessage}
            formId={FORM_IDS.HOW_DID_YOU_HEAR}
            onSubmit={(event: any) => {
              const selectedOption = event.formData.how_did_you_hear
              if (selectedOption && Object.keys(selectedOption).length === 0)
                setErrorMessage(t('form.chooseAnOption'))
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
            title={t('eligibility.benefit')}
            errorMessage={errorMessage}
            formId={FORM_IDS.SUPPORT_VERIFY}
            onSubmit={(event: any) => {
              const selectedOption = event.formData.support_verify
              if (selectedOption && Object.keys(selectedOption).length === 0)
                setErrorMessage(t('form.chooseAnOption'))
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
            title={t('eligibility.where')}
            errorMessage={errorMessage}
            formId={FORM_IDS.COUNTRY_SELECTOR}
            onSubmit={(event: any) => {
              const selectedCountry = event.formData.country_chooser
              if (selectedCountry && Object.keys(selectedCountry).length === 0)
                setErrorMessage(t('form.chooseAnOption'))
              else {
                window.localStorage.setItem(
                  'selected_country',
                  Object.keys(COUNTRIES)[selectedCountry.your_country],
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
            title={t('eligibility.android')}
            errorMessage={errorMessage}
            formId={FORM_IDS.ANDROID_VERIFY}
            onSubmit={(event: any) => {
              const selectedOption = event.formData.android_verify
              if (selectedOption && Object.keys(selectedOption).length === 0)
                setErrorMessage(t('form.chooseAnOption'))
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
            title={t('eligibility.english')}
            errorMessage={errorMessage}
            formId={FORM_IDS.UNDERSTANDS_ENGLISH}
            onSubmit={(event: any) => {
              const selectedOption = event.formData.understands_english
              if (selectedOption && Object.keys(selectedOption).length === 0)
                setErrorMessage(t('form.chooseAnOption'))
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
            title={t('eligibility.ageRange')}
            errorMessage={errorMessage}
            formId={FORM_IDS.AGE_VERIFY}
            onSubmit={(event: any) => {
              const selectedOption = event.formData.age_verify
              if (selectedOption && Object.keys(selectedOption).length === 0)
                setErrorMessage(t('form.chooseAnOption'))
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
    return (
      <div className="quizWrapper">
        <div className="headerWrapper">
          <h1>{t('eligibility.thanks')}</h1>
        </div>
        <Separator />
        <div className="rejectionText">{t('eligibility.notElegible')}</div>
        <NavLink to="/home">
          <Button
            color="primary"
            variant="contained"
            size="large"
            className="wideButton"
            onClick={() => <Redirect to="/home" />}
          >
            {t('eligibility.back')}
          </Button>
        </NavLink>
      </div>
    )
  }
  return null
}

export default Eligibility
