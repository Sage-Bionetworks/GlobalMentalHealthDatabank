import React from 'react'
import Registration from './Registration'
import TestRenderer from 'react-test-renderer'

test('renders Registration', () => {
  const testRenderer = TestRenderer.create(
    <Registration onSuccessFn={() => {}} onErrorFn={() => {}} />,
  )
  const testInstance = testRenderer.root
  expect(testInstance.findByType(Registration))
})
