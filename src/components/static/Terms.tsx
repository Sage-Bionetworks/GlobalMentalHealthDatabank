import React from 'react'
import { useTranslation } from 'react-i18next'
import { Typography } from '@material-ui/core'
import ResponsiveStepWrapper from '../common/ResponsiveStepWrapper'

export const Terms: React.FunctionComponent = () => {
  const { t } = useTranslation()
  window.scrollTo(0, 0)
  return (
    <ResponsiveStepWrapper variant="card">
      <div className="legislation-wrapper">
        <div>
          <Typography variant="h3">{t('terms.title')}</Typography>
        </div>
        <div className="btm-10">
          <Typography variant="body2">
            {t('terms.effectiveDateText')}
          </Typography>
        </div>
        <div className="btm-10">
          <Typography variant="body2">{t('terms.mindkindStudy1')}</Typography>
        </div>
        <div className="btm-10">
          <Typography variant="body2">{t('terms.mindkindStudy2')}</Typography>
        </div>
        <div className="btm-10">
          <Typography variant="h4">{t('terms.whoCanUse')}</Typography>
        </div>
        <ol>
          <li>{t('terms.whoCanUse1')}</li>
          <li>{t('terms.whoCanUse2')}</li>
        </ol>
        <div className="btm-10">
          <Typography variant="h4">{t('terms.siteAndAppTitle')}</Typography>
        </div>
        <div className="btm-10">
          <Typography variant="body2">{t('terms.siteAndAppText')}</Typography>
        </div>
        <ol>
          <li>
            {t('terms.siteAndAppRules1')}
            <ul>
              <li>{t('terms.siteAndAppRules1-1')}</li>
              <li>{t('terms.siteAndAppRules1-2')}</li>
            </ul>
          </li>
          <li>
            {t('terms.siteAndAppRules2')}
            <ul>
              <li>{t('terms.siteAndAppRules2-1')}</li>
            </ul>
          </li>
          <li>{t('terms.siteAndAppRules3')}</li>
          <li>{t('terms.siteAndAppRules4')}</li>
          <li>{t('terms.siteAndAppRules5')}</li>
          <li>{t('terms.siteAndAppRules6')}</li>
          <li>{t('terms.siteAndAppRules7')}</li>
          <li>{t('terms.siteAndAppRules8')}</li>
          <li>{t('terms.siteAndAppRules9')}</li>
        </ol>
        <div className="btm-10">
          <Typography variant="h4">{t('terms.yourAccess')}</Typography>
        </div>
        <div className="btm-10">
          <Typography variant="body2">{t('terms.yourAccessRules')}</Typography>
          <ol>
            <li>{t('terms.yourAccessRules1')}</li>
            <li>
              {t('terms.yourAccessRules2')}
              <ul>
                <li>{t('terms.yourAccessRules2-1')}</li>
                <li>{t('terms.yourAccessRules2-2')}</li>
              </ul>
            </li>
            <li>
              {t('terms.yourAccessRules3')}
              <ul>
                <li>{t('terms.yourAccessRules3-1')}</li>
                <li>{t('terms.yourAccessRules3-2')}</li>
              </ul>
            </li>
            <li>
              {t('terms.yourAccessRules4')}
              <ul>
                <li>{t('terms.yourAccessRules4-1')}</li>
              </ul>
            </li>
            <li>
              {t('terms.yourAccessRules5')}
              <ul>
                <li>{t('terms.yourAccessRules5-1')}</li>
                <li>{t('terms.yourAccessRules5-2')}</li>
              </ul>
            </li>
            <li>{t('terms.yourAccessRules6')}</li>
          </ol>
        </div>
        <div className="btm-10">
          <Typography variant="h4">
            {t('terms.informationUsageTitle')}
          </Typography>
        </div>
        <div className="btm-10">
          <Typography variant="body2">
            {t('terms.informationUsageText')}
          </Typography>
        </div>
        <ul>
          <li>{t('terms.informationUsage1')}</li>
          <li>{t('terms.informationUsage2')}</li>
          <li>{t('terms.informationUsage3')}</li>
          <li>{t('terms.informationUsage4')}</li>
          <li>{t('terms.informationUsage5')}</li>
        </ul>
        <div className="btm-10">
          <Typography variant="body2">
            {t('terms.informationUsageFeedback')}
          </Typography>
        </div>
        <div className="btm-10">
          <Typography variant="h4">{t('terms.notificationsTitle')}</Typography>
        </div>
        <div className="btm-10">
          <Typography variant="body2">
            {t('terms.notificationsText')}
          </Typography>
        </div>
        <div className="btm-10">
          <Typography variant="h4">{t('terms.aboutCellPhoneTitle')}</Typography>
        </div>
        <div className="btm-10">
          <Typography variant="body2">
            {t('terms.aboutCellPhoneText')}
          </Typography>
        </div>
        <ul>
          <li>{t('terms.aboutCellPhone1')}</li>
        </ul>
        <div className="btm-10">
          <Typography variant="h4">{t('terms.feesAndDisputes')}</Typography>
        </div>
        <div className="btm-10">
          <Typography variant="body2">
            <ol>
              <li>{t('terms.feesAndDisputes1')}</li>
              <li>{t('terms.feesAndDisputes2')}</li>
              <li>{t('terms.feesAndDisputes3')}</li>
              <li>{t('terms.feesAndDisputes4')}</li>
              <li>{t('terms.feesAndDisputes5')}</li>
            </ol>
          </Typography>
        </div>
        <div className="btm-10">
          <Typography variant="h4">{t('terms.updatesToTermsTitle')}</Typography>
        </div>
        <div className="btm-10">
          <Typography variant="body2">
            {t('terms.updatesToTermsText')}
          </Typography>
        </div>
        <div className="btm-10">
          <Typography variant="h4">{t('terms.notMedicalCareTitle')}</Typography>
        </div>
        <div className="btm-10">
          <Typography variant="body2">
            {t('terms.notMedicalCareText')}
          </Typography>
        </div>
        <div className="btm-10">
          <Typography variant="h4">{t('terms.otherPoliciesTitle')}</Typography>
        </div>
        <div className="btm-10">
          <Typography variant="body2">
            {t('terms.otherPoliciesText')}
          </Typography>
        </div>
        <ul>
          <li>{t('terms.otherPolicies1')}</li>
        </ul>
        <div className="btm-10">
          <Typography variant="h4">{t('terms.contactTitle')}</Typography>
        </div>
        <div className="btm-10">
          <Typography variant="body2">{t('terms.contactText')}</Typography>
        </div>
        <div className="btm-10">
          <Typography variant="h4">{t('terms.versionsTitle')}</Typography>
        </div>
        <div className="btm-10">
          <Typography variant="body2">{t('terms.versionsText')}</Typography>
        </div>
        <ul>
          <li>{t('terms.versionsText1')}</li>
        </ul>
      </div>
    </ResponsiveStepWrapper>
  )
}

export default Terms
