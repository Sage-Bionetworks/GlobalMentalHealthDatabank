import React from 'react'
import ProgressBar from './ProgressBar'
import TestRenderer from 'react-test-renderer'

test('renders ProgressBar', () => {
  const testRenderer = TestRenderer.create(
    <ProgressBar step={1} maxSteps={10} />,
  )
  const testInstance = testRenderer.root
  expect(testInstance.findByType(ProgressBar))
})
