import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Butterflies } from '../../assets/dataRegulation/butterflies.svg'
import { Typography } from '@material-ui/core'
import ResponsiveStepWrapper from '../common/ResponsiveStepWrapper'

export const DataRegulation: React.FunctionComponent = () => {
  const { t } = useTranslation()
  return (
    <ResponsiveStepWrapper variant="card">
      <div className="legislation-wrapper">
        <Typography variant="h3" style={{ marginBottom: '40px' }}>
          {t('dataRegulation.title')}
        </Typography>
        <p>
          <Typography variant="body2">{t('dataRegulation.text1')}</Typography>
        </p>
        <p>
          <Typography variant="body2">{t('dataRegulation.text2')}</Typography>
        </p>
        <p>
          {' '}
          <Typography variant="body2">{t('dataRegulation.text3')}</Typography>
        </p>
        <p>
          {' '}
          <Typography variant="body2">{t('dataRegulation.text4')}</Typography>
        </p>
        <p>
          {' '}
          <Typography variant="body2">{t('dataRegulation.text5')}</Typography>
        </p>
        <p>
          {' '}
          <Typography variant="body2">{t('dataRegulation.text6')}</Typography>
        </p>
        <p>
          {' '}
          <Typography variant="body2">{t('dataRegulation.text7')}</Typography>
        </p>
        <p>
          {' '}
          <Typography variant="body2">{t('dataRegulation.text8')}</Typography>
        </p>
        <p>
          {' '}
          <Typography variant="body2">{t('dataRegulation.text9')}</Typography>
        </p>
        <p>
          {' '}
          <Typography variant="body2">{t('dataRegulation.text10')}</Typography>
        </p>
        <p>
          {' '}
          <Typography variant="body2">{t('dataRegulation.email')}</Typography>
        </p>
        <Butterflies className="data-regulation-butterflies" />
      </div>
    </ResponsiveStepWrapper>
  )
}

export default DataRegulation
