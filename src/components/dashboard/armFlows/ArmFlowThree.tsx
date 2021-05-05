import React from 'react'
import ProgressBar from '../../progressBar/ProgressBar'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Globe } from '../../../assets/consent/globe.svg'
import ResponsiveStepWrapper from '../../common/ResponsiveStepWrapper'
import NavigationArrows from '../../common/NavigationArrows'

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
    <ResponsiveStepWrapper>
      <ProgressBar step={step} maxSteps={maxSteps} />
      <div className="text-step-wrapper">
        <Globe />
        <div className="header-wrapper">
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
        <NavigationArrows
          onBack={() =>
            setStep((current: number) => (current > 1 ? current - 1 : current))
          }
          onNext={() => {
            setStep((current: number) =>
              current < maxSteps ? current + 1 : current,
            )
            updateClientData(step)
          }}
        />
      </div>
    </ResponsiveStepWrapper>
  )
}

export default ArmFlowThree
