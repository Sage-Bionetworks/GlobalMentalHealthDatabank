import React, { useState, createContext, useContext } from 'react'

type RankedChoiceState = {
  researchersDataProfit: string
  setResearchersDataProfit: (state: string) => void
  dataPayment: string
  setDataPayment: (state: string) => void
  dataUsage: string
  setDataUsage: (state: string) => void
  dataSharing: string
  setDataSharing: (state: string) => void
}

const RankedChoiceContext = createContext<RankedChoiceState>({
  researchersDataProfit: '',
  setResearchersDataProfit: (state: string) => {},
  dataPayment: '',
  setDataPayment: (state: string) => {},
  dataUsage: '',
  setDataUsage: (state: string) => {},
  dataSharing: '',
  setDataSharing: (state: string) => {},
})

export const useRankedChoice = () => useContext(RankedChoiceContext)

export function RankedChoiceProvider(props: { children: React.ReactNode }) {
  const { children } = props

  const [researchersDataProfit, setResearchersDataProfit] = useState('')
  const [dataPayment, setDataPayment] = useState('')
  const [dataUsage, setDataUsage] = useState('')
  const [dataSharing, setDataSharing] = useState('')

  const value = {
    researchersDataProfit,
    setResearchersDataProfit,
    dataPayment,
    setDataPayment,
    dataUsage,
    setDataUsage,
    dataSharing,
    setDataSharing,
  }

  return (
    <RankedChoiceContext.Provider value={value}>
      {children}
    </RankedChoiceContext.Provider>
  )
}
