import React from 'react'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import {
  NavigationArrows,
  ProgressBar,
  ResponsiveStepWrapper,
} from 'components/common'
import { PAGE_ID } from 'constants/constants'
import { ReactComponent as Globe } from 'assets/consent/globe.svg'

type ArmFlowTwoProps = {
  step: number
  maxSteps: number
  handleNext: (pageId?: string) => void
  handleBack: () => void
  handleComplete: (pageId?: string) => void
  updateClientData: Function
}

function ArmFlowTwo({
  step,
  handleNext,
  handleBack,
  handleComplete,
  maxSteps,
  updateClientData,
}: ArmFlowTwoProps) {
  const { t } = useTranslation()
  window.scrollTo(0, 0)
  return (
    <ResponsiveStepWrapper>
      <ProgressBar step={step} maxSteps={maxSteps} />
      <div className="text-step-wrapper">
        <div className="icon-wrapper">
          <Globe />
        </div>

        <Typography variant="h3">{t('form.armTwo.title')}</Typography>

        <Typography variant="h6">{t('form.armTwo.subTitle')}</Typography>

        <div className="btm-20">
          <Typography variant="h6">{t('form.armTwo.subText1')}</Typography>
        </div>

        <Typography variant="body2">{t('form.armTwo.subText2')}</Typography>

        <NavigationArrows
          onBack={handleBack}
          onNext={() => handleNext(PAGE_ID.RISKS_AND_BENEFITS)}
        />
      </div>
    </ResponsiveStepWrapper>
  )
}

export default ArmFlowTwo
