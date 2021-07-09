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
import { PAGE_ID, PAGE_ID_FIELD_NAME, RANKED_CHOICE } from 'constants/constants'
import SageForm from 'components/form/SageForm'

type RankedChoiceProps = {
  step: number
  maxSteps: number
  updateClientData: Function
  handleBack: (steps?: number) => void
  handleNext: (fields?: object) => void
  handleComplete: (fields?: object) => void
  startingStep: number
  isArmFlowFour?: boolean
}
function RankedChoice({
  step,
  maxSteps,
  updateClientData,
  handleBack,
  handleNext,
  handleComplete,
  startingStep,
  isArmFlowFour,
}: RankedChoiceProps) {
  const { t } = useTranslation()

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
              onBack={() => {
                isArmFlowFour ? handleBack(2) : handleBack()
              }}
              onNext={() =>
                handleNext({
                  [PAGE_ID_FIELD_NAME]: PAGE_ID.VOTING_02,
                })
              }
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
                  setResearchersDataProfit(
                    selectedOption.researchersDataProfitOptions,
                  )
                  handleNext({
                    [PAGE_ID_FIELD_NAME]: PAGE_ID.VOTING_03,
                  })
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
                  setDataPayment(selectedOption.dataPaymentOptions)
                  handleNext({
                    [PAGE_ID_FIELD_NAME]: PAGE_ID.VOTING_04,
                  })
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
                  setDataUsage(selectedOption.dataUsageOptions)
                  handleNext({
                    [PAGE_ID_FIELD_NAME]: PAGE_ID.VOTING_05,
                  })
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
                  setDataSharing(selectedOption.dataSharingOptions)
                  handleNext({
                    [PAGE_ID_FIELD_NAME]: PAGE_ID.VOTING_06,
                  })
                }
              }}
            />
          </div>
        </ResponsiveStepWrapper>
      )

    case startingStep + 5:
      return (
        <ResponsiveStepWrapper variant="card">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="quiz-wrapper">
            <Typography variant="h3">
              {t('form.ranking.pageSix.title')}
            </Typography>

            <div className="btm-30">
              <Typography variant="body2">
                {t('form.ranking.pageSix.subTitle')}
              </Typography>
            </div>
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
                      {t('form.ranking.pageFive.title')}
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
                      {t('form.ranking.pageFive.title')}
                    </Typography>
                  </div>
                </div>
              )}
            </div>
            <Button
              color="primary"
              variant="contained"
              size="large"
              className="wide-button"
              onClick={() => {
                handleComplete({
                  [RANKED_CHOICE.CAN_RESEARCHERS_MAKE_PROFIT]:
                    researchersDataProfit,
                  [RANKED_CHOICE.DO_PEOPLE_HAVE_TO_PAY]: dataPayment,
                  [RANKED_CHOICE.HOW_CAN_DATA_BE_USED]: dataUsage,
                  [RANKED_CHOICE.HOW_CAN_RESULTS_BE_SHARED]: dataSharing,
                  [PAGE_ID_FIELD_NAME]: PAGE_ID.SUMMARY,
                })
              }}
            >
              {t('common.continue')}
            </Button>
          </div>
        </ResponsiveStepWrapper>
      )

    default:
      return null
  }
}
export default RankedChoice
