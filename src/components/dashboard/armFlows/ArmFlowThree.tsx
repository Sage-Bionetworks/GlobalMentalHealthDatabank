import React from 'react'
import { Typography } from '@material-ui/core'
import ProgressBar from '../../progressBar/ProgressBar'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Globe } from '../../../assets/consent/globe.svg'
import ResponsiveStepWrapper from '../../common/ResponsiveStepWrapper'
import NavigationArrows from '../../common/NavigationArrows'
import { PAGE_ID_FIELD_NAME, PAGE_ID } from '../../../types/types'

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
          <Typography variant="h3">{t('form.armThree.title')}</Typography>
        </div>
        <Typography variant="h6">{t('form.armThree.subTitle')}</Typography>
        <ul>
          <li>
            <Typography variant="body2">
              {t('form.armThree.subText1')}
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              {t('form.armThree.subText2')}
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              {t('form.armThree.subText3')}
            </Typography>
          </li>
        </ul>
        <Typography variant="h6">{t('form.armThree.subText4')}</Typography>
        <ul>
          <li>
            <Typography variant="body2">
              {t('form.armThree.subText5')}
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              {t('form.armThree.subText6')}
            </Typography>
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

export default ArmFlowThree
