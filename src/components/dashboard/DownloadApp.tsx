import React from 'react'
import { ReactComponent as LogoNoText } from '../../assets/logo-no-text.svg'
import { useSessionDataState } from '../../AuthContext'

function DownloadApp() {
  const { token } = useSessionDataState()
  const playStoreLink = process.env.REACT_APP_DOWNLOAD_APP_URL
  const deepLink = `${process.env.REACT_APP_DEEPLINK_URL}${token}`
  return (
    <div className="download-app">
      <div className="download--not-installed">
        <div className="plus-signs"></div>
        <LogoNoText className="logo" />
        <h1 className="download__title">Download the MindKind app</h1>
        <p>
          Some placeholder text about the app and what you may do in the app.
        </p>
        <a
          className="download__button"
          href={playStoreLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download the app
        </a>
      </div>
      <div className="download--already-installed">
        <h1 className="download__title">If you already have the app</h1>
        <p>Click here to log-in to the app and begin the study!</p>
        <a
          className="download__button"
          href={deepLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Sign In to the App
        </a>
      </div>
      <div className="phone"></div>
    </div>
  )
}

export default DownloadApp
