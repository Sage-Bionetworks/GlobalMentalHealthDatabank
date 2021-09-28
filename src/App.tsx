import React, { useEffect } from 'react'
import { ThemeProvider, Typography } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline'
import { SessionData } from './types/types'
import { EligibilityProvider } from './components/eligibility/context/EligibilityContext'
import { RankedChoiceProvider } from './components/dashboard/RankedChoice/context/RankedChoiceContext'
import { useSessionDataState, useSessionDataDispatch } from './AuthContext'
import { UserService } from './services/user.service'
import { theme } from './theme'
import { TopNav } from './components/widgets/TopNav'
import { ROUTES } from './constants/constants'
import Home from './components/static/Home'
import Contact from './components/static/Contact'
import About from './components/static/About'
import ResearchTeam from './components/static/ResearchTeam'
import Login from './components/login/Login'
import Hub from './components/dashboard/Hub/'
import DownloadApp from './components/static/DownloadApp'
import GoogleAnalyticsPageTracker from './components/widgets/GoogleAnalyticsPageTracker'
import Footer from './components/widgets/Footer'
import DataRegulation from './components/static/DataRegulation'
import PrivacyPolicy from './components/static/PrivacyPolicy'
import Terms from './components/static/Terms'
import ConsentInfo from './components/static/ConsentInfo'
import './styles/style.scss'

function App() {
  const sessionData: SessionData = useSessionDataState()
  const sessionDispatch = useSessionDataDispatch()
  const { token } = sessionData

  useEffect(() => {
    let isSubscribed = true
    async function getInfo(token: string | undefined) {
      if (token && isSubscribed) {
        try {
          const userInfo = await UserService.getUserInfo(token)
          const newSessionData = {
            token,
            name: userInfo.data.firstName,
            consented: userInfo.data.consented,
            userDataGroup: userInfo.data.dataGroups,
          }
          sessionDispatch({
            type: 'LOGIN',
            payload: {
              ...sessionData,
              ...newSessionData,
            },
          })
        } catch (e) {
          sessionDispatch({ type: 'LOGOUT' })
        }
      }
    }
    getInfo(token)
    return () => {
      isSubscribed = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <ThemeProvider theme={theme}>
      <EligibilityProvider>
        <RankedChoiceProvider>
          <Typography component={'div'}>
            <div style={{ height: '100%' }}>
              <CssBaseline />
              <Router>
                <div>
                  <GoogleAnalyticsPageTracker />
                  <TopNav
                    token={token}
                    logoutCallbackFn={() => sessionDispatch({ type: 'LOGOUT' })}
                  >
                    <Switch>
                      <Route
                        exact={true}
                        path={ROUTES.SIGNIN}
                        render={() => {
                          return <Login />
                        }}
                      ></Route>
                      <Route path={'/hub'}>
                        <Hub />
                      </Route>
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
      </EligibilityProvider>
    </ThemeProvider>
  )
}

export default App
