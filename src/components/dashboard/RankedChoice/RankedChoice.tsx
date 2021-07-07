import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import {
  NavigationArrows,
  ProgressBar,
  ResponsiveStepWrapper,
} from 'components/common'
import { FORM_IDS } from 'components/form/types'
import { PAGE_ID_FIELD_NAME, PAGE_ID } from 'constants/constants'
import SageForm from 'components/form/SageForm'

type RankedChoiceProps = {
  step: number
  setStep: Function
  maxSteps: number
  updateClientData: Function
  startingStep: number
}

function RankedChoice({
  step,
  setStep,
  maxSteps,
  updateClientData,
  startingStep,
}: RankedChoiceProps) {
  const { t } = useTranslation()
  const [researchersDataProfitSelection, setResearchersDataProfitSelection] =
    useState(undefined)
  const [dataPaymentSelection, setDataPaymentSelection] = useState(undefined)
  const [dataUsageelection, setDataUsageSelection] = useState(undefined)
  const [dataSharingSelection, setDataSharingSelection] = useState(undefined)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  window.scrollTo(0, 0)

  const CustomRadioResearchersDataProfit = ({
    options,
    value,
    onChange,
  }: any) => {
    const { enumOptions } = options
    const _onChange = (event: any) => onChange(event.currentTarget.id)
    return enumOptions.map((option: any, index: number) => {
      return (
        <div
          className={'quiz-radio-wrapper'}
          key={`quiz-radio-wrapper-${index}`}
        >
          <label>
            <input
              type="radio"
              id={option.value}
              checked={value === option.value ? true : false}
              onChange={_onChange as any}
            />
            <div
              id={`label-${option.value}`}
              dangerouslySetInnerHTML={{ __html: option.label }}
              className={'radio-button-label'}
            />
          </label>
        </div>
      )
    })
  }

  useEffect(() => {
    setErrorMessage('')
    setSuccessMessage('')
  }, [step])

  switch (step) {
    case step:
      return (
        <ResponsiveStepWrapper>
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="text-step-wrapper">
            <Typography variant="h3">
              {t('form.ranking.pageOne.title')}
            </Typography>

            <Typography variant="h6">
              {t('form.ranking.pageOne.subText1')}
            </Typography>

            <Typography variant="body2">
              {t('form.ranking.pageOne.subText2')}
            </Typography>

            <NavigationArrows
              onBack={() =>
                setStep((current: number) =>
                  current > 1 ? current - 1 : current,
                )
              }
              onNext={() => {
                setStep((current: number) =>
                  current < maxSteps ? current + 1 : current,
                )
                updateClientData(step + 1, {
                  [PAGE_ID_FIELD_NAME]: PAGE_ID.RESEARCH_NORMS,
                })
              }}
            />
          </div>
        </ResponsiveStepWrapper>
      )

    default:
      return null
  }
}

export default RankedChoice
