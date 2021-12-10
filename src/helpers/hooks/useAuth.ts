import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSessionDataDispatch, useSessionDataState } from 'AuthContext'
import { ROUTES } from 'constants/constants'
import { LoggedInUserData, Response, SessionData } from 'types/types'

const useAuth = () => {
  const sessionData: SessionData = useSessionDataState()
  const sessionDispatch = useSessionDataDispatch()
  const history = useHistory()
  const { t } = useTranslation()

  const loginDispatch = (
    loggedIn: Response<LoggedInUserData>,
    setError?: Function,
  ) => {
    const consented = loggedIn.status !== 412
    if (loggedIn.ok || !consented || !loggedIn.data.consented) {
      sessionDispatch({
        type: 'LOGIN',
        payload: {
          ...sessionData,
          token: loggedIn.data.sessionToken,
          name: loggedIn.data.firstName,
          consented: loggedIn.data.consented,
          userDataGroup: loggedIn.data.dataGroups,
        },
      })
      history.push(ROUTES.HUB)
    } else {
      setError?.(t('eligibility.loginError'))
    }
  }
  const logoutDispatch = () => {
    sessionDispatch({ type: 'LOGOUT' })
  }
  return { loginDispatch, logoutDispatch }
}

export default useAuth
