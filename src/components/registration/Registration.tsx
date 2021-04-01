import React from 'react'
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
import { useTranslation } from 'react-i18next'
import { ReactComponent as TextSent } from '../../assets/text_sent.svg'
import {
  getRandomFlowOption,
  FLOW_OPTIONS,
} from '../../helpers/RandomFlowGenerator'

type RegistrationProps = {
  onSuccessFn: Function
  onErrorFn: Function
}

const PHONE_SIGN_IN_TRIGGER_ENDPOINT = '/v3/auth/phone'

export const Registration: React.FunctionComponent<RegistrationProps> = ({
  onSuccessFn,
  onErrorFn,
}: RegistrationProps) => {
  const { t } = useTranslation()
  const stateSchema = {
    phone: { value: '', error: '' },
    countryCode: {
      value: window.localStorage.getItem('selected_country') || '',
      error: '',
    },
  }

  const validationStateSchema = {
    phone: {
      /*validator: {
        regEx: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        error: t('registration.text5'),
      },*/
    },
    countryCode: {},
  }

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
    let flowSelection: string = getRandomFlowOption()
    let dataGroups: UserDataGroup[] = ['test_user' as UserDataGroup]
    switch (flowSelection) {
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
        'flow-selection': flowSelection,
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
    const result = await submitRegistration(data)
    if (result.status === 201) {
      const sentSigninRequest = await sendSignInRequest(
        phoneNumber,
        state.countryCode.value,
        endPoint['PHONE'],
      )

      onSuccessFn(sentSigninRequest.status, sentSigninRequest.data, phoneNumber)
    } else {
      onErrorFn(result.status)
    }
  }

  const { state, handleOnChange, handleOnSubmit } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm,
  )

  return (
    <div className="quizWrapper">
      <div className="media-wrapper text-left">
        <TextSent />
      </div>
      <div className="text-left">{t('registration.phoneIntroTitle')}</div>
      <Separator />
      <div className="text-left">{t('registration.phoneIntroBody')}</div>

      {
        <form className="demoForm" onSubmit={handleOnSubmit}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <div>
              <label htmlFor="phone" className="block--dark">
                {t('registration.myPhone')}
              </label>
              <div className="input--padded">
                <TextField
                  name="phone"
                  type="phone"
                  value={state.phone.value}
                  placeholder={`${t('common.phone')} #`}
                  aria-label={t('common.phone')}
                  variant="outlined"
                  fullWidth
                  onChange={handleOnChange}
                  className="phoneInput"
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
              <div className="text-center">
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={!state.phone.value}
                >
                  {t('registration.text3')}
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
