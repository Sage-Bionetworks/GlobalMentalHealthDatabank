import React, { useState, useEffect } from 'react'
import ProgressBar from '../../progressBar/ProgressBar'
import { useTranslation } from 'react-i18next'
import SageForm from '../../form/SageForm'
import { FORM_IDS } from '../../../components/form/types'
import { ReactComponent as Globe } from '../../../assets/consent/globe.svg'
import ResponsiveStepWrapper from '../../common/ResponsiveStepWrapper'
import NavigationArrows from '../../common/NavigationArrows'

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
              checked={value == option.value ? true : false}
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
            <Globe />
            <div className="header-wrapper">
              <h1>{t('form.armFour.pageOne.title')}</h1>
            </div>
            <div>
              {t('form.armFour.pageOne.subText1')}
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
                  updateClientData(step)
                }}
              />
            </div>
          </div>
        </ResponsiveStepWrapper>
      )

    case startingStep + 1:
      return (
        <ResponsiveStepWrapper>
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
                  updateClientData(step, {
                    [FORM_IDS.HOW_RESEARCHERS_ACCESS]: selectedOption,
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
        <ResponsiveStepWrapper>
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
                  updateClientData(step, {
                    [FORM_IDS.WHO_CONTROLS_DATA]:
                      selectedOption.who_controls_data,
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

    case startingStep + 3:
      return (
        <ResponsiveStepWrapper>
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="quiz-wrapper">
            <SageForm
              title={t('form.armFour.pageFour.title')}
              errorMessage={errorMessage}
              formId={FORM_IDS.WOULD_LIKE_TO_VOLUNTEER}
              onSubmit={(event: any) => {
                const selectedOption = event.formData.would_you_volunteer
                if (selectedOption === undefined)
                  setErrorMessage(t('form.chooseAnOption'))
                else {
                  updateClientData(step, {
                    [FORM_IDS.WOULD_LIKE_TO_VOLUNTEER]: selectedOption,
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
