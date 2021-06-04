import React from 'react'
import SignInWithCode from './SignInWithCode'
import TestRenderer from 'react-test-renderer'
import { SessionDataProvider } from '../../AuthContext'

test('renders SignInWithCode', () => {
  const testRenderer = TestRenderer.create(
    <SessionDataProvider>
      <SignInWithCode />
    </SessionDataProvider>,
  )
  const testInstance = testRenderer.root
  expect(testInstance.findByType(SignInWithCode))
})
