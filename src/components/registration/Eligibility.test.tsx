import React from 'react'
import Eligibility from './Eligibility'
import TestRenderer from 'react-test-renderer'

test('renders Eligibility', () => {
  const testRenderer = TestRenderer.create(
    <Eligibility setEligibilityFn={() => {}} />,
  )
  const testInstance = testRenderer.root
  expect(testInstance.findByType(Eligibility))
})
