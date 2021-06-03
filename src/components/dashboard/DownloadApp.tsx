import React from 'react'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { ReactComponent as LogoNoText } from '../../assets/logo-no-text.svg'

function DownloadApp() {
  const playStoreLink = process.env.REACT_APP_PLAY_STORE_URL
  const { t } = useTranslation()

  return (
    <div className="download-app">
      <div className="plus-signs" />
      <div className="orange-bg" />
      <div className="phone" />
      <LogoNoText className="logo" />
      <Typography variant="h2" className="download__title">
        {t('download.title')}
      </Typography>
      <Typography>{t('download.description')}</Typography>
      <a
        className="download__button"
        href={playStoreLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('download.cta')}
      </a>
    </div>
  )
}

export default DownloadApp
