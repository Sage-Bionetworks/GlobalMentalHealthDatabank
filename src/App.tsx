import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline'
import { ThemeProvider, Typography } from '@material-ui/core'
import Home from './components/static/Home'
import EligibilityRegistration from './components/registration/EligibilityRegistration'
import Login from './components/login/Login'
import { useSessionDataState, useSessionDataDispatch } from './AuthContext'
import { getSearchParams } from './helpers/utility'
import Dashboard from './components/dashboard/Dashboard'
import DownloadApp from './components/dashboard/DownloadApp'
import { TopNav } from './components/widgets/TopNav'
import { UserService } from './services/user.service'
import GoogleAnalyticsPageTracker from './components/widgets/GoogleAnalyticsPageTracker'
import ScrollToTopOnRouteChange from './components/widgets/ScrollToTopOnRouteChange'
import Footer from './components/widgets/Footer'
import PrivacyPolicy from './components/static/PrivacyPolicy'
import DataRegulation from './components/static/DataRegulation'
import { UserDataGroup, SessionData } from './types/types'
import { ElegibilityProvider } from './components/registration/context/ElegibilityContext'
import { RankedChoiceProvider } from './components/dashboard/RankedChoice/context/RankedChoiceContext'
import { theme } from './theme'
import './styles/style.scss'

function App() {
  const sessionData: SessionData = useSessionDataState()
  const sessionUpdateFn = useSessionDataDispatch()
  const { token } = sessionData

  const [currentLocation, setCurrentLocation] = useState(
    window.location.pathname,
  )

  useEffect(() => {
    let isSubscribed = true
    async function getInfo(token: string | undefined) {
      if (token && isSubscribed) {
        try {
          const userInfo = await UserService.getUserInfo(token)
          setUserSession(
            token,
            userInfo.data.firstName,
            userInfo.data.consented,
            userInfo.data.dataGroups,
          )
        } catch (e) {
          setUserSession(undefined, '', false, [])
        }
      }
    }
    getInfo(token)
    return () => {
      isSubscribed = false
    }
  }, [token])

  function PrivateRoute({ children, ...rest }: any) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          token ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )
        }
      />
    )
  }

  const setUserSession = (
    token: string | undefined,
    name: string,
    consented: boolean,
    dataGroup: UserDataGroup[],
  ) => {
    if (!token) {
      sessionUpdateFn({ type: 'LOGOUT' })
    } else {
      sessionUpdateFn({
        type: 'LOGIN',
        payload: {
          ...sessionData,
          token,
          name,
          consented,
          userDataGroup: dataGroup,
        },
      })
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <ElegibilityProvider>
        <RankedChoiceProvider>
          <Typography component={'div'}>
            <div style={{ height: '100%' }}>
              <CssBaseline />
              <Router>
                <div>
                  <GoogleAnalyticsPageTracker />
                  <ScrollToTopOnRouteChange
                    onRouteChangeFn={(location: string) =>
                      setCurrentLocation(location)
                    }
                  />
                  <TopNav
                    token={token}
                    logoutCallbackFn={() =>
                      setUserSession(undefined, '', false, [])
                    }
                    showTopNavigator={currentLocation !== '/testkit'}
                  >
                    <Switch>
                      <Route
                        exact={true}
                        path="/login"
                        render={props => {
                          const searchParamsProps = getSearchParams(
                            props.location.search,
                          )
                          return (
                            <Login
                              {...props}
                              searchParams={searchParamsProps as any}
                            />
                          )
                        }}
                      ></Route>
                      <Route
                        path="/eligibility"
                        render={props => {
                          return (
                            <EligibilityRegistration
                              {...props}
                              callbackFn={(token: string, name: string) =>
                                setUserSession(token, name, false, [])
                              }
                            />
                          )
                        }}
                      ></Route>
                      <PrivateRoute exact={true} path="/dashboard">
                        <Dashboard token={token || ''} />
                      </PrivateRoute>
                      <Route path="/privacypolicy">
                        <PrivacyPolicy />
                      </Route>
                      <Route path="/dataregulation">
                        <DataRegulation />
                      </Route>
                      <Route path="/download">
                        <DownloadApp />
                      </Route>
                      <Route path="/home">
                        <Home />
                      </Route>
                      <Route path="/">
                        <Home />
                      </Route>
                    </Switch>
                  </TopNav>
                  <Footer />
                </div>
              </Router>
            </div>
          </Typography>
        </RankedChoiceProvider>
      </ElegibilityProvider>
    </ThemeProvider>
  )
}

export default App
