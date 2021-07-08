import React from 'react'
import { Typography } from '@material-ui/core'
import {
  NavigationArrows,
  ProgressBar,
  ResponsiveStepWrapper,
} from 'components/common'
import { useTranslation } from 'react-i18next'
import { PAGE_ID } from 'constants/constants'
import { ReactComponent as Globe } from 'assets/consent/globe.svg'

type ArmFlowThreeProps = {
  step: number
  maxSteps: number
  handleNext: (pageId?: string) => void
  handleBack: () => void
  handleComplete: (pageId?: string) => void
  updateClientData: Function
  startingStep: number
  RankedChoice: any
}

function ArmFlowThree({
  step,
  maxSteps,
  handleNext,
  handleBack,
  handleComplete,
  updateClientData,
  startingStep,
  RankedChoice,
}: ArmFlowThreeProps) {
  const { t } = useTranslation()
  window.scrollTo(0, 0)

  switch (step) {
    case startingStep:
      return (
        <ResponsiveStepWrapper>
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="text-step-wrapper">
            <div className="icon-wrapper">
              <Globe />
            </div>

            <Typography variant="h3">{t('form.armThree.title')}</Typography>

            <Typography variant="h6">{t('form.armThree.subTitle')}</Typography>

            <div className="btm-20">
              <Typography variant="h6">
                {t('form.armThree.subText1')}
              </Typography>
            </div>

            <Typography variant="body2">
              {t('form.armThree.subText2')}
            </Typography>

            <NavigationArrows
              onBack={handleBack}
              onNext={() => handleNext(PAGE_ID.RISKS_AND_BENEFITS)}
            />
          </div>
        </ResponsiveStepWrapper>
      )

    case startingStep + 1:
      return (
        <RankedChoice
          step={step}
          setStep={setStep}
          maxSteps={maxSteps}
          updateClientData={updateClientData}
          startingStep={startingStep + 1}
        />
      )

    default:
      return null
  }
}

export default ArmFlowThree
