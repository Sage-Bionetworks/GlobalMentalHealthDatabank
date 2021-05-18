import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Eligibility from './Eligibility'
import Registration from './Registration'
import { useElegibility } from './context/ElegibilityContext'
import SignInWithCode from '../login/SignInWithCode'
import ResponsiveStepWrapper from '../common/ResponsiveStepWrapper'
import { Response, LoggedInUserData } from '../../types/types'

export type EligibilityRegistrationOwnProps = {
  callbackFn: Function
}

export type EligibilityRegistrationProps = EligibilityRegistrationOwnProps &
  RouteComponentProps

const EligibilityRegistration: React.FunctionComponent<EligibilityRegistrationProps> =
  ({ history, callbackFn }: EligibilityRegistrationProps) => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [countryCode, setCountryCode] = useState('') // CARLOS: check is never used?
    const [error, setError] = useState<object>({ status: 0, message: '' }) // CARLOS: check is never used?

    const { isEligible } = useElegibility()
    const { t } = useTranslation()

    const handleLoggedIn = (loggedIn: Response<LoggedInUserData>) => {
      const consented = loggedIn.status !== 412
      if (loggedIn.ok || !consented) {
        callbackFn(loggedIn.data.sessionToken, loggedIn.data.firstName)
        if (consented) {
          history.push('/dashboard')
        } else {
          history.push('/consent')
        }
      } else {
        setError({
          message: t('eligibility.loginError'),
          status: loggedIn.status,
        })
      }
    }
    return (
      <div>
        {!isEligible && <Eligibility setCountryCode={setCountryCode} />}

        {isEligible && !phoneNumber && (
          <ResponsiveStepWrapper variant="card">
            <Registration
              onSuccessFn={(
                status: number,
                data: object,
                phoneNumber: string,
              ) => {
                setPhoneNumber(phoneNumber)
              }}
              onErrorFn={(status: number, message?: string) => {
                setError({
                  message: t('eligibility.registerError'),
                  status: status,
                })
              }}
            />
          </ResponsiveStepWrapper>
        )}

        {isEligible && phoneNumber && (
          <ResponsiveStepWrapper variant="card">
            <div className="quiz-wrapper">
              <SignInWithCode
                loggedInByPhoneFn={(result: Response<LoggedInUserData>) =>
                  handleLoggedIn(result)
                }
                phoneNumber={phoneNumber}
              />
            </div>
          </ResponsiveStepWrapper>
        )}
      </div>
    )
  }

export default EligibilityRegistration
