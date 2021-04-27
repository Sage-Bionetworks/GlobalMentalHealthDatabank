import React from 'react'
import ProgressBar from '../../progressBar/ProgressBar'
import { ReactComponent as LogoNoText } from '../../../assets/logo-no-text.svg'
import { ReactComponent as ArrowButtonLeft } from '../../../assets/arrow_button_left.svg'
import { ReactComponent as ArrowButtonRight } from '../../../assets/arrow_button_right.svg'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Globe } from '../../../assets/consent/globe.svg'

type ArmFlowOneProps = {
  step: number
  setStep: Function
  maxSteps: number
  updateClientData: Function
}

function ArmFlowOne({
  step,
  setStep,
  maxSteps,
  updateClientData,
}: ArmFlowOneProps) {
  const { t } = useTranslation()
  return (
    <div className="text-step-wrapper">
      <ProgressBar step={step} maxSteps={maxSteps} />
      <Globe />
      <div className="header-wrapper">
        <h1>{t('form.armOne.title')}</h1>
      </div>
      <h2>{t('form.armOne.subTitle')}</h2>
      <ul>
        <li>{t('form.armOne.subText1')}</li>
        <li>{t('form.armOne.subText2')}</li>
      </ul>

      <div className="arrow-buttons-wrapper">
        <ArrowButtonLeft
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
    </div>
  )
}

export default ArmFlowOne
