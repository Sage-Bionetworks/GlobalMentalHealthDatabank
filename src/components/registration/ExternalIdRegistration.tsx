import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Button, TextField } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert/Alert'
import { getCountryCode, getPhoneLength } from 'helpers/utility'
import { useEligibility } from '../eligibility/context/EligibilityContext'
import { ReactComponent as TextSent } from 'assets/text_sent.svg'
import { createRegistrationData } from './utils'
import {
  signUpWithExternalId,
  signInWithExternalId,
} from 'services/auth.service'
import { EXTERNAL_ID_SALT, SUB_STUDY_ID } from 'constants/constants'
import useAuth from 'helpers/hooks/useAuth'

function ExternalIdRegistration() {
  const eligibility = useEligibility()
  const { whereDoYouLive, setPhoneNumber } = eligibility
  const { t } = useTranslation()
  const { loginDispatch } = useAuth()

  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [error, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = createRegistrationData(eligibility)
    data.externalIds = { [SUB_STUDY_ID]: phone }
    data.password = `${EXTERNAL_ID_SALT}${code}`

    try {
      const result = await signUpWithExternalId(data)
      if (result.status === 201) {
        setErrorMessage('')
        const loggedIn = await signInWithExternalId(phone, data.password)
        loginDispatch(loggedIn, setErrorMessage)
        setPhoneNumber(phone)
      } else {
        setErrorMessage(t('eligibility.registerError'))
      }
    } catch (e) {
      setErrorMessage(`${t('eligibility.registerError')}`)
    }
  }

  const phoneLength = getPhoneLength(whereDoYouLive)
  const codeLength = 6
  return (
    <div className="quiz-wrapper">
      <div className="media-wrapper text-left">
        <div className="icon-wrapper">
          <TextSent width="75" />
        </div>
      </div>

      <div className="btm-20">
        <Typography variant="h4">{t('eligibility.letsRegister')}</Typography>
      </div>

      <div className="btm-30">
        <Typography variant="body2">
          {t('eligibility.enterNumberIndia')}
        </Typography>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <div>
            <label htmlFor="phone" className="block--dark">
              <Typography variant="h6">{t('eligibility.myPhone')}</Typography>
            </label>
            <div className="btm-40 phone-input">
              <div className="country-code">
                <Typography variant="body2">
                  {getCountryCode(whereDoYouLive)}
                </Typography>
              </div>
              <TextField
                fullWidth
                className="phone-input-helper"
                variant="outlined"
                name="phone"
                type="tel"
                inputProps={{ maxLength: phoneLength }}
                helperText={`${phone.length}/${phoneLength}`}
                value={phone}
                placeholder="Phone #"
                aria-label="Phone #"
                onChange={(event: React.ChangeEvent<{ value: string }>) => {
                  const { value } = event.target
                  event.target.value = value.replace(/[^\d]/, '')
                  setPhone(event.target.value)
                }}
              />
            </div>

            <div className="btm-10">
              <Typography variant="body2">
                {t('eligibility.securityCodeIndia')}
              </Typography>
            </div>

            <label htmlFor="code" className="block--dark">
              <Typography variant="h6">{t('eligibility.myCode')}</Typography>
            </label>
            <div className="btm-40 phone-input">
              <TextField
                fullWidth
                className="phone-input-helper"
                variant="outlined"
                name="code"
                type="tel"
                inputProps={{ maxLength: codeLength }}
                helperText={`${code.length}/${codeLength}`}
                value={code}
                placeholder="123456"
                aria-label="PIN Code"
                onChange={(event: React.ChangeEvent<{ value: string }>) => {
                  const { value } = event.target
                  event.target.value = value.replace(/[^\d]/, '')
                  setCode(event.target.value)
                }}
              />
            </div>

            <div className="btm-40">
              <Typography variant="body2">
                {t('eligibility.numberDisclaimerIndia')}
              </Typography>
            </div>

            {error && (
              <div className="tp-30-neg btm-20">
                <Alert severity="error">{error}</Alert>
              </div>
            )}

            <Button
              fullWidth
              color="primary"
              variant="contained"
              size="large"
              type="submit"
              className="wide-button"
              disabled={
                phone.length < phoneLength - 1 || code.length !== codeLength
              }
            >
              {t('eligibility.createAccount')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ExternalIdRegistration
