import React from 'react'
import { Typography } from '@material-ui/core'
import ProgressBar from '../../progressBar/ProgressBar'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Globe } from '../../../assets/consent/globe.svg'
import ResponsiveStepWrapper from '../../common/ResponsiveStepWrapper'
import NavigationArrows from '../../common/NavigationArrows'
import { PAGE_ID_FIELD_NAME, PAGE_ID } from '../../../types/types'

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
        <ul>
          <li>
            <Typography variant="body2">{t('form.armTwo.subText1')}</Typography>
          </li>
          <li>
            <Typography variant="body2">{t('form.armTwo.subText2')}</Typography>
          </li>
          <li>
            <Typography variant="body2">{t('form.armTwo.subText3')}</Typography>
          </li>
        </ul>

        <h2>
          <Typography variant="h6">{t('form.armTwo.subText4')}</Typography>
        </h2>
        <ul>
          <li>
            <Typography variant="body2">{t('form.armTwo.subText5')}</Typography>
          </li>
          <li>
            <Typography variant="body2">{t('form.armTwo.subText6')}</Typography>
          </li>
        </ul>

        <NavigationArrows
          onBack={() =>
            setStep((current: number) => (current > 1 ? current - 1 : current))
          }
          onNext={() => {
            setStep((current: number) =>
              current < maxSteps ? current + 1 : current,
            )
            updateClientData(step + 1, {
              [PAGE_ID_FIELD_NAME]: PAGE_ID.RISKS_AND_BENEFITS,
            })
          }}
        />
      </div>
    </ResponsiveStepWrapper>
  )
}

export default ArmFlowTwo
