import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Button, TextField } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert/Alert'
import {
  getRandomFlowOption,
  FLOW_OPTIONS,
  getRandomArm,
  ARM_OPTIONS,
} from '../../helpers/RandomFlowGenerator'
import {
  APP_ID,
  SUB_STUDY_ID,
  ENDPOINT,
  PAGE_ID_FIELD_NAME,
  PAGE_ID,
  MENTAL_HEALTH_EXPERIENCE,
} from '../../constants/constants'
import { RegistrationData, UserDataGroup } from '../../types/types'
import {
  callEndpoint,
  makePhone,
  sendSignInRequest,
  getCountryCode,
} from '../../helpers/utility'
import useForm from '../useForm'
import { useEligibility } from '../eligibility/context/EligibilityContext'
import { ReactComponent as TextSent } from '../../assets/text_sent.svg'

const PHONE_SIGN_IN_TRIGGER_ENDPOINT = '/v3/auth/phone'
const LIVED_EXPERIENCE_YES = 'lived_experience_yes'
const LIVED_EXPERIENCE_NO = 'lived_experience_no'

export const Registration: React.FunctionComponent = () => {
  const {
    howDidYouHear,
    mentalHealthExperience,
    whereDoYouLive,
    doYouHaveAnAndroid,
    understandEnglish,
    age,
    gender,
    setPhoneNumber,
  } = useEligibility()
  const { t } = useTranslation()

  const stateSchema = {
    phone: { value: '', error: '' },
    countryCode: {
      value: whereDoYouLive,
      error: '',
    },
  }

  const validationStateSchema = {
    phone: {
      /*
      We can add a validation with the following schema
      validator: {
        regEx: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        error: t('registration.text5'),
      },*/
    },
    countryCode: {},
  }

  const [error, setErrorMessage] = useState('')

  const submitRegistration = async (registrationData: RegistrationData) => {
    const result = await callEndpoint(
      `${ENDPOINT}/v3/auth/signUp`,
      'POST',
      registrationData,
    )
    return result
  }

  async function onSubmitForm(state: any) {
    //register
    let consentModel: string = getRandomFlowOption()
    let dataGroups: UserDataGroup[] = ['test_user' as UserDataGroup]
    switch (consentModel) {
      case FLOW_OPTIONS.ONE:
        dataGroups.push(FLOW_OPTIONS.ONE as UserDataGroup)
        break
      case FLOW_OPTIONS.TWO:
        dataGroups.push(FLOW_OPTIONS.TWO as UserDataGroup)
        break
      case FLOW_OPTIONS.THREE:
        dataGroups.push(FLOW_OPTIONS.THREE as UserDataGroup)
        break
      case FLOW_OPTIONS.FOUR:
        dataGroups.push(FLOW_OPTIONS.FOUR as UserDataGroup)
        break
    }

    if (
      !mentalHealthExperience.includes(MENTAL_HEALTH_EXPERIENCE.NOT_EXPERIENCED)
    )
      dataGroups.push(LIVED_EXPERIENCE_YES as UserDataGroup)
    else dataGroups.push(LIVED_EXPERIENCE_NO as UserDataGroup)

    dataGroups.push(whereDoYouLive as UserDataGroup)

    const arm: string = getRandomArm()
    switch (arm) {
      case ARM_OPTIONS.ONE:
        dataGroups.push(ARM_OPTIONS.ONE as UserDataGroup)
        break
      case ARM_OPTIONS.TWO:
        dataGroups.push(ARM_OPTIONS.TWO as UserDataGroup)
        break
    }

    const data: RegistrationData = {
      phone: state.phone.value
        ? makePhone(state.phone.value, state.countryCode.value)
        : undefined,
      clientData: {
        consentModel,
        howDidYouHear,
        mentalHealthExperience,
        whereDoYouLive,
        doYouHaveAnAndroid,
        understandEnglish,
        age,
        gender,
        consented: false,
        [PAGE_ID_FIELD_NAME]: PAGE_ID.WHAT_WILL_YOU_ASK,
        checkpoint: {
          aboutTheStudy: {
            step: 1,
            status: 'started',
          },
          aboutDataSharing: {
            step: 1,
            status: 'unstarted',
          },
          summaryAndSignature: {
            step: 1,
            status: 'unstarted',
          },
        },
      },
      appId: APP_ID,
      substudyIds: [SUB_STUDY_ID],
      dataGroups,
    }

    try {
      const result = await submitRegistration(data)
      if (result.status === 201) {
        setErrorMessage('')
        const sentSigninRequest = await sendSignInRequest(
          data.phone,
          `${ENDPOINT}${PHONE_SIGN_IN_TRIGGER_ENDPOINT}`,
        )
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

  const formErrors = Object.keys(state)
    .filter(key => state[key].error)
    .join(', ')

  return (
    <div className="quiz-wrapper">
      <div className="media-wrapper text-left">
        <div className="icon-wrapper">
          <TextSent width="75" />
        </div>
      </div>

      <div className="btm-20">
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
                className="phone-input"
                variant="outlined"
                name="phone"
                type="number"
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

            {(error || formErrors) && (
              <div className="tp-30-neg btm-20">
                <Alert severity="error">{error || formErrors}</Alert>
              </div>
            )}

            <Button
              fullWidth
              color="primary"
              variant="contained"
              size="large"
              type="submit"
              className="wide-button"
              disabled={!state.phone.value}
            >
              {t('eligibility.createAccount')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Registration
