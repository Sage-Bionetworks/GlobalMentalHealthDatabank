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

export const SHARE_SCOPE_PARTNERS = 'sponsors_and_partners'
export const SHARE_SCOPE_ALL = 'all_qualified_researchers'
export const SUBPOP_GUID = 'wellcome'
export const HIPAA_SUBPOP_GUID = 'g2mW_YdW70k9lJ4PZQboJD3n'

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

export const GENDERS = {
  WOMAN: 'Woman',
  MAN: 'Man',
  THIRDS_GENDER_NON_BINARY: 'Third gender / Non-Binary',
  TRANSGENDER: 'Transgender',
  OTHER: 'Other',
  PREFER_NOT_TO_SAY: 'Prefer not to say',
}

export const ROUTES = {
  SIGNIN: '/signin',
  DOWNLOAD: '/download',
  CONSENT_STEPS: '/consent-steps',
  ELIGIBILITY: '/eligibility',
  CONSENT_INFO: '/consent-info',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS: '/terms',
  CONTACT: '/contact',
  ABOUT: '/about',
  RESEARCH: '/research',
  HOME: '/home',
  DATA_REGULATION: '/data-regulation',
  LOGOUT: '/logout',
  CONSENT_PDF_DOWNLOAD_ENGLISH:
    'https://drive.google.com/file/d/1tSoOhxep0FSyL1fUdsfb0OGYCtmR1wQo/view?usp=sharing',
  CONSENT_PDF_DOWNLOAD_SESOTHO:
    'https://drive.google.com/file/d/1sgoT5RsaNBoxdWY98rpXLq1-rGDEvWzl/view?usp=sharing',
  CONSENT_PDF_DOWNLOAD_XHOSA:
    'https://drive.google.com/file/d/1H0ZELFv_TnOdJbaoP8TBd-qLqZq-Vcr-/view?usp=sharing',
  PRIVACY_POLICY_PDF_ENGLISH:
    'https://drive.google.com/file/d/1n7AnFob1qtBI7Fupsg2oOin5SMI4DAI_/view?usp=sharing',
  PRIVACY_POLICY_PDF_SESOTHO:
    'https://drive.google.com/file/d/1MSuleQM0BR9DRzwlP8rdEaTAEXu1Wn4X/view?usp=sharing',
  PRIVACY_POLICY_PDF_XHOSA:
    'https://drive.google.com/file/d/1E3PrsGNEpTemns_of-QFb08LWzd6L5Oe/view?usp=sharing',
}
