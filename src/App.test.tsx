import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import App from './App'
import { SessionDataProvider } from './AuthContext'

test('renders App', () => {
  const renderMe = render(
    <SessionDataProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SessionDataProvider>,
  )
})
