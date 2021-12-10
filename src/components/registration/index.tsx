import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useEligibility } from '../eligibility/context/EligibilityContext'
import { ROUTES } from 'constants/constants'
import ResponsiveStepWrapper from 'components/common/ResponsiveStepWrapper'
import SignInWithCode from '../login/SignInWithCode'
import Registration from './Registration'

function RegistrationContainer() {
  const { isEligible, phoneNumber } = useEligibility()
  const history = useHistory()

  useEffect(() => {
    if (!isEligible) {
      history.push(ROUTES.HUB)
    }
  })

  return (
    <ResponsiveStepWrapper variant="card">
      {phoneNumber ? (
        <div className="quiz-wrapper">
          <SignInWithCode />
        </div>
      ) : (
        <Registration />
      )}
    </ResponsiveStepWrapper>
  )
}

export default RegistrationContainer
