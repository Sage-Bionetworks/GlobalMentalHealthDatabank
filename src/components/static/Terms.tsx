import React from 'react'
import { useTranslation } from 'react-i18next'
import { Typography } from '@material-ui/core'
import ResponsiveStepWrapper from '../common/ResponsiveStepWrapper'

export const Terms: React.FunctionComponent = () => {
  const { t } = useTranslation()
  return (
    <ResponsiveStepWrapper variant="card">
      <div className="legislation-wrapper">
        <div className="btm-20">
          <Typography variant="h3">{t('terms.title')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">
            {t('terms.effectiveDateText')}
          </Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('terms.mindkindStudy1')}</Typography>
        </div>
        <div className="btm-50">
          <Typography variant="body2">{t('terms.mindkindStudy2')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="h4">{t('terms.whoCanUse')}</Typography>
        </div>
        <div className="btm-20 bullets">
          <Typography variant="body2">{t('terms.whoCanUse1')}</Typography>
        </div>
        <div className="btm-50 bullets">
          <Typography variant="body2">{t('terms.whoCanUse2')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="h4">{t('terms.siteAndAppTitle')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('terms.siteAndAppText')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('terms.siteAndAppRules1')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">
            {t('terms.siteAndAppRules1-1')}
          </Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">
            {t('terms.siteAndAppRules1-2')}
          </Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('terms.siteAndAppRules2')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">
            {t('terms.siteAndAppRules2-1')}
          </Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('terms.siteAndAppRules3')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('terms.siteAndAppRules4')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('terms.siteAndAppRules5')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('terms.siteAndAppRules6')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('terms.siteAndAppRules7')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('terms.siteAndAppRules8')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('terms.siteAndAppRules9')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="h4">{t('terms.yourAccess')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('terms.yourAccessRules')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('terms.yourAccessRules1')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('terms.yourAccessRules2')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">
            {t('terms.yourAccessRules2-1')}
          </Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">
            {t('terms.yourAccessRules2-2')}
          </Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('terms.yourAccessRules3')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">
            {t('terms.yourAccessRules3-1')}
          </Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">
            {t('terms.yourAccessRules3-2')}
          </Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('terms.yourAccessRules4')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">
            {t('terms.yourAccessRules4-1')}
          </Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('terms.yourAccessRules5')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">
            {t('terms.yourAccessRules5-1')}
          </Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">
            {t('terms.yourAccessRules5-2')}
          </Typography>
        </div>
        <div className="btm-50">
          <Typography variant="body2">{t('terms.yourAccessRules6')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="h4">
            {t('terms.informationUsageTitle')}
          </Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">
            {t('terms.informationUsageText')}
          </Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">
            {t('terms.informationUsage1')}
          </Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">
            {t('terms.informationUsage2')}
          </Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">
            {t('terms.informationUsage3')}
          </Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">
            {t('terms.informationUsage4')}
          </Typography>
        </div>
        <div className="btm-50">
          <Typography variant="body2">
            {t('terms.informationUsage5')}
          </Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">
            {t('terms.informationUsageFeedback')}
          </Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">
            {t('terms.notificationsTitle')}
          </Typography>
        </div>
        <div className="btm-50">
          <Typography variant="body2">
            {t('terms.notificationsText')}
          </Typography>
        </div>
        <div className="btm-20">
          <Typography variant="h4">{t('terms.aboutCellPhoneTitle')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">
            {t('terms.aboutCellPhoneText')}
          </Typography>
        </div>
        <div className="btm-50">
          <Typography variant="body2">{t('terms.aboutCellPhone1')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="h4">{t('terms.feesAndDisputes')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('terms.feesAndDisputes1')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('terms.feesAndDisputes2')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('terms.feesAndDisputes3')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('terms.feesAndDisputes4')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('terms.feesAndDisputes5')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="h4">{t('terms.updatesToTermsTitle')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">
            {t('terms.updatesToTermsText')}
          </Typography>
        </div>
        <div className="btm-20">
          <Typography variant="h4">{t('terms.notMedicalCareTitle')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">
            {t('terms.notMedicalCareText')}
          </Typography>
        </div>
        <div className="btm-20">
          <Typography variant="h4">{t('terms.otherPoliciesTitle')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">
            {t('terms.otherPoliciesText')}
          </Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('terms.otherPolicies1')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('terms.contactTitle')}</Typography>
        </div>
        <div className="btm-50">
          <Typography variant="body2">{t('terms.contactText')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="h4">{t('terms.versionsTitle')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('terms.versionsText')}</Typography>
        </div>
        <div className="btm-20">
          <Typography variant="body2">{t('terms.versionsText1')}</Typography>
        </div>
      </div>
    </ResponsiveStepWrapper>
  )
}

export default Terms
