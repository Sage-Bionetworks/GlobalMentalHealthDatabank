import React from 'react'
import EligibilityRegistration from './EligibilityRegistration'
import TestRenderer from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import { SessionDataProvider } from '../../AuthContext'

test('renders EligibilityRegistration', () => {
  const routeComponentPropsMock = {
    history: {} as any,
    location: {} as any,
    match: {} as any,
  }
  const testRenderer = TestRenderer.create(
    <Router>
      <SessionDataProvider>
        <EligibilityRegistration
          callbackFn={() => {}}
          {...routeComponentPropsMock}
        />
      </SessionDataProvider>
    </Router>,
  )
  const testInstance = testRenderer.root
  expect(testInstance.findByType(EligibilityRegistration))
})
