import React, { useEffect, useState } from 'react'
import ProgressBar from '../../progressBar/ProgressBar'
import { ReactComponent as LogoNoText } from '../../../assets/logo-no-text.svg'
import { ReactComponent as ArrowButtonLeft } from '../../../assets/arrow_button_left.svg'
import { ReactComponent as ArrowButtonRight } from '../../../assets/arrow_button_right.svg'
import SageForm from '../../form/SageForm'
import { PARTICIPATE_OPTIONS, FORM_IDS } from '../../form/types'
import { useTranslation } from 'react-i18next'

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
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const { t } = useTranslation()

  useEffect(() => {
    setErrorMessage('')
    setSuccessMessage('')
  }, [step])

  const renderArrows = (preventBack?: boolean) => {
    return (
      <div className="arrowButtonsWrapper">
        <ArrowButtonLeft
          style={{ visibility: preventBack ? 'hidden' : 'visible' }}
          onClick={() =>
            setStep((current: number) => (current > 1 ? current - 1 : current))
          }
        />
        <ArrowButtonRight
          onClick={() => {
            setStep((current: number) =>
              current < maxSteps ? current + 1 : current,
            )
            updateClientData(step)
          }}
        />
      </div>
    )
  }

  switch (step) {
    case 1:
      return (
        <div className="textStepWrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <LogoNoText />
          <div className="headerWrapper">
            <h1>{t('form.firstCommonConsent.whatAreWeStudying')}</h1>
          </div>
          <h2>{t('form.firstCommonConsent.getAnswers')}</h2>
          <ul>
            <li>{t('form.firstCommonConsent.section1')}</li>
            <li>{t('form.firstCommonConsent.section2')}</li>
          </ul>
          <div>
            {t('form.firstCommonConsent.section3.section1')}{' '}
            <a className="dashboardLink" href="/dashboard">
              {t('form.firstCommonConsent.section3.link')}
            </a>{' '}
            {t('form.firstCommonConsent.section3.section2')}{' '}
          </div>
          {renderArrows(true)}
        </div>
      )

    case 2:
      return (
        <div className="textStepWrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <LogoNoText />
          <div className="headerWrapper">
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
          {renderArrows()}
        </div>
      )

    case 3:
      return (
        <div className="quizWrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <SageForm
            title={t('form.firstCommonConsent.quiz')}
            errorMessage={errorMessage}
            infoMessage={successMessage}
            formId={FORM_IDS.HOW_TO_PARTICIPATE}
            buttonText={
              successMessage ? t('form.firstCommonConsent.next') : undefined
            }
            onSubmit={(event: any) => {
              const selectedOption = event.formData.how_to_participate

              if (successMessage) {
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
                  updateClientData(
                    step,
                    FORM_IDS.HOW_TO_PARTICIPATE,
                    selectedOption.participate_option,
                  )
                } else {
                  setErrorMessage(t('form.firstCommonConsent.answer'))
                  setSuccessMessage('')
                }
              }
            }}
          />
        </div>
      )

    case 4:
      return (
        <div className="textStepWrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <LogoNoText />
          <div className="headerWrapper">
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
          {renderArrows(true)}
        </div>
      )

    case 5:
      return (
        <div className="textStepWrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <LogoNoText />
          <div className="headerWrapper">
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
            <a className="dashboardLink" href="/dashboard">
              {t('form.firstCommonConsent.ifCitizenEULink')}
            </a>
          </div>
          {renderArrows()}
        </div>
      )
  }
  return null
}

export default FirstCommonConsentSection
