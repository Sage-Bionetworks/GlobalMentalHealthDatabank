import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Typography,
  Select,
  MenuItem,
  Button,
  TextField,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert/Alert'
import uk from 'assets/flags/uk.svg'
import ind from 'assets/flags/ind.svg'
import za from 'assets/flags/za.svg'
import us from 'assets/flags/us.svg'
import { getPhoneLength, isTestingEnv, makePhone } from 'helpers/utility'
import { useEligibility } from '../eligibility/context/EligibilityContext'
import { requestSMSCode, signInWithExternalId } from 'services/auth.service'
import { EXTERNAL_ID_SALT, FLAGS } from 'constants/constants'
import useAuth from 'helpers/hooks/useAuth'

type Props = {
  setIsLoading: (state: boolean) => void
  setIsCodeSent: (state: boolean) => void
}
function LoginForm({ setIsLoading, setIsCodeSent }: Props) {
  const {
    phoneNumber,
    setPhoneNumber,
    whereDoYouLive,
    setWhereDoYouLive,
  } = useEligibility()
  const { t } = useTranslation()
  const { loginDispatch } = useAuth()
  const [error, setError] = useState('')
  const [code, setCode] = useState('')
  const maxLength = getPhoneLength(whereDoYouLive)
  const codeLength = 6

  useEffect(() => {
    if (!whereDoYouLive || whereDoYouLive === 'Other') {
      setWhereDoYouLive(FLAGS.unitedKingdom)
      setPhoneNumber('')
    }
  })

  const validateDisabled = () => {
    if (whereDoYouLive === FLAGS.india) {
      return phoneNumber.length < maxLength - 1 || code.length !== codeLength
    }
    return phoneNumber.length !== maxLength
  }

  const handleLogin = async (
    clickEvent: React.FormEvent<HTMLElement>,
  ): Promise<any> => {
    clickEvent.preventDefault()

    try {
      setIsLoading(true)
      setError('')
      if (whereDoYouLive === FLAGS.india) {
        const password = `${EXTERNAL_ID_SALT}${code}`
        const loggedIn = await signInWithExternalId(phoneNumber, password)
        loginDispatch(loggedIn, setError)
      } else {
        await requestSMSCode(makePhone(phoneNumber, whereDoYouLive))
        setIsCodeSent(true)
      }
    } catch (e) {
      setError(e?.message)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <div className="btm-30">
        <Typography variant="h4">{t('common.signIn')}</Typography>
      </div>
      <form onSubmit={handleLogin}>
        <label htmlFor="phone" className="block--dark">
          <Typography variant="h6">{t('eligibility.myPhone')}</Typography>
        </label>
        <div className="btm-30 input--padded--flags">
          <Select
            variant="outlined"
            className="phone-flag"
            value={whereDoYouLive}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              setWhereDoYouLive(event.target.value as any)
            }}
          >
            <MenuItem value={FLAGS.unitedKingdom}>
              <img src={uk} className={'flag-icon'} alt="United Kingdom" />
            </MenuItem>
            <MenuItem value={FLAGS.india}>
              <img src={ind} className={'flag-icon'} alt="India" />
            </MenuItem>
            <MenuItem value={FLAGS.southAfrica}>
              <img src={za} className={'flag-icon'} alt="South Africa" />
            </MenuItem>

            {isTestingEnv() && (
              <MenuItem value={FLAGS.unitedStates}>
                <img src={us} className={'flag-icon'} alt="United States" />
              </MenuItem>
            )}
          </Select>
          <TextField
            fullWidth
            className="phone-input-helper"
            variant="outlined"
            autoComplete="phone"
            label="Phone #"
            type="tel"
            value={phoneNumber}
            inputProps={{ maxLength }}
            helperText={`${phoneNumber.length}/${maxLength}`}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              const { value } = event.target as any
              setPhoneNumber(value.replace(/[^\d]/, ''))
            }}
          />
        </div>

        {whereDoYouLive === FLAGS.india && (
          <div>
            <label htmlFor="code" className="block--dark">
              <Typography variant="h6">{t('eligibility.myCode')}</Typography>
            </label>
            <div className="btm-40 phone-input">
              <TextField
                fullWidth
                className="phone-input-helper"
                variant="outlined"
                name="code"
                type="tel"
                inputProps={{ maxLength: codeLength }}
                helperText={`${code.length}/${codeLength}`}
                value={code}
                placeholder="123456"
                aria-label="PIN Code"
                onChange={(event: React.ChangeEvent<{ value: string }>) => {
                  const { value } = event.target
                  event.target.value = value.replace(/[^\d]/, '')
                  setCode(event.target.value)
                }}
              />
            </div>
          </div>
        )}

        {error && (
          <div className="tp-40-neg">
            <Alert severity="error">{error}</Alert>
          </div>
        )}

        <div style={{ marginTop: '50px' }}>
          <Button
            className="wide-button"
            color="primary"
            variant="contained"
            size="large"
            type="submit"
            onSubmit={handleLogin}
            disabled={validateDisabled()}
          >
            {t('common.signIn')}
          </Button>
        </div>
      </form>
    </>
  )
}

export default LoginForm
