import { getRandomFlowOption, getRandomArm } from 'helpers/RandomFlowGenerator'
import {
  APP_ID,
  SUB_STUDY_ID,
  PAGE_ID_FIELD_NAME,
  PAGE_ID,
  MENTAL_HEALTH_EXPERIENCE,
  LIVED_EXPERIENCE,
  SHARE_SCOPE_ALL,
} from 'constants/constants'
import { RegistrationData, UserDataGroup } from 'types/types'
import { isProductionEnv } from 'helpers/utility'
import { EligibilityState } from 'components/eligibility/context/EligibilityContext'

export const createRegistrationData = (
  eligibility: EligibilityState,
): RegistrationData => {
  const {
    howDidYouHear,
    mentalHealthExperience,
    whereDoYouLive,
    doYouHaveAnAndroid,
    understandEnglish,
    age,
    gender,
  } = eligibility

  let dataGroups: UserDataGroup[] = []
  if (!isProductionEnv()) {
    dataGroups.push('test_user' as UserDataGroup)
  }
  let consentModel = getRandomFlowOption()
  if (consentModel) {
    dataGroups.push(consentModel)
  }
  const arm = getRandomArm()
  dataGroups.push(arm)

  if (
    !mentalHealthExperience.includes(MENTAL_HEALTH_EXPERIENCE.NOT_EXPERIENCED)
  )
    dataGroups.push(LIVED_EXPERIENCE.YES)
  else dataGroups.push(LIVED_EXPERIENCE.NO)

  dataGroups.push(whereDoYouLive as UserDataGroup)

  const data: RegistrationData = {
    clientData: {
      consentModel,
      howDidYouHear,
      mentalHealthExperience,
      whereDoYouLive,
      doYouHaveAnAndroid,
      understandEnglish,
      age,
      gender,
      consented: false,
      [PAGE_ID_FIELD_NAME]: PAGE_ID.WHAT_WILL_YOU_ASK,
      checkpoint: {
        aboutTheStudy: {
          step: 1,
          status: 'started',
        },
        aboutDataSharing: {
          step: 1,
          status: 'unstarted',
        },
        summaryAndSignature: {
          step: 1,
          status: 'unstarted',
        },
      },
    },
    appId: APP_ID,
    substudyIds: [SUB_STUDY_ID],
    dataGroups,
    sharingScope: SHARE_SCOPE_ALL,
  }
  return data
}
