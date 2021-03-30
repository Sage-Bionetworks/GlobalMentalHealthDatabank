import React, { useState } from 'react'
import Separator from '../static/Separator'

import useForm from '../useForm'
import {
  APP_ID,
  ENDPOINT,
  RegistrationData,
  LoginType,
  UserDataGroup,
} from '../../types/types'
import {
  callEndpoint,
  makePhone,
  sendSignInRequest,
} from '../../helpers/utility'
import Button from '@material-ui/core/Button/Button'
import TextField from '@material-ui/core/TextField/TextField'
import { useTranslation, Trans } from 'react-i18next'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

import gb from '../../assets/flags/gb.svg'
import ind from '../../assets/flags/ind.svg'
import za from '../../assets/flags/za.svg'

import { ReactComponent as TextSent } from '../../assets/text_sent.svg'
import {
  getRandomFlowOption,
  FLOW_OPTIONS,
} from '../../helpers/RandomFlowGenerator'

type RegistrationProps = {
  onSuccessFn: Function
  onErrorFn: Function
}

const EMAIL_SIGN_IN_TRIGGER_ENDPOINT = '/v3/auth/email'
const PHONE_SIGN_IN_TRIGGER_ENDPOINT = '/v3/auth/phone'

const FLAGS = { greatBritain: 'GB', india: 'IN', southAfrica: 'ZA' }

const signupIntro = {
  PHONE: (
    <Trans i18nKey="registration.intro1">
      <h2>[translate]</h2>
      <p>[translate]</p>
      <p>[translate]</p>
      <p>[translate]</p>
    </Trans>
  ),
  EMAIL: (
    <Trans i18nKey="registration.intro2">
      <h2>[translate]</h2>
      <p>[translate] </p>
      <p> [translate]</p>
    </Trans>
  ),
}

export const Registration: React.FunctionComponent<RegistrationProps> = ({
  onSuccessFn,
  onErrorFn,
}: RegistrationProps) => {
  const { t } = useTranslation()
  const stateSchema = {
    email: { value: '', error: '' },
    phone: { value: '', error: '' },
    registrationType: { value: 'PHONE', error: '' },
    countryCode: { value: FLAGS.greatBritain, error: '' },
  }

  const validationStateSchema = {
    //https://www.w3resource.com/javascript/form/email-validation.php
    email: {},
    phone: {
      /*validator: {
        regEx: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        error: t('registration.text5'),
      },*/
    },
    registrationType: {},
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
      email: state.email.value,
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
    let loginType: LoginType = 'EMAIL'
    const endPoint = {
      PHONE: `${ENDPOINT}${PHONE_SIGN_IN_TRIGGER_ENDPOINT}`,
      EMAIL: `${ENDPOINT}${EMAIL_SIGN_IN_TRIGGER_ENDPOINT}`,
    }
    if (!data.email) {
      delete data.email
      loginType = 'PHONE'
    }

    //send signinRequest
    const phoneOrEmail = data.email || data.phone?.number || ''
    const result = await submitRegistration(data)
    if (result.status === 201) {
      const sentSigninRequest = await sendSignInRequest(
        loginType,
        phoneOrEmail,
        endPoint[loginType],
      )

      onSuccessFn(
        loginType,
        sentSigninRequest.status,
        sentSigninRequest.data,
        phoneOrEmail,
      )
    } else {
      onErrorFn(result.status)
    }
  }

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm,
  )

  return (
    <div>
      <div className="media-wrapper">
        <TextSent />
      </div>
      <div className="text-center">{t('registration.phoneIntroTitle')}</div>
      <Separator />
      <div className="text-center">{t('registration.phoneIntroBody')}</div>

      {state.registrationType.value === 'EMAIL' && (
        <form className="demoForm" onSubmit={handleOnSubmit}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <div>
              <div>
                <label htmlFor="email" className="block--dark">
                  {t('common.email')}
                </label>
                <div className="input--padded">
                  <TextField
                    name="email"
                    type="email"
                    value={state.email.value}
                    aria-label={t('common.email')}
                    onChange={handleOnChange}
                    variant="outlined"
                    label={t('common.email')}
                    fullWidth
                    autoComplete={t('common.emailAddress')}
                    placeholder={t('common.emailAddress')}
                  />
                </div>

                <div className="text-center">
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    type="submit"
                    disabled={!state.email.value}
                    className="wideButton"
                  >
                    {t('registration.text1')}
                  </Button>
                  <br />
                </div>
              </div>
            </div>
            {
              // temporarily disabling phone login
              false && (
                <div style={{ margin: '0 auto', textAlign: 'center' }}>
                  <Button
                    variant="text"
                    onClick={() => {
                      handleOnChange({
                        target: { name: 'registrationType', value: 'PHONE' },
                      })
                      handleOnChange({
                        target: { name: 'email', value: '' },
                      })
                      window.scrollTo(0, 0)
                    }}
                  >
                    {t('registration.text2')}
                  </Button>
                </div>
              )
            }
          </div>
        </form>
      )}

      {state.registrationType.value === 'PHONE' && (
        <form className="demoForm" onSubmit={handleOnSubmit}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <div>
              <label htmlFor="phone" className="block--dark">
                {t('registration.myPhone')}
              </label>
              <div className="input--padded--flags">
                <Select
                  labelId="flag-selector"
                  id="flag-selector"
                  value={state.countryCode.value}
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    handleOnChange({
                      target: {
                        name: 'countryCode',
                        value: event.target.value,
                      },
                    })
                  }}
                  variant="outlined"
                  className="phoneFlag"
                >
                  <MenuItem value={FLAGS.greatBritain}>
                    <img
                      src={gb}
                      className={'flagIcon'}
                      alt="Great Britain"
                    ></img>
                  </MenuItem>
                  <MenuItem value={FLAGS.india}>
                    <img src={ind} className={'flagIcon'} alt="India"></img>
                  </MenuItem>
                  <MenuItem value={FLAGS.southAfrica}>
                    <img
                      src={za}
                      className={'flagIcon'}
                      alt="South Africa"
                    ></img>
                  </MenuItem>
                </Select>
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
      )}
    </div>
  )
}

export default Registration
