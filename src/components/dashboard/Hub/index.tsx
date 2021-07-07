import React, { useState, useEffect } from 'react'
import { Route } from 'react-router'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cloneDeep } from 'lodash'
import Hub from './Hub'
import Eligibility from '../../eligibility/Eligibility'
import Registration from '../../registration/'
import AboutTheStudy from '../AboutTheStudy'
import AboutDataSharing from '../AboutDataSharing'
import SummaryAndSignature from '../SummaryAndSignature'
import { HUB_STEPS, ROUTES } from 'constants/constants'
import { useSessionDataState } from 'AuthContext'
import { UserService } from 'services/user.service'
import { LoggedInUserData } from 'types/types'
import { PrivateRoute } from 'components/common'
import { useEligibility } from 'components/eligibility/context/EligibilityContext'
import { hubSteps } from 'data/hub/hub'

function HubRouter() {
  const { token } = useSessionDataState()
  const [hubCards, setHubCards] = useState(hubSteps)
  const { isEligible } = useEligibility()
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const { push } = useHistory()
  const { t } = useTranslation()
  const [userInfo, setUserInfo] = useState<LoggedInUserData | undefined>()

  if (isEligible) {
    const newCards = cloneDeep(hubCards)
    newCards[HUB_STEPS.ELEGIBILITY - 1].status = 'complete'
    newCards[HUB_STEPS.REGISTRATION - 1].status = 'active'
    setHubCards(newCards)
  }

  useEffect(() => {
    const getInfo = async () => {
      if (token) {
        try {
          setIsLoading(true)
          const userInfoResponse = (await UserService.getUserInfo(token)) as any

          setUserInfo(userInfoResponse?.data)
        } catch (e) {
          console.error(e)
          setError(e?.message)
        } finally {
          setIsLoading(false)
        }
      }
    }

    getInfo()
  }, [token])

  useEffect(() => {
    if (token) {
      setHubCards(cards => {
        const newCards = cloneDeep(cards)
        newCards[HUB_STEPS.ELEGIBILITY - 1].status = 'complete'
        newCards[HUB_STEPS.REGISTRATION - 1].status = 'complete'
        return newCards
      })
    }
  }, [token])

  useEffect(() => {
    const checkRedirectToDownload = () => {
      if (userInfo?.clientData?.consented) {
        push(ROUTES.DOWNLOAD)
      }
    }

    checkRedirectToDownload()
  }, [userInfo, push])

  const updateClientData = async (fields: object = {}) => {
    let newData = {}

    newData = {
      ...userInfo?.clientData,
      ...fields,
    }
    if (token) {
      try {
        const response = await UserService.updateUserClientData(token, newData)
        setUserInfo(response.data)
        return response
      } catch (e) {
        console.error(e)
        setError(e?.message || t('common.connectionProblem'))
      }
    }
  }

  return (
    <>
      <Route path={ROUTES.ELIGIBILITY}>
        <Eligibility />
      </Route>
      <Route path={ROUTES.REGISTRATION}>
        <Registration />
      </Route>
      <PrivateRoute path={ROUTES.ABOUT_THE_STUDY}>
        <AboutTheStudy />
      </PrivateRoute>
      <PrivateRoute path={ROUTES.ABOUT_DATA_SHARING}>
        <AboutDataSharing
          dataGroups={userInfo?.dataGroups}
          updateClientData={updateClientData}
        />
      </PrivateRoute>
      <PrivateRoute path={ROUTES.SUMMARY_AND_SIGNATURE}>
        <SummaryAndSignature />
      </PrivateRoute>
      <Route exact path="/hub">
        <Hub cards={hubCards} />
      </Route>
    </>
  )
}

export default HubRouter
