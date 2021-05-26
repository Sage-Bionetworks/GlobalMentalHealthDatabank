import React, { FunctionComponent, useState, ChangeEvent } from 'react'
import ResponsiveStepWrapper from '../common/ResponsiveStepWrapper'
import { useTranslation } from 'react-i18next'
import { Typography, FormControl, NativeSelect } from '@material-ui/core'

const LANGUAGES = {
  ENGLISH: 'English',
  XHOSA: 'Xhosa',
  SESOTHO: 'seSotho',
}

const DOWNLOAD_PATH =
  'https://drive.google.com/file/d/1n7AnFob1qtBI7Fupsg2oOin5SMI4DAI_/view?usp=sharing'

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
          <div className="btm-30">
            <Typography variant="h3">{t('privacyPolicy.title')}</Typography>
          </div>
          <FormControl
            className="dropdown-select-language"
            style={{ display: 'none' }}
          >
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
          <div className="btm-20">
            <Typography variant="body2">{t('privacyPolicy.text1')}</Typography>
          </div>
          <div className="btm-20">
            <Typography variant="body2">{t('privacyPolicy.text2')}</Typography>
          </div>
        </div>

        <a href={DOWNLOAD_PATH} target="_blank" rel="noopener noreferrer">
          <div className="btm-40 underlined-link">
            <Typography variant="body2">
              {t('privacyPolicy.download')}
            </Typography>
          </div>
        </a>

        <div className="btm-40">
          <div className="btm-30">
            <Typography variant="h3">
              {t('privacyPolicy.privacyLabel.title')}
            </Typography>
          </div>

          <div className="btm-20">
            <Typography variant="h6">
              {t('privacyPolicy.privacyLabel.collection.title')}
            </Typography>
          </div>
          <div className="btm-20">
            <Typography variant="body2" className="italic">
              {t('privacyPolicy.privacyLabel.collection.question1')}
            </Typography>
            <Typography variant="h6">
              {t('privacyPolicy.privacyLabel.yes')}
            </Typography>
          </div>
          <div className="btm-20">
            <Typography variant="body2" className="italic">
              {t('privacyPolicy.privacyLabel.collection.question2')}
            </Typography>
            <Typography variant="h6">
              {t('privacyPolicy.privacyLabel.no')}
            </Typography>
          </div>
          <div className="btm-20">
            <Typography variant="body2" className="italic">
              {t('privacyPolicy.privacyLabel.collection.question3')}
            </Typography>
            <Typography variant="h6">
              {t('privacyPolicy.privacyLabel.no')}
            </Typography>
          </div>
        </div>

        <div className="btm-50">
          <div className="btm-20">
            <Typography variant="h6">
              {t('privacyPolicy.privacyLabel.tracking.title')}
            </Typography>
          </div>
          <div className="btm-20">
            <Typography variant="body2" className="italic">
              {t('privacyPolicy.privacyLabel.tracking.question1')}
            </Typography>
            <Typography variant="h6">
              {t('privacyPolicy.privacyLabel.no')}
            </Typography>
          </div>
          <div className="btm-20">
            <Typography variant="body2" className="italic">
              {t('privacyPolicy.privacyLabel.tracking.question2')}
            </Typography>
            <Typography variant="h6">
              {t('privacyPolicy.privacyLabel.yes')}
            </Typography>
          </div>
          <div className="btm-20">
            <Typography variant="body2" className="italic">
              {t('privacyPolicy.privacyLabel.tracking.question3')}
            </Typography>
            <Typography variant="h6">
              {t('privacyPolicy.privacyLabel.no')}
            </Typography>
          </div>
          <div className="btm-20">
            <Typography variant="body2" className="italic">
              {t('privacyPolicy.privacyLabel.tracking.question4')}
            </Typography>
            <Typography variant="h6">
              {t('privacyPolicy.privacyLabel.no')}
            </Typography>
          </div>
          <div className="btm-20">
            <Typography variant="body2" className="italic">
              {t('privacyPolicy.privacyLabel.tracking.question5')}
            </Typography>
            <Typography variant="h6">
              {t('privacyPolicy.privacyLabel.yesWithConsent')}
            </Typography>
          </div>
          <div className="btm-20">
            <Typography variant="body2" className="italic">
              {t('privacyPolicy.privacyLabel.tracking.question5')}
            </Typography>
            <Typography variant="h6">
              {t('privacyPolicy.privacyLabel.yesWithConsent')}
            </Typography>
          </div>
        </div>

        <div className="btm-50">
          <div className="btm-20">
            <Typography variant="h6">
              {t('privacyPolicy.privacyLabel.useAndSharing.title')}
            </Typography>
          </div>
          <div className="btm-20">
            <Typography variant="body2" className="italic">
              {t('privacyPolicy.privacyLabel.useAndSharing.question1')}
            </Typography>
            <Typography variant="h6">
              {t('privacyPolicy.privacyLabel.no')}
            </Typography>
          </div>
          <div className="btm-20">
            <Typography variant="body2" className="italic">
              {t('privacyPolicy.privacyLabel.useAndSharing.question2')}
            </Typography>
            <Typography variant="h6">
              {t('privacyPolicy.privacyLabel.yesWithConsent')}
            </Typography>
          </div>
          <div className="btm-20">
            <Typography variant="body2" className="italic">
              {t('privacyPolicy.privacyLabel.useAndSharing.question3')}
            </Typography>
            <Typography variant="h6">
              {t('privacyPolicy.privacyLabel.yes')}
            </Typography>
          </div>
          <div className="btm-20">
            <Typography variant="body2" className="italic">
              {t('privacyPolicy.privacyLabel.useAndSharing.question4')}
            </Typography>
            <Typography variant="h6">
              {t('privacyPolicy.privacyLabel.no')}
            </Typography>
          </div>
          <div className="btm-20">
            <Typography variant="body2" className="italic">
              {t('privacyPolicy.privacyLabel.useAndSharing.question5')}
            </Typography>
            <Typography variant="h6">
              {t('privacyPolicy.privacyLabel.yesInTheUS')}
            </Typography>
          </div>
        </div>

        <div className="btm-50">
          <div className="btm-20">
            <Typography variant="h6">
              {t('privacyPolicy.privacyLabel.privacyTools.title')}
            </Typography>
          </div>
          <div className="btm-20">
            <Typography variant="body2" className="italic">
              {t('privacyPolicy.privacyLabel.privacyTools.question1')}
            </Typography>
            <Typography variant="h6">
              {t('privacyPolicy.privacyLabel.yes')}
            </Typography>
          </div>
          <div className="btm-20">
            <Typography variant="body2" className="italic">
              {t('privacyPolicy.privacyLabel.privacyTools.question2')}
            </Typography>
            <Typography variant="h6">
              {t('privacyPolicy.privacyLabel.yes')}
            </Typography>
          </div>
          <div className="btm-20">
            <Typography variant="body2" className="italic">
              {t('privacyPolicy.privacyLabel.privacyTools.question3')}
            </Typography>
            <Typography variant="h6">
              {t('privacyPolicy.privacyLabel.yes')}
            </Typography>
          </div>
          <div className="btm-20">
            <Typography variant="body2" className="italic">
              {t('privacyPolicy.privacyLabel.privacyTools.question4')}
            </Typography>
            <Typography variant="h6">
              {t('privacyPolicy.privacyLabel.yes')}
            </Typography>
          </div>
        </div>

        <div className="btm-50">
          <div className="btm-20">
            <Typography variant="h6">
              {t('privacyPolicy.privacyLabel.communication.title')}
            </Typography>
          </div>
          <div className="btm-20">
            <Typography variant="body2" className="italic">
              {t('privacyPolicy.privacyLabel.communication.question1')}
            </Typography>
            <Typography variant="h6">
              {t('privacyPolicy.privacyLabel.yes')}
            </Typography>
          </div>
          <div className="btm-20">
            <Typography variant="body2" className="italic">
              {t('privacyPolicy.privacyLabel.communication.question2')}
            </Typography>
            <Typography variant="h6">
              {t('privacyPolicy.privacyLabel.yesIfYouOptIn')}
            </Typography>
          </div>
          <div className="btm-20">
            <Typography variant="body2" className="italic">
              {t('privacyPolicy.privacyLabel.communication.question3')}
            </Typography>
            <Typography variant="h6">
              {t('privacyPolicy.privacyLabel.yesIfYouOptIn')}
            </Typography>
          </div>
        </div>
      </div>
    </ResponsiveStepWrapper>
  )
}

export default PrivacyPolicy
