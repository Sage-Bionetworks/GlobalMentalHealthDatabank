import React, { useState, useEffect } from 'react'
import './styles/style.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Intro from './components/static/Intro'
import EligibilityRegistration from './components/registration/EligibilityRegistration'
import Login from './components/login/Login'
import { useSessionDataState, useSessionDataDispatch } from './AuthContext'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline'
import {
  createMuiTheme,
  ThemeProvider,
  Typography,
  Grid,
} from '@material-ui/core'
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

const fallbackFonts = [
  'OpenSans',
  'serif',
  'Roboto',
  'Helvetica',
  'Arial',
  'Raleway',
  'Quicksand',
]

export const systemFonts = ['Lato', ...fallbackFonts].join(',')

export const playfairDisplayFont = ['Playfair Display', ...fallbackFonts].join(
  ',',
)

export const sourceSansFont = ['Source Sans Pro', ...fallbackFonts].join(',')

const defaultTheme = createMuiTheme()
const theme = createMuiTheme({
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 10,
    fontFamily: systemFonts,
    button: {
      textTransform: 'none',
    },
  },
  palette: {
    background: {
      default: '#f5f5f5',
    },
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#343F56', ///'#202423' //'#ff4400',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      //light: '#0066ff',
      main: '#ccc',
      // dark: will be calculated from palette.secondary.main,
      //contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        borderRadius: 0,
      },
    },
    MuiSwitch: {
      track: {
        backgroundColor: '#807C7C',
      },
    },
    MuiButton: {
      root: {
        borderRadius: 25,
        height: 47,
        fontFamily: systemFonts,
        fontWeight: 700,
        color: 'white',
      },
      text: {
        borderRadius: 25,
        height: 47,
        fontFamily: systemFonts,
        color: 'white',
        '&:hover': {
          background: 'none',
          textDecoration: 'underline',
        },
      },
      containedPrimary: {
        color: 'white',
      },
    },
    MuiInputBase: {
      root: {
        fontFamily: systemFonts,
      },
    },
    MuiCard: {
      root: {
        backgroundColor: 'white',
        maxWidth: '511px',
        margin: '0 auto',
        padding: '40px',
      },
    },
    MuiCardContent: {
      root: {
        [defaultTheme.breakpoints.up('md')]: {
          padding: '46px',
        },

        '&:last-child': {
          [defaultTheme.breakpoints.up('md')]: {
            paddingBottom: '46px',
          },
        },
      },
    },
  },
})

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

  const getTopClass = (location: string) => {
    const alertClass = !!sessionData.alert ? ' hasAlert' : ''
    const specialPages = ['survey', 'contactinfo', 'appointment']
    if (specialPages.find(page => location.toLowerCase().includes(page))) {
      return `partialGreen${alertClass}`
    }
    //dashboard is green for users to haven't tested
    if (
      location.toLowerCase().includes('dashboard') &&
      sessionData.userDataGroup.indexOf('tests_available') === -1
    ) {
      return `partialGreen${alertClass}`
    } else {
      return ''
    }
  }

  const shouldShowFooter = (location: string): boolean => {
    const specialPages = ['dashboard', 'survey', 'contactinfo', 'consent']
    return (
      specialPages.find(page => location.toLowerCase().includes(page)) ===
      undefined
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <ElegibilityProvider>
        <Typography component={'div'}>
          <div className={classes.root}>
            <CssBaseline />
            <Router>
              <div className={getTopClass(currentLocation)}>
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
                {shouldShowFooter(currentLocation) && <Footer token={token} />}
              </div>
            </Router>
          </div>
        </Typography>
      </ElegibilityProvider>
    </ThemeProvider>
  )
}

export default App
