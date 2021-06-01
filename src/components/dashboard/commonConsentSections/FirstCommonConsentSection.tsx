import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { PARTICIPATE_OPTIONS, FORM_IDS } from '../../form/types'
import {
  PAGE_ID_FIELD_NAME,
  PAGE_ID,
  ROUTES,
} from '../../../constants/constants'
import NavigationArrows from '../../common/NavigationArrows'
import ResponsiveStepWrapper from '../../common/ResponsiveStepWrapper'
import ProgressBar from '../../progressBar/ProgressBar'
import SageForm from '../../form/SageForm'
import { ReactComponent as Questions } from '../../../assets/consent/questions.svg'
import { ReactComponent as Network } from '../../../assets/consent/network.svg'
import { ReactComponent as Padlock } from '../../../assets/consent/padlock.svg'
import { FLOW_OPTIONS } from '../../../helpers/RandomFlowGenerator'

type FirstCommonConsentProps = {
  step: number
  setStep: Function
  maxSteps: number
  updateClientData: Function
  consentModel: string
}

function FirstCommonConsentSection({
  step,
  setStep,
  maxSteps,
  updateClientData,
  consentModel,
}: FirstCommonConsentProps) {
  const [howToParticipateSelection, setHowToParticipateSelection] =
    useState(undefined)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const { t } = useTranslation()

  const CustomRadio = ({ options, onChange }: any) => {
    const { enumOptions } = options
    const _onChange = (event: any) => onChange(event.currentTarget.id)
    return enumOptions.map((option: any, index: number) => {
      return (
        <div
          className={
            'quiz-radio-wrapper ' +
            (option.value === PARTICIPATE_OPTIONS.ANSWER_SURVEY_QUESTIONS
              ? 'radio correct'
              : '')
          }
          key={`quiz-radio-wrapper-${index}`}
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

  const getStepName = () => {
    switch (consentModel) {
      case FLOW_OPTIONS.ONE:
        return PAGE_ID.RESEARCH_NORMS
      case FLOW_OPTIONS.TWO:
        return PAGE_ID.YOUTH_INFORMED
      case FLOW_OPTIONS.THREE:
        return PAGE_ID.HYBRID
      case FLOW_OPTIONS.FOUR:
        return PAGE_ID.PARTICIPANT_CHOICE_01
    }
  }

  const widgets = {
    RadioWidget: CustomRadio,
  }

  useEffect(() => {
    setErrorMessage('')
    setSuccessMessage('')
  }, [step])

  const handleNext = (pageId: string | undefined) => {
    setStep((current: number) => (current < maxSteps ? current + 1 : current))
    updateClientData(step + 1, { [PAGE_ID_FIELD_NAME]: pageId })
  }
  const handleBack = () =>
    setStep((current: number) => (current > 1 ? current - 1 : current))

  window.scrollTo(0, 0)

  switch (step) {
    case 1:
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
            <NavigationArrows
              onBack={handleBack}
              onNext={() => handleNext(PAGE_ID.WHAT_WILL_YOU_ASK_QUIZ)}
            />
          </div>
        </ResponsiveStepWrapper>
      )

    case 2:
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
                  updateClientData(step + 1, {
                    [FORM_IDS.HOW_TO_PARTICIPATE]:
                      selectedOption.participate_option,
                    [PAGE_ID_FIELD_NAME]: PAGE_ID.DATA_COLLECTION,
                  })
                }
              }}
            />
          </div>
        </ResponsiveStepWrapper>
      )

    case 3:
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
              onNext={() => handleNext(PAGE_ID.DATA_RIGHTS)}
              preventBack
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
              <Network />
            </div>

            <Typography variant="h3">
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
                  {t('form.firstCommonConsent.correctData')}
                </Typography>
              </li>
            </ul>

            <Typography variant="body2">
              {t('form.firstCommonConsent.ifCitizenEU')}{' '}
              <a className="underlined-link" href={ROUTES.DATA_REGULATION}>
                {t('form.firstCommonConsent.ifCitizenEULink')}
              </a>
            </Typography>

            <NavigationArrows
              onBack={handleBack}
              onNext={() => handleNext(getStepName())}
            />
          </div>
        </ResponsiveStepWrapper>
      )
  }
  return null
}

export default FirstCommonConsentSection
