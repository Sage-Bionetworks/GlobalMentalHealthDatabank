import React from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Typography } from '@material-ui/core'

function ConsentInfo() {
  const { t } = useTranslation()
  const { push } = useHistory()
  const goToEligibility = () => {
    push('/eligibility')
  }
  return (
    <div className="consent-info">
      <div className="consent-content">
        <div className="plus-signs" />
        <Typography variant="h2">{t('consent.title')}</Typography>
        <Typography>{t('consent.description')}</Typography>
      </div>
      <div>
        <div className="download-files">
          <div className="btm-50">
            <Typography variant="h2">{t('consent.download')}</Typography>
          </div>
          <div className="btm-40 underlined-link">
            <Typography variant="h3">{t('consent.file1')}</Typography>
          </div>
          <div className="btm-40 underlined-link">
            <Typography variant="h3">{t('consent.file2')}</Typography>
          </div>
          <div className="btm-40 underlined-link">
            <Typography variant="h3">{t('consent.file3')}</Typography>
          </div>
        </div>
      </div>

      <div className="ready-to-join">
        <div className="butterfly" />
        <div className="text-section">
          <Typography variant="h2">{t('about.readyToJoin.title')}</Typography>
          <Typography>{t('about.readyToJoin.text')}</Typography>
        </div>
        <div className="button-section">
          <div className="butterflies"></div>
          <button onClick={goToEligibility}>{t('common.joinStudy')}</button>
        </div>
      </div>
    </div>
  )
}

export default ConsentInfo
