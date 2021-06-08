import React from 'react'
import { NavLink } from 'react-router-dom'
import { Toolbar } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import useBreakpoint from '../../helpers/hooks/useBreakpoint'
import { ROUTES } from '../../constants/constants'

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
                <NavLink to={ROUTES.HOME} className="footer__navlink">
                  {t('footer.home')}
                </NavLink>
                <NavLink to={ROUTES.ABOUT} className="footer__navlink">
                  {t('footer.about')}
                </NavLink>
                <NavLink to={ROUTES.RESEARCH} className="footer__navlink">
                  {t('footer.team')}
                </NavLink>
              </Toolbar>
            </div>
            <div className="footer__column">
              <Toolbar className="footer__toolbar">
                <NavLink to={ROUTES.ELIGIBILITY} className="footer__navlink">
                  {t('footer.join')}
                </NavLink>
                <NavLink to={ROUTES.CONTACT} className="footer__navlink">
                  {t('footer.crisis')}
                </NavLink>
                <NavLink to={ROUTES.CONSENT_INFO} className="footer__navlink">
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
            <div className="footer__column padleft">
              <NavLink
                to={ROUTES.DATA_REGULATION}
                className="footer__navlink bottom"
              >
                {t('footer.dataRights')}
              </NavLink>
              <span className="separator">|</span>
              <NavLink
                to={ROUTES.PRIVACY_POLICY}
                className="footer__navlink bottom"
              >
                {isMobile
                  ? t('footer.privacy').split(' ')[0]
                  : t('footer.privacy')}
              </NavLink>
              <span className="separator">|</span>
              <NavLink to={ROUTES.TERMS} className="footer__navlink bottom">
                {isMobile ? t('footer.terms').split(' ')[0] : t('footer.terms')}
              </NavLink>
            </div>
            <div className="footer__column">{t('terms.text33')}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
