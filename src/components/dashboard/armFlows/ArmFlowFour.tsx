import React, { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core'
import ProgressBar from '../../progressBar/ProgressBar'
import { useTranslation } from 'react-i18next'
import SageForm from '../../form/SageForm'
import { FORM_IDS } from '../../../components/form/types'
import { ReactComponent as Globe } from '../../../assets/consent/globe.svg'
import ResponsiveStepWrapper from '../../common/ResponsiveStepWrapper'
import NavigationArrows from '../../common/NavigationArrows'
import { PAGE_ID_FIELD_NAME, PAGE_ID } from '../../../types/types'

type ArmFlowFourProps = {
  step: number
  setStep: Function
  maxSteps: number
  updateClientData: Function
  startingStep: number
}

function ArmFlowFour({
  step,
  setStep,
  maxSteps,
  updateClientData,
  startingStep,
}: ArmFlowFourProps) {
  const { t } = useTranslation()
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setErrorMessage('')
  }, [step])

  const CustomRadio = ({ options, value, onChange }: any) => {
    const { enumOptions } = options
    const _onChange = (event: any) => onChange(event.currentTarget.id)
    return enumOptions.map((option: any) => {
      return (
        <div className={'quiz-radio-wrapper'}>
          <label>
            <input
              type="radio"
              id={option.value}
              checked={value === option.value ? true : false}
              onChange={_onChange as any}
            />
            <div
              id={`label-${option.value}`}
              dangerouslySetInnerHTML={{ __html: option.label }}
              className={'radio-button-label'}
            />
          </label>
        </div>
      )
    })
  }

  const widgets = {
    RadioWidget: CustomRadio,
  }

  switch (step) {
    case startingStep:
      return (
        <ResponsiveStepWrapper>
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="text-step-wrapper">
            <div className="icon-wrapper">
              <Globe />
            </div>

            <Typography variant="h3">
              {t('form.armFour.pageOne.title')}
            </Typography>

            <div>
              <Typography variant="body2">
                {t('form.armFour.pageOne.subText1')}
              </Typography>
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
                    [PAGE_ID_FIELD_NAME]: PAGE_ID.PARTICIPANT_CHOICE_02,
                  })
                }}
              />
            </div>
          </div>
        </ResponsiveStepWrapper>
      )

    case startingStep + 1:
      return (
        <ResponsiveStepWrapper variant="card">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="quiz-wrapper">
            <SageForm
              title={t('form.armFour.pageTwo.title')}
              subTitle={t('form.armFour.pageTwo.subTitle')}
              errorMessage={errorMessage}
              formId={FORM_IDS.HOW_RESEARCHERS_ACCESS}
              onSubmit={(event: any) => {
                const selectedOption = event.formData.how_researchers_access
                if (!selectedOption) {
                  setErrorMessage(t('form.chooseAnOption'))
                  window.scrollTo(0, 0)
                } else {
                  updateClientData(step + 1, {
                    [FORM_IDS.HOW_RESEARCHERS_ACCESS]: selectedOption,
                    [PAGE_ID_FIELD_NAME]: PAGE_ID.PARTICIPANT_CHOICE_03,
                  })

                  setStep((current: number) =>
                    current < maxSteps ? current + 1 : current,
                  )
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
              title={t('form.armFour.pageThree.title')}
              errorMessage={errorMessage}
              formId={FORM_IDS.WHO_CONTROLS_DATA}
              widgets={widgets}
              onSubmit={(event: any) => {
                const selectedOption = event.formData
                if (selectedOption.who_controls_data === undefined) {
                  setErrorMessage(t('form.chooseAnOption'))
                  window.scrollTo(0, 0)
                } else {
                  updateClientData(step + 1, {
                    [FORM_IDS.WHO_CONTROLS_DATA]:
                      selectedOption.who_controls_data,
                    [PAGE_ID_FIELD_NAME]: PAGE_ID.RISKS_AND_BENEFITS,
                  })
                  setStep((current: number) =>
                    current < maxSteps ? current + 1 : current,
                  )
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

export default ArmFlowFour
