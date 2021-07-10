import * as React from 'react'
import { setSession, getSession, clearSession } from './helpers/utility'
import { SessionData } from './types/types'

type ActionType = 'LOGIN' | 'LOGOUT'
type Action = { type: ActionType; payload?: SessionData }
type Dispatch = (action: Action) => void
type SessionDataProviderProps = { children: React.ReactNode }

const initialState: SessionData = {
  token: undefined,
  userDataGroup: [],
}

const SessionDataStateContext = React.createContext<SessionData | undefined>(
  undefined,
)
const SessionDataDispatchContext = React.createContext<Dispatch | undefined>(
  undefined,
)

function sessionReducer(state: SessionData, action: Action): SessionData {
  switch (action.type) {
    case 'LOGIN':
      const newState = {
        ...state,
        token: action.payload!.token,
        consented: action.payload!.consented,
        name: action.payload!.name,
        userDataGroup: action.payload!.userDataGroup,
      }
      setSession(newState)
      return newState

    case 'LOGOUT':
      clearSession()
      return {
        ...state,
        token: undefined,
        name: '',
        consented: undefined,
        userDataGroup: [],
      }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function SessionDataProvider({ children }: SessionDataProviderProps) {
  const [state, dispatch] = React.useReducer(
    sessionReducer,
    getSession() || initialState,
  )
  return (
    <SessionDataStateContext.Provider value={state}>
      <SessionDataDispatchContext.Provider value={dispatch}>
        {children}
      </SessionDataDispatchContext.Provider>
    </SessionDataStateContext.Provider>
  )
}

function useSessionDataState() {
  const context = React.useContext(SessionDataStateContext)
  if (context === undefined) {
    throw new Error('useSessionDataState must be used within a SessionProvider')
  }
  return context
}

function useSessionDataDispatch() {
  const context = React.useContext(SessionDataDispatchContext)
  if (context === undefined) {
    throw new Error(
      'useSessionDataDispatch must be used within a SessionProvider',
    )
  }
  return context
}

export { SessionDataProvider, useSessionDataState, useSessionDataDispatch }
