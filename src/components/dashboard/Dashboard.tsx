import React, { useState, useEffect } from 'react'
import { CircularProgress } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import { SurveyService } from '../../services/survey.service'
import {
  SavedSurveysObject,
  SurveyType,
  SavedSurvey,
  TestLocationEnum,
  SurveysCompletionStatusEnum,
  LoggedInUserData,
} from '../../types/types'
import _ from 'lodash'
import { UserService } from '../../services/user.service'
import Alert from '@material-ui/lab/Alert/Alert'
import ThankYou from './ThankYou'
import ConsentSteps from './ConsentSteps'

type DashboardProps = {
  token: string
}

export const Dashboard: React.FunctionComponent<DashboardProps> = ({
  token,
}: DashboardProps) => {
  const [savedSurveys, setSavedSurveys] = useState<SavedSurveysObject>()
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [userInfo, setUserInfo] = useState<LoggedInUserData | undefined>(
    undefined,
  )

  const hasInvitation = (userData?: LoggedInUserData): boolean =>
    !!userData && userData.dataGroups.indexOf('tests_requested') > -1

  const hasCancelledAppointment = (userData?: LoggedInUserData): boolean =>
    !!userData && userData.dataGroups.indexOf('tests_cancelled') > -1

  useEffect(() => {
    let isSubscribed = true
    const getInfo = async () => {
      if (token && isSubscribed) {
        try {
          setIsLoading(true)
          const userInfoResponse = await UserService.getUserInfo(token)
          const response = await SurveyService.getUserSurveys(token)
          if (isSubscribed) {
            setUserInfo(_old => userInfoResponse.data)
            setSavedSurveys(_.first(response.data.items)?.data)
          }
        } catch (e) {
          isSubscribed && setError(e)
        } finally {
          isSubscribed && setIsLoading(false)
        }
      }
    }

    getInfo()

    return () => {
      isSubscribed = false
    }
  }, [token])

  /* POSSIBLE SCENARIOS:
  - minimum surveys not completed
  - minimum surveys completed 
    - test location not completed -- > show test location question
    - test location completed 
  - all surveys completed
*/

  const isContactInfoDone = (): boolean => {
    if (!userInfo) {
      return false
    } else {
      return !!userInfo.attributes?.gender
    }
  }

  const getSavedSurvey = (surveyType: SurveyType): SavedSurvey | undefined => {
    if (!savedSurveys) {
      return undefined
    }
    return savedSurveys.surveys.find(
      savedSurvey => surveyType === savedSurvey.type,
    )
  }

  const hasTakenTest = (): boolean => {
    const covidSurvey = getSavedSurvey('COVID_EXPERIENCE')
    if (!covidSurvey || !covidSurvey?.completedDate) {
      return false
    }
    const kind_of_testing = covidSurvey.data.symptoms2?.kind_of_testing
    return kind_of_testing.serum_test || kind_of_testing.nasal_swab
  }

  const getPreferredTestLocation = (): TestLocationEnum | undefined => {
    const locationFromLocationSurvey = getSavedSurvey('TEST_LOCATION')?.data
      .location
    const locationFromCovidSurveyWithLab = _.get(
      getSavedSurvey('MORE'),
      'data.test_location.test_location',
    )
    const locationFromCovidSurveyWithoutLab = _.get(
      getSavedSurvey('MORE'),
      'data.test_location_no_lab.test_location',
    )
    return (
      locationFromCovidSurveyWithLab ||
      locationFromCovidSurveyWithoutLab ||
      locationFromLocationSurvey
    )
  }

  const getCompletionStatus = (): SurveysCompletionStatusEnum => {
    if (!savedSurveys) {
      return SurveysCompletionStatusEnum.NOT_DONE
    }
    const completedSurveyNames = (savedSurveys.surveys || [])
      .filter(survey => survey && survey.completedDate)
      .map(survey => survey?.type)

    const doneAll =
      isContactInfoDone() &&
      completedSurveyNames.includes('DEMOGRAPHIC') &&
      completedSurveyNames.includes('COVID_EXPERIENCE') &&
      completedSurveyNames.includes('HISTORY') &&
      completedSurveyNames.includes('MORE') &&
      (completedSurveyNames.includes('RESULT_UPLOAD') || !hasTakenTest())

    if (doneAll) {
      return SurveysCompletionStatusEnum.ALL_DONE
    } else {
      return SurveysCompletionStatusEnum.NOT_DONE
    }
  }

  if ((isLoading || !userInfo) && !error) {
    return (
      <div className="text-center">
        <CircularProgress color="primary" />
      </div>
    )
  } else {
    if (error !== undefined) {
      return <Alert severity="error">{error!['message'] || error}</Alert>
    }

    return (
      <div className="Dashboard" data-cy="page-dashboard">
        {getCompletionStatus() === SurveysCompletionStatusEnum.NOT_DONE && (
          <ConsentSteps dataGroups={userInfo?.dataGroups || []} />
        )}

        {getCompletionStatus() !== SurveysCompletionStatusEnum.NOT_DONE && (
          <Card>
            <ThankYou
              testLocation={getPreferredTestLocation()}
              isInvitedForTest={hasInvitation(userInfo)}
              hasCancelledAppointment={hasCancelledAppointment(userInfo)}
              userInfo={userInfo}
              token={token}
            />
          </Card>
        )}
      </div>
    )
  }
}

export default Dashboard
