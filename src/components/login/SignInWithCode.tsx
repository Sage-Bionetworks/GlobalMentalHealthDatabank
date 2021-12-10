import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Button, TextField } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert/Alert'
import { Redirect } from 'react-router-dom'
import { ROUTES } from '../../constants/constants'
import { makePhone } from '../../helpers/utility'
import { useEligibility } from '../eligibility/context/EligibilityContext'
import { ReactComponent as TextSent } from '../../assets/text_sent.svg'
import { useSessionDataState } from 'AuthContext'
import { requestSMSCode, signInWithPhone } from 'services/auth.service'
import useAuth from 'helpers/hooks/useAuth'

export const SignInWithCode: React.FunctionComponent = () => {
  const [error, setError] = useState('')
  const [code, setCode] = useState('')

  const { phoneNumber, whereDoYouLive } = useEligibility()
  const { loginDispatch } = useAuth()
  const { t } = useTranslation()
  const displayPhoneNumber = makePhone(phoneNumber, whereDoYouLive)
  const { token } = useSessionDataState()

  const resendCode = async () => {
    try {
      await requestSMSCode(displayPhoneNumber)
    } catch (e) {
      setError(t('eligibility.loginError'))
    }
  }

  async function handleOnSubmit(clickEvent: React.FormEvent<HTMLElement>) {
    clickEvent.preventDefault()

    try {
      setError('')
      const loggedIn = await signInWithPhone(displayPhoneNumber, code)
      loginDispatch(loggedIn, setError)
    } catch (e) {
      setError(e.message)
    }
  }

  if (token) {
    return <Redirect to={ROUTES.HUB} push={true} />
  }

  return (
    <div>
      <div>
        <div className="text-left margin-top-std">
          <div className="icon-wrapper">
            <TextSent width="75" />
          </div>

          <div className="header-wrapper">
            <Typography variant="h4">{t('signIn.SMSSent')}</Typography>
          </div>

          {error && (
            <div className="tp-40-neg btm-20">
              <Alert severity="error">{error}</Alert>
            </div>
          )}

          <div className="header-wrapper">
            <Typography variant="body2">{displayPhoneNumber.number}</Typography>
          </div>
        </div>

        <form onSubmit={handleOnSubmit} className="btm-30">
          <div className="form-group">
            <label htmlFor="smsCode">
              <Typography variant="h6">{t('signIn.enterCode')}</Typography>
            </label>
            <div className="btm-50">
              <TextField
                fullWidth
                variant="outlined"
                name="code"
                type="code"
                value={code}
                placeholder={t('signIn.code')}
                aria-label={t('signIn.code')}
                onChange={e => setCode(e.currentTarget.value)}
                autoComplete="off"
              />
            </div>
          </div>
          <Button
            fullWidth
            className="wide-button"
            variant="contained"
            color="primary"
            type="submit"
            disabled={!code || code.replace('-', '').length < 6}
          >
            {t('common.signIn')}
          </Button>
        </form>

        <Typography variant="body2">{t('signIn.tryAgain')}</Typography>
        <Button
          color="primary"
          variant="text"
          size="large"
          className="wide-button"
          onClick={() => resendCode()}
        >
          {t('signIn.resendCode')}
        </Button>
      </div>
    </div>
  )
}

export default SignInWithCode
