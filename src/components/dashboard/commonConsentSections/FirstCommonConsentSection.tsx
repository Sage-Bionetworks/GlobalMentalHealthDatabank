import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { PARTICIPATE_OPTIONS, FORM_IDS } from '../../form/types'
import NavigationArrows from '../../common/NavigationArrows'
import ResponsiveStepWrapper from '../../common/ResponsiveStepWrapper'
import ProgressBar from '../../progressBar/ProgressBar'
import SageForm from '../../form/SageForm'
import { ReactComponent as LogoNoText } from '../../../assets/logo-no-text.svg'
import { ReactComponent as Questions } from '../../../assets/consent/questions.svg'
import { ReactComponent as Network } from '../../../assets/consent/network.svg'
import { ReactComponent as Padlock } from '../../../assets/consent/padlock.svg'

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
  const [howToParticipateSelection, setHowToParticipateSelection] =
    useState(undefined)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const { t } = useTranslation()

  const CustomRadio = ({ options, value, onChange }: any) => {
    const { enumOptions } = options
    const _onChange = (event: any) => onChange(event.currentTarget.id)
    return enumOptions.map((option: any) => {
      return (
        <div
          className={
            'quiz-radio-wrapper ' +
            (option.value === PARTICIPATE_OPTIONS.ANSWER_SURVEY_QUESTIONS
              ? 'radio correct'
              : '')
          }
        >
          <input
            type="radio"
            id={option.value}
            checked={
              option.value === howToParticipateSelection ||
              option.value === PARTICIPATE_OPTIONS.ANSWER_SURVEY_QUESTIONS
                ? true
                : false
            }
            onChange={_onChange as any}
          />
          <div
            id={`label-${option.value}`}
            dangerouslySetInnerHTML={{ __html: option.label }}
            className={
              'radio-button-label' +
              (option.value === howToParticipateSelection &&
              option.value !== PARTICIPATE_OPTIONS.ANSWER_SURVEY_QUESTIONS
                ? ' error-message wrong-opt'
                : ' correct-opt')
            }
          />
        </div>
      )
    })
  }

  const widgets = {
    RadioWidget: CustomRadio,
  }

  useEffect(() => {
    setErrorMessage('')
    setSuccessMessage('')
  }, [step])
  const handleNext = () => {
    setStep((current: number) => (current < maxSteps ? current + 1 : current))
    updateClientData(step)
  }
  const handleBack = () =>
    setStep((current: number) => (current > 1 ? current - 1 : current))

  switch (step) {
    case 1:
      return (
        <ResponsiveStepWrapper>
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="text-step-wrapper">
            <div className="icon-wrapper">
              <LogoNoText />
            </div>

            <Typography variant="h3">
              {t('form.firstCommonConsent.whatAreWeStudying')}
            </Typography>

            <Typography variant="h6">
              {t('form.firstCommonConsent.getAnswers')}
            </Typography>

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
            <div>
              <Typography variant="body2">
                {t('form.firstCommonConsent.section3.section1')}{' '}
                <a className="dashboard-link" href="/dashboard">
                  {t('form.firstCommonConsent.section3.link')}
                </a>{' '}
                {t('form.firstCommonConsent.section3.section2')}
              </Typography>
            </div>
            <NavigationArrows
              onBack={handleBack}
              onNext={handleNext}
              preventBack
            />
          </div>
        </ResponsiveStepWrapper>
      )

    case 2:
      return (
        <ResponsiveStepWrapper>
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="text-step-wrapper">
            <div className="icon-wrapper">
              <Questions />
            </div>
            <Typography variant="h3">
              {t('form.firstCommonConsent.whatWillYouAsk')}
            </Typography>
            <Typography variant="h6">
              {t('form.firstCommonConsent.step1')}
            </Typography>
            <Typography variant="h6">
              {t('form.firstCommonConsent.step2')}
            </Typography>
            <Typography variant="h6">
              {t('form.firstCommonConsent.step3')}
            </Typography>
            <ul>
              <li>
                <Typography variant="body2">
                  {t('form.firstCommonConsent.week1')}
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  {t('form.firstCommonConsent.week2')}
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  {t('form.firstCommonConsent.also')}
                </Typography>
              </li>
            </ul>
            <NavigationArrows onBack={handleBack} onNext={handleNext} />
          </div>
        </ResponsiveStepWrapper>
      )

    case 3:
      return (
        <ResponsiveStepWrapper variant="card">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="quiz-wrapper">
            <SageForm
              title={t('form.firstCommonConsent.quiz')}
              errorMessage={errorMessage}
              infoMessage={successMessage}
              formId={FORM_IDS.HOW_TO_PARTICIPATE}
              buttonText={
                successMessage ? t('form.firstCommonConsent.next') : undefined
              }
              widgets={howToParticipateSelection ? widgets : undefined}
              onSubmit={(event: any) => {
                const selectedOption = event.formData.how_to_participate

                if (successMessage || howToParticipateSelection) {
                  setStep((current: number) =>
                    current < maxSteps ? current + 1 : current,
                  )
                }

                if (
                  selectedOption &&
                  Object.keys(selectedOption).length === 0
                ) {
                  setErrorMessage(t('form.chooseAnOption'))
                  setSuccessMessage('')
                } else {
                  if (
                    selectedOption.participate_option ===
                    PARTICIPATE_OPTIONS.ANSWER_SURVEY_QUESTIONS
                  ) {
                    setSuccessMessage(t('form.firstCommonConsent.answer'))
                    setErrorMessage('')
                  } else {
                    setErrorMessage(t('form.firstCommonConsent.answer'))
                    setSuccessMessage('')
                  }
                  setHowToParticipateSelection(
                    selectedOption.participate_option,
                  )
                  updateClientData(step, {
                    [FORM_IDS.HOW_TO_PARTICIPATE]:
                      selectedOption.participate_option,
                  })
                }
              }}
            />
          </div>
        </ResponsiveStepWrapper>
      )

    case 4:
      return (
        <ResponsiveStepWrapper>
          <ProgressBar step={step} maxSteps={maxSteps} />

          <div className="text-step-wrapper">
            <div className="icon-wrapper">
              <Padlock />
            </div>
            <Typography variant="h3">
              {t('form.firstCommonConsent.dataCollection')}
            </Typography>

            <Typography variant="h6">
              {t('form.firstCommonConsent.yourData')}
            </Typography>
            <ul>
              <li>
                <Typography variant="body2">
                  {t('form.firstCommonConsent.yourDataApp')}
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  {t('form.firstCommonConsent.yourDataPhone')}
                </Typography>
              </li>
            </ul>
            <div>
              <Typography variant="body2" className="bottom-space">
                {t('form.firstCommonConsent.weEncrypt')}
              </Typography>
              <Typography variant="body2" className=" bottom-space">
                {t('form.firstCommonConsent.weTransfer')}
              </Typography>
              <Typography variant="body2" className="bottom-space">
                {t('form.firstCommonConsent.replaceName')}
              </Typography>
              <Typography variant="body2" className="bottom-space">
                {t('form.firstCommonConsent.combineData')}
              </Typography>
              <Typography variant="body2" className="bottom-space">
                {t('form.firstCommonConsent.storeCloud')}
              </Typography>
            </div>
            <NavigationArrows
              onBack={handleBack}
              onNext={handleNext}
              preventBack
            />
          </div>
        </ResponsiveStepWrapper>
      )

    case 5:
      return (
        <ResponsiveStepWrapper>
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="text-step-wrapper">
            <div className="icon-wrapper">
              <Network />
            </div>
            <Typography variant="h3" className="common-title-spaced">
              {t('form.firstCommonConsent.transferAndRights')}
            </Typography>

            <Typography variant="body2" className="bottom-space">
              {t('form.firstCommonConsent.transferAway')}
            </Typography>

            <Typography variant="body2" className="bottom-space">
              {t('form.firstCommonConsent.transferToUS')}
            </Typography>
            <Typography variant="h6">
              {t('form.firstCommonConsent.yourRights')}
            </Typography>
            <ul>
              <li>
                <Typography variant="body2">
                  {t('form.firstCommonConsent.requestData')}
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  {t('form.firstCommonConsent.correctData')}{' '}
                </Typography>
              </li>
            </ul>

            <Typography variant="body2">
              {t('form.firstCommonConsent.ifCitizenEU')}{' '}
              <a className="dashboard-link" href="/dashboard">
                {t('form.firstCommonConsent.ifCitizenEULink')}
              </a>
            </Typography>

            <NavigationArrows onBack={handleBack} onNext={handleNext} />
          </div>
        </ResponsiveStepWrapper>
      )
  }
  return null
}

export default FirstCommonConsentSection
