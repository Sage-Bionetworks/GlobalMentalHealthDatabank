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
        <div className="btm-30">
          <div className="btm-50">
            <Typography variant="h3">{t('privacyPolicy.title')}</Typography>
          </div>
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
              <option value={LANGUAGES.XHOSA}>
                {t('privacyPolicy.xhosa')}
              </option>
              <option value={LANGUAGES.SESOTHO}>
                {t('privacyPolicy.seSotho')}
              </option>
            </NativeSelect>
          </FormControl>
        </div>
        <div className="btm-40">
          {language === LANGUAGES.ENGLISH && (
            <>
              <div className="btm-20">
                English
                <Typography variant="body2">
                  {t('privacyPolicy.text1')}
                </Typography>
              </div>
              <div className="btm-20">
                <Typography variant="body2">
                  {t('privacyPolicy.text1')}
                </Typography>
              </div>
              <div className="btm-20">
                {' '}
                <Typography variant="body2">
                  {t('privacyPolicy.text1')}
                </Typography>
              </div>
            </>
          )}

          {language === LANGUAGES.XHOSA && (
            <>
              <div className="btm-20">
                Xhosa
                <Typography variant="body2">
                  {t('privacyPolicy.text1')}
                </Typography>
              </div>
              <div className="btm-20">
                <Typography variant="body2">
                  {t('privacyPolicy.text1')}
                </Typography>
              </div>
              <div className="btm-20">
                {' '}
                <Typography variant="body2">
                  {t('privacyPolicy.text1')}
                </Typography>
              </div>
            </>
          )}

          {language === LANGUAGES.SESOTHO && (
            <>
              <div className="btm-20">
                seSotho
                <Typography variant="body2">
                  {t('privacyPolicy.text1')}
                </Typography>
              </div>
              <div className="btm-20">
                <Typography variant="body2">
                  {t('privacyPolicy.text1')}
                </Typography>
              </div>
              <div className="btm-20">
                {' '}
                <Typography variant="body2">
                  {t('privacyPolicy.text1')}
                </Typography>
              </div>
            </>
          )}
        </div>

        <a href={DOWNLOAD_PATH} target="_blank" rel="noopener noreferrer">
          {' '}
          <div className="btn-40 underlined-link">
            <Typography variant="body2">
              {t('privacyPolicy.download')}
            </Typography>
          </div>
        </a>
      </div>
    </ResponsiveStepWrapper>
  )
}

export default PrivacyPolicy
