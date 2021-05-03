import React, { useEffect, useState } from 'react'
import ProgressBar from '../../progressBar/ProgressBar'
import { ReactComponent as LogoNoText } from '../../../assets/logo-no-text.svg'
import { ReactComponent as Questions } from '../../../assets/consent/questions.svg'
import { ReactComponent as Network } from '../../../assets/consent/network.svg'
import { ReactComponent as Padlock } from '../../../assets/consent/padlock.svg'
import SageForm from '../../form/SageForm'
import { PARTICIPATE_OPTIONS, FORM_IDS } from '../../form/types'
import { useTranslation } from 'react-i18next'
import NavigationArrows from '../../common/NavigationArrows'

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
  const [howToParticipateSelection, setHowToParticipateSelection] = useState(
    undefined,
  )
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
        <div className="text-step-wrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <LogoNoText />
          <div className="header-wrapper">
            <h1>{t('form.firstCommonConsent.whatAreWeStudying')}</h1>
          </div>
          <h2>{t('form.firstCommonConsent.getAnswers')}</h2>
          <ul>
            <li>{t('form.firstCommonConsent.section1')}</li>
            <li>{t('form.firstCommonConsent.section2')}</li>
          </ul>
          <div>
            {t('form.firstCommonConsent.section3.section1')}{' '}
            <a className="dashboard-link" href="/dashboard">
              {t('form.firstCommonConsent.section3.link')}
            </a>{' '}
            {t('form.firstCommonConsent.section3.section2')}{' '}
          </div>
          <NavigationArrows
            onBack={handleBack}
            onNext={handleNext}
            preventBack
          />
        </div>
      )

    case 2:
      return (
        <div className="text-step-wrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <Questions />
          <div className="header-wrapper">
            <h1>{t('form.firstCommonConsent.whatWillYouAsk')}</h1>
          </div>
          <div>
            <h2>{t('form.firstCommonConsent.step1')}</h2>{' '}
          </div>
          <div>
            <h2>{t('form.firstCommonConsent.step2')}</h2>
          </div>
          <div>
            <h2>{t('form.firstCommonConsent.step3')}</h2>{' '}
          </div>
          <ul>
            <li>{t('form.firstCommonConsent.week1')}</li>
            <li>{t('form.firstCommonConsent.week2')}</li>
            <li>{t('form.firstCommonConsent.also')}</li>
          </ul>
          <NavigationArrows onBack={handleBack} onNext={handleNext} />
        </div>
      )

    case 3:
      return (
        <div className="quiz-wrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
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

              if (selectedOption && Object.keys(selectedOption).length === 0) {
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
                setHowToParticipateSelection(selectedOption.participate_option)
                updateClientData(step, {
                  [FORM_IDS.HOW_TO_PARTICIPATE]:
                    selectedOption.participate_option,
                })
              }
            }}
          />
        </div>
      )

    case 4:
      return (
        <div className="text-step-wrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <Padlock />
          <div className="header-wrapper">
            <h1>{t('form.firstCommonConsent.dataCollection')}</h1>
          </div>
          <h2>{t('form.firstCommonConsent.yourData')}</h2>
          <ul>
            <li>{t('form.firstCommonConsent.yourDataApp')}</li>
            <li>{t('form.firstCommonConsent.yourDataPhone')}</li>
          </ul>
          <div>
            <p>{t('form.firstCommonConsent.weEncrypt')}</p>
            <p>{t('form.firstCommonConsent.weTransfer')}</p>
            <p>{t('form.firstCommonConsent.replaceName')} </p>
            <p>{t('form.firstCommonConsent.combineData')}</p>
            <p>{t('form.firstCommonConsent.storeCloud')}</p>
          </div>
          <NavigationArrows
            onBack={handleBack}
            onNext={handleNext}
            preventBack
          />
        </div>
      )

    case 5:
      return (
        <div className="text-step-wrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <Network />
          <div className="header-wrapper">
            <h1>{t('form.firstCommonConsent.transferAndRights')}</h1>
          </div>
          <p>{t('form.firstCommonConsent.transferAway')}</p>{' '}
          <p>{t('form.firstCommonConsent.transferToUS')}</p>
          <h2>{t('form.firstCommonConsent.yourRights')}</h2>
          <ul>
            <li>{t('form.firstCommonConsent.requestData')}</li>
            <li>{t('form.firstCommonConsent.correctData')}</li>
          </ul>
          <div>
            {t('form.firstCommonConsent.ifCitizenEU')}{' '}
            <a className="dashboard-link" href="/dashboard">
              {t('form.firstCommonConsent.ifCitizenEULink')}
            </a>
          </div>
          <NavigationArrows onBack={handleBack} onNext={handleNext} />
        </div>
      )
  }
  return null
}

export default FirstCommonConsentSection
