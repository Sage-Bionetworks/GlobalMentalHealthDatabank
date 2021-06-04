import React, { useState } from 'react'
import Logout from '../login/Logout'
import btnClose from '../../assets/btn_close_dark.svg'
import {
  Typography,
  ListItem,
  List,
  Divider,
  Hidden,
  Link,
  Drawer,
  IconButton,
  Toolbar,
} from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { ReactComponent as MindKindLogoDark } from '../../assets/MindKindLogoDark.svg'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Burger } from '../../assets/burger.svg'
import { ROUTES } from '../../constants/constants'

type TopNavProps = {
  token: string | undefined
  logoutCallbackFn: Function
}

export const TopNav: React.FunctionComponent<TopNavProps> = props => {
  const { t } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <div className="drawer__header">
        <Link onClick={handleDrawerToggle} className="drawer__close-button">
          <img className="drawer__close-icon" src={btnClose} alt="close" />
        </Link>
      </div>
      <List>
        <NavLink
          to={ROUTES.HOME}
          onClick={handleDrawerToggle}
          className="topnav__link"
        >
          <ListItem button className="mobile-menu__item">
            <Typography variant="h6" className="topnav__text">
              {t('topnav.home')}
            </Typography>
          </ListItem>
        </NavLink>
        <Divider className="mobile-menu__separator" />

        <NavLink
          to={ROUTES.ABOUT}
          onClick={handleDrawerToggle}
          className="topnav__link"
        >
          <ListItem button className="mobile-menu__item">
            <Typography variant="h6" className="topnav__text">
              {t('topnav.aboutStudy')}
            </Typography>
          </ListItem>
        </NavLink>
        <NavLink
          to={ROUTES.RESEARCH}
          onClick={handleDrawerToggle}
          className="topnav__link"
        >
          <ListItem button className="mobile-menu__item">
            <Typography variant="h6" className="topnav__text">
              {t('topnav.researchTeam')}
            </Typography>
          </ListItem>
        </NavLink>
        <NavLink
          to={ROUTES.CONTACT}
          onClick={handleDrawerToggle}
          className="topnav__link"
        >
          <ListItem button className="mobile-menu__item">
            <Typography variant="h6" className="topnav__text">
              {t('topnav.crisis')}
            </Typography>
          </ListItem>
        </NavLink>

        <NavLink
          to={ROUTES.CONSENT_INFO}
          onClick={handleDrawerToggle}
          className="topnav__link"
        >
          <ListItem button className="mobile-menu__item">
            <Typography variant="h6" className="topnav__text">
              {t('topnav.consent')}
            </Typography>
          </ListItem>
        </NavLink>

        <NavLink
          to={ROUTES.ELIGIBILITY}
          onClick={handleDrawerToggle}
          className="topnav__link"
        >
          <ListItem button className="mobile-menu__item">
            <Typography variant="h6" className="topnav__text">
              {t('common.joinStudy')}
            </Typography>
          </ListItem>
        </NavLink>

        {!props.token && (
          <NavLink
            to={ROUTES.SIGNIN}
            onClick={handleDrawerToggle}
            className="topnav__link"
          >
            <ListItem button className="mobile-menu__item">
              <Typography variant="h6" className="topnav__text">
                {t('topnav.login')}
              </Typography>
            </ListItem>
          </NavLink>
        )}
        {props.token && (
          <NavLink
            to={ROUTES.LOGOUT}
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
      </List>
    </div>
  )

  const fullScreenNavBar = (
    <div>
      <div className="topnav-center-section">
        <NavLink to={ROUTES.HOME} className="topnav__link--full centered">
          <Typography variant="h6" className="topnav__text">
            {t('topnav.home')}
          </Typography>
        </NavLink>
        <NavLink to={ROUTES.ABOUT} className="topnav__link--full centered">
          <Typography variant="h6" className="topnav__text">
            {t('topnav.aboutStudy')}
          </Typography>
        </NavLink>
        <NavLink to={ROUTES.RESEARCH} className="topnav__link--full centered">
          <Typography variant="h6" className="topnav__text">
            {t('topnav.researchTeam')}
          </Typography>
        </NavLink>
        <NavLink to={ROUTES.CONTACT} className="topnav__link--full centered">
          <Typography variant="h6" className="topnav__text">
            {t('topnav.crisis')}
          </Typography>
        </NavLink>
        <NavLink
          to={ROUTES.CONSENT_INFO}
          className="topnav__link--full centered"
        >
          <Typography variant="h6" className="topnav__text">
            {t('topnav.consent')}
          </Typography>
        </NavLink>
      </div>
      <div className="topnav-right-section">
        {
          <NavLink to={ROUTES.ELIGIBILITY} className="topnav__link--full">
            <Typography variant="h6" className="topnav__text">
              {t('common.joinStudy')}
            </Typography>
          </NavLink>
        }
        {!props.token && (
          <NavLink to={ROUTES.SIGNIN} className="topnav__link--full">
            <Typography variant="h6" className="topnav__text">
              {t('topnav.login')}
            </Typography>
          </NavLink>
        )}

        {props.token && (
          <NavLink to={ROUTES.LOGOUT} className="topnav__link--full logout">
            <Logout
              onLogout={() => {
                props.logoutCallbackFn(undefined, '', false)
              }}
            ></Logout>
          </NavLink>
        )}
      </div>
    </div>
  )

  return (
    <div>
      <div>
        <div className="no-print">
          <Toolbar className="tool-bar">
            <Typography variant="h6" noWrap className="topnav__title">
              <NavLink to={ROUTES.HOME}>
                <MindKindLogoDark />
              </NavLink>
            </Typography>
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
    </div>
  )
}

export default TopNav
