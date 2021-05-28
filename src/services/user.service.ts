import { ENDPOINT } from '../constants/constants'
import { LoggedInUserData, Response } from '../types/types'
import { callEndpoint } from '../helpers/utility'

export const UserService = {
  getUserInfo,
  updateUserClientData,
}

async function getUserInfo(token: string): Promise<Response<LoggedInUserData>> {
  const result = await callEndpoint<LoggedInUserData>(
    `${ENDPOINT}/v3/participants/self`,
    'GET',
    {},
    token,
  )
  return result
}

async function updateUserClientData(
  token: string,
  data: any,
): Promise<Response<LoggedInUserData>> {
  const payload = {
    clientData: data,
  }
  const result = await callEndpoint<LoggedInUserData>(
    `${ENDPOINT}/v3/participants/self`,
    'POST',
    payload,
    token,
  )
  return result
}
