import React from 'react'
import ArmFlowOne from '../ArmFlowOne'
import TestRenderer from 'react-test-renderer'

test('renders ArmFlowOne', () => {
  const testRenderer = TestRenderer.create(
    <ArmFlowOne step={1} setStep={() => {}} maxSteps={10} />,
  )
  const testInstance = testRenderer.root
  expect(testInstance.findByType(ArmFlowOne))
})
