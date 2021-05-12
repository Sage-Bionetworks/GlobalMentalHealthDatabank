import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { Redirect } from 'react-router'
import { useSessionDataDispatch } from '../../AuthContext'
import { useTranslation } from 'react-i18next'

type LogoutProps = {
  redirectUrl?: string
  onLogout: Function
}

export const Logout: React.FunctionComponent<LogoutProps> = ({
  redirectUrl,
  onLogout,
}: LogoutProps) => {
  const [navigate, setNavigate] = useState(false)
  const { t } = useTranslation()
  const sessionUpdateFn = useSessionDataDispatch()
  const logout = () => {
    sessionUpdateFn({ type: 'LOGOUT' })
    onLogout()
    setNavigate(true)
  }
  if (navigate) {
    return <Redirect to={redirectUrl || '/login'} push={true} />
  } else {
    return (
      <span onClick={logout}>
        <Typography variant="h6" className="topnav__text">
          {t('common.logOut')}
        </Typography>
      </span>
    )
  }
}

export default Logout
