import React, { useEffect, useState } from 'react'
import FirstCommonConsentSection from './commonConsentSections/FirstCommonConsentSection'
import SecondCommonConsentSection from './commonConsentSections/SecondCommonConsentSection'
import ArmFlowOne from './armFlows/ArmFlowOne'
import ArmFlowTwo from './armFlows/ArmFlowTwo'
import ArmFlowThree from './armFlows/ArmFlowThree'
import ArmFlowFour from './armFlows/ArmFlowFour'
import { FLOW_OPTIONS } from '../../helpers/RandomFlowGenerator'
import { UserDataGroup } from '../../types/types'
import { useSessionDataState } from '../../AuthContext'
import { UserService } from '../../services/user.service'
import { Redirect } from 'react-router'

const FIRST_CONSENT_STEPS: number = 5
const SECOND_CONSENT_STEPS: number = 10
const FOURTH_ARM_FLOW_LENGTH: number = 4
const OTHER_ARM_FLOW_LENGTH: number = 1

type ConsentStepsProps = {
  dataGroups: Array<string>
}

const ConsentSteps: React.FunctionComponent<ConsentStepsProps> = ({
  dataGroups,
}: ConsentStepsProps) => {
  const [step, setStep] = useState(1)
  const [userClientData, setUserClientData] = useState({} as any)

  const findMaxSteps = () => {
    let steps = FIRST_CONSENT_STEPS + SECOND_CONSENT_STEPS
    if (dataGroups.includes(FLOW_OPTIONS.ONE as UserDataGroup)) steps++
    if (dataGroups.includes(FLOW_OPTIONS.TWO as UserDataGroup)) steps++
    if (dataGroups.includes(FLOW_OPTIONS.THREE as UserDataGroup)) steps++
    if (dataGroups.includes(FLOW_OPTIONS.FOUR as UserDataGroup))
      steps += FOURTH_ARM_FLOW_LENGTH
    return steps
  }

  const findSecondCommonStepsStart = () => {
    return (
      FIRST_CONSENT_STEPS +
      (dataGroups.includes(FLOW_OPTIONS.FOUR as UserDataGroup)
        ? FOURTH_ARM_FLOW_LENGTH
        : OTHER_ARM_FLOW_LENGTH)
    )
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

  const sessionData = useSessionDataState()
  const { token } = sessionData

  useEffect(() => {
    const getInfo = async () => {
      if (token) {
        const userInfoResponse = await UserService.getUserInfo(token)
        const data = userInfoResponse?.data as any
        const { checkpoint } = data.clientData
        setUserClientData(data.clientData)
        if (checkpoint > 1) {
          setStep(checkpoint)
        }
      }
    }
    getInfo()
  }, [token])

  if (userClientData.consented && userClientData.skipRanking) {
    return <Redirect to={'/download'} push={true} />
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
      const response = await UserService.updateUserClientData(token, newData)
      setUserClientData(response.data.clientData)
      return response
    }
  }

  if (step <= FIRST_CONSENT_STEPS) {
    return (
      <FirstCommonConsentSection
        step={step}
        setStep={setStep}
        maxSteps={maxSteps}
        updateClientData={updateClientData}
        consentModel={userClientData.consentModel}
      />
    )
  }

  if (step > FIRST_CONSENT_STEPS && step <= secondCommonStepsStart) {
    return renderArmFlow()
  }

  if (step > secondCommonStepsStart) {
    return (
      <SecondCommonConsentSection
        step={step}
        setStep={setStep}
        maxSteps={maxSteps}
        startingStep={secondCommonStepsStart + 1}
        updateClientData={updateClientData}
      />
    )
  }

  return null
}

export default ConsentSteps
