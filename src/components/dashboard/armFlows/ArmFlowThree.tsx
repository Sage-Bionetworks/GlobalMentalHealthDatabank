import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import {
  NavigationArrows,
  ProgressBar,
  ResponsiveStepWrapper,
} from 'components/common'
import {
  FORM_IDS,
  RESEARCHERS_DATA_ACCESS_OPTIONS,
} from 'components/form/types'
import { useTranslation } from 'react-i18next'
import { createCustomRadio } from 'components/form/CustomRadio'
import {
  PAGE_ID,
  PAGE_ID_FIELD_NAME,
  RESEARCHERS_DATA_USAGE,
} from 'constants/constants'
import { ReactComponent as Globe } from 'assets/consent/globe.svg'
import SageForm from 'components/form/SageForm'

type ArmFlowThreeProps = {
  step: number
  maxSteps: number
  handleNext: (fields?: object) => void
  handleBack: () => void
  handleBackToHub: () => void
  handleComplete: (fields?: object) => void
  updateClientData: Function
  RankedChoice: any
}

function ArmFlowThree({
  step,
  maxSteps,
  handleNext,
  handleBack,
  handleBackToHub,
  handleComplete,
  updateClientData,
  RankedChoice,
}: ArmFlowThreeProps) {
  const { t } = useTranslation()
  const [researchersDataAccessSelection, setResearchersDataAccessSelection] =
    useState('')
  const [researchersDataUsageSelection, setResearchersDataUsageSelection] =
    useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  window.scrollTo(0, 0)

  const CustomRadioResearchersDataAccess = createCustomRadio(
    RESEARCHERS_DATA_ACCESS_OPTIONS.WILL_ONLY_VIEW_DATA,
    researchersDataAccessSelection,
  )

  const widgetsResearchersDataAccess = {
    RadioWidget: CustomRadioResearchersDataAccess,
  }

  const CustomRadioResearchersDataUsage = createCustomRadio(
    RESEARCHERS_DATA_USAGE.STUDY_PARTICIPANTS_DECIDE,
    researchersDataUsageSelection,
  )

  const widgetsResearchersDataUsage = {
    RadioWidget: CustomRadioResearchersDataUsage,
  }

  useEffect(() => {
    setErrorMessage('')
    setSuccessMessage('')
  }, [step])

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
              onBack={handleBackToHub}
              onNext={() =>
                handleNext({
                  [PAGE_ID_FIELD_NAME]: PAGE_ID.HYBRID_02,
                })
              }
            />
          </div>
        </ResponsiveStepWrapper>
      )

    case 2:
      return (
        <ResponsiveStepWrapper variant="card">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="quiz-wrapper">
            <SageForm
              title={t('form.armOne.pageOne.title')}
              errorMessage={errorMessage}
              infoMessage={successMessage}
              formId={FORM_IDS.RESEARCHERS_DATA_ACCESS}
              widgets={
                researchersDataAccessSelection
                  ? widgetsResearchersDataAccess
                  : undefined
              }
              onSubmit={(event: any) => {
                const selectedOption = event.formData.researchersDataAccess
                if (
                  selectedOption === undefined &&
                  researchersDataAccessSelection === ''
                ) {
                  setErrorMessage(t('form.chooseAnOption'))
                  setSuccessMessage('')
                } else {
                  if (
                    selectedOption ===
                    RESEARCHERS_DATA_ACCESS_OPTIONS.WILL_ONLY_VIEW_DATA
                  ) {
                    setSuccessMessage(t('form.armTwo.pageTwo.correctAnswer'))
                    setErrorMessage('')
                  } else {
                    setErrorMessage(t('form.armTwo.pageTwo.incorrectAnswer'))
                    setSuccessMessage('')
                  }
                  if (successMessage || researchersDataAccessSelection) {
                    handleNext()
                  } else {
                    setResearchersDataAccessSelection(selectedOption)
                    updateClientData({
                      [FORM_IDS.RESEARCHERS_DATA_ACCESS]: selectedOption,
                      [PAGE_ID_FIELD_NAME]: PAGE_ID.HYBRID_03,
                    })
                  }
                }
              }}
            />
          </div>
        </ResponsiveStepWrapper>
      )
    case 3:
      return (
        <ResponsiveStepWrapper variant="card">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="quiz-wrapper">
            <SageForm
              title={t('form.armTwo.pageThree.title')}
              errorMessage={errorMessage}
              infoMessage={successMessage}
              formId={FORM_IDS.RESEARCHERS_DATA_USAGE}
              widgets={
                researchersDataUsageSelection
                  ? widgetsResearchersDataUsage
                  : undefined
              }
              onSubmit={(event: any) => {
                const selectedOption = event.formData.researchersDataUsage
                if (
                  selectedOption === undefined &&
                  researchersDataUsageSelection === ''
                ) {
                  setErrorMessage(t('form.chooseAnOption'))
                  setSuccessMessage('')
                } else {
                  if (
                    selectedOption ===
                    RESEARCHERS_DATA_USAGE.STUDY_PARTICIPANTS_DECIDE
                  ) {
                    setSuccessMessage(t('form.armTwo.pageThree.correctAnswer'))
                    setErrorMessage('')
                  } else {
                    setErrorMessage(t('form.armTwo.pageThree.incorrectAnswer'))
                    setSuccessMessage('')
                  }
                  if (successMessage || researchersDataUsageSelection) {
                    handleNext()
                  } else {
                    setResearchersDataUsageSelection(selectedOption)
                    updateClientData({
                      [FORM_IDS.DATA_RESEARCH_TYPE]: selectedOption,
                      [PAGE_ID_FIELD_NAME]: PAGE_ID.VOTING_01,
                    })
                  }
                }
              }}
            />
          </div>
        </ResponsiveStepWrapper>
      )
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      return (
        <RankedChoice
          step={step}
          maxSteps={maxSteps}
          updateClientData={updateClientData}
          handleBack={handleBack}
          handleNext={handleNext}
          handleComplete={handleComplete}
          startingStep={4}
        />
      )

    default:
      return null
  }
}

export default ArmFlowThree
