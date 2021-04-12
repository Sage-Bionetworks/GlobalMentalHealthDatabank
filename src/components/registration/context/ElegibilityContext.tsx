import React, { useState } from 'react'

type ElegibilityState = {
  isEligible: boolean
  setIsEligible: (state: boolean) => void
}

const ElegibilityContext = React.createContext<ElegibilityState>({
  isEligible: false,
  setIsEligible: (state: boolean) => {},
})

export const useElegibility = () => React.useContext(ElegibilityContext)

export function ElegibilityProvider(props: { children: React.ReactNode }) {
  const { children } = props

  const [isEligible, setIsEligible] = useState(false)

  const value = {
    isEligible,
    setIsEligible,
  }

  return (
    <ElegibilityContext.Provider value={value}>
      {children}
    </ElegibilityContext.Provider>
  )
}
