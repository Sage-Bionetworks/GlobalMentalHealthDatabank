import { COUNTRY_CODES } from 'constants/constants'

export type EligibilityChoices = {
  howDidYouHear: string
  mentalHealthExperience: string
  userLocation: string
  hasAndroid: string
  understandsEnglish: string
  gender: string
  age: number
}

export const INITIAL_ELIGIBILITY_CHOICES: EligibilityChoices = {
  howDidYouHear: '',
  mentalHealthExperience: '',
  userLocation: '',
  hasAndroid: '',
  understandsEnglish: '',
  gender: '',
  age: -1,
}

export const validateAgeRange = (location: string, age: number) => {
  //Check if age is 18 to 24 years old, or 16-24 years old if it's in the United Kingdom
  if (!location || !age) return false
  const MAX_AGE = 24
  const MIN_AGE = location === COUNTRY_CODES.UK ? 16 : 18
  return age >= MIN_AGE && age <= MAX_AGE
}

export const getCountryNameFromCountryCode = (
  countryCode: string,
  t: Function,
) => {
  switch (countryCode) {
    case 'UK':
      return t('common.unitedKingdom')
    case 'ZA':
      return t('common.southAfrica')
    case 'IN':
      return t('common.india')
    case 'US':
      return t('common.unitedStates')
    case 'OTHER':
      return t('common.other')
  }
}

export const isEligible = (choices: EligibilityChoices) => {
  return (
    choices.userLocation !== COUNTRY_CODES.OTHER &&
    choices.hasAndroid &&
    validateAgeRange(choices.userLocation, choices.age) &&
    choices.understandsEnglish
  )
}
