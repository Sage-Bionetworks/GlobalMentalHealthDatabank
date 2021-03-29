import React, { useState } from 'react'

import useForm from '../useForm'
import Button from '@material-ui/core/Button/Button'
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert/Alert'
import GreenSeparator from '../static/GreenSeparator'
import { useTranslation } from 'react-i18next'

type EligibilityProps = {
  setEligibilityFn: Function
}

export const Eligibility: React.FunctionComponent<EligibilityProps> = ({
  setEligibilityFn,
}: EligibilityProps) => {
  const { t } = useTranslation()
  const [checks, setChecks] = useState({
    over16: false,
    hasAndroid: false,
    inValidLocation: false,
  })

  return (
    <div id="Questions">
      <h1>{t('eligibility.title')}</h1>
      <p>{t('eligibility.text1')}</p>
      <GreenSeparator></GreenSeparator>

      <div className="form-group checkbox--nopad">
        <div className="form-group checkbox" style={{}}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                value={checks.over16}
                onChange={() =>
                  setChecks(prev => ({ ...prev, over16: !prev.over16 }))
                }
              />
            }
            label={t('eligibility.text2')}
          />
        </div>

        <div className="form-group checkbox">
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                value={checks.inValidLocation}
                onChange={() =>
                  setChecks(prev => ({
                    ...prev,
                    inValidLocation: !prev.inValidLocation,
                  }))
                }
              />
            }
            label={t('eligibility.text5')}
          />
        </div>

        <div className="form-group checkbox">
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                value={checks.hasAndroid}
                onChange={() =>
                  setChecks(prev => ({ ...prev, hasAndroid: !prev.hasAndroid }))
                }
              />
            }
            label={t('eligibility.text4')}
          />
        </div>
      </div>

      <div className="text-center">
        <Button
          color="primary"
          variant="contained"
          size="medium"
          type="submit"
          disabled={Object.values(checks).some(value => value !== true)}
          className="wideButton"
          onClick={() => setEligibilityFn()}
        >
          {t('common.continue')}
        </Button>
      </div>
    </div>
  )
}

export default Eligibility
