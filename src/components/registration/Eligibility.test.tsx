import React from 'react'
import Eligibility from './Eligibility'
import TestRenderer from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'

test('renders Eligibility', () => {
  const testRenderer = TestRenderer.create(
    <Router>
      <Eligibility setEligibilityFn={() => {}} />
    </Router>,
  )
  const testInstance = testRenderer.root
  expect(testInstance.findByType(Eligibility))
})
