import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Butterflies } from '../../assets/dataRegulation/butterflies.svg'
import { Typography } from '@material-ui/core'
import ResponsiveStepWrapper from '../common/ResponsiveStepWrapper'

export const DataRegulation: React.FunctionComponent = () => {
  const { t } = useTranslation()
  window.scrollTo(0, 0)
  return (
    <ResponsiveStepWrapper variant="card">
      <div className="legislation-wrapper">
        <div className="btm-40">
          <Typography variant="h3">{t('dataRegulation.title')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('dataRegulation.gdpr1')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('dataRegulation.gdpr2')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('dataRegulation.gdpr3')}</Typography>
        </div>
        <div className="btm-20 bullets">
          <Typography variant="body2">{t('dataRegulation.rights1')}</Typography>
          <Typography variant="body2">{t('dataRegulation.rights2')}</Typography>
          <Typography variant="body2">{t('dataRegulation.rights3')}</Typography>
          <Typography variant="body2">{t('dataRegulation.rights4')}</Typography>
          <Typography variant="body2">{t('dataRegulation.rights5')}</Typography>
          <Typography variant="body2">{t('dataRegulation.rights6')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">
            {t('dataRegulation.emailText')}{' '}
            <a href={`mailto: ${t('dataRegulation.email')}`}>
              {t('dataRegulation.email')}
            </a>
          </Typography>
        </div>
        <Butterflies className="data-regulation-butterflies" />
      </div>
    </ResponsiveStepWrapper>
  )
}

export default DataRegulation
