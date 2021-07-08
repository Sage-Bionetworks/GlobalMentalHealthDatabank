import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import {
  NavigationArrows,
  ProgressBar,
  ResponsiveStepWrapper,
} from 'components/common'
import { useRankedChoice } from './context/RankedChoiceContext'
import { FORM_IDS } from 'components/form/types'
import { PAGE_ID_FIELD_NAME, PAGE_ID } from 'constants/constants'
import SageForm from 'components/form/SageForm'
import { INITIAL_RANKED_CHOICES } from './helpers'

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

  const [currentRankedChoices, setCurrentRankedChoices] = useState(
    INITIAL_RANKED_CHOICES,
  )

  const [
    summaryResearchersDataProfitCollapse,
    setSummaryResearchersDataProfitCollapse,
  ] = useState(true)
  const [summaryDataPaymentCollapse, setSummaryDataPaymentCollapse] =
    useState(true)
  const [summaryDataUsageCollapse, setSummaryDataUsageCollapse] = useState(true)
  const [summaryDataSharingCollapse, setSummaryDataSharingCollapse] =
    useState(true)

  const [errorMessage, setErrorMessage] = useState('')

  window.scrollTo(0, 0)

  const {
    researchersDataProfit,
    setResearchersDataProfit,
    dataPayment,
    setDataPayment,
    dataUsage,
    setDataUsage,
    dataSharing,
    setDataSharing,
  } = useRankedChoice()

  useEffect(() => {
    setErrorMessage('')
  }, [step])

  switch (step) {
    case startingStep:
      return (
        <ResponsiveStepWrapper>
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="text-step-wrapper">
            <Typography variant="h3">
              {t('form.ranking.pageOne.title')}
            </Typography>
            <div className="btm-30">
              <Typography variant="body2">
                {t('form.ranking.pageOne.subText1')}
              </Typography>
            </div>
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
                  [PAGE_ID_FIELD_NAME]: PAGE_ID.VOTING_01,
                })
              }}
            />
          </div>
        </ResponsiveStepWrapper>
      )

    case startingStep + 1:
      return (
        <ResponsiveStepWrapper variant="card">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="quiz-wrapper">
            <SageForm
              title={t('form.ranking.pageTwo.title')}
              errorMessage={errorMessage}
              formId={FORM_IDS.RESEARCHERS_DATA_PROFIT}
              buttonText={t('common.submit')}
              onSubmit={(event: any) => {
                const selectedOption = event.formData.researchersDataProfit
                if (selectedOption && Object.keys(selectedOption).length === 0)
                  setErrorMessage(t('form.chooseAnOption'))
                else {
                  setCurrentRankedChoices((prev: any) => ({
                    ...prev,
                    researchersDataProfit:
                      selectedOption.researchersDataProfitOptions,
                  }))
                  setResearchersDataProfit(
                    selectedOption.researchersDataProfitOptions,
                  )
                  setStep((current: number) =>
                    current < maxSteps ? current + 1 : current,
                  )
                }
              }}
            />
          </div>
        </ResponsiveStepWrapper>
      )

    case startingStep + 2:
      return (
        <ResponsiveStepWrapper variant="card">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="quiz-wrapper">
            <SageForm
              title={t('form.ranking.pageThree.title')}
              errorMessage={errorMessage}
              formId={FORM_IDS.DATA_PAYMENT}
              buttonText={t('common.submit')}
              onSubmit={(event: any) => {
                const selectedOption = event.formData.dataPayment
                if (selectedOption && Object.keys(selectedOption).length === 0)
                  setErrorMessage(t('form.chooseAnOption'))
                else {
                  setCurrentRankedChoices((prev: any) => ({
                    ...prev,
                    dataPayment: selectedOption.dataPaymentOptions,
                  }))
                  setDataPayment(selectedOption.dataPaymentOptions)
                  setStep((current: number) =>
                    current < maxSteps ? current + 1 : current,
                  )
                }
              }}
            />
          </div>
        </ResponsiveStepWrapper>
      )

    case startingStep + 3:
      return (
        <ResponsiveStepWrapper variant="card">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="quiz-wrapper">
            <SageForm
              title={t('form.ranking.pageFour.title')}
              errorMessage={errorMessage}
              formId={FORM_IDS.DATA_USAGE}
              buttonText={t('common.submit')}
              onSubmit={(event: any) => {
                const selectedOption = event.formData.dataUsage
                if (selectedOption && Object.keys(selectedOption).length === 0)
                  setErrorMessage(t('form.chooseAnOption'))
                else {
                  setCurrentRankedChoices((prev: any) => ({
                    ...prev,
                    dataUsage: selectedOption.dataUsageOptions,
                  }))
                  setDataUsage(selectedOption.dataUsageOptions)
                  setStep((current: number) =>
                    current < maxSteps ? current + 1 : current,
                  )
                }
              }}
            />
          </div>
        </ResponsiveStepWrapper>
      )

    case startingStep + 4:
      return (
        <ResponsiveStepWrapper variant="card">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="quiz-wrapper">
            <SageForm
              title={t('form.ranking.pageFive.title')}
              errorMessage={errorMessage}
              formId={FORM_IDS.DATA_SHARING}
              buttonText={t('common.submit')}
              onSubmit={(event: any) => {
                const selectedOption = event.formData.dataSharing
                if (selectedOption && Object.keys(selectedOption).length === 0)
                  setErrorMessage(t('form.chooseAnOption'))
                else {
                  setCurrentRankedChoices((prev: any) => ({
                    ...prev,
                    dataSharing: selectedOption.dataSharingOptions,
                  }))
                  setDataSharing(selectedOption.dataSharingOptions)
                  setStep((current: number) =>
                    current < maxSteps ? current + 1 : current,
                  )
                }
              }}
            />
          </div>
        </ResponsiveStepWrapper>
      )

    case 9:
      return (
        <ResponsiveStepWrapper variant="card">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="quiz-wrapper">
            <Typography variant="h6">
              {t('form.ranking.pageSix.title')}
            </Typography>

            <Typography variant="h6">
              {t('form.ranking.pageSix.subTitle')}
            </Typography>
            <div className="bottom-twenty-wrapper">
              <div
                className="eligibility-summary-line"
                onClick={() =>
                  setSummaryResearchersDataProfitCollapse(
                    !summaryResearchersDataProfitCollapse,
                  )
                }
              >
                {summaryResearchersDataProfitCollapse ? (
                  <div className="eligibility-summary-line-container">
                    <div className="chevron down">&gt;</div>
                    <div>
                      <Typography
                        variant="h6"
                        className="eligibility-summary-line-title"
                      >
                        {t('form.ranking.pageTwo.title')}
                      </Typography>
                      <Typography variant="body2">
                        {researchersDataProfit}
                      </Typography>
                    </div>
                  </div>
                ) : (
                  <div className="eligibility-summary-line-container">
                    <div className="chevron">&gt;</div>
                    <div>
                      <Typography
                        variant="h6"
                        className="eligibility-summary-line-title"
                      >
                        {t('form.ranking.pageTwo.title')}
                      </Typography>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="eligibility-summary-line"
                onClick={() =>
                  setSummaryDataPaymentCollapse(!summaryDataPaymentCollapse)
                }
              >
                {summaryDataPaymentCollapse ? (
                  <div className="eligibility-summary-line-container">
                    <div className="chevron down">&gt;</div>
                    <div>
                      <Typography
                        variant="h6"
                        className="eligibility-summary-line-title"
                      >
                        {t('form.ranking.pageThree.title')}
                      </Typography>
                      <Typography variant="body2">{dataPayment}</Typography>
                    </div>
                  </div>
                ) : (
                  <div className="eligibility-summary-line-container">
                    <div className="chevron">&gt;</div>
                    <div>
                      <Typography
                        variant="h6"
                        className="eligibility-summary-line-title"
                      >
                        {t('form.ranking.pageThree.title')}
                      </Typography>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              className="eligibility-summary-line"
              onClick={() =>
                setSummaryDataUsageCollapse(!summaryDataUsageCollapse)
              }
            >
              {summaryDataUsageCollapse ? (
                <div className="eligibility-summary-line-container">
                  <div className="chevron down">&gt;</div>
                  <div>
                    <Typography
                      variant="h6"
                      className="eligibility-summary-line-title"
                    >
                      {t('form.ranking.pageFour.title')}
                    </Typography>
                    <Typography variant="body2">{dataUsage}</Typography>
                  </div>
                </div>
              ) : (
                <div className="eligibility-summary-line-container">
                  <div className="chevron">&gt;</div>
                  <div>
                    <Typography
                      variant="h6"
                      className="eligibility-summary-line-title"
                    >
                      {t('form.ranking.pageFour.title')}
                    </Typography>
                  </div>
                </div>
              )}
            </div>
            <div
              className="eligibility-summary-line"
              onClick={() =>
                setSummaryDataSharingCollapse(!summaryDataSharingCollapse)
              }
            >
              {summaryDataSharingCollapse ? (
                <div className="eligibility-summary-line-container btm-50">
                  <div className="chevron down">&gt;</div>
                  <div>
                    <Typography
                      variant="h6"
                      className="eligibility-summary-line-title"
                    >
                      {t('form.ranking.pageFour.title')}
                    </Typography>
                    <Typography variant="body2">{dataSharing}</Typography>
                  </div>
                </div>
              ) : (
                <div className="eligibility-summary-line-container btm-50">
                  <div className="chevron">&gt;</div>
                  <div>
                    <Typography
                      variant="h6"
                      className="eligibility-summary-line-title"
                    >
                      {t('form.ranking.pageFour.title')}
                    </Typography>
                  </div>
                </div>
              )}
            </div>
            <div className="btm-20">
              <Button
                color="primary"
                variant="text"
                size="large"
                className="wide-button"
                onClick={() => setStep(1)}
              >
                {t('eligibility.restart')}
              </Button>
            </div>

            <Button
              color="primary"
              variant="contained"
              size="large"
              className="wide-button"
              onClick={() =>
                setStep((current: number) =>
                  current <= maxSteps ? current + 1 : current,
                )
              }
            >
              {t('common.submit')}
            </Button>
          </div>
        </ResponsiveStepWrapper>
      )

    default:
      return null
  }
}
export default RankedChoice
