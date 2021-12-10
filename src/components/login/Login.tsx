import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CircularProgress, Button } from '@material-ui/core'
import SignInWithCode from './SignInWithCode'
import SignUpVerification from './SignUpVerification'
import LoginForm from './LoginForm'
import { ResponsiveStepWrapper } from 'components/common'
import { ReactComponent as TextSent } from 'assets/text_sent.svg'

export const Login: React.FunctionComponent = () => {
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [didSignUp, setDidSignUp] = useState(false)

  const { t } = useTranslation()

  return (
    <ResponsiveStepWrapper variant="card">
      <div className="login-wrapper">
        <div className="quiz-wrapper">
          {!isCodeSent && (
            <>
              <div className="icon-wrapper">
                <TextSent width="75" />
              </div>
              {isLoading && (
                <div className="loading-icon">
                  <CircularProgress color="primary" />
                </div>
              )}

              {!didSignUp && (
                <SignUpVerification
                  handleYes={() => setDidSignUp(true)}
                  handleNo={() => (window.location.href = 'about')}
                />
              )}

              {didSignUp && (
                <LoginForm
                  setIsCodeSent={setIsCodeSent}
                  setIsLoading={setIsLoading}
                />
              )}
            </>
          )}

          {isCodeSent && <SignInWithCode />}

          {!isCodeSent && (
            <Button
              variant="text"
              onClick={() => (window.location.href = 'eligibility')}
            >
              {t('common.signUpForAccount')}
            </Button>
          )}
        </div>
      </div>
    </ResponsiveStepWrapper>
  )
}

export default Login
