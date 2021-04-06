import * as React from 'react'
import { Response, LoggedInUserData } from '../../types/types'
import { useState } from 'react'
import Eligiblity from './Eligibility'
import SignInWithCode from '../login/SignInWithCode'
import Registration from './Registration'
import { RouteComponentProps } from 'react-router-dom'

export type EligibilityRegistrationOwnProps = {
  callbackFn: Function
}

export type EligibilityRegistrationProps = EligibilityRegistrationOwnProps &
  RouteComponentProps

const EligibilityRegistration: React.FunctionComponent<EligibilityRegistrationProps> = ({
  history,
  callbackFn,
}: EligibilityRegistrationProps) => {
  const [eligible, setEligible] = useState<boolean | undefined>(undefined)
  const [phoneNumber, setPhoneNumber] = useState('')
  const countryCode = window.localStorage.getItem('selected_country') || ''
  const [error, setError] = useState<object>({ status: 0, message: '' })

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
      setError({ message: 'Error attempting login', status: loggedIn.status })
    }
  }

  return (
    <div>
      <div>
        {eligible === undefined && (
          <Eligiblity
            setEligibilityFn={() => {
              setEligible(true)
              window.scrollTo(0, 0)
            }}
          />
        )}
        {eligible && !phoneNumber && (
          <Registration
            onSuccessFn={(
              status: number,
              data: object,
              phoneNumber: string,
            ) => {
              setPhoneNumber(phoneNumber)
            }}
            onErrorFn={(status: number, message?: string) => {
              setError({ message: 'Error when registering', status: status })
            }}
          />
        )}
        {eligible && phoneNumber && (
          <SignInWithCode
            loggedInByPhoneFn={(result: Response<LoggedInUserData>) =>
              handleLoggedIn(result)
            }
            phoneNumber={phoneNumber}
            countryCode={countryCode}
          />
        )}
      </div>
    </div>
  )
}

export default EligibilityRegistration
