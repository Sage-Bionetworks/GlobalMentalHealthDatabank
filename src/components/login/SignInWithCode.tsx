import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Button, TextField } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert/Alert'

import { APP_ID, LOGIN_ENDPOINT } from '../../types/types'
import { callEndpoint, makePhone } from '../../helpers/utility'
import { useElegibility } from '../../components/registration/context/ElegibilityContext'
import { ReactComponent as TextSent } from '../../assets/text_sent.svg'

type SignInWithCodeProps = {
  loggedInByPhoneFn?: Function
  phoneNumber: string
}

export const SignInWithCode: React.FunctionComponent<SignInWithCodeProps> = ({
  loggedInByPhoneFn,
  phoneNumber,
}: SignInWithCodeProps) => {
  const [error, setError] = useState('')
  const [code, setCode] = useState('')

  const { whereDoYouLive } = useElegibility()
  const { t } = useTranslation()

  async function handleOnSubmit(clickEvent: React.FormEvent<HTMLElement>) {
    clickEvent.preventDefault()

    const postData = {
      appId: APP_ID,
      phone: makePhone(phoneNumber, whereDoYouLive),
      token: code,
    }

    try {
      setError('')
      const loggedIn = await callEndpoint(LOGIN_ENDPOINT, 'POST', postData)
      loggedInByPhoneFn!(loggedIn)
    } catch (e) {
      setError(e.message)
    }
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
            <Typography variant="body2">{phoneNumber}</Typography>
          </div>
        </div>
        <form onSubmit={handleOnSubmit}>
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
      </div>
    </div>
  )
}

export default SignInWithCode
