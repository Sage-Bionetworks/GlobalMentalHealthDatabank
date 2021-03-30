import React, { useState, useEffect } from 'react'

import { APP_ID, ENDPOINT, LoginType } from '../../types/types'
import { callEndpoint, makePhone } from '../../helpers/utility'
import Alert from '@material-ui/lab/Alert/Alert'
import Button from '@material-ui/core/Button/Button'
import TextField from '@material-ui/core/TextField/TextField'
import Separator from '../static/Separator'
import { useTranslation, Trans } from 'react-i18next'

import { ReactComponent as TextSent } from '../../assets/text_sent.svg'

type SignInWithCodeProps = {
  loggedInByPhoneFn?: Function
  loginType: LoginType
  phoneOrEmail: string
}

const PHONE_SIGN_IN_ENDPOINT = '/v3/auth/phone/signIn'

export const SignInWithCode: React.FunctionComponent<SignInWithCodeProps> = ({
  loginType,
  loggedInByPhoneFn,
  phoneOrEmail,
}: SignInWithCodeProps) => {
  const [error, setError] = useState('')
  const [code, setCode] = useState('')

  const { t } = useTranslation()

  async function handleOnSubmit(clickEvent: React.FormEvent<HTMLElement>) {
    clickEvent.preventDefault()

    const postData = {
      appId: APP_ID,
      phone: makePhone(phoneOrEmail),
      token: code,
    }
    //
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
    <>
      <div className="error-message">{error}</div>
      {loginType === 'PHONE' && (
        <div>
          <div className="text-center margin-top-std">
            <TextSent />
            <p className="text-center">{t('signIn.text1')}</p>
            <p className="text-center">{phoneOrEmail}</p>
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
      )}
    </>
  )
}

export default SignInWithCode
