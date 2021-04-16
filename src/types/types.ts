export const APP_ID = 'wellcome'

export const SESSION_NAME = 'bridge-session-mindkind'
export const ENDPOINT = 'https://webservices.sagebridge.org'

export const SURVEY_TIME_CONSTANT = '2020-06-15T00:14:04.322Z'
export const SURVEY_IDENTIFIER = 'mindkind'

export const GA_PROPERTY_ID = 'UA-131999358-2'

export interface StringDictionary {
  [key: string]: any
}

export type Phone = {
  number: string
  regionCode: string
}

export type UserAttributes = {
  address1: string
  address2?: string
  city: string
  state: string
  zip_code: string
  dob: string
  gender: string
  home_phone?: string
}

export interface UserData {
  username?: string
  firstName: string
  lastName: string
  email?: string
  phone?: Phone
  clientData: object
  attributes?: UserAttributes
}

export type UserDataGroup =
  | 'enrolled'
  | 'declined'
  | 'selected'
  | 'tests_requested'
  | 'tests_scheduled'
  | 'tests_cancelled'
  | 'tests_collected'
  | 'tests_available'
  | 'tests_notified'
  | 'hipaa_consented'
  | 'test_user'
  | 'within_nyc'
  | 'researcher_norms'
  | 'youth_informed'
  | 'hybrid'
  | 'participant_choice'

export interface LoggedInUserData extends UserData {
  sessionToken: string
  consented: boolean
  sharingScope: string
  dataGroups: UserDataGroup[]
  id: string
}

export interface RegistrationData {
  appId: string
  substudyIds: string[]

  email?: string
  phone?: Phone
  clientData: object
  dataGroups?: UserDataGroup[]
}

export interface Response<T> {
  status: number
  ok: boolean
  data: T
}

export type SignInData = {
  appId: string
}

export interface SignInDataPhone extends SignInData {
  phone: {
    number: string
    regionCode: string
  }
}

export type SessionData = {
  token: string | undefined
  name?: string
  consented?: boolean
  alert?: string
  userDataGroup: UserDataGroup[]
}

export enum SurveysCompletionStatusEnum {
  'NOT_DONE',
  'ALL_DONE',
}
