import React, { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import {
  NavigationArrows,
  ProgressBar,
  ResponsiveStepWrapper,
} from 'components/common'
import SageForm from 'components/form/SageForm'
import { FORM_IDS, WHO_CONTROLS_DATA_OPTIONS } from 'components/form/types'
import { ReactComponent as Globe } from 'assets/consent/globe.svg'
import { PAGE_ID_FIELD_NAME, PAGE_ID } from 'constants/constants'

type ArmFlowFourProps = {
  step: number
  maxSteps: number
  handleNext: (fields?: object) => void
  handleBack: () => void
  handleBackToHub: () => void
  handleComplete: (fields?: object) => void
  updateClientData: Function
  RankedChoice: any
  clientData: any
}

function ArmFlowFour({
  step,
  maxSteps,
  handleNext,
  handleBack,
  handleComplete,
  handleBackToHub,
  updateClientData,
  RankedChoice,
  clientData,
}: ArmFlowFourProps) {
  const { t } = useTranslation()
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setErrorMessage('')
  }, [step])

  window.scrollTo(0, 0)

  const CustomRadio = ({ options, value, onChange }: any) => {
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

  const widgets = {
    RadioWidget: CustomRadio,
  }

  switch (step) {
    case 1:
      return (
        <ResponsiveStepWrapper>
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="text-step-wrapper">
            <div className="icon-wrapper">
              <Globe />
            </div>

            <Typography variant="h3">
              {t('form.armFour.pageOne.title')}
            </Typography>

            <div>
              <Typography variant="body2">
                {t('form.armFour.pageOne.subText1')}
              </Typography>
              <NavigationArrows
                onBack={handleBackToHub}
                onNext={() =>
                  handleNext({
                    [PAGE_ID_FIELD_NAME]: PAGE_ID.PARTICIPANT_CHOICE_02,
                  })
                }
              />
            </div>
          </div>
        </ResponsiveStepWrapper>
      )

    case 2:
      return (
        <ResponsiveStepWrapper variant="card">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="quiz-wrapper">
            <SageForm
              title={t('form.armFour.pageTwo.title')}
              subTitle={t('form.armFour.pageTwo.subTitle')}
              errorMessage={errorMessage}
              formId={FORM_IDS.HOW_RESEARCHERS_ACCESS}
              onSubmit={(event: any) => {
                const selectedOption = event.formData.how_researchers_access
                if (!selectedOption) {
                  setErrorMessage(t('form.chooseAnOption'))
                } else {
                  handleNext({
                    [FORM_IDS.HOW_RESEARCHERS_ACCESS]: selectedOption,
                    [PAGE_ID_FIELD_NAME]: PAGE_ID.PARTICIPANT_CHOICE_03,
                  })
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
              title={t('form.armFour.pageThree.title')}
              errorMessage={errorMessage}
              formId={FORM_IDS.WHO_CONTROLS_DATA}
              widgets={widgets}
              onSubmit={(event: any) => {
                const selectedOption = event.formData
                if (selectedOption.who_controls_data === undefined) {
                  setErrorMessage(t('form.chooseAnOption'))
                } else {
                  handleNext({
                    [FORM_IDS.WHO_CONTROLS_DATA]:
                      selectedOption.who_controls_data,
                    [PAGE_ID_FIELD_NAME]:
                      clientData?.who_controls_data ===
                      WHO_CONTROLS_DATA_OPTIONS.VOLUNTEER_COMMUNITY_REVIEW_PANEL
                        ? PAGE_ID.PARTICIPANT_CHOICE_04
                        : PAGE_ID.VOTING_01,
                  })
                }
              }}
            />
          </div>
        </ResponsiveStepWrapper>
      )
    case 4:
      return (
        <>
          {clientData?.whoControlsData ===
          WHO_CONTROLS_DATA_OPTIONS.VOLUNTEER_COMMUNITY_REVIEW_PANEL ? (
            <ResponsiveStepWrapper>
              <ProgressBar step={step} maxSteps={maxSteps} />
              <div className="text-step-wrapper">
                <div className="btm-50">
                  <Typography variant="h3">
                    {t('form.secondCommonConsent.volunteer.ifYouLike')}
                  </Typography>
                </div>
                <a
                  href={`mailto: ${t(
                    'form.secondCommonConsent.volunteer.email',
                  )}`}
                >
                  <Typography variant="body1">
                    {t('form.secondCommonConsent.volunteer.email')}
                  </Typography>
                </a>

                <Typography variant="body1" style={{ marginBottom: '20px' }}>
                  {t('form.secondCommonConsent.volunteer.subject')}
                </Typography>
                <Typography variant="body2">
                  {t('form.secondCommonConsent.volunteer.note')}
                </Typography>
                <NavigationArrows
                  preventBack
                  onNext={() =>
                    handleComplete({
                      [PAGE_ID_FIELD_NAME]: PAGE_ID.SUMMARY,
                    })
                  }
                />
              </div>
            </ResponsiveStepWrapper>
          ) : (
            handleNext({
              [PAGE_ID_FIELD_NAME]: PAGE_ID.VOTING_01,
            })
          )}
        </>
      )

    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
      if (clientData?.whoControlsData === WHO_CONTROLS_DATA_OPTIONS.DEMOCRACY) {
        return (
          <RankedChoice
            step={step}
            maxSteps={maxSteps}
            updateClientData={updateClientData}
            handleBack={handleBack}
            handleNext={handleNext}
            handleComplete={handleComplete}
            startingStep={5}
            isArmFlowFour={true}
          />
        )
      } else {
        handleComplete({
          [PAGE_ID_FIELD_NAME]: PAGE_ID.SUMMARY,
        })
        return null
      }

    default:
      return null
  }
}

export default ArmFlowFour
