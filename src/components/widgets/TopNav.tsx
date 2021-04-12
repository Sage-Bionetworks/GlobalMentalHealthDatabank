import React, { useState } from 'react'
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
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { useSessionDataState } from '../../AuthContext'
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
    color: '#2E2E2E',
    backgroundColor: '#F4F4F4',
    minHeight: '80px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawerPaper: {
    width: drawerWidth,
  },
}))

export const TopNav: React.FunctionComponent<TopNavProps> = props => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { language } = i18n
  const classes = useStyles()
  const sessionData = useSessionDataState()

  const { t } = useTranslation()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <div className="drawerHeader">
        <Link onClick={handleDrawerToggle} className="drawerCloseButton">
          <img className="drawerCloseIcon" src={btnClose} alt="close"></img>
        </Link>
      </div>
      <List>
        <NavLink to="/home" onClick={handleDrawerToggle} className="navBarLink">
          <ListItem button className="mobileMenuItem">
            {t('topnav.home')}
          </ListItem>
        </NavLink>
        <Divider className="mobileMenuSeparator" />
        {props.token && sessionData.consented && (
          <NavLink
            to="/dashboard"
            onClick={handleDrawerToggle}
            className="navBarLink"
          >
            <ListItem button className="mobileMenuItem">
              {t('topnav.dashboard')}
            </ListItem>
          </NavLink>
        )}
        {props.token && (
          <NavLink
            to="/logout"
            onClick={handleDrawerToggle}
            className="navBarLink"
          >
            <ListItem button className="mobileMenuItem">
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
            className="navBarLink"
          >
            <ListItem button className="mobileMenuItem">
              {t('common.joinUs')}
            </ListItem>
          </NavLink>
        )}
        {!props.token && (
          <NavLink
            to="/login"
            onClick={handleDrawerToggle}
            className="navBarLink"
          >
            <ListItem button className="mobileMenuItem">
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
        className="fullNavBarLink"
        style={{ whiteSpace: 'nowrap' }}
        activeClassName="fullNavBarLinkActive"
      >
        {t('topnav.home')}
      </NavLink>
      {props.token && sessionData.consented && (
        <NavLink
          to="/dashboard"
          className="fullNavBarLink"
          activeClassName="fullNavBarLinkActive"
        >
          {t('topnav.dashboard')}
        </NavLink>
      )}
      {props.token && (
        <NavLink
          to="/logout"
          className="fullNavBarLink"
          activeClassName="fullNavBarLinkActive"
        >
          <Logout
            onLogout={() => {
              props.logoutCallbackFn(undefined, '', false)
            }}
          ></Logout>
        </NavLink>
      )}
      {!props.token && (
        <NavLink to="/eligibility" className="fullNavBarLink">
          <Button
            style={{ marginLeft: '60px' }}
            color="primary"
            variant="outlined"
            className="fullNavBarButton"
          >
            {t('common.joinUs')}
          </Button>
        </NavLink>
      )}
      {!props.token && (
        <NavLink to="/login" className="fullNavBarLink">
          <Button
            style={{ marginLeft: '60px' }}
            color="primary"
            variant="outlined"
            className="navBarLink"
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
          <div className="no-print">
            <Toolbar className={classes.toolBar}>
              <div>
                <Typography variant="h6" noWrap className="navbarTitle">
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
          <div className="content">{props.children}</div>
        </div>
      ) : (
        <div className="content">{props.children}</div>
      )}
    </div>
  )
}

export default TopNav
