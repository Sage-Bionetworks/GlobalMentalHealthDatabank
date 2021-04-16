import React, { useState, useEffect } from 'react'
import { CircularProgress } from '@material-ui/core'
import { LoggedInUserData } from '../../types/types'
import { UserService } from '../../services/user.service'
import Alert from '@material-ui/lab/Alert/Alert'
import ConsentSteps from './ConsentSteps'
import RankChoice from './RankChoice/RankChoice'

type DashboardProps = {
  token: string
}

export const Dashboard: React.FunctionComponent<DashboardProps> = ({
  token,
}: DashboardProps) => {
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [userInfo, setUserInfo] = useState<LoggedInUserData | undefined>(
    undefined,
  )

  useEffect(() => {
    let isSubscribed = true
    const getInfo = async () => {
      if (token && isSubscribed) {
        try {
          setIsLoading(true)
          const userInfoResponse = await UserService.getUserInfo(token)
          if (isSubscribed) {
            setUserInfo(_old => userInfoResponse.data)
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
        {/* <ConsentSteps dataGroups={userInfo?.dataGroups || []} /> */}
        <RankChoice />
      </div>
    )
  }
}

export default Dashboard
