import { ENDPOINT } from '../constants/constants'
import { Response, LoggedInUserData } from '../types/types'
import {
  SHARE_SCOPE_PARTNERS,
  SHARE_SCOPE_ALL,
  SUBPOP_GUID,
  HIPAA_SUBPOP_GUID,
} from '../constants/constants'
import { callEndpoint } from '../helpers/utility'
import moment from 'moment'

export const ConsentService = {
  updateMySharingScope,
  signGeneralConsent,
  signEhrConsent,
  withdrawEhrConsent,
  withdrawFromStudy,
  SHARE_SCOPE_PARTNERS,
  SHARE_SCOPE_ALL,
}

async function updateMySharingScope(
  scope: string,
  token: string,
): Promise<Response<LoggedInUserData>> {
  const data = {
    sharingScope: scope,
  }

  const result = await callEndpoint<LoggedInUserData>(
    `${ENDPOINT}/v3/participants/self`,
    'POST',
    data,
    token,
  )
  return result
}

async function signGeneralConsent(
  name: string,
  scope: string,
  token: string,
): Promise<any> {
  const data = {
    name,
    scope,
    signedOn: moment().toLocaleString(),
  }

  const result = await callEndpoint(
    `${ENDPOINT}/v3/subpopulations/${SUBPOP_GUID}/consents/signature`,
    'POST',
    data,
    token,
  )
  return result
}

async function signEhrConsent(
  name: string,
  scope: string,
  token: string,
): Promise<any> {
  const data = {
    name,

    scope,
    signedOn: moment().toLocaleString(),
  }

  const result = await callEndpoint(
    `${ENDPOINT}/v3/subpopulations/${HIPAA_SUBPOP_GUID}/consents/signature`,
    'POST',
    data,
    token,
  )
  return result
}

async function withdrawEhrConsent(token: string): Promise<any> {
  const data = {
    // could add a reason
  }

  const result = await callEndpoint(
    `${ENDPOINT}/v3/subpopulations/${HIPAA_SUBPOP_GUID}/consents/signature/withdraw`,
    'POST',
    data,
    token,
  )
  return result
}

async function withdrawFromStudy(userId: string, token: string): Promise<any> {
  const data = {
    // could add a reason
  }

  const result = await callEndpoint(
    `${ENDPOINT}/v3/consents/withdraw`,
    'POST',
    data,
    token,
  )
  return result
}
