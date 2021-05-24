import React, { useState, FunctionComponent, ChangeEvent } from 'react'
import ResponsiveStepWrapper from '../common/ResponsiveStepWrapper'
import { useTranslation } from 'react-i18next'
import { Typography, FormControl, NativeSelect } from '@material-ui/core'

const LANGUAGES = {
  ENGLISH: 'English',
  XHOSA: 'Xhosa',
  SESOTHO: 'seSotho',
}

const DOWNLOAD_PATH = '/download-path'

export const PrivacyPolicy: FunctionComponent = () => {
  const { t } = useTranslation()
  const [language, setLanguage] = useState(LANGUAGES.ENGLISH)
  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setLanguage(event.target.value as string)
  }
  return (
    <ResponsiveStepWrapper variant="card">
      <div className="legislation-wrapper">
        <Typography variant="h3" style={{ marginBottom: '40px' }}>
          {t('privacyPolicy.title')}
        </Typography>
        <FormControl className="dropdown-select-language">
          <NativeSelect
            value={language}
            onChange={handleChange}
            disableUnderline={true}
          >
            <option aria-label="None" value="" />
            <option value={LANGUAGES.ENGLISH}>
              {t('privacyPolicy.english')}
            </option>
            <option value={LANGUAGES.XHOSA}>{t('privacyPolicy.xhosa')}</option>
            <option value={LANGUAGES.SESOTHO}>
              {t('privacyPolicy.seSotho')}
            </option>
          </NativeSelect>
        </FormControl>

        {language === LANGUAGES.ENGLISH && (
          <>
            <p>
              English
              <Typography variant="body2">
                {t('privacyPolicy.text1')}
              </Typography>
            </p>
            <p>
              <Typography variant="body2">
                {t('privacyPolicy.text1')}
              </Typography>
            </p>
            <p>
              {' '}
              <Typography variant="body2">
                {t('privacyPolicy.text1')}
              </Typography>
            </p>
          </>
        )}

        {language === LANGUAGES.XHOSA && (
          <>
            <p>
              Xhosa
              <Typography variant="body2">
                {t('privacyPolicy.text1')}
              </Typography>
            </p>
            <p>
              <Typography variant="body2">
                {t('privacyPolicy.text1')}
              </Typography>
            </p>
            <p>
              {' '}
              <Typography variant="body2">
                {t('privacyPolicy.text1')}
              </Typography>
            </p>
          </>
        )}

        {language === LANGUAGES.SESOTHO && (
          <>
            <p>
              seSotho
              <Typography variant="body2">
                {t('privacyPolicy.text1')}
              </Typography>
            </p>
            <p>
              <Typography variant="body2">
                {t('privacyPolicy.text1')}
              </Typography>
            </p>
            <p>
              {' '}
              <Typography variant="body2">
                {t('privacyPolicy.text1')}
              </Typography>
            </p>
          </>
        )}

        <a href={DOWNLOAD_PATH} target="_blank" rel="noopener noreferrer">
          {' '}
          <p style={{ textDecoration: 'underline' }}>
            <Typography variant="body2">
              {t('privacyPolicy.download')}
            </Typography>
          </p>
        </a>
      </div>
    </ResponsiveStepWrapper>
  )
}

export default PrivacyPolicy
