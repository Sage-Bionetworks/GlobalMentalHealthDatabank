import React, { useEffect } from 'react'
import { ThemeProvider, Typography } from '@material-ui/core'
import { Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline'
import { EligibilityProvider } from './components/eligibility/context/EligibilityContext'
import { RankedChoiceProvider } from './components/dashboard/RankedChoice/context/RankedChoiceContext'
import { useSessionDataState } from './AuthContext'
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
import useAuth from 'helpers/hooks/useAuth'
import './styles/style.scss'

function App() {
  const { token } = useSessionDataState()
  const { loginDispatch, logoutDispatch } = useAuth()

  useEffect(() => {
    let isSubscribed = true
    async function getInfo(token: string | undefined) {
      if (token && isSubscribed) {
        try {
          const userInfo = await UserService.getUserInfo(token)
          userInfo.data.sessionToken = token
          loginDispatch(userInfo)
        } catch (e) {
          logoutDispatch()
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
              <div>
                <GoogleAnalyticsPageTracker />
                <TopNav token={token} logoutCallbackFn={logoutDispatch}>
                  <Switch>
                    <Route exact={true} path={ROUTES.SIGNIN}>
                      <Login />
                    </Route>
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
            </div>
          </Typography>
        </RankedChoiceProvider>
      </EligibilityProvider>
    </ThemeProvider>
  )
}

export default App
