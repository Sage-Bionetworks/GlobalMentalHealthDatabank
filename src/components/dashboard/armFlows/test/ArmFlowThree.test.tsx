import React from 'react'
import ArmFlowTwo from '../ArmFlowTwo'
import TestRenderer from 'react-test-renderer'

test('renders ArmFlowTwo', () => {
  const testRenderer = TestRenderer.create(
    <ArmFlowTwo
      step={1}
      setStep={() => {}}
      maxSteps={10}
      updateClientData={() => {}}
    />,
  )
  const testInstance = testRenderer.root
  expect(testInstance.findByType(ArmFlowTwo))
})
