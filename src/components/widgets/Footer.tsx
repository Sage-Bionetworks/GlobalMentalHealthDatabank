import React from 'react'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Toolbar } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import { openSansFont, sourceSansFont } from '../../App'
import { ReactComponent as CZILogo } from '../../assets/czi_logo.svg'
import { useTranslation, Trans } from 'react-i18next'

type FooterProps = {
  token: string | undefined
}

const useStyles = makeStyles(theme => ({
  footer: {
    color: '#FFFFFF',
    backgroundColor: '#314D61',
    minHeight: '175px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  toolBar: {
    padding: '50px 0px 15px 20px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '35px 0px',
    },
  },
  content: {
    flexGrow: 1,
  },
  questionsCommentsText: {
    color: '#FFFFFF',
    fontFamily: sourceSansFont,
    fontSize: '13px',
    lineHeight: '16px',
    letterSpacing: '0.01em',
    padding: '20px 50px 30px 50px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '30px',
    },
  },
  questionCommentsLink: {
    color: '#FFFFFF',
  },
  fullNavBarLink: {
    fontFamily: openSansFont,
    color: '#FCFCFC',
    fontSize: '13px',
    lineHeight: '16px',
    marginLeft: 30,
    paddingBottom: 7,
    '&:hover': {
      textDecoration: 'none',
      color: '#FCFCFC',
    },
    '&:focus': {
      textDecoration: 'none',
      color: '#FCFCFC',
    },
  },
  cziLogoDiv: {
    padding: '40px 50px 40px 30px',
  },
}))

export const Footer: React.FunctionComponent<FooterProps> = props => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <div>
      <div className={classes.footer}>
        <CssBaseline />
        <div></div>
        <div>
          <Toolbar className={classes.toolBar}>
            {props.token && (
              <NavLink to="/dashboard" className={classes.fullNavBarLink}>
                {t('footer.dashboard')}
              </NavLink>
            )}
            <NavLink to="/home" className={classes.fullNavBarLink}>
              {t('footer.about')}
            </NavLink>
            <NavLink to="/team" className={classes.fullNavBarLink}>
              {t('footer.meet')}
            </NavLink>
            <NavLink to="/faqs" className={classes.fullNavBarLink}>
              {t('footer.faq')}
            </NavLink>
            <NavLink to="/contact" className={classes.fullNavBarLink}>
              {t('footer.contactUs')}
            </NavLink>
            <NavLink to="/privacypolicy" className={classes.fullNavBarLink}>
              {t('footer.privacy')}
            </NavLink>
            {props.token && (
              <NavLink to="/settings" className={classes.fullNavBarLink}>
                {t('footer.settings')}
              </NavLink>
            )}
            {/* the toolbar is a flex layout, whose flex direction changes on smaller devices.  add an empty element for correct spacing or newline */}
            <div className={classes.fullNavBarLink}></div>

            {!props.token && (
              <>
              <NavLink to="/login" className={classes.fullNavBarLink}>
                {t('footer.login')}
              </NavLink>
              <NavLink to="/eligibility" className={classes.fullNavBarLink}>
                {t('footer.join')}
              </NavLink>
              </>
            )}
          </Toolbar>
          <div className={classes.questionsCommentsText}>
            <Trans i18nKey="footer.text1">
              [translate]
              <a className={classes.questionCommentsLink} href="mailto:privacypolicy@sagebionetworks.org">[translate]</a>
            </Trans>
          </div>
        </div>
        <div className={classes.cziLogoDiv}>
          <a href="https://chanzuckerberg.com/">
            <CZILogo />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
