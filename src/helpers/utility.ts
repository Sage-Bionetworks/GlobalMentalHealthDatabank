import {
  Response,
  Phone,
  SignInData,
  LoggedInUserData,
  SignInDataPhone,
  StringDictionary,
  SessionData,
} from '../types/types'
import { APP_ID, SESSION_NAME } from '../constants/constants'
import i18n from 'i18next'
import { useState } from 'react'

const fetchTimeout = (
  url: string,
  ms: number,
  { signal, ...options }: any = {},
) => {
  const controller = new AbortController()
  const promise = fetch(url, { signal: controller.signal, ...options })
  if (signal) signal.addEventListener('abort', () => controller.abort())
  const timeout = setTimeout(() => controller.abort(), ms)
  return promise.finally(() => clearTimeout(timeout))
}

export const callEndpoint = async <T>(
  endpoint: string,
  method: 'POST' | 'GET' = 'POST',
  data: StringDictionary,
  token?: string,
): Promise<Response<T>> => {
  const headers: HeadersInit = new Headers()
  headers.set('Accept-Language', i18n.language)
  headers.set('Content-Type', 'application/json')
  if (token) {
    headers.set('Bridge-Session', token)
  }

  const config = {
    method: method, // *GET, POST, PUT, DELETE, etc.
    headers,
    body: JSON.stringify(data),
  }

  if (method === 'GET') {
    const queryString = Object.keys(data)
      .map(key => key + '=' + data[key])
      .join('&')
    endpoint = queryString ? `${endpoint}?${queryString}` : endpoint
    delete config.body
  }

  const response = await fetchTimeout(endpoint, 15000, config)
  const result = await response.json()
  if (!response.ok && response.status !== 412) {
    throw result
  }
  return { status: response.status, data: result, ok: response.ok }
}

export const makePhone = (phone: string, regionCode?: string): Phone => {
  return { number: phone, regionCode: regionCode || '0' }
}

export const getSession = (): SessionData | undefined => {
  const item = sessionStorage.getItem(SESSION_NAME) || ''
  try {
    const json = JSON.parse(item)
    return json
  } catch {
    return undefined
  }
}

export const clearSession = () => {
  sessionStorage.removeItem(SESSION_NAME)
  sessionStorage.clear()
}

export const setSession = (data: SessionData) => {
  sessionStorage.setItem(SESSION_NAME, JSON.stringify(data))
}

export const sendSignInRequest = async (
  phoneNumber: string,
  countryCode: string,
  endpoint: string,
): Promise<any> => {
  let postData: SignInData

  postData = {
    appId: APP_ID,
    phone: makePhone(phoneNumber, countryCode),
  } as SignInDataPhone

  try {
    return callEndpoint<LoggedInUserData>(endpoint, 'POST', postData)
  } catch (e) {
    throw e
  }
}

// function to use session storage (react hooks)
export const useSessionStorage = (
  key: string,
  initialValue: string | undefined,
): [string | undefined, (value: string | undefined) => void] => {
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key)
      // Parse stored json or if none return initialValue
      const value = item ? item : initialValue
      if (value) {
        window.sessionStorage.setItem(key, value)
      }
      return value
    } catch (error) {
      // If error also return initialValue
      console.error(error)
      return initialValue
    }
  })
  // persist value to session storage
  const setValue = (value: string | undefined) => {
    try {
      setStoredValue(value)
      if (value) {
        window.sessionStorage.setItem(key, value)
      } else {
        window.sessionStorage.removeItem(key)
      }
    } catch (error) {
      console.error(error)
    }
  }
  return [storedValue, setValue]
}

export const getNumberWithOrdinal = (n: number) => {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

export const isValidPhoneNumber = (value: string) => {
  return /^(0|[0-9]\d*)$/.test(value)
}
