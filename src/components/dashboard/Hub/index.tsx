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
import { CheckpointData, ClientData, LoggedInUserData } from 'types/types'
import { PrivateRoute } from 'components/common'
import { useEligibility } from 'components/eligibility/context/EligibilityContext'
import { hubSteps } from 'data/hub/hub'

type CardStatus = 'disabled' | 'active' | 'complete'

const getStatus = (checkpoint: CheckpointData): CardStatus => {
  switch (checkpoint?.status) {
    case 'unstarted':
      return 'disabled'
    case 'started':
      return 'active'
    case 'complete':
      return 'complete'
    default:
      return 'disabled'
  }
}

function HubRouter() {
  const { token } = useSessionDataState()
  const [hubCards, setHubCards] = useState(hubSteps)
  const { isEligible } = useEligibility()
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const { push } = useHistory()
  const { t } = useTranslation()
  const [userInfo, setUserInfo] = useState<LoggedInUserData | undefined>()
  const { checkpoint } = userInfo?.clientData || {}

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
        newCards[HUB_STEPS.ABOUT_THE_STUDY - 1].status = getStatus(
          checkpoint.aboutTheStudy,
        )
        newCards[HUB_STEPS.ABOUT_DATA_SHARING - 1].status = getStatus(
          checkpoint.aboutDataSharing,
        )
        newCards[HUB_STEPS.SUMMARY_AND_SIGNATURE - 1].status = getStatus(
          checkpoint.summaryAndSignature,
        )
        return newCards
      })
    }
  }, [userInfo])

  useEffect(() => {
    const checkRedirectToDownload = () => {
      if (userInfo?.clientData?.consented) {
        push(ROUTES.DOWNLOAD)
      }
    }

    checkRedirectToDownload()
  }, [userInfo, push])

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
      <Route exact path="/hub">
        <Hub cards={hubCards} />
      </Route>
    </>
  )
}

export default HubRouter
