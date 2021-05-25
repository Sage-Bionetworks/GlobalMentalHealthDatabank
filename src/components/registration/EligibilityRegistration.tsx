import React from 'react'
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
    const { isEligible, phoneNumber, setPhoneNumber } = useElegibility()

    const showEligibility = !isEligible
    const showSignIn = isEligible && !phoneNumber
    const showConfirmSMS = isEligible && phoneNumber

    return (
      <div>
        {showEligibility && <Eligibility />}

        {showSignIn && (
          <ResponsiveStepWrapper variant="card">
            <Registration
              onSuccessFn={(number: string) => {
                setPhoneNumber(number)
              }}
            />
          </ResponsiveStepWrapper>
        )}

        {showConfirmSMS && (
          <ResponsiveStepWrapper variant="card">
            <div className="quiz-wrapper">
              <SignInWithCode
                loggedInByPhoneFn={(loggedIn: Response<LoggedInUserData>) => {
                  if (loggedIn.ok || !loggedIn.data.consented) {
                    // Set User Session
                    callbackFn(
                      loggedIn.data.sessionToken,
                      loggedIn.data.firstName,
                    )
                    history.push('/dashboard')
                  }
                }}
              />
            </div>
          </ResponsiveStepWrapper>
        )}
      </div>
    )
  }

export default EligibilityRegistration
