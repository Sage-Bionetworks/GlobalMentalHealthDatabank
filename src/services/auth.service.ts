import { callEndpoint } from 'helpers/utility'
import { APP_ID, ENDPOINT } from 'constants/constants'
import { LoggedInUserData, Phone, RegistrationData } from 'types/types'

export const signUpWithPhone = async (registrationData: RegistrationData) => {
  const result = await callEndpoint(
    `${ENDPOINT}/v3/auth/signUp`,
    'POST',
    registrationData,
  )
  return result
}

export const signUpWithExternalId = async (
  registrationData: RegistrationData,
) => {
  const result = await callEndpoint(
    `${ENDPOINT}/v3/auth/signUp`,
    'POST',
    registrationData,
  )
  return result
}

export const requestSMSCode = async (phoneNumber: Phone): Promise<any> => {
  const result = await callEndpoint<LoggedInUserData>(
    `${ENDPOINT}/v3/auth/phone`,
    'POST',
    {
      appId: APP_ID,
      phone: phoneNumber,
    },
  )
  return result
}

export const signInWithPhone = async (
  phoneNumber: Phone,
  code: string,
): Promise<any> => {
  const result = await callEndpoint<LoggedInUserData>(
    `${ENDPOINT}/v3/auth/phone/signIn`,
    'POST',
    {
      appId: APP_ID,
      phone: phoneNumber,
      token: code,
    },
  )
  return result
}

export const signInWithExternalId = async (
  externalId: string,
  password: string,
): Promise<any> => {
  const result = await callEndpoint<LoggedInUserData>(
    `${ENDPOINT}/v4/auth/signIn`,
    'POST',
    {
      appId: APP_ID,
      externalId,
      password,
    },
  )
  return result
}
