import {
  ENDPOINT,
  LoggedInUserData,
  Response,
  UserAttributes,
} from '../types/types'

import { callEndpoint } from '../helpers/utility'

export const UserService = {
  getUserInfo,
  updateUserAttributes,
  updateUserData,
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

async function updateUserAttributes(
  token: string,
  attributes: UserAttributes,
): Promise<Response<LoggedInUserData>> {
  const result = await callEndpoint<LoggedInUserData>(
    `${ENDPOINT}/v3/participants/self`,
    'POST',
    {
      attributes,
    },
    token,
  )
  return result
}

async function updateUserData(
  token: string,
  data: LoggedInUserData,
): Promise<Response<LoggedInUserData>> {
  const payload = {
    firstName: data.firstName,
    lastName: data.lastName,
    attributes: data.attributes,
    dataGroups: data.dataGroups,
  }
  const result = await callEndpoint<LoggedInUserData>(
    `${ENDPOINT}/v3/participants/self`,
    'POST',
    payload,
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
