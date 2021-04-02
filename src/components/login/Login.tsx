import React, { useState } from 'react'
import {
  APP_ID,
  EmailSigninParams,
  LoggedInUserData,
  SignInData,
  SignInDataPhone,
  Response,
  ENDPOINT,
} from '../../types/types'
import { callEndpoint, makePhone } from '../../helpers/utility'

import Button from '@material-ui/core/Button'
import SignInWithCode from './SignInWithCode'
import TextField from '@material-ui/core/TextField/TextField'

import { RouteComponentProps } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert/Alert'
import {
  Tabs,
  Tab,
  Card,
  CardContent,
  CircularProgress,
} from '@material-ui/core'

import { useTranslation } from 'react-i18next'
import { useSessionDataDispatch, useSessionDataState } from '../../AuthContext'

export interface OwnLoginProps {
  redirectUrl?: string // will redirect here after a successful login. if unset, reload the current page url.
  searchParams?: EmailSigninParams
}

export type LoginProps = OwnLoginProps & RouteComponentProps

type LoginPostData = {
  appId: string
  email: string
  token: string
}

const PHONE_SIGN_IN_TRIGGER_ENDPOINT = '/v3/auth/phone'

export const Login: React.FunctionComponent<LoginProps> = ({
  searchParams,
  history,
}: LoginProps) => {
  const [phone, setPhone] = useState('')
  const countryCode = window.localStorage.getItem('selected_country') || ''
  const [error, setError] = useState('')
  const [isLinkSent, setIsLinkSent] = useState(false)
  const loginType = 'PHONE'
  const [isLoading, setIsLoading] = useState(false)

  const { t } = useTranslation()

  const sessionData = useSessionDataState()
  const sessionUpdateFn = useSessionDataDispatch()

  //detect if they are bck on the page

  const redirect = (isConsented: boolean) => {
    if (isConsented) {
      history.push('/dashboard')
    } else {
      history.push('/consent')
    }
  }

  const handleLoggedIn = async (loggedIn: Response<LoggedInUserData>) => {
    const consented = loggedIn.status !== 412
    if (loggedIn.ok || !consented) {
      sessionUpdateFn({
        type: 'LOGIN',
        payload: {
          ...sessionData,
          token: loggedIn.data.sessionToken,
          name: loggedIn.data.firstName,
          consented: loggedIn.data.consented,
          userDataGroup: loggedIn.data.dataGroups,
        },
      })
      redirect(loggedIn.data.consented)
    } else {
      setError('Error ' + loggedIn.status)
    }
  }

  /**
   * Handle user login on click
   *
   * @param {*} clickEvent Userclick event
   */

  const sendSignInRequest = async (
    _loginType: 'PHONE',
    phoneNumber: string,
    countryCode: string,
    endpoint: string,
  ): Promise<any> => {
    let postData: SignInData
    postData = {
      appId: APP_ID,
      phone: makePhone(phoneNumber, countryCode),
    } as SignInDataPhone

    try {
      setError('')
      return callEndpoint<LoggedInUserData>(endpoint, 'POST', postData)
    } catch (e) {
      throw e
    }
  }

  const handleLogin = async (
    clickEvent: React.FormEvent<HTMLElement>,
  ): Promise<any> => {
    clickEvent.preventDefault() // avoid page refresh

    try {
      setIsLoading(true)
      setError('')
      await sendSignInRequest(
        'PHONE',
        phone,
        countryCode,
        `${ENDPOINT}${PHONE_SIGN_IN_TRIGGER_ENDPOINT}`,
      )
      setIsLinkSent(true)
    } catch (e) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading && (
        <div className="text-center">
          <CircularProgress color="primary" />
        </div>
      )}
      {!isLoading && (
        <Card>
          <CardContent>
            {(!isLinkSent || error) && (
              <div>
                <h2 className="text-center">{t('common.logIn')}</h2>

                <form onSubmit={handleLogin}>
                  <div>
                    <div className="tabbedField">
                      <Tabs
                        value={loginType}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="disabled tabs example"
                      >
                        <Tab label={t('common.email')} value="EMAIL" />

                        {
                          // temporarily disabling phone login
                          false && (
                            <Tab label={t('common.phone')} value="PHONE" />
                          )
                        }
                      </Tabs>

                      {loginType === 'PHONE' && (
                        <div className="input--padded">
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            autoComplete="phone"
                            placeholder={t('common.phone')}
                            label={t('common.phone')}
                            fullWidth
                            name="phone"
                            type="phone"
                            value={phone}
                            onChange={e => setPhone(e.currentTarget.value)}
                          />
                        </div>
                      )}
                      <div className="text-center">
                        <Button
                          color="primary"
                          variant="contained"
                          size="large"
                          type="submit"
                          disabled={!loginType}
                          onSubmit={handleLogin}
                          className="wideButton"
                        >
                          {t('common.logIn')}
                        </Button>
                      </div>
                    </div>
                  </div>
                  {error && <Alert severity="error">{error}</Alert>}
                </form>
              </div>
            )}

            {isLinkSent && (
              <SignInWithCode
                loggedInByPhoneFn={(result: Response<LoggedInUserData>) =>
                  handleLoggedIn(result)
                }
                phoneNumber={phone}
                countryCode={countryCode}
              />
            )}
            {!isLinkSent && (
              <div style={{ margin: '0px auto', textAlign: 'center' }}>
                <Button
                  variant="text"
                  onClick={() => (window.location.href = 'eligibility')}
                >
                  {t('common.signUpForAccount')}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default Login
