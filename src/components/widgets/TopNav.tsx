import React, { useState } from 'react'
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
  Select,
  MenuItem,
} from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import Logout from '../login/Logout'
import btnClose from '../../assets/btn_close_dark.svg'
import { ReactComponent as MindKindLogoDark } from '../../assets/MindKindLogoDark.svg'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Burger } from '../../assets/burger.svg'
import { ReactComponent as ChevronDownLight } from '../../assets/chevron-down-light.svg'

type TopNavProps = {
  token: string | undefined
  logoutCallbackFn: Function
  showTopNavigator: boolean
}

export const TopNav: React.FunctionComponent<TopNavProps> = props => {
  const { t } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const OPTIONS = [
    t('topnav.english'),
    t('topnav.southAfrica'),
    t('topnav.india'),
  ]
  const [selectedPDFLanguageDownload, setSelectedPDFLanguageDownload] =
    useState(OPTIONS[0] || '')

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
          to="/home"
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

        <NavLink
          to="/home"
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
          to="/home"
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
          to="/contact"
          onClick={handleDrawerToggle}
          className="topnav__link"
        >
          <ListItem button className="mobile-menu__item">
            <Typography variant="h6" className="topnav__text">
              {t('topnav.ifInCrisis')}
            </Typography>
          </ListItem>
        </NavLink>

        {!props.token && (
          <NavLink
            to="/eligibility"
            onClick={handleDrawerToggle}
            className="topnav__link"
          >
            <ListItem button className="mobile-menu__item">
              <Typography variant="h6" className="topnav__text">
                {t('common.joinStudy')}
              </Typography>
            </ListItem>
          </NavLink>
        )}
        {!props.token && (
          <NavLink
            to="/signin"
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
        <Divider className="mobile-menu__separator" />
        <NavLink
          to="/home"
          onClick={handleDrawerToggle}
          className="topnav__link"
        >
          <ListItem button className="mobile-menu__item">
            <Typography variant="h6" className="topnav__text">
              {' '}
              {t('topnav.consent1')}
            </Typography>
          </ListItem>
        </NavLink>
        <NavLink
          to="/home"
          onClick={handleDrawerToggle}
          className="topnav__link"
        >
          <ListItem button className="mobile-menu__item">
            <Typography variant="h6" className="topnav__text">
              {t('topnav.consent2')}
            </Typography>
          </ListItem>
        </NavLink>
        <NavLink
          to="/home"
          onClick={handleDrawerToggle}
          className="topnav__link"
        >
          <ListItem button className="mobile-menu__item">
            <Typography variant="h6" className="topnav__text">
              {' '}
              {t('topnav.consent3')}
            </Typography>
          </ListItem>
        </NavLink>
      </List>
    </div>
  )

  const fullScreenNavBar = (
    <div>
      <div className="topnav-center-section">
        <NavLink to="/home" className="topnav__link--full centered">
          <Typography variant="h6" className="topnav__text">
            {t('topnav.home')}
          </Typography>
        </NavLink>
        <NavLink to="/home" className="topnav__link--full centered">
          <Typography variant="h6" className="topnav__text">
            {t('topnav.about')}
          </Typography>
        </NavLink>
        <NavLink to="/home" className="topnav__link--full centered">
          <Typography variant="h6" className="topnav__text">
            {t('topnav.research')}
          </Typography>
        </NavLink>
        <NavLink to="/contact" className="topnav__link--full centered">
          <Typography variant="h6" className="topnav__text">
            {t('topnav.crisis')}
          </Typography>
        </NavLink>
      </div>
      <div className="topnav-right-section">
        <Select
          className="select-pdf"
          value={selectedPDFLanguageDownload}
          onChange={(e: any) => setSelectedPDFLanguageDownload(e.target.value)}
          disableUnderline
          IconComponent={() => <ChevronDownLight />}
        >
          <MenuItem className="select-pdf" value={OPTIONS[0]}>
            <Typography variant="h6" className="topnav__text">
              {t('topnav.english')}
            </Typography>
          </MenuItem>
          <MenuItem className="select-pdf" value={OPTIONS[1]}>
            <Typography variant="h6" className="topnav__text">
              {t('topnav.southAfrica')}
            </Typography>
          </MenuItem>
          <MenuItem className="select-pdf" value={OPTIONS[2]}>
            <Typography variant="h6" className="topnav__text">
              {t('topnav.india')}
            </Typography>
          </MenuItem>
        </Select>

        {!props.token && (
          <NavLink to="/eligibility" className="topnav__link--full">
            <Typography variant="h6" className="topnav__text">
              {t('common.joinStudy')}
            </Typography>
          </NavLink>
        )}
        {!props.token && (
          <NavLink to="/signin" className="topnav__link--full">
            <Typography variant="h6" className="topnav__text">
              {t('topnav.login')}
            </Typography>
          </NavLink>
        )}

        {props.token && (
          <NavLink to="/logout" className="topnav__link--full logout">
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
      {props.showTopNavigator ? (
        <div>
          <div className="no-print">
            <Toolbar className="tool-bar">
              <Typography variant="h6" noWrap className="topnav__title">
                <NavLink to="/home">
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
      ) : (
        <div className="topnav__content">{props.children}</div>
      )}
    </div>
  )
}

export default TopNav
