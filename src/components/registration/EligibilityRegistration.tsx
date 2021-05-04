import * as React from 'react'
import { Response, LoggedInUserData } from '../../types/types'
import { useState } from 'react'
import Eligibility from './Eligibility'
import SignInWithCode from '../login/SignInWithCode'
import Registration from './Registration'
import { RouteComponentProps } from 'react-router-dom'
import { useElegibility } from './context/ElegibilityContext'
import { useTranslation } from 'react-i18next'
import ResponsiveStepWrapper from '../common/ResponsiveStepWrapper'

export type EligibilityRegistrationOwnProps = {
  callbackFn: Function
}

export type EligibilityRegistrationProps = EligibilityRegistrationOwnProps &
  RouteComponentProps

const EligibilityRegistration: React.FunctionComponent<EligibilityRegistrationProps> = ({
  history,
  callbackFn,
}: EligibilityRegistrationProps) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [countryCode, setCountryCode] = useState('')
  const [error, setError] = useState<object>({ status: 0, message: '' })

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
            countryCode={countryCode}
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
              countryCode={countryCode}
            />
          </div>
        </ResponsiveStepWrapper>
      )}
    </div>
  )
}

export default EligibilityRegistration
