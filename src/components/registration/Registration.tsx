import React, { useState } from 'react'
import Separator from '../static/Separator'
import useForm from '../useForm'
import {
  APP_ID,
  ENDPOINT,
  RegistrationData,
  UserDataGroup,
} from '../../types/types'
import {
  callEndpoint,
  makePhone,
  sendSignInRequest,
} from '../../helpers/utility'
import Button from '@material-ui/core/Button/Button'
import TextField from '@material-ui/core/TextField/TextField'
import { ReactComponent as TextSent } from '../../assets/text_sent.svg'
import {
  getRandomFlowOption,
  FLOW_OPTIONS,
} from '../../helpers/RandomFlowGenerator'
import { useTranslation } from 'react-i18next'
import { useElegibility } from './context/ElegibilityContext'

type RegistrationProps = {
  onSuccessFn: Function
  onErrorFn: Function
}

const PHONE_SIGN_IN_TRIGGER_ENDPOINT = '/v3/auth/phone'

export const Registration: React.FunctionComponent<RegistrationProps> = ({
  onSuccessFn,
  onErrorFn,
}: RegistrationProps) => {
  const {
    howDidYouHear,
    everBenefitedFromTreatment,
    whereDoYouLive,
    doYouHaveAnAndroid,
    understandEnglish,
    age,
    gender,
  } = useElegibility()
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
    const data: RegistrationData = {
      phone: state.phone.value
        ? makePhone(state.phone.value, state.countryCode.value)
        : undefined,
      clientData: {
        consentModel,
        howDidYouHear,
        everBenefitedFromTreatment,
        whereDoYouLive,
        doYouHaveAnAndroid,
        understandEnglish,
        age,
        gender,
      },
      appId: APP_ID,
      substudyIds: ['wellcome-study'],
      dataGroups: dataGroups,
    }
    const endPoint = {
      PHONE: `${ENDPOINT}${PHONE_SIGN_IN_TRIGGER_ENDPOINT}`,
    }

    //send signinRequest
    const phoneNumber = data.phone?.number || ''

    try {
      const result = await submitRegistration(data)

      if (result.status === 201) {
        setErrorMessage('')
        const sentSigninRequest = await sendSignInRequest(
          phoneNumber,
          state.countryCode.value,
          endPoint['PHONE'],
        )
        onSuccessFn(
          sentSigninRequest.status,
          sentSigninRequest.data,
          phoneNumber,
        )
      } else {
        setErrorMessage(t('eligibility.registerError'))
        onErrorFn(result.status)
      }
    } catch (e) {
      setErrorMessage(t('eligibility.registerError'))
      onErrorFn(e.statusCode, e.message)
    }
  }

  const { state, handleOnChange, handleOnSubmit } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm,
  )

  return (
    <div className="quiz-wrapper">
      <div className="media-wrapper text-left">
        <TextSent />
      </div>
      <div className="text-left">{t('eligibility.askPhone')}</div>
      <Separator />
      <div className="text-left">{t('eligibility.whyAsk')}</div>

      {
        <form className="demoForm" onSubmit={handleOnSubmit}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <div>
              <label htmlFor="phone" className="block--dark">
                {t('eligibility.myPhone')}
              </label>
              <div className="input--padded">
                <TextField
                  name="phone"
                  type="phone"
                  value={state.phone.value}
                  placeholder={'Phone #'}
                  aria-label={'Phone #'}
                  variant="outlined"
                  fullWidth
                  onChange={handleOnChange}
                  className="phone-input"
                />
              </div>
              {Object.keys(state).map(
                key =>
                  state[key].error && (
                    <p
                      className="error"
                      style={{ marginLeft: '2rem', fontSize: '1.4rem' }}
                    >
                      {state[key].error}
                    </p>
                  ),
              )}
              <p className="error-message">{error}</p>
              <div className="text-center">
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={!state.phone.value}
                >
                  {t('eligibility.createAccount')}
                </Button>
              </div>
            </div>
          </div>
        </form>
      }
    </div>
  )
}

export default Registration
