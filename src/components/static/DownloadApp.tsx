import React from 'react'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useSessionDataState } from 'AuthContext'
import { ReactComponent as LogoNoText } from '../../assets/logo-no-text.svg'
import { SessionData, UserDataGroup } from 'types/types'
import { COUNTRY_CODES } from 'constants/constants'

function DownloadApp() {
  const sessionData: SessionData = useSessionDataState()
  const playStoreLink = process.env.REACT_APP_PLAY_STORE_URL
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
      <div className="btm-20">
        <Typography>{t('download.description1')}</Typography>
      </div>

      {sessionData.userDataGroup.includes(
        COUNTRY_CODES.SOUTH_AFRICA as UserDataGroup,
      ) && (
        <>
          <Typography>
            {t('download.compensationText')}{' '}
            <a href={`mailto: ${t('download.compensationUrl')}`}>
              {t('download.compensationUrl')}
            </a>
          </Typography>
        </>
      )}
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
