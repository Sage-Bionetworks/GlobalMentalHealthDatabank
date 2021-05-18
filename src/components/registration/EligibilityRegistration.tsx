import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'

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
    const { isEligible } = useElegibility()

    const handleLoggedIn = (loggedIn: Response<LoggedInUserData>) => {
      if (loggedIn.ok) {
        callbackFn(loggedIn.data.sessionToken, loggedIn.data.firstName) // ser user session
        history.push('/dashboard')
      }
    }
    return (
      <div>
        {!isEligible && <Eligibility />}

        {/* SignIn / SignUP */}
        {isEligible && !phoneNumber && (
          <ResponsiveStepWrapper variant="card">
            <Registration
              onSuccessFn={(phoneNumber: string) => {
                setPhoneNumber(phoneNumber)
              }}
            />
          </ResponsiveStepWrapper>
        )}

        {/* LogIn */}
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
