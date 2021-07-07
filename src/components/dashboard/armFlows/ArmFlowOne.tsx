import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import {
  NavigationArrows,
  ProgressBar,
  ResponsiveStepWrapper,
} from 'components/common'
import {
  FORM_IDS,
  RESEARCHERS_DATA_ACCESS_OPTIONS,
  DATA_RESEARCH_TYPE_OPTIONS,
} from 'components/form/types'
import { PAGE_ID_FIELD_NAME, PAGE_ID } from 'constants/constants'
import SageForm from 'components/form/SageForm'
import { ReactComponent as Globe } from 'assets/consent/globe.svg'

type ArmFlowOneProps = {
  step: number
  setStep: Function
  maxSteps: number
  updateClientData: Function
  startingStep: number
}

function ArmFlowOne({
  step,
  setStep,
  maxSteps,
  updateClientData,
  startingStep,
}: ArmFlowOneProps) {
  const { t } = useTranslation()
  const [
    researchersDataAccessSelection,
    setResearchersDataAccessSelection,
  ] = useState(undefined)
  const [dataResearchTypeSelection, setDataResearchTypeSelection] = useState(
    undefined,
  )
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  window.scrollTo(0, 0)

  const CustomRadioResearchersDataAccess = ({
    options,
    value,
    onChange,
  }: any) => {
    const { enumOptions } = options
    const _onChange = (event: any) => onChange(event.currentTarget.id)
    return enumOptions.map((option: any, index: number) => {
      return (
        <div
          className={
            'quiz-radio-wrapper ' +
            (option.value === RESEARCHERS_DATA_ACCESS_OPTIONS.DOWNLOAD_THE_STUDY
              ? 'radio correct'
              : '')
          }
          key={`quiz-radio-wrapper-${index}`}
        >
          <input
            type="radio"
            id={option.value}
            checked={
              option.value === researchersDataAccessSelection ||
              option.value ===
                RESEARCHERS_DATA_ACCESS_OPTIONS.DOWNLOAD_THE_STUDY
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
              (option.value === researchersDataAccessSelection &&
              option.value !==
                RESEARCHERS_DATA_ACCESS_OPTIONS.DOWNLOAD_THE_STUDY
                ? ' error-message wrong-opt'
                : ' correct-opt')
            }
          />
        </div>
      )
    })
  }

  const widgetsResearchersDataAccess = {
    RadioWidget: CustomRadioResearchersDataAccess,
  }

  const CustomRadioDataResearchType = ({ options, value, onChange }: any) => {
    const { enumOptions } = options
    const _onChange = (event: any) => onChange(event.currentTarget.id)
    return enumOptions.map((option: any, index: number) => {
      return (
        <div
          className={
            'quiz-radio-wrapper ' +
            (option.value === DATA_RESEARCH_TYPE_OPTIONS.HEALTH_RESEARCH
              ? 'radio correct'
              : '')
          }
          key={`quiz-radio-wrapper-${index}`}
        >
          <input
            type="radio"
            id={option.value}
            checked={
              option.value === dataResearchTypeSelection ||
              option.value === DATA_RESEARCH_TYPE_OPTIONS.HEALTH_RESEARCH
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
              (option.value === dataResearchTypeSelection &&
              option.value !== DATA_RESEARCH_TYPE_OPTIONS.HEALTH_RESEARCH
                ? ' error-message wrong-opt'
                : ' correct-opt')
            }
          />
        </div>
      )
    })
  }

  const widgetsDataResearchType = {
    RadioWidget: CustomRadioDataResearchType,
  }

  useEffect(() => {
    setErrorMessage('')
    setSuccessMessage('')
  }, [step])

  switch (step) {
    case startingStep:
      return (
        <ResponsiveStepWrapper>
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="text-step-wrapper">
            <div className="icon-wrapper">
              <Globe />
            </div>

            <Typography variant="h3">{t('form.armOne.title')}</Typography>

            <Typography variant="h6">{t('form.armOne.subTitle')}</Typography>

            <Typography variant="body2">{t('form.armOne.subText1')}</Typography>

            <NavigationArrows
              onBack={() =>
                setStep((current: number) =>
                  current > 1 ? current - 1 : current,
                )
              }
              onNext={() => {
                setStep((current: number) =>
                  current < maxSteps ? current + 1 : current,
                )
                updateClientData(step + 1, {
                  [PAGE_ID_FIELD_NAME]: PAGE_ID.RESEARCH_NORMS,
                })
              }}
            />
          </div>
        </ResponsiveStepWrapper>
      )

    case startingStep + 1:
      return (
        <ResponsiveStepWrapper variant="card">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="quiz-wrapper">
            <SageForm
              title={t('form.armOne.pageOne.title')}
              errorMessage={errorMessage}
              infoMessage={successMessage}
              formId={FORM_IDS.RESEARCHERS_DATA_ACCESS}
              widgets={
                researchersDataAccessSelection
                  ? widgetsResearchersDataAccess
                  : undefined
              }
              onSubmit={(event: any) => {
                const selectedOption = event.formData.researchersDataAccess
                if (
                  selectedOption &&
                  Object.keys(selectedOption).length === 0
                ) {
                  setErrorMessage(t('form.chooseAnOption'))
                  setSuccessMessage('')
                } else {
                  if (
                    selectedOption ===
                    RESEARCHERS_DATA_ACCESS_OPTIONS.DOWNLOAD_THE_STUDY
                  ) {
                    setSuccessMessage(t('form.armOne.pageOne.correctAnswer'))
                    setErrorMessage('')
                  } else {
                    setErrorMessage(t('form.armOne.pageOne.incorrectAnswer'))
                    setSuccessMessage('')
                  }
                  if (successMessage || researchersDataAccessSelection) {
                    setStep((current: number) =>
                      current < maxSteps ? current + 1 : current,
                    )
                  } else {
                    setResearchersDataAccessSelection(selectedOption)
                    updateClientData(step + 1, {
                      [FORM_IDS.RESEARCHERS_DATA_ACCESS]: selectedOption,
                      [PAGE_ID_FIELD_NAME]: PAGE_ID.RESEARCH_NORMS_02,
                    })
                  }
                }
              }}
            />
          </div>
        </ResponsiveStepWrapper>
      )

    case startingStep + 2:
      return (
        <ResponsiveStepWrapper variant="card">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="quiz-wrapper">
            <SageForm
              title={t('form.armOne.pageTwo.title')}
              errorMessage={errorMessage}
              infoMessage={successMessage}
              formId={FORM_IDS.DATA_RESEARCH_TYPE}
              widgets={
                dataResearchTypeSelection ? widgetsDataResearchType : undefined
              }
              onSubmit={(event: any) => {
                const selectedOption = event.formData.dataResearchType
                if (
                  selectedOption &&
                  Object.keys(selectedOption).length === 0
                ) {
                  setErrorMessage(t('form.chooseAnOption'))
                  setSuccessMessage('')
                } else {
                  if (
                    selectedOption ===
                    DATA_RESEARCH_TYPE_OPTIONS.HEALTH_RESEARCH
                  ) {
                    setSuccessMessage(t('form.armOne.pageTwo.correctAnswer'))
                    setErrorMessage('')
                  } else {
                    setErrorMessage(t('form.armOne.pageTwo.incorrectAnswer'))
                    setSuccessMessage('')
                  }
                  if (successMessage || dataResearchTypeSelection) {
                    setStep((current: number) =>
                      current < maxSteps ? current + 1 : current,
                    )
                  } else {
                    setDataResearchTypeSelection(selectedOption)
                    updateClientData(step + 1, {
                      [FORM_IDS.DATA_RESEARCH_TYPE]: selectedOption,
                      [PAGE_ID_FIELD_NAME]: PAGE_ID.RESEARCH_NORMS_03,
                    })
                  }
                }
              }}
            />
          </div>
        </ResponsiveStepWrapper>
      )

    default:
      return null
  }
}

export default ArmFlowOne
