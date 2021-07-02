import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import ResponsiveStepWrapper from '../common/ResponsiveStepWrapper'
import { ReactComponent as LogoNoText } from '../../assets/logo-no-text.svg'
import { ROUTES } from '../../constants/constants'

type Props = {
  onClick: () => void
}

function Welcome({ onClick }: Props) {
  const { t } = useTranslation()
  return (
    <ResponsiveStepWrapper variant="card">
      <div className="quiz-wrapper">
        <LogoNoText className="logo btm-20" />
        <div className="btm-30">
          <Typography variant="h3">
            {t('eligibility.welcomeToMindKind')}
          </Typography>
        </div>

        <div className="btm-20">
          <Typography variant="h6">
            {t('form.firstCommonConsent.weWantToLearn')}
          </Typography>
        </div>

        <div className="ml-20 btm-20">
          <ul>
            <li>
              <Typography variant="body2">
                {t('form.firstCommonConsent.section1')}
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                {t('form.firstCommonConsent.section2')}
              </Typography>
            </li>
          </ul>
        </div>

        <div className="btm-240">
          <Typography variant="body2">
            {t('form.firstCommonConsent.section3.section1')}{' '}
            <a href={ROUTES.RESEARCH}>
              {t('form.firstCommonConsent.section3.link')}
            </a>{' '}
            {t('form.firstCommonConsent.section3.section2')}
          </Typography>
        </div>
        <Button
          color="primary"
          variant="contained"
          size="large"
          className="wide-button"
          onClick={onClick}
        >
          {t('eligibility.begin')}
        </Button>
      </div>
    </ResponsiveStepWrapper>
  )
}

export default Welcome
