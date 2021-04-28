import React, { useState, useEffect } from 'react'
import ProgressBar from '../../progressBar/ProgressBar'
import { ReactComponent as LogoNoText } from '../../../assets/logo-no-text.svg'
import { ReactComponent as ArrowButtonLeft } from '../../../assets/arrow_button_left.svg'
import { ReactComponent as ArrowButtonRight } from '../../../assets/arrow_button_right.svg'
import { useTranslation } from 'react-i18next'
import SageForm from '../../form/SageForm'
import { FORM_IDS } from '../../../components/form/types'
import { ReactComponent as Globe } from '../../../assets/consent/globe.svg'

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
        <div className={'custom-radio-who-controls'}>
          <input
            type="radio"
            id={option.value}
            checked={value == option.value ? true : false}
            onChange={_onChange as any}
          />
          <div
            id={`label-${option.value}`}
            dangerouslySetInnerHTML={{ __html: option.label }}
          />
        </div>
      )
    })
  }

  const widgets = {
    RadioWidget: CustomRadio,
  }

  const renderArrows = (preventBack?: boolean) => {
    return (
      <div className="arrow-buttons-wrapper">
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
    case startingStep:
      return (
        <div className="text-step-wrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <Globe />
          <div className="header-wrapper">
            <h1>{t('form.armFour.pageOne.title')}</h1>
          </div>
          <div>
            {t('form.armFour.pageOne.subText1')}
            {renderArrows()}
          </div>
        </div>
      )

    case startingStep + 1:
      return (
        <div className="quiz-wrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
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
                updateClientData(
                  step,
                  FORM_IDS.HOW_RESEARCHERS_ACCESS,
                  selectedOption,
                )
                setStep((current: number) =>
                  current < maxSteps ? current + 1 : current,
                )
              }
            }}
          />
        </div>
      )

    case startingStep + 2:
      return (
        <div className="quiz-wrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
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
                updateClientData(
                  step,
                  FORM_IDS.WHO_CONTROLS_DATA,
                  selectedOption.who_controls_data,
                )
                setStep((current: number) =>
                  current < maxSteps ? current + 1 : current,
                )
              }
            }}
          />
        </div>
      )

    case startingStep + 3:
      return (
        <div className="quiz-wrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <SageForm
            title={t('form.armFour.pageFour.title')}
            errorMessage={errorMessage}
            formId={FORM_IDS.WOULD_LIKE_TO_VOLUNTEER}
            onSubmit={(event: any) => {
              const selectedOption = event.formData.would_you_volunteer
              if (selectedOption === undefined)
                setErrorMessage(t('form.chooseAnOption'))
              else {
                updateClientData(
                  step,
                  FORM_IDS.WOULD_LIKE_TO_VOLUNTEER,
                  selectedOption,
                )
                setStep((current: number) =>
                  current < maxSteps ? current + 1 : current,
                )
              }
            }}
          />
        </div>
      )
    default:
      return null
  }
}

export default ArmFlowFour
