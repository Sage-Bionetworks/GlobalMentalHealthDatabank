import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Button, TextField } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert/Alert'

import { getCountryCode, getPhoneLength, makePhone } from 'helpers/utility'
import useForm from '../useForm'
import { useEligibility } from '../eligibility/context/EligibilityContext'
import { ReactComponent as TextSent } from 'assets/text_sent.svg'
import { createRegistrationData } from './utils'
import { signUpWithPhone, requestSMSCode } from 'services/auth.service'

function PhoneRegistration() {
  const eligibility = useEligibility()
  const { whereDoYouLive, setPhoneNumber } = eligibility
  const { t } = useTranslation()

  const stateSchema = {
    phone: { value: '', error: '' },
    countryCode: {
      value: whereDoYouLive,
      error: '',
    },
  }

  const validationStateSchema = {
    phone: {},
    countryCode: {},
  }

  const [error, setErrorMessage] = useState('')

  async function onSubmitForm(state: any) {
    const data = createRegistrationData(eligibility)
    data.phone = makePhone(state.phone.value, state.countryCode.value)

    try {
      const result = await signUpWithPhone(data)
      if (result.status === 201) {
        setErrorMessage('')
        const sentSigninRequest = await requestSMSCode(data.phone)
        if (sentSigninRequest.status === 202) {
          setPhoneNumber(state.phone.value)
        } else {
          setErrorMessage(t('eligibility.registerError'))
        }
      } else {
        setErrorMessage(t('eligibility.registerError'))
      }
    } catch (e) {
      setErrorMessage(`${t('eligibility.registerError')}`)
    }
  }

  const { state, handleOnChange, handleOnSubmit } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm,
  )
  const maxLength = getPhoneLength(whereDoYouLive)
  return (
    <div className="quiz-wrapper">
      <div className="media-wrapper text-left">
        <div className="icon-wrapper">
          <TextSent width="75" />
        </div>
      </div>

      <div className="btm-40">
        <Typography variant="h4">{t('eligibility.letsRegister')}</Typography>
      </div>

      <div className="btm-40">
        <Typography variant="body2">{t('eligibility.enterNumber')}</Typography>
      </div>

      <form onSubmit={handleOnSubmit}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <div>
            <label htmlFor="phone" className="block--dark">
              <Typography variant="h6">{t('eligibility.myPhone')}</Typography>
            </label>
            <div className="btm-40 phone-input">
              <div className="country-code">
                <Typography variant="body2">
                  {getCountryCode(whereDoYouLive)}
                </Typography>
              </div>
              <TextField
                fullWidth
                className="phone-input-helper"
                variant="outlined"
                name="phone"
                type="tel"
                inputProps={{ maxLength }}
                helperText={`${state.phone.value.length}/${maxLength}`}
                value={state.phone.value}
                placeholder="Phone #"
                aria-label="Phone #"
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  const { value } = event.target as any
                  event.target.value = value.replace(/[^\d]/, '')
                  handleOnChange(event)
                }}
              />
            </div>

            <div className="btm-50">
              <Typography variant="body2">
                {t('eligibility.numberDisclaimer')}
              </Typography>
            </div>

            {error && (
              <div className="tp-30-neg btm-20">
                <Alert severity="error">{error}</Alert>
              </div>
            )}

            <Button
              fullWidth
              color="primary"
              variant="contained"
              size="large"
              type="submit"
              className="wide-button"
              disabled={state.phone.value.length !== maxLength}
            >
              {t('eligibility.createAccount')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PhoneRegistration
