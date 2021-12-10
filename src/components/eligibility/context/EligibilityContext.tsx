import React, { useState, createContext, useContext } from 'react'

export type EligibilityState = {
  isEligible: boolean
  phoneNumber: string
  setPhoneNumber: (state: string) => void
  setIsEligible: (state: boolean) => void
  howDidYouHear: string
  setHowDidYouHear: (state: string) => void
  mentalHealthExperience: Array<string>
  setMentalHealthExperience: (state: Array<string>) => void
  whereDoYouLive: string
  setWhereDoYouLive: (state: string) => void
  doYouHaveAnAndroid: string
  setDoYouHaveAnAndroid: (state: string) => void
  understandEnglish: boolean
  setUnderstandEnglish: (state: boolean) => void
  age: number
  setAge: (state: number) => void
  gender: object
  setGender: (state: object) => void
}

const EligibilityContext = createContext<EligibilityState>({
  isEligible: false,
  phoneNumber: '',
  setPhoneNumber: (state: string) => {},
  setIsEligible: (state: boolean) => {},
  howDidYouHear: '',
  setHowDidYouHear: (state: string) => {},
  mentalHealthExperience: [],
  setMentalHealthExperience: (state: Array<string>) => [],
  whereDoYouLive: '',
  setWhereDoYouLive: (state: string) => {},
  doYouHaveAnAndroid: '',
  setDoYouHaveAnAndroid: (state: string) => {},
  understandEnglish: false,
  setUnderstandEnglish: (state: boolean) => {},
  age: 0,
  setAge: (state: number) => {},
  gender: {},
  setGender: (state: object) => {},
})

export const useEligibility = () => useContext(EligibilityContext)

export function EligibilityProvider(props: { children: React.ReactNode }) {
  const { children } = props

  const [isEligible, setIsEligible] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [howDidYouHear, setHowDidYouHear] = useState('')
  const [mentalHealthExperience, setMentalHealthExperience] = useState<
    Array<string>
  >([])
  const [whereDoYouLive, setWhereDoYouLive] = useState('')
  const [doYouHaveAnAndroid, setDoYouHaveAnAndroid] = useState('')
  const [understandEnglish, setUnderstandEnglish] = useState(false)
  const [age, setAge] = useState(0)
  const [gender, setGender] = useState({})

  const value = {
    isEligible,
    setIsEligible,
    phoneNumber,
    setPhoneNumber,
    howDidYouHear,
    setHowDidYouHear,
    mentalHealthExperience,
    setMentalHealthExperience,
    whereDoYouLive,
    setWhereDoYouLive,
    doYouHaveAnAndroid,
    setDoYouHaveAnAndroid,
    understandEnglish,
    setUnderstandEnglish,
    age,
    setAge,
    gender,
    setGender,
  }

  return (
    <EligibilityContext.Provider value={value}>
      {children}
    </EligibilityContext.Provider>
  )
}
