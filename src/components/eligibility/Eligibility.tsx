import React, { useState, useEffect } from 'react'
import { Redirect, NavLink } from 'react-router-dom'
import { Button, Typography } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProgressBar from '../common/ProgressBar'
import SageForm from '../form/SageForm'
import { FORM_IDS } from '../form/types'
import Separator from '../static/Separator'
import { useEligibility } from './context/EligibilityContext'
import { GoogleService } from '../../services/google.service'
import ResponsiveStepWrapper from '../common/ResponsiveStepWrapper'
import { useSessionDataState } from '../../AuthContext'
import { SessionData } from '../../types/types'
import {
  GENDERS,
  ROUTES,
  MENTAL_HEALTH_EXPERIENCE,
} from '../../constants/constants'
import { ReactComponent as LogoNoText } from 'assets/logo-no-text.svg'
import {
  INITIAL_ELIGIBILITY_CHOICES,
  getCountryNameFromCountryCode,
  isEligible,
} from './helpers'

const MAX_STEPS: number = 9

export const Eligibility: React.FunctionComponent<any> = (props: any) => {
  const [step, setStep] = useState(1)
  const [errorMessage, setErrorMessage] = useState('')
  const [currentEligibilityChoices, setCurrentEligibilityChoices] = useState(
    INITIAL_ELIGIBILITY_CHOICES,
  )
  const sessionData: SessionData = useSessionDataState()
  const { token } = sessionData

  const [summaryLocationCollapse, setSummaryLocationCollapse] = useState(true)
  const [summaryAndroidCollapse, setSummaryAndroidCollapse] = useState(true)
  const [summaryEnglishCollapse, setSummaryEnglishCollapse] = useState(true)
  const [summaryAgeCollapse, setSummaryAgeCollapse] = useState(true)

  const { history } = props
  const { search } = history.location

  const {
    setIsEligible,
    setHowDidYouHear,
    setMentalHealthExperience,
    setWhereDoYouLive,
    setDoYouHaveAnAndroid,
    setUnderstandEnglish,
    setAge,
    setGender,
    whereDoYouLive,
    doYouHaveAnAndroid,
    understandEnglish,
    age,
    setPhoneNumber,
    isEligible: eligible,
  } = useEligibility()
  const { t } = useTranslation()

  useEffect(() => {
    setPhoneNumber('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setErrorMessage('')
    if (step > MAX_STEPS) {
      if (isEligible(currentEligibilityChoices)) {
        setIsEligible(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  if (token) {
    return <Redirect to={ROUTES.CONSENT_STEPS} push={true} />
  }

  window.scrollTo(0, 0)

  switch (step) {
    case 1:
      return (
        <ResponsiveStepWrapper variant="card">
          <div className="quiz-wrapper">
            <LogoNoText className="logo btm-20" />
            <div className="btm-30">
              <Typography variant="h3">
                {t('eligibility.welcomeToMindKind')}
              </Typography>
            </div>

            <div className="btm-20">
              <Typography variant="h6">
                {t('form.firstCommonConsent.weWantToLearn')}
              </Typography>
            </div>

            <div className="ml-20 btm-20">
              <ul>
                <li>
                  <Typography variant="body2">
                    {t('form.firstCommonConsent.section1')}
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    {t('form.firstCommonConsent.section2')}
                  </Typography>
                </li>
              </ul>
            </div>

            <div className="btm-60">
              <Typography variant="body2">
                {t('form.firstCommonConsent.section3.section1')}{' '}
                <a href={ROUTES.RESEARCH}>
                  {t('form.firstCommonConsent.section3.link')}
                </a>{' '}
                {t('form.firstCommonConsent.section3.section2')}
              </Typography>
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
      if (!search.includes('howDidYouHear'))
        history.push({
          pathname: ROUTES.ELIGIBILITY,
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
              buttonText={t('eligibility.next')}
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
      if (!search.includes('where'))
        history.push({
          pathname: ROUTES.ELIGIBILITY,
          search: '?step=where',
        })
      document.title = 'MindKind > Where do you live?'
      return (
        <ResponsiveStepWrapper variant="card">
          <ProgressBar step={step} maxSteps={MAX_STEPS} />
          <div className="quiz-wrapper">
            <Typography variant="h6">
              {t('eligibility.letsMakeSure')}
            </Typography>
            <SageForm
              title={t('eligibility.where')}
              errorMessage={errorMessage}
              formId={FORM_IDS.COUNTRY_SELECTOR}
              buttonText={t('eligibility.next')}
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
      if (!search.includes('android'))
        history.push({
          pathname: ROUTES.ELIGIBILITY,
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
              buttonText={t('eligibility.next')}
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
      if (!search.includes('english'))
        history.push({
          pathname: ROUTES.ELIGIBILITY,
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
              buttonText={t('eligibility.next')}
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
      if (!search.includes('ageRange'))
        history.push({
          pathname: ROUTES.ELIGIBILITY,
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
              buttonText={t('eligibility.next')}
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
      if (!search.includes('gender'))
        history.push({
          pathname: ROUTES.ELIGIBILITY,
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
              buttonText={t('eligibility.next')}
              onChange={(event: any) => {
                const inputs = document.getElementsByTagName('input')
                if (
                  event.formData.gender?.find(
                    (g: any) => g === GENDERS.PREFER_NOT_TO_SAY,
                  )
                ) {
                  event.formData.gender = [GENDERS.PREFER_NOT_TO_SAY]
                  for (let i = 0; i < inputs.length; i++) {
                    if (
                      inputs[i].type.toLowerCase() === 'checkbox' &&
                      inputs[i].id !== 'root_gender_5'
                    ) {
                      inputs[i].setAttribute('class', 'hide-input')
                      inputs[i].setAttribute('disabled', 'true')
                    }
                  }
                } else {
                  for (let i = 0; i < inputs.length; i++) {
                    if (inputs[i].type.toLowerCase() === 'checkbox') {
                      inputs[i].setAttribute('class', '')
                      inputs[i].disabled = false
                    }
                  }
                }
              }}
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
      if (!search.includes('mhExperience'))
        history.push({
          pathname: ROUTES.ELIGIBILITY,
          search: '?step=mhExperience',
        })
      document.title = 'MindKind > Mental Health Experience'
      return (
        <ResponsiveStepWrapper variant="card">
          <ProgressBar step={step} maxSteps={MAX_STEPS} />
          <div className="quiz-wrapper">
            <SageForm
              title={t('eligibility.mentalHealthExperience')}
              subTitle={t('eligibility.selectAll')}
              errorMessage={errorMessage}
              formId={FORM_IDS.MENTAL_HEALTH_EXPERIENCE}
              buttonText={t('eligibility.next')}
              onChange={(event: any) => {
                const inputs = document.getElementsByTagName('input')
                if (
                  event.formData.mentalHealthExperience?.find(
                    (mh: any) =>
                      mh === MENTAL_HEALTH_EXPERIENCE.NOT_EXPERIENCED,
                  )
                ) {
                  event.formData.mentalHealthExperience = [
                    MENTAL_HEALTH_EXPERIENCE.NOT_EXPERIENCED,
                  ]
                  for (let i = 0; i < inputs.length; i++) {
                    if (
                      inputs[i].type.toLowerCase() === 'checkbox' &&
                      inputs[i].id !== 'root_mentalHealthExperience_3'
                    ) {
                      inputs[i].setAttribute('class', 'hide-input')
                      inputs[i].setAttribute('disabled', 'true')
                    }
                  }
                } else {
                  for (let i = 0; i < inputs.length; i++) {
                    if (inputs[i].type.toLowerCase() === 'checkbox') {
                      inputs[i].setAttribute('class', '')
                      inputs[i].disabled = false
                    }
                  }
                }
              }}
              onSubmit={(event: any) => {
                const selectedOption = event.formData.mentalHealthExperience
                if (selectedOption && selectedOption.length === 0)
                  setErrorMessage(t('form.chooseAnOption'))
                else {
                  GoogleService.sendEvent(
                    'quiz-accept',
                    'eligibility',
                    t('eligibility.mentalHealthExperience'),
                    selectedOption,
                  )
                  setCurrentEligibilityChoices(prev => {
                    return { ...prev, mentalHealthExperience: selectedOption }
                  })
                  setMentalHealthExperience(selectedOption)
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
      if (!search.includes('summary'))
        history.push({
          pathname: ROUTES.ELIGIBILITY,
          search: '?step=summary',
        })
      return (
        <ResponsiveStepWrapper variant="card">
          <ProgressBar step={step} maxSteps={MAX_STEPS} />
          <div className="quiz-wrapper">
            <Typography variant="h3">
              {t('eligibility.pleaseReview')}
            </Typography>
            <div className="bottom-twenty-wrapper">
              <div
                className="eligibility-summary-line"
                onClick={() =>
                  setSummaryLocationCollapse(!summaryLocationCollapse)
                }
              >
                {summaryLocationCollapse ? (
                  <div className="eligibility-summary-line-container">
                    <div className="chevron down">&gt;</div>
                    <div>
                      <Typography
                        variant="h6"
                        className="eligibility-summary-line-title"
                      >
                        {t('eligibility.where')}
                      </Typography>
                      <Typography variant="body2">
                        {getCountryNameFromCountryCode(whereDoYouLive, t)}
                      </Typography>
                    </div>
                  </div>
                ) : (
                  <div className="eligibility-summary-line-container">
                    <div className="chevron">&gt;</div>
                    <div>
                      <Typography
                        variant="h6"
                        className="eligibility-summary-line-title"
                      >
                        {t('eligibility.where')}
                      </Typography>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="eligibility-summary-line"
                onClick={() =>
                  setSummaryAndroidCollapse(!summaryAndroidCollapse)
                }
              >
                {summaryAndroidCollapse ? (
                  <div className="eligibility-summary-line-container">
                    <div className="chevron down">&gt;</div>
                    <div>
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
                  </div>
                ) : (
                  <div className="eligibility-summary-line-container">
                    <div className="chevron">&gt;</div>
                    <div>
                      <Typography
                        variant="h6"
                        className="eligibility-summary-line-title"
                      >
                        {t('eligibility.android')}
                      </Typography>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              className="eligibility-summary-line"
              onClick={() => setSummaryEnglishCollapse(!summaryEnglishCollapse)}
            >
              {summaryEnglishCollapse ? (
                <div className="eligibility-summary-line-container">
                  <div className="chevron down">&gt;</div>
                  <div>
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
                </div>
              ) : (
                <div className="eligibility-summary-line-container">
                  <div className="chevron">&gt;</div>
                  <div>
                    <Typography
                      variant="h6"
                      className="eligibility-summary-line-title"
                    >
                      {t('eligibility.english')}
                    </Typography>
                  </div>
                </div>
              )}
            </div>
            <div
              className="eligibility-summary-line"
              onClick={() => setSummaryAgeCollapse(!summaryAgeCollapse)}
            >
              {summaryAgeCollapse ? (
                <div className="eligibility-summary-line-container btm-50">
                  <div className="chevron down">&gt;</div>
                  <div>
                    <Typography
                      variant="h6"
                      className="eligibility-summary-line-title"
                    >
                      {t('eligibility.ageRange')}
                    </Typography>
                    <Typography variant="body2">{age}</Typography>
                  </div>
                </div>
              ) : (
                <div className="eligibility-summary-line-container btm-50">
                  <div className="chevron">&gt;</div>
                  <div>
                    <Typography
                      variant="h6"
                      className="eligibility-summary-line-title"
                    >
                      {t('eligibility.ageRange')}
                    </Typography>
                  </div>
                </div>
              )}
            </div>
            <div className="btm-20">
              <Button
                color="primary"
                variant="text"
                size="large"
                className="wide-button"
                onClick={() => setStep(1)}
              >
                {t('eligibility.restart')}
              </Button>
            </div>

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

  if (step > MAX_STEPS && !eligible) {
    if (!search.includes('not-eligible'))
      history.push({
        pathname: ROUTES.ELIGIBILITY,
        search: '?step=not-eligible',
      })
    return (
      <ResponsiveStepWrapper variant="card">
        <div className="quiz-wrapper">
          <Typography variant="h3">{t('eligibility.thanks')}</Typography>

          <div className="btm-20">
            <Typography variant="body2">
              {t('eligibility.notEligible')}
            </Typography>
          </div>

          <div className="btm-20">
            <Typography variant="body2">
              {t('eligibility.seekingHelp1')}{' '}
              <NavLink to={ROUTES.CONTACT}>
                {t('eligibility.seekingHelpLink')}
              </NavLink>{' '}
              {t('eligibility.seekingHelp2')}
            </Typography>
          </div>

          <div className="btm-60">
            <Separator />
          </div>

          <NavLink to={ROUTES.HOME}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              className="wide-button"
              onClick={() => <Redirect to={ROUTES.HOME} />}
            >
              {t('eligibility.back')}
            </Button>
          </NavLink>
        </div>
      </ResponsiveStepWrapper>
    )
  }

  if (step > MAX_STEPS && eligible) {
    if (!search.includes('is-eligible'))
      history.push({
        pathname: ROUTES.ELIGIBILITY,
        search: '?step=is-eligible',
      })
    return (
      <ResponsiveStepWrapper variant="card">
        <div className="quiz-wrapper">
          <div className="btm-40">
            <Typography variant="h1">{t('eligibility.fantastic')}</Typography>
          </div>

          <div className="btm-30">
            <Typography variant="body2">{t('eligibility.eligible')}</Typography>
          </div>

          <div className="btm-240">
            <Separator />
          </div>

          <NavLink to={ROUTES.HUB}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              className="wide-button"
              onClick={() => <Redirect to={ROUTES.HUB} />}
            >
              {t('common.continue')}
            </Button>
          </NavLink>
        </div>
      </ResponsiveStepWrapper>
    )
  }
  return null
}

export default withRouter(Eligibility)
