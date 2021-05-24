import React from 'react'
import { Typography } from '@material-ui/core'
import { ReactComponent as LogoNoText } from '../../assets/logo-no-text.svg'

function DownloadApp() {
  const playStoreLink = process.env.REACT_APP_PLAY_STORE_URL
  return (
    <div className="download-app">
      <div className="plus-signs"></div>
      <div className="orange-bg"></div>
      <div className="phone"></div>
      <LogoNoText className="logo" />
      <Typography variant="h2" className="download__title">
        Download the MindKind app
      </Typography>
      <Typography>
        Some placeholder text about the app and what you may do in the app.
      </Typography>
      <a
        className="download__button"
        href={playStoreLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        Download the app
      </a>
    </div>
  )
}

export default DownloadApp
