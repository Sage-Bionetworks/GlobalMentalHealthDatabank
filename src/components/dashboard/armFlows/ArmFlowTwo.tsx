import React from 'react'
import ProgressBar from '../../progressBar/ProgressBar'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Globe } from '../../../assets/consent/globe.svg'
import ResponsiveStepWrapper from '../../common/ResponsiveStepWrapper'
import NavigationArrows from '../../common/NavigationArrows'

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
    <ResponsiveStepWrapper>
      <ProgressBar step={step} maxSteps={maxSteps} />
      <div className="text-step-wrapper">
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

export default ArmFlowTwo
