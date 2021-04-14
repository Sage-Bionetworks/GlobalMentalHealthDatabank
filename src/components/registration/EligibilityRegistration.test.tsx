import React from 'react'
import EligibilityRegistration from './EligibilityRegistration'
import TestRenderer from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'

test('renders EligibilityRegistration', () => {
  const routeComponentPropsMock = {
    history: {} as any,
    location: {} as any,
    match: {} as any,
  }
  const testRenderer = TestRenderer.create(
    <Router>
      <EligibilityRegistration
        callbackFn={() => {}}
        {...routeComponentPropsMock}
      />
    </Router>,
  )
  const testInstance = testRenderer.root
  expect(testInstance.findByType(EligibilityRegistration))
})
