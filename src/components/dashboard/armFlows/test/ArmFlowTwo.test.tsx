import React from 'react'
import ArmFlowThree from '../ArmFlowThree'
import TestRenderer from 'react-test-renderer'

test('renders ArmFlowThree', () => {
  const testRenderer = TestRenderer.create(
    <ArmFlowThree
      step={1}
      setStep={() => {}}
      maxSteps={10}
      updateClientData={() => {}}
    />,
  )
  const testInstance = testRenderer.root
  expect(testInstance.findByType(ArmFlowThree))
})
