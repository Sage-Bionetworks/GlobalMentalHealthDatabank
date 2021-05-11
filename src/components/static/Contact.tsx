import React from 'react'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'

function Contact() {
  const { t } = useTranslation()
  return (
    <div className="contact">
      <div className="contact__in-crisis">
        <div className="plus-signs" />
        <Typography variant="h2">{t('contact.title1')}</Typography>
        <Typography variant="body1">{t('contact.subtitle1')}</Typography>
      </div>
      <div className="contact__get-help">
        <Typography variant="h4">{t('contact.help.get')}</Typography>
        <button>{t('contact.help.find')}</button>
      </div>
      <div className="contact__local-resource">
        <Typography variant="h2">
          {t('contact.localResources.india.title')}
        </Typography>
        <Typography variant="body1">
          {t('contact.localResources.india.text1')}
        </Typography>
        <Typography variant="body1">
          {t('contact.localResources.india.text2')}
        </Typography>
        <Typography variant="body1">
          {t('contact.localResources.india.text3')}
        </Typography>
        <button className="small">
          {t('contact.localResources.india.link.text')}
        </button>
      </div>
      <div className="contact__local-resource">
        <Typography variant="h2">
          {t('contact.localResources.southAfrica.title')}
        </Typography>
        <Typography variant="body1">
          {t('contact.localResources.southAfrica.text1')}
        </Typography>
        <Typography variant="body1">
          {t('contact.localResources.southAfrica.text2')}
        </Typography>
        <Typography variant="body1">
          {t('contact.localResources.southAfrica.text3')}
        </Typography>
        <Typography variant="body1">
          {t('contact.localResources.southAfrica.text4')}
        </Typography>
        <button className="small">
          {t('contact.localResources.southAfrica.link.text')}
        </button>
      </div>
      <div className="contact__local-resource">
        <Typography variant="h2">
          {t('contact.localResources.unitedKingdom.title')}
        </Typography>
        <Typography variant="body1">
          {t('contact.localResources.unitedKingdom.text1')}
        </Typography>
        <Typography variant="body1">
          {t('contact.localResources.unitedKingdom.text2')}
        </Typography>
        <Typography variant="body1">
          {t('contact.localResources.unitedKingdom.text3')}
        </Typography>
        <Typography variant="body1">
          {t('contact.localResources.unitedKingdom.text4')}
        </Typography>
        <button className="small">
          {t('contact.localResources.unitedKingdom.link.text')}
        </button>
      </div>
    </div>
  )
}

export default Contact
