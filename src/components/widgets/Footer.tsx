import React from 'react'
import { NavLink } from 'react-router-dom'
import { Toolbar } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import useBreakpoint from '../../helpers/hooks/useBreakpoint'

export const Footer: React.FunctionComponent = () => {
  const { t } = useTranslation()
  const breakpoint = useBreakpoint()
  const isMobile = breakpoint < 768
  return (
    <div>
      <div className="footer">
        <div className="footer__container">
          <div className="footer__disclaimer__mobile">
            {t('footer.disclaimer')}
          </div>

          <div className="footer-links">
            <div className="footer__column">
              <Toolbar className="footer__toolbar">
                <NavLink to="/home" className="footer__navlink">
                  {t('footer.home')}
                </NavLink>
                <NavLink to="/about" className="footer__navlink">
                  {t('footer.about')}
                </NavLink>
                <NavLink to="/research" className="footer__navlink">
                  {t('footer.team')}
                </NavLink>
              </Toolbar>
            </div>
            <div className="footer__column">
              <Toolbar className="footer__toolbar">
                <NavLink to="/eligibility" className="footer__navlink">
                  {t('footer.join')}
                </NavLink>
                <NavLink to="/contact" className="footer__navlink">
                  {t('footer.crisis')}
                </NavLink>
                <NavLink to="/consent-info" className="footer__navlink">
                  {t('footer.consent')}
                </NavLink>
              </Toolbar>
            </div>
          </div>

          <div className="footer__bottom">
            <div className="footer__disclaimer__desktop">
              {t('footer.disclaimer')}
            </div>
            <div className="footer__column">{t('footer.copyright')}</div>
            <div className="footer__column">
              <NavLink to="/data-regulation" className="footer__navlink bottom">
                {t('footer.dataRights')}
              </NavLink>
              <span className="separator">|</span>
              <NavLink to="/privacy-policy" className="footer__navlink bottom">
                {isMobile
                  ? t('footer.privacy').split(' ')[0]
                  : t('footer.privacy')}
              </NavLink>
              <span className="separator">|</span>
              <NavLink to="/terms" className="footer__navlink bottom">
                {isMobile ? t('footer.terms').split(' ')[0] : t('footer.terms')}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
