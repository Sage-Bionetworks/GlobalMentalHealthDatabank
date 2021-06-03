import React, { useState, useEffect } from 'react'
import ConsentSteps from './ConsentSteps'
import Alert from '@material-ui/lab/Alert/Alert'
import { CircularProgress } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LoggedInUserData } from '../../types/types'
import { UserService } from '../../services/user.service'
import { ROUTES } from '../../constants/constants'

type DashboardProps = {
  token: string
}

export const Dashboard: React.FunctionComponent<DashboardProps> = ({
  token,
}: DashboardProps) => {
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [userInfo, setUserInfo] =
    useState<LoggedInUserData | undefined>(undefined)
  const { push } = useHistory()
  const { t } = useTranslation()

  const setHandlingError = () => {
    setError(t('common.connectionProblem'))
  }

  useEffect(() => {
    const getInfo = async () => {
      if (token) {
        try {
          setIsLoading(true)
          const userInfoResponse = (await UserService.getUserInfo(token)) as any
          if (
            userInfoResponse?.data &&
            userInfoResponse?.data?.clientData?.consented &&
            userInfoResponse?.data?.clientData?.skipRanking
          ) {
            push(ROUTES.DOWNLOAD)
          }

          setUserInfo(userInfoResponse?.data)
        } catch (e) {
          console.error(e)
          setError(e?.message)
        } finally {
          setIsLoading(false)
        }
      }
    }

    getInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <div className="dashboard" data-cy="page-dashboard">
      {isLoading && !error && (
        <div className="dashboard--loader">
          <CircularProgress color="primary" />
        </div>
      )}

      {error && (
        <div className="dashboard--error">
          <Alert severity="error">{error}</Alert>
        </div>
      )}

      {!error && !isLoading && !userInfo && (
        <div className="dashboard--error">
          <Alert severity="error">{t('common.connectionProblem')}</Alert>
        </div>
      )}

      {userInfo && !error && (
        <ConsentSteps
          dataGroups={userInfo?.dataGroups || []}
          clientData={userInfo?.clientData}
          handleError={setHandlingError}
        />
      )}
    </div>
  )
}

export default Dashboard
