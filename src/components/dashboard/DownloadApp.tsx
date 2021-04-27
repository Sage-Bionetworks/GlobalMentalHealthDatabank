import React from 'react'
import { ReactComponent as LogoNoText } from '../../assets/logo-no-text.svg'

function DownloadApp() {
  return (
    <div className="download-app">
      <div className="download--not-installed">
        <LogoNoText className="logo" />
        <h1 className="download__title">Download the MindKind app</h1>
        <p>
          Some placeholder text about the app and what you may do in the app.
        </p>
        <button className="download__button">Download the app</button>
      </div>
      <div className="download--already-installed">
        <h1 className="download__title">If you already have the app</h1>
        <p>Click here to log-in to the app and begin the study!</p>
        <button className="download__button">Sign In to the App</button>
      </div>
      <div className="phone">
        <div className="phone__bg"></div>
      </div>
    </div>
  )
}

export default DownloadApp
