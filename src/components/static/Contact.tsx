import React from 'react'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import Disclaimer from '../common/Disclaimer'
import AdditionalUKResources from '../../assets/resources/additional_uk_mental_health_crisis_lines.pdf'

function Contact() {
  const { t } = useTranslation()
  window.scrollTo(0, 0)
  return (
    <div className="contact">
      <div className="contact__in-crisis">
        <Disclaimer />
        <div className="plus-signs" />
        <Typography variant="h2">{t('contact.title1')}</Typography>
        <Typography variant="body1">{t('contact.subtitle1')}</Typography>
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
        <Typography variant="body1">
          {t('contact.localResources.india.text4')}
        </Typography>
        <a
          className="button small"
          href={t(t('contact.localResources.india.link.url'))}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('contact.localResources.india.link.text')}
        </a>
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
        <a
          className="button small"
          href={t(t('contact.localResources.southAfrica.link.url'))}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('contact.localResources.southAfrica.link.text')}
        </a>
      </div>
      <div className="contact__local-resource">
        <Typography variant="h2">
          {t('contact.localResources.unitedKingdom.title')}
        </Typography>
        <Typography variant="body1">
          {t('contact.localResources.unitedKingdom.subtitle1')}{' '}
          <a
            className="btm-10"
            href={t('contact.localResources.unitedKingdom.subtitleLink')}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('contact.localResources.unitedKingdom.subtitleLink')}
          </a>{' '}
          {t('contact.localResources.unitedKingdom.subtitle2')}
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
        <a
          className="button small btm-10"
          href={t('contact.localResources.unitedKingdom.link1.url1')}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('contact.localResources.unitedKingdom.link1.text1')}
        </a>
        <a
          className="button small btm-30"
          href={AdditionalUKResources}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('contact.localResources.unitedKingdom.link2.text2')}
        </a>
      </div>
    </div>
  )
}

export default Contact
