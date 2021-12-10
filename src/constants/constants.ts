import { UserDataGroup } from 'types/types'

export const APP_ID = 'wellcome'
export const SUB_STUDY_ID = 'wellcome-study'
export const SESSION_NAME = 'bridge-session-mindkind'
export const ENDPOINT = 'https://webservices.sagebridge.org'
export const SURVEY_TIME_CONSTANT = '2020-06-15T00:14:04.322Z'
export const SURVEY_IDENTIFIER = 'mindkind'
export const PAGE_ID_FIELD_NAME = 'page_id'
export const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=org.sagebionetworks.research.mindkind'
export const PROD_DOMAIN = 'mindkindstudy.org'
export const STAGING_DOMAIN = 'staging.mindkindstudy.org'

export const SHARE_SCOPE_PARTNERS = 'sponsors_and_partners'
export const SHARE_SCOPE_ALL = 'all_qualified_researchers'
export const SUBPOP_GUID = 'wellcome'
export const HIPAA_SUBPOP_GUID = 'g2mW_YdW70k9lJ4PZQboJD3n'

export const PAGE_ID = {
  WHAT_ARE_WE_STUDYING: 'C01_StudyIntro',
  WHAT_WILL_YOU_ASK: 'C02_StudyAsk',
  WHAT_WILL_YOU_ASK_QUIZ: 'C03_StudyAsk-Quiz',
  RISKS_AND_BENEFITS: 'C04_RisksBenefits',
  NOT_MEDICAL_CARE: 'C05_NotMedicalCare',
  STUDY_PURPOSE_QUIZ: 'C06_StudyPurpose-Quiz',
  LEAVING_STUDY: 'C07_LeavingStudy',
  LEAVING_STUDY_QUIZ: 'C08_LeavingStudy-Quiz',
  YOUR_STUDY_DATA: 'C09_YourStudyData',
  DATA_COLLECTION: 'C10_Data',
  DATA_RIGHTS: 'C11_DataRights',

  RESEARCH_NORMS_01: 'SG1_01_ResearchNorms',
  RESEARCH_NORMS_02: 'SG1_02_ResearchersDataAccess',
  RESEARCH_NORMS_03: 'SG1_03_DataResearchType',
  YOUTH_INFORMED_01: 'SG2_01_YouthInformed',
  YOUTH_INFORMED_02: 'SG2_02_ResearchersDataAccess',
  YOUTH_INFORMED_03: 'SG2_03_ResearchersDataUsage',
  HYBRID_01: 'SG3_Hybrid',
  HYBRID_02: 'SG3_Hybrid_ResearchersDataAccess',
  HYBRID_03: 'SG3_Hybrid_ResearchersDataUsage',
  PARTICIPANT_CHOICE_01: 'SG4-01_ParticipantChoice',
  PARTICIPANT_CHOICE_02: 'SG4-02_ResearcherAccess',
  PARTICIPANT_CHOICE_03: 'SG4-03_DataControl',
  PARTICIPANT_CHOICE_04: 'SG4_04_VolunteerPage',

  VOTING_01: 'V01_VotingIntro',
  VOTING_02: 'V02_ResearchersDataProfit',
  VOTING_03: 'V03_DataPayment',
  VOTING_04: 'V04_DataUsage',
  VOTING_05: 'V05_DataSharing',
  VOTING_06: 'V06_VotingConfirmation',

  SUMMARY: 'C12_Summary',
  CONTACT: 'C13_Contact',
  SIGNATURE: 'C14_Signature',

  RANKING_CHOICE: 'Ranking_Choice_Initial',
  REVIEW_RANKING_CHOICE: 'Ranking_Choice_Final',
  COMMUNITY_PANEL: 'Community_Panel',
  APP_DOWNLOAD: 'App_Download',
}

