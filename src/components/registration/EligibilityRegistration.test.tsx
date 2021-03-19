import React from 'react'
import EligibilityRegistration from './EligibilityRegistration'
import TestRenderer from 'react-test-renderer'

test('renders EligibilityRegistration', () => {
  const routeComponentPropsMock = {
    history: {} as any,
    location: {} as any,
    match: {} as any,
  }
  const testRenderer = TestRenderer.create(
    <EligibilityRegistration
      callbackFn={() => {}}
      {...routeComponentPropsMock}
    />,
  )
  const testInstance = testRenderer.root
  expect(testInstance.findByType(EligibilityRegistration))
})
