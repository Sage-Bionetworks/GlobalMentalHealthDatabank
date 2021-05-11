import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
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
import { ReactComponent as MindKindLogoDark } from '../../assets/MindKindLogoDark.svg'
import i18n from '../../i18n'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Burger } from '../../assets/burger.svg'

type TopNavProps = {
  token: string | undefined
  logoutCallbackFn: Function
  showTopNavigator: boolean
}

export const TopNav: React.FunctionComponent<TopNavProps> = props => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { language } = i18n
  const sessionData = useSessionDataState()

  const { t } = useTranslation()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <div className="drawer__header">
        <Link onClick={handleDrawerToggle} className="drawer__close-button">
          <img className="drawer__close-icon " src={btnClose} alt="close"></img>
        </Link>
      </div>
      <List>
        <NavLink
          to="/home"
          onClick={handleDrawerToggle}
          className="topnav__link"
        >
          <ListItem button className="mobile-menu__item">
            {t('topnav.home')}
          </ListItem>
        </NavLink>
        <Divider className="mobile-menu__separator" />
        {props.token && sessionData.consented && (
          <NavLink
            to="/dashboard"
            onClick={handleDrawerToggle}
            className="topnav__link"
          >
            <ListItem button className="mobile-menu__item">
              {t('topnav.dashboard')}
            </ListItem>
          </NavLink>
        )}
        {props.token && (
          <NavLink
            to="/logout"
            onClick={handleDrawerToggle}
            className="topnav__link"
          >
            <ListItem button className="mobile-menu__item">
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
            className="topnav__link"
          >
            <ListItem button className="mobile-menu__item">
              {t('common.joinUs')}
            </ListItem>
          </NavLink>
        )}
        {!props.token && (
          <NavLink
            to="/login"
            onClick={handleDrawerToggle}
            className="topnav__link"
          >
            <ListItem button className="mobile-menu__item">
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
        className="topnav__link--full"
        style={{ whiteSpace: 'nowrap' }}
        activeClassName="topnav__link--active"
      >
        {t('topnav.home')}
      </NavLink>
      {props.token && sessionData.consented && (
        <NavLink
          to="/dashboard"
          className="topnav__link--full"
          activeClassName="topnav__link--active"
        >
          {t('topnav.dashboard')}
        </NavLink>
      )}
      {props.token && (
        <NavLink
          to="/logout"
          className="topnav__link--full"
          activeClassName="topnav__link--active"
        >
          <Logout
            onLogout={() => {
              props.logoutCallbackFn(undefined, '', false)
            }}
          ></Logout>
        </NavLink>
      )}
      {!props.token && (
        <NavLink to="/eligibility" className="topnav__link--full">
          <Button
            style={{ marginLeft: '60px' }}
            color="primary"
            variant="outlined"
            className="topnav__button--full"
          >
            {t('common.joinUs')}
          </Button>
        </NavLink>
      )}
      {!props.token && (
        <NavLink to="/login" className="topnav__link--full">
          <Button
            style={{ marginLeft: '60px' }}
            color="primary"
            variant="outlined"
            className="topnav__link"
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
            <Toolbar className="tool-bar" style={{ minHeight: '80px' }}>
              <div>
                <Typography variant="h6" noWrap className="topnav__title">
                  <NavLink to="/home">
                    <MindKindLogoDark />
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
                  className="menu__button"
                >
                  <Burger />
                </IconButton>
              </Hidden>
              <Hidden mdDown>{fullScreenNavBar}</Hidden>
            </Toolbar>
          </div>
          <nav className="drawer">
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              className="drawer__paper"
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </nav>
          <div className="topnav__content">{props.children}</div>
        </div>
      ) : (
        <div className="topnav__content">{props.children}</div>
      )}
    </div>
  )
}

export default TopNav
