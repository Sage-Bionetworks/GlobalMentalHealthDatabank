import React, { useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline'
import { ThemeProvider, Typography } from '@material-ui/core'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Home from './components/static/Home'
import Contact from './components/static/Contact'
import About from './components/static/About'
import ResearchTeam from './components/static/ResearchTeam'
import EligibilityRegistration from './components/registration/EligibilityRegistration'
import Login from './components/login/Login'
import Dashboard from './components/dashboard/Dashboard'
import DownloadApp from './components/dashboard/DownloadApp'
import { TopNav } from './components/widgets/TopNav'
import GoogleAnalyticsPageTracker from './components/widgets/GoogleAnalyticsPageTracker'
import Footer from './components/widgets/Footer'
import DataRegulation from './components/static/DataRegulation'
import PrivacyPolicy from './components/static/PrivacyPolicy'
import Terms from './components/static/Terms'
import ConsentInfo from './components/static/ConsentInfo'
import { UserDataGroup, SessionData } from './types/types'
import { ElegibilityProvider } from './components/registration/context/ElegibilityContext'
import { RankedChoiceProvider } from './components/dashboard/RankedChoice/context/RankedChoiceContext'
import { useSessionDataState, useSessionDataDispatch } from './AuthContext'
import { UserService } from './services/user.service'
import { theme } from './theme'
import './styles/style.scss'
import { ROUTES } from './constants/constants'

function App() {
  const sessionData: SessionData = useSessionDataState()
  const sessionUpdateFn = useSessionDataDispatch()
  const { token } = sessionData

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                pathname: ROUTES.SIGNIN,
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
                  <TopNav
                    token={token}
                    logoutCallbackFn={() =>
                      setUserSession(undefined, '', false, [])
                    }
                  >
                    <Switch>
                      <Route
                        exact={true}
                        path={ROUTES.SIGNIN}
                        render={() => {
                          return <Login />
                        }}
                      ></Route>
                      <Route
                        path={ROUTES.ELIGIBILITY}
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
                      <PrivateRoute exact={true} path={ROUTES.CONSENT_STEPS}>
                        <Dashboard token={token || ''} />
                      </PrivateRoute>
                      <Route path={ROUTES.DATA_REGULATION}>
                        <DataRegulation />
                      </Route>
                      <Route path={ROUTES.CONSENT_INFO}>
                        <ConsentInfo />
                      </Route>
                      <Route path={ROUTES.PRIVACY_POLICY}>
                        <PrivacyPolicy />
                      </Route>
                      <Route path={ROUTES.TERMS}>
                        <Terms />
                      </Route>
                      <Route path={ROUTES.DOWNLOAD}>
                        <DownloadApp />
                      </Route>
                      <Route path={ROUTES.CONTACT}>
                        <Contact />
                      </Route>
                      <Route path={ROUTES.ABOUT}>
                        <About />
                      </Route>
                      <Route path={ROUTES.RESEARCH}>
                        <ResearchTeam />
                      </Route>
                      <Route path={ROUTES.HOME}>
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
