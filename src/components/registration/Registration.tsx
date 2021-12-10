import React from 'react'
import { useEligibility } from '../eligibility/context/EligibilityContext'
import PhoneRegistration from './PhoneRegistration'
import ExternalIdRegistration from './ExternalIdRegistration'
import { COUNTRY_CODES } from 'constants/constants'

export const Registration: React.FunctionComponent = () => {
  const eligibility = useEligibility()
  const { whereDoYouLive } = eligibility

  return (
    <>
      {whereDoYouLive === COUNTRY_CODES.IN ? (
        <ExternalIdRegistration />
      ) : (
        <PhoneRegistration />
      )}
    </>
  )
}

export default Registration
