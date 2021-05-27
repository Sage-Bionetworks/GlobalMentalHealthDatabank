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

export const APP_ID = 'wellcome'
export const SUB_STUDY_ID = 'wellcome-study'
export const SESSION_NAME = 'bridge-session-mindkind'
export const ENDPOINT = 'https://webservices.sagebridge.org'
export const PHONE_SIGN_IN_ENDPOINT = '/v3/auth/phone/signIn'
export const LOGIN_ENDPOINT = `${ENDPOINT}${PHONE_SIGN_IN_ENDPOINT}`
export const SURVEY_TIME_CONSTANT = '2020-06-15T00:14:04.322Z'
export const SURVEY_IDENTIFIER = 'mindkind'
export const PAGE_ID_FIELD_NAME = 'page_id'
export const SIGN_IN_METHOD = 'PHONE'
export const PAGE_ID = {
  WHAT_ARE_WE_STUDYING: 'C01_StudyIntro',
  WHAT_WILL_YOU_ASK: 'C02_StudyAsk',
  WHAT_WILL_YOU_ASK_QUIZ: 'C03_StudyAsk-Quiz',
  DATA_COLLECTION: 'C04_Data',
  DATA_RIGHTS: 'C05_DataRights',

  RESEARCH_NORMS: 'SG1_ResearchNorms',
  YOUTH_INFORMED: 'SG2_YouthInformed',
  HYBRID: 'SG3_Hybrid',
  PARTICIPANT_CHOICE_01: 'SG4-01_ParticipantChoice',
  PARTICIPANT_CHOICE_02: 'SG4-02_ResearcherAccess',
  PARTICIPANT_CHOICE_03: 'SG4-03_DataControl',

  RISKS_AND_BENEFITS: 'C06_RisksBenefits',
  NOT_MEDICAL_CARE: 'C07_NotMedicalCare',
  STUDY_PURPOSE_QUIZ: 'C08_StudyPurpose-Quiz',
  LEAVING_STUDY: 'C09_LeavingStudy',
  LEAVING_STUDY_QUIZ: 'C10_LeavingStudy-Quiz',
  CONTACT: 'C11_Contact',
  SUMMARY: 'C12_Summary',
  SIGNATURE: 'C13_Signature',

  RANKING_CHOICE: 'Ranking_Choice_Initial',
  REVIEW_RANKING_CHOICE: 'Ranking_Choice_Final',
  COMMUNITY_PANEL: 'Community_Panel',
  APP_DOWNLOAD: 'App_Download',
}
