import { Response, HealhDataResponse } from '../types/types'
import { ENDPOINT } from '../constants/constants'
import { callEndpoint } from '../helpers/utility'
import moment from 'moment'

export const HealthService = {
  sendHealthData,
}

const APP_VERSION = 'version 1.0.0, build 1'

async function sendHealthData(
  token: string,
  data: any,
): Promise<Response<HealhDataResponse>> {
  const payload = {
    appVersion: APP_VERSION,
    createdOn: moment().toISOString(),
    data,
    phoneInfo: navigator.userAgent,
    metadata: {
      taskIdentifier: 'CONSENT',
    },
  }
  const result = await callEndpoint<HealhDataResponse>(
    `${ENDPOINT}/v3/healthdata`,
    'POST',
    payload,
    token,
  )
  return result
}
