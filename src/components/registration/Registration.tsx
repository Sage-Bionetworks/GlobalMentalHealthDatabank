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

type RegistrationProps = {
  onSuccessFn: Function
  onErrorFn: Function
}

const PHONE_SIGN_IN_TRIGGER_ENDPOINT = '/v3/auth/phone'

export const Registration: React.FunctionComponent<RegistrationProps> = ({
  onSuccessFn,
  onErrorFn,
}: RegistrationProps) => {
  const stateSchema = {
    phone: { value: '', error: '' },
    countryCode: {
      value: window.localStorage.getItem('selected_country') || '',
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
        flowSelection: flowSelection,
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
        setErrorMessage(
          'Error when registering, please verify your phone number and country selection',
        )
        onErrorFn(result.status)
      }
    } catch (e) {
      setErrorMessage(
        'Error when registering, please verify your phone number and country selection',
      )
      onErrorFn(e.statusCode, e.message)
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
      <div className="text-left">
        Before we get started, could we have your number?
      </div>
      <Separator />
      <div className="text-left">
        We are asking you for your phone number to make this consent process
        easier and faster for you. We will not keep your number if you decide
        not to join MindKind. If you do join, we will store your phone number
        securely. It will be kept separately from your data to protect your
        identity. We will not share your number with anyone.{' '}
      </div>

      {
        <form className="demoForm" onSubmit={handleOnSubmit}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <div>
              <label htmlFor="phone" className="block--dark">
                My Phone number is:
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
              <p className="error-message">{error}</p>
              <div className="text-center">
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={!state.phone.value}
                >
                  Create account
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
