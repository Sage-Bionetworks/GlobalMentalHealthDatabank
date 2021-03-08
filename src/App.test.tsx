import React from 'react'
import { render } from '@testing-library/react'
import App from './App'
import { SessionDataProvider } from './AuthContext'

test('renders App', () => {
  const renderMe = render(
    <SessionDataProvider>
      <App />
    </SessionDataProvider>,
  )
})
