import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline'
import { ThemeProvider, Typography, Grid } from '@material-ui/core'
import Intro from './components/static/Intro'
import EligibilityRegistration from './components/registration/EligibilityRegistration'
import Login from './components/login/Login'
import { useSessionDataState, useSessionDataDispatch } from './AuthContext'
import { getSearchParams } from './helpers/utility'
import Dashboard from './components/dashboard/Dashboard'
import { TopNav } from './components/widgets/TopNav'
import { UserService } from './services/user.service'
import GoogleAnalyticsPageTracker from './components/widgets/GoogleAnalyticsPageTracker'
import ScrollToTopOnRouteChange from './components/widgets/ScrollToTopOnRouteChange'
import Footer from './components/widgets/Footer'
import PrivacyPolicy from './components/static/PrivacyPolicy'
import { UserDataGroup, SessionData } from './types/types'
import { ElegibilityProvider } from './components/registration/context/ElegibilityContext'
import { theme } from './theme'
import './styles/style.scss'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
}))

function renderWithGridLayout(el: JSX.Element) {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ backgroundColor: '#F4F4F4' }}
    >
      <Grid item xs={12} md={8} lg={6}>
        {el}
      </Grid>
    </Grid>
  )
}

function App() {
  const sessionData = useSessionDataState()
  const sessionUpdateFn = useSessionDataDispatch()
  const token = sessionData.token

  const [currentLocation, setCurrentLocation] = useState(
    window.location.pathname,
  )

  useEffect(() => {
    let isSubscribed = true
    //the whole point of this is to log out the user if their session ha expired on the servier
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

  function getDashboardPage(sessionData: SessionData) {
    return renderWithGridLayout(<Dashboard token={token || ''} />)
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
          token: token,
          name: name,
          consented: consented,
          userDataGroup: dataGroup,
        },
      })
    }
  }

  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <ElegibilityProvider>
        <Typography component={'div'}>
          <div className={classes.root}>
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
                  {/* A <Switch> looks through its children <Route>s and
         renders the first one that matches the current URL. */}{' '}
                  <Switch>
                    <Route
                      exact={true}
                      path="/login"
                      render={props => {
                        const searchParamsProps = getSearchParams(
                          props.location.search,
                        )
                        // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams -- needs polyfill for ie11
                        return renderWithGridLayout(
                          <Login
                            {...props}
                            key={Math.random()}
                            searchParams={searchParamsProps as any}
                          />,
                        )
                      }}
                    ></Route>
                    <Route
                      path="/eligibility"
                      render={props => {
                        // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams -- needs polyfill for ie11
                        return renderWithGridLayout(
                          <EligibilityRegistration
                            {...props}
                            callbackFn={(token: string, name: string) =>
                              setUserSession(token, name, false, [])
                            }
                          />,
                        )
                      }}
                    ></Route>
                    <PrivateRoute exact={true} path="/dashboard">
                      {getDashboardPage(sessionData)}
                    </PrivateRoute>
                    <Route path="/privacypolicy">
                      <PrivacyPolicy />
                    </Route>
                    <Route path="/home">
                      <Intro token={token || null}></Intro>
                    </Route>
                    <Route path="/">
                      <Intro token={token || null}></Intro>
                    </Route>
                  </Switch>
                </TopNav>
                <Footer token={token} />
              </div>
            </Router>
          </div>
        </Typography>
      </ElegibilityProvider>
    </ThemeProvider>
  )
}

export default App
