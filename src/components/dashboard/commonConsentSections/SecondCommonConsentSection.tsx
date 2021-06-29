import React, { useEffect, useState } from 'react'
import moment from 'moment'
import i18next from 'i18next'
import { Button, Typography, TextField } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import SageForm from '../../form/SageForm'
import ProgressBar from '../../progressBar/ProgressBar'
import {
  WHAT_IS_THE_PURPOSE_OPTIONS,
  WHICH_IS_CORRECT_OPTIONS,
  WHO_CONTROLS_DATA_OPTIONS,
  FORM_IDS,
} from '../../form/types'
import RankedChoice from '../RankedChoice/RankedChoice'
import RankedChoiceSummary from '../RankedChoice/RankedChoiceSummary'
import { ConsentService } from '../../../services/consent.service'
import { HealthService } from '../../../services/health.service'
import { UserService } from '../../../services/user.service'
import { useSessionDataState } from '../../../AuthContext'
import NavigationArrows from '../../common/NavigationArrows'
import ResponsiveStepWrapper from '../../common/ResponsiveStepWrapper'
import { ReactComponent as LogoNoText } from '../../../assets/logo-no-text.svg'
import { ReactComponent as RisksBenefits } from '../../../assets/consent/risksBenefits.svg'
import { ReactComponent as Summary } from '../../../assets/consent/summary.svg'
import { ReactComponent as Envelope } from '../../../assets/consent/envelope.svg'
import { ReactComponent as Exit } from '../../../assets/consent/exit.svg'
import { ReactComponent as NotMedical } from '../../../assets/consent/notMedical.svg'
import { FLOW_OPTIONS } from '../../../helpers/RandomFlowGenerator'
import {
  PAGE_ID_FIELD_NAME,
  PAGE_ID,
  ROUTES,
} from '../../../constants/constants'

type SecondCommonConsentProps = {
  startingStep: number
  step: number
  setStep: Function
  maxSteps: number
  updateClientData: Function
}

