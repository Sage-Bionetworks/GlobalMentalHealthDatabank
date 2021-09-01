import React from 'react'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { ReactComponent as LogoNoText } from '../../assets/logo-no-text.svg'
import { PLAY_STORE_URL } from 'constants/constants'

function DownloadApp() {
  const playStoreLink = PLAY_STORE_URL
  const { t } = useTranslation()
  window.scrollTo(0, 0)

  return (
    <div className="download-app">
      <div className="plus-signs" />
      <div className="orange-bg" />
      <div className="phone" />
      <LogoNoText className="logo" />
      <Typography variant="h2" className="download__title">
        {t('download.title')}
      </Typography>
      <div className="download__description btm-20">
        <Typography>{t('download.description1')}</Typography>
      </div>

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
