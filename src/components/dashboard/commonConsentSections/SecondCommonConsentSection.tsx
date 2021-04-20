import React, { useEffect, useState } from 'react'
import ProgressBar from '../../progressBar/ProgressBar'
import { ReactComponent as LogoNoText } from '../../../assets/logo-no-text.svg'
import { ReactComponent as ArrowButtonLeft } from '../../../assets/arrow_button_left.svg'
import { ReactComponent as ArrowButtonRight } from '../../../assets/arrow_button_right.svg'
import Button from '@material-ui/core/Button/Button'
import moment from 'moment'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import SageForm from '../../form/SageForm'
import { FORM_IDS } from '../../form/types'
import RankChoice from '../RankChoice/RankChoice'

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
  const [consented, setConsented] = useState(false)
  const [signatureName, setSignatureName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { t } = useTranslation()

  useEffect(() => {
    setErrorMessage('')
    setSignatureName('')
    setConsented(false)
  }, [step])

  const renderArrows = (preventBack?: boolean) => {
    return (
      <div className="arrowButtonsWrapper">
        <ArrowButtonLeft
          style={{ visibility: preventBack ? 'hidden' : 'visible' }}
          onClick={() =>
            setStep((current: number) => (current > 1 ? current - 1 : current))
          }
        />
        <ArrowButtonRight
          onClick={() => {
            setStep((current: number) =>
              current < maxSteps ? current + 1 : current,
            )
            updateClientData(step)
          }}
        />
      </div>
    )
  }

  switch (step) {
    case startingStep: {
      return (
        <div className="textStepWrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <LogoNoText />
          <div className="headerWrapper">
            <h1>{t('form.secondCommonConsent.pageOne.risks&benefit')}</h1>
          </div>
          <h2>{t('form.secondCommonConsent.pageOne.risks')}</h2>
          <div className="form-text-content">
            {t('form.secondCommonConsent.pageOne.riskDescription')}
          </div>
          <h2>{t('form.secondCommonConsent.pageOne.benefits')}</h2>
          <div className="form-text-content">
            {t('form.secondCommonConsent.pageOne.benefitDescription')}
          </div>
          {renderArrows()}
        </div>
      )
    }
    case startingStep + 1: {
      return (
        <div className="textStepWrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <LogoNoText />
          <div className="headerWrapper">
            <h1>{t('form.secondCommonConsent.pageTwo.costs&payment')}</h1>
          </div>
          <div className="form-text-content">
            {t('form.secondCommonConsent.pageTwo.description')}
          </div>
          {renderArrows()}
        </div>
      )
    }
    case startingStep + 2: {
      return (
        <div className="textStepWrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <LogoNoText />
          <div className="headerWrapper">
            <h1>{t('form.secondCommonConsent.pageThree.notMedicalCare')}</h1>
          </div>
          <div className="form-text-content">
            {t('form.secondCommonConsent.pageThree.description')}
          </div>
          <a href={t('form.secondCommonConsent.pageThree.link')}>
            {t('form.secondCommonConsent.pageThree.link')}
          </a>
          {renderArrows()}
        </div>
      )
    }

    case startingStep + 3: {
      return (
        <div className="quizWrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <SageForm
            title={t('form.secondCommonConsent.pageFour.title')}
            errorMessage={errorMessage}
            formId={FORM_IDS.WHAT_IS_THE_PURPOSE}
            onSubmit={(event: any) => {
              const selectedOption = event.formData.what_is_the_purpose
              if (!selectedOption) {
                setErrorMessage(t('form.chooseAnOption'))
                window.scrollTo(0, 0)
              } else {
                updateClientData(
                  step,
                  FORM_IDS.WHAT_IS_THE_PURPOSE,
                  selectedOption,
                )
                setStep((current: number) =>
                  current < maxSteps ? current + 1 : current,
                )
              }
            }}
          />
        </div>
      )
    }
    case startingStep + 4: {
      return (
        <div className="textStepWrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <LogoNoText />
          <div className="headerWrapper">
            <h1>{t('form.secondCommonConsent.pageFive.leaving')}</h1>
          </div>
          <div className="form-text-content">
            {t('form.secondCommonConsent.pageFive.description')}
          </div>
          {renderArrows()}
        </div>
      )
    }
    case startingStep + 5: {
      return (
        <div className="quizWrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <SageForm
            title={t('form.secondCommonConsent.pageSix.title')}
            errorMessage={errorMessage}
            formId={FORM_IDS.WHICH_IS_CORRECT}
            onSubmit={(event: any) => {
              const selectedOption = event.formData.which_is_correct
              if (!selectedOption) {
                setErrorMessage(t('form.chooseAnOption'))
                window.scrollTo(0, 0)
              } else {
                updateClientData(
                  step,
                  FORM_IDS.WHICH_IS_CORRECT,
                  selectedOption,
                )
                setStep((current: number) =>
                  current < maxSteps ? current + 1 : current,
                )
              }
            }}
          />
        </div>
      )
    }
    case startingStep + 6: {
      return (
        <div className="textStepWrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <LogoNoText />
          <div className="headerWrapper">
            <h1>{t('form.secondCommonConsent.pageSeven.contact')}</h1>
          </div>
          <div className="form-text-content">
            {t('form.secondCommonConsent.pageSeven.description')}
          </div>
          {renderArrows()}
        </div>
      )
    }
    case startingStep + 7: {
      return (
        <div className="textStepWrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <LogoNoText />
          <div className="headerWrapper">
            <h1>{t('form.secondCommonConsent.pageEight.summary')}</h1>
          </div>
          <div className="form-text-content">
            {t('form.secondCommonConsent.pageEight.description')}
          </div>
          {renderArrows()}
        </div>
      )
    }
    case startingStep + 8: {
      return (
        <div className="textStepWrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <LogoNoText />
          <RankChoice />
          <div className="form-text-content"></div>
          {renderArrows()}
        </div>
      )
    }

    case maxSteps:
      return (
        <div className="textStepWrapper">
          <ProgressBar step={step} maxSteps={maxSteps} />
          <LogoNoText />
          <div className="headerWrapper">
            <h1>{t('form.consentSignature.title')}</h1>
          </div>
          <h3>
            {t('form.consentSignature.pleaseCheck.text1')}{' '}
            <b>{t('form.consentSignature.pleaseCheck.check')}</b>
            {t('form.consentSignature.pleaseCheck.if')}{' '}
            <b>{t('form.consentSignature.pleaseCheck.agree')}</b>{' '}
            {t('form.consentSignature.pleaseCheck.takePart')}
          </h3>
          <span className="consentWrapper">
            <input
              type="checkbox"
              id="consented"
              value="consented"
              onClick={() => setConsented(prev => !prev)}
            />
            <div>
              <b>{t('form.consentSignature.agreement')}</b>
            </div>
          </span>

          <h2>{moment().locale(i18next.language).format('MMMM Do, YYYY')}</h2>

          <fieldset className="consent-signature">
            <legend>{t('form.consentSignature.fullName')}</legend>
            <input
              type="text"
              value={signatureName}
              onChange={e => {
                setSignatureName(e.target.value)
              }}
            ></input>
          </fieldset>

          <Button
            type="button"
            variant="contained"
            fullWidth
            color="primary"
            onClick={() => setStep(1)}
            disabled={!consented || signatureName.length < 5}
          >
            {t('form.submit')}
          </Button>
        </div>
      )
    default:
      return null
  }
}

export default SecondCommonConsentSection
