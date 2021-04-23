import React from 'react'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Toolbar } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import { useTranslation } from 'react-i18next'

type FooterProps = {
  token: string | undefined
}

const useStyles = makeStyles(theme => ({
  toolBar: {
    [theme.breakpoints.up('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '35px 0px 15px 0px',
      width: '30%',
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      flexWrap: 'nowrap',
      order: 2,
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      padding: '35px 35px 15px 0px',
      width: '45%',
    },
  },
}))

export const Footer: React.FunctionComponent<FooterProps> = props => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <div>
      <div className="footer">
        <CssBaseline />
        <div className="footer__container">
          <Toolbar className={classes.toolBar}>
            <NavLink to="/home" className="footer__navlink">
              {t('footer.home')}
            </NavLink>
            <NavLink to="/home" className="footer__navlink">
              {t('footer.about')}
            </NavLink>
            <NavLink to="/home" className="footer__navlink">
              {t('footer.contact')}
            </NavLink>
            <NavLink to="/home" className="footer__navlink">
              {t('footer.team')}
            </NavLink>
          </Toolbar>
          <div className="footer__texts">
            <div>{t('footer.disclaimer')}</div>
            <div>{t('footer.copyright')}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
