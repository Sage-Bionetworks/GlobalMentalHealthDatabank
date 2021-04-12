import React from 'react'
import SignInWithCode from './SignInWithCode'
import TestRenderer from 'react-test-renderer'

test('renders SignInWithCode', () => {
  const testRenderer = TestRenderer.create(<SignInWithCode />)
  const testInstance = testRenderer.root
  expect(testInstance.findByType(SignInWithCode))
})
