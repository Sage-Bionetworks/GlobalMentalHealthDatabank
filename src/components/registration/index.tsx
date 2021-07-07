import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useEligibility } from '../eligibility/context/EligibilityContext'
import { useSessionDataDispatch, useSessionDataState } from '../../AuthContext'
import { ROUTES } from 'constants/constants'
import ResponsiveStepWrapper from 'components/common/ResponsiveStepWrapper'
import SignInWithCode from '../login/SignInWithCode'
import { Response, LoggedInUserData } from '../../types/types'
import Registration from './Registration'

function RegistrationContainer() {
  const { isEligible, phoneNumber } = useEligibility()
  const history = useHistory()
  const sessionData = useSessionDataState()
  const sessionDispatch = useSessionDataDispatch()
  console.log(isEligible, phoneNumber)

  useEffect(() => {
    if (!isEligible) {
      console.log('redirecting to hub...')
      history.push(ROUTES.HUB)
    }
  }, [])

  return (
    <ResponsiveStepWrapper variant="card">
      <h1>Registration</h1>
      {phoneNumber ? (
        <div className="quiz-wrapper">
          <SignInWithCode
            loggedInByPhoneFn={(loggedIn: Response<LoggedInUserData>) => {
              if (loggedIn.ok || !loggedIn.data.consented) {
                sessionDispatch({
                  type: 'LOGIN',
                  payload: {
                    ...sessionData,
                    token: loggedIn.data.sessionToken,
                    name: loggedIn.data.firstName,
                  },
                })
                history.push(ROUTES.HUB)
              }
            }}
          />
        </div>
      ) : (
        <Registration />
      )}
    </ResponsiveStepWrapper>
  )
}

export default RegistrationContainer
