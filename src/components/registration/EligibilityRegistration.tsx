import * as React from 'react'
import { Response, LoggedInUserData } from '../../types/types'
import { useState } from 'react'
import Eligibility from './Eligibility'
import SignInWithCode from '../login/SignInWithCode'
import Registration from './Registration'
import { RouteComponentProps } from 'react-router-dom'
import { useElegibility } from './context/ElegibilityContext'

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
  const countryCode = window.localStorage.getItem('selected_country') || ''
  const [error, setError] = useState<object>({ status: 0, message: '' })

  const { isEligible } = useElegibility()

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
    <>
      {!isEligible && <Eligibility />}
      {isEligible && !phoneNumber && (
        <Registration
          onSuccessFn={(status: number, data: object, phoneNumber: string) => {
            setPhoneNumber(phoneNumber)
          }}
          onErrorFn={(status: number, message?: string) => {
            setError({
              message:
                'Error when registering, please verify your phone number and country selection',
              status: status,
            })
          }}
        />
      )}
      {isEligible && phoneNumber && (
        <SignInWithCode
          loggedInByPhoneFn={(result: Response<LoggedInUserData>) =>
            handleLoggedIn(result)
          }
          phoneNumber={phoneNumber}
          countryCode={countryCode}
        />
      )}
    </>
  )
}

export default EligibilityRegistration
