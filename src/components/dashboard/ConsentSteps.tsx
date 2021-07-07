import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import ArmFlowOne from './armFlows/ArmFlowOne'
import ArmFlowTwo from './armFlows/ArmFlowTwo'
import ArmFlowThree from './armFlows/ArmFlowThree'
import ArmFlowFour from './armFlows/ArmFlowFour'
import { FLOW_OPTIONS } from '../../helpers/RandomFlowGenerator'
import { UserDataGroup } from '../../types/types'
import { useSessionDataState } from '../../AuthContext'
import { UserService } from '../../services/user.service'
import { ROUTES } from '../../constants/constants'
import RankedChoice from './RankedChoice/RankedChoice'

const FIRST_CONSENT_STEPS: number = 4
const SECOND_CONSENT_STEPS: number = 9
const FOURTH_ARM_FLOW_LENGTH: number = 3
const FIRST_ARM_FLOW_LENGTH: number = 3
const THIRD_ARM_FLOW_LENGTH: number = 4
const OTHER_ARM_FLOW_LENGTH: number = 1

type ConsentStepsProps = {
  dataGroups: Array<string>
  handleError: Function
  clientData: any
}

const ConsentSteps: React.FunctionComponent<ConsentStepsProps> = ({
  dataGroups,
  handleError,
  clientData,
}: ConsentStepsProps) => {
  const { push } = useHistory()
  const [step, setStep] = useState(1)
  const [userClientData, setUserClientData] = useState({} as any)
  const sessionData = useSessionDataState()
  const { token } = sessionData

  const checkRedirectToDownload = (clientData: {
    consented: boolean
    skipRanking: boolean
  }) => {
    if (clientData && clientData?.consented && clientData?.skipRanking) {
      push(ROUTES.DOWNLOAD)
    }
  }

  const setLocalState = (clientData: { checkpoint: number }) => {
    checkRedirectToDownload(clientData as any)
    setUserClientData(clientData)
    const { checkpoint } = clientData
    if (checkpoint > 1) {
      setStep(checkpoint)
    }
  }

  useEffect(() => {
    const getInfo = async () => {
      if (token) {
        try {
          const userInfoResponse = await UserService.getUserInfo(token)
          const data = userInfoResponse?.data as any
          setLocalState(data?.clientData)
        } catch (e) {
          console.error(e)
          handleError()
        }
      }
    }
    if (!clientData) {
      getInfo()
    } else {
      setLocalState(clientData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientData, token])

  useEffect(() => {
    if (userClientData) {
      checkRedirectToDownload(userClientData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userClientData])

  const findMaxSteps = () => {
    let steps = FIRST_CONSENT_STEPS + SECOND_CONSENT_STEPS
    if (dataGroups.includes(FLOW_OPTIONS.ONE as UserDataGroup))
      steps += FIRST_ARM_FLOW_LENGTH
    if (dataGroups.includes(FLOW_OPTIONS.TWO as UserDataGroup)) steps++
    if (dataGroups.includes(FLOW_OPTIONS.THREE as UserDataGroup))
      steps += THIRD_ARM_FLOW_LENGTH
    if (dataGroups.includes(FLOW_OPTIONS.FOUR as UserDataGroup))
      steps += FOURTH_ARM_FLOW_LENGTH
    return steps
  }

  const findSecondCommonStepsStart = () => {
    if (
      dataGroups.includes(FLOW_OPTIONS.FOUR as UserDataGroup) ||
      dataGroups.includes(FLOW_OPTIONS.ONE as UserDataGroup)
    ) {
      return FIRST_CONSENT_STEPS + FOURTH_ARM_FLOW_LENGTH
    } else if (dataGroups.includes(FLOW_OPTIONS.THREE as UserDataGroup)) {
      return FIRST_CONSENT_STEPS + THIRD_ARM_FLOW_LENGTH
    } else {
      return FIRST_CONSENT_STEPS + OTHER_ARM_FLOW_LENGTH
    }
  }

  const updateClientData = async (step: number, fields?: object) => {
    let newData = {}

    if (fields)
      newData = {
        ...userClientData,
        ...fields,
        checkpoint: step,
      }
    else newData = { ...userClientData, checkpoint: step }
    if (token) {
      try {
        const response = await UserService.updateUserClientData(token, newData)
        setUserClientData(response.data.clientData)
        return response
      } catch (e) {
        console.error(e)
        handleError()
      }
    }
  }

  const maxSteps = findMaxSteps()
  const secondCommonStepsStart = findSecondCommonStepsStart()

  const renderArmFlow = () => {
    if (dataGroups.includes(FLOW_OPTIONS.ONE as UserDataGroup))
      return (
        <ArmFlowOne
          step={step}
          setStep={setStep}
          maxSteps={maxSteps}
          updateClientData={updateClientData}
          startingStep={FIRST_CONSENT_STEPS + 1}
        />
      )
    if (dataGroups.includes(FLOW_OPTIONS.TWO as UserDataGroup))
      return (
        <ArmFlowTwo
          step={step}
          setStep={setStep}
          maxSteps={maxSteps}
          updateClientData={updateClientData}
        />
      )
    if (dataGroups.includes(FLOW_OPTIONS.THREE as UserDataGroup))
      return (
        <ArmFlowThree
          step={step}
          setStep={setStep}
          maxSteps={maxSteps}
          updateClientData={updateClientData}
          startingStep={FIRST_CONSENT_STEPS + 1}
          RankedChoice={RankedChoice}
        />
      )
    if (dataGroups.includes(FLOW_OPTIONS.FOUR as UserDataGroup))
      return (
        <ArmFlowFour
          step={step}
          setStep={setStep}
          maxSteps={maxSteps}
          updateClientData={updateClientData}
          startingStep={FIRST_CONSENT_STEPS + 1}
        />
      )
    return null
  }

  if (step > FIRST_CONSENT_STEPS && step <= secondCommonStepsStart) {
    return renderArmFlow()
  }

  return null
}

export default ConsentSteps
