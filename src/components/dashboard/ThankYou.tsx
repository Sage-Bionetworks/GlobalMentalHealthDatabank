import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ProgressBar, ResponsiveStepWrapper } from 'components/common'
import Application from 'assets/za_docs/DHET_Application.pdf'
import Letter from 'assets/za_docs/DHET_Approval_letter.pdf'
import Certificate from 'assets/za_docs/Clearance_Certificate.pdf'
import { ROUTES } from 'constants/constants'

type Props = {
  updateClientData: (fields: object) => void
}

function ThankYou({ updateClientData }: Props) {
  const { t } = useTranslation()
  const { push } = useHistory()
  const handleClick = () => {
    updateClientData({ skipThankYou: true })
    push(ROUTES.DOWNLOAD)
  }
  return (
    <ResponsiveStepWrapper variant="card">
      <div className="quiz-wrapper">
        <div className="btm-20">
          <ProgressBar step={1} maxSteps={1} />
        </div>
        <div className="btm-30 thank-you-za">
          <Typography variant="h3">{t('thankYou.title')}</Typography>
          <Typography variant="body2">{t('thankYou.subtitle')}</Typography>
          <ol>
            <li>
              {t('thankYou.requestPayment')}
              <ul>
                <li>{t('thankYou.requestPayment1')}</li>
                <li>{t('thankYou.requestPayment2')}</li>
                <li>{t('thankYou.requestPayment3')}</li>
              </ul>
            </li>
            <li className="btm-10">
              {t('thankYou.view')}{' '}
              <a
                className="btm-10"
                href={Application}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('thankYou.link1')}
              </a>{' '}
              {t('thankYou.text2')}
            </li>
            <li className="btm-10">
              {t('thankYou.view')}{' '}
              <a
                className="btm-10"
                href={Letter}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('thankYou.link2')}
              </a>
            </li>
            <li>
              {t('thankYou.view')}{' '}
              <a
                className="btm-10"
                href={Certificate}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('thankYou.link3')}
              </a>
            </li>
          </ol>
        </div>

        <Button
          color="primary"
          variant="contained"
          size="large"
          className="wide-button"
          onClick={handleClick}
        >
          Download the app
        </Button>
      </div>
    </ResponsiveStepWrapper>
  )
}

export default ThankYou
