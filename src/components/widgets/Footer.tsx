import React from 'react'
import { NavLink } from 'react-router-dom'
import { Toolbar } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import { useTranslation } from 'react-i18next'

export const Footer: React.FunctionComponent = () => {
  const { t } = useTranslation()
  return (
    <div>
      <div className="footer">
        <CssBaseline />
        <div className="footer__container">
          <div className="footer__disclaimer">{t('footer.disclaimer')}</div>

          <div className="footer__column desktop">
            <Toolbar className="footer__toolbar">
              <NavLink to="/home" className="footer__navlink">
                {t('footer.home')}
              </NavLink>
              <NavLink to="/about" className="footer__navlink">
                {t('footer.about')}
              </NavLink>
              <NavLink to="/home" className="footer__navlink">
                {t('footer.team')}
              </NavLink>
              <NavLink to="/contact" className="footer__navlink">
                {t('footer.crisis')}
              </NavLink>
              <NavLink to="/eligibility" className="footer__navlink">
                {t('footer.join')}
              </NavLink>
              <NavLink to="/home" className="footer__navlink">
                {t('footer.consent1')}
              </NavLink>
              <NavLink to="/home" className="footer__navlink">
                {t('footer.consent2')}
              </NavLink>
              <NavLink to="/home" className="footer__navlink">
                {t('footer.consent3')}
              </NavLink>
            </Toolbar>
          </div>

          <div className="footer__column mobile">
            <Toolbar className="footer__toolbar">
              <NavLink to="/home" className="footer__navlink">
                {t('footer.home')}
              </NavLink>
              <NavLink to="/about" className="footer__navlink">
                {t('footer.about')}
              </NavLink>
              <NavLink to="/home" className="footer__navlink">
                {t('footer.team')}
              </NavLink>
              <NavLink to="/contact" className="footer__navlink">
                {t('footer.crisis')}
              </NavLink>
            </Toolbar>
          </div>
          <div className="footer__column mobile">
            <Toolbar className="footer__toolbar">
              <NavLink to="/eligibility" className="footer__navlink">
                {t('footer.join')}
              </NavLink>
              <NavLink to="/home" className="footer__navlink">
                {t('footer.consent1')}
              </NavLink>
              <NavLink to="/home" className="footer__navlink">
                {t('footer.consent2')}
              </NavLink>
              <NavLink to="/home" className="footer__navlink">
                {t('footer.consent3')}
              </NavLink>
            </Toolbar>
          </div>

          <div className="footer__bottom">
            <div className="footer__column">{t('footer.copyright')}</div>
            <div className="footer__column">
              <NavLink to="/home" className="footer__navlink underlined bottom">
                {t('footer.privacy')}
              </NavLink>
              <span className="separator">|</span>
              <NavLink
                to="/dataregulation"
                className="footer__navlink underlined bottom"
              >
                {t('footer.dataRights')}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
