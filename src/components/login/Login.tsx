import React, { useState } from 'react'
import {
  APP_ID,
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
import { CircularProgress } from '@material-ui/core'

import uk from '../../assets/flags/uk.svg'
import ind from '../../assets/flags/ind.svg'
import za from '../../assets/flags/za.svg'
import us from '../../assets/flags/us.svg'

import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { useTranslation } from 'react-i18next'
import { useSessionDataDispatch, useSessionDataState } from '../../AuthContext'
import ResponsiveStepWrapper from '../common/ResponsiveStepWrapper'

export interface OwnLoginProps {
  redirectUrl?: string // will redirect here after a successful login. if unset, reload the current page url.
  searchParams?: any
}

export type LoginProps = OwnLoginProps & RouteComponentProps

const PHONE_SIGN_IN_TRIGGER_ENDPOINT = '/v3/auth/phone'

const FLAGS = {
  unitedKingdom: 'UK',
  india: 'IN',
  southAfrica: 'ZA',
  unitedStates: 'US',
}

export const Login: React.FunctionComponent<LoginProps> = ({
  searchParams,
  history,
}: LoginProps) => {
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState(FLAGS.unitedKingdom)
  const [error, setError] = useState('')
  const [isCodeSent, setIsCodeSent] = useState(false)
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
      setIsCodeSent(true)
    } catch (e) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ResponsiveStepWrapper variant="card">
      <div className="login-wrapper">
        {isLoading && (
          <div className="text-center">
            <CircularProgress color="primary" />
          </div>
        )}
        {!isLoading && (
          <div className="quiz-wrapper">
            {(!isCodeSent || error) && (
              <div>
                <h2 className="text-center">{t('common.logIn')}</h2>

                <form onSubmit={handleLogin}>
                  <div>
                    {loginType === 'PHONE' && (
                      <div className="input--padded--flags">
                        <Select
                          labelId="flag-selector"
                          id="flag-selector"
                          value={countryCode}
                          onChange={(
                            event: React.ChangeEvent<{ value: unknown }>,
                          ) => {
                            setCountryCode(event.target.value as any)
                          }}
                          variant="outlined"
                          className="phone-flag"
                        >
                          <MenuItem value={FLAGS.unitedKingdom}>
                            <img
                              src={uk}
                              className={'flag-icon'}
                              alt="United Kingdom"
                            ></img>
                          </MenuItem>
                          <MenuItem value={FLAGS.india}>
                            <img
                              src={ind}
                              className={'flag-icon'}
                              alt="India"
                            ></img>
                          </MenuItem>
                          <MenuItem value={FLAGS.southAfrica}>
                            <img
                              src={za}
                              className={'flag-icon'}
                              alt="South Africa"
                            ></img>
                          </MenuItem>
                          <MenuItem value={FLAGS.unitedStates}>
                            <img
                              src={us}
                              className={'flag-icon'}
                              alt="United States"
                            ></img>
                          </MenuItem>
                        </Select>

                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          autoComplete="phone"
                          placeholder="Phone #"
                          label="Phone #"
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
                        className="wide-button"
                      >
                        {t('common.logIn')}
                      </Button>
                    </div>
                  </div>
                  {error && <Alert severity="error">{error}</Alert>}
                </form>
              </div>
            )}
            {isCodeSent && (
              <SignInWithCode
                loggedInByPhoneFn={(result: Response<LoggedInUserData>) =>
                  handleLoggedIn(result)
                }
                phoneNumber={phone}
                countryCode={countryCode}
              />
            )}
            {!isCodeSent && (
              <div style={{ margin: '0px auto', textAlign: 'center' }}>
                <Button
                  variant="text"
                  onClick={() => (window.location.href = 'eligibility')}
                >
                  {t('common.signUpForAccount')}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </ResponsiveStepWrapper>
  )
}

export default Login
