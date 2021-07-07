import React, { useState, useEffect } from 'react'
import { Button, Typography, TextField } from '@material-ui/core'
import moment from 'moment'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import {
  NavigationArrows,
  ProgressBar,
  ResponsiveStepWrapper,
} from 'components/common'
import { PAGE_ID_FIELD_NAME, PAGE_ID } from 'constants/constants'
import { ConsentService } from 'services/consent.service'
import { HealthService } from 'services/health.service'
import { UserService } from 'services/user.service'
import { useSessionDataState } from 'AuthContext'
import { ReactComponent as Summary } from 'assets/consent/summary.svg'
import { ReactComponent as Envelope } from 'assets/consent/envelope.svg'
import { ReactComponent as LogoNoText } from 'assets/logo-no-text.svg'

type Props = {
  startingStep?: number
  step?: number
  setStep?: Function
  maxSteps?: number
  updateClientData?: Function
}

function SummaryAndSignature({
  startingStep = 11,
  // step,
  // setStep,
  maxSteps = 14,
  updateClientData = console.log,
}: Props) {
  const { t } = useTranslation()
  const [step, setStep] = useState(12)
  const { token } = useSessionDataState()
  const [consented, setConsented] = useState(false)
  const [signatureName, setSignatureName] = useState('')

  useEffect(() => {
    setSignatureName('')
    setConsented(false)
  }, [step])

  const handleNext = (pageId: string | undefined) => {
    setStep((current: number) => (current < maxSteps ? current + 1 : current))
    updateClientData(step + 1, { [PAGE_ID_FIELD_NAME]: pageId })
  }
  const handleBack = () =>
    setStep((current: number) => (current > 1 ? current - 1 : current))

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

      await HealthService.sendHealthData(token, clientData)
      setStep((current: number) => (current < maxSteps ? current + 1 : current))
    } catch (e) {
      console.log(e.message)
    }
  }

  window.scrollTo(0, 0)

  switch (step) {
    case startingStep + 1:
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

            <div className="btm-10">
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageEight.description1')}
              </Typography>
            </div>

            <div className="bullets ml-10">
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageEight.description2')}
              </Typography>
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageEight.description3')}
              </Typography>
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageEight.description4')}
              </Typography>
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageEight.description5')}
              </Typography>
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageEight.description6')}
              </Typography>
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageEight.description7')}
              </Typography>
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageEight.description8')}
              </Typography>
              <Typography variant="body2">
                {t('form.secondCommonConsent.pageEight.description9')}
              </Typography>
            </div>

            <NavigationArrows
              onBack={handleBack}
              onNext={() => handleNext(PAGE_ID.CONTACT)}
            />
          </div>
        </ResponsiveStepWrapper>
      )

    case startingStep + 2:
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
              onNext={() => handleNext(PAGE_ID.SIGNATURE)}
              preventBack
            />
          </div>
        </ResponsiveStepWrapper>
      )

    case startingStep + 3:
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

    default:
      return null
  }
}

export default SummaryAndSignature
