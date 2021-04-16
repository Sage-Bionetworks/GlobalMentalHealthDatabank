import React from 'react'
import ArmFlowFour from '../ArmFlowFour'
import TestRenderer from 'react-test-renderer'

test('renders ArmFlowFour', () => {
  const testRenderer = TestRenderer.create(
    <ArmFlowFour
      step={1}
      setStep={() => {}}
      maxSteps={10}
      startingStep={1}
      updateClientData={() => {}}
    />,
  )
  const testInstance = testRenderer.root
  expect(testInstance.findByType(ArmFlowFour))
})
