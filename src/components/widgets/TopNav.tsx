import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { makeStyles } from '@material-ui/core/styles'
import Logout from '../login/Logout'
import btnClose from '../../assets/btn_close_dark.svg'
import {
  ListItem,
  List,
  Divider,
  Hidden,
  Button,
  Link,
} from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { systemFonts } from '../../App'
import { useSessionDataState, useSessionDataDispatch } from '../../AuthContext'
import { ReactComponent as MindKindLogo } from '../../assets/MindKindLogo.svg'
import i18n from '../../i18n'
import { useTranslation } from 'react-i18next'

type TopNavProps = {
  token: string | undefined
  logoutCallbackFn: Function
  showTopNavigator: boolean
}
const drawerWidth = 275
const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#2E2E2E', // dark
    backgroundColor: '#F4F4F4', // light
    minHeight: '80px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    minHeight: 'calc(100vh - 275px)',
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0,
  },
  navBarLink: {
    color: '#2E2E2E',
    '&:hover': {
      textDecoration: 'none',
      color: '#2E2E2E',
    },
  },
  fullNavBarLink: {
    fontFamily: systemFonts,
    color: '#2E2E2E',
    marginLeft: 30,
    paddingBottom: 7,
    fontWeight: 400,
    '&:hover': {
      textDecoration: 'none',
      color: '#2E2E2E',
    },
    '&:focus': {
      textDecoration: 'none',
      color: '#2E2E2E',
    },
  },
  fullNavBarLinkActive: {
    borderBottom: '4px solid #0084FF',
  },
  globalAlertMessage: {
    width: '100%',
  },
  fullNavBarButton: {
    whiteSpace: 'nowrap',
    minWidth: '100px',
    height: '37px',

    fontWeight: 'bold',
    border: '2px solid',
    '&:hover': {
      border: '2px solid',
    },
  },
  navbarTitle: {
    paddingTop: '11px',
    paddingLeft: '15px',
  },
  mobileMenuItem: {
    fontSize: '18px',
    fontWeight: 'bold',
    lineHeight: '30px',
    fontStyle: 'normal',
    padding: '10px 0px 10px 40px',
    color: '#2A2A2A',
  },
  mobileMenuSeparator: {
    height: '2px',
    margin: '20px 0px',
    backgroundColor: '#2A2A2A',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-end',
    height: '72px',
    marginBottom: '10px',
  },
  drawerCloseButton: {
    width: '48px',
  },
  drawerCloseIcon: {
    color: '#2A2A2A',
  },
}))

export const TopNav: React.FunctionComponent<TopNavProps> = props => {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [language, setLanguage] = React.useState(i18n.language)
  const classes = useStyles()
  const sessionData = useSessionDataState()

  const { t } = useTranslation()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  useEffect(() => {
    setLanguage(i18n.language)
  }, [i18n.language])

  const drawer = (
    <div>
      <div className={classes.drawerHeader}>
        <Link
          onClick={handleDrawerToggle}
          className={classes.drawerCloseButton}
        >
          <img className={classes.drawerCloseIcon} src={btnClose} alt=""></img>
        </Link>
      </div>
      <List>
        <NavLink
          to="/home"
          onClick={handleDrawerToggle}
          className={classes.navBarLink}
        >
          <ListItem button className={classes.mobileMenuItem}>
            {t('topnav.home')}
          </ListItem>
        </NavLink>
        <Divider className={classes.mobileMenuSeparator} />
        {props.token && sessionData.consented && (
          <NavLink
            to="/dashboard"
            onClick={handleDrawerToggle}
            className={classes.navBarLink}
          >
            <ListItem button className={classes.mobileMenuItem}>
              {t('topnav.dashboard')}
            </ListItem>
          </NavLink>
        )}
        {props.token && (
          <NavLink
            to="/logout"
            onClick={handleDrawerToggle}
            className={classes.navBarLink}
          >
            <ListItem button className={classes.mobileMenuItem}>
              <Logout
                onLogout={() => {
                  props.logoutCallbackFn(undefined, '', false)
                }}
              ></Logout>
            </ListItem>
          </NavLink>
        )}
        {!props.token && (
          <NavLink
            to="/eligibility"
            onClick={handleDrawerToggle}
            className={classes.navBarLink}
          >
            <ListItem button className={classes.mobileMenuItem}>
              {t('common.joinUs')}
            </ListItem>
          </NavLink>
        )}
        {!props.token && (
          <NavLink
            to="/login"
            onClick={handleDrawerToggle}
            className={classes.navBarLink}
          >
            <ListItem button className={classes.mobileMenuItem}>
              {t('topnav.login')}
            </ListItem>
          </NavLink>
        )}
      </List>
    </div>
  )

  const fullScreenNavBar = (
    <div style={{ display: language === 'es' ? 'flex' : 'block' }}>
      <NavLink
        to="/home"
        className={classes.fullNavBarLink}
        style={{ whiteSpace: 'nowrap' }}
        activeClassName={classes.fullNavBarLinkActive}
      >
        {t('topnav.home')}
      </NavLink>
      {props.token && sessionData.consented && (
        <NavLink
          to="/dashboard"
          className={classes.fullNavBarLink}
          activeClassName={classes.fullNavBarLinkActive}
        >
          {t('topnav.dashboard')}
        </NavLink>
      )}
      {props.token && (
        <NavLink
          to="/logout"
          className={classes.fullNavBarLink}
          activeClassName={classes.fullNavBarLinkActive}
        >
          <Logout
            onLogout={() => {
              props.logoutCallbackFn(undefined, '', false)
            }}
          ></Logout>
        </NavLink>
      )}
      {!props.token && (
        <NavLink to="/eligibility" className={classes.fullNavBarLink}>
          <Button
            style={{ marginLeft: '60px' }}
            color="primary"
            variant="outlined"
            className={classes.fullNavBarButton}
          >
            {t('common.joinUs')}
          </Button>
        </NavLink>
      )}
      {!props.token && (
        <NavLink to="/login" className={classes.fullNavBarLink}>
          <Button
            style={{ marginLeft: '60px' }}
            color="primary"
            variant="outlined"
            className={classes.navBarLink}
          >
            {t('topnav.login')}
          </Button>
        </NavLink>
      )}
    </div>
  )
  return (
    <div>
      {props.showTopNavigator ? (
        <div>
          <CssBaseline />
          <div className="no-print">
            <Toolbar className={classes.toolBar}>
              <div>
                <Typography variant="h6" noWrap className={classes.navbarTitle}>
                  <NavLink to="/home">
                    <MindKindLogo />
                  </NavLink>
                </Typography>
              </div>

              {/* show hamburger menu on xs and sm, but full nav bar on md and up */}
              <Hidden lgUp>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                </IconButton>
              </Hidden>
              <Hidden mdDown>{fullScreenNavBar}</Hidden>
            </Toolbar>
          </div>
          <nav className={classes.drawer}>
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </nav>
          <div className={classes.content}>{props.children}</div>
        </div>
      ) : (
        <div className={classes.content}>{props.children}</div>
      )}
    </div>
  )
}

export default TopNav
