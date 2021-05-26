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
        <div className="btm-40">
          <Typography variant="h3">{t('dataRegulation.title')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('dataRegulation.text1')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('dataRegulation.text2')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('dataRegulation.text3')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('dataRegulation.text4')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('dataRegulation.text5')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('dataRegulation.text6')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('dataRegulation.text7')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('dataRegulation.text8')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('dataRegulation.text9')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('dataRegulation.text10')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('dataRegulation.email')}</Typography>
        </div>
        <Butterflies className="data-regulation-butterflies" />
      </div>
    </ResponsiveStepWrapper>
  )
}

export default DataRegulation
