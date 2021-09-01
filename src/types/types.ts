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
  clientData: ClientData
  attributes?: UserAttributes
}

export type ClientData = {
  consentModel: UserDataGroup
  consented: boolean
  checkpoint: Checkpoint
  skipThankYou: boolean
}

export type Checkpoint = {
  aboutTheStudy: CheckpointData
  aboutDataSharing: CheckpointData
  summaryAndSignature: CheckpointData
}

export type CheckpointData = {
  step: number
  status: 'unstarted' | 'started' | 'complete'
}

export type UserDataGroup =
  | 'test_user'
  | 'researcher_norms'
  | 'youth_informed'
  | 'hybrid'
  | 'participant_choice'
  | 'UK'
  | 'ZA'
  | 'IN'
  | 'lived_experience_yes'
  | 'lived_experience_no'
  | 'ARM1_choice'
  | 'ARM2_assigned'

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
  userDataGroup: UserDataGroup[]
}

export interface HealhDataResponse {
  appVersion: string
  createdOn: string
  createdOnTimeZone: string
  data: object
  dayInStudy: number
  id: string
  metadata: object
  phoneInfo: string
  rawDataAttachmentId: string
  appId: string
  uploadDate: string
  uploadedOn: string
  userSharingScope: string
  userDataGroups: UserDataGroup[]
  userStudyMemberships: object
  version: number
  studyId: string
  type: string
}
