import React from 'react'
import { Typography } from '@material-ui/core'
import {
  NavigationArrows,
  ProgressBar,
  ResponsiveStepWrapper,
} from 'components/common'
import { useTranslation } from 'react-i18next'
import { PAGE_ID, PAGE_ID_FIELD_NAME } from 'constants/constants'
import { ReactComponent as Globe } from 'assets/consent/globe.svg'

type ArmFlowThreeProps = {
  step: number
  handleNext: (fields?: object) => void
  handleBack: () => void
  handleComplete: (fields?: object) => void
  updateClientData: Function
  RankedChoice: any
}

const maxSteps = 9

function ArmFlowThree({
  step,
  handleNext,
  handleBack,
  handleComplete,
  updateClientData,
  RankedChoice,
}: ArmFlowThreeProps) {
  const { t } = useTranslation()
  window.scrollTo(0, 0)

  switch (step) {
    case 1:
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
              onNext={() =>
                handleNext({
                  [PAGE_ID_FIELD_NAME]: PAGE_ID.VOTING_01,
                })
              }
            />
          </div>
        </ResponsiveStepWrapper>
      )

    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
      return (
        <RankedChoice
          step={step}
          maxSteps={maxSteps}
          updateClientData={updateClientData}
          handleBack={handleBack}
          handleNext={handleNext}
          handleComplete={handleComplete}
          startingStep={2}
        />
      )

    default:
      return null
  }
}

export default ArmFlowThree