function SecondCommonConsentSection({
  startingStep,
  step,
  setStep,
  maxSteps,
  updateClientData,
}: SecondCommonConsentProps) {
  const [whatIsThePurposeSelection, setWhatIsThePurposeSelection] =
    useState(undefined)
  const [whichIsCorrectSelection, setWhichIsCorrectSelection] =
    useState(undefined)
  const [consented, setConsented] = useState(false)
  const [signatureName, setSignatureName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const [showVolunteer, setShowVolunteer] = useState(undefined as any)
  const { t } = useTranslation()

  const CustomRadioWhatIsThePurpose = ({ options, value, onChange }: any) => {
    const { enumOptions } = options
    const _onChange = (event: any) => onChange(event.currentTarget.id)
    return enumOptions.map((option: any, index: number) => {
      return (
        <div
          className={
            'quiz-radio-wrapper ' +
            (option.value ===
            WHAT_IS_THE_PURPOSE_OPTIONS.TO_PARTICIPATE_IN_RESEARCH
              ? 'radio correct'
              : '')
          }
          key={`quiz-radio-wrapper-${index}`}
        >
          <input
            type="radio"
            id={option.value}
            checked={
              option.value === whatIsThePurposeSelection ||
              option.value ===
                WHAT_IS_THE_PURPOSE_OPTIONS.TO_PARTICIPATE_IN_RESEARCH
                ? true
                : false
            }
            onChange={_onChange as any}
          />
          <div
            id={`label-${option.value}`}
            dangerouslySetInnerHTML={{ __html: option.label }}
            className={
              'radio-button-label' +
              (option.value === whatIsThePurposeSelection &&
              option.value !==
                WHAT_IS_THE_PURPOSE_OPTIONS.TO_PARTICIPATE_IN_RESEARCH
                ? ' error-message wrong-opt'
                : ' correct-opt')
            }
          />
        </div>
      )
    })
  }

  const widgetsWhatIsThePurpose = {
    RadioWidget: CustomRadioWhatIsThePurpose,
  }

  const CustomRadioWhichIsCorrect = ({ options, value, onChange }: any) => {
    const { enumOptions } = options
    const _onChange = (event: any) => onChange(event.currentTarget.id)
    return enumOptions.map((option: any, index: number) => {
      return (
        <div
          className={
            'quiz-radio-wrapper ' +
            (option.value === WHICH_IS_CORRECT_OPTIONS.I_CAN_STOP_AT_ANY_TIME
              ? 'radio correct'
              : '')
          }
          key={`quiz-radio-wrapper-${index}`}
        >
          <input
            type="radio"
            id={option.value}
            checked={
              option.value === whichIsCorrectSelection ||
              option.value === WHICH_IS_CORRECT_OPTIONS.I_CAN_STOP_AT_ANY_TIME
                ? true
                : false
            }
            onChange={_onChange as any}
          />
          <div
            id={`label-${option.value}`}
            dangerouslySetInnerHTML={{ __html: option.label }}
            className={
              'radio-button-label' +
              (option.value === whichIsCorrectSelection &&
              option.value !== WHICH_IS_CORRECT_OPTIONS.I_CAN_STOP_AT_ANY_TIME
                ? ' error-message wrong-opt'
                : ' correct-opt')
            }
          />
        </div>
      )
    })
  }

  const widgetsWhichIsCorrect = {
    RadioWidget: CustomRadioWhichIsCorrect,
  }

  useEffect(() => {
    setSuccessMessage('')
    setErrorMessage('')
    setSignatureName('')
    setConsented(false)
  }, [step])

  const sessionData = useSessionDataState()
  const { token } = sessionData

  const getUserVolunteerAnswer = async () => {
    if (!token) return
    const userInfoResponse = await UserService.getUserInfo(token)
    const { clientData } = userInfoResponse?.data as any
    if (
      clientData?.whoControlsData ===
      WHO_CONTROLS_DATA_OPTIONS.VOLUNTEER_COMMUNITY_REVIEW_PANEL
    ) {
      setShowVolunteer(true)
    } else {
      setShowVolunteer(false)
    }
  }

  const signConsent = async () => {
    if (!token) return
    try {
      await ConsentService.signGeneralConsent(
        signatureName,
        'all_qualified_researchers',
        token,
      )

      const userInfoResponse = await UserService.getUserInfo(token)
      const { clientData } = userInfoResponse?.data as any
      let updateClientDataResponse = undefined

      if (
        [FLOW_OPTIONS.TWO, FLOW_OPTIONS.THREE].includes(
          clientData.consentModel,
        ) ||
        (clientData.consentModel === FLOW_OPTIONS.FOUR &&
          clientData.whoControlsData === WHO_CONTROLS_DATA_OPTIONS.DEMOCRACY)
      ) {
        //go to steps after consent (ranking)
        updateClientDataResponse = await updateClientData(step + 1, {
          skipRanking: false,
          consented: true,
          [PAGE_ID_FIELD_NAME]: PAGE_ID.RANKING_CHOICE,
        })
      } else {
        if (
          clientData.consentModel === FLOW_OPTIONS.FOUR &&
          clientData.whoControlsData ===
            WHO_CONTROLS_DATA_OPTIONS.VOLUNTEER_COMMUNITY_REVIEW_PANEL
        ) {
          updateClientDataResponse = await updateClientData(step + 1, {
            skipRanking: false,
            consented: true,
            [PAGE_ID_FIELD_NAME]: PAGE_ID.COMMUNITY_PANEL,
          })
        } else {
          updateClientDataResponse = await updateClientData(step + 1, {
            skipRanking: true,
            consented: true,
            [PAGE_ID_FIELD_NAME]: PAGE_ID.APP_DOWNLOAD,
          })
        }
      }
      await HealthService.sendHealthData(
        token,
        updateClientDataResponse.data.clientData,
      )
      setStep((current: number) => (current < maxSteps ? current + 1 : current))
    } catch (e) {
      setErrorMessage(e.message)
    }
  }

  const handleNext = (pageId: string | undefined) => {
    setStep((current: number) => (current < maxSteps ? current + 1 : current))
    updateClientData(step + 1, { [PAGE_ID_FIELD_NAME]: pageId })
  }
  const handleBack = () =>
    setStep((current: number) => (current > 1 ? current - 1 : current))

  window.scrollTo(0, 0)

  switch (step) {
    case startingStep: {
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
    }
    case startingStep + 1: {
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
    }

    case startingStep + 2: {
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
                    setStep((current: number) =>
                      current < maxSteps ? current + 1 : current,
                    )
                  } else {
                    setWhatIsThePurposeSelection(selectedOption)
                    updateClientData(step + 1, {
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
    }
    case startingStep + 3: {
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
    }
    case startingStep + 4: {
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
                    setStep((current: number) =>
                      current < maxSteps ? current + 1 : current,
                    )
                  } else {
                    setWhichIsCorrectSelection(selectedOption)
                    updateClientData(step + 1, {
                      [FORM_IDS.WHICH_IS_CORRECT]: selectedOption,
                      [PAGE_ID_FIELD_NAME]: PAGE_ID.CONTACT,
                    })
                  }
                }
              }}
            />
          </div>
        </ResponsiveStepWrapper>
      )
    }
    case startingStep + 5: {
      return (
        <ResponsiveStepWrapper>
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="text-step-wrapper">
            <div className="icon-wrapper">
              <Envelope />
            </div>

            <Typography variant="h3">
              {t('form.secondCommonConsent.pageSeven.contact')}
            </Typography>

            <div className="form-text-content">
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageSeven.description')}
              </Typography>
            </div>
            <NavigationArrows
              onBack={handleBack}
              onNext={() => handleNext(PAGE_ID.SUMMARY)}
              preventBack
            />
          </div>
        </ResponsiveStepWrapper>
      )
    }
    case startingStep + 6: {
      return (
        <ResponsiveStepWrapper>
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="text-step-wrapper">
            <div className="icon-wrapper">
              <Summary />
            </div>

            <Typography variant="h3">
              {t('form.secondCommonConsent.pageEight.summary')}
            </Typography>

            <div className="form-text-content">
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageEight.description')}
              </Typography>
            </div>
            <NavigationArrows
              onBack={handleBack}
              onNext={() => handleNext(PAGE_ID.SIGNATURE)}
            />
          </div>
        </ResponsiveStepWrapper>
      )
    }

    case startingStep + 7:
      return (
        <ResponsiveStepWrapper variant="card">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="text-step-wrapper">
            <div className="icon-wrapper">
              <LogoNoText />
            </div>

            <Typography variant="h3">
              {t('form.consentSignature.title')}
            </Typography>

            <Typography variant="body2">
              {t('form.consentSignature.pleaseCheck.text1')}{' '}
              <b>{t('form.consentSignature.pleaseCheck.check')}</b>{' '}
              {t('form.consentSignature.pleaseCheck.if')}{' '}
              <b>{t('form.consentSignature.pleaseCheck.agree')}</b>{' '}
              {t('form.consentSignature.pleaseCheck.takePart')}
            </Typography>

            <span className="consent-wrapper">
              <input
                type="checkbox"
                id="consented"
                className="signature-checkbox"
                value="consented"
                onClick={() => setConsented(prev => !prev)}
              />
              <div>
                <Typography variant="h6">
                  {t('form.consentSignature.agreement')}
                </Typography>
              </div>
            </span>

            <Typography variant="h6">
              {moment().locale(i18next.language).format('MMMM Do, YYYY')}
            </Typography>

            <TextField
              className="custom-input signature"
              variant="outlined"
              placeholder={t('form.consentSignature.fullName')}
              value={signatureName}
              onChange={e => setSignatureName(e.target.value)}
            />

            <Button
              fullWidth
              className="wide-button"
              color="primary"
              variant="contained"
              onClick={() => signConsent()}
              disabled={!consented || signatureName.length < 5}
            >
              {t('form.submit')}
            </Button>
          </div>
        </ResponsiveStepWrapper>
      )

    case startingStep + 8: {
      getUserVolunteerAnswer()
      return (
        <ResponsiveStepWrapper>
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="text-step-wrapper">
            {showVolunteer === true && (
              <>
                <Typography variant="h3">
                  {t('form.secondCommonConsent.volunteer.ifYouLike')}
                </Typography>
                <Typography variant="body1">
                  {t('form.secondCommonConsent.volunteer.email')}
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '20px' }}>
                  {t('form.secondCommonConsent.volunteer.subject')}
                </Typography>
                <Typography variant="body2">
                  {t('form.secondCommonConsent.volunteer.note')}
                </Typography>
                <NavigationArrows
                  preventBack
                  onNext={() =>
                    updateClientData(step + 1, {
                      skipRanking: true,
                      [PAGE_ID_FIELD_NAME]: PAGE_ID.APP_DOWNLOAD,
                    })
                  }
                />
              </>
            )}
            {showVolunteer === false && (
              <RankedChoice
                step={step}
                setStep={setStep}
                updateClientData={updateClientData}
              />
            )}
          </div>
        </ResponsiveStepWrapper>
      )
    }

    case maxSteps: {
      return (
        <ResponsiveStepWrapper>
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="text-step-wrapper">
            <RankedChoiceSummary
              step={step}
              setStep={setStep}
              updateClientData={updateClientData}
            />
          </div>
        </ResponsiveStepWrapper>
      )
    }

    default:
      return null
  }
}

export default SecondCommonConsentSection
