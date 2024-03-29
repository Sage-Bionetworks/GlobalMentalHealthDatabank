import React from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Typography } from '@material-ui/core'
import { ROUTES } from 'constants/constants'
import Disclaimer from '../common/Disclaimer'
import ConsentEnglish from 'assets/consent_docs/consent_english.pdf'
import ConsentXhosa from 'assets/consent_docs/consent_xhosa.pdf'
import ConsentSesotho from 'assets/consent_docs/consent_sesotho.pdf'
import Application from 'assets/za_docs/DHET_Application.pdf'
import Letter from 'assets/za_docs/DHET_Approval_letter.pdf'
import Certificate from 'assets/za_docs/Clearance_Certificate.pdf'

function ConsentInfo() {
  const { t } = useTranslation()
  const { push } = useHistory()
  const goToEligibility = () => {
    push(ROUTES.ELIGIBILITY)
  }
  window.scrollTo(0, 0)
  return (
    <div className="consent-info">
      <div className="consent-content">
        <Disclaimer />
        <div className="plus-signs" />
        <Typography variant="h2">{t('consent.title')}</Typography>
        <div className="btm-20">
          <Typography>{t('consent.description')}</Typography>
        </div>
        <Typography>{t('consent.description2')}</Typography>
      </div>
      <div className="approvals">
        <Typography>{t('consent.approvals')}</Typography>
        <Typography variant="h3">{t('consent.region1')}</Typography>
        <Typography>{t('consent.approval1')}</Typography>
        <Typography variant="h3">{t('consent.region2')}</Typography>
        <Typography>{t('consent.approval2')}</Typography>
        <Typography variant="h3">{t('consent.region3')}</Typography>
        <Typography>{t('consent.approval3')}</Typography>
        <Typography variant="h3">{t('consent.region4')}</Typography>
        <Typography>{t('consent.approval4')}</Typography>
      </div>

      <div className="download-files-container">
        <div className="download-files">
          <div className="btm-10">
            <Typography variant="h3">{t('consent.download')}</Typography>
          </div>
          <div className="btm-20 underlined-link">
            <a
              href={ConsentEnglish}
              target="_blank"
              rel="noopener noreferrer"
              className="underlined-link"
            >
              <Typography variant="h5">{t('consent.file1')}</Typography>
            </a>
          </div>
          <div className="btm-20 underlined-link">
            <a
              href={ConsentXhosa}
              target="_blank"
              rel="noopener noreferrer"
              className="underlined-link"
            >
              <Typography variant="h5">{t('consent.file2')}</Typography>
            </a>
          </div>
          <div className="btm-20 underlined-link">
            <a
              href={ConsentSesotho}
              target="_blank"
              rel="noopener noreferrer"
              className="underlined-link"
            >
              <Typography variant="h5">{t('consent.file3')}</Typography>
            </a>
          </div>
        </div>

        <div className="download-files">
          <div className="btm-10">
            <Typography variant="h3">{t('consent.downloadZA')}</Typography>
          </div>
          <div className="btm-20 underlined-link">
            <a
              href={Application}
              target="_blank"
              rel="noopener noreferrer"
              className="underlined-link"
            >
              <Typography variant="h5">{t('consent.file4')}</Typography>
            </a>
          </div>
          <div className="btm-20 underlined-link">
            <a
              href={Letter}
              target="_blank"
              rel="noopener noreferrer"
              className="underlined-link"
            >
              <Typography variant="h5">{t('consent.file5')}</Typography>
            </a>
          </div>
          <div className="btm-20 underlined-link">
            <a
              href={Certificate}
              target="_blank"
              rel="noopener noreferrer"
              className="underlined-link"
            >
              <Typography variant="h5">{t('consent.file6')}</Typography>
            </a>
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
          <button onClick={goToEligibility} className="button-join-study">
            {t('common.joinStudy')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConsentInfo
