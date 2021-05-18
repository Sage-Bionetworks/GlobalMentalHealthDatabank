import React, { useState, useEffect } from 'react'
import { Button, Typography } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ReactComponent as ArrowDown } from '../../assets/arrowDown.svg'
import ProgressBar from '../progressBar/ProgressBar'
import SageForm from '../form/SageForm'
import { COUNTRIES } from '../form/types'
import Separator from '../static/Separator'
import { Redirect, NavLink } from 'react-router-dom'
import { useElegibility } from './context/ElegibilityContext'
import { FORM_IDS } from '../form/types'
import { GoogleService } from '../../services/google.service'
import ResponsiveStepWrapper from '../common/ResponsiveStepWrapper'
import { useSessionDataState } from '../../AuthContext'
import { SessionData } from '../../types/types'

const MAX_STEPS: number = 9

const INITIAL_QUIZ_CHOICES = {
  howDidYouHear: '',
  accessToSupport: '',
  userLocation: '',
  hasAndroid: '',
  understandsEnglish: '',
  age: -1,
}

export const Eligibility: React.FunctionComponent<any> = (props: any) => {
  const [step, setStep] = useState(1)
  const [errorMessage, setErrorMessage] = useState('')
  const [quizChoices, setQuizChoices] = useState(INITIAL_QUIZ_CHOICES)
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
    whereDoYouLive,
    doYouHaveAnAndroid,
    understandEnglish,
    age,
  } = useElegibility()
  const { t } = useTranslation()

  useEffect(() => {
    setErrorMessage('')
    if (step > MAX_STEPS) {
      if (
        quizChoices.userLocation !== COUNTRIES.OTHER &&
        quizChoices.hasAndroid &&
        validateAgeRange(quizChoices.userLocation, quizChoices.age) &&
        quizChoices.understandsEnglish
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
      !(quizChoices.age >= 16 && quizChoices.age <= 24)
    )
      return false
    if (
      location !== COUNTRIES.UK &&
      !(quizChoices.age >= 18 && quizChoices.age <= 24)
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

            <div className="bottom-twenty-wrapper ">
              <Typography variant="body2">
                {t('eligibility.weHaveAFewQuestions')}
              </Typography>
            </div>

            <div className="buttom-all-wrapper">
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
                  setQuizChoices(prev => {
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
                  setQuizChoices(prev => {
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
                  setQuizChoices(prev => {
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

    case 9:
      const pepe = doYouHaveAnAndroid
      debugger
      return (
        <ResponsiveStepWrapper variant="card">
          <ProgressBar step={step} maxSteps={MAX_STEPS} />
          <div className="quiz-wrapper">
            <Typography variant="h3">
              {t('eligibility.pleaseReview')}
            </Typography>
            <div className="bottom-twenty-wrapper">
              <div className="eligibility-summary-line">
                <Typography
                  variant="h6"
                  className="eligibility-summary-line-title"
                >
                  {t('eligibility.where')}
                </Typography>
                <Typography variant="body2">{whereDoYouLive}</Typography>
              </div>
              <div className="eligibility-summary-line">
                <Typography
                  variant="h6"
                  className="eligibility-summary-line-title"
                >
                  {t('eligibility.android')}
                </Typography>
                <Typography variant="body2">
                  {doYouHaveAnAndroid ? 'Yes' : 'No'}
                </Typography>
              </div>
              <div className="eligibility-summary-line">
                <Typography
                  variant="h6"
                  className="eligibility-summary-line-title"
                >
                  {t('eligibility.english')}
                </Typography>
                <Typography variant="body2">
                  {understandEnglish ? 'Yes' : 'No'}
                </Typography>
              </div>
              <div className="eligibility-summary-line">
                <Typography
                  variant="h6"
                  className="eligibility-summary-line-title"
                >
                  {t('eligibility.ageRange')}
                </Typography>
                <Typography variant="body2">{age}</Typography>
              </div>
            </div>

            <Button
              color="primary"
              variant="contained"
              size="large"
              className="wide-button secondary"
              onClick={() => setStep(1)}
              style={{ marginBottom: '20px' }}
            >
              {t('eligibility.restart')}
            </Button>

            <Button
              color="primary"
              variant="contained"
              size="large"
              className="wide-button"
              onClick={() =>
                setStep((current: number) =>
                  current <= MAX_STEPS ? current + 1 : current,
                )
              }
            >
              {t('common.submit')}
            </Button>
          </div>
        </ResponsiveStepWrapper>
      )
  }

  if (step > MAX_STEPS) {
    return (
      <ResponsiveStepWrapper variant="card">
        <div className="quiz-wrapper">
          <Typography variant="h3">{t('eligibility.thanks')}</Typography>

          <div className="bottom-twenty-wrapper">
            <Typography variant="body2">
              {t('eligibility.notElegible')}
            </Typography>
          </div>

          <div className="buttom-all-wrapper">
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
