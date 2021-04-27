import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import ProgressBar from '../progressBar/ProgressBar'
import SageForm from '../form/SageForm'
import { COUNTRIES } from '../form/types'
import Separator from '../static/Separator'
import { Redirect, NavLink } from 'react-router-dom'
import { useElegibility } from './context/ElegibilityContext'
import { FORM_IDS } from '../form/types'
import { useTranslation } from 'react-i18next'
import { GoogleService } from '../../services/google.service'
import { withRouter } from 'react-router-dom'
import ElegibilityStepWrapper from './ElegibilityStepWrapper'

const MAX_STEPS: number = 6

const INITIAL_QUIZ_CHOICES = {
  howDidYouHear: -1,
  accessToSupport: '',
  userLocation: -1,
  hasAndroid: '',
  understandsEnglish: '',
  inAgeRange: '',
}

export const Eligibility: React.FunctionComponent<any> = (props: any) => {
  const [step, setStep] = useState(1)
  const [errorMessage, setErrorMessage] = useState('')
  const [quizChoices, setQuizChoices] = useState(INITIAL_QUIZ_CHOICES)

  const {
    setIsEligible,
    setHowDidYouHear,
    setEverBenefitedFromTreatment,
    setWhereDoYouLive,
    setDoYouHaveAnAndroid,
    setUnderstandEnglish,
    setBetweenAgeRange,
  } = useElegibility()
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
      if (!props.history.location.search.includes('howDidYouHear'))
        props.history.push({
          pathname: '/eligibility',
          search: '?step=howDidYouHear',
        })
      document.title = 'MindKind > How did you hear about us?'
      return (
        <ElegibilityStepWrapper>
          <ProgressBar step={step} maxSteps={MAX_STEPS} />
          <div className="quizWrapper">
            <SageForm
              title={t('eligibility.howDidYouHear')}
              errorMessage={errorMessage}
              formId={FORM_IDS.HOW_DID_YOU_HEAR}
              onSubmit={(event: any) => {
                const selectedOption = event.formData.how_did_you_hear
                if (selectedOption && Object.keys(selectedOption).length === 0)
                  setErrorMessage(t('form.chooseAnOption'))
                else {
                  GoogleService.sendEvent(
                    'quiz-accept',
                    'eligibility',
                    t('eligibility.howDidYouHear'),
                    selectedOption.how_options,
                  )
                  setQuizChoices((prev: any) => ({
                    ...prev,
                    howDidYouHear: selectedOption.how_options,
                  }))
                  setHowDidYouHear(selectedOption.how_options)
                  setStep((current: number) =>
                    current < MAX_STEPS ? current + 1 : current,
                  )
                }
              }}
            />
          </div>
        </ElegibilityStepWrapper>
      )
    case 2:
      if (!props.history.location.search.includes('benefit'))
        props.history.push({
          pathname: '/eligibility',
          search: '?step=benefit',
        })
      document.title = 'MindKind > Benefits of health support'
      return (
        <ElegibilityStepWrapper>
          <ProgressBar step={step} maxSteps={MAX_STEPS} />
          <div className="quizWrapper">
            <SageForm
              title={t('eligibility.benefit')}
              errorMessage={errorMessage}
              formId={FORM_IDS.SUPPORT_VERIFY}
              onSubmit={(event: any) => {
                const selectedOption = event.formData.support_verify
                if (selectedOption && Object.keys(selectedOption).length === 0)
                  setErrorMessage(t('form.chooseAnOption'))
                else {
                  GoogleService.sendEvent(
                    'quiz-accept',
                    'eligibility',
                    t('eligibility.benefit'),
                    selectedOption.accept,
                  )
                  setQuizChoices(prev => {
                    return { ...prev, accessToSupport: selectedOption.accept }
                  })
                  setEverBenefitedFromTreatment(selectedOption.accept)
                  setStep((current: number) =>
                    current < MAX_STEPS ? current + 1 : current,
                  )
                }
              }}
            />
          </div>
        </ElegibilityStepWrapper>
      )
    case 3:
      if (!props.history.location.search.includes('where'))
        props.history.push({
          pathname: '/eligibility',
          search: '?step=where',
        })
      document.title = 'MindKind > Where do you live?'
      return (
        <ElegibilityStepWrapper>
          <ProgressBar step={step} maxSteps={MAX_STEPS} />
          <div className="quizWrapper">
            <SageForm
              title={t('eligibility.where')}
              errorMessage={errorMessage}
              formId={FORM_IDS.COUNTRY_SELECTOR}
              onSubmit={(event: any) => {
                const selectedCountry = event.formData.country_chooser
                if (
                  selectedCountry &&
                  Object.keys(selectedCountry).length === 0
                )
                  setErrorMessage(t('form.chooseAnOption'))
                else {
                  props.setCountryCode(
                    Object.keys(COUNTRIES)[selectedCountry.your_country],
                  )
                  GoogleService.sendEvent(
                    'quiz-accept',
                    'eligibility',
                    t('eligibility.where'),
                    selectedCountry.your_country,
                  )
                  setQuizChoices(prev => {
                    return {
                      ...prev,
                      userLocation: selectedCountry.your_country,
                    }
                  })
                  setWhereDoYouLive(selectedCountry.your_country)
                  setStep((current: number) =>
                    current < MAX_STEPS ? current + 1 : current,
                  )
                }
              }}
            />
          </div>
        </ElegibilityStepWrapper>
      )

    case 4:
      if (!props.history.location.search.includes('android'))
        props.history.push({
          pathname: '/eligibility',
          search: '?step=android',
        })
      document.title = 'MindKind > Do you have an android?'
      return (
        <ElegibilityStepWrapper>
          <ProgressBar step={step} maxSteps={MAX_STEPS} />
          <div className="quizWrapper">
            <SageForm
              title={t('eligibility.android')}
              errorMessage={errorMessage}
              formId={FORM_IDS.ANDROID_VERIFY}
              onSubmit={(event: any) => {
                const selectedOption = event.formData.android_verify
                if (selectedOption && Object.keys(selectedOption).length === 0)
                  setErrorMessage(t('form.chooseAnOption'))
                else {
                  GoogleService.sendEvent(
                    'quiz-accept',
                    'eligibility',
                    t('eligibility.android'),
                    selectedOption.has_android,
                  )
                  setQuizChoices(prev => {
                    return { ...prev, hasAndroid: selectedOption.has_android }
                  })
                  setDoYouHaveAnAndroid(selectedOption.has_android)
                  setStep((current: number) =>
                    current < MAX_STEPS ? current + 1 : current,
                  )
                }
              }}
            />
          </div>
        </ElegibilityStepWrapper>
      )

    case 5:
      if (!props.history.location.search.includes('english'))
        props.history.push({
          pathname: '/eligibility',
          search: '?step=english',
        })
      document.title = 'MindKind > Do you speak english?'
      return (
        <ElegibilityStepWrapper>
          <ProgressBar step={step} maxSteps={MAX_STEPS} />
          <div className="quizWrapper">
            <SageForm
              title={t('eligibility.english')}
              errorMessage={errorMessage}
              formId={FORM_IDS.UNDERSTANDS_ENGLISH}
              onSubmit={(event: any) => {
                const selectedOption = event.formData.understands_english
                if (selectedOption && Object.keys(selectedOption).length === 0)
                  setErrorMessage(t('form.chooseAnOption'))
                else {
                  GoogleService.sendEvent(
                    'quiz-accept',
                    'eligibility',
                    t('eligibility.english'),
                    selectedOption.understands_english_option,
                  )
                  setQuizChoices(prev => {
                    return {
                      ...prev,
                      understandsEnglish:
                        selectedOption.understands_english_option,
                    }
                  })
                  setUnderstandEnglish(
                    selectedOption.understands_english_option,
                  )
                  setStep((current: number) =>
                    current < MAX_STEPS ? current + 1 : current,
                  )
                }
              }}
            />
          </div>
        </ElegibilityStepWrapper>
      )

    case 6:
      if (!props.history.location.search.includes('ageRange'))
        props.history.push({
          pathname: '/eligibility',
          search: '?step=ageRange',
        })
      document.title = 'MindKind > Are you on the age range?'
      return (
        <ElegibilityStepWrapper>
          <ProgressBar step={step} maxSteps={MAX_STEPS} />
          <div className="quizWrapper">
            <SageForm
              title={t('eligibility.ageRange')}
              errorMessage={errorMessage}
              formId={FORM_IDS.AGE_VERIFY}
              onSubmit={(event: any) => {
                const selectedOption = event.formData.age_verify
                if (selectedOption && Object.keys(selectedOption).length === 0)
                  setErrorMessage(t('form.chooseAnOption'))
                else {
                  GoogleService.sendEvent(
                    'quiz-accept',
                    'eligibility',
                    t('eligibility.ageRange'),
                    selectedOption.age_range,
                  )
                  setQuizChoices(prev => {
                    return { ...prev, inAgeRange: selectedOption.age_range }
                  })
                  setBetweenAgeRange(selectedOption.age_range)
                  setStep((current: number) =>
                    current <= MAX_STEPS ? current + 1 : current,
                  )
                }
              }}
            />
          </div>
        </ElegibilityStepWrapper>
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
            className="wide-button"
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

export default withRouter(Eligibility)
