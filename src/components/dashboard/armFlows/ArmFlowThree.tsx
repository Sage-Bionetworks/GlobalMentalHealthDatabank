import React from 'react'
import ProgressBar from '../../progressBar/ProgressBar'
import { ReactComponent as LogoNoText } from '../../../assets/logo-no-text.svg'
import { ReactComponent as ArrowButtonLeft } from '../../../assets/arrow_button_left.svg'
import { ReactComponent as ArrowButtonRight } from '../../../assets/arrow_button_right.svg'
import { useTranslation } from 'react-i18next'

type ArmFlowThreeProps = {
  step: number
  setStep: Function
  maxSteps: number
  updateClientData: Function
}

function ArmFlowThree({
  step,
  setStep,
  maxSteps,
  updateClientData,
}: ArmFlowThreeProps) {
  const { t } = useTranslation()
  return (
    <div className="textStepWrapper">
      <ProgressBar step={step} maxSteps={maxSteps} />
      <LogoNoText />
      <div className="headerWrapper">
        <h1>{t('form.armThree.title')}</h1>
      </div>
      <h2>{t('form.armThree.subTitle')}</h2>
      <ul>
        <li>{t('form.armThree.subText1')}</li>
        <li>{t('form.armThree.subText2')}</li>
        <li>{t('form.armThree.subText3')}</li>
      </ul>
      <h2>{t('form.armThree.subText4')}</h2>
      <ul>
        <li>{t('form.armThree.subText5')}</li>
        <li>{t('form.armThree.subText6')}</li>
      </ul>

      <div className="arrowButtonsWrapper">
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

export default ArmFlowThree