export const RANKED_CHOICE = {
  CAN_RESEARCHERS_MAKE_PROFIT: 'canResearchersMakeProfit',
  DO_PEOPLE_HAVE_TO_PAY: 'doPeopleHaveToPay',
  HOW_CAN_DATA_BE_USED: 'howCanDataBeUsed',
  HOW_CAN_RESULTS_BE_SHARED: 'howCanResultsBeShared',
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
  CONSENT_INFO: '/consent-info',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS: '/terms',
  CONTACT: '/contact',
  ABOUT: '/about',
  RESEARCH: '/research',
  HOME: '/home',
  DATA_REGULATION: '/data-regulation',
  LOGOUT: '/logout',
  HUB: '/hub?SkipWelcomeScreen=true',
  ELIGIBILITY: '/hub/eligibility',
  REGISTRATION: '/hub/registration',
  ABOUT_THE_STUDY: '/hub/about-the-study',
  ABOUT_DATA_SHARING: '/hub/about-data-sharing',
  SUMMARY_AND_SIGNATURE: '/hub/summary-and-signature',
  THANK_YOU_ZA: '/hub/thank-you',
}

export const MENTAL_HEALTH_EXPERIENCE = {
  HAS_INTERFERED: 'My mental health has interfered with my daily life',
  RECEIVED_SUPPORT:
    'I have received support (outside my friends and family) for my mental health',
  COULD_BENEFIT: 'I could have benefited from support for my mental health.',
  NOT_EXPERIENCED:
    'I have not experienced any significant mental health challenges',
}

export const RESEARCHERS_DATA_ACCESS = {
  DOWNLOAD_THE_STUDY:
    'They will download the study data which includes a copy of my data.',
  WILL_ONLY_VIEW_DATA:
    'They will only view my data on a secure server. They cannot download my data.',
  WILL_RECEIVE_A_PRINT: 'They will receive a print out of my data by mail.',
}

export const DATA_RESEARCH_TYPE = {
  HEALTH_RESEARCH: 'Only health research',
  MENTAL_HEALTH_RESEARCH: 'Only mental health research',
  ALL_KIND_RESEARCH:
    'All kinds of research, including commercial (for profit) research.',
}

export const RESEARCHERS_DATA_USAGE = {
  RESEARCHERS_WILL_DECIDE: 'Researchers will decide how study data is used.',
  STUDY_PARTICIPANTS_DECIDE:
    'Study participants vote to decide how study data is used.',
  GOVERMENT_DECIDE: 'The government will decide how study data is used.',
}

export const COUNTRY_CODES = {
  UK: 'UK',
  IN: 'IN',
  SOUTH_AFRICA: 'ZA',
  OTHER: 'OTHER',
  US: 'US',
}

export const HUB_STEPS = {
  ELEGIBILITY: 1,
  REGISTRATION: 2,
  ABOUT_THE_STUDY: 3,
  ABOUT_DATA_SHARING: 4,
  SUMMARY_AND_SIGNATURE: 5,
}

export const ELIGIBILITY_STEPS = {
  1: { param: 'where', title: 'MindKind > Where do you live?' },
  2: { param: 'android', title: 'MindKind > Do you have an android?' },
  3: { param: 'english', title: 'MindKind > Do you speak english?' },
  4: { param: 'ageRange', title: 'MindKind > How old are you?' },
  5: {
    param: 'gender',
    title: 'MindKind > What is your current gender/gender identity?',
  },
  6: {
    param: 'mhExperience',
    title: 'MindKind > Mental Health Experience',
  },
  7: {
    param: 'howDidYouHear',
    title: 'MindKind > How did you hear about us?',
  },
  8: { param: 'summary', title: 'MindKind > Summary' },
}

type LivedExperience = {
  YES: UserDataGroup
  NO: UserDataGroup
}

export const LIVED_EXPERIENCE: LivedExperience = {
  YES: 'lived_experience_yes',
  NO: 'lived_experience_no',
}

export const FLAGS = {
  unitedKingdom: 'UK',
  india: 'IN',
  southAfrica: 'ZA',
  unitedStates: 'US',
}

export const EXTERNAL_ID_SALT = 'M!ndKind'
