import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { cloneDeep } from 'lodash'
import {
  PARTICIPATE_OPTIONS,
  FORM_IDS,
  WHAT_IS_THE_PURPOSE_OPTIONS,
  WHICH_IS_CORRECT_OPTIONS,
} from 'components/form/types'
import { PAGE_ID_FIELD_NAME, PAGE_ID, ROUTES } from 'constants/constants'
import NavigationArrows from 'components/common/NavigationArrows'
import ResponsiveStepWrapper from 'components/common/ResponsiveStepWrapper'
import ProgressBar from 'components/common/ProgressBar'
import SageForm from 'components/form/SageForm'
import { createCustomRadio } from 'components/form/CustomRadio'
import { ReactComponent as Network } from 'assets/consent/network.svg'
import { ReactComponent as Padlock } from 'assets/consent/padlock.svg'
import { ReactComponent as Questions } from 'assets/consent/questions.svg'
import { ReactComponent as RisksBenefits } from 'assets/consent/risksBenefits.svg'
import { ReactComponent as NotMedical } from 'assets/consent/notMedical.svg'
import PolicyEnglish from 'assets/privacy_policy_docs/privacy_policy_english.pdf'
import { ReactComponent as Exit } from 'assets/consent/exit.svg'
import { FLOW_OPTIONS } from 'helpers/RandomFlowGenerator'
import { Checkpoint } from 'types/types'

type AboutTheStudyProps = {
  checkpoint?: Checkpoint
  maxSteps?: number
  updateClientData: Function
  consentModel?: string
}

