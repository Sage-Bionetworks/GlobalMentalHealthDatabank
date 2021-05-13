import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@material-ui/core'
import moment from 'moment'
import i18next from 'i18next'
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
import RankedChoiceSummary from '../RankedChoiceSummary'
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
  const [whatIsThePurposeSelection, setWhatIsThePurposeSelection] = useState(
    undefined,
  )
  const [whichIsCorrectSelection, setWhichIsCorrectSelection] = useState(
    undefined,
  )
  const [consented, setConsented] = useState(false)
  const [signatureName, setSignatureName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const { t } = useTranslation()

  const CustomRadioWhatIsThePurpose = ({ options, value, onChange }: any) => {
    const { enumOptions } = options
    const _onChange = (event: any) => onChange(event.currentTarget.id)
    return enumOptions.map((option: any) => {
      return (
        <div
          className={
            'quiz-radio-wrapper ' +
            (option.value ===
            WHAT_IS_THE_PURPOSE_OPTIONS.TO_PARTICIPATE_IN_RESEARCH
              ? 'radio correct'
              : '')
          }
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
    return enumOptions.map((option: any) => {
      return (
        <div
          className={
            'quiz-radio-wrapper ' +
            (option.value === WHICH_IS_CORRECT_OPTIONS.I_CAN_STOP_AT_ANY_TIME
              ? 'radio correct'
              : '')
          }
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
        updateClientDataResponse = await updateClientData(step, {
          skipRanking: false,
          consented: true,
        })
      } else {
        updateClientDataResponse = await updateClientData(step, {
          skipRanking: true,
          consented: true,
        })
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

  const handleNext = () => {
    setStep((current: number) => (current < maxSteps ? current + 1 : current))
    updateClientData(step)
  }
  const handleBack = () =>
    setStep((current: number) => (current > 1 ? current - 1 : current))

  switch (step) {
    case startingStep: {
      return (
        <ResponsiveStepWrapper>
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="text-step-wrapper">
            <div className="icon-wrapper">
              <RisksBenefits width="75" />
            </div>
            <div className="header-wrapper">
              <Typography variant="h3">
                {t('form.secondCommonConsent.pageOne.risks&benefit')}
              </Typography>
            </div>
            <Typography variant="h6">
              {t('form.secondCommonConsent.pageOne.risks')}
            </Typography>
            <div className="form-text-content">
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageOne.riskDescription')}
              </Typography>
            </div>
            <Typography variant="h6">
              {t('form.secondCommonConsent.pageOne.benefits')}
            </Typography>
            <div className="form-text-content">
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageOne.benefitDescription')}
              </Typography>
            </div>
            <NavigationArrows
              onBack={handleBack}
              onNext={handleNext}
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
              <NotMedical />
            </div>
            <div className="header-wrapper">
              <Typography variant="h3">
                {t('form.secondCommonConsent.pageThree.notMedicalCare')}
              </Typography>
            </div>
            <div className="form-text-content">
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageThree.description')}
              </Typography>
            </div>
            <a href={t('form.secondCommonConsent.pageThree.link')}>
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageThree.link')}
              </Typography>
            </a>
            <NavigationArrows onBack={handleBack} onNext={handleNext} />
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
                    updateClientData(step, {
                      [FORM_IDS.WHAT_IS_THE_PURPOSE]: selectedOption,
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
            <div className="header-wrapper">
              <Typography variant="h3">
                {t('form.secondCommonConsent.pageFive.leaving')}
              </Typography>
            </div>
            <div className="form-text-content">
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageFive.description')}
              </Typography>
            </div>
            <NavigationArrows
              onBack={handleBack}
              onNext={handleNext}
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
                    updateClientData(step, {
                      [FORM_IDS.WHICH_IS_CORRECT]: selectedOption,
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
            <div className="header-wrapper">
              <Typography variant="h3">
                {t('form.secondCommonConsent.pageSeven.contact')}
              </Typography>
            </div>
            <div className="form-text-content">
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageSeven.description')}
              </Typography>
            </div>
            <NavigationArrows
              onBack={handleBack}
              onNext={handleNext}
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
            <div className="header-wrapper">
              <Typography variant="h3">
                {t('form.secondCommonConsent.pageEight.summary')}
              </Typography>
            </div>
            <div className="form-text-content">
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageEight.description')}
              </Typography>
            </div>
            <NavigationArrows onBack={handleBack} onNext={handleNext} />
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
            <div className="header-wrapper">
              <Typography variant="h3">
                {t('form.consentSignature.title')}
              </Typography>
            </div>
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

            <input
              className="custom-input signature"
              type="text"
              value={signatureName}
              placeholder={t('form.consentSignature.fullName')}
              onChange={e => setSignatureName(e.target.value)}
            />

            <Button
              type="button"
              variant="contained"
              fullWidth
              color="primary"
              onClick={() => signConsent()}
              disabled={!consented || signatureName.length < 5}
            >
              {t('form.submit')}
            </Button>
          </div>
        </ResponsiveStepWrapper>
      )

    case startingStep + 8: {
      return (
        <ResponsiveStepWrapper>
          <ProgressBar step={step} maxSteps={maxSteps} />
          <div className="text-step-wrapper">
            <RankedChoice
              step={step}
              setStep={setStep}
              updateClientData={updateClientData}
            />
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
