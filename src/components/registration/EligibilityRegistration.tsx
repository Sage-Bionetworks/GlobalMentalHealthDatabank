import React from 'react'
import SignInWithCode from '../login/SignInWithCode'
import ResponsiveStepWrapper from '../common/ResponsiveStepWrapper'
import Eligibility from '../eligibility/Eligibility'
import Registration from './Registration'
import { RouteComponentProps } from 'react-router-dom'
import { useEligibility } from '../eligibility/context/EligibilityContext'
import { Response, LoggedInUserData } from '../../types/types'
import { ROUTES } from '../../constants/constants'

export type EligibilityRegistrationOwnProps = {
  callbackFn: Function
}

export type EligibilityRegistrationProps = EligibilityRegistrationOwnProps &
  RouteComponentProps

const EligibilityRegistration: React.FunctionComponent<EligibilityRegistrationProps> = ({
  history,
  callbackFn,
}: EligibilityRegistrationProps) => {
  const { isEligible, phoneNumber, setPhoneNumber } = useEligibility()

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
                  history.push(ROUTES.CONSENT_STEPS)
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
