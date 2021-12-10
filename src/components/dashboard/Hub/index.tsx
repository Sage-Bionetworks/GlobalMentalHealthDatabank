import React, { useState, useEffect } from 'react'
import { Route } from 'react-router'
import { useHistory, useLocation } from 'react-router-dom'
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
import { ClientData, LoggedInUserData } from 'types/types'
import { PrivateRoute } from 'components/common'
import { useEligibility } from 'components/eligibility/context/EligibilityContext'
import { hubSteps } from 'data/hub/hub'
import Welcome from '../Welcome'
import ThankYou from '../ThankYou'
import { getCardStatus, checkRedirectToDownload } from 'helpers/utility'

function HubRouter() {
  const { userDataGroup, token } = useSessionDataState()
  const [hubCards, setHubCards] = useState(hubSteps)
  const { isEligible } = useEligibility()
  const location = useLocation()
  const { push } = useHistory()
  const [userInfo, setUserInfo] = useState<LoggedInUserData | undefined>()
  const { checkpoint } = userInfo?.clientData || {}
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(!token)

  useEffect(() => {
    const getInfo = async () => {
      if (token) {
        try {
          const userInfoResponse = (await UserService.getUserInfo(token)) as any
          setUserInfo(userInfoResponse?.data)
        } catch (e) {
          console.error(e)
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
    } else if (isEligible) {
      setHubCards(cards => {
        const newCards = cloneDeep(cards)
        newCards[HUB_STEPS.ELEGIBILITY - 1].status = 'complete'
        newCards[HUB_STEPS.REGISTRATION - 1].status = 'active'
        return newCards
      })
    }
  }, [token, isEligible])

  useEffect(() => {
    if (userInfo) {
      setHubCards(cards => {
        const newCards = cloneDeep(cards)
        const { checkpoint } = userInfo.clientData
        newCards[HUB_STEPS.ABOUT_THE_STUDY - 1].status = getCardStatus(
          checkpoint.aboutTheStudy,
        )
        newCards[HUB_STEPS.ABOUT_DATA_SHARING - 1].status = getCardStatus(
          checkpoint.aboutDataSharing,
        )
        newCards[HUB_STEPS.SUMMARY_AND_SIGNATURE - 1].status = getCardStatus(
          checkpoint.summaryAndSignature,
        )
        return newCards
      })
    }
  }, [userInfo])

  useEffect(() => {
    if (location.pathname.includes('/hub')) {
      checkRedirectToDownload(userInfo?.clientData, userDataGroup, push)
    }
  }, [userInfo, push, userDataGroup, location.pathname])

  const params = new URLSearchParams(location.search)
  const skipWelcomeScreenURLParam = params.get('SkipWelcomeScreen')

  useEffect(() => {
    if (skipWelcomeScreenURLParam === 'true') {
      setShowWelcomeScreen(false)
    }
  }, [skipWelcomeScreenURLParam])

  const updateClientData = async (fields: object = {}) => {
    const newClientData = {
      ...userInfo?.clientData,
      ...fields,
    } as ClientData
    // update local state at this point
    if (userInfo) {
      setUserInfo({ ...userInfo, clientData: newClientData })
    }
    if (token) {
      try {
        const response = await UserService.updateUserClientData(
          token,
          newClientData,
        )
        return response
      } catch (e) {
        console.error(e)
      }
    }
  }

  return (
    <>
      {showWelcomeScreen ? (
        <Welcome onClick={() => setShowWelcomeScreen(false)} />
      ) : (
        <>
          <Route path={ROUTES.ELIGIBILITY}>
            <Eligibility />
          </Route>
          <Route path={ROUTES.REGISTRATION}>
            <Registration />
          </Route>
          <PrivateRoute path={ROUTES.ABOUT_THE_STUDY}>
            <AboutTheStudy
              checkpoint={checkpoint}
              updateClientData={updateClientData}
            />
          </PrivateRoute>
          <PrivateRoute path={ROUTES.ABOUT_DATA_SHARING}>
            <AboutDataSharing
              checkpoint={checkpoint}
              dataGroups={userInfo?.dataGroups}
              updateClientData={updateClientData}
              clientData={userInfo?.clientData}
            />
          </PrivateRoute>
          <PrivateRoute path={ROUTES.SUMMARY_AND_SIGNATURE}>
            <SummaryAndSignature
              checkpoint={checkpoint}
              updateClientData={updateClientData}
            />
          </PrivateRoute>
          <PrivateRoute path={ROUTES.THANK_YOU_ZA}>
            <ThankYou updateClientData={updateClientData} />
          </PrivateRoute>
          <Route exact path="/hub">
            <Hub cards={hubCards} />
          </Route>
        </>
      )}
    </>
  )
}

export default HubRouter
