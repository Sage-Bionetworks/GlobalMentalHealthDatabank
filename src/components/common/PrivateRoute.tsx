import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSessionDataState } from '../../AuthContext'
import { ROUTES } from 'constants/constants'
import { SessionData } from 'types/types'

function PrivateRoute({ children, ...rest }: any) {
  const sessionData: SessionData = useSessionDataState()
  const { token } = sessionData
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: ROUTES.SIGNIN,
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
