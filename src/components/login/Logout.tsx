import React, { useState } from 'react'
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
    return <span onClick={logout}>{t('common.logOut')}</span>
  }
}

export default Logout
