import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Typography, TextField } from '@material-ui/core'
import moment from 'moment'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { cloneDeep } from 'lodash'
import {
  NavigationArrows,
  ProgressBar,
  ResponsiveStepWrapper,
} from 'components/common'
import { PAGE_ID_FIELD_NAME, PAGE_ID, ROUTES } from 'constants/constants'
import { ConsentService } from 'services/consent.service'
import { HealthService } from 'services/health.service'
import { UserService } from 'services/user.service'
import { useSessionDataState } from 'AuthContext'
import { Checkpoint } from 'types/types'
import { ReactComponent as Summary } from 'assets/consent/summary.svg'
import { ReactComponent as Envelope } from 'assets/consent/envelope.svg'
import { ReactComponent as LogoNoText } from 'assets/logo-no-text.svg'
import ConsentEnglish from '../../assets/consent_docs/consent_english.pdf'

type Props = {
  checkpoint?: Checkpoint
  maxSteps?: number
  updateClientData: Function
}

function SummaryAndSignature({
  checkpoint,
  maxSteps = 4,
  updateClientData,
}: Props) {
  const history = useHistory()
  const { t } = useTranslation()
  const { token } = useSessionDataState()
  const [consented, setConsented] = useState(false)
  const [signatureName, setSignatureName] = useState('')
  const step = checkpoint?.summaryAndSignature?.step || 1
  useEffect(() => {
    setSignatureName('')
    setConsented(false)
  }, [checkpoint])

  const handleNext = (pageId: string | undefined) => {
    if (checkpoint) {
      const nextStep = step < maxSteps ? step + 1 : step
      const newCheckpoint = cloneDeep(checkpoint)
      newCheckpoint.summaryAndSignature.step = nextStep
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
      newCheckpoint.summaryAndSignature.step = prevStep
      updateClientData({
        checkpoint: newCheckpoint,
      })
    }
  }

  const handleBackToHub = (fields: object = {}) => {
    if (checkpoint) {
      const newCheckpoint = cloneDeep(checkpoint)
      newCheckpoint.summaryAndSignature.status = 'started'
      newCheckpoint.summaryAndSignature.step = 1
      updateClientData({
        ...fields,
        checkpoint: newCheckpoint,
      })
      history.push(ROUTES.HUB)
    }
  }

  const handleComplete = () => {
    if (checkpoint) {
      const nextStep = step < maxSteps ? step + 1 : step
      const newCheckpoint = cloneDeep(checkpoint)
      newCheckpoint.summaryAndSignature.step = nextStep
      newCheckpoint.summaryAndSignature.status = 'complete'
      updateClientData({
        checkpoint: newCheckpoint,
        consented: true,
      })
      history.push(ROUTES.DOWNLOAD)
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

      await HealthService.sendHealthData(token, clientData)
      handleComplete()
    } catch (e) {
      console.log(e.message)
    }
  }

  window.scrollTo(0, 0)

  switch (step) {
    case 1:
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
              onBack={handleBackToHub}
              onNext={() => handleNext(PAGE_ID.CONTACT)}
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

    case 3:
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
            <Typography variant="body2">
              {t('form.consentSignature.youCanDownloadInfo')}{' '}
              <div className="btm-20 underlined-link">
                <a
                  href={ConsentEnglish}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underlined-link"
                >
                  {t('form.consentSignature.youCanDownloadInfoLinkText')}
                </a>
                .
              </div>
            </Typography>

            <Button
              fullWidth
              className="wide-button"
              color="primary"
              variant="contained"
              onClick={signConsent}
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
