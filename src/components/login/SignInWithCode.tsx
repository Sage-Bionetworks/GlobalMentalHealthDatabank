import React, { useState } from 'react'
import { Typography, Button, TextField } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { APP_ID, ENDPOINT } from '../../types/types'
import { callEndpoint, makePhone } from '../../helpers/utility'
import { useElegibility } from '../../components/registration/context/ElegibilityContext'
import { ReactComponent as TextSent } from '../../assets/text_sent.svg'

type SignInWithCodeProps = {
  loggedInByPhoneFn?: Function
  phoneNumber: string
}

const PHONE_SIGN_IN_ENDPOINT = '/v3/auth/phone/signIn'

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

    const endpoint = `${ENDPOINT}${PHONE_SIGN_IN_ENDPOINT}`
    try {
      setError('')
      const loggedIn = await callEndpoint(endpoint, 'POST', postData)
      loggedInByPhoneFn!(loggedIn)
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div>
      <div className="error-message">{error}</div>
      <div>
        <div className="text-left margin-top-std">
          <div className="icon-wrapper">
            <TextSent width="75" />
          </div>
          <div className="header-wrapper">
            <Typography variant="h4">{t('signIn.SMSSent')}</Typography>
          </div>
          <div className="header-wrapper">
            <Typography variant="body2">{phoneNumber}</Typography>
          </div>
        </div>
        <form onSubmit={handleOnSubmit}>
          <div className="form-group">
            <label htmlFor="smsCode">
              <Typography variant="h6">{t('signIn.enterCode')}</Typography>
            </label>
            <div className="input--padded">
              <TextField
                name="code"
                type="code"
                value={code}
                placeholder={t('signIn.code')}
                aria-label={t('signIn.code')}
                variant="outlined"
                fullWidth
                onChange={e => setCode(e.currentTarget.value)}
                autoComplete="off"
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={!code || code.replace('-', '').length < 6}
            variant="contained"
            color="primary"
            fullWidth
          >
            {t('common.logIn')}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default SignInWithCode
