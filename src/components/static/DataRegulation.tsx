import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Butterflies } from '../../assets/dataRegulation/butterflies.svg'

export const DataRegulation: React.FunctionComponent = () => {
  const { t } = useTranslation()
  return (
    <div className="data-regulation-wrapper">
      <h2>{t('dataRegulation.title')}</h2>
      <p>{t('dataRegulation.text1')}</p>
      <p>{t('dataRegulation.text2')}</p>
      <p>{t('dataRegulation.text3')}</p>
      <p>{t('dataRegulation.text4')}</p>
      <p>{t('dataRegulation.text5')}</p>
      <p>{t('dataRegulation.text6')}</p>
      <p>{t('dataRegulation.text7')}</p>
      <p>{t('dataRegulation.text8')}</p>
      <p>{t('dataRegulation.text9')}</p>
      <p>{t('dataRegulation.text10')}</p>
      <Butterflies className="data-regulation-butterflies" />
    </div>
  )
}

export default DataRegulation
