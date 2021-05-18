import React, { useState, useEffect } from 'react'
import { Redirect, NavLink } from 'react-router-dom'
import { Button, Typography } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import ProgressBar from '../progressBar/ProgressBar'
import SageForm from '../form/SageForm'
import { COUNTRIES } from '../form/types'
import Separator from '../static/Separator'
import { useElegibility } from './context/ElegibilityContext'
import { FORM_IDS } from '../form/types'
import { GoogleService } from '../../services/google.service'
import ResponsiveStepWrapper from '../common/ResponsiveStepWrapper'
import { useSessionDataState } from '../../AuthContext'
import { SessionData } from '../../types/types'

const MAX_STEPS: number = 8

const INITIAL_ELEGIBILITY_CHOICES = {
  howDidYouHear: '',
  accessToSupport: '',
  userLocation: '',
  hasAndroid: '',
  understandsEnglish: '',
  gender: '',
  age: -1,
}

export const Eligibility: React.FunctionComponent<any> = (props: any) => {
  const [step, setStep] = useState(1)
  const [errorMessage, setErrorMessage] = useState('')
  const [currentEligibilityChoices, setCurrentEligibilityChoices] = useState(
    INITIAL_ELEGIBILITY_CHOICES,
  )
  const sessionData: SessionData = useSessionDataState()
  const { token } = sessionData

  const {
    setIsEligible,
    setHowDidYouHear,
    setEverBenefitedFromTreatment,
    setWhereDoYouLive,
    setDoYouHaveAnAndroid,
    setUnderstandEnglish,
    setAge,
    setGender,
  } = useElegibility()
  const { t } = useTranslation()

  useEffect(() => {
    setErrorMessage('')
    if (step > MAX_STEPS) {
      if (
        currentEligibilityChoices.userLocation !== COUNTRIES.OTHER &&
        currentEligibilityChoices.hasAndroid &&
        validateAgeRange(
          currentEligibilityChoices.userLocation,
          currentEligibilityChoices.age,
        ) &&
        currentEligibilityChoices.understandsEnglish
      ) {
        setIsEligible(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  if (token) {
    return <Redirect to={'/dashboard'} push={true} />
  }

  const validateAgeRange = (location: string, age: number) => {
    //Check if age is 18 to 24 years old, or 16-24 years old if it's in the United Kingdom
    if (!location || !age) return false
    if (
      location === COUNTRIES.UK &&
      !(
        currentEligibilityChoices.age >= 16 &&
        currentEligibilityChoices.age <= 24
      )
    )
      return false
    if (
      location !== COUNTRIES.UK &&
      !(
        currentEligibilityChoices.age >= 18 &&
        currentEligibilityChoices.age <= 24
      )
    )
      return false
    return true
  }

  window.scrollTo(0, 0)

  switch (step) {
    case 1:
      return (
        <ResponsiveStepWrapper variant="card">
          <div className="quiz-wrapper">
            <Typography variant="h3">
              {t('eligibility.thankYouForYourInterest')}
            </Typography>

            <div className="btm-20 ">
              <Typography variant="body2">
                {t('eligibility.weHaveAFewQuestions')}
              </Typography>
            </div>

            <div className="btm-240">
              <Separator />
            </div>
            <Button
              color="primary"
              variant="contained"
              size="large"
              className="wide-button"
              onClick={() =>
                setStep((current: number) =>
                  current < MAX_STEPS ? current + 1 : current,
                )
              }
            >
              {t('eligibility.begin')}
            </Button>
          </div>
        </ResponsiveStepWrapper>
      )
    case 2:
      if (!props.history.location.search.includes('howDidYouHear'))
        props.history.push({
          pathname: '/eligibility',
          search: '?step=howDidYouHear',
        })
      document.title = 'MindKind > How did you hear about us?'
      return (
        <ResponsiveStepWrapper variant="card">
          <ProgressBar step={step} maxSteps={MAX_STEPS} />
          <div className="quiz-wrapper">
            <SageForm
              title={t('eligibility.howDidYouHear')}
              errorMessage={errorMessage}
              formId={FORM_IDS.HOW_DID_YOU_HEAR}
              buttonText="Next"
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
                  setCurrentEligibilityChoices((prev: any) => ({
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
        </ResponsiveStepWrapper>
      )
    case 3:
      if (!props.history.location.search.includes('where'))
        props.history.push({
          pathname: '/eligibility',
          search: '?step=where',
        })
      document.title = 'MindKind > Where do you live?'
      return (
        <ResponsiveStepWrapper variant="card">
          <ProgressBar step={step} maxSteps={MAX_STEPS} />
          <div className="quiz-wrapper">
            <SageForm
              title={t('eligibility.where')}
              errorMessage={errorMessage}
              formId={FORM_IDS.COUNTRY_SELECTOR}
              buttonText="Next"
              onSubmit={(event: any) => {
                const selectedCountry = event.formData.country_chooser
                if (
                  selectedCountry &&
                  Object.keys(selectedCountry).length === 0
                )
                  setErrorMessage(t('form.chooseAnOption'))
                else {
                  GoogleService.sendEvent(
                    'quiz-accept',
                    'eligibility',
                    t('eligibility.where'),
                    selectedCountry.your_country,
                  )
                  setCurrentEligibilityChoices(prev => {
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
        </ResponsiveStepWrapper>
      )
    case 4:
      if (!props.history.location.search.includes('android'))
        props.history.push({
          pathname: '/eligibility',
          search: '?step=android',
        })
      document.title = 'MindKind > Do you have an android?'
      return (
        <ResponsiveStepWrapper variant="card">
          <ProgressBar step={step} maxSteps={MAX_STEPS} />
          <div className="quiz-wrapper">
            <SageForm
              title={t('eligibility.android')}
              errorMessage={errorMessage}
              formId={FORM_IDS.ANDROID_VERIFY}
              buttonText="Next"
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
                  setCurrentEligibilityChoices(prev => {
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
        </ResponsiveStepWrapper>
      )

    case 5:
      if (!props.history.location.search.includes('english'))
        props.history.push({
          pathname: '/eligibility',
          search: '?step=english',
        })
      document.title = 'MindKind > Do you speak english?'
      return (
        <ResponsiveStepWrapper variant="card">
          <ProgressBar step={step} maxSteps={MAX_STEPS} />
          <div className="quiz-wrapper">
            <SageForm
              title={t('eligibility.english')}
              errorMessage={errorMessage}
              formId={FORM_IDS.UNDERSTANDS_ENGLISH}
              buttonText="Next"
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
                  setCurrentEligibilityChoices(prev => {
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
        </ResponsiveStepWrapper>
      )
    case 6:
      if (!props.history.location.search.includes('ageRange'))
        props.history.push({
          pathname: '/eligibility',
          search: '?step=ageRange',
        })
      document.title = 'MindKind > How old are you?'

      return (
        <ResponsiveStepWrapper variant="card">
          <ProgressBar step={step} maxSteps={MAX_STEPS} />
          <div className="quiz-wrapper">
            <SageForm
              title={t('eligibility.ageRange')}
              errorMessage={errorMessage}
              formId={FORM_IDS.AGE_VERIFY}
              buttonText="Next"
              onSubmit={(event: any) => {
                const selectedOption = event.formData
                if (!selectedOption) setErrorMessage(t('form.chooseAnOption'))
                else {
                  GoogleService.sendEvent(
                    'quiz-accept',
                    'eligibility',
                    t('eligibility.ageRange'),
                    selectedOption,
                  )
                  setCurrentEligibilityChoices(prev => {
                    return { ...prev, age: selectedOption }
                  })
                  setAge(selectedOption)
                  setStep((current: number) =>
                    current < MAX_STEPS ? current + 1 : current,
                  )
                }
              }}
            />
          </div>
        </ResponsiveStepWrapper>
      )
    case 7:
      if (!props.history.location.search.includes('gender'))
        props.history.push({
          pathname: '/eligibility',
          search: '?step=gender',
        })
      document.title = 'MindKind > What is your current gender/gender identity?'
      return (
        <ResponsiveStepWrapper variant="card">
          <ProgressBar step={step} maxSteps={MAX_STEPS} />
          <div className="quiz-wrapper">
            <SageForm
              title={t('eligibility.gender')}
              subTitle={t('eligibility.selectAll')}
              errorMessage={errorMessage}
              formId={FORM_IDS.GENDER}
              buttonText="Next"
              onSubmit={(event: any) => {
                const selectedOption = event.formData.gender
                if (!selectedOption || selectedOption.length === 0)
                  setErrorMessage(t('form.chooseAnOption'))
                else {
                  GoogleService.sendEvent(
                    'quiz-accept',
                    'eligibility',
                    t('eligibility.gender'),
                    selectedOption,
                  )
                  setCurrentEligibilityChoices(prev => {
                    return { ...prev, gender: selectedOption }
                  })
                  setGender(selectedOption)
                  setStep((current: number) =>
                    current < MAX_STEPS ? current + 1 : current,
                  )
                }
              }}
            />
          </div>
        </ResponsiveStepWrapper>
      )
    case 8:
      if (!props.history.location.search.includes('benefit'))
        props.history.push({
          pathname: '/eligibility',
          search: '?step=benefit',
        })
      document.title = 'MindKind > Benefits of health support'
      return (
        <ResponsiveStepWrapper variant="card">
          <ProgressBar step={step} maxSteps={MAX_STEPS} />
          <div className="quiz-wrapper">
            <SageForm
              title={t('eligibility.benefit')}
              errorMessage={errorMessage}
              formId={FORM_IDS.SUPPORT_VERIFY}
              buttonText="Next"
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
                  setCurrentEligibilityChoices(prev => {
                    return { ...prev, accessToSupport: selectedOption.accept }
                  })
                  setEverBenefitedFromTreatment(selectedOption.accept)
                  setStep((current: number) =>
                    current <= MAX_STEPS ? current + 1 : current,
                  )
                }
              }}
            />
          </div>
        </ResponsiveStepWrapper>
      )
  }
  if (step > MAX_STEPS) {
    return (
      <ResponsiveStepWrapper variant="card">
        <div className="quiz-wrapper">
          <Typography variant="h3">{t('eligibility.thanks')}</Typography>

          <div className="btm-20">
            <Typography variant="body2">
              {t('eligibility.notElegible')}
            </Typography>
          </div>

          <div className="btm-240">
            <Separator />
          </div>

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
      </ResponsiveStepWrapper>
    )
  }
  return null
}

export default withRouter(Eligibility)
