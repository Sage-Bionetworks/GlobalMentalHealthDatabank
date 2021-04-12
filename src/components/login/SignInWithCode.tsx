import React, { useState } from 'react'

import { APP_ID, ENDPOINT } from '../../types/types'
import { callEndpoint, makePhone } from '../../helpers/utility'
import Button from '@material-ui/core/Button/Button'
import TextField from '@material-ui/core/TextField/TextField'
import Separator from '../static/Separator'
import { useTranslation } from 'react-i18next'

import { ReactComponent as TextSent } from '../../assets/text_sent.svg'

type SignInWithCodeProps = {
  loggedInByPhoneFn?: Function
  phoneNumber: string
  countryCode: string
}

const PHONE_SIGN_IN_ENDPOINT = '/v3/auth/phone/signIn'

export const SignInWithCode: React.FunctionComponent<SignInWithCodeProps> = ({
  loggedInByPhoneFn,
  phoneNumber,
  countryCode,
}: SignInWithCodeProps) => {
  const [error, setError] = useState('')
  const [code, setCode] = useState('')

  const { t } = useTranslation()

  async function handleOnSubmit(clickEvent: React.FormEvent<HTMLElement>) {
    clickEvent.preventDefault()

    const postData = {
      appId: APP_ID,
      phone: makePhone(phoneNumber, countryCode),
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
    <div className="quizWrapper">
      <div className="error-message">{error}</div>
      <div>
        <div className="text-left margin-top-std">
          <TextSent />
          <p className="text-left padded">We just sent an SMS to:</p>
          <p className="text-left ">{phoneNumber}</p>
          <Separator />
        </div>
        <form onSubmit={handleOnSubmit}>
          <div className="form-group">
            <label htmlFor="smsCode">{t('signIn.text2')}</label>
            <TextField
              name="code"
              type="code"
              value={code}
              placeholder={t('signIn.text3')}
              aria-label={t('signIn.text3')}
              variant="outlined"
              fullWidth
              onChange={e => setCode(e.currentTarget.value)}
            />
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