function AboutTheStudy({
  checkpoint,
  maxSteps = 11,
  updateClientData,
  consentModel,
}: AboutTheStudyProps) {
  const history = useHistory()
  const [howToParticipateSelection, setHowToParticipateSelection] = useState()
  const [whatIsThePurposeSelection, setWhatIsThePurposeSelection] = useState()
  const [whichIsCorrectSelection, setWhichIsCorrectSelection] = useState()
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const { t } = useTranslation()
  const step = checkpoint?.aboutTheStudy?.step || 1

  const CustomRadioParticipate = createCustomRadio(
    PARTICIPATE_OPTIONS.ANSWER_SURVEY_QUESTIONS,
    howToParticipateSelection,
  )

  const CustomRadioWhatIsThePurpose = createCustomRadio(
    WHAT_IS_THE_PURPOSE_OPTIONS.TO_PARTICIPATE_IN_RESEARCH,
    whatIsThePurposeSelection,
  )

  const CustomRadioWhichIsCorrect = createCustomRadio(
    WHICH_IS_CORRECT_OPTIONS.I_CAN_STOP_AT_ANY_TIME,
    whichIsCorrectSelection,
  )

  const widgetsParticipate = {
    RadioWidget: CustomRadioParticipate,
  }

  const widgetsWhatIsThePurpose = {
    RadioWidget: CustomRadioWhatIsThePurpose,
  }

  const widgetsWhichIsCorrect = {
    RadioWidget: CustomRadioWhichIsCorrect,
  }

  const getNextPageName = () => {
    switch (consentModel) {
      case FLOW_OPTIONS.ONE:
        return PAGE_ID.RESEARCH_NORMS_01
      case FLOW_OPTIONS.TWO:
        return PAGE_ID.YOUTH_INFORMED_01
      case FLOW_OPTIONS.THREE:
        return PAGE_ID.HYBRID_01
      case FLOW_OPTIONS.FOUR:
        return PAGE_ID.PARTICIPANT_CHOICE_01
    }
  }

  useEffect(() => {
    setErrorMessage('')
    setSuccessMessage('')
  }, [checkpoint])

  const handleNext = (pageId: string | undefined) => {
    if (checkpoint) {
      const nextStep = step < maxSteps ? step + 1 : step
      const newCheckpoint = cloneDeep(checkpoint)
      newCheckpoint.aboutTheStudy.step = nextStep
      updateClientData({
        [PAGE_ID_FIELD_NAME]: pageId,
        checkpoint: newCheckpoint,
      })
    }
  }
  const handleBack = () => {
    if (checkpoint) {
      const prevStep = step > 1 ? step - 1 : step
      const newCheckpoint = cloneDeep(checkpoint)
      newCheckpoint.aboutTheStudy.step = prevStep
      updateClientData({
        checkpoint: newCheckpoint,
      })
    }
  }

  const handleBackToHub = (fields: object = {}) => {
    if (checkpoint) {
      const newCheckpoint = cloneDeep(checkpoint)
      newCheckpoint.aboutTheStudy.status = 'started'
      newCheckpoint.aboutTheStudy.step = 1
      updateClientData({
        ...fields,
        checkpoint: newCheckpoint,
      })
      history.push(ROUTES.HUB)
    }
  }

  const handleComplete = (pageId: string | undefined) => {
    if (checkpoint) {
      const nextStep = step < maxSteps ? step + 1 : step
      const newCheckpoint = cloneDeep(checkpoint)
      newCheckpoint.aboutTheStudy.step = nextStep
      newCheckpoint.aboutTheStudy.status = 'complete'
      newCheckpoint.aboutDataSharing.status = 'started'
      updateClientData({
        [PAGE_ID_FIELD_NAME]: pageId,
        checkpoint: newCheckpoint,
      })
      history.push(ROUTES.HUB)
    }
  }

  window.scrollTo(0, 0)

  switch (step) {
    case 1:
      return (
        <ResponsiveStepWrapper>
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="text-step-wrapper">
            <Typography variant="h3">
              {t('form.firstCommonConsent.aboutTheStudy')}
            </Typography>
            <div className="btm-20">
              <Typography variant="body2">
                {t('form.firstCommonConsent.toJoinTheStudy')}
              </Typography>
            </div>
            <Typography variant="h6">
              {t('form.firstCommonConsent.weWillAskYou')}
            </Typography>
            <NavigationArrows
              onBack={handleBackToHub}
              onNext={() => handleNext(PAGE_ID.WHAT_WILL_YOU_ASK)}
            />
          </div>
        </ResponsiveStepWrapper>
      )

    case 2:
      return (
        <ResponsiveStepWrapper>
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="text-step-wrapper">
            <div className="icon-wrapper">
              <Questions />
            </div>
            <Typography variant="h3">
              {t('form.firstCommonConsent.whatWillYouAsk')}
            </Typography>
            <Typography variant="h6">
              {t('form.firstCommonConsent.step1')}
            </Typography>
            <Typography variant="h6">
              {t('form.firstCommonConsent.step2')}
            </Typography>
            <Typography variant="h6">
              {t('form.firstCommonConsent.step3')}
            </Typography>
            <NavigationArrows
              onBack={handleBack}
              onNext={() => handleNext(PAGE_ID.WHAT_WILL_YOU_ASK_QUIZ)}
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
              title={t('form.firstCommonConsent.quiz')}
              errorMessage={errorMessage}
              infoMessage={successMessage}
              formId={FORM_IDS.HOW_TO_PARTICIPATE}
              buttonText={
                successMessage ? t('form.firstCommonConsent.next') : undefined
              }
              widgets={
                howToParticipateSelection ? widgetsParticipate : undefined
              }
              onSubmit={(event: any) => {
                const selectedOption = event.formData.how_to_participate

                if (successMessage || howToParticipateSelection) {
                  handleNext(PAGE_ID.RISKS_AND_BENEFITS)
                }

                if (
                  selectedOption &&
                  Object.keys(selectedOption).length === 0
                ) {
                  setErrorMessage(t('form.chooseAnOption'))
                  setSuccessMessage('')
                } else {
                  if (
                    selectedOption.participate_option ===
                    PARTICIPATE_OPTIONS.ANSWER_SURVEY_QUESTIONS
                  ) {
                    setSuccessMessage(t('form.firstCommonConsent.answer'))
                    setErrorMessage('')
                  } else {
                    setErrorMessage(t('form.firstCommonConsent.answer'))
                    setSuccessMessage('')
                  }
                  setHowToParticipateSelection(
                    selectedOption.participate_option,
                  )
                  updateClientData({
                    [FORM_IDS.HOW_TO_PARTICIPATE]:
                      selectedOption.participate_option,
                    [PAGE_ID_FIELD_NAME]: PAGE_ID.RISKS_AND_BENEFITS,
                  })
                }
              }}
            />
          </div>
        </ResponsiveStepWrapper>
      )

    case 4:
      return (
        <ResponsiveStepWrapper>
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="text-step-wrapper">
            <div className="icon-wrapper">
              <RisksBenefits width="75" />
            </div>

            <div className="btm-60">
              <Typography variant="h3">
                {t('form.secondCommonConsent.pageOne.risks&benefit')}
              </Typography>
            </div>

            <Typography variant="h6">
              {t('form.secondCommonConsent.pageOne.risks')}
            </Typography>
            <div className="form-text-content ml-20 bullets">
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageOne.risk1')}
              </Typography>
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageOne.risk2')}
              </Typography>
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageOne.risk3')}
              </Typography>
            </div>
            <Typography variant="h6">
              {t('form.secondCommonConsent.pageOne.benefits')}
            </Typography>
            <div className="form-text-content ml-20 bullets">
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageOne.benefit1')}
              </Typography>
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageOne.benefit2')}
              </Typography>
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageOne.benefit3')}
              </Typography>
            </div>
            <NavigationArrows
              onBack={handleBack}
              onNext={() => handleNext(PAGE_ID.NOT_MEDICAL_CARE)}
              preventBack
            />
          </div>
        </ResponsiveStepWrapper>
      )

    case 5:
      return (
        <ResponsiveStepWrapper>
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="text-step-wrapper">
            <div className="icon-wrapper">
              <NotMedical width="75" />
            </div>

            <Typography variant="h3">
              {t('form.secondCommonConsent.pageThree.notMedicalCare')}
            </Typography>

            <div className="form-text-content">
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageThree.description1')}{' '}
                <a href={ROUTES.CONTACT}>
                  {t('form.secondCommonConsent.pageThree.link')}
                </a>{' '}
                {t('form.secondCommonConsent.pageThree.description2')}
              </Typography>
              <Typography variant="body2">
                <a
                  href={`mailto: ${t(
                    'form.secondCommonConsent.pageThree.email',
                  )}`}
                >
                  {t('form.secondCommonConsent.pageThree.email')}
                </a>
              </Typography>
            </div>
            <NavigationArrows
              onBack={handleBack}
              onNext={() => handleNext(PAGE_ID.STUDY_PURPOSE_QUIZ)}
            />
          </div>
        </ResponsiveStepWrapper>
      )

    case 6:
      return (
        <ResponsiveStepWrapper variant="card">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="quiz-wrapper">
            <SageForm
              title={t('form.secondCommonConsent.pageFour.title')}
              errorMessage={errorMessage}
              infoMessage={successMessage}
              formId={FORM_IDS.WHAT_IS_THE_PURPOSE}
              buttonText={
                successMessage ? t('form.firstCommonConsent.next') : undefined
              }
              widgets={
                whatIsThePurposeSelection ? widgetsWhatIsThePurpose : undefined
              }
              onSubmit={(event: any) => {
                const selectedOption = event.formData.what_is_the_purpose

                if (
                  selectedOption &&
                  Object.keys(selectedOption).length === 0
                ) {
                  setErrorMessage(t('form.chooseAnOption'))
                  setSuccessMessage('')
                } else {
                  if (
                    selectedOption ===
                    WHAT_IS_THE_PURPOSE_OPTIONS.TO_PARTICIPATE_IN_RESEARCH
                  ) {
                    setSuccessMessage(
                      t('form.secondCommonConsent.pageFour.answer'),
                    )
                    setErrorMessage('')
                  } else {
                    setErrorMessage(
                      t('form.secondCommonConsent.pageFour.answer'),
                    )
                    setSuccessMessage('')
                  }
                  if (successMessage || whatIsThePurposeSelection) {
                    handleNext(PAGE_ID.LEAVING_STUDY)
                  } else {
                    setWhatIsThePurposeSelection(selectedOption)
                    updateClientData({
                      [FORM_IDS.WHAT_IS_THE_PURPOSE]: selectedOption,
                      [PAGE_ID_FIELD_NAME]: PAGE_ID.LEAVING_STUDY,
                    })
                  }
                }
              }}
            />
          </div>
        </ResponsiveStepWrapper>
      )

    case 7:
      return (
        <ResponsiveStepWrapper>
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="text-step-wrapper">
            <div className="icon-wrapper">
              <Exit />
            </div>

            <div className="btm-30">
              <Typography variant="h3">
                {t('form.secondCommonConsent.pageFive.leaving')}
              </Typography>
            </div>

            <div className="form-text-content ml-20 bullets">
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageFive.description1')}
              </Typography>
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageFive.description2')}
              </Typography>
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageFive.description3')}
              </Typography>
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageFive.description4')}
              </Typography>
            </div>

            <NavigationArrows
              onBack={handleBack}
              onNext={() => handleNext(PAGE_ID.LEAVING_STUDY_QUIZ)}
              preventBack
            />
          </div>
        </ResponsiveStepWrapper>
      )

    case 8:
      return (
        <ResponsiveStepWrapper variant="card">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="quiz-wrapper">
            <SageForm
              title={t('form.secondCommonConsent.pageSix.title')}
              errorMessage={errorMessage}
              infoMessage={successMessage}
              formId={FORM_IDS.WHICH_IS_CORRECT}
              buttonText={
                successMessage ? t('form.firstCommonConsent.next') : undefined
              }
              widgets={
                whichIsCorrectSelection ? widgetsWhichIsCorrect : undefined
              }
              onSubmit={(event: any) => {
                const selectedOption = event.formData.which_is_correct

                if (
                  selectedOption &&
                  Object.keys(selectedOption).length === 0
                ) {
                  setErrorMessage(t('form.chooseAnOption'))
                  setSuccessMessage('')
                } else {
                  if (
                    selectedOption ===
                    WHICH_IS_CORRECT_OPTIONS.I_CAN_STOP_AT_ANY_TIME
                  ) {
                    setSuccessMessage(
                      t('form.secondCommonConsent.pageSix.answer'),
                    )
                    setErrorMessage('')
                  } else {
                    setErrorMessage(
                      t('form.secondCommonConsent.pageSix.answer'),
                    )
                    setSuccessMessage('')
                  }

                  if (successMessage || whichIsCorrectSelection) {
                    handleNext(PAGE_ID.YOUR_STUDY_DATA)
                  } else {
                    setWhichIsCorrectSelection(selectedOption)
                    updateClientData({
                      [FORM_IDS.WHICH_IS_CORRECT]: selectedOption,
                      [PAGE_ID_FIELD_NAME]: PAGE_ID.YOUR_STUDY_DATA,
                    })
                  }
                }
              }}
            />
          </div>
        </ResponsiveStepWrapper>
      )

    case 9:
      return (
        <ResponsiveStepWrapper>
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="text-step-wrapper">
            <div className="icon-wrapper">
              <Questions />
            </div>
            <Typography variant="h3">
              {t('form.firstCommonConsent.yourStudyData')}
            </Typography>
            <Typography variant="h6">
              {t('form.firstCommonConsent.yourStudyDataIs')}
            </Typography>
            <div className="bullets ml-10 btm-30">
              <Typography variant="body2">
                {t('form.firstCommonConsent.shareDatawithMindKind')}
              </Typography>
              <Typography variant="body2">
                {t('form.firstCommonConsent.dataPermission')}
              </Typography>
            </div>
            <div className="btm-30">
              <Typography variant="body2">
                {t('form.firstCommonConsent.notSharePhoneData')}
              </Typography>
            </div>
            <Typography variant="body2">
              {t('form.firstCommonConsent.dataDisclaimer')}
            </Typography>
            <NavigationArrows
              onBack={handleBack}
              onNext={() => handleNext(PAGE_ID.DATA_COLLECTION)}
            />
          </div>
        </ResponsiveStepWrapper>
      )

    case 10:
      return (
        <ResponsiveStepWrapper>
          <ProgressBar step={step} maxSteps={maxSteps} />

          <div className="text-step-wrapper">
            <div className="icon-wrapper">
              <Padlock />
            </div>
            <Typography variant="h3">
              {t('form.firstCommonConsent.dataCollection')}
            </Typography>

            <div className="btm-10">
              <Typography variant="body2" className="bottom-space">
                {t('form.firstCommonConsent.dataCollectionEncrypted')}
              </Typography>
            </div>
            <div className="btm-10">
              <Typography variant="body2" className=" bottom-space">
                {t('form.firstCommonConsent.dataCollectionIdentity')}
              </Typography>
            </div>
            <div className="btm-10">
              <Typography variant="body2" className="bottom-space">
                {t('form.firstCommonConsent.dataCollectionCombined')}
              </Typography>
            </div>
            <NavigationArrows
              onBack={handleBack}
              onNext={() => handleNext(PAGE_ID.DATA_RIGHTS)}
              preventBack
            />
          </div>
        </ResponsiveStepWrapper>
      )

    case 11:
      return (
        <ResponsiveStepWrapper>
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="text-step-wrapper">
            <div className="icon-wrapper">
              <Network />
            </div>
            <Typography variant="h3">
              {t('form.firstCommonConsent.yourDataRights')}
            </Typography>
            <Typography variant="h6">
              {t('form.firstCommonConsent.yourRights')}
            </Typography>
            <ul className="bullets">
              <li>
                <Typography variant="body2">
                  {t('form.firstCommonConsent.requestData')}
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  {t('form.firstCommonConsent.correctData')}
                </Typography>
              </li>
            </ul>
            <Typography variant="body2">
              {t('form.firstCommonConsent.privacyPolicyText')}
              <a
                href={PolicyEnglish}
                target="_blank"
                rel="noopener noreferrer"
                className="underlined-link-inline"
              >
                <div className="btm-20 underlined-link-inline">
                  {t('form.firstCommonConsent.privacyPolicyLink')}
                </div>
              </a>
            </Typography>
            <Typography variant="body2">
              {t('form.firstCommonConsent.ifCitizenEU')}{' '}
              <a
                className="underlined-link"
                href={ROUTES.DATA_REGULATION}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('form.firstCommonConsent.ifCitizenEULink')}
              </a>
            </Typography>
            <NavigationArrows
              onBack={handleBack}
              onNext={() => handleComplete(getNextPageName())}
            />
          </div>
        </ResponsiveStepWrapper>
      )
  }
  return null
}

export default AboutTheStudy
