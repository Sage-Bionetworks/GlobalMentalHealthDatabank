import React, { useState, useEffect } from 'react'
import { CircularProgress } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert/Alert'

import { LoggedInUserData } from '../../types/types'
import { UserService } from '../../services/user.service'
import ConsentSteps from './ConsentSteps'

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

  useEffect(() => {
    let isSubscribed = true
    const getInfo = async () => {
      if (token && isSubscribed) {
        try {
          setIsLoading(true)
          const userInfoResponse = (await UserService.getUserInfo(token)) as any
          if (
            userInfoResponse?.data &&
            userInfoResponse?.data?.clientData?.consented &&
            userInfoResponse?.data?.clientData?.skipRanking
          ) {
            push('/download')
          }
          if (isSubscribed) {
            setUserInfo(_old => userInfoResponse.data)
          }
        } catch (e) {
          console.error(e)
          isSubscribed && setError(e?.message)
        } finally {
          isSubscribed && setIsLoading(false)
        }
      }
    }

    getInfo()

    return () => {
      isSubscribed = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <div className="dashboard" data-cy="page-dashboard">
      {(isLoading || !userInfo) && !error && (
        <div className="dashboard--loader">
          <CircularProgress color="primary" />
        </div>
      )}

      {error && (
        <div className="dashboard--error">
          <Alert severity="error">{error}</Alert>
        </div>
      )}

      {userInfo && !error && (
        <ConsentSteps dataGroups={userInfo?.dataGroups || []} />
      )}
    </div>
  )
}

export default Dashboard
