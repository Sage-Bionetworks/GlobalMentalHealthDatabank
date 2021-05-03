import React from 'react'
import ProgressBar from '../../progressBar/ProgressBar'
import { ReactComponent as ArrowButtonLeft } from '../../../assets/arrow_button_left.svg'
import { ReactComponent as ArrowButtonRight } from '../../../assets/arrow_button_right.svg'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Globe } from '../../../assets/consent/globe.svg'

type ArmFlowTwoProps = {
  step: number
  setStep: Function
  maxSteps: number
  updateClientData: Function
}

function ArmFlowTwo({
  step,
  setStep,
  maxSteps,
  updateClientData,
}: ArmFlowTwoProps) {
  const { t } = useTranslation()
  return (
    <div className="text-step-wrapper">
      <ProgressBar step={step} maxSteps={maxSteps} />
      <Globe />
      <div className="header-wrapper">
        <h1>{t('form.armTwo.title')}</h1>
      </div>
      <h2>{t('form.armTwo.subTitle')}</h2>
      <ul>
        <li>{t('form.armTwo.subText1')}</li>
        <li>{t('form.armTwo.subText2')}</li>
        <li>{t('form.armTwo.subText3')}</li>
      </ul>

      <h2>{t('form.armTwo.subText4')}</h2>
      <ul>
        <li>{t('form.armTwo.subText5')}</li>
        <li>{t('form.armTwo.subText6')}</li>
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

export default ArmFlowTwo
